import StudentView from '../views/student_view';
import TeacherView from '../views/teacher_view';

page.base('/admin');

page('', loading, index);
page('/student', student);
page('/teacher', teacher);
// page('*', notfound)
page();

function loading(ctx, next){
  alert('loading...');
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
}

function teacher(ctx, next) {
  var teacherView = new TeacherView();
  teacherView.render();
  teacherView.loadComponents();
}

function notfound(ctx, next) {
  window.location = BASE_URL + 'error/access/404';
}
