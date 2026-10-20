export interface Skill {
  name: string
  category: 'AI & ML' | 'Backend & Systems' | 'Frontend & Web' | 'DevOps & Tools'
  iconText: string
  color: string
  pos: [number, number, number]
}

const rawSkills: Array<Omit<Skill, 'pos'>> = [
  { name: 'Java 21', category: 'Backend & Systems', iconText: 'JV', color: '#E76F00' },
  { name: 'Spring Boot', category: 'Backend & Systems', iconText: 'SB', color: '#6DB33F' },
  { name: 'Python', category: 'AI & ML', iconText: 'PY', color: '#3776AB' },
  { name: 'TypeScript', category: 'Frontend & Web', iconText: 'TS', color: '#3178C6' },
  { name: 'LangGraph', category: 'AI & ML', iconText: 'LG', color: '#38BDF8' },
  { name: 'FastAPI', category: 'Backend & Systems', iconText: 'FA', color: '#05998B' },
  { name: 'Kafka', category: 'Backend & Systems', iconText: 'KF', color: '#E11D48' },
  { name: 'DuckDB', category: 'Backend & Systems', iconText: 'DD', color: '#F59E0B' },
  { name: 'PostgreSQL', category: 'Backend & Systems', iconText: 'PG', color: '#336791' },
  { name: 'Redis', category: 'Backend & Systems', iconText: 'RD', color: '#DC382D' },
  { name: 'Docker', category: 'DevOps & Tools', iconText: 'DK', color: '#2496ED' },
  { name: 'React', category: 'Frontend & Web', iconText: '⚛', color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend & Web', iconText: 'NX', color: '#111827' },
  { name: 'XGBoost', category: 'AI & ML', iconText: 'XG', color: '#10B981' },
  { name: 'dbt Core', category: 'Backend & Systems', iconText: 'DB', color: '#FF694B' },
  { name: 'Airflow', category: 'DevOps & Tools', iconText: 'AF', color: '#017CEE' },
]

// Fibonacci sphere distribution with polar offset for even spacing across 16 skills
export function generateFibonacciSpherePoints(count: number, radius = 1.42): [number, number, number][] {
  const points: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 0.88 - (i / (count - 1)) * 1.76
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))

    const theta = phi * i

    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    points.push([x * radius, y * radius, z * radius])
  }

  return points
}

const points = generateFibonacciSpherePoints(rawSkills.length, 1.42)

export const skills: Skill[] = rawSkills.map((skill, index) => ({
  ...skill,
  pos: points[index],
}))
