import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Products from '../../components/Products/Products';
import Footer from '../../components/Footer/Footer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Home;

