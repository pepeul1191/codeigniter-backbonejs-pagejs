<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

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

if ( ! function_exists('certified')) // diplomado
{
  function certifiedPDF($config, $info_document, $code, $grade)
  {
    // data
    $web_url = $config->item('web_url');
    $event_id = $info_document->{'event_id'};
    $event_name = $info_document->{'event_name'};
    $dni = $info_document->{'dni'};
    $student_names = $info_document->{'student_names'} . ' ' . $info_document->{'student_last_names'};
    $pdf_base = $info_document->{'pdf_base'};
    // qr
    $data = $web_url . 'student/check?event_id=' . $event_id . '&dni=' . $dni;
    if($grade != null){$data = $data . '&grade=' . $grade;}
    if($code != null){$data = $data . '&code=' . $code;}
    $qr = (new QRCode)->render($data);
    $image = new Zend_Pdf_Resource_Image_Png($qr);
    // echo '<img src="'.(new QRCode)->render($data).'" alt="QR Code" />';exit();
    $qr = (new QRCode)->render($data);
    $image = new Zend_Pdf_Resource_Image_Png($qr);
    // pdf
    $pdf = Zend_Pdf::load($config->item('base_path'). 'public/' . $pdf_base);
    $customFont = Zend_Pdf_Font::fontWithPath($config->item('base_path') . 'public/assets/fonts/Palatino Linotype.ttf');
    if($info_document->{'event_type_name'} == 'Diplomado'){ // diplomado
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 325, 35, 500, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(mb_strtoupper($info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}), $position, 330, 'UTF-8');
      $pdf->pages[0] = $page;
      // code
      $page = $pdf->pages[1];
      $page->setFont($customFont, 26);
      $page->drawText($code, 625, 330);
      // grade
      $page->setFont($customFont, 36);
      $page->drawText($grade, 625, 180);
    }
    if($info_document->{'event_type_name'} == 'Curso'){ // curso
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 90, 35, 265, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(mb_strtoupper($info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}), $position, 330, 'UTF-8');
      // code
      $page = $pdf->pages[1];
      $page->setFont($customFont, 26);
      $page->drawText($code, 625, 330);
    }
    if($info_document->{'event_type_name'} == 'free-course'){ // curso libre
      // qr
      $page = $pdf->pages[0];
      $page->drawImage($image, 90, 35, 265, 210); // source, x1, y1, x2, y2 || 150, 300, 350, 500
      $pdf->pages[0] = $page;
      $page->setFont($customFont, 22);
      // name
      $textWidth = widthForStringUsingFontSize(
        $info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}, $customFont, 22
      );
      $position = (800 - $textWidth)/2;
      $page->drawText(mb_strtoupper($info_document->{'student_last_names'} . ' ' . $info_document->{'student_names'}), $position, 330, 'UTF-8');
    }
    // TODO
    return $pdf;
  }
}

if ( ! function_exists('course')) // curso
{
  function coursePDF($config, $info_document, $code)
  {
    // data
    $web_url = $config->item('web_url');
    $event_id = $info_document->{'event_id'};
    $event_name = $info_document->{'event_name'};
    $student_id = $info_document->{'student_id'};
    $student_names = $info_document->{'student_names'} . ' ' . $info_document->{'student_last_names'};
    $pdf_base = $info_document->{'pdf_base'};
    // qr
    $data = '%sdocuments?event_id=%d&student_id=%d&code=%s';
    $data = sprintf($data, $web_url, $event_id, $student_id, $code);
      // echo '<img src="'.(new QRCode)->render($data).'" alt="QR Code" />';exit();
    $qr = (new QRCode)->render($data);
    $image = new Zend_Pdf_Resource_Image_Png($qr);
    // pdf
    // TODO
    $pdf = Zend_Pdf::load($config->item('base_path'). 'public/' . $pdf_base);
    $page = $pdf->pages[0];
    $font = Zend_Pdf_Font::fontWithName(Zend_Pdf_Font::FONT_HELVETICA);
    $page->setFont($font, 12);
    $page->drawText('Hello world!', 150, 50);
    $page->drawImage($image, 150, 300, 350, 500); // source, x1, y1, x2, y2
    $pdf->pages[0] = $page;
    return $pdf;
  }
}