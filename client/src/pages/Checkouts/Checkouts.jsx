import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {submitOrderPayment, submitOrderCod} from "../../features/order/orderSlice";
import { Link } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { items, totalAmount } = location.state || { items: [], totalAmount: 0 };
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [choosedProvince, setChoosedProvince] = useState('');
  const [choosedDistrict, setChoosedDistrict] = useState('');
  const [choosedWard, setChoosededWard] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    phone: "",
    delivery: "",
    payment: "",
  });

  

  console.log(formData)

  const [errors, setErrors] = useState({});

  // Gọi API để lấy danh sách tỉnh/thành phố
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(response => response.json())
      .then(data => setProvinces(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Gọi API để lấy danh sách quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then(response => response.json())
        .then(data => setDistricts(data.districts))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedProvince]);

  // Gọi API để lấy danh sách xã/phường khi chọn quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(response => response.json())
        .then(data => setWards(data.wards))
        .catch(error => console.error('Error:', error));
    }
  }, [selectedDistrict]);

  // Hàm handleInputChange để cập nhật dữ liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm validateForm để kiểm tra dữ liệu trước khi submit
  const validateForm = () => {
    const newErrors = {};

    if (formData.email.trim() === "") {
      newErrors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không đúng định dạng";
      }
    }

    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Họ và tên không được để trống";
    }

    if (formData.address.trim() === "") {
      newErrors.address = "Địa chỉ không được để trống";
    }

    if (!formData.province) {
      newErrors.province = "Vui lòng chọn Tỉnh / Thành phố";
    }

    if (!formData.district) {
      newErrors.district = "Vui lòng chọn Quận / Huyện";
    }

    if (!formData.ward) {
      newErrors.ward = "Vui lòng chọn Xã / Phường";
    }

    if (formData.phone.trim() === "") {
      newErrors.phone = "Số điện thoại không được để trống";
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Số điện thoại không đúng định dạng";
      }
    }
    if (!formData.payment) {
      newErrors.payment = "Vui lòng chọn phương thức thanh toán";
    }

    return newErrors;

  };

  // Hàm handleSubmit để xử lý khi người dùng nhấn "Đặt hàng"
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      email: formData.email,
      products: items.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
      })),
      totalAmount: totalAmount,
      shippingInfo: {
        fullName: formData.fullName,
        phone: formData.phone,
        district: formData.district,
        city: formData.province,
        ward: formData.ward,
        address: formData.address
      },
      paymentMethod: formData.payment, 
    }

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (formData.payment === "MoMo") {
      dispatch(submitOrderPayment(orderData))
        .then((result) => {
          console.log("Đặt hàng thành công qua MoMo", result);
        })
        .catch((error) => {
          console.error("Lỗi khi đặt hàng qua MoMo:", error);
        });
    } else if (formData.payment === "Thanh toán khi nhận hàng") {
      dispatch(submitOrderCod(orderData))
        .then((result) => {
          console.log("Đặt hàng thành công với thanh toán khi nhận hàng", result);
        })
        .catch((error) => {
          console.error("Lỗi khi đặt hàng với thanh toán khi nhận hàng:", error);
        });
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-screen-lg p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Thông tin liên hệ và giao hàng */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Thông tin liên hệ</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Địa chỉ email"
                className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Vui lòng nhập họ tên người nhận"
                    className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ chi tiết (căn hộ, số phòng, v.v...)"
                className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md mt-4"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1">
                  <select
                    name="province"
                    className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
                    value={choosedProvince}
                    onChange={(e) => {
                      const data = e.target.value;
                      const value = JSON.parse(e.target.value);
                      setChoosedProvince(data);
                      setSelectedProvince(value.code);
                      setFormData((prevData) => ({ ...prevData, province: value.name }));
                      setSelectedDistrict(''); 
                      setWards([]);
                    }}
                  >
                    <option value="">Chọn Tỉnh / Thành phố</option>
                    {provinces.map(province => (
                      <option key={province.code} value={JSON.stringify({ code: province.code, name: province.name })}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
                </div>

                <div className="flex-1">
                  <select
                    name="district"
                    className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
                    value={choosedDistrict}
                    onChange={(e) => {
                      const data = e.target.value;
                      const value = JSON.parse(e.target.value);
                      setChoosedDistrict(data)
                      setSelectedDistrict(value.code);
                      setFormData((prevData) => ({ ...prevData, district: value.name }));
                      setSelectedWard('');
                    }}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn Quận / Huyện</option>
                    {districts.map(district => (
                      <option key={district.code} value={JSON.stringify({ code: district.code, name: district.name })}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                </div>

                <div className="flex-1">
                  <select
                    name="ward"
                    className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
                    value={choosedWard}
                    onChange={(e) => {
                      const data = e.target.value;;
                      const value = JSON.parse(e.target.value);
                      setChoosededWard(data)
                      setSelectedWard(value.code);
                      setFormData((prevData) => ({ ...prevData, ward: value.name }));
                    }}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Chọn Xã / Phường</option>
                    {wards.map(ward => (
                      <option key={ward.code} value={JSON.stringify({code: ward.code, name: ward.name })}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  {errors.ward && <p className="text-red-500 text-sm">{errors.ward}</p>}
                </div>
              </div>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Số điện thoại"
                className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md mt-4"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
              <select
                name="payment"
                className="w-full p-2 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
                value={formData.payment}
                onChange={handleInputChange}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="MoMo">Thanh toán qua MoMo</option>
                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
              </select>
              {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow rounded-lg">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
                <Link to="/cart">
                  <span className="text-xs text-blue-700">Chỉnh sửa</span>
                </Link>

              </div>

              <div className="space-y-4">
                {items.map(item => (
                  <div key={item._id} className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-xs font-semibold text-gray-500">{formatNumber(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <span className="">Tổng cộng: </span>
                <span className="font-semibold">{formatNumber(totalAmount)}</span>
              </div>
            </div>

            <button type="submit" 
              onClick={handleSubmit}
              className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;