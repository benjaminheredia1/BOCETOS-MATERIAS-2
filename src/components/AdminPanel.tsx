import React, { useState } from 'react';
import type { StudentProgress } from '../types/CourseTree';
import { Search, User, BookOpen, Edit3, Eye, Filter } from 'lucide-react';
import EnrollmentSystem from './EnrollmentSystem';
import './AdminPanel.css';

interface Student {
  id: string;
  name: string;
  email: string;
  program: string;
  semester: number;
  gpa: number;
  status: 'active' | 'inactive' | 'graduated';
  progress: StudentProgress;
  lastActivity: Date;
}

const AdminPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterProgram, setFilterProgram] = useState<string>('all');
  const [filterSemester, setFilterSemester] = useState<string>('all');
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Datos de ejemplo de estudiantes
  const [students] = useState<Student[]>([
    {
      id: '2021-1234',
      name: 'María García Rodríguez',
      email: 'maria.garcia@universidad.edu',
      program: 'Ingeniería de Sistemas',
      semester: 6,
      gpa: 3.8,
      status: 'active',
      lastActivity: new Date('2025-01-15'),
      progress: {
        totalXP: 2400,
        level: 3,
        completedCourses: ['calc1', 'algebra', 'prog1', 'intro-ing', 'calc2', 'prog2'],
        enrolledCourses: ['estructura-datos', 'calculo3'],
        failedCourses: ['fisica1'],
        currentSemester: 6,
        gpa: 3.8,
        achievements: []
      }
    },
    {
      id: '2020-5678',
      name: 'Carlos López Hernández',
      email: 'carlos.lopez@universidad.edu',
      program: 'Ingeniería de Sistemas',
      semester: 8,
      gpa: 4.1,
      status: 'active',
      lastActivity: new Date('2025-01-18'),
      progress: {
        totalXP: 4200,
        level: 5,
        completedCourses: ['calc1', 'algebra', 'prog1', 'intro-ing', 'calc2', 'prog2', 'estructura-datos', 'calculo3', 'bd1', 'redes1'],
        enrolledCourses: ['ing-software', 'so1'],
        failedCourses: [],
        currentSemester: 8,
        gpa: 4.1,
        achievements: []
      }
    },
    {
      id: '2022-9012',
      name: 'Ana Martínez Silva',
      email: 'ana.martinez@universidad.edu',
      program: 'Ingeniería Industrial',
      semester: 4,
      gpa: 3.5,
      status: 'active',
      lastActivity: new Date('2025-01-16'),
      progress: {
        totalXP: 1800,
        level: 2,
        completedCourses: ['calc1', 'algebra', 'fisica1', 'quimica'],
        enrolledCourses: ['calc2', 'estadistica'],
        failedCourses: ['prog1'],
        currentSemester: 4,
        gpa: 3.5,
        achievements: []
      }
    },
    {
      id: '2023-3456',
      name: 'Diego Ramírez Castro',
      email: 'diego.ramirez@universidad.edu',
      program: 'Ingeniería de Sistemas',
      semester: 2,
      gpa: 3.9,
      status: 'active',
      lastActivity: new Date('2025-01-19'),
      progress: {
        totalXP: 600,
        level: 1,
        completedCourses: ['intro-ing', 'algebra'],
        enrolledCourses: ['calc1', 'prog1'],
        failedCourses: [],
        currentSemester: 2,
        gpa: 3.9,
        achievements: []
      }
    }
  ]);

  // Filtrar estudiantes
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram;
    const matchesSemester = filterSemester === 'all' || student.semester.toString() === filterSemester;
    
    return matchesSearch && matchesProgram && matchesSemester;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: '#10b981', bg: '#ecfdf5', text: 'Activo' },
      inactive: { color: '#f59e0b', bg: '#fffbeb', text: 'Inactivo' },
      graduated: { color: '#3b82f6', bg: '#eff6ff', text: 'Graduado' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span 
        className="status-badge"
        style={{ 
          color: config.color, 
          backgroundColor: config.bg,
          border: `1px solid ${config.color}20`
        }}
      >
        {config.text}
      </span>
    );
  };

  const handleEnrollStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsEnrolling(true);
  };

  const handleBackToAdmin = () => {
    setSelectedStudent(null);
    setIsEnrolling(false);
  };

  const programs = [...new Set(students.map(s => s.program))];
  const semesters = [...new Set(students.map(s => s.semester))].sort((a, b) => a - b);

  if (isEnrolling && selectedStudent) {
    return (
      <div className="admin-enrollment-wrapper">
        <div className="admin-header">
          <button className="back-btn" onClick={handleBackToAdmin}>
            ← Volver a Administración
          </button>
          <h2>Inscripción de Materias - {selectedStudent.name}</h2>
        </div>
        <EnrollmentSystem
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          initialProgress={selectedStudent.progress}
        />
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Header administrativo */}
      <div className="admin-panel-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Panel Administrativo</h1>
            <p>Gestión de estudiantes e inscripción de materias</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-number">{students.length}</div>
              <div className="stat-label">Estudiantes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{students.filter(s => s.status === 'active').length}</div>
              <div className="stat-label">Activos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{programs.length}</div>
              <div className="stat-label">Programas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="search-and-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, ID o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los programas</option>
              {programs.map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos los semestres</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>Semestre {semester}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="students-container">
        <div className="students-header">
          <h2>Estudiantes Encontrados ({filteredStudents.length})</h2>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <User size={48} className="empty-icon" />
            <h3>No se encontraron estudiantes</h3>
            <p>Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="students-grid">
            {filteredStudents.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-card-header">
                  <div className="student-avatar">
                    <User size={24} />
                  </div>
                  <div className="student-basic-info">
                    <h3>{student.name}</h3>
                    <p className="student-id">ID: {student.id}</p>
                    <p className="student-email">{student.email}</p>
                  </div>
                  {getStatusBadge(student.status)}
                </div>

                <div className="student-details">
                  <div className="detail-row">
                    <span className="detail-label">Programa:</span>
                    <span className="detail-value">{student.program}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Semestre:</span>
                    <span className="detail-value">{student.semester}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Promedio:</span>
                    <span className={`detail-value gpa ${student.gpa >= 4.0 ? 'excellent' : student.gpa >= 3.5 ? 'good' : 'average'}`}>
                      {student.gpa.toFixed(1)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Última actividad:</span>
                    <span className="detail-value">{student.lastActivity.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="student-progress">
                  <div className="progress-item">
                    <span className="progress-label">Completadas:</span>
                    <span className="progress-value">{student.progress.completedCourses.length}</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">Inscritas:</span>
                    <span className="progress-value enrolled">{student.progress.enrolledCourses.length}</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-label">Reprobadas:</span>
                    <span className="progress-value failed">{student.progress.failedCourses.length}</span>
                  </div>
                </div>

                <div className="student-actions">
                  <button 
                    className="action-btn primary"
                    onClick={() => handleEnrollStudent(student)}
                  >
                    <BookOpen size={16} />
                    Inscribir Materias
                  </button>
                  <button className="action-btn secondary">
                    <Eye size={16} />
                    Ver Detalle
                  </button>
                  <button className="action-btn secondary">
                    <Edit3 size={16} />
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
