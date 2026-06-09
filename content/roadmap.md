## Development Roadmap

SubReaper continues to evolve beyond DNS takeover detection. The following features are planned to enhance its capability in identifying network and DNS misconfigurations commonly accepted in bug bounty programs.

---

### Email Security Analysis (SPF / DMARC / DKIM)

Analyze TXT records to detect weak email authentication configurations that allow domain spoofing.  
**Technique:** Parse SPF mechanisms, query DMARC and DKIM records.  
**Data used:** DNS TXT records already collected during scanning.  
**Impact:** High – email spoofing reports are consistently accepted across bug bounty platforms.  
**Status:** Planned.

---

### Origin IP Open Port Detection

Perform lightweight TCP port scans on candidate origin IPs discovered by the WAF bypass module.  
**Technique:** Concurrent TCP connect to common ports (21, 22, 3306, 6379, 8080, etc.).  
**Data used:** Candidate origin IPs from the `-i` (WAF bypass) feature.  
**Impact:** High – exposed databases or SSH can lead to remote code execution.  
**Status:** Planned.

---

### Open Redirect Detection

Identify open redirect vulnerabilities by probing subdomains with common redirect parameters.  
**Technique:** HTTP requests with parameters like `?redirect=`, `?url=`, `?next=`; inspect the `Location` header.  
**Data used:** Subdomain list and HTTP responses.  
**Impact:** Moderate to high – open redirects are frequently accepted in bounty programs and easy to exploit.  
**Status:** Planned.

---

### Zone Transfer (AXFR) Exposure

Check if nameservers permit unauthorized zone transfers, potentially exposing the entire DNS zone.  
**Technique:** Attempt AXFR query against each NS record with a short timeout.  
**Data used:** NS records from DNS analysis.  
**Impact:** Critical – full zone exposure, though rarely found.  
**Status:** Planned (optional feature).

---

### CORS Misconfiguration Detection

Detect overly permissive Cross-Origin Resource Sharing policies that could be exploited.  
**Technique:** Send requests with a custom `Origin` header; verify if the response reflects the origin or returns `*`.  
**Data used:** HTTP response headers.  
**Impact:** Moderate – frequently sought after, though exploitability depends on context.  
**Status:** Planned.