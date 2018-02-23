
<?php

    $name = $_POST['username'];
    $street = $_POST['street'];
    $build = $_POST['build'];
    $corp = $_POST['corp'];
    $appt = $_POST['appt'];
    $floor = $_POST['floor'];

    $address = 'ул. ' .$street. '  д. ' .$build. '/' .$corp. ' кв. ' .$appt. ' эт. ' .$floor;

   // $email = $_POST['user-email'];
    $pay = $_POST['pay-option'];
    $message = $_POST['comment'];
    $disturb = $_POST['dont-disturb']; // 1 или null
   // $disturb = isset($disturb) ? 'НЕТ' : 'ДА';

    $disturb = ($disturb==='on') ? 'НЕТ' : 'ДА';
    $pay = ($pay==='card')? 'КРЕДИТНОЙ КАРТОЙ' : 'НАЛИЧНЫМИ';
    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя: ' . $name . '</li>
            <li>Адресс: ' . $address . '</li>
            <li>Способ оплаты: ' . $pay . '</li>
            <li>Комментарий к заказу: ' . $message . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: Администратор сайта <admin@webmanshake.ru>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('yuliyavolkova@gmail.com', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Ваш заказ передан в обработку";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка, повторите заказ";
    }

    echo json_encode($data);

?>