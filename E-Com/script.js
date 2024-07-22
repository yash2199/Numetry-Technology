const apiURL = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
let allProducts = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.getElementById('allButton').addEventListener('click', () => displayProducts(allProducts));
    document.getElementById('menButton').addEventListener('click', () => filterCategory('Men'));
    document.getElementById('womenButton').addEventListener('click', () => filterCategory('Women'));
    document.getElementById('kidsButton').addEventListener('click', () => filterCategory('Kids'));
    document.getElementById('searchInput').addEventListener('input', searchProducts);
});

function fetchProducts() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the entire response to check its structure
            allProducts = data.categories.flatMap(category => category.category_products);
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Vendor: ${product.vendor}</p>
            <p class="price">Price: ₹${product.price}</p>
            <p class="compare_at_price">Compare at: ₹${product.compare_at_price}</p>
            <p>Badge: ${product.badge_text}</p>
        `;
        container.appendChild(productElement);
    });
}

function filterCategory(categoryName) {
    const filteredProducts = allProducts.filter(product => getCategory(product.id) === categoryName);
    displayProducts(filteredProducts);
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.vendor.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function getCategory(productId) {
    if (productId.endsWith('k')) return 'Kids';
    if (productId.endsWith('w')) return 'Women';
    return 'Men';
}
