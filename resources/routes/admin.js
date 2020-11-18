import 'bootstrap/dist/js/bootstrap.min.js';
import AdminStudentView from '../views/admin/student_view';
import StudentDetailView from '../views/admin/student_detail_view';
import TeacherView from '../views/teacher_view';
import AdminLocationView from '../views/admin/location_view';
import AdminSpecialismView from '../views/admin/specialism_view';

// views
var specialismView = null;
var locationView = null;
var locationView = null;
var studentView = null;
var studentDetailView = null;
// routes
page.base('/admin');
page('', loading, index);
page('/specialism', specialism, closeToggle);
page('/location', location, closeToggle);
page('/student', student, closeToggle);
page('/student/new', studentNew, closeToggle);
page('/speaker', teacher);
// page('*', notfound)
page();

function loading(ctx, next){
  next();
}

function specialism(ctx, next) {
  if(specialismView == null){
    specialismView = new AdminSpecialismView();
  }
  specialismView.render();
  specialismView.loadComponents();
  next();
}

function location(ctx, next) {
  if(locationView == null){
    locationView = new AdminLocationView();
  }
  locationView.render();
  locationView.loadComponents();
  next();
}

function index(ctx, next) {

}

function student(ctx, next) {
  if(studentView == null){
    studentView = new AdminStudentView();
  }
  studentView.render();
  studentView.loadComponents();
  next();
}

function studentNew(ctx, next) {
  var data = {
    title: 'Agregar Participante',
    id: 'E',
    messageClass: '',
    disabled: false,
  };
  var type = 'new';
  if(studentDetailView == null){
    studentDetailView = new StudentDetailView();
  }
  studentDetailView.render(data, type);
  studentDetailView.loadComponents();
  next();
}

function teacher(ctx, next) {
  var teacherView = new TeacherView();
  teacherView.render();
  teacherView.loadComponents();
}

function closeToggle(ctx, next){
  if($('#navbarSupportedContent').hasClass('show')){
    $('#burgerMenuButton').click();
  }
}

function notfound(ctx, next) {
  window.location = BASE_URL + 'error/access/404';
}
