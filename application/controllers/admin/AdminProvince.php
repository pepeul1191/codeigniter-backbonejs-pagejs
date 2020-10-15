<?php

class AdminProvince extends CI_Controller
{
  public function list()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    $this->load->library('ViewSessionTrue', array(
      'config' => $this->config,
      'session' => $this->session,
    ));
    //libraries as filters
    $this->load->library('HttpAccess',
      array(
        'config' => $this->config,
        'allow' => ['GET'],
        'received' => $this->input->server('REQUEST_METHOD'),
        'instance' => $this,
      )
    );
    //controller function
    $rpta = '';
    $status = 200;
    $department_id = $this->input->get('department_id');
    try {
      $rs = \Model::factory('\Models\Province', 'classroom')
        ->select('id')
        ->select('name')
        ->where('department_id', $department_id)
        ->find_array();
      $rpta = json_encode($rs);
    }catch (Exception $e) {
      $status = 500;
      $rpta = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($rpta);
  }
}

?>
