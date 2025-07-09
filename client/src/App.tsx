import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '1.5rem 1rem', borderBottom: '1px solid #eee', background: 'inherit' }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.03em' }}>PopCu</h1>
        </header>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<EventListPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <footer style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#aaa' }}>
          &copy; {new Date().getFullYear()} PopCu
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
