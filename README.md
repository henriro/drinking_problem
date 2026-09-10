# I've got a drinking problem

A drink log for responsible drinking.

Browser-only educational alcohol diary prototype. Plain JavaScript, HTML, CSS and SVG; no backend, external scripts, cookies, analytics or dependencies. Body metrics and drinks stay in localStorage on this browser and origin. Browser storage is unencrypted and may be cleared by the browser.

Run locally with Node.js: `npm run dev`, then open http://127.0.0.1:4173. Run calculation tests with `npm test`.

For Vercel: put this folder's contents in a GitHub repository and import it in Vercel. Framework: Other. No build command or install command required. Output directory: `dist` (also configured in vercel.json). No environment variables. Deploying to a new origin does not transfer the local diary.

The basic Widmark model uses body weight and r = 0.68 / 0.55, instant absorption at drink completion, zero initial BAC, and central elimination of 0.15 g/kg/hour. Alternate scenarios use 0.10 and 0.20, not confidence limits. Height and session start do not affect the equation; start is diary context only. Real absorption and elimination differ. The prototype never determines fitness or legal permission to drive. Sources and preset references are linked inside the app. This is not a clinically validated calculator.

Features: profile, optional start datetime, 30 Estonian market package presets, custom volume/ABV, finish datetime, incremental calculation, editable/removable drinks, SVG scenario curves, local persistence, explicit erase and a collapsible profile. Preset strengths and sizes must be checked against the actual package.

Calculation tests cover ethanol conversion, elimination, midnight, sorting, separated sessions, invalid inputs and zero ABV. Browser interaction and WebMCP validation have not been performed. A feature-detected read-only diary tool is available only in browsers implementing document.modelContext.
