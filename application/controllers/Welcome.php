<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		echo 'xd';
		/*
		$data = array(
      'title' => 'Home',
    );
		$this->load->view('welcome_message', $data);
		*/
		$this->load->library('session');
		$continue = true;
		if($this->config->item('env_session') == true){
      if ($this->session->has_userdata('state')) {
        if($this->session->has_userdata('state') != true){
          $continue = false;
        }
      }else{
        $continue = false;
      }
      if($continue == false){
        header('Location: http://legisjuristas.com');
        exit();
      }else{
				header('Location: ' . $this->config->item('base_url') . 'admin/student');
				exit();
			}
    }
    exit();
	}
}
