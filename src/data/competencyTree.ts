import type { CourseNode, CompetencyArea, TreeConnection } from '../types/CourseTree';

export const competencyAreas: CompetencyArea[] = [
  {
    id: 'mathematics',
    name: 'Fundamentos Matemáticos',
    color: '#3B82F6',
    icon: '📐',
    description: 'Base matemática sólida para el desarrollo de software',
    courses: ['MAT101', 'MAT102', 'EST101', 'MAT201', 'MAT301'],
    requiredForGraduation: 5
  },
  {
    id: 'programming',
    name: 'Desarrollo de Software',
    color: '#10B981',
    icon: '💻',
    description: 'Habilidades de programación y desarrollo',
    courses: ['PRG101', 'PRG201', 'PRG301', 'PRG401', 'WEB201', 'WEB301'],
    requiredForGraduation: 6
  },
  {
    id: 'systems',
    name: 'Arquitectura de Sistemas',
    color: '#F59E0B',
    icon: '🏗️',
    description: 'Diseño y arquitectura de sistemas complejos',
    courses: ['SIS201', 'SIS301', 'SIS401', 'RED201', 'BD201', 'BD301'],
    requiredForGraduation: 6
  },
  {
    id: 'elective',
    name: 'Especialización',
    color: '#8B5CF6',
    icon: '🎯',
    description: 'Áreas de especialización avanzada',
    courses: ['IA301', 'SEG301', 'MOV301', 'GAME301'],
    requiredForGraduation: 2
  },
  {
    id: 'complementary',
    name: 'Habilidades Blandas',
    color: '#EF4444',
    icon: '👥',
    description: 'Competencias transversales y gestión',
    courses: ['COM101', 'GES201', 'ING101', 'ETI201'],
    requiredForGraduation: 4
  }
];

export const courseNodes: CourseNode[] = [
  // Primer Semestre - Fundamentos
  {
    id: 'MAT101',
    name: 'Matemáticas Básicas',
    code: 'MAT101',
    credits: 4,
    semester: 1,
    area: 'mathematics',
    status: 'available',
    prerequisites: [],
    unlocks: ['MAT102', 'PRG101'],
    position: { x: 100, y: 100 },
    description: 'Fundamentos de álgebra y trigonometría',
    skills: ['Álgebra', 'Trigonometría', 'Lógica Matemática'],
    xpValue: 100
  },
  {
    id: 'PRG101',
    name: 'Introducción a la Programación',
    code: 'PRG101',
    credits: 4,
    semester: 1,
    area: 'programming',
    status: 'locked',
    prerequisites: ['MAT101'],
    unlocks: ['PRG201', 'SIS201'],
    position: { x: 300, y: 150 },
    description: 'Conceptos básicos de programación con Python',
    skills: ['Python', 'Algoritmos Básicos', 'Estructuras de Control'],
    xpValue: 120
  },
  {
    id: 'COM101',
    name: 'Comunicación Efectiva',
    code: 'COM101',
    credits: 3,
    semester: 1,
    area: 'complementary',
    status: 'available',
    prerequisites: [],
    unlocks: ['GES201'],
    position: { x: 500, y: 100 },
    description: 'Habilidades de comunicación oral y escrita',
    skills: ['Comunicación Oral', 'Redacción', 'Presentaciones'],
    xpValue: 80
  },

  // Segundo Semestre
  {
    id: 'MAT102',
    name: 'Cálculo Diferencial',
    code: 'MAT102',
    credits: 4,
    semester: 2,
    area: 'mathematics',
    status: 'locked',
    prerequisites: ['MAT101'],
    unlocks: ['MAT201', 'EST101'],
    position: { x: 100, y: 250 },
    description: 'Límites, derivadas y aplicaciones',
    skills: ['Límites', 'Derivadas', 'Optimización'],
    xpValue: 110
  },
  {
    id: 'PRG201',
    name: 'Programación Orientada a Objetos',
    code: 'PRG201',
    credits: 4,
    semester: 2,
    area: 'programming',
    status: 'locked',
    prerequisites: ['PRG101'],
    unlocks: ['PRG301', 'WEB201'],
    position: { x: 300, y: 300 },
    description: 'Paradigma de programación orientada a objetos con Java',
    skills: ['Java', 'POO', 'Encapsulación', 'Herencia', 'Polimorfismo'],
    xpValue: 140
  },
  {
    id: 'SIS201',
    name: 'Fundamentos de Sistemas',
    code: 'SIS201',
    credits: 3,
    semester: 2,
    area: 'systems',
    status: 'locked',
    prerequisites: ['PRG101'],
    unlocks: ['SIS301', 'RED201'],
    position: { x: 450, y: 250 },
    description: 'Conceptos básicos de sistemas de información',
    skills: ['Análisis de Sistemas', 'Modelado', 'UML'],
    xpValue: 100
  },

  // Tercer Semestre
  {
    id: 'MAT201',
    name: 'Cálculo Integral',
    code: 'MAT201',
    credits: 4,
    semester: 3,
    area: 'mathematics',
    status: 'locked',
    prerequisites: ['MAT102'],
    unlocks: ['MAT301'],
    position: { x: 100, y: 400 },
    description: 'Integrales y aplicaciones en geometría',
    skills: ['Integrales', 'Áreas', 'Volúmenes'],
    xpValue: 120
  },
  {
    id: 'EST101',
    name: 'Estadística y Probabilidad',
    code: 'EST101',
    credits: 3,
    semester: 3,
    area: 'mathematics',
    status: 'locked',
    prerequisites: ['MAT102'],
    unlocks: ['IA301'],
    position: { x: 250, y: 400 },
    description: 'Conceptos estadísticos para análisis de datos',
    skills: ['Estadística Descriptiva', 'Probabilidad', 'Distribuciones'],
    xpValue: 110
  },
  {
    id: 'PRG301',
    name: 'Estructuras de Datos',
    code: 'PRG301',
    credits: 4,
    semester: 3,
    area: 'programming',
    status: 'locked',
    prerequisites: ['PRG201'],
    unlocks: ['PRG401', 'BD201'],
    position: { x: 300, y: 450 },
    description: 'Estructuras de datos avanzadas y algoritmos',
    skills: ['Listas', 'Árboles', 'Grafos', 'Hash Tables', 'Algoritmos'],
    xpValue: 160
  },
  {
    id: 'WEB201',
    name: 'Desarrollo Web Frontend',
    code: 'WEB201',
    credits: 4,
    semester: 3,
    area: 'programming',
    status: 'locked',
    prerequisites: ['PRG201'],
    unlocks: ['WEB301'],
    position: { x: 450, y: 400 },
    description: 'HTML, CSS, JavaScript y frameworks modernos',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
    xpValue: 150
  },

  // Cuarto Semestre
  {
    id: 'BD201',
    name: 'Bases de Datos',
    code: 'BD201',
    credits: 4,
    semester: 4,
    area: 'systems',
    status: 'locked',
    prerequisites: ['PRG301'],
    unlocks: ['BD301', 'WEB301'],
    position: { x: 200, y: 550 },
    description: 'Diseño y gestión de bases de datos relacionales',
    skills: ['SQL', 'Modelado ER', 'Normalización', 'MySQL'],
    xpValue: 140
  },
  {
    id: 'PRG401',
    name: 'Ingeniería de Software',
    code: 'PRG401',
    credits: 4,
    semester: 4,
    area: 'programming',
    status: 'locked',
    prerequisites: ['PRG301'],
    unlocks: ['SEG301', 'MOV301'],
    position: { x: 350, y: 550 },
    description: 'Metodologías de desarrollo de software',
    skills: ['Scrum', 'Git', 'Testing', 'Clean Code', 'Patrones de Diseño'],
    xpValue: 170
  },
  {
    id: 'RED201',
    name: 'Redes de Computadoras',
    code: 'RED201',
    credits: 3,
    semester: 4,
    area: 'systems',
    status: 'locked',
    prerequisites: ['SIS201'],
    unlocks: ['SIS401', 'SEG301'],
    position: { x: 500, y: 550 },
    description: 'Protocolos de red y comunicación',
    skills: ['TCP/IP', 'HTTP/HTTPS', 'DNS', 'Routing', 'Network Security'],
    xpValue: 130
  },

  // Materias Avanzadas (5to semestre en adelante)
  {
    id: 'WEB301',
    name: 'Desarrollo Full Stack',
    code: 'WEB301',
    credits: 5,
    semester: 5,
    area: 'programming',
    status: 'locked',
    prerequisites: ['WEB201', 'BD201'],
    unlocks: [],
    position: { x: 400, y: 650 },
    description: 'Desarrollo completo de aplicaciones web',
    skills: ['Node.js', 'Express', 'APIs REST', 'Authentication', 'Deployment'],
    xpValue: 200
  },
  {
    id: 'IA301',
    name: 'Inteligencia Artificial',
    code: 'IA301',
    credits: 4,
    semester: 6,
    area: 'elective',
    status: 'locked',
    prerequisites: ['EST101', 'PRG301'],
    unlocks: [],
    position: { x: 150, y: 700 },
    description: 'Algoritmos de IA y machine learning',
    skills: ['Machine Learning', 'Neural Networks', 'Python AI', 'Data Science'],
    xpValue: 250
  },
  {
    id: 'SEG301',
    name: 'Ciberseguridad',
    code: 'SEG301',
    credits: 4,
    semester: 6,
    area: 'elective',
    status: 'locked',
    prerequisites: ['PRG401', 'RED201'],
    unlocks: [],
    position: { x: 300, y: 700 },
    description: 'Seguridad informática y ethical hacking',
    skills: ['Ethical Hacking', 'Cryptography', 'Network Security', 'Penetration Testing'],
    xpValue: 230
  },
  {
    id: 'MOV301',
    name: 'Desarrollo Móvil',
    code: 'MOV301',
    credits: 4,
    semester: 6,
    area: 'elective',
    status: 'locked',
    prerequisites: ['PRG401'],
    unlocks: [],
    position: { x: 450, y: 700 },
    description: 'Aplicaciones móviles nativas e híbridas',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UX'],
    xpValue: 220
  }
];

export const treeConnections: TreeConnection[] = [
  // Conexiones matemáticas
  { from: 'MAT101', to: 'MAT102', type: 'prerequisite', strength: 1.0 },
  { from: 'MAT102', to: 'MAT201', type: 'prerequisite', strength: 1.0 },
  { from: 'MAT102', to: 'EST101', type: 'prerequisite', strength: 0.8 },
  
  // Conexiones de programación
  { from: 'MAT101', to: 'PRG101', type: 'prerequisite', strength: 0.7 },
  { from: 'PRG101', to: 'PRG201', type: 'prerequisite', strength: 1.0 },
  { from: 'PRG201', to: 'PRG301', type: 'prerequisite', strength: 1.0 },
  { from: 'PRG201', to: 'WEB201', type: 'prerequisite', strength: 0.8 },
  { from: 'PRG301', to: 'PRG401', type: 'prerequisite', strength: 1.0 },
  { from: 'PRG301', to: 'BD201', type: 'prerequisite', strength: 0.9 },
  
  // Conexiones de sistemas
  { from: 'PRG101', to: 'SIS201', type: 'prerequisite', strength: 0.8 },
  { from: 'SIS201', to: 'RED201', type: 'prerequisite', strength: 0.9 },
  
  // Conexiones a materias avanzadas
  { from: 'WEB201', to: 'WEB301', type: 'prerequisite', strength: 0.9 },
  { from: 'BD201', to: 'WEB301', type: 'prerequisite', strength: 0.8 },
  { from: 'EST101', to: 'IA301', type: 'prerequisite', strength: 0.9 },
  { from: 'PRG301', to: 'IA301', type: 'prerequisite', strength: 0.8 },
  { from: 'PRG401', to: 'SEG301', type: 'prerequisite', strength: 0.8 },
  { from: 'RED201', to: 'SEG301', type: 'prerequisite', strength: 0.9 },
  { from: 'PRG401', to: 'MOV301', type: 'prerequisite', strength: 0.9 },
  
  // Conexiones recomendadas
  { from: 'COM101', to: 'GES201', type: 'recommended', strength: 0.6 },
  { from: 'PRG401', to: 'WEB301', type: 'recommended', strength: 0.7 }
];
