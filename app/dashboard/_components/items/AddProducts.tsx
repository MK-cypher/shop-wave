"use client";
import {Button, buttonVariants} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {List, Plus, Trash, UploadCloud} from "lucide-react";
import React, {FormEvent, useState} from "react";
import {CategorySelect} from "./categorySelect";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import TagsSelect from "./tagsSelect";
import MediaSlider from "@/components/MediaSlider";
import {saveProduct, uploadProductMedia} from "@/actions/products";
import {toast} from "@/components/ui/use-toast";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});

export default function AddProducts({
  productData,
  defaultCategory,
  defaultSubCategory,
}: {
  productData?: any;
  defaultCategory?: string;
  defaultSubCategory?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<any>(null);
  const [imgPath, setImgPath] = useState<string | ArrayBuffer | null>(null);
  const [productImg, setProductImg] = useState(productData && productData.main_img ? productData.main_img : "");
  const [media, setMedia] = useState<string[] | []>(productData?.media || []);
  const [specs, setSpecs] = useState(productData?.specs || "");
  const [category, setCategory] = useState(productData && productData.category ? productData.category : "");
  const [subCategory, setSubCategory] = useState(
    productData && productData.sub_category ? productData.sub_category : ""
  );
  const [originalPrice, setOriginalPrice] = useState(
    productData && productData.original_price ? productData.original_price : "0"
  );
  const [tags, setTags] = useState(productData?.tags || {});
  const [filters, setFilters] = useState(productData?.filters || []);
  const [discount, setDiscount] = useState(productData && productData.discount ? productData.discount : "0");

  const imgUpload = async (logo: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(logo);
      reader.onloadend = () => {
        setImgPath(reader.result);
        resolve(reader.result);
      };
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let jsonData = Object.fromEntries(formData.entries());
    jsonData.id = productData?.id || "";
    jsonData.specs = specs;
    jsonData.main_img = productImg || imgPath;
    jsonData.category = category;
    jsonData.sub_category = subCategory;
    // @ts-ignore
    jsonData.media = media;
    jsonData.tags = tags;
    jsonData.filters = filters;
    //

    // @ts-ignore
    const res = await saveProduct(jsonData);
    if (!res) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Product has been saved successfully",
        variant: "success",
      });
    }

    setLoading(false);
  };

  const handleRemoveTags = (value: string) => {
    setTags((prev: any) => {
      const newObject = {...prev};
      delete newObject[value];
      return newObject;
    });
    setFilters((prev: any) => prev.filter((item: any) => item.name_label !== value));
  };

  const handleUpload = async (event: any) => {
    const file = event.target.files[0];
    const base64 = (await convertToBase64(file)) as string;
    try {
      // const response = await axios.post('/api/upload', { data: base64 });
      const response = await uploadProductMedia(base64);
      setMedia((prevImages) => [response, ...prevImages]);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const modules = {
    toolbar: [
      [{header: [1, 2, 3, 4, 5, 6, false]}],
      [{color: []}, {background: []}],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      ["link"],
      [{list: "ordered"}, {list: "bullet"}, {list: "check"}],
      [{indent: "-1"}, {indent: "+1"}],
      [{direction: "rtl"}],
      [{align: []}],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "background",
    "align",
    "script",
    "direction",
  ];

  return (
    <div>
      <DialogContent aria-describedby={undefined} className="max-w-[1400px] lg:w-[90%] max-h-[99svh] overflow-auto">
        <DialogTitle></DialogTitle>
        <form onSubmit={submit}>
          <div className="flex max-xmd:flex-col">
            <div className="xmd:w-1/2 xmd:pr-3">
              <div className="space-y-2 mb-5 w-full">
                <label htmlFor="name">Product Name</label>
                <input
                  id="name"
                  name="name"
                  className="w-full"
                  defaultValue={productData?.name ?? ""}
                  readOnly={false}
                />
              </div>
              <div className=" w-full flex max-md:flex-col items-start gap-3 mb-5">
                <div className="drag-drop-container md:w-[66%] max-md:w-full h-full">
                  <div className="drag-drop h-[220px]">
                    <input
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0 && e.target.files[0].type.includes("image")) {
                          setLogo(e.target.files[0]);
                          imgUpload(e.target.files[0]);
                        } else {
                          return;
                        }
                      }}
                      id="logo"
                      type="file"
                      accept="image/*"
                    />
                    {logo ? (
                      <div className="input-image">
                        <img src={URL.createObjectURL(logo)} alt="Logo" className="h-full object-cover rounded-lg" />
                      </div>
                    ) : productImg ? (
                      <div className="input-image">
                        <img src={`${productImg}`} alt="news" className="h-full object-cover rounded-lg" />
                      </div>
                    ) : (
                      <div className="input-image text-center flex flex-col gap-2 items-center justify-center">
                        <UploadCloud className="mx-auto text-muted-foreground" />
                        <div className="text-muted-foreground">Drag Image here</div>
                        <div>OR</div>
                        <div className={`${buttonVariants()}`}>Click here</div>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <div className="mt-5">
                      <MediaSlider imgs={media} setMedia={setMedia} />
                    </div>
                  </div>
                </div>
                <div className="mb-5 space-y-2">
                  <div className="md:space-y-2 max-md:flex items-center gap-3">
                    <div className="mb-5 space-y-2">
                      <label htmlFor="max_quantity">Product Quantity</label>
                      <input
                        id="max_quantity"
                        name="max_quantity"
                        type="number"
                        className="w-full  block"
                        defaultValue={productData?.max_quantity ?? ""}
                        readOnly={false}
                        onKeyDown={(e) => {
                          const value = e.key;
                          const pass = ["e", "-", "+", "=", "."];
                          if (pass.includes(value)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="mb-5 space-y-2">
                      <label htmlFor="category">Category</label>
                      <CategorySelect defaultValue={defaultCategory} setCategory={setCategory} />
                    </div>
                    {category ? (
                      <div className="mb-5 space-y-2">
                        <label htmlFor="subCategory">Sub Category</label>
                        <CategorySelect
                          defaultValue={defaultSubCategory}
                          setSubCategory={setSubCategory}
                          category={category}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="">
                    <div className={`${category ? "md:mt-8" : "md:mt-28"}`}>
                      <label htmlFor="media-upload-btn" className={`${buttonVariants()} w-full`}>
                        Add Media
                      </label>
                      <input type="file" onChange={handleUpload} className="hidden" id="media-upload-btn" />
                      {/* <Button type="button" className="w-full">
                        Add Media
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <div className="mb-5 space-y-2">
                  <label htmlFor="original_price">Original Price</label>
                  <input
                    id="original_price"
                    name="original_price"
                    type="number"
                    className="w-full"
                    defaultValue={productData?.original_price ?? ""}
                    readOnly={false}
                    onKeyDown={(e) => {
                      const value = e.key;
                      const pass = ["e", "-", "+", "="];
                      if (pass.includes(value)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      setOriginalPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-5 space-y-2">
                  <label htmlFor="discount">Discount</label>
                  <div className="flex items-center gap-2">
                    <span>%</span>
                    <input
                      id="discount"
                      name="discount"
                      type="number"
                      className="w-full"
                      defaultValue={productData?.discount ?? discount}
                      readOnly={false}
                      onKeyDown={(e) => {
                        const value = e.key;
                        const pass = ["e", "-", "+", "="];
                        if (pass.includes(value)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        setDiscount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-5 space-y-2">
                  <label htmlFor="price">Final Price</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    className="w-full"
                    value={String(
                      Number(Number(originalPrice) - (Number(originalPrice) * Number(discount)) / 100).toFixed(2)
                    )}
                    readOnly
                  />
                </div>
              </div>
              <div className="mb-5 space-y-5">
                <div className="flex justify-between items-center">
                  <label htmlFor="tags">Tags</label>{" "}
                  <div className="flex items-center gap-3">
                    <Dialog>
                      <DialogTrigger className={buttonVariants()}>
                        <List />
                        Tags List
                      </DialogTrigger>
                      <DialogContent aria-describedby={undefined} className="max-w-[400px]">
                        <DialogTitle className="hidden"></DialogTitle>
                        <div className="space-y-2">
                          {filters.map((item: any) => (
                            <div
                              key={item.name_label}
                              className="flex justify-between items-center p-2 bg-popover rounded-md"
                            >
                              <div className="flex items-center gap-5">
                                <div>{item.name}</div>
                                <div>{item.value}</div>
                              </div>
                              <button
                                type="button"
                                className="text-red-400 transition-all duration-300 hover:text-red-500"
                                onClick={() => {
                                  handleRemoveTags(item.name_label);
                                }}
                              >
                                <Trash />
                              </button>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <TagsSelect tags={tags} filters={filters} setTags={setTags} setFilters={setFilters} />
              </div>
            </div>

            <div className="xmd:w-1/2 xmd:border-l xmd:pl-3">
              <div className="space-y-2 mb-5 w-full">
                <label htmlFor="description">Product Description</label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full"
                  defaultValue={productData?.description ?? ""}
                  readOnly={false}
                />
              </div>

              <div className="mb-5 space-y-2">
                <label htmlFor="specs">Specs</label>
                <div className="custom-quill">
                  <ReactQuill
                    className=""
                    id="specs"
                    theme="snow"
                    value={specs}
                    onChange={setSpecs}
                    modules={modules}
                    formats={formats}
                  />
                </div>
                {/* <textarea
                  id="specs"
                  name="specs"
                  className="w-full"
                  defaultValue={productData?.specs ?? ""}
                  readOnly={false}
                /> */}
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Button className={`${loading ? "loading" : ""} w-full`}>
              Save <span></span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </div>
  );
}
