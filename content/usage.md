# Usage

## Scan a Single Domain

Scan a single domain or subdomain.

```bash
subreaper -d sub.example.com
```

---

## Scan Multiple Domains from a File

Provide a text file containing one domain per line.

```bash
subreaper -f subdomains.txt
```

Example:

```text
api.example.com
dev.example.com
staging.example.com
```

---

## Read Domains from Standard Input

SubReaper can consume input from other reconnaissance tools.

```bash
subfinder -d target.com -silent | subreaper -f /dev/stdin
```

---

## Save Results to JSON

Export findings to a JSON file.

```bash
subreaper -f subdomains.txt -o results.json
```

---

## Enable Verbose Mode

Display all scanned domains, including clean and NXDOMAIN results.

```bash
subreaper -f subdomains.txt -v
```

---

## Adjust Concurrency

Increase or decrease the number of parallel workers.

```bash
subreaper -f subdomains.txt -c 50
```

Default:

```text
20 workers
```

---

## Adjust Timeout

Change DNS and HTTP timeout values.

```bash
subreaper -f subdomains.txt -t 15
```

Default:

```text
10 seconds
```

---

## Use Custom DNS Resolvers

Specify custom nameservers instead of the built-in resolver list.

```bash
subreaper -f subdomains.txt -n 1.1.1.1,8.8.8.8
```

Multiple resolvers can be supplied as a comma-separated list.

---

## Origin IP Discovery

Identify exposed origin servers behind CDNs and WAFs.

```bash
subreaper -f subdomains.txt -i
```

This flag enables collection of candidate origin IPs. For domains with a recognised WAF, results are displayed immediately. For domains **without** a WAF, combine with `-Vo` to validate and surface directly reachable IPs.

---

## Origin IP Validation

Validate discovered origin IPs using direct HTTP requests.

```bash
subreaper -f subdomains.txt -i -Vo
```

Performs HTTP probes against each candidate IP. It **significantly reduces false positives** and **enables detection of exposed IPs on domains that do not use a WAF** (displayed as "No WAF"). Increases accuracy at the cost of scan time.

---

## Ghost Service Detection

Detect active CNAME targets that serve unrelated or foreign content.

```bash
subreaper -f subdomains.txt -g
```

This can help identify abandoned integrations, forgotten third-party services, or potentially risky configurations.

---

## Email Security Checks

Audit SPF, DMARC, and DKIM configurations for the apex domain.

```bash
subreaper -d example.com -E
```

Flags missing records, overly permissive SPF (+all), p=none DMARC policies, and absent DKIM selectors. Useful for quick email security posture assessment.

---

## Stale DNS Detection

Identify dangling DNS records that point to expired or non-existent resources.

```bash
subreaper -f subs.txt -St
```

Detects zombie A records, defunct MX servers, and leftover TXT verification tokens (e.g., Google, Microsoft) that may indicate abandoned cloud services.

---

## CORS Misconfiguration Chaining

Check for permissive CORS headers that can be exploited via vulnerable or dangling subdomains.

```bash
subreaper -f subs.txt -Co
```

Requires a file input (-f). Combines subdomain takeover context with CORS misconfigurations to highlight potential data exfiltration paths.

---

## DNSSEC Analysis

Examine DNSSEC deployment and attempt zone enumeration.

```bash
subreaper -d example.com -Ds
```

Checks for DNSSEC validation errors, performs NSEC zone walking to enumerate all zone records, and probes for open AXFR zone transfers.

---

## Sinkhole Detection

Find domains that resolve to sinkhole servers or placeholder parking pages.

```bash
subreaper -f suspicious.txt -Sk
```

Looks for DNS sinkhole patterns. When combined with -A, attempts default credential login on discovered services.

---

## Aggressive Sinkhole Hijack

Attempt default credential login on sinkholed services.

```bash
subreaper -f suspicious.txt -Sk -A
```

Probes open ports (SSH, FTP, HTTP basic auth) and tries known default credentials. Use only on assets you own or have explicit permission to test.

---

## Combine Multiple Detection Modes

Run takeover detection, origin discovery, origin validation, and ghost service analysis together.

```bash
subfinder -d target.com -silent | subreaper -f /dev/stdin -i -Vo -g -E -o results.json
```

---

## GeoIP Database Setup

Download and configure MaxMind GeoLite2 databases.

```bash
subreaper -S
```

SubReaper will launch an interactive setup wizard and prompt for a MaxMind license key.

---

## Update WAF IP Ranges

```bash
subreaper -U
```
CDN providers frequently change their IP ranges. Run -U periodically to download the latest IP prefixes from official sources (CloudFront, Cloudflare, Fastly). The updated data is stored in ~/.subreaper/waf_ranges.json and used automatically on subsequent scans.

---

## Full Options

| Option               | Short | Description                                            |
| -------------------- | ----- | ------------------------------------------------------ |
| `--domain`           | `-d`  | Scan a single domain or subdomain                      |
| `--file`             | `-f`  | File containing one domain per line                    |
| `--output`           | `-o`  | Export results to a JSON file                          |
| `--concurrency`      | `-c`  | Number of parallel scan workers                        |
| `--timeout`          | `-t`  | DNS and HTTP timeout in seconds                        |
| `--nameservers`      | `-n`  | Comma-separated custom DNS resolvers                   |
| `--verbose`          | `-v`  | Display all domain statuses                            |
| `--origin`           | `-i`  | Discover exposed origin IPs                            |
| `--validate-origins` | `-Vo` | Validate discovered origin IPs                         |
| `--ghost`            | `-g`  | Detect ghost services and foreign content              |
| `--setup-geoip`      | `-S`  | Download MaxMind GeoLite2 databases                    |
| `--update-waf-db`    | `-U`  | Download latest WAF/CDN IP ranges from official sources| 
| `--email-security` | `-E`  | Check SPF, DMARC, and DKIM misconfigurations                    |
| `--stale-dns`      | `-St` | Detect stale DNS records (zombie A, MX, TXT verification)       |
| `--cors-chain`     | `-Co` | CORS misconfig chained with dangling/vulnerable subdomains (needs -f) |
| `--dnssec`         | `-Ds` | Check DNSSEC misconfig, NSEC walking, and attempt AXFR          |
| `--sinkhole`       | `-Sk` | Detect DNS sinkholes & attempt service hijack with default creds|
| `--aggressive`     | `-A`  | Probes ports & tries default logins on sinkholes (requires -Sk) |


---

## Common Examples

### Basic takeover scan

```bash
subreaper -f subdomains.txt
```

### Takeover scan with verbose output

```bash
subreaper -f subdomains.txt -v
```

### Takeover scan with JSON export

```bash
subreaper -f subdomains.txt -o results.json
```

### Infrastructure analysis

```bash
subreaper -f subdomains.txt -i -Vo
```

### Email security audit

```bash
subreaper -d example.com -E
```

### Stale DNS enumeration

```bash
subreaper -f subdomains.txt -St
```

### DNSSEC and zone transfer probe

```bash
subreaper -d example.com -Ds
```

### Sinkhole detection with aggressive takeover

```bash
subreaper -f suspicious.txt -Sk -A
```

### Full assessment

```bash
subfinder -d target.com -silent | subreaper -f /dev/stdin -i -Vo -g -E -St -Co -Ds -Sk -o results.json
```

---
[Welcome](#welcome) · [Installation](#installation) · [Features](#features) · [Contributing](#contributing) · [License](#license) 