const orders = [
    {
        id: 1,
        items: [
            { name: "Apple", quantity: 3 },
            { name: "Banana", quantity: 2 }
        ]
    },
    {
        id: 2,
        items: [
            { name: "Apple", quantity: 1 },
            { name: "Orange", quantity: 4 }
        ]
    }
];

// function summarizeOrders(orders) {
//     const totalOrders = {};
//     orders.forEach((order) => {
//         order.items.forEach((item) => {totalOrders[item.name] ? totalOrders[item.name] += item.quantity : totalOrders[item.name] = item.quantity}); //the last one creates the key and adds the value to it
//     });
//     return Object.entries(totalOrders).map(([name, quantity]) => ({ name, quantity }));

// }

function summarizeOrders(orders) {
    return orders.reduce((acc, order) => {order.items.foreach((item) => {acc[item.name] ? acc[item.name] += item.quantity : acc[item.name] = item.quantity}); return acc}, {});
}

console.log(summarizeOrders(orders));
