import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, paymentMethod, setPaymentMethod, clearCart, updateQuantity, removeFromCart } = useCart();
  const [pixGenerated, setPixGenerated] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const total = getTotalPrice();

  const handleGeneratePix = () => {
    setPixGenerated(true);
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    // Validação de endereço
    if (!address.street || !address.number || !address.neighborhood || !address.city || !address.state || !address.zipCode) {
      toast.error('Por favor, preencha todos os campos obrigatórios do endereço.');
      return;
    }

    // Validação de cartão se for cartão
    if (paymentMethod === 'credit') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        toast.error('Por favor, preencha todos os dados do cartão.');
        return;
      }
    }

    // Validação de PIX se for PIX
    if (paymentMethod === 'pix' && !pixGenerated) {
      toast.error('Por favor, gere o código PIX primeiro.');
      return;
    }

    setProcessing(true);

    // Simular processamento de pagamento
    setTimeout(() => {
      clearCart();
      setProcessing(false);
      navigate('/payment-success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-empty">
            <h2>Seu carrinho está vazio</h2>
            <button onClick={() => navigate('/')} className="back-to-shop-button">
              Voltar às compras
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Finalizar Pedido</h1>

        <div className="checkout-content">
          <div className="checkout-left">
            <section className="checkout-section">
              <h2>Produtos</h2>
              <div className="checkout-products">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-product-item">
                    <img src={item.image} alt={item.name} className="checkout-product-image" />
                    <div className="checkout-product-info">
                      <h3>{item.name}</h3>
                      <p>{item.category}</p>
                      <div className="checkout-product-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Diminuir quantidade"
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="quantity-button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Aumentar quantidade"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remover produto"
                        >
                          <FaTrash />
                          Remover
                        </button>
                      </div>
                    </div>
                    <div className="checkout-product-price">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="checkout-section">
              <h2>Endereço de Entrega</h2>
              <div className="address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Rua *</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Número *</label>
                    <input
                      type="text"
                      value={address.number}
                      onChange={(e) => setAddress({ ...address, number: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Complemento</label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Bairro *</label>
                  <input
                    type="text"
                    value={address.neighborhood}
                    onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Cidade *</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado *</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      required
                      maxLength={2}
                      placeholder="SP"
                    />
                  </div>
                  <div className="form-group">
                    <label>CEP *</label>
                    <input
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                      required
                      maxLength={8}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Forma de Pagamento</h2>
              <div className="payment-method-selection">
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pix"
                    checked={paymentMethod === 'pix'}
                    onChange={() => {
                      setPaymentMethod('pix');
                      setPixGenerated(false);
                    }}
                  />
                  <span>PIX</span>
                </label>
                <label className="payment-method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                  />
                  <span>Cartão de Crédito</span>
                </label>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="pix-payment">
                  {!pixGenerated ? (
                    <button onClick={handleGeneratePix} className="generate-pix-button">
                      Gerar Código PIX
                    </button>
                  ) : (
                    <div className="pix-code-container">
                      <p className="pix-code-label">Código PIX gerado com sucesso!</p>
                      <div className="pix-code">
                        <p>00020126360014BR.GOV.BCB.PIX0114+55119999999995204000053039865802BR5909ADrenalina6009SAO PAULO62070503***6304ABCD</p>
                      </div>
                      <p className="pix-instructions">
                        Escaneie o código QR ou copie o código acima para realizar o pagamento.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label>Número do Cartão *</label>
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardData({ ...cardData, cardNumber: value });
                      }}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nome no Cartão *</label>
                    <input
                      type="text"
                      value={cardData.cardName}
                      onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Validade *</label>
                      <input
                        type="text"
                        value={cardData.expiryDate}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                          const formatted = value.length >= 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value;
                          setCardData({ ...cardData, expiryDate: formatted });
                        }}
                        placeholder="MM/AA"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV *</label>
                      <input
                        type="text"
                        value={cardData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                          setCardData({ ...cardData, cvv: value });
                        }}
                        placeholder="123"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="checkout-right">
            <div className="checkout-summary">
              <h2>Resumo do Pedido</h2>
              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span className="total-value">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
              <button
                onClick={handlePayment}
                className="pay-button"
                disabled={processing}
              >
                {processing ? 'Processando...' : 'Confirmar Pagamento'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

