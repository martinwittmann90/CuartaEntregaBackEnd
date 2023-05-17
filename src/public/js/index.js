const socket = io();

socket.on("deleted", (deleted) => {

})

socket.on("createProductSuccess", (data) => {
    console.log(data);
    const cardContainer = document.getElementById('cardContainer');
    var newCard = document.createElement('div');
    newCard.id = data.id;
    newCard.style.display = 'inline-block';
    newCard.style.margin = '10px';
    newCard.style.border = '5px solid black';

    newCard.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>Precio: ${data.price}</p>
    <p>Code: ${data.code}</p>
    <p>Stock: ${data.stock}</p>
    <p>Category: ${data.category}</p>
    `;
    cardContainer.appendChild(newCard);
});

socket.on("createProductFailure", (error) => {
    alert(error);
});


const formulario = document.getElementById("styleForm");
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const code = document.getElementById("code").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const data = {
        title, description, code, price, stock, category
    }

    socket.emit("createProduct", data);

})