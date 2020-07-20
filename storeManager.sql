use storeManager;

db.products.insertMany(
    [
        { "name": "Caneta", "quantity": 20 },
        { "name": "Tesoura", "quantity": 5 },
        { "name": "Borracha", "quantity": 15 }
    ]
);

db.sales.insertOne({
    "sale": [
        {
            "productId": "5f106370691655192e7e07de",
            "quantity": 5
        },
        {
            "productId": "5f036cf6561dd562ea88836d",
            "quantity": 10
        },
        {
            "productId": "5f036cf6561dd562ea88836e",
            "quantity": 11
        },
        {
            "productId": "5f036cf6561dd562ea88836f",
            "quantity":15
        }
    ]
});
