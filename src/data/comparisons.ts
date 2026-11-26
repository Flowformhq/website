export interface ComparisonRow {
  dimension: string;
  flowform: string;
  competitor: string;
}

export interface CompetitorComparison {
  slug: 'formspree' | 'web3forms' | 'opnform' | 'typeform' | 'tally';
  name: string;
  family: 'Form Backend' | 'Form Builder';
  tagline: string;
  sourceUrl: string;
  sourceLabel: string;
  asOfDate: string;
  summary: string;
  pricingSnapshot: string[];
  rows: ComparisonRow[];
  chooseCompetitor: string[];
  chooseFlowform: string[];
}

export const AS_OF_DATE = '2026-11-27';

export const COMPETITORS: CompetitorComparison[] = [
  {
    slug: 'formspree',
    name: 'Formspree',
    family: 'Form Backend',
    tagline: 'Headless HTML form endpoint vs. self-hosted engine with multi-step upgrade path',
    sourceUrl: 'https://formspree.io/plans/',
    sourceLabel: 'formspree.io/plans/',
    asOfDate: AS_OF_DATE,
    summary:
      'Formspree is a closed-source hosted form backend priced by account-wide monthly submission quotas. FlowForm starts with the same drop-in HTML form POST endpoint and runs on your own database with no software-imposed submission cap, plus optional upgrade to schema-driven multi-step workflows.',
    pricingSnapshot: [
      'Free: $0/mo, 50 submissions/month across account, 30-day archive, up to 2 linked notification emails, no file uploads or custom redirects.',
      'Personal: $15/mo billed monthly ($10/mo billed annually at $120/yr), 200 submissions/month, 1 GB upload storage, custom Thank You redirects.',
      'Professional: $30/mo monthly ($20/mo annual), 2,000 submissions/month, 5 GB uploads, webhooks, API access, autoresponses.',
      'Business: $90/mo monthly ($60/mo annual), 20,000 submissions/month, multiple team members, 10 GB uploads, rules engine.',
    ],
    rows: [
      {
        dimension: 'Hosting & License',
        flowform: 'Open-source AGPLv3 self-hosted (+ MIT SDKs/starter kits); Cloud Free (250/mo) is planned.',
        competitor: 'Closed-source managed cloud SaaS only (no self-host option).',
      },
      {
        dimension: 'Monthly Submission Quota',
        flowform: 'No software-imposed quota on self-hosted installs (bounded by your VPS and database capacity).',
        competitor: '50/mo on Free; 200/mo on Personal; 2,000/mo on Professional; 20,000/mo on Business.',
      },
      {
        dimension: 'HTML Form Drop-in',
        flowform: 'POST /f/{slug} with _gotcha honeypot and optional full-URL _next redirect.',
        competitor: 'POST https://formspree.io/f/{id} with _next support on paid tiers.',
      },
      {
        dimension: 'Custom Redirects & Uploads',
        flowform: 'Included in self-hosted OSS engine (Allowed Domains validation + encrypted storage options).',
        competitor: 'Requires Personal ($10/mo annual / $15/mo monthly) or higher; Free omits uploads and custom redirects.',
      },
      {
        dimension: 'Multi-Step Conditional Logic',
        flowform: 'Built into the same engine via versioned JSON schemas (/api/v1/forms/{uuid}/schema).',
        competitor: 'Single-request form backend; conditional branching requires external frontend code or tools.',
      },
      {
        dimension: 'Webhooks & Audit Logs',
        flowform: 'HMAC-SHA256 signed webhooks (X-FlowForm-Signature-256) and delivery logs included in OSS.',
        competitor: 'Webhooks unlocked on Professional tier ($20/mo annual / $30/mo monthly).',
      },
      {
        dimension: 'Data Storage & Retention',
        flowform: 'Your own SQLite, PostgreSQL, or MySQL database with configurable retention and deletion.',
        competitor: 'Hosted by Formspree; 30-day archive on Free plan.',
      },
    ],
    chooseCompetitor: [
      'You want an external vendor to operate everything immediately and your site stays under 50 submissions/month.',
      'You prefer Formspree\'s Formshield spam pipeline without maintaining a container or queue worker.',
    ],
    chooseFlowform: [
      'You want an HTML endpoint today with no software submission cap on your own server.',
      'You expect forms to grow into multi-step conditional workflows or authenticated submission APIs without migrating vendors.',
      'Your compliance boundary requires keeping respondent PII in your own PostgreSQL or SQLite database.',
    ],
  },
  {
    slug: 'web3forms',
    name: 'Web3Forms',
    family: 'Form Backend',
    tagline: 'Hosted email forwarding access keys vs. database-backed engine and workflows',
    sourceUrl: 'https://web3forms.com/pricing',
    sourceLabel: 'web3forms.com/pricing',
    asOfDate: AS_OF_DATE,
    summary:
      'Web3Forms forwards static HTML form submissions to your inbox via a public access_key without running a backend. FlowForm persists submissions in your own database alongside email alerts, webhooks, admin review, and optional multi-step workflows.',
    pricingSnapshot: [
      'Free: $0/mo, 250 submissions/month, fair-use domains and forms, 30-day submission retention, honeypot.',
      'Starter: $49/yr (student/nonprofit/startup discount), 5,000 submissions/month, 3-month retention, no uploads or autoresponders.',
      'Pro: $12/mo billed yearly ($144 to $149/yr), 10,000 submissions/month, 1-year retention, file uploads, webhooks, Turnstile/hCaptcha.',
      'Agency: $33/mo billed yearly, 20,000 submissions/month, up to 10 team seats.',
    ],
    rows: [
      {
        dimension: 'Hosting & License',
        flowform: 'Open-source AGPLv3 self-hosted engine (+ MIT starter kits); Cloud Free (250/mo) is planned.',
        competitor: 'Closed-source hosted SaaS relay.',
      },
      {
        dimension: 'Monthly Submission Quota',
        flowform: 'No software-imposed cap on self-hosted installs (bounded by your host infrastructure).',
        competitor: '250/mo on Free; 5,000/mo on Starter; 10,000/mo on Pro; 20,000/mo on Agency.',
      },
      {
        dimension: 'Database & Admin UI',
        flowform: 'Stores structured submissions in SQLite/PostgreSQL/MySQL with Filament admin UI and CSV export.',
        competitor: 'Primary focus on email delivery; submission history capped at 30 days on Free (1 year on Pro/Agency).',
      },
      {
        dimension: 'Webhooks & Captcha',
        flowform: 'HMAC-signed webhooks and Turnstile/hCaptcha support built into self-hosted OSS (honeypot requires no captcha script).',
        competitor: 'Honeypot on Free; webhooks, file uploads, and Turnstile/reCAPTCHA/hCaptcha gated to Pro ($12/mo yearly).',
      },
      {
        dimension: 'Email Delivery Responsibility',
        flowform: 'Self-hosted email depends on SMTP/SES credentials and queue workers you configure.',
        competitor: 'Managed outbound email relay operated by Web3Forms.',
      },
      {
        dimension: 'Multi-Step Workflows & API',
        flowform: 'Upgrade any endpoint to step-by-step schema flows, conditional branching, and authenticated REST/MCP APIs.',
        competitor: 'Single-step contact form forwarder only.',
      },
    ],
    chooseCompetitor: [
      'You want zero infrastructure to manage right now, receive under 250 submissions/month, and only need inbox notifications.',
    ],
    chooseFlowform: [
      'You need permanent database ownership, webhook delivery logs, or an upgrade path into multi-step flows.',
      'You want webhooks, Turnstile captcha, and file uploads on your own host without paying per tier.',
    ],
  },
  {
    slug: 'opnform',
    name: 'OpnForm',
    family: 'Form Backend',
    tagline: 'Comparing two Laravel-based AGPLv3 form platforms: visual form builder vs. API-first endpoint & workflow engine',
    sourceUrl: 'https://opnform.com/pricing',
    sourceLabel: 'opnform.com/pricing',
    asOfDate: AS_OF_DATE,
    summary:
      'Both FlowForm and OpnForm publish AGPLv3 core repositories built on Laravel. OpnForm centers on a hosted SaaS builder and Notion-like embed UI (with a 2-user seat limit and proprietary Enterprise directory on self-host), whereas FlowForm prioritizes HTML form endpoints, framework starter kits, signed webhooks, and schema-driven API workflows.',
    pricingSnapshot: [
      'Self-hosted OSS: AGPLv3 core (free self-host is capped at 2 user seats; Enterprise/ components use a proprietary license).',
      'Cloud Free: $0/mo, no fixed form/submission cap stated on pricing page, 1 workspace, webhooks and API access, includes OpnForm branding.',
      'Cloud Pro: $25/mo billed annually (removes branding, custom domains, captcha, custom SMTP, Discord/Slack/Telegram alerts).',
      'Cloud Business: $67/mo annual; Cloud Enterprise: $220/mo annual (SAML/LDAP SSO, audit logs, 1 GB uploads).',
    ],
    rows: [
      {
        dimension: 'Architecture Focus',
        flowform: 'Start with raw HTML POST /f/{slug}, then consume schemas via REST API, MCP, or React/Vue/Livewire kits.',
        competitor: 'Visual Nuxt form builder embedded via URL/iframe alongside hosted form pages.',
      },
      {
        dimension: 'OSS Licensing Boundary',
        flowform: 'Full single-tenant engine under AGPLv3 (plus MIT starter kits/SDKs); commercial license available for non-AGPL use.',
        competitor: 'AGPLv3 core plus proprietary Enterprise/ directory; free self-hosted edition caps team users at 2 seats.',
      },
      {
        dimension: 'Cloud Status',
        flowform: 'Cloud Free (250/mo) is currently planned and not yet live; self-hosted engine is available today.',
        competitor: 'Hosted Cloud Free ($0), Pro ($25/mo annual), Business ($67/mo annual), Enterprise ($220/mo annual) are live.',
      },
      {
        dimension: 'HTML Zero-Setup Endpoint',
        flowform: 'Drop-in <form action=".../f/{slug}"> without frontend SDKs or iframes.',
        competitor: 'Primarily built around generated OpnForm UI views rather than arbitrary static HTML forms.',
      },
      {
        dimension: 'Webhook Security & Retries',
        flowform: 'Timestamped HMAC-SHA256 signatures (X-FlowForm-Signature-256), private-IP SSRF blocking, and manual log retry.',
        competitor: 'Webhooks included on Cloud Free; custom SMTP and extra channels on Pro ($25/mo annual).',
      },
      {
        dimension: 'AI & Agent Tooling',
        flowform: 'Ships built-in Model Context Protocol (MCP) endpoints, OpenAPI v1 spec, and llms.txt documentation.',
        competitor: 'Cloud Pro includes AI form generation inside the OpnForm dashboard.',
      },
    ],
    chooseCompetitor: [
      'You want a live managed cloud free tier today with a visual Notion-style hosted form creator and do not need raw HTML form endpoints.',
    ],
    chooseFlowform: [
      'You want an HTML <form action="..."> backend first, headless framework rendering second, and no 2-seat cap in the self-hosted admin.',
      'You want native HMAC webhook signing, audit-logged submission encryption, and MCP integration for coding agents.',
    ],
  },
  {
    slug: 'typeform',
    name: 'Typeform',
    family: 'Form Builder',
    tagline: 'Conversational SaaS survey builder vs. self-hosted endpoint and code-native multi-step engine',
    sourceUrl: 'https://www.typeform.com/pricing/',
    sourceLabel: 'typeform.com/pricing/',
    asOfDate: AS_OF_DATE,
    summary:
      'Typeform is the category standard for non-technical conversational surveys with a hosted drag-and-drop studio. FlowForm gives developers full ownership of code, design system, and data residency without monthly response caps.',
    pricingSnapshot: [
      'Free: $0/mo, 10 responses/month.',
      'Basic: $39/mo monthly ($28/mo billed annually), 100 responses/month, 1 user seat.',
      'Plus: $79/mo monthly ($56/mo annual), 1,000 responses/month, 3 user seats, remove Typeform branding.',
      'Business: $129/mo monthly ($91/mo annual), 10,000 responses/month, 5 user seats, drop-off analysis.',
    ],
    rows: [
      {
        dimension: 'Hosting & License',
        flowform: 'Open-source AGPLv3 self-hosted (+ MIT starter kits); Cloud Free (250/mo) is planned.',
        competitor: 'Closed-source hosted SaaS only.',
      },
      {
        dimension: 'Monthly Response Limits',
        flowform: 'No software-imposed quota on self-hosted installs (bounded by your host database capacity).',
        competitor: '10/mo Free; 100/mo Basic ($28 to $39/mo); 1,000/mo Plus ($56 to $79/mo); 10,000/mo Business ($91 to $129/mo).',
      },
      {
        dimension: 'Branding Removal & Seats',
        flowform: 'Rendered inside your own app components or HTML with full CSS control; no per-seat admin charge.',
        competitor: 'Branding removal starts on Plus ($56 to $79/mo); seats capped per tier (1, 3, or 5).',
      },
      {
        dimension: 'Frontend Integration',
        flowform: 'Raw HTML endpoints (/f/{slug}) plus headless REST schemas for React, Vue 3, Next.js, and Livewire.',
        competitor: 'Hosted Typeform pages or external iframe / popover embeds.',
      },
      {
        dimension: 'Conditional Logic',
        flowform: 'Server-validated JSON Schema conditions across steps and fields.',
        competitor: 'Visual Logic Map builder hosted in the Typeform dashboard.',
      },
      {
        dimension: 'Data Residency',
        flowform: 'Data stays inside your own SQLite, PostgreSQL, or MySQL database.',
        competitor: 'Stored on Typeform multi-tenant cloud infrastructure.',
      },
    ],
    chooseCompetitor: [
      'Non-technical marketing or research teams need Typeform\'s visual studio, templates, and native no-code analytics immediately.',
    ],
    chooseFlowform: [
      'Traffic spikes would blow past 100 or 1,000 responses/month on Basic/Plus pricing.',
      'Your engineering team wants native React/Vue/HTML rendering inside your design system instead of third-party iframes.',
    ],
  },
  {
    slug: 'tally',
    name: 'Tally',
    family: 'Form Builder',
    tagline: 'Generous hosted doc-style form builder vs. self-hosted developer endpoint and workflow API',
    sourceUrl: 'https://tally.so/pricing',
    sourceLabel: 'tally.so/pricing',
    asOfDate: AS_OF_DATE,
    summary:
      'Tally offers a popular Notion-style hosted form builder with free conditional logic and webhooks subject to fair use, charging $29/mo monthly ($24/mo annually) for custom domains, partial submissions, and branding removal. FlowForm targets developers who want self-hosted data ownership, standard HTML endpoints, and framework-native workflows.',
    pricingSnapshot: [
      'Free: $0/mo, forms and submissions included under fair use, conditional logic, webhooks, 10 MB file upload limit, includes "Made with Tally" badge.',
      'Pro: $29/mo billed monthly ($24/mo billed annually at $290/yr), removes Tally branding, custom domains, partial submissions, workspaces, CSS injection.',
      'Business: $89/mo billed monthly ($74/mo billed annually), adds data retention controls and email verification.',
    ],
    rows: [
      {
        dimension: 'Hosting & License',
        flowform: 'Open-source AGPLv3 self-hosted engine (+ MIT starter kits); Cloud Free (250/mo) is planned.',
        competitor: 'Closed-source hosted SaaS only (EU cloud).',
      },
      {
        dimension: 'Entry Model',
        flowform: 'Starts as a plain HTML <form action="..."> endpoint and grows into API/schema multi-step flows.',
        competitor: 'Document-style visual form editor embedded via tally.so link or widget script.',
      },
      {
        dimension: 'Custom Domains & Branding',
        flowform: 'Runs directly on your domain and frontend code with zero third-party badges.',
        competitor: 'Free displays "Made with Tally"; custom domains and white-label require Pro ($24/mo annual / $29/mo monthly).',
      },
      {
        dimension: 'Partial Submissions / Step State',
        flowform: 'Step-by-step persistence via POST/PATCH /api/v1/public/submissions/{uuid} included in OSS.',
        competitor: 'Partial response capture requires Tally Pro ($24 to $29/mo).',
      },
      {
        dimension: 'Self-Hosting & Compliance Control',
        flowform: 'Inspectable PHP/Laravel codebase, local SQLite/Postgres storage, audit-logged encrypted submissions.',
        competitor: 'No self-hosting; submission retention controls gated to Business ($74 to $89/mo).',
      },
      {
        dimension: 'HTML & Static Site Support',
        flowform: 'Native HTML form POST plus AJAX JSON and MCP agent integration.',
        competitor: 'Requires embedding Tally\'s widget iframe or linking out to tally.so.',
      },
    ],
    chooseCompetitor: [
      'You want a free hosted no-code builder right now with a Notion-like authoring UX and can accept Tally branding on Free.',
    ],
    chooseFlowform: [
      'You want self-hosted source availability, native HTML/React/Vue UI ownership, and partial-step APIs without paying $29/mo.',
    ],
  },
];

export function getCompetitor(slug: string): CompetitorComparison | undefined {
  return COMPETITORS.find((item) => item.slug === slug);
}
