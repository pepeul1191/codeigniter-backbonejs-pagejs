<?php

class AdminEventStudent extends CI_Controller
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
    $event_id = intval($this->input->get('event_id'));
    $registered = $this->input->get('registered');
    try {
      $rs = array();
      $stmt = \Model::factory('\Models\VWEventStudent', 'classroom')
        ->select('event_id')
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
        /*
        $stmt = $stmt->where_like(
          array(
            'names' => '%' . $this->input->get('name') . '%',
            'last_names' => '%' . $this->input->get('name') . '%',
          )
        );
        */
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
      // group by id
      $stmt = $stmt->group_by('id');
      // event and registered
      if($registered == 'true'){
        //var_dump('true');
        $stmt = $stmt->where('event_id', $event_id);
      }else{
        //var_dump('false');
        $stmt = $stmt->where_not_equal('event_id', $event_id);
      }
      // pages with final statement
      $rs = $stmt->find_array();
      $pages = ceil(
        count($rs)
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
      $resp =$e->getTraceAsString();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }


  public function studentSave()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $event_id = $this->input->post('event_id');
		$student_id = $this->input->post('student_id');
    $resp_data = '';
    $status = 200;
    try {
      $e = \Model::factory('\Models\EventStudent', 'classroom')
        ->where('student_id', $student_id)
        ->where('event_id', $event_id)
        ->count();
      if($e == 0){
        $n = \Model::factory('\Models\EventStudent', 'classroom')->create();
        $n->student_id = $student_id;
        $n->event_id = $event_id;
        $n->save();
        \ORM::get_db('classroom')->commit();
        $resp_data = $n->id;
      }else{
        $resp_data = 0;
      }
    }catch (Exception $e) {
      $status = 500;
      var_dump($e->getTrace());
      $resp_data = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }


  public function removeSave()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $event_id = $this->input->post('event_id');
		$student_id = $this->input->post('student_id');
    $resp_data = '';
    $status = 200;
    try {
      $d = \Model::factory('\Models\EventStudent', 'classroom')
        ->where('student_id', $student_id)
        ->where('event_id', $event_id);
      if($d->count() == 1){
        $d->find_one()->delete();
        \ORM::get_db('classroom')->commit();
        $resp_data = 1;
      }else{
        $resp_data = 0;
      }
    }catch (Exception $e) {
      $status = 500;
      var_dump($e->getTrace());
      $resp_data = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }
}

?>