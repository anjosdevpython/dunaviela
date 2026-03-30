import { useState, useEffect } from "react";
import { X, Wallet, QrCode, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import QRCode from "qrcode";

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: number;
}

export default function PixModal({ isOpen, onClose, initialValue }: PixModalProps) {
  const [pixValue, setPixValue] = useState("");
  const [pixPayload, setPixPayload] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const formatCurrency = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const number = parseInt(digits, 10) / 100;
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  };

  const getRawAmount = (formattedValue: string) => {
    return formattedValue.replace(/[^\d,]/g, "").replace(",", ".");
  };

  const crc16 = (data: string) => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
  };

  const generatePixPayload = (data: { key: string; name: string; city: string; amount: string }) => {
    const { key, name, city, amount } = data;
    const pad = (id: string, value: string) => id + value.length.toString().padStart(2, "0") + value;

    const gui = "0014br.gov.bcb.pix";
    const keyField = pad("01", key);
    const merchantAccountInfo = pad("26", gui + keyField);

    let payload = "000201";
    payload += merchantAccountInfo;
    payload += "52040000";
    payload += "5303986"; // BRL

    if (amount && parseFloat(amount) > 0) {
      payload += pad("54", amount);
    }

    payload += "5802BR";
    payload += pad("59", name.substring(0, 25));
    payload += pad("60", city.substring(0, 15));
    payload += "62070503***";
    payload += "6304"; // CRC16 indicator

    return payload + crc16(payload);
  };

  const handleGeneratePix = async () => {
    const raw = getRawAmount(pixValue);
    if (!raw || parseFloat(raw) <= 0) return;

    const data = {
      key: "4b1a87dc-f47b-4df8-9a83-565e92a475c4",
      name: "DUNAVIELA",
      city: "CURITIBA",
      amount: raw,
    };

    const payload = generatePixPayload(data);
    setPixPayload(payload);

    try {
      const url = await QRCode.toDataURL(payload, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCodeDataUrl(url);
      setShowQR(true);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    if (!pixPayload) return;
    navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (!isOpen) {
      setPixValue("");
      setPixPayload("");
      setQrCodeDataUrl("");
      setShowQR(false);
    } else if (initialValue !== undefined) {
      setPixValue(formatCurrency((initialValue * 100).toFixed(0)));
    }
  }, [isOpen, initialValue]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg glass-card rounded-[40px] p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-duna-cream transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-duna-peach/10 mb-4 border border-duna-peach/20">
                <Wallet className="w-8 h-8 text-duna-peach" />
              </div>
              <h3 className="text-2xl font-bold text-duna-cream font-serif">Pagamento via PIX</h3>
              <p className="text-duna-cream/60 text-sm mt-2 font-light">Gere o código QR para pagamento instantâneo</p>
            </div>

            {!showQR ? (
              <div className="space-y-6">
                <div className="group relative">
                  <input
                    type="text"
                    value={pixValue}
                    onChange={(e) => setPixValue(formatCurrency(e.target.value))}
                    placeholder="R$ 0,00"
                    className="w-full bg-black/40 border border-white/10 rounded-3xl py-8 px-6 text-duna-cream placeholder-white/10 focus:outline-none focus:border-duna-peach/40 focus:ring-4 focus:ring-duna-peach/5 transition-all text-center text-4xl font-bold tracking-tight"
                  />
                </div>

                <button
                  onClick={handleGeneratePix}
                  disabled={!pixValue || pixValue === "R$ 0,00"}
                  className="w-full h-16 bg-duna-peach text-duna-brown font-bold rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale disabled:pointer-events-none shadow-xl uppercase tracking-widest"
                >
                  <QrCode className="w-5 h-5" />
                  GERAR QR CODE
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-8 pt-4"
              >
                <div className="p-6 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative group">
                  <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10"></div>
                  <img src={qrCodeDataUrl} alt="PIX QR Code" className="w-[180px] h-[180px]" />
                </div>

                <div className="w-full space-y-4">
                  <div className="text-center">
                    <p className="text-duna-cream/40 text-[10px] font-medium uppercase tracking-widest">
                      Código Pix Copia e Cola
                    </p>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className={`w-full group h-14 rounded-xl px-5 flex items-center justify-between transition-all duration-300 border ${
                      copied
                        ? "bg-green-500/10 border-green-500/40 text-green-400"
                        : "bg-white/5 border-white/10 text-duna-cream hover:bg-white/10"
                    }`}
                  >
                    <span className="truncate text-xs font-mono opacity-40 max-w-[200px]">
                      {pixPayload}
                    </span>
                    <div className="flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest shrink-0">
                      <span>{copied ? "Copiado" : "Copiar"}</span>
                      {copied ? <Check className="w-4 h-4" /> : <Check className="w-4 h-4 opacity-0" />}
                      {!copied && <Copy className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => setShowQR(false)}
                    className="w-full text-xs text-duna-peach/60 hover:text-duna-peach transition-colors uppercase tracking-widest font-bold pt-2"
                  >
                    Alterar Valor
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
