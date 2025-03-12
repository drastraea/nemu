import Image from 'next/image'

export const AboutSection = () => {
  return (
    <section className="py-20 text-black">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Nemu</h2>
            <p className="text-lg text-gray-500 mb-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
              fugiat qui possimus corporis officia voluptate animi, laborum
              consequatur temporibus illo esse voluptas tenetur quia vitae
              velit, quaerat sed repellat ad?
            </p>
            <p className="text-lg text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
              iure repellendus exercitationem nihil possimus nemo ducimus
              voluptatum rerum! Non vitae hic laudantium illum ratione corporis
              incidunt eos minima, cupiditate tempore!
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
