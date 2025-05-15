const products = [
    { id: 1, name: "Laptop", price: 4500, stock: 10 },
    { id: 2, name: "Phone", price: 2500, stock: 20 },
    { id: 3, name: "Tablet", price: 1500, stock: 15 },
    { id: 4, name: "Headphones", price: 500, stock: 50 } ];

function calculateTotalStock(products) { // calculates the total stock of all items in the product array
    let totalStock = products.reduce((acc /* accumelate צובר */, product) => acc + product.stock, 0);
    return totalStock
}
console.log(calculateTotalStock(products));

function addProduct(products, product) { // adds a products to the product array
    if (products.find((productss) => productss.id === product.id)) {
        return products.push(product)
        console.log("Product added");
    }
    return "Product already exists"
}
const prod1 = {id:5, name: "Mouse", price: 300, stock: 20}
console.log(addProduct(products, prod1));
console.log(calculateTotalStock(products));

function updateStock(products, id, newStock) {// updates the amount of stock available for a product
    if (products.find((productss) => productss.id === id)) {
        let product = products.find(product => product.id === id)
        product.stock += newStock
        return `Stock updated for ${product.name}. New stock is: ${product.stock}`
    }
    return "Product not found"
}

console.log(updateStock(products, 2, 35));
console.log(calculateTotalStock(products));

function filterExpensiveProducts(products, price) { // filters the products that are more expensive than the price set
    return products.filter((product) => product.price > price)

}

console.log(filterExpensiveProducts(products, 2000));

function calculatePotentialRevenue(products) { // calculates the potential revenue for the products array
    return products.reduce((acc, product) => acc + product.price * product.stock, 0)
}

console.log(calculatePotentialRevenue(products));

function removeProduct(products, name) { // removes a product from the product array
    if (products.find(product => product.name === name)) {
        let product = products.find(product => product.name === name)
        products.splice(products.indexOf(product), 1)
        return products
    }
    return "Product not found"
}

console.log(removeProduct(products, "Phone"));

