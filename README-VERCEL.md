# Deploying AiNu Security Solution to Vercel

This patch adds Vercel-ready files:
- `vercel.json` — security headers + clean URLs
- `middleware.ts` — basic bot blocking + extra security headers + CSP (tune as needed)
- `app/api/health/route.ts` — health endpoint for uptime checks
- `app/sitemap.ts` — automatic XML sitemap

## 1) Create a Git repo
```bash
git init
git add .
git commit -m "feat: initial"
git branch -M main
# push to your remote (GitHub/GitLab/Bitbucket)
git remote add origin <your-remote>
git push -u origin main
```

## 2) Import into Vercel
- Go to vercel.com → New Project → Import your repo
- Framework: **Next.js**
- Root directory: repository root
- Build & Output: defaults (Build Command `next build`, Output `.vercel/output` handled automatically)

## 3) Set Environment Variables
- `NEXT_PUBLIC_SITE_URL` = your production domain (e.g., https://ainu.example)
- (Optional) Analytics keys, status providers, etc.

## 4) Domains
- Add your domain and set DNS (apex + www). Use Vercel-managed DNS or add A/ALIAS + CNAME at your registrar.

## 5) Previews & Branch Protection
- Enable **Preview Deployments** for every PR
- Protect `main` with required checks

## 6) Observability
- Enable **Vercel Analytics** / Speed Insights (optional)
- Use `/api/health` for UptimeRobot/BetterStack checks

## 7) Security
- `middleware.ts` sets CSP and headers. If you add analytics (e.g., Plausible, PostHog, GA4) or 3rd-party iframes, update the CSP sources accordingly.
- Consider adding `security.txt` under `/.well-known/security.txt` with a contact address.
- Keep secret keys out of client env (no `NEXT_PUBLIC_` prefix).

## 8) Caching
- `vercel.json` adds long cache for static files in `/public/`.
- For API routes or SSR, rely on default caching; consider `revalidate` or `fetch` cache options as you add data.

## 9) Common Issues
- CSP blocks analytics: update `script-src` and `connect-src` in `middleware.ts`.
- Mixed content warnings: ensure `NEXT_PUBLIC_SITE_URL` uses **https**.
- 404 for pages: confirm routes exist under `app/.../page.tsx`.

Happy shipping!
