// Navegación responsive
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Cargar productos desde JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch('assets/productos/productos.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data.productos);
            setupFiltering(data.productos);
        })
        .catch(error => {
            console.error('Error cargando los productos:', error);
            // Datos de ejemplo en caso de error
            const productosEjemplo = [
                {
                    "id": 1,
                    "nombre": "Horchata",
                    "precio": "$5.00",
                    "imagen": "media/horchata.jpg",
                    "categoria": "tradicional",
                    "descripcion": "Bebida refrescante a base de arroz, canela y vainilla. Disponible en medio galón."
                },
                {
                    "id": 2,
                    "nombre": "Limonada de Fresa",
                    "precio": "$4.50",
                    "imagen": "media/limon-fresa.jpg",
                    "categoria": "citrico",
                    "descripcion": "Combinación perfecta de limón fresco y fresas dulces."
                },
                {
                    "id": 3,
                    "nombre": "Nance",
                    "precio": "$4.50",
                    "imagen": "media/nance.jpg",
                    "categoria": "tropical",
                    "descripcion": "Bebida exótica con el s único y delicioso del nance."
                }
                // ... más productos
            ];
            displayProducts(productosEjemplo);
            setupFiltering(productosEjemplo);
        });
});

// Mostrar productos en la grid
function displayProducts(productos) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.setAttribute('data-category', producto.categoria);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-price">${producto.precio}</p>
                <p class="product-description">${producto.descripcion}</p>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
}

// Filtrado de productos
function setupFiltering(productos) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase active al botón clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterProducts(filter, productos);
        });
    });
}

function filterProducts(filter, productos) {
    if (filter === 'all') {
        displayProducts(productos);
    } else {
        const filteredProducts = productos.filter(producto => producto.categoria === filter);
        displayProducts(filteredProducts);
    }
}

// Animación de elementos al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature, .info-item').forEach(el => {
    observer.observe(el);
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulación de envío del formulario
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Efecto de escritura en el título principal
function typeWriterEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Iniciar efectos cuando la página cargue
window.addEventListener('load', function() {
    typeWriterEffect();
});