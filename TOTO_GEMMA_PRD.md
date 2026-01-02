# Toto Gemma: Product Requirements Document (PRD)

> **Version**: 1.0
> **Date**: January 2, 2026
> **Sprint Duration**: 24-48 hours
> **Team Size**: 2-3 developers

---

## Executive Summary

**Toto Gemma** is a mobile application enabling Community Health Workers (CHWs) in Kenya to screen children under 5 years for health, development, and nutrition risks. The app produces color-coded risk classifications (Green/Yellow/Orange/Red) and generates plain-language coaching tips for caregivers.

### North Star Metric
> *If a CHW can classify risk and share respectful, actionable tips with a caregiver in under 5 minutes, we've built the right thing.*

---

## Table of Contents
1. [Project Configuration](#project-configuration)
2. [Human-Centered Design Insights](#human-centered-design-insights)
3. [Technical Architecture](#technical-architecture)
4. [Feature Specifications](#feature-specifications)
5. [Screen-by-Screen Specifications](#screen-by-screen-specifications)
6. [Data Models](#data-models)
7. [Risk Classification Algorithm](#risk-classification-algorithm)
8. [Stretch Features Implementation](#stretch-features-implementation)
9. [Development Sprint Plan](#development-sprint-plan)
10. [Judging Criteria Alignment](#judging-criteria-alignment)

---

## Project Configuration

### Technology Stack
| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Framework** | React Native + Expo | Fast development, cross-platform, hot reload |
| **UI Library** | React Native Paper (Material Design 3) | Pre-built components, accessibility, familiar to Android users |
| **State Management** | Zustand | Lightweight, simple, no boilerplate |
| **Local Database** | SQLite (expo-sqlite) | Offline-first, reliable, small footprint |
| **Navigation** | React Navigation v6 | Standard, well-documented |
| **Forms** | React Hook Form | Performance, validation, minimal re-renders |
| **Internationalization** | i18next + react-i18next | Swahili/English support |

### Development Environment
```bash
# Initialize project
npx create-expo-app toto-gemma --template expo-template-blank-typescript
cd toto-gemma

# Install core dependencies
npx expo install expo-sqlite react-native-paper @react-navigation/native @react-navigation/native-stack zustand react-hook-form i18next react-i18next expo-sms expo-linking
```

### Target Device Specifications
| Spec | Requirement |
|------|-------------|
| Android Version | 8.1+ (API 27+) |
| RAM | 1-2 GB minimum |
| App Size | ≤ 25 MB |
| Cold Start | < 2 seconds |
| Screen Size | 4.5" - 10" (phones and tablets) |

---

## Human-Centered Design Insights

> *Derived from analysis of 91 community photos, stakeholder interviews, and field observation data*

### Primary User: Community Health Worker (CHW)

**Demographics & Context:**
- Age range: 20-50 years
- Literacy: Can read and write (required for role)
- Digital literacy: Basic smartphone experience, may struggle with complex interfaces
- Work environment: Outdoor, often under trees or in tents
- Typical interaction: One-on-one with mother/caregiver + child

**Key Pain Points Identified:**
1. No standardized digital screening tool currently exists
2. Paper forms are slow and error-prone
3. Complex branching logic in forms causes confusion
4. Difficult to track defaulters and follow-ups
5. Data fragmented across multiple paper registers

**What CHWs Need:**
- Speed: Complete screening in <5 minutes
- Simplicity: Minimal taps, clear options
- Offline: Works without internet connection
- Guidance: Tell them what to say to caregivers
- Credibility: Professional tool that builds trust

### Secondary User: Caregiver (Mother/Guardian)

**Context:**
- Predominantly mothers and female caregivers
- May have limited literacy
- Holds infant during consultation
- Receives verbal guidance from CHW
- May have basic phone (not smartphone)

**What Caregivers Need:**
- Clear, respectful communication
- Actionable next steps
- SMS reminder if referral needed
- Understanding without medical jargon

### Environment Constraints (From Photo Analysis)

| Factor | Finding | Design Implication |
|--------|---------|-------------------|
| **Lighting** | Bright outdoor sunlight, dappled shade | High contrast UI, avoid pastels |
| **Seating** | Ground-level, no tables | One-handed operation essential |
| **Noise** | Outdoor ambient noise, children | Voice input not reliable |
| **Dust/Heat** | Sandy environment, hot climate | Robust touch targets, no precision gestures |
| **Connectivity** | Rural, intermittent 4G | Offline-first mandatory |

### Visual Design Direction

**Color Palette (From Cultural Context):**
```
Primary Blue:    #1565C0 (Royal blue - common in CHW vests)
Secondary Pink:  #E91E63 (Magenta - popular in local dress)
Success Green:   #4CAF50 (MUAC Green)
Warning Yellow:  #FFC107 (MUAC Yellow)
Danger Orange:   #FF9800 (Urgent referral)
Critical Red:    #F44336 (MUAC Red/Emergency)
Background:      #FAFAFA (Light, reduces glare)
Text Primary:    #212121 (High contrast)
```

**Typography:**
- Font: Roboto (Material default, readable)
- Minimum body text: 16sp
- Headers: 20-24sp
- Touch targets: minimum 48x48dp

**Design Principles:**
1. Bold, saturated colors (not pastels)
2. Large touch targets (44px minimum)
3. High contrast text (WCAG AA minimum)
4. One-handed operation support
5. Minimal text input (selection-based)
6. Progress visibility at all times

---

## Technical Architecture

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     TOTO GEMMA APP                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 PRESENTATION LAYER                   │   │
│  │  React Native + React Native Paper (Material 3)     │   │
│  │  ├── Screens (Home, Register, Screening, Results)   │   │
│  │  ├── Components (QuestionCard, RiskBadge, etc.)     │   │
│  │  └── Navigation (Stack Navigator)                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  BUSINESS LOGIC                      │   │
│  │  ├── Risk Calculator (category-based rollup)        │   │
│  │  ├── Question Engine (age-filtered questions)       │   │
│  │  ├── Guidance Generator (parent-friendly tips)      │   │
│  │  └── i18n Service (English/Swahili)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    DATA LAYER                        │   │
│  │  ├── Zustand Store (app state)                      │   │
│  │  ├── SQLite Database (offline persistence)          │   │
│  │  └── AsyncStorage (settings, language pref)         │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                   EXTERNAL INTEGRATIONS                     │
│  ├── expo-sms (SMS sharing)                                │
│  ├── expo-linking (WhatsApp deep link)                     │
│  └── [Future] Backend sync API                             │
└─────────────────────────────────────────────────────────────┘
```

### File Structure
```
toto-gemma/
├── App.tsx                      # Entry point
├── app.json                     # Expo config
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ChildSearchScreen.tsx
│   │   ├── RegisterChildScreen.tsx
│   │   ├── ScreeningScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   ├── GuidanceScreen.tsx
│   │   └── SupervisorDashboard.tsx
│   ├── components/
│   │   ├── QuestionCard.tsx
│   │   ├── AnswerOption.tsx
│   │   ├── RiskBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── CategoryTabs.tsx
│   │   └── LanguageToggle.tsx
│   ├── data/
│   │   ├── questions.ts         # All 45 questions
│   │   ├── guidance.ts          # Parent-friendly guidance
│   │   └── translations/
│   │       ├── en.json
│   │       └── sw.json          # Swahili
│   ├── store/
│   │   ├── useAppStore.ts       # Zustand store
│   │   └── useScreeningStore.ts
│   ├── services/
│   │   ├── database.ts          # SQLite operations
│   │   ├── riskCalculator.ts    # Risk algorithm
│   │   └── smsService.ts        # SMS/WhatsApp
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── theme/
│   │   └── theme.ts             # Material 3 theme
│   └── types/
│       └── index.ts             # TypeScript types
└── assets/
    └── icon.png
```

---

## Feature Specifications

### Core Features (MUST HAVE)

#### F1: Child Registration
**Priority**: P0 (Critical)
**Estimated Effort**: 2-3 hours

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Child Name | Text | Yes | Min 2 characters |
| Date of Birth OR Age | Date/Number | Yes | Calculates age group |
| Sex | Radio (M/F) | Yes | - |
| Village | Dropdown | Yes | Pre-populated list |
| Caregiver Phone | Phone | No | Kenya format (+254) |
| Caregiver Name | Text | No | - |

**Age Group Calculation:**
```typescript
function getAgeGroup(dateOfBirth: Date): AgeGroup {
  const ageInMonths = calculateAgeInMonths(dateOfBirth);
  if (ageInMonths < 6) return '0-6 months';
  if (ageInMonths < 24) return '6-24 months';
  return '2-5 years';
}
```

#### F2: Screening Questionnaire
**Priority**: P0 (Critical)
**Estimated Effort**: 4-6 hours

**Question Structure:**
- 45 total questions (15 per age group)
- 3 categories per age group: Health (5), Development (5), Nutrition (5)
- Each question has 4 answer options (Green/Yellow/Orange/Red)
- Questions displayed one at a time with clear progress

**Question Data Model:**
```typescript
interface Question {
  id: string;
  ageGroup: '0-6m' | '6-24m' | '2-5y';
  category: 'health' | 'development' | 'nutrition';
  questionText: string;
  questionTextSw: string; // Swahili
  answers: {
    green: { text: string; textSw: string };
    yellow: { text: string; textSw: string };
    orange: { text: string; textSw: string };
    red: { text: string; textSw: string };
  };
  chewGuidance: string;
  parentGuidance: string;
  parentGuidanceSw: string;
  preventiveReminder: string;
  whenToRefer: string;
}
```

#### F3: Risk Classification
**Priority**: P0 (Critical)
**Estimated Effort**: 2-3 hours

**Algorithm: Category-Based Rollup**

```typescript
function calculateRisk(answers: Answer[]): RiskResult {
  // Group answers by category
  const categories = {
    health: answers.filter(a => a.category === 'health'),
    development: answers.filter(a => a.category === 'development'),
    nutrition: answers.filter(a => a.category === 'nutrition')
  };

  // Calculate category-level risk (worst answer in category)
  const categoryRisks = {
    health: getWorstRisk(categories.health),
    development: getWorstRisk(categories.development),
    nutrition: getWorstRisk(categories.nutrition)
  };

  // Overall risk = worst category risk
  const overallRisk = getWorstRisk(Object.values(categoryRisks));

  // Immediate red flags override everything
  const hasRedFlag = answers.some(a => a.risk === 'red');
  if (hasRedFlag) return { overall: 'red', categories: categoryRisks, flags: getRedFlags(answers) };

  return { overall: overallRisk, categories: categoryRisks };
}

function getWorstRisk(risks: RiskLevel[]): RiskLevel {
  if (risks.includes('red')) return 'red';
  if (risks.includes('orange')) return 'orange';
  if (risks.includes('yellow')) return 'yellow';
  return 'green';
}
```

#### F4: Caregiver Guidance Display
**Priority**: P0 (Critical)
**Estimated Effort**: 2-3 hours

**Guidance Content:**
- Plain language (6th grade reading level)
- Actionable next steps
- Category-specific recommendations
- Referral information if Orange/Red
- Prevention reminders for Yellow/Green

**Display Format:**
```
┌─────────────────────────────────────┐
│  📋 GUIDANCE FOR CAREGIVER          │
│                                     │
│  [Category Icon] DEVELOPMENT        │
│  ─────────────────────────────────  │
│  "Give your child safe space to     │
│   practice walking. Hold hands and  │
│   encourage short steps."           │
│                                     │
│  [Category Icon] NUTRITION          │
│  ─────────────────────────────────  │
│  "Continue breastfeeding and offer  │
│   soft mashed foods 3 times daily." │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 📅 NEXT STEPS                 │  │
│  │ • Follow up in 2 weeks        │  │
│  │ • Bring to growth monitoring  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Stretch Features

#### S1: Offline-First with Sync Indicator
**Priority**: P1 (High)
**Estimated Effort**: 3-4 hours

**Implementation:**
```typescript
// All data stored in SQLite
const db = await SQLite.openDatabaseAsync('toto_gemma.db');

// Create tables on first load
await db.execAsync(`
  CREATE TABLE IF NOT EXISTS children (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    date_of_birth TEXT,
    village TEXT,
    caregiver_phone TEXT,
    created_at TEXT,
    synced INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS screenings (
    id TEXT PRIMARY KEY,
    child_id TEXT,
    answers TEXT,
    risk_result TEXT,
    created_at TEXT,
    synced INTEGER DEFAULT 0,
    FOREIGN KEY (child_id) REFERENCES children(id)
  );
`);

// Sync indicator on home screen
const pendingCount = await db.getFirstAsync(
  'SELECT COUNT(*) as count FROM screenings WHERE synced = 0'
);
```

#### S2: Swahili Language Support
**Priority**: P1 (High)
**Estimated Effort**: 2-3 hours

**i18n Setup:**
```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './data/translations/en.json';
import sw from './data/translations/sw.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, sw: { translation: sw } },
  lng: 'en',
  fallbackLng: 'en',
});

// Language toggle component
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  return (
    <SegmentedButtons
      value={i18n.language}
      onValueChange={(lang) => i18n.changeLanguage(lang)}
      buttons={[
        { value: 'en', label: 'English' },
        { value: 'sw', label: 'Kiswahili' },
      ]}
    />
  );
};
```

**Key Translations Needed:**
- All 45 questions
- All answer options (180 total)
- All guidance text
- UI labels and buttons
- Error messages

#### S3: SMS/WhatsApp Sharing
**Priority**: P2 (Medium)
**Estimated Effort**: 1-2 hours

**SMS Implementation:**
```typescript
import * as SMS from 'expo-sms';
import * as Linking from 'expo-linking';

async function shareGuidance(phone: string, message: string, method: 'sms' | 'whatsapp') {
  if (method === 'sms') {
    const { result } = await SMS.sendSMSAsync([phone], message);
    return result === 'sent';
  } else {
    // WhatsApp deep link
    const whatsappUrl = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    await Linking.openURL(whatsappUrl);
  }
}

// Message template
function generateMessage(childName: string, risk: RiskLevel, guidance: string[]): string {
  return `
TOTO GEMMA - Child Health Screening Result

Child: ${childName}
Risk Level: ${risk.toUpperCase()}

Key Recommendations:
${guidance.map((g, i) => `${i + 1}. ${g}`).join('\n')}

Contact your Community Health Worker for questions.
  `.trim();
}
```

#### S4: Supervisor Dashboard
**Priority**: P2 (Medium)
**Estimated Effort**: 3-4 hours

**Dashboard Metrics:**
```typescript
interface DashboardStats {
  totalScreenings: number;
  screeningsToday: number;
  riskDistribution: {
    green: number;
    yellow: number;
    orange: number;
    red: number;
  };
  pendingReferrals: number;
  pendingSync: number;
}

// SQL query for stats
const stats = await db.getFirstAsync(`
  SELECT
    COUNT(*) as total,
    SUM(CASE WHEN date(created_at) = date('now') THEN 1 ELSE 0 END) as today,
    SUM(CASE WHEN json_extract(risk_result, '$.overall') = 'green' THEN 1 ELSE 0 END) as green,
    SUM(CASE WHEN json_extract(risk_result, '$.overall') = 'yellow' THEN 1 ELSE 0 END) as yellow,
    SUM(CASE WHEN json_extract(risk_result, '$.overall') = 'orange' THEN 1 ELSE 0 END) as orange,
    SUM(CASE WHEN json_extract(risk_result, '$.overall') = 'red' THEN 1 ELSE 0 END) as red,
    SUM(CASE WHEN synced = 0 THEN 1 ELSE 0 END) as pending_sync
  FROM screenings
`);
```

**Dashboard Layout:**
```
┌─────────────────────────────────────┐
│  👤 SUPERVISOR DASHBOARD            │
│                                     │
│  ┌───────────┐  ┌───────────┐      │
│  │    47     │  │    12     │      │
│  │  Total    │  │  Today    │      │
│  └───────────┘  └───────────┘      │
│                                     │
│  RISK DISTRIBUTION                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  🟢 Green:  32 (68%)               │
│  🟡 Yellow: 10 (21%)               │
│  🟠 Orange:  4 (9%)                │
│  🔴 Red:     1 (2%)                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ⚠️ 5 Pending Referrals      │   │
│  │    View Details →           │   │
│  └─────────────────────────────┘   │
│                                     │
│  Pending Sync: 3 screenings        │
└─────────────────────────────────────┘
```

---

## Screen-by-Screen Specifications

### Screen 1: Home Screen
**Route**: `/`

```
┌─────────────────────────────────────┐
│  ☰                     🌐 EN | SW   │
│                                     │
│         🏥 TOTO GEMMA              │
│    Under-5 Health Screening         │
│                                     │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   │    ➕ NEW SCREENING         │   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────┐ ┌─────────────┐   │
│   │ 📋 History  │ │ 📊 Dashboard│   │
│   └─────────────┘ └─────────────┘   │
│                                     │
│   ───────────────────────────────   │
│   ✅ Offline Ready                  │
│   Last sync: Today 8:30 AM          │
│   Pending: 3 screenings             │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- "New Screening" → Navigate to Child Search
- "History" → Navigate to Screening History list
- "Dashboard" → Navigate to Supervisor Dashboard (if role=supervisor)
- Language toggle persists across sessions

### Screen 2: Child Search/Select
**Route**: `/child-search`

```
┌─────────────────────────────────────┐
│  ← Back                             │
│                                     │
│   🔍 Search by name...              │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   RECENT CHILDREN                   │
│   ┌─────────────────────────────┐   │
│   │ 👶 Amina Hassan             │   │
│   │    8 months • Kaloleni      │   │
│   │    Last screened: Dec 15    │   │
│   └─────────────────────────────┘   │
│   ┌─────────────────────────────┐   │
│   │ 👶 John Mwangi              │   │
│   │    2 years • Rabai          │   │
│   │    Last screened: Dec 10    │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  ➕ ADD NEW CHILD           │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- Search filters list by name
- Tap child → Start screening for that child
- "Add New Child" → Navigate to Registration

### Screen 3: Child Registration
**Route**: `/register-child`

```
┌─────────────────────────────────────┐
│  ← Back                             │
│                                     │
│   👶 REGISTER NEW CHILD             │
│                                     │
│   Child's Name *                    │
│   ┌─────────────────────────────┐   │
│   │                             │   │
│   └─────────────────────────────┘   │
│                                     │
│   Date of Birth *                   │
│   ┌─────────────────────────────┐   │
│   │ 📅 Select date...           │   │
│   └─────────────────────────────┘   │
│   Calculated: 8 months old          │
│   Age group: 6-24 months            │
│                                     │
│   Sex *                             │
│   ○ Male    ○ Female                │
│                                     │
│   Village *                         │
│   ┌─────────────────────────────┐   │
│   │ Select village...         ▼ │   │
│   └─────────────────────────────┘   │
│                                     │
│   Caregiver Phone (optional)        │
│   ┌─────────────────────────────┐   │
│   │ +254                        │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │       START SCREENING →     │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Screen 4: Screening Questions
**Route**: `/screening/:childId`

```
┌─────────────────────────────────────┐
│  ✕ Exit                  Save Draft │
│                                     │
│  Amina, 8 months                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━ 40%     │
│                                     │
│  [HEALTH] [DEVELOPMENT] [NUTRITION] │
│     ●          ○            ○       │
│                                     │
│  Question 3 of 5                    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Is the child having         │   │
│  │ diarrhea? How many times    │   │
│  │ per day? Any blood or       │   │
│  │ signs of dehydration?       │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🟢 Normal stool, drinks/    │   │
│  │    feeds well, active       │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🟡 3-4 loose stools/day     │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🟠 Many watery stools,      │   │
│  │    thirst, dry mouth        │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🔴 Blood in stool, sunken   │   │
│  │    eyes, very sleepy        │   │
│  └─────────────────────────────┘   │
│                                     │
│   [← BACK]            [NEXT →]      │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- Tap answer → Highlight selection
- "Next" → Advance to next question
- "Back" → Return to previous question
- Category tabs → Jump to category (maintain answers)
- Red answer → Show immediate warning banner
- Exit → Confirm dialog, save draft option

### Screen 5: Results
**Route**: `/results/:screeningId`

```
┌─────────────────────────────────────┐
│                          ✕ Close    │
│                                     │
│        SCREENING COMPLETE           │
│                                     │
│  Amina, 8 months                    │
│  January 2, 2026 • 10:45 AM         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │        🟡 YELLOW            │   │
│  │       MODERATE RISK         │   │
│  │                             │   │
│  │   Follow-up in 2 weeks      │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  CATEGORY BREAKDOWN                 │
│  ├─ 🫀 Health:      🟢 Green        │
│  ├─ 🧒 Development: 🟡 Yellow       │
│  └─ 🍎 Nutrition:   🟢 Green        │
│                                     │
│  AREAS NEEDING ATTENTION            │
│  • Limited vocabulary for age       │
│  • Not walking independently yet    │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   VIEW CAREGIVER GUIDANCE   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      🏠 RETURN HOME         │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Screen 6: Caregiver Guidance
**Route**: `/guidance/:screeningId`

```
┌─────────────────────────────────────┐
│  ← Back                             │
│                                     │
│  💬 GUIDANCE FOR CAREGIVER          │
│                                     │
│  Share these tips with the parent:  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🧒 DEVELOPMENT               │   │
│  │                             │   │
│  │ "Talk, sing, and read       │   │
│  │  simple picture books daily.│   │
│  │  Use short, clear phrases." │   │
│  │                             │   │
│  │ "Give your child safe space │   │
│  │  to cruise and practice     │   │
│  │  walking. Hold hands and    │   │
│  │  encourage short steps."    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📅 FOLLOW-UP                 │   │
│  │                             │   │
│  │ • Schedule visit in 2 weeks │   │
│  │ • Bring to growth monitor   │   │
│  └─────────────────────────────┘   │
│                                     │
│  SHARE WITH CAREGIVER               │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ 📱 SMS      │ │ 💬 WhatsApp │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       ✅ COMPLETE           │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Data Models

### TypeScript Types

```typescript
// src/types/index.ts

export type AgeGroup = '0-6m' | '6-24m' | '2-5y';
export type Category = 'health' | 'development' | 'nutrition';
export type RiskLevel = 'green' | 'yellow' | 'orange' | 'red';
export type Sex = 'male' | 'female';

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string; // ISO date
  sex: Sex;
  village: string;
  caregiverPhone?: string;
  caregiverName?: string;
  createdAt: string;
  synced: boolean;
}

export interface Question {
  id: string;
  ageGroup: AgeGroup;
  category: Category;
  orderIndex: number;
  text: {
    en: string;
    sw: string;
  };
  answers: {
    green: { en: string; sw: string };
    yellow: { en: string; sw: string };
    orange: { en: string; sw: string };
    red: { en: string; sw: string };
  };
  guidance: {
    chw: string;
    parent: { en: string; sw: string };
    prevention: { en: string; sw: string };
    whenToRefer: { en: string; sw: string };
  };
}

export interface Answer {
  questionId: string;
  category: Category;
  selectedRisk: RiskLevel;
}

export interface RiskResult {
  overall: RiskLevel;
  categories: {
    health: RiskLevel;
    development: RiskLevel;
    nutrition: RiskLevel;
  };
  redFlags: string[]; // Question IDs with red answers
  areasOfConcern: string[]; // Questions with yellow/orange
}

export interface Screening {
  id: string;
  childId: string;
  answers: Answer[];
  riskResult: RiskResult;
  createdAt: string;
  synced: boolean;
}

export interface DashboardStats {
  totalScreenings: number;
  screeningsToday: number;
  riskDistribution: Record<RiskLevel, number>;
  pendingReferrals: number;
  pendingSync: number;
  recentScreenings: Screening[];
}
```

---

## Risk Classification Algorithm

### Category-Based Rollup (Detailed)

```typescript
// src/services/riskCalculator.ts

export function calculateRiskResult(answers: Answer[]): RiskResult {
  // Step 1: Group by category
  const byCategory = {
    health: answers.filter(a => a.category === 'health'),
    development: answers.filter(a => a.category === 'development'),
    nutrition: answers.filter(a => a.category === 'nutrition'),
  };

  // Step 2: Get worst risk per category
  const categoryRisks = {
    health: getWorstRisk(byCategory.health.map(a => a.selectedRisk)),
    development: getWorstRisk(byCategory.development.map(a => a.selectedRisk)),
    nutrition: getWorstRisk(byCategory.nutrition.map(a => a.selectedRisk)),
  };

  // Step 3: Overall = worst category
  const overall = getWorstRisk(Object.values(categoryRisks));

  // Step 4: Identify flags and concerns
  const redFlags = answers
    .filter(a => a.selectedRisk === 'red')
    .map(a => a.questionId);

  const areasOfConcern = answers
    .filter(a => ['yellow', 'orange'].includes(a.selectedRisk))
    .map(a => a.questionId);

  return {
    overall,
    categories: categoryRisks,
    redFlags,
    areasOfConcern,
  };
}

function getWorstRisk(risks: RiskLevel[]): RiskLevel {
  const priority: RiskLevel[] = ['red', 'orange', 'yellow', 'green'];
  for (const level of priority) {
    if (risks.includes(level)) return level;
  }
  return 'green';
}
```

### Risk Level Definitions

| Level | Color | Meaning | Action |
|-------|-------|---------|--------|
| **Green** | 🟢 | Normal/Low Risk | Positive reinforcement, continue routine care |
| **Yellow** | 🟡 | Monitor/Moderate | Coaching needed, follow-up in 2 weeks |
| **Orange** | 🟠 | Urgent/High Risk | Refer to health facility within 24-48 hours |
| **Red** | 🔴 | Emergency/Critical | Immediate referral to health facility |

---

## Development Sprint Plan

### 24-Hour Sprint (Aggressive)

| Hour | Developer 1 | Developer 2 | Developer 3 |
|------|-------------|-------------|-------------|
| 0-2 | Project setup, dependencies | Question data entry (Q1-15) | Question data entry (Q16-30) |
| 2-4 | Navigation + Home screen | Question data entry (Q31-45) | Database schema + service |
| 4-6 | Child registration screen | QuestionCard component | Risk calculator service |
| 6-8 | Child search screen | Screening screen logic | Results screen |
| 8-10 | **BREAK/TEST** | **BREAK/TEST** | **BREAK/TEST** |
| 10-12 | Guidance screen | Progress bar + category tabs | SMS/WhatsApp sharing |
| 12-14 | Swahili translations (UI) | Swahili translations (questions) | Supervisor dashboard |
| 14-16 | Offline indicator + sync UI | Answer persistence | Dashboard stats queries |
| 16-18 | End-to-end testing | Bug fixes | Bug fixes |
| 18-20 | Polish UI | Polish UI | Build APK |
| 20-24 | Demo preparation | Demo preparation | Demo preparation |

### 48-Hour Sprint (Recommended)

**Day 1:**
- Hours 0-8: Core setup, screens, question data
- Hours 8-16: Screening flow, risk calculation, results
- Hours 16-24: Guidance display, basic persistence

**Day 2:**
- Hours 0-8: Swahili translations, offline features
- Hours 8-16: SMS/WhatsApp, supervisor dashboard
- Hours 16-24: Testing, bug fixes, polish, demo prep

---

## Judging Criteria Alignment

### Technical Execution (25%) - HIGHEST PRIORITY

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Multiple complex features | 45 questions, risk algorithm, 4 stretch features | Feature specs above |
| Novel libraries | expo-sqlite, i18next, React Native Paper | Tech stack |
| Reliable core features | Offline-first, persistent state, error handling | Architecture diagram |

### Human-Centered Design (15%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Deep empathy | Insights from 91 community photos | Design insights section |
| Cultural sensitivity | Swahili support, local color palette | Visual design direction |
| Realistic field workflows | <5 min completion, one-handed operation | Screen specs |

### Technical Feasibility & Frugality (15%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Lightweight | <25 MB APK, minimal dependencies | Tech stack choices |
| Offline-first | SQLite, sync indicator | Architecture |
| Battery efficient | No background services, local processing | No server dependency |

### Innovation & Creativity (15%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Novel approach | Category-based rollup, visual risk progression | Risk algorithm |
| Fresh solution | Integrated CHW+caregiver experience | User flows |
| Paradigm shift | From paper to guided digital workflow | Problem statement alignment |

### Design (UI/UX) (10%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Intuitive | Large buttons, progress indicators, color coding | Screen wireframes |
| Visually appealing | Material Design 3, culturally relevant colors | Theme specification |
| Consumer-ready | Professional polish, consistent patterns | Component library |

### Usability & Speed (10%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Complete in <5 min | 15 questions, minimal taps | User flow timeline |
| Minimal friction | Selection-based input, smart defaults | Form specifications |
| Fast performance | <2 sec cold start, local processing | Technical architecture |

### Presentation (10%)

| Requirement | Implementation | Evidence |
|-------------|----------------|----------|
| Clear problem | Video clips from interviews | Pitch plan |
| Solution explained | Live demo walkthrough | Demo script |
| Impact articulated | Statistics from surveillance data | Historical impact section |

---

## Appendix: Quick Reference

### Key Commands

```bash
# Start development
npx expo start

# Build Android APK
eas build -p android --profile preview

# Run on device
npx expo start --tunnel
```

### Critical File Locations

| Purpose | Path |
|---------|------|
| Questions data | `src/data/questions.ts` |
| Risk calculator | `src/services/riskCalculator.ts` |
| Database | `src/services/database.ts` |
| English translations | `src/data/translations/en.json` |
| Swahili translations | `src/data/translations/sw.json` |
| Theme/colors | `src/theme/theme.ts` |

### Demo Checklist

- [ ] App opens in <2 seconds
- [ ] Language toggle works (EN ↔ SW)
- [ ] Can register new child
- [ ] Can complete 15-question screening
- [ ] Risk classification displays correctly
- [ ] Guidance shows relevant recommendations
- [ ] SMS sharing works
- [ ] Dashboard shows aggregate stats
- [ ] Offline indicator visible
- [ ] No crashes during demo flow

---

*Document generated for AKU Innovation Challenge - Toto Gemma*
*Sprint: 24-48 hours | Team: 2-3 developers | Stack: React Native + Expo*
