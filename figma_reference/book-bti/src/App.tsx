import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { PlacesPage } from './pages/PlacesPage';
import { BookmarkPage } from './pages/BookmarkPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';
import { SpotDetailPage } from './pages/SpotDetailPage';
import { BookBTIIntro } from './pages/BookBTIIntro';
import { BookBTIQuiz } from './pages/BookBTIQuiz';
import { BookBTILoading } from './pages/BookBTILoading';
import { BookBTIResult } from './pages/BookBTIResult';
import './styles/globals.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/spots/:id" element={<SpotDetailPage />} />
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/book-bti" element={<BookBTIIntro />} />
          <Route path="/book-bti/quiz" element={<BookBTIQuiz />} />
          <Route path="/book-bti/loading" element={<BookBTILoading />} />
          <Route path="/book-bti/result" element={<BookBTIResult />} />
        </Routes>
      </div>
    </Router>
  );
}