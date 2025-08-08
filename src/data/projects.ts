export type ProjectLink = { github?: string; appStore?: string; testFlight?: string };

export type Project = {
  slug: string;
  name: string;
  summary: string;
  year?: string;
  tech: string[];
  links?: ProjectLink;
  screenshots?: string[];
  highlights?: string[];
};

// TODO: Replace placeholders with real projects parsed from resume.md if available.
export const projects: Project[] = [
  { slug: 'banking-app', name: 'Banking SuperApp', summary: 'Large‑scale iOS banking app', tech: ['Swift', 'SwiftUI', 'Combine'] },
  { slug: 'bugme', name: 'BugMe', summary: 'Inspector for iOS/macOS UIs using Mirror API', tech: ['Swift', 'macOS'] },
  { slug: 'iot-dashboard', name: 'IoT Dashboard', summary: 'Realtime device control', tech: ['Swift', 'GraphQL'] }
];


