#!/bin/bash
# Script para exportar la base de datos MySQL del contenedor Docker a backup.sql
# Ejecutar este script con

# bash Database/export_db_backup.sh

# Variables
DB_CONTAINER=ecommerce-db
DB_USER=root
DB_PASS=root # Cambia esto por tu contraseña real
DB_NAME=ecommerce
BACKUP_PATH=./Database/backup.sql

# Ejecutar el dump desde el contenedor

docker exec $DB_CONTAINER mysqldump -u$DB_USER -p$DB_PASS --databases $DB_NAME > $BACKUP_PATH

echo "Backup actualizado en $BACKUP_PATH"
