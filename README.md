# TXDPS Procurement Intelligence System

A working procurement intelligence system, demonstrated against the Texas Department of Public Safety's 761 publicly-disclosed contracts. Built by [kjags advisors](https://www.kjagsadvisors.com) in response to RFI ITD202604210249 (Contract Management Cost Optimization Services).

**Live demo:** https://txdps-contract-portfolio.vercel.app

## What this is

A static dashboard that classifies the Department's full $2.99B contract portfolio, surfaces the 18-month renewal queue, and flags patterns warranting contract-manager review (same-vendor cohort splits, same-product cross-vendor duplicates, pre-2018 long-term leases). All from public source documents — no internal Department data.

## What this is not

- Not a list of recommendations to consolidate or eliminate contracts.
- Not a claim that master-reseller patterns (Carahsoft, NetSync, Presidio, SHI) are concentration to consolidate. They are valid procurement vehicles for distinct underlying products; the methodology filters them out of the patterns-for-review queue.
- Not a substitute for stakeholder context. The system surfaces; contract owners decide.

## Methodology

1. Pull the [TXDPS Contracts Exceeding $100K disclosure](https://www.dps.texas.gov/iod/doingbusiness/docs/contractsOver100K.pdf) (Texas Government Code §2054.126).
2. Extract structured contract records via PyMuPDF with amount-anchor parsing.
3. Classify each contract into 18 categories using AI-augmented keyword + pattern logic.
4. Surface patterns: same-vendor cohort splits, same-product cross-vendor duplicates, legacy long-term leases, full-portfolio renewal cliff.
5. Render as a single-page static dashboard with embedded data — no backend, no database.

## Repository layout

```
.
├── index.html                 # The dashboard (self-contained, embedded data)
├── assets/
│   ├── styles.css             # kjags brand stylesheet
│   └── logo.png               # kjags advisors logo
├── data/
│   ├── txdps_contracts.csv               # Clean 761-row contract extract
│   ├── txdps_contracts_enriched.csv      # + AI classification
│   ├── txdps_contracts_over_100k.pdf     # Source PDF (provenance)
│   └── dashboard_data.json               # Aggregated data embedded in dashboard
├── vercel.json                # Vercel config (security headers, caching)
└── README.md
```

## Source data

| Source | Use |
|---|---|
| [TXDPS §2054.126 disclosure](https://www.dps.texas.gov/iod/doingbusiness/docs/contractsOver100K.pdf) | Primary contract inventory |
| [Texas LBB Contracts Database](https://contracts.lbb.texas.gov/) | Contract metadata reference |
| [data.texas.gov](https://data.texas.gov/) (Socrata Open Data) | Adjacent datasets (DIR cooperative customers, expenditure rollups) |
| [Texas Comptroller Open Data](https://comptroller.texas.gov/transparency/open-data/) | Reference for vendor payment data (not yet integrated; future work) |

## What would change with internal Department data

- Actual spend per vendor (vs. contract ceilings shown here)
- Programmatic context per contract (why it was structured this way, what it supports)
- Performance and deliverable acceptance status
- DBITS classification per contract
- Renewal options and price escalator clauses

The dashboard methodology stays the same; the data quality improves.

## License

The dashboard, methodology, and source code in this repository are provided as a capability demonstration. No license restrictions on Department use of any artifact.

## Contact

[kjags advisors](https://www.kjagsadvisors.com) — keeranj@kjagsadvisors.com
