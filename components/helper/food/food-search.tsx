'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { UseModal } from "@/components/hooks/use-modal-store";
import Image from "next/image";

const FoodSearch = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [deliveryFoods, setDeliveryFoods] = useState([]);
  const [totalItemsOnCurrentPage, setTotalItemsOnCurrentPage] = useState(0);
  const { onOpen } = UseModal();

  useEffect(() => {
    const fetchDeliveryFoods = async () => {
      try {
        const response = await axios.get("/api/deliveryfoodwithpage", {
          params: { title: searchTitle, page },
        });
        setDeliveryFoods(response.data.deliveryfoods);
        setTotalItemsOnCurrentPage(response.data.deliveryfoods.length); // Set to the number of items in current page
      } catch (error) {
        console.error("Error fetching delivery foods:", error);
      }
    };

    fetchDeliveryFoods();
  }, [searchTitle, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="py-2 bg-white px-4 mx-4 border-2 group rounded-lg border-custom5 flex flex-row gap-x-2 items-center justify-center h-10 w-150">
        <Search className="text-pink-600 group-hover:text-blue-500" height={20} width={20} />
        <input
          type="text"
          value={searchTitle}
          onChange={handleSearchChange}
          placeholder="Search for food..."
          className="bg-transparent text-pink-600 font-bold outline-none placeholder-pink-400"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {deliveryFoods.map((food: any) => (
          <div
            key={food.id}
            className=" p-4 h-[300px] w-[700px] cursor-pointer"
            onClick={() => onOpen("showFood", { DeliveryFood: food, Category: food?.category })}
          >
            <div className="flex flex-col gap-y-2 border-4  border-custom5 hover:border-custom1">
              <div className="flex flex-row  gap-x-2 justify-evenly p-5 items-center">
                <div className="relative h-[200px] w-[200px]">
                  <Image className="border-3 rounded-full bg-custom7 border-custom7 object-cover group-hover:border-custom4" fill src={food.imageUrl[0] as string} alt=''/>
                </div>
              <div className="flex flex-col gap-y-2 items-center">
                <div className="p-2 text-3xl font-satoshi font-extrabold text-custom4 ">
                  {food?.name}
                </div>
                <div className="p-2 text-xl font-satoshi font-extrabold text-custom5 ">
                  {food?.restaurant?.name}
                </div>
              </div>
            </div>
          <div className=" p-2 text-xl font-bold font-satoshi text-custom5">
            {food.description}
            </div>
        </div>
      </div>
        ))}
        {deliveryFoods.length==0&&(
          <div className="text-2xl  text-center font-satoshi font-bold text-custom4">
             No Results Found
          </div>
      )}
      </div>

      <Pagination
        className="py-6"
        currentPage={page}
        itemsPerPage={15}
        totalItemsOnCurrentPage={totalItemsOnCurrentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default FoodSearch;
