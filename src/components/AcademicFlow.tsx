import React, { useState } from 'react';
import AcademicTimeline from './AcademicTimeline';
import MaterialBoard from './MaterialBoard';
import AnalyticsDashboard from './AnalyticsDashboard';
import PlanningMode from './PlanningMode';
import { 
  Clock, 
  LayoutGrid, 
  BarChart3, 
  Calendar,
  Settings,
  User
} from 'lucide-react';
import './AcademicFlow.css';

const AcademicFlow: React.FC = () => {
  const [activeView, setActiveView] = useState<'timeline' | 'board' | 'analytics' | 'planning'>('timeline');

  const navigationItems = [
    {
      key: 'timeline',
      label: 'Timeline Académico',
      icon: Clock,
      description: 'Progreso semestre por semestre'
    },
    {
      key: 'board',
      label: 'Board de Materias',
      icon: LayoutGrid,
      description: 'Gestión visual tipo Kanban'
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Métricas y estadísticas'
    },
    {
      key: 'planning',
      label: 'Planificación',
      icon: Calendar,
      description: 'Proyección de semestres'
    }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'timeline':
        return <AcademicTimeline />;
      case 'board':
        return <MaterialBoard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'planning':
        return <PlanningMode />;
      default:
        return <AcademicTimeline />;
    }
  };

  return (
    <div className="academic-flow">
      {/* Header Principal */}
      <header className="flow-header">
        <div className="header-content">
          <div className="student-info">
            <div className="student-avatar">
              <User size={28} />
            </div>
            <div className="student-details">
              <h1>María García Rodríguez</h1>
              <p>Ingeniería en Sistemas • Semestre 3</p>
              <div className="quick-stats">
                <span className="stat">GPA: 3.8</span>
                <span className="stat">Materias: 8 completadas</span>
                <span className="stat">Créditos: 32/180</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="action-btn secondary">
              <Settings size={16} />
              Configuración
            </button>
          </div>
        </div>
      </header>

      {/* Navegación Principal */}
      <nav className="flow-navigation">
        <div className="nav-container">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeView === item.key ? 'active' : ''}`}
              onClick={() => setActiveView(item.key as 'timeline' | 'board' | 'analytics' | 'planning')}
            >
              <item.icon size={20} />
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="flow-content">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default AcademicFlow;
