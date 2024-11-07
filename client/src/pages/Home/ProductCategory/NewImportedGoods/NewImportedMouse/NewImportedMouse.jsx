import { useState, useEffect } from "react";
import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";

const NewImportedMouse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://laptech4k.onrender.com/api/v1/products', {credentials: "include"})
      .then(response => response.json())
      .then(data => {
        const formattedProducts = data.mice.map(product => {
          // Kiểm tra nếu product_variants tồn tại và có giá
          const price = product.product_variants ? product.product_variants.price : null;
          return {
            ...product,
            price: price // Nếu không có giá, sẽ là null
          };
        });
        setProducts(formattedProducts); // Sử dụng data[0].mice để lấy dữ liệu chuột
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-[10px] w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
      <div className="relative min-h-[416px] bg-blue-900">
        <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
              Chuột mới nhập
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
        {console.log(products)}
      </div>
    </div>
  );
}

export default NewImportedMouse;
