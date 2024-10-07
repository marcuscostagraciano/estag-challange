<?php

// SERVICE
class Products
{
    private static ?object $conn = null;

    private static function initializeConnection(): void
    {
        if (!isset(self::$conn))
            self::$conn = DatabaseConnection::getConnection();
    }

    private static function createProduct(string $name, int $amount, float $unit_price, int $category_code): array
    {
        $sql = 'INSERT INTO products (name, amount, price, category_code) VALUES (:name, :amount, :price, :category_code)';
        try {

            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
            $stmt->bindParam(':price', $unit_price, PDO::PARAM_STR);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->execute();

            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        $insert_data = [
            'code' => $last_code,
            'name' => $name,
            'amount' => $amount,
            'unit_price' => $unit_price,
            'category' => $category_code,
        ];
        return ResponseHandler::handleResponse(201, response_array: $insert_data);
    }

    private static function readProducts(): array
    {
        try {
            $stmt = self::$conn->query('SELECT * FROM products ORDER BY code ASC');
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            //throw $th;
        }
        return ResponseHandler::handleResponse(200, response_array: $result ?? []);
    }

    private static function readProduct(int $product_code): array
    {
        $sql = 'SELECT * FROM products WHERE code = :product_code';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? $result : ResponseHandler::handleResponse(404, response_message: 'Not Found');
        } catch (PDOException $e) {
            //throw $th;
        }
    }

    private static function deleteProduct(int $product_code): array
    {
        $sql = 'DELETE FROM products WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->execute();

            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        return ResponseHandler::handleResponse(200, response_message: 'Successfully deleted');
    }

    private static function patchProduct(int $product_code, int $amount, float $price): ?array
    {
        $sql = 'UPDATE products SET amount = :amount, price = :price WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_STR);
            $stmt->bindParam(':price', $price, PDO::PARAM_STR);
            $stmt->execute();

            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        $put_data = [
            'product_code' => $product_code,
            'amount' => $amount,
            'price' => $price,
        ];
        return ResponseHandler::handleResponse(200, response_array: $put_data);
    }

    private static function patchProductAmount(int $product_code, int $amount): ?array
    {
        $sql = 'UPDATE products SET amount = (amount - :amount) WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_STR);
            $stmt->execute();

            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        $put_data = [
            'product_code' => $product_code,
            'amount' => $amount,
        ];
        return ResponseHandler::handleResponse(200, response_array: $put_data);
    }

    public static function handleProductRequest(array $request_info): ?array
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;
        $productName = $request_info['BODY']['name'] ?? null;
        $amount = $request_info['BODY']['amount'] ?? null;
        $unit_price = $request_info['BODY']['price'] ?? null;
        $category = $request_info['BODY']['category_code'] ?? null;
        switch ($method) {
            case 'GET':
                if ($codeToConsult) {
                    return self::readProduct($codeToConsult);
                }
                return self::readProducts();
                break;

            case 'POST':
                if ($productName && $amount && isset($unit_price) && $category) {
                    return self::createProduct($productName, $amount, $unit_price, $category);
                }
                break;

            case 'PATCH':
                if ($codeToConsult && isset($amount) && isset($unit_price))
                    return self::patchProduct($codeToConsult, $amount, $unit_price);
                else if ($codeToConsult && isset($amount))
                    return self::patchProductAmount($codeToConsult, $amount);
                break;

            case 'DELETE':
                if (!is_null($codeToConsult))
                    return self::deleteProduct($codeToConsult);
                break;

            default:
                return ResponseHandler::handleResponse(405, response_message: 'Method Not Allowed');
        }
    }
}
