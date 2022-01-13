<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

if ( ! function_exists('certified')) // diplomado
{
  function certifiedPDF($config, $info_document, $code, $grade)
  {
    // data
    $web_url = $config->item('web_url');
    $event_id = $info_document->{'event_id'};
    $event_name = $info_document->{'event_name'};
    $student_id = $info_document->{'student_id'};
    $student_names = $info_document->{'student_names'} . ' ' . $info_document->{'student_last_names'};
    $pdf_base = $info_document->{'pdf_base'};
    // qr
    $data = '%sdocuments?event_id=%d&student_id=%d&code=%s&grade=%d';
    $data = sprintf($data, $web_url, $event_id, $student_id, $code, $grade);
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