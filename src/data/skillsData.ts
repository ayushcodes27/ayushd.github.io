export interface Skill {
  name: string
  category: 'AI & ML' | 'Backend & Systems' | 'Frontend & Web' | 'DevOps & Tools'
  iconText: string
  color: string
  pos: [number, number, number]
}

const rawSkills: Array<Omit<Skill, 'pos'>> = [
  { name: 'Java', category: 'Backend & Systems', iconText: 'JV', color: '#E76F00' },
  { name: 'Python', category: 'AI & ML', iconText: 'PY', color: '#3776AB' },
  { name: 'TypeScript', category: 'Frontend & Web', iconText: 'TS', color: '#3178C6' },
  { name: 'JavaScript', category: 'Frontend & Web', iconText: 'JS', color: '#F7DF1E' },
  { name: 'LangChain', category: 'AI & ML', iconText: 'LC', color: '#10B981' },
  { name: 'LangGraph', category: 'AI & ML', iconText: 'LG', color: '#38BDF8' },
  { name: 'FastAPI', category: 'Backend & Systems', iconText: 'FA', color: '#05998B' },
  { name: 'Docker', category: 'DevOps & Tools', iconText: 'DK', color: '#2496ED' },
  { name: 'Vector DBs', category: 'AI & ML', iconText: 'VB', color: '#4F46E5' },
  { name: 'PostgreSQL', category: 'Backend & Systems', iconText: 'PG', color: '#336791' },
  { name: 'Redis', category: 'Backend & Systems', iconText: 'RD', color: '#DC382D' },
  { name: 'Microservices', category: 'Backend & Systems', iconText: 'MS', color: '#0EA5E9' },
  { name: 'React', category: 'Frontend & Web', iconText: '⚛', color: '#61DAFB' },
  { name: 'Tailwind CSS', category: 'Frontend & Web', iconText: 'TW', color: '#06B6D4' },
  { name: 'Git', category: 'DevOps & Tools', iconText: 'GT', color: '#F05032' },
  { name: 'CI/CD', category: 'DevOps & Tools', iconText: 'CI', color: '#22C55E' },
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
