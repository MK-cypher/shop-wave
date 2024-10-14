"use client";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {ssr: false});

export default function ProductsSpecs({specs}: {specs: string}) {
  return (
    <div className="custom-quill">
      <ReactQuill value={specs} readOnly theme="bubble" />
    </div>
  );
}
