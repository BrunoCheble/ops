<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php-mailer/src/PHPMailer.php';
require 'php-mailer/src/SMTP.php';
require 'php-mailer/src/Exception.php';

echo json_encode([  
  'SMTP_HOST' => getenv('SMTP_HOST'),
  'SMTP_USER' => getenv('SMTP_USER'),
  'SMTP_PASS' => getenv('SMTP_PASS'),
  'SMTP_FROM_EMAIL' => getenv('SMTP_FROM_EMAIL'),
  'SMTP_FROM_NAME' => getenv('SMTP_FROM_NAME'),
]);
die;
/*
$mail->Host = getenv('SMTP_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USER');
    $mail->Password = getenv('SMTP_PASS');
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->SetFrom(getenv('SMTP_FROM_EMAIL'), getenv('SMTP_FROM_NAME'));
    $mail->AddAddress(getenv('SMTP_USER'));
*/
class Form {
  public static function validate($body) {
    $requireFields = ['name','email','url','subject'];
    $bodyKeys = array_keys($body);

    if (count(array_diff($requireFields, $bodyKeys)) > 0) {
      throw new Exception("Os campos com * são obrigatórios");
    }
  }
}

class Attachment {
  public static function validate($file) {
    if ($file["size"] > 500000) {
      throw new Exception("O tamanho máximo do PDF é de 5mb");
    }
  }
}

class Recaptcha {

  public static $url = 'https://www.google.com/recaptcha/api/siteverify';
  public static $secret = '6LfZp-EeAAAAAHZDhHZfyO3wg0FECY9aERwYoPDc';

  public static function validate($token) {

    $request = file_get_contents(self::$url.'?secret='.self::$secret.'&response='.$token);
    $result = json_decode($request);
	
	  if(!$result->success) {
      throw new Exception("Requisição inválida, favor entrar em contato por e-mail");
    }
  }
}

class Email {
  public static function send($body, $attachment) {
    
		$mail = new PHPMailer(true);
    $mail->SMTPDebug = 1;
    
    $mail->IsSMTP();
    $mail->Host = getenv('SMTP_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USER');
    $mail->Password = getenv('SMTP_PASS');
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->SetFrom(getenv('SMTP_FROM_EMAIL'), getenv('SMTP_FROM_NAME'));
    $mail->AddAddress(getenv('SMTP_USER'));
    $mail->IsHTML(true);                                  // Set email format to HTML

    $mail->CharSet = 'UTF-8';

    $mail->Subject = 'Subject';
    $mail->Body    = '<h3>hello world</h3>';

    $mail->Send();
  }
}
try {
  Email::send('','');
  /*
	Form::validate($_POST);
	Recaptcha::validate($_POST['token']);
  Attachment::validate($_FILES);
  Email::send($_POST,$_FILES);
  */
  echo json_encode(['success' => 'Formulário enviado com sucesso!']);
}
catch (Exception $e) {
  echo json_encode(['error' => $e->getMessage()]);
}
