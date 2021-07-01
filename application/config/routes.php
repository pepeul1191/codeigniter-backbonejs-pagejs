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
$route['admin/student/edit/(:num)']['GET'] = 'admin/adminIndex/index';
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
$route['admin/district/search']['GET'] = 'admin/AdminDistrict/search';
$route['admin/district/save']['POST'] = 'admin/AdminDistrict/save';
  # admin student
$route['admin/student/list']['GET'] = 'admin/AdminStudent/list';
$route['admin/student/specialism/list']['GET'] = 'admin/AdminStudent/specialism';
$route['admin/student/save']['POST'] = 'admin/AdminStudent/save';
$route['admin/student/specialism/save']['POST'] = 'admin/AdminStudent/specialismSave';
$route['admin/student/get']['GET'] = 'admin/AdminStudent/get';
$route['admin/student/check_dni']['GET'] = 'admin/AdminStudent/checkDNI';
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
$route['admin/speaker/delete']['POST'] = 'admin/AdminSpeaker/delete';
  # admin event
$route['admin/event/list']['GET'] = 'admin/AdminEvent/list';
$route['admin/event/save']['POST'] = 'admin/AdminEvent/save';
$route['admin/event/get']['GET'] = 'admin/AdminEvent/get';
$route['admin/event/delete']['POST'] = 'admin/AdminEvent/delete';
$route['admin/event/recent-list']['GET'] = 'admin/AdminEvent/recentList';
  # admin event speaker
$route['admin/event/speaker/list']['GET'] = 'admin/AdminEventSpeaker/list';
$route['admin/event/speaker/save']['POST'] = 'admin/AdminEventSpeaker/save';
  # admin event student
$route['admin/event/student/list']['GET'] = 'admin/AdminEventStudent/list';
$route['admin/event/student/save']['POST'] = 'admin/AdminEventStudent/studentSave';
$route['admin/event/student/remove']['POST'] = 'admin/AdminEventStudent/removeSave';
  # admin event video
$route['admin/event/video/list']['GET'] = 'admin/AdminEventVideo/list';
$route['admin/event/video/save']['POST'] = 'admin/AdminEventVideo/save';
  # admin event document
$route['admin/event/document/list']['GET'] = 'admin/AdminEventDocument/list';
$route['admin/event/document/save']['POST'] = 'admin/AdminEventDocument/save';
# upload
$route['upload/file']['POST'] = 'admin/AdminUpload/file';
# api
$route['api/student/check']['GET'] = 'api/APIStudent/check';
$route['api/student/get']['GET'] = 'api/APIStudent/get';
$route['api/student/update']['POST'] = 'api/APIStudent/update';
$route['api/event/student']['GET'] = 'api/APIEvent/eventsStudent';
$route['api/event/document/student']['GET'] = 'api/APIEvent/studentDocuments';
$route['api/event/video/student']['GET'] = 'api/APIEvent/studentVideos';
$route['api/event/document/get']['GET'] = 'api/APIEvent/getDocumentURL';
$route['api/event/recent']['GET'] = 'api/APIEvent/recentList';
