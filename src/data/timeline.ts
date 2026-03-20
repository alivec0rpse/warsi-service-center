export const radialTimelineData = [
  {
    id: 1,
    title: 'Call or visit',
    date: 'Step 01',
    content:
      'Customers start by calling the workshop or visiting directly with their vehicle and service requirement.',
    category: 'Contact',
    icon: 'phone',
    relatedIds: [2],
    status: 'completed' as const,
    energy: 82,
  },
  {
    id: 2,
    title: 'Inspection',
    date: 'Step 02',
    content:
      'The vehicle is checked carefully so the issue, expected work, and likely scope become clear before service begins.',
    category: 'Inspection',
    icon: 'search',
    relatedIds: [1, 3],
    status: 'completed' as const,
    energy: 87,
  },
  {
    id: 3,
    title: 'Repair or build',
    date: 'Step 03',
    content:
      'Mechanical work, denting, paint, electrical work, AC service, detailing, or custom fabrication is carried out based on the job.',
    category: 'Service',
    icon: 'wrench',
    relatedIds: [2, 4],
    status: 'in-progress' as const,
    energy: 92,
  },
  {
    id: 4,
    title: 'Quality check',
    date: 'Step 04',
    content:
      'The workshop reviews the finished work to make sure the repair, finish, fitment, or service result is ready for handover.',
    category: 'Quality',
    icon: 'shieldCheck',
    relatedIds: [3, 5],
    status: 'pending' as const,
    energy: 96,
  },
  {
    id: 5,
    title: 'Delivery',
    date: 'Step 05',
    content:
      'Once the job is complete, the vehicle is handed back with the work explained clearly so the customer knows what was done.',
    category: 'Handover',
    icon: 'handshake',
    relatedIds: [4],
    status: 'pending' as const,
    energy: 100,
  },
];
