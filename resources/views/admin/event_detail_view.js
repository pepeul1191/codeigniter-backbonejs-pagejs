import Table from '../../libs/table';
import ValidationForm from '../../libs/validation_form';
import Upload from '../../libs/upload';
import SpeakerCollection from '../../collections/speaker_collection';
import SpecialismService from '../../services/admin/specialism_service';
import EventService from '../../services/admin/event_service';
import Speaker from '../../models/speaker';
import Event from '../../models/event';

var EventDetailView = Backbone.View.extend({
  el: '#workspace',
  event: null,
  eventTable: null,
	initialize: function(){
    this.event = new Event({id:'E'});
    this.specialisms = SpecialismService.list().message;
	},
	events: {
    // form
    'click #btnSave': 'save',
    'click #btnViewPicture': 'viewPicture',
    // specialism table
    'click #speakerTable > tfoot > tr > td > button.save-table': 'saveSpeakersTable',
    'change #speakerTable > tbody > tr > td > input.input-check': 'clickCheckBoxSpeakersTable',
  },
  render: function(data, type, speaker_id){
    // this.event.unSet();???
    var templateCompiled = null;
    var resp = null;
    if(type == 'new'){
      this.event.unset();
      this.event.set('hours', '');
      this.event.set('name', '');
      this.event.set('picture_url', '');
      this.event.set('init_date', '');
      this.event.set('init_hour', '');
      this.event.set('email', '');
      this.event.set('gift', '');
      this.event.set('event_type_id', '');
      this.event.set('description', '');
      this.event.set('specialism_id', '');
      this.event.set('code', '');
      this.event.set('specialisms', _this.specialisms);
      data.model = this.event;
      data.disabled = false;
      data.message = '';
      data.messageClass = '';
    }else{
      resp = EventService.getDetail(speaker_id);
      var _this = this;
      if(resp.status == 200){
        this.event.set('id', resp.message.id);
        this.event.set('hours', resp.message.hours);
        this.event.set('name', resp.message.name);
        this.event.set('picture_url', resp.message.picture_url);
        this.event.set('init_date', resp.message.init_date);
        this.event.set('init_hour', resp.message.init_hour);
        this.event.set('email', resp.message.email);
        this.event.set('gift', resp.message.gift);
        this.event.set('event_type_id', resp.message.event_type_id);
        this.event.set('specialism_id', resp.message.specialism_id);
        this.event.set('description', resp.message.description);
        this.event.set('code', resp.message.code);
        this.event.set('specialisms', _this.specialisms);
        data.disabled = false;
        data.message = '';
        data.messageClass = '';
      }else if(resp.status == 404){
        data.message = 'Recurso que busca no encontrado';
        data.messageClass = 'alert-warning';
      }else if(resp.status == 501){
        data.message = 'Ocurrió un error controlado al recuperar los datos del evento a editar';
      }else{
        data.message = 'Ocurrió un error no controlado al recuperar los datos del evento a editar';
      }
    }
    data.model = this.event;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/event_detail.html',
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
    // speakerTable
    this.speakerTable = new Table({
      el: 'speakerTable', // String
      messageLabelId: 'message', // String
      model: Speaker, // String
      collection: new SpeakerCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/event/speaker/list?event_id=' + _this.event.get('id'), // String
        save: BASE_URL + 'admin/event/speaker/save', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las ponentes',
        list501: 'Ocurrió un error en listar las ponentes',
        list404: 'Recurso no encontrado - listar ponentes',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar ponentes',
        save200: 'Ponentes del evento actualizados',
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
    this.speakerTable.extraData = {
      event_id: _this.event_id
    };
    // form
    this.form = new ValidationForm({
      el: '#form',
      entries: [
        // name
        {
          id: 'txtName',
          help: 'txtNameHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar el nombre',
            }, 
          ],
        },
        // hours
        {
          id: 'txtHours',
          help: 'txtHoursHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar las horas',
            }, 
          ],
        },
        // hours
        {
          id: 'txtInitHour',
          help: 'txtInitHourHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar hora de inicio',
            }, 
          ],
        },
        // dates
        {
          id: 'txtInitDate',
          help: 'txtInitDateHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar fecha de inicio',
            }, 
          ],
        },
         // event type
         {
          id: 'slcEventType',
          help: 'slcEventTypeHelp',
          validations: [
            {
              type: 'isSelected',
              message: 'Debe de seleccionar tipo de evento',
            }, 
          ],
        },
        // description
        {
          id: 'txtDescription',
          help: 'txtDescriptionHelp',
          validations: [
            {
              type: 'notEmpty',
              message: 'Debe de ingresar descripción del evento',
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
  clickCheckBoxspeakerTable: function(event){
    this.speakerTable.clickCheckBox(event);
  },
  savespeakerTable: function(event){
    if(this.event.get('id') != 'E'){
      this.speakerTable.extraData = {
        speaker_id: parseInt(this.event.get('id')),
      };
      this.speakerTable.saveTable(event);
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-warning');
      $('#message').addClass('alert-danger');
      $('#message').html('Debe registrar primero al evento');
    }    
  },
  save: function(){
    this.form.check();
    if(this.form.isOk == true){
      var _this = this;
      this.event.set('dni', $('#txtDNI').val());
      this.event.set('code', $('#txtCode').val());
      this.event.set('name', $('#txtName').val());
      this.event.set('hours', $('#txtHours').val());
      this.event.set('init_hour', $('#txtInitHour').val());
      this.event.set('init_date', $('#txtInitDate').val());
      this.event.set('gift', $('#txtGift').val());
      this.event.set('event_type_id', $('#slcEventType').val());
      this.event.set('specialism_id', $('#slcSpecialism').val());
      this.event.set('picture_url', this.upload.path);
      this.event.set('description', $('#txtDescription').val());
      var respData = EventService.saveDetail(this.event, 'message');
      if(respData.status == 200){
        if(respData.message == ''){
          // is a edited
        }else{
          // is a created, change title and set modelId
          this.event.set('id', respData.message);
          $('#formTitle').html('Editar Evento');
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
    this.upload.path = this.event.get('picture_url');
    this.upload.url = STATIC_URL;
    this.speakerTable.services.list = BASE_URL + 'admin/event/speaker/list?event_id=' + this.event.get('id');
    this.speakerTable.list();
    this.speakerTable.extraData = {
      event_id: this.event.get('id'),
    };
  },
  unSetComponentsData: function(){
    this.upload.path = null;
    this.upload.url = STATIC_URL;
    this.speakerTable.services.list = BASE_URL + 'admin/event/speaker/list?event_id=0';
    this.speakerTable.extraData = {
      event_id: this.event.get('id'),
    };
    this.speakerTable.list();
  },
  clickCheckBoxSpeakersTable: function(event){
    this.speakerTable.clickCheckBox(event);
  },
  saveSpeakersTable: function(event){
    if(this.event.get('id') != 'E'){
      this.speakerTable.extraData = {
        event_id: parseInt(this.event.get('id')),
      };
      this.speakerTable.saveTable(event);
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-warning');
      $('#message').addClass('alert-danger');
      $('#message').html('Debe registrar primero el evento');
    }    
  },
});

export default EventDetailView;