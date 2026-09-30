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
}
