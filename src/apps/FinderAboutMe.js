import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { profile } from '../data/profile';
import { Apple, Settings2, Sparkles, Globe2, Mail, Phone, Linkedin, Github, Globe } from 'lucide-react';
const iconMap = {
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
function Card({ title, icon, children }) {
    const Icon = iconMap[icon] ?? Settings2;
    return (_jsxs("section", { className: "rounded-xl bg-white/70 dark:bg-black/40 glass border border-black/10 dark:border-white/10 p-4", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-black/70 dark:text-white/70", children: [_jsx(Icon, { className: "w-5 h-5", "aria-hidden": true }), _jsx("span", { children: title })] }), _jsx("div", { className: "mt-2 text-[15px] leading-6 text-black/90 dark:text-white/90", children: children })] }));
}
export function FinderAboutMe() {
    return (_jsxs("div", { className: "p-5 text-black dark:text-white select-text", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center", children: _jsx(Apple, { className: "w-8 h-8", "aria-hidden": true }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold", children: "About This Mac" }), _jsxs("p", { className: "text-black/70 dark:text-white/80", children: [profile.name, " \u00B7 ", profile.title] })] }), _jsx("div", { className: "ml-auto", children: _jsx("button", { className: "rounded-lg px-3 py-1 text-sm bg-white/60 dark:bg-black/40 glass border border-black/10 dark:border-white/10", "aria-label": "Window Style", children: "Tahoe" }) })] }), _jsx("div", { className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-4", children: profile.sections.map((sec) => (_jsx(Card, { title: sec.title.toUpperCase(), icon: sec.key, children: _jsx("div", { className: "flex flex-wrap gap-x-2 gap-y-1", children: sec.items.map((i) => (_jsx("span", { className: "after:content-['\u2022'] last:after:content-[''] after:mx-2 text-[15px]", children: i }, i))) }) }, sec.key))) }), _jsx("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3", children: profile.contacts.map((c) => {
                    const Icon = iconMap[c.key] ?? Globe;
                    return (_jsxs("a", { href: c.href, target: c.href.startsWith('http') ? '_blank' : undefined, rel: c.href.startsWith('http') ? 'noreferrer' : undefined, className: "flex items-center justify-center gap-2 rounded-xl bg-white/70 dark:bg-black/40 glass border border-black/10 dark:border-white/10 px-4 py-3 text-[15px] hover:bg-white/80 dark:hover:bg-black/50", "aria-label": c.aria ?? c.label, children: [_jsx(Icon, { className: "w-5 h-5", "aria-hidden": true }), _jsx("span", { className: "truncate", children: c.label })] }, c.key));
                }) }), _jsx("p", { className: "mt-5 text-black/70 dark:text-white/70 text-sm", children: "This site mimics the macOS desktop. Double-click an app on the desktop or use the Dock to explore projects, resume and contact details." })] }));
}
