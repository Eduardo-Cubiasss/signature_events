DROP DATABASE signature_Events;
CREATE DATABASE IF NOT EXISTS signature_Events;
USE signature_Events;

CREATE TABLE administrador_tb (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(200) NOT NULL
);

CREATE TABLE prometidos_tb (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(200) NOT NULL,
    prometido VARCHAR(100) NOT NULL,
    prometida VARCHAR(100) NOT NULL,
    num_prometido VARCHAR(100) NOT NULL,
    num_prometida VARCHAR(100) NOT NULL
);

CREATE TABLE boda_tb (
    id_boda INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_ceremonia VARCHAR(400) NULL,
    fecha_ceremonia DATETIME NULL,
    fecha_ceremonia_fin DATETIME NULL,
    lugar_ceremonia VARCHAR(500) NULL,
    descripcion_fiesta VARCHAR(400) NULL,
    fecha_fiesta DATETIME NULL,
    fecha_fiesta_fin DATETIME NULL,
    lugar_fiesta VARCHAR(500) NULL,
    id_prometido INT NOT NULL,
    descripcion_regalos VARCHAR(200) NULL,
    CONSTRAINT fk_id_prometido FOREIGN KEY (id_prometido) REFERENCES prometidos_tb(id_usuario),
    CONSTRAINT check_fecha_ceremonia CHECK (fecha_ceremonia_fin >= fecha_ceremonia),
    CONSTRAINT check_fecha_fiesta CHECK (fecha_fiesta_fin >= fecha_fiesta)
);

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


DELIMITER //

DROP PROCEDURE IF EXISTS create_prometidos; -- Eliminar el procedimiento si existe

CREATE PROCEDURE create_prometidos(
    IN usuario_ VARCHAR(100),
    IN pass_ VARCHAR(200),
    IN prometido_ VARCHAR(100),
    IN prometida_ VARCHAR(100),
    IN num_prometido_ VARCHAR(100),
    IN num_prometida_ VARCHAR(100)
)
BEGIN
    DECLARE id_prometido_last INT; -- Se declara antes de su uso

    -- Insertar datos en la tabla prometidos_tb
    INSERT INTO prometidos_tb(usuario, pass, prometido, prometida, num_prometido, num_prometida) 
    VALUES (usuario_, pass_, prometido_, prometida_, num_prometido_, num_prometida_);

    -- Obtener el último ID insertado
    SET id_prometido_last = LAST_INSERT_ID();

    -- Llamar al procedimiento create_or_update_boda con el nuevo ID
    CALL create_or_update_boda('Pendiente', NULL, NULL, 'Pendiente', NULL, NULL, 'Pendiente', id_prometido_last, 'Pendiente', 'Pendiente');
END //

DELIMITER ;


CREATE OR REPLACE VIEW VistaPrometidos AS
SELECT 
    p.id_usuario,
    p.usuario,
    p.prometido,
    p.prometida,
    IFNULL(
        (SELECT b.fecha_ceremonia 
         FROM boda_tb b 
         WHERE b.id_prometido = p.id_usuario 
         ORDER BY b.id_boda DESC 
         LIMIT 1),
        'Boda no creada'
    ) AS fecha_ceremonia,
    IFNULL(
        (SELECT b.fecha_fiesta 
         FROM boda_tb b 
         WHERE b.id_prometido = p.id_usuario 
         ORDER BY b.id_boda DESC 
         LIMIT 1),
        'Boda no creada'
    ) AS fecha_fiesta
FROM prometidos_tb p;

DELIMITER //

CREATE PROCEDURE create_invitados(
   nombre_invitado_ VARCHAR(100),
   invitados_limite_ INT,
   id_prometidos_ INT,
	num_invitado_ VARCHAR (100)		
)
BEGIN
   
	DECLARE id_boda__ INT;

    -- Obtener el ID de la boda asociada
    SELECT id_boda
    INTO id_boda__
    FROM boda_tb
    WHERE id_prometido = id_prometidos_
    LIMIT 1;
    
    INSERT INTO invitados_tb(num_invitado, nombre_invitado, invitados_limite, id_boda)
    VALUES (num_invitado_, nombre_invitado_, invitados_limite_, id_boda__);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE update_invitados(
   IN nombre_invitado_ VARCHAR(100),
   IN invitados_limite_ INT,
   IN num_invitado_ VARCHAR(100),
   IN id_invitado_ INT		
)
BEGIN
    DECLARE invitados_extra INT;

    -- Obtener cantidad de invitados actuales
    SELECT invitados_cant
    INTO invitados_extra 
    FROM invitados_tb 
    WHERE id_invitado = id_invitado_ 
    LIMIT 1; 

    -- Verificar si supera el límite
    IF invitados_extra >= invitados_limite_ THEN
        UPDATE invitados_tb 
        SET invitados_cant = invitados_limite_ 
        WHERE id_invitado = id_invitado_;
    END IF;
    
    -- Actualizar el resto de los campos
    UPDATE invitados_tb 
    SET num_invitado = num_invitado_, 
        nombre_invitado = nombre_invitado_, 
        invitados_limite = invitados_limite_
    WHERE id_invitado = id_invitado_;
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE create_or_update_boda(
   IN descripcion_ceremonia_ VARCHAR(400),
   IN fecha_ceremonia_ DATETIME,
   IN fecha_fin_ceremonia_ DATETIME,
   IN descripcion_fiesta_ VARCHAR(400),
   IN fecha_fiesta_ DATETIME,
   IN fecha_fin_fiesta_ DATETIME,
   IN descripcion_regalos_ VARCHAR(500),
   IN id_prometidos_ INT,
	IN lugar_fiesta_ VARCHAR(500),
	IN lugar_ceremonia_ VARCHAR(500)		
)
BEGIN
    DECLARE crear_o_actualizar BOOL;

    -- 1. Verificar si existe un registro de boda para el prometido
    SELECT COUNT(*) > 0
    INTO crear_o_actualizar
    FROM boda_tb
    WHERE id_prometido = id_prometidos_;

    -- 2. Si existe, actualiza
    IF crear_o_actualizar THEN
        UPDATE boda_tb
        SET 
            descripcion_ceremonia = descripcion_ceremonia_,
            fecha_ceremonia = fecha_ceremonia_,
            fecha_ceremonia_fin = fecha_fin_ceremonia_,
            descripcion_fiesta = descripcion_fiesta_,
            fecha_fiesta = fecha_fiesta_,
            fecha_fiesta_fin = fecha_fin_fiesta_,
            descripcion_regalos = descripcion_regalos_,
            lugar_ceremonia = lugar_ceremonia_,
            lugar_fiesta = lugar_fiesta_
        WHERE id_prometido = id_prometidos_;
    ELSE
        -- 3. Si no existe, inserta uno nuevo
        INSERT INTO boda_tb(
            descripcion_ceremonia,
            fecha_ceremonia,
            fecha_ceremonia_fin,
            descripcion_fiesta,
            fecha_fiesta,
            fecha_fiesta_fin,
            descripcion_regalos,
            id_prometido,
            lugar_ceremonia,
            lugar_fiesta
        )
        VALUES (
            descripcion_ceremonia_,
            fecha_ceremonia_,
            fecha_fin_ceremonia_,
            descripcion_fiesta_,
            fecha_fiesta_,
            fecha_fin_fiesta_,
            descripcion_regalos_,
            id_prometidos_,
            lugar_ceremonia_,
            lugar_fiesta_
        );
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE update_invitado(
    IN nombres_ VARCHAR(300),
    IN invitados_adicionales_ INT,
    IN asistencia_fiesta_ ENUM('Pendiente', 'Asistirá', 'Inasistencia', 'No se ha enviado la invitación'),
    IN asistencia_ceremonia_ ENUM('Pendiente', 'Asistirá', 'Inasistencia', 'No se ha enviado la invitación'),
    IN mensaje_ TEXT,
    IN id_invitado_ INT
)
BEGIN
        UPDATE invitados_tb
        SET 
            nombre_invitado = nombres_,
            invitados_cant = invitados_adicionales_,
            invitacion_ceremonia = asistencia_ceremonia_,
            invitacion_fiesta = asistencia_fiesta_,
            mensaje_del_invitado = mensaje_
        WHERE id_invitado = id_invitado_;
END //

DELIMITER ;

SELECT id_usuario, usuario, pass
                FROM administrador_tb
                WHERE usuario = 'superAdmin';
                
SELECT * FROM prometidos_tb;
CALL create_or_update_boda(
    'Ceremonia elegante',        -- descripcion_ceremonia_
    '2025-06-15 16:00:00',       -- fecha_ceremonia_
    '2025-06-15 18:00:00',       -- fecha_fin_ceremonia_
    'Fiesta en salón exclusivo', -- descripcion_fiesta_
    '2025-06-15 20:00:00',       -- fecha_fiesta_
    '2025-06-16 02:00:00',       -- fecha_fin_fiesta_
    'Lista de regalos en Amazon',-- descripcion_regalos_
    1,                           -- id_prometidos_
    'Salón Royal',               -- lugar_fiesta_
    'Iglesia San Pedro'          -- lugar_ceremonia_
);
SELECT * FROM boda_tb;
SELECT * FROM invitados_tb;
CALL create_invitado('Luis', 5, 2, '+503,69839847');

