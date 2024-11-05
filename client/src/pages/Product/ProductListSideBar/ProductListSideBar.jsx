import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import { useGetBrandByNameQuery } from "../../../stores/query/productQuery";

import { useDispatch, useSelector } from "react-redux";
import { setBrand } from "../../../stores/slices/producSlice";

const ProductListSideBar = () => {
  const [options, setOptions] = useState([
    { title: "Thương hiệu", data: [], expanded: true, showMoreClicked: false },
    { title: "Màu sắc", data: [], expanded: true, showMoreClicked: false },
    { title: "Kích thước", data: [], expanded: true, showMoreClicked: false },
    { title: "Cấu hình", data: [], expanded: true, showMoreClicked: false },
  ]);

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.query);
  const {
    data: products,
    error,
    isLoading,
  } = useGetBrandByNameQuery({ category });

  // Cập nhật options dựa trên dữ liệu từ API
  useEffect(() => {
    if (products?.brands) {
      setOptions((prevOptions) =>
        prevOptions.map((option) => {
          if (option.title === "Thương hiệu") {
            return { ...option, data: products.brands };
          }
          return option;
        })
      );
    }
  }, [products]);

  const handleToggleExpand = (title) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.title === title
          ? { ...option, expanded: !option.expanded }
          : option
      )
    );
  };

  const handleShowMore = (title) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.title === title ? { ...option, showMoreClicked: true } : option
      )
    );
  };

  const handleClick = (value) => {
    dispatch(setBrand(value));
  };

  const renderOptions = (data, expanded, showMoreClicked, title) => {
    if (!expanded) return null;

    const visibleOptions = showMoreClicked ? data : data.slice(0, 4);

    return (
      <div className="px-2 mt-3">
        <div className="flex flex-col overflow-hidden gap-1">
          {visibleOptions.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                onClick={() => handleClick(option.name)}
                type="checkbox"
                className="mr-2"
              />
              {option.name}
            </label>
          ))}
        </div>
        {!showMoreClicked && data.length > 4 && (
          <div className="mt-2">
            <button
              className="text-blue-500 text-sm"
              onClick={() => handleShowMore(title)}
            >
              Xem thêm...
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-2 bg-white">
      <div className="p-3 flex flex-col text-[13px]">
        {options.map((option, index) => (
          <div key={index} className="box-border">
            <div
              className="flex items-center h-6 select-none justify-between cursor-pointer"
              onClick={() => handleToggleExpand(option.title)}
            >
              <div className="overflow-hidden font-bold leading-6">
                {option.title}
              </div>
              <FontAwesomeIcon
                className={`transition duration-200 ml-auto ${
                  option.expanded ? "rotate-180" : ""
                }`}
                icon={faChevronDown}
              />
            </div>
            {renderOptions(
              option.data,
              option.expanded,
              option.showMoreClicked,
              option.title
            )}
            {index < options.length - 1 && (
              <div className="py-3">
                <div className="dashs border-t border-dashed border-[#E4E5F0] w-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSideBar;