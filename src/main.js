import './style.css'

// Mobile navigation toggle
const navToggle = document.querySelector('#nav-toggle')
const navMobile = document.querySelector('#nav-mobile')

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true'
    navToggle.setAttribute('aria-expanded', String(!open))
    navMobile.hidden = open
  })

  navMobile.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navToggle.setAttribute('aria-expanded', 'false')
      navMobile.hidden = true
    }
  })
}

// Copy-to-clipboard for code block
const copyButton = document.querySelector('#copy-quickstart')
if (copyButton && navigator.clipboard) {
  copyButton.addEventListener('click', async () => {
    const source = document.getElementById(copyButton.dataset.target)
    if (!source) return

    try {
      await navigator.clipboard.writeText(source.innerText.trim())
      const previous = copyButton.textContent
      copyButton.textContent = 'Copied!'
      setTimeout(() => { copyButton.textContent = previous }, 1500)
    } catch {
      copyButton.textContent = 'Press Ctrl+C'
    }
  })
}

// ==========================================
// Mode Switcher (Mode 1: Simple Form vs Mode 2: Multi-Step Wizard)
// ==========================================
const tabMode1 = document.querySelector('#tab-mode1')
const tabMode2 = document.querySelector('#tab-mode2')

const heroBadge = document.querySelector('#hero-badge')
const heroHeading = document.querySelector('#hero-heading')
const heroDesc = document.querySelector('#hero-desc')
const heroPrimaryCta = document.querySelector('#hero-primary-cta')
const heroSecondaryCta = document.querySelector('#hero-secondary-cta')
const heroFootnote = document.querySelector('#hero-footnote')
const terminalLabel = document.querySelector('#terminal-label')
const quickstartCode = document.querySelector('#quickstart-code')

const mode1Code = `<!-- Mode 1: Simple Headless Form (Web3Forms / Formspree Alternative) -->
<!-- Point any static HTML form directly to your FlowForm endpoint -->
<form action="https://demo.flowformhq.com/f/contact" method="POST">
  <input type="text" name="name" placeholder="Your Name" required />
  <input type="email" name="email" placeholder="you@company.com" required />
  <textarea name="message" placeholder="How can we help?"></textarea>

  <!-- Spam honeypot: bots fill this and get quietly dropped -->
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />

  <!-- Custom redirect URL after successful submission -->
  <input type="hidden" name="_next" value="https://mysite.com/thanks" />

  <button type="submit">Send Message</button>
</form>

<!-- Or post arbitrary JSON via cURL / AJAX: -->
<!-- curl -X POST https://demo.flowformhq.com/api/v1/f/contact -H "Content-Type: application/json" -d '{"email":"lead@co.com"}' -->`

const mode2Code = `// Mode 2: Dynamic Multi-Step Wizard (Typeform / Tally Alternative)
// Schema-driven branching, step sequencing & server-side validation
import { FlowForm } from '@flowformhq/react-starter'

// 1. Fetch dynamic form schema (steps, fields, branching rules)
const schema = await fetch('https://demo.flowformhq.com/api/v1/forms/{uuid}/schema')
  .then(res => res.json())

// 2. Render multi-step wizard in Next.js / React / Vue / Livewire
export default function OnboardingFunnel() {
  return (
    <FlowForm
      schema={schema}
      onStepChange={(step) => console.log('Current step:', step)}
      onSubmit={async (payload) => {
        await fetch('https://demo.flowformhq.com/api/v1/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ form_uuid: schema.uuid, data: payload })
        })
      }}
    />
  )
}`

function setMode(mode) {
  if (mode === 'mode1') {
    if (tabMode1) {
      tabMode1.setAttribute('aria-selected', 'true')
      tabMode1.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm bg-white text-indigo-700'
    }
    if (tabMode2) {
      tabMode2.setAttribute('aria-selected', 'false')
      tabMode2.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition text-gray-600 hover:text-gray-900'
    }

    if (heroBadge) heroBadge.textContent = 'Mode 1 · Web3Forms & Formspree Alternative · Zero-JS HTML Endpoint'
    if (heroHeading) heroHeading.innerHTML = 'Simple form backend<br/><span class="text-indigo-600">for static sites</span>'
    if (heroDesc) heroDesc.textContent = 'Point any raw HTML form to FlowForm. Zero client JavaScript required. Automatic spam honeypot defense, instant email forwarding, and clean JSON payload storage.'
    if (heroPrimaryCta) {
      heroPrimaryCta.textContent = 'View Endpoint Guide'
      heroPrimaryCta.href = 'https://docs.flowformhq.com'
      heroPrimaryCta.target = '_self'
    }
    if (heroSecondaryCta) {
      heroSecondaryCta.innerHTML = '<span class="h-2 w-2 rounded-full bg-emerald-500"></span> Try Live Demo'
      heroSecondaryCta.href = 'https://demo.flowformhq.com'
    }
    if (heroFootnote) heroFootnote.textContent = 'Works with Astro, Next.js, Hugo, or raw HTML · 100% data sovereignty · $0 platform fees'
    if (terminalLabel) terminalLabel.textContent = 'html — mode 1: simple contact form endpoint'
    if (quickstartCode) quickstartCode.textContent = mode1Code
  } else {
    if (tabMode2) {
      tabMode2.setAttribute('aria-selected', 'true')
      tabMode2.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm bg-white text-indigo-700'
    }
    if (tabMode1) {
      tabMode1.setAttribute('aria-selected', 'false')
      tabMode1.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition text-gray-600 hover:text-gray-900'
    }

    if (heroBadge) heroBadge.textContent = 'Mode 2 · Typeform & Tally Alternative · Schema-Driven Branching Wizard'
    if (heroHeading) heroHeading.innerHTML = 'Dynamic multi-step forms<br/><span class="text-indigo-600">with conditional logic</span>'
    if (heroDesc) heroDesc.textContent = 'Schema-driven form engine with step-by-step sequencing, branching logic jumps, and server-side validation. Drop-in starter kits for React, Vue 3, Next.js, and Livewire.'
    if (heroPrimaryCta) {
      heroPrimaryCta.textContent = 'Explore Starter Kits'
      heroPrimaryCta.href = 'https://docs.flowformhq.com'
      heroPrimaryCta.target = '_self'
    }
    if (heroSecondaryCta) {
      heroSecondaryCta.innerHTML = '<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Open Wizard Sandbox'
      heroSecondaryCta.href = 'https://demo.flowformhq.com'
    }
    if (heroFootnote) heroFootnote.textContent = 'Server-evaluated conditional rules · Typeform-style logic jumps · React, Vue, Livewire SDKs'
    if (terminalLabel) terminalLabel.textContent = 'jsx — mode 2: dynamic multi-step wizard'
    if (quickstartCode) quickstartCode.textContent = mode2Code
  }
}

if (tabMode1 && tabMode2) {
  tabMode1.addEventListener('click', () => setMode('mode1'))
  tabMode2.addEventListener('click', () => setMode('mode2'))
}

// ==========================================
// Cloud Trial Waitlist Submission
// ==========================================
const waitlistForm = document.querySelector('#waitlist-form')
const waitlistFeedback = document.querySelector('#waitlist-feedback')

if (waitlistForm) {
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const name = document.querySelector('#wl-name')?.value || ''
    const email = document.querySelector('#wl-email')?.value || ''
    const company = document.querySelector('#wl-company')?.value || ''
    const volume = document.querySelector('#wl-volume')?.value || ''
    const usecase = document.querySelector('#wl-usecase')?.value || ''
    const notes = document.querySelector('#wl-notes')?.value || ''

    const subject = encodeURIComponent(`FlowForm Cloud Trial Application - ${company} (${name})`)
    const body = encodeURIComponent(
      `Hi FlowFormHQ Team,\n\n` +
      `I would like to apply for the FlowForm Cloud Trial / Early Access.\n\n` +
      `Details:\n` +
      `- Name: ${name}\n` +
      `- Work Email: ${email}\n` +
      `- Company / Project: ${company}\n` +
      `- Expected Submissions/Month: ${volume}\n` +
      `- Primary Use Case: ${usecase}\n` +
      `- Specific Requirements:\n${notes}\n\n` +
      `Looking forward to hearing from you!\n`
    )

    // Open mail client addressed to trial@flowformhq.com
    window.location.href = `mailto:trial@flowformhq.com?subject=${subject}&body=${body}`

    // Display feedback
    if (waitlistFeedback) {
      waitlistFeedback.hidden = false
      waitlistFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    const submitBtn = document.querySelector('#waitlist-submit')
    if (submitBtn) {
      submitBtn.textContent = 'Application Prepared (Check your Email Client) ✓'
      submitBtn.disabled = true
      submitBtn.classList.add('opacity-75', 'cursor-not-allowed')
    }
  })
}
