"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageUploadPreview({ name, label }: { name: string; label: string }) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <label className="mt-2 flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-dashed border-ink/25 bg-white px-4 text-sm text-ink/65 transition hover:border-plum hover:text-plum">
        Choose images
        <input
          type="file"
          name={name}
          multiple
          accept="image/*"
          className="sr-only"
          onChange={(event) => {
            previews.forEach((url) => URL.revokeObjectURL(url));
            setPreviews(Array.from(event.target.files ?? []).map((file) => URL.createObjectURL(file)));
          }}
        />
      </label>
      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3" aria-label={`${label} preview`}>
          {previews.map((url, index) => (
            <div key={url} className="relative aspect-square overflow-hidden rounded-xl bg-line">
              <Image src={url} alt={`Selected image ${index + 1}`} fill unoptimized className="object-cover" sizes="140px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
