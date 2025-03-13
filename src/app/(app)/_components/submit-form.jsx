"use client";
import { useActionState, useState } from "react";
import {
  addToast,
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { imageProcessingAction, submitItemAction } from "./submit-form-action";
import Image from "next/image";

export const categories = [
  { key: "electronic", label: "Electronic" },
  { key: "clothing", label: "Clothing" },
  { key: "accessories", label: "Accessories" },
  { key: "other", label: "Others" },
];

export default function SubmitForm({ type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formEvent = e.currentTarget;
    const formData = new FormData(formEvent);
    setIsLoading(true);
    const resultItem = await submitItemAction(formData);
    if (!resultItem.success) {
      addToast({
        title: "Failed insert item",
        description: resultItem.message,
        color: "danger",
      });
      setIsLoading(false);
      return;
    }

    const imageProcessing = await imageProcessingAction(
      resultItem.data.item,
      resultItem.data.imageUrl
    );
    setIsLoading(false);
    if (!imageProcessing.success) {
      addToast({
        title: "Failed processing image",
        description: resultItem.message,
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Success processing image",
      description: imageProcessing.message,
      color: "success",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
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
      <Input name="type" type="hidden" defaultValue={type} hidden />

      {preview && (
        <Image
          src={preview}
          alt="Upload Photo Preview"
          width={400}
          height={400}
          className="object-cover rounded-lg"
        />
      )}

      <Button isLoading={isLoading} type="submit">
        Submit
      </Button>
    </form>
  );
}
