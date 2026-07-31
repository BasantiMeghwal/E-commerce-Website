function toggleMenu(){
    document.getElementById("nav-links")
    .classList.toggle("active");
}
let searchInp = document.getElementById("inp");
if(searchInp){
searchInp.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        let value = searchInp.value.trim();

        if (value !== "") {
            window.location.href = "/products.html?search=" + value;
        }
    }
})}

function updateCartCount(){
     let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let button = document.getElementById("btn")
    if(button){
        button.innerText = "🛒 Cart (" + cart.length + ")";
    }
}
function toCart(name, price, image) {

    alert("Your Product Added To Cart");
    
     let cart = JSON.parse(localStorage.getItem("cart")) || [];
   
    cart.push({
        name:name,
        price:price,
        image:image
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount()
}
