class Categories {
    static async getCategories () {
        return await fetch("http://localhost/categories", {
            method: "GET",
        }).then((e) => e.json());
    }

    static async postCategory (name, tax) {
        const response = await fetch("http://localhost/categories", {
            method: "POST",
            body: JSON.stringify({ name, tax }),
        }).then((e) => e.json());

        return response;
    }

    static async deleteCategory (id) {
        return await fetch(`http://localhost/categories/${id}`, {
            method: "DELETE",
        }).then((e) => e.json());
    }
}

export default Categories;
