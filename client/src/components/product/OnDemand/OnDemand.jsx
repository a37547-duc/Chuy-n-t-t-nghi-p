/* eslint-disable react/prop-types */

const OnDemand = ({ choose }) => {
  return (
    <div className="border-none border border-transparent opacity-100 mt-3 mb-1">
        <h2 className="m-0 text-lg leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          Laptop theo nhu cầu
        </h2>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="overflow-hidden opacity-100 h-auto mt-2 flex flex-wrap gap-2 justify-start items-center w-[calc(100%+50px)] md:w-full">
            {choose.map((chose, index) => (
              <a key={index} className="opacity-100 text-black no-underline hover:text-blue-700 hover:cursor-pointer">
                <div className="rounded-md border border-gray-300 opacity-100 w-[88px] h-[125px] p-1 flex flex-col gap-0 justify-start items-center">
                  <div className="relative inline-block overflow-hidden h-[72px] w-[72px]">
                    <img
                      src={chose.image}
                      className="w-[72px] h-[72px] object-contain absolute top-0 left-0"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="flex flex-grow items-center">
                    <div className="mt-1 opacity-100 text-inherit font-normal text-[13px] leading-[24px] overflow-hidden flex-grow flex items-center transition-colors duration-300 text-center">
                      {chose.name}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
  );
}

export default OnDemand;