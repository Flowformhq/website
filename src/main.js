const mobileToggle = document.querySelector('#mobile-menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    const isHidden = mobileNav.classList.toggle('hidden');
    mobileToggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
  });
}

const endpointSnippet = `<!-- Paste into any HTML, Astro, Hugo, or WordPress page -->
<form action="https://demo.flowformhq.com/f/{slug}" method="POST">
  <label>Email <input type="email" name="email" required /></label>
  <label>Message <textarea name="message" required></textarea></label>

  <!-- Built-in honeypot spam trap -->
  <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off" />

  <!-- Full redirect URL on an Allowed Domain -->
  <input type="hidden" name="_next" value="https://yoursite.example/thanks" />

  <button type="submit">Send Message</button>
</form>`;

const workflowSnippet = `// Upgrade the same form into a conditional multi-step workflow
import { useEffect, useState } from 'react';

export function OnboardingFlow({ uuid }: { uuid: string }) {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    fetch(\`https://demo.flowformhq.com/api/v1/forms/\${uuid}/schema\`)
      .then((res) => res.json())
      .then(setSchema);
  }, [uuid]);

  // Step values & branching conditions persist via:
  // POST /api/v1/public/submissions
  // POST /api/v1/public/submissions/{submissionUuid}/advance
  return schema ? <MultiStepForm schema={schema} /> : null;
}`;

const quickstartCode = document.querySelector('#quickstart-code');
const tabEndpoint = document.querySelector('#snippet-tab-endpoint');
const tabWorkflow = document.querySelector('#snippet-tab-workflow');
const copyBtn = document.querySelector('#copy-quickstart');

function setSnippetTab(tab) {
  if (!quickstartCode) return;
  const activeClasses = 'rounded-md bg-cyan-500/15 border border-cyan-500/40 px-3 py-1 text-xs font-semibold text-cyan-300';
  const inactiveClasses = 'rounded-md border border-transparent px-3 py-1 text-xs font-semibold text-gray-400 hover:text-white';

  if (tab === 'endpoint') {
    quickstartCode.textContent = endpointSnippet;
    if (tabEndpoint) {
      tabEndpoint.setAttribute('aria-selected', 'true');
      tabEndpoint.className = activeClasses;
    }
    if (tabWorkflow) {
      tabWorkflow.setAttribute('aria-selected', 'false');
      tabWorkflow.className = inactiveClasses;
    }
  } else {
    quickstartCode.textContent = workflowSnippet;
    if (tabWorkflow) {
      tabWorkflow.setAttribute('aria-selected', 'true');
      tabWorkflow.className = activeClasses;
    }
    if (tabEndpoint) {
      tabEndpoint.setAttribute('aria-selected', 'false');
      tabEndpoint.className = inactiveClasses;
    }
  }
}

if (tabEndpoint && tabWorkflow) {
  tabEndpoint.addEventListener('click', () => setSnippetTab('endpoint'));
  tabWorkflow.addEventListener('click', () => setSnippetTab('workflow'));
}

if (copyBtn && quickstartCode) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(quickstartCode.textContent || '');
      const previous = copyBtn.textContent;
      copyBtn.textContent = 'Copied';
      setTimeout(() => {
        copyBtn.textContent = previous || 'Copy';
      }, 2000);
    } catch {
      copyBtn.textContent = 'Copy';
    }
  });
}

const cloudWaitlistForm = document.querySelector('#cloud-waitlist-form');
const waitlistFeedback = document.querySelector('#waitlist-feedback');
const waitlistSubmit = document.querySelector('#waitlist-submit');

if (cloudWaitlistForm) {
  cloudWaitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#wl-email')?.value || '';
    if (!email) return;

    if (waitlistSubmit) {
      waitlistSubmit.disabled = true;
      waitlistSubmit.textContent = 'Saving...';
    }

    try {
      const response = await fetch('https://demo.flowformhq.com/api/v1/f/cloud-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, _gotcha: '' }),
      });

      if (response.ok) {
        if (waitlistFeedback) waitlistFeedback.hidden = false;
        cloudWaitlistForm.reset();
        if (waitlistSubmit) waitlistSubmit.textContent = 'Notified';
        return;
      }
    } catch {
      // Fallback below if network or demo endpoint is unreachable
    }

    const subject = encodeURIComponent('FlowForm Cloud Free Waitlist Notification');
    const body = encodeURIComponent(`Please notify ${email} when FlowForm Cloud Free (planned 250 submissions/mo) launches.`);
    window.location.href = `mailto:hello@flowformhq.com?subject=${subject}&body=${body}`;
    if (waitlistFeedback) waitlistFeedback.hidden = false;
    if (waitlistSubmit) {
      waitlistSubmit.disabled = false;
      waitlistSubmit.textContent = 'Notify Me';
    }
  });
}
