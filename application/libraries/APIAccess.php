<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class APIAccess 
{
  function __construct($params)
  {
    if($params['config']->item('access_api')){
      $continue = true;
      $config = $params['config'];
      $headers = $params['instance']->input->request_headers();
      $api_params = $params['config']->item('api_access_params');
      if(array_key_exists($api_params['key'], $headers)){
        if($headers[$api_params['key']] != $api_params['value']){
          $continue = false;
        }
      }else{
        $continue = false;
      }
      // cotinue with request?
      if(!$continue){
        echo 'No puede acceder a este recurso API';
        $params['instance']->output
          ->set_status_header(501)
          ->set_output('No puede acceder a este recurso');
        exit();
      }else{
        echo ':)';
      }
    }
  }
}

?>
