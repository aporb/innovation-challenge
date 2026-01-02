# Toto Gemma: Child Health Screening Mobile App

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.30-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-~16.0.10-blue.svg)](https://www.sqlite.org/)

> **Toto Gemma** (Swahili for "Child Health") is a mobile application empowering Community Health Workers (CHWs) in Kenya to screen children under 5 years for health, development, and nutrition risks. The app produces color-coded risk classifications and generates plain-language coaching tips for caregivers.

## 🎯 North Star Metric

*If a CHW can classify risk and share respectful, actionable tips with a caregiver in under 5 minutes, we've built the right thing.*

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Risk Classification System](#-risk-classification-system)
- [Research & Documentation](#-research--documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🚨 Problem Statement

Community Health Workers in Kenya face significant challenges:

- **No standardized digital screening tool** exists for child health assessment
- **Paper-based systems** are slow, error-prone, and difficult to track
- **Fragmented data** across multiple registers makes follow-up challenging
- **Limited resources** in rural areas with intermittent connectivity
- **Time constraints** - screenings should complete in under 5 minutes

The app addresses these challenges while supporting Kenya's Ministry of Health initiatives for improved child health outcomes.

## 💡 Solution Overview

Toto Gemma is a comprehensive mobile health solution that:

- **Screens children** across 3 categories: Health, Development, and Nutrition
- **Works offline-first** with local SQLite database and opportunistic sync
- **Supports dual languages** (English/Swahili) for accessibility
- **Provides risk classification** with color-coded results (Green/Yellow/Orange/Red)
- **Generates caregiver guidance** in plain, actionable language
- **Enables SMS/WhatsApp sharing** for follow-up communication
- **Includes supervisor dashboard** for program monitoring

### Target Users

| User | Role | Needs |
|------|------|-------|
| **Community Health Workers (CHWs)** | Frontline health workers | Fast, reliable screening tool that works offline |
| **Caregivers** | Parents/guardians | Clear, respectful guidance they can understand and act on |
| **Supervisors** | CHU coordinators | Data insights and program oversight |

## ✨ Key Features

### Core Functionality
- ✅ **Child Registration** - DOB/age input, village selection, caregiver contact
- ✅ **45-Question Screening** - Age-appropriate questions across 3 categories
- ✅ **Risk Classification** - Color-coded results with category breakdown
- ✅ **Caregiver Guidance** - Plain-language tips and next steps
- ✅ **Offline-First** - Full functionality without internet connection
- ✅ **Multi-Language** - English and Swahili support

### Advanced Features
- 📱 **SMS/WhatsApp Sharing** - Send guidance to caregivers
- 📊 **Supervisor Dashboard** - Program monitoring and analytics
- 🔄 **Data Synchronization** - Automatic sync when connected
- 💾 **Auto-Save Drafts** - Resume incomplete screenings
- 🎯 **Red Flag Alerts** - Immediate warnings for critical issues

### Technical Features
- 📱 **Cross-Platform** - Android (primary) with iOS support
- 🔒 **Data Security** - Encrypted local storage
- ⚡ **Performance Optimized** - <2s cold start, <25MB app size
- 🔋 **Battery Efficient** - Minimal resource usage
- 📶 **Low Connectivity** - Works on 2G networks

## 🛠 Technology Stack

### Frontend
- **Framework**: React Native 0.81.5
- **Platform**: Expo ~54.0.30
- **Language**: TypeScript ~5.9.2
- **UI Library**: React Native Paper (Material Design 3)
- **State Management**: Zustand ~5.0.9
- **Navigation**: React Navigation v7

### Backend & Data
- **Database**: SQLite (expo-sqlite) ~16.0.10
- **Forms**: React Hook Form ~7.69.0
- **Internationalization**: i18next ~25.7.3 + react-i18next ~16.5.1

### Development & Testing
- **Build Tool**: Expo CLI
- **Code Quality**: TypeScript strict mode
- **Testing**: Jest + React Native Testing Library (planned)

### Target Environment
- **Android**: API 27+ (Android 8.1+)
- **RAM**: 1-2 GB minimum
- **Storage**: <25 MB app size
- **Connectivity**: Offline-first with sync

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or later
- **npm/yarn/pnpm**: Latest stable version
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio**: For Android development (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aporb/innovation-challenge.git
   cd innovation-challenge
   ```

2. **Navigate to the mobile app**
   ```bash
   cd toto-gemma
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/emulator**
   ```bash
   # Android
   npm run android

   # iOS (macOS only)
   npm run ios

   # Web (for testing)
   npm run web
   ```

### Build for Production

```bash
# Build APK for Android
eas build -p android --profile preview

# Build for production
eas build -p android --profile production
```

## 📁 Project Structure

```
innovation-challenge/
├── README.md                    # This file
├── CLAUDE.md                    # AI assistant documentation
├── TOTO_GEMMA_PRD.md           # Product Requirements Document
├── TOTO_GEMMA_RESEARCH.md      # Research findings and insights
├── sources/                     # Research materials and data
│   ├── audio_recordings/        # Stakeholder interviews
│   ├── community_photos/        # Field research photos
│   ├── survey_assets/           # Survey forms and data
│   └── *.xlsx, *.docx, *.pdf    # Additional research documents
└── toto-gemma/                  # Mobile application
    ├── app.json                 # Expo configuration
    ├── App.tsx                  # Main app component
    ├── package.json             # Dependencies and scripts
    ├── tsconfig.json            # TypeScript configuration
    ├── assets/                  # App icons and images
    └── src/                     # Source code
        ├── components/           # Reusable UI components
        ├── data/                 # Static data and translations
        ├── navigation/           # App navigation configuration
        ├── screens/              # App screens/pages
        ├── services/             # Business logic and API services
        ├── store/                # State management
        ├── theme/                # App theming and styles
        └── types/                # TypeScript type definitions
```

### Key Files

| File | Purpose |
|------|---------|
| `toto-gemma/src/types/index.ts` | Core TypeScript interfaces and types |
| `toto-gemma/src/services/riskCalculator.ts` | Risk classification algorithm |
| `toto-gemma/src/services/database.ts` | SQLite database operations |
| `toto-gemma/src/data/questions.ts` | Screening questions and guidance |
| `toto-gemma/src/theme/theme.ts` | Material Design 3 theme configuration |

## 🎯 Risk Classification System

### Overview
The app evaluates children across three categories with 15 age-appropriate questions each:

- **Health** (5 questions): Fever, respiratory, diarrhea, rash, cord/eye infections
- **Development** (5 questions): Social response, motor skills, hearing, hand use, alertness
- **Nutrition** (5 questions): Breastfeeding, vomiting, exclusive feeding, breast preference, weight gain

### Risk Levels

| Level | Color | Meaning | Action Required |
|-------|-------|---------|----------------|
| **Green** | 🟢 | Low Risk | Continue routine care, positive reinforcement |
| **Yellow** | 🟡 | Moderate Risk | Coaching needed, follow-up in 2 weeks |
| **Orange** | 🟠 | High Risk | Urgent referral recommended within 24-48 hours |
| **Red** | 🔴 | Critical Risk | Immediate referral to health facility |

### Algorithm
- **Category-based rollup**: Worst risk in each category determines category score
- **Overall risk**: Worst category score becomes overall risk
- **Red flags override**: Any Red answer triggers immediate Red classification

## 📚 Research & Documentation

### Key Research Findings

- **91 community photos** analyzed for environmental constraints
- **Stakeholder interviews** with MOH representatives and CHWs
- **Historical data** showing 81% reduction in child malnutrition through surveillance
- **Cultural insights** informing UI design and language choices

### Documentation Structure

| Document | Purpose |
|----------|---------|
| `TOTO_GEMMA_PRD.md` | Complete product requirements and specifications |
| `TOTO_GEMMA_RESEARCH.md` | Research findings, stakeholder insights, and data analysis |
| `sources/` | Raw research materials (interviews, photos, survey data) |

### Screening Protocol
- **45 official questions** developed with healthcare experts
- **WHO/UNICEF IMCI guidelines** compliance
- **East Africa MoH protocols** alignment
- **Cultural adaptation** for Kenyan context

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following the established patterns
4. **Test thoroughly** on Android devices
5. **Commit with conventional format**: `git commit -m "feat: add new feature"`
6. **Push and create PR**

### Code Standards

- **TypeScript**: Strict mode enabled, full type coverage required
- **React Native**: Follow Expo and React Native best practices
- **Accessibility**: WCAG 2.1 AA compliance for all UI components
- **Performance**: Optimize for low-resource Android devices
- **Internationalization**: All user-facing text must support English/Swahili

### Testing Requirements

- **Unit Tests**: Core business logic (risk calculation, data validation)
- **Integration Tests**: Database operations and state management
- **UI Tests**: Critical user flows and accessibility
- **Performance Tests**: App startup time and memory usage

### Commit Convention

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat: add SMS sharing functionality
- fix: resolve risk calculation bug
- docs: update caregiver guidance text
```

## 📄 License

This project is part of the AKU Innovation Challenge and is intended for educational and humanitarian purposes. Please refer to the challenge guidelines for licensing and usage terms.

## 🙏 Acknowledgments

- **Aga Khan University (AKU)** for organizing the Innovation Challenge
- **Kenya Ministry of Health (MOH)** for partnership and domain expertise
- **Community Health Workers** whose dedication inspired this solution
- **Research participants** who contributed insights and data
- **Healthcare experts** who developed the screening protocol

## 📞 Support

For questions about the project or technical implementation:

- **Technical Issues**: Check the [Issues](../../issues) section
- **Documentation**: Refer to `TOTO_GEMMA_PRD.md` for detailed specifications
- **Research**: Review `TOTO_GEMMA_RESEARCH.md` for background and insights

---

**Built with ❤️ for healthier communities in Kenya**

*AKU Innovation Challenge - Transforming child health through technology*
