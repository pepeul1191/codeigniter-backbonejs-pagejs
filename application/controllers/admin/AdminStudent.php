<?php

class AdminStudent extends CI_Controller
{
  public function list()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    $resp = '';
    $status = 200;
    try {
      $rs = array();
      $stmt = \Model::factory('\Models\Student', 'classroom')
        ->select('id')
        ->select('names')
        ->select('last_names')
        ->select('code')
        ->select('tuition')
        ->select('dni');
      // filter name
      if(
        $this->input->get('name') != null
      ){
        $stmt = $stmt->where_like('names', '%' . $this->input->get('name') . '%');
        $stmt = $stmt->where_like('last_names', '%' . $this->input->get('name') . '%');
      }
      // filter code
      if(
        $this->input->get('code') != null
      ){
        $stmt = $stmt->where_like('code', '%' . $this->input->get('code'). '%');
      }
      // filter tuition
      if(
        $this->input->get('tuition') != null
      ){
        $stmt = $stmt->where_like('tuition', '%' . $this->input->get('tuition'). '%');
      }
      // filter dni
      if(
        $this->input->get('dni') != null
      ){
        $stmt = $stmt->where_like('dni', '%' . $this->input->get('dni'). '%');
      }
      // pages with final statement
      $pages = ceil(
        $stmt->count()
        / $this->input->get('step')
      );
      // pagination
      if(
        $this->input->get('step') != null && 
        $this->input->get('page') != null
      ){
        $offset = ($this->input->get('page') - 1) * $this->input->get('step');
        $stmt = $stmt->offset($offset)->limit($this->input->get('step'));
      }
      $rs = $stmt->find_array();
      for($i = 0; $i < count($rs); $i++){
        $rs[$i]['name'] = $rs[$i]['names'] . ' ' . $rs[$i]['last_names'];
      }
      $resp = json_encode(array(
        'list' => $rs,
        'pages' => $pages,
      ));
    }catch (Exception $e) {
      $status = 500;
      $resp =$e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }
}

?>