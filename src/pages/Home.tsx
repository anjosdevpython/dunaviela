import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ShoppingBag, Instagram, MessageCircle, MapPin, BookOpen, HelpCircle, ArrowRight, Wallet, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import PixModal from "../components/PixModal";
import QRCode from "qrcode";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [isPixOpen, setIsPixOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shareQR, setShareQR] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Bom dia");
    else if (hour >= 12 && hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");

    QRCode.toDataURL(window.location.href, { width: 300, margin: 2 }).then(setShareQR).catch(console.error);
  }, []);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Dunaviela
ORG:Dunaviela - Artesanato Autoral
TEL;TYPE=CELL,VOICE:+5541996683263
URL:https://www.instagram.com/dunaviela
NOTE:Costuramos história antes de costurar moda.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dunaviela.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex items-center justify-center py-8 md:py-16 px-4 md:px-8 noise-overlay">
      <div className="absolute inset-0 overlay-gradient -z-10"></div>
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl glass-card rounded-[48px] md:rounded-[64px] p-6 md:p-12 lg:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10"
      >
        {/* Coluna Esquerda: Branding */}
        <section className="flex flex-col items-center lg:w-1/2 text-center">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative mb-10 w-40 h-40 md:w-44 md:h-44 cursor-pointer group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-duna-peach/20 rounded-full blur-2xl group-hover:bg-duna-peach/30 transition-all duration-500"></div>
            
            <motion.div 
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 260, damping: 20 }}
              className="w-full h-full relative preserve-3d"
            >
              {/* Front: Logo */}
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden border border-white/10 p-1 shadow-2xl bg-duna-brown backface-hidden">
                <img src="/produtos/logoduna.png" alt="Dunaviela Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              
              {/* Back: Share QR Code */}
              <div className="absolute inset-0 w-full h-full rounded-full bg-white flex items-center justify-center rotate-y-180 backface-hidden p-6 shadow-2xl">
                {shareQR && <img src={shareQR} alt="Share QR" className="w-full h-full object-contain" />}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-duna-peach text-xs font-bold tracking-[0.4em] uppercase"
            >
              {greeting}
            </motion.p>
            <h1 className="text-duna-cream text-6xl md:text-8xl font-bold tracking-tight font-serif lowercase">Dunaviela</h1>
            <div className="w-20 h-1 bg-linear-to-r from-duna-peach to-transparent mx-auto"></div>
            <p className="text-duna-cream text-xl md:text-2xl font-light italic leading-tight font-serif">
              "Costuramos história antes de costurar moda"
            </p>

            <div className="pt-8 space-y-6">
              <p className="text-duna-cream/80 text-base md:text-lg font-light leading-relaxed max-w-sm hidden md:block mx-auto">
                O crochê autoral que veste a alma urbana. Criatividade em cada ponto, conexão em cada peça.
              </p>
              <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/5 border border-white/10">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-duna-peach text-[10px] font-bold tracking-[0.3em] uppercase">Ateliê Aberto</span>
              </div>
            </div>
          </div>
        </section>

        {/* Coluna Direita: Interatividade */}
        <section className="flex flex-col gap-8 lg:w-1/2 w-full justify-center">
          <div className="grid grid-cols-2 gap-4 w-full">
            <LinkCard to="https://wa.me/554196683263" icon={<MessageCircle className="w-8 h-8 text-[#25D366]" />} label="WhatsApp" external />
            <LinkCard to="https://www.instagram.com/dunaviela" icon={<Instagram className="w-8 h-8 text-duna-peach" />} label="Instagram" external />
            <LinkCard to="https://maps.app.goo.gl/WfLCZaGWhP9MYHEeA" icon={<MapPin className="w-8 h-8 text-duna-cream" />} label="Local" external />
            <LinkCard to="/loja" icon={<ShoppingBag className="w-8 h-8 text-duna-peach" />} label="Loja" />
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setIsPixOpen(true)}
              className="group w-full h-20 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-between px-8 transition-all hover:bg-white/10 hover:border-duna-peach/40 active:scale-95 overflow-hidden relative"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-duna-peach/10 rounded-2xl group-hover:bg-duna-peach/20 transition-colors text-duna-peach">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-duna-cream font-bold text-sm tracking-widest uppercase">Pagamento PIX</span>
              </div>
              <ArrowRight className="w-5 h-5 text-duna-cream/30 group-hover:translate-x-1 group-hover:text-duna-peach transition-all" />
            </button>

            <button 
              onClick={downloadVCard}
              className="group w-full h-20 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-between px-8 transition-all hover:bg-white/10 hover:border-duna-peach/40 active:scale-95 overflow-hidden relative"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-duna-peach/10 rounded-2xl group-hover:bg-duna-peach/20 transition-colors text-duna-peach">
                  <UserCircle2 className="w-5 h-5" />
                </div>
                <span className="text-duna-cream font-bold text-sm tracking-widest uppercase">Salvar Contato</span>
              </div>
              <ArrowRight className="w-5 h-5 text-duna-cream/30 group-hover:translate-x-1 group-hover:text-duna-peach transition-all" />
            </button>

            <BigLink to="/sobrenos" icon={<BookOpen className="w-5 h-5 text-duna-peach" />} label="Sobre Nós" />
            <BigLink to="/como-comprar" icon={<HelpCircle className="w-5 h-5 text-duna-peach" />} label="Como Comprar" />
          </div>

          <footer className="mt-6 pt-10 border-t border-white/5">
            <div className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity text-duna-cream">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Dunaviela © 2026</span>
              <span className="text-[9px] uppercase tracking-[0.2em]">Curitiba/PR</span>
              <a href="https://allananjos.dev.br/" target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.2em] border-b border-transparent hover:border-duna-cream/40 transition-all pb-1 mt-2">
                By Allan Anjos
              </a>
            </div>
          </footer>
        </section>
      </motion.main>
      
      <PixModal isOpen={isPixOpen} onClose={() => setIsPixOpen(false)} />
    </div>
  );
}

function LinkCard({ to, icon, label, external = false }: { to: string, icon: React.ReactNode, label: string, external?: boolean }) {
  const Component = external ? 'a' : Link;
  const props = external ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };

  return (
    <Component {...(props as any)} className="group relative flex flex-col items-center justify-center p-6 rounded-[32px] border border-white/5 bg-white/3 transition-all duration-500 hover:bg-white/8 hover:border-duna-peach/30 text-duna-cream">
      <div className="mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
        {icon}
      </div>
      <span className="text-[11px] text-duna-cream/70 font-semibold tracking-widest uppercase group-hover:text-duna-cream transition-colors">
        {label}
      </span>
    </Component>
  );
}

function BigLink({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <Link to={to} className="group w-full h-20 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-between px-8 transition-all hover:bg-white/10 hover:border-duna-peach/40 active:scale-95 overflow-hidden relative">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-duna-peach/10 rounded-2xl group-hover:bg-duna-peach/20 transition-colors">
          {icon}
        </div>
        <span className="text-duna-cream font-bold text-sm tracking-widest uppercase">{label}</span>
      </div>
      <ArrowRight className="w-5 h-5 text-duna-cream/30 group-hover:translate-x-1 group-hover:text-duna-peach transition-all" />
    </Link>
  );
}

