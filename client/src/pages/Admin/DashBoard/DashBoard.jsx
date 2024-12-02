import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { customRange } from '../../../features/Admin/statistical';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DashBoard = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.stats);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
    const formattedDate = formatDate(today);
    const data = {
      startDate: formattedDate,
      endDate: formattedDate,
    }
    dispatch(customRange(data));
  }, [dispatch]);

  const formatDate = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
    return '';
  };
  
  const validateDates = () => {
    const newErrors = {};
    if (!startDate) newErrors.startDate = "Start date không được để trống.";

    if (!endDate) newErrors.endDate = "End date không được để trống.";
    if (newErrors.startDate) {
      toast.error(newErrors.startDate);
    }
    if (newErrors.endDate) {
      toast.error(newErrors.endDate);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateDates()) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const data = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      dispatch(customRange(data));
    }
  };

  const handleTimeRangeChange = (range) => {
    const today = new Date();
    let start, end;
  
    switch (range) {
      case 'week':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        break;
      case 'month':
        start = new Date(today);
        start.setMonth(today.getMonth() - 1);
        break;
      case 'year':
        start = new Date(today);
        start.setFullYear(today.getFullYear() - 1);
        break;
      default:
        start = today;
    }
  
    setStartDate(start);
    setEndDate(today);
  
    const formattedStartDate = formatDate(start);
    const formattedEndDate = formatDate(today);
  
    const data = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
  
    dispatch(customRange(data));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen overflow-hidden">
      <div className="flex justify-between items-center mb-4 ml-4">
        <div className="flex space-x-4 mr-4">
          <div className="flex items-center space-x-1">
            <label className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholderText="Select start date"
            />
          </div>
          <div className="flex items-center space-x-1">
            <label className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholderText="Select end date"
            />
          </div>
          <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Submit Data
          </button>
        </div>
        <div className="w-56 bg-white">
        <FormControl fullWidth className="w-full" size="small">
          <InputLabel id="time-range-label">Chọn khoảng thời gian</InputLabel>
          <Select
            labelId="time-range-label"
            id="time-range"
            label="Chọn khoảng thời gian"
            onChange={(e) => handleTimeRangeChange(e.target.value)}
          >
            <MenuItem value="week">Thống kê theo tuần</MenuItem>
            <MenuItem value="month">Thống kê theo tháng</MenuItem>
            <MenuItem value="year">Thống kê theo năm</MenuItem>
          </Select>
        </FormControl>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Item Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-shopping-cart text-4xl text-blue-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">{data?.totalRevenue || 0}</h2>
                <p className="text-gray-600">Tổng doanh thu</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-store text-4xl text-red-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">{data?.totalOrders || 0}</h2>
                <p className="text-gray-600">Đơn hàng mới</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-boxes text-4xl text-yellow-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">{data?.canceledOrders || 0}</h2>
                <p className="text-gray-600">Đơn hàng đã hủy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Doanh thu và Đơn hàng</h3>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Doanh thu" fill="#8884d8" />
            <Bar dataKey="Đơn hàng" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4"></h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Đơn hàng đã hủy" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
