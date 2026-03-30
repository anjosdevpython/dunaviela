export interface Product {
  id: string;
  title: string;
  price: string;
  rawPrice: number;
  description: string;
  detailedPrices?: string[];
  images: string[];
  whatsappMessage: string;
  category?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "bolsa",
    title: "Bolsa Fio de Malha",
    price: "R$ 200,00",
    rawPrice: 200,
    description: "Feita com fio de malha e zíper de jaqueta, a bolsa em fio de malha é ótima para dias de movimento e ser sua fiel companheira do dia a dia, com o tamanho de um notebook ela é espaçosa e tem um design moderno que combina com qualquer ocasião.",
    images: [
      "/produtos/bolsa_foto1.jfif",
      "/produtos/bolsa_foto2.jfif",
      "/produtos/bolsa_foto3.jfif"
    ],
    whatsappMessage: "Olá! Gostaria de encomendar a Bolsa Fio de Malha.",
    isAvailable: true
  },
  {
    id: "conjunto-ana",
    title: "Conjunto Ana",
    price: "R$ 220,00",
    rawPrice: 220,
    description: "O conjunto Ana consiste em um cropped no formato de borboleta e uma saída de praia com o acabamento em fios, ótima para noites na praia. Feita com barroco n•4 vem com o conforto e o design moderno que você precisa nesse verão.",
    detailedPrices: [
      "Peças separadas:",
      "Cropped borboleta tamanho P R$110.00 | M R$125,00 | G R$150,00",
      "Saia vazada P 120,00 | M 130,00 | G 140,00",
      "*Ao pedir o conjunto leva com desconto"
    ],
    images: [
      "/produtos/Cropped_saia.jfif"
    ],
    whatsappMessage: "Olá! Gostaria de encomendar o Conjunto Ana.",
    isFeatured: true
  }
];
