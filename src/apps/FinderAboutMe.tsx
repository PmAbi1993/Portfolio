import React from 'react';
import { profile } from '../data/profile';

export function FinderAboutMe(): JSX.Element {
  return (
    <div className="p-4 text-white">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-white/20" aria-label="Profile photo placeholder" />
        <div>
          <h1 className="text-xl font-semibold">{profile.name}</h1>
          <p className="text-white/80">{profile.title}</p>
          <p className="text-white/60">{profile.location}</p>
        </div>
      </div>
      <p className="mt-4 text-white/90 max-w-prose">{profile.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {profile.skills.map((s) => (
          <span key={s} className="px-2 py-1 rounded-full bg-white/10 text-sm">{s}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <a className="underline" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="underline" href={`mailto:${profile.email}`}>Email</a>
      </div>
    </div>
  );
}


