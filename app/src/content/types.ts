export interface StackCard {
  eyebrow: string;
  title: string;
  tools: string[];
}

export interface TenureHighlight {
  title: string;
  description: string;
  /** Optional headline figure, e.g. "3.5M". */
  metric?: string;
}

/** A single quantified outcome shown as the role's stat. */
export interface RoleImpact {
  value: string;
  label: string;
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
  /** `YYYY-MM`. Display range and duration are derived from start/end. */
  start: string;
  /** `YYYY-MM`; omitted for the current role. */
  end?: string;
  company: string;
  title: string;
  location: string;
  summary: string;
  impact?: RoleImpact;
  current?: boolean;
  tags?: string[];
  embeddedProject?: EmbeddedProject;
}
