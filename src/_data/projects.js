export default [
  {
    id: 'ov-nocs', title: 'OV-NOCs / LUNAR: Learning Unified NOCs and Shape Representation', date: 'Oct 2025 – Mar 2026',
    focus: 'Universal pose conventions and shape representations across open-vocabulary object categories, backed by a scalable canonicalization and annotation pipeline.', area: 'representation',
    summary: 'The project aims to bring uncategorized 3D models, category-level pose datasets, object-centric datasets, and scene datasets into a consistent canonical coordinate space. I worked on 3D asset preparation and the annotation pipeline for the large-scale canonicalized dataset at TUM CAMP.',
    media: { src: '/assets/projects/ov-nocs-canonicalization.png', width: 1475, height: 617, alt: 'OV-NOCs canonicalization pipeline for 3D models, category-level pose datasets, object-centric datasets, and scene datasets' },
    links: [],
    mentors: [
      { people: [{ name: 'Junwen Huang', url: 'https://demianhj.github.io/' }], organization: 'PhD Candidate · TUM CAMP' },
      { people: [{ name: 'Slobodan Ilic', url: 'https://www.cs.cit.tum.de/camp/members/senior-affiliates/slobodan-ilic/' }], organization: 'Adjunct Professor · TUM CAMP; Senior Research Scientist · Siemens' },
      { people: [{ name: 'Benjamin Busam', url: 'https://www.professoren.tum.de/busam-benjamin' }], organization: 'Professor & Chair · TUM Photogrammetry and Remote Sensing' }
    ]
  },
  {
    id: 'video-captioning-project', title: 'Enhancing Video Captioning via Reinforcement Learning', date: 'Nov 2024 – Jun 2025',
    focus: 'Highlight-aware video captioning · Guided Research at TRESP Lab, LMU Munich', area: 'generation',
    summary: 'Developed a GRPO training framework that rewards video captions for temporal alignment, linguistic fidelity, and brevity. The temporal reward combines moment retrieval and highlight detection signals from UVCOM/Lighthouse-style predictors; the report compares clause-level reward aggregation and DAPO on QVHighlights, with preliminary TVSum experiments.',
    media: { src: '/assets/projects/video-captioning-pipeline.webp', width: 1702, height: 652, alt: 'Training pipeline from my guided research report: video and prompt, candidate captions, temporal and linguistic rewards, and GRPO or DAPO updates' },
    links: [],
    mentors: [{ people: [{ name: 'Ruotong Liao', url: 'https://mayhugotong.github.io/' }], organization: 'PhD Researcher · TRESP Lab, LMU Munich' }]
  },
  {
    id: 'drone-navigation', title: 'Autonomous Drone Navigation with Visual-Inertial SLAM', date: 'Oct 2024 – Feb 2025',
    focus: 'Mobile Robotics Praktikum · Smart Robotics Lab (SRL), TUM', area: 'perception',
    summary: 'At TUM’s Smart Robotics Lab, I developed visual-inertial SLAM and trajectory-planning components in C++, then led ROS 1 sim-to-real deployment through control tuning, hardware integration, and mission testing. Our team was the only one to transfer autonomous planning from simulation to real flights; planner tuning and VIO re-initialization raised mission success from 44% to 62% and reduced crashes by 30%.',
    media: { src: '/assets/projects/drone-navigation-slam-planning.webp', width: 1672, height: 941, alt: 'Conceptual split view of a SLAM point-cloud map and an indoor drone trajectory plan' },
    links: [],
    mentors: [{ people: [{ name: 'Stefan Leutenegger', url: 'https://srl.cit.tum.de/members/leuteneg' }], organization: 'Professor · TUM Smart Robotics Lab' }]
  }
];
