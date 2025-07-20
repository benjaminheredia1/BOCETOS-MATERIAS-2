import React, { useState } from 'react';
import { Plus, Calendar, Clock, Target, BookOpen, CheckCircle2 } from 'lucide-react';

interface PlannedCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  isRequired: boolean;
  prerequisites?: string[];
}

interface SemesterPlan {
  semester: number;
  year: number;
  period: 'Enero-Mayo' | 'Agosto-Diciembre';
  courses: PlannedCourse[];
  totalCredits: number;
  status: 'completed' | 'current' | 'planned';
}

const mockPlannedCourses: PlannedCourse[] = [
  // Semestre 4 (próximo)
  { id: '1', code: 'MAT301', name: 'Ecuaciones Diferenciales', credits: 4, semester: 4, isRequired: true, prerequisites: ['MAT201'] },
  { id: '2', code: 'PRO201', name: 'Estructuras de Datos', credits: 4, semester: 4, isRequired: true, prerequisites: ['PRO102'] },
  { id: '3', code: 'FIS201', name: 'Física III', credits: 4, semester: 4, isRequired: true, prerequisites: ['FIS102'] },
  { id: '4', code: 'BASE101', name: 'Bases de Datos', credits: 3, semester: 4, isRequired: true, prerequisites: ['PRO101'] },
  
  // Semestre 5
  { id: '5', code: 'PRO301', name: 'Programación Avanzada', credits: 4, semester: 5, isRequired: true, prerequisites: ['PRO201'] },
  { id: '6', code: 'ING301', name: 'Ingeniería de Software', credits: 4, semester: 5, isRequired: true, prerequisites: ['BASE101'] },
  { id: '7', code: 'RED101', name: 'Redes de Computadores', credits: 3, semester: 5, isRequired: true },
  { id: '8', code: 'SIS201', name: 'Sistemas Operativos', credits: 4, semester: 5, isRequired: true },
  
  // Semestre 6
  { id: '9', code: 'PRO401', name: 'Desarrollo Web', credits: 3, semester: 6, isRequired: false },
  { id: '10', code: 'INT101', name: 'Inteligencia Artificial', credits: 4, semester: 6, isRequired: false },
  { id: '11', code: 'SEG101', name: 'Seguridad Informática', credits: 3, semester: 6, isRequired: false },
  { id: '12', code: 'GER101', name: 'Gerencia de Proyectos', credits: 3, semester: 6, isRequired: true },
];

const PlanningMode: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [draggedCourse, setDraggedCourse] = useState<PlannedCourse | null>(null);

  // Agrupar cursos por semestre
  const groupedCourses = mockPlannedCourses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, PlannedCourse[]>);

  // Crear planes de semestre
  const semesterPlans: SemesterPlan[] = [];
  for (let sem = 4; sem <= 8; sem++) {
    const courses = groupedCourses[sem] || [];
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    const year = Math.floor((sem - 1) / 2) + 2024;
    const period = sem % 2 === 1 ? 'Enero-Mayo' : 'Agosto-Diciembre';
    
    semesterPlans.push({
      semester: sem,
      year,
      period,
      courses,
      totalCredits,
      status: sem === 4 ? 'planned' : 'planned'
    });
  }

  const handleDragStart = (course: PlannedCourse) => {
    setDraggedCourse(course);
  };

  const handleDragEnd = () => {
    setDraggedCourse(null);
  };

  const getSemesterStatus = (semester: number) => {
    if (semester <= 3) return 'completed';
    if (semester === 4) return 'current';
    return 'planned';
  };

  const getSemesterColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#48bb78';
      case 'current':
        return '#667eea';
      case 'planned':
        return '#ed8936';
      default:
        return '#a0aec0';
    }
  };

  return (
    <div className="planning-mode">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', margin: '0 0 4px 0' }}>
            Planificación Académica
          </h2>
          <p style={{ fontSize: '16px', color: '#718096', margin: 0 }}>
            Organiza tu trayectoria académica y proyecta tu graduación
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="action-btn secondary">
            <Calendar className="w-4 h-4" />
            Calendario Académico
          </button>
          <button className="action-btn secondary">
            <Target className="w-4 h-4" />
            Simular Graduación
          </button>
        </div>
      </div>

      {/* Resumen de planificación */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>
            4.5
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Semestres restantes
          </div>
        </div>
        
        <div style={{ 
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#48bb78', marginBottom: '4px' }}>
            148
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Créditos restantes
          </div>
        </div>
        
        <div style={{ 
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#ed8936', marginBottom: '4px' }}>
            2026
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Año de graduación
          </div>
        </div>
        
        <div style={{ 
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#9f7aea', marginBottom: '4px' }}>
            17
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Créditos promedio/semestre
          </div>
        </div>
      </div>

      {/* Grid de planificación por semestres */}
      <div className="planning-grid">
        {semesterPlans.map((plan) => (
          <div 
            key={plan.semester}
            className={`semester-plan ${plan.status}`}
            style={{
              borderColor: getSemesterColor(plan.status),
              background: plan.status === 'current' ? 
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
                plan.status === 'completed' ? '#f0fff4' : '#f7fafc'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: `1px solid ${plan.status === 'current' ? 'rgba(255,255,255,0.3)' : '#e2e8f0'}`
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  color: plan.status === 'current' ? 'white' : '#1a202c',
                  margin: 0
                }}>
                  Semestre {plan.semester}
                </h3>
                <p style={{ 
                  fontSize: '12px', 
                  color: plan.status === 'current' ? 'rgba(255,255,255,0.8)' : '#718096',
                  margin: '2px 0 0 0'
                }}>
                  {plan.period} {plan.year}
                </p>
              </div>
              
              <div style={{ 
                background: plan.status === 'current' ? 'rgba(255,255,255,0.2)' : '#f7fafc',
                color: plan.status === 'current' ? 'white' : '#4a5568',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {plan.totalCredits} créditos
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '200px' }}>
              {plan.courses.map((course) => (
                <div
                  key={course.id}
                  draggable
                  onDragStart={() => handleDragStart(course)}
                  onDragEnd={handleDragEnd}
                  style={{
                    background: plan.status === 'current' ? 'rgba(255,255,255,0.15)' : 'white',
                    border: `1px solid ${plan.status === 'current' ? 'rgba(255,255,255,0.3)' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'move',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <span style={{ 
                      fontSize: '12px', 
                      fontWeight: '700',
                      color: plan.status === 'current' ? 'rgba(255,255,255,0.9)' : '#667eea',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {course.code}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {course.isRequired && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#f56565'
                        }} />
                      )}
                      <span style={{ 
                        fontSize: '11px',
                        color: plan.status === 'current' ? 'rgba(255,255,255,0.7)' : '#718096',
                        fontWeight: '600'
                      }}>
                        {course.credits}c
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '600',
                    color: plan.status === 'current' ? 'white' : '#1a202c',
                    lineHeight: '1.3'
                  }}>
                    {course.name}
                  </div>
                  
                  {course.prerequisites && course.prerequisites.length > 0 && (
                    <div style={{ 
                      fontSize: '10px',
                      color: plan.status === 'current' ? 'rgba(255,255,255,0.6)' : '#a0aec0',
                      marginTop: '4px'
                    }}>
                      Req: {course.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Botón para agregar materias */}
              <div 
                style={{
                  border: `2px dashed ${plan.status === 'current' ? 'rgba(255,255,255,0.5)' : '#cbd5e0'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  minHeight: '60px',
                  marginTop: 'auto'
                }}
                onClick={() => setSelectedSemester(plan.semester)}
              >
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: plan.status === 'current' ? 'rgba(255,255,255,0.7)' : '#718096'
                }}>
                  <Plus className="w-5 h-5" />
                  <span style={{ fontSize: '12px', fontWeight: '600' }}>
                    Agregar materia
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Panel de recomendaciones */}
      <div style={{ 
        marginTop: '32px',
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '700', 
          color: '#1a202c',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Target className="w-5 h-5 text-blue-500" />
          Recomendaciones de Planificación
        </h3>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ 
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>
                Carga Balanceada
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#1e40af', margin: 0, lineHeight: '1.4' }}>
              Tu planificación mantiene una carga de 15-17 créditos por semestre, lo cual es óptimo.
            </p>
          </div>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <Clock className="w-4 h-4 text-amber-600" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>
                Atención en Semestre 5
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#92400e', margin: 0, lineHeight: '1.4' }}>
              El semestre 5 tiene materias demandantes. Considera balancear con electivas más ligeras.
            </p>
          </div>
          
          <div style={{ 
            background: '#f0fdf4',
            border: '1px solid #86efac',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <BookOpen className="w-4 h-4 text-green-600" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#15803d' }}>
                Oportunidad de Adelanto
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#15803d', margin: 0, lineHeight: '1.4' }}>
              Podrías tomar una electiva adicional en semestre 4 para reducir carga futura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningMode;
