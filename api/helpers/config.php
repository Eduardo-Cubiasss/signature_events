<?php
// Encabezado para permitir solicitudes de cualquier origen.
header('Access-Control-Allow-Origin: *');
// Se establece la zona horaria local para la fecha y hora del servidor.
date_default_timezone_set('America/Mexico_City');
// Constantes para establecer las credenciales de conexión con el servidor de bases de datos.
// 
define('SERVER', 'localhost');
define('DATABASE', 'signature_Events');
define('USERNAME', 'signature');
define('PASSWORD', 'qP5DgMSi');
?>