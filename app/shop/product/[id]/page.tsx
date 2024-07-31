import { getProduct } from "@/actions/getProduct";

interface ShopProductProps {
    params: {
      id: string;
    };
  }
  
const ShopProduct = async ({params}:ShopProductProps) => {
    const {id}=params;
    const product=getProduct(id);
    return ( 
        <div>
        

        </div>  
    );
}
 
export default ShopProduct;