<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/invitado_handler.php');
/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla PRODUCTO.
 */
class InvitadoData extends InvitadoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del invitado es incorrecto';
            return false;
        }
    }

    

    public function setnombre($value, $min = 6, $max = 25)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El nombre contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }


    public function setNumeroInvitado($value, $min = 6, $max = 20)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El numero contiene caracteres prohibidos';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->num_invitado = $value;
            return true;
        } else {
            $this->data_error = 'El numero debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setInvitadosLimite($value)
    {
        if (!Validator::validateNaturalNumber($value)) {
            $this->data_error = 'El nombre contiene caracteres prohibidos';
            return false;
        } else {
            $this->invitado_limit = $value;
            return true;
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
