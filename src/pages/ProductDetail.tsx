import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, MessageCircle, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import VirtualTryOn from "../components/VirtualTryOn";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { productsList } = useProducts();
  const product = productsList.find(p => p.id === id);
  const [mainImage, setMainImage] = useState("");
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
    } else {
      navigate("/loja");
    }
  }, [product, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-duna-brown relative noise-overlay">
      <div className="fixed inset-0 overlay-gradient -z-10"></div>
      
      <Link to="/loja" className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group text-duna-cream">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      <main className="container mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-[48px] p-6 md:p-12 max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-[3/4] w-full rounded-3xl overflow-hidden bg-black/20 relative">
                <motion.img 
                  key={mainImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={mainImage} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((src, idx) => (
                  <img 
                    key={idx}
                    src={src} 
                    alt={`${product.title} thumb ${idx}`}
                    onClick={() => setMainImage(src)}
                    className={`w-20 h-20 rounded-xl object-cover cursor-pointer transition-all border-2 ${mainImage === src ? 'border-duna-peach opacity-100' : 'border-transparent opacity-60 hover:opacity-80'}`}
                  />
                ))}
              </div>
            </div>

            {/* Informações do Produto */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold italic mb-2 text-duna-peach font-serif">{product.title}</h1>
              <div className="w-20 h-1 bg-duna-peach mb-8"></div>

              <div className="mb-8">
                <span className="text-3xl font-light tracking-wide">{product.price}</span>
              </div>

              <div className="space-y-6 text-lg leading-relaxed font-light opacity-90 mb-10">
                <p>{product.description}</p>
                {product.detailedPrices && (
                  <div className="bg-black/10 p-6 rounded-2xl space-y-2 text-sm md:text-base">
                    {product.detailedPrices.map((line, idx) => (
                      <p key={idx} className={line.startsWith('*') ? 'text-duna-peach italic' : ''}>
                        {line.startsWith('Peças separadas:') ? <strong>{line}</strong> : line}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-center gap-2 mb-6 opacity-70">
                  <Palette className="w-4 h-4 text-duna-peach" />
                  <span className="text-xs uppercase tracking-widest">Encomendas em qualquer cor</span>
                </div>
                
                <button 
                  onClick={() => setIsTryOnOpen(true)}
                  className="w-full h-14 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white rounded-full font-bold uppercase tracking-widest hover:brightness-125 transition-all flex items-center justify-center gap-3 mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">Provador Virtual ✨</span>
                </button>

                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="group flex-1 h-14 bg-white/5 border border-white/10 text-duna-cream rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>No Carrinho</span>
                  </button>
                  
                  <a 
                    href={`https://wa.me/554196683263?text=${encodeURIComponent(product.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex-1 h-14 bg-duna-peach text-duna-brown rounded-full font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <span>Encomendar</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {isTryOnOpen && (
        <VirtualTryOn 
          productImage={mainImage} 
          productTitle={product.title} 
          onClose={() => setIsTryOnOpen(false)} 
        />
      )}
    </div>
  );
}
