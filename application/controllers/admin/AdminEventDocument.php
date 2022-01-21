<?php

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\FirePHPHandler;

class AdminEventDocument extends CI_Controller
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
    try {
      $rs = array();
      $stmt = \Model::factory('\Models\Document', 'classroom')
        ->select('id')
        ->select('name')
        ->select('description')
        ->select('url')
        ->where('event_id', $event_id);
      $rs = $stmt->find_array();
      $resp = json_encode($rs);
    }catch (Exception $e) {
      $status = 500;
      $resp =$e->getTraceAsString();
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
				  $n = \Model::factory('\Models\Document', 'classroom')->create();
          $n->name = $new->{'name'};
          $n->description = $new->{'description'};
          $n->url = $new->{'url'};
          $n->event_id = $data->extra->event_id;
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
          $e = \Model::factory('\Models\Document', 'classroom')->find_one($edit->{'id'});
          $e->name = $edit->{'name'};
          $e->description = $edit->{'description'};
          $e->url = $edit->{'url'};
					$e->save();
        }
      }
      // deletes
      if(count($deletes) > 0){
				foreach ($deletes as &$delete) {
			    $d = \Model::factory('\Models\Document', 'classroom')->find_one($delete);
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

  public function send()
  {
    // load session
    $this->load->library('session');
    // libraries as filters
    $this->load->library('ViewSessionTrue', array(
      'config' => $this->config,
      'session' => $this->session,
    ));
    $this->load->library('HttpAccess',
      array(
        'config' => $this->config,
        'allow' => ['POST'],
        'received' => $this->input->server('REQUEST_METHOD'),
        'instance' => $this,
      )
    );
    // controller function
    // logger
    $logger = new Logger('my_logger');
    // data
    $status = 200;
    $createdIds = [];
    $students = json_decode($this->input->post('data'));
		$baseFile = explode('/', $this->input->post('file'));
    $folder = substr(UPLOAD_PATH, 0, -8) . $baseFile[0] . '/';
    $baseFile = $baseFile[1];
    $type = $this->input->post('type');
    $event_id = $this->input->post('event_id');
    $resp = array();
    $dateTime = new \DateTime();
    $timestamp = $dateTime->getTimestamp();
    $rand_path = 'templates/' . $timestamp;
    $logger->pushHandler(new StreamHandler(UPLOAD_PATH . $rand_path  . '/sendding.log', Logger::DEBUG));
    $logger->pushHandler(new FirePHPHandler());
    try {
      // load helpers
      $this->load->helper('admin/event_document');
      mkdir(UPLOAD_PATH . $rand_path, 0755);
      foreach ($students as &$student) {
        try {
          $pdfInfo = doPDF($student, $folder, $baseFile, $type, $event_id, $this->config->item('web_url'), $rand_path);
          $logger->info('Certificado (' . $type . ') del alumno ' . $student->{'last_names'} . ' ' . $student->{'first_names'} . 'creado. ');
          if($type == 'course' || $type == 'free-course'){
            sendEmail(
              $student,
              $this->config->item('web_url'),
              $pdfInfo,
              $rand_path
            );
            $logger->info('Certificado (' . $type . ') del alumno ' . $student->{'last_names'} . ' ' . $student->{'first_names'} . 'enviado al correo ' . $student->{'email'} . '.');
          }
        }catch (Exception $e) {
          $logger->error('El certificado del alumno ' . $student->{'last_names'} . ' ' . $student->{'first_names'} . 'no ha sido creado correctamente o enviado');
        }
      }
      // download zip
      $rand = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 20);
      $zipper = new \Chumper\Zipper\Zipper;
      $files = glob(UPLOAD_PATH . $rand_path . '*');
      $zipper->make(UPLOAD_PATH . 'templates/' . $rand . '.zip');
      $zipper->add($files); 
      $zipper->close();
      // response
      $resp = 'uploads/templates/' . $rand . '.zip';
    }catch (Exception $e) {
      $status = 500;
      $resp = json_encode(['ups', $e->getMessage()]);
    }
    // resp
    $this->output
      ->set_status_header($status)
      ->set_output($resp);
  }

  function delete()
  {
    $this->load->library('HttpAccess',
      array(
        'config' => $this->config,
        'allow' => ['GET'],
        'received' => $this->input->server('REQUEST_METHOD'),
        'instance' => $this,
      )
    );
    system('rm -rf '.escapeshellarg(UPLOAD_PATH . 'templates'));
    mkdir(UPLOAD_PATH . 'templates', 0755);
    // resp
    $this->output
      ->set_status_header(200)
      ->set_output('ok');
  }
}

?>