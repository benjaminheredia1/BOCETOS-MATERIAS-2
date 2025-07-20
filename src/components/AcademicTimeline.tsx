import React from 'react';
import { Clock, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  status: 'completed' | 'enrolled' | 'failed' | 'available' | 'locked';
  semester: number;
  grade?: number;
}

const mockCourses: Course[] = [
  // Semestre 1
  { id: '1', code: 'MAT101', name: 'Cálculo I', credits: 4, status: 'completed', semester: 1, grade: 85 },
  { id: '2', code: 'FIS101', name: 'Física I', credits: 4, status: 'completed', semester: 1, grade: 92 },
  { id: '3', code: 'QUI101', name: 'Química General', credits: 3, status: 'completed', semester: 1, grade: 88 },
  { id: '4', code: 'ING101', name: 'Introducción a la Ingeniería', credits: 2, status: 'completed', semester: 1, grade: 95 },
  
  // Semestre 2
  { id: '5', code: 'MAT102', name: 'Cálculo II', credits: 4, status: 'completed', semester: 2, grade: 78 },
  { id: '6', code: 'FIS102', name: 'Física II', credits: 4, status: 'completed', semester: 2, grade: 85 },
  { id: '7', code: 'PRO101', name: 'Programación I', credits: 3, status: 'failed', semester: 2, grade: 45 },
  { id: '8', code: 'ALG101', name: 'Álgebra Lineal', credits: 3, status: 'completed', semester: 2, grade: 90 },
  
  // Semestre 3 (actual)
  { id: '9', code: 'MAT201', name: 'Cálculo III', credits: 4, status: 'enrolled', semester: 3 },
  { id: '10', code: 'PRO102', name: 'Programación II', credits: 3, status: 'enrolled', semester: 3 },
  { id: '11', code: 'EST101', name: 'Estadística', credits: 3, status: 'enrolled', semester: 3 },
  { id: '12', code: 'ING201', name: 'Métodos Numéricos', credits: 3, status: 'enrolled', semester: 3 },
  
  // Semestre 4 (planificado)
  { id: '13', code: 'MAT301', name: 'Ecuaciones Diferenciales', credits: 4, status: 'available', semester: 4 },
  { id: '14', code: 'PRO201', name: 'Estructuras de Datos', credits: 4, status: 'available', semester: 4 },
  { id: '15', code: 'FIS201', name: 'Física III', credits: 4, status: 'available', semester: 4 },
];

const AcademicTimeline: React.FC = () => {
  const groupedCourses = mockCourses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  const getSemesterName = (semester: number) => {
    const names = ['', 'Primer Semestre', 'Segundo Semestre', 'Tercer Semestre', 'Cuarto Semestre'];
    return names[semester] || `Semestre ${semester}`;
  };

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'enrolled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'available':
        return <BookOpen className="w-4 h-4 text-gray-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-300" />;
    }
  };

  return (
    <div className="academic-timeline">
      <div className="timeline-header">
        <h2>Progreso Académico</h2>
        <div className="timeline-controls">
          <button className="action-btn secondary">
            <BookOpen className="w-4 h-4" />
            Ver Pensum
          </button>
          <button className="action-btn secondary">
            <Clock className="w-4 h-4" />
            Proyección
          </button>
        </div>
      </div>
      
      <div className="timeline-view">
        {Object.entries(groupedCourses)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([semester, courses]) => (
          <div key={semester} className="semester-row">
            <div className="semester-info">
              <div className="semester-label">{getSemesterName(parseInt(semester))}</div>
              <div className="semester-period">
                {parseInt(semester) <= 2 ? 'Completado' : 
                 parseInt(semester) === 3 ? 'En Curso' : 'Planificado'}
              </div>
            </div>
            
            <div className="courses-container">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className={`course-pill ${course.status}`}
                  title={`${course.code} - ${course.name} (${course.credits} créditos)${course.grade ? ` - Nota: ${course.grade}` : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {getStatusIcon(course.status)}
                    <span>{course.code}</span>
                    <span style={{ fontSize: '11px', opacity: 0.8 }}>({course.credits}c)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '32px', 
        padding: '20px', 
        background: '#f7fafc', 
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#1a202c', 
          marginBottom: '12px' 
        }}>
          Resumen del Progreso
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '16px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#48bb78' }}>
              {mockCourses.filter(c => c.status === 'completed').length}
            </div>
            <div style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>
              Materias Aprobadas
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ed8936' }}>
              {mockCourses.filter(c => c.status === 'enrolled').length}
            </div>
            <div style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>
              Materias Actuales
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f56565' }}>
              {mockCourses.filter(c => c.status === 'failed').length}
            </div>
            <div style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>
              Materias Perdidas
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
              {mockCourses.reduce((sum, c) => c.status === 'completed' ? sum + c.credits : sum, 0)}
            </div>
            <div style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>
              Créditos Aprobados
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTimeline;
