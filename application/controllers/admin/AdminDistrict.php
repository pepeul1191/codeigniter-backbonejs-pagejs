<?php

class AdminDistrict extends CI_Controller
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
    $province_id = $this->input->get('province_id');
    try {
      $rs = \Model::factory('\Models\District', 'classroom')
        ->select('id')
        ->select('name')
        ->where('province_id', $province_id)
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
