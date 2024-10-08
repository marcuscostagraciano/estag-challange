<?php

class PDOExceptionHandler
{
    private function __construct() {}

    public static function handleException(PDOException $e): array
    {
        $exceptionCode = intval($e->getCode());
        $exceptionMessageArray = [
            23502 => 'Not null violation',
            23503 => 'Foreign key violation',
            23505 => 'Unique violation',
        ];

        return ResponseHandler::handleResponse(
            responseCode: 403,
            responseMessage: $exceptionMessageArray[$exceptionCode]
        );
    }
}
