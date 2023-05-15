import express from "express";

const productsArray = [
    {
    title: 'Argentina',
    description: 'Camiseta',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/4dJB6DR/camiseta-Argentina.png',
    code: 'C0001',
    stock: '5',
    },
    {
    title: 'Argentina',
    description: 'Pantalón corto',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/JvbsxnS/short-argentina.png',
    code: 'C0002',
    stock: '5',
    },
    {
    title: 'Croacia',
    description: 'Camiseta',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/jMmCR7f/camiseta-Croacia.png',
    code: 'C0003',
    stock: '5',
    },
    {
    title: 'Paises Bajos',
    description: 'Camiseta',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/4NykKFH/camiseta-Holanda.png',
    code: 'C0004',
    stock: '5',
    }, 
    {
    title: 'Brasil',
    description: 'Camiseta',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/bmccp6d/camisetas-Brasil.png',
    code: 'C0005',
    stock: '5',
    },
    {
    title: 'Alemania',
    description: 'Camiseta',
    price: 'USD 100',
    thumbnail: 'https://i.ibb.co/f1VRdR0/camiseta-Alemania.png',
    code: 'C0006',
    stock: '5',
    },
    {
    title: 'España',
    description: 'Camiseta',
    price: 'USD 90',
    thumbnail: 'https://i.ibb.co/fnyhXPj/camiseta-Espa-a.png',
    code: 'C0007',
    stock: '3',
    },
    {
    title: 'Portugal',
    description: 'Camiseta',
    price: 'USD 70',
    thumbnail: 'https://i.ibb.co/SVtLNvb/camiseta-Portugal.png',
    code: 'C0008',
    stock: '7',
    },
    {
    title: 'Francia',
    description: 'Camiseta',
    price: 'USD 70',
    thumbnail: 'https://i.ibb.co/163WFk8/camiseta-Francia.png',
    code: 'C0009',
    stock: '7',
    },
    {
    title: 'Francia',
    description: 'Pantalón corto',
    price: 'USD 70',
    thumbnail: 'https://i.ibb.co/p23whvt/short-francia-Photo-Room.png',
    code: 'C0010',
    stock: '7',
    },
  ];

export const productsHtmlRoutes = express.Router();
const productsHtmlRoutes = express.Router();
usersHtmlRouter.get("/", (req, res) => {
  return res.status(200).render("usuarios", { productsArray });
});

