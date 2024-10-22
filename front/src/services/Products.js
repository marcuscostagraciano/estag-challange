class Products {
    static async getProducts () {
        return await fetch("http://localhost/products", { method: "GET" }).then(
            (e) => e.json()
        );
    }

    static async postProduct (name, amount, price, category_code) {
        const response = await fetch("http://localhost/products", {
            method: "POST",
            body: JSON.stringify({ name, price, category_code, amount }),
        }).then((e) => e.json());

        return response;
    }

    static async deleteProduct (id) {
        return await fetch(`http://localhost/products/${id}`, {
            method: "DELETE",
        }).then((e) => e.json());
    }

    static async patchProduct (id, amount, price) {
        const response = await fetch(`http://localhost/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ amount, price }),
        }).then((e) => e.json());

        return response;
    }
}

export default Products;
