const socket = io();

const formProducts = document.querySelector(".styleForm");
const inputTitle = document.getElementById("formTitle");
const inputDescript = document.getElementById("formDescription");
const inputPrice = document.getElementById("formPrice");
const inputCode = document.getElementById("formCode");
const inputStock = document.getElementById("formStock");
const inputCategory = document.getElementById("formCategory");
const inputThumbnail = document.getElementById("formThumbnails");

  formProducts.addEventListener ('submit', (e) => {
    e.preventDefault();
    const newProductIncorporate = {
      title: inputTitle.value,
      description: inputDescript.value,
      price: +inputPrice.value,
      thumbnail: inputThumbnail.value,
      code: inputCode.value,
      stock: +inputStock.value,
      category: inputCategory.value,
    };
    socket.emit("new-product", newProductIncorporate);
    formProducts.reset();
  });

  socket.on("createProductSuccess", (data) => {
    const cardContainer = document.getElementById('cardContainer');
    let newCard = document.createElement('div');
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
    <img src="${data.thumbnails}">
    `;
    cardContainer.appendChild(newCard);
});


deleteProduct = (productId) => {
  socket.emit("delete-product", productId);
};

socket.on("createProductFailure", (error) => {
    alert(error);
});