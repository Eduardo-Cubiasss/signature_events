<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/personalizacion_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla PRODUCTO.
 */
class PersonalizacionData extends PersonalizacionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setIdPrometido($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_prometido = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del prometido es incorrecto';
            return false;
        }
    }
    
    public function setAlias($value, $min = 6, $max = 25)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El alias debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->usuario = $value;
            return true;
        } else {
            $this->data_error = 'El alias debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setClave($value)
    {
        if (Validator::validatePassword($value)) {
            $this->clave = password_hash($value, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->data_error = Validator::getPasswordError();
            return false;
        }
    }
    public function setDescripcionCeremonia($value, $min = 2, $max = 600)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripcion contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion_ceremonia = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }


    public function setDescripcionFiesta($value, $min = 2, $max = 600)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripcion contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion_fiesta = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaCeremonia($value)
    {
        $this->fecha_ceremonia = $value;
        return true;
    }

    public function setFechaCeremoniaFin($value)
    {
        $this->fecha_ceremonia_fin = $value;
        return true;
    }
    

    public function setFechaFiesta($value)
    {
        $this->fecha_fiesta = $value;
        return true;
    }

    public function setFechaFiestaFin($value)
    {
        $this->fecha_fiesta_fin = $value;
        return true;
    }
    public function setDescripcionRegalo($value, $min = 2, $max = 500)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->descripcion_regalos = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setLugarFiesta($value, $min = 2, $max = 500)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->lugar_fiesta = $value;
            return true;
        } else {
            $this->data_error = 'El lugar debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setLugarCeremonia($value, $min = 2, $max = 500)
    {
        if (Validator::validateLength($value, $min, $max)) {
            $this->lugar_ceremonia = $value;
            return true;
        } else {
            $this->data_error = 'El lugar debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
