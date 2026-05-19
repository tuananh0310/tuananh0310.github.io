# wf_fix_git_push_403

## Current tasks from user prompt
- Đăng nhập lại GitHub (đúng user repo `tuananh0310`).

## Plan (simple)
- `gh` đang active `tuananhzxcvbnm9` → user chạy `gh auth login` / `gh auth switch` sang `tuananh0310`.
- Đã đổi `origin` sang HTTPS để dùng token qua `gh auth git-credential`.

## Steps
1. User: `gh auth login -h github.com` (HTTPS, browser) với account **tuananh0310**, hoặc `gh auth switch -u tuananh0310`.
2. `git push origin master`.

## Things done
- Kiểm tra `gh auth status`; xác nhận credential cho github.com dùng `gh auth git-credential`.
- `git remote set-url origin` → HTTPS.

## Things not done yet
- User tự chạy `gh auth login` / `switch` (tương tác trình duyệt).
