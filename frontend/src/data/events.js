export const events = [
  {
    id: 1,
    title: 'Festival Verano 2026',
    category: 'Show',
    date: '15 Ago',
    fullDate: '15 de agosto de 2026',
    time: '20:00',
    location: 'São Paulo, SP',
    venue: 'Arena Verzel',
    price: 120,
    available: true,
    soldOut: false,
    gradient: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
    description: 'O maior encontro de música independente do ano, com três palcos, área de alimentação e experiências exclusivas.',
    info: [
      'Abertura dos portões: 18h00',
      'Proibido entrada com objetos cortantes, armas e copos de vidro',
      'Ingresso nominal e intransferível, salvo via compartilhamento oficial',
      'Meia-entrada mediante apresentação de documento comprovatório'
    ]
  },
  {
    id: 2,
    title: 'Cine Clássico: O Poderoso Chefão',
    category: 'Cinema',
    date: '18 Ago',
    fullDate: '18 de agosto de 2026',
    time: '19:00',
    location: 'Rio de Janeiro, RJ',
    venue: 'Cine Verzel',
    price: 45,
    available: true,
    soldOut: false,
    gradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)'
  },
  {
    id: 3,
    title: 'Hamlet — Temporada 2026',
    category: 'Teatro',
    date: '20 Ago',
    fullDate: '20 de agosto de 2026',
    time: '21:00',
    location: 'Belo Horizonte, MG',
    venue: 'Teatro Positivo',
    price: 80,
    available: true,
    soldOut: false,
    gradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)'
  },
  {
    id: 4,
    title: 'MPB ao Vivo',
    category: 'Show',
    date: '22 Ago',
    fullDate: '22 de agosto de 2026',
    time: '19:30',
    location: 'Curitiba, PR',
    venue: 'Teatro Positivo',
    price: 95,
    available: false,
    soldOut: true,
    gradient: 'linear-gradient(135deg, #86EFAC 0%, #4ADE80 100%)'
  }
];

export const categories = [
  { name: 'Festas e Shows', count: 123 },
  { name: 'Teatros e Espetáculos', count: 45 },
  { name: 'Cinema', count: 67 },
  { name: 'Cursos e Workshops', count: 34 }
];

export const userTickets = [
  {
    id: 'VER-2026-001-A',
    eventId: 1,
    eventTitle: 'Festival Verano 2026',
    date: '15 de agosto de 2026',
    time: '20:00',
    location: 'São Paulo, SP',
    venue: 'Arena Verzel',
    sector: 'Pista',
    seat: 'Livre',
    status: 'valid'
  },
  {
    id: 'VER-2026-004-C',
    eventId: 4,
    eventTitle: 'MPB ao Vivo',
    date: '10 de julho de 2026',
    time: '19:30',
    location: 'Curitiba, PR',
    venue: 'Teatro Positivo',
    sector: 'Pista',
    seat: 'Livre',
    status: 'used'
  }
];

export const organizerEvents = [
  { id: 1, title: 'Festival Verano 2026', location: 'São Paulo, SP', date: '15 Ago 2026', sold: 1050, capacity: 5000, status: 'published' },
  { id: 4, title: 'MPB ao Vivo', location: 'Curitiba, PR', date: '22 Ago 2026', sold: 190, capacity: 400, status: 'published' },
  { id: 2, title: 'Cine Clássico: O Poderoso Chefão', location: 'Rio de Janeiro, RJ', date: '—', sold: 0, capacity: 0, status: 'draft' }
];
