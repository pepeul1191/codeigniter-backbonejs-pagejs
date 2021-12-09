<?php

class CustomError extends CI_Controller
{
  public function orverride()
  {
    if($this->input->server('REQUEST_METHOD') == 'GET'){
      header('Location: ' . $this->config->item('base_url') . 'error/access/404');
      exit();
    }else{
      $rpta = 'Error 404: Recurso no encontrado';
      $this->output
        ->set_status_header(404)
        ->set_output($rpta);
    }
  }

  public function access($error)
  {
    // load session
    $this->load->library('session');
    //libraries as filters
    // helpers
    $this->load->helper('Error');
    //controller function
    $rpta = '';
    $status = 404;
    //var_dump($error);exit();
    $numero = $error;
    $error = [];
    switch ($numero) {
      case '404':
        $error = [
          'numero' => 404,
          'mensaje' => 'Archivo no encontrado',
          'descripcion' => 'La página que busca no se encuentra en el servidor',
          'icono' => 'fa fa-exclamation-triangle'
        ];
        $status = 404;
        break;
      case '501':
        $error = [
          'numero' => 501,
          'mensaje' => 'Página en Contrucción',
          'descripcion' => 'Lamentamos el incoveniente, estamos trabajando en ello.',
          'icono' => 'fa fa-code-fork'
        ];
        $status = 500;
        break;
      case '5050':
        $error = [
          'numero' => 5050,
          'mensaje' => 'Acceso restringido',
          'descripcion' => 'No cuenta con los privilegios necesarios.',
          'icono' => 'fa fa-ban'
        ];
        $status = 500;
        break;
      case '505':
        $error = [
          'numero' => 5050,
          'mensaje' => 'Acceso restringido',
          'descripcion' => 'Necesita estar logueado.',
          'icono' => 'fa fa-ban'
        ];
        $status = 500;
        break;
      case '8080':
        $error = [
          'numero' => 8080,
          'mensaje' => 'Tiempo de la sesion agotado',
          'descripcion' => 'Vuelva a ingresar al sistema.',
          'icono' => 'fa fa-clock-o'
        ];
        $status = 500;
        break;
      default:
        $error = [
          'numero' => 404,
          'mensaje' => 'Archivo no encontrado',
          'descripcion' => 'La página que busca no se encuentra en el servidor',
          'icono' => 'fa fa-exclamation-triangle'
        ];
        $status = 404;
    }
    $home = $this->config->item('base_url');
    if($this->session->has_userdata('state')){
      if($this->session->userdata('state') == true){
        $home = $this->config->item('base_url') . 'admin';
      }
    }
    // response
    $data_top = array(
      'title' => 'Error',
      'csss' => access_css($this->config),
      'jss' => access_js($this->config),
      'error' => $error,
      'home' => $home,
    );
    $this->load->view('layouts/blank_header', $data_top);
    $this->load->view('custom_error/access');
    $this->load->view('layouts/blank_footer', array());
    $this->output->set_status_header($status);
  }
}

?>
