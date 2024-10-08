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

            $insert_data = [
                'code' => $last_code,
                'name' => $name,
                'tax' => $tax,
            ];
            return ResponseHandler::handleResponse(201, responseArray: $insert_data);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readCategories(): array
    {
        try {
            $stmt = self::$conn->query('SELECT * FROM categories ORDER BY code ASC');
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ResponseHandler::handleResponse(200, responseArray: $result ?? []);
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function readCategory(int $category_code): array
    {
        $sql = 'SELECT * FROM categories WHERE code = :category_code';

        try {
            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result ? $result : ResponseHandler::handleResponse(404, responseMessage: 'Category not found');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
        }
    }

    private static function deleteCategory(int $category_code): array
    {
        $category = self::readCategory($category_code);
        if (isset($category['status']))
            return $category;

        $sql = 'DELETE FROM categories WHERE code = :category_code';

        try {
            self::$conn->beginTransaction();

            $stmt = self::$conn->prepare($sql);
            $stmt->bindParam(':category_code', $category_code, PDO::PARAM_INT);
            $stmt->execute();

            self::$conn->commit();
            return ResponseHandler::handleResponse(200, responseMessage: 'Successfully deleted');
        } catch (PDOException $e) {
            return PDOExceptionHandler::handleException($e);
            return PDOExceptionHandler::handleException($e);
        }
    }

    public static function handleCategoryRequest(array $requestInfo): array
    {
        self::initializeConnection();
        $method = $requestInfo['METHOD'];
        $codeToConsult = intval($requestInfo['ID_TO_CONSULT']) ?? null;
        $categoryName = $requestInfo['BODY']['name'] ?? null;
        $tax = $requestInfo['BODY']['tax'] ?? null;

        switch ($method) {
            case 'GET':
                if ($codeToConsult)
                    return self::readCategory($codeToConsult);
                return self::readCategories();
                break;

            case 'POST':
                if (!(is_null($categoryName) && is_null($tax)))
                    return self::createCategory($categoryName, $tax);
                return ResponseHandler::handleResponse(400, responseMessage: 'Bad request');

            case 'DELETE':
                if (!is_null($codeToConsult))
                    return self::deleteCategory($codeToConsult);
                break;

            default:
                return ResponseHandler::handleResponse(405, responseMessage: 'Method not allowed');
        }
    }
}
