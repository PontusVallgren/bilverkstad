<?php
/**
 * Mail endpoint for the Kontakt and Offert forms.
 *
 * Receives a JSON POST from the Angular app, validates it, applies a honeypot
 * spam check, and emails the contents to the workshop's one.com mailbox via SMTP.
 * The customer's address (when supplied) goes in Reply-To so the shop can reply
 * directly from the inbox.
 *
 * Credentials live in ../config.php (git-ignored) — never shipped to the browser.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json; charset=utf-8');

/** Send a JSON response and stop. */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

// --- Only POST is allowed -------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// --- Parse JSON body ------------------------------------------------------
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request body']);
}

/** Trimmed string field accessor. */
function field(array $data, string $key): string
{
    return trim((string)($data[$key] ?? ''));
}

// --- Honeypot: bots fill the hidden "company" field. Pretend success. -----
if (field($data, 'company') !== '') {
    respond(200, ['ok' => true]);
}

$type = field($data, 'type');
if (!in_array($type, ['kontakt', 'offert'], true)) {
    respond(400, ['ok' => false, 'error' => 'Unknown form type']);
}

// --- Validate + build the email body per form type ------------------------
$customerEmail = field($data, 'email');
$customerName  = field($data, 'name');

if ($type === 'kontakt') {
    $required = ['name', 'message'];
    $rows = [
        'Namn'       => field($data, 'name'),
        'E-post'     => $customerEmail,
        'Telefon'    => field($data, 'phone'),
        'Meddelande' => field($data, 'message'),
    ];
    $subject = 'Nytt meddelande från kontaktformuläret';
} else { // offert
    $required = ['regNumber', 'name', 'phone', 'service'];
    $rows = [
        'Registreringsnummer' => field($data, 'regNumber'),
        'Namn'                => field($data, 'name'),
        'Telefon'             => field($data, 'phone'),
        'E-post'              => $customerEmail,
        'Typ av tjänst'       => field($data, 'service'),
        'Prioritet'           => field($data, 'priority'),
        'Önskat datum'        => field($data, 'date'),
        'Ytterligare info'    => field($data, 'message'),
    ];
    $subject = 'Ny offertförfrågan';
}

foreach ($required as $key) {
    if (field($data, $key) === '') {
        respond(422, ['ok' => false, 'error' => 'Obligatoriskt fält saknas: ' . $key]);
    }
}

if ($customerEmail !== '' && !filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'Ogiltig e-postadress']);
}

// Build a readable plain-text body, skipping empty optional fields.
$lines = [];
foreach ($rows as $label => $value) {
    if ($value !== '') {
        $lines[] = $label . ': ' . $value;
    }
}
$bodyText = implode("\n", $lines) . "\n";

// --- Load config and send -------------------------------------------------
$configPath = __DIR__ . '/../config.php';
if (!is_file($configPath)) {
    respond(500, ['ok' => false, 'error' => 'Server misconfigured']);
}
$cfg = require $configPath;

require __DIR__ . '/../lib/PHPMailer/src/Exception.php';
require __DIR__ . '/../lib/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../lib/PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $cfg['SMTP_HOST'];
    $mail->Port       = (int)$cfg['SMTP_PORT'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $cfg['SMTP_USER'];
    $mail->Password   = $cfg['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet    = 'UTF-8';

    // From MUST be the authenticated mailbox (one.com requirement).
    $mail->setFrom($cfg['MAIL_FROM'], $cfg['MAIL_FROM_NAME'] ?? '');
    $mail->addAddress($cfg['MAIL_TO'], $cfg['MAIL_TO_NAME'] ?? '');

    // Reply straight to the customer when they gave an address.
    if ($customerEmail !== '') {
        $mail->addReplyTo($customerEmail, $customerName !== '' ? $customerName : $customerEmail);
    }

    $mail->Subject = $subject;
    $mail->Body    = $bodyText;

    $mail->send();
    respond(200, ['ok' => true]);
} catch (PHPMailerException $e) {
    // Log server-side, return a generic message to the client.
    error_log('send-mail.php: ' . $mail->ErrorInfo);
    respond(502, ['ok' => false, 'error' => 'E-post kunde inte skickas']);
}
