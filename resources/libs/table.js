var Table = Backbone.View.extend({
  // attributes
  el: 'byDefine',
  messageLabelId: null, // String
  model: null, // String
  collection: null, // Backbone collection
  services: {
    list: null, // String
    save: null, // String
  },
  extraData: null,
  observer: { // not initialize
    new: [],
    edit: [],
    delete: [],
  },
  messages: {
    list500: null,
    list404: null,
    save500: null,
    save501: null,
    save404: null,
    save200: null,
  },
  row: {
    server: [],
    table: [],
    html: [],
  },
  buttons: [
    {
      type: null, // i, href
      operation: null,
      class: null,
      styles: null,
    },
  ],
  upload: {
    path: null,
    inputFile: null, // String
    service: {
      url: null, // String
      formDataKey: null, // String
      uploadMessage: null,// String
      erroMessage: null,// String
      successMessage: null,
    },
    keyModel: null,
    extensions: {
      allow: [],
      message: null,
    },
    size: {
      allow: 0, // bytes
      message: null,
    },
  },
  pagination: {
    buttons: {
      next: null,
      prev: null,
      begin: null,
      last: null,
    },
    service: {
      paramPage: null,
      paramKey: null,
      respList: null,
      respPages: null,
    },
    number: null,
    step: null,
    pageActual: null,
    pageNumber: null,
  },
  // constructor
	initialize: function(params){
    this.el = params.el;
    this.messageLabelId = params.messageLabelId;
    this.model = params.model;
    this.collection = params.collection;
    this.services = params.services;
    this.extraData = params.extraData;
    this.messages = params.messages;
    this.serverKeys = params.serverKeys;
    this.row = params.row;
    this.upload = params.upload;
    this.pagination = params.pagination;
    // dynamic allocation of events
    this.events = this.events || {};
    this.delegateEvents();
    // init the observer for changes
    this.listenTo(this.collection, 'change', this.changeObserver, this);
  },
  // events
  events: {
    // table buttons
    'click button.add-row': 'addRow',
    // row buttons
    'click i.delete': 'deleteRow',
    // table inputs
    'keyup input.text': 'keyUpInputText',
  },
  // methods
  list: function(event) {
    var _this = this;
    // if pagination exist, send params
    var params = {};
    if(typeof this.pagination !== 'undefined'){
      params[this.pagination.service.paramPage] = this.pagination.pageActual;
      params[this.pagination.service.paramStep] = this.pagination.step;
    }
    // do ajax
    $.ajax({
      url: _this.services.list,
      type: 'GET',
      data: params,
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data) {
        // clean collection, observer and DOM
        var table = document.getElementById(_this.el);
        var childs = table.childNodes;
        for (var i = 0; i < childs.length; i++) {
          if(childs[i].nodeName == "TBODY"){
            table.removeChild(childs[i]);
          }
        }
        _this.collection.reset();
        _this.observer = { // not initialize
          new: [],
          edit: [],
          delete: [],
        };
        // get list from server
        var list = JSON.parse(data);
        var tbody = document.createElement('TBODY');
        // extract list to table if pagination
        if(typeof _this.pagination !== 'undefined'){
          _this.pagination.pageNumber = list[_this.pagination.service.respPages];
          list = list[_this.pagination.service.respList];
        }
        // iterate list
        for(var i = 0; i < list.length; i++){
          // create model 
          var model = new _this.model();
          // create row
          var tr = document.createElement('TR');
          // itarete list
          for(var k = 0; k < _this.serverKeys.length; k++){
            var serverKey = _this.serverKeys[k];
            var tableKey = _this.row.table[k];
            // set model
            model.set({
              [tableKey]: list[i][serverKey]
            });
            // draw html
            if(typeof _this.row.tds[k] !== 'undefined'){
              var td = _this.helper()[_this.row.tds[k].type](
                _this.row.tds[k], // params for td (styles, edit, etc)
                list[i][serverKey], // value for td
                list[i], // view instance ????
              ); 
              // console.log(td);
              // appendo to row
              tr.appendChild(td);
            }
          }
          // create buttons if they exist
          if (_this.row.buttons.length > 0){
            var tdButtons = document.createElement('TD');
            for(var j = 0; j < _this.row.buttons.length; j++){
              var button = _this.helper()[_this.row.buttons[j].type](
                _this.row.buttons[j], // params for td (styles, edit, etc)
                model, // view instance ????
              );
              tdButtons.appendChild(button, );
            }
            tr.appendChild(tdButtons);
          }
          tbody.appendChild(tr);
          // add model to collection
          _this.collection.add(model);
        }
        // console.log(_this.collection.toJSON());
        // append tbody to table
        document.getElementById(_this.el).appendChild(tbody);
        // if pagination exist, set pagination nav buttons in DOM
        if(typeof _this.pagination !== 'undefined'){
          var temp = _this.pagination.pageActual + ' / ' + _this.pagination.pageNumber;
          document.getElementById(_this.pagination.number).innerHTML = temp;
          // if pagination is at begin, no first two buttons
          if(_this.pagination.pageActual == 1){
            $('#' + _this.pagination.buttons.prev).addClass('d-none');
            $('#' + _this.pagination.buttons.begin).addClass('d-none');
          }else{
            $('#' + _this.pagination.buttons.prev).removeClass('d-none');
            $('#' + _this.pagination.buttons.begin).removeClass('d-none');
          }
          // if pagination is at end, no last two buttons
          if(_this.pagination.pageActual == _this.pagination.pageNumber){
            $('#' + _this.pagination.buttons.next).addClass('d-none');
            $('#' + _this.pagination.buttons.last).addClass('d-none');
          }else{
            $('#' + _this.pagination.buttons.next).removeClass('d-none');
            $('#' + _this.pagination.buttons.last).removeClass('d-none');
          }
        }
      },
      error: function(xhr, status, error){
        if(xhr.status == 404){
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list404);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }else if(xhr.status == 501){
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list501);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }else{
          $('#' + _this.messageLabelId).removeClass('alert-success');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-danger');
          $('#' + _this.messageLabelId).html(_this.messages.list500);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        }
        console.error(error);
        console.log(JSON.parse(xhr.responseText));
      }
    });
  },
  helper: function(){
    return {
      'tdId': function(params, value){
				//console.log('td');
        var td = document.createElement('TD');
        td.setAttribute('style', params.styles);
        td.innerHTML = value;
        //console.log(td);
				return td;
      },
      'input[text]': function(params, value){
				//console.log('input[text]');
        var td = document.createElement('TD');
        var inputText = document.createElement('INPUT');
        inputText.type = 'text';
        inputText.setAttribute('style', params.styles);
        inputText.setAttribute('key', params.key);
        inputText.classList.add('text');
        inputText.value = value;
        td.appendChild(inputText);
				return td;
      },
      'i': function(params){
        // de font-awesome 4
        // <i class="fa fa-chevron-left" aria-hidden="true"></i>
        var i = document.createElement('I');
        i.classList.add('fa');
        i.classList.add(params.class);
        i.setAttribute('style', params.styles);
        // add operation as class for view events
        i.classList.add(params.operation);
				return i;
      },
      'a': function(params, model){
        // de font-awesome 4
        var i = document.createElement('I');
        i.classList.add('fa');
        i.classList.add(params.class);
        var a = document.createElement('A');
        a.appendChild(i);
        a.setAttribute('style', params.styles);
        a.href = params.url;
        // string format
        var formatted = params.url;
        var args = [];
        // exclude link when addRow
        if(model.cid.includes('view') == false){
          for(var i = 0; i <  params.keysFormat.length; i++) {
            args.push(model.get(params.keysFormat[i]));
          }
          for(var arg in args) {
            formatted = formatted.replace("{" + arg + "}", args[arg]);
          }
          a.href = formatted;
        }
        return a;
      },
      'autocomplete': function(params, value, data){
        //console.log('autocomplete');
        var td = document.createElement('TD');
        var inputText = document.createElement('INPUT');
        var hintList = document.createElement('UL');
        var randomId = _.random(0, 1000);
        inputText.type = 'text';
        inputText.setAttribute('style', params.styles);
        inputText.setAttribute('key', params.key);
        inputText.value = data[params.keyName];
        inputText.classList.add('text-autocomplete');
        inputText.setAttribute('for', params.key + '_' + randomId);
        hintList.setAttribute('id', params.key + '_' + randomId);
        hintList.classList.add('d-none');
        hintList.classList.add('hint-container');
        td.appendChild(inputText);
        td.appendChild(hintList);
        return td;
      },
      'select': function(params, value){
        var td = document.createElement('TD');
        var select = document.createElement("select");
        select.setAttribute('style', params.styles);
        for (var i = 0; i < params.collection.length; i++) {
          var option = document.createElement('OPTION');
          option.value = params.collection.models[i].get(params.keyModel);
          option.text = params.collection.models[i].get(params.keyName);
          select.appendChild(option);
        }
        select.value = value;
        select.setAttribute('key', params.key);
        td.appendChild(select);
        return td;
      },
      'td': function(params, value){
        var td = document.createElement('TD');
        td.setAttribute('style', params.styles);
        td.innerHTML = value;
        return td;
      },
      'check': function(params, value){
				var td = document.createElement('td');
				//td.setAttribute('style', params.estilos);
				var inputCheck = document.createElement('INPUT');
				inputCheck.type = 'checkbox';
				inputCheck.setAttribute('style', params.styles);
				inputCheck.setAttribute('key', params.key);
        inputCheck.classList.add('input-check');
        if(params.values.yes == value){
					inputCheck.checked = true;
        }
        td.appendChild(inputCheck);
        //console.log(inputCheck);
				return td;
			},
    };
  },
  addRow: function(event){
    // init new model
    var model = new this.model();
    // create row
    var tr = document.createElement('TR');
    // itarete list
    for(var k = 0; k < this.serverKeys.length; k++){
      var tableKey = this.row.table[k];
      // set model
      var randomId = this.el + _.random(0, 1000);
      if(tableKey == 'id'){
        model.set({
          id: randomId,
        });
      }else{
        model.set({
          [tableKey]: null
        });
      }
      // draw html
      if(k < this.row.tds.length){ // upload and autocomplete are excluded
        var td = null;
        if(this.row.tds[k].type == 'tdId'){
          td = this.helper()[this.row.tds[k].type](
            this.row.tds[k], // params for td (styles, edit, etc)
            randomId, // value for td
            this, // view instance ????
          ); 
        }else{
          td = this.helper()[this.row.tds[k].type](
            this.row.tds[k], // params for td (styles, edit, etc)
            null, // value for td
            this, // view instance ????
          ); 
        }
        // appendo to row
        tr.appendChild(td);
      }
    }
    // buttons
    var tdButtons = document.createElement('TD');
    for(var j = 0; j < this.row.buttons.length; j++){
      var button = this.helper()[this.row.buttons[j].type](
        this.row.buttons[j], // params for td (styles, edit, etc)
        this, // view instance ????
      );
      tdButtons.appendChild(button);
    }
    tr.appendChild(tdButtons);
    // add model to collection
    this.collection.add(model);
    // append to tbody or create tbody and append if tbody does not exist
    var children = document.querySelectorAll('#' + this.el + ' > *');
		var tbody = null;
		for(var i = 0; i < children.length; i++){
		  if(children[i].nodeName == 'TBODY'){
		  	tbody = children[i];
		  }
		}
		if(tbody == null){
		  tbody = document.createElement('TBODY');
		  tbody.appendChild(tr);
		  document.getElementById(this.el).appendChild(tbody);
		}else{
		  tbody.appendChild(tr);
		}
  },
  deleteRow: function(event){
    // get model
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.collection.get(rowId);    
    // if the model to be edited already exists as new or edited, remove from observer and add as deleted in observer
    if(_.contains(this.observer.new, (rowId + ''))){
			this.observer.new = _.without(this.observer.new, (rowId + ''));
		}
		if(_.contains(this.observer.edit, (rowId + ''))){
			this.observer.edit = _.without(this.observer.edit, (rowId + ''));
		}
		if(!_.contains(this.observer.delete, (rowId + ''))){
			this.observer.delete.push(rowId + '');
    }
    // console.log(this.observer);
    // remove from collection
    this.collection.remove(model);
    // delete from DOM
    var tbody = event.target.parentElement.parentElement.parentElement;
    var td = event.target.parentElement.parentElement;
    tbody.removeChild(td);
  }, 
  saveTable: function(event){
    var dataToSend = {
      new: [],
      edit: [],
      delete: [],
      extra: {},
    };
    // check if observer hava changes
    var procced = true;
    if(
      this.observer.new.length == 0 && 
      this.observer.edit.length == 0 && 
      this.observer.delete.length == 0
    ){
			$('#' + this.messageLabelId).removeClass('alert-danger');
      $('#' + this.messageLabelId).removeClass('alert-success');
      $('#' + this.messageLabelId).addClass('alert-warning');
      $('#' + this.messageLabelId).html('No se ha ejecutado cambios en la tabla');
      $('html, body').animate({ scrollTop: $("#" + this.messageLabelId).offset().top }, 1000);
      procced = false;
    }
    if(procced){
      // push models to dataToSend from observer's keys
      for (var key in this.observer) {
				for (var i = 0; i < this.observer[key].length; i++) {
					var observerId = this.observer[key][i];
					if(key == 'new' || key == 'edit'){
						var model = this.collection.get(observerId);
						dataToSend[key].push(model.toJSON());
					}else{
						dataToSend['delete'].push(observerId);
					}
				}
      }
      // console.log(dataToSend);
      // add extra data to dataToSend
      if(this.extraData != null){
				dataToSend.extra = this.extraData;
      }
      // send data to server
      var _this = this;
      $.ajax({
        url: _this.services.save,
        type: 'POST',
        data: {
          data: JSON.stringify(dataToSend)
        },
        headers: {
          [CSRF_KEY]: CSRF,
        },
        async: false,
        success: function(data) {
          // replace new ids in models and DOM
          var idNews = JSON.parse(data);
          if(idNews != []){
            for(var p = 0; p < idNews.length; p++){
              var temp = idNews[p];
              var tempId = temp.tempId;
              var newId = temp.newId;
              //update id in collection
              var model = _this.collection.get(tempId);
              model.set({'id': newId});
              //update id in DOMs table
              var trs = document.getElementById(_this.el).lastChild.querySelectorAll('tr');
              for (var i = 0; i < trs.length; i++) {
                if(trs[i].firstChild.innerHTML == tempId){
                  trs[i].firstChild.innerHTML = newId;
                  // replace rows a links
                  trs[i].lastChild.innerHTML = '';
                  for(var j = 0; j < _this.row.buttons.length; j++){
                    var button = _this.helper()[_this.row.buttons[j].type](
                      _this.row.buttons[j], // params for td (styles, edit, etc)
                      model, // view instance ????
                    );
                    trs[i].lastChild.appendChild(button, );
                  }
                }
              }
            }
          }
          //reset observer
          _this.observer = {
            new: [],
            edit: [],
            delete: [],
          };
          // show message
          $('#' + _this.messageLabelId).removeClass('alert-danger');
          $('#' + _this.messageLabelId).removeClass('alert-warning');
          $('#' + _this.messageLabelId).addClass('alert-success');
          $('#' + _this.messageLabelId).html(_this.messages.save200);
          $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
        },
        error: function(xhr, status, error){
          if(xhr.status == 404){
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save404);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }else if(xhr.status == 501){
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save501);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }else{
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
            $('#' + _this.messageLabelId).html(_this.messages.save500);
            $('html, body').animate({ scrollTop: $("#" + _this.messageLabelId).offset().top }, 1000);
          }
          console.error(error);
          console.log(JSON.parse(xhr.responseText));
        }
      });
    }
  },
  // inputs table
  keyUpInputText: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
		var inputValue = event.target.value;
    var key = event.target.getAttribute('key');
		var model = this.collection.get(rowId);
		//console.log("inputTextEscribir");
		model.set(key, inputValue);
  },
  changeSelect: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var key = event.target.getAttribute('key');
		var model = this.collection.get(rowId);
    //console.log("selectChange");
    var selectedValue = event.target.value;
		model.set(key, selectedValue);
  },
  changeObserver: function(modelChanged) {
		if(modelChanged != null){
			var rowId = modelChanged.get('id') + '';
			if(rowId.indexOf(this.el) >= 0){
				if(!_.contains(this.observer.new, rowId)){
					this.observer.new.push(rowId);
				}
			}else{
				if(!_.contains(this.observer.edit, rowId)){
					this.observer.edit.push(rowId);
				}
			}
			// console.log(this.observer);
		}
  },
  clickCheckBox: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var checked = event.target.checked;
    var key = event.target.getAttribute('key');
    // get values for exist or not from params
    var yes = null;
    var no = null;
    for(var i = 0; i < this.row.tds.length; i++){
      if(key == this.row.tds[i].key){
        yes = this.row.tds[i].values.yes;
        no = this.row.tds[i].values.no;
      }
    }
    var value = no;
    if(checked == true){
			value = yes;
		}
    var model = this.collection.get(rowId);
    model.set(key, value);
  },
  // uploads
  fileSelect: function(event){
    $('#' + this.upload.inputFile).click();
  },
  fileUpload: function(event){
    var file = $('#' + this.upload.inputFile)[0].files[0];
    if(!_.contains(this.upload.extensions.allow, file.type)){
      $('#' + this.messageLabelId).removeClass('alert-success');
      $('#' + this.messageLabelId).removeClass('alert-warning');
      $('#' + this.messageLabelId).addClass('alert-danger');
      $('#' + this.messageLabelId).html(this.upload.extensions.message);
    }else{
      if(file.size > this.upload.size.allow){
        $('#' + this.messageLabelId).removeClass('alert-success');
        $('#' + this.messageLabelId).removeClass('alert-warning');
        $('#' + this.messageLabelId).addClass('alert-danger');
        $('#' + this.messageLabelId).html(this.upload.size.message);
      }else{
        var formData = new FormData();
        formData.append(this.upload.service.formDataKey, file);
        var _this = this;
        $.ajax({
          url: _this.upload.service.url,
          type: 'POST',
          data: formData,
		      contentType: false,
		      processData: false,
          headers: {
            [CSRF_KEY]: CSRF,
          },
          async: false,
          beforeSend: function() {
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-danger');
            $('#' + _this.messageLabelId).addClass('alert-warning');
						$('#' + _this.messageLabelId).html(_this.upload.service.uploadMessage);
					},
          success: function(data) {
            $('#' + _this.messageLabelId).removeClass('alert-danger');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-success');
            $('#' + _this.messageLabelId).html(_this.upload.service.successMessage);
            var resp = JSON.parse(data);
            var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
            var model = _this.collection.get(rowId);
            model.set(_this.upload.keyModel, resp.path);
            model.set(_this.upload.keyModel + '_url', resp.url);
          },
          error: function(xhr, status, error){
            console.error(error);
            console.log(xhr.responseText);
            $('#' + _this.messageLabelId).removeClass('alert-success');
            $('#' + _this.messageLabelId).removeClass('alert-warning');
            $('#' + _this.messageLabelId).addClass('alert-danger');
						$('#' + _this.messageLabelId).html(_this.upload.service.errorMessage);
          }
        });
      }
    }
  },
  imageFileView: function(event){
    var rowId = event.target.parentElement.parentElement.firstChild.innerHTML;
    var model = this.collection.get(rowId);
    //console.log(this.upload.keyModel + '_url');
    var win = null;
    if(typeof model.get(this.upload.keyModel + '_url') === 'undefined'){
      win = window.open(
        model.get(this.upload.keyModel)
        , '_blank');
    }else{
      win = window.open(
        model.get(this.upload.keyModel + '_url') + model.get(this.upload.keyModel)
        , '_blank');
    }
    win.focus();
  },
  // pagination buttons
  goNext: function(event){
    this.pagination.pageActual++;
    this.list();
  },
  goLast: function(event){
    this.pagination.pageActual = this.pagination.pageNumber;
    this.list();
  },
  goBegin: function(event){
    this.pagination.pageActual = 1;
    this.list();
  },
  goPrevious: function(event){
    this.pagination.pageActual--;
    this.list();
  },
  // autcomplete
  keyUpAutocomplete: function(event){
    var key = event.target.getAttribute('key');
    var tdParams = {};
    // get td params
    for(var i = 0; i < this.row.tds.length; i++){
      if(this.row.tds[i].key == key){
        tdParams = this.row.tds[i];
      }
    }
    var idHints = event.target.getAttribute('for');
    var text = event.target.value;
    if(event.keyCode != 27){ // 27 == Escape
      var _this = this;
      $.ajax({
        url: tdParams.service.url,
        type: 'GET',
        data: {
          [tdParams.service.param]: text,
        },
        headers: {
          [CSRF_KEY]: CSRF,
        },
        async: false,
        success: function(data) {
          var hints = JSON.parse(data);
          $('#' + idHints).empty();
          for(var i = 0; i < hints.length; i++){
            var li = document.createElement('li');
            li.classList.add('hint');
            li.setAttribute('hint_id', hints[i][tdParams.formatResponseData.id]);
            li.setAttribute('for', idHints);
            li.setAttribute('key', key);
            li.appendChild(document.createTextNode(hints[i][tdParams.formatResponseData.name]));
            document.getElementById(idHints).appendChild(li);
          }
          $('#' + idHints).removeClass('d-none');
          var inputTextWidth = $(event.target).outerWidth();
          $('#' + idHints).outerWidth(inputTextWidth);
          // _this.showHints();
        },
        error: function(xhr, status, error){
          console.error(error);
          console.log(JSON.parse(xhr.responseText));
        }
      });
    }else{
      this.clean(event);
    }
  },
  clickHint: function(event){
    var key = event.target.getAttribute('key');
    var tdParams = {};
    // get td params
    for(var i = 0; i < this.row.tds.length; i++){
      if(this.row.tds[i].key == key){
        tdParams = this.row.tds[i];
      }
    }
    // display in input the value selected
    event.target.parentElement.parentElement.firstChild.value = event.target.innerHTML;
    // set model with the id of selecction
    var forTargetId = event.target.getAttribute('for');
    var hintId = event.target.getAttribute('hint_id');
    var rowId = event.target.parentElement.parentElement.parentElement.firstChild.innerHTML;
    var model = this.collection.get(rowId);
    model.set(tdParams.keyModel, hintId);
    // clean the DOM
    $('#' + forTargetId).empty();
    $('#' + forTargetId).addClass('d-none');
  },
});

export default Table;