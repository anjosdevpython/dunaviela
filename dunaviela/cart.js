const Cart = {
    key: 'dunaviela_cart',

    get() {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    },

    add(product) {
        const cart = this.get();
        // Check if item exists to increment qty or add new?
        // For simplicity, we'll just push. Or grouping?
        // Let's group by ID+Size if applicable, but for now just ID.
        // The user requirements are simple.
        
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price, // string "R$ 200,00"
            rawPrice: product.rawPrice, // number 200.00
            image: product.image
        });
        
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateUI();
        this.showToast('Produto adicionado ao carrinho!');
    },

    remove(index) {
        const cart = this.get();
        cart.splice(index, 1);
        localStorage.setItem(this.key, JSON.stringify(cart));
        this.updateUI();
    },

    clear() {
        localStorage.removeItem(this.key);
        this.updateUI();
    },

    total() {
        const cart = this.get();
        return cart.reduce((acc, item) => acc + item.rawPrice, 0);
    },

    updateUI() {
        const cart = this.get();
        const count = cart.length;
        
        // Update badge if it exists
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }

        // Update Cart Page if we are on it
        if (window.location.pathname.includes('carrinho.html')) {
            renderCartPage(); // Defined in carrinho.html
        }
    },

    showToast(msg) {
        // Simple toast implementation
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-slide-up flex items-center gap-2 font-bold uppercase tracking-widest text-xs';
        toast.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i> ${msg}`;
        document.body.appendChild(toast);
        lucide.createIcons();
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    Cart.updateUI();
});
