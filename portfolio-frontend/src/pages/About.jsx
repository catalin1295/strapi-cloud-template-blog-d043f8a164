import { useState, useEffect } from 'react';
import { getAbout, strapiImageUrl } from '../services/api';

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl ${className}`} />;
}

export default function About() {
  const [about,   setAbout]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAbout().then(data => {
      setAbout(data);
      setLoading(false);
    });
  }, []);

  const attr    = about?.attributes ?? {};
  const imgUrl  = strapiImageUrl(attr.avatar);
  const skills  = Array.isArray(attr.skills)      ? attr.skills      : [];
  const xp      = Array.isArray(attr.experience)  ? attr.experience  : [];

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-gray-50 dark:bg-slate-900 py-20 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <Skeleton className="w-32 h-32 rounded-full flex-shrink-0" />
              <div className="flex-1 w-full space-y-3">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 animate-fade-up">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={attr.name}
                    className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100 dark:ring-indigo-900"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600
                    flex items-center justify-center ring-4 ring-indigo-100 dark:ring-indigo-900">
                    <span className="font-heading font-black text-white text-4xl">
                      {(attr.name || 'P')[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                {/* Label pagina */}
                <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
                  Despre mine
                </p>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-gray-900 dark:text-white mb-2">
                  {attr.name || 'Ticu Catalin'}
                </h1>
                <p className="font-accent italic text-indigo-500 dark:text-indigo-400 text-xl mb-5">
                  {attr.role || 'Student în Informatică Informatica'}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  {attr.bio || 'Pasionat de web development modern.'}
                </p>

                {/* Linkuri social */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {attr.github && (
                    <a
                      href={attr.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-slate-700
                        text-white text-sm font-semibold rounded-xl hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {attr.linkedin && (
                    <a
                      href={attr.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700
                        text-white text-sm font-semibold rounded-xl hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
            Tehnologii &amp; Skill-uri
          </h2>
          <p className="font-accent italic text-gray-400 dark:text-gray-500 mb-8">
            Ce știu să fac și cu ce lucrez
          </p>

          {loading ? (
            <div className="flex flex-wrap gap-3">
              {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-9 w-24" />)}
            </div>
          ) : skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50
                    text-indigo-700 dark:text-indigo-300
                    border border-indigo-100 dark:border-indigo-800
                    rounded-full text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">—</p>
          )}
        </div>
      </section>

      {/* ═══ EXPERIENTA / TIMELINE ═══ */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-gray-900 dark:text-white mb-2">
            Parcurs
          </h2>
          <p className="font-accent italic text-gray-400 dark:text-gray-500 mb-10">
            Proiecte, studii și repere importante
          </p>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)}
            </div>
          ) : xp.length > 0 ? (
            <div className="relative pl-8 space-y-8">
              {/* Linie verticala timeline */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-indigo-200 dark:bg-indigo-800" />

              {xp.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Punct pe linie */}
                  <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full
                    bg-indigo-600 dark:bg-indigo-400 ring-2 ring-white dark:ring-slate-900" />

                  <div className="bg-white dark:bg-slate-800/60 rounded-2xl p-5
                    border border-gray-100 dark:border-slate-700">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/50
                        text-indigo-600 dark:text-indigo-400 rounded-full">
                        {item.year}
                      </span>
                      <h3 className="font-heading font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Nicio intrare de experiență adăugată.</p>
          )}
        </div>
      </section>
    </>
  );
}
