import './style.css'

document.querySelector('#app').innerHTML = `
<div>
  <nav class="border-b border-gray-100 bg-white/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="text-xl font-bold text-indigo-600">FlowForm</span>
      </div>
      <div class="flex items-center gap-6 text-sm">
        <a href="https://docs.flowformhq.com" class="text-gray-600 hover:text-gray-900">Docs</a>
        <a href="#features" class="text-gray-600 hover:text-gray-900">Features</a>
        <a href="#compare" class="text-gray-600 hover:text-gray-900">Compare</a>
        <a href="https://github.com/flowformhq/flowform" class="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
      </div>
    </div>
  </nav>

  <section class="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
    <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700 mb-6">
      Open source &middot; AGPLv3 + Commercial
    </div>
    <h1 class="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
      The open-source<br/>forms platform
    </h1>
    <p class="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
      Headless, API-first form and workflow engine for developers. 
      Build multi-step forms with conditional logic. Self-host or use our managed SaaS.
    </p>
    <div class="mt-10 flex items-center justify-center gap-4">
      <a href="https://github.com/flowformhq/flowform" class="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 shadow-sm">
        Get started
      </a>
      <a href="https://docs.flowformhq.com" class="rounded-lg border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50">
        Read the docs
      </a>
    </div>
    <p class="mt-4 text-sm text-gray-400">Self-host for free &middot; No credit card &middot; Full API access</p>
  </section>

  <section class="bg-gray-50 py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="rounded-xl bg-gray-900 p-8 sm:p-12 shadow-2xl">
        <div class="flex items-center gap-2 mb-4">
          <div class="h-3 w-3 rounded-full bg-red-400"></div>
          <div class="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div class="h-3 w-3 rounded-full bg-green-400"></div>
          <span class="ml-4 text-sm text-gray-400 font-mono">terminal</span>
        </div>
        <pre class="text-sm sm:text-base text-green-400 font-mono leading-relaxed overflow-x-auto"><code>git clone https://github.com/flowformhq/flowform.git
cd flowform && composer install
cp .env.example .env && php artisan key:generate
php artisan migrate --seed
php artisan serve

<span class="text-gray-500"># → Admin panel: http://localhost:8000/admin</span>
<span class="text-gray-500"># → API docs:   http://localhost:8000/docs</span>

<span class="text-gray-500"># Fetch a form schema</span>
curl http://localhost:8000/api/v1/forms/{uuid}/schema

<span class="text-gray-500"># Submit a response</span>
curl -X POST http://localhost:8000/api/v1/submissions \\
  -H "Authorization: Bearer TOKEN" \\
  -d '{"form_uuid":"..."}'</code></pre>
      </div>
    </div>
  </section>

  <section id="features" class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-4">Built for developers, by developers</h2>
      <p class="text-center text-gray-600 mb-16 max-w-2xl mx-auto">Every feature is accessible via a clean REST API. No lock-in, no hidden limitations.</p>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">📋</div>
          <h3 class="font-semibold text-lg mb-2">Multi-step forms</h3>
          <p class="text-gray-600 text-sm">Organize fields into steps with progress tracking. Advance, retreat, and resume.</p>
        </div>
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">🔀</div>
          <h3 class="font-semibold text-lg mb-2">Conditional logic</h3>
          <p class="text-gray-600 text-sm">Show, hide, or require fields based on other answers. Server-evaluated for consistency.</p>
        </div>
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">🔌</div>
          <h3 class="font-semibold text-lg mb-2">REST API + OpenAPI</h3>
          <p class="text-gray-600 text-sm">Full API with auto-generated docs. Schema endpoint returns everything in one call.</p>
        </div>
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">🎨</div>
          <h3 class="font-semibold text-lg mb-2">Headless by design</h3>
          <p class="text-gray-600 text-sm">No frontend lock-in. Use React, Vue, Livewire, or build your own with the TypeScript SDK.</p>
        </div>
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">🔐</div>
          <h3 class="font-semibold text-lg mb-2">Self-host with escape hatch</h3>
          <p class="text-gray-600 text-sm">AGPLv3 licensed forever. License Promise guarantees no BSL/SSPL pivot. Or use the managed SaaS.</p>
        </div>
        <div class="rounded-lg border border-gray-200 p-6">
          <div class="text-2xl mb-3">🐳</div>
          <h3 class="font-semibold text-lg mb-2">Docker-ready</h3>
          <p class="text-gray-600 text-sm">One-command deploy with Docker Compose. One-click buttons for Railway, Render, and DigitalOcean.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="compare" class="bg-gray-50 py-20">
    <div class="max-w-4xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-4">Why FlowForm?</h2>
      <p class="text-center text-gray-600 mb-12">The open-source alternative to Typeform, Tally, and Fillout.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 pr-4 font-semibold text-gray-900">Feature</th>
              <th class="py-3 px-4 font-semibold text-indigo-600">FlowForm</th>
              <th class="py-3 px-4 font-semibold text-gray-500">Typeform</th>
              <th class="py-3 px-4 font-semibold text-gray-500">Tally</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">Open source</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">Self-hostable</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">REST API + SDK</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-gray-400">Limited</td>
              <td class="py-3 px-4 text-center text-gray-400">Limited</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">Conditional logic</td>
              <td class="py-3 px-4 text-center text-green-600">Unlimited</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">Multi-step forms</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">Headless / framework agnostic</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
              <td class="py-3 px-4 text-center text-gray-400">No</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-3 pr-4 text-gray-700">EU data residency (self-host)</td>
              <td class="py-3 px-4 text-center text-green-600">Yes</td>
              <td class="py-3 px-4 text-center text-yellow-600">Add-on</td>
              <td class="py-3 px-4 text-center text-yellow-600">Partial</td>
            </tr>
            <tr>
              <td class="py-3 pr-4 text-gray-700">Starting price</td>
              <td class="py-3 px-4 text-center font-medium text-indigo-600">$0 (self-host)</td>
              <td class="py-3 px-4 text-center text-gray-600">$25/mo</td>
              <td class="py-3 px-4 text-center text-gray-600">$29/mo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="py-20">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center mb-4">Starter kits for every framework</h2>
      <p class="text-center text-gray-600 mb-12">Clone and customize. All kits share the same rendering contract.</p>
      <div class="grid sm:grid-cols-3 gap-6">
        <a href="https://github.com/flowformhq/flowform/tree/main/starter-kit-react" class="block rounded-lg border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition">
          <h3 class="font-semibold text-lg mb-1">React + Vite</h3>
          <p class="text-sm text-gray-600">TypeScript SDK, useFlowForm hook, Tailwind CSS</p>
        </a>
        <a href="https://github.com/flowformhq/flowform/tree/main/starter-kits/vue" class="block rounded-lg border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition">
          <h3 class="font-semibold text-lg mb-1">Vue 3 + Vite</h3>
          <p class="text-sm text-gray-600">Composition API, useFlowForm composable, Tailwind CSS</p>
        </a>
        <a href="https://github.com/flowformhq/flowform/tree/main/starter-kits/livewire" class="block rounded-lg border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition">
          <h3 class="font-semibold text-lg mb-1">Laravel Livewire</h3>
          <p class="text-sm text-gray-600">Composer package, Blade views, no JS build step</p>
        </a>
      </div>
    </div>
  </section>

  <section class="bg-indigo-600 py-20">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
      <p class="text-indigo-200 mb-8">Self-host for free. Production-ready in minutes.</p>
      <div class="flex items-center justify-center gap-4">
        <a href="https://github.com/flowformhq/flowform" class="rounded-lg bg-white px-6 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50">
          View on GitHub
        </a>
        <a href="https://docs.flowformhq.com" class="rounded-lg border border-white/30 px-6 py-3 text-base font-medium text-white hover:bg-white/10">
          Read the docs
        </a>
      </div>
    </div>
  </section>

  <footer class="border-t border-gray-100 py-8">
    <div class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-indigo-600">FlowForm</span>
        <span>&middot; &copy; 2026 FlowFormHQ</span>
      </div>
      <div class="flex items-center gap-6">
        <a href="https://docs.flowformhq.com" class="hover:text-gray-900">Docs</a>
        <a href="https://github.com/flowformhq/flowform" class="hover:text-gray-900">GitHub</a>
        <a href="mailto:hello@flowformhq.com" class="hover:text-gray-900">Contact</a>
      </div>
    </div>
  </footer>
</div>
`
