"use client";
import { useActionState } from "react";
import { Button, DateInput, Input, Select, SelectItem } from "@heroui/react";
import { createFoundItem } from "../action";

export const categories = [
  { key: "electronic", label: "Electronic" },
  { key: "clothing", label: "Clothing" },
  { key: "accessories", label: "Accessories" },
  { key: "other", label: "Others" },
];

export default function FoundForm() {
  const [state, formAction, pending] = useActionState(createFoundItem, null);

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

      <DateInput
        label="Timeframe"
        name="timeframe"
        variant="border"
        className="rounded-lg"
        required
      />

      <Input
        label="Location"
        placeholder="Location"
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
      />

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
