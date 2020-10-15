import Table from '../../libs/table';
import DepartmentCollection from '../../collections/department_collection';
import Department from '../../models/department';

var LocationView = Backbone.View.extend({
  el: '#workspace',
  branch_id: null,
  departmentTable: null,
  provinceTable: null,
  districtTable: null,
	initialize: function(){
	},
	events: {
    // table departmentTable events
    'click #departmentTable > tbody > tr > td > i.delete': 'deleteRowDeparment',
    'keyup #departmentTable > tbody > tr > td > input.text': 'inputTextDeparment',
    'click #departmentTable > tfoot > tr > td > button.add-row': 'addRowDeparment',
    'click #departmentTable > tfoot > tr > td > button.save-table': 'saveTableDeparment',
    'click #departmentTable > tbody > tr > td > i.showProvinces': 'showProvinceTable',
    // table provinceTable events
    'click #provinceTable > tbody > tr > td > i.delete': 'deleteRowProvince',
    'keyup #provinceTable > tbody > tr > td > input.text': 'inputTextProvince',
    'click #provinceTable > tfoot > tr > td > button.add-row': 'addRowProvince',
    'click #provinceTable > tfoot > tr > td > button.save-table': 'saveTableProvince',
    'click #provinceTable > tbody > tr > td > i.showDistricts': 'showDistrictTable',
  },
  render: function(data, type){
		var templateCompiled = null;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/location.html',
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
    this.departmentTable = new Table({
      el: 'departmentTable', // String
      messageLabelId: 'message', // String
      model: Department, // String
      collection: new DepartmentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/department/list', // String
        save: BASE_URL + 'admin/department/save', // String
      },
      extraData: null,
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar los departamentos',
        list501: 'Ocurrió un error en listar los departamentos',
        list404: 'Recurso no encontrado - listar departamentos',
        save500: 'Ocurrió un error no esperado en grabar los cambios',
        save501: 'Ocurrió un error en grabar los cambios',
        save404: 'Recurso no encontrado - guardar departamentos',
        save200: 'Departamentos actualizados',
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
            operation: 'showProvinces',
            class: 'fa-chevron-right',
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
    });
    this.departmentTable.list();
  },
  // department table
  deleteRowDeparment: function(event){
    this.departmentTable.deleteRow(event);
  },
  inputTextDeparment: function(event){
    this.departmentTable.keyUpInputText(event);
  },
  addRowDeparment: function(event){
    this.departmentTable.addRow(event);
  },
  saveTableDeparment: function(event){
    this.departmentTable.saveTable(event);
  },
  showProvinceTable: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.departmentTable.collection.get(rowId);
    var _this = this;
    this.provinceTable = new Table({
      el: 'provinceTable', // String
      messageLabelId: 'message', // String
      model: Department, // String
      collection: new DepartmentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/province/list?department_id=' + model.id, // String
        save: BASE_URL + 'admin/province/save', // String
      },
      extraData: {
        deparment_id: model.id
      },
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las provincias',
        list501: 'Ocurrió un error en listar las provincias',
        list404: 'Recurso no encontrado - listar provincias',
        save500: 'Ocurrió un error no esperado en grabar las cambios',
        save501: 'Ocurrió un error en grabar las cambios',
        save404: 'Recurso no encontrado - guardar provincias',
        save200: 'Provincias actualizadas',
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
            operation: 'showDistricts',
            class: 'fa-chevron-right',
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
    });
    this.provinceTable.list();
    this.provinceTable.department_id = model.id; 
  },
  // province table
  deleteRowProvince: function(event){
    this.provinceTable.deleteRow(event);
  },
  inputTextProvince: function(event){
    this.provinceTable.keyUpInputText(event);
  },
  addRowProvince: function(event){
    this.provinceTable.addRow(event);
  },
  saveTableProvince: function(event){
    this.provinceTable.saveTable(event);
  },
  showDistrictTable: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.provinceTable.collection.get(rowId);
    var _this = this;
    this.districtTable = new Table({
      el: 'districtTable', // String
      messageLabelId: 'message', // String
      model: Department, // String
      collection: new DepartmentCollection(), // Backbone collection
      services: {
        list: BASE_URL + 'admin/district/list?province_id=' + model.id, // String
        save: BASE_URL + 'admin/district/save', // String
      },
      extraData: {
      
      },
      observer: { // not initialize
      new: [],
      edit: [],
      delete: [],
      },
      messages: {
        list500: 'Ocurrió un error no esperado en listar las provincias',
        list501: 'Ocurrió un error en listar las provincias',
        list404: 'Recurso no encontrado - listar provincias',
        save500: 'Ocurrió un error no esperado en grabar las cambios',
        save501: 'Ocurrió un error en grabar las cambios',
        save404: 'Recurso no encontrado - guardar provincias',
        save200: 'Provincias actualizadas',
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
    this.districtTable.list();
  },
});

export default LocationView;