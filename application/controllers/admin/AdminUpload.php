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
      move_uploaded_file(
        $_FILES['file']['tmp_name'], 
        UPLOAD_PATH. $rand . '.' . $extension
      );
      $resp_data = json_encode(array(
        'url' => $this->config->item('static_url'),
        'path' => 'uploads/' . $rand . '.' . $extension,
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
