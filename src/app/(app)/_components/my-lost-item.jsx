import { auth } from '@/libs/auth'
import prisma from '@/libs/db'
import moment from 'moment'

export const MyLostItem = async () => {
  const session = await auth()

  const lostItems = await prisma.item.findMany({
    where: {
      userId: session.user.id,
      type: 'LOST',
    },
    include: {
      images: true,
    },
  })

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-medium">Lost Items</h3>
      <div className="grid grid-cols-1 space-y-6">
        {lostItems.map((item) => {
          return (
            <div className="flex space-x-3" key={item.id}>
              <div className="relative h-[150px] w-[200px] overflow-hidden">
                {item.images.length > 0 ? (
                  <img
                    alt={item.name}
                    src={`${process.env.R2_S3_DEV_URL}/${item.id}/${item.images[0].url}`}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className=" bg-slate-300 rounded-lg"></div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p>
                  {moment(item.timeframe).format('DD MMMM YYYY')} -{' '}
                  {item.location}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
