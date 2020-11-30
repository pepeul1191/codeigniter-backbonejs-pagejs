<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = 'customError/orverride';
$route['translate_uri_dashes'] = FALSE;

# errores
$route['error/access/(:num)']['GET'] = 'customError/access/$1';

# login
$route['admin/login']['GET'] = 'admin/adminLogin/index';
$route['admin/login']['POST'] = 'admin/adminLogin/access';
$route['logout']['GET'] = 'admin/adminLogin/exit';
$route['session']['GET'] = 'admin/adminLogin/view';
# admin views
$route['admin']['GET'] = 'admin/adminIndex/index';
$route['admin/specialism']['GET'] = 'admin/adminIndex/index';
$route['admin/location']['GET'] = 'admin/adminIndex/index';
$route['admin/student']['GET'] = 'admin/adminIndex/index';
$route['admin/student/new']['GET'] = 'admin/adminIndex/index';
$route['admin/speaker']['GET'] = 'admin/adminIndex/index';
$route['admin/speaker/new']['GET'] = 'admin/adminIndex/index';
$route['admin/speaker/edit/(:num)']['GET'] = 'admin/adminIndex/index';
$route['admin/event']['GET'] = 'admin/adminIndex/index';
$route['admin/event/new']['GET'] = 'admin/adminIndex/index';
$route['admin/event/edit/(:num)']['GET'] = 'admin/adminIndex/index';
  # admin loctions
$route['admin/department/list']['GET'] = 'admin/AdminDepartment/list';
$route['admin/department/save']['POST'] = 'admin/AdminDepartment/save';
$route['admin/province/list']['GET'] = 'admin/AdminProvince/list';
$route['admin/province/save']['POST'] = 'admin/AdminProvince/save';
$route['admin/district/list']['GET'] = 'admin/AdminDistrict/list';
$route['admin/district/save']['POST'] = 'admin/AdminDistrict/save';
  # admin student
$route['admin/student/list']['GET'] = 'admin/AdminStudent/list';
$route['admin/student/specialism/list']['GET'] = 'admin/AdminStudent/specialism';
  # admin specialism
$route['admin/specialism/list']['GET'] = 'admin/AdminSpecialism/list';
$route['admin/specialism/save']['POST'] = 'admin/AdminSpecialism/save';
  # admin speaker
$route['admin/speaker/list']['GET'] = 'admin/AdminSpeaker/list';
$route['admin/speaker/get']['GET'] = 'admin/AdminSpeaker/get';
$route['admin/speaker/save']['POST'] = 'admin/AdminSpeaker/save';
$route['admin/speaker/specialism/list']['GET'] = 'admin/AdminSpeaker/specialism';
$route['admin/speaker/specialism/save']['POST'] = 'admin/AdminSpeaker/specialismSave';
$route['admin/speaker/random-list']['GET'] = 'admin/AdminSpeaker/randomList';
  # admin event
$route['admin/event/list']['GET'] = 'admin/AdminEvent/list';
$route['admin/event/save']['POST'] = 'admin/AdminEvent/save';
$route['admin/event/speaker/list']['GET'] = 'admin/AdminEvent/speaker';
$route['admin/event/speaker/save']['POST'] = 'admin/AdminEvent/speakerSave';
$route['admin/event/get']['GET'] = 'admin/AdminEvent/get';
$route['admin/event/delete']['POST'] = 'admin/AdminEvent/delete';
$route['admin/event/recent-list']['GET'] = 'admin/AdminEvent/recentList';
  # upload
$route['upload/file']['POST'] = 'admin/AdminUpload/file';
