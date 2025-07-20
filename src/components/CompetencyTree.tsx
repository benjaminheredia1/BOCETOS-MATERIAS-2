import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  BookOpen,
  Zap,
  Target,
  Award
} from 'lucide-react';
import type { CourseNode, StudentProgress, CompetencyArea } from '../types/CourseTree';
import { courseNodes, competencyAreas, treeConnections } from '../data/competencyTree';
import './CompetencyTree-Professional.css';

interface CompetencyTreeProps {
  studentProgress: StudentProgress;
  onCourseClick: (course: CourseNode) => void;
}

const CompetencyTree: React.FC<CompetencyTreeProps> = ({ 
  studentProgress, 
  onCourseClick 
}) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseNode | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcular el estado de cada curso basado en el progreso del estudiante
  const getCourseStatus = (course: CourseNode): CourseNode['status'] => {
    if (studentProgress.completedCourses.includes(course.id)) {
      return 'passed';
    }
    
    if (studentProgress.enrolledCourses?.includes(course.id)) {
      return 'enrolled';
    }
    
    if (studentProgress.failedCourses?.includes(course.id)) {
      return 'failed';
    }
    
    // Verificar si todas las materias prerequisito están completadas
    const prerequisitesMet = course.prerequisites.every(prereq => 
      studentProgress.completedCourses.includes(prereq)
    );
    
    if (!prerequisitesMet) {
      return 'locked';
    }
    
    return 'available';
  };

  // Obtener el ícono según el estado del curso
  const getCourseIcon = (status: CourseNode['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5" />;
      case 'enrolled':
        return <BookOpen className="w-5 h-5" />;
      case 'locked':
        return <Lock className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  // Obtener el color del área de competencia
  const getAreaColor = (areaId: string) => {
    const area = competencyAreas.find(a => a.id === areaId);
    return area?.color || '#6B7280';
  };

  // Calcular conexiones visibles
  const getVisibleConnections = () => {
    return treeConnections.filter(connection => {
      const fromCourse = courseNodes.find(c => c.id === connection.from);
      const toCourse = courseNodes.find(c => c.id === connection.to);
      
      if (!fromCourse || !toCourse) return false;
      
      // Mostrar solo si el área está seleccionada o no hay filtro
      if (selectedArea) {
        return fromCourse.area === selectedArea || toCourse.area === selectedArea;
      }
      
      return true;
    });
  };

  // Filtrar cursos por área seleccionada
  const getVisibleCourses = () => {
    if (selectedArea) {
      return courseNodes.filter(course => course.area === selectedArea);
    }
    return courseNodes;
  };

  const handleCourseClick = (course: CourseNode) => {
    const status = getCourseStatus(course);
    const updatedCourse = { ...course, status };
    setSelectedCourse(updatedCourse);
    onCourseClick(updatedCourse);
  };

  const calculateCredits = () => {
    return studentProgress.completedCourses.reduce((total, courseId) => {
      const course = courseNodes.find(c => c.id === courseId);
      return total + (course?.xpValue || 0);
    }, 0);
  };

  const calculateSemester = () => {
    const credits = calculateCredits();
    return Math.floor(credits / 1000) + 1;
  };

  const calculateProgress = () => {
    const totalCourses = courseNodes.length;
    const completedCourses = studentProgress.completedCourses.length;
    return Math.round((completedCourses / totalCourses) * 100);
  };

  return (
    <div className="competency-tree-container" ref={containerRef}>
      {/* Header con estadísticas del estudiante */}
      <div className="student-stats-header">
        <div className="stats-grid">
          <div className="stat-item">
            <Zap className="stat-icon" />
            <div>
              <div className="stat-value">{calculateCredits()}</div>
              <div className="stat-label">Créditos</div>
            </div>
          </div>
          <div className="stat-item">
            <Trophy className="stat-icon" />
            <div>
              <div className="stat-value">Semestre {calculateSemester()}</div>
              <div className="stat-label">Progreso</div>
            </div>
          </div>
          <div className="stat-item">
            <Target className="stat-icon" />
            <div>
              <div className="stat-value">{calculateProgress()}%</div>
              <div className="stat-label">Completado</div>
            </div>
          </div>
          <div className="stat-item">
            <Award className="stat-icon" />
            <div>
              <div className="stat-value">{studentProgress.achievements.length}</div>
              <div className="stat-label">Logros</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros por área de competencia */}
      <div className="competency-filters">
        <button
          className={`filter-btn ${!selectedArea ? 'active' : ''}`}
          onClick={() => setSelectedArea(null)}
        >
          🌟 Todas las Áreas
        </button>
        {competencyAreas.map(area => (
          <button
            key={area.id}
            className={`filter-btn ${selectedArea === area.id ? 'active' : ''}`}
            onClick={() => setSelectedArea(area.id)}
            style={{ 
              '--area-color': area.color,
              backgroundColor: selectedArea === area.id ? area.color : undefined
            } as React.CSSProperties}
          >
            {area.icon} {area.name}
          </button>
        ))}
      </div>

      {/* Contenedor del árbol con zoom y pan */}
      <div 
        className="tree-canvas"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`
        }}
      >
        {/* Conexiones SVG */}
        <svg className="tree-connections" viewBox="0 0 800 1000">
          {getVisibleConnections().map((connection, index) => {
            const fromCourse = courseNodes.find(c => c.id === connection.from);
            const toCourse = courseNodes.find(c => c.id === connection.to);
            
            if (!fromCourse || !toCourse) return null;
            
            const fromStatus = getCourseStatus(fromCourse);
            const toStatus = getCourseStatus(toCourse);
            
            // Determinar el estilo de la conexión
            const isUnlocked = fromStatus === 'passed';
            const connectionClass = `connection ${connection.type} ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            return (
              <motion.line
                key={`${connection.from}-${connection.to}-${index}`}
                x1={fromCourse.position.x + 50}
                y1={fromCourse.position.y + 50}
                x2={toCourse.position.x + 50}
                y2={toCourse.position.y + 50}
                className={connectionClass}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                strokeWidth={connection.strength * 3}
              />
            );
          })}
        </svg>

        {/* Nodos de cursos */}
        <div className="course-nodes">
          {getVisibleCourses().map((course, index) => {
            const status = getCourseStatus(course);
            const areaColor = getAreaColor(course.area);
            const area = competencyAreas.find(a => a.id === course.area);
            
            return (
              <motion.div
                key={course.id}
                className={`course-node ${status} ${hoveredCourse === course.id ? 'hovered' : ''}`}
                style={{
                  left: course.position.x,
                  top: course.position.y,
                  '--area-color': areaColor
                } as React.CSSProperties}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCourseClick(course)}
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div className="course-icon">
                  {getCourseIcon(status)}
                </div>
                
                <div className="course-content">
                  <div className="course-code">{course.code}</div>
                  <div className="course-name">{course.name}</div>
                  <div className="course-meta">
                    <span className="course-credits">{course.credits} créditos</span>
                    <span className="course-points">+{course.xpValue} pts</span>
                  </div>
                </div>

                <div className="course-area-indicator" style={{ backgroundColor: areaColor }}>
                  {area?.icon}
                </div>

                {/* Indicador de prerequisitos */}
                {course.prerequisites.length > 0 && (
                  <div className="prerequisites-indicator">
                    <div className="prereq-count">{course.prerequisites.length}</div>
                  </div>
                )}

                {/* Efecto de hover */}
                <AnimatePresence>
                  {hoveredCourse === course.id && (
                    <motion.div
                      className="course-tooltip"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="tooltip-header">
                        <strong>{course.name}</strong>
                        <span className="tooltip-code">{course.code}</span>
                      </div>
                      <p className="tooltip-description">{course.description}</p>
                      <div className="tooltip-skills">
                        <strong>Habilidades:</strong>
                        <div className="skills-list">
                          {course.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                      {course.prerequisites.length > 0 && (
                        <div className="tooltip-prereqs">
                          <strong>Prerequisitos:</strong> {course.prerequisites.join(', ')}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controles de zoom */}
      <div className="zoom-controls">
        <button onClick={() => setZoom(Math.min(zoom + 0.1, 2))}>+</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}>-</button>
      </div>
    </div>
  );
};

export default CompetencyTree;
