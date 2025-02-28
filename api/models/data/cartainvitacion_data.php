<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/cartainvitacion_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla Invitados.
 */
class cartainvitacionData extends CartaInvitacionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setIdInvitado($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_invitado = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del invitado es incorrecto';
            return false;
        }
    }

    public function setAsistenciaFiesta($value, $min = 2, $max = 26)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripcion contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->asistencia_fiesta = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El nombre contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombres = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setAsistenciaCremonia($value, $min = 2, $max = 26)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripcion contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->asistencia_ceremonia = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setMensaje($value, $min = 2, $max = 400)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El mensaje contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->mensaje = $value;
            return true;
        } else {
            $this->data_error = 'El mensaje debe tener una longitud entre ' . $min . ' y ' . $max;
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

    
    public function setInvitadosAdicionales($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->invitados_adicionales = $value;
            return true;
        } else {
            $this->data_error = 'La cantidad es incorrecta o no es numero entero es incorrecto';
            return false;
        }
    }
}
