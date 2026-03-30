import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

export default function Shop() {
  const { itemCount } = useCart();
  const { productsList } = useProducts();
  const activeProducts = productsList.filter(p => p.isAvailable);

  return (
    <div className="min-h-screen bg-duna-brown relative noise-overlay">
      <div className="fixed inset-0 overlay-gradient -z-10"></div>
      
      {/* Botão Voltar */}
      <Link to="/" className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group text-duna-cream">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      {/* Floating Cart Button */}
      <Link to="/carrinho" className="fixed top-8 right-6 md:right-12 z-50 p-4 bg-duna-peach text-duna-brown rounded-full shadow-2xl hover:scale-110 transition-transform group">
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-duna-brown">
            {itemCount}
          </span>
        )}
      </Link>

      <main className="container mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter lowercase text-duna-cream font-serif"
          >
            Catálogo
          </motion.h1>
          <div className="w-20 h-1 bg-gradient-to-r from-duna-peach to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-light italic opacity-80">Peças únicas, feitas à mão.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activeProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/produto/${product.id}`} className="block h-full">
                <div className="glass-card rounded-[32px] overflow-hidden group h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-duna-peach/40">
                  <div className="aspect-[4/5] w-full overflow-hidden relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="inline-block px-3 py-1 bg-duna-peach text-duna-brown text-xs font-bold uppercase tracking-widest rounded-full">
                        {product.isFeatured ? 'Destaque' : 'Disponível'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-duna-peach font-serif">{product.title}</h3>
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-light">{product.price}</span>
                      <span className="w-10 h-10 rounded-full border border-duna-peach/30 flex items-center justify-center group-hover:bg-duna-peach group-hover:text-duna-brown transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <footer className="text-center mt-20 pt-10 border-t border-white/5">
          <div className="text-xs opacity-40 uppercase tracking-[0.3em] flex flex-col items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Dunaviela Ateliê</span>
            <a href="https://allananjos.dev.br/" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              By Allan Anjos
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
