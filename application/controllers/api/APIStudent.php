<?php

class APIStudent extends CI_Controller
{
  public function check()
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
    try {
      $email = $this->input->get('email');
      $rs = \Model::factory('\Models\Student', 'classroom')
        ->select('id')
        ->select('names')
        ->select('last_names')
        ->where('email', $email)
        ->find_one();
      if($rs == false){
        $resp = json_encode(['ups', 'Alumno no encontrado']);
        $status = 404;
      }else{
        $student = $rs->as_array();
        $resp = json_encode($student);
      }
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }
}

?>