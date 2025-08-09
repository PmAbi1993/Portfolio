import React from 'react';
import { profile } from '../data/profile';
import { Apple, Settings2, Sparkles, Globe2, Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';

type IconProps = { className?: string };

const iconMap: Record<string, React.ComponentType<IconProps>> = {
  stack: Settings2,
  impact: Sparkles,
  cicd: Settings2,
  location: Globe2,
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
  blog: Globe,
};

function Card({ title, icon, children }: { title: string; icon: keyof typeof iconMap; children: React.ReactNode }): JSX.Element {
  const Icon = iconMap[icon] ?? Settings2;
  return (
    <section className="rounded-xl bg-white/70 dark:bg-black/40 glass border border-black/10 dark:border-white/10 p-4">
      <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70">
        <Icon className="w-5 h-5" aria-hidden />
        <span>{title}</span>
      </div>
      <div className="mt-2 text-[15px] leading-6 text-black/90 dark:text-white/90">{children}</div>
    </section>
  );
}

export function FinderAboutMe(): JSX.Element {
  return (
    <div className="p-5 text-black dark:text-white select-text">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center">
          <Apple className="w-8 h-8" aria-hidden />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">About This Mac</h1>
          <p className="text-black/70 dark:text-white/80">{profile.name} · {profile.title}</p>
        </div>
        {/* Top-right tag like screenshot */}
        <div className="ml-auto">
          <button className="rounded-lg px-3 py-1 text-sm bg-white/60 dark:bg-black/40 glass border border-black/10 dark:border-white/10" aria-label="Window Style">Tahoe</button>
        </div>
      </div>

      {/* Grid cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.sections.map((sec) => (
          <Card key={sec.key} title={sec.title.toUpperCase()} icon={sec.key}>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {sec.items.map((i) => (
                <span key={i} className="after:content-['•'] last:after:content-[''] after:mx-2 text-[15px]">{i}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Contact buttons */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {profile.contacts.map((c) => {
          const Icon = iconMap[c.key] ?? Globe;
          return (
            <a
              key={c.key}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center justify-center gap-2 rounded-xl bg-white/70 dark:bg-black/40 glass border border-black/10 dark:border-white/10 px-4 py-3 text-[15px] hover:bg-white/80 dark:hover:bg-black/50"
              aria-label={c.aria ?? c.label}
            >
              <Icon className="w-5 h-5" aria-hidden />
              <span className="truncate">{c.label}</span>
            </a>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-5 text-black/70 dark:text-white/70 text-sm">
        This site mimics the macOS desktop. Double-click an app on the desktop or use the Dock to explore projects, resume and contact details.
      </p>
    </div>
  );
}


