import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import CartSidebar from './components/CartSidebar/CartSidebar';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SearchResults from './pages/SearchResults/SearchResults';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Checkout from './pages/Checkout/Checkout';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';
import ComoComprar from './pages/ComoComprar/ComoComprar';
import FormasPagamento from './pages/FormasPagamento/FormasPagamento';
import PoliticaTroca from './pages/PoliticaTroca/PoliticaTroca';
import FreteEntrega from './pages/FreteEntrega/FreteEntrega';
import Atendimento from './pages/Atendimento/Atendimento';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/como-comprar" element={<ComoComprar />} />
          <Route path="/formas-pagamento" element={<FormasPagamento />} />
          <Route path="/politica-troca" element={<PoliticaTroca />} />
          <Route path="/frete-entrega" element={<FreteEntrega />} />
          <Route path="/atendimento" element={<Atendimento />} />
        </Routes>
        <CartSidebar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;
