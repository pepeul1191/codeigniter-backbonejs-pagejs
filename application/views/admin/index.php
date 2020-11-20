<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $title;?></title>
    <?php echo load_csss($this->config, $csss);?>
    <link rel="shortcut icon" href="<?php echo $this->config->item('static_url'); ?>favicon.ico">
    <base href="/admin/" />
    <script>
      var BASE_URL = '<?php echo $this->config->item('base_url');?>';
      var STATIC_URL  = '<?php echo $this->config->item('static_url');?>';
      var CSRF = "<?php echo $this->config->item('csrf')['value']; ?>";
      var CSRF_KEY = '<?php echo $this->config->item('csrf')['key']; ?>';
    </script>
  </head>
  <body>   
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#modal" id="btnModal">
      Launch demo modal
    </button>
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    </div>
    <!-- Header -->
    <header class="bg-primary fixed-top" id="nav1">
      <ul class="">
        <li class="">
          <a class="" href="/">Home</a>
        </li>
        <li class="">
          <a class="" href="/help">Ayuda</a>
        </li>
      </ul>
      <ul class="pull-right" style="float: right !important;">
        <li class="">
          <a class="" href="/session">Pepe Valdivia</a>
        </li>
        <li class="">
          <a class="" href="/logout">Salir</a>
        </li>
      </ul>
    </header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top" id="nav2">
      <a class="navbar-brand" href="/">
        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        Legis Juristas
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" id="burgerMenuButton">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <!--
            <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
          -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Datos Maestros
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/admin/location">Ubicaciones del Perú</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/admin/specialism">Especialidades</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/student">Alumnos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/specialisms" onclick="return false;">Asesores</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/speaker">Ponentes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/admin/event">Eventos</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <div id="workspace"></div>
    <footer>Sitio Desarrollado por <a href="http://softweb.pe/">Software Web Perú 2019</a></footer>
    <?php echo load_jss($this->config, $jss);?>
  </body>
</html>
