<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // ========== ВАШИ ДАННЫЕ ==========
    $to = "";     // КУДА ПРИХОДЯТ ЗАЯВКИ
    $domain = "";           // ДОМЕН САЙТА
    $from_email = "";    // ОТПРАВИТЕЛЬ
    // ================================
    
    $name = htmlspecialchars(trim($_POST["name"] ?? ''), ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars(trim($_POST["phone"] ?? ''), ENT_QUOTES, 'UTF-8');
    $vin = htmlspecialchars(trim($_POST["vin"] ?? 'не указан'), ENT_QUOTES, 'UTF-8');
    $part = htmlspecialchars(trim($_POST["part"] ?? 'не указано'), ENT_QUOTES, 'UTF-8');
    
    if (!$name || !$phone) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Заполните имя и телефон']);
        exit;
    }
    
    // Тема письма (кириллица!)
    $subject = '=?UTF-8?B?' . base64_encode('🔔 Новая заявка с AutoBus') . '?=';
    
    // HTML-письмо с красивым дизайном
    $message = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px; }
            .header { background: #c60b0b; color: white; padding: 15px; text-align: center; border-radius: 5px; }
            .content { padding: 20px; background: white; border-radius: 5px; margin-top: 15px; }
            .field { margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .label { font-weight: bold; color: #555; }
            .value { font-size: 16px; color: #333; }
            .footer { text-align: center; margin-top: 20px; color: #777; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>📬 Новая заявка с сайта AutoBus</h2>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Имя:</div>
                    <div class="value">' . $name . '</div>
                </div>
                <div class="field">
                    <div class="label">📞 Телефон:</div>
                    <div class="value">' . $phone . '</div>
                </div>';
    
    if ($vin !== 'не указан' && !empty($vin)) {
        $message .= '
                <div class="field">
                    <div class="label">🔢 VIN:</div>
                    <div class="value">' . $vin . '</div>
                </div>';
    }
    
    if ($part !== 'не указано' && !empty($part)) {
        $message .= '
                <div class="field">
                    <div class="label">🔧 Запчасть:</div>
                    <div class="value">' . $part . '</div>
                </div>';
    }
    
    $message .= '
                <div class="field">
                    <div class="label">⏰ Время заявки:</div>
                    <div class="value">' . date('d.m.Y H:i:s') . '</div>
                </div>
                <div class="field">
                    <div class="label">🌐 IP:</div>
                    <div class="value">' . $_SERVER['REMOTE_ADDR'] . '</div>
                </div>
            </div>
            <div class="footer">
                <p>Письмо сгенерировано автоматически, отвечать не нужно.</p>
                <p>© ' . date('Y') . ' AutoBus</p>
            </div>
        </div>
    </body>
    </html>
    ';
    
    // Заголовки (ПРОФЕССИОНАЛЬНЫЕ)
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=utf-8',
        'From: AutoBus <' . $from_email . '>',
        'Reply-To: ' . $from_email,
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 3',
        'Return-Path: ' . $from_email,
        'Message-ID: <' . time() . '.' . md5($to . $name) . '@' . $domain . '>'
    ];
    
    if (mail($to, $subject, $message, implode("\r\n", $headers))) {
        echo json_encode([
            'success' => true,
            'message' => '✅ Заявка отправлена! Мы перезвоним в течение 15 минут.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Ошибка отправки. Пожалуйста, позвоните нам.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не разрешен']);
}
?>