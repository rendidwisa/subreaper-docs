# SubReaper

**Subdomain Takeover & Vulnerability Scanner**  
Built for bug bounty hunters and pentesters with a precision-focused detection design.

## Key Features at a Glance

- Detect dangling CNAME, NS takeover, and unclaimed provider accounts (20+ services)
- High-accuracy validation via HTTP body fingerprint matching and scenario-based scoring
- Origin IP intelligence – ASN, organization, country, city, coordinates (MaxMind GeoLite2 or DNS fallback)
- Automatic WAF & SNI bypass for Cloudflare-protected and Vercel-misconfigured services
- Blazing-fast async scanning with configurable concurrency
- Professional output: colored terminal, verbose DNS details, JSON export
- Multi-resolver consensus, wildcard guard, and negative signal filtering to minimize false positives
- **Email Security Checks** – SPF, DMARC, DKIM misconfiguration detection
- **Stale DNS Detection** – Zombie A, MX, and dangling TXT verification records
- **CORS Misconfiguration Chaining** – Exploit CORS weaknesses with vulnerable/dangling subdomains
- **DNSSEC Analysis** – DNSSEC misconfig, NSEC zone walking, AXFR zone transfers
- **Sinkhole & Hijack Detection** – DNS sinkhole identification and default credential hijacking

---
[Installation](#installation) · [Usage](#usage) · [Features](#features) · [Contributing](#contributing) · [License](#license) · [Roadmap](#roadmap)