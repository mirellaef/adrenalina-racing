import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import './ProductDetail.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const allProducts: Product[] = [
    { 
      id: 1, 
      name: 'Kit Plástico CRF 230', 
      price: 450.00, 
      image: 'https://placehold.co/800x600/FF6B00/FFFFFF?text=Kit+Plastico+CRF+230', 
      category: 'Para Moto',
      description: 'Kit completo de plásticos para Honda CRF 230, fabricado em material de alta qualidade e resistência. Inclui todos os componentes necessários para renovar a aparência da sua moto. Ideal para quem busca durabilidade e acabamento impecável.'
    },
    { 
      id: 2, 
      name: 'Suporte com Pedaleira Aço Inox', 
      price: 320.00, 
      image: 'https://placehold.co/800x600/DC143C/FFFFFF?text=Suporte+Pedaleira', 
      category: 'Para Moto',
      description: 'Suporte com pedaleira em aço inoxidável de alta qualidade. Proporciona maior conforto e segurança durante as trilhas. Resistente à corrosão e com acabamento premium.'
    },
    { 
      id: 3, 
      name: 'Tampão Escape 4 Tempos', 
      price: 85.00, 
      image: 'https://placehold.co/800x600/DAA520/FFFFFF?text=Tampao+Escape', 
      category: 'Para Moto',
      description: 'Tampão para escape de motos 4 tempos. Protege o sistema de escape contra entrada de água e sujeira. Fácil instalação e remoção.'
    },
    { 
      id: 4, 
      name: 'Tanque Adaptável XR 200', 
      price: 580.00, 
      image: 'https://placehold.co/800x600/000000/FFFFFF?text=Tanque+XR+200', 
      category: 'Para Moto',
      description: 'Tanque adaptável para Honda XR 200 com maior capacidade. Fabricado em material resistente e com design que mantém o centro de gravidade baixo. Ideal para trilhas longas.'
    },
    { 
      id: 5, 
      name: 'Number Plate CRF 230', 
      price: 120.00, 
      image: 'https://placehold.co/800x600/FF6B00/FFFFFF?text=Number+Plate', 
      category: 'Para Moto',
      description: 'Number plate original para Honda CRF 230. Design esportivo e resistente, perfeito para personalizar sua moto.'
    },
    { 
      id: 6, 
      name: 'Kit Plástico CRF 250', 
      price: 520.00, 
      image: 'https://placehold.co/800x600/DC143C/FFFFFF?text=Kit+CRF+250', 
      category: 'Para Moto',
      description: 'Kit completo de plásticos para Honda CRF 250. Material de alta qualidade, resistente a impactos e intempéries. Inclui todos os componentes necessários.'
    },
    { 
      id: 7, 
      name: 'Aliviador de Embreagem CRF 230', 
      price: 180.00, 
      image: 'https://placehold.co/800x600/DAA520/FFFFFF?text=Aliviador', 
      category: 'Oficina',
      description: 'Aliviador de embreagem que reduz o esforço necessário para acionar a embreagem em até 30%. Facilita muito o uso em trilhas longas.'
    },
    { 
      id: 8, 
      name: 'Kit Plástico CRF 230 Pro', 
      price: 480.00, 
      image: 'https://placehold.co/800x600/000000/FFFFFF?text=Kit+Pro', 
      category: 'Para Moto',
      description: 'Versão Pro do kit de plásticos para CRF 230. Material ainda mais resistente e acabamento premium. Ideal para uso intensivo.'
    },
    { 
      id: 9, 
      name: 'Capacete Off Road', 
      price: 350.00, 
      image: 'https://placehold.co/800x600/FF6B00/FFFFFF?text=Capacete', 
      category: 'Para Pilotos',
      description: 'Capacete off road com certificação de segurança. Design aerodinâmico, sistema de ventilação eficiente e visor removível. Conforto e proteção em trilhas.'
    },
    { 
      id: 10, 
      name: 'Luvas de Proteção', 
      price: 95.00, 
      image: 'https://placehold.co/800x600/DC143C/FFFFFF?text=Luvas', 
      category: 'Para Pilotos',
      description: 'Luvas de proteção para trilhas com reforços estratégicos. Material respirável e resistente. Proteção completa para as mãos durante as aventuras.'
    },
    { 
      id: 11, 
      name: 'Ferramenta Multiuso', 
      price: 150.00, 
      image: 'https://placehold.co/800x600/DAA520/FFFFFF?text=Ferramenta', 
      category: 'Oficina',
      description: 'Ferramenta multiuso completa para manutenção de motos. Inclui diversas chaves e ferramentas essenciais. Compacta e prática para levar nas trilhas.'
    },
    { 
      id: 12, 
      name: 'Bota de Trilha', 
      price: 420.00, 
      image: 'https://placehold.co/800x600/000000/FFFFFF?text=Bota', 
      category: 'Para Pilotos',
      description: 'Bota de trilha com proteção completa para canela e tornozelo. Solado antiderrapante, material impermeável e respirável. Conforto e segurança em todas as condições.'
    },
  ];

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <button onClick={() => navigate('/')}>Voltar para Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    openCart();
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-detail-image"
          />
        </div>
        
        <div className="product-info-section">
          <div className="product-header-info">
            <span className="product-category-badge">{product.category}</span>
            <h1 className="product-detail-name">{product.name}</h1>
          </div>
          
          <div className="product-price-section">
            <span className="product-detail-price">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <div className="product-description">
            <h3>Descrição</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-actions">
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </button>
            <button 
              className="buy-now-button"
              onClick={handleBuyNow}
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;

