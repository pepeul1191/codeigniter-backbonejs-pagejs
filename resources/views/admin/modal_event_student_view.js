import Table from '../../libs/table';
import StudentCollection from '../../collections/student_collection';
import Student from '../../models/student';
import StudentView from './student_view';
import EventStudentService from '../../services/admin/event_student_service';

var ModalEventStudentView = StudentView.extend({
  el: '#modal',
  event_id: null,
	initialize: function(params){
    StudentView.prototype.initialize.apply(this, arguments);
    this.event_id = params.event_id;
	},
	events: {
    // PARENT
    // table departmentTable events
    'click #studentTable > tbody > tr > td > i.fa-plus': 'addStudent',
    // pagination departmentTable
    'click #studentTable > tfoot > tr > td > #btnGoBegin': 'goBegin',
    'click #studentTable > tfoot > tr > td > #btnGoPrevious': 'goPrevious',
    'click #studentTable > tfoot > tr > td > #btnGoNext': 'goNext',
    'click #studentTable > tfoot > tr > td > #btnGoLast': 'goLast',
    // search params
    'click #btnSearch': 'search',
    'click #btnClean': 'clean',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/modal_event_student.html',
		  type: 'GET',
		  async: false,
		  success: function(resource) {
        var template = _.template(resource);
        templateCompiled = template(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				console.log(JSON.parse(xhr.responseText));
      }
    });
    var _this = this;
    this.$el.html(templateCompiled);
    this.$el.modal('toggle');
    console.log(this.studentTable);
  },
  loadComponents: function(){
    // this.constructor.__super__.loadComponents.apply(this, arguments);
    this.studentTable = new Table({
      el: 'studentTable', // String
      messageLabelId: 'messageModal', // String
      model: Student, // String
      collection: new StudentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/student/list', // String
        save: BASE_URL + 'admin/student/delete', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar los participantes',
        list501: 'Ocurrió un error en listar los participantes',
        list404: 'Recurso no encontrado - listar participantes',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar participantes',
        save200: 'Participantes actualizadas',
      },
      serverKeys: ['id', 'name', 'dni', 'code', 'tuition'],
      row: {
        table: ['id', 'name', 'dni', 'code', 'tuition'],
        tds: [
          { // id
            type: 'tdId',
            styles: 'display: none; ', 
            edit: false,
            key: 'id',
          },
          { // name
            type: 'td',
            styles: '', 
            edit: true,
            key: 'name',
          },
          { // dni
            type: 'td',
            styles: '', 
            edit: true,
            key: 'dni',
          },
          { // code
            type: 'td',
            styles: '', 
            edit: true,
            key: 'code',
          },
          { // tuition
            type: 'td',
            styles: '', 
            edit: true,
            key: 'tuition',
          },
        ],
        buttons: [
          {
            type: 'i',
            operation: 'none',
            class: 'fa-plus',
            styles: 'padding-left: 14px;',
          },
        ],
      },
      pagination: {
        buttons: {
          next: 'btnGoNext',
          prev: 'btnGoPrevious',
          begin: 'btnGoBegin',
          last: 'btnGoLast',
        },
        service: {
          paramPage: 'page',
          paramStep: 'step',
          respList: 'list',
          respPages: 'pages',
        },
        number: 'pagination',
        step: 10,
        pageActual: 1,
        pageNumber: null,
      },
    });
    this.studentTable.list();
  },
  addStudent: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var student = this.studentTable.collection.get(rowId);
    var resp = EventStudentService.saveDetail(student.id, this.event_id, 'messageModal');
    if(resp.status == 200){
      if(resp.message == '0'){
        $('#messageModal').removeClass('alert-danger');
        $('#messageModal').removeClass('alert-success');
        $('#messageModal').addClass('alert-warning');
        $('#messageModal').html('El alumno ya se encuentra agregado');
      }else{
        $('#messageModal').removeClass('alert-danger');
        $('#messageModal').removeClass('alert-warning');
        $('#messageModal').addClass('alert-success');
        $('#messageModal').html('Se ha agregado un alumno');
      }
    }else{

    }
  },
});

export default ModalEventStudentView;