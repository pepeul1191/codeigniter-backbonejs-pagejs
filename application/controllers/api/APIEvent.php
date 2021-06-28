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
}

?>