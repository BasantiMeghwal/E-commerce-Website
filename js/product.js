let search = document.getElementById("inp");

search.addEventListener("input", function(){

    let value = search.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        let name = card.querySelector("h3").innerText.toLowerCase();

        if(name.includes(value)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

});

fetch('https://dummyjson.com/products?limit=0')

.then(res => res.json())
.then(data =>{
    let product = data.products
    let dataBox = document.getElementById("products")
    product.forEach(element => {
        dataBox.innerHTML += `
        <div class="card">
        <img src="${element.thumbnail}">
        <h3> ${element.title}</h3>
        <p>₹${element.price}</p>
        <p>${element.category}</p>
        <button onclick="toCart('${element.title}', '${element.price}', '${element.thumbnail}')">Add To Cart</button>
        </div>
                    `
    });
});