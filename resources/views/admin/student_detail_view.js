import Student from '../../models/student';
import Table from '../../libs/table';
import ValidationForm from '../../libs/validation_form';
import SpecialismCollection from '../../collections/specialism_collection';
import Specialism from '../../models/specialism';

var AdminStudentDetailView = Backbone.View.extend({
  el: '#workspace',
  student: null,
  specialismTable: null,
	initialize: function(){
    this.student = new Student({id:'E'});
	},
	events: {
    // form
    'click #btnSave': 'save',
    // specialism table
    'click #specialimsTable > tfoot > tr > td > button.save-table': 'saveSpecialimsTable',
    'change #specialimsTable > tbody > tr > td > input.input-check': 'clickCheckBoxSpecialimsTable',
  },
  render: function(data, type){
    // this.student.unSet();???
    var templateCompiled = null;
    if(type == 'new'){
      data.model = this.student;
      data.disabled = false;
      data.message = '';
      data.messageClass = '';
    }else{ // is edit, set model from server
      
    }
    data.model = this.student;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/student_detail.html',
		  type: 'GET',
		  async: false,
		  success: function(resource) {
        var template = _.template(resource);
        // console.log(data)
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
    var _this = this;
    // specialimsTable
    this.specialimsTable = new Table({
      el: 'specialimsTable', // String
      messageLabelId: 'message', // String
      model: Specialism, // String
      collection: new SpecialismCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/student/specialism/list?student_id=' + _this.student.get('id'), // String
        save: BASE_URL + 'admin/student/specialism/save', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las especialidades',
        list501: 'Ocurrió un error en listar las especialidades',
        list404: 'Recurso no encontrado - listar especialidades',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar especialidades',
        save200: 'Especialdiades del particpante actualizadas',
      },
      serverKeys: ['id', 'name', 'exist'],
      row: {
        table: ['id', 'name', 'exist'],
        tds: [
          { // id
            type: 'tdId',
            styles: 'display: none; ', 
            edit: false,
            key: 'id',
          },
          { // namne
            type: 'td',
            styles: '', 
            edit: true,
            key: 'name',
          },
          { // exist
            type: 'check',
            styles: 'margin-left: 30px;', 
            edit: true,
            key: 'exist',
            values: {
              yes: 1,
              no: 0,
            },
          },
        ],
        buttons: [],
      },
    });
    this.specialimsTable.list();
    this.specialimsTable.extraData = {
      student_id: _this.student_id
    };
    // form
    this.form = new ValidationForm({
      el: '#form',
      entries: [
        // code
        {
          id: 'txtCode',
          help: 'txtCodeHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar el código',
            }, 
          ],
        },
        // dni
        {
          id: 'txtDNI',
          help: 'txtDNIHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar el DNI',
            }, 
          ],
        },
        // names
        {
          id: 'txtNames',
          help: 'txtNamesHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar los nombres',
            }, 
          ],
        },
        // last names
        {
          id: 'txtLastNames',
          help: 'txtLastNamesHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar los apellidos',
            }, 
          ],
        },
        // tuition
        {
          id: 'txtTuition',
          help: 'txtTuitionHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar colegiatura',
            }, 
          ],
        },
        // picture
        {
          id: 'filePicture',
          help: 'txtPictureHelp',
          validations: [
            {
              type: 'customFunction',
              message: 'Carrera repetida',
              customFunction: function(){
                var resp = true;
                if(_this.upload.image == ''){
                  resp = false;
                }
                return resp;
              },
            },
          ],
        },
      ],
      classes: {
        textDanger: 'text-danger',
        inputInvalid: 'is-invalid',
        textSuccess: 'text-success',
      },
      messageForm: 'message',
    });
  },
  clickCheckBoxSpecialimsTable: function(event){
    this.specialimsTable.clickCheckBox(event);
  },
  saveSpecialimsTable: function(event){
    if(this.student.get('id') != 'E'){
      this.specialimsTable.extraData = {
        student_id: parseInt(this.student.get('id')),
      };
      this.specialimsTable.saveTable(event);
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-warning');
      $('#message').addClass('alert-danger');
      $('#message').html('Debe registrar primero al participante');
    }    
  },
  save: function(){
    this.form.check();
    if(this.form.isOk == true){
      var _this = this;
      this.student.set('name', $('#txtName').val());
      this.student.set('cop', $('#txtCop').val());
      this.student.set('rne', $('#txtRne').val());
      //var respData = DentistService.saveDetail(this.student, 'message');
      if(respData.status == 200){
        if(respData.message == ''){
          // is a edited
        }else{
          // is a created, change title and set modelId
          this.student.set('id', respData.message);
          $('#formTitle').html('Editar participante');
        }
      }
    }
  },
});

export default AdminStudentDetailView;