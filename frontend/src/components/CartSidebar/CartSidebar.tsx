import { FaTimes, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    paymentMethod,
    setPaymentMethod,
  } = useCart();

  const total = getTotalPrice();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <div className="cart-title">
            <FaShoppingCart className="cart-title-icon" />
            <h2>Meu Carrinho</h2>
          </div>
          <button className="cart-close-button" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-category">{item.category}</p>
                      <p className="cart-item-price">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-divider"></div>

              <div className="cart-payment">
                <h3>Forma de Pagamento</h3>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={paymentMethod === 'pix'}
                      onChange={() => setPaymentMethod('pix')}
                    />
                    <span>Pix</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod('credit')}
                    />
                    <span>Crédito</span>
                  </label>
                </div>
              </div>

              <div className="cart-divider"></div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span className="total-value">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                  PAGAR
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

