# HPTSmart 1.1.2 — Capacitor Android / iOS

Gói native này dùng **đúng frontend HPTSmart 1.1.2** làm nguồn WebView. Firmware và API 1.1.2 được giữ kèm để đồng bộ bộ phát hành; native wrapper không thay đổi logic MQTT/GPIO/Timer.

## Luồng 192.168.4.1 — bắt buộc nằm trong App WebView

Khi đang chạy Capacitor, HPTSmart nhận diện native shell và mở:

`http://192.168.4.1/?session=...`

bằng `window.location.assign()` ngay trong WebView hiện tại. Không dùng `window.open()`, không gọi Safari/Chrome và không dùng Android Intent/browser ngoài app.

Trang ESP32 sau khi Wi-Fi + MQTT hoàn tất sẽ quay lại bằng lịch sử WebView; session provisioning được giữ trong `sessionStorage` để HPTSmart tiếp tục hoàn tất Pair.

### Android
- Cho phép cleartext HTTP cho WebView để truy cập ESP32 AP `192.168.4.1`.
- Không mở provisioning portal bằng browser ngoài app.

### iOS
- Có `NSLocalNetworkUsageDescription` để xin quyền Local Network.
- Có `NSAllowsLocalNetworking` trong App Transport Security để WebView truy cập portal HTTP cục bộ.
- Việc ký/build IPA vẫn cần macOS + Xcode + Apple Developer signing.

## Android trên Windows

1. Cài Node.js LTS, Android Studio, Android SDK và JDK.
2. Mở thư mục này trong CMD/PowerShell.
3. Chạy `BUILD_ANDROID_WINDOWS_1.1.2.bat` hoặc:

```bash
npm install
npm run cap:add:android
npm run cap:sync:android
```

Sau đó mở Android Studio hoặc chạy:

```bash
npm run build:android:debug
```

APK debug: `android/app/build/outputs/apk/debug/app-debug.apk`

## iOS trên Mac

```bash
npm install
npm run cap:add:ios
npm run cap:sync:ios
npx cap open ios
```

Sau đó chọn Team/Signing trong Xcode và Archive để tạo IPA/TestFlight.

## Không thay đổi firmware

ESP32 vẫn dùng firmware 1.1.2 trong `HPTSmart_FIRMWARE_1.1.2`. Timer vẫn chạy độc lập trên ESP32; app chỉ cấu hình lịch.

## Không đổi backend

API/D1/HiveMQ vẫn dùng cấu hình của HPTSmart 1.1.2. Không cần trỏ `hungphutrung.vn` sang Cloudflare để native app hoạt động.
