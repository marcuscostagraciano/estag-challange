class Orders {
    static async getOrders () {
        return await fetch("http://localhost/orders", { method: "GET" }).then(
            (e) => e.json()
        );
    }

    static async postOrder (total = 0, tax = 0) {
        const response = await fetch("http://localhost/orders", {
            method: "POST",
            body: JSON.stringify({ total, tax }),
        }).then((e) => e.json());

        return response;
    }

    static async putOrder (id, total, tax) {
        const response = await fetch(`http://localhost/orders/${id}`, {
            method: "PUT",
            body: JSON.stringify({ total, tax }),
        }).then((e) => e.json());

        return response;
    }
}

export default Orders;
