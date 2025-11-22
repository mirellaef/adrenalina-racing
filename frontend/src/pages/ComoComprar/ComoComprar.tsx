import './ComoComprar.css';

const ComoComprar = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Como Comprar?</h1>
        <div className="info-content">
          <section>
            <h2>Passo a Passo</h2>
            <ol>
              <li>Navegue pelo site e encontre os produtos que deseja</li>
              <li>Clique no produto para ver mais detalhes</li>
              <li>Adicione os produtos ao carrinho</li>
              <li>Revise os itens no carrinho e escolha a forma de pagamento</li>
              <li>Preencha seus dados de entrega</li>
              <li>Confirme o pagamento</li>
              <li>Aguarde a confirmação e o envio do seu pedido</li>
            </ol>
          </section>

          <section>
            <h2>Cadastro</h2>
            <p>
              Você pode comprar sem cadastro, mas recomendamos criar uma conta para acompanhar seus pedidos e ter acesso a ofertas exclusivas.
            </p>
          </section>

          <section>
            <h2>Atendimento</h2>
            <p>
              Nossa equipe está pronta para ajudar você! Entre em contato através do WhatsApp, telefone ou e-mail disponíveis no rodapé do site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComoComprar;

