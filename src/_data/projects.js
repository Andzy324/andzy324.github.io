export default [
  {
    id: 'ov-nocs', title: 'OV-NOCs: Open-Vocabulary Object Canonicalization', date: 'Oct 2025 – Mar 2026',
    focus: '3D assets and data annotation pipeline · TUM CAMP', area: 'representation',
    summary: 'Explored a shared canonical pose convention and shape representation across object categories. I worked on 3D asset preparation and the data annotation pipeline supporting a large-scale canonicalized object dataset.',
    media: { src: '/assets/logos/tum-camp.png', width: 774, height: 435, alt: 'TUM CAMP logo' },
    links: [{ type: 'project', url: '/#camp-research', label: 'View CAMP experience' }],
    collaborators: [{ people: [{ name: 'Hongli Xu' }, { name: 'Jiaqi Hu', url: 'https://de.linkedin.com/in/jiaqihu0511' }], organization: 'TUM CAMP' }],
    mentors: [{ people: [{ name: 'Junwen Huang', url: 'https://demianhj.github.io/' }, { name: 'Slobodan Ilic', url: 'https://www.cs.cit.tum.de/camp/members/senior-affiliates/slobodan-ilic/' }, { name: 'Benjamin Busam', url: 'https://www.professoren.tum.de/busam-benjamin' }], organization: 'TUM CAMP' }]
  },
  {
    id: 'video-captioning-project', title: 'Enhancing Video Captioning via Reinforcement Learning', date: 'Nov 2024 – Jun 2025',
    focus: 'Highlight-aware video captioning · Guided Research at TRESP Lab, LMU Munich', area: 'generation',
    summary: 'Developed a GRPO training framework that rewards video captions for temporal alignment, linguistic fidelity, and brevity. The temporal reward combines moment retrieval and highlight detection signals from UVCOM/Lighthouse-style predictors; the report compares clause-level reward aggregation and DAPO on QVHighlights, with preliminary TVSum experiments.',
    media: { src: '/assets/projects/video-captioning-overview.svg', width: 1200, height: 600, alt: 'Simplified report-based diagram: video and query, video language model, concise caption, and reward-guided GRPO' },
    links: [{ type: 'project', url: '/#video-captioning', label: 'View research experience' }],
    mentors: [{ people: [{ name: 'Ruotong Liao', url: 'https://mayhugotong.github.io/' }], organization: 'TRESP Lab, LMU Munich' }]
  },
  {
    id: 'drone-navigation', title: 'Autonomous Drone Navigation with Visual-Inertial SLAM', date: 'Oct 2024 – Feb 2025',
    focus: 'Mobile Robotics Praktikum · Smart Robotics Lab (SRL), TUM', area: 'perception',
    summary: 'At TUM’s Smart Robotics Lab, I developed visual-inertial SLAM and trajectory-planning components in C++, then led ROS 1 sim-to-real deployment through control tuning, hardware integration, and mission testing. Our team was the only one to transfer autonomous planning from simulation to real flights; planner tuning and VIO re-initialization raised mission success from 44% to 62% and reduced crashes by 30%.',
    media: { src: '/assets/projects/drone-navigation-slam-planning.webp', width: 1672, height: 941, alt: 'Conceptual split view of a SLAM point-cloud map and an indoor drone trajectory plan' },
    links: [{ type: 'project', url: 'https://srl.cit.tum.de/', label: 'Visit TUM Smart Robotics Lab', external: true }]
  }
];
