import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from "lucide-react";
import { Product } from "../data/products";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { productsList, addProduct, updateProduct, deleteProduct } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    rawPrice: 0,
    description: "",
    images: "",
    whatsappMessage: "",
    isAvailable: true,
    isFeatured: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "duna2026") {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta");
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      price: "",
      rawPrice: 0,
      description: "",
      images: "",
      whatsappMessage: "",
      isAvailable: true,
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      rawPrice: product.rawPrice,
      description: product.description,
      images: product.images.join(", "),
      whatsappMessage: product.whatsappMessage,
      isAvailable: product.isAvailable ?? true,
      isFeatured: product.isFeatured ?? false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert comma-separated images to array
    const imagesArray = formData.images
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img.length > 0);
      
    if (imagesArray.length === 0) {
      imagesArray.push("/produtos/placeholder.jpg"); // Fallback
    }

    const submitData = {
      title: formData.title,
      price: formData.price,
      rawPrice: Number(formData.rawPrice),
      description: formData.description,
      images: imagesArray,
      whatsappMessage: formData.whatsappMessage,
      isAvailable: formData.isAvailable,
      isFeatured: formData.isFeatured,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, submitData);
    } else {
      addProduct(submitData);
    }
    
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-duna-brown flex items-center justify-center p-4 noise-overlay">
        <form onSubmit={handleLogin} className="glass-card p-8 rounded-3xl w-full max-w-sm flex flex-col gap-4 text-duna-cream">
          <h2 className="text-2xl font-serif text-duna-peach text-center">Administração</h2>
          <input 
            type="password" 
            placeholder="Senha de acesso" 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-duna-peach transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-duna-peach text-duna-brown font-bold py-3 rounded-xl mt-2 hover:bg-duna-peach/90 transition-colors">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-duna-brown text-duna-cream p-4 md:p-8 pt-24 noise-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-duna-peach">Gestão de Produtos</h1>
            <p className="text-sm opacity-70">Gerencie o seu catálogo do Dunaviela Ateliê</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center gap-2 bg-duna-peach text-duna-brown px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-xs tracking-widest uppercase opacity-70 font-semibold">Produto</th>
                  <th className="p-4 text-xs tracking-widest uppercase opacity-70 font-semibold">Preço</th>
                  <th className="p-4 text-xs tracking-widest uppercase opacity-70 font-semibold">Status</th>
                  <th className="p-4 text-xs tracking-widest uppercase opacity-70 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 m-3 opacity-30" />
                          )}
                        </div>
                        <div className="font-medium text-duna-peach">{product.title}</div>
                      </div>
                    </td>
                    <td className="p-4">{product.price} <span className="text-xs opacity-50 block">Num: {product.rawPrice}</span></td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {product.isAvailable ? (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">Ativo</span>
                        ) : (
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md">Oculto</span>
                        )}
                        {product.isFeatured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-md">Destaque</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm("Certeza que deseja deletar este produto?")) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {productsList.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center opacity-50">Nenhum produto cadastrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 pt-10 overflow-y-auto">
          <div className="bg-duna-brown w-full max-w-2xl rounded-3xl border border-white/10 my-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-serif text-duna-peach">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm opacity-70 mb-1">Título</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm opacity-70 mb-1">Preço Display (ex: R$ 200,00)</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm opacity-70 mb-1">Preço Numérico (ex: 200)</label>
                  <input required type="number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors"
                    value={formData.rawPrice} onChange={e => setFormData({...formData, rawPrice: Number(e.target.value)})} 
                  />
                </div>
                <div>
                  <label className="block text-sm opacity-70 mb-1">Mensagem WhatsApp</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors"
                    value={formData.whatsappMessage} onChange={e => setFormData({...formData, whatsappMessage: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-1">Descrição</label>
                <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors resize-y"
                  value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div>
                <label className="block text-sm opacity-70 mb-1">Imagens (separadas por vírgula)</label>
                <input placeholder="/produtos/bolsa_foto1.jfif, /produtos/bolsa_foto2.jfif" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-duna-cream outline-none focus:border-duna-peach transition-colors"
                  value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} 
                />
              </div>

              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-duna-peach"
                    checked={formData.isAvailable} onChange={e => setFormData({...formData, isAvailable: e.target.checked})} 
                  />
                  <span>Disponível / Ativo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-duna-peach"
                    checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} 
                  />
                  <span>Destaque na home/loja</span>
                </label>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-medium opacity-70 hover:opacity-100 transition-opacity">
                  Cancelar
                </button>
                <button type="submit" className="bg-duna-peach text-duna-brown px-6 py-3 rounded-xl font-bold hover:bg-duna-peach/90 transition-colors">
                  {editingProduct ? "Salvar Alterações" : "Criar Produto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
