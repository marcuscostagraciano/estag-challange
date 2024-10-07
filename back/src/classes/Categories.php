<?php

// SERVICE
class Categories
{
    private static ?object $conn = null;

    private static function initializeConnection(): void
    {
        if (!isset(self::$conn))
            self::$conn = DatabaseConnection::getConnection();
    }

    private static function createCategory(string $name, float $tax): array
    {
        $sql = 'INSERT INTO categories (name, tax) VALUES (:name, :tax)';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            // Não existe um 'PARAM_FLOAT'
            $stmt->bindParam(':tax', $tax, PDO::PARAM_STR);
            $stmt->execute();
            $last_code = self::$conn->lastInsertId();
            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        $insert_data = [
            'code' => $last_code,
            'name' => $name,
            'tax' => $tax,
        ];
        return ResponseHandler::handleResponse(201, response_array: $insert_data);
    }

    private static function readCategories(): array
    {
        try {
            $stmt = self::$conn->query('SELECT * FROM categories ORDER BY code ASC');
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            //throw $th;
        }
        return ResponseHandler::handleResponse(200, response_array: $result ?? []);
    }

    private static function readCategory(int $category_code): array
    {
        $sql = 'SELECT * FROM categories WHERE code = :category_code';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? $result : ResponseHandler::handleResponse(404, response_message: 'Not Found');
        } catch (PDOException $e) {
            //throw $th;
        }
    }

    private static function deleteCategory(int $category_code): array
    {
        $sql = 'DELETE FROM categories WHERE code = :category_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->execute();

            self::$conn->commit();
        } catch (PDOException $e) {
            //throw $th;
        }

        return ResponseHandler::handleResponse(200, response_message: 'Successfully deleted');
    }

    public static function handleCategoryRequest(array $request_info): array
    {
        self::initializeConnection();
        $method = $request_info['METHOD'];
        $codeToConsult = intval($request_info['ID_TO_CONSULT']) ?? null;
        $categoryName = $request_info['BODY']['name'] ?? null;
        $tax = $request_info['BODY']['tax'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult)
                    return self::readCategory($codeToConsult);
                return self::readCategories();
                break;

            case 'POST':
                if ($categoryName && isset($tax))
                    return self::createCategory($categoryName, $tax);
                break;

            case 'DELETE':
                if (!is_null($codeToConsult))
                    return self::deleteCategory($codeToConsult);
                break;

            default:
                return ResponseHandler::handleResponse(405, response_message: 'Method Not Allowed');
        }
    }
}
