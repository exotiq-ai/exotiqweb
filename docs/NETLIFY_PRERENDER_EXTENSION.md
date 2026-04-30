# Netlify Prerender extension (migration from legacy SPA prerender)

Use this checklist when moving a **single-page app (SPA)** on Netlify from the **legacy** `@netlify/plugin-prerendera-spa` setup to the **Prerender extension**. Crawlers, AI agents, and preview bots get pre-rendered HTML; normal visitors still get your JavaScript app.

**Official background:** [Prerender extension GA & legacy deprecation](https://www.netlify.com/changelog/2025-12-16-prerender-extension-ga/) (timeline for when legacy stops per plan).

---

## 1. Prerequisites

- Site deploys a static `dist` (or similar) with a **client-side router** (React, Vue, etc.).
- You already have an SPA fallback so human traffic works:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

Prerendering is **additive**: it does not replace this redirect for regular browsers.

---

## 2. In the Netlify UI

1. **Disable legacy prerendering**  
   Site settings → find the **legacy** prerender / SPA prerender option → turn it **off** (if it was on).

2. **Install the Prerender extension**  
   [Netlify Extensions](https://www.netlify.com/integrations/) → **Prerender** → add to the site.

3. **Configure routes in the extension**  
   Add URLs that should be pre-rendered for bots (see section 4). Exact UI labels may change; follow the [Prerender extension documentation](https://docs.netlify.com/) (search “Prerender extension” in Netlify docs if the direct link moves).

4. **Deploy**  
   Trigger a production deploy after changes so behavior is consistent.

---

## 3. In `netlify.toml` (and repo)

Remove the **legacy** plugin and its inputs so builds do not depend on deprecated behavior:

**Remove blocks like:**

```toml
[[plugins]]
  package = "@netlify/plugin-prerender-spa"

[plugins.inputs]
  cacheAge = 604800
  routes = [ "/", "/about", ... ]
```

**Optional comment** (so the next person knows where prerender lives):

```toml
# Crawler/bot prerendering: Netlify Prerender extension (site UI), not this file.
```

**Keep** your `[[redirects]]` SPA fallback and any `[[headers]]` you use for caching and security.

**`package.json`:** If `@netlify/plugin-prerender-spa` was a devDependency, remove it and run `npm install` (many projects only referenced the plugin in `netlify.toml`).

---

## 4. Which routes to prerender

Minimum for a marketing + app shell site:

| Priority | Examples |
|----------|----------|
| High | `/`, main landing and conversion pages |
| High | Top-level sections: `/about`, `/contact`, `/pricing`, etc. |
| Medium | Index lists: `/blog`, `/docs`, product hubs |
| As needed | Important **deep links** (hero articles, legal pages) if the extension supports explicit paths or patterns |

**SPAs with dynamic content:** Pre-rendered HTML is a **snapshot at crawl time**. Pages that load all content client-side (e.g. from an API) may still look thin to bots unless the extension runs JS long enough to settle—or you add SSR/SSG for those routes separately. Plan routes accordingly.

---

## 5. Verification

- Open a prerendered URL as a **normal browser** → should behave like before (SPA).
- Use a **crawler or bot user-agent** (or Netlify’s prerender checker if available) and confirm the HTML body contains meaningful text, not only an empty `<div id="root">`.
- Re-check **Open Graph / Twitter** previews for key share URLs.

---

## 6. Rollback (short term)

If something breaks: re-enable the **extension** settings first (or support); restoring the legacy plugin is **not** a long-term fix because legacy support is being removed per Netlify’s timeline.

---

## 7. One-page summary for another repo

1. Turn off legacy prerender in Netlify.  
2. Install **Prerender** extension; configure URL list.  
3. Delete `@netlify/plugin-prerender-spa` (and `[plugins.inputs]`) from `netlify.toml`.  
4. Keep `/* → /index.html`.  
5. Deploy and verify with a bot UA.

---

*This file is meant to be copied into other repositories as-is or trimmed to your standards.*
