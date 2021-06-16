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
    // data
    $event_id = intval($this->input->get('event_id'));
    $registered = $this->input->get('registered');
    $name = $this->input->get('name');
    $dni = $this->input->get('dni');
    $code = $this->input->get('code');
    $tuition = $this->input->get('tuition');
    $registered = $this->input->get('registered');
    $page = intval($this->input->get('page'));
    $step = intval($this->input->get('step'));
    // db
    try {
      $pdo = \ORM::get_db('classroom');
      $query = 'SELECT event_id, id, CONCAT(last_names, ", ", names) AS name, dni, code, tuition FROM vw_events_students';
      $where = false;
      // names and last names
      if($name != null){
        $name = $this->input->get('name');
        $query = $query . ' WHERE (names LIKE "%' . $name . '%" OR last_names LIKE  "%' . $name . '%" )';
        $where = true;
      }
      // dni
      if($dni != null){
        if($where){
          $query = $query . ' AND (dni LIKE "%' . $dni . '%" )';
        }else{
          $query = $query . ' WHERE (dni LIKE "%' . $dni . '%" )';
          $where = true;
        }
      }
      // code
      if($code != null){
        if($where){
          $query = $query . ' AND (code LIKE "%' . $code . '%" )';
        }else{
          $query = $query . ' WHERE (code LIKE "%' . $code . '%" )';
          $where = true;
        }
      }
      // tuition
      if($tuition != null){
        if($where){
          $query = $query . ' AND (tuition LIKE "%' . $tuition . '%" )';
        }else{
          $query = $query . ' WHERE (tuition LIKE "%' . $tuition . '%" )';
          $where = true;
        }
      }
      // event and registered
      if($registered == 'true'){
        if($where){
          $query = $query . ' AND (event_id =' . $event_id . ')';
        }else{
          $query = $query . ' WHERE (event_id =' . $event_id . ')';
          $where = true;
        }
      }else{
        if($where){
          $query = $query . ' AND (event_id !=' . $event_id . ')';
        }else{
          $query = $query . ' WHERE (event_id !=' . $event_id . ')';
          $where = true;
        }
      }
      // group by
      $query = $query . ' GROUP BY id ';
      // pages with final statement
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      $count = $stmt->rowCount();
      $pages = ceil(
        $count
        / $this->input->get('step')
      );
      // count
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      $count = $stmt->rowCount();
      // pagination
      if($step != null && $page != null){
        $offset = ($page - 1) * $step;
        // $stmt = $stmt->offset($offset)->limit($this->input->get('step'));
        $query = $query . ' ORDER BY name LIMIT ' . $step . ' OFFSET ' . $offset;
      }
      // reesult set and resp
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      $resp = json_encode(array(
        'list' => $stmt->fetchAll(),
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