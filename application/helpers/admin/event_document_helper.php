<?php 

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function widthForStringUsingFontSize($string, $font, $fontSize)
{
    $drawingString = iconv('UTF-8', 'UTF-16BE//IGNORE', $string);
    $characters = array();
    for ($i = 0; $i < strlen($drawingString); $i++) {
        $characters[] = (ord($drawingString[$i++]) << 8 ) | ord($drawingString[$i]);
    }
    $glyphs = $font->glyphNumbersForCharacters($characters);
    $widths = $font->widthsForGlyphs($glyphs);
    $stringWidth = (array_sum($widths) / $font->getUnitsPerEm()) * $fontSize;
    return $stringWidth;
 }

if ( ! function_exists('doPDF'))
{
  // $folder = $this->input->post('folder'); # YA FUE!!!!
  function doPDF($student, $folder, $baseFile, $type, $event_id, $webURL, $rand_path)
  {
    $resp = array();
    // qr
    $data = '%sstudent/check?event_id=%d&dni=%d&code=%s&grade=%d' ;
    $data = sprintf($data, $webURL, $event_id, $student->{'dni'}, $student->{'code'}, $student->{'grade'});
    $qr = (new QRCode)->render($data);
    $image = new Zend_Pdf_Resource_Image_Png($qr);
    // pdf
    $pdf = Zend_Pdf::load($folder . $baseFile);
    $customFont = Zend_Pdf_Font::fontWithPath(BASE_PATH . '/public/assets/fonts/Palatino Linotype.ttf');
    //$customFont = Zend_Pdf_Font::fontWithName(Zend_Pdf_Font::FONT_HELVETICA);
    //var_dump($type);
    if($type == 'certified'){ // diplomado
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 325, 35, 500, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $student->{'last_names'} . ' ' . $student->{'first_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(strtoupper($student->{'last_names'} . ' ' . $student->{'first_names'}), $position, 330);
      // code
      $page = $pdf->pages[1];
      $page->setFont($customFont, 26);
      $page->drawText($student->{'code'}, 625, 330);
      // grade
      $page->setFont($customFont, 36);
      $page->drawText($student->{'grade'}, 625, 180);
      // resp
      $resp = null;
    }
    if($type == 'course'){ // curso
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 90, 35, 265, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $student->{'last_names'} . ' ' . $student->{'first_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(strtoupper($student->{'last_names'} . ' ' . $student->{'first_names'}), $position, 330);
      // code
      $page = $pdf->pages[1];
      $page->setFont($customFont, 26);
      $page->drawText($student->{'code'}, 625, 330);
    }
    if($type == 'free-course'){ // curso libre
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 90, 35, 265, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $student->{'last_names'} . ' ' . $student->{'first_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(strtoupper($student->{'last_names'} . ' ' . $student->{'first_names'}), $position, 330);
    }
    // save pdf
    $pdf->save($folder . $rand_path . '/' .$student->{'id'} . ' ' . $student->{'last_names'} . ' ' . $student->{'first_names'} . '.pdf');
    // resp
    if(empty($resp)){
      $resp['filePath'] =  UPLOAD_PATH . $rand_path . '/' . $student->{'id'} . ' ' . $student->{'last_names'} . ' ' . $student->{'first_names'} . '.pdf';
      $resp['qr'] = $qr;
    }
    return $resp;
  }
}

if ( ! function_exists('sendEmail'))
{
  function sendEmail($student, $webURL, $pdf, $rand_path)
  {
    // add .env from helpers
    $dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $layout = require VIEWPATH . '/mails/congratulations.php';
    $logo_url = 'http://legisjuristas.com/public/assets/img/legis-mail.png';//$webURL . 'assets/img/mail-logo.png';
    $img_url = 'http://legisjuristas.com/public/assets/img/slider.jpg';//$webURL . 'assets/img/mail-background.jpeg';
    $favicon = $webURL . 'favicon.png';
    $data_layout = array(
      '%email' => $_ENV['MAIL_SENDER'],
      '%phone' => $_ENV['PHONE'],
      '%logo_url' => $logo_url,
      '%img_url' => $img_url,
      '%base_url' => $webURL,
      '%favicon' => $favicon,
      '%primary' => $_ENV['PRIMARY'],
      '%secondary' => $_ENV['SECONDARY'],
      '%enterprise_name' => $_ENV['NAME'],
      '%about' => $_ENV['ABOUT'],
      '%adress' => $_ENV['ADRESS'],
      '%phone' => $_ENV['PHONE'],
      '%qr' => $pdf['qr'],
      '%year' => date('Y'),
    );
    $message = str_replace(
      array_keys($data_layout), 
      array_values($data_layout), 
      $layout
    );
    // send mail
    $mail = new PHPMailer(true);
    try {
      // server settings
      $mail->SMTPDebug = 0;
      $mail->isSMTP();
      $mail->CharSet = 'UTF-8';
      $mail->Debugoutput = 'html';
      $mail->Host = $_ENV['MAIL_HOST'];
      $mail->Username = $_ENV['MAIL_USER'];
      $mail->Password = $_ENV['MAIL_PASS'];
      $mail->SMTPSecure = 'tls'; // gmail tls, otro ssl
      $mail->SMTPAuth   = true; 
      $mail->Port = $_ENV['MAIL_PORT'];
      // recipients
      $mail->setFrom($_ENV['MAIL_SENDER'], $_ENV['NAME']);
      $mail->addAddress($student->{'email'}, $student->{'email'});     // Add a recipient
      // content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = $student->{'subject'};
      $mail->Body = $message;
      $mail->addAttachment($pdf['filePath'], $student->{'last_names'} . ' ' . $student->{'first_names'} . '.pdf');
      // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
      // send
      // echo $message;exit();
      $mail->send();
    } catch (Exception $e) {
      var_dump($e);
      $resp['status'] = 500;
      $resp['message'] = $e->getMessage();
    }
  }
}

?>
