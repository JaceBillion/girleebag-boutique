import products from './products.js';

// Live product list — starts with products.js, overridden by Supabase if available
let liveProducts = products.map((p, i) => ({ ...p, _sbId: null }));

// --- SUPABASE CLOUD INITIALIZATION ---
const supabaseUrl = 'https://gqvgrxrkkksgxuaivvpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdmdyeHJra2tzZ3h1YWl2dnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNDE3MDAsImV4cCI6MjA5MTYxNzcwMH0.C9GzB7ygtEgASjXHRTYSygrhwsa79GD8-QfjYr6lxTw';

// Safe initialization to avoid script crashes
let supabase = null;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    }
} catch (e) {
    console.error("Supabase fail:", e);
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const leadModal = document.getElementById('lead-modal');
    const productModal = document.getElementById('product-modal');
    const productContainer = document.getElementById('product-container');
    const cartCount = document.querySelector('.cart-count');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    let cart = JSON.parse(localStorage.getItem('girlee_cart')) || [];

    // --- STRIPE INITIALIZATION ---
    let stripe = null;
    if (typeof STRIPE_PUBLISHABLE_KEY !== 'undefined' && STRIPE_PUBLISHABLE_KEY !== 'PASTE_YOUR_STRIPE_PUBLIC_KEY_HERE') {
        stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
    }

    // --- LOAD PRODUCTS (Supabase first, products.js fallback) ---
    const initProducts = async () => {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('active', true)
                    .order('display_order', { ascending: true })
                    .order('created_at', { ascending: true });
                if (data && data.length > 0 && !error) {
                    liveProducts = data.map(p => ({
                        id: p.id,
                        name: p.name,
                        description: p.description || '',
                        price: parseFloat(p.price),
                        stripeLink: p.stripe_link || '',
                        images: p.images || [],
                        category: p.category || '',
                    }));
                }
            } catch(e) {
                console.warn('Supabase product load failed, using products.js:', e);
            }
        }
        renderProducts();
    };

    // --- RENDER PRODUCTS ---
    const renderProducts = (searchTerm = '') => {
        if (!productContainer) return;
        productContainer.innerHTML = '';
        
        const filtered = liveProducts.filter(p => {
            const query = searchTerm.toLowerCase();
            return p.name.toLowerCase().includes(query) || 
                   p.description.toLowerCase().includes(query);
        });

        if (filtered.length === 0) {
            productContainer.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 100px 20px; opacity: 0.6;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; margin-bottom: 20px; display: block;"></i>
                    <h3>No bags found matching "${searchTerm}"</h3>
                    <p>Try a different keyword or check back later!</p>
                </div>
            `;
            return;
        }

        filtered.forEach(product => {
            const productHTML = `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <div class="quick-view-overlay">Quick View</div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span>(5.0)</span>
                        </div>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart" data-id="${product.id}"><b>ADD TO CART</b></button>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productHTML;
        });

        // Click to open modal
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.add-to-cart')) return;
                const productId = card.getAttribute('data-id');
                // Try numeric parse first (products.js), else use string (Supabase bigint)
                const idParsed = isNaN(productId) ? productId : (Number.isInteger(parseFloat(productId)) ? parseInt(productId) : productId);
                openProductModal(idParsed);
            });
        });

        attachCartListeners();
    };

    // --- PRODUCT MODAL LOGIC ---
    const openProductModal = (id) => {
        const product = liveProducts.find(p => p.id == id);
        if (!product) return;

        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('modal-category').textContent = product.category;
        
        const mainImage = document.getElementById('modal-main-image');
        mainImage.src = product.images[0];

        const thumbnailList = document.getElementById('modal-thumbnails');
        thumbnailList.innerHTML = '';
        product.images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.className = index === 0 ? 'active' : '';
            thumb.onclick = () => {
                mainImage.src = img;
                document.querySelectorAll('.thumbnail-list img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            };
            thumbnailList.appendChild(thumb);
        });

        // --- NEW: MODAL QUANTITY LOGIC ---
        let modalQty = 1;
        const qtyDisplay = document.getElementById('modal-qty-display');
        const qtyPlus = document.getElementById('modal-qty-plus');
        const qtyMinus = document.getElementById('modal-qty-minus');

        if (qtyDisplay) qtyDisplay.textContent = modalQty;
        if (qtyPlus) {
            qtyPlus.onclick = () => {
                modalQty++;
                qtyDisplay.textContent = modalQty;
            };
        }
        if (qtyMinus) {
            qtyMinus.onclick = () => {
                if (modalQty > 1) {
                    modalQty--;
                    qtyDisplay.textContent = modalQty;
                }
            };
        }

        // Attach IDs to Modal Buttons
        const modalAddBtn = document.querySelector('.modal-add-btn');
        const modalBuyBtn = document.querySelector('.modal-buy-btn');
        
        if (modalAddBtn) {
            modalAddBtn.setAttribute('data-id', id);
            modalAddBtn.onclick = () => {
                addToCart(id, modalQty); // Added quantity support
                productModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            };
        }
        
        if (modalBuyBtn) {
            modalBuyBtn.setAttribute('data-id', id);
            modalBuyBtn.onclick = () => {
                const link = product.stripeLink;
                if (link && link !== 'PASTE_LINK_HERE') {
                    window.location.href = link;
                } else {
                    alert("Stripe Link coming soon! This bag is currently being prepared for its new home.");
                }
            };
        }

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeAllModals = () => {
        if (leadModal) leadModal.classList.remove('active');
        if (productModal) productModal.classList.remove('active');
        if (cartDrawer) cartDrawer.classList.remove('active');
        if (cartOverlay) cartOverlay.style.display = 'none';
        
        const confirmModal = document.getElementById('custom-confirm-modal');
        if (confirmModal) confirmModal.classList.remove('active');

        document.body.style.overflow = 'auto';
    };

    // --- TOAST NOTIFICATION ---
    const showAddedToast = (productName) => {
        // Remove any existing toast
        const existing = document.getElementById('girlee-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'girlee-toast';
        toast.innerHTML = `
            <i class="fa-solid fa-bag-shopping"></i>
            <span><b>${productName}</b> added to your bag!</span>
        `;
        toast.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--text);
            color: white;
            padding: 14px 22px;
            border-radius: 12px;
            font-family: 'Outfit', sans-serif;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 99999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: toastIn 0.3s cubic-bezier(0.16,1,0.3,1);
            border-left: 4px solid var(--primary);
        `;

        // Inject keyframe if not already present
        if (!document.getElementById('toast-style')) {
            const style = document.createElement('style');
            style.id = 'toast-style';
            style.textContent = `
                @keyframes toastIn {
                    from { opacity: 0; transform: translateX(30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes toastOut {
                    from { opacity: 1; transform: translateX(0); }
                    to   { opacity: 0; transform: translateX(30px); }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(toast);

        // Auto-dismiss after 2.5 seconds
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    };

    // --- CART LOGIC ---
    const toggleCart = (isOpen) => {
        if (isOpen) {
            cartDrawer.classList.add('active');
            cartOverlay.style.display = 'block';
            renderCart();
        } else {
            cartDrawer.classList.remove('active');
            cartOverlay.style.display = 'none';
        }
    };

    const addToCart = (productId, qty = 1) => {
        const product = liveProducts.find(p => p.id == productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: qty
            });
        }

        saveCart();
        updateCartCount();
        showAddedToast(product.name); // Show brief confirmation instead of opening cart

    };

    const updateQuantity = (productId, delta) => {
        const item = cart.find(i => i.id == productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                removeFromCart(productId);
            } else {
                saveCart();
                renderCart();
                updateCartCount();
            }
        }
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id != productId);
        saveCart();
        renderCart();
        updateCartCount();
    };

    const saveCart = () => {
        localStorage.setItem('girlee_cart', JSON.stringify(cart));
    };

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    };

    const renderCart = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-msg" style="text-align: center; padding: 50px 20px; opacity: 0.5;">
                    <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; margin-bottom: 20px; display: block;"></i>
                    <p>Your bag is empty.</p>
                </div>
            `;
            cartSubtotal.textContent = "$0.00";
            return;
        }

        let subtotal = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            subtotal += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="window.girlee_updateQty('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                             <button class="qty-btn" onclick="window.girlee_updateQty('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <i class="fa-solid fa-trash-can remove-item" onclick="window.girlee_remove('${item.id}')"></i>
                </div>
            `;
        }).join('');
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    };

    // Global exposed functions for inline onclicks
    window.girlee_updateQty = (id, delta) => updateQuantity(id, delta);
    window.girlee_remove = (id) => removeFromCart(id);

    const attachCartListeners = () => {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                const idAttr = btn.getAttribute('data-id');
                const id = isNaN(idAttr) ? idAttr : (Number.isInteger(parseFloat(idAttr)) ? parseInt(idAttr) : idAttr);
                addToCart(id);
                
                // Visual feedback
                const originalText = btn.innerHTML;
                btn.style.background = '#4DFFEB';
                btn.style.color = '#2D2D2D';
                btn.innerHTML = '<b>ADDED!</b>';
                setTimeout(() => {
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.innerHTML = originalText;
                }, 1000);
            };
        });

        // Modal Add to Cart logic is now handled inside openProductModal to support quantities
    };

    // Initial Render — loads from Supabase first, falls back to products.js
    initProducts();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // Close logic
    document.querySelectorAll('.modal-close, .no-thanks').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) closeAllModals();
    });

    // --- IMAGE ZOOM LOGIC ---
    const zoomContainer = document.querySelector('.main-image-container');
    const zoomImage = document.getElementById('modal-main-image');

    if (zoomContainer && zoomImage) {
        const handleZoom = (e) => {
            const rect = zoomContainer.getBoundingClientRect();
            let x, y;
            
            if (e.type.startsWith('touch')) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }

            const xPct = (x / rect.width) * 100;
            const yPct = (y / rect.height) * 100;

            zoomImage.style.transformOrigin = `${xPct}% ${yPct}%`;
            zoomImage.style.transform = 'scale(2.5)';
        };

        const resetZoom = () => {
            zoomImage.style.transform = 'scale(1)';
            zoomImage.style.transformOrigin = 'center center';
        };

        zoomContainer.addEventListener('mousemove', handleZoom);
        zoomContainer.addEventListener('mouseleave', resetZoom);
        
        // Touch support with preventDefault to stop scrolling while zooming
        zoomContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                handleZoom(e);
            }
        }, { passive: true });

        zoomContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                e.preventDefault();
                handleZoom(e);
            }
        }, { passive: false });

        zoomContainer.addEventListener('touchend', resetZoom);
    }

    // --- HERO SLIDER ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (n) => {
        if (!slides || !slides.length) return;
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    };

    const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
    let slideTimer = slides.length ? setInterval(nextSlide, 5000) : null;

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            if (slideTimer) clearInterval(slideTimer);
            showSlide(parseInt(e.target.getAttribute('data-slide')));
            slideTimer = setInterval(nextSlide, 5000);
        });
    });

    // --- LEAD FORM LOGIC ---
    const leadForm = document.querySelector('#lead-modal form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = leadForm.querySelector('input[type="email"]').value;
            const birthday = leadForm.querySelector('input[type="text"]').value;
            
            const leadData = { email, birthday, created_at: new Date().toISOString() };

            // Cloud Sync
            if (supabase) {
                supabase.from('leads').insert([leadData]).then(({ error }) => {
                    if (error) console.error("Lead Sync Error:", error);
                    else console.log("Lead saved to cloud.");
                });
            }

            // Local Fallback
            const existingLeads = JSON.parse(localStorage.getItem('girlee_leads') || '[]');
            existingLeads.unshift(leadData);
            localStorage.setItem('girlee_leads', JSON.stringify(existingLeads));

            // UI Feedback
            leadForm.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 10px;">You're on the list!</h3>
                    <p style="color: var(--text-light);">Check your email for your <strong>15% OFF</strong> code. Welcome to the GirleeBag VIPs!</p>
                </div>
            `;
            const thanksBtn = document.querySelector('.no-thanks');
            if (thanksBtn) thanksBtn.textContent = 'Continue Shopping';

            setTimeout(closeAllModals, 4000);
        });
    }

    // Cart Navigation - BULLETPROOF LISTENERS
    document.querySelectorAll('.cart-icon').forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', () => {
            console.log("Cart icon clicked"); // Verifying logic in console
            toggleCart(true);
        });
    });
    
    document.getElementById('close-cart').onclick = () => toggleCart(false);
    if (cartOverlay) cartOverlay.onclick = () => toggleCart(false);

    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) continueShoppingBtn.onclick = () => toggleCart(false);


    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.onclick = (e) => {
            if (e) e.stopPropagation();
            let confirmModal = document.getElementById('custom-confirm-modal');
            if (!confirmModal) {
                const confirmModalHTML = `
                    <div id="custom-confirm-modal" class="modal-overlay">
                        <div class="modal-content" style="max-width: 400px; padding: 40px 30px; border-radius: 24px;">
                            <i class="fa-solid fa-trash-can" style="font-size: 3rem; color: var(--primary); margin-bottom: 20px;"></i>
                            <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Clear your bag?</h3>
                            <p style="color: var(--text-light); margin-bottom: 25px; font-size: 1rem;">Are you sure you want to remove all items from your boutique bag? This action cannot be undone.</p>
                            <div style="display: flex; gap: 15px; justify-content: center;">
                                <button id="cancel-clear-btn" style="flex: 1; padding: 14px; border-radius: 12px; background: #f0f0f0; color: var(--text); border: none; font-weight: bold; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#e0e0e0'" onmouseout="this.style.background='#f0f0f0'">Cancel</button>
                                <button id="confirm-clear-btn" style="flex: 1; padding: 14px; border-radius: 12px; background: var(--primary); color: white; border: none; font-weight: bold; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">Yes, Clear It</button>
                            </div>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', confirmModalHTML);
                confirmModal = document.getElementById('custom-confirm-modal');
            }
            
            confirmModal.classList.add('active');
            
            document.getElementById('cancel-clear-btn').onclick = () => {
                confirmModal.classList.remove('active');
            };
            
            document.getElementById('confirm-clear-btn').onclick = () => {
                cart = [];
                saveCart();
                renderCart();
                updateCartCount();
                confirmModal.classList.remove('active');
            };
        };
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = async () => {
            if (cart.length === 0) {
                alert("Your bag is empty! Fill it with some trendy styles first.");
                return;
            }

            // Show loading state
            checkoutBtn.innerHTML = '<b>PROCESSING...</b>';
            checkoutBtn.disabled = true;

            try {
                // Send cart to Vercel serverless function
                const response = await fetch('/api/create-checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: cart.map(item => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image || ''
                        }))
                    })
                });

                const data = await response.json();

                if (data.url) {
                    // Redirect to Stripe-hosted checkout page
                    window.location.href = data.url;
                } else {
                    throw new Error(data.error || 'Could not create checkout session.');
                }

            } catch (error) {
                console.error('Checkout error:', error);
                alert('Checkout is not available locally. Deploy to Vercel and it will work live.\n\nDetails: ' + error.message);
                checkoutBtn.innerHTML = '<b>SECURE CHECKOUT</b>';
                checkoutBtn.disabled = false;
            }
        };
    }

    // --- MOBILE MENU ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMain = document.querySelector('.nav-main');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMain.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    // --- PRODUCT SEARCH ---
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderProducts(e.target.value);
            attachCartListeners(); // Re-attach since cards are re-rendered
        });
    }

    // VIP OFFER TRIGGER - Show after 5 seconds
    const forceVip = window.location.search.includes('testvip=1');
    if (leadModal && (!sessionStorage.getItem('girlee_vip_seen') || forceVip)) {
        setTimeout(() => {
            leadModal.classList.add('active');
            sessionStorage.setItem('girlee_vip_seen', 'true');
        }, 5000);
    }

});
