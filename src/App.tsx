import React, { useState } from 'react';
import type { StudentProgress } from './types/CourseTree';
import EnrollmentSystem from './components/EnrollmentSystem';
import AdminPanel from './components/AdminPanel';
import { Users, User } from 'lucide-react';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'student' | 'admin'>('admin');
  
  // Datos de ejemplo del estudiante
  const studentProgress: StudentProgress = {
    totalXP: 2400,
    level: 3,
    completedCourses: [
      'calc1', 'algebra', 'prog1', 'intro-ing'
    ],
    enrolledCourses: [
      'calc2', 'prog2'
    ],
    failedCourses: [
      'fisica1'
    ],
    currentSemester: 3,
    gpa: 3.8,
    achievements: []
  };

  return (
    <div className="App">
      {/* Selector de vista */}
      <div className="view-selector">
        <button 
          className={`view-btn ${viewMode === 'admin' ? 'active' : ''}`}
          onClick={() => setViewMode('admin')}
        >
          <Users size={20} />
          Panel Administrativo
        </button>
        <button 
          className={`view-btn ${viewMode === 'student' ? 'active' : ''}`}
          onClick={() => setViewMode('student')}
        >
          <User size={20} />
          Vista Estudiante
        </button>
      </div>

      {/* Contenido basado en el modo de vista */}
      {viewMode === 'admin' ? (
        <AdminPanel />
      ) : (
        <EnrollmentSystem
          studentId="2021-1234"
          studentName="María García Rodríguez"
          initialProgress={studentProgress}
        />
      )}
    </div>
  );
}

export default App;
