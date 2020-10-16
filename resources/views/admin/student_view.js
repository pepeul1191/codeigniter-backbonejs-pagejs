import Table from '../../libs/table';
import StudentCollection from '../../collections/student_collection';
import Student from '../../models/student';

var AdminStudentView = Backbone.View.extend({
  el: '#workspace',
  branch_id: null,
  studentTable: null,
	initialize: function(){
    console.log('student - initialize');
	},
	events: {
    // table departmentTable events
    'click #studentTable > tbody > tr > td > i.delete': 'deleteRowDentist',
    'keyup #studentTable > tbody > tr > td > input.text': 'inputTextDentist',
    'click #studentTable > tfoot > tr > td > button.add-row': 'addRowDentist',
    'click #studentTable > tfoot > tr > td > button.save-table': 'saveTableDentist',
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
		  url: STATIC_URL + 'templates/admin/student.html',
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
		this.$el.html(templateCompiled);
  },
  loadComponents: function(){
    this.studentTable = new Table({
      el: 'studentTable', // String
      messageLabelId: 'message', // String
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
            type: 'a',
            operation: '',
            class: 'fa-pencil',
            styles: 'padding-left: 0px;',
            url: '/admin/student/edit/{0}',
            keysFormat: ['id', 'names', ],
          },
          {
            type: 'i',
            operation: 'delete',
            class: 'fa-times',
            styles: 'padding-left: 15px;',
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
        step: 20,
        pageActual: 1,
        pageNumber: null,
      },
    });
    this.studentTable.list();
  },
  deleteRowDentist: function(event){
    this.studentTable.deleteRow(event);
  },
  saveTableDentist: function(event){
    this.studentTable.saveTable(event);
  },
  // pagination
  goBegin: function(event){
    this.studentTable.goBegin();
  },
  goPrevious: function(event){
    this.studentTable.goPrevious();
  },
  goNext: function(event){
    this.studentTable.goNext();
  },
  goLast: function(event){
    this.studentTable.goLast();
  },
  search: function(event){
    // data
    var name = $('#txtName').val();
    var code = $('#txtCode').val();
    var dni = $('#txtDNI').val();
    var tuition = $('#txtTuition').val();
    // build url
    var base = BASE_URL + 'admin/student/list?';
    if(name != ''){
      base = base + 'name=' + name + '&';
    }
    if(code != ''){
      base = base + 'code=' + code + '&';
    }
    if(dni != ''){
      base = base + 'dni=' + dni + '&';
    }
    if(tuition != ''){
      base = base + 'tuition=' + tuition + '&';
    }
    this.studentTable.services.list = base;
    this.studentTable.list();
  },
  clean: function(event){
    // data
    $('#txtName').val('');
    $('#txtDNI').val('');
    $('#txtTuition').val('');
    $('#txtCode').val('');
    // build url
    var base = BASE_URL + 'admin/student/list?';
    this.studentTable.services.list = base;
    this.studentTable.list();
  },
});

export default AdminStudentView;