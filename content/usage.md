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

## Combine Multiple Detection Modes

Run takeover detection, origin discovery, origin validation, and ghost service analysis together.

```bash
subfinder -d target.com -silent | subreaper -f /dev/stdin -i -Vo -g -o results.json
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

### Full assessment

```bash
subfinder -d target.com -silent | subreaper -f /dev/stdin -i -Vo -g -o results.json
```

---
[Welcome](#welcome) · [Installation](#installation) · [Features](#features) · [Contributing](#contributing) · [License](#license) 