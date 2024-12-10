import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { fetchStats } from '../../../features/Admin/statistical';

const DashBoard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.stats);
  console.log(data);

  const [filter, setFilter] = useState("today");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCanceledOrders, setTotalCanceledOrders] = useState(0);

  const handleFilterChange = (value) => {
    setFilter(value);
    dispatch(fetchStats(value));
  };

  useEffect(() => {
    dispatch(fetchStats(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    if (data && data.length > 0) {
      const totalRev = data?.reduce((acc, item) => acc + item["totalRevenue"], 0);
      const totalOrd = data?.reduce((acc, item) => acc + item["totalOrders"], 0);
      const totalCanceled = data?.reduce((acc, item) => acc + item["cancelledOrders"], 0);
      setTotalRevenue(totalRev);
      setTotalOrders(totalOrd);
      setTotalCanceledOrders(totalCanceled);
    } else {
      setTotalRevenue(0);
      setTotalOrders(0);
      setTotalCanceledOrders(0);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Bộ lọc thời gian */}
      <div className="flex justify-start items-center mb-4 ml-4">
        <div className="w-56 bg-white">
          <FormControl fullWidth className="w-full" size="small">
            <InputLabel id="time-range-label">Chọn khoảng thời gian</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range"
              value={filter}
              label="Chọn khoảng thời gian"
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <MenuItem value="today">Hôm nay</MenuItem>
              <MenuItem value="week">Tuần này</MenuItem>
              <MenuItem value="month">Tháng này</MenuItem>
              <MenuItem value="year">Năm nay</MenuItem>
              <MenuItem value="yesterday">Hôm qua</MenuItem>
              <MenuItem value="previousWeek">Tuần trước</MenuItem>
              <MenuItem value="previousMonth">Tháng trước</MenuItem>
              <MenuItem value="previousYear">Năm Ngoái</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <i className="fas fa-shopping-cart text-4xl text-blue-500"></i>
            <div className="ml-4">
              <h2 className="text-4xl font-bold">{totalRevenue || 0}</h2>
              <p className="text-gray-600">Tổng doanh thu</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <i className="fas fa-store text-4xl text-red-500"></i>
            <div className="ml-4">
              <h2 className="text-4xl font-bold">{totalOrders || 0}</h2>
              <p className="text-gray-600">Đơn hàng mới</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <i className="fas fa-boxes text-4xl text-yellow-500"></i>
            <div className="ml-4">
              <h2 className="text-4xl font-bold">{totalCanceledOrders || 0}</h2>
              <p className="text-gray-600">Đơn hàng đã hủy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Doanh thu và Đơn hàng</h3>
          <div>
          <BarChart width={1000} height={300} data={data} margin={{left: 20}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#8884d8" name={`Doanh thu: ${totalRevenue}`} />
          </BarChart>
          </div>

        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Đơn hàng đã hủy</h3>
          <BarChart width={1000} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis tickCount={4}/>
            <Tooltip />
            <Legend />
            <Bar dataKey="cancelledOrders" fill="#ff6666" name="Đơn hàng đã hủy"/>
            <Bar dataKey="unPaidOrders" fill="#ffcc66" name="Đơn hàng chưa thanh toán"/>
            <Bar dataKey="paidOrders" fill="#66cc66" name="Đơn hàng đã thanh toán"/>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
