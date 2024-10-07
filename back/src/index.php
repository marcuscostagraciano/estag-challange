<?php

// CONTROLLER
declare(strict_types=1);
header('Access-Control-Allow-Header: *');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

// 'Require' gera um erro fatal. 'Include' gera um aviso (warning)
require_once('classes/autoload.php');

if (isset($_SERVER['REDIRECT_URL'])) {
    $redirectURL = explode('/', $_SERVER['REDIRECT_URL']);
    $endpoint = $redirectURL[1] ?? null;
    $itemID = $redirectURL[2] ?? null;
}
$requestMethod = $_SERVER['REQUEST_METHOD'];
// $params = explode('&', $_SERVER['QUERY_STRING']);

$requestInfo = [
    'METHOD' => $requestMethod,
    'ENDPOINT' => $endpoint ?? null,
    'ID_TO_CONSULT' => $itemID ?? null,
    'PARAMS' => $_REQUEST,
    'BODY' => json_decode(file_get_contents('php://input'), true) ?? null,
];

error_log("ENDPOINT: {$requestInfo['ENDPOINT']}. METHOD: $requestMethod.");
$requestHandler = new RequestHandler($requestInfo);
$response = $requestHandler->getResponse();

echo json_encode($response, JSON_NUMERIC_CHECK);
