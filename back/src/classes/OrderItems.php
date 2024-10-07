<?php

// SERVICE
class OrderItems
{
    private static ?object $conn = null;

    private static function initializeConnection(): void
    {
        if (!isset(self::$conn))
            self::$conn = DatabaseConnection::getConnection();
    }

    private static function createOrderItem(int $order_code, int $product_code, int $amount): array
    {
        try {
            $product = Products::handleProductRequest(['METHOD' => 'GET', 'ID_TO_CONSULT' => $product_code]);
            $category = Categories::handleCategoryRequest(['METHOD' => 'GET', 'ID_TO_CONSULT' => $product['category_code']]);
            $productPrice = floatval($product['price']);
            $categoryTax = floatval($category['tax']) / 100;

            $sql = "
            INSERT INTO
                order_item (order_code, product_code, amount, price, tax)
            VALUES
            (
                :order_code, 
                :product_code, 
                :amount, 
                :amount * $productPrice, 
                :amount * $productPrice * $categoryTax
                )";

            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);

            $stmt->execute();

            // NÃO FUNCIONA DPS DO EXECUTE!!!!!!!!!!!!!!
            // ESTOU FAZENDO ISSO PARA PODER PASSAR APENAS O CÓDIGO DO PEDIDO, PRODUTO E QUANTIDADE!
            // TIRAR RESPONSABILIDADES DO FRONT
            // APÓS ISSO, ESTOU ALTERANDO O PEDIDO (ADICIONANDO VALOR E TAXA)
            // TAMBÉM FALTA DECREMENTAR O NÚMERO DE PRODUTOS!!!!!!!!!!!



            Products::handleProductRequest(
                [
                    'METHOD' => 'PATCH',
                    'ID_TO_CONSULT' => $product_code,
                    'BODY' => [
                        'amount' => $amount
                    ]
                ]
            );
            $productTax = $productPrice * $categoryTax;

            Orders::handleOrderRequest(
                [
                    'METHOD' => 'PUT',
                    'ID_TO_CONSULT' => $order_code,
                    'BODY' => [
                        'tax' => $productTax,
                        'total' => $productPrice
                    ]
                ]
            );

            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();

            $insert_data = [
                'code' => $last_code,
                'order_code' => $order_code,
                'product_code' => $product_code,
                'amount' => $amount,
            ];
            return ResponseHandler::handleResponse(201, response_array: $insert_data);
        } catch (PDOException $e) {
            //throw $th;
        }
    }

    private static function readOrderItems(): array
    {
        try {
            $stmt = self::$conn->query('SELECT * FROM order_item ORDER BY code ASC');
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            //throw $th;
        }
        return ResponseHandler::handleResponse(200, response_array: $result ?? []);
    }

    private static function readOrderItem(int $order_code): array
    {
        $sql = 'SELECT * FROM order_item WHERE code = :order_code';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? $result : ResponseHandler::handleResponse(404, response_message: 'Not Found');
        } catch (PDOException $e) {
            //throw $th;
        }
    }

    private static function deleteOrderItem(int $order_code): array
    {
        $sql = 'DELETE FROM order_item WHERE code = :order_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->execute();

            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        return ResponseHandler::handleResponse(200, response_message: 'Successfully deleted');
    }

    public static function handleOrderItemRequest(array $request_info): array | object
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;

        $orderCode = $request_info['BODY']['order_code'] ?? null;
        $productCode = $request_info['BODY']['product_code'] ?? null;
        $amount = $request_info['BODY']['amount'] ?? null;
        $price = $request_info['BODY']['price'] ?? null;
        $tax = $request_info['BODY']['tax'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult)
                    return self::readOrderItem($codeToConsult);
                return self::readOrderItems();
                break;

            case 'POST':
                return self::createOrderItem($orderCode, $productCode, $amount);
                break;

                // case 'DELETE':
                //     if ($codeToConsult)
                //         return self::deleteOrderItem($codeToConsult);

            default:
                return ResponseHandler::handleResponse(405, response_message: 'Method Not Allowed');
        }
    }
}
