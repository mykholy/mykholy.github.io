# Portfolio analytics — owner setup & KPI guide

This GitHub Pages portfolio is **instrumented but NOT connected** to analytics accounts by default. No external analytics tag loads without a valid provider ID and visitor opt-in.

## Connect your own analytics properties

1. Create or select a Google Analytics 4 property at [Google Analytics](https://analytics.google.com/), then create a **Web data stream** for `https://mykholy.github.io/`. Copy the Measurement ID beginning with `G-`.
2. Optionally create a project at [Microsoft Clarity](https://clarity.microsoft.com/), set the portfolio URL and copy the Clarity Project ID. Review privacy and masking settings.
3. Edit `assets/js/analytics-config.js` on GitHub:

```js
window.PORTFOLIO_ANALYTICS = Object.freeze({
  ga4MeasurementId: "G-YOUR-REAL-ID",
  clarityProjectId: "YOUR-REAL-CLARITY-ID" // Optional; leave "" if unused.
});
```

4. Commit to `main`, wait for GitHub Pages to deploy, open the site in a **fresh/private browser**, choose **Allow analytics**, then check GA4 **Realtime** and Clarity. Repeat with **Keep private** and confirm external analytics scripts do not load.
5. **Do not** add a second standalone `gtag.js` / Clarity snippet: this integration already loads them conditionally. Remove both IDs to stop future loading (does not erase previously collected data).

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