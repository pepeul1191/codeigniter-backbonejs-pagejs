<?php

class APIPdf extends CI_Controller
{
  public function generate()
  {
    // libraries as filters
    $this->load->library('APIAccess',
      array(
        'config' => $this->config,
        'instance' => $this,
      )
    );
    //controller function
    $resp = '';
    $status = 200;
    $event_id = $this->input->get('event_id');
    $student_id = $this->input->get('student_id');
    $code = $this->input->get('code'); // document code, only for 'Diplomado' and 'Curso', not 'curso libre'
    $grade = $this->input->get('grade'); // document code, only for 'Diplomado'
    try {
      if($event_id != null && $student_id != null){
        $info_document = \Model::factory('\Models\VWEventStudent', 'classroom')
          ->select('event_id')
          ->select('event_type_name')
          ->select('event_name', 'name')
          ->select('pdf_base')
          ->select('names', 'student_names')
          ->select('last_names', 'student_last_names')
          ->select('id', 'student_id')
          ->where(
            array(
              'id' => $student_id,
              'event_id' => $event_id,
            )
          )
        ->find_one();
        if($info_document == false){
          $status = 404;
          $resp = 'Registro no existe';
        }else{
          $this->load->helper('Pdf');
          $pdf = null;
          if($info_document->{'event_type_name'} == 'Diplomado'){
            if($code != null && $grade != null){
              $pdf = certifiedPDF($this->config, $info_document, $code, $grade);
            }else{
              $status = 500;
              $resp = 'Datos incompletos para generar la constacia del diplomado';
            }
          }else if($info_document->{'event_type_name'} == 'Curso'){
            if($code != null){
              $pdf = coursePDF($this->config, $info_document, $code);
            }else{
              $status = 500;
              $resp = 'Datos incompletos para generar la constacia del curso';
            }
          }
        }
      }else{
        $status = 500;
        $resp = 'Debe de precisar el evento y el alumno';
      }
    }catch (Exception $e) {
      $status = 500;
      var_dump($e->getMessage());exit();
      $resp = json_encode($e->getMessage());
    }
    if($status == 200 && $pdf != null){
      header('Content-Type: application/pdf');
      header ('Content-Disposition:', 'inline;');
      echo $pdf->render();
    }else{
      $this->output
        ->set_status_header($status)
        ->set_output($resp);
    }
  }
}