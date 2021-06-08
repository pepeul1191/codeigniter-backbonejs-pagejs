import Student from '../../models/student';
import District from '../../models/district';
import DistrictCollection from '../../collections/district_collection';
import Table from '../../libs/table';
import ValidationForm from '../../libs/validation_form';
import Upload from '../../libs/upload';
import Autocomplete from '../../libs/autocomplete';
import SpecialismCollection from '../../collections/specialism_collection';
import StudentService from '../../services/admin/student_service';
import Specialism from '../../models/specialism';

var StudentDetailView = Backbone.View.extend({
  el: '#workspace',
  student: null,
  specialismTable: null,
	initialize: function(){
    this.student = new Student({id:'E'});
	},
	events: {
    // form
    'click #btnSave': 'save',
    //upload
    'click #btnViewPicture': 'viewPicture',
    // specialism table
    'click #specialimsTable > tfoot > tr > td > button.save-table': 'saveSpecialimsTable',
    'change #specialimsTable > tbody > tr > td > input.input-check': 'clickCheckBoxSpecialimsTable',
  },
  render: function(data, type){
    // this.student.unSet();???
    var templateCompiled = null;
    if(type == 'new'){
      this.student.set('id', 'E');
      this.student.set('dni', '');
      this.student.set('code', '');
      this.student.set('tuition', '');
      this.student.set('names', '');
      this.student.set('last_names', '');
      this.student.set('email', '');
      this.student.set('phone', '');
      this.student.set('district_id', '');
      this.student.set('picture_url', '');
      this.student.set('address', '');
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
        // google mail
        {
          id: 'txtEmail',
          help: 'txtEmailHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar un correo',
            }, 
            {
              type: 'customFunction',
              message: 'Debe de ingresar un correo de GMail',
              customFunction: function(){
                return $('#txtEmail').val().toUpperCase().includes("@GMAIL.COM");
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
     // upload
    this.upload = new Upload({
      el: '#uploadForm',
      inputFile: 'filePicture',
      helpText: 'message',
      buttonChoose: 'btnSelectPicture',
      buttonUpload: 'btnUploadPicture',
      img: 'imgPicture',
      service: {
        url: BASE_URL + 'upload/file',
        formDataKey: 'file',
        uploadMessage: 'Subiendo archivo...',
        errorMessage: 'Ocurrió un error en subir el archivo',
        successMessage: 'Carga completada'
      },
      statusClasses: { // bootstrap classes by default
        success: 'alert-success',
        warning: 'alert-warning',
        danger: 'alert-danger',
      },
      extensions:{
        allow: ['image/jpeg', 'image/png', 'image/jpg'],
        message: 'Formato no válido',
      },
      size:{
        allow: 600000,
        message: 'Archivo supera el máximo permitido',
      },
    });
    // district autocomplete
    this.districtAutocomplete = new Autocomplete({
      el: '#districtForm',
      inputText: 'txtDistrict',
      inputHelp: 'txtDistrictHelp',
      hintList: 'districtList',
      service: {
        url: BASE_URL + 'admin/district/search',
        param: 'name',
      },
      model: District,
      collection: new DistrictCollection(),
      formatResponseData: {
        id: 'id',
        name: 'name',
      },
      formatModelData: {
        id: 'id',
        name: 'name',
      },
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
  viewPicture: function(e){
    console.log(this.upload.path)
    if(
      (this.upload.path != '' && this.upload.url != '') && 
      (this.upload.path !== 'undefined' && this.upload.url !== 'undefined') && 
      (this.upload.path != null && this.upload.url != null)
    ){
      var win = window.open(this.upload.url + this.upload.path, '_blank');
      win.focus();
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-danger');
      $('#message').addClass('alert-warning');
      $('#message').html('Debe subir primero la imagen');
    }
  },
  save: function(){
    this.form.check();
    if(this.form.isOk == true){
      var _this = this;
      this.student.set('dni', $('#txtDNI').val());
      this.student.set('code', $('#txtCode').val());
      this.student.set('tuition', $('#txtTuition').val());
      this.student.set('names', $('#txtNames').val());
      this.student.set('last_names', $('#txtLastNames').val());
      this.student.set('email', $('#txtEmail').val());
      this.student.set('phone', $('#txtPhone').val());
      //this.student.set('gender_id', $('#slcGender').val());
      this.student.set('district_id', this.districtAutocomplete.id);
      this.student.set('picture_url', this.upload.path);
      this.student.set('address', $('#txtAddress').val());
      var respData = StudentService.saveDetail(this.student, 'message');
      if(respData.status == 200){
        if(respData.message == ''){
          // is a edited
        }else{
          // is a created, change title and set modelId
          this.student.set('id', respData.message);
          $('#formTitle').html('Editar participante');
        }
      }
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

export default StudentDetailView;