![cover](/public/static/home_page.png?raw=true)

# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io) & Alexander Konietzko

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **DB for Analytics**: [Supabase](https://supabase.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics Dashboard**: [Umami](https://umami.is)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `data/*` - MDX data that is used for my blog
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction). Health check, spotify, guestbook.
- `pages/blog/*` - Static pre-rendered blog pages using MDX
- `pages/dashboard` - Containing metrics from health api
- `pages/projects` - Showcase of my current projects on GitHub
- `pages/about` - General information about me
- `pages/tweets` - My fav. tweets of all time
- `pages/*` - All other static pages.
- `public/*` - Static assets including fonts and images.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Running Locally

```bash
git clone https://github.com/dhruv-bvpdev/portfolio.git
cd Portfolio
yarn
yarn dev
```

Create a `.env` file  similar to [`.env.example`](https://github.com/dhruv-bvpdev/portfolio/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/dhruv-bvpdev/portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).