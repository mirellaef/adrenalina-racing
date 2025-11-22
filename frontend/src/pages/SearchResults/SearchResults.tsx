import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { productsService } from '../../service/products';
import type { Product } from '../../types/product';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
    min: '',
    max: '',
  });

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

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    const minPrice = priceRange.min === '' ? 0 : Number(priceRange.min);
    const maxPrice = priceRange.max === '' ? 10000 : Number(priceRange.max);

    filtered = filtered.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    return filtered;
  }, [allProducts, query, selectedCategory, priceRange]);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="search-results-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando produtos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="search-results-container">
        <aside className="filters-sidebar">
          <h2 className="filters-title">Filtros</h2>

          <div className="filter-section">
            <h3 className="filter-section-title">Categoria</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === 'all'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>Todas</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="Para Moto"
                  checked={selectedCategory === 'Para Moto'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>Para Moto</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="Oficina"
                  checked={selectedCategory === 'Oficina'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>Oficina</span>
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="Para Pilotos"
                  checked={selectedCategory === 'Para Pilotos'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <span>Para Pilotos</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-section-title">Preço</h3>
            <div className="price-filter">
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Preço mínimo"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: e.target.value,
                    })
                  }
                  className="price-input"
                />
                <input
                  type="number"
                  placeholder="Preço máximo"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: e.target.value,
                    })
                  }
                  className="price-input"
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="search-results-main">
          <div className="search-results-header">
            <h1 className="search-results-title">
              {query ? `Resultados para "${query}"` : 'Todos os produtos'}
            </h1>
            <p className="search-results-count">
              {filteredProducts.length} produto(s) encontrado(s)
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <p>Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="search-results-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="search-product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="search-product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="search-product-image"
                    />
                  </div>
                  <div className="search-product-info">
                    <h3 className="search-product-name">{product.name}</h3>
                    <p className="search-product-category">{product.category}</p>
                    <p className="search-product-price">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                    <button
                      className="search-product-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        });
                      }}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SearchResults;

