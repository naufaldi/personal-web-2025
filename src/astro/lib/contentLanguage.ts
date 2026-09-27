// Legacy markdown has no language metadata. Keep reviewed exceptions explicit;
// new English content inherits the site's default without guessing from its text.
const indonesianArticles = new Set([
  'alasan-import-svg-sebagai-react-component',
  'berbagai-cara-membuat-kondisional-class-component-css-di-emotion-dan-tailwind-macro',
  'burnout-dan-cara-mengatasi',
  'cara-bertanya-permasalahan-dalam-pemrogram-yang-baik',
  'cara-import-svg-di-nextjs',
  'cara-import-svg-sebagai-react-component-di-nextjs',
  'cara-install-nextjs-twin-macro-dan-emotion-css-in-js',
  'cara-install-react-id-swiper-untuk-membuat-komponen-react-slideshow',
  'cara-menangani-responsive-di-nextjs-ssr',
  'cara-menghitung-nilai-project-freelance-untuk-pemula',
  'cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code',
  'cara-setup-tailwind-css-react-create-app-cra',
  'competitive-programming-for-software-engineer',
  'digital-nomad-di-kota-malang',
  'fast-prototyping-dengan-budibase',
  'first-month-to-do-list-as-software-engineer',
  'harus-ya-mahir-menuliskan-kode',
  'if-you-re-not-paying-for-the-product-then-you-re-the-product',
  'lesson-learned-dari-test-accesibility-pada-website',
  'library-react-untuk-membuat-table',
  'list-kumpulan-tailwind-ui-kit-dan-tailwind-ui-block',
  'membandingkan-tailwindcss-dengan-framework-lain',
  'membuat-redirect-dengan-onclick-after-event-di-react',
  'membuat-reusable-component-dengan-menggunakan-tailwindcss-dan-classnames-di-reactjs',
  'membuat-reusable-component-dengan-twin-macro-nextjs-dan-emotion-bag-1',
  'mencegah-scrolling-saat-modal-terbuka',
  'mengatasi-error-module-not-found-can-x27-t-resolve-x27-swiper-swiper-css-x27-di-react-id-swiper',
  'menggunakan-aos-animation-library-di-nextjs',
  'menggunakan-debian-package-ppa-daripada-snap-package',
  'menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js',
  'meningkatkan-readability-pada-kode',
  'menulis-untuk-membuat-sejarah',
  'menuliskan-skillset-pada-cv',
  'murahnya-biaya-desain-dan-aplikasi',
  'nvm-untuk-manajemen-node-version',
  'outline-blue-dan-aksesibilitas-pada-chakra-ui',
  'pattern-blur-image-memilih-antara-svg-atau-png',
  'pelajaran-yang-saya-dapatkan-saat-memberikan-mentorship-frontend',
  'pentingnya-bahasa-inggris-untuk-pemrogram',
  'quick-note-showwcase-id-suka-duka-menjadi-tech-content-creator',
  'repository-github-untuk-meningkatkan-skill-pemrograman',
  'rfc-request-for-comment-apa-dan-mengapa',
  'saya-menyukai-dunia-programming-namun-hanya-di-bagian-logika-dan-matematika-nya-saja',
  'seputar-custom-scrollbar-css-pada-firefox-dan-chrome',
  'snippet-membuat-gradient-underline',
  'step-by-step-belajar-frontend-untuk-pemula',
  'tantangan-dan-kesulitan-sebagai-frontend-dev',
  'tips-lolos-probation',
  'tips-memaksimalkan-magang',
  'tips-meningkatkan-produktifitas-dengan-visual-studio-code',
  'tools-untuk-membuat-dokumentasi',
  'twin-macro-sebagai-alternatif-menggunakan-tailwindcss-dan-css-in-js',
  'unit-testing-react-component',
])

const englishTitles = new Set([
  'competitive-programming-for-software-engineer',
  'first-month-to-do-list-as-software-engineer',
  'if-you-re-not-paying-for-the-product-then-you-re-the-product',
  'unit-testing-react-component',
])

export function contentLanguage(path: string, part: 'content' | 'title' | 'description' = 'content'): 'en' | 'id' {
  if (!path.startsWith('/blogs/')) return 'en'
  const slug = path.slice('/blogs/'.length)
  if (part === 'title' && englishTitles.has(slug)) return 'en'
  if (part === 'description' && slug === 'state-management-in-reactjs') return 'id'
  if (part === 'description' && slug === 'if-you-re-not-paying-for-the-product-then-you-re-the-product') return 'en'
  return indonesianArticles.has(slug) ? 'id' : 'en'
}
