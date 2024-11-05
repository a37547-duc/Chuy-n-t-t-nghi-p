/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
const ComputerFeatured = ({ currentProducts }) => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate("/products", { state: { product } }); // Chuyển hướng và truyền dữ liệu sản phẩm
  };
  return (
    <div className="flex flex-wrap gap-x-[2px] content-start bg-[#f6f6f6] py-[2px]">
      {currentProducts.map((product, index) => (
        <div key={index} className="bg-white mb-[2px] product">
          <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
            <a 
              className="no-underline text-transparent cursor-pointer block"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative mb-2">
                <div className="relative mb-1">
                  <div className="relative pb-[100%]">
                    <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain flex justify-center items-center">
                      <img 
                        className="w-[90%] h-full object-contain transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        alt={product.name}
                        src={product.images[0]}
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0">
                    <div 
                      className="h-9 leading-3 flex flex-col justify-center 
                                bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA5NiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiAvPgogIDxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQwIj4KICAgIDxyZWN0IHdpZHRoPSI5NiIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IndoaXRlIiAvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI21hc2swKSI+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjMiCiAgICAgIGQ9Ik07NC4yNDQ2IC05LjAyODY5TDY1Ljg3NjcgOC45MTYyMUw3MC43NzA4IDExLjE5ODNMNjMuOTI0NCAyNS44ODA1TDg0LjQ3MjQgMTEuNjI5M0w3Ny45NDcgOC41ODY0Mkw5MC41NTgxIC0xLjQyMTU2TDc0LjI0NDYgLTkuMDI4NjlaIgogICAgICBmaWxsPSIjMUIxRDI5IiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjM1LjcyMDkiIHkxPSIxLjY2NTQ0ZS0wNiIgeDI9IjU3Ljg4ODYiIHkyPSI0MC4wODczIgogICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBQTIwRkYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQxM0VGRiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4=')] 
                                bg-cover bg-no-repeat p-1 px-2 rounded-sm"
                    >
                      <div className="text-[10px] font-bold text-[#FFD591] uppercase">
                        tiết kiệm
                      </div>
                      <div className="text-[13px] leading-[18px] font-bold text-white">
                        {product.save} đ
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="uppercase inline m-0 p-0 border-none opacity-100 text-[#82869e] font-medium no-underline text-[13px] leading-[20px] overflow-hidden line-clamp-1 transition-colors duration-300">
                    {product.name}
                  </div>
                </div>
                <div className="h-12">
                  <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(67,70,87)] font-normal no-underline text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300 line-clamp-3">
                    <h3 title={product.description} className="text-[0.75rem] font-normal leading-[1rem] inline">
                      {product.description}
                    </h3>
                  </div>
                </div>
                <div className="relative mt-1 mb-1 pr-0">
                  <div className="flex flex-col items-start h-10">
                    <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-bold no-underline text-[15px] leading-[24px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                      {product.price} đ
                    </div>
                    <div className="flex h-4">
                      <div className="m-0 mb-0 mr-1 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(130,134,158)] font-normal text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300 line-through">
                        {product.oldPrice} đ
                      </div>
                      <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-normal no-underline text-[12px] leading-[16px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                        -{product.discount}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <button 
              type="button" 
              className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none min-w-[2rem] text-[rgb(20,53,195)] w-full cursor-pointer transition-colors duration-80"
            >
              <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-medium no-underline text-[13px] leading-[20px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                Thêm vào giỏ
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ComputerFeatured;