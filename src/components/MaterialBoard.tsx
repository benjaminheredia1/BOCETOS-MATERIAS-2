import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, BookOpen, Plus, Filter } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  status: 'completed' | 'enrolled' | 'failed' | 'available' | 'locked';
  semester: number;
  prerequisites?: string[];
  grade?: number;
}

const mockCourses: Course[] = [
  // Completadas
  { id: '1', code: 'MAT101', name: 'Cálculo I', credits: 4, status: 'completed', semester: 1, grade: 85 },
  { id: '2', code: 'FIS101', name: 'Física I', credits: 4, status: 'completed', semester: 1, grade: 92 },
  { id: '3', code: 'QUI101', name: 'Química General', credits: 3, status: 'completed', semester: 1, grade: 88 },
  { id: '4', code: 'MAT102', name: 'Cálculo II', credits: 4, status: 'completed', semester: 2, grade: 78, prerequisites: ['MAT101'] },
  { id: '5', code: 'FIS102', name: 'Física II', credits: 4, status: 'completed', semester: 2, grade: 85, prerequisites: ['FIS101'] },
  { id: '6', code: 'ALG101', name: 'Álgebra Lineal', credits: 3, status: 'completed', semester: 2, grade: 90 },
  
  // Inscritas actualmente
  { id: '7', code: 'MAT201', name: 'Cálculo III', credits: 4, status: 'enrolled', semester: 3, prerequisites: ['MAT102'] },
  { id: '8', code: 'PRO102', name: 'Programación II', credits: 3, status: 'enrolled', semester: 3 },
  { id: '9', code: 'EST101', name: 'Estadística', credits: 3, status: 'enrolled', semester: 3 },
  { id: '10', code: 'ING201', name: 'Métodos Numéricos', credits: 3, status: 'enrolled', semester: 3, prerequisites: ['MAT102'] },
  
  // Perdidas/Reprobadas
  { id: '11', code: 'PRO101', name: 'Programación I', credits: 3, status: 'failed', semester: 2, grade: 45 },
  
  // Disponibles para inscribir
  { id: '12', code: 'MAT301', name: 'Ecuaciones Diferenciales', credits: 4, status: 'available', semester: 4, prerequisites: ['MAT201'] },
  { id: '13', code: 'PRO201', name: 'Estructuras de Datos', credits: 4, status: 'available', semester: 4, prerequisites: ['PRO102'] },
  { id: '14', code: 'FIS201', name: 'Física III', credits: 4, status: 'available', semester: 4, prerequisites: ['FIS102'] },
  { id: '15', code: 'BASE101', name: 'Bases de Datos', credits: 3, status: 'available', semester: 4, prerequisites: ['PRO101'] },
  { id: '16', code: 'CAL201', name: 'Cálculo Vectorial', credits: 3, status: 'available', semester: 4, prerequisites: ['MAT201'] },
  
  // Bloqueadas (sin prerrequisitos)
  { id: '17', code: 'PRO301', name: 'Programación Avanzada', credits: 4, status: 'locked', semester: 5, prerequisites: ['PRO201'] },
  { id: '18', code: 'ING301', name: 'Ingeniería de Software', credits: 4, status: 'locked', semester: 5, prerequisites: ['BASE101'] },
];

interface MaterialBoardProps {}

const MaterialBoard: React.FC<MaterialBoardProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'enrolled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'available':
        return <BookOpen className="w-4 h-4 text-gray-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-300" />;
    }
  };

  const getColumnTitle = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return 'Materias Aprobadas';
      case 'enrolled':
        return 'Materias Actuales';
      case 'failed':
        return 'Materias Perdidas';
      case 'available':
        return 'Disponibles para Inscribir';
      case 'locked':
        return 'Bloqueadas';
      default:
        return 'Otras';
    }
  };

  const getColumnColor = (status: Course['status']) => {
    switch (status) {
      case 'completed':
        return '#48bb78';
      case 'enrolled':
        return '#4299e1';
      case 'failed':
        return '#f56565';
      case 'available':
        return '#ed8936';
      case 'locked':
        return '#a0aec0';
      default:
        return '#718096';
    }
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === null || course.semester === selectedSemester;
    return matchesSearch && matchesSemester;
  });

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.status]) {
      acc[course.status] = [];
    }
    acc[course.status].push(course);
    return acc;
  }, {} as Record<Course['status'], Course[]>);

  const statusOrder: Course['status'][] = ['enrolled', 'available', 'failed', 'completed', 'locked'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Controles de filtrado */}
      <div style={{ 
        marginBottom: '24px', 
        display: 'flex', 
        gap: '16px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Buscar materias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              background: 'white'
            }}
          />
        </div>
        
        <select
          value={selectedSemester || ''}
          onChange={(e) => setSelectedSemester(e.target.value ? parseInt(e.target.value) : null)}
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            background: 'white',
            minWidth: '150px'
          }}
        >
          <option value="">Todos los semestres</option>
          <option value="1">Semestre 1</option>
          <option value="2">Semestre 2</option>
          <option value="3">Semestre 3</option>
          <option value="4">Semestre 4</option>
          <option value="5">Semestre 5</option>
        </select>
        
        <button className="action-btn secondary">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Board de materias */}
      <div className="material-board">
        {statusOrder.map(status => {
          const courses = groupedCourses[status] || [];
          if (courses.length === 0) return null;
          
          return (
            <div key={status} className="board-column">
              <div className="column-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      background: getColumnColor(status) 
                    }}
                  />
                  <h3 className="column-title">{getColumnTitle(status)}</h3>
                </div>
                <span className="column-count">{courses.length}</span>
              </div>
              
              <div className="course-cards">
                {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-card-header">
                      <span className="course-code">{course.code}</span>
                      <span className="course-credits">{course.credits} créditos</span>
                    </div>
                    
                    <div className="course-name">{course.name}</div>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginTop: '12px',
                      paddingTop: '8px',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getStatusIcon(course.status)}
                        <span style={{ fontSize: '12px', color: '#718096' }}>
                          Sem. {course.semester}
                        </span>
                      </div>
                      
                      {course.grade && (
                        <span 
                          style={{ 
                            fontSize: '12px', 
                            fontWeight: '600',
                            color: course.grade >= 70 ? '#48bb78' : '#f56565'
                          }}
                        >
                          {course.grade}%
                        </span>
                      )}
                      
                      {course.status === 'available' && (
                        <button 
                          style={{
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: '600'
                          }}
                        >
                          Inscribir
                        </button>
                      )}
                    </div>
                    
                    {course.prerequisites && course.prerequisites.length > 0 && (
                      <div style={{ 
                        marginTop: '8px',
                        fontSize: '11px',
                        color: '#718096'
                      }}>
                        <span style={{ fontWeight: '600' }}>Prerrequisitos:</span> {course.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
                
                {status === 'available' && (
                  <div 
                    className="course-card"
                    style={{ 
                      border: '2px dashed #cbd5e0',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      minHeight: '120px'
                    }}
                  >
                    <div style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#718096'
                    }}>
                      <Plus className="w-8 h-8" />
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>
                        Explorar más materias
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MaterialBoard;
