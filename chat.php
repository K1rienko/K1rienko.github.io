<?php
// --------------------------------- MESSAGES -------------------------------
try {
    $conn = new PDO("mysql:host=localhost;dbname=user", 'root', '');

    $text = $_POST['text'];

    $query = "INSERT INTO chat_content (content) VALUES (:text)";
    $stmt = $conn->prepare($query);
    $stmt->execute(['text' => $text]);

    echo "Сообщение успешно добавлено в БД!";

} catch (PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}

?>