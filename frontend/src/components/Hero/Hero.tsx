import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-container">
        <img
          src="https://img.freepik.com/fotos-gratis/motociclista-de-terra-com-sua-motocicleta-correndo-em-circuitos-de-aventura_23-2151482718.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Moto de Trilha"
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Adrenalina Racing</h1>
          <p className="hero-subtitle">Peças e Equipamentos para Motos Off Road</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

