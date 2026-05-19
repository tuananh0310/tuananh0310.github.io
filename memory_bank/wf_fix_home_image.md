# wf_fix_home_image

## Current tasks from user prompt
- Ảnh `/_SUN68591.JPG` không hiển thị trên GitHub Pages.

## Plan (simple)
- Repo `tuananh0310.github.io` = user site tại **root** `/`, không phải `/portfolio/`.
- Build cũ trỏ asset `/portfolio/js/...` nhưng file deploy ở `/js/...` → 404.
- `publicPath` và `homepage` phải là `/`.

## Steps
1. `publicPath: '/'`, `homepage` root URL.
2. `Home.vue` dùng `BASE_URL` cho ảnh.
3. User chạy `npm run deploy`.

## Things done
- Sửa `vue.config.js`, `package.json`, `Home.vue`, `App.vue`.
- Xác nhận live `index.html` trỏ `/portfolio/js/...` trong khi file ở `/js/...`.

## Things not done yet
- User: `npm run deploy` để cập nhật nhánh `gh-pages`.
