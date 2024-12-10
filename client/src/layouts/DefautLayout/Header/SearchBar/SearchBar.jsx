/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import "./SearchBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { setSearchName } from "../../../../features/Client/ClientFilterSlice";

export default function SearchBar() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Hàm gọi API
  const fetchProducts = async (searchName) => {
    if (!searchName.trim()) {
      setProducts([]);
      return;
    }

    try {
      const response = await fetch(
        `https://laptech4k.onrender.com/api/v1/products/search?searchName=${encodeURIComponent(
          searchName
        )}`
      );
      const data = await response.json();

      if (data.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Sử dụng debounce cho API call
  const debouncedFetchProducts = useCallback(
    debounce((searchName) => {
      fetchProducts(searchName);
    }, 500), // 500ms debounce
    []
  );

  // Xử lý khi thay đổi input
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setShowList(true);
    dispatch(setSearchName(inputValue)); // Dispatch Redux action

    // Gọi hàm debounce
    debouncedFetchProducts(inputValue);
  };

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchName(search)); // Dispatch Redux action
    navigate(`/productList?searchName=${encodeURIComponent(search)}`);
  };

  return (
    <div className="search-container relative">
      <form
        onSubmit={handleSubmit}
        className="search-bar flex bg-white border-2 focus-within:border-blue-400 px-6 py-3 overflow-hidden w-96 rounded-md"
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full text-sm bg-transparent outline-none pr-2"
          value={search}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowList(false), 200)}
        />
        <button type="submit" className="ml-2 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="16px"
            className="cursor-pointer fill-gray-600"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
        </button>
      </form>
      {showList && (
        <div className="search-list absolute z-[80] w-96 rounded-lg top-full text-xs">
          {products?.length > 0 ? (
            <div className="overflow-y-auto rounded-lg max-h-[50vh] bg-gray-200">
              {products.slice(0, 5).map((product) => (
                <Link to={`/products/${product._id}`} key={product._id}>
                  <div className="flex px-4 py-2 hover:bg-white hover:cursor-pointer">
                    <img
                      className="w-12 h-12 mr-2 rounded-lg object-cover"
                      src={product.images[0]}
                      alt={product.name}
                    />
                    <div>{product.name}</div>
                  </div>
                </Link>
              ))}
              {products.length > 5 && (
                <div className="px-4 py-2 text-gray-600 justify-center text-center hover:cursor-pointer">
                  Xem thêm {products.length - 5} sản phẩm khác
                </div>
              )}
            </div>
          ) : (
            <div className="no-results bg-red-100 text-red-600 text-center p-4 rounded-lg">
              Không tìm thấy sản phẩm...
            </div>
          )}
        </div>
      )}
    </div>
  );
}