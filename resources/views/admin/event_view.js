import Table from '../../libs/table';
import EventCollection from '../../collections/event_collection';
import Event from '../../models/event';

var EventView = Backbone.View.extend({
  el: '#workspace',
  eventTable: null,
	initialize: function(){
    console.log('teacher - initialize');
	},
	events: {
    // table departmentTable events
    'click #eventTable > tbody > tr > td > i.delete': 'deleteRowEvent',
    'keyup #eventTable > tbody > tr > td > input.text': 'inputTextEvent',
    'click #eventTable > tfoot > tr > td > button.add-row': 'addRowEvent',
    'click #eventTable > tfoot > tr > td > button.save-table': 'saveTableEvent',
    // pagination departmentTable
    'click #eventTable > tfoot > tr > td > #btnGoBegin': 'goBegin',
    'click #eventTable > tfoot > tr > td > #btnGoPrevious': 'goPrevious',
    'click #eventTable > tfoot > tr > td > #btnGoNext': 'goNext',
    'click #eventTable > tfoot > tr > td > #btnGoLast': 'goLast',
    // search params
    'click #btnSearch': 'search',
    'click #btnClean': 'clean',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/event.html',
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
    this.eventTable = new Table({
      el: 'eventTable', // String
      messageLabelId: 'message', // String
      model: Event, // String
      collection: new EventCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/event/list', // String
        save: BASE_URL + 'admin/event/delete', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar los eventos',
        list501: 'Ocurrió un error en listar los eventos',
        list404: 'Recurso no encontrado - listar eventos',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar eventos',
        save200: 'Lista de eventos actualizada',
      },
      serverKeys: ['id', 'code', 'name', 'event_type_name', 'init_date'],
      row: {
        table: ['id', 'code', 'name', 'event_type_name', 'init_date'],
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
          { // code
            type: 'td',
            styles: '', 
            edit: true,
            key: 'code',
          },
          { // event_type_name
            type: 'td',
            styles: '', 
            edit: true,
            key: 'event_type_name',
          },
          { // init_date
            type: 'td',
            styles: '', 
            edit: true,
            key: 'init_date',
          },
        ],
        buttons: [
          {
            type: 'a',
            operation: '',
            class: 'fa-pencil',
            styles: 'padding-left: 0px;',
            url: '/admin/event/edit/{0}',
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
    this.eventTable.list();
  },
  deleteRowEvent: function(event){
    this.eventTable.deleteRow(event);
  },
  saveTableEvent: function(event){
    this.eventTable.saveTable(event);
  },
  // pagination
  goBegin: function(event){
    this.eventTable.goBegin();
  },
  goPrevious: function(event){
    this.eventTable.goPrevious();
  },
  goNext: function(event){
    this.eventTable.goNext();
  },
  goLast: function(event){
    this.eventTable.goLast();
  },
  search: function(event){
    // data
    var name = $('#txtName').val();
    var code = $('#txtCode').val();
    // build url
    var base = BASE_URL + 'admin/event/list?';
    if(name != ''){
      base = base + 'name=' + name + '&';
    }
    if(code != ''){
      base = base + 'code=' + code + '&';
    }
    this.eventTable.services.list = base;
    this.eventTable.list();
  },
  clean: function(event){
    // data
    $('#txtName').val('');
    $('#txtCode').val('');
    // build url
    var base = BASE_URL + 'admin/event/list?';
    this.eventTable.services.list = base;
    this.eventTable.list();
  },
});

export default EventView;