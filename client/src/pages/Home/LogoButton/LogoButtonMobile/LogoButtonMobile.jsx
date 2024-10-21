const LogonButtonMobile = () => {
  const imgLogoButton = [
    {name: "Laptop", img: "https://lh3.googleusercontent.com/7ltR_x7umrC6a4IYEKTvsQXLAF5mQnwQhU-ClYdGyGoAqaB_zXwtn145dYrep47ZAoF8IJlz4yocnYC9dEZWPH618r4SFxiJ=rw"},
    {name: "PC", img: "https://lh3.googleusercontent.com/uU75o6AxF-5MaV5ZggOHQUB0QDw-vIjh5_dlhaMGf-PuAZqup1qc_vzKmy7HMoIHymGQk2Yx9kD0igId_n6GNG5lANT0hiW2=rw"},
    {name: "Màn hình", img: "https://lh3.googleusercontent.com/7JFLUTP034xnsnQIEVTxWM_IsiXHX56Y1kDiLl3ndQPNxqzEdTxUceIpxP4SbAojql0ZdTIIbiXH5mXRY8E5-uoCRlW187JK=rw"},
    {name: "Linh kiện", img: "https://lh3.googleusercontent.com/Qw_Mr70GSpZtMN941dodaSHxVpY5hXlSRx7NK9PgYZNb8cvfUbRQCRjf9pPop9VG1KQAUfEdXL7__17Rg7OXRqh0BNaluVrs=rw"},
    {name: "Phụ kiện", img: "https://lh3.googleusercontent.com/UHhDaYzu59_hQlfPzC-y1WEPAZ_4sg4ny6Ng5Vyk9eKfUQT-9ussEBOQ4jbs4k3LWKAVTpoL2perBqVrcXPXvIBkz9oziHLc0Q=rw"},
    {name: "Gaming Gear", img: "https://lh3.googleusercontent.com/vsgxI-WztI-Y52hZ4r4hQrv9qZI06s27CZ5YEfU7DWg32ddZ5dogLrArpfPQ-rxJvnkaOq32__HArL39lu9GLBwCjQXefLI=rw"},
  ];
  return (
    <div className="mt-4 px-3 w-full mx-auto border-none opacity-100 w-full mb-6">
      <div className="bg-white rounded-md">
        <div className="relative flex justify-between items-center px-4 h-[56px] bg-transparent">
          <div className="m-0 p-0 border-none opacity-100 text-[rgb(27,29,41)] font-bold text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
            Danh mục
          </div>
        </div>
        <div className="flex flex-wrap justify-start px-4 pt-2 pb-6 text-center gap-4">
        {imgLogoButton.map((logo, index) => (
          <div key={index} className="text-center flex-none w-[30%] md:w-[20%] lg:w-[15%] border border-gray-300 rounded-md p-2 shadow hover:shadow-lg transition-shadow duration-200">
            <a className="block cursor-pointer">
              <div className="relative inline-block overflow-hidden h-[56px] w-[56px]">
                <img
                  className="w-full h-[56px] object-cover"
                  src={logo.img}
                  loading="lazy"
                  decoding="async"
                  alt={logo.name}
                />
              </div>
              <div className="mt-2 p-0 border-none opacity-100 text-inherit font-normal text-[15px] leading-[24px] overflow-hidden transition-colors duration-300">
                {logo.name}
              </div>
            </a>
          </div>
        ))}
          
        </div>
      </div>
    </div>
  );
}

export default LogonButtonMobile;