import React, { useState, useRef } from "react";
import { X, Upload, Camera, Download, Share2, RefreshCw, CheckCircle2 } from "lucide-react";
import { motion, useDragControls } from "motion/react";

interface VirtualTryOnProps {
  productImage: string;
  productTitle: string;
  onClose: () => void;
}

export default function VirtualTryOn({ productImage, productTitle, onClose }: VirtualTryOnProps) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [resultSaved, setResultSaved] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  
  // Framer motion values to avoid re-renders during drag
  const xOffset = useRef(0);
  const yOffset = useRef(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, envie apenas arquivos de imagem.');
        return;
      }
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setUserImage(event.target?.result as string);
          setIsProcessing(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!userImage || !containerRef.current) return;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new window.Image();
    const fgImg = new window.Image();
    
    bgImg.src = userImage;
    fgImg.src = productImage;

    await Promise.all([
      new Promise((resolve) => { bgImg.onload = resolve }),
      new Promise((resolve) => { fgImg.onload = resolve })
    ]);

    const rect = containerRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const bgRatio = bgImg.width / bgImg.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

    if (bgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = bgImg.width * (canvas.height / bgImg.height);
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = bgImg.height * (canvas.width / bgImg.width);
      offsetY = (canvas.height - drawHeight) / 2;
    }
    
    ctx.drawImage(bgImg, offsetX, offsetY, drawWidth, drawHeight);

    const rawFgRatio = fgImg.width / fgImg.height;
    const baseFgWidth = 200 * scale; 
    const baseFgHeight = baseFgWidth / rawFgRatio;
    
    ctx.save();
    ctx.translate(canvas.width / 2 + position.x, canvas.height / 2 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(fgImg, -baseFgWidth / 2, -baseFgHeight / 2, baseFgWidth, baseFgHeight);
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Provador_Virtual_${productTitle.replace(/\s+/g, "_")}.jpg`;
    a.click();
    
    setResultSaved(true);
    setTimeout(() => setResultSaved(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Olha como esse produto fica em mim!`,
          text: `Experimentei ${productTitle} no Provador Virtual do Dunaviela Ateliê ✨`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      alert("Seu navegador não suporta compartilhamento nativo no momento.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col md:flex-row backdrop-blur-3xl animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] p-3 text-white/50 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="w-full md:w-2/3 lg:w-3/4 h-[60vh] md:h-full relative flex items-center justify-center p-4">
        {!userImage ? (
          <div className="flex flex-col items-center justify-center w-full max-w-md gap-6 pt-10">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-serif text-duna-peach mb-2">Provador Virtual</h2>
              <p className="text-duna-cream/70 font-light px-6">
                Descubra como nossa peça autoral de crochê veste em você antes de comprar.
              </p>
            </div>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-4 bg-duna-peach text-duna-brown h-16 rounded-[24px] font-bold uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2"><RefreshCw className="w-5 h-5 animate-spin" /> Analisando...</span>
              ) : (
                <span className="flex items-center gap-2"><Upload className="w-5 h-5" /> Enviar Minha Foto</span>
              )}
            </button>
            <div className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest">
              <Camera className="w-4 h-4" /> <span>Suas fotos não são armazenadas em nossos servidores.</span>
            </div>
          </div>
        ) : (
          <div 
            ref={containerRef}
            className="w-full h-full max-h-[85vh] md:max-h-full max-w-2xl mx-auto md:rounded-3xl overflow-hidden relative shadow-2xl bg-zinc-900 border border-white/5"
          >
            <img 
              src={userImage} 
              alt="User" 
              className="w-full h-full object-cover pointer-events-none opacity-90"
            />
            
            <motion.img
              drag
              dragControls={dragControls}
              dragConstraints={containerRef}
              dragElastic={0.2}
              dragMomentum={false}
              onDrag={(event, info) => {
                 xOffset.current += info.delta.x;
                 yOffset.current += info.delta.y;
              }}
              onDragEnd={() => {
                 setPosition({ x: xOffset.current, y: yOffset.current });
              }}
              style={{
                x: 0,
                y: 0,
                scale,
                rotate: rotation,
                cursor: "grab",
                filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))"
              }}
              whileDrag={{ cursor: "grabbing", scale: scale * 1.05 }}
              src={productImage}
              alt="Product Mask"
              className="absolute top-1/2 left-1/2 -ml-[100px] -mt-[100px] w-[200px] object-contain select-none mix-blend-normal"
            />
            
            <div className="absolute inset-x-0 top-10 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-1000 delay-500 fill-mode-both" style={{ animationDelay: '2s', animationIterationCount: 1 }}>
              <span className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full text-white/90 text-sm tracking-wide border border-white/10 font-bold">
                Arraste a peça para posicionar
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4 h-[40vh] md:h-full bg-zinc-900/50 border-t md:border-t-0 md:border-l border-white/10 p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl">
        <div className="space-y-8">
          <div>
            <h3 className="text-white font-serif text-xl mb-1">Ajuste no Corpo</h3>
            <p className="text-white/40 text-xs mb-6 uppercase tracking-widest">Customização Híbrida em Tempo Real</p>
          </div>

          <div className="space-y-6 opacity-60 hover:opacity-100 transition-opacity">
            <div className="space-y-3">
              <label className="text-white/80 text-xs font-bold uppercase tracking-widest flex justify-between">
                <span>Tamanho (Zoom)</span>
                <span className="text-duna-peach">{(scale * 100).toFixed(0)}%</span>
              </label>
              <input 
                type="range" 
                min="0.5" max="3" step="0.05" 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-duna-peach h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                disabled={!userImage}
              />
            </div>

            <div className="space-y-3">
              <label className="text-white/80 text-xs font-bold uppercase tracking-widest flex justify-between">
                <span>Rotação</span>
                <span className="text-duna-peach">{rotation}°</span>
              </label>
              <input 
                type="range" 
                min="-180" max="180" step="1" 
                value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full accent-duna-peach h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                disabled={!userImage}
              />
            </div>
            
            <div className="pt-2 flex justify-between">
              <button 
                onClick={() => { setScale(1); setRotation(0); setPosition({x:0, y:0}); xOffset.current=0; yOffset.current=0; }}
                disabled={!userImage}
                className="text-xs text-white/50 hover:text-white underline underline-offset-4 disabled:opacity-20"
              >
                Resetar Ajustes
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-8">
          <button 
            onClick={handleDownload}
            disabled={!userImage}
            className={`w-full h-14 rounded-2xl font-bold tracking-widest text-xs uppercase transition-all flex items-center justify-center gap-3 ${
              resultSaved 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-30'
            }`}
          >
            {resultSaved ? (
              <><CheckCircle2 className="w-5 h-5" /> Salvo no seu celular</>
            ) : (
              <><Download className="w-5 h-5" /> Baixar o Look</>
            )}
          </button>

          <button 
            onClick={handleShare}
            disabled={!userImage}
            className="w-full h-14 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold tracking-widest text-xs uppercase transition-all disabled:opacity-30 disabled:border-transparent flex items-center justify-center gap-3"
          >
            <Share2 className="w-5 h-5" /> Compartilhar
          </button>
          
          {userImage && (
             <button 
               onClick={() => { setUserImage(null); setPosition({x:0, y:0}); xOffset.current=0; yOffset.current=0; }}
               className="w-full mt-4 text-[10px] uppercase text-white/30 hover:text-white/70"
             >
               Trocar Foto
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
