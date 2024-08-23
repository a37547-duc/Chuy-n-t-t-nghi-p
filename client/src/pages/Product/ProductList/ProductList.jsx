import { useState, useEffect } from 'react';

export default function ProductList() {
    const [brandOptions, setBrandOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const [sizeOptions, setSizeOptions] = useState([]);
    const [configOptions, setConfigOptions] = useState([]);
    const [showMoreBrands, setShowMoreBrands] = useState(false);
    const [showMoreColors, setShowMoreColors] = useState(false);
    const [showMoreSizes, setShowMoreSizes] = useState(false);
    const [showMoreConfigs, setShowMoreConfigs] = useState(false);

    // Giả lập gọi API để lấy các tùy chọn lọc
    useEffect(() => {
        // Thay thế bằng các gọi API thật
        setBrandOptions(['ASUS', 'Dell', 'HP', 'Lenovo', 'Apple', 'Acer']);
        setColorOptions(['Đỏ', 'Xanh', 'Xanh lá', 'Đen', 'Trắng']);
        setSizeOptions(['13 inch', '14 inch', '15 inch', '17 inch']);
        setConfigOptions(['8GB RAM', '16GB RAM', '32GB RAM', '64GB RAM']);
    }, []);

    const renderOptions = (options, showMore, setShowMore) => {
        const displayOptions = showMore ? options : options.slice(0, 4);
        return (
            <div className="px-2">
                <div className="grid grid-cols-2 gap-2">
                    {displayOptions.map((option, index) => (
                        <label key={index} className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            {option}
                        </label>
                    ))}
                </div>
                {options.length > 4 && (
                    <button 
                        className="text-blue-500 text-sm mt-2" 
                        onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Thu gọn' : 'Xem thêm'}
                    </button>
                )}
            </div>
        );
    };
  return (
    <div className="bg-[#F5F5F5]">
        <div className="flex justify-center mx-auto">
            <div className="flex w-full max-w-[1100px] h-420px flex-nowrap my-6 p-6 ">
                <div className="w-[20%] flex-shrink-0 pl-[5px] bg-white rounded">
                    <div className="px-2">
                    <div className="space-y-4">
            <div>
                <h3 className="font-bold text-lg">Thương hiệu</h3>
                {renderOptions(brandOptions, showMoreBrands, setShowMoreBrands)}
            </div>
            <div>
                <h3 className="font-bold text-lg">Màu sắc</h3>
                {renderOptions(colorOptions, showMoreColors, setShowMoreColors)}
            </div>
            <div>
                <h3 className="font-bold text-lg">Kích thước</h3>
                {renderOptions(sizeOptions, showMoreSizes, setShowMoreSizes)}
            </div>
            <div>
                <h3 className="font-bold text-lg">Cấu hình</h3>
                {renderOptions(configOptions, showMoreConfigs, setShowMoreConfigs)}
            </div>
        </div>
                    </div>
                </div>

                <div className="w-[80%] flex-grow min-w-0 h-full overflow-hidden mx-[10px] bg-white rounded">
                    Alo
                </div>
            </div>
        </div>
    </div>
  );
}
