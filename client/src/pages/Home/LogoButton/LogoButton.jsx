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
];

export default function LogonButton() {
  return (
    <div className=" w-10/12  ">
      <h2 className="text-[24px] font-bold ">Laptop - Máy tính xách tay</h2>

      <div className="">
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap w-full justify-between">
            {logos.slice(0, -1).map((logo, index) => (
              <button
                key={index}
                className="p-2 border border-blue-500 rounded-md bg-white shadow-md hover:shadow-lg flex-shrink-0 w-[calc(25%-0.5rem)] max-w-[120px]"
              >
                <img src={logo} alt={`Logo ${index + 1}`} className="w-full" />
              </button>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <button
              key={logos.length - 1}
              className="p-2 border rounded-md bg-white shadow-md hover:shadow-lg flex-shrink-0 w-[calc(25%-0.5rem)] max-w-[120px]"
            >
              <img
                src={logos[logos.length - 1]}
                alt={`Logo ${logos.length}`}
                className="w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
