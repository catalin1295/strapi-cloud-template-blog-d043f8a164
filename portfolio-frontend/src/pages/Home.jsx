import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles, getCategories } from '../services/api';
import ArticleCard from '../components/ui/ArticleCard';

const CAT_ICON = {
  'Proiecte':  '🚀',
  'Tutoriale': '📚',
  'Reflecții': '💭',
  'Design':    '🎨',
};

// Componenta skeleton loader
function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl ${className}`} />;
}

export default function Home() {
  const [articles,   setArticles]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    Promise.all([getArticles(), getCategories()]).then(([arts, cats]) => {
      setArticles(arts);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {/* ════════════════════════════════════
          HERO SECTION — banner + text + CTA
          ════════════════════════════════════ */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 15% 60%, #1e1b4b 0%, #0f172a 55%, #020617 100%)' }}
      >
        {/* Cercuri decorative animate */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full
            bg-gradient-radial from-indigo-600/25 to-transparent blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full
            bg-gradient-radial from-violet-700/20 to-transparent blur-3xl" />
          {/* Grid dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8
              bg-white/10 border border-white/20 rounded-full backdrop-blur-sm
              text-white/80 text-sm font-medium animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
              Student în Informatică Aplicată
            </div>

            {/* Hero heading */}
            <h1 className="font-heading font-black text-white leading-tight mb-6
              text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up">
              Bună, eu sunt{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Prenume Nume
              </span>
            </h1>

            {/* Subtitre italic — font Playfair Display */}
            <p className="font-accent italic text-indigo-200/80 text-xl md:text-2xl mb-5 animate-fade-up delay-100">
              Web developer în devenire
            </p>

            {/* Descriere */}
            <p className="text-slate-300/80 text-lg leading-relaxed mb-10 max-w-2xl animate-fade-up delay-200">
              Construiesc interfețe moderne cu React și Tailwind CSS.
              Documentez proiectele, tutorialele și gândurile mele despre tech.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link
                to="/blog"
                className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500
                  text-white font-bold rounded-xl transition-all
                  hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30 active:scale-95"
              >
                Explorează articolele
              </Link>
              <Link
                to="/about"
                className="px-7 py-3.5 border border-white/25 hover:border-white/50
                  text-white font-bold rounded-xl transition-all
                  hover:-translate-y-0.5 backdrop-blur-sm active:scale-95"
              >
                Despre mine →
              </Link>
            </div>
          </div>
        </div>

        {/* Indicator scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-slate-500 animate-fade-in delay-400">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════
          STATS BAR
          ════════════════════════════════════ */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Articole publicate', value: articles.length || '4+' },
              { label: 'Categorii',           value: categories.length || '4' },
              { label: 'Tehnologii folosite', value: '6+' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-heading font-black text-2xl md:text-3xl text-indigo-600 dark:text-indigo-400">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CATEGORII
          ════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          {/* Titlu sectiune */}
          <div className="mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
              Explorează
            </p>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-gray-900 dark:text-white">
              Categorii
            </h2>
          </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => {
              // MODIFICARE AICI: Am adăugat ?. peste tot pentru a preveni crash-ul dacă datele lipsesc
              const articlesInCat = articles ? articles.filter(
                a => a?.attributes?.category?.data?.attributes?.slug === cat?.attributes?.slug
              ).length : 0;
        
              return (
                <Link
                  key={cat.id}
                  to={`/blog?category=${cat?.attributes?.slug || ''}`}
                  className="group p-6 bg-white dark:bg-slate-800/60 rounded-2xl
                    border border-gray-100 dark:border-slate-700
                    hover:border-indigo-300 dark:hover:border-indigo-500
                    hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10
                    transition-all duration-300"
                >
                  <div className="text-3xl mb-3">
                    {CAT_ICON[cat?.attributes?.name] || '📌'}
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white
                    group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat?.attributes?.name}
                  </h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {articlesInCat} {articlesInCat === 1 ? 'articol' : 'articole'}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
        </div>
      </section>

      {/* ════════════════════════════════════
          ULTIMELE ARTICOLE
          ════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          {/* Titlu sectiune */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
                Recente
              </p>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-gray-900 dark:text-white">
                Ultimele articole
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden md:inline-flex items-center gap-1.5
                text-sm font-semibold text-indigo-600 dark:text-indigo-400
                hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
            >
              Vezi toate
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-72" />)}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.slice(0, 3).map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Buton "toate" pe mobil */}
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3
                bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl
                transition-all active:scale-95"
            >
              Toate articolele →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA SECTION
          ════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4">
            Vrei să luăm legătura?
          </h2>
          <p className="font-accent italic text-indigo-200 text-lg mb-8">
            Sunt deschis la colaborări, stagii și proiecte interesante.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4
              bg-white text-indigo-700 font-bold rounded-xl
              hover:bg-indigo-50 transition-all hover:-translate-y-0.5
              shadow-lg shadow-black/20 active:scale-95"
          >
            Trimite un mesaj →
          </Link>
        </div>
      </section>
    </>
  );
}
