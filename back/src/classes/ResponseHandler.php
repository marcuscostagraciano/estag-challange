<?php

class ResponseHandler
{
    public static function handleResponse(int $response_code, ?string $response_message = null, ?array $response_array = null): ?array
    {
        $response = [];
        http_response_code($response_code);

        if (!($response_code == 200 || $response_code == 201))
            $response['status'] = $response_code;

        if ($response_message)
            $response['message'] = $response_message;

        if ($response_array)
            foreach ($response_array as $key => $value)
                $response[$key] = $value;

        return $response;
    }
}
