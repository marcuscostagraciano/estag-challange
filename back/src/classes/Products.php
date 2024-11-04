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

    private static function createProduct(string $name, int $amount, float $unit_price, int $category_code, string $img_url): array
    {
        $sql = 'INSERT INTO products (name, amount, price, category_code, img_url) VALUES (:name, :amount, :price, :category_code, :img_url)';
        try {

            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_INT);
            $stmt->bindParam(':price', $unit_price, PDO::PARAM_STR);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->bindParam(':img_url', $img_url, PDO::PARAM_STR);
            $stmt->execute();

            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();

            $insert_data = [
                'code' => $last_code,
                'name' => $name,
                'amount' => $amount,
                'price' => $unit_price,
                'category_code' => $category_code,
                'img_url' => $img_url,
            ];
            return ResponseHandler::handleResponse(201, responseArray: $insert_data);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readProducts(): array
    {
        try {
            $stmt = self::$conn->query('
            SELECT
                p.code, p.amount, p.name, p.price, p.img_url,
                json_agg(
                    json_build_object(
                        \'code\', c.code,
                        \'name\', c.name,
                        \'tax\', c.tax
                    )) AS category
            FROM
                products p
            INNER JOIN
                categories c
            ON
                p.category_code = c.code
            GROUP BY
                p.code, p.amount, p.name, p.price
            ORDER BY
                p.code
            ');
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($results as $key => $result) {
                $category = json_decode($result['category'], true);
                $result['category'] = $category[0];
                $results[$key] = $result;
            }

            return ResponseHandler::handleResponse(200, responseArray: $results ?? []);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readProduct(int $product_code): array
    {
        $sql = '
        SELECT
            p.code, p.amount, p.name, p.price, p.img_url,
            json_agg(
                json_build_object(
                    \'code\', c.code,
                    \'name\', c.name,
                    \'tax\', c.tax
                )) AS category
        FROM
            products p
        INNER JOIN
            categories c
        ON
            p.category_code = c.code
        WHERE
            p.code = :product_code
        GROUP BY
            p.code, p.amount, p.name, p.price';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $category = json_decode($result['category'], true);
                $result['category'] = $category[0];
            }

            return $result ? $result : ResponseHandler::handleResponse(404, responseMessage: 'Product not found');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function deleteProduct(int $product_code): array
    {
        $product = self::readProduct($product_code);
        if (isset($product['status']))
            return $product;

        $sql = 'DELETE FROM products WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->execute();

            self::$conn->commit();
            return ResponseHandler::handleResponse(200, responseMessage: 'Successfully deleted');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function patchProduct(int $product_code, int $amount, float $price): ?array
    {
        $product = self::readProduct($product_code);
        if (isset($product['status']))
            return $product;

        $sql = 'UPDATE products SET amount = :amount, price = :price WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_STR);
            $stmt->bindParam(':price', $price, PDO::PARAM_STR);
            $stmt->execute();

            self::$conn->commit();

            $put_data = [
                'product_code' => $product_code,
                'amount' => $amount,
                'price' => $price,
            ];
            return ResponseHandler::handleResponse(200, responseArray: $put_data);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function patchProductAmount(int $product_code, int $amount): ?array
    {
        $product = self::readProduct($product_code);
        if (isset($product['status']))
            return $product;

        $sql = 'UPDATE products SET amount = (amount - :amount) WHERE code = :product_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':product_code', $product_code, PDO::PARAM_INT);
            $stmt->bindParam(':amount', $amount, PDO::PARAM_STR);
            $stmt->execute();

            self::$conn->commit();

            $patchData = [
                'product_code' => $product_code,
                'amount' => $amount,
            ];
            return ResponseHandler::handleResponse(200, responseArray: $patchData);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    public static function handleProductRequest(array $request_info): array
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;
        $productName = $request_info['BODY']['name'] ?? null;
        $amount = $request_info['BODY']['amount'] ?? null;
        $unit_price = $request_info['BODY']['price'] ?? null;
        $category = $request_info['BODY']['category_code'] ?? null;
        $img_url = $request_info['BODY']['img_url'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult) {
                    return self::readProduct($codeToConsult);
                }
                return self::readProducts();
                break;

            case 'POST':
                if (!(is_null($productName) && is_null($amount) && is_null($unit_price) && is_null($category) && is_null($img_url))) {
                    return self::createProduct($productName, $amount, $unit_price, $category, $img_url);
                }
                return ResponseHandler::handleResponse(400, responseMessage: 'Bad request');

            case 'PATCH':
                // if ($codeToConsult && isset($amount) && isset($unit_price))
                //     return self::patchProduct($codeToConsult, $amount, $unit_price);
                // else 
                if ($codeToConsult && isset($amount))
                    return self::patchProductAmount($codeToConsult, $amount);
                break;

            case 'DELETE':
                if (!is_null($codeToConsult))
                    return self::deleteProduct($codeToConsult);
                break;

            default:
                return ResponseHandler::handleResponse(405, responseMessage: 'Method not allowed');
        }
    }
}
