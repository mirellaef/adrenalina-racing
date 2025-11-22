import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Atendimento.css';

const Atendimento = () => {
  const whatsappNumber = '5547992000000';
  const phoneNumber = '4733334444';
  const email = 'contato@adrenalinaracing.com.br';

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:+55${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Atendimento</h1>
        <div className="info-content">
          <section>
            <h2>Entre em Contato</h2>
            <p>
              Nossa equipe está pronta para ajudar você! Escolha a forma de contato que preferir.
            </p>
          </section>

          <div className="contact-methods">
            <div className="contact-card" onClick={handleWhatsAppClick}>
              <FaWhatsapp className="contact-icon whatsapp" />
              <h3>WhatsApp</h3>
              <p>(47) 99200-0000</p>
              <span className="contact-badge">Atendimento Rápido</span>
            </div>

            <div className="contact-card" onClick={handlePhoneClick}>
              <FaPhone className="contact-icon phone" />
              <h3>Telefone</h3>
              <p>(47) 3333-4444</p>
              <span className="contact-badge">Segunda a Sexta: 8h às 18h</span>
            </div>

            <div className="contact-card" onClick={handleEmailClick}>
              <FaEnvelope className="contact-icon email" />
              <h3>E-mail</h3>
              <p>{email}</p>
              <span className="contact-badge">Resposta em até 24h</span>
            </div>
          </div>

          <section>
            <h2>Horário de Atendimento</h2>
            <ul>
              <li><strong>Segunda a Sexta:</strong> 8h às 18h</li>
              <li><strong>Sábado:</strong> 8h às 12h</li>
              <li><strong>Domingo:</strong> Fechado</li>
            </ul>
          </section>

          <section>
            <h2>Como Podemos Ajudar?</h2>
            <ul>
              <li>Dúvidas sobre produtos</li>
              <li>Orientação para compra</li>
              <li>Acompanhamento de pedidos</li>
              <li>Suporte pós-venda</li>
              <li>Trocas e devoluções</li>
              <li>Orçamentos personalizados</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Atendimento;

