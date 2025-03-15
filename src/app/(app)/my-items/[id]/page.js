import prisma from "@/libs/db";
import { Item } from "./_components/Item";

export default async function MyItem({ params }) {
  const session = await auth();
  if (!session) redirect("/login")

  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      images: true,
      asLostItem: true,
    },
  });

  if (!item) return <div>Item not found</div>;

  const match = await prisma.match.findFirst({
    where: {
      lostItemId: item.id,
      status: "PENDING",
    },
    include: {
      foundItem: {
        select: {
          id: true,
          name: true,
          images: true,
          timeframe: true,
          location: true,
        },
      },
    },
  });

  return <Item item={item} match={match} />;
}
