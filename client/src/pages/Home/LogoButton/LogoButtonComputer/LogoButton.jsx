import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { setBrandName } from "../../../../features/Client/ClientFilterSlice";
import { getAllBrandsClient } from "../../../../features/Client/ClientBrandSlice";
import { Skeleton } from "@mui/material";

export default function LogonButtonComputer() {
  const dispatch = useDispatch();
  const { data: logos, loading} = useSelector((state) => state.clientBrand);

  useEffect(() => {
    dispatch(getAllBrandsClient());
  }, [dispatch]);

  const handleProductClick = (brandName) => {
    dispatch(setBrandName(brandName));
  };

  return (
    <div className="">
      <div className="max-w-[1100px] mx-auto">
        <div>
          <h2 className="text-[24px] font-bold my-[20px] mx-[10px]">Laptop - Máy tính xách tay</h2>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {loading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="p-2 border rounded-md bg-white shadow-md flex-grow"
                  style={{ flexBasis: "calc(12.5% - 1rem)", minWidth: "120px" }}
                >
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={20}
                    animation="wave"
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          ) : (
            logos.map((logo, index) => (
              <Link
                key={index}
                to={{
                  pathname: "/productList",
                  search: `?brandName=${logo.name}`,
                }}
                // `/productList?brandName=${logo.name}`
                state={{ from: "LogoButton" }}
                onClick={() => handleProductClick(logo.name)}
                className="flex-shrink-0 p-2 border rounded-md bg-white shadow-md hover:shadow-lg max-w-[120px] max-h-[38.49px]"
                // style={{ flexBasis: "calc(25% - 0.5rem)" }}
              >
                <img src={logo.image} alt={logo.name} className="w-full" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
