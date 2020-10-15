import 'bootstrap/dist/js/bootstrap.min.js';
import StudentView from '../views/student_view';
import TeacherView from '../views/teacher_view';
import AdminLocationView from '../views/admin/location_view';
import AdminSpecialismView from '../views/admin/specialism_view';

page.base('/admin');

page('', loading, index);
page('/specialism', specialism, closeToggle);
page('/location', location, closeToggle);
page('/student', student, closeToggle);
page('/teacher', teacher);
// page('*', notfound)
page();

function loading(ctx, next){
  next();
}

function specialism(ctx, next) {
  var specialismView = new AdminSpecialismView();
  specialismView.render();
  specialismView.loadComponents();
  next();
}

function location(ctx, next) {
  var locationView = new AdminLocationView();
  locationView.render();
  locationView.loadComponents();
  next();
}

function index(ctx, next) {

}

function student(ctx, next) {
  var studentView = new StudentView();
  studentView.render();
  studentView.loadComponents();
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


