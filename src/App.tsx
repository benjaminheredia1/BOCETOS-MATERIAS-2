import { useState } from 'react';
import AdminPanel from './components/AdminPanel';
import AcademicFlow from './components/AcademicFlow';
import { Users, User } from 'lucide-react';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'flow' | 'admin'>('flow');

  return (
    <div className="App">
      {/* Selector de vista */}
      <div className="view-selector">
        <button 
          className={`view-btn ${viewMode === 'flow' ? 'active' : ''}`}
          onClick={() => setViewMode('flow')}
        >
          <User size={20} />
          Academic Flow
        </button>
        <button 
          className={`view-btn ${viewMode === 'admin' ? 'active' : ''}`}
          onClick={() => setViewMode('admin')}
        >
          <Users size={20} />
          Panel Administrativo
        </button>
      </div>

      {/* Contenido basado en el modo de vista */}
      {viewMode === 'admin' ? (
        <AdminPanel />
      ) : (
        <AcademicFlow />
      )}
    </div>
  );
}

export default App;
