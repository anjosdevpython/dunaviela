import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, Scissors } from "lucide-react";
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-duna-brown relative noise-overlay">
      <div className="fixed inset-0 overlay-gradient -z-10"></div>
      
      <Link to="/" className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group text-duna-cream">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      <main className="container mx-auto max-w-4xl px-4 md:px-6 pt-28 pb-20 relative z-10">
        <header className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-4 rounded-full border border-white/10 mb-8 glass-card"
          >
            <img src="/produtos/logoduna.png" alt="Dunaviela Logo" className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter lowercase text-duna-cream font-serif">sobre nós</h1>
          <div className="w-20 h-1 bg-linear-to-r from-duna-peach to-transparent mx-auto mb-8"></div>
          <p className="text-lg md:text-2xl font-light italic opacity-80">conheça a essência da dunaviela.</p>
        </header>

        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-[40px]"
          >
            <div className="flex items-center gap-4 mb-8">
              <Scissors className="w-8 h-8 text-duna-peach" />
              <h2 className="text-4xl md:text-5xl font-bold italic font-serif">Costura de rua!</h2>
            </div>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed font-light text-duna-cream/90">
              <p>A Dunaviela não nasceu em grandes ateliês ou lojas sofisticadas.</p>
              <p>Ela surgiu da vontade de transformar em fios aquilo que me atravessa, da necessidade de criar algo que fosse mais que uma peça, fosse uma história.</p>
              <p>Com um olhar atento ao mundo e à essência do feito à mão, cada peça é pensada, planejada e executada com total cuidado.</p>
              <p>Aqui, cada ponto é mais do que técnica: é a expressão de uma ideia, de um sentimento. E por trás de cada criação, há uma artesã que entende o poder de conectar história, design e tempo.</p>
            </div>
          </motion.div>
        </section>

        <footer className="text-center pb-20">
          <div className="glass-card p-12 rounded-[50px]">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-light italic mb-4 font-serif text-duna-cream">Dunaviela é resistência que se veste.</h2>
              <p className="text-xl opacity-80 font-light leading-relaxed text-duna-cream">Cada ponto tem intenção, cada peça tem história.<br />Se você valoriza o feito à mão, com alma e presença, esse é o seu lugar.</p>
            </div>
            <div className="pt-12 border-t border-white/10">
              <h3 className="text-2xl font-semibold mb-4 italic font-serif text-duna-cream">Obrigada por chegar até aqui.</h3>
              <p className="text-lg opacity-80 mb-10 font-light text-duna-cream">Tô por aqui, com linha, café e coração.</p>
              <div className="flex flex-col items-center">
                <p className="text-sm uppercase tracking-widest opacity-60 mb-2 text-duna-cream">Com carinho,</p>
                <p className="text-4xl font-bold italic text-duna-peach font-serif">Eduarda Teles.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
