import React from 'react';
import type { Project } from '../data/projects';

type Props = { project: Project };

export function ProjectWindow({ project }: Props): JSX.Element {
  return (
    <div className="p-4 text-white space-y-4">
      <header>
        <h1 className="text-xl font-semibold">{project.name}</h1>
        <p className="text-white/80">{project.summary}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 rounded-full bg-white/10 text-sm">{t}</span>
        ))}
      </div>
      {project.links && (
        <div className="flex gap-4">
          {project.links.github && <a className="underline" href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
          {project.links.testFlight && <a className="underline" href={project.links.testFlight} target="_blank" rel="noreferrer">TestFlight</a>}
          {project.links.appStore && <a className="underline" href={project.links.appStore} target="_blank" rel="noreferrer">App Store</a>}
        </div>
      )}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="list-disc pl-5 space-y-1">
          {project.highlights.map((h, i) => (
            <li key={i} className="text-white/90">{h}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


