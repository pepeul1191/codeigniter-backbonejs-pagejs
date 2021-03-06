<?php

class AdminSpecialism extends CI_Controller
{
  public function list()
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
      $rs = \Model::factory('\Models\Specialism', 'classroom')
        ->select('id')
        ->select('name')
        ->find_array();
      $resp = json_encode($rs);
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
    //libraries as filters
    $this->load->library('HttpAccess',
      array(
        'config' => $this->config,
        'allow' => ['POST'],
        'received' => $this->input->server('REQUEST_METHOD'),
        'instance' => $this,
      )
    );
    //controller function
    \ORM::get_db('classroom')->beginTransaction();
    $data = json_decode($this->input->post('data'));
		$news = $data->{'new'};
		$edits = $data->{'edit'};
    $deletes = $data->{'delete'};
    $created_ids = [];
    $resp = '';
    $status = 200;
    try {
      // news
      if(count($news) > 0){
				foreach ($news as &$new) {
				  $n = \Model::factory('\Models\Specialism', 'classroom')->create();
					$n->name = $new->{'name'};
					$n->save();
				  $temp = [];
				  $temp['tempId'] = $new->{'id'};
	        $temp['newId'] = $n->id;
	        array_push( $created_ids, array(
            'tempId' => $new->{'id'},
            'newId' => $n->id,
          ));
				}
      }
      // edits
      if(count($edits) > 0){
				foreach ($edits as &$edit) {
          $e = \Model::factory('\Models\Specialism', 'classroom')->find_one($edit->{'id'});
					$e->name = $edit->{'name'};
					$e->save();
        }
      }
      // deletes
      if(count($deletes) > 0){
				foreach ($deletes as &$delete) {
			    $d = \Model::factory('\Models\Specialism', 'classroom')->find_one($delete);
			    $d->delete();
				}
      }
      // commit
      \ORM::get_db('classroom')->commit();
      // response data
      $resp = json_encode($created_ids);
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
