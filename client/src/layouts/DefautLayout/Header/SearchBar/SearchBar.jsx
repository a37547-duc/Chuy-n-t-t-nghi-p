import React, { useEffect, useState } from "react";
import './SearchBar.css';

// Convert data
function convertDataToUnsigned(string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://66b9caecfa763ff550f9873b.mockapi.io/products/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="search-container relative">
      <div className='search-bar flex bg-white border-2 focus-within:border-gray-500 px-6 py-3 overflow-hidden w-96 ml-40'>
        <input 
          type='text' 
          placeholder='Tìm kiếm...' 
          className='w-full text-sm bg-transparent outline-none pr-2'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowList(true);
            setDataSearch(
              products.filter((data) =>
                convertDataToUnsigned(data.name).includes(
                  convertDataToUnsigned(e.target.value)
                )
              )
            );
          }}
          onBlur={() => setTimeout(() => setShowList(false), 200)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
            className="cursor-pointer fill-gray-600">
            <path
            d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
        </svg>
      </div>
      {showList && (
        <div className="search-list absolute z-[80] w-96 rounded-lg top-full ml-40">
          {dataSearch?.length > 0 ? (
            <div className="overflow-y-auto rounded-lg h-[50vh] bg-white">
              {dataSearch.slice(0, 5).map((i) => (
                <div
                  key={i.id}
                  className="hover:cursor-pointer"
                >
                  <div className="flex px-4 py-2 hover:bg-gray-200">
                    <img
                      className="w-12 h-12 mr-2"
                      src={i.image}
                    />
                    <div>{i?.name}</div>
                  </div>
                </div>
              ))}
              {dataSearch.length > 5 && (
                <div className="px-4 py-2 text-gray-600 justify-center text-center">
                  Xem thêm {dataSearch.length - 5} sản phẩm khác
                </div>
              )}
            </div>
          ) : (
            <div className="no-results bg-red-200">Không tìm thấy sản phẩm</div>
          )}
        </div>
      )}
    </div>
  );
}