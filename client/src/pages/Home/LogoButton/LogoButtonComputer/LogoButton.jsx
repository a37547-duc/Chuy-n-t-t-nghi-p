const logos = [
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Lenovo.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/MSI.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/acer.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Dell.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/LG.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/masstel-mobile-logo022.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/MSI-1.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Huawei.png",
  "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:90/plain/https://cellphones.com.vn/media/icons/brands/brand-macbook-2.svg"
];

export default function LogonButtonComputer() {
  return (
    <div className="">
      <div className="max-w-[1100px] mx-auto">
        <div>
          <h2 className="text-[24px] font-bold my-[20px] mx-[10px]">Laptop - Máy tính xách tay</h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {logos.map((logo, index) => (
            <button
              key={index}
              className="flex-shrink-0 p-2 border rounded-md bg-white shadow-md hover:shadow-lg max-w-[120px]"
              style={{ flexBasis: 'calc(25% - 0.5rem)'}}
            >
              <img src={logo} alt={`Logo ${index + 1}`} className="w-full" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}