import React from 'react';
import { TrendingUp, Award, Clock, Target, BookOpen, Users, BarChart3 } from 'lucide-react';

interface AnalyticsData {
  totalCredits: number;
  completedCredits: number;
  currentGPA: number;
  semesterProgress: number;
  careerProgress: number;
  averageGrade: number;
  studyHours: number;
  rank: number;
}

const mockAnalytics: AnalyticsData = {
  totalCredits: 180,
  completedCredits: 32,
  currentGPA: 3.8,
  semesterProgress: 75,
  careerProgress: 18,
  averageGrade: 85,
  studyHours: 28,
  rank: 12
};

const AnalyticsDashboard: React.FC = () => {
  const progressPercentage = (mockAnalytics.completedCredits / mockAnalytics.totalCredits) * 100;
  
  const createProgressRing = (percentage: number, color: string, size: number = 120) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#1a202c'
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: '700' }}>
            {Math.round(percentage)}%
          </div>
          <div style={{ fontSize: '12px', color: '#718096' }}>
            Progreso
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="analytics-dashboard">
      {/* Progreso General */}
      <div className="analytics-card">
        <div className="analytics-header">
          <h3 className="analytics-title">Progreso de Carrera</h3>
          <Target className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {createProgressRing(progressPercentage, '#667eea')}
        </div>
        
        <div className="metric-grid">
          <div className="metric-item">
            <div className="metric-value">{mockAnalytics.completedCredits}</div>
            <div className="metric-label">Créditos Completados</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{mockAnalytics.totalCredits}</div>
            <div className="metric-label">Créditos Totales</div>
          </div>
        </div>
      </div>

      {/* Rendimiento Académico */}
      <div className="analytics-card">
        <div className="analytics-header">
          <h3 className="analytics-title">Rendimiento Académico</h3>
          <Award className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {createProgressRing((mockAnalytics.currentGPA / 4.0) * 100, '#48bb78')}
        </div>
        
        <div className="metric-grid">
          <div className="metric-item">
            <div className="metric-value">{mockAnalytics.currentGPA}</div>
            <div className="metric-label">GPA Actual</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">{mockAnalytics.averageGrade}</div>
            <div className="metric-label">Promedio</div>
          </div>
        </div>
      </div>

      {/* Progreso del Semestre */}
      <div className="analytics-card">
        <div className="analytics-header">
          <h3 className="analytics-title">Semestre Actual</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          {createProgressRing(mockAnalytics.semesterProgress, '#ed8936')}
        </div>
        
        <div className="metric-grid">
          <div className="metric-item">
            <div className="metric-value">13</div>
            <div className="metric-label">Créditos Inscritos</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">4</div>
            <div className="metric-label">Materias Cursando</div>
          </div>
        </div>
      </div>

      {/* Estadísticas de Estudio */}
      <div className="analytics-card">
        <div className="analytics-header">
          <h3 className="analytics-title">Hábitos de Estudio</h3>
          <BookOpen className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#667eea' }}>
              {mockAnalytics.studyHours}h
            </div>
            <div style={{ fontSize: '14px', color: '#718096' }}>
              Horas de estudio esta semana
            </div>
          </div>
          
          <div style={{ 
            background: '#f7fafc', 
            borderRadius: '12px', 
            padding: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#718096',
              marginBottom: '4px'
            }}>
              <span>Meta semanal: 30h</span>
              <span>{Math.round((mockAnalytics.studyHours / 30) * 100)}%</span>
            </div>
            <div style={{ 
              background: '#e2e8f0',
              height: '6px',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                background: '#667eea',
                height: '100%',
                width: `${Math.min((mockAnalytics.studyHours / 30) * 100, 100)}%`,
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>
        
        <div className="metric-grid">
          <div className="metric-item">
            <div className="metric-value">7</div>
            <div className="metric-label">Días Consecutivos</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">4.2h</div>
            <div className="metric-label">Promedio Diario</div>
          </div>
        </div>
      </div>

      {/* Ranking y Comparación */}
      <div className="analytics-card">
        <div className="analytics-header">
          <h3 className="analytics-title">Ranking</h3>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ 
            fontSize: '48px', 
            fontWeight: '700', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            #{mockAnalytics.rank}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            en tu cohorte de 156 estudiantes
          </div>
        </div>
        
        <div className="metric-grid">
          <div className="metric-item">
            <div className="metric-value">Top 8%</div>
            <div className="metric-label">Percentil</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">+3</div>
            <div className="metric-label">Posiciones este mes</div>
          </div>
        </div>
      </div>

      {/* Tendencias */}
      <div className="analytics-card" style={{ gridColumn: 'span 2' }}>
        <div className="analytics-header">
          <h3 className="analytics-title">Tendencias de Rendimiento</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          <div style={{ 
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '12px'
            }}>
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>
                Mejora Continua
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4' }}>
              Tu promedio ha mejorado consistentemente en los últimos 3 semestres.
            </div>
          </div>
          
          <div style={{ 
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '12px'
            }}>
              <Target className="w-4 h-4 text-blue-500" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>
                Meta Alcanzable
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4' }}>
              Al ritmo actual, podrías graduarte con un GPA de 3.9.
            </div>
          </div>
          
          <div style={{ 
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              marginBottom: '12px'
            }}>
              <Award className="w-4 h-4 text-yellow-500" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c' }}>
                Reconocimiento
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4' }}>
              Elegible para lista de honor académico este semestre.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
