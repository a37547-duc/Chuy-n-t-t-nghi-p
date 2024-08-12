Cấu trúc folder - file

src
App.jsx
.env - assets - css - scss - fonts - images

    - Folder Components (Component dạng global, dùng chung cho các trang)
        - Component 1
        - Component 1.jsx
            - Component.jsx
        - Component2
            - Component2.jsx
            - Component2.scss
    - pages(folder)
        - Home(folder)
            - Home.jsx
            - Home.scss
                - components(folder)
                    - Slide.jsx
                    - BestSeller.jsx
            - About(folder)
                - About.jsx
                - About.scss
            - Products(folder)
                 - Products.jsx
                 - ProductCategory.jsx
                 - ProductDetail.jsx
    - middlewares (Middleware của request)
        - AuthMiddleware.jsx
        - GuestMiddleware.jsx


    - routes(chia làm 2 loại)
        - publicRoutes.js
        - privateRoutes.js
    - layouts(folder)
        - DefauultLayout(Folder)
            - DefaultLayout.jsx
            - Header.jsx
            - Footer.jsx
            - Sidebar.jsx
        - AuthLayout (folder)
            - AuthLayout.jsx
    - stores
        - store.js
        - slices (folder)
            - authSlice.js
            - productSlice.js
        - middlewares
            - userMiddleware.js
            - ProductMiddleware.js

# Khi làm 1 1 project react thì cần phải call API

# Các nghiệp vụ call API thì tách ra 1 service để tách biệt logic vs components

    - services (folder)
        -  productService.js
        - userService.js

    - utils (folder - chứa các hàm hỗ trợ)
        - urlUntils.js
        - clientUtils.js
    - hooks (folder chứa các custom hook)
        - useClient.js
