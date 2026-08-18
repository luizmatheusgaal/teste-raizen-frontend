import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import EventDetail from './pages/EventDetail';
import Checkout from './pages/Checkout';
import MyTickets from './pages/MyTickets';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/eventos/:id" element={<EventDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/meus-ingressos" element={<MyTickets />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
