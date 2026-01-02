# Toto Gemma: Comprehensive Research & Solution Guide

> **Innovation Challenge**: Under-5 Community Screening & Coaching Tool for Kenya

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Problem Statement Analysis](#problem-statement-analysis)
3. [Official Screening Questions & Guidance](#official-screening-questions--guidance) ⭐ **NEW**
4. [Judging Criteria Breakdown](#judging-criteria-breakdown)
5. [Stakeholder Insights](#stakeholder-insights)
6. [Current MOH Data Collection Forms](#current-moh-data-collection-forms)
7. [Historical Impact Data](#historical-impact-data)
8. [Technical Requirements & Constraints](#technical-requirements--constraints)
9. [Key Design Considerations](#key-design-considerations)
10. [Recommended Solution Architecture](#recommended-solution-architecture)
11. [Risk Classification Logic](#risk-classification-logic)

---

## Executive Summary

**Toto Gemma** is a proposed mobile application to help Community Health Workers (CHWs) in Kenya screen children under 5 years old for health, development, and nutrition risks. The tool must:

- Run on low-resource Android devices (1-2GB RAM, Android 8.1+)
- Complete screenings in under 5 minutes (ideally 3 minutes)
- Work offline-first with minimal data usage
- Produce clear risk classifications (Green/Yellow/Orange/Red)
- Generate plain-language coaching tips for caregivers

**North Star**: *If a CHW can classify risk and share respectful, actionable tips with a caregiver in under 5 minutes, you've built the right thing.*

---

## Problem Statement Analysis

### The Core Problem

Community Health Workers in Kenya are often the **first point of contact** for families with young children. Despite broad 4G coverage, they currently have **no standardized digital tool** to screen children for health, development, or nutrition risks.

### Target Users

| User | Role | Needs |
|------|------|-------|
| **CHWs/CHVs** | Frontline health workers | Simple, fast screening tool that works offline |
| **Caregivers** | Parents/guardians of children | Clear, respectful guidance they can act on |
| **Supervisors** | CHU coordinators | Oversight and reporting capabilities |

### Three Screening Categories

1. **Health** - General health status, illness symptoms, immunization
2. **Development** - Developmental milestones appropriate for age
3. **Nutrition & Feeding** - MUAC measurements, feeding practices, malnutrition signs

### Risk Classification System

| Level | Color | Action Required |
|-------|-------|-----------------|
| Low Risk | 🟢 Green | Continue routine care, positive reinforcement |
| Moderate Risk | 🟡 Yellow | Follow-up visit, coaching on specific issues |
| High Risk | 🟠 Orange | Urgent referral recommended, close monitoring |
| Critical Risk | 🔴 Red | Immediate referral to health facility |

---

## Official Screening Questions & Guidance

> **Source**: WHO/UNICEF IMCI Guidelines, East Africa MoH Child Health Protocols, LMIC CHW Manuals
> **Version**: 2 (December 2025)
> **Compiled by**: Healthcare Professional Expert in Early Child Development (0–5 yrs)

This section contains the **official screening protocol** with exact questions, classification criteria, and guidance for each age group.

---

### Age Group: 0–6 Months

#### Health Questions (0–6 months)

##### 1. Fever Assessment
**Question**: *Does the infant have fever? For how long? Is the infant feeding normally?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No fever | Mild fever (<38°C), feeding well, alert | Fever 38–39°C, mild cough/diarrhea, feeding less but still drinks | Fever ≥39°C, not feeding, convulsions, hard breathing, very sleepy |

**CHW Assessment**: Assess fever source and danger signs per IMCI; check temperature accurately. In malaria-risk areas test for malaria; consider serious bacterial infection in <2 months.

**When to Refer**: Refer if fever ≥38°C lasts >1 day, baby feeds poorly, or any danger sign appears.

**Parent Guidance (Yellow)**: Keep baby lightly dressed, continue breastfeeding often. Seek care if fever continues or baby becomes weak/sleepy.

**Prevention**: Ensure timely birth/6-week vaccines; use insecticide-treated bed net in malaria areas.

---

##### 2. Respiratory Assessment
**Question**: *Is the infant coughing or breathing fast? Any chest indrawing or difficulty feeding?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Occasional cough, feeding well, no fast breathing | Mild cough/cold, no fast breathing | Cough >2 weeks, feeding less, mild chest indrawing when crying | Fast breathing, chest indrawing at rest, grunting, bluish lips, pauses in breathing |

**CHW Assessment**: Count respiratory rate; look for chest indrawing/stridor/wheeze per IMCI. Consider bronchiolitis/pneumonia/pertussis.

**When to Refer**: Refer if cough lasts >2 weeks or breathing becomes fast or difficult.

**Parent Guidance (Yellow)**: Keep baby away from smoke and dust. Breastfeed frequently and keep nose clear.

**Prevention**: Avoid indoor smoke; ensure vaccines are up to date (e.g., PCV).

---

##### 3. Diarrhea Assessment
**Question**: *Is the infant having diarrhea? How many times per day? Any blood or signs of dehydration?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Normal stool, drinks/feeds well, active | Loose stools <3/day | Watery stool ≥3/day, fewer wet nappies, dry mouth, drinks eagerly | Blood in stool, sunken eyes, very sleepy, drinks poorly or vomiting everything |

**CHW Assessment**: Classify dehydration; give ORS per plan A/B; give zinc (10 mg/day if <6 months, 20mg/day if >6 months).

**When to Refer**: Refer if blood in stool, signs of dehydration, or feeding is poor.

**Parent Guidance (Yellow)**: Continue breastfeeding and give small frequent sips of ORS if advised. Offer zinc if provided.

**Prevention**: Handwashing with soap; safe water preparation; keep ORS and zinc at home.

---

##### 4. Rash Assessment
**Question**: *Does the infant have a rash? When did it start? Is it spreading or associated with fever?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No rash, no fever, baby comfortable | Mild heat rash, no fever, baby comfortable | Rash spreading, lasts >3 days, itchy, mild oozing | Rash with high fever, non-blanchable rash, blisters/pus, swelling of face, or very sick baby |

**When to Refer**: Refer if rash is painful, has pus, blisters, or baby has fever and seems unwell.

**Parent Guidance (Yellow)**: Keep skin clean and dry; dress in light cotton. Avoid new lotions if skin reacts.

**Prevention**: Follow immunization schedule; avoid harsh soaps; keep nails short.

---

##### 5. Cord/Eye Infection
**Question**: *Does the infant have redness, discharge, or swelling around the cord or eyes?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Cord is clean and dry, no eye discharge | Little, sticky eye discharge first days | Redness around cord stump or eyes with yellow discharge but baby well | Foul cord smell with redness spreading, fever, baby not feeding; severe eye swelling |

**When to Refer**: Refer same day for any cord/eye infection signs.

**Parent Guidance (Yellow)**: Clean cord dry (no powders/ointments unless advised). Wash hands before touching.

**Prevention**: Hand hygiene; dry cord care; avoid harmful substances on cord.

---

#### Development Questions (0–6 months)

##### 6. Social Response
**Question**: *Does the infant smile, coo, and respond to caregiver voices appropriately for age?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Smiles by ~6–8 weeks; coos by ~3 months; looks at faces | Limited social smile by 3 months; little vocalization | No response to faces/sound; no smile by 3 months | — |

**When to Refer**: Refer if no social smile or response to sound by 3 months.

**Parent Guidance (Yellow)**: Talk, sing, and smile with baby every day. Hold baby close and look into eyes during feeding.

**Prevention**: Encourage daily responsive play; track milestones on child health card.

---

##### 7. Motor Development
**Question**: *Does the infant hold the head steady and attempt to roll when on the tummy?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Holds head steady by ~4 months; rolls by ~4–6 months | Poor head control by 4 months; not attempting to roll by 6 months | Very floppy or very stiff; persistent head lag past 5–6 months | — |

**When to Refer**: Refer if head control is poor by 4–5 months or very stiff/floppy.

**Parent Guidance (Yellow)**: Give tummy time while baby is awake and watched. Play on mat and encourage reaching.

**Prevention**: Provide supervised tummy time; avoid prolonged device seating.

---

##### 8. Hearing Response
**Question**: *Does the infant respond to your voice or startle to loud sounds?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Startles to loud sound; turns to voices by ~4–6 months | Inconsistent response to sound; limited babbling by 6 months | No reaction to loud sounds; no vocalization | — |

**When to Refer**: Refer if baby does not react to loud sounds or voices.

**Parent Guidance (Yellow)**: Speak gently and use songs and simple words. Reduce loud background noise.

**Prevention**: Avoid loud noise exposure; treat ear infections promptly.

---

##### 9. Hand Use
**Question**: *Does the infant open and close hands, grasp objects, and bring hands to the mouth?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Hands open/close, brings hands to mouth, grasps by ~3–4 months | Persistent fisting after 4 months; uses one hand much more | Very stiff hands/arms; no reaching by 6 months | — |

**When to Refer**: Go for assessment if fists stay tightly closed after 4 months or no reaching by 6 months.

**Parent Guidance (Yellow)**: Offer simple toys to hold and bring to mouth. Play gently with both hands.

**Prevention**: Offer safe rattles and soft toys; vary sides when feeding/carrying.

---

##### 10. Alertness
**Question**: *Is the infant alert during wake periods and easily roused for feeds?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Newborns sleep 14–17 hours/day in short blocks; wakes to feed | — | Very irritable or hard to console | Very difficult to wake, poor feeding, limp |

**When to Refer**: Refer if baby is very sleepy and not feeding.

**Parent Guidance (Yellow)**: Newborns need lots of sleep. Wake for feeds and keep a calm, regular routine.

**Prevention**: Promote safe sleep (on back, firm surface, no soft bedding).

---

#### Nutrition & Feeding Questions (0–6 months)

##### 11. Breastfeeding Frequency
**Question**: *Is the infant breastfeeding on demand? How many feeds does the infant receive per day?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| On demand, about 8–12 times/day; baby gains weight and has wet nappies | — | Feeds <6 times/day; shallow latch; slow weight gain | Not breastfeeding or refusing formula feeds; weight loss |

**When to Refer**: Refer if baby feeds poorly or is losing weight.

**Parent Guidance (Yellow)**: Breastfeed whenever baby wants, day and night. Check latch and hold baby close.

**Prevention**: Growth monitoring monthly; encourage skin-to-skin; avoid water/other foods.

---

##### 12. Vomiting Assessment
**Question**: *Does the infant spit up small amounts after feeding or vomit forcefully?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Occasional spitups; steady weight gain | Small spit-ups after feeds; steady weight gain | Frequent large spit-ups; back-arching; irritable; stagnating weight gain | Green/bloody vomit, projectile vomiting, bilious vomiting, poor feeding |

**When to Refer**: Seek care urgently for green/bloody vomit or if baby seems very unwell.

**Parent Guidance (Yellow)**: Keep baby upright after feeding and burp gently. Offer smaller, more frequent feeds.

**Prevention**: Avoid overfeeding; ensure safe preparation if expressed milk used.

---

##### 13. Exclusive Breastfeeding
**Question**: *Is the infant receiving only breast milk or given formula top-ups?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No formula milk needed for top-up while exclusively feeding | Little formula required while exclusively breastfed | Hot climate with fussiness but still feeding | Refuses to breast/formula feed; signs of dehydration |

**When to Refer**: Refer if baby shows dehydration or refuses feeds.

**Parent Guidance (Yellow)**: Under 6 months, breast milk is enough. Extra water or juices are not needed.

**Prevention**: Promote safe water practices for caregivers; exclusive breastfeeding to 6 months.

---

##### 14. Breast Preference
**Question**: *Does the infant refuse one breast or feed less on one side? Is there pain during breastfeeding?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Breastfeeding comfortably on both breasts | Occasional preference; overall feeding well; mild nipple pain | Persistent refusal but takes other side; moderate nipple pain; breast swelling | Refusal from both nipples; severe nipple pain; obvious breast swelling; abnormal discharge |

**When to Refer**: Go for assessment if refusal persists or baby is not gaining weight.

**Parent Guidance (Yellow)**: Try different positions and start on preferred breast, then switch. Feed in quiet, calm place.

**Prevention**: Check for oral thrush; encourage frequent, calm feeds; track weight.

---

##### 15. Weight Gain
**Question**: *Has the infant gained weight steadily along the growth chart?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Steady weight gain along growth chart; alert and active | Weight gain slower than expected; misses feeds | Weight loss or crossing down growth lines | Swelling/oedema/wasting |

**When to Refer**: Refer if weight gain is poor or weight is dropping.

**Parent Guidance (Yellow)**: Bring child health card to each visit to check weight. Feed often and ask for help.

**Prevention**: Monthly growth monitoring; maternal nutrition and hydration support.

---

### Age Group: 6–24 Months

#### Health Questions (6–24 months)

##### 16. Fever Assessment
**Question**: *Does the child have fever? For how long? Is the child drinking and playing normally?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No fever, active/playful | Short fever with mild cold; active; drinking | Fever ≥38°C for >24 hours; reduced play; decreased appetite | Very sleepy, convulsions, stiff neck, severe dehydration, or breathing difficulty |

**When to Refer**: Refer if fever lasts >1 day, >38°C, child is very sleepy, or has breathing problems.

**Parent Guidance (Yellow)**: Give plenty of fluids and continue breastfeeding/feeding. In malaria areas, test at health center.

**Prevention**: Use insecticide-treated nets nightly; ensure vaccinations up to date.

---

##### 17. Respiratory Assessment
**Question**: *Is the child coughing or breathing fast? Any chest indrawing or noisy breathing?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Occasional cough, no fast breathing; active; feeding well | Mild cough/cold | Cough >2 weeks or fast breathing without distress; mild chest indrawing when upset | Fast breathing with chest indrawing at rest, grunting, cyanosis, or inability to drink |

**When to Refer**: Refer urgently if breathing is fast or difficult.

**Parent Guidance (Yellow)**: Keep child comfortable and away from smoke. Offer fluids often.

**Prevention**: Reduce indoor smoke; PCV/pertussis vaccine adherence.

---

##### 18. Diarrhea Assessment
**Question**: *Does the child have diarrhea? How many times per day? Any blood or dehydration signs?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No loose stools; feeding well | 3–4 loose stools/day | Many watery stools; thirst; dry mouth; fewer wet nappies | Blood in stool, sunken eyes, lethargy, drinks poorly or vomits everything |

**When to Refer**: Refer if blood in stool or signs of dehydration.

**Parent Guidance (Yellow)**: Give ORS after each loose stool and continue feeding. Give zinc for 10–14 days if provided.

**Prevention**: Safe water, handwashing with soap, clean feeding utensils.

---

##### 19. Ear Assessment
**Question**: *Does the child have ear pain or discharge? For how long? Any fever or swelling behind the ear?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No ear tugging, no ear discharge, no fever | Brief tugging with a cold | Ear pain with fever or discharge but child playful | Severe pain, swelling behind ear, high fever, or child very ill |

**When to Refer**: Go for care within 24 hours for ear pain; urgently if swelling or high fever.

**Parent Guidance (Yellow)**: Keep ear dry and do not insert objects. Seek care for pain or any discharge.

**Prevention**: Avoid bottle propping; keep nose clean; follow-up if discharge persists.

---

##### 20. Deworming Assessment
**Question**: *Has the child been dewormed recently? Are there signs of worms or poor appetite/weight loss?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No tummy pain/discomfort | Occasional tummy discomfort; otherwise well | Poor appetite, mild weight loss, visible worms in stool | Severe anemia signs (pale palms), swollen belly, vomiting worms |

**When to Refer**: Go for deworming advice if appetite/weight are poor; urgently if severe symptoms.

**Parent Guidance (Yellow)**: Deworming helps children grow and play better. A health worker can advise when to deworm.

**Prevention**: Handwashing, short nails, safe latrines; promote footwear where hookworm risk exists.

---

#### Development Questions (6–24 months)

##### 21. Motor Development
**Question**: *Can the child stand with support or walk alone appropriate for age?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Stands with support by ~10 months; walks by ~15 months | Not walking by 18 months; unusual walking pattern | Not bearing weight by 12 months; very stiff/floppy | — |

**When to Refer**: Go for assessment if not walking by 18 months or not standing by 12 months.

**Parent Guidance (Yellow)**: Give child safe space to cruise and practice steps. Hold hands and encourage short walks.

**Prevention**: Sunlight exposure and diet with vitamin D/calcium; safe play areas.

---

##### 22. Language Development
**Question**: *Does the child respond to name and use simple words for age?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Says a few single words by 12–15 months; follows simple commands by ~18 months | No single words by 18 months; limited understanding; few gestures | No response to name/sound; no babble by 12 months; regression of skills | — |

**When to Refer**: Refer if no words by 18 months or no response to sound.

**Parent Guidance (Yellow)**: Talk, sing, and read simple picture books daily. Use short, clear phrases.

**Prevention**: Limit screen time; increase caregiver–child interaction and book sharing.

---

##### 23. Social & Play Development
**Question**: *Does the child play, imitate, and explore toys or people around them?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Imitates actions; explores; brings objects to show | Limited play variety; prefers repetitive actions only | No interest in people/toys; no eye contact | — |

**When to Refer**: Seek assessment if child avoids interaction or stops doing skills they had.

**Parent Guidance (Yellow)**: Play simple games like rolling a ball, stacking cups, and naming objects.

**Prevention**: Daily playtime; simple homemade toys; encourage other children's play.

---

##### 24. Fine Motor Development
**Question**: *Does the child use both hands equally to grasp, feed, and stack objects?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Feeds self with fingers; stacks 2–3 blocks by ~18 months | Messy feeding; drops objects often; limited pincer grasp by 12–15 months | Avoids using one hand entirely; no purposeful grasp by 12 months | — |

**When to Refer**: Go for assessment if hand use is very limited or clearly one-sided.

**Parent Guidance (Yellow)**: Offer soft finger foods and let child practice. Give safe cups and blocks.

**Prevention**: Encourage self-feeding; provide cups/spoons suited to small hands.

---

##### 25. Behavioral Development
**Question**: *Does the child have frequent tantrums, sleep problems, or difficulty calming down?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Short tantrums; calms with comfort; normal separation protest | Frequent long tantrums; sleep problems; biting/hitting often | Hurts self/others seriously; loss of skills; no response to comfort | — |

**When to Refer**: Seek care if behavior is severe, persistent, or skills regress.

**Parent Guidance (Yellow)**: Keep routines steady, offer choices, and praise calm behavior.

**Prevention**: Regular routines; outdoor play; avoid harsh discipline.

---

#### Nutrition & Feeding Questions (6–24 months)

##### 26. Complementary Feeding
**Question**: *Has the child started complementary foods at 6 months? What types and how often?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Start at 6 months with soft mashed foods while continuing breastfeeding | Started before 6 months or delayed after 6 months; limited variety | Not starting solids by 9 months; choking episodes; weight faltering | — |

**When to Refer**: Go for counseling if solids not started by 9 months or weight drops.

**Parent Guidance (Yellow)**: Begin with soft porridge, mashed vegetables, beans, and small amounts of animal-source foods.

**Prevention**: Add oil/groundnuts/egg to increase energy; use clean utensils.

---

##### 27. Dietary Variety
**Question**: *Is the child eating a variety of foods? Are there feeding difficulties or refusal?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Good appetite daily; steady weight gain/growth | Appetite varies day to day; growth steady | Prefers few foods; refuses new textures; slow meals | Persistent refusal with weight loss or illness signs |

**When to Refer**: Seek care if poor intake lasts >1 week or weight is dropping.

**Parent Guidance (Yellow)**: Offer small portions often and eat together. Keep mealtimes calm.

**Prevention**: Regular growth checks; iron-rich foods (beans, eggs, meat if available).

---

##### 28. Meal Frequency
**Question**: *How many meals and snacks does the child eat daily? Are portions age-appropriate?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| 6–8 months: 2–3 meals + 1–2 snacks; 9–24 months: 3–4 meals + 1–2 snacks | — | Too few meals; mostly thin porridge; little protein | Refuses most foods; visible wasting or edema |

**When to Refer**: Go for assessment if eating very little with weight loss.

**Parent Guidance (Yellow)**: Offer meals at regular times and include varied foods. Continue breastfeeding on demand.

**Prevention**: Keep a simple meal schedule posted at home; include fruits/vegetables daily.

---

##### 29. Iron-Rich Foods
**Question**: *Does the child eat iron-rich foods like beans, greens, eggs, or meat when available?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Eats diverse diet including beans, dark greens, eggs; active and playful | — | Mostly starches; pale palms; gets tired easily | Very pale, weak, swollen feet, or breathless |

**When to Refer**: Go for testing if child is very pale, weak, or not improving with better diet.

**Parent Guidance (Yellow)**: Offer beans, peas, lentils, dark green leaves, eggs, and meat/fish if available.

**Prevention**: Deworming as per policy; malaria prevention; iron-rich foods routinely.

---

##### 30. Milk Consumption
**Question**: *Does the child drink excessive milk that replaces other foods?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| 1–2 cups/day along with solid foods; eats varied diet | — | Milk replaces meals; constipation; picky eating worsens | Vomiting after any food/drink with dehydration |

**When to Refer**: Seek care if child relies mostly on milk or reacts to milk.

**Parent Guidance (Yellow)**: Milk can be part of diet, but meals and snacks are also needed. Offer milk after meals.

**Prevention**: Promote balanced meals first; brush teeth twice daily.

---

### Age Group: 2–5 Years

#### Health Questions (2–5 years)

##### 31. Respiratory Assessment
**Question**: *Does the child have frequent coughs or colds? Are there breathing difficulties or prolonged coughs?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No coughs, no breathing difficulties | Several mild colds/year; recovers in a few days; active | Cough >3 weeks; wheeze with play; night cough | Breathing difficulty, chest indrawing, high fever, lethargy |

**When to Refer**: Refer if cough lasts >2–3 weeks or breathing is hard.

**Parent Guidance (Yellow)**: Most children get colds. Give fluids and rest and keep away from smoke.

**Prevention**: Avoid smoke; ensure vaccines current; seek TB screening if exposure.

---

##### 32. Vision/Hearing Assessment
**Question**: *Does the child hear and see clearly during daily activities?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Sees well and hears well | Turns up sound; squints or sits very near; bumps into objects | — | No response to loud sounds; frequent falls; eye crossing/white reflex |

**When to Refer**: Go for auditory/vision assessment if problems are present.

**Parent Guidance (Yellow)**: Watch how child responds to voices and objects. Visit health center if they struggle.

**Prevention**: Treat ear infections early; keep screening at school entry.

---

##### 33. Deworming Assessment
**Question**: *Has the child been dewormed? Are there signs of worms or anemia?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Recently dewormed | Occasional tummy aches; otherwise well | Passing many worms | Very pale (dizziness, fainting); swollen belly; severe pain |

**When to Refer**: Refer for deworming guidance; urgently if severe symptoms.

**Parent Guidance (Yellow)**: Deworming helps children grow. Teach handwashing and use of latrines.

**Prevention**: Regular handwashing; nails short; safe toilets; footwear where needed.

---

##### 34. Fatigue/Anemia Assessment
**Question**: *Does the child appear unusually tired, pale, or weak during play?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Active most days; normal sleep and play | — | Tires easily; pale palms; frequent infections | Very weak, breathless, swollen feet, or weight loss |

**When to Refer**: Refer if fatigue is persistent or severe.

**Parent Guidance (Yellow)**: Offer regular meals and sleep routines. Seek care if child looks pale or becomes weak.

**Prevention**: Iron-rich foods and deworming per policy; growth monitoring.

---

##### 35. Dental Health
**Question**: *Does the child have tooth pain, cavities, or difficulty eating?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| No tooth pain, no cavities, brushes teeth, eats well | Small spots, poor brushing, mild pain | Tooth pain when eating; visible cavities; bad breath | Facial swelling, fever, spreading infection or inability to eat |

**When to Refer**: Go to dental/health center if pain persists or there is swelling/fever.

**Parent Guidance (Yellow)**: Brush teeth twice daily and limit sugary drinks and snacks.

**Prevention**: Rinse after sweets; schedule routine dental checks if available.

---

#### Development Questions (2–5 years)

##### 36. Speech Development
**Question**: *Can the child speak in short sentences and be understood by caregivers?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Understood by familiar people; speaks short sentences by 3–4 years | Often hard to understand at 4 years; limited vocabulary | Not speaking in sentences; cannot follow simple instructions | — |

**When to Refer**: Go for assessment if speech is unclear at 4 years or understanding is poor.

**Parent Guidance (Yellow)**: Talk face-to-face and give time to answer. Read picture books and repeat new words.

**Prevention**: Limit background noise; regular conversation and book sharing.

---

##### 37. Social Development
**Question**: *Does the child play and interact with others appropriately for age?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Parallel play at 3 years; begins cooperative play by 4–5 years | Prefers to be alone; limited pretend play; rigid routines | No eye contact; no interest in peers; repetitive behaviors with distress | — |

**When to Refer**: Seek assessment if social interaction is very limited or causes distress.

**Parent Guidance (Yellow)**: Invite simple games with other children and model sharing. Keep routines but allow small changes.

**Prevention**: Daily outdoor play with peers; reduce screen time; praise sharing.

---

##### 38. Toilet Training
**Question**: *Is the child toilet trained during the day? Any frequent accidents?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Daytime trained by ~3 years; night wetting may continue up to 5 years | Frequent daytime accidents at 4 years; constipation | Painful urination, blood, persistent incontinence after 5 years | — |

**When to Refer**: Go for assessment if accidents are frequent or painful urination occurs.

**Parent Guidance (Yellow)**: Take child to toilet regularly and praise small successes. Avoid punishment.

**Prevention**: Adequate fiber/water; scheduled toilet times; calm routine.

---

##### 39. Attention/Behavior
**Question**: *Does the child have difficulty focusing or sitting quietly during simple tasks?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Short attention span improves with age; can follow simple rules | Very distractible at home and preschool; disrupts play | Unsafe impulsivity; aggression; loss of skills | — |

**When to Refer**: Seek care if behavior affects safety or learning.

**Parent Guidance (Yellow)**: Use short, clear instructions and break tasks into small steps. Give active play time outdoors.

**Prevention**: Consistent routines; positive attention; limit sugary drinks and screen time.

---

##### 40. Cognitive Development
**Question**: *Can the child follow simple instructions, name objects, and engage in learning play?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Can name objects, colors; follows 2-step commands; draws simple shapes | Struggles with simple instructions; limited interest in books | Loses skills or cannot understand simple language | — |

**When to Refer**: Seek assessment if understanding or skills decline.

**Parent Guidance (Yellow)**: Read and talk about pictures daily. Let child draw and sort objects by color and size.

**Prevention**: Daily story time; simple counting games; praise efforts.

---

#### Nutrition & Feeding Questions (2–5 years)

##### 41. Meal Patterns
**Question**: *Does the child eat three meals and healthy snacks daily? Any feeding issues?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Appetite varies; growth steady; active | Small portions for many days; limited variety | Refuses most foods; weight loss or illness signs | — |

**When to Refer**: Go for assessment if poor intake lasts >3-4 days or weight drops.

**Parent Guidance (Yellow)**: Offer small meals and healthy snacks. Eat together and keep mealtimes calm.

**Prevention**: 3 meals + 2 snacks daily; include protein, vegetables, and fruit.

---

##### 42. Food Group Diversity
**Question**: *Does the child eat foods from all main groups: staples, protein, vegetables, and fruit?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Eats from all groups: staple, legumes, vegetables, fruit, animal-source if available | Eats from all groups but limited variety | Only porridge/tea; visible wasting/edema | — |

**When to Refer**: Seek care if weight is dropping or child seems weak.

**Parent Guidance (Yellow)**: Give 3 meals and 2 snacks with different foods and colors. Add beans, eggs, or fish/meat.

**Prevention**: Add a spoon of oil or groundnuts to increase energy; safe food hygiene.

---

##### 43. Sugar Consumption
**Question**: *Does the child consume sugary foods or drinks frequently, replacing main meals?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Occasional treats; regular brushing; meals not replaced by sweets | Frequent sweets; refuses meals; dental spots | Severe tooth decay, pain, or infection; poor eating | — |

**When to Refer**: Go to health/dental center if teeth hurt or eating is affected.

**Parent Guidance (Yellow)**: Limit sugary drinks and juices. Offer water and milk and keep sweets as small treats.

**Prevention**: Brush teeth twice daily with fluoride toothpaste; routine dental checks if available.

---

##### 44. Milk Balance
**Question**: *Does the child drink one to two cups of milk daily with meals, not replacing other foods?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| About 1–2 cups/day with meals; eats varied foods | Milk before meals reduces appetite; constipation occurs | Only milk diet; poor growth; vomiting/diarrhea after milk | — |

**When to Refer**: Seek care if child relies mostly on milk or reacts to milk.

**Parent Guidance (Yellow)**: Serve milk after meals, not before. Encourage water between meals.

**Prevention**: Prioritize balanced meals; iron-rich foods daily.

---

##### 45. Weight Monitoring
**Question**: *Has the child lost weight or failed to gain recently? Any swelling or fatigue?*

| 🟢 Green | 🟡 Yellow | 🟠 Orange | 🔴 Red |
|----------|-----------|-----------|--------|
| Active and playful; eating varied foods; stable growth line | Slightly underweight; clothes looser; recent illness | Weight loss | Swelling (edema), or very weak |

**When to Refer**: Refer for assessment if weight is falling or swelling appears.

**Parent Guidance (Yellow)**: Offer extra meals and add energy-dense foods like oil, groundnuts, eggs, or beans.

**Prevention**: Regular growth monitoring and prompt illness treatment.

---

### Quick Reference: Question Count by Category

| Age Group | Health | Development | Nutrition | Total |
|-----------|--------|-------------|-----------|-------|
| 0–6 months | 5 | 5 | 5 | **15** |
| 6–24 months | 5 | 5 | 5 | **15** |
| 2–5 years | 5 | 5 | 5 | **15** |
| **Total** | **15** | **15** | **15** | **45** |

---

## Judging Criteria Breakdown

Understanding the weighted criteria is crucial for prioritizing development efforts:

### Primary Focus (25%)
| Criteria | Weight | Excellence Standard |
|----------|--------|---------------------|
| **Technical Execution** | 25% | All core features work reliably with advanced data processing or novel technical architecture |

### High Priority (15% each)
| Criteria | Weight | Excellence Standard |
|----------|--------|---------------------|
| **Human-Centered Design** | 15% | Deep empathy, cultural sensitivity, realistic field workflows |
| **Technical Feasibility & Frugality** | 15% | Lightweight, secure, offline-first, battery-efficient, low-cost |
| **Innovation & Creativity** | 15% | Entirely novel approach, paradigm shift in thinking |

### Medium Priority (10% each)
| Criteria | Weight | Excellence Standard |
|----------|--------|---------------------|
| **Design (UI/UX)** | 10% | Outstanding attention to detail, consumer-ready |
| **Usability & Speed** | 10% | Exceptionally fast, intuitive workflow under 3 minutes |
| **Presentation** | 10% | Flawless pitch with clear problem, solution, and impact |

### Strategic Insight
**Technical Execution (25%)** is the highest-weighted criterion. The judges want to see:
- Multiple complex features working together
- Evidence of difficult integration
- Novel libraries or back-end logic (e.g., ML models)
- Reliable, stable core functionality

---

## Stakeholder Insights

### Wilson Njenga (Ministry of Health Perspective)

**Role**: MOH Representative overseeing community health surveillance

**Key Insights**:
- Data from DSS enables **community dialogues** - bringing stakeholders together to discuss health trends
- Example: When data showed high maternal deaths in one sub-county, it triggered targeted interventions
- Community health programs are **NOT funded by government** - they rely on partners
- MOH provides policy framework but implementation depends on external funding
- Data helps identify **defaulters** (missed immunizations, clinic visits) for follow-up

**Quote**: *"We want to have a one-stop shop for data... currently data sources are fragmented"*

### Felix Agoi (AKU Project Coordinator)

**Role**: Coordinates the Demographic and Health Surveillance System (DSS)

**Key Insights on CHV Selection & Training**:
- CHVs are **nominated by the community**, not hired
- Ideal training: 14 days (5 days minimum for basic competency)
- CHVs must be residents of the community they serve
- Age requirement: typically 20-50 years old
- Literacy required: must be able to read and write

**What Makes This DSS Unique**:
- Uses **existing government structures** (CHUs, CHVs) rather than hiring external enumerators
- This makes it **more sustainable** and cost-effective
- Other DSS systems (Nairobi, Kisumu) have benchmarked against this model
- Coverage: 10 Community Health Units, ~92,000 residents

**Technical Operations**:
- Data collection happens **biannually** (every 6 months)
- Each CHV covers approximately **100 households**
- Uses ODK (Open Data Kit) on Android tablets
- Supervisors can monitor data collection in real-time

### Rachel Odhiambo (Data Manager)

**Role**: Technical lead for data collection systems

**Current Technology Stack**:
- **ODK (Open Data Kit)** - Mobile data collection platform
- Android tablets for CHVs
- Server-side data storage with access controls
- Form-based data validation

**Data Privacy Approach**:
- Personal Identifiers (PIDs) generated for each individual
- Names are collected but **never shared** externally
- Data is de-identified for analysis
- Server access is role-based and restricted

**Data Quality Controls**:
- Validation built into ODK forms
- Skip logic to prevent irrelevant questions
- Range checks for numeric values
- Mandatory fields for critical data points

**Challenge Noted**: *"Sometimes CHVs struggle with complex branching logic in forms"*

---

## Current MOH Data Collection Forms

### MOH 513: Household Register

This is the primary tool CHVs currently use for household-level data collection. Key indicators relevant to under-5 screening:

#### Child Health Indicators (Under 5)
| Indicator | Data Collected | Frequency |
|-----------|---------------|-----------|
| Immunization Status | Fully immunized Y/N | Every visit |
| Growth Monitoring | Attended clinic Y/N | Monthly |
| MUAC Measurement | Red/Yellow/Green | Every visit |
| Vitamin A | Received in last 6 months | Biannual |
| Deworming | Received in last 6 months | Biannual |
| Exclusive Breastfeeding | For 0-6 months | Birth to 6mo |

#### MUAC Color Coding (Existing Standard)
- 🔴 **Red**: < 11.5 cm (Severe Acute Malnutrition - immediate referral)
- 🟡 **Yellow**: 11.5-12.5 cm (Moderate Acute Malnutrition - referral)
- 🟢 **Green**: > 12.5 cm (Normal nutritional status)

#### Developmental Milestones Tracked
| Age | Expected Milestone |
|-----|-------------------|
| 0-3 months | Responds to sounds, follows objects |
| 3-6 months | Holds head up, smiles responsively |
| 6-9 months | Sits without support, babbles |
| 9-12 months | Stands with support, says simple words |
| 12-18 months | Walks, follows simple instructions |
| 18-24 months | Combines words, runs |
| 2-5 years | Age-appropriate speech, social interaction |

### MOH 514: Service Delivery Log Book

Monthly tracking tool for CHV activities:

#### Relevant Tracking Categories
- **Defaulter Identification**: Children who missed vaccinations/clinic visits
- **Referrals Made**: Number and type of referrals to health facilities
- **Home Visits**: Visits to households with under-5 children
- **Health Education**: Sessions conducted with caregivers

---

## Historical Impact Data

### KRHDSS Surveillance Report (2017-2019)

**Coverage**: 10 Community Health Units in Kaloleni/Rabai sub-counties
- **Population**: 92,663 residents
- **Households**: 18,337
- **Data Rounds**: 6 biannual collections completed

### Documented Improvements (2017-2019)

| Indicator | Improvement | Notes |
|-----------|-------------|-------|
| **Child Malnutrition** | ↓ 81% reduction | Red/Yellow MUAC cases decreased significantly |
| **Skilled Birth Attendance** | ↑ 22.9% increase | More facility deliveries |
| **Family Planning** | ↑ 50% increase | Modern contraceptive use |
| **Immunization Coverage** | ↑ 15% increase | Fully immunized children |
| **ANC 4+ Visits** | ↑ 18% increase | Pregnant women completing 4+ visits |

### What This Tells Us

1. **Community-based surveillance works** - Data-driven interventions show measurable impact
2. **CHVs can effectively collect quality data** - With proper tools and training
3. **Early identification matters** - Malnutrition reduction came from early screening
4. **The system is scalable** - Already covers 92,000+ people

---

## Technical Requirements & Constraints

### Hardware Constraints
| Requirement | Specification |
|-------------|--------------|
| Android Version | 8.1+ (API level 27+) |
| RAM | 1-2 GB |
| App Size | ≤ 25 MB |
| Cold Start | < 2 seconds (design goal) |

### Operational Constraints
| Requirement | Specification |
|-------------|--------------|
| Connectivity | Must work offline-first |
| Data Usage | Minimal (sync when connected) |
| Battery | Efficient - full day of use |
| Users | 500+ CHWs, 25-50 concurrent |

### Data Requirements
| Data Point | Storage | Security |
|------------|---------|----------|
| Child Name | Local only | Android FBE |
| Age | Local only | Android FBE |
| Village | Local only | Android FBE |
| Phone Number | Local only | Android FBE |
| **No photos** | Not collected | N/A |
| **No sensitive PII** | Not collected | N/A |

### Performance Goals
| Metric | Target |
|--------|--------|
| Complete screening | < 5 minutes |
| Ideal completion | < 3 minutes |
| Screen transitions | < 100ms |
| Offline capability | 100% core features |

---

## Key Design Considerations

### For Human-Centered Design (15%)

1. **Respect CHV Expertise**
   - CHVs know their communities - design supports their judgment
   - Don't make them feel like data entry clerks
   - Allow for notes and context

2. **Cultural Sensitivity**
   - Questions should be appropriate for Kenyan context
   - Swahili language support important (stretch goal)
   - Respect for caregivers in all messaging

3. **Field Realities**
   - Often interrupted mid-screening
   - May be outdoors in bright sunlight
   - Children may be crying or uncooperative
   - Caregiver may be busy with other tasks

### For Technical Frugality (15%)

1. **Offline-First Architecture**
   - All screening logic runs locally
   - Data syncs opportunistically
   - No blocking on network calls

2. **Minimal Dependencies**
   - Reduce APK size
   - Fewer points of failure
   - Faster cold starts

3. **Battery Efficiency**
   - No background services when not in use
   - Efficient data structures
   - Minimize screen brightness requirements

### For Innovation (15%)

Consider incorporating:
- **Local ML model** for risk prediction (TensorFlow Lite)
- **Voice input** for faster data entry
- **Smart defaults** based on common patterns
- **Predictive follow-up scheduling**
- **Gamification** for CHV engagement

---

## Recommended Solution Architecture

### Core App Structure

```
┌─────────────────────────────────────────────────────┐
│                    Toto Gemma App                    │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Health    │  │ Development │  │  Nutrition  │  │
│  │  Screening  │  │  Screening  │  │  Screening  │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │         │
│         └────────────────┼────────────────┘         │
│                          ▼                          │
│              ┌───────────────────┐                  │
│              │  Risk Calculator  │                  │
│              │   (Local Logic)   │                  │
│              └─────────┬─────────┘                  │
│                        ▼                            │
│         ┌──────────────────────────────┐            │
│         │     Guidance Generator       │            │
│         │  (Coaching Tips for Parents) │            │
│         └──────────────────────────────┘            │
├─────────────────────────────────────────────────────┤
│                  Local SQLite DB                    │
│            (Encrypted with Android FBE)             │
└─────────────────────────────────────────────────────┘
```

### CHW User Workflow (Step-by-Step Field Experience)

This section describes exactly how a Community Health Worker will use the app during a household visit. **Developers should build the app to match this workflow.**

---

#### **PHASE 1: Arrival & Setup** (30 seconds)

**Step 1.1: Open App**
- CHW taps app icon on Android device
- App loads in <2 seconds (cold start goal)
- Home screen appears with large, clear buttons

**Step 1.2: Home Screen Options**
```
┌─────────────────────────────────────┐
│         🏠 TOTO GEMMA               │
│                                     │
│   ┌─────────────────────────────┐   │
│   │   ➕ NEW SCREENING          │   │  ← Primary action (largest button)
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────┐ ┌─────────────┐   │
│   │ 📋 History  │ │ 🔄 Sync     │   │  ← Secondary actions
│   └─────────────┘ └─────────────┘   │
│                                     │
│   Last sync: Today 8:30 AM ✓        │
│   Pending: 3 screenings to upload   │
└─────────────────────────────────────┘
```

---

#### **PHASE 2: Child Registration** (30-60 seconds)

**Step 2.1: Search or Add Child**
- CHW taps "New Screening"
- Screen shows search bar + "Add New Child" button
- CHW can search by name if child was screened before
- If returning child: select from list → skip to Phase 3
- If new child: tap "Add New Child"

**Step 2.2: Enter Child Details** (New children only)
```
┌─────────────────────────────────────┐
│   👶 REGISTER CHILD                 │
│                                     │
│   Child's Name                      │
│   ┌─────────────────────────────┐   │
│   │ [                         ] │   │
│   └─────────────────────────────┘   │
│                                     │
│   Date of Birth / Age               │
│   ┌─────────────────────────────┐   │
│   │ [Pick date] or [Enter age]  │   │
│   └─────────────────────────────┘   │
│   → App calculates: "1 year 3 months"│
│                                     │
│   Village                           │
│   ┌─────────────────────────────┐   │
│   │ [Dropdown: village list   ▼]│   │
│   └─────────────────────────────┘   │
│                                     │
│   Caregiver Phone (optional)        │
│   ┌─────────────────────────────┐   │
│   │ [+254                     ] │   │
│   └─────────────────────────────┘   │
│                                     │
│         [CONTINUE →]                │
└─────────────────────────────────────┘
```

**Key Design Notes:**
- Age input should allow EITHER date of birth OR "X years, Y months"
- Village should be dropdown (pre-populated for CHW's area)
- Phone is optional but enables SMS follow-up

---

#### **PHASE 3: Screening Questions** (2-3 minutes)

**Step 3.1: Age-Appropriate Questions Loaded**
- App automatically selects the 15 questions for child's age group:
  - 0–6 months → Questions 1-15
  - 6–24 months → Questions 16-30
  - 2–5 years → Questions 31-45

**Step 3.2: Category Navigation**
```
┌─────────────────────────────────────┐
│  Amina, 8 months                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━ 20%      │
│                                     │
│  [HEALTH] [DEVELOPMENT] [NUTRITION] │
│     ●          ○            ○       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Question 1 of 5 (Health)           │
│                                     │
│  "Does the child have fever?        │
│   For how long? Is the child        │
│   drinking and playing normally?"   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🟢 No fever, active/playful │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🟡 Short fever, mild cold,  │   │
│  │    still active & drinking  │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🟠 Fever >24hrs, reduced    │   │
│  │    play, less appetite      │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │ 🔴 Very sleepy, convulsions,│   │
│  │    stiff neck, can't drink  │   │
│  └─────────────────────────────┘   │
│                                     │
│    [← BACK]           [NEXT →]      │
└─────────────────────────────────────┘
```

**Step 3.3: CHW Selects Answer**
- CHW taps the answer that best matches child's condition
- Answer is highlighted
- CHW taps "NEXT" to proceed
- Progress bar updates

**Step 3.4: Repeat for All Questions**
- 5 Health questions → 5 Development questions → 5 Nutrition questions
- CHW can go back to change answers
- CHW can switch between category tabs

**Step 3.5: Critical Red Flag Detection**
- If ANY Red answer is selected, app shows immediate alert:
```
┌─────────────────────────────────────┐
│  ⚠️ URGENT: DANGER SIGN DETECTED    │
│                                     │
│  This child shows signs that need   │
│  IMMEDIATE medical attention.       │
│                                     │
│  You selected: "Very sleepy,        │
│  convulsions, stiff neck"           │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Continue screening to       │   │
│  │ complete assessment         │   │
│  └─────────────────────────────┘   │
│                                     │
│  The final result will include      │
│  referral guidance.                 │
└─────────────────────────────────────┘
```

---

#### **PHASE 4: Results & Risk Classification** (30 seconds)

**Step 4.1: Calculate Risk**
- After all 15 questions answered, app calculates overall risk
- Risk algorithm runs locally (no internet needed)
- Results screen appears

**Step 4.2: Display Results**
```
┌─────────────────────────────────────┐
│          SCREENING COMPLETE         │
│                                     │
│  Amina, 8 months                    │
│  Screened: Jan 2, 2026 at 10:45 AM  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │      🟡 YELLOW              │   │
│  │      MODERATE RISK          │   │
│  │                             │   │
│  │   Schedule follow-up in     │   │
│  │   2 weeks                   │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  CATEGORY BREAKDOWN:                │
│  ├─ Health:      🟢 Green           │
│  ├─ Development: 🟡 Yellow          │
│  └─ Nutrition:   🟢 Green           │
│                                     │
│  Areas needing attention:           │
│  • Not walking by 18 months         │
│  • Limited vocabulary               │
│                                     │
│      [VIEW GUIDANCE FOR PARENT]     │
│                                     │
└─────────────────────────────────────┘
```

---

#### **PHASE 5: Caregiver Guidance** (1-2 minutes)

**Step 5.1: Show Parent-Friendly Guidance**
- CHW taps "View Guidance for Parent"
- App shows simple, actionable tips to share with caregiver
- Written in plain language (ideally in Swahili option)

```
┌─────────────────────────────────────┐
│   💬 GUIDANCE FOR CAREGIVER         │
│                                     │
│   Share these tips with the parent: │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🗣️ DEVELOPMENT                │   │
│  │                             │   │
│  │ "Give your child safe space │   │
│  │  to cruise and practice     │   │
│  │  steps. Hold hands and      │   │
│  │  encourage short walks."    │   │
│  │                             │   │
│  │ "Talk, sing, and read       │   │
│  │  simple picture books daily.│   │
│  │  Use short, clear phrases." │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 📅 FOLLOW-UP NEEDED          │   │
│  │                             │   │
│  │ Schedule a visit in 2 weeks │   │
│  │ to check progress.          │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌──────────┐  ┌──────────────┐    │
│  │📱Send SMS│  │ 💾 Save Only │    │
│  └──────────┘  └──────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

**Step 5.2: Optional - Send SMS to Caregiver**
- If phone number was provided, CHW can send summary via SMS
- Pre-formatted message with key guidance
- Works with basic phones (no smartphone needed for parent)

**Step 5.3: For Orange/Red Results - Referral Information**
```
┌─────────────────────────────────────┐
│  🚨 REFERRAL REQUIRED               │
│                                     │
│  This child needs to visit a        │
│  health facility:                   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 🏥 Nearest Facility:         │   │
│  │    Kaloleni Health Centre    │   │
│  │    Open: 8am - 5pm           │   │
│  │                             │   │
│  │ 📞 Emergency: 0800-723-253   │   │
│  └─────────────────────────────┘   │
│                                     │
│  Tell the parent:                   │
│  "Your child needs to see a doctor │
│   as soon as possible. Please go   │
│   to Kaloleni Health Centre today."│
│                                     │
│  ┌─────────────────────────────┐   │
│  │ ☐ Parent agreed to go       │   │
│  │ ☐ Referred for transport    │   │
│  │ ☐ Parent declined (note why)│   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

#### **PHASE 6: Save & Complete** (10 seconds)

**Step 6.1: Save Screening**
- CHW taps "Save" or "Complete"
- Data saved to local SQLite database (encrypted)
- Confirmation shown

```
┌─────────────────────────────────────┐
│                                     │
│         ✅ SCREENING SAVED          │
│                                     │
│   Amina's screening has been saved. │
│   It will sync when connected.      │
│                                     │
│   ┌─────────────────────────────┐   │
│   │     🏠 RETURN HOME          │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │   ➕ NEW SCREENING          │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Step 6.2: Background Sync**
- When device has internet, data syncs automatically
- No action required from CHW
- Sync status shown on home screen

---

### Complete User Journey Timeline

| Phase | Duration | CHW Action | App Response |
|-------|----------|------------|--------------|
| 1. Open App | 2 sec | Tap icon | Home screen loads |
| 2. Start Screening | 5 sec | Tap "New Screening" | Search/Add screen |
| 3. Register Child | 30-60 sec | Enter name, age, village | Age group determined |
| 4. Answer Questions | 2-3 min | Select answers for 15 questions | Progress tracked |
| 5. View Results | 10 sec | Review risk classification | Color-coded result |
| 6. Share Guidance | 1-2 min | Read tips to caregiver | Parent-friendly text |
| 7. Save & Exit | 10 sec | Tap save | Confirmation shown |
| **TOTAL** | **~4-5 min** | | |

---

### Edge Cases & Error Handling

| Scenario | App Behavior |
|----------|--------------|
| CHW accidentally closes app mid-screening | Draft auto-saved; resume option on next open |
| Child's age is exactly at boundary (e.g., 6 months) | App asks: "Is this child closer to 5 months or 7 months?" |
| No internet for days | App works fully offline; queue grows; syncs when connected |
| Battery dies during screening | Draft saved; recoverable on restart |
| CHW selects wrong answer | Back button allows correction |
| Caregiver has no phone | Skip SMS option; paper guidance available |

### Technology Recommendations

| Component | Recommendation | Rationale |
|-----------|---------------|-----------|
| Framework | **React Native** or **Flutter** | Cross-platform, mature ecosystem, good performance |
| Local DB | **SQLite** with **WatermelonDB** | Offline-first, reactive, efficient sync |
| State | **Zustand** or **Riverpod** | Lightweight, simple |
| Risk Logic | **Local TypeScript/Dart** | No network dependency, fast |
| Optional ML | **TensorFlow Lite** | On-device inference, <5MB models |

### Alternative: Native Kotlin

For maximum performance on constrained devices:
- Pure Kotlin with Jetpack Compose
- Room for local database
- Smallest possible APK size
- Best cold start times

---

## Risk Classification Logic

### Proposed Scoring System

Each screening category contributes to an overall risk score:

#### Health Score (0-30 points)
| Question | Green (0) | Yellow (1) | Orange (2) | Red (3) |
|----------|-----------|------------|------------|---------|
| Immunization status | Up to date | 1 dose behind | 2+ doses behind | Never vaccinated |
| Recent illness | None | Mild, resolved | Ongoing, mild | Severe symptoms |
| Fever in last 48h | No | Low grade | Moderate | High/persistent |

#### Development Score (0-30 points)
| Age Group | Green (0) | Yellow (1) | Orange (2) | Red (3) |
|-----------|-----------|------------|------------|---------|
| Milestones | All met | 1 delayed | 2+ delayed | Significant delays |
| Responsiveness | Normal | Slightly reduced | Notably reduced | Unresponsive |
| Social interaction | Normal | Shy but engaging | Withdrawn | No interaction |

#### Nutrition Score (0-40 points)
| Indicator | Green (0) | Yellow (2) | Orange (3) | Red (4) |
|-----------|-----------|------------|------------|---------|
| MUAC | >12.5cm | 12.0-12.5cm | 11.5-12.0cm | <11.5cm |
| Feeding frequency | Adequate | Slightly low | Low | Very low |
| Diet diversity | Good | Fair | Poor | Very poor |
| Visible wasting | None | Mild | Moderate | Severe |

### Overall Classification

| Total Score | Risk Level | Color | Action |
|-------------|------------|-------|--------|
| 0-15 | Low | 🟢 Green | Positive reinforcement, continue routine |
| 16-35 | Moderate | 🟡 Yellow | Coaching, schedule follow-up in 2 weeks |
| 36-55 | High | 🟠 Orange | Urgent referral recommended, follow-up in 1 week |
| 56+ | Critical | 🔴 Red | Immediate referral to health facility |

### Automatic Red Flags

Certain findings should trigger immediate Red classification regardless of total score:
- MUAC < 11.5cm (Severe Acute Malnutrition)
- Signs of severe dehydration
- Difficulty breathing
- Convulsions or loss of consciousness
- Visible severe wasting

---

## Stretch Features (Prioritized)

If core features are solid, consider these in order of impact:

### High Value
1. **Offline-First Sync** - Essential for field reliability
2. **Swahili Language** - Increases accessibility
3. **SMS Guidance Sharing** - Works without smartphones

### Medium Value
4. **WhatsApp Integration** - Popular in Kenya, easy sharing
5. **Supervisor Dashboard** - Basic reporting view
6. **Follow-up Reminders** - Push notifications for scheduled visits

### Nice to Have
7. **Progress Tracking** - Historical view per child
8. **Lightweight Analytics** - Aggregated CHU-level stats
9. **Voice Input** - Faster data entry in field

---

## Quick Reference: Key Numbers

| Metric | Value |
|--------|-------|
| Target users | 500+ CHWs |
| Concurrent users | 25-50 |
| App size limit | ≤ 25 MB |
| Target RAM | 1-2 GB |
| Android version | 8.1+ |
| Screening time goal | < 5 min (ideal < 3 min) |
| Cold start goal | < 2 seconds |
| Technical Execution weight | 25% |
| Human-Centered Design weight | 15% |
| Technical Feasibility weight | 15% |
| Innovation weight | 15% |

---

## Appendix: Source Documents

1. **AKU_ Toto_Gemma_Problem_Statement.md** - Official challenge brief
2. **Judging Rubric - AKU - AKU.csv** - Scoring criteria
3. **Afya Totto - Hackathon Challenge - Questions and Guidance FINAL.xlsx** - ⭐ Official screening protocol with 45 questions
4. **Wilson Njenga MOH Transcription.docx** - Ministry of Health perspective
5. **Felix Agoi Interview.docx** - Project coordinator insights
6. **Rachel Audio Transcription.docx** - Data manager technical details
7. **MOH 513 Household Register.pdf** - Current CHV data collection form
8. **MOH 514_CHV Log Book_A4.pdf** - Monthly service tracking form
9. **Surveillance Report_2017-2019_30062020.pdf** - Historical outcomes data

---

*Document compiled for AKU Innovation Challenge - Toto Gemma Under-5 Screening Tool*
