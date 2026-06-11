import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(__dirname, '../../content');

/** Load and parse a YAML file from /content */
export function loadContent<T>(filename: string): T {
  const filePath = join(contentRoot, filename);
  const raw = readFileSync(filePath, 'utf-8');
  return parse(raw) as T;
}

// ── Typed loaders ─────────────────────────────────────────

export interface SiteData {
  meta: { title: string; tagline: string; description: string; url: string; og_image: string; author: string };
  contact: { email: string; instagram_main_handle: string; instagram_main_url: string; instagram_food_handle: string; instagram_food_url: string; linkedin_url?: string; github_url?: string };
  hero: { headline: string; headline_line2: string; subhead: string; cta_primary_label: string; cta_primary_href: string; cta_secondary_label: string; cta_secondary_href: string; image: string; image_alt: string };
  nav_links: { label: string; href: string }[];
  footer: { tagline: string; copyright_name: string };
}

export interface AboutData {
  headline: string; subhead: string; body: string[];
  duality_quote: string;
  facts: { label: string; value: string }[];
  image: string; image_alt: string;
}

export interface JourneyMilestone {
  age: number; value: number; label: string; description: string; type: 'past' | 'current' | 'future';
}
export interface JourneyNoisePoint { age: number; value: number; }
export interface JourneyData {
  present_age: number;
  milestones: JourneyMilestone[];
  noise_points: JourneyNoisePoint[];
  chart: { x_min_age: number; x_max_age: number; y_label: string; gridline_ages: number[]; gridline_values: number[] };
}

export interface PortfolioItem {
  title: string; description: string; image: string; image_alt: string; tags: string[]; video_url?: string;
}
export interface PortfolioSection {
  id: string; title: string; description: string; items: PortfolioItem[];
  instagram_handle?: string; instagram_url?: string;
}
export interface PortfolioData { sections: PortfolioSection[]; }

export interface SkillItem { name: string; level: 'core' | 'advanced' | 'learning'; detail?: string; }
export interface SkillCategory { id: string; title: string; icon: string; items: SkillItem[]; }
export interface SkillsData { categories: SkillCategory[]; }

export interface HoldingItem { symbol: string; exchange: string; blurb: string; }
export interface InvestingData {
  headline: string; subhead: string; body: string[];
  holdings: HoldingItem[];
  career_note: string;
}

export interface VisionData {
  headline: string; subhead: string;
  schools: { headline: string; items: { name: string; program: string; note: string }[] };
  career_arc: { headline: string; stages: { phase: string; label: string; detail: string }[] };
  closing: string;
}

export interface ResumeData {
  name: string; tagline: string; email: string; instagram: string; location: string;
  education: { institution: string; degree: string; minors?: string; years: string; note?: string }[];
  honors: string[];
  activities: { title: string; org: string; years: string; bullets: string[] }[];
  experience: { title: string; org: string; years: string; bullets: string[] }[];
  skills_summary: { category: string; items: string }[];
  projects: { title: string; description: string; url?: string }[];
  interests: string[];
}

export interface AchievementsData {
  headline: string; subhead: string;
  stats: { value: string; label: string; sublabel?: string }[];
  leadership: { years: string; role: string; org: string; description: string }[];
  coursework: { ap: string[]; honors: string[]; cte: string[] };
  service: { headline: string; items: { hours: string; role: string; description: string }[] };
  closing: string;
}

export const getSite = () => loadContent<SiteData>('site.yaml');
export const getAbout = () => loadContent<AboutData>('about.yaml');
export const getJourney = () => loadContent<JourneyData>('journey.yaml');
export const getPortfolio = () => loadContent<PortfolioData>('portfolio.yaml');
export const getSkills = () => loadContent<SkillsData>('skills.yaml');
export const getInvesting = () => loadContent<InvestingData>('investing.yaml');
export const getVision = () => loadContent<VisionData>('vision.yaml');
export const getResume = () => loadContent<ResumeData>('resume.yaml');
export const getAchievements = () => loadContent<AchievementsData>('achievements.yaml');
