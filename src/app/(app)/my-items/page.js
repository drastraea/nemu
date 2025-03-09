import Avatar from "boring-avatars";
import Image from "next/image";
import { ProfileUser } from "../_components/profile-user";
import { MyLostItem } from "../_components/my-lost-item";

export default function Page() {
  return (
    <div className="max-w-lg m-auto py-2 px-6 flex flex-col min-h-[88vh] ">
      <ProfileUser />
      <div className="border border-b-1 my-4" />
      <MyLostItem />
    </div>
  );
}
