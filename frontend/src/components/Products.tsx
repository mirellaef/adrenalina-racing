import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Products = () => {
  const [showAll, setShowAll] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const allProducts: Product[] = [
    { id: 1, name: 'Kit Plástico CRF 230', price: 450.00, image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Kit+Plastico', category: 'Para Moto' },
    { id: 2, name: 'Suporte com Pedaleira Aço Inox', price: 320.00, image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Suporte', category: 'Para Moto' },
    { id: 3, name: 'Tampão Escape 4 Tempos', price: 85.00, image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Tampao', category: 'Para Moto' },
    { id: 4, name: 'Tanque Adaptável XR 200', price: 580.00, image: 'https://placehold.co/300x300/000000/FFFFFF?text=Tanque', category: 'Para Moto' },
    { id: 5, name: 'Number Plate CRF 230', price: 120.00, image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Number+Plate', category: 'Para Moto' },
    { id: 6, name: 'Kit Plástico CRF 250', price: 520.00, image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Kit+250', category: 'Para Moto' },
    { id: 7, name: 'Aliviador de Embreagem', price: 180.00, image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Aliviador', category: 'Oficina' },
    { id: 8, name: 'Kit Plástico CRF 230 Pro', price: 480.00, image: 'https://placehold.co/300x300/000000/FFFFFF?text=Kit+Pro', category: 'Para Moto' },
    { id: 9, name: 'Capacete Off Road', price: 350.00, image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Capacete', category: 'Para Pilotos' },
    { id: 10, name: 'Luvas de Proteção', price: 95.00, image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Luvas', category: 'Para Pilotos' },
    { id: 11, name: 'Ferramenta Multiuso', price: 150.00, image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Ferramenta', category: 'Oficina' },
    { id: 12, name: 'Bota de Trilha', price: 420.00, image: 'https://placehold.co/300x300/000000/FFFFFF?text=Bota', category: 'Para Pilotos' },
  ];

  const displayedProducts = showAll ? allProducts : allProducts.slice(0, 4);

  return (
    <section className="products-section">
      <div className="products-container">
        <h2 className="products-title">Produtos Mais Vendidos</h2>
        <div className="products-grid">
          {displayedProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <button 
                  className="product-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
        {!showAll && (
          <button 
            className="view-more-button"
            onClick={() => setShowAll(true)}
          >
            Ver Mais Produtos
          </button>
        )}
      </div>
    </section>
  );
};

export default Products;

