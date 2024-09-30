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
  "https://lh3.googleusercontent.com/dupfTD9OKdjV88iSqg7DQcbBMxVAB9_bo1QSmp0-me7EKKTOTRyP25AA0WpZG_pvJmfrkfrEI_D0yT5G5bR2LTT6WpESH-df=rw"
];

export default function LogonButton() {
  return (
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
  );
}