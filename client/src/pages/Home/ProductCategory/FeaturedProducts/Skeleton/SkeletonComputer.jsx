import { Skeleton } from "@mui/material";
import "./Skeleton.css";

const SkeletonComputer = () => {
  // Tạo một mảng các Skeleton để hiển thị tối đa 10 khung
  const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className="flex flex-wrap gap-x-[2px] content-start bg-[#f6f6f6] py-[2px]">
      {skeletonItems.map((_, index) => (
        <div key={index} className="bg-white mb-[2px] product h-auto w-full sm:w-[calc(20%-2px)]">
          <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
            <a
              className="no-underline text-inherit cursor-pointer block h-full flex flex-col justify-between"
            >
              <div className="relative mb-2">
                <div className="relative mb-1">
                  <div className="relative pb-[100%]">
                    <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain flex justify-center items-center">
                    <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "157.95px",
                          height: "175.5px",
                          display: "block",
                          position: "relative",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to right, transparent, #ffffff70, transparent)",
                          animation: "reflect 800ms ease-out infinite",
                          height: "100%",
                          width: "100px",
                          left: "-100px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-1">
                <Skeleton
                    variant="text"
                    sx={{
                      width: "80%",
                      height: 40,
                      position: "relative", // Để áp dụng hiệu ứng gradient
                    }}
                  />
                  {/* Tạo hiệu ứng gradient cho text */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, #ffffff70, transparent)",
                      animation: "reflect 800ms ease-out infinite",
                      height: "100%",
                      width: "100px",
                      left: "-100px",
                    }}
                  />
                </div>
              </div>
              <div className="h-10"></div>
              <div className="relative mt-1 mb-1 pr-0">
              <Skeleton
                  variant="text"
                  sx={{
                    width: "60%",
                    height: 24,
                    position: "relative", // Để áp dụng hiệu ứng gradient
                  }}
                />
                {/* Tạo hiệu ứng gradient cho text */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #ffffff70, transparent)",
                    animation: "reflect 800ms ease-out infinite",
                    height: "100%",
                    width: "100px",
                    left: "-100px",
                  }}
                />
              </div>
            </a>
            <button
              type="button"
              className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none w-full text-[rgb(20,53,195)] cursor-pointer transition-colors duration-80"
            >
              <div className="m-0 p-0 border-none opacity-100 text-[rgb(20,53,195)] font-medium text-[13px] leading-[20px]">
                Xem chi tiết
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComputer;
