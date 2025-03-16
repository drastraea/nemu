import Image from 'next/image'

export const AboutSection = () => {
  return (
    <section className="py-20 text-black">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Nemu</h2>
            <p className="text-lg text-gray-500 mb-6">
              Nemu is an innovative platform designed to bridge the gap between those who lose items and those who find them. With advanced AI technology, Nemu makes the lost and found process seamless, reducing manual search efforts, and improving item recovery rates. The platform employs sophisticated matching algorithms that analyze descriptions, photos, and location data to efficiently connect lost items with their rightful owners.
            </p>
          </div>
          <div className="relative h-[400px] w-[600px] overflow-hidden">
            <Image
              src="/images/about-image.png"
              alt="picture of ai"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
