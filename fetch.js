const productList = document.getElementById("product-list");
const loader = document.getElementById("loader");

let page = 0;         // Current page (0 means skip 0)
const limit = 8;      // Products per page
let isLoading = false;
let total = 0;

// Function to load products
async function loadProducts() {
  if (isLoading) return;

  isLoading = true;
  loader.innerText = "Loading...";

  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`);
    const data = await response.json();

    total = data.total;

    data.products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.thumbnail}" width="100">
        <p>${product.description}</p>
        <strong>$${product.price}</strong>
      `;
      productList.appendChild(div);
    });

    page++;
    if (page * limit >= total) {
      loader.innerText = "No more products";
      observer.disconnect(); // Stop observing
    } else {
      loader.innerText = "Scroll to load more...";
    }
  } catch (error) {
    loader.innerText = "Failed to load data.";
    console.error("Error loading products:", error);
  }

  isLoading = false;
}

// Intersection Observer for infinite scroll
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !isLoading) {
    loadProducts();
  }
}, {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
});

// Start observing the loader
observer.observe(loader);

// Load initial products
loadProducts();
