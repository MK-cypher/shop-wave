import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {address} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function moneyFormat(amount: number) {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    throw new Error("Invalid input: must be a number or a numeric string");
  }

  const formattedAmount = numAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return `$${formattedAmount}`;
}

export function generateRandomId(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function getDateNow() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hour}:${minute}`;
}

export const getDevice = (agent: string) => {
  if (agent.toLowerCase().includes("windows")) {
    return {device: "Windows", img: "/laptop.png"};
  }
  if (agent.toLowerCase().includes("linux")) {
    return {device: "Linux", img: "/linux.png"};
  }
  if (agent.toLowerCase().includes("phone")) {
    return {device: "Phone", img: "/phone.png"};
  } else {
    return {device: "Windows", img: "/laptop.png"};
  }
};

export function isCompleteAddress(obj: any): obj is address {
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.address === "string" &&
    typeof obj.postal_code === "string" &&
    typeof obj.city === "string" &&
    typeof obj.state === "string" &&
    typeof obj.street_number === "string" &&
    typeof obj.phone === "string"
  );
}

export const metaDataConfig = ({
  title = "Shop Wave",
  description = "Find what you're looking for at Shop Wave for the best prices",
  image = "/logo.png",
  icons = "/favicon.ico",
  noIndex = false,
} = {}) => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{url: image}],
    },
    twitter: {
      title,
      description,
      images: [image],
      card: "summary_large_image",
    },
    icons,
    metadataBase: new URL("https://e-commerce-psi-ivory.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
};
