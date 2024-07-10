import { getStore } from "@/actions/getStore";
import BlueButton from "@/components/helper/bluebutton";
import { Plus } from "lucide-react";
import Image from "next/image";

interface StoreDashboardProps {
    params: {
        id: string;
    };
}

const StoreDashboard: React.FC<StoreDashboardProps> = async ({ params }: StoreDashboardProps) => {
    const { id } = params;
    const store = await getStore(id);

    return (
        <div>
            {store ? (
                <div className="flex flex-col gap-y-2">
                    <div className="text-6xl font-black text-custom1">{store.name}</div>
                    <div className="text-4xl font-semibold text-fuchsia-400">{store.type}</div>
                    {store.billboards && store.billboards.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-2xl font-semibold">Billboards:</h2>
                            <ul>
                                {store.billboards.map((billboard) => (
                                    <li key={billboard.id}>
                                        {billboard.imageUrl && (
                                            <Image src={billboard.imageUrl} alt={billboard.name} width={192} height={192} className="object-cover" />
                                        )}
                                        <p className="mt-2">{billboard.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>Store not found.</p>
            )}
        </div>
    );
};

export default StoreDashboard;