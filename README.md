# Rafeeq AI | رفيق AI

**Founder:** Mariam Alharbi  
**Positioning:** AI Digital Twin Platform | GovTech | Hajj & Umrah Safety | Early Risk Sensing  
**Tagline:** التوأم الرقمي الذكي لضيوف الرحمن

Rafeeq AI is an MVP concept prototype using simulated data. It presents a future operational platform that prepares pilgrims before Hajj and Umrah, builds a **Pilgrim Readiness Twin™ | توأم جاهزية الحاج™**, senses early risk indicators during the journey, verifies the pilgrim through a smartwatch, and supports authorized field response when needed.

## Core Innovation

- Early Risk Sensing | الاستشعار المبكر للمخاطر
- Pilgrim Readiness Twin™ | توأم جاهزية الحاج™
- Smart Escalation | التصعيد الذكي

The Readiness Score is only one metric inside the Pilgrim Readiness Twin™.

## Main Prototype Scenario

The primary scenario follows **عبدالله محمد**, 58, a first-time Hajj pilgrim with mild asthma.

- Location: منى — مسار الجمرات
- Medication: بخاخ
- General readiness: 70%
- Health readiness: 55%
- Emergency readiness: 90%
- Initial readings: 88 BPM, 37.1°C, crowd density 58%, battery 76%, low risk
- High-risk readings: 126 BPM, 38.4°C, crowd density 84%, movement stopped, breathing irregular

The smartwatch captures signals. Rafeeq AI combines those signals with the readiness twin, health profile, location, crowd density, heat context, movement, and breathing status. It verifies through the smartwatch before creating a case.

## Product Architecture

1. Guest of Allah preparation journey
2. Pilgrim Readiness Twin™
3. Smart health and emergency profile
4. Early risk sensing
5. Smartwatch verification
6. Missing Pilgrim Assistance
7. Smart escalation and best response route
8. Command platform
9. Paramedic app workflow
10. Operational Intelligence after case closure

## Routes

- `/` — Arabic-first pitch website
- `/experience/` — interactive operational MVP simulation

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Framer Motion
- Lucide Icons
- Static export for GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
http://localhost:3000/experience/
```

## Production Build

```bash
npm run build
```

The static export is generated in:

```text
out/
```

## GitHub Pages Deployment

Target repository:

```text
RafeeqAIPlatform/rafeeq-ai
```

Expected live URL:

```text
https://rafeeqaiplatform.github.io/rafeeq-ai/
```

In GitHub:

1. Create a public repository named `rafeeq-ai`.
2. Upload the repository files.
3. Go to **Settings → Pages**.
4. Set source to **GitHub Actions**.
5. Push to `main`.

The workflow in `.github/workflows/deploy.yml` builds the app and deploys the `out/` folder.

## Simulation And Data Disclaimer

This repository contains an MVP concept prototype using simulated data. It does not represent a production medical system, active dispatch integration, or approved government deployment.

## Privacy And Governance Disclaimer

Rafeeq AI is designed around consent, minimum necessary data, role-based access, emergency access logging, permission management, and anonymized aggregated analytics. Legal approvals, compliance certifications, and official integrations are future requirements, not current claims.

## Future Integration Disclaimer

Future deployment requires approved partnerships, health and operational expert review, risk-engine validation, and authorized integration planning.

## Brand

The active Rafeeq AI logo is stored at `public/rafeeq-logo.png`. The original brand artwork remains available at `public/rafeeq-brand.png`.
