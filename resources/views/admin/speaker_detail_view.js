import Speaker from '../../models/speaker';
import Table from '../../libs/table';
import ValidationForm from '../../libs/validation_form';
import Upload from '../../libs/upload';
import SpecialismCollection from '../../collections/specialism_collection';
import SpeakerService from '../../services/admin/speaker_service';
import Specialism from '../../models/specialism';

var SpeakerDetailView = Backbone.View.extend({
  el: '#workspace',
  speaker: null,
  specialismTable: null,
	initialize: function(){
    this.speaker = new Speaker({id:'E'});
	},
	events: {
    // form
    'click #btnSave': 'save',
    'click #btnViewPicture': 'viewPicture',
    // specialism table
    'click #specialimsTable > tfoot > tr > td > button.save-table': 'saveSpecialimsTable',
    'change #specialimsTable > tbody > tr > td > input.input-check': 'clickCheckBoxSpecialimsTable',
  },
  render: function(data, type, speaker_id){
    // this.speaker.unSet();???
    var templateCompiled = null;
    var resp = null;
    if(type == 'new'){
      this.speaker.set('id', 'E');
      this.speaker.set('dni', '');
      this.speaker.set('code', '');
      this.speaker.set('tuition', '');
      this.speaker.set('names', '');
      this.speaker.set('last_names', '');
      this.speaker.set('email', '');
      this.speaker.set('phone', '');
      this.speaker.set('gender_id', '');
      this.speaker.set('picture_url', '');
      this.speaker.set('resume', '');
      data.model = this.speaker;
      data.disabled = false;
      data.message = '';
      data.messageClass = '';
    }else{
      resp = SpeakerService.getDetail(speaker_id);
      if(resp.status == 200){
        this.speaker.set('id', resp.message.id);
        this.speaker.set('dni', resp.message.dni);
        this.speaker.set('code', resp.message.code);
        this.speaker.set('tuition', resp.message.tuition);
        this.speaker.set('names', resp.message.names);
        this.speaker.set('last_names', resp.message.last_names);
        this.speaker.set('email', resp.message.email);
        this.speaker.set('phone', resp.message.phone);
        this.speaker.set('gender_id', resp.message.gender_id);
        this.speaker.set('picture_url', resp.message.picture_url);
        this.speaker.set('resume', resp.message.resume);
        data.disabled = false;
        data.message = '';
        data.messageClass = '';
      }else if(resp.status == 404){
        data.message = 'Recurso que busca no encontrado';
        data.messageClass = 'alert-warning';
      }else if(resp.status == 501){
        data.message = 'Ocurrió un error controlado al recuperar los datos del ponente a editar';
      }else{
        data.message = 'Ocurrió un error no controlado al recuperar los datos del ponente a editar';
      }
    }
    data.model = this.speaker;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/speaker_detail.html',
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
        list: BASE_URL + 'admin/speaker/specialism/list?speaker_id=' + _this.speaker.get('id'), // String
        save: BASE_URL + 'admin/speaker/specialism/save', // String
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
    this.specialimsTable.extraData = {
      student_id: _this.speaker_id
    };
    // form
    this.form = new ValidationForm({
      el: '#form',
      entries: [
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
        // resume
        {
          id: 'txtResume',
          help: 'txtResumeHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar resumen de biografía',
            }, 
          ],
        },
         // gender
         {
          id: 'slcGender',
          help: 'slcGenderHelp',
          validations: [
            {
              type: 'isSelected',
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
  },
  clickCheckBoxSpecialimsTable: function(event){
    this.specialimsTable.clickCheckBox(event);
  },
  saveSpecialimsTable: function(event){
    if(this.speaker.get('id') != 'E'){
      this.specialimsTable.extraData = {
        speaker_id: parseInt(this.speaker.get('id')),
      };
      this.specialimsTable.saveTable(event);
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-warning');
      $('#message').addClass('alert-danger');
      $('#message').html('Debe registrar primero al ponente');
    }    
  },
  save: function(){
    this.form.check();
    if(this.form.isOk == true){
      var _this = this;
      this.speaker.set('dni', $('#txtDNI').val());
      this.speaker.set('code', $('#txtCode').val());
      this.speaker.set('tuition', $('#txtTuition').val());
      this.speaker.set('names', $('#txtNames').val());
      this.speaker.set('last_names', $('#txtLastNames').val());
      this.speaker.set('email', $('#txtEmail').val());
      this.speaker.set('phone', $('#txtPhone').val());
      this.speaker.set('gender_id', $('#slcGender').val());
      this.speaker.set('picture_url', this.upload.path);
      this.speaker.set('resume', $('#txtResume').val());
      var respData = SpeakerService.saveDetail(this.speaker, 'message');
      if(respData.status == 200){
        if(respData.message == ''){
          // is a edited
        }else{
          // is a created, change title and set modelId
          this.speaker.set('id', respData.message);
          $('#formTitle').html('Editar Ponente');
        }
      }
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
  setComponentsData: function(){
    this.upload.path = this.speaker.get('picture_url');
    this.upload.url = STATIC_URL;
    this.specialimsTable.services.list = BASE_URL + 'admin/speaker/specialism/list?speaker_id=' + this.speaker.get('id');
    this.specialimsTable.list();
    this.specialimsTable.extraData = {
      speaker_id: this.speaker.get('id'),
    };
  },
  unSetComponentsData: function(){
    this.upload.path = null;
    this.upload.url = STATIC_URL;
    this.specialimsTable.services.list = BASE_URL + 'admin/speaker/specialism/list?speaker_id=0';
    this.specialimsTable.list();
    this.specialimsTable.extraData = {
      speaker_id: this.speaker.get('id'),
    };
  },
});

export default SpeakerDetailView;