<?php

class APISpecialism extends CI_Controller
{
  public function listOnlyInEvents()
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
   $query_date = $this->input->get('date');
   try {
      $stmt = \Model::factory('\Models\VWEventSpecialim', 'classroom')
        ->select('id')
        ->select('name');
      if($query_date != null){
        $stmt = $stmt->where_raw($query_date); 
      }
      $rs = $stmt->group_by('id')->find_array();
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