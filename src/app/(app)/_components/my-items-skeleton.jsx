import { Button } from '@heroui/react'
import Link from 'next/link'

export const MyLostItemSkeleton = () => {
  return (
    <section>
      <h3 className="text-xl font-medium">Lost Items</h3>
      <div className="grid grid-cols-1 space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex space-x-3 animate-pulse">
            <div className="h-[150px] w-[200px] bg-gray-300 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
              <div className="h-10 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
