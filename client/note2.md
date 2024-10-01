# Mô tả chức năng component Products

<!-- 1. Sử dụng lại component categories cho component Products
   - giữ lại ID, category name
   - thay thế nút edit và delete bằng nút xem chi tiết
   - bỏ search và add

- Khi bấm vào xem chi tiết
  Ví dụ:
- bấm vào xem chi tiết chuyên mục laptop => Nó sẽ chuyển đến một trang khác
  Trang đó sẽ chứa các hãng laptop.
- Tại trang chứa các hãng laptop, admin có thể bấm để xem chi tiết 1 hãng
  -> Nó sẽ dẫn đến trang chứa các sản phẩm của hãng đó --> SAI

- Sửa: sử dụng bộ lọc cho nhanh
- Bộ lọc cần có:

1. id category => lấy id và name
   -> Dựa vào id category gọi (id,name) của brand tương ứng
2. id brand
   -> dựa vào id brand lấy các sản phẩm tương ứng của nó

# Lỗi nảy sinh (10/1/2024)

1. Chức năng xóa gây ra lỗi xung đột collections
   vd : Brand và Product liên kết với nhau, nếu xóa Brand Product không thể truy cập
