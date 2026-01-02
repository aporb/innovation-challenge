# Totto Gemma: Under‑5 Community Screening & Coaching

### The Problem

### [Video Prompt](https://drive.google.com/file/d/1uRJR-KwUf4LTUOFIAKb5uGq8ZrLt2hvE/view?usp=drive_link)

Community Health Workers (CHWs) in Kenya and similar contexts are often the first point of contact for families with young children. However, they currently have **no standardized digital tool** to screen children for health, development, or nutrition risks. Despite broad 4G coverage, these tools must still work reliably on **low-resource Android devices**, with minimal data and storage needs.

Teams may implement a representative subset of screening questions, as long as the full end-to-end flow (screening, risk classification, and caregiver guidance) is clearly demonstrated.

### The Goal

Build a mobile prototype that helps CHWs quickly **screen children under 5 years old** using [short, structured questions](https://docs.google.com/spreadsheets/d/1B8c8u76YRjPYhSD00Y9Qz3p5uMlIg4tX/edit?gid=1407025948#gid=1407025948) and produce a **risk classification** (Green, Yellow, Orange, Red). The tool should then generate plain-language coaching tips that CHWs can share with caregivers.

### Core Features

* 3 screening categories: **Health, Development, Nutrition & Feeding**
* **Risk scoring** system leading to a clear High/Medium/Low tier
* Clear next-step guidance when a child is classified as Green, Yellow, Orange or Red (for example, referral, follow-up, or coaching).

### Key Constraints

* Target device: Android 8.1+, 1–2 GB RAM
* App size: ≤25 MB; cold start under 2 seconds as a design goal rather than a strict benchmark, given variation in device hardware.
* Data: minimal (child name, age, village, phone number), stored securely using standard Android file-based encryption (FBE) No photos or sensitive personal data
* Expected rollout is 500+ Community Health Care Workers (CHCWs). Simultaneous active use is expected to be approximately 25–50 users in rural settings, primarily on Android tablets or phones.

Teams may simplify or abstract the provided AKU screening and guidance flows as needed, as long as the end outcome enables accurate risk classification and the ability to offer appropriate guidance to the caregiver.

### Judging Focus

* Accuracy and clarity of **risk classification**
* Simplicity and speed of use (goal: complete in under 5 minutes\*)
* Design empathy for CHWs and caregivers
* Feasibility and frugality (lightweight, low-cost implementation)
* Successful implementation of end-to-end screening, risk classification, and caregiver guidance, even if internal logic is simplified.

**North Star:** If a CHW can classify risk and share respectful, actionable tips with a caregiver in under 5 minutes, you’ve built the right thing.

\*Performance targets such as cold start time and completion under 3 minutes should be treated as design goals rather than strict benchmarks, given variation in device hardware.

## Evaluation & Stretch Ideas

## What to Submit

The prototype can be:

* The prototype must be an Android application optimized for mobile phones and tablets.
* A clickable design prototype (e.g., Figma, Glide, Bubble, etc.)
* Or any interactive proof-of-concept that demonstrates the core user flow

The key requirement is that the prototype should clearly show how your solution would work in practice.

### Stretch Ideas

Stretch features should not compromise the core constraints of simplicity, offline usability, and low resource consumption.

* Multilingual support (Swahili, English)
* Offline first
* SMS or WhatsApp integration for caregiver follow-up
* Supervisor dashboard for local reporting
* Lightweight analytics or progress tracking

### Final Note

These challenges are based on **real-world problems currently being explored in Kenya**. The teams behind Toto Gemma are working to make these tools practical and affordable, and your prototypes could help shape the next generation of solutions.

Stay human-centered, creative, and grounded in reality. Sometimes the simplest, most elegant design can have the greatest impact.