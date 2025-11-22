import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page">
      <div className="payment-success-container">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h1 className="success-title">Pagamento Realizado com Sucesso!</h1>
        <p className="success-message">
          Seu pedido foi confirmado e está sendo processado.
        </p>
        <p className="success-info">
          Você receberá um e-mail de confirmação em breve.
        </p>
        <div className="success-actions">
          <button onClick={() => navigate('/')} className="back-home-button">
            Voltar à Página Inicial
          </button>
          <button onClick={() => navigate('/search')} className="continue-shopping-button">
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

