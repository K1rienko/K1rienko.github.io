<?php
// -------------------------------------- USERS ---------------------------------
try {
    $conn = new PDO("mysql:host=localhost;dbname=user", 'root', '');

    if(empty($_POST['name']) || empty($_POST['phoneNumber']) || empty($_POST['email'])) {
        exit("Пожалуйста, заполните все поля");
    }

    $query = "INSERT INTO form_data (name, phoneNumber, email) VALUES (:name, :phoneNumber, :email)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':name', $_POST['name']);
    $stmt->bindParam(':phoneNumber', $_POST['phoneNumber']);
    $stmt->bindParam(':email', $_POST['email']);
    $stmt->execute();

    $msg_id = $conn->lastInsertId();

    echo '<html>
        <head>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }

                .message-box {
                    border: 5px solid #f90;
                    border-radius: 20px;
                    padding: 20px;
                    text-align: center;
                    max-width: 400px;
                    width: 100%;
                    background: #f9f9f9;
                }

                #countdown {
                    font-size: 24px;
                    margin-top: 10px;
                }
                
            </style>
        </head>
        <body>
            <div class="message-box">
                <h1>Данные успешно отправлены</h1>
                <p id="countdown">Вы будете перенаправлены через <span id="seconds">3</span> секунды</p>
            </div>
            <script>
                var seconds = 3;
                setInterval(function() {
                    seconds--;
                    document.getElementById("seconds").innerText = seconds;
                    if (seconds == 0) {
                        window.location.href = "index.html";
                    }
                }, 1000);
            </script>
        </body>
      </html>';

} 
catch(PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}

?>