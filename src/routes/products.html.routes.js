import express from "express";

const productsArray = [
  {
    title: "Argentina",
    description: "Camiseta",
    code: "C0001",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/4dJB6DR/camiseta-Argentina.png"
    ]
},
{
    title: "Argentina",
    description: "Pantalón corto",
    code: "C0002",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/JvbsxnS/short-argentina.png"
    ]
},
{
    title: "Croacia",
    description: "Camiseta",
    code: "C0003",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/jMmCR7f/camiseta-Croacia.png"
    ]
},
{
    title: "Paises Bajos",
    description: "Camiseta",
    code: "C0004",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/4NykKFH/camiseta-Holanda.png"
    ]
},
{
    title: "Brasil",
    description: "Camiseta",
    code: "C0005",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/bmccp6d/camisetas-Brasil.png"
    ]
},
{
    title: "Alemania",
    description: "Camiseta",
    code: "C0006",
    price: "USD 100",
    status: true,
    stock: "5",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/f1VRdR0/camiseta-Alemania.png"
    ]
},
{
    title: "España",
    descripton: "Camiseta",
    code: "C0007",
    price: "USD 90",
    status: true,
    stock: "3",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/fnyhXPj/camiseta-Espa-a.png"
    ]
},
{
    title: "Portugal",
    description: "Camiseta",
    code: "C0008",
    price: "USD 70",
    status: true,
    stock: "7",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/SVtLNvb/camiseta-Portugal.png"
    ]
},
{
    title: "Francia",
    description: "Camiseta",
    code: "C0009",
    price: "USD 70",
    status: true,
    stock: "7",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/163WFk8/camiseta-Francia.png"
    ]
},
{
    title: "Francia",
    description: "Pantalón corto",
    code: "C0010",
    price: "USD 70",
    status: true,
    stock: "7",
    category: "x",
    thumbnails: [
    "https://i.ibb.co/p23whvt/short-francia-Photo-Room.png"
    ]
}
];

export const productsHtmlRoutes = express.Router();
productsHtmlRoutes.get("/", (req, res) => {
  return res.status(200).render("products", { productsArray });
});

