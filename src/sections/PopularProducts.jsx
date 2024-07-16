import axios from 'axios';
import { frontendurl } from '../../url';
import PopularProductCard from '../components/PopularProductCard';
import { useState } from 'react';
import { useEffect } from 'react';
const PopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${frontendurl}/api/v5/allbuildings`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <section id="products"
       className="max-container max-sm:mt-8
       ">
        <div className="flex flex-col
        justify-start gap-5">
          <h2 className="text-4xl font-palanquin
          font-bold">Available 
          <span className="text-purple-800">Flats </span>
          </h2>
          <p2 className="lg:max-w-lg mt-2 
          font-montserrat text-black">Unlock exceptional property management with our premier rental services.Explore a world of convenience, expertise, and value in every lease.
          </p2>


        </div>
        <div className="flex mt-16 w-120 flex-row  flex-shrink-0 gap-4 py-2 overflow-x-auto 
        scrollbar-webkit scrollbar-thin
          ">
          {products.map((product)=>(
            <PopularProductCard key={product.name}
            {...product}/>
          ))}


        </div>

      </section>

    </div>
  )
}

export default PopularProducts