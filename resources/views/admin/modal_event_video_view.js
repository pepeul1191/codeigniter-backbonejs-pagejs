import VideoCollection from '../../collections/video_collection';
import Video from '../../models/video';
import Table from '../../libs/table';

var ModalEventVideoView = Backbone.View.extend({
  el: '#modal',
  event_id: null,
  dataTable: {
    el: 'videoTable', // String
    messageLabelId: 'messageModal', // String
    model: Video, // String
    collection: new VideoCollection(), // Backbone collection
    services: {
      list: BASE_URL, // 'admin/event/video/list?event_id=x'
      save: BASE_URL + 'admin/event/video/save', // String
    },
    extraData: null,
    observer: { // not initialize
    new: [],
    edit: [],
    delete: [],
    },
    messages: {
      list500: 'Ocurrió un error no esperado en listar las videos',
      list501: 'Ocurrió un error en listar las videos',
      list404: 'Recurso no encontrado - listar videos',
      save500: 'Ocurrió un error no esperado en grabar los cambios',
      save501: 'Ocurrió un error en grabar los cambios',
      save404: 'Recurso no encontrado - guardar videos',
      save200: 'Videos actualizadas',
    },
    serverKeys: ['id', 'name', 'description', 'url'],
    row: {
      table: ['id', 'name', 'description', 'url'],
      tds: [
        { // id
          type: 'tdId',
          styles: 'display: none; ', 
          edit: false,
          key: 'id',
        },
        { // namne
          type: 'input[text]',
          styles: '', 
          edit: true,
          key: 'name',
        },
        { // description
          type: 'input[text]',
          styles: '', 
          edit: true,
          key: 'description',
        },
        { // url
          type: 'input[text]',
          styles: '', 
          edit: true,
          key: 'url',
        },
      ],
      buttons: [
        {
          type: 'i',
          operation: 'delete',
          class: 'fa-times',
          styles: 'padding-left: 15px;',
        },
      ],
    },
  },
	initialize: function(params){
    this.event_id = params.event_id;
	},
	events: {
    // TODO
    'click #videoTable > tbody > tr > td > i.delete': 'deleteRowVideo',
    'keyup #videoTable > tbody > tr > td > input.text': 'inputTextVideo',
    'click #videoTable > tfoot > tr > td > button.add-row': 'addRowVideo',
    'click #videoTable > tfoot > tr > td > button.save-table': 'saveTableVideo',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/modal_event_video.html',
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
    this.dataTable.services.list = BASE_URL + 'admin/event/video/list?event_id=' + this.event_id;
    var event_id = this.event_id;
    this.dataTable.extraData = {
      event_id: event_id,
    };
    var _this = this;
    this.studentTable = new Table(_this.dataTable);
    this.studentTable.list();
  },
  deleteRowVideo: function(event){
    this.studentTable.deleteRow(event);
  },
  inputTextVideo: function(event){
    this.studentTable.keyUpInputText(event);
  },
  addRowVideo: function(event){
    this.studentTable.addRow(event);
  },
  saveTableVideo: function(event){
    this.studentTable.saveTable(event);
  },
});

export default ModalEventVideoView;