import Table from '../../libs/table';
import SpeakerCollection from '../../collections/speaker_collection';
import Speaker from '../../models/speaker';
import EventStudentService from '../../services/admin/event_student_service';

var ModalEventSpeakerView = Backbone.View.extend({
  el: '#modal',
  event_id: null,
  speakerTable: null,
	initialize: function(params){
    this.event_id = params.event_id;
  },
  tableData: {
    el: 'speakerTable', // String
    messageLabelId: 'messageModal', // String
    model: Speaker, // String
    collection: new SpeakerCollection(), // Backbone collection
    services: {
      list: BASE_URL, //+ 'admin/event/speaker/list?event_id=' + _this.event_id, // String
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
  },
	events: {
    'click #speakerTable > tfoot > tr > td > button.save-table': 'saveSpeakersTable',
    'change #speakerTable > tbody > tr > td > input.input-check': 'clickCheckBoxSpeakersTable',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/modal_event_speaker.html',
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
  },
  loadComponents: function(){
    // this.constructor.__super__.loadComponents.apply(this, arguments);
    this.tableData.services.list = BASE_URL + 'admin/event/speaker/list?event_id=' + this.event_id;
    var _this = this;
    this.speakerTable = new Table(_this.tableData);
    this.speakerTable.list();
  },
  clickCheckBoxSpeakersTable: function(event){
    this.speakerTable.clickCheckBox(event);
  },
  saveSpeakersTable: function(event){
    if(this.event_id != 'E'){
      this.speakerTable.extraData = {
        event_id: parseInt(this.event_id),
      };
      this.speakerTable.saveTable(event);
    }else{
      $('#messageModal').removeClass('alert-success');
      $('#messageModal').removeClass('alert-warning');
      $('#messageModal').addClass('alert-danger');
      $('#messageModal').html('Debe registrar primero el evento');
    }    
  },
});

export default ModalEventSpeakerView;