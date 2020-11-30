import Table from '../../libs/table';
import SpeakerCollection from '../../collections/speaker_collection';
import Speaker from '../../models/speaker';

var SpeakerView = Backbone.View.extend({
  el: '#workspace',
  speakerTable: null,
	initialize: function(){
    console.log('teacher - initialize');
	},
	events: {
    // table departmentTable events
    'click #speakerTable > tbody > tr > td > i.delete': 'deleteRowSpeaker',
    'keyup #speakerTable > tbody > tr > td > input.text': 'inputTextSpeaker',
    'click #speakerTable > tfoot > tr > td > button.add-row': 'addRowSpeaker',
    'click #speakerTable > tfoot > tr > td > button.save-table': 'saveTableSpeaker',
    // pagination departmentTable
    'click #speakerTable > tfoot > tr > td > #btnGoBegin': 'goBegin',
    'click #speakerTable > tfoot > tr > td > #btnGoPrevious': 'goPrevious',
    'click #speakerTable > tfoot > tr > td > #btnGoNext': 'goNext',
    'click #speakerTable > tfoot > tr > td > #btnGoLast': 'goLast',
    // search params
    'click #btnSearch': 'search',
    'click #btnClean': 'clean',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/speaker.html',
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
    this.speakerTable = new Table({
      el: 'speakerTable', // String
      messageLabelId: 'message', // String
      model: Speaker, // String
      collection: new SpeakerCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/speaker/list', // String
        save: BASE_URL + 'admin/speaker/delete', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar los ponentes',
        list501: 'Ocurrió un error en listar los ponentes',
        list404: 'Recurso no encontrado - listar ponentes',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar ponentes',
        save200: 'Lista de ponentes actualizada',
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
            url: '/admin/speaker/edit/{0}',
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
    this.speakerTable.list();
  },
  deleteRowSpeaker: function(event){
    this.speakerTable.deleteRow(event);
  },
  saveTableSpeaker: function(event){
    this.speakerTable.saveTable(event);
  },
  // pagination
  goBegin: function(event){
    this.speakerTable.goBegin();
  },
  goPrevious: function(event){
    this.speakerTable.goPrevious();
  },
  goNext: function(event){
    this.speakerTable.goNext();
  },
  goLast: function(event){
    this.speakerTable.goLast();
  },
  search: function(event){
    // data
    var name = $('#txtName').val();
    var code = $('#txtCode').val();
    var dni = $('#txtDNI').val();
    var tuition = $('#txtTuition').val();
    // build url
    var base = BASE_URL + 'admin/speaker/list?';
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
    this.speakerTable.services.list = base;
    this.speakerTable.list();
  },
  clean: function(event){
    // data
    $('#txtName').val('');
    $('#txtDNI').val('');
    $('#txtTuition').val('');
    $('#txtCode').val('');
    // build url
    var base = BASE_URL + 'admin/speaker/list?';
    this.speakerTable.services.list = base;
    this.speakerTable.list();
  },
});

export default SpeakerView;