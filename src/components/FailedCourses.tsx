import React from 'react';
import type { CourseNode, StudentProgress } from '../types/CourseTree';
import { AlertTriangle, RotateCcw, BookX, Clock } from 'lucide-react';
import './FailedCourses.css';

interface FailedCoursesProps {
  failedCourses: CourseNode[];
  studentProgress: StudentProgress;
  onRetakeAction: (courseId: string) => void;
}

const FailedCourses: React.FC<FailedCoursesProps> = ({
  failedCourses,
  studentProgress,
  onRetakeAction
}) => {
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
      elective: 'Electiva',
      complementary: 'Complementaria'
    };
    return areaNames[area as keyof typeof areaNames] || area;
  };

  if (failedCourses.length === 0) {
    return (
      <div className="failed-courses-container">
        <div className="empty-state">
          <BookX size={64} className="empty-icon" />
          <h2>¡Excelente!</h2>
          <p>No tienes materias reprobadas. Continúa con tu buen desempeño académico.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="failed-courses-container">
      <div className="failed-header">
        <div className="header-content">
          <AlertTriangle className="warning-icon" />
          <div>
            <h2>Materias Reprobadas</h2>
            <p>Estas materias requieren atención especial para continuar tu progreso académico</p>
          </div>
        </div>
        <div className="failed-stats">
          <div className="stat">
            <span className="stat-number">{failedCourses.length}</span>
            <span className="stat-label">Materias</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {failedCourses.reduce((total, course) => total + course.credits, 0)}
            </span>
            <span className="stat-label">Créditos</span>
          </div>
        </div>
      </div>

      <div className="failed-courses-grid">
        {failedCourses.map((course) => (
          <div key={course.id} className="failed-course-card">
            <div className="course-card-header">
              <div className="course-basic-info">
                <div className="course-code" style={{ color: getAreaColor(course.area) }}>
                  {course.code}
                </div>
                <div className="course-name">{course.name}</div>
              </div>
              <div className="course-area-badge" style={{ backgroundColor: getAreaColor(course.area) }}>
                {getAreaName(course.area)}
              </div>
            </div>

            <div className="course-details">
              <div className="detail-item">
                <Clock size={16} />
                <span>{course.credits} créditos</span>
              </div>
              <div className="detail-item">
                <BookX size={16} />
                <span>Semestre {course.semester}</span>
              </div>
            </div>

            <div className="course-description">
              <p>{course.description}</p>
            </div>

            <div className="course-skills">
              <strong>Competencias:</strong>
              <div className="skills-tags">
                {course.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="course-actions">
              <button
                className="retake-btn"
                onClick={() => onRetakeAction(course.id)}
              >
                <RotateCcw size={16} />
                Reinscribir Materia
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="retake-info">
        <div className="info-card">
          <h3>Información sobre Reinscripción</h3>
          <ul>
            <li>Puedes reinscribir materias reprobadas en cualquier momento</li>
            <li>La nueva calificación reemplazará la anterior en tu promedio</li>
            <li>Considera repasar los prerrequisitos antes de reinscribirte</li>
            <li>Contacta a tu asesor académico para planificar tu estrategia</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FailedCourses;
