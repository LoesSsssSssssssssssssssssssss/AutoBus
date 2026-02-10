<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Настройки
    $to = "example@mail.ru"; // ЗАМЕНИТЕ на свою почту
    $subject = "Новая заявка с сайта AutoBus";
    
    // Проверка обязательных полей
    if (empty($_POST["name"]) || empty($_POST["phone"])) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "error" => "Заполните обязательные поля: имя и телефон"
        ]);
        exit;
    }
    
    // Очистка данных
    function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        return $data;
    }
    
    $name = clean_input($_POST["name"]);
    $phone = clean_input($_POST["phone"]);
    $vin = isset($_POST["vin"]) ? clean_input($_POST["vin"]) : '';
    $part = isset($_POST["part"]) ? clean_input($_POST["part"]) : '';
    $agreement = isset($_POST["agreement"]) && $_POST["agreement"] === 'да' ? 'Да' : 'Нет';
    
    // Формирование текста письма
    $message = "Новая заявка с сайта AutoBus\n\n";
    $message .= "Имя: $name\n";
    $message .= "Телефон: $phone\n";
    $message .= "VIN: " . ($vin ?: "не указан") . "\n";
    $message .= "Что подобрать: " . ($part ?: "не указано") . "\n";
    $message .= "Согласие на обработку данных: $agreement\n\n";
    $message .= "Дата и время: " . date("d.m.Y H:i:s") . "\n";
    $message .= "IP-адрес: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Заголовки для текстового письма (проще и надежнее)
    $headers = "From: AutoBus <noreply@autobus.ru>\r\n";
    $headers .= "Reply-To: $to\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    
    // Отправка письма
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode([
            "success" => true,
            "message" => "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "error" => "Ошибка при отправке заявки. Пожалуйста, попробуйте позже."
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Метод не разрешен"
    ]);
}
?>