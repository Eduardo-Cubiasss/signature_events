<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *	Clase para manejar el comportamiento de los datos de la tabla invitado_tb.
 */
class InvitadoHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $num_invitado = null;
    protected $nombre = null;
    protected $invitado_limit = null;

    /*
     *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    public function createRow()
    {
        $sql = 'CALL create_invitado(?, ?, ?, ?)';
        $params = array($this->nombre, $this->invitado_limit, $_SESSION['id_prometido'], $this->num_invitado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_invitado, nombre_invitado, invitacion_ceremonia, invitacion_fiesta, invitados_cant
                FROM invitados_tb;';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT num_invitado, id_invitado, nombre_invitado, invitados_limite, mensaje_del_invitado
                FROM invitados_tb
                WHERE id_invitado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'CALL update_invitados(?,?,?,?)';
        $params = array($this->nombre, $this->invitado_limit, $this->num_invitado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM invitados_tb
                WHERE id_invitado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    // Metodos para twilio
    public function traerInfoInvitacion()
    {
        $sql = 'SELECT num_invitado, id_invitado
        FROM invitados_tb
        WHERE id_invitado = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function enviarInvitacion()
    {
        $sql = 'UPDATE invitados_tb SET invitacion_ceremonia = "Pendiente", invitacion_fiesta = "Pendiente" WHERE id_invitado = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

}
