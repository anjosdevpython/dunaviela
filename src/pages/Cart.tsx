import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, ArrowRight, Wallet } from "lucide-react";
import { useCart } from "../context/CartContext";
import PixModal from "../components/PixModal";

export default function Cart() {
  const [isPixOpen, setIsPixOpen] = useState(false);
  const { cart, removeFromCart, total, clearCart } = useCart();

  const handleCheckout = () => {
    let message = `*Nova Encomenda - Dunaviela*\n\n`;
    message += `------------------------------\n`;
    cart.forEach(item => {
      message += `• ${item.title} - ${item.price}\n`;
    });
    message += `------------------------------\n`;
    message += `*Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*\n`;
    message += `\nOlá Duda! Gostaria de finalizar esse pedido.`;

    const url = `https://wa.me/554196683263?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    clearCart();
  };

  return (
    <div className="min-h-screen bg-duna-brown relative noise-overlay">
      <div className="fixed inset-0 overlay-gradient -z-10"></div>
      
      <Link to="/loja" className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group text-duna-cream">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      <main className="container mx-auto max-w-4xl px-4 pt-28 pb-20 relative z-10">
        <h1 className="text-5xl font-bold mb-12 text-duna-peach text-center italic font-serif">Seu Carrinho</h1>

        <div className="space-y-4 mb-12">
          {cart.length === 0 ? (
            <div className="glass-card p-12 rounded-[32px] text-center">
              <p className="opacity-50 text-xl font-light">Seu carrinho está vazio.</p>
              <Link to="/loja" className="inline-block mt-6 text-duna-peach border-b border-duna-peach pb-1">Ir para a Loja</Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <motion.div 
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-4 rounded-3xl flex items-center gap-4"
              >
                <div className="w-20 h-20 rounded-2xl bg-black/20 overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="grow">
                  <h3 className="font-bold text-duna-peach font-serif">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="p-3 hover:bg-white/10 rounded-full transition-colors text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[32px]"
          >
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-white/10">
              <span className="text-xl font-light">Total</span>
              <span className="text-4xl font-bold text-duna-peach">
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setIsPixOpen(true)}
                className="w-full h-16 bg-white/5 border border-white/10 text-duna-cream font-bold text-lg rounded-2xl hover:bg-white/10 shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest transition-all"
              >
                <Wallet className="w-5 h-5 text-duna-peach" />
                <span>Pagar com PIX</span>
              </button>

              <button 
                onClick={handleCheckout}
                className="w-full h-16 bg-[#25D366] text-duna-brown font-bold text-lg rounded-2xl hover:brightness-110 shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest transition-all"
              >
                <span>Finalizar no WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </main>

      <PixModal 
        isOpen={isPixOpen} 
        onClose={() => setIsPixOpen(false)} 
        initialValue={total}
      />
    </div>
  );
}
