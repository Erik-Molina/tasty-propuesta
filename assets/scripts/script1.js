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

    // Variables globales para el carrito
    let cartItems = [];
    let cartCount = 0;
    const whatsappNumber = "50498664601"; // Número de WhatsApp

    // Inicializar carrito
    function initCart() {
        const cartToggle = document.getElementById('cart-toggle');
        const cartSidebar = document.getElementById('cart-sidebar');
        const closeCart = document.getElementById('close-cart');
        const cartOverlay = document.getElementById('cart-overlay');
        const whatsappOrderBtn = document.getElementById('whatsapp-order');

        // Abrir carrito
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });

        // Cerrar carrito
        closeCart.addEventListener('click', closeCartModal);
        cartOverlay.addEventListener('click', closeCartModal);

        // Enviar pedido por WhatsApp
        whatsappOrderBtn.addEventListener('click', sendWhatsAppOrder);
    }

    // Cerrar modal del carrito
    function closeCartModal() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.getElementById('cart-overlay');
        
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }

    // Actualizar contador del carrito
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = cartCount;
    }

    // Añadir producto al carrito
    function addToCart(product) {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        cartCount++;
        updateCartCount();
        updateCartItems();
        
        // Mostrar notificación
        showNotification(`${product.nombre} añadido al carrito`);
    }

    // Mostrar notificación
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar y luego eliminar la notificación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Actualizar items del carrito en el modal
    function updateCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            return;
        }
        
        let cartHTML = '';
        cartItems.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-item-details">
                        <h4>${item.nombre}</h4>
                        <p>${item.precio} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        
        // Añadir event listeners para eliminar items
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                removeFromCart(id);
            });
        });
    }

    // Eliminar producto del carrito
    function removeFromCart(id) {
        const itemIndex = cartItems.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            cartCount -= cartItems[itemIndex].quantity;
            cartItems.splice(itemIndex, 1);
            updateCartCount();
            updateCartItems();
        }
    }

    // Enviar pedido por WhatsApp
    function sendWhatsAppOrder() {
        if (cartItems.length === 0) {
            showNotification('Tu carrito está vacío');
            return;
        }
        
        let message = "¡Hola! Me gustaría hacer un pedido:%0A%0A";
        
        cartItems.forEach(item => {
            message += `- ${item.nombre} x ${item.quantity}%0A`;
        });
        
        message += "%0A¡Gracias!";
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        window.open(whatsappURL, '_blank');
    }

    // Enviar mensaje de más información por WhatsApp
    function sendProductInfo(product) {
        let message = `¡Hola! Me interesa obtener más información sobre: ${product.nombre}`;
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappURL, '_blank');
    }

    // Enviar formulario de contacto por WhatsApp
    function sendContactForm(formData) {
        const { name, email, phone, message } = formData;
        
        let whatsappMessage = `¡Hola! Me gustaría contactarlos:%0A%0A`;
        whatsappMessage += `*Nombre:* ${name}%0A`;
        whatsappMessage += `*Email:* ${email}%0A`;
        
        if (phone) {
            whatsappMessage += `*Teléfono:* ${phone}%0A`;
        }
        
        whatsappMessage += `*Mensaje:*%0A${message}%0A%0A`;
        whatsappMessage += `¡Espero su respuesta!`;
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        window.open(whatsappURL, '_blank');
    }

    // Cargar productos desde JSON
    document.addEventListener('DOMContentLoaded', function() {
        initCart();
        
        // Configurar formulario de contacto
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const phone = this.querySelector('input[type="tel"]').value;
                const message = this.querySelector('textarea').value;
                
                // Simulación de envío del formulario
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Enviar por WhatsApp
                    sendContactForm({ name, email, phone, message });
                    
                    // Restablecer formulario
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Mostrar mensaje de confirmación
                    showNotification('Mensaje enviado. Será redirigido a WhatsApp.');
                }, 1500);
            });
        }
        
        fetch('assets/productos/productos.json')
            .then(response => response.json())
            .then(data => {
                // Formatear precios a Lempiras
                const productosConPrecio = data.productos.map(producto => {
                    return {
                        ...producto,
                        precio: `${producto.precio} c/u` // Usar el precio tal como está en la base de datos y añadir " c/u"
                    };
                });
                
                displayProducts(productosConPrecio);
                setupFiltering(productosConPrecio);
            })
            .catch(error => {
                console.error('Error cargando los productos:', error);
                // Datos de ejemplo en caso de error
                const productosEjemplo = [
                    {
                        "id": 1,
                        "nombre": "Horchata",
                        "precio": "L 20 c/u",
                        "imagen": "media/horchata.jpg",
                        "categoria": "tradicional",
                        "descripcion": "Bebida refrescante a base de arroz, canela y vainilla. Disponible en medio galón."
                    },
                    {
                        "id": 2,
                        "nombre": "Limonada de Fresa",
                        "precio": "L 20 c/u",
                        "imagen": "media/limon-fresa.jpg",
                        "categoria": "citrico",
                        "descripcion": "Combinación perfecta de limón fresco y fresas dulces."
                    },
                    {
                        "id": 3,
                        "nombre": "Nance",
                        "precio": "L 20 c/u",
                        "imagen": "media/nance.jpg",
                        "categoria": "tropical",
                        "descripcion": "Bebida exótica con el sabor único y delicioso del nance."
                    }
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
                    <p class="wholesale-price">Precio especial en mayoreo</p>
                    <p class="product-description">${producto.descripcion}</p>
                    <div class="product-buttons">
                        <button class="add-to-cart-btn" data-id="${producto.id}">
                            <i class="fas fa-shopping-cart"></i> Añadir al carrito
                        </button>
                        <button class="more-info-btn" data-id="${producto.id}">
                            <i class="fas fa-info-circle"></i> Más información
                        </button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Añadir event listeners a los botones
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const product = productos.find(p => p.id === id);
                if (product) {
                    addToCart(product);
                }
            });
        });
        
        document.querySelectorAll('.more-info-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const product = productos.find(p => p.id === id);
                if (product) {
                    sendProductInfo(product);
                }
            });
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
