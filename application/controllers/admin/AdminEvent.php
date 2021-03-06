<?php

class AdminEvent extends CI_Controller
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
      $stmt = \Model::factory('\Models\VWEventType', 'classroom')
        ->select('id')
        ->select('code')
        ->select('name')
        ->select('event_type_name')
        ->select('init_date');
      // filter name
      if(
        $this->input->get('name') != null
      ){
        $stmt = $stmt->where_like('name', '%' . $this->input->get('name') . '%');
      }
      // filter code
      if(
        $this->input->get('code') != null
      ){
        $stmt = $stmt->where_like('code', '%' . $this->input->get('code'). '%');
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

  public function recentList()
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
    $resp = '';
    $status = 200;
    try {
      $rs_event = \Model::factory('\Models\VWEventType', 'classroom')
        ->where_raw('init_date >= CURDATE()')
        ->order_by_asc('init_date')
        ->find_array();
      $speakers = array();
      foreach ($rs_event as &$event) {
        $speakers = \Model::factory('\Models\VWEventSpeaker', 'classroom')
          ->select('names')
          ->select('last_names')
          ->select('picture_url')
          ->where('event_id', $event['id'])
          ->find_array();
          $event['speakers'] = $speakers;
      }
      $resp = json_encode($rs_event);
    }catch (Exception $e) {
      $status = 500;
      $resp = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

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
    $specialism_id = $this->input->post('specialism_id'); 
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
        $this->load->helper('random');
        // new
        $path = random(20);
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
        $n->specialism_id = $specialism_id;
        $n->upload_path = $path;
        $n->save();
        // create folder
        mkdir(UPLOAD_PATH . $path, 0700);
        // resp
        $resp_data = array(
          'id' => $n->id,
          'upload_path' => $n->upload_path,
          'action' => 'create',
        );
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
        $e->specialism_id = $specialism_id;
        $e->init_date = $init_date;
        $e->save();
        $resp_data = array(
          'action' => 'edit',
        );
      }
    }catch (Exception $e) {
      $status = 500;
      $resp_data = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output(json_encode($resp_data));
  }

  public function speaker()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    $resp = '';
    $status = 200;
    try {
      $pdo = \ORM::get_db('classroom');
      $query = '
        SELECT T.id AS id, T.name AS name, (CASE WHEN (P.exist = 1) THEN 1 ELSE 0 END) AS exist FROM
        (
          SELECT id, CONCAT(last_names, ", ", names) AS name, 0 AS exist FROM speakers
        ) T 
        LEFT JOIN 
        (
          SELECT C.id, CONCAT(C.last_names, ", ", C.names) AS name, 1 AS exist FROM 
          speakers C INNER JOIN events_speakers TC ON
          C.id = TC.speaker_id
          WHERE TC.event_id = %d
        ) P 
        ON P.id = T.id
      ';
      $rs = array();
      foreach($pdo->query(sprintf($query, $this->input->get('event_id'))) as $row) {
        array_push($rs, array(
          'id' => $row['id'],
          'name' => $row['name'],
          'exist' => $row['exist'],
        ));
      }
      if($rs == false){
        $resp = 'Evento no tiene ponentes asociados';
        $status = 404;
      }else{
        $resp = json_encode($rs);
      }
    }catch (Exception $e) {
      $status = 500;
      $resp = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function speakerSave()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $data = json_decode($this->input->post('data'));
		$edits = $data->{'edit'};
    $event_id = $data->{'extra'}->{'event_id'};
    $resp_data = '';
    $status = 200;
    try {
      // edits
      if(count($edits) > 0){
				foreach ($edits as &$edit) {
          $speaker_id = $edit->{'id'};
          $exist = $edit->{'exist'};
          $e = \Model::factory('\Models\EventSpeaker', 'classroom')
            ->where('speaker_id', $speaker_id)
            ->where('event_id', $event_id)
            ->find_one();
          if($exist == 0){
            if($e != false){
              $e->delete();
            }
          }else{
            if($e == false){
              $n = \Model::factory('\Models\EventSpeaker', 'classroom')->create();
              $n->speaker_id = $speaker_id;
              $n->event_id = $event_id;
              $n->save();
            }
          }
        }
      }
      // commit
      \ORM::get_db('classroom')->commit();
      // response data
      $resp_data = json_encode(array());
    }catch (Exception $e) {
      $status = 500;
      var_dump($e->getTrace());
      $resp_data = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }

  public function get()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    $rpta = '';
    $status = 200;
    try {
      $rs = \Model::factory('\Models\Event', 'classroom')
        ->where('id', $this->input->get('id'))
        ->find_one();
      if($rs == false){
        $rpta = json_encode(['ups', 'Evento no encontrado']);
        $status = 404;
      }else{
        $rs = $rs->as_array();
        $rpta = json_encode($rs);
      }
    }catch (Exception $e) {
      $status = 500;
      $rpta = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($rpta);
  }

  public function delete()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $data = json_decode($this->input->post('data'));
    $deletes = $data->{'delete'};
    $created_ids = [];
    $resp_data = '';
    $status = 200;
    try {
      // deletes
      if(count($deletes) > 0){
				foreach ($deletes as &$delete) {
          // delete events speakers
          \Model::factory('\Models\EventSpeaker', 'classroom')
            ->where('event_id', $delete)
            ->delete_many();
          // delete event
          $d = \Model::factory('\Models\Event', 'classroom')
            ->find_one($delete);
          $d->delete();
				}
      }
      // commit
      \ORM::get_db('classroom')->commit();
      // response data
      $resp_data = json_encode(array());
    }catch (Exception $e) {
      $status = 500;
      $resp_data = $e->getMessage();
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }
}

?>