import Table from '../../libs/table';
import DocumentCollection from '../../collections/document_collection';
import Document from '../../models/document';

var ModalEventDocumentView = Backbone.View.extend({
  el: '#modal',
  event_id: null,
  upload_path: null,
  dataTable: {
    el: 'documentTable', // String
    messageLabelId: 'messageModal', // String
    model: Document, // String
    collection: new DocumentCollection(), // Backbone collection
    services: {
      list: BASE_URL, // 'admin/event/document/list?event_id=x'
      save: BASE_URL + 'admin/event/document/save', // String
    },
    extraData: null,
    observer: { // not initialize
    new: [],
    edit: [],
    delete: [],
    },
    messages: {
      list500: 'Ocurrió un error no esperado en listar las documentos',
      list501: 'Ocurrió un error en listar las documentos',
      list404: 'Recurso no encontrado - listar documentos',
      save500: 'Ocurrió un error no esperado en grabar los cambios',
      save501: 'Ocurrió un error en grabar los cambios',
      save404: 'Recurso no encontrado - guardar documentos',
      save200: 'documentos actualizadas',
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
      ],
      buttons: [
        {
          type: 'i',
          operation: 'file-select',
          class: 'fa-search',
          styles: 'padding-left: 15px;',
        },
        {
          type: 'i',
          operation: 'file-upload',
          class: 'fa-cloud-upload',
          styles: 'padding-left: 15px;',
        },
        {
          type: 'i',
          operation: 'file-view',
          class: 'fa-picture-o',
          styles: 'padding-left: 15px;',
        },
        {
          type: 'i',
          operation: 'delete',
          class: 'fa-times',
          styles: 'padding-left: 15px;',
        },
      ],
    },
    upload: {
      path: null,
      inputFile: 'fileDocument', // String
      service: {
        url: BASE_URL + 'upload/file',
        formDataKey: 'file',
        uploadMessage: 'Subiendo archivo...',
        errorMessage: 'Ocurrió un error en subir el archivo',
        successMessage: 'Carga completada'
      },
      keyModel: 'url',
      extensions: {
        allow: ['application/pdf', 'image/jpeg', 'image/png'],
        message: 'Archivo no es de la extensión permitida',
      },
      base_url: STATIC_URL,
      size: {
        allow: 5000000000, // bytes
        message: 'Archivo supera el máximo permitido (5.0MB)',
      },
    }
  },
  modalId: '#modal',
	initialize: function(params){
    this.event_id = params.event_id;
    this.upload_path = params.upload_path;
	},
	events: {
    // TODO
    // table
    'click #documentTable > tbody > tr > td > i.file-select': 'documentFileSelect',
    'click #documentTable > tbody > tr > td > i.file-upload': 'documentFileUpload',
    'click #documentTable > tbody > tr > td > i.file-view': 'documentFileView',
    'click #documentTable > tfoot > tr > td > button.save-table': 'saveTableDocument',
    'keyup #documentTable > tbody > tr > td > input.text': 'inputTextDocument',
    'click #documentTable > tfoot > tr > td > button.add-row': 'addRowDocument',
    'click #documentTable > tbody > tr > td > i.delete': 'deleteRowDocument',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/modal_event_document.html',
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
    $(_this.modalId).html(templateCompiled);
    $(_this.modalId).modal('toggle');
  },
  loadComponents: function(){
    this.dataTable.services.list = BASE_URL + 'admin/event/document/list?event_id=' + this.event_id;
    var event_id = this.event_id;
    var upload_path = this.upload_path;
    this.dataTable.extraData = {
      event_id: event_id,
      upload_path: upload_path,
    };
    this.dataTable.upload.path = upload_path;
    var _this = this;
    this.documentTable = new Table(_this.dataTable);
    this.documentTable.list();
  },
  documentFileSelect: function(event){
    this.documentTable.fileSelect(event);
  },
  documentFileUpload: function(event){
    this.documentTable.fileUpload(event);
  },
  saveTableDocument: function(event){
    this.documentTable.saveTable(event);
  },
  inputTextDocument: function(event){
    this.documentTable.keyUpInputText(event);
  },
  documentFileView: function(event){
    this.documentTable.imageFileView(event);
  },
  addRowDocument: function(event){
    this.documentTable.addRow(event);
  },
  deleteRowDocument: function(event){
    this.documentTable.deleteRow(event);
  },
});

export default ModalEventDocumentView;