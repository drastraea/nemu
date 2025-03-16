import { ArrowIcon, UploadIconRounded } from '@/components/ui/icons'
import { Button } from '@heroui/react'
import Link from 'next/link'

export const HeroSection = () => {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="px-6 mx-auto text-center relative z-10 max-w-7xl">
        <h1 className="text-6xl font-bold tracking-tight mb-6">
          Track Down What's Lost,
          <br />
          <span className="bg-gradient-to-r from-blue-950 to-blue-600 bg-clip-text text-transparent">
            Powered by AI
          </span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          Nemu leverages AI to make the lost and found process seamless, reducing manual search efforts and improving item recovery rates.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            as={Link}
            href="/lost-item"
            size="lg"
            radius="full"
            className="gap-2 bg-black hover:bg-black/90 text-white px-8 py-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            endContent={<ArrowIcon />}
          >
            Report Lost Item
          </Button>
          <Button
            as={Link}
            href="/found-item"
            size="lg"
            radius="full"
            className="gap-2 bg-white px-8 py-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 border border-default-500"
            endContent={<UploadIconRounded />}
          >
            Report Found Item
          </Button>
        </div>
      </div>
    </section>
  )
}
