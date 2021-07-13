<?php

class APIEvent extends CI_Controller
{
  public function eventsStudent()
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
      $student_id = $this->input->get('student_id');
      // query
      $events = \Model::factory('\Models\VWEventStudent', 'classroom')
        ->select('event_id', 'id')
        ->select('event_name', 'name')
        ->select('event_description', 'description')
        ->select('picture_url')
        ->where('id', $student_id)
        ->find_array();
      $resp = json_encode($events);
    }catch (Exception $e) {
      $status = 500;
      var_dump($e->getMessage());exit();
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function studentVideos()
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
      $student_id = $this->input->get('student_id');
      $event_id = $this->input->get('event_id');
      // query
      $videos = \Model::factory('\Models\VWEventVideoStudent', 'classroom')
        ->select('video_id', 'id')
        ->select('name')
        ->select('description')
        ->select('url')
        ->where('student_id', $student_id)
        ->where('event_id', $event_id) 
        ->find_array();
      $resp = json_encode($videos);
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function studentDocuments()
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
      $student_id = $this->input->get('student_id');
      $event_id = $this->input->get('event_id');
      // query
      $documents = \Model::factory('\Models\VWEventDocumentStudent', 'classroom')
        ->select('document_id', 'id')
        ->select('name')
        ->select('description')
        // ->select('url')
        ->where('student_id', $student_id)
        ->where('event_id', $event_id) 
        ->find_array();
      $resp = json_encode($documents);
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function getDocumentURL()
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
      $student_id = $this->input->get('student_id');
      $event_id = $this->input->get('event_id');
      $document_id = $this->input->get('document_id');
      // query
      $document = \Model::factory('\Models\VWEventDocumentStudent', 'classroom')
        ->select('url')
        ->where('student_id', $student_id)
        ->where('event_id', $event_id) 
        ->where('document_id', $document_id)
        ->find_one();
      if($document != false){
        $resp = $document->url;
      }else{
        $status = 404;
        $resp = 'no existe documento';
      }
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function recentList()
  {
    // load session
    $this->load->library('session');
    $this->load->library('APIAccess',
      array(
        'config' => $this->config,
        'instance' => $this,
      )
    );
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

  public function search()
  {
    // libraries as filters
    $this->load->library('APIAccess',
      array(
        'config' => $this->config,
        'instance' => $this,
      )
    );
    //controller function
    $rpta = '';
    $status = 200;
    try {
      // query params
      $query_date = $this->input->get('query_date'); # 'init_date >= CURDATE()'
      $specialism_id = $this->input->get('specialism_id');
      $page = $this->input->get('page');
      $step = $this->input->get('step');
      $event_type_id = $this->input->get('event_type_id');
      // stmt
      $rs = array();
      $stmt = \Model::factory('\Models\VWEventType', 'classroom');
      // filters
      if($specialism_id != null && $specialism_id != 'E'){
        $stmt = $stmt->where('specialism_id', $specialism_id); 
      }
      if($query_date != null){
        $stmt = $stmt->where_raw($query_date); 
      }
      if($event_type_id != null && $event_type_id != 'E'){
        $stmt = $stmt->where('event_type_id', $event_type_id); 
      }
      // pages with final statement
      $pages = ceil($stmt->count() / $step);
      // pagination
      if($step != null && $page != null){
        $offset = ($page - 1) * $step;
        $stmt = $stmt->offset($offset)->limit($step)->order_by_asc('init_date');
      }
      // do query
      $rs = $stmt->find_array();
      $speakers = array();
      foreach ($rs as &$event) {
        $speakers = \Model::factory('\Models\VWEventSpeaker', 'classroom')
          ->select('names')
          ->select('last_names')
          ->select('picture_url')
          ->where('event_id', $event['id'])
          ->find_array();
        $event['speakers'] = $speakers;
      }
      $rpta = json_encode(array(
        'list' => $rs,
        'pages' => $pages,
      ));
    }catch (Exception $e) {
      $status = 500;
      $rpta = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($rpta);
  }
}

?>