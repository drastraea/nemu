import prisma from "@/libs/db";
import { Item } from "./_components/Item";
import { auth } from "@/libs/auth";
import { getMatchAndVerifyFoundItem } from "../../_actions/matchAction";
import { ItemFounded } from "./_components/item-founded";

export default async function MyItem({ params }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      images: true,
      asLostItem: true,
    },
  });

  if (!item) return <div>Item not found</div>;

  const match = await getMatchAndVerifyFoundItem(item.id);
  console.log(match);

  if (match?.status === "CONFIRMED") {
    return <ItemFounded item={item} match={match} />;
  }

  return <Item item={item} match={match} />;
}
