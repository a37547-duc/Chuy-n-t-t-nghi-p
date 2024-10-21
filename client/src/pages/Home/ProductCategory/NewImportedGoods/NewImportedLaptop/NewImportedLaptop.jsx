import { useState, useEffect } from "react";
import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";

const NewImportedLaptop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://laptech4k.onrender.com/api/v1/products?category=laptop')
      .then(response => response.json())
      .then(data => {
        setProducts(data[0].laptops); // Sử dụng data[0].laptops để lấy dữ liệu laptop
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-[10px] w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
      <div className="relative min-h-[416px]">
        <img 
          alt="Laptop" 
          src="https://lh3.googleusercontent.com/YsnUSV-cp1QsV45kHixsKnXz6KH4fZVL3_VydiZS-xAUIWZsjnKStrfIZVzWS7m3-6kwTfIgugbETtsfIsFQVprA4lkb7dI=w123"
          className="w-full h-full absolute top-0"
        />
        <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
              laptop mới nhập
            </div>
          </a>
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="cursor-pointer text-white box-border flex items-center text-[14px]">
              Xem tất cả
              <PiCaretRight className="w-[1em] h-[1em]" />
            </div>
          </a>
        </div>
        <NewImportedProducts data={products} itemsPerPage={window.innerWidth > 540 ? 5 : 2} />
      </div>
    </div>
  );
}

export default NewImportedLaptop;
