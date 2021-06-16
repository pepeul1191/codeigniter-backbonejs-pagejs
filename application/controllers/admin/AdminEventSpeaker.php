<?php

class AdminEventSpeaker extends CI_Controller
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

  public function save()
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
}

?>