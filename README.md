# andrewldelacruz.github.io

Personal engineering portfolio. Plain HTML, CSS, and one small JS file — no build step, no
dependencies, no npm. Edit a file, refresh the browser, done.

## Structure

```
index.html              Home page: hero, projects, experience, skills, about
projects/*.html         One page per project — all three share the same structure
css/style.css           The only stylesheet. Colors and spacing are CSS variables at the top.
js/main.js              Mobile nav, photo placeholder fallback, gallery lightbox
assets/img/             Photos, one folder per project
assets/resume.pdf       Résumé (see IMAGES-TODO.md — not added yet)
IMAGES-TODO.md          Checklist of photos still needed
.nojekyll               Tells GitHub Pages not to run Jekyll
```

## Editing text

Edit the files on github.com. One copy of the truth, changes go live in about a minute, and it
works from a phone.

### The quick way — one file

1. Go to <https://github.com/andrewldelacruz/andrewldelacruz.github.io>
2. Click the file you want (`index.html` for the home page, `projects/*.html` for a project)
3. Click the **pencil icon** at the top right
4. Find your text and change it
5. Scroll down, write a short note about what you changed, click **Commit changes**

Live in roughly a minute. Hard-refresh (**Cmd + Shift + R**) if you don't see it.

### The better way — several files at once

On the repo page, press the **`.`** key. That opens github.dev: full VS Code in your browser, with
the whole repo open. Edit as many files as you like, then use the Source Control panel on the left
to commit and push. Nothing to install.

### Finding your text in the HTML

Use **Cmd + F** and search for a few words of the sentence you want to change. Your text sits
between tags, and you edit only the part between them:

```html
<p>
  I'm a second-year mechanical engineering student at UC Davis.
</p>
```

Change the words, leave the `<p>` and `</p>` alone. Same for `<h2>`, `<li>`, and `<figcaption>`.

A few things worth knowing:

- `<strong>bold text</strong>` makes text bold. Keep both tags or neither.
- `&amp;` is how an `&` is written in HTML. Leave it as is.
- `&nbsp;` is a space that won't line-break. Leave it as is.
- If you delete a tag by accident, don't panic: GitHub keeps every version. Open the file's
  **History** and restore the previous one.

### Why not edit on the page itself

An earlier version of this site had an in-page editor that saved to the browser. It was convenient
but wrong in a specific way: the edits lived in one browser and nowhere else, so the site you saw
and the site everyone else saw drifted apart, and publishing meant downloading files and putting
them back by hand. Editing the file directly removes the copy, and with it the drift.

## Previewing locally

```bash
cd ~/Documents/GitHub/andrewldelacruz.github.io && python3 -m http.server 8123
```

Then open <http://localhost:8123>. Use a server rather than opening the file directly — relative
paths and the placeholder fallback behave differently over `file://`.

## Publishing

This is a GitHub Pages **user site**, which has three rules: the repository must be named exactly
`<your-username>.github.io`, it must be **public**, and it publishes from the root of the default
branch. No Actions workflow, no configuration file.

First-time setup:

1. On github.com, create a new **public** repository named `andrewldelacruz.github.io`
   (substitute your actual username if it differs). Don't add a README or .gitignore — this folder
   already has them.
2. In GitHub Desktop: **File → Add Local Repository**, choose this folder, then **Publish
   repository**. Leave "Keep this code private" unchecked.
3. On github.com, go to **Settings → Pages**. Under "Build and deployment", set Source to
   *Deploy from a branch*, branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then open <https://andrewldelacruz.github.io>.

After that, every push republishes automatically — usually live within a minute.

## Notes

- No third-party requests. System fonts, no CDN, no analytics, no trackers. The site is
  self-contained and will still work in five years.
- Light and dark mode both supported via `prefers-color-scheme`.
- The phone number is deliberately not on the site — only email and LinkedIn. Recruiters who need
  the number have the résumé.

### If a change doesn't show up

Browsers cache CSS for a few minutes, so a style change can take a moment to appear. Hard-refresh
with **Cmd + Shift + R** to force it.

The `?v=6` on the stylesheet link exists for this reason — bumping that number makes every browser
fetch the CSS fresh. If you edit `css/style.css` and the change doesn't appear, bump it to `?v=7`
in all five HTML files. Text changes need no version bump; this applies to CSS only.
