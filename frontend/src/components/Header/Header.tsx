import { useState } from 'react';
import { FaHome, FaMotorcycle, FaSearch, FaShoppingCart, FaArrowLeft, FaUserCog } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const location = useLocation();
  const navigate = useNavigate();
  const isProductPage = location.pathname.startsWith('/product/');
  const [searchQuery, setSearchQuery] = useState('');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header-fixed">
      <div className="header-top">
        <div className="header-left">
          {isProductPage && (
            <button className="back-button" onClick={() => navigate('/')}>
              <FaArrowLeft className="back-icon" />
            </button>
          )}
          <img
            src={logo}
            alt="Adrenalina Racing Logo"
            className="logo"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              className="search-button"
              onClick={handleSearchClick}
              aria-label="Buscar"
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
          <nav className="header-nav">
            <button
              className="nav-link"
              onClick={() => navigate('/')}
            >
              <FaHome className="nav-icon" />
              <span>Home</span>
            </button>
            <button
              className="nav-link"
              onClick={() => navigate('/search')}
            >
              <FaMotorcycle className="nav-icon" />
              <span>Produtos</span>
            </button>
            {isAdmin ? (
              <button
                className="nav-link"
                onClick={() => navigate('/admin')}
              >
                <FaUserCog className="nav-icon" />
                <span>Admin</span>
              </button>
            ) : (
              <button
                className="nav-link"
                onClick={() => navigate('/login')}
              >
                <FaUserCog className="nav-icon" />
                <span>Login</span>
              </button>
            )}
          </nav>
          <button className="cart-button" onClick={openCart}>
            <FaShoppingCart className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

