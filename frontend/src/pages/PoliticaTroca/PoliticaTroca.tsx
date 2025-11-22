import './PoliticaTroca.css';

const PoliticaTroca = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Política de Troca</h1>
        <div className="info-content">
          <section>
            <h2>Prazo para Troca</h2>
            <p>
              Você tem até 7 dias corridos, a partir da data de recebimento do produto, para solicitar a troca.
            </p>
          </section>

          <section>
            <h2>Condições para Troca</h2>
            <ul>
              <li>O produto deve estar em sua embalagem original</li>
              <li>O produto não pode ter sido usado ou danificado</li>
              <li>Deve conter todas as etiquetas e acessórios originais</li>
              <li>É necessário apresentar a nota fiscal</li>
            </ul>
          </section>

          <section>
            <h2>Como Solicitar a Troca</h2>
            <ol>
              <li>Entre em contato conosco via WhatsApp ou e-mail</li>
              <li>Informe o número do pedido e o motivo da troca</li>
              <li>Nossa equipe irá orientá-lo sobre o processo</li>
              <li>Envie o produto de volta (frete por conta do cliente, exceto em caso de defeito)</li>
              <li>Após recebermos e analisarmos, faremos a troca ou reembolso</li>
            </ol>
          </section>

          <section>
            <h2>Reembolso</h2>
            <p>
              Em caso de reembolso, o valor será devolvido na mesma forma de pagamento utilizada,
              em até 10 dias úteis após o recebimento e análise do produto.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliticaTroca;

