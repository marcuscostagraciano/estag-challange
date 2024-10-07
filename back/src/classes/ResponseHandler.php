<?php

class ResponseHandler
{
    public static function handleResponse(int $responseCode, ?string $responseMessage = null, ?array $responseArray = null): ?array
    {
        $response = [];
        http_response_code($responseCode);

        if (!($responseCode == 200 || $responseCode == 201))
            $response['status'] = $responseCode;

        if (isset($responseMessage))
            $response['message'] = $responseMessage;

        if ($responseArray)
            foreach ($responseArray as $key => $value)
                $response[$key] = $value;

        return $response;
    }
}
