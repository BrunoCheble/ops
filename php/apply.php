<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'php-mailer/src/PHPMailer.php';
require 'php-mailer/src/SMTP.php';
require 'php-mailer/src/Exception.php';

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
    if ($file["size"] > 5000000) {
      throw new Exception("O tamanho máximo do PDF é de 5mb");
    }
  }
}

class Recaptcha {

  public static $url = 'https://www.google.com/recaptcha/api/siteverify';

  public static function validate($token) {

    $secret = getenv('TOKEN_RECAPTCHA');
    $request = file_get_contents(self::$url.'?secret='.$secret.'&response='.$token);
    $result = json_decode($request);
	
	  if($result->success) {
      return;
    }
    
    throw new Exception("Requisição inválida, favor entrar em contato por e-mail");
  }
}

class Email {

  public static function getBody($body) {
    $return = [
      '<b>Name:</b> '.$body['name'],
      '<b>E-mail:</b> '.$body['email'],
      '<b>URL:</b> '.(isset($body['url']) ? $body['url'] : 'N/D'),
      '<b>Comment:</b> '.(isset($body['obs']) ? $body['obs'] : 'N/D')
    ];

    return implode('<br/>',$return);
  }

  public static function send($subject, $body, $attachment, $debug = 0) {
    
		$mail = new PHPMailer(true);
    $mail->SMTPDebug = $debug;
    
    $mail->IsSMTP();
    $mail->Host = getenv('SMTP_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USER');
    $mail->Password = getenv('SMTP_PASS');
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->SetFrom(getenv('SMTP_FROM_EMAIL'), getenv('SMTP_FROM_NAME'));
    $mail->AddAddress(getenv('SMTP_TO_EMAIL'));
    $mail->IsHTML(true);

    $mail->CharSet = 'UTF-8';

    $mail->Subject = $subject;
    $mail->Body    = $body;
    
    if($attachment) {
      $mail->AddAttachment($attachment['tmp_name'], $attachment['name']);
    }

    $mail->Send();
  }
}
try {

  if(isset($_GET['test'])) {
    Email::send('Test','Hello World',null,1);
    die;
  }
  
  Form::validate($_POST);
  Recaptcha::validate($_POST['token_generate']);

  $attachment = isset($_FILES['curriculum']) ? $_FILES['curriculum'] : null;

  if ($attachment) Attachment::validate($attachment);
  
  Email::send($_POST['subject'], Email::getBody($_POST), $attachment);    

  echo json_encode(['success' => 'Formulário enviado com sucesso!']);
}
catch (Exception $e) {
  echo json_encode(['error' => $e->getMessage()]);
}
