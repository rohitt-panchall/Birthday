# Birthday Wishes Website 💕

A personal birthday site with a **countdown** to her birthday, cute rotating messages, then a **Happy Birthday** reveal and a **Let's celebrate** button that opens the rest of the page (message, photos, confetti).

## Set her birthday date

In **`script.js`**, at the top, set the date (month 1–12, day 1–31):

```js
const BIRTHDAY_MONTH = 3;  // e.g. March
const BIRTHDAY_DAY = 15;
```

The site counts down to the next occurrence of that date. On the day itself, it shows "Happy Birthday" and the "Let's celebrate" button.

## Quick start

- **Local:** Double-click `index.html` or open it in a browser.
- **With a local server (recommended):**  
  `npx serve .`  
  Then open the URL it prints (e.g. http://localhost:3000).

## Personalize it

1. **Her name**  
   In `index.html`, change the name in two places:  
   - `<p class="reveal-name">Reva</p>` (birthday reveal screen)  
   - `<p class="hero-name">Reva</p>` (main page hero)

2. **Your message**  
   Edit the paragraph inside `<p class="message-text">...</p>` with your own words.

3. **Signature**  
   Update `<p class="message-sign">— With love, always</p>` to your name or how you sign.

4. **Photos**  
   Replace the three `.gallery-item.placeholder` divs with images, for example:
   ```html
   <div class="gallery-item">
     <img src="photo1.jpg" alt="Memory 1">
   </div>
   ```
   Put your image files (e.g. `photo1.jpg`) in the same folder as `index.html`, or use full URLs.

## Deploy online (free)

- **GitHub Pages:** Push this folder to a repo, then in repo **Settings → Pages** choose “Deploy from branch” and pick `main` (or your branch).
- **Netlify:** Drag and drop this folder on [netlify.com/drop](https://app.netlify.com/drop).

Share the link with her on her birthday.
