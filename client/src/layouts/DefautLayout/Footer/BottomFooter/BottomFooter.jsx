export default function BottomFooter() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-blue-500 dark:border-gray-700">
      <div className="w-full">
        <div className="mx-auto max-w-screen-lg px-4">
          <div className="grid grid-cols-2 gap-8 py-8 lg:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Sản phẩm</h2>
              <ul className="text-gray-500 dark:text-gray-400 space-y-4">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Máy tính bàn</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Laptop</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Linh kiện</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Phụ kiện</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Hỗ trợ khách hàng</h2>
              <ul className="text-gray-500 dark:text-gray-400 space-y-4">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Chính sách bảo hành</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Chính sách đổi trả</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Liên hệ</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Về chúng tôi</h2>
              <ul className="text-gray-500 dark:text-gray-400 space-y-4">
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Giới thiệu</a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Tin tức</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Kết nối với chúng tôi</h2>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.197 21V10.5H6V7h3.197V4.4C9.197 1.8 10.593 0 13.396 0H16.5v3.5h-2.01c-1.006 0-1.302.44-1.302 1.297V7H17l-.5 3.5H13.188V21h-3.991z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24H22.2c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0zM7.6 20.4H3.6V9.1h4v11.3zm-2-12.9C5 7.5 4.1 6.6 3.3 6.6S1.5 7.5 1.5 8.3s.9 1.7 1.8 1.7S5 9.1 5.5 8.3zM20.4 20.4h-4v-5.5c0-3.3-4-3.1-4 0v5.5h-4V9.1h3.6v1.5h.1c.5-.9 1.7-2.1 3.5-2.1 3.7 0 4.3 2.4 4.3 5.6v6.3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 py-4">
          <div className="max-w-screen-xl mx-auto text-center">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              © 2024 <a href="#" className="hover:underline">Computer Store</a>. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
