# Portfolio analytics — owner setup & KPI guide

This GitHub Pages portfolio is **configured with the GA4 measurement ID supplied by the owner**. Clarity is intentionally disabled because the supplied project belongs to `mavvix.com`, not this personal portfolio. No external analytics tag loads before visitor opt-in (or when Global Privacy Control is enabled).

## Confirm the configured analytics properties

1. GA4 web data stream supplied by the site owner: **`G-XFZZ8J7Q4F`**. In [Google Analytics](https://analytics.google.com/) confirm the property corresponds to `https://mykholy.github.io/`. **Attention:** a distinct stream `G-777MHCRRZZ` was visible in another GA4 property labelled `mykholy.github.io`. Determine which stream should receive portfolio events and keep only that one configured; do not install both.
2. The supplied Microsoft Clarity project **`z1tgj7ku7n`** was verified as **`mavvix.com`**. It is deliberately **not activated here** to prevent mixing company and personal portfolio visitor data. Create a separate Clarity project for **`mykholy.github.io`** and replace the empty ID in `assets/js/analytics-config.js` with its new project ID. Configure privacy/masking and consent mode.
3. The file `assets/js/analytics-config.js` is already configured:

```js
window.PORTFOLIO_ANALYTICS = Object.freeze({
  ga4MeasurementId: "G-XFZZ8J7Q4F",
  clarityProjectId: "" // Add a NEW Clarity project ID for mykholy.github.io
});
```

4. Open the portfolio in a **new private browser**, choose **Allow analytics**, then verify in GA4 **Realtime**. Microsoft Clarity will remain inactive until a separate portfolio project ID is set. Test **Keep private** using Network tools: no `googletagmanager.com/gtag/js` or `clarity.ms/tag/` should load before opt-in.
5. The site sends **analytics consent only**: GA4 `analytics_storage=granted`, advertising consent denied; Clarity Consent API V2 uses `analytics_Storage=granted`, `ad_Storage=denied`.
6. Do **not** paste a second standalone Google Analytics/Clarity script into `index.html`. An extra snippet will double-count events and may bypass user consent.
7. If you need to stop future analytics collection, clear the IDs and deploy the change; existing provider data must be managed at the providers.

### Search Console for this portfolio

- Confirm the selected Search Console **URL-prefix property** is exactly `https://mykholy.github.io/`. A verified property for `mavvix.com` does not cover this GitHub Pages host.
- Submit `https://mykholy.github.io/sitemap.xml` in **Indexing → Sitemaps**, and use URL Inspection on the homepage.
- The site publishes a canonical homepage, robots.txt reference, JSON-LD Person/WebSite/ProfilePage and current sitemap lastmod date.
- Search Console verification itself happens within Google or via an ownership token. Merely adding GA4 to the site does not demonstrate Search Console ownership.

## Custom events collected after opt-in

| Event | Trigger | Meaning |
|---|---|---|
| `page_view` | Standard GA4 automatic page view | Aggregate visits |
| `view_ai_section` | AI section appears in viewport | AI service reach |
| `project_open` | Visitor opens a project card | Interested project, `project_id` |
| `project_filter` | Filter control click | Preferred project category |
| `project_deep_link` | Case study link clicked | Interest in a case |
| `contact_intent` | Email or WhatsApp link click | Contact **intention**, not a confirmed lead |
| `cv_download_click` | Click on PDF download | Resume intent |
| `portfolio_scroll` | 25 / 50 / 75 / 90 percent depth | Reading engagement |
| `language_toggle` | Language button click | Requested language |
| `ai_section_navigation` | AI nav anchor click | AI interest |
| `portfolio_navigation` | Work navigation click | Portfolio interest |
| `outbound_profile_click` | GitHub or LinkedIn click | Social profile interest |

Create GA4 custom dimensions such as `project_id`, `project_category`, `channel` and `placement` if needed for Explorations.

## Weekly scorecard

**Primary KPIs**
1. **Contact-intent session rate** = number of consenting sessions with at least one `contact_intent` / consenting sessions. This is *not* actual leads.
2. **Project-interest session rate** = consenting sessions with at least one `project_open` / consenting sessions.
3. **CV-interest session rate** = consenting sessions with at least one `cv_download_click` / consenting sessions.

**Drivers**: source / medium, mobile vs desktop, which projects get opened, AI section reach and scroll depth. **Guardrails**: site performance and consent bias. Establish a baseline before setting numeric growth targets.

In GA4 use acquisition reports for source/medium and UTMs, geography for approximate regions, technology for device types, events for conversions/engagement. Clarity provides session interaction patterns and heatmaps, not visitor identity. For example, use `https://mykholy.github.io/?utm_source=linkedin&utm_medium=profile&utm_campaign=portfolio` on LinkedIn and `?utm_source=github&utm_medium=profile` from GitHub. Never include personally identifying data in UTM parameters.

## Privacy and limitations

- GitHub Pages does not identify named visitors. Aggregate analytics can show coarse country, device, source, and activity, **not individuals**.
- No analytics is collected by this optional integration when either property is unconfigured, the user declines, or Global Privacy Control is on. Consent-based and blocker-filtered analytics will undercount total visits.
- Choices are stored locally using `ae_portfolio_analytics_consent_v1` and can be changed with **Privacy settings** in the footer.
- There is no backend lead form. To measure real qualified leads, reconcile subsequent voluntary emails/WhatsApp inquiries in a CRM.
- Verify privacy obligations for countries you target before enabling any tracking.

**Official documentation:** [GA4 setup](https://support.google.com/analytics/answer/14183469), [GA4 custom events](https://support.google.com/analytics/answer/14144294), [Microsoft Clarity](https://clarity.microsoft.com/).