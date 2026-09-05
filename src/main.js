import './style.css'

// The page itself is static HTML in index.html so that crawlers, AI agents and
// no-JS visitors get the full content. This file carries behaviour only.

// Mobile navigation toggle
const navToggle = document.querySelector('#nav-toggle')
const navMobile = document.querySelector('#nav-mobile')

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true'
    navToggle.setAttribute('aria-expanded', String(!open))
    navMobile.hidden = open
  })

  // Close the menu after following an in-page anchor.
  navMobile.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navToggle.setAttribute('aria-expanded', 'false')
      navMobile.hidden = true
    }
  })
}

// Copy-to-clipboard for the quickstart block
const copyButton = document.querySelector('#copy-quickstart')

if (copyButton && navigator.clipboard) {
  copyButton.addEventListener('click', async () => {
    const source = document.getElementById(copyButton.dataset.target)
    if (!source) return

    try {
      await navigator.clipboard.writeText(source.innerText.trim())
      const previous = copyButton.textContent
      copyButton.textContent = 'Copied'
      setTimeout(() => { copyButton.textContent = previous }, 1500)
    } catch {
      copyButton.textContent = 'Press Ctrl+C'
    }
  })
} else if (copyButton) {
  copyButton.hidden = true
}
