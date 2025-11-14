import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { EventsPage } from './components/EventsPage';
import { FieldOfHarmonyPage } from './components/FieldOfHarmonyPage';
import { BookmarkCreatePage } from './components/BookmarkCreatePage';

type Page = 'home' | 'events' | 'harmony' | 'bookmark';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'harmony':
        return <FieldOfHarmonyPage />;
      case 'bookmark':
        return <BookmarkCreatePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-bg))]">
      <Header
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as Page)}
        isSticky={currentPage === 'home'}
      />
      {renderPage()}
    </div>
  );
}
