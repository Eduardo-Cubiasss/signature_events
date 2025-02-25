CREATE DATABASE IF NOT EXISTS signature_Events;
USE signature_Events;

CREATE TABLE usuarios_tb (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(200) NOT NULL
);

CREATE TABLE prometidos_db (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100) UNIQUE NOT NULL,
    pass VARCHAR(200) NOT NULL,
    prometido VARCHAR(100) NOT NULL,
    prometida VARCHAR(100) NOT NULL,
    num_prometido VARCHAR(100) NOT NULL,
    num_prometida VARCHAR(100) NOT NULL
);

CREATE TABLE boda_db (
    id_boda INT AUTO_INCREMENT PRIMARY KEY,
    descripcion_ceremonia VARCHAR(400) NULL,
    fecha_ceremonia DATETIME NULL,
    fecha_ceremonia_fin DATETIME NULL,
    descripcion_fiesta VARCHAR(400) NULL,
    fecha_fiesta DATETIME NULL,
    fecha_fiesta_fin DATETIME NULL,
    id_prometido INT NOT NULL,
    descripcion_regalos VARCHAR(200) NULL,
    CONSTRAINT fk_id_prometido FOREIGN KEY (id_prometido) REFERENCES prometidos_db(id_usuario),
    CONSTRAINT check_fecha_ceremonia CHECK (fecha_ceremonia_fin >= fecha_ceremonia),
    CONSTRAINT check_fecha_fiesta CHECK (fecha_fiesta_fin >= fecha_fiesta)
);

CREATE TABLE invitados_db (
    id_invitado INT AUTO_INCREMENT PRIMARY KEY,
    num_invitado VARCHAR(100) NOT NULL,
    nombre_invitado VARCHAR(100) NOT NULL,
    invitados_limite INT NOT NULL,
    invitacion_ceremonia ENUM('Pendiente', 'Asistirá', 'Inasistencia', 'No se ha enviado la invitación') NOT NULL,
    mensaje_del_invitado VARCHAR(200) NULL,
    id_boda INT NOT NULL,
    CONSTRAINT fk_id_boda FOREIGN KEY (id_boda) REFERENCES boda_db(id_boda)
);
