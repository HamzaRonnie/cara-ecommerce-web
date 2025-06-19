const bar = document.getElementById('bar');
const nav = document.getElementById('navbar'); 
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}


if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// const ProductsApi = fetch("https://fakestoreapi.in/api/products")
// .then(res => res.json())
// .then(res => console.log(res))
// console.log(ProductsApi)

// console.log(ProductsApi = 1,2,3,4)
// ProductsApi = require (1) 