import 'bootstrap/dist/js/bootstrap.min.js';
import StudentView from '../views/student_view';
import TeacherView from '../views/teacher_view';

page.base('/admin');

page('', loading, index);
page('/student', student, closeToggle);
page('/teacher', teacher);
// page('*', notfound)
page();

function loading(ctx, next){
  next();
}

function index(ctx, next) {
  document.querySelector('p')
    .textContent = 'viewing index admin';
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


