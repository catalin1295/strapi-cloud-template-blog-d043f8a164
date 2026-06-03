import { Link } from 'react-router-dom';
import { strapiImageUrl } from '../../services/api';

// Gradient per categorie (fallback cand nu e imagine)
const CAT_GRADIENT = {
  proiecte:  'from-blue-500 to-indigo-600',
  tutoriale: 'from-emerald-500 to-teal-600',
  reflectii: 'from-purple-500 to-violet-600',
  design:    'from-orange-500 to-pink-500',
};

function formatDate(iso) {
  if (!iso) return ''; // Siguranță în cazul în care data lipsește
  return new Date(iso).toLocaleDateString('ro-RO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function ArticleCard({ article }) {
  // SECURIRE 1: Verificăm dacă obiectul article sau attributes există, altfel punem un obiect gol ca fallback
  const attributes = article?.attributes || {};
  const { title = 'Articol fără titlu', slug = '', excerpt = '', publishedAt, category, image } = attributes;

  const catName = category?.data?.attributes?.name;
  const catSlug = category?.data?.attributes?.slug;
  const imgUrl  = strapiImageUrl(image);
  const gradient = CAT_GRADIENT[catSlug] || 'from-indigo-500 to-purple-600';

  return (
    <article className="group flex flex-col bg-white dark:bg-slate-800/60 rounded-2xl overflow-hidden
      border border-gray-100 dark:border-slate-700
      hover:border-indigo-300 dark:hover:border-indigo-500
      hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10
      transition-all duration-300">

      {/* Imagine / placeholder gradient */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="font-heading font-black text-6xl text-white/20 select-none">
              {/* SECURIRE 2: Prevenim crash-ul dacă titlul este cumva gol */}
              {title ? title[0] : '📝'}
            </span>
          </div>
        )}

        {/* Badge categorie */}
        {catName && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold
            bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full
            text-indigo-600 dark:text-indigo-400">
            {catName}
          </span>
        )}
      </div>

      {/* Continut */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2 line-clamp-2
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
          <time className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(publishedAt)}
          </time>
          {/* SECURIRE 3: Dacă nu există slug, link-ul trimite la pagina de blog, nu lasă aplicația să crape */}
          <Link
            to={slug ? `/blog/${slug}` : '/blog'}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400
              hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Citește →
          </Link>
        </div>
      </div>
    </article>
  );
}
