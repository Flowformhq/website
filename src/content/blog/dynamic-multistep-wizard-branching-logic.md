---
title: "Dynamic Multi-Step Form Wizards: Building Branching Decision Trees in React, Vue, and Livewire"
description: "How to build conversational, multi-step forms with conditional branching logic jumps in React, Vue 3, and Laravel Livewire using a single JSON Schema and FlowForm Mode 2."
publishDate: "2026-10-26"
author: "FlowForm Engineering Team"
category: "Mode 2 Tutorials"
tags: ["Multi-Step Forms", "Conditional Branching", "React Forms", "Vue Forms", "Livewire", "JSON Schema Forms"]
canonicalUrl: "https://flowformhq.com/blog/dynamic-multistep-wizard-branching-logic"
---

## How do you build a dynamic multi-step form wizard with conditional branching logic?

To build a multi-step form wizard with conditional branching, define the steps, fields, and evaluation rules in a declarative JSON Schema. The frontend starter kit (React, Vue, or Livewire) renders current step inputs, evaluates conditional visibility client-side for smooth transitions, and posts values to FlowForm Mode 2 for server-side validation.

---

## Why Long Flat Forms Kill Conversion Rates

Research into web form usability consistently demonstrates that presenting users with 15+ form fields simultaneously creates high cognitive fatigue, causing abandonment rates to surge above 65%.

**Multi-step form wizards solve this by:**
1. **Chunking Information:** Grouping related questions into digestible, focused micro-steps (e.g. Account Info &rarr; Company Profile &rarr; Project Scope).
2. **Dynamic Relevance (Logic Jumps):** Only asking questions that apply to that specific user. For example, if a prospect selects "Freelancer", the form skips enterprise compliance questions entirely.
3. **Progress Visibility:** Displaying visual progress bars and step indicators that provide immediate dopamine and motivate completion.

---

## The FlowForm Approach: One Schema, Any Frontend

Rather than hardcoding multi-step logic into brittle frontend state machines, FlowForm separates **form definition** from **form presentation**.

The FlowForm engine stores the form structure as a normalized database model and serves it via `GET /api/v1/forms/{uuid}/schema`:

```json
{
  "uuid": "form_01hxyz",
  "name": "B2B Lead Qualification",
  "steps": [
    {
      "id": 1,
      "order": 1,
      "title": "Contact Details",
      "fields": [
        { "code": "full_name", "label": "Full Name", "type": "text", "required": true },
        { "code": "work_email", "label": "Work Email", "type": "email", "required": true }
      ]
    },
    {
      "id": 2,
      "order": 2,
      "title": "Organization Size",
      "fields": [
        {
          "code": "company_tier",
          "label": "How many employees at your company?",
          "type": "radio",
          "options": ["1-10", "11-50", "51-200", "200+"]
        }
      ]
    },
    {
      "id": 3,
      "order": 3,
      "title": "Enterprise Security Needs",
      "conditions": [
        {
          "field": "company_tier",
          "operator": "in_array",
          "value": ["51-200", "200+"]
        }
      ],
      "fields": [
        { "code": "sso_provider", "label": "Preferred SSO / SAML Provider", "type": "text" }
      ]
    }
  ]
}
```

Notice that Step 3 includes a `conditions` block. If the user selects "1-10", Step 3 is automatically bypassed!

---

## Rendering in React / Next.js

Using `@flowformhq/react-starter`, rendering this multi-step wizard requires just a few lines:

```jsx
import { FlowForm } from '@flowformhq/react-starter'
import '@flowformhq/react-starter/dist/style.css'

export default function OnboardingWizard() {
  return (
    <div className="max-w-xl mx-auto py-12">
      <FlowForm
        schemaUrl="https://demo.flowformhq.com/api/v1/forms/form_01hxyz/schema"
        onStepChange={(step, total) => console.log(`Step ${step} of ${total}`)}
        onComplete={async (submissionId) => {
          window.location.href = `/welcome?submission=${submissionId}`
        }}
      />
    </div>
  )
}
```

---

## Rendering in Laravel Livewire (Zero JavaScript Build Step)

If your application is built on Laravel, FlowForm provides a native Livewire component (`flowformhq/livewire-starter`) that handles step transitions, wire protocol communication, and server-side validation using pure Blade templates:

```blade
{{-- In your Blade view --}}
<livewire:flowform-starter::form-renderer formUuid="form_01hxyz" />
```

---

## Server-Evaluated vs Client-Only Logic: Why Security Matters

Most client-only form builders evaluate conditional rules in JavaScript alone. If a malicious actor inspects network payloads, they can modify hidden values or tamper with question sequences.

FlowForm utilizes **Dual-Layer Evaluation**:
1. **Client-Side:** The React/Vue/Livewire kit evaluates conditional branches instantly in memory to deliver 60fps transitions without network lag.
2. **Server-Side:** When the submission is received, FlowForm re-evaluates all conditional rules against the submitted values on the server. If a submitted field should have been hidden based on previous answers, the server discards or flags it, preventing tampering.

---

## Conclusion

Building dynamic multi-step form wizards with branching logic no longer requires wrestling with complex frontend code or paying $99/month for Typeform.

With **FlowForm Mode 2**, developers define the schema once, render it natively in React, Vue, or Livewire, and maintain complete control over data sovereignty and user experience.
