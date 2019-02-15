<?php
	$to = "wisat@travala10.com"; /*Your Email*/
	$from = $_POST[email]; // this is the sender's Email address
	$subject = "Запрос с сайта KINGURU"; /*Issue*/
	$date = date ("l, F jS, Y"); 
	$time = date ("h:i A"); 
	$select = $_POST[theme];	
	$msg="Содержимое:\n
	Email: $_POST[email]\n
	Телефон: $_POST[phone]\n
	Выбранная тематика: $select\n
	Запрос отправлен $date в: $time";
	$msg2="Здравствуйте!\n
	Вы подписались на сервис KINGURU\n
	Спасибо!";

	$headers = "MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n"."From: $_POST[email]";
    $headers2 = "From:" . $to;

	mail($to, $subject, $msg, $headers);
	mail($from, $subject, $msg2, $headers2);
	header( 'Location: index.html' );
?>