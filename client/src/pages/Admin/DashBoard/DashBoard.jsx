import '@fortawesome/fontawesome-free/css/all.min.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';

// Dữ liệu mẫu cho biểu đồ
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
  return (
    <div className="p-4">
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

      {/* Biểu đồ */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Biểu đồ cột */}
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

        {/* Biểu đồ đường */}
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
