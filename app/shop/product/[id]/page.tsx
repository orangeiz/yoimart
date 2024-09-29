'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import StarRating from '@/components/helper/star-rating';
import { Button } from '@/components/ui/button';
import { ChevronDown, Heart, ShoppingBag, Truck } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ShopProductProps {
  params: {
    id: string;
  };
}

const ShopProduct: React.FC<ShopProductProps> = ({ params }: ShopProductProps) => {
  const { id } = params;
  const [productData, setProductData] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetails,setIsDetails]=useState<boolean>(false);
  const [isReviews,setIsReviews]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const openDetails=()=>{
    setIsReviews(false);
    setIsDetails(true);
  }
  const openReviews=()=>{
    setIsReviews(true);
    setIsDetails(false);
  }
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/shopproduct/${id}`);
        setProductData(response.data);
        setSelectedImage(response.data.product.imageUrl[0]);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Product not found or internal error.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { product, category, colours, sizes, genders, reviews } = productData;
  const discountedPrice = product.originalprice - (product.originalprice * product.discountPer / 100);

  return (
    <div className="flex flex-row justify-evenly  m-5 p-5">
      <div className='flex flex-col m-5 p-5 space-y-2'>
        <div className="relative z-10 w-[520px] h-[520px]">
          <Image src={selectedImage as string} alt="" fill className='object-cover border-transparent border-5 rounded-2xl bg-custom3 hover:border-custom1 transition-all'/> 
        </div>
        <div className="flex flex-row gap-x-2">
          {product.imageUrl.map((image:any, index:any) => (
            <div
              key={index}
              className=" relative z-10 w-[144px] h-[144px]"
              onClick={() => setSelectedImage(image)}
              >
               <Image src={image as string} alt={`Thumbnail ${index}`} fill className=" py-2 object-cover border-transparent border-4 rounded-2xl bg-custom3 hover:border-custom1 transition-all"/>
            </div>
          ))}
        </div>
        <div className='flex flex-row gap-x-2'>
          <Button className='h-[64px] w-[200px] group flex flex-row gap-x-2 bg-custom5 border-5 border-transparent hover:border-custom2' onClick={openDetails}>
            <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
              Details
            </div>
            <ChevronDown size={30} className='text-custom3 group-hover:text-emerald-400' />
          </Button>
          <Button className='h-[64px] w-[200px] group flex flex-row gap-x-2 bg-custom5 border-5 border-transparent hover:border-custom2' onClick={openReviews}>
            <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
              Reviews
            </div>
            <ChevronDown size={30} className='text-custom3 group-hover:text-emerald-400' />
          </Button>
        </div>
        {isReviews&&(
          <div>
            <div className=' flex flex-col items-center  gap-y-5 border-4 bg-custom3'>
              <div className='flex flex-row  items-center justify-center gap-x-2'>
                <div className='relative z-10 h-[64px] w-[64px]'>
                  <Image src="/images/test5.jpg" alt="" fill className=' border-2 rounded-full object-cover'/>
                </div>
                <div className='text-xl font-satoshi font-bold text-custom4'>
                  Anita Bajpai
                </div>
                <div className='text-l font-satoshi font-bold text-custom4'>
                  22/07/2019
                </div>
                <StarRating rating={3}></StarRating>
              </div>
              <div className='text-xl font-bold text-custom4  font-satoshi'>
                This is an amazing product
              </div>
            </div>
            <div className='p-2 '>
              Write a review
            </div>
            <div className='flex flex-row gap-x-2'>
              <Textarea/>
              <div className='text-xl font-satoshi font-bold text-custom4'>
                Give A Rating
              </div>
              <Button className='h-[64px] w-[200px] group flex flex-row gap-x-2 bg-custom5 border-5 border-transparent hover:border-custom2' onClick={()=>{}}>
                <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
                Submit
              </div>
               </Button>
            </div>
          </div>
        )}
        {isDetails&&(
          <div className='flex flex-col gap-y-2'>
            <div className='text-xl font-bold font-satoshi text-custom4'>
              Category
              <div className='text-l font-semibold font-satoshi text-custom5'>
                {category?.name}
              </div>
            </div>
            <div className='text-xl font-bold font-satoshi text-custom4'>
              Subcategory
              <div className='text-l font-semibold font-satoshi text-custom5'>
                {product.subcategory?.name}
              </div>
            </div>
            <div className='text-xl font-bold font-satoshi text-custom4'>
              Description
              <div className='text-l font-semibold font-satoshi text-custom5'>
                {product.description}
              </div>
            </div>
            <div className='text-xl font-bold font-satoshi text-custom4'>
              Genders
            {genders.map((gender:any) => (
              <div key={gender.id} className='text-l font-semibold font-satoshi text-custom5'>
                {gender.name}
              </div>
            ))}            
          </div>
          <div className='text-xl font-bold font-satoshi text-custom4'>
              Occasion
            {product.occasion.map((eachoccasion:any) => (
              <div key={eachoccasion.id} className='text-l font-semibold font-satoshi text-custom5'>
                {eachoccasion}
              </div>
            ))}            
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-x-2'>
              <div className='text-xl font-bold font-satoshi text-custom4'>
                Cash on Delivery
              </div>
              <Truck className='text-custom4 ' size={40}/>     
            </div>
            <div  className='text-xl font-semibold font-satoshi text-custom5'>
            {product.COD?'Available':'Not Available'}              
            </div>
            </div>
            <div className='text-xl font-bold font-satoshi text-custom4'>
              Rated for 
              <div className='text-l font-semibold font-satoshi text-custom5'>
                {product.agerated}+
              </div>
            </div>
           <div>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-start p-5 m-5 gap-y-5  '>
          <div className='gap-y-2'>
            <div className='text-xl font-satoshi font-medium text-custom4'>
              {product.supplier}
            </div>
            <div className='text-7xl font-satoshi font-black text-custom4 '>
              {product.name}
            </div>
          </div>
          <div className='gap-y-2'>
            <div className='flex flex-row items-center gap-x-2 '>
            <StarRating rating={product.ratings}/>
            <div className='text-xl font-satoshi font-medium text-custom4'> 
              {product.noRating} Ratings
            </div>
            </div>
            <div className='flex flex-row gap-x-1 items-center"'>
              <div className="font-bold text-5xl font-satoshi text-red-600 line-through">
                    {product.originalprice}₹
                </div>
                <div className="font-semibold text-5xl text-black">
                    {discountedPrice.toFixed(2)}₹
                </div>
                <span className="font-bold text-2xl font-satoshi text-orange-500">
                    {product.discountPer}% Off
                </span>
            </div>
          </div>
          <div className='gap-y-2'>
            <div className='text-4xl font-satoshi font-bold text-custom4'>
              Colours
            </div>
            <div className='flex flex-row gap-x-2 items-center'>
              {colours.map((colour:any) => (
                <div
                  key={colour.id}
                  style={{backgroundColor: colour.hexValue || 'transparent', padding: '1 rem', margin: '0.4rem',width:'2.5rem',height:'2.5rem',borderRadius: '50%' }}
                >
                
                </div>
              ))}
          </div>
        </div>
        <div className='gap-y-2'>
            <div className='text-4xl font-satoshi font-bold text-custom4'>
              Size
            </div>
            <div className='flex flex-row gap-x-2 items-center'>
              {sizes.map((size:any) => (
                <div
                  key={size.id}
                  className='border-2 gap-x-2 h-[80px] w-[80px] rounded-lg bg-custom3 border-transparent hover:border-custom1 flex  items-center justify-center'
                >
                <div className='font-semibold font-satoshi text-custom4 text-2xl'>
                  {size.name}
                </div>
                </div>
              ))}
          </div>
        </div>
        <div className='flex flex-row  items-center gap-x-4'>
          <Button className='h-[128px] w-[400px] group flex flex-row gap-x-2 bg-custom4 border-5 border-transparent hover:border-custom2' onClick={()=>{}}>
            <div className='font-bold  font-satoshi  text-3xl group-hover:text-emerald-400 text-custom3'>
              Add to Cart
            </div>
            <ShoppingBag size={30} className='text-custom3 group-hover:text-emerald-400' />
          </Button>
          <div className='relative'>
            <Heart 
              className='text-custom4 hover:text-red-500' 
              size={60} 
            />
            <Heart 
              className='absolute top-0 left-0 text-red-500 opacity-0 hover:opacity-100' 
              size={60} 
              fill='currentColor' 
            />
        </div>
        </div>
      </div>
    </div>
   
  );
};

export default ShopProduct;
