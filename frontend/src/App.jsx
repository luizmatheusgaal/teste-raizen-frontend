import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function Placeholder() {
  return (
    <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Verzel Events</h2>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Placeholder />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
