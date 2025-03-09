import { auth } from '@/libs/auth'
import prisma from '@/libs/db'
import Avatar from 'boring-avatars'
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
      <div className="grid grid-cols-1">
        {lostItems.map((item) => {
          return (
            <div className="flex space-x-3" key={item.id}>
              <div className="w-32 h-32">
                {item.images.length > 0 ? (
                  <img
                    alt={item.name}
                    src={`https://pub-4a28b0907aff4bb4a7bc257eaa71091d.r2.dev/nemu/${item.id}/${item.images[0].url}`}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                ) : (
                  <div className=" bg-slate-300 rounded-lg"></div>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <div className="flex space-x-2">
                  <Avatar
                    size={24}
                    name={session.user.email}
                    variant="beam"
                    colors={[
                      '#92A1C6',
                      '#146A7C',
                      '#F0AB3D',
                      '#C271B4',
                      '#C20D90',
                    ]}
                  />
                  <div>
                    <h3>By {session.user.name}</h3>
                  </div>
                </div>
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
