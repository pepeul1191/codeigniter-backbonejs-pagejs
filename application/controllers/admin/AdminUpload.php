<?php

class AdminUpload extends CI_Controller
{
  public function file()
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
    $resp_data = '';
    $rand = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 20);
    try {
      $extension = explode('.', $_FILES['file']['name']); $extension = end($extension);
      $status = 200;
      $path = UPLOAD_PATH. $rand . '.' . $extension;
      $response_path = 'uploads/' . $rand . '.' . $extension;
      if(
        $this->input->post('path') != null
      ){
        $path = UPLOAD_PATH. $this->input->post('path') . DIRECTORY_SEPARATOR . $rand . '.' . $extension;
        $response_path = 'uploads/' . $this->input->post('path') . '/' . $rand . '.' . $extension;
      }
      move_uploaded_file(
        $_FILES['file']['tmp_name'], 
        $path
      );
      $resp_data = json_encode(array(
        'url' => $this->config->item('static_url'),
        'path' => $response_path,
      ));
    }catch (Exception $e) {
      $status = 500;
      $resp_data = json_encode(['ups', $e->getMessage()]);
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }

  public function pdf_event()
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
    $resp_data = '';
    $rand = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 20);
    try {
      $extension = explode('.', $_FILES['file']['name']); $extension = end($extension);
      $status = 200;
      $path = UPLOAD_PATH. 'templates/' .$rand . '.' . $extension;
      $response_path = 'uploads/templates/' . $rand . '.' . $extension;
      move_uploaded_file(
        $_FILES['file']['tmp_name'], 
        $path
      );
      $resp_data = json_encode(array(
        'url' => $this->config->item('static_url'),
        'path' => $response_path,
      ));
    }catch (Exception $e) {
      $status = 500;
      $resp_data = json_encode(['ups', $e->getMessage()]);
    }
    $this->output
      ->set_status_header($status)
      ->set_output($resp_data);
  }
}

?>
