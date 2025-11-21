import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-container">
        <img 
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&q=80" 
          alt="Moto de Trilha" 
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">ADrenalina Racing</h1>
          <p className="hero-subtitle">Peças e Equipamentos para Motos Off Road</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

