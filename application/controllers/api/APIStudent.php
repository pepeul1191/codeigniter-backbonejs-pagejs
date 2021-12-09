<?php

class APIStudent extends CI_Controller
{
  public function check()
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
      $email = $this->input->get('email');
      $rs = \Model::factory('\Models\Student', 'classroom')
        ->select('id')
        ->select('names')
        ->select('last_names')
        ->where('email', $email)
        ->find_one();
      if($rs == false){
        $resp = json_encode(['ups', 'Alumno no encontrado']);
        $status = 404;
      }else{
        $student = $rs->as_array();
        $resp = json_encode($student);
      }
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function get()
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
    $student_id = $this->input->get('id');
    try {
      // get student data
      $rs = \Model::factory('\Models\Student', 'classroom')
        ->where('id', $student_id)
        ->find_one();
      if($rs == false){
        $resp = json_encode(['ups', 'Ponente no encontrado']);
        $status = 404;
      }else{
        $rs = $rs->as_array();
        // get district 
        //var_dump($rs);exit();
        $district = \Model::factory('\Models\VWDistrict', 'classroom')
          ->where('id', $rs['district_id'])
          ->find_one();
        $rs['district_name'] = $district->name;
        // get specialisms
        $pdo = \ORM::get_db('classroom');
        $query = '
          SELECT T.id AS id, T.name AS name, (CASE WHEN (P.exist = 1) THEN 1 ELSE 0 END) AS exist FROM
          (
            SELECT id, name, 0 AS exist FROM specialisms
          ) T 
          LEFT JOIN 
          (
            SELECT C.id, C.name, 1 AS exist FROM 
            specialisms C INNER JOIN specialisms_students TC ON
            C.id = TC.specialism_id
            WHERE TC.student_id = %d
          ) P 
          ON P.id = T.id
        ';
        $specialisms = array();
        foreach($pdo->query(sprintf($query, $student_id)) as $row) {
          array_push($specialisms, array(
            'id' => $row['id'],
            'name' => $row['name'],
            'exist' => $row['exist'],
          ));
        }
        $rs['specialisms'] = $specialisms;
        // resp
        $resp = json_encode($rs);
      }
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode($e->getMessage());
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  public function update()
  {
    //libraries as filters
    $this->load->library('APIAccess',
      array(
        'config' => $this->config,
        'instance' => $this,
      )
    );
    $this->load->library('HttpAccess',
      array(
        'config' => $this->config,
        'allow' => ['POST'],
        'received' => $this->input->server('REQUEST_METHOD'),
        'instance' => $this,
      )
    );
    //controller function
    $resp_data = '';
    $status = 200;
    $id = $this->input->post('student_id');
    $data = json_decode($this->input->post('data'));
    // update student
    \ORM::get_db('classroom')->beginTransaction();
    try {
      $e = \Model::factory('\Models\Student', 'classroom')->find_one($id);
      $e->phone = $data->{'phone'};
      $e->address = $data->{'address'};
      $e->district_id = $data->{'district_id'};
      $e->save();
      // udpate specialsms
      if(count($data->{'specialisms'}) > 0){
				foreach ($data->{'specialisms'} as &$specialism) {
          $specialism_id = $specialism->{'specialism_id'};
          $exist = $specialism->{'exist'};
          $e = \Model::factory('\Models\SpecialismStudent', 'classroom')
            ->where('specialism_id', $specialism_id)
            ->where('student_id', $id)
            ->find_one();
          if($exist == 0){
            if($e != false){
              $e->delete();
            }
          }else{
            if($e == false){
              $n = \Model::factory('\Models\SpecialismStudent', 'classroom')->create();
              $n->specialism_id = $specialism_id;
              $n->student_id = $id;
              $n->save();
            }
          }
        }
      }
      // commit
      \ORM::get_db('classroom')->commit();
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