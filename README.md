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

## Editing it

**Change wording:** open the `.html` file and edit the text. Nothing is generated.

**Change colors or fonts:** the top of `css/style.css` has two blocks of variables — one for light
mode, one for dark. Change `--accent` to recolor every link, button, and heading accent at once.

**Add a photo:** see `IMAGES-TODO.md`. Short version — name the file exactly as listed, drop it in
the right folder, push. Placeholders disappear automatically.

**Add a fourth project:** copy `projects/nightstand-hub.html` to a new filename, replace the
content, then add a matching card to the `.cards` block in `index.html` and a new folder under
`assets/img/`.

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

## Editing text in the browser

You can edit any text on the site directly on the page, without opening a code editor.

**Turn it on:** add `?edit` to any URL — e.g. <https://andrewldelacruz.github.io/?edit> — or press
**Cmd + Shift + E** on any page. Press Escape or click Done to leave.

Click any text, type. Edits save to your browser automatically as you go.

### The important part

Your edits are stored in **your browser only**. GitHub Pages serves static files, so a web page
cannot write back to this repository. The live site everyone else sees does not change until you
publish, which is two steps:

1. In edit mode, click **Download edited pages**. You get the real `.html` files with your changes
   applied.
2. Replace the matching files in this folder with the downloaded ones, then commit and push.

A badge in the bottom-right corner shows how many edits you have that aren't published yet, so you
can always tell the difference between "changed on my screen" and "changed for real".

### Notes

- **Only you see edit mode's effects.** A visitor who adds `?edit` can type on the page, but they're
  only changing their own copy in their own browser — they can't touch your site or your repo.
- **Links and buttons aren't editable**, so navigation keeps working while you edit. Change those in
  the HTML.
- **Pasted text comes in as plain text**, so pasting from Word or a browser won't drag foreign fonts
  and colors into the page.
- **Clearing your browser data erases unpublished edits.** Download before you clear.
- Edits are tracked by each element's position in the page. If you later restructure the HTML, a
  stored edit that no longer matches is skipped rather than applied to the wrong place.
- **Discard all** in the toolbar wipes every unpublished edit on every page.
