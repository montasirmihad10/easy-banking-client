"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useUploadWebsiteImageMutation } from "@/redux/api/settingsApi";

const ImageUploadField = ({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  hint?: string;
}) => {
  const [uploadImage, { isLoading }] = useUploadWebsiteImageMutation();
  const [preview, setPreview] = useState(value || "");

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadImage(formData).unwrap();
      const url = res?.data?.url;
      if (!url) {
        toast.error("Upload failed");
        return;
      }
      setPreview(url);
      onChange(url);
      toast.success("Image uploaded to Cloudinary");
    } catch {
      toast.error("Cloudinary upload failed");
    }
  };

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-800">{label}</p>
          {hint && <p className="text-xs text-slate-500">{hint}</p>}
        </div>
        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-rose-600"
            onClick={() => {
              setPreview("");
              onChange("");
            }}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        )}
      </div>

      {preview ? (
        <div className="relative h-36 w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
          <Image src={preview} alt={label} fill className="object-cover" />
        </div>
      ) : (
        <label className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-slate-500 transition hover:border-[#104042] hover:text-[#104042]">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <ImagePlus className="mb-1 h-5 w-5" />
              <span className="text-xs font-medium">Upload to Cloudinary</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isLoading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}

      {!preview && (
        <label className="inline-flex">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isLoading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}

      {preview && (
        <label className="inline-flex cursor-pointer text-xs font-medium text-[#104042]">
          Replace image
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isLoading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploadField;
