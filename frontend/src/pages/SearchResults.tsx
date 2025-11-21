import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import './SearchResults.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const query = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000,
  });

  const allProducts: Product[] = [
    { 
      id: 1, 
      name: 'Kit Plástico CRF 230', 
      price: 450.00, 
      image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Kit+Plastico', 
      category: 'Para Moto',
      description: 'Kit completo de plásticos para Honda CRF 230'
    },
    { 
      id: 2, 
      name: 'Suporte com Pedaleira Aço Inox', 
      price: 320.00, 
      image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Suporte', 
      category: 'Para Moto',
      description: 'Suporte com pedaleira em aço inoxidável'
    },
    { 
      id: 3, 
      name: 'Tampão Escape 4 Tempos', 
      price: 85.00, 
      image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Tampao', 
      category: 'Para Moto',
      description: 'Tampão para escape de motos 4 tempos'
    },
    { 
      id: 4, 
      name: 'Tanque Adaptável XR 200', 
      price: 580.00, 
      image: 'https://placehold.co/300x300/000000/FFFFFF?text=Tanque', 
      category: 'Para Moto',
      description: 'Tanque adaptável para Honda XR 200'
    },
    { 
      id: 5, 
      name: 'Number Plate CRF 230', 
      price: 120.00, 
      image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Number+Plate', 
      category: 'Para Moto',
      description: 'Number plate original para Honda CRF 230'
    },
    { 
      id: 6, 
      name: 'Kit Plástico CRF 250', 
      price: 520.00, 
      image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Kit+250', 
      category: 'Para Moto',
      description: 'Kit completo de plásticos para Honda CRF 250'
    },
    { 
      id: 7, 
      name: 'Aliviador de Embreagem', 
      price: 180.00, 
      image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Aliviador', 
      category: 'Oficina',
      description: 'Aliviador de embreagem que reduz o esforço em até 30%'
    },
    { 
      id: 8, 
      name: 'Kit Plástico CRF 230 Pro', 
      price: 480.00, 
      image: 'https://placehold.co/300x300/000000/FFFFFF?text=Kit+Pro', 
      category: 'Para Moto',
      description: 'Versão Pro do kit de plásticos para CRF 230'
    },
    { 
      id: 9, 
      name: 'Capacete Off Road', 
      price: 350.00, 
      image: 'https://placehold.co/300x300/FF6B00/FFFFFF?text=Capacete', 
      category: 'Para Pilotos',
      description: 'Capacete off road com certificação de segurança'
    },
    { 
      id: 10, 
      name: 'Luvas de Proteção', 
      price: 95.00, 
      image: 'https://placehold.co/300x300/DC143C/FFFFFF?text=Luvas', 
      category: 'Para Pilotos',
      description: 'Luvas de proteção para trilhas'
    },
    { 
      id: 11, 
      name: 'Ferramenta Multiuso', 
      price: 150.00, 
      image: 'https://placehold.co/300x300/DAA520/FFFFFF?text=Ferramenta', 
      category: 'Oficina',
      description: 'Ferramenta multiuso completa para manutenção'
    },
    { 
      id: 12, 
      name: 'Bota de Trilha', 
      price: 420.00, 
      image: 'https://placehold.co/300x300/000000/FFFFFF?text=Bota', 
      category: 'Para Pilotos',
      description: 'Bota de trilha com proteção completa'
    },
  ];

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

    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    return filtered;
  }, [query, selectedCategory, priceRange]);

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

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
                  value={priceRange.min || ''}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value) || 0,
                    })
                  }
                  className="price-input"
                />
                <input
                  type="number"
                  placeholder="Preço máximo"
                  value={priceRange.max || ''}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value) || 10000,
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

