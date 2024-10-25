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
const SUITE_STORE_TABLE_HEADERS = tableHeaderFactory([
    ...BASE_TABLE_HEADER_W_PRODUCTS,
    "Total",
]);

const THUNK_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCEDDED: 'succeeded',
    FAILED: 'failed',
};

const HTTP_STATUS = {
    CREATED: 201,
};

const INITIAL_STATE = {
    error: null,
    status: THUNK_STATUS.IDLE,
};

export {
    CATEGORY_TABLE_HEADERS,
    PRODUCT_TABLE_HEADERS,
    SUITE_STORE_TABLE_HEADERS,
    THUNK_STATUS,
    HTTP_STATUS,
    INITIAL_STATE,
};
