import React, { useState } from 'react';
import type { CourseNode } from '../types/CourseTree';
import { 
  Plus, 
  Minus, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Clock,
  Target,
  ShoppingCart
} from 'lucide-react';
import './EnrollmentPanel.css';

interface EnrollmentPanelProps {
  availableCourses: CourseNode[];
  selectedCourses: string[];
  onCourseSelection: (courseId: string, selected: boolean) => void;
  onEnrollment: () => void;
  maxCredits: number;
}

const EnrollmentPanel: React.FC<EnrollmentPanelProps> = ({
  availableCourses,
  selectedCourses,
  onCourseSelection,
  onEnrollment,
  maxCredits
}) => {
  const [filter, setFilter] = useState<'all' | 'mathematics' | 'programming' | 'systems' | 'elective' | 'complementary'>('all');

  const getAreaColor = (area: string) => {
    const areaColors = {
      mathematics: '#3b82f6',
      programming: '#10b981',
      systems: '#f59e0b',
      elective: '#8b5cf6',
      complementary: '#ef4444'
    };
    return areaColors[area as keyof typeof areaColors] || '#6b7280';
  };

  const getAreaName = (area: string) => {
    const areaNames = {
      mathematics: 'Matemáticas',
      programming: 'Programación',
      systems: 'Sistemas',
      elective: 'Electivas',
      complementary: 'Complementarias'
    };
    return areaNames[area as keyof typeof areaNames] || area;
  };

  const filteredCourses = filter === 'all' 
    ? availableCourses 
    : availableCourses.filter(course => course.area === filter);

  const selectedCoursesData = availableCourses.filter(course => 
    selectedCourses.includes(course.id)
  );

  const totalCredits = selectedCoursesData.reduce((total, course) => 
    total + course.credits, 0
  );

  const canEnroll = selectedCourses.length > 0 && totalCredits <= maxCredits;
  const isOverLimit = totalCredits > maxCredits;

  return (
    <div className="enrollment-panel">
      {/* Header con resumen */}
      <div className="enrollment-header">
        <div className="enrollment-summary">
          <div className="summary-item">
            <BookOpen className="summary-icon" />
            <div>
              <div className="summary-value">{selectedCourses.length}</div>
              <div className="summary-label">Materias Seleccionadas</div>
            </div>
          </div>
          
          <div className="summary-item">
            <Target className="summary-icon" />
            <div>
              <div className={`summary-value ${isOverLimit ? 'over-limit' : ''}`}>
                {totalCredits}/{maxCredits}
              </div>
              <div className="summary-label">Créditos</div>
            </div>
          </div>
          
          <div className="summary-item">
            <Clock className="summary-icon" />
            <div>
              <div className="summary-value">{availableCourses.length}</div>
              <div className="summary-label">Disponibles</div>
            </div>
          </div>
        </div>

        <button 
          className={`enroll-btn ${canEnroll ? 'active' : ''}`}
          disabled={!canEnroll}
          onClick={onEnrollment}
        >
          <ShoppingCart size={20} />
          Inscribir Materias
        </button>
      </div>

      {/* Filtros por área */}
      <div className="area-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas ({availableCourses.length})
        </button>
        {(['mathematics', 'programming', 'systems', 'elective', 'complementary'] as const).map(area => {
          const count = availableCourses.filter(c => c.area === area).length;
          return count > 0 ? (
            <button
              key={area}
              className={`filter-btn ${filter === area ? 'active' : ''}`}
              onClick={() => setFilter(area)}
              style={filter === area ? { 
                backgroundColor: getAreaColor(area),
                borderColor: getAreaColor(area),
                color: 'white'
              } : {}}
            >
              {getAreaName(area)} ({count})
            </button>
          ) : null;
        })}
      </div>

      {/* Lista de materias disponibles */}
      <div className="available-courses">
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} className="empty-icon" />
            <h3>No hay materias disponibles</h3>
            <p>
              {filter === 'all' 
                ? 'Has completado todas las materias disponibles para inscripción.'
                : `No hay materias de ${getAreaName(filter)} disponibles para inscripción.`
              }
            </p>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              const wouldExceedLimit = !isSelected && (totalCredits + course.credits) > maxCredits;
              
              return (
                <div 
                  key={course.id} 
                  className={`course-enrollment-card ${isSelected ? 'selected' : ''} ${wouldExceedLimit ? 'disabled' : ''}`}
                >
                  <div className="course-card-header">
                    <div className="course-info">
                      <div className="course-code" style={{ color: getAreaColor(course.area) }}>
                        {course.code}
                      </div>
                      <div className="course-name">{course.name}</div>
                    </div>
                    
                    <div className="course-actions">
                      <div className="credits-badge">
                        {course.credits} créditos
                      </div>
                      <button
                        className={`selection-btn ${isSelected ? 'selected' : ''}`}
                        disabled={wouldExceedLimit}
                        onClick={() => onCourseSelection(course.id, !isSelected)}
                      >
                        {isSelected ? <Minus size={16} /> : <Plus size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="course-description">
                    <p>{course.description}</p>
                  </div>

                  <div className="course-metadata">
                    <div className="metadata-item">
                      <span className="metadata-label">Semestre:</span>
                      <span className="metadata-value">{course.semester}</span>
                    </div>
                    <div className="metadata-item">
                      <span className="metadata-label">Área:</span>
                      <span 
                        className="metadata-value area-tag"
                        style={{ 
                          backgroundColor: getAreaColor(course.area) + '20',
                          color: getAreaColor(course.area)
                        }}
                      >
                        {getAreaName(course.area)}
                      </span>
                    </div>
                  </div>

                  <div className="course-skills">
                    <div className="skills-header">Competencias:</div>
                    <div className="skills-list">
                      {course.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 3 && (
                        <span className="more-skills">
                          +{course.skills.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {wouldExceedLimit && (
                    <div className="limit-warning">
                      <AlertCircle size={16} />
                      Excede el límite de créditos
                    </div>
                  )}

                  {isSelected && (
                    <div className="selected-indicator">
                      <CheckCircle size={16} />
                      Seleccionada para inscripción
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Carrito de inscripción */}
      {selectedCourses.length > 0 && (
        <div className="enrollment-cart">
          <div className="cart-header">
            <h3>Materias Seleccionadas ({selectedCourses.length})</h3>
            <div className={`total-credits ${isOverLimit ? 'over-limit' : ''}`}>
              {totalCredits}/{maxCredits} créditos
            </div>
          </div>
          
          <div className="cart-items">
            {selectedCoursesData.map(course => (
              <div key={course.id} className="cart-item">
                <div className="cart-course-info">
                  <span className="cart-course-code">{course.code}</span>
                  <span className="cart-course-name">{course.name}</span>
                </div>
                <div className="cart-course-credits">{course.credits} créditos</div>
                <button 
                  className="remove-btn"
                  onClick={() => onCourseSelection(course.id, false)}
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>

          {isOverLimit && (
            <div className="cart-warning">
              <AlertCircle size={16} />
              Has excedido el límite de {maxCredits} créditos. Reduce tu selección.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnrollmentPanel;
