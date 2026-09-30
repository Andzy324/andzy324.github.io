# Boyang Zhong academic homepage

This site adapts [fusheng-ji/academic-homepage-template](https://github.com/fusheng-ji/academic-homepage-template) for Boyang Zhong and is published through GitHub Pages at [andzy324.github.io](https://andzy324.github.io/).

## Local preview

Requires Node.js 22.22+ and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:8080/. Before deploying, run `npm run build && npm run check`.

## Content and sources

The profile, education, experience, and award entries come from the local English CV in `Documents/Personal/Application`. LinkedIn and Google Scholar URLs come from that CV. Publication titles and authors were cross-checked against their paper pages. The research grouping and Past/Now/Next trajectory are editorial syntheses of these sources, not formal statements by a lab. PANY, VBVR, and FUNCanon appear only under Publications. The ongoing master's thesis appears only under Experiences. OV-NOCs appears under the CAMP experience and is expanded under Projects, alongside guided research and the drone course project.

## Before publishing

- Replace `https://example.com` in `src/_data/site.js` with the final site URL, or set `SITE_URL` during build. Set `PATH_PREFIX` if deploying under a repository path.
- The portrait at `public/assets/profile-linkedin.png` was saved from Boyang Zhong's LinkedIn profile. Publication teasers use figures from the corresponding public paper pages.
- Confirm all dates and descriptions, especially current internship and paper venue labels.
- The original CV was deliberately not included in the public site because it contains a phone number. Add a public-safe CV PDF and link it in `site.js` if desired.
- GitHub and other unverified social links were omitted.

The upstream template README contains GitHub Pages setup instructions.

## Thesis and CAMP provenance

The ongoing thesis details, supervisor, examiner, and March 2027 deadline are from the official TUM thesis verification page. The page provides an abstract but no visible thesis title, so the homepage uses a descriptive label rather than a claimed official title. PANY is linked to the paper and CAMP collaboration. OV-NOCs is placed in the Oct 2025–Mar 2026 CAMP period. A local research presentation describes unified pose conventions, open-vocabulary shape perception, and canonicalized object data; Boyang’s stated contribution was 3D assets and the data annotation pipeline. PANY followed FUNCanon into the 2026 submission phase and was later accepted at ECCV 2026.

## Logos and collaborator links

Experience and education logos are local copies from the official TRESP Lab, TUM CAMP, and Tongji sites, and public logo pages for TUM, LMU, RWTH, Agile Robots, and SAIC Volkswagen. The CVG mark is cropped from an [official group lecture slide](https://cvg.cit.tum.de/_media/teaching/ss2023/mvg2023/material/chapter00_introduction.pdf); the Info6 mark is cropped from an [official Knoll group thesis notice](https://www.ce.cit.tum.de/fileadmin/w00cgn/air/Thesis_Proposals/2022-02_Thesis_Dietrich-Robin_Neuromorphic-Radar-Object-Tracking.pdf). The TRESP Lab mark was checked against the [lab's official website](https://tresp-lab.github.io/). These assets remain the property of their respective organizations; see their source pages for reuse terms. The linked mentor pages include Junwen Huang, Ruotong Liao, Xi Wang, Daniel Cremers, and Mahdi Mustapha Hamad. Jiaqi Hu links to LinkedIn; Hongli Xu is shown without a link because a matching personal homepage was not verified. The collaborator and mentor roles follow Boyang's requested grouping; the VBVR publication highlights Hokin Deng as its sole collaborator, while the full author list remains available from the paper. The drone project's SRL affiliation appears in its focus text, not as a collaborator. VBVR is listed as a publication; the page does not claim a specific individual contribution beyond co-authorship.

WZL and SAIC Volkswagen are grouped as concise earlier experience entries without research-area labels. The WZL logo comes from the [official WZL website](https://www.wzl.rwth-aachen.de/).

The Agile Robots entry pairs the company logo with the [Agile WRD logo displayed on Wenbo Ji’s homepage](https://fusheng-ji.github.io/assets/institution_logo/Agile-wrd-logo.png).

Paper teaser sources: [PANY](https://arxiv.org/html/2606.23634v1/teaser_eccv.png), [VBVR](https://arxiv.org/html/2602.20159v4/VBVR_Teaser.png), and [FUNCanon](https://arxiv.org/html/2509.19102v2/teaser_2.png). The Tongji badge comes from the [official university identity page](https://www.tongji.edu.cn/xxgk1/xxbs1.htm).

Publication links point to each available paper or preprint and project page. VBVR links to its [ICML proceedings entry](https://proceedings.mlr.press/v306/wang26ia.html), [arXiv preprint](https://arxiv.org/abs/2602.20159), and [project page](https://video-reason.com/?v=vbvr). Its homepage byline is abbreviated for readability; the full author list remains in the source data and publisher record.

The guided research title and technical summary follow the user's `Enhancing_Video_Captioning_via_Reinforcement_Learning_v1.pdf` in ChatGPT project Sources. The project illustration simplifies Figure 1 on page 4 so its core flow remains legible as a homepage thumbnail; the report PDF itself is not copied into the public site.

The Mobile Robotics Praktikum entry follows the user's CV for dates, visual-inertial SLAM, real-flight deployment, and reported performance. Its Smart Robotics Lab affiliation is identified by the user and matches [TUM SRL’s public lab description](https://srl.cit.tum.de/) and [Mobile Robotics Practicals description](https://srl.cit.tum.de/teaching/w23/mobileroboticspracticals). The drone project image is a generated conceptual illustration of SLAM mapping and trajectory planning, not a photograph or flight result.
