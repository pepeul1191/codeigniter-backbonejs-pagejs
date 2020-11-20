<?php

class AdminSpeaker extends CI_Controller
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
      $stmt = \Model::factory('\Models\Speaker', 'classroom')
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

  public function specialism()
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
          SELECT id, name, 0 AS exist FROM specialisms
        ) T 
        LEFT JOIN 
        (
          SELECT C.id, C.name, 1 AS exist FROM 
          specialisms C INNER JOIN specialisms_speakers TC ON
          C.id = TC.specialism_id
          WHERE TC.speaker_id = %d
        ) P 
        ON P.id = T.id
      ';
      $rs = array();
      foreach($pdo->query(sprintf($query, $this->input->get('id'))) as $row) {
        array_push($rs, array(
          'id' => $row['id'],
          'name' => $row['name'],
          'exist' => $row['exist'],
        ));
      }
      if($rs == false){
        $resp = 'Parcipante no tiene especialidades asociadas';
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
    //libraries as filters
    /// TODO
    //controller function
    $id = $this->input->post('id');
    $dni = $this->input->post('dni');
    $code = $this->input->post('code');
    $tuition = $this->input->post('tuition');
    $names = $this->input->post('names');
    $last_names = $this->input->post('last_names');
    $email = $this->input->post('email');
    $phone = $this->input->post('phone');
    $picture_url = $this->input->post('picture_url');
    $resume = $this->input->post('resume');
    $gender_id = $this->input->post('gender_id');
    if($picture_url == ''){
      $picture_url = 'assets/img/default-user.png';
    }
    if($code == ''){
      $code = 1;
    }
    $resp_data = '';
    $status = 200;
    try {
      if($id == 'E'){
        // new
        $n = \Model::factory('\Models\Speaker', 'classroom')->create();
        $n->dni = $dni;
        $n->code = $code;
        $n->tuition = $tuition;
        $n->names = $names;
        $n->last_names = $last_names;
        $n->email = $email;
        $n->phone = $phone;
        $n->picture_url = $picture_url;
        $n->resume = $resume;
        $n->gender_id = $gender_id;
        $n->save();
        $resp_data = $n->id;
      }else{
        // edit
        $e = \Model::factory('\Models\Speaker', 'classroom')->find_one($id);
        $e->dni = $dni;
        $e->code = $code;
        $e->tuition = $tuition;
        $e->names = $names;
        $e->last_names = $last_names;
        $e->email = $email;
        $e->phone = $phone;
        $e->picture_url = $picture_url;
        $e->resume = $resume;
        $e->gender_id = $gender_id;
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

  public function specialismSave()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    // ???
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $data = json_decode($this->input->post('data'));
		$edits = $data->{'edit'};
    $speaker_id = $data->{'extra'}->{'speaker_id'};
    $resp_data = '';
    $status = 200;
    try {
      // edits
      if(count($edits) > 0){
				foreach ($edits as &$edit) {
          $specialism_id = $edit->{'id'};
          $exist = $edit->{'exist'};
          $e = \Model::factory('\Models\SpecialismSpeaker', 'classroom', 'coa')
            ->where('specialism_id', $specialism_id)
            ->where('speaker_id', $speaker_id)
            ->find_one();
          if($exist == 0){
            if($e != false){
              $e->delete();
            }
          }else{
            if($e == false){
              $n = \Model::factory('\Models\SpecialismSpeaker', 'classroom', 'coa')->create();
              $n->specialism_id = $specialism_id;
              $n->speaker_id = $speaker_id;
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