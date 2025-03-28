import { ProfileUser } from "../_components/profile-user";
import { MyLostItem } from "../_components/my-lost-item";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { MyLostItemSkeleton } from "../_components/my-items-skeleton";
import { ProfileUserSkeleton } from "../_components/profile-user-skeleton";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login")
  return (
    <div className="max-w-lg m-auto py-6 px-6 flex flex-col min-h-[88vh] ">
      <Suspense fallback={<ProfileUserSkeleton />}>
        <ProfileUser />
      </Suspense>
      <div className="border border-b-1 my-4" />
      <Suspense fallback={<MyLostItemSkeleton />}>
        <MyLostItem />
      </Suspense>
    </div>
  );
}
