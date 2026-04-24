<?php
header('Content-Type: application/json; charset=utf-8');

// =====================
// ONLY POST
// =====================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode([
    'success' => false,
    'error' => 'method_not_allowed'
  ]);
  exit;
}

// =====================
// GET DATA (FormData)
// =====================
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$car = trim($_POST['car'] ?? '');
$comment = trim($_POST['comment'] ?? '');

// =====================
// VALIDATION
// =====================
if (mb_strlen($name) < 2) {
  echo json_encode([
    'success' => false,
    'error' => 'invalid_name'
  ]);
  exit;
}

if (empty($phone)) {
  echo json_encode([
    'success' => false,
    'error' => 'invalid_phone'
  ]);
  exit;
}

// =====================
// EMAIL SETTINGS
// =====================
$to = "your@email.com"; // <-- ЗАМІНИ
$subject = "Новая заявка с сайта";

$message = "НОВАЯ ЗАЯВКА\n\n";
$message .= "Имя: $name\n";
$message .= "Телефон: $phone\n";

if ($car) {
  $message .= "Авто: $car\n";
}

if ($comment) {
  $message .= "Комментарий: $comment\n";
}

// =====================
// HEADERS
// =====================
$headers = "From: no-reply@localhost\r\n";
$headers .= "Reply-To: $phone\r\n";

// =====================
// MAIL SEND (MAMP LIMITATION)
// =====================
$sent = mail($to, $subject, $message, $headers);

// =====================
// RESPONSE
// =====================
echo json_encode([
  'success' => true,
  'mail_sent' => $sent,
  'debug' => [
    'name' => $name,
    'phone' => $phone
  ]
]);