'use client'

import { useState } from "react";
import SubmitForm from "../_components/submit-form";
import { CardPreview } from "../_components/card-preview";
import Link from "next/link";
import { LeftArrowIcon } from "@/components/ui/icons";

export default function FoundItem() {
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const resetPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
  }

  return (
    <div className="container max-w-6xl mx-auto pt-8 pb-24 px-4 space-y-6">
      <Link href="/" className="flex items-center space-x-1">
        <LeftArrowIcon />
        <h3 className="text-2xl font-semibold ">Back</h3>
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <SubmitForm type="FOUND" onFileChange={handleFileChange} onSubmitSuccess={resetPreview} />
        <CardPreview preview={preview} />
      </div>
    </div>
  );
}
