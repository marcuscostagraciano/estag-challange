const tableHeaderFactory = (headers) => [
    BASE_TABLE_HEADERS[0],
    ...headers,
    BASE_TABLE_HEADERS[1],
];

const BASE_TABLE_HEADERS = ["#", "Action"];
const BASE_TABLE_HEADER_W_PRODUCTS = ["Product", "Amount", "Price ($)"];

const CATEGORY_TABLE_HEADERS = tableHeaderFactory(["Category", "Tax (%)"]);
const PRODUCT_TABLE_HEADERS = tableHeaderFactory([
    ...BASE_TABLE_HEADER_W_PRODUCTS,
    "Category",
]);
const SUITE_STORE_TABLE_HEADERS = [
    ...BASE_TABLE_HEADER_W_PRODUCTS,
    "Total",
    "Action",
];
const HISTORY_TABLE_HEADERS = ["#", "Tax ($)", "Total ($)"];

const BASE_FIELDS = ["code", "name"];
const CATEGORY_FIELDS = [...BASE_FIELDS, "tax"];
const PRODUCT_FIELDS = [...BASE_FIELDS, "amount", "price", "category_code"];

const THUNK_STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCEDDED: "succeeded",
    FAILED: "failed",
};

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    FORBIDDEN: 403,
};

const INITIAL_STATE = {
    error: null,
    status: THUNK_STATUS.IDLE,
};

const PATCH_OPERATIONS = {
    ADD: "ADD",
    SUB: "SUB",
};

export {
    // Table Headers
    CATEGORY_TABLE_HEADERS,
    PRODUCT_TABLE_HEADERS,
    SUITE_STORE_TABLE_HEADERS,
    HISTORY_TABLE_HEADERS,
    // Objects fields
    CATEGORY_FIELDS,
    PRODUCT_FIELDS,
    // State
    INITIAL_STATE,
    // Status
    THUNK_STATUS,
    HTTP_STATUS,
    PATCH_OPERATIONS,
};
