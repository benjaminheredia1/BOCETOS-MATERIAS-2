export interface CourseNode {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
  area: 'mathematics' | 'programming' | 'systems' | 'elective' | 'complementary';
  status: 'locked' | 'available' | 'enrolled' | 'passed' | 'failed';
  prerequisites: string[];
  unlocks: string[];
  position: { x: number; y: number };
  description: string;
  skills: string[];
  xpValue: number; // Experiencia que otorga al completar
}

export interface StudentProgress {
  totalXP: number;
  level: number;
  completedCourses: string[];
  enrolledCourses: string[];
  failedCourses: string[];
  currentSemester: number;
  gpa: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TreeConnection {
  from: string;
  to: string;
  type: 'prerequisite' | 'recommended' | 'alternative';
  strength: number; // 0-1, qué tan importante es esta conexión
}

export interface CompetencyArea {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
  courses: string[];
  requiredForGraduation: number; // Mínimo de materias requeridas
}
