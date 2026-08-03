# callmedavy.com

Personal site for Davy Mellado. Built with Astro, deployed on Netlify, content editable through Decap CMS at `/admin`.

## Two ways to deploy on Netlify

You can pick either. Path B is the one you want long-term because Netlify Forms and Decap CMS both need a real Git repo behind them.

### Path A — Drag-and-drop the built site (fastest, minute-one)

1. Run `npm install` then `npm run build` locally. That produces a `dist/` folder.
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder into the browser.
4. Done. You get a random `*.netlify.app` URL.
5. Under Site settings → Domain management, add `callmedavy.com`.

**Caveats:** Netlify Forms won't be detected on drag-drop deploys unless you also enable form detection under Forms → Settings. The CMS (`/admin`) won't work without Netlify Identity + Git Gateway (Path B).

### Path B — Connect a Git repo (recommended, full CMS + Forms)

1. Push this whole folder to a new GitHub / GitLab / Bitbucket repo.
2. In Netlify: **Add new site → Import an existing project**, pick your repo.
3. Netlify reads `netlify.toml` and auto-fills:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20`
4. Click **Deploy**. First build takes ~1 minute.
5. Under Site settings → Domain management, add `callmedavy.com` and follow the DNS steps.

## After the first deploy — one-time setup

### Enable Netlify Forms

Nothing to do. The contact form has `data-netlify="true"` and Netlify auto-detects it on Git-based deploys. Submissions show up under **Forms** in the Netlify dashboard. Add a notification email under **Forms → Settings → Form notifications**.

### Enable Decap CMS (the `/admin` panel)

1. **Enable Netlify Identity**: Site → Identity → Enable Identity.
2. Under Identity → Registration preferences, set to **Invite only** (unless you want anyone to sign up).
3. Under Identity → Services → Git Gateway, click **Enable Git Gateway**.
4. Click **Invite users**, invite yourself with your email.
5. Accept the invite from your inbox, set a password.
6. Go to `https://callmedavy.com/admin/`. Log in. Edit projects, bio, site settings, etc.

### Local CMS editing (optional)

If you want to run the CMS against your local repo without deploying every change:

```bash
npx decap-server         # in one terminal
npm run dev              # in another
```

Then visit `http://localhost:4321/admin/`.

## Project structure

```
site/
├── astro.config.mjs
├── netlify.toml               ← Netlify build config
├── package.json
├── .nvmrc                     ← Node 20
├── content/                   ← Editable content
│   ├── site.json              ← Site + contact settings
│   ├── bio.json               ← Short + long bio
│   ├── content.json           ← Canonical export (bundle of everything)
│   └── projects/*.json        ← One file per project (42 files)
├── public/
│   ├── _redirects             ← Legacy URL redirects
│   ├── favicon.svg
│   ├── admin/                 ← Decap CMS admin panel
│   │   ├── index.html
│   │   └── config.yml
│   └── images/
│       └── projects/          ← 249 project images
└── src/
    ├── layouts/Base.astro
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── Zone.astro         ← Modular section component
    │   ├── LoveStamp.astro    ← Spinning "made with love" seal
    │   ├── Motifs.astro       ← Background icons (smileys, ghosts, etc.)
    │   └── Sparkles.astro     ← Cursor-following rainbow sparkles
    ├── styles/global.css
    └── pages/
        ├── index.astro        ← Home
        ├── bio.astro          ← About
        ├── contact.astro      ← Say hi (form)
        ├── contact/thanks.astro
        └── work/
            ├── index.astro    ← All projects
            └── [slug].astro   ← Individual project (42 pages)
```

## Local development

```bash
nvm use            # Node 20 via .nvmrc
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

## Domain notes

- Primary domain: `callmedavy.com`
- Add both `callmedavy.com` and `www.callmedavy.com` in Netlify, set one as primary, HTTPS auto.
- If the domain is currently on Webflow, you'll want to point DNS from Webflow to Netlify. Netlify will show you the exact records.

## Generated content

Anywhere something is authored (not from the original Webflow scrape), the JSON file has `"generated": true`. Currently that's `bio.json` and the short/long bio prose. Every project retains its original source URL in `sourceUrl`.
