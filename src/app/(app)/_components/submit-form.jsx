"use client";
import { useActionState, useState } from "react";
import { Button, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { submitFormAction } from "./submit-form-action";
import Image from "next/image";

export const categories = [
  { key: "electronic", label: "Electronic" },
  { key: "clothing", label: "Clothing" },
  { key: "accessories", label: "Accessories" },
  { key: "other", label: "Others" },
];

export default function SubmitForm({type}) {
  const [state, formAction, pending] = useActionState(submitFormAction, null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      <Input
        label="Item Name"
        placeholder="Item Name"
        name="name"
        variant="border"
        className="rounded-lg"
        required
      />

      <Select
        label="Category"
        placeholder="Select Category"
        name="category"
        variant="border"
        className="rounded-lg"
      >
        {categories.map((category) => (
          <SelectItem key={category.key} value={category.key}>
            {category.label}
          </SelectItem>
        ))}
      </Select>

      <DatePicker
        label="Timeframe"
        name="timeframe"
        variant="border"
        className="rounded-lg"
        required
      />

      <Input
        label="Location"
        placeholder="Place, City"
        name="location"
        variant="border"
        className="rounded-lg"
        required
      />

      <Input
        label="File"
        type="file"
        name="file"
        variant="border"
        className="rounded-lg"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Input name="type" type="hidden" defaultValue={type} hidden/>

      {preview && (<Image src={preview} alt="Upload Photo Preview" width={400} height={400} className="object-cover rounded-lg"/>)}

      <Button isLoading={pending} type="submit">
        Submit
      </Button>
      {state?.success === false && (
        <div className="justify-center text-red-500">{state.message}</div>
      )}
      {state?.success && (
        <div className="justify-center text-green-500">{state.message}</div>
      )}
    </form>
  );
}
