import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle } from "lucide-react";
import React from "react";

export default function HowToBuy() {
  return (
    <div className="min-h-screen bg-duna-brown relative noise-overlay">
      <div className="fixed inset-0 overlay-gradient -z-10"></div>
      
      <Link to="/" className="fixed top-8 left-6 md:left-12 z-50 flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group text-duna-cream">
        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        <span>Voltar</span>
      </Link>

      <main className="container mx-auto max-w-4xl px-4 md:px-6 pt-28 pb-20 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter lowercase text-duna-cream font-serif">como comprar</h1>
          <div className="w-20 h-1 bg-linear-to-r from-duna-peach to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-light italic opacity-80">Do seu desejo à minha agulha.</p>
        </header>

        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif italic text-duna-cream">Passo a passo</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Step number="1" title="Referência Visual" description="Me envie uma referência visual, pode ser uma foto, um desenho ou uma inspiração." />
            <Step number="2" title="Suas Medidas" description="Compartilhe suas medidas, assim consigo adaptar a criação ao seu corpo." />
            <Step number="3" title="Sua Intenção" description="Como quer se sentir usando ela? Que história quer contar?" />
          </div>
        </section>

        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[40px]"
          >
            <h2 className="text-3xl font-bold mb-6 text-center font-serif italic">Tabela de Medidas</h2>
            <p className="text-center mb-6 italic text-duna-peach"> – CROCHÊ (MEDIDAS DO CORPO) – </p>
            
            <p className="mb-8 text-center font-light opacity-90 text-sm">As peças em crochê possuem leve elasticidade e se adaptam ao corpo.</p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-duna-peach">
                    <th className="p-4 text-center">TAMANHO</th>
                    <th className="p-4 text-center">BUSTO (cm)</th>
                    <th className="p-4 text-center">CINTURA (cm)</th>
                    <th className="p-4 text-center">CINTURA BAIXA (cm)</th>
                    <th className="p-4 text-center">QUADRIL (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-center font-light opacity-80">
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">P (38)</td>
                    <td className="p-4">88 – 90</td>
                    <td className="p-4">68 – 70</td>
                    <td className="p-4">88 – 90</td>
                    <td className="p-4">98 – 100</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">M (40)</td>
                    <td className="p-4">92 – 94</td>
                    <td className="p-4">72 – 74</td>
                    <td className="p-4">92 – 94</td>
                    <td className="p-4">102 – 104</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold">G (42)</td>
                    <td className="p-4">96 – 98</td>
                    <td className="p-4">76 – 78</td>
                    <td className="p-4">96 – 98</td>
                    <td className="p-4">106 – 108</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-sm font-light opacity-80 space-y-4 max-w-2xl mx-auto text-center">
              <p>As medidas acima correspondem às medidas do corpo. Compare com as suas para encontrar o tamanho ideal.</p>
              <div className="mt-6 p-4 bg-duna-peach/5 rounded-2xl border border-duna-peach/10 grid grid-cols-2 gap-4">
                <p><strong>Cintura:</strong> abaixo do busto</p>
                <p><strong>Cintura baixa:</strong> região dos flancos</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Processo Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-20 text-duna-cream">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[40px] flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-6 font-serif italic">O ponto de partida</h2>
            <h3 className="text-xl font-semibold mb-4 italic text-duna-peach">O primeiro ponto começa com você</h3>
            <p className="text-lg font-light leading-relaxed mb-4 opacity-90">Para começar, peço 30% adiantado. Esse valor cobre os materiais e dá início ao seu processo.</p>
            <p className="text-lg font-light leading-relaxed opacity-90">A criação começa assim: com confiança e intenção.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[40px] flex flex-col"
          >
            <h2 className="text-3xl font-bold mb-6 font-serif italic">Prazo e processo</h2>
            <h3 className="text-xl font-semibold mb-4 italic text-duna-peach">Tempo que vira toque</h3>
            <p className="text-lg font-light leading-relaxed mb-6 opacity-90">O prazo de confecção depende da complexidade da peça apenas.</p>
            <div className="mt-auto p-4 border border-duna-peach/20 bg-duna-peach/5 rounded-2xl italic font-light text-sm">
              Porque crochê é paciência: aqui, o tempo é parte da obra.
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a 
            href="https://wa.me/554196683263" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-duna-brown px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:shadow-[#25D366]/20"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Falar com a Duda</span>
          </a>
        </motion.div>
      </main>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-8 rounded-[32px] text-center border-white/5 hover:border-duna-peach/30 transition-all duration-500 group text-duna-cream"
    >
      <div className="w-16 h-16 mx-auto rounded-full border border-duna-peach flex items-center justify-center mb-6 group-hover:bg-duna-peach group-hover:text-duna-brown transition-all">
        <span className="text-xl font-bold">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3 italic font-serif">{title}</h3>
      <p className="opacity-70 font-light text-sm">{description}</p>
    </motion.div>
  );
}
