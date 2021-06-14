var EventStudentService = {
  saveDetail: function(student_id, event_id, messageLabelId){
    var resp = {};
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'admin/event/student/save',
      data: {
        event_id: event_id,
        student_id: student_id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
        // show message
        $('#' + messageLabelId).removeClass('alert-danger');
        $('#' + messageLabelId).removeClass('alert-warning');
        $('#' + messageLabelId).addClass('alert-success');
        $('#' + messageLabelId).html('Detalle de ponente guardado con éxito');
        // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        // return data
        resp.message = data;
        resp.status = 200;
      },
      error: function(xhr, status, error){
        // show message
        if(xhr.status == 404){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Recurso no encontrado');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else if(xhr.status == 501){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error controlado en grabar el detalle del ponente');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else{
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error no controlado en grabar el detalle del ponente');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }
        console.error(error);
        // return data
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
  removeDetail: function(student_id, event_id, messageLabelId){
    var resp = {};
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'admin/event/student/remove',
      data: {
        event_id: event_id,
        student_id: student_id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
        // show message
        $('#' + messageLabelId).removeClass('alert-danger');
        $('#' + messageLabelId).removeClass('alert-warning');
        $('#' + messageLabelId).addClass('alert-success');
        $('#' + messageLabelId).html('Detalle de ponente guardado con éxito');
        // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        // return data
        resp.message = data;
        resp.status = 200;
      },
      error: function(xhr, status, error){
        // show message
        if(xhr.status == 404){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Recurso no encontrado');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else if(xhr.status == 501){
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error controlado en grabar el detalle del ponente');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }else{
          $('#' + messageLabelId).removeClass('alert-success');
          $('#' + messageLabelId).removeClass('alert-warning');
          $('#' + messageLabelId).addClass('alert-danger');
          $('#' + messageLabelId).html('Ocurrió un error no controlado en grabar el detalle del ponente');
          // $('html, body').animate({ scrollTop: $("#" + messageLabelId).offset().top }, 1000);
        }
        console.error(error);
        // return data
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
};

export default EventStudentService;