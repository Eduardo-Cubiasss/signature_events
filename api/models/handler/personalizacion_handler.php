<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *	Clase para manejar el comportamiento de los datos de la tabla boda_tb.
 CREATE TABLE boda_tb (
    id_boda INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_ceremonia VARCHAR(400) NULL,
    fecha_ceremonia DATETIME NULL,
    fecha_ceremonia_fin DATETIME NULL,
    descripcion_fiesta VARCHAR(400) NULL,
    fecha_fiesta DATETIME NULL,
    fecha_fiesta_fin DATETIME NULL,
    id_prometido INT NOT NULL,
    descripcion_regalos VARCHAR(200) NULL,
    CONSTRAINT fk_id_prometido FOREIGN KEY (id_prometido) REFERENCES prometidos_tb(id_usuario),
    CONSTRAINT check_fecha_ceremonia CHECK (fecha_ceremonia_fin >= fecha_ceremonia),
    CONSTRAINT check_fecha_fiesta CHECK (fecha_fiesta_fin >= fecha_fiesta)
);
 */
class PersonalizacionHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $descripcion_ceremonia = null;
    protected $fecha_ceremonia = null;
    protected $fecha_ceremonia_fin = null;
    protected $descripcion_fiesta = null;
    protected $fecha_fiesta = null;
    protected $fecha_fiesta_fin = null;
    protected $id_prometido = null;
    protected $descripcion_regalos = null;
    protected $lugar_fiesta = null;
    protected $lugar_ceremonia = null;

    protected $usuario = null;
    protected $clave = null;

    /*
     *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */

    public function createRowOrUpdate()
    {
        $sql = 'CALL create_or_update_boda(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->descripcion_ceremonia, $this->fecha_ceremonia, $this->fecha_ceremonia_fin, 
        $this->descripcion_fiesta, $this->fecha_fiesta, $this->fecha_fiesta_fin, $this->descripcion_regalos, $this->id_prometido, $this->lugar_fiesta, $this->lugar_ceremonia);
        return Database::executeRow($sql, $params);
    }


    public function readOne()
    {
        $sql = 'SELECT descripcion_ceremonia, fecha_ceremonia, fecha_ceremonia_fin, descripcion_fiesta, fecha_fiesta, fecha_fiesta_fin, descripcion_regalos, lugar_ceremonia, lugar_fiesta
                FROM boda_tb
                WHERE id_prometido = ?';
        $params = array($this->id_prometido);
        return Database::getRow($sql, $params);
    }

    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_usuario, usuario, pass
                FROM prometidos_tb
                WHERE usuario = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['pass'])) {
            $_SESSION['id_prometido'] = $data['id_usuario'];
            $_SESSION['aliasPrometido'] = $data['usuario'];
            return true;
        } else {
            return false;
        }
    }

    public function readAll()
    {
        $sql = 'SELECT id_usuario, usuario, pass
                FROM prometidos_tb;';
        return Database::getRows($sql);
    }
}
