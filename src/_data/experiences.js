export default [
  {
    id: 'agile-robots', title: 'World Models for Robotics & Dexterous Manipulation', date: 'Jun 2026 – Present',
    type: 'Research Intern · WRD Team, Agile Robots SE', area: 'generation',
    logos: [{ src: '/assets/logos/agile-robots.svg', width: 1024, height: 168, alt: 'Agile Robots logo' }, { src: '/assets/logos/agile-wrd.png', width: 434, height: 156, alt: 'Agile WRD logo' }],
    mentors: [{ people: [{ name: 'Mahdi Mustapha Hamad', url: 'https://scholar.google.com/citations?hl=en&user=snIHZzcAAAAJ' }], organization: 'Agile Robots SE · WRD Team' }],
    contributions: ['Developing contact-aware video generation and world action models for contact-rich robotic manipulation.', 'Investigating 3D motion and contact representations for physically consistent interaction prediction.']
  },
  {
    id: 'tum-masters-thesis', title: 'Interactive World Models for Understanding and Manipulating Articulated Objects', date: 'Ongoing · due Mar 2027',
    type: 'Master’s Thesis · TUM Computer Vision Group', area: 'generation',
    logos: [{ src: '/assets/logos/tum-cvg.png', width: 720, height: 121, alt: 'TUM Computer Vision Group mark' }, { src: '/assets/logos/tum.svg', width: 408, height: 212, alt: 'Technical University of Munich logo' }],
    mentors: [{ people: [{ name: 'Xi Wang', url: 'https://xiwang1212.github.io/homepage/' }, { name: 'Daniel Cremers', url: 'https://cvg.cit.tum.de/members/cremers' }], organization: 'TUM Computer Vision Group' }],
    contributions: [
      'Investigating how scene-level world models can support controllable interaction with articulated objects through object-level articulation reasoning and interaction video generation.',
      'Exploring structured 3D articulation and motion guidance; evaluating motion quality, appearance preservation, and scene consistency.'
    ]
  },
  {
    id: 'camp-research', title: 'Open-World Object Pose & Canonical Representation', date: 'Oct 2025 – Mar 2026',
    type: 'Research Collaboration · TUM CAMP', area: 'perception',
    logos: [{ src: '/assets/logos/tum-camp.png', width: 774, height: 435, alt: 'TUM CAMP logo' }],
    collaborators: [{ people: [{ name: 'Hongli Xu' }, { name: 'Jiaqi Hu', url: 'https://de.linkedin.com/in/jiaqihu0511' }], organization: 'TUM CAMP' }],
    mentors: [{ people: [{ name: 'Junwen Huang', url: 'https://demianhj.github.io/' }, { name: 'Slobodan Ilic', url: 'https://www.cs.cit.tum.de/camp/members/senior-affiliates/slobodan-ilic/' }, { name: 'Benjamin Busam', url: 'https://www.professoren.tum.de/busam-benjamin' }], organization: 'TUM CAMP' }],
    contributions: [
      'Contributed to <a href="#pose-anything-anywhere">Pose Anything Anywhere (PANY)</a> during its 2026 submission phase, advancing open-world, model-free 6D pose research.',
      'Worked on <a href="#ov-nocs">OV-NOCs</a> in parallel through March 2026, focusing on 3D assets and the data annotation pipeline for canonicalized object representations.'
    ]
  },
  {
    id: 'funcanon-research', title: 'Functional Canonicalization for Robot Manipulation', date: 'Jul – Sep 2025',
    type: 'Research Project · TUM Info6 / Agile Robots SE', area: 'embodied',
    logos: [{ src: '/assets/logos/tum-info6.png', width: 458, height: 382, alt: 'TUM Info6 Knoll group mark' }, { src: '/assets/logos/agile-robots.svg', width: 1024, height: 168, alt: 'Agile Robots logo' }],
    collaborators: [{ people: [{ name: 'Hongli Xu' }, { name: 'Lei Zhang' }, { name: 'Xiaoyue Hu' }], organization: 'FUNCanon joint first authors' }],
    mentors: [{ people: [{ name: 'Zhenshan Bing', url: 'https://www.ce.cit.tum.de/en/air/people/zhenshan-bing-prof-drrernat/' }, { name: 'Alois Christian Knoll', url: 'https://www.ce.cit.tum.de/air/people/prof-dr-ing-habil-alois-knoll/' }, { name: 'Jianwei Zhang', url: 'https://tams.informatik.uni-hamburg.de/people/zhang/index.php' }], organization: 'TUM / University of Hamburg' }],
    contributions: ['Curated category-level 3D assets and pose-canonicalized models for <a href="#funcanon">FUNCanon</a>.', 'Organized a functional taxonomy and built affordance visualizations for qualitative analysis.']
  },
  {
    id: 'video-captioning', title: 'Enhancing Video Captioning via Reinforcement Learning', date: 'Nov 2024 – Jun 2025',
    type: 'Guided Research · Tresp Lab, LMU Munich', area: 'generation',
    logos: [{ src: '/assets/logos/tresp-lab.png', width: 464, height: 480, alt: 'TRESP Lab logo', label: 'TRESP Lab' }, { src: '/assets/logos/lmu.svg', width: 760, height: 398, alt: 'LMU Munich logo' }],
    mentors: [{ people: [{ name: 'Ruotong Liao', url: 'https://mayhugotong.github.io/' }], organization: 'TRESP Lab, LMU Munich' }],
    contributions: ['Designed a composite reward for temporal alignment, linguistic fidelity, and brevity in <a href="#video-captioning-project">highlight-aware video captioning</a>.', 'Compared UVCOM/Lighthouse temporal predictors, clause-level aggregation, and GRPO versus DAPO training on QVHighlights.']
  },
  {
    id: 'rwth-aachen', title: 'Production Metrology & Quality Management', date: 'Mar – Jun 2022',
    type: 'Research Intern · WZL, RWTH Aachen University',
    logos: [{ src: '/assets/logos/wzl.svg', width: 361, height: 91, alt: 'WZL, RWTH Aachen University logo' }], mentors: [],
    contributions: ['Developed laser spot localization and supported multi-sensor axis-error detection.']
  },
  {
    id: 'saic-volkswagen', title: 'Intelligent Driving', date: 'Jul – Sep 2021',
    type: 'Intern · SAIC VOLKSWAGEN',
    logos: [{ src: '/assets/logos/saic-volkswagen.svg', width: 600, height: 200, alt: 'SAIC Volkswagen logo' }], mentors: [],
    contributions: ['Built ORB-SLAM-based indoor perception and Ackermann lane-following; our team placed second in the AutoPro Smart Driving Competition.']
  }
];
