"use client"
import { useActionState, useState } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { createLostItem } from "../action";

export default function LostForm() {
    const [state, formAction, pending] = useActionState(createLostItem, null);
    const [session, setSession] = useState(null);
    const [isDelayed, setIsDelayed] = useState(false);

    return (
        <form action={formAction} className="flex flex-col gap-4 p-4 max-w-md mx-auto">

            <Input label="Item Name" placeholder="Item Name" name="name" variant="border" className="rounded-lg" required
            />

            <Select label="Category" placeholder="Select Category" name="category" variant="border" className="rounded-lg">
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
            </Select>

            <Input label="Timeframe" placeholder="Timeframe" name="timeframe" variant="border" className="rounded-lg" required
            />

            <Input label="Location" placeholder="Location" name="location" variant="border" className="rounded-lg" required
            />

            <Input label="File" type="file" name="file" variant="border" className="rounded-lg" />

            <Button isLoading={pending} type="submit">Submit</Button>
        </form>
    );
}
