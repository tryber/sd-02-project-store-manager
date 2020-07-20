db.products.insertMany([
  { name: 'vinho', quantity: 10 },
  { name: 'whisky', quantity: 20 },
  { name: 'cachaça da brava', quantity: 30 },
]);

db.sales.insertMany([
  {
    itens:[
     { productId: "5f0b70bac3d16e344fe8643f", quantity: 3 },
     { productId: "5f0b70bac3d16e344fe8643e", quantity: 5 },
    ]
  },
{
    itens:[
     { productId: "5f0b70bac3d16e344fe8643f", quantity: 1 },
     { productId: "5f0b70bac3d16e344fe8643e", quantity: 2 },
    ]
  },
]);
