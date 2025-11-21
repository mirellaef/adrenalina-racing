import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-fixed">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contato</h3>
          <p>Telefone: (47) 3333-4444</p>
          <p>WhatsApp: (47) 99200-0000</p>
          <p>Email: contato@adrenalinaracing.com.br</p>
        </div>
        
        <div className="footer-section">
          <h3>Dúvidas Frequentes</h3>
          <ul>
            <li><a href="#faq">Como comprar?</a></li>
            <li><a href="#faq">Formas de pagamento</a></li>
            <li><a href="#faq">Política de troca</a></li>
            <li><a href="#faq">Frete e entrega</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Sobre Nós</h3>
          <p>Especialistas em peças e equipamentos para motos off road.</p>
          <p>Qualidade e durabilidade para sua trilha.</p>
        </div>
        
        <div className="footer-section">
          <h3>Como Comprar</h3>
          <ul>
            <li><a href="#como-comprar">Passo a passo</a></li>
            <li><a href="#como-comprar">Cadastro</a></li>
            <li><a href="#como-comprar">Atendimento</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Endereço</h3>
          <p>Adrenalina Racing LTDA</p>
          <p>CNPJ: 12.345.678/0001-90</p>
          <p>Rodovia BR 280, km 27, nº 5200</p>
          <p>Colégio Agrícola - Araquari/SC</p>
          <p>CEP: 89245-000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Adrenalina Racing. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

