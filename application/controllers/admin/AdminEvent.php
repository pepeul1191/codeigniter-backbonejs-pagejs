<?php

class AdminEvent extends CI_Controller
{
  public function save()
  {
    // load session
    $this->load->library('session');
    //libraries as filters
    /// TODO
    //controller function
    $id = $this->input->post('id'); 
    $code = $this->input->post('code');
    $name = $this->input->post('name'); 
    $hours = $this->input->post('hours');
    $gift = $this->input->post('gift');
    $event_type_id = $this->input->post('event_type_id'); 
    $picture_url = $this->input->post('picture_url');
    $description = $this->input->post('description'); 
    // init hour
    $init_hour =  date('h:i', strtotime($this->input->post('init_hour')));
    $init_date = date('Y-m-d', strtotime($this->input->post('init_date')));
    if($picture_url == ''){
      $picture_url = 'assets/img/default-event.png';
    }
    if($code == ''){
      $code = 1;
    }
    $resp_data = '';
    $status = 200;
    try {
      if($id == 'E'){
        // new
        $n = \Model::factory('\Models\Event', 'classroom')->create();
        $n->code = $code;
        $n->name = $name;
        $n->hours = $hours;
        $n->gift = $gift;
        $n->event_type_id = $event_type_id;
        $n->picture_url = $picture_url;
        $n->description = $description;
        $n->init_hour = $init_hour;
        $n->init_date = $init_date;
        $n->save();
        $resp_data = $n->id;
      }else{
        // edit
        $e = \Model::factory('\Models\Event', 'classroom')->find_one($id);
        $e->code = $code;
        $e->name = $name;
        $e->hours = $hours;
        $e->gift = $gift;
        $e->event_type_id = $event_type_id;
        $e->picture_url = $picture_url;
        $e->description = $description;
        $e->init_hour = $init_hour;
        $e->init_date = $init_date;
        $e->save();
      }
    }catch (Exception $e) {
      $status = 500;
      $resp_data = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }
}

?>