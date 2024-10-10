<?php

// SERVICE
class Orders
{
    private static ?object $conn = null;

    private static function initializeConnection(): void
    {
        if (!isset(self::$conn))
            self::$conn = DatabaseConnection::getConnection();
    }

    private static function createOrder(int $total, int $tax): array
    {
        $sql = 'INSERT INTO orders (total, tax) VALUES (:total, :tax)';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':total', $total, PDO::PARAM_INT);
            $stmt->bindParam(':tax', $tax, PDO::PARAM_INT);
            $stmt->execute();

            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();

            $insert_data = [
                'code' => $last_code,
                'total' => $total,
                'tax' => $tax,
            ];
            return ResponseHandler::handleResponse(201, responseArray: $insert_data);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readOrders(): array
    {
        try {
            $stmt = self::$conn->query('SELECT * FROM orders ORDER BY code ASC');
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ResponseHandler::handleResponse(200, responseArray: $result ?? []);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readOrder(int $order_code): array
    {
        $sql = 'SELECT * FROM orders WHERE code = :order_code';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? $result : ResponseHandler::handleResponse(404, responseMessage: 'Order not Found');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    // private static function deleteOrder(int $order_code): array
    // {
    //     $sql = 'DELETE FROM orders WHERE code = :order_code';

    //     try {
    //         self::$conn->beginTransaction();

    //         $stmt = self::$conn->prepare($sql);
    //         $stmt->bindParam(':order_code', $order_code, PDO::PARAM_INT);
    //         $stmt->execute();

    //         self::$conn->commit();
    //     } catch (PDOException $e) {
    //         return PDOExceptionHandler::handleException($e);
    //     }

    //     return ResponseHandler::handleResponse(200, responseMessage: 'Successfully deleted');
    // }

    private static function putOrder(int $orderCode, float $total, float $tax): ?array
    {
        $order = self::readOrder($orderCode);
        if (isset($order['status']))
            return $order;


        $sql = 'UPDATE orders SET total = total + :total, tax = tax + :tax WHERE code = :orderCode';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':orderCode', $orderCode, PDO::PARAM_INT);
            $stmt->bindParam(':total', $total, PDO::PARAM_STR);
            $stmt->bindParam(':tax', $tax, PDO::PARAM_STR);
            $stmt->execute();

            self::$conn->commit();

            $putData = [
                'code' => $orderCode,
                'total' => $order['total'] + $total,
                'tax' => $order['tax'] + $tax,
            ];
            return ResponseHandler::handleResponse(200, responseArray: $putData);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    public static function handleOrderRequest(array $request_info): array
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;
        $total = $request_info['BODY']['total'] ?? null;
        $tax = $request_info['BODY']['tax'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult)
                    return self::readOrder($codeToConsult);
                return self::readOrders();
                break;

            case 'POST':
                if (!(is_null($total) && is_null($tax)))
                    return self::createOrder($total, $tax);
                return ResponseHandler::handleResponse(400, responseMessage: 'Bad request');

            case 'PUT':
                return self::putOrder($codeToConsult, $total, $tax);
                break;

                // case 'PUT':
                //     return self::putOrder($codeToConsult, $total, $tax);

                // case 'DELETE':
                //     if ($codeToConsult)
                //         return self::deleteOrder($codeToConsult);

            default:
                return ResponseHandler::handleResponse(405, responseMessage: 'Method not allowed');
        }
    }
}
