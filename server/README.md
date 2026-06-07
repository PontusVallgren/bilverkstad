# Form mail endpoint (one.com deployment)

The Kontakt and Offert forms POST their data as JSON to `/api/send-mail.php`, which
emails the contents to the workshop's one.com mailbox via SMTP. SMTP credentials live
in `config.php` **on the server** and are never exposed to the browser.

## Files

```
server/
├── api/send-mail.php       # the endpoint
├── lib/PHPMailer/src/      # PHPMailer (vendored, no Composer needed)
├── config.example.php      # template — copy to config.php and fill in
├── config.php              # real credentials (git-ignored, create on server)
└── .htaccess               # SPA routing + lets /api/ run as PHP
```

## One-time setup on one.com

1. **Pick/create a mailbox** in the one.com control panel on your domain
   (e.g. `info@dittdomän.se`). You need its address + password.
2. **Create `config.php`** from `config.example.php` and fill in:
   - `SMTP_USER` / `SMTP_PASS` — that mailbox's address + password
   - `MAIL_FROM` — same address as `SMTP_USER` (one.com requires From = authenticated user)
   - `MAIL_TO` — where submissions land (your business mailbox; can be the same address)
   - Host stays `mailout.one.com`, port `587` (STARTTLS) — works because the site is hosted on one.com.

## Deploy steps

1. Build the Angular app:
   ```
   ng build
   ```
   Output lands in `dist/bilverkstad/browser/`.
2. Upload to the one.com web root (e.g. `/www` or `httpdocs`):
   - **Everything inside** `dist/bilverkstad/browser/` → web root.
   - `server/api/` → `<webroot>/api/`
   - `server/lib/` → `<webroot>/lib/`
   - `server/.htaccess` → `<webroot>/.htaccess`
   - `server/config.php` → `<webroot>/config.php`  *(create/edit directly on the server; do not commit)*

   The endpoint must resolve at `https://dittdomän.se/api/send-mail.php`, and
   `config.php` must sit one level above `api/` (i.e. the web root), matching the
   `__DIR__ . '/../config.php'` path in `send-mail.php`.

## Test

- Submit each form on the live site → mail should arrive in `MAIL_TO`.
- Hit "Reply" in your inbox → it goes to the customer (their address is in `Reply-To`).
- Bots that fill the hidden `company` field get a fake success and no mail is sent.

## Local smoke test (optional)

```
php -S localhost:8000 -t server
curl -X POST localhost:8000/api/send-mail.php \
  -H 'Content-Type: application/json' \
  -d '{"type":"kontakt","name":"Test","email":"t@example.com","phone":"070","message":"Hej","company":""}'
```
Needs a local `server/config.php` with real SMTP credentials to actually deliver.
