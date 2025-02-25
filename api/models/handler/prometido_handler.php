<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla prometidos_tb.
*/
class PrometidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $usuario = null;
    protected $pass = null;
    protected $prometido = null;
    protected $prometida = null;
    protected $num_prometido = null;
    protected $num_prometida = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    public function createRow()
    {
        $sql = 'CALL create_prometidos(?, ?, ?, ?, ?, ?)';
        $params = array($this->usuario, $this->pass, $this->prometido, $this->prometida, $this->num_prometido, $this->num_prometida);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, usuario, prometido, prometida, fecha_ceremonia, fecha_fiesta
                FROM VistaPrometidos;';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_usuario, prometido, prometida, num_prometido, num_prometida
                FROM prometidos_tb
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE prometidos_tb
                SET prometido = ?, prometida = ?, num_prometido = ?, num_prometida = ?
                WHERE id_usuario = ?';
        $params = array($this->prometido, $this->prometida, $this->num_prometido, $this->num_prometida, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM prometidos_tb
                WHERE id_usuario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

}
