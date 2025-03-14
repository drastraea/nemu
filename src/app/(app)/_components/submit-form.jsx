'use client'

import { useState } from 'react'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from '@heroui/react'
import { imageProcessingAction, submitItemAction } from './submit-form-action'

export const categories = [
  { key: 'electronic', label: 'Electronic' },
  { key: 'clothing', label: 'Clothing' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'other', label: 'Others' },
]

export default function SubmitForm({ type, onFileChange, onSubmitSuccess }) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const formEvent = e.currentTarget
    const formData = new FormData(formEvent)
    setIsLoading(true)
    const resultItem = await submitItemAction(formData)
    if (!resultItem.success) {
      addToast({
        title: 'Failed insert item',
        description: resultItem.message,
        color: 'danger',
      })
      setIsLoading(false)
      return
    }

    const imageProcessing = await imageProcessingAction(
      resultItem.data.item,
      resultItem.data.imageUrl
    )
    setIsLoading(false)
    if (!imageProcessing.success) {
      addToast({
        title: 'Failed processing image',
        description: resultItem.message,
        color: 'danger',
      })
      return
    }

    addToast({
      title: 'Success processing image',
      description: imageProcessing.message,
      color: 'success',
    })

    formEvent.reset()

    if (onSubmitSuccess) {
      onSubmitSuccess()
    }
  }

  return (
    <Card className="p-4">
      <CardHeader className="justify-center">
        <h2 className="text-2xl font-semibold text-center ">
          Submit {type} Item
        </h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={onSubmit} className="space-y-10">
          <Input
            label="Item Name"
            labelPlacement="outside"
            placeholder="Item Name"
            name="name"
            variant="faded"
            className="rounded-lg"
            required
          />

          <Select
            label="Category"
            labelPlacement="outside"
            placeholder="Select Category"
            name="category"
            variant="faded"
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
            labelPlacement="outside"
            name="timeframe"
            variant="faded"
            className="rounded-lg"
            required
          />

          <Input
            label="Location"
            labelPlacement="outside"
            placeholder="Place, City"
            name="location"
            variant="faded"
            className="rounded-lg"
            required
          />

          <Input
            label="File"
            labelPlacement="outside"
            type="file"
            name="file"
            variant="faded"
            className="rounded-lg"
            accept="image/*"
            onChange={onFileChange}
          />

          <Input name="type" type="hidden" defaultValue={type} hidden />

          <Button
            isLoading={isLoading}
            fullWidth
            type="submit"
            className="bg-black text-white text-lg"
          >
            Submit
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
