import React from 'react';
import type { CourseNode, StudentProgress } from '../types/CourseTree';
import './CompetencyTree-Professional.css';

interface CompetencyTreeProps {
  studentProgress: StudentProgress;
  onCourseClick: (course: CourseNode) => void;
}

const CompetencyTree: React.FC<CompetencyTreeProps> = () => {
  return (
    <div className="competency-tree-container">
      <div style={{
        padding: '40px',
        textAlign: 'center',
        background: 'white',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ color: '#1a202c', marginBottom: '16px' }}>
          Árbol de Competencias
        </h2>
        <p style={{ color: '#718096' }}>
          Componente en desarrollo para visualización del árbol de competencias académicas
        </p>
      </div>
    </div>
  );
};

export default CompetencyTree;
