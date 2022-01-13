<?php
defined('BASEPATH') OR exit('No direct script access allowed');

ORM::configure('mysql:host=localhost;port=3306;dbname=classroomV2;charset=utf8;', null, 'classroom');
ORM::configure('username', 'root', 'classroom');
ORM::configure('password', 'Sila-1234', 'classroom');
ORM::configure('return_result_sets', true);
ORM::configure('driver_options', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
ORM::configure('error_mode', PDO::ERRMODE_WARNING);
ORM::configure('logging', true);
