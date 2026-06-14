# Key Features

## Subdomain Takeover Detection

Detect dangling CNAMEs, NS takeovers, and unclaimed third-party resources across more than 20 supported providers.

## Scenario-Based Validation

Fingerprint-based validation with weighted scoring to distinguish real takeover opportunities from generic error pages.

## Origin IP Discovery

Identify exposed origin servers behind Cloudflare and other reverse proxies through DNS and infrastructure analysis.

## Origin Validation

Validate discovered origin IPs with direct HTTP requests to confirm exposure and improve result accuracy.

## Ghost Service Detection

Detect active third-party services still referenced by DNS records but serving unrelated content, abandoned projects, or foreign websites.

## Email Security Checks

Audit SPF, DMARC, and DKIM configurations. Identify missing records, permissive policies (`+all`, `p=none`), and absent DKIM selectors that weaken email security posture.

## Stale DNS Detection

Find dangling DNS records pointing to expired resources, including zombie A records, defunct MX servers, and leftover TXT verification tokens (e.g., Google, Microsoft) that signal abandoned cloud services.

## CORS Misconfiguration Chaining

Check for overly permissive CORS headers (`Access-Control-Allow-Origin: *` or dynamic reflection) and chain them with vulnerable or dangling subdomains to highlight potential data exfiltration paths.

## DNSSEC Analysis

Examine DNSSEC deployment health, detect misconfigurations, perform NSEC zone walking to enumerate zone records, and probe for open AXFR zone transfers that could leak entire zone contents.

## Sinkhole & Hijack Detection

Identify DNS sinkholes and placeholder parking pages. When combined with aggressive mode, probes open ports and attempts default credential login on discovered services.

## IP Intelligence

Resolve ASN, organization, country, city, and geographic coordinates using MaxMind GeoLite2 databases or DNS-based fallback methods.

## WAF & SNI Bypass Handling

Automatically handle common validation issues such as Cloudflare protection layers and Vercel SNI mismatches.

## Auto-Update Database
Downloads the latest IP ranges from official sources (CloudFront, Cloudflare, Fastly) via `-U`

## Concurrent Scanning

Perform large-scale scans efficiently with asynchronous workers and configurable concurrency limits.

## Professional Reporting

Generate readable terminal output and structured JSON reports suitable for bug bounty and security assessments.

## Precision-Focused Detection

Reduce false positives through multi-resolver consensus checks, wildcard detection, and negative-signal filtering.

---

[Welcome](#welcome) · [Installation](#installation) · [Usage](#usage) · [Contributing](#contributing) · [License](#license) 