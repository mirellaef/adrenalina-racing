import './FreteEntrega.css';

const FreteEntrega = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Frete e Entrega</h1>
        <div className="info-content">
          <section>
            <h2>Frete Grátis</h2>
            <p>
              Frete grátis todo o Brasil! O frete sai por nossa conta e não é cobrado nada.
            </p>
          </section>

          <section>
            <h2>Opções de Entrega</h2>
            <ul>
              <li><strong>PAC:</strong> Entrega em 10 a 15 dias úteis</li>
              <li><strong>SEDEX:</strong> Entrega em 3 a 5 dias úteis</li>
              <li><strong>Retirada no Local:</strong> Disponível em Araquari/SC (sem custo)</li>
            </ul>
          </section>

          <section>
            <h2>Prazo de Envio</h2>
            <p>
              Após a confirmação do pagamento, o pedido é separado e enviado em até 2 dias úteis.
            </p>
            <p>
              Você receberá um código de rastreamento por e-mail assim que o pedido for despachado.
            </p>
          </section>

          <section>
            <h2>Acompanhamento</h2>
            <p>
              Acompanhe seu pedido em tempo real através do código de rastreamento enviado por e-mail.
              Em caso de dúvidas, entre em contato conosco.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FreteEntrega;

