"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const modules = {
  toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike", "blockquote"], [{ align: ["right", "center", "justify"] }], [{ list: "ordered" }, { list: "bullet" }], ["link", "image"]],
};

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div className="min-h-[350px] border rounded-lg p-4 bg-gray-50">Loading editor...</div>,
});

export default function Editor({ value, onChange, disabled, className }: EditorProps) {
  // Initialize with empty string to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <style jsx global>{`
        .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          border-color: rgb(var(--border));
          background-color: white;
        }
        .ql-container {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border-color: rgb(var(--border));
          background-color: white;
          color: black;
          font-family: inherit;
          font-size: 1rem;
          line-height: 1.5;
        }
        .ql-editor {
          min-height: 350px;
        }
        .ql-editor.ql-snow {
          color: black;
        }
        .ql-picker {
          color: black;
        }
        .ql-stroke {
          stroke: black;
        }
        .ql-fill {
          fill: black;
        }
        .ql-picker-options {
          background-color: white;
          color: black;
          border-color: rgb(var(--border));
        }
        .ql-active {
          color: rgb(var(--primary));
        }
        .ql-active .ql-stroke {
          stroke: rgb(var(--primary));
        }
        .ql-active .ql-fill {
          fill: rgb(var(--primary));
        }
      `}</style>
      {mounted && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          readOnly={disabled}
          placeholder="Write your content here..."
          className="bg-white rounded-lg w-full sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] pb-12"
        />
      )}
    </div>
  );
}
