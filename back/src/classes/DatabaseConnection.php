<?php

class DatabaseConnection
{
    private static string $HOSTNAME, $DATABASE, $USER, $PASSWORD;
    private static PDO $conn;

    private static function setConnectionCredentials(): void
    {
        self::$HOSTNAME = 'pgsql_desafio';
        self::$DATABASE = 'applicationphp';
        self::$USER = 'root';
        self::$PASSWORD = 'root';
    }

    public static function getConnection(): PDO
    {
        if (!isset(self::$conn))
            try {
                self::setConnectionCredentials();
                self::$conn = new PDO(
                    'pgsql:host=' . self::$HOSTNAME . ';dbname=' . self::$DATABASE,
                    self::$USER,
                    self::$PASSWORD
                );

                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (Exception $e) {
                echo "Error: " . $e->getMessage();
                return null;
            }

        return self::$conn;
    }
}
