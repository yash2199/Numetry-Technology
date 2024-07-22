let products = [];

document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();
    document.getElementById('search').addEventListener('input', function() {
        searchProducts(this.value);
    });
});

function fetchProducts() {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data); // Log the fetched data to check its structure
            if (data.products) {
                products = data.products;
                displayProducts(products);
            } else {
                console.error('Error: The expected "products" field is missing in the fetched data.');
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    console.log('Displaying products:', products); // Debug: Log the products to be displayed
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <p>Vendor: ${product.vendor}</p>
            <p>Category: ${product.product_type}</p>
        `;
        container.appendChild(productElement);
    });
}

function filterCategory(category) {
    const filteredProducts = products.filter(product => product.product_type === category);
    displayProducts(filteredProducts);
}

function searchProducts(query) {
    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(query.toLowerCase()) ||
               product.vendor.toLowerCase().includes(query.toLowerCase()) ||
               product.product_type.toLowerCase().includes(query.toLowerCase());
    });
    displayProducts(filteredProducts);
}
