import 'bootstrap/dist/js/bootstrap.min.js';
import AdminStudentView from '../views/admin/student_view';
import StudentDetailView from '../views/admin/student_detail_view';
import SpeakerView from '../views/admin/speaker_view';
import LocationView from '../views/admin/location_view';
import SpecialismView from '../views/admin/specialism_view';
import SpeakerDetailView from '../views/admin/speaker_detail_view';
import EventDetailView from '../views/admin/event_detail_view';
import EventView from '../views/admin/event_view';
import EventPDFView from '../views/admin/event_pdf_view';
// views
var specialismView = null;
var locationView = null;
var locationView = null;
var studentView = null;
var studentDetailView = null;
var speakerView = null;
var speakerDetailView = null;
var eventView = null;
var eventDetailView = null;
var eventPDFView = null;
// routes
page.base('/admin');
page('', loading, student);
page('/specialism', specialism, closeToggle);
page('/location', location, closeToggle);
page('/student', student, closeToggle);
page('/student/new', off, studentNew, closeToggle); // *
page('/student/edit/:student_id', off, studentEdit, closeToggle);// *
page('/speaker', speaker, closeToggle);
page('/speaker/new', off, speakerNew, closeToggle); // *
page('/speaker/edit/:speaker_id', off, speakerEdit, closeToggle); // *
page('/event', event, closeToggle);
page('/event/new', off, eventNew, closeToggle); // *
page('/event/edit/:event_id', off, eventEdit, closeToggle); // *
page('/event/pdf/:event_id', off, eventPdf, closeToggle); // *
// page('*', notfound)
page();

function loading(ctx, next){
  next();
}

function specialism(ctx, next) {
  if(specialismView == null){
    specialismView = new SpecialismView();
  }
  specialismView.render();
  specialismView.loadComponents();
  next();
}

function location(ctx, next) {
  if(locationView == null){
    locationView = new LocationView();
  }
  locationView.render();
  locationView.loadComponents();
  next();
}

function off(ctx, next) {
  next();
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
  studentDetailView.render(data, type, 'E');
  studentDetailView.loadComponents();
  next();
}

function speaker(ctx, next) {
  if(speakerView == null){
    speakerView = new SpeakerView();
  }
  speakerView.render();
  speakerView.loadComponents();
}

function speakerNew(ctx, next) {
  var data = {
    title: 'Agregar Ponente',
    id: 'E',
    messageClass: '',
    disabled: false,
  };
  var type = 'new';
  if(speakerDetailView == null){
    speakerDetailView = new SpeakerDetailView();
  }
  speakerDetailView.render(data, type, 'E');
  speakerDetailView.loadComponents();
  speakerDetailView.unSetComponentsData();
  next();
}

function speakerEdit(ctx, next) {
  var speaker_id = ctx.params.speaker_id;
  var data = {
    title: 'Editar Ponente',
    id: speaker_id,
    messageClass: '',
    disabled: false,
  };
  var type = 'edit';
  if(speakerDetailView == null){
    speakerDetailView = new SpeakerDetailView();
  }
  speakerDetailView.render(data, type, speaker_id);
  speakerDetailView.loadComponents();
  speakerDetailView.setComponentsData();
  next();
}

function studentEdit(ctx, next) {
  var student_id = ctx.params.student_id;
  var data = {
    title: 'Editar Participante',
    id: student_id,
    messageClass: '',
    disabled: false,
  };
  var type = 'edit';
  if(studentDetailView == null){
    studentDetailView = new StudentDetailView();
  }
  studentDetailView.render(data, type, student_id);
  studentDetailView.loadComponents();
  studentDetailView.setComponentsData();
  next();
}

function event(ctx, next) {
  if(eventView == null){
    eventView = new EventView();
  }
  eventView.render();
  eventView.loadComponents();
}

function eventNew(ctx, next) {
  var data = {
    title: 'Agregar Evento',
    id: 'E',
    messageClass: '',
    disabled: false,
  };
  var type = 'new';
  if(eventDetailView == null){
    eventDetailView = new EventDetailView();
  }
  eventDetailView.render(data, type, 'E');
  eventDetailView.loadComponents();
  eventDetailView.unSetComponentsData();
  next();
}

function eventEdit(ctx, next) {
  var event_id = ctx.params.event_id;
  var data = {
    title: 'Editar Evento',
    id: event_id,
    messageClass: '',
    disabled: false,
  };
  var type = 'edit';
  if(eventDetailView == null){
    eventDetailView = new EventDetailView();
  }
  eventDetailView.render(data, type, event_id);
  eventDetailView.loadComponents();
  eventDetailView.setComponentsData();
  next();
}

function eventPdf(ctx, next) {
  var event_id = ctx.params.event_id;
  var data = {
    title: 'Emisión de Certificados del Evento',
    id: event_id,
    messageClass: '',
    disabled: false,
  };
  var type = 'edit';
  if(eventPDFView == null){
    eventPDFView = new EventPDFView();
  }
  eventPDFView.render(data, type, event_id);
  eventPDFView.loadComponents();
  eventPDFView.setComponentsData();
  next();
}

function closeToggle(ctx, next){
  if($('#navbarSupportedContent').hasClass('show')){
    $('#burgerMenuButton').click();
  }
}

function notfound(ctx, next) {
  window.location = BASE_URL + 'error/access/404';
}
