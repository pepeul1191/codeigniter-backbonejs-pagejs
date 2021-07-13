<?php

class APISpeaker extends CI_Controller
{
  public function randomList()
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
    $number = $this->input->get('number');
    if($number == null){
      $number = 4;
    }
    try {
      $rs = \Model::factory('\Models\Speaker', 'classroom')
        ->select('picture_url')
        ->select('resume')
        ->select('names')
        ->select('last_names')
        ->order_by_expr('RAND()')
        ->limit($number)
        ->find_array();
      $resp = json_encode($rs);
    }catch (Exception $e) {
      $status = 500;
      $resp = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }
}

?>