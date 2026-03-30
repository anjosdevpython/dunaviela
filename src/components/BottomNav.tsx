import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, Info, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { useCart } from "../context/CartContext";

export default function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/loja", icon: ShoppingBag, label: "Loja" },
    { path: "/carrinho", icon: ShoppingCart, label: "Carrinho", badge: itemCount },
    { path: "/como-comprar", icon: HelpCircle, label: "Como" },
    { path: "/sobrenos", icon: Info, label: "Sobre" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 px-4 py-3 flex justify-between items-center rounded-t-[32px]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 transition-all duration-300",
              isActive ? "text-duna-peach scale-110" : "text-duna-cream/50"
            )}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border border-duna-brown">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
