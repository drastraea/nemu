import prisma from '@/libs/db';
import { Item } from './_components/Item';

export default async function MyItem({ params }) {
    const { id } = await params;

    const item = await prisma.item.findUnique({
        where: { id },
        include: {
            images: true,
            asLostItem: true,
        }
    });

    if (!item) return <div>Item not found</div>;

    let matchItem = null;
    const foundItemId = item.asLostItem[0]?.foundItemId;

    if (foundItemId) {
        matchItem = await prisma.item.findUnique({
            where: { id: foundItemId },
            include: { images: true }
        });
    }

    return <Item item={item} match={matchItem} />;
}
