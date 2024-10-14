"use server";

import {product} from "@/lib/types";
import createSupabaseServerClient from "@/lib/db/server";
import configureCloudinary from "@/lib/uploader";
import {revalidatePath} from "next/cache";

function getFilters(products: product[]) {
  const filterMap = new Map();

  products.forEach((product) => {
    product.filters.forEach((filter) => {
      const key = filter.name;
      if (!filterMap.has(key)) {
        filterMap.set(key, {
          name: filter.name,
          label: filter.name_label,
          filters: new Map(),
        });
      }

      const filterGroup = filterMap.get(key);
      const valueKey = filter.value;

      if (!filterGroup.filters.has(valueKey)) {
        filterGroup.filters.set(valueKey, {
          name: filter.value,
          label: filter.value_label,
          total: 0,
        });
      }

      filterGroup.filters.get(valueKey).total++;
    });
  });

  return Array.from(filterMap.values()).map((group) => ({
    ...group,
    filters: Array.from(group.filters.values()),
  }));
}

const getMax = (data: any) => {
  return Math.max(...data.map((product: any) => product.price));
};
const getMin = (data: any) => {
  return Math.min(...data.map((product: any) => product.price));
};

export const searchProduct = async (search: string) => {
  const supabase = createSupabaseServerClient();
  console.log(search);

  const {data, error} = await supabase
    .from("products")
    .select("id,name,main_img,original_price,price,sub_category")
    .or(`name.ilike.%${search}%,description.ilike.%${search}$`)
    .limit(10);

  if (error) {
    console.log(error);
    return JSON.stringify([]);
  }

  if (data) {
    return JSON.stringify(data);
  }

  return JSON.stringify({});
};

export const getProducts = async (category: string, query: any) => {
  const PRODUCTS_PER_PAGE = 5;
  const page = query.page || 1;
  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const supabase = createSupabaseServerClient();

  let supaQuery = supabase.from("products").select("*", {count: "exact"});

  if (category != "all" && category != "") {
    supaQuery = supaQuery.or(`category.eq.${category},sub_category.eq.${category}`);
  }

  if (query.search) {
    supaQuery = supaQuery.ilike("name", `%${query.search}%`);
  }

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (
        key !== "sort" &&
        key !== "page" &&
        key !== "min_price" &&
        key !== "max_price" &&
        key !== "reviews" &&
        key !== "search"
      ) {
        // @ts-ignore
        const values = value.split(",");
        if (values.length > 1) {
          const conditions = values.map((v: any) => `tags->>${key}.eq.${v}`);
          supaQuery = supaQuery.or(conditions.join(","));
        } else {
          supaQuery = supaQuery.contains("tags", {[key]: value});
        }
      }
    }
  }

  const {data: priceData} = await supaQuery;
  let max;
  let min;
  if (priceData && priceData?.length > 0) {
    max = getMax(priceData);
    min = getMin(priceData);
  }

  if (query.max_price) {
    supaQuery = supaQuery.lte("price", query.max_price);
  }
  if (query.min_price) {
    supaQuery = supaQuery.gte("price", query.min_price);
  }

  if (query.reviews) {
    supaQuery = supaQuery.lt("rating", query.reviews + 1).gt("rating", query.reviews - 1);
  }

  if (!query.sort) {
    supaQuery = supaQuery.order("price", {ascending: true});
  }

  if (query.sort) {
    const [sortField, sortOrder] = query.sort.split("-");
    supaQuery = supaQuery.order(sortField, {ascending: sortOrder === "asc"});
  }

  const {data: fullData} = await supaQuery;
  let filters = [];
  if (fullData && fullData?.length > 0) {
    filters = getFilters(fullData);
  }

  supaQuery = supaQuery.range(offset, offset + PRODUCTS_PER_PAGE - 1);

  const {data, count, error} = await supaQuery;

  if (error) {
    console.log(error);
    return JSON.stringify({products: [], filters: []});
  }

  return JSON.stringify({products: data, filters, total: count, max, min});
};

export const getSingleProduct = async (id: string) => {
  const supabase = createSupabaseServerClient();

  const {data, error} = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    return JSON.stringify({});
  }

  return JSON.stringify(data);
};

export const getFeatured = async (category: string, limit = 5) => {
  const supabase = createSupabaseServerClient();

  const {data, error} = await supabase
    .from("products")
    .select("*")
    .or(`category.eq.${category},sub_category.eq.${category}`)
    .limit(limit);

  if (error) {
    return JSON.stringify([]);
  }
  return JSON.stringify(data);
};

// dashboard

export const uploadProductMedia = async (img: string) => {
  const cloudinary = await configureCloudinary();
  const result = await cloudinary.uploader.upload(img, {
    upload_preset: process.env.CLOUD_PRESET,
    folder: `products/`,
  });
  const url = result.secure_url;

  return url;
};

export const deleteProductMedia = async (img: string) => {
  const imageId = img.split("/").slice(-2).join("/").split(".")[0];
  const cloudinary = await configureCloudinary();
  const deleteResult = await cloudinary.uploader.destroy(imageId);
  return;
};

export const saveProduct = async (data: product) => {
  const supabase = createSupabaseServerClient();
  let main_img = data.main_img;
  if (!data.main_img.startsWith("http") && !data.main_img.startsWith("/")) {
    const imageId = main_img.split("/").slice(-2).join("/").split(".")[0];
    const cloudinary = await configureCloudinary();
    const deleteResult = await cloudinary.uploader.destroy(imageId);
    const result = await cloudinary.uploader.upload(main_img, {
      upload_preset: process.env.CLOUD_PRESET,
      folder: `products/`,
    });
    data.main_img = result.secure_url;
  }

  data.max_quantity = Number(data.max_quantity);
  data.original_price = Number(data.original_price);
  data.discount = Number(data.discount);
  data.price = Number(data.price);

  if (data.id) {
    //@ts-ignore
    data.id = Number(data.id);
    const {error} = await supabase.from("products").update(data).eq("id", data.id);
    if (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  const {id, ...dataNoId} = data;

  const {error} = await supabase.from("products").insert([dataNoId]);

  if (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const deleteProduct = async (id: string) => {
  const supabase = createSupabaseServerClient();
  const {data, error} = await supabase.from("products").delete().eq("id", id).select("main_img,media").single();
  if (error) {
    return false;
  }
  const imageId = data?.main_img.split("/").slice(-2).join("/").split(".")[0];
  const cloudinary = await configureCloudinary();
  await cloudinary.uploader.destroy(imageId);

  data?.media.forEach(async (img: string) => {
    const id = img.split("/").slice(-2).join("/").split(".")[0];
    await cloudinary.uploader.destroy(id);
  });

  revalidatePath("/dashboard/products");

  return true;
};
// dashboard
