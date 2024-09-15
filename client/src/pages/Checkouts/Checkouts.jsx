import React, { useState, useEffect } from 'react';

function Checkout() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    province: "",
    district: "",
    ward: "",
    phone: "",
    delivery: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});

  // Dữ liệu mock cho sản phẩm trong tóm tắt đơn hàng
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Laptop Dell Inspiron 15',
      color: 'Màu đen',
      price: 800.00,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Apple MacBook Air',
      color: 'Màu bạc',
      price: 1200.00,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/50',
    },
  ]);

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

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "Tên không được để trống";
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Họ không được để trống";
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

    if (!formData.delivery) {
      newErrors.delivery = "Vui lòng chọn phương thức giao hàng";
    }

    if (!formData.payment) {
      newErrors.payment = "Vui lòng chọn phương thức thanh toán";
    }

    return newErrors;
  };

  // Hàm handleSubmit để xử lý khi người dùng nhấn "Đặt hàng"
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // Xử lý tiếp tục khi dữ liệu hợp lệ, ví dụ như gọi API đặt hàng
    console.log("Dữ liệu hợp lệ, xử lý đặt hàng:", formData);
  };

  // Tính tổng tiền đơn hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
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
                className="w-full p-2 border rounded-md"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Thông tin giao hàng</h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Tên"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Họ"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Địa chỉ chi tiết (căn hộ, số phòng, v.v...)"
                className="w-full p-2 border rounded-md mt-4"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex-1">
                  <select
                    name="province"
                    className="w-full p-2 border rounded-md"
                    value={selectedProvince}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedProvince(value);
                      setFormData((prevData) => ({ ...prevData, province: value }));
                      setSelectedDistrict(''); 
                      setWards([]);
                    }}
                  >
                    <option value="">Chọn Tỉnh / Thành phố</option>
                    {provinces.map(province => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
                </div>

                <div className="flex-1">
                  <select
                    name="district"
                    className="w-full p-2 border rounded-md"
                    value={selectedDistrict}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedDistrict(value);
                      setFormData((prevData) => ({ ...prevData, district: value }));
                      setSelectedWard('');
                    }}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn Quận / Huyện</option>
                    {districts.map(district => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                </div>

                <div className="flex-1">
                  <select
                    name="ward"
                    className="w-full p-2 border rounded-md"
                    value={selectedWard}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedWard(value);
                      setFormData((prevData) => ({ ...prevData, ward: value }));
                    }}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Chọn Xã / Phường</option>
                    {wards.map(ward => (
                      <option key={ward.code} value={ward.code}>
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
                className="w-full p-2 border rounded-md mt-4"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Phương thức giao hàng</h2>
              <select
                name="delivery"
                className="w-full p-2 border rounded-md"
                value={formData.delivery}
                onChange={handleInputChange}
              >
                <option value="">Chọn phương thức giao hàng</option>
                <option value="standard">Giao hàng tiêu chuẩn</option>
                <option value="express">Giao hàng nhanh</option>
              </select>
              {errors.delivery && <p className="text-red-500 text-sm">{errors.delivery}</p>}
            </div>

            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
              <select
                name="payment"
                className="w-full p-2 border rounded-md"
                value={formData.payment}
                onChange={handleInputChange}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value="credit_card">Thẻ tín dụng</option>
                <option value="cash_on_delivery">Thanh toán khi nhận hàng</option>
              </select>
              {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">Màu: {item.color}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Giá: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-4">
                <p className="font-semibold">Tổng cộng: ${calculateTotal().toFixed(2)}</p>
              </div>
            </div>

            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
