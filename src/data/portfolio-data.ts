export interface PersonalInfo {
  name: string
  title: string
  bio: string
  photoUrl: string
  yearsExperience: number
}

export interface Skill {
  name: string
  level: number // 1-100
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  email?: string
}

export interface PortfolioData {
  personal: PersonalInfo
  skills: Skill[]
  projects: Project[]
  social: SocialLinks
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Elias',
    title: 'Mechanic',
    bio: 'With over 5 years of hands-on experience, I bring a unique blend of old-school craftsmanship and modern diagnostic expertise to every vehicle I work on. I grew up in my father\'s garage, where the smell of motor oil and the sound of turning wrenches became second nature. From restoring classic muscle cars to troubleshooting complex electronic fuel injection systems, I treat every engine like a puzzle waiting to be solved. My passion lies in bridging the gap between traditional mechanical know-how and cutting-edge automotive technology — ensuring every car that leaves my bay runs better than the day it rolled off the lot.',
    photoUrl: 'https://placehold.co/400x400/1a1a2e/e94560?text=E',
    yearsExperience: 5,
  },
  skills: [
    { name: 'Engine Diagnostics', level: 92, icon: '🔧' },
    { name: 'Brake Systems', level: 88, icon: '🛑' },
    { name: 'Electrical Repair', level: 78, icon: '⚡' },
    { name: 'Suspension & Steering', level: 85, icon: '🔩' },
    { name: 'Transmission', level: 80, icon: '⚙️' },
    { name: 'Welding & Fabrication', level: 72, icon: '🔥' },
    { name: 'AC & Climate Systems', level: 75, icon: '❄️' },
  ],
  projects: [
    {
      id: 'classic-mustang-restore',
      title: '1969 Mustang Full Restoration',
      description: 'Complete frame-off restoration of a 1969 Ford Mustang Mach 1, including engine rebuild, bodywork, custom paint, and interior reupholstering. Brought this classic back to showroom condition over 8 months.',
      image: 'https://placehold.co/600x400/2d3436/dfe6e9?text=Mustang+Restore',
      tags: ['Engine Rebuild', 'Bodywork', 'Classic Cars', 'Paint'],
      liveUrl: undefined,
      repoUrl: undefined,
    },
    {
      id: 'fleet-diagnostics-system',
      title: 'Fleet Diagnostics Dashboard',
      description: 'Designed and implemented a digital diagnostics tracking system for a local delivery fleet of 25 vehicles. Streamlined maintenance scheduling and reduced downtime by 30% through predictive maintenance alerts.',
      image: 'https://placehold.co/600x400/0984e3/dfe6e9?text=Fleet+Dashboard',
      tags: ['Diagnostics', 'Fleet Management', 'Preventive Maintenance'],
      liveUrl: 'https://example.com/fleet-dashboard',
      repoUrl: 'https://github.com/elias-mechanic/fleet-diagnostics',
    },
    {
      id: 'custom-exhaust-fabrication',
      title: 'Custom Exhaust System Build',
      description: 'Fabricated a custom stainless steel exhaust system for a turbocharged track-day build. Included mandrel bends, custom headers, and performance tuning to achieve optimal backpressure and a 15hp gain.',
      image: 'https://placehold.co/600x400/6c5ce7/dfe6e9?text=Custom+Exhaust',
      tags: ['Welding', 'Fabrication', 'Performance', 'Turbo'],
      liveUrl: undefined,
      repoUrl: undefined,
    },
  ],
  social: {
    github: 'https://github.com/elias-mechanic',
    linkedin: 'https://linkedin.com/in/elias-mechanic',
  },
}
