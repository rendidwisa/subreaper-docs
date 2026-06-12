# SubReaper — Development Roadmap

SubReaper evolves beyond subdomain takeover detection. The following features are
designed to broaden the scope of findings consistently accepted across bug bounty programs.

---

## In Development

**Email Security Analysis** `-E`

Analyzes SPF, DMARC, and DKIM configurations to detect domain spoofing weaknesses.
Processes TXT records already collected during scanning — no additional DNS overhead.
Technique: parses SPF mechanisms, queries DMARC and DKIM, identifies misconfigurations
such as `+all`, missing DMARC policy, and weak DKIM keys.

---

**Stale DNS Record Detection** `-St`

Detects DNS records pointing to decommissioned services — zombie A records,
MX records for dead mail servers, and leftover TXT verification records.
Correlates DNS resolution with HTTP probing to confirm active status.

---

**CORS Misconfiguration Chain** `-Co`

Detects CORS policies that reflect arbitrary origins, chained with dangling or
vulnerable subdomains. Requires file input `-f`.
Reports credential exposure when `Access-Control-Allow-Credentials: true` is present.

---

**DNSSEC & Zone Transfer Analysis** `-Ds`

Three checks in one: DNSSEC algorithm strength (with CVE references where applicable),
NSEC zone walking for zone content enumeration, and AXFR attempts against every
authoritative nameserver. Full zone dump included in output if transfer succeeds.

---

## Under Active Development

**DNS Sinkhole Detection** `-Sk`

Detects domains redirected to sinkhole or parked infrastructure.
Fingerprints providers from response body and headers.
Module scaffolded; not yet functional. The `-Sk` flag is available but inactive.

---

## Planned

**Origin IP Port Scan**

Lightweight TCP probe against candidate origin IPs discovered by the WAF bypass module `-i`.
Targets commonly exposed services: SSH, database ports, management interfaces.
Impact: high — exposed databases or SSH can lead to remote code execution.

---

**Open Redirect Detection**

Probes subdomains with common redirect parameters (`redirect`, `url`, `next`, `return`).
Inspects the `Location` header for off-domain targets.
Impact: moderate to high — consistently accepted on bug bounty platforms.

---

## Status Reference

| Status | Description |
|--------|-------------|
| In Development | Implementation in progress, available in the current version |
| Under Active Development | Module scaffolded, partially functional |
| Planned | Designed, not yet started |