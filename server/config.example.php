<?php
/**
 * Copy this file to `config.php` on the server and fill in real values.
 * config.php is git-ignored so credentials never end up in the repo or the browser.
 *
 * Values come from your one.com control panel:
 *  - SMTP_USER / SMTP_PASS: an existing one.com mailbox on your domain (used to authenticate).
 *  - MAIL_FROM: the "From" address. MUST be the same mailbox you authenticate with.
 *  - MAIL_TO:   where form submissions are delivered (your one.com business mailbox).
 *
 * Host note (one.com): use 'mailout.one.com' when the site is hosted on one.com.
 */

return [
    'SMTP_HOST' => 'mailout.one.com',
    'SMTP_PORT' => 587,            // STARTTLS
    'SMTP_USER' => 'info@dittdomän.se',
    'SMTP_PASS' => 'DITT_LÖSENORD',
    'MAIL_FROM' => 'info@dittdomän.se',
    'MAIL_FROM_NAME' => 'Webbformulär',
    'MAIL_TO'   => 'info@dittdomän.se',
    'MAIL_TO_NAME'  => 'Bilverkstan',
];
