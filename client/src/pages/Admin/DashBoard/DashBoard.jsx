import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Add this to style DatePicker's base style

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', Sales: 4000, Visitors: 2400 },
  { name: 'Feb', Sales: 3000, Visitors: 2210 },
  { name: 'Mar', Sales: 2000, Visitors: 2290 },
  { name: 'Apr', Sales: 2780, Visitors: 2000 },
  { name: 'May', Sales: 1890, Visitors: 2181 },
  { name: 'Jun', Sales: 2390, Visitors: 2500 },
  { name: 'Jul', Sales: 3490, Visitors: 2100 },
];

const DashBoard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="p-4">
      <div className="flex justify-start items-center mb-4 ml-4">
        <div className="flex space-x-4 mr-4">
          {/* Start Date Picker */}
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

          {/* End Date Picker */}
          <div className="flex items-center space-x-2">
            <label className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              placeholderText="Select end date"
            />
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Submit Data
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Item Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-shopping-cart text-xl text-blue-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">6654</h2>
                <p className="text-gray-600">Items Sales</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-500 text-sm px-2 py-1 rounded">
              12% <i className="fas fa-arrow-up"></i>
            </div>
          </div>
        </div>

        {/* New Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-store text-xl text-red-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">10962</h2>
                <p className="text-gray-600">New Orders</p>
              </div>
            </div>
            <div className="bg-red-100 text-red-500 text-sm px-2 py-1 rounded">
              -6% <i className="fas fa-arrow-down"></i>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-boxes text-xl text-yellow-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">7127</h2>
                <p className="text-gray-600">Total Products</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-500 text-sm px-2 py-1 rounded">
              72% <i className="fas fa-arrow-up"></i>
            </div>
          </div>
        </div>

        {/* New Visitors Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <i className="fas fa-users text-xl text-green-500"></i>
              <div className="ml-4">
                <h2 className="text-4xl font-bold">1287</h2>
                <p className="text-gray-600">New Visitors</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-500 text-sm px-2 py-1 rounded">
              150% <i className="fas fa-arrow-up"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales and Visitors</h3>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" fill="#8884d8" />
            <Bar dataKey="Visitors" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Sales Trend</h3>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Sales" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
