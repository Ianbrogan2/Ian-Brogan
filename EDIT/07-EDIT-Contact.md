# Contact Page (/contact) — Editing Guide

## What's on this page
- A short intro and a contact form (name, email, message).
- The form sends submissions to your email via a service called Formspree.

## What's safe to change
- Any intro/heading text on this page is controlled by `src/pages/contact.astro` — this is a code file, so for text changes here it's best to ask for help rather than editing directly (small risk of breaking the page layout).
- Your contact email and Instagram handles shown elsewhere on the site (footer, nav) are controlled separately — see **09-EDIT-Site-Wide.md**.

## Important — do not touch
- The form's hidden ID code (`xwvjbgqe`) — this connects the form to your email inbox. If this gets changed or deleted, contact form submissions will stop arriving. Leave this alone.

## No photos needed
This page is text/form only.

## Nothing else needs fixing
The form fields, layout, and mobile display were checked and are working correctly. Submissions go through Formspree as expected.
