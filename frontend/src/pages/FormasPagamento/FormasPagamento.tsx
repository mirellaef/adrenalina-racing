import './FormasPagamento.css';

const FormasPagamento = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Formas de Pagamento</h1>
        <div className="info-content">
          <section>
            <h2>PIX</h2>
            <p>
              Pagamento instantâneo com código PIX. O código será gerado após a confirmação do pedido.
              O pagamento é processado imediatamente e você recebe a confirmação em instantes.
            </p>
            <p>
              <strong>Vantagens:</strong> Aprovação imediata e sem taxas adicionais.
            </p>
          </section>

          <section>
            <h2>Cartão de Crédito</h2>
            <p>
              Aceitamos todas as bandeiras principais: Visa, Mastercard, Elo, American Express e Hipercard.
            </p>
            <p>
              <strong>Parcelamento:</strong> Parcele em até 12x sem juros (consulte condições).
            </p>
          </section>

          <section>
            <h2>Informações Importantes</h2>
            <ul>
              <li>Todos os pagamentos são processados de forma segura</li>
              <li>Seus dados são protegidos e criptografados</li>
              <li>O pedido só é confirmado após a aprovação do pagamento</li>
              <li>Em caso de dúvidas, entre em contato conosco</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FormasPagamento;

