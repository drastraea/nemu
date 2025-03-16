import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_R2_S3_DEV_URL;

export const ItemFounded = ({ item, match }) => {
  const { foundItem } = match;
  const score = match?.score * 100 || 0;
  return (
    <div className="w-1/2 mx-auto flex flex-col py-12">
      <div className="flex flex-col">
        <div className="text-xl">
          Your item already found by{" "}
          <span className="font-semibold">{foundItem.user.name}</span>
        </div>
        <div>
          With matching scrore: <strong>{score}%</strong>
        </div>
        <div>
          Contact:{" "}
          <Link href={`mailto:foundItem.user.email`} className="font-semibold">
            {foundItem.user.email}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="flex flex-col justify-between py-3 items-center border rounded-xl gap-3">
            <div>
              Your item <strong>{item.name}</strong>
            </div>
            <img
              src={`${BASE_URL}/${item.id}/${item.images[0].url}`}
              alt={item.name}
              className="size-72 object-bottom object-cover"
            />
          </div>
          <div className="flex flex-col justify-between py-3 items-center border rounded-xl gap-3">
            <div>
              {foundItem.user.name} <strong>{foundItem.name}</strong>
            </div>
            <img
              src={`${BASE_URL}/${foundItem.id}/${foundItem.images[0].url}`}
              alt={foundItem.name}
              className="size-72 object-bottom object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
