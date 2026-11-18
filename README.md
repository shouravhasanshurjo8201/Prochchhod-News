# প্রচ্ছদ নিউজ | Prochchhod News

**সংবাদে স্পষ্ট দৃষ্টিভঙ্গি।**  
বাংলা ও ইংরেজি পাঠকের জন্য তৈরি একটি আধুনিক, responsive editorial news portal। Next.js App Router, TypeScript, Tailwind CSS এবং Server Actions দিয়ে নির্মিত।

## বৈশিষ্ট্য

- **দ্বিভাষিক অভিজ্ঞতা:** বাংলা সংবাদ ও UI-এর সঙ্গে প্রয়োজনীয় ইংরেজি লেবেল।
- **সম্পাদকীয় হোমপেজ:** ব্রেকিং টিকার, প্রধান খবর, নির্বাচিত খবর, বিভাগভিত্তিক সংবাদ এবং সর্বাধিক পঠিত তালিকা।
- **সংবাদ পড়ার সুবিধা:** article details, related stories, reading-time হিসাব, font-size নিয়ন্ত্রণ ও share action।
- **দ্রুত অনুসন্ধান:** বাংলা ও ইংরেজি query সমর্থনসহ live suggestions ও search results।
- **বিভাগভিত্তিক pagination:** Server Action ব্যবহার করে Load More।
- **Light ও Dark theme:** ব্যবহারকারীর theme পছন্দ সংরক্ষিত থাকে।
- **Responsive layout:** মোবাইল থেকে বড় পর্দা পর্যন্ত অভিযোজিত grid ও touch-friendly controls।
- **ছবির fallback:** remote image লোড না হলে NewsImage একটি placeholder দেখায়।
- **SEO ও performance:** Server Components, metadata, Open Graph, dynamic article metadata এবং revalidation।
- **Publisher consistency:** API-তে আসা যেকোনো publisher/source নাম UI-তে দেখানোর আগে `Prochchhod News` হিসেবে normalize করা হয়।

## প্রযুক্তি

| প্রযুক্তি | ব্যবহার |
| --- | --- |
| Next.js 15 App Router | Routing, Server Components, metadata, image optimization |
| React 19 | UI components |
| TypeScript | Typed API ও application code |
| Tailwind CSS 3 | Responsive styling |
| Next.js Server Actions | Search ও category pagination |
| Hind Siliguri | বাংলা typography |
| Plus Jakarta Sans | ইংরেজি typography |

## শুরু করুন

### প্রয়োজনীয়তা

- Node.js 20.9 বা তার পরের সংস্করণ
- npm
- News API ব্যবহারের জন্য internet connection

### ইনস্টল ও চালানো

```bash
npm install
npm run dev
```

এরপর [http://localhost:3000](http://localhost:3000) খুলুন।

### Production build

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

## উপলভ্য scripts

| Command | কাজ |
| --- | --- |
| `npm run dev` | Development server চালু করে |
| `npm run build` | Optimized production build তৈরি করে |
| `npm run start` | Production server চালু করে |
| `npm run lint` | ESLint দিয়ে কোড পরীক্ষা করে |
| `npm run typecheck` | TypeScript type পরীক্ষা করে |

## পৃষ্ঠা ও ব্যবহার

| Route | বিবরণ |
| --- | --- |
| `/` | প্রধান খবর, ব্রেকিং টিকার, বিভাগ ও সর্বাধিক পঠিত |
| `/article/[id]` | পূর্ণ সংবাদ, metadata, পড়ার সময়, font controls ও related news |
| `/category/[slug]` | বিভাগভিত্তিক সংবাদ ও Load More |
| `/search?q=...` | বাংলা বা ইংরেজি শব্দ দিয়ে সংবাদ অনুসন্ধান |

## API ও ডেটা

API base URL: `https://news........./api/v2`

API fetch, response handling ও revalidation রয়েছে [`src/lib/api.ts`](./src/lib/api.ts)-এ। ব্যবহৃত endpoint:

| Endpoint | ব্যবহার |
| --- | --- |
| `GET /health` | API health check |
| `GET /categories` | Navigation categories |
| `GET /news/sections` | হোমপেজের editorial sections |
| `GET /news/latest?limit=5` | ব্রেকিং ও সর্বশেষ খবর |
| `GET /news/most-read` | সর্বাধিক পঠিত সংবাদ |
| `GET /news?limit=10` | সাধারণ সংবাদ feed |
| `GET /category/{slug}?page=1` | বিভাগভিত্তিক সংবাদ |
| `GET /article/{id}` | পূর্ণ article |
| `GET /article/{id}/related?limit=5` | সম্পর্কিত সংবাদ |
| `GET /search?q={query}` | বাংলা/ইংরেজি অনুসন্ধান |

`URLSearchParams` দিয়ে search query encode করা হয়। Publisher/source নাম [`src/lib/utils.ts`](./src/lib/utils.ts)-এর `formatNewsSource` ও `sanitizeNewsArticle(s)` দিয়ে normalize হয়; ফলে third-party source নাম UI-তে প্রকাশিত হয় না।

## প্রকল্পের কাঠামো

```text
src/
├── actions/
│   └── newsActions.ts
├── app/
│   ├── article/[id]/
│   ├── category/[slug]/
│   ├── search/
│   ├── icon.svg
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── article/
│   ├── layout/       # Header, Navbar, Footer, ThemeToggle
│   ├── news/         # BreakingTicker, HeroLead, NewsCard, sections
│   └── ui/           # NewsImage, SearchBar, loading ও pagination UI
├── lib/              # API client ও utility functions
└── types/            # News API ও article types
```

## গুরুত্বপূর্ণ implementation নোট

- Home, article এবং category page-এর প্রথম ডেটা Server Components-এ fetch হয়।
- Search এবং Load More-এর interactive request Server Actions দিয়ে সম্পন্ন হয়।
- API response-এ publisher হিসেবে যা-ই আসুক, প্রকাশিত label `Prochchhod News`-ই থাকে।
- Remote image host `next.config.ts`-এ অনুমোদিত; image ব্যর্থ হলে fallback placeholder দেখানো হয়।
- Route-গুলোর জন্য loading skeleton, empty state এবং error handling রয়েছে।
- Theme toggle-এর পাশাপাশি browser-এর system theme-ও প্রাথমিক পছন্দ হিসেবে ব্যবহৃত হয়।

