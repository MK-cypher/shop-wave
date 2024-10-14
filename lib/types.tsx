export interface product {
  id: string;
  name: string;
  description: string;
  specs: string;
  original_price: number;
  discount: number;
  price: number;
  max_quantity: number;
  category: string;
  sub_category: string;
  tags: {tag_name: string; value: string}[];
  reviews: number;
  rating: number;
  main_img: string;
  media: string[];
  created_at: string;
  filters: filterType[];
}

interface filterType {
  name: string;
  name_label: string;
  value: string;
  value_label: string;
}

export interface dbFilters {
  name: string;
  label: string;
  filters: [
    {
      name: string;
      label: string;
      total: number;
    }
  ];
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  specs: string;
  original_price: number;
  discount: number;
  price: number;
  max_quantity: number;
  category: string;
  sub_category: string;
  tags: {tag_name: string; value: string}[];
  reviews: number;
  rating: number;
  main_img: string;
  media: string[];
  created_at: string;
  quantity: number;
}

export interface reviews {
  id: string;
  body: string;
  rating: number;
  product_id: string;
  created_at: string;
  updated_at: string;
  users: {
    avatar: string | null;
    username: string;
  };
}

export interface reviewStats {
  star: number;
  total: number;
}

export interface address {
  id: string;
  name: string;
  address: string;
  postal_code: string;
  city: string;
  state: string;
  street_number: string;
  phone: string;
}

export interface wishlist {
  id: string;
  productList: string[];
}

// Orders

export interface OrderProduct {
  id: string;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  email: string;
  status: string;
  total: number;
  products: OrderProduct[];
  address: address;
  method: string;
  quantity: number;
  status_updates?: {date: string; status: string}[];
}

// Orders

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  role: string;
}

// dashboard

export interface OverviewStats {
  revenue: number;
  incoming: number;
  users: number;
  orders: number;
}

export interface ChartData {
  date: string;
  Users: number;
  Sales: number;
}

export interface TagValue {
  name: string;
  label: string;
}

export interface TagName {
  name: string;
  label: string;
}

// dashboard
