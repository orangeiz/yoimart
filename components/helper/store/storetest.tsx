// app/store/[id]/page.tsx

import { getStore } from "@/actions/getStore";

interface Store {
    id: string;
    name: string;
    type: "food" | "shop" | null;
    products: unknown[] | null;
    ownerId: string;
    billboards: unknown[] | null;
    payments: unknown[] | null;
    createdAt: Date;
    updatedAt: Date;
}

interface StoreTestProps {
    id: string;
}

const StoreTest = async ({ id }: StoreTestProps) => {
    const store: Store | null = await getStore(id);

    return (
        <div>
            {store ? (
                <div className="flex flex-col gap-y-2">
                    <div className="text-6xl font-black text-custom1">{store.name}</div>
                    <div className="text-4xl font-semibold text-fuchsia-400">{store.type}</div>
                </div>
            ) : (
                <p>Store not found.</p>
            )}
        </div>
    );
};

export default StoreTest;
