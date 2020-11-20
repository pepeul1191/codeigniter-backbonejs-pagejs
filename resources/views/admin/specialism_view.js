import Table from '../../libs/table';
import SpecialismCollection from '../../collections/specialism_collection';
import Specialism from '../../models/specialism';

var SpecialismView = Backbone.View.extend({
  el: '#workspace',
  specialismTable: null,
	initialize: function(){
	},
	events: {
    // table specialismTable events
    'click #specialismTable > tbody > tr > td > i.delete': 'deleteRowSpecialism',
    'keyup #specialismTable > tbody > tr > td > input.text': 'inputTextSpecialism',
    'click #specialismTable > tfoot > tr > td > button.add-row': 'addRowSpecialism',
    'click #specialismTable > tfoot > tr > td > button.save-table': 'saveTableSpecialism',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/specialism.html',
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
    this.specialismTable = new Table({
      el: 'specialismTable', // String
      messageLabelId: 'message', // String
      model: Specialism, // String
      collection: new SpecialismCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/specialism/list', // String
        save: BASE_URL + 'admin/specialism/save', // String
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
        save200: 'Especialidades actualizadas',
      },
      serverKeys: ['id', 'name'],
      row: {
        table: ['id', 'name'],
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
    });
    this.specialismTable.list();
  },
  deleteRowSpecialism: function(event){
    this.specialismTable.deleteRow(event);
  },
  inputTextSpecialism: function(event){
    this.specialismTable.keyUpInputText(event);
  },
  addRowSpecialism: function(event){
    this.specialismTable.addRow(event);
  },
  saveTableSpecialism: function(event){
    this.specialismTable.saveTable(event);
  },
});

export default SpecialismView;