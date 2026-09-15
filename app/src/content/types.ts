export interface CapabilityCard {
  index: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface StackCard {
  eyebrow: string;
  title: string;
  tools: string[];
}

export interface TenureHighlight {
  title: string;
  description: string;
}

export interface EmbeddedProject {
  eyebrow: string;
  title: string;
  description: string;
  highlights: TenureHighlight[];
  deliveryLoop: string[];
}

export interface CareerRole {
  id: string;
  dateRange: string;
  company: string;
  title: string;
  location: string;
  summary: string;
  current?: boolean;
  tags?: string[];
  embeddedProject?: EmbeddedProject;
  relatedLink?: { label: string; href: string };
}

export interface SentinelStoryStep {
  step: string;
  title: string;
  description: string;
}

export interface SentinelProofPoint {
  value: string;
  label: string;
}

export interface SentinelFeature {
  index: string;
  description: string;
}
