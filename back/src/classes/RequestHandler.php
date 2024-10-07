<?php

// ROUTER
class RequestHandler
{
    private array $request;

    public function __construct(array $request_info)
    {
        $this->request = $request_info;
    }

    public function getResponse(): array
    {
        $method = $this->request['METHOD'];
        $endpoint = $this->request['ENDPOINT'];

        if ($method === 'OPTIONS') {
            header('Access-Control-Allow-Methods: DELETE, PATCH, PUT');
            header('Access-Control-Max-Age: 600');
            die();
        } else
            switch ($endpoint) {
                case null:
                    return [
                        'categories' => 'http://localhost/categories/',
                        'products' => 'http://localhost/products/',
                        'orders' => 'http://localhost/orders/',
                        'order_item' => 'http://localhost/order_item/',
                    ];
                case 'categories':
                    return Categories::handleCategoryRequest($this->request);
                    break;

                case 'products':
                    return Products::handleProductRequest($this->request);
                    break;

                case 'orders':
                    return Orders::handleOrderRequest($this->request);
                    break;

                case 'order_item':
                    return OrderItems::handleOrderItemRequest($this->request);
                    break;

                default:
                    return ResponseHandler::handleResponse(404, responseMessage: 'Endpoint Not found');
            }
    }
}
