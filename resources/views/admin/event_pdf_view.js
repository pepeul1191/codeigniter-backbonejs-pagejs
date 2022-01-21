import ValidationForm from '../../libs/validation_form';
import Upload from '../../libs/upload';
import SpecialismService from '../../services/admin/specialism_service';
import EventService from '../../services/admin/event_service';
import Event from '../../models/event';
import Student from '../../models/student';
import StudentCollection from '../../collections/student_collection';

var EventPDFView = Backbone.View.extend({
  el: '#workspace',
  event: null,
  students: new StudentCollection(),
  basePDF: null,
  folderPDF: null,
  basePDFUploaded: null,
  pdfType: null,
  event_id: null,
	initialize: function(){
    this.event = new Event({id:'E'});
    var _this = this;
	},
	events: {
    // form
    'click #btnSaveEventDetailE': 'save',
    'click #btnViewPictureEventE': 'viewPicture',
    'click #btnViewPdfEventE': 'viewPdf',
    // documents and videos
    'click #btnLoadCSV': 'loadCSV',
    'click #btnSend': 'send',
  },
  render: function(data, type, event_id){
    // this.event.unSet();???
    var templateCompiled = null;
    var resp = null;
    var _this = this;
    resp = EventService.getDetail(event_id);
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
      this.event.set('upload_path',  resp.message.upload_path);
      this.event.set('pdf_base',  resp.message.pdf_base);
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
    data.model = this.event;
		$.ajax({
		  url: STATIC_URL + 'templates/admin/event_pdf.html',
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
  setComponentsData: function(){
    this.uploadPDF.path = this.event.get('pdf_base');
    this.uploadPDF.url = STATIC_URL;
  },
  loadComponents: function(){
    var _this = this;
    // upload PDF base
    this.uploadPDF = new Upload({
      el: '#uploadFormPDFE',
      inputFile: 'filePdfE',
      helpText: 'message',
      buttonChoose: 'btnSelectPdfE',
      buttonUpload: 'btnUploadPdfE',
      img: 'imgPdf',
      service: {
        url: BASE_URL + 'upload/pdf',
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
        allow: ['application/pdf'],
        message: 'Formato no válido, sólo PDFs',
      },
      size:{
        allow: 6000000,
        message: 'Archivo supera el máximo permitido',
      },
    });
  },
  viewPdf: function(e){
    //console.log(this.upload.path)
    if(
      (this.uploadPDF.path != '' && this.uploadPDF.url != '') && 
      (this.uploadPDF.path !== 'undefined' && this.uploadPDF.url !== 'undefined') && 
      (this.uploadPDF.path != null && this.uploadPDF.url != null)
    ){
      var win = window.open(this.uploadPDF.url + this.uploadPDF.path, '_blank');
      win.focus();
    }else{
      $('#message').removeClass('alert-success');
      $('#message').removeClass('alert-danger');
      $('#message').addClass('alert-warning');
      $('#message').html('Debe subir primero el pdf');
    }
  },
  loadCSV: function(event){
    var inputFile = $('#inputFileCSV');
    var ext = inputFile.val().split('.').pop().toLowerCase();
    if(ext != 'csv') {
      $('#message').addClass('alert-danger');
      $('#message').html('Debe de seleccionar un el archivo CSV con la información de los alumnos');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#message').removeClass('alert-danger');
        $('#message').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
      return false
    }
    if(this.event.get('event_type_id') == null) {
      $('#message').addClass('alert-danger');
      $('#message').html('Debe de seleccionar Tipo de Certificado a emitir');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#message').removeClass('alert-danger');
        $('#message').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
      return false
    }
    this.students.reset();
    if (inputFile.prop('files')[0] != undefined) {
      var reader = new FileReader();
      var _this = this;
      reader.onload = function(e) {
        var fileContent = reader.result;
        var allTextLines = fileContent.split(/\r\n|\n/);
        var i = 0;
        allTextLines.forEach(element => {
          if(i != 0 && (allTextLines.length - 2) >= i){
            var dataArray = element.split(',');
            var student = new Student({
              id: i ,
              dni: dataArray[0],
              last_names: dataArray[1],
              first_names: dataArray[2],
              email: dataArray[3],
              grade: dataArray[4],
              code: dataArray[5],
              subject: dataArray[6],
            });
            // console.log(student)
            _this.students.add(student);  
            console.log(student);
          }
          i++;
        });
        _this.showTable();
      }
      reader.readAsText(inputFile.prop('files')[0], 'UTF-8');
    }
  },
  showTable: function(){
    $('#studentTable').empty();
    var tbody = '';
    if(this.event.get('event_type_id') == 2){ // Diplomado
      tbody = `
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">DNI</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Nombres</th>
            <th scope="col">Correo</th>
            <th scope="col">Asunto</th>
            <th class="text-center" scope="col">Nota</th>
            <th class="text-center" scope="col">Cód. de Registro</th>
          </tr>
        </thead>
        <tbody>
      `;
      var i = 0;
      this.students.forEach(student => {
        tbody += `
          <tr model-id="${student.get('id')}">
            <th>${++i}</th>
            <td>${student.get('dni')}</td>
            <td>${student.get('last_names')}</td>
            <td>${student.get('first_names')}</td>
            <td>${student.get('email')}</td>
            <td>${student.get('subject')}</td>
            <td class="text-center">${student.get('grade')}</td>
            <td class="text-center">${student.get('code')}</td>
          </tr>
        `;
      });
      tbody += `
        </tbody>
      `;
    }else if(this.event.get('event_type_id') == 1){ // curso
      tbody = `
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">DNI</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Nombres</th>
            <th scope="col">Correo</th>
            <th scope="col">Asunto</th>
            <th class="text-center" scope="col">Registro</th>
          </tr>
        </thead>
        <tbody>
      `;
      var i = 0;
      this.students.forEach(student => {
        // console.log(student)
        tbody += `
          <tr model-id="${student.get('id')}">
            <th>${++i}</th>
            <td>${student.get('dni')}</td>
            <td>${student.get('last_names')}</td>
            <td>${student.get('first_names')}</td>
            <td>${student.get('email')}</td>
            <td>${student.get('subject')}</td>
            <td class="text-center">${student.get('code')}</td>
          </tr>
        `;
      });
      tbody += `
        </tbody>
      `;
    } else if(this.event.get('event_type_id') == 3){ // curso libre
    tbody = `
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">DNI</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Nombres</th>
          <th scope="col">Correo</th>
          <th scope="col">Asunto</th>
        </tr>
      </thead>
      <tbody>
    `;
    var i = 0;
    this.students.forEach(student => {
      // console.log(student)
      tbody += `
        <tr model-id="${student.get('id')}">
          <th>${++i}</th>
          <td>${student.get('dni')}</td>
          <td>${student.get('last_names')}</td>
          <td>${student.get('first_names')}</td>
          <td>${student.get('email')}</td>
          <td>${student.get('subject')}</td>
        </tr>
      `;
    });
    tbody += `
      </tbody>
    `;
  }
    $('#studentTable').append(tbody);
  },
  send: function(event){
    var event_type = '';
    if(this.event.get('event_type_id') == 2){
      event_type = 'certified';
    }
    if(this.event.get('event_type_id') == 1){
      event_type = 'course';
    }
    if(this.event.get('event_type_id') != 1 && this.event.get('event_type_id') != 2){
      $('#message').addClass('alert-danger');
      $('#message').html('Debe de seleccionar Tipo de Certificado a emitir');
      $('#alertRow').removeClass('no-height');
      setInterval(() => {
        $('#message').removeClass('alert-danger');
        $('#message').html('');
        $('#alertRow').addClass('no-height');
      }, 5000);
    }else{
      // send pdf
      var _this = this;
      $.ajax({
        url: BASE_URL + 'admin/event/document/send',
        type: 'POST',
        data: {
          data: JSON.stringify(_this.students.toJSON()),
          file: _this.event.get('pdf_base'),
          folder: _this.folderPDF,
          type: event_type, 
          event_id: _this.event.get('id'),
        },
        headers: {
          // [CSRF_KEY]: CSRF,
        },
        async: true,
        beforeSend: function() {
          $("#btnSend").prop("disabled", true);
          $(".btn-resend").prop("disabled", true);
        },
        success: function(data) {
          console.log(data);
          window.open(STATIC_URL + data, '_blank');
          $("#btnSend").prop("disabled", false);
          $(".btn-resend").prop("disabled", false);
        }
      });
    }
  },
  unSetComponentsData: function(){
    this.uploadPDF.path = null;
    this.uploadPDF.url = STATIC_URL;
  },
});

export default EventPDFView;