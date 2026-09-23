# HPTSmart V1.1.2 — lưu ý tích hợp Capacitor Android/iOS

Bản V1.1.2 đã chuẩn bị dashboard để khi chạy trong Capacitor, trang cấu hình ESP32 tại `http://192.168.4.1` được mở **bên trong WebView của HPTSmart**, không dùng `window.open()` để đẩy người dùng sang Safari/Chrome.

## Android
Native project cần cho phép cleartext HTTP tới ESP32 AP (tối thiểu `192.168.4.1`). Không mở URL bằng Intent/browser ngoài app.

## iOS
Native project cần quyền Local Network và chính sách App Transport Security phù hợp để WebView truy cập `http://192.168.4.1`. iOS sẽ yêu cầu quyền Local Network khi cần.

## Luồng provisioning
1. Native App mở `http://192.168.4.1/?session=...` trong chính WebView.
2. Người dùng nhập SSID/mật khẩu Wi-Fi trên trang ESP32.
3. ESP32 kết nối Wi-Fi + MQTT.
4. Trang ESP32 dùng `history.back()` để quay lại HPTSmart; `hptsmart://pair-complete` chỉ là fallback nếu native shell có deep-link handler.
5. App đồng bộ D1 và hoàn tất Pair.

## Thiết bị đã cấu hình
D1 lưu `wifi_ip`/`wifi_ssid`; dashboard V1.1.2 tạo cờ `wifiConfigured` từ dữ liệu cloud và **ẩn Cấu hình Wi-Fi** sau khi đăng nhập lại. Mất mạng tạm thời không làm nút Cấu hình Wi-Fi xuất hiện lại.

Chỉ Factory Reset/xóa cấu hình Wi-Fi và tạo provisioning flow mới mới đưa thiết bị về trạng thái cần cấu hình lại.
