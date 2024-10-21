import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ProductListSideBar = () => {
  const [options, setOptions] = useState([
    { title: 'Thương hiệu', data: [], expanded: true, showMoreClicked: false },
    { title: 'Màu sắc', data: [], expanded: true, showMoreClicked: false },
    { title: 'Kích thước', data: [], expanded: true, showMoreClicked: false },
    { title: 'Cấu hình', data: [], expanded: true, showMoreClicked: false },
  ]);

  useEffect(() => {
    setOptions(prevOptions => prevOptions.map(option => {
      switch (option.title) {
        case 'Thương hiệu':
          return { ...option, data: ['ASUS', 'Dell', 'HP', 'Lenovo', 'Apple', 'Acer'] };
        case 'Màu sắc':
          return { ...option, data: ['Đỏ', 'Xanh', 'Xanh lá', 'Đen', 'Trắng'] };
        case 'Kích thước':
          return { ...option, data: ['13 inch', '14 inch', '15 inch', '17 inch'] };
        case 'Cấu hình':
          return { ...option, data: ['8GB RAM', '16GB RAM', '32GB RAM', '64GB RAM'] };
        default:
          return option;
      }
    }));
  }, []);

  // Sử lý mở rộng
  const handleToggleExpand = (title) => {
    setOptions(prevOptions =>
      prevOptions.map(option => option.title === title ? { ...option, expanded: !option.expanded } : option
      )
    );
  };

  // Sử lý xem thêm
  const handleShowMore = (title) => {
    setOptions(prevOptions =>
      prevOptions.map(option => option.title === title ? { ...option, showMoreClicked: true } : option
      )
    );
  };

    // Sử lý các tùy chọn
  const renderOptions = (data, expanded, showMoreClicked, title) => {
    if (!expanded) {
      return null;
    }

    const visibleOptions = showMoreClicked ? data : data.slice(0, 4);

    return (
      <div className="px-2 mt-3">
        <div className="flex flex-col overflow-hidden gap-1">
          {visibleOptions.map((option, index) => (
            <label key={index} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {option}
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
          <div key={index} className='box-border'>
            <div
              className='flex items-center h-6 select-none justify-between cursor-pointer'
              onClick={() => handleToggleExpand(option.title)}
            >
              <div className="overflow-hidden font-bold leading-6">{option.title}</div>
              <FontAwesomeIcon
                className={`transition duration-200 ml-auto ${option.expanded ? 'rotate-180' : ''}`}
                icon={faChevronDown}
              />
            </div>

            {renderOptions(option.data, option.expanded, option.showMoreClicked, option.title)}
            {index < options.length - 1 && (
              <div className='py-3'>
                <div className='dashs border-t border-dashed border-[#E4E5F0] w-full'></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

};

export default ProductListSideBar;