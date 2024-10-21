import "./MobileSideBar.css";
const MobileSideBar = () => {
  const sidebarLeft = [
    {name: "Laptop", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
    {name: "PC", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
    {name: "Gaming Gear", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
    {name: "Linh kiện", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
    {name: "Phụ kiện", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
  ];

  const logobuttons = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/icons/brands/brand-macbook-2.svg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/t/_/t_i_xu_ng_77_.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/l/e/lenovo_logo_2015.svg.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/icons/brands/brand-msi.svg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/a/c/acer-removebg-preview.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/b/r/brand-dell.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/d/e/dell_logo_1.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/2/5/2560px-lg_logo__2015_.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/masstel-mobile-logo022.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/MSI-1.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/icons/brands/brand-418.svg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/b/r/brand-intel.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/tmp/catalog/product/s/u/surface.png",
  ];

  const cost = [
    {name: "Dưới 10 triệu"},
    {name: "Từ 10 - 15 triệu"},
    {name: "Từ 15 - 20 triệu"},
    {name: "Từ 20 - 25 triệu"},
    {name: "Từ 25 - 30 triệu"},
  ];
  const Screen = [
    {name: "Dưới 13 inch"},
    {name: "13 - 15 inch"},
    {name: "Trên 15 inch"},
  ];

  const Configurations = [
    {name: "Intel Core i5"},
    {name: "INtel Core i7"},
    {name: "Intel Core i9"},
    {name: "Laptop Untra 5"},
    {name: "Laptop Untra 7"},
    {name: "Laptop Untra 9"},
    {name: "AMD Ryzen 5"},
    {name: "AMD Ryzen 7"},
  ];

  const demands = [
    {name: "Văn phòng", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sang_tao.png"},
    {name: "Gaming", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon_lapgaming.png"},
    {name: "Đồ họa- kỹ thuật", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon_lapgaming.png"},
    {name: "Sinh viên", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sang_tao.png"},
    {name: "Laptop AI", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/image_1069.png"},
    {name: "MacOS", img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/a/sang_tao.png"},
  ];

  return (
    <div className="ml-1 fixed top-[60px] bg-white h-[calc(100%-130px)] overflow-hidden w-full z-[100]">
      <div  className="block float-left h-full overflow-auto w-[80px]">
        {sidebarLeft.map((sidebar, index) => (
          <a key={index}
            className="flex flex-col items-center justify-center h-auto w-[80px] px-[5px] pb-[5px] relative no-underline border-b border-b-[#dbdbdb] text-[#4a4a4a] mb-[-1px] cursor-pointer laptop-link"
          >
            <img
              src={sidebar.img}
              className="h-[60px] object-contain" // Sử dụng object-fit
            />
            <p className="text-center">{sidebar.name}</p>
          </a>
        ))}
      </div>

      <div className="rounded-none float-left h-full overflow-y-auto p-2.5 w-[calc(100%-80px)] bg-white text-[#4a4a4a] block">
        <div className="flex justify-between">
          <a className="flex items-center justify-center text-[16px] font-bold leading-6 text-[#444] p-0 relative mb-[-1px] cursor-pointer">
            Laptop
          </a>
          <a className="flex items-center justify-center text-[16px] leading-6 text-[#444] p-0 relative mb-[-1px] cursor-pointer">
            Xem tất cả
          </a>
        </div>
        <div className="mt-1">
          <strong className="text-[#363636] font-bold">Thương hiệu</strong>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap m-0 overflow-x-auto px-[5px] pb-[10px] relative w-[calc(100%+200px)]">
              {logobuttons.map((logo, index) => (
                <div key={index}>
                  <div  className="h-full">
                    <div className="h-full flex ">
                      <a 
                        className="border border-[#d1d5db] rounded-[10px] h-auto mt-[5px] mr-[10px] mb-[5px] min-h-[39px] p-[5px] px-[10px] relative flex items-center text-[#4a4a4a] justify-center cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <img
                            className="mb-[3px] w-[50px] h-auto max-w-full h-[50px]"
                            src={logo}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-1">
          <strong className="text-[#363636] font-bold">Phân khúc giá</strong>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap m-0 overflow-x-auto px-[5px] pb-[10px] relative w-[calc(100%+200px)]">
              {cost.map((price, index) => (
                <div key={index}>
                  <div  className="h-full">
                    <div className="h-full flex">
                      <a className="border border-[#d1d5db] rounded-[10px] h-auto mt-[5px] mr-[10px] mb-[5px] min-h-[39px] p-[5px] px-[10px] relative flex items-center text-[#4a4a4a] justify-center cursor-pointer">
                        <div className=" flex flex-col items-center justify-center">
                          <span className="text-[12px] font-medium leading-none text-center whitespace-pre-wrap">{price.name}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-1">
          <strong className="text-[#363636] font-bold">Nhu cầu sử dụng</strong>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap m-0 overflow-x-auto px-[5px] pb-[10px] relative w-[calc(100%+200px)]">
            {demands.map((demand, index) => (
              <div key={index} >
                <div  className="h-full">
                  <div className="h-full flex">
                    <a className="flex border border-gray-300 rounded-[10px] h-auto min-h-[34px] m-[5px_10px_5px_0] p-[5px_10px] relative text-[#4a4a4a] justify-center cursor-pointe">
                      <div className="flex flex-col items-center justify-center">
                        <img 
                          className="mb-[3px] w-[50px] h-auto max-w-full"
                          src={demand.img}
                          loading="lazy"
                        />
                        <span className="w-[65px] text-[12px] font-medium leading-none text-center whitespace-pre-wrap">{demand.name}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <div className="mt-1">
          <strong className="text-[#363636] font-bold">Kích thước màn hình</strong>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap m-0 overflow-x-auto px-[5px] pb-[10px] relative w-[calc(100%+200px)]">
              {Screen.map((price, index) => (
                <div key={index}>
                  <div  className="h-full">
                    <div className="h-full flex">
                      <a className="border border-[#d1d5db] rounded-[10px] h-auto mt-[5px] mr-[10px] mb-[5px] min-h-[39px] p-[5px] px-[10px] relative flex items-center text-[#4a4a4a] justify-center cursor-pointer">
                        <div className=" flex flex-col items-center justify-center">
                          <span className="text-[12px] font-medium leading-none text-center whitespace-pre-wrap">{price.name}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-1">
          <strong className="text-[#363636] font-bold">Cấu hình</strong>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex flex-wrap m-0 overflow-x-auto px-[5px] pb-[10px] relative w-[calc(100%+200px)]">
              {Configurations.map((price, index) => (
                <div key={index}>
                  <div  className="h-full">
                    <div className="h-full flex">
                      <a className="border border-[#d1d5db] rounded-[10px] h-auto mt-[5px] mr-[10px] mb-[5px] min-h-[39px] p-[5px] px-[10px] relative flex items-center text-[#4a4a4a] justify-center cursor-pointer">
                        <div className=" flex flex-col items-center justify-center">
                          <span className="text-[12px] font-medium leading-none text-center whitespace-pre-wrap">{price.name}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSideBar;