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

## IP Intelligence

Resolve ASN, organization, country, city, and geographic coordinates using MaxMind GeoLite2 databases or DNS-based fallback methods.

## WAF & SNI Bypass Handling

Automatically handle common validation issues such as Cloudflare protection layers and Vercel SNI mismatches.

## Concurrent Scanning

Perform large-scale scans efficiently with asynchronous workers and configurable concurrency limits.

## Professional Reporting

Generate readable terminal output and structured JSON reports suitable for bug bounty and security assessments.

## Precision-Focused Detection

Reduce false positives through multi-resolver consensus checks, wildcard detection, and negative-signal filtering.