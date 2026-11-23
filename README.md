# প্রচ্ছদ নিউজ | Prochchhod News

বাংলা-প্রধান একটি editorial news portal, নির্মিত Next.js App Router, React, TypeScript ও Tailwind CSS দিয়ে। হোমপেজের সম্পাদকীয় বিভাগ, সংবাদ অনুসন্ধান, article details এবং category infinite scroll একটি server-backed news API থেকে ডেটা নেয়।

## কী আছে

- **হোমপেজ editorial layout:** breaking ticker, hero lead, নির্বাচিত খবর, category sections এবং Most Read sidebar।
- **Promo filtering:** নির্দিষ্ট promotional article, image-alt ও image marker lead ও featured display থেকে বাদ দেওয়া হয়; promo/social section-ও home layout-এ দেখানো হয় না।
- **Live Dhaka clock:** header-এ `Asia/Dhaka` timezone অনুযায়ী সময় প্রতি সেকেন্ডে আপডেট হয়।
- **Article details:** structured body blocks, image ও text fallback, tags, estimated reading time, share/font-size controls, related stories এবং Most Read stories।
- **Category infinite scroll:** page 1 Server Component-এ load হয়; `IntersectionObserver` পরের page `/api/category-news` Route Handler দিয়ে আনে। duplicate article ID বাদ দেওয়া, loading, retry এবং end-of-list state আছে।
- **Search:** বাংলা/ইংরেজি query, 350ms debounced header suggestions (সর্বোচ্চ 5টি) এবং search results page। client-side search Server Action ব্যবহার করে।
- **Navigation:** API categories-সহ sticky horizontal navigation; active route `aria-current="page"` ও accent indicator দিয়ে চিহ্নিত।
- **Theme:** light/dark mode; ব্যবহারকারীর পছন্দ `localStorage`-এ রাখা হয়, আর প্রথমবার browser preference ব্যবহৃত হয়।
- **Publisher consistency:** article source label সবসময় `Prochchhod News` হিসেবে format করা হয়।
- **Image fallback:** Next.js `Image`-এর মাধ্যমে remote image optimize করা হয়; image অনুপস্থিত বা ব্যর্থ হলে placeholder দেখা যায়।
- **Loading ও error states:** home, article, category ও search-এর loading UI; global error এবং not-found pages।
- **SEO:** site metadata, Open Graph metadata এবং article/category-specific metadata।
- **Typography ও favicon:** `Noto Sans Bengali` `next/font/google` দিয়ে load হয়; custom SVG icon `src/app/icon.svg`-এ।

## প্রযুক্তি

| প্রযুক্তি | ব্যবহার |
| --- | --- |
| Next.js 15 App Router | Routing, Server Components, Route Handlers, metadata ও image optimization |
| React 19 | UI ও client interactions |
| TypeScript | API, route ও component types |
| Tailwind CSS 3 | Responsive utility styling |
| Next.js Server Actions | Live search; pagination helper |
| Lucide React | Interface icons |

## Routes

| Route | কাজ |
| --- | --- |
| `/` | Breaking ticker, hero, নির্বাচিত খবর, বিভাগ এবং Most Read |
| `/article/[id]` | Article details, related ও Most Read sections |
| `/category/[slug]` | Category details ও infinite-scroll feed |
| `/search?q=...` | Search results; query `URLSearchParams` দিয়ে encode করা হয় |
| `/api/category-news?slug=<slug>&page=<n>` | Infinite scroll-এর পরবর্তী category page; API call server-এ থাকে |

Search suggestions ও interactive results `searchNewsAction` Server Action ব্যবহার করে। Category infinite scroll browser থেকে `/api/category-news` Route Handler-এ request করে; handler server-side `getCategoryNews` কল করে, ফলে API base URL client bundle-এ যায় না। `src/actions/newsActions.ts`-এ `loadMoreCategory` helper-টিও রাখা আছে।

## ডেটা ও caching

API client [`src/lib/api.ts`](./src/lib/api.ts)-এ। `NEWS_API_BASE_URL`-এর সঙ্গে নিচের endpoint-গুলো জোড়া হয়:

| Endpoint | ব্যবহারের উদ্দেশ্য |
| --- | --- |
| `GET /health` | API health-check helper |
| `GET /categories` | Header navigation |
| `GET /news/sections` | Home editorial ও category sections |
| `GET /news/latest?limit=5` | Breaking ticker |
| `GET /news/most-read` | Home ও article Most Read sections |
| `GET /news?limit=10` | Home feed/fallback |
| `GET /category/{slug}?page={n}` | Category page ও infinite-scroll data |
| `GET /article/{id}` | Article details |
| `GET /article/{id}/related?limit={n}` | Related stories |
| `GET /search?q={query}` | News search |

Home, article, category ও search pages এবং category API Route Handler-এ `revalidate = 120` সেট করা আছে। API data fetch-এ `NEWS_API_REVALIDATE_SECONDS` ব্যবহৃত হয়; এর default `120` সেকেন্ড। Category API response-এ `s-maxage=120` ও `stale-while-revalidate=120` cache headers দেওয়া হয়। `/health` helper ইচ্ছাকৃতভাবে 60 সেকেন্ড revalidation ব্যবহার করে।

## Environment variables

`NEWS_API_BASE_URL` আবশ্যক। এটি API-এর base URL হবে, endpoint path-সহ (যেমন `/api/v2` পর্যন্ত); কোডে শেষের slash থাকলে সরিয়ে নেওয়া হয়। `NEWS_API_REVALIDATE_SECONDS` ঐচ্ছিক এবং integer `0` বা তার বেশি হতে হবে।

Local environment তৈরি করুন:

```bash
cp .env.example .env.local
```

`.env.local`-এ `NEWS_API_BASE_URL`-এর placeholder-টি আপনার ব্যবহৃত API base URL দিয়ে বদলান। বর্তমান `.env.example`:

```dotenv
NEWS_API_BASE_URL=NEWS_API_BASE_URL
NEWS_API_REVALIDATE_SECONDS=120
```

উদাহরণস্বরূপ, API base URL যদি `https://api.example.com/api/v2` হয়:

```dotenv
NEWS_API_BASE_URL=https://api.example.com/api/v2
NEWS_API_REVALIDATE_SECONDS=120
```

`https://api.example.com/api/v2` শুধু format বোঝানোর placeholder—নিজের API host ব্যবহার করুন। API base URL অনুপস্থিত হলে API module স্পষ্ট error দেয়; revalidation মান integer না হলে বা ঋণাত্মক হলে configuration error হয়।

## Local development

### প্রয়োজনীয়তা

- Node.js `18.18.0` বা পরবর্তী সমর্থিত সংস্করণ (Next.js 15-এর engine requirement অনুযায়ী)
- npm
- সচল News API endpoint

### Install ও dev server

```bash
npm install
cp .env.example .env.local
# .env.local-এ API base URL সেট করুন
npm run dev
```

Development server সাধারণত [http://localhost:3000](http://localhost:3000)-এ পাওয়া যায়।

### Checks ও production

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` চালানোর আগে production build তৈরি করতে হবে।

| Script | কাজ |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Optimized production build |
| `npm run start` | Production server |

## Project structure

```text
src/
├── actions/
│   └── newsActions.ts             # Search action ও category pagination helper
├── app/
│   ├── api/category-news/
│   │   └── route.ts               # Server-side infinite-scroll endpoint
│   ├── article/[id]/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── category/[slug]/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── search/
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── article/                   # ArticleTools
│   ├── layout/                    # Header, DhakaClock, Navbar, Footer, ThemeToggle
│   ├── news/                      # Hero, cards, sections, search & infinite feed
│   └── ui/                        # NewsImage, SearchBar
├── lib/
│   ├── api.ts                     # Server-side API client ও cache options
│   └── utils.ts                   # Date, source, image ও reading-time helpers
└── types/
    ├── components.ts              # Shared component props
    ├── news.ts                    # News API/domain models
    └── routes.ts                  # Route ও global error props
```

Repository root-এ `next.config.ts` (remote image patterns), `tailwind.config.ts`, `postcss.config.mjs`, `tsconfig.json` ও ESLint configuration রয়েছে।
