'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import BillboardCarousel from "@/components/carousels/billboardcarousel";
import ShopHeader from "@/components/helper/shop/shop-header";
import Image from "next/image";
import { Red_Hat_Display } from "next/font/google";
import { cn } from "@/lib/utils";
import FeaturedProduct from "@/components/helper/product/featuredproduct";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import StarRating from "@/components/helper/star-rating";
import { useRouter } from "next/navigation";
interface Billboard {
    imageUrl: string | null;
}
interface Color {
    id: string;
    name: string;
    hexValue: string | null;
}
interface Product {
    id:string;
    name: string;
    imageUrl: string[];
    supplier: string;
    discountPer: number;
    originalprice: number;
    ratings: number;
    noRating: number;
    colors: Color[];
}

interface SubcategoryWithProducts {
    subcategoryName: string;
    productfromSubcategory: Product[]; // Adjusted to match the server response
}

const font2 = Red_Hat_Display({ subsets: ["latin"], weight: ["900"] });

const Shop = () => {
    const Router=useRouter();
    const [billboardsImageUrls, setBillboardsImageUrls] = useState<string[]>([]);
    const [subcategories, setSubcategories] = useState<SubcategoryWithProducts[]>([]);
    const [filterProducts,setFilteredProducts]=useState<SubcategoryWithProducts[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([0, 10000]);
    const [selectedRatings,setSelectedRatings]=useState<number[]>([]);
    const [selectedSubcategories,setSelectedSubcategories]=useState<string[]>([]);
    const [selectedColours,setSelectedColours]=useState<string[]>([]);
    useEffect(() => {
        const fetchBillboards = async () => {
            try {
                const { data } = await axios.get('/api/randombillboard');
                const { Billboards }: { Billboards: Billboard[] } = data;
                if (Billboards) {
                    const imageUrls = Billboards
                        .map(billboard => billboard.imageUrl)
                        .filter((url): url is string => url !== null);
                    setBillboardsImageUrls(imageUrls);
                }
            } catch (error) {
                console.error("Error fetching billboards:", error);
            }
        };

        const fetchSubcategoriesWithProducts = async () => {
            try {
                const { data } = await axios.get('/api/productsubcat');
                setSubcategories(data.subcategories);
                setFilteredProducts(data.subcategories);
            } catch (error) {
                console.error("Error fetching subcategories with products:", error);
            }
        };

        fetchBillboards();
        fetchSubcategoriesWithProducts();
    }, []);
    useEffect(()=>{
        const applyFilters=()=>{
            const filtered=subcategories.map(subcategory=>{
                const filteredProducts=subcategory.productfromSubcategory.filter(product=>{
                    const matchesRatings=selectedRatings.length===0||selectedRatings.includes(product.ratings);
                    const discountedPrice = product.originalprice - (product.originalprice * product.discountPer / 100);
                    const matchesPrice=discountedPrice>=selectedPriceRange[0]&&discountedPrice<=selectedPriceRange[1];
                    const matchesSubcategories=selectedSubcategories.length===0||selectedSubcategories.includes(subcategory.subcategoryName);
                    const matchesColors = selectedColours.length === 0 || product.colors.some(color => selectedColours.includes(color.name));
                    return matchesRatings&&matchesPrice&&matchesSubcategories&&matchesColors;
                });
        return {
            ...subcategory,
            productfromSubcategory: filteredProducts
        };
    });
    setFilteredProducts(filtered);
    }
    applyFilters();
    },[selectedRatings,selectedColours,selectedPriceRange,selectedSubcategories,subcategories]);

    return (
        <div className=" flex flex-col">
            <ShopHeader />
            <div className="bg-custom2 flex flex-row justify-between items-center">
                <div>
                    <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-outline text-white text-8xl font-semibold font-zodiak">
                        Find Awesome Products
                    </span>
                </div>
                <div>
                    <div className="relative z-10 h-[400px] w-[300px]">
                        <Image src="/images/st1.png" alt="" fill objectFit="contain" />
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-cyan-300 to-emerald-300 flex items-center justify-center">
                <div className="p-2 m-2 text-7xl font-black font-chillax text-yellow-300 text-stroke">
                    Trending Billboards
                </div>
            </div>
            <BillboardCarousel imageUrls={billboardsImageUrls} />
            <div className="bg-gradient-to-r from-pink-500 via-white to-pink-500 flex items-center justify-center">
                <div className={cn("p-2 m-2 text-8xl font-black text-stroke2", font2.className)}>
                    Explore
                </div>
            </div>
            <div className=" bg-test flex flex-row gap-x-2">
                <div className=" w-1/4 h-full">
                    <div className=" p-4  bg-glassmorphic flex flex-col gap-y-4 items-center justify-center">
                        <div className="text-3xl font-extrabold">
                                Filter By
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className="text-2xl font-bold">
                                    Star Ratings
                                </div>
                                {[5,4,3,2,1,0].map(rating=>(
                                    <div className=" flex items-center justify-center"key={rating}>
                                        <Input type="checkbox" checked={selectedRatings.includes(rating)} onChange={()=>setSelectedRatings(prev=>prev.includes(rating)?prev.filter(r=>r!==rating):[...prev,rating])} />
                                        <Label className=" text-xl ml-2 px-2 font-semibold ">{rating} and above</Label> <StarRating rating={rating}/>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className="text-2xl font-bold">
                                    Price
                                </div>
                                <Slider  step={10} min={0} max={10000} value={selectedPriceRange} onValueChange={setSelectedPriceRange}/>
                                <div className="text-l">Price Range {selectedPriceRange[0]}-{selectedPriceRange[1]}</div>
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className="text-2xl font-bold">
                                    Subcategories
                                </div>
                            {subcategories.map((subcategory:SubcategoryWithProducts)=>(
                                <div  className="flex items-center justify-center"key={subcategory.subcategoryName}>
                                    <Input type="checkbox" checked={selectedSubcategories.includes(subcategory.subcategoryName)} 
                                    onChange={()=>setSelectedSubcategories(prev=>prev.includes(subcategory.subcategoryName)?prev.filter(sc=>sc!=subcategory.subcategoryName):[...prev,subcategory.subcategoryName])} />
                                    <Label className="ml-2 text-xl font-semibold">{subcategory.subcategoryName}</Label>
                                </div>
                            ))}
                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className="text-2xl font-bold">
                                    Colours
                                </div>
                            {subcategories.flatMap(subcategory => subcategory.productfromSubcategory.flatMap(product => product.colors))
                                    .filter((color, index, self) => self.findIndex(c => c.name === color.name) === index)
                                    .map(color => (
                                        <div className="flex items-center justify-center" key={color.name}>
                                            <Input
                                                type="checkbox"
                                                checked={selectedColours.includes(color.name)}
                                                onChange={() => setSelectedColours(prev =>
                                                    prev.includes(color.name)
                                                        ? prev.filter(c => c !== color.name)
                                                        : [...prev, color.name]
                                                )}
                                            />
                                        <div key={color.id} className="w-5 h-5 rounded-full" style={{ backgroundColor: color.hexValue || "#000" }}></div>
                                        </div>
                                    ))}                        
                            </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-8 space-y-4">
                    {filterProducts.map((subcategory, index) => (
                        <div key={index} className="flex flex-col space-y-4 items-center">
                            <h2 className="text-8xl font-extrabold py-4 gap-y-4 font-bespokesans text-emerald-400 text-stroke3"> Our Latest {subcategory.subcategoryName}s</h2>
                            <div className="flex flex-wrap justify-center gap-4">
                                {subcategory.productfromSubcategory.map((product, index) => (
                                    <FeaturedProduct
                                        onClick={()=>Router.push(`/shop/product/${product.id}`)}
                                        key={index}
                                        name={product.name}
                                        images={product.imageUrl}
                                        supplier={product.supplier}
                                        discountPer={product.discountPer}
                                        originalprice={product.originalprice}
                                        ratings={product.ratings}
                                        noofratings={product.noRating}
                                        colors={product.colors}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Shop;
