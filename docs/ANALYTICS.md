# Portfolio analytics — owner setup & KPI guide

This GitHub Pages portfolio uses two **dedicated site-owner-confirmed** web analytics properties, loaded **only after visitors opt in**. No third-party analytics tag loads before consent, including when Global Privacy Control is enabled.

## Configured portfolio measurement properties

| Service | Identifier | Website |
| --- | --- | --- |
| Google Analytics 4 | `G-777MHCRRZZ` | `https://mykholy.github.io/` |
| Microsoft Clarity | `z1tp5tfopd` | `https://mykholy.github.io/` |
| Google Search Console | HTML verification meta | URL-prefix property `https://mykholy.github.io/` |

The IDs are published in `assets/js/analytics-config.js`:

```js
window.PORTFOLIO_ANALYTICS = Object.freeze({
  ga4MeasurementId: "G-777MHCRRZZ",
  clarityProjectId: "z1tp5tfopd"
});
```

**Consent:** a fresh `ae_portfolio_analytics_consent_v2` preference is required to add Clarity alongside GA4. Rejecting consent prevents both provider scripts from loading. After opt-in the site sends GA4 `analytics_storage=granted` with ad-related storage and personalization denied, and uses Clarity `consentv2` with `analytics_Storage=granted`, `ad_Storage=denied`. Consent is local to the current browser; ads and analytics blockers can suppress collection.

**QA after deployment**

1. Visit the live portfolio in a private/incognito browser, choose **Keep private**; confirm no GA4/Clarity network requests.
2. Open it in a separate fresh private browser, choose **Allow analytics**, and confirm GA4 **Realtime** receives a `page_view` in the property associated with `G-777MHCRRZZ`. Check Microsoft's Clarity dashboard for the **z1tp5tfopd** project. These services may take time to show reports.
3. Test project cards, the AI section, CV download and email/WhatsApp clicks; verify custom events in GA4's event reports. Link clicks indicate intent, not a successful contact.
4. Don't paste additional GA4 or Clarity snippets elsewhere; duplicate installation can overcount events.

### Search Console ownership / sitemap

The homepage now contains this owner-supplied tag **inside the `<head>`**:

```html
<meta name="google-site-verification" content="gGALLmLXcsQgPzB3QUhtmsG-rPC9-fKQ8ZGuegDaBTY" />
```

Open [Search Console](https://search.google.com/search-console), select **`https://mykholy.github.io/`** as a URL-prefix property, and click **Verify**. Publishing the tag prepares verification but does not complete the Google ownership step automatically.

Next submit **`https://mykholy.github.io/sitemap.xml`** in **Indexing → Sitemaps**, and inspect the homepage URL. `robots.txt`, canonical URL, structured data and sitemap are already deployed. The `mavvix.com` property is separate and must not be used for this portfolio.

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
- No analytics is collected by this optional integration when the visitor declines, Global Privacy Control is on, or both tracking IDs are empty. Consent-based and blocker-filtered analytics will undercount total visits.
- Choices are stored locally using `ae_portfolio_analytics_consent_v2` and can be changed with **Privacy settings** in the footer.
- There is no backend lead form. To measure real qualified leads, reconcile subsequent voluntary emails/WhatsApp inquiries in a CRM.
- Verify privacy obligations for countries you target before enabling any tracking.

**Official documentation:** [GA4 setup](https://support.google.com/analytics/answer/14183469), [GA4 custom events](https://support.google.com/analytics/answer/14144294), [Microsoft Clarity](https://clarity.microsoft.com/).
### Service discovery

`service_interest` records clicks on a homepage service link, with its public `service_slug`. New service and case-study pages reuse the same consent-gated analytics installation. Route-prefixed AI/work navigation is recognized without adding duplicate page views. Confirm receipt in GA4 Realtime after deployment; code checks alone do not prove events reached the property.
