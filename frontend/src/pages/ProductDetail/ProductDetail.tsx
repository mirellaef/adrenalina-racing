import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { productsService } from '../../service/products';
import type { Product } from '../../types/product';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productData = await productsService.getById(Number(id));
        setProduct(productData);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando produto...</div>
        </div>
      </div>
    );
  }

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
