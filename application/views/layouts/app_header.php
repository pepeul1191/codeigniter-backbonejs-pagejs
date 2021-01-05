<!DOCTYPE html>
<html>
<head>
  <title><?php echo $title;?></title>
  <meta charset="UTF-8">
  <?php echo load_csss($this->config, $csss);?>
  <link rel="shortcut icon" href="<?php echo $this->config->item('static_url'); ?>favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="text/javascript">
    var BASE_URL = '<?php echo $this->config->item('base_url');?>';
    var STATICS_URL  = '<?php echo $this->config->item('static_url');?>';
    var MODULOS_JSON = JSON.parse('<?php echo $menu; ?>');
    var ITEMS_JSON = JSON.parse('<?php echo $items; ?>');
    var DATA = JSON.parse('<?php echo $data; ?>');
    var CSRF = "<?php echo $this->config->item('csrf_val'); ?>";
    var CSRF_KEY = '<?php echo $this->config->item('csrf_token_name'); ?>';
  </script>
</head>
<body>
  <!-- modal button -->
  <button type="button" class="btn btn-primary btn-lg oculto" data-toggle="modal" data-target="#modal-container" id="btnModal">Launch demo modal</button>
  <!-- modal container -->
  <div class="modal fade" id="modal-container" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  </div>

  <div id="app">
    <header>
      <a href="<?php echo $this->config->item('base_url'); ?>admin">Inicio</a>
      <a href="<?php echo $this->config->item('base_url'); ?>admin/help">Ayuda</a>
      <a href="<?php echo $this->config->item('base_url'); ?>session" class="pull-right">Legis Juristas</a>
      <a href="<?php echo $this->config->item('base_url'); ?>close" class="pull-right">Cerrar Sesión</a>
    </header>
    <nav>
      <h1><i class="fa fa-smile-o h1" aria-hidden="true"></i>Administración del Sitio</h1>
      
    </nav>
    <div id="body-app" class="row">
      <aside class="col-md-2">
        
      </aside>
      <section class="col-md-10" id="workspace">