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
        $sql = 'CALL create_invitados(?, ?, ?, ?)';
        $params = array($this->nombre, $this->invitado_limit, $_SESSION['id_prometido'], $this->num_invitado);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT 
    b.id_prometido, 
    i.id_invitado, 
    i.nombre_invitado, 
    i.invitacion_ceremonia, 
    i.invitacion_fiesta, 
    i.invitados_limite,
    i.mensaje_del_invitado
    FROM invitados_tb i
    JOIN boda_tb b ON i.id_boda = b.id_boda
WHERE b.id_prometido = ?;
';
        $params = array($_SESSION['id_prometido']);
        return Database::getRows($sql, $params);
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

    // Metodos para admin
    public function createRowA()
    {
        $sql = 'CALL create_invitados(?, ?, ?, ?)';
        $params = array($this->nombre, $this->invitado_limit, $this->id, $this->num_invitado);
        return Database::executeRow($sql, $params);
    }

    public function readAllA()
    {
        $sql = 'SELECT 
    b.id_prometido, 
    i.id_invitado, 
    i.nombre_invitado, 
    i.invitacion_ceremonia, 
    i.invitacion_fiesta, 
    i.invitados_limite,
    i.mensaje_del_invitado
    FROM invitados_tb i
    JOIN boda_tb b ON i.id_boda = b.id_boda
WHERE b.id_prometido = ?;
';
        $params = array($this->id);
        return Database::getRows($sql, $params);
    }

}
