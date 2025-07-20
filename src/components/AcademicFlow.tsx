import React, { useState } from 'react';
import type { StudentProgress } from '../types/CourseTree';
import AcademicTimeline from './AcademicTimeline';
import MaterialBoard from './MaterialBoard';
import AnalyticsDashboard from './AnalyticsDashboard';
import PlanningMode from './PlanningMode';
import { 
  Timeline, 
  LayoutGrid, 
  BarChart3, 
  Calendar,
  Settings,
  User
} from 'lucide-react';
import './AcademicFlow.css';

interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  startYear: number;
  progress: StudentProgress;
}

const AcademicFlow: React.FC = () => {
  const [activeView, setActiveView] = useState<'timeline' | 'board' | 'analytics' | 'planning'>('timeline');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Datos del estudiante de ejemplo
  const student: Student = {
    id: '2021-1234',
    name: 'María García Rodríguez',
    email: 'maria.garcia@universidad.edu',
    program: 'Ingeniería de Sistemas',
    startYear: 2021,
    progress: {
      totalXP: 2400,
      level: 3,
      completedCourses: [
        'calc1', 'algebra', 'prog1', 'intro-ing', 'fisica1', 'quimica'
      ],
      enrolledCourses: [
        'calc2', 'prog2', 'estructura-datos'
      ],
      failedCourses: [
        'estadistica'
      ],
      currentSemester: 6,
      gpa: 3.8,
      achievements: []
    }
  };

  const navigationItems = [
    {
      key: 'timeline',
      label: 'Timeline Académico',
      icon: Timeline,
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
      description: 'Planificar futuros semestres'
    }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'timeline':
        return <AcademicTimeline student={student} />;
      case 'board':
        return <MaterialBoard student={student} />;
      case 'analytics':
        return <AnalyticsDashboard student={student} />;
      case 'planning':
        return <PlanningMode student={student} />;
      default:
        return <AcademicTimeline student={student} />;
    }
  };

  return (
    <div className="academic-flow">
      {/* Header Principal */}
      <header className="flow-header">
        <div className="header-content">
          <div className="student-info">
            <div className="student-avatar">
              <User size={24} />
            </div>
            <div className="student-details">
              <h1>{student.name}</h1>
              <p>{student.program} • Semestre {student.progress.currentSemester}</p>
              <div className="quick-stats">
                <span className="stat">GPA: {student.progress.gpa}</span>
                <span className="stat">Materias: {student.progress.completedCourses.length} completadas</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button className="action-btn secondary">
              <Settings size={18} />
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
              onClick={() => setActiveView(item.key as any)}
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
