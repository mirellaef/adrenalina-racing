import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { productsService } from '../../service/products';
import type { Product } from '../../types/product';
import './Products.css';

const Products = () => {
  const [showAll, setShowAll] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productsService.getAll();
        setAllProducts(products);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const displayedProducts = showAll ? allProducts : allProducts.slice(0, 4);

  if (loading) {
    return (
      <section className="products-section">
        <div className="products-container">
          <h2 className="products-title">Produtos Mais Vendidos</h2>
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando produtos...</div>
        </div>
      </section>
    );
  }

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

