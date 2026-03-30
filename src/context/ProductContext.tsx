import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products as fallbackProducts } from "../data/products";

interface ProductContextType {
  productsList: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productsList, setProductsList] = useState<Product[]>([]);

  // Carregar produtos ao inicializar
  useEffect(() => {
    const savedProducts = localStorage.getItem("dunaviela_products");
    if (savedProducts) {
      setProductsList(JSON.parse(savedProducts));
    } else {
      setProductsList(fallbackProducts);
      localStorage.setItem("dunaviela_products", JSON.stringify(fallbackProducts));
    }
  }, []);

  // Salvar sempre que alterar
  useEffect(() => {
    if (productsList.length > 0) {
      localStorage.setItem("dunaviela_products", JSON.stringify(productsList));
    }
  }, [productsList]);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    setProductsList((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ productsList, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
