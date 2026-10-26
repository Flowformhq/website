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
// Mode Switcher (Mode 1: Self-Host vs Mode 2: Cloud)
// ==========================================
const tabSelfhost = document.querySelector('#tab-selfhost')
const tabCloud = document.querySelector('#tab-cloud')

const heroBadge = document.querySelector('#hero-badge')
const heroHeading = document.querySelector('#hero-heading')
const heroDesc = document.querySelector('#hero-desc')
const heroPrimaryCta = document.querySelector('#hero-primary-cta')
const heroSecondaryCta = document.querySelector('#hero-secondary-cta')
const heroFootnote = document.querySelector('#hero-footnote')
const terminalLabel = document.querySelector('#terminal-label')
const quickstartCode = document.querySelector('#quickstart-code')

const selfhostCode = `# Option 1: Run pre-built Docker image in 5 seconds
docker run -d -p 8000:80 \\
  -e APP_NAME=FlowForm \\
  -e DB_CONNECTION=sqlite \\
  --name flowform-local flowformhq/flowform:latest

# → Admin Panel: http://localhost:8000/admin (Filament 3 Dashboard)
# → Fetch form schema in one API call
curl http://localhost:8000/api/v1/forms/{uuid}/schema

# → Submit response with server-evaluated conditional branching
curl -X POST http://localhost:8000/api/v1/submissions \\
  -H "Content-Type: application/json" \\
  -d '{"form_uuid":"form_01hxyz","data":{"email":"dev@company.com","budget":5000}}'`

const cloudCode = `# FlowForm Cloud Managed API
# Zero infrastructure management · Automated backups & global CDN

# 1. Fetch form schema from Managed Tenant
curl https://api.flowformhq.com/v1/forms/onboarding-wizard/schema \\
  -H "Authorization: Bearer ff_live_secret_key"

# 2. Ingest step submission (instant webhook routing to Slack/DB)
curl -X POST https://api.flowformhq.com/v1/submissions \\
  -H "Authorization: Bearer ff_live_secret_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "step_id": 2,
    "data": {
      "company_size": "50-200",
      "hosting_preference": "managed_cloud"
    }
  }'`

function setMode(mode) {
  if (mode === 'selfhost') {
    tabSelfhost.setAttribute('aria-selected', 'true')
    tabSelfhost.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm bg-white text-indigo-700'
    tabCloud.setAttribute('aria-selected', 'false')
    tabCloud.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition text-gray-600 hover:text-gray-900'

    if (heroBadge) heroBadge.textContent = 'Open Source · AGPLv3 + Commercial · $0 Platform Fee'
    if (heroHeading) heroHeading.innerHTML = 'The open-source<br/><span class="text-indigo-600">forms platform</span>'
    if (heroDesc) heroDesc.textContent = 'Headless, API-first form and workflow engine for developers. Build dynamic multi-step wizards with conditional branching. Own your data with complete self-hosted control.'
    if (heroPrimaryCta) {
      heroPrimaryCta.textContent = 'Get Started Free'
      heroPrimaryCta.href = 'https://docs.flowformhq.com/guide/quickstart'
      heroPrimaryCta.target = '_self'
    }
    if (heroSecondaryCta) {
      heroSecondaryCta.innerHTML = '<span class="h-2 w-2 rounded-full bg-emerald-500"></span> Try Live Demo'
      heroSecondaryCta.href = 'https://demo.flowformhq.com'
    }
    if (heroFootnote) heroFootnote.textContent = 'Self-host for free · AGPLv3 license guarantee · Full OpenAPI REST API'
    if (terminalLabel) terminalLabel.textContent = 'bash — one-command run'
    if (quickstartCode) quickstartCode.textContent = selfhostCode
  } else {
    tabCloud.setAttribute('aria-selected', 'true')
    tabCloud.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm bg-white text-indigo-700'
    tabSelfhost.setAttribute('aria-selected', 'false')
    tabSelfhost.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition text-gray-600 hover:text-gray-900'

    if (heroBadge) heroBadge.textContent = 'Managed Cloud · Turnkey Infrastructure · High Availability'
    if (heroHeading) heroHeading.innerHTML = 'Production forms<br/><span class="text-indigo-600">without server ops</span>'
    if (heroDesc) heroDesc.textContent = 'Multi-tenant, fully-managed form and workflow engine. Automated migrations, encrypted backups, enterprise webhooks, and team workspaces ready in seconds.'
    if (heroPrimaryCta) {
      heroPrimaryCta.textContent = 'Request Cloud Trial'
      heroPrimaryCta.href = '#waitlist'
      heroPrimaryCta.target = '_self'
    }
    if (heroSecondaryCta) {
      heroSecondaryCta.innerHTML = '<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Open Live Sandbox'
      heroSecondaryCta.href = 'https://demo.flowformhq.com'
    }
    if (heroFootnote) heroFootnote.textContent = 'Zero maintenance · Automated multi-region backups · 99.9% uptime SLA'
    if (terminalLabel) terminalLabel.textContent = 'curl — managed cloud api'
    if (quickstartCode) quickstartCode.textContent = cloudCode
  }
}

if (tabSelfhost && tabCloud) {
  tabSelfhost.addEventListener('click', () => setMode('selfhost'))
  tabCloud.addEventListener('click', () => setMode('cloud'))
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
