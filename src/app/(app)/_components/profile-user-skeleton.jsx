import { DateIcon } from "@/components/ui/icons"
import Avatar from "boring-avatars"

export const ProfileUserSkeleton = () => {
  return (
    <section className="text-left text-balance space-y-6 animate-pulse">
      <div className="flex justify-start items-center space-x-4">
        <div className="w-[96px] h-[96px] bg-gray-300 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-8 w-40 bg-gray-300 rounded"></div>
          <div className="flex items-center space-x-2">
            <DateIcon className="text-gray-400" />
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}