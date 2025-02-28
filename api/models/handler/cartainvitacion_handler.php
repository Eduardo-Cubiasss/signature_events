<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *	Clase para manejar el comportamiento de los datos de la tabla boda_tb.
CREATE TABLE invitados_tb (
    id_invitado INT AUTO_INCREMENT PRIMARY KEY,
    num_invitado VARCHAR(100) NOT NULL,
    nombre_invitado VARCHAR(100) NOT NULL,
    invitados_limite INT NOT NULL,
    invitados_cant INT DEFAULT 0,
    invitacion_ceremonia ENUM('Pendiente', 'Asistirá', 'Inasistencia', 'No se ha enviado la invitación') DEFAULT 'No se ha enviado la invitación',
    invitacion_fiesta ENUM('Pendiente', 'Asistirá', 'Inasistencia', 'No se ha enviado la invitación') DEFAULT 'No se ha enviado la invitación',
    mensaje_del_invitado TEXT NULL,
    id_boda INT NOT NULL,
    CONSTRAINT fk_id_boda FOREIGN KEY (id_boda) REFERENCES boda_tb(id_boda),
    CONSTRAINT check_invitados_cant CHECK (invitados_cant <= invitados_limite)
);

 */
class CartaInvitacionHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $nombres = null;
     protected $invitados_adicionales = null;
    protected $asistencia_fiesta = null;
    protected $asistencia_ceremonia = null;
    protected $mensaje = null;
    protected $id_invitado = null;
    /*
     *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

     public function updateInvitados()
    {
        $sql = 'CALL update_invitado(?, ?, ?, ?, ?, ?)';
        $params = array($this->nombres, $this->invitados_adicionales, $this->asistencia_fiesta, 
        $this->asistencia_ceremonia, $this->mensaje, $this->id_invitado);
        return Database::executeRow($sql, $params);
    }

    public function readOne()
    {
        $sql = 'SELECT 
    b.descripcion_ceremonia,
    b.fecha_ceremonia,
    b.fecha_ceremonia_fin,
    b.lugar_ceremonia,
    b.descripcion_fiesta,
    b.fecha_fiesta,
    b.fecha_fiesta_fin,
    b.lugar_fiesta,
    b.descripcion_regalos,
    i.invitados_limite,
    i.invitacion_ceremonia,
    i.invitacion_fiesta,
    i.mensaje_del_invitado,
    i.nombre_invitado,
    i.invitados_cant
    FROM boda_tb b
    JOIN invitados_tb i ON b.id_boda = i.id_boda
    WHERE i.id_invitado = ?;';
        $params = array($this->id_invitado);
        return Database::getRow($sql, $params);
    }

    public function readOneNombre()
    {
        $sql = 'SELECT nombre_invitado FROM invitados_tb WHERE id_invitado = ?;';
        $params = array($this->id_invitado);
        return Database::getRow($sql, $params);
    }

    public function readOneInvitacion()
    {
        $sql = 'SELECT id_invitado, num_invitado, nombre_invitado, invitados_limite, invitados_cant, invitacion_ceremonia, invitacion_fiesta, mensaje_del_invitado, id_boda FROM invitados_tb WHERE id_invitado = ?;';
        $params = array($this->id_invitado);
        return Database::getRow($sql, $params);
    }

}
