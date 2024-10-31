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
            $category = $product['category'];
            $productPrice = floatval($product['price']) * $amount;
            $categoryTax = floatval($category['tax']) / 100;
            $productTax = $productPrice * $categoryTax;
            $totalPrice = $productPrice + $productTax;

            $sql = "
            INSERT INTO
                order_item (order_code, product_code, amount, price, tax)
            VALUES
            (
                :order_code, 
                :product_code, 
                :amount, 
                $productPrice, 
                $productPrice * $categoryTax
                )";

            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);

            $stmt->execute();

            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();

            $insert_data = [
                'code' => $last_code,
                'order_code' => $order_code,
                'product_code' => $product_code,
                'amount' => $amount,
                'price' => $productPrice,
                'tax' => $productTax,
            ];
            return ResponseHandler::handleResponse(201, responseArray: $insert_data);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readOrderItems(): array
    {
        $sql = 'SELECT
            oi.code, oi.amount, oi.price, oi.tax, oi.order_code, 
            json_agg(
                json_build_object(
                    \'code\', p.code,
                    \'amount\', p.amount,
                    \'name\', p.name,
                    \'price\', p.price,
                    \'category_code\', p.category_code
                )) AS product
        FROM
            order_item oi
        LEFT JOIN
            products p
        ON
            oi.product_code = p.code
        GROUP BY
            oi.code, oi.amount, oi.price, oi.tax
        ORDER BY
            oi.code';

        try {
            $stmt = self::$conn->query($sql);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($results as $key => $result) {
                $product = json_decode($result['product'], true);
                $result['product'] = $product[0];
                $results[$key] = $result;
            }

            return ResponseHandler::handleResponse(200, responseArray: $results ?? []);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readOrderItem(int $order_code): array
    {
        $sql = '
        SELECT
            oi.code, oi.amount, oi.price, oi.tax,
            json_agg(
                json_build_object(
                    \'code\', o.code,
                    \'total\', o.total,
                    \'tax\', o.tax
                )) AS order,
            json_agg(
                json_build_object(
                    \'code\', p.code,
                    \'amount\', p.amount,
                    \'name\', p.name,
                    \'price\', p.price,
                    \'category_code\', p.category_code
                )) AS product
        FROM
            order_item oi
        LEFT JOIN
            products p
        ON
            oi.product_code = p.code
        LEFT JOIN
            orders o
        ON
            oi.order_code = o.code
        WHERE
            oi.code = :order_code
        GROUP BY
            oi.code, oi.amount, oi.price, oi.tax
        ';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $product = json_decode($result['product'], true);
                $result['product'] = $product[0];
                $order = json_decode($result['order'], true);
                $result['order'] = $order[0];
            }

            return $result ? $result : ResponseHandler::handleResponse(404, responseMessage: 'Order_item not found');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
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

            return ResponseHandler::handleResponse(200, responseMessage: 'Successfully deleted');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    public static function handleOrderItemRequest(array $request_info): array
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;

        $orderCode = $request_info['BODY']['order_code'] ?? null;
        $productCode = $request_info['BODY']['product_code'] ?? null;
        $amount = $request_info['BODY']['amount'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult)
                    return self::readOrderItem($codeToConsult);
                return self::readOrderItems();
                break;

            case 'POST':
                if (!(is_null($orderCode) && is_null($productCode) && is_null($amount)))
                    return self::createOrderItem($orderCode, $productCode, $amount);
                return ResponseHandler::handleResponse(400, responseMessage: 'Bad request');

                // case 'DELETE':
                //     if ($codeToConsult)
                //         return self::deleteOrderItem($codeToConsult);

            default:
                return ResponseHandler::handleResponse(405, responseMessage: 'Method Not Allowed');
        }
    }
}
