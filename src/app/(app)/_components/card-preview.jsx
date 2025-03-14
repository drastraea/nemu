import { ImageIcon } from '@/components/ui/icons'
import { Card, CardBody, CardHeader } from '@heroui/react'
import Image from 'next/image'

export const CardPreview = ({ preview }) => {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardHeader className="justify-center">
          <h2 className="text-2xl font-semibold text-center">Preview Image</h2>
        </CardHeader>
        <CardBody>
          {preview ? (
            <div className="h-[490px] w-[480px] overflow-hidden">
              <Image
                src={preview}
                alt="Uploaded Preview"
                width={300}
                height={480}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <div className="h-[322px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center text-gray-400">
                <ImageIcon />
                <p>Upload an image to see preview</p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
