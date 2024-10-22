class OrderItems {
    static async getOrderItems () {
        return await fetch("http://localhost/order_item", {
            method: "GET",
        }).then((e) => e.json());
    }

    static async postOrderItem (order_code, product_code, amount) {
        const response = fetch("http://localhost/order_item", {
            method: "POST",
            body: JSON.stringify({ order_code, product_code, amount }),
        }).then((e) => e.json());

        return response;
    }
}

export default OrderItems;
