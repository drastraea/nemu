import { DateIcon } from '@/components/ui/icons'
import { auth } from '@/libs/auth'
import prisma from '@/libs/db'
import Avatar from 'boring-avatars'
import moment from 'moment'

export const ProfileUser = async () => {
  const session = await auth()

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      createdAt: true,
      items: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  })

  const lostLength =
    user?.items.filter((item) => item.type === 'LOST').length || 0
  const foundLength =
    user?.items.filter((item) => item.type === 'FOUND').length || 0

  return (
    <section className="text-left text-balance space-y-6">
      <div className="flex justify-start items-center space-x-4">
        <Avatar
          size={96}
          name={session.user.name}
          variant="beam"
          colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
        />
        <div className="space-y-1">
          <h3 className="text-3xl font-semibold">{user.name}</h3>
          <div className="flex items-center space-x-2">
            <DateIcon />
            <div>Joined {moment(user.createdAt).format('MMMM YYYY')}</div>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <span className="font-semibold">{lostLength}</span> Lost Item
            </div>
            <div>
              <span className="font-semibold">{foundLength}</span> Found Item
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
