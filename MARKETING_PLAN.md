# InstaCal Marketing & Automation Plan

## Overview

Pre-launch and launch marketing system — channels, automation, and metrics.

---

## Marketing Funnel & Automation Flow

```mermaid
graph TB
    subgraph ACQ["Acquisition Channels"]
        INF["Influencer Outreach<br/>(fitness, nutrition, lifestyle)"]
        UGC["Paid Meal Loggers<br/>(meals w/ location tagging)"]
        CAR["Social Media Carousels<br/>(auto-generated)"]
        ORG["Organic Content<br/>(tips, recipes, transformations)"]
    end

    subgraph AUTO["Automation Layer"]
        direction TB
        A1["Carousel Generator<br/>— auto-create from templates"]
        A2["Outreach Sequences<br/>— DM/email cadence to influencers"]
        A3["UGC Tracking<br/>— track paid meal logs + locations"]
        A4["Content Scheduler<br/>— queue & post across platforms"]
    end

    subgraph CONV["Conversion Flow"]
        LP["Landing Page / App Store"]
        DL["App Download"]
        ON["Onboarding + First Meal Log"]
    end

    subgraph METRICS["Key Metrics & Data"]
        M1["Impressions & Reach"]
        M2["Click-through Rate"]
        M3["Cost per Install"]
        M4["Installs by Channel"]
        M5["Day 1 / Day 7 Retention"]
        M6["Meals Logged (first 48hrs)"]
        M7["UGC Posts & Locations Map"]
    end

    %% Channels → Automation
    INF --> A2
    UGC --> A3
    CAR --> A1
    ORG --> A4

    %% Automation → Conversion
    A1 --> LP
    A2 --> LP
    A3 --> LP
    A4 --> LP

    %% Conversion flow
    LP --> DL --> ON

    %% Conversion → Metrics
    ON --> M1
    ON --> M2
    ON --> M3
    ON --> M4
    ON --> M5
    ON --> M6
    ON --> M7

    %% Styling
    classDef channel fill:#4F46E5,stroke:#3730A3,color:#fff
    classDef auto fill:#F59E0B,stroke:#D97706,color:#fff
    classDef conv fill:#10B981,stroke:#059669,color:#fff
    classDef metric fill:#6366F1,stroke:#4F46E5,color:#fff

    class INF,UGC,CAR,ORG channel
    class A1,A2,A3,A4 auto
    class LP,DL,ON conv
    class M1,M2,M3,M4,M5,M6,M7 metric
```

---

## Channel Breakdown

### 1. Influencer Outreach

- Target micro-influencers (5k–50k) in fitness/nutrition
- Automated DM/email outreach sequences
- Provide free pro access + affiliate code
- Track installs per influencer

### 2. Paid Meal Loggers (UGC)

- Pay users to log meals with location tagging
- Creates real content + populates the social feed
- Builds location-based discovery data
- Target food-heavy areas (gyms, health cafes, college campuses)

### 3. Auto-Generated Carousels

- Template-based carousel creation from meal data, tips, stats
- Auto-post to Instagram, TikTok, Twitter/X
- A/B test formats and copy

### 4. Organic Content

- Nutrition tips, recipes, transformation stories
- SEO blog posts on the marketing site
- Community highlights from early users

---

## Metrics Dashboard (what we want to see)

| Metric                     | Source                  | Goal                   |
| -------------------------- | ----------------------- | ---------------------- |
| Impressions by channel     | Social APIs             | Track reach per dollar |
| Click-through rate         | UTM links               | >2% from social        |
| Cost per install           | Attribution             | <$2 target             |
| Installs by channel        | App Store + attribution | Know what's working    |
| Day 1 retention            | Analytics               | >60%                   |
| Day 7 retention            | Analytics               | >30%                   |
| Meals logged (first 48hrs) | App data                | >3 per user            |
| UGC posts created          | App data                | Build content flywheel |
| Location coverage map      | App data                | Geographic spread      |
