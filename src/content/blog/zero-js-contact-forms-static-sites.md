---
title: "How to Add a Zero-JavaScript Contact Form to Astro, Hugo, or Next.js in 2 Minutes"
description: "A developer tutorial on implementing sovereign contact forms on static sites (Astro, Hugo, 11ty, Next.js) using FlowForm Mode 1 with zero client-side JavaScript."
publishDate: "2026-10-26"
author: "FlowForm Engineering Team"
category: "Developer Tutorials"
tags: ["Static Site Forms", "Astro Forms", "Hugo Forms", "Zero JS", "Mode 1 Headless", "Web3Forms Alternative"]
canonicalUrl: "https://flowformhq.com/blog/zero-js-contact-forms-static-sites"
---

## How do you create a contact form on a static site without client-side JavaScript?

To build a contact form on a static site without client-side JavaScript, use a standard HTML `<form>` element whose `action` attribute targets a headless endpoint like FlowForm Mode 1 (`POST /f/{slug}`). The server processes the submission, filters bot spam via hidden honeypot fields, sends email alerts, and redirects back to a thank-you page.

---

## The Static Site Dilemma: Beautiful Pages, Missing Backend

Static site generators like **Astro, Hugo, Jekyll, and 11ty** are celebrated for their blazing speed, zero runtime overhead, and 100/100 Google Lighthouse scores.

However, the moment a developer needs to add a simple contact form, they are faced with an annoying dilemma:
1. **Option A:** Spin up a dedicated serverless function (AWS Lambda / Vercel Functions), write API route handlers, handle CORS, set up SMTP credentials, and maintain dependencies.
2. **Option B:** Embed a heavy, third-party iframe form widget that ruins your site's speed score and leaks user data to an external SaaS.

**FlowForm Mode 1 provides the third, ideal path:** A dedicated headless form endpoint that accepts standard HTML form submissions directly.

---

## 2-Minute Implementation Guide

### Step 1: Create Your Endpoint in FlowForm
In your FlowForm Filament 5 admin dashboard:
1. Navigate to **Forms** &rarr; **New Form**.
2. Set **Type** to `Endpoint (Mode 1)`.
3. Provide a slug (e.g. `contact`).
4. Enter your notification email (e.g. `contact@mysite.com`) and optional redirect URL (`https://mysite.com/thanks`).
5. Click **Create**.

Your endpoint URL is immediately active at:
`https://demo.flowformhq.com/f/contact`

---

### Step 2: Add the HTML Form to Your Static Site

Paste the following standard HTML into your Astro component (`src/pages/contact.astro`), Hugo template, or Markdown file:

```html
<!-- Native HTML form with zero client JS dependencies -->
<form action="https://demo.flowformhq.com/f/contact" method="POST" class="space-y-4">
  <div>
    <label for="name" class="block text-sm font-medium">Your Name</label>
    <input type="text" id="name" name="name" required class="w-full border rounded p-2" />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium">Email Address</label>
    <input type="email" id="email" name="email" required class="w-full border rounded p-2" />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium">Message</label>
    <textarea id="message" name="message" rows="4" required class="w-full border rounded p-2"></textarea>
  </div>

  <!-- Anti-Spam Honeypot: Invisible to human users, filled by bots -->
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />

  <!-- Custom Redirect URL Override (Optional) -->
  <input type="hidden" name="_next" value="https://mysite.com/thanks" />

  <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded font-medium">
    Send Message
  </button>
</form>
```

---

## How Bot Spam is Blocked Without Captchas

Nothing destroys form conversion rates faster than forcing human visitors to solve distorted image puzzles or identify crosswalks.

FlowForm Mode 1 includes **Native Honeypot Protection**:
1. The form includes an invisible input field named `_gotcha` (or `_honeypot`).
2. CSS hides this field from visual browsers and screen readers (`style="display:none"`).
3. Automated spam bots scanning the DOM inspect all input tags and fill the field with spam payloads.
4. When FlowForm receives the POST request, it checks whether `_gotcha` contains any content. If filled, the request is immediately and silently discarded without triggering database writes or email notifications.

Real humans never see the field, while bots are neutralized automatically.

---

## Optional: Submitting via AJAX / Fetch API

If you prefer submitting asynchronously to keep the user on the same page with an inline success message, FlowForm Mode 1 accepts JSON payloads at `/api/v1/f/{slug}`:

```javascript
// Optional async JavaScript submission
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('https://demo.flowformhq.com/api/v1/f/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    alert('Thank you! Your message has been received.');
    form.reset();
  }
});
```

---

## Conclusion

You do not need to install complex serverless packages or pay monthly fees to Formspree or Web3Forms just to receive contact messages on your static website.

With **FlowForm Mode 1**, you get a fast, zero-JS contact form with automatic spam filtering, email alerts, and complete database ownership in under two minutes.
