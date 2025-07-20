import React, { useState } from 'react';
import type { CourseNode, StudentProgress } from '../types/CourseTree';
import CompetencyTree from './CompetencyTree';
import FailedCourses from './FailedCourses';
import EnrollmentPanel from './EnrollmentPanel';
import { courseNodes } from '../data/competencyTree';
import './EnrollmentSystem.css';

interface EnrollmentSystemProps {
  studentId: string;
  studentName: string;
  initialProgress: StudentProgress;
}

const EnrollmentSystem: React.FC<EnrollmentSystemProps> = ({
  studentId,
  studentName,
  initialProgress
}) => {
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(initialProgress);
  const [activeTab, setActiveTab] = useState<'pensum' | 'failed' | 'enroll'>('pensum');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Calcular materias disponibles para inscribir
  const getAvailableCourses = (): CourseNode[] => {
    return courseNodes.filter(course => {
      // No debe estar ya completada, inscrita o reprobada
      if (studentProgress.completedCourses.includes(course.id) ||
          studentProgress.enrolledCourses.includes(course.id) ||
          studentProgress.failedCourses.includes(course.id)) {
        return false;
      }

      // Verificar que tenga todos los prerrequisitos completados
      if (course.prerequisites.length > 0) {
        return course.prerequisites.every(prereq => 
          studentProgress.completedCourses.includes(prereq)
        );
      }

      return true;
    });
  };

  // Calcular materias reprobadas
  const getFailedCourses = (): CourseNode[] => {
    return courseNodes.filter(course => 
      studentProgress.failedCourses.includes(course.id)
    );
  };

  // Determinar el estado de un curso
  const getCourseStatus = (courseId: string): 'passed' | 'enrolled' | 'failed' | 'available' | 'locked' => {
    if (studentProgress.completedCourses.includes(courseId)) return 'passed';
    if (studentProgress.enrolledCourses.includes(courseId)) return 'enrolled';
    if (studentProgress.failedCourses.includes(courseId)) return 'failed';
    
    const course = courseNodes.find(c => c.id === courseId);
    if (!course) return 'locked';
    
    // Verificar prerrequisitos
    if (course.prerequisites.length > 0) {
      const hasPrerequisites = course.prerequisites.every(prereq => 
        studentProgress.completedCourses.includes(prereq)
      );
      return hasPrerequisites ? 'available' : 'locked';
    }
    
    return 'available';
  };

  // Manejar selección de cursos para inscripción
  const handleCourseSelection = (courseId: string, selected: boolean) => {
    if (selected) {
      setSelectedCourses([...selectedCourses, courseId]);
    } else {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    }
  };

  // Procesar inscripción
  const handleEnrollment = () => {
    const newProgress = {
      ...studentProgress,
      enrolledCourses: [...studentProgress.enrolledCourses, ...selectedCourses]
    };
    setStudentProgress(newProgress);
    setSelectedCourses([]);
    setActiveTab('pensum');
  };

  // Manejar click en curso desde el árbol
  const handleCourseClick = (course: CourseNode) => {
    const status = getCourseStatus(course.id);
    if (status === 'available') {
      setActiveTab('enroll');
      if (!selectedCourses.includes(course.id)) {
        setSelectedCourses([...selectedCourses, course.id]);
      }
    }
  };

  return (
    <div className="enrollment-system">
      {/* Header del estudiante */}
      <div className="student-header">
        <div className="student-info">
          <h1>{studentName}</h1>
          <p>ID: {studentId}</p>
        </div>
        
        {/* Navegación de pestañas */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'pensum' ? 'active' : ''}`}
            onClick={() => setActiveTab('pensum')}
          >
            Pensum Completo
          </button>
          <button 
            className={`tab-btn ${activeTab === 'failed' ? 'active' : ''}`}
            onClick={() => setActiveTab('failed')}
          >
            Materias Vencidas ({getFailedCourses().length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'enroll' ? 'active' : ''}`}
            onClick={() => setActiveTab('enroll')}
          >
            Inscribir Materias ({getAvailableCourses().length})
          </button>
        </div>
      </div>

      {/* Contenido basado en la pestaña activa */}
      <div className="tab-content">
        {activeTab === 'pensum' && (
          <CompetencyTree
            studentProgress={studentProgress}
            onCourseClick={handleCourseClick}
          />
        )}
        
        {activeTab === 'failed' && (
          <FailedCourses
            failedCourses={getFailedCourses()}
            studentProgress={studentProgress}
            onRetakeAction={(courseId) => {
              // Permitir reinscripción de materia reprobada
              const newProgress = {
                ...studentProgress,
                failedCourses: studentProgress.failedCourses.filter(id => id !== courseId),
                enrolledCourses: [...studentProgress.enrolledCourses, courseId]
              };
              setStudentProgress(newProgress);
            }}
          />
        )}
        
        {activeTab === 'enroll' && (
          <EnrollmentPanel
            availableCourses={getAvailableCourses()}
            selectedCourses={selectedCourses}
            onCourseSelection={handleCourseSelection}
            onEnrollment={handleEnrollment}
            maxCredits={18} // Límite de créditos por semestre
          />
        )}
      </div>
    </div>
  );
};

export default EnrollmentSystem;
