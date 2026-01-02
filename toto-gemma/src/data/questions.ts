// src/data/questions.ts
// All 45 screening questions organized by age group and category

import type { Question, AgeGroup, Category } from '../types';

export const QUESTIONS: Question[] = [
  // ============================================
  // AGE GROUP: 0-6 MONTHS
  // ============================================

  // --- Health (0-6 months) ---
  {
    id: 'q-0-6m-health-1',
    ageGroup: '0-6m',
    category: 'health',
    orderIndex: 1,
    text: {
      en: 'Does the infant have fever? For how long? Is the infant feeding normally?',
      sw: 'Je, mtoto ana homa? Kwa muda gani? Je, mtoto ananyonya vizuri?',
    },
    answers: {
      green: { en: 'No fever', sw: 'Hakuna homa' },
      yellow: { en: 'Mild fever (<38°C), feeding well, alert', sw: 'Homa kidogo (<38°C), ananyonya vizuri, macho' },
      orange: { en: 'Fever 38–39°C, mild cough/diarrhea, feeding less but still drinks', sw: 'Homa 38–39°C, kikohozi kidogo/kuharisha, ananyonya kidogo lakini bado anakunywa' },
      red: { en: 'Fever ≥39°C, not feeding, convulsions, hard breathing, very sleepy', sw: 'Homa ≥39°C, hanyonyi, degedege, kupumua kwa shida, usingizi sana' },
    },
    guidance: {
      chw: 'Assess fever source and danger signs per IMCI; check temperature accurately. In malaria-risk areas test for malaria; consider serious bacterial infection in <2 months.',
      parent: {
        en: 'Keep the baby lightly dressed and continue breastfeeding often. Give extra fluids only if advised for age. Seek care if fever continues or baby becomes weak or very sleepy.',
        sw: 'Mvalishe mtoto nguo nyepesi na endelea kunyonyesha mara kwa mara. Toa maji ya ziada tu kama umeshauriwa. Tafuta huduma kama homa inaendelea au mtoto anakuwa dhaifu.',
      },
      prevention: {
        en: 'Ensure timely birth/6-week vaccines; use insecticide-treated bed net in malaria areas.',
        sw: 'Hakikisha chanjo za kuzaliwa/wiki 6 zinatolewa kwa wakati; tumia chandarua chenye dawa katika maeneo ya malaria.',
      },
      whenToRefer: {
        en: 'Refer if fever ≥38°C lasts >1 day, baby feeds poorly, or any danger sign appears.',
        sw: 'Peleka hospitali kama homa ≥38°C inakaa zaidi ya siku 1, mtoto anyonya vibaya, au dalili yoyote ya hatari.',
      },
    },
  },
  {
    id: 'q-0-6m-health-2',
    ageGroup: '0-6m',
    category: 'health',
    orderIndex: 2,
    text: {
      en: 'Is the infant coughing or breathing fast? Any chest indrawing or difficulty feeding?',
      sw: 'Je, mtoto anakohoa au kupumua haraka? Kuna kuvutwa kwa kifua au shida ya kunyonya?',
    },
    answers: {
      green: { en: 'Occasional cough, feeding well, no fast breathing', sw: 'Kikohozi kidogo, ananyonya vizuri, hapumui haraka' },
      yellow: { en: 'Mild cough/cold, no fast breathing', sw: 'Kikohozi/mafua kidogo, hapumui haraka' },
      orange: { en: 'Cough >2 weeks, feeding less, mild chest indrawing when crying', sw: 'Kikohozi >wiki 2, ananyonya kidogo, kuvutwa kidogo kwa kifua akilia' },
      red: { en: 'Fast breathing, chest indrawing at rest, grunting, bluish lips, pauses in breathing', sw: 'Kupumua haraka, kuvutwa kwa kifua akipumzika, kukoroma, midomo ya bluu, kusimama kupumua' },
    },
    guidance: {
      chw: 'Count respiratory rate; look for chest indrawing/stridor/wheeze per IMCI. Consider bronchiolitis/pneumonia/pertussis.',
      parent: {
        en: 'Keep the baby away from smoke and dust. Breastfeed frequently and keep the nose clear. Go for a check if breathing seems fast or the cough does not improve.',
        sw: 'Mweke mtoto mbali na moshi na vumbi. Nyonyesha mara kwa mara na weka pua safi. Nenda kupimwa kama kupumua kunaonekana haraka au kikohozi hakiboreesheki.',
      },
      prevention: {
        en: 'Avoid indoor smoke; ensure vaccines are up to date (e.g., PCV).',
        sw: 'Epuka moshi ndani ya nyumba; hakikisha chanjo ziko sawa (k.m., PCV).',
      },
      whenToRefer: {
        en: 'Refer if cough lasts >2 weeks or if breathing becomes fast or difficult.',
        sw: 'Peleka hospitali kama kikohozi kinakaa >wiki 2 au kupumua kunakuwa haraka au kwa shida.',
      },
    },
  },
  {
    id: 'q-0-6m-health-3',
    ageGroup: '0-6m',
    category: 'health',
    orderIndex: 3,
    text: {
      en: 'Is the infant having diarrhea? How many times per day? Any blood or signs of dehydration?',
      sw: 'Je, mtoto ana kuharisha? Mara ngapi kwa siku? Kuna damu au dalili za upungufu wa maji?',
    },
    answers: {
      green: { en: 'Normal stool, drinks/feeds well, active', sw: 'Kinyesi cha kawaida, anakunywa/anyonya vizuri, hai' },
      yellow: { en: 'Loose stools <3/day', sw: 'Kinyesi laini <3/siku' },
      orange: { en: 'Watery stool ≥3/day, fewer wet nappies, dry mouth, drinks eagerly', sw: 'Kinyesi cha maji ≥3/siku, nepi chache za mvua, kinywa kavu, anakunywa kwa hamu' },
      red: { en: 'Blood in stool, sunken eyes, very sleepy, drinks poorly or vomiting everything', sw: 'Damu kwenye kinyesi, macho yaliyozama, usingizi sana, anakunywa vibaya au kutapika kila kitu' },
    },
    guidance: {
      chw: 'Classify dehydration; give ORS per plan A/B; give zinc (10 mg/day if <6 months); evaluate for sepsis in young infants.',
      parent: {
        en: 'Continue breastfeeding and give small frequent sips of ORS if advised. Offer zinc if provided by a health worker. Seek care if baby becomes sleepy or passes very watery stool often.',
        sw: 'Endelea kunyonyesha na toa vinywaji vidogo vya ORS mara kwa mara kama umeshauriwa. Toa zinc kama imetolewa na mhudumu wa afya. Tafuta huduma kama mtoto anakuwa na usingizi au anatoa kinyesi cha maji mara kwa mara.',
      },
      prevention: {
        en: 'Handwashing with soap; safe water preparation; keep ORS and zinc at home if available.',
        sw: 'Kunawa mikono na sabuni; kuandaa maji salama; weka ORS na zinc nyumbani kama zinapatikana.',
      },
      whenToRefer: {
        en: 'Refer if there is blood in stool, signs of dehydration, or feeding is poor.',
        sw: 'Peleka hospitali kama kuna damu kwenye kinyesi, dalili za upungufu wa maji, au kunyonya ni vibaya.',
      },
    },
  },
  {
    id: 'q-0-6m-health-4',
    ageGroup: '0-6m',
    category: 'health',
    orderIndex: 4,
    text: {
      en: 'Does the infant have a rash? When did it start? Is it spreading or associated with fever?',
      sw: 'Je, mtoto ana upele? Ulianza lini? Unasambaa au unahusiana na homa?',
    },
    answers: {
      green: { en: 'No rash, no fever, baby comfortable and playing', sw: 'Hakuna upele, hakuna homa, mtoto yuko vizuri na anacheza' },
      yellow: { en: 'Mild heat rash, no fever, baby comfortable', sw: 'Upele wa joto kidogo, hakuna homa, mtoto yuko vizuri' },
      orange: { en: 'Rash spreading, lasts >3 days, itchy, mild oozing', sw: 'Upele unasambaa, unakaa >siku 3, kuwasha, kutoka maji kidogo' },
      red: { en: 'Rash with high fever, non-blanchable rash, blisters/pus, swelling of face, or very sick baby', sw: 'Upele na homa kali, upele usiobadilika rangi, malengelenge/usaha, kuvimba uso, au mtoto mgonjwa sana' },
    },
    guidance: {
      chw: 'Differentiate benign rashes vs. infection/allergy; check for measles exposure and vaccine status; treat secondary infection.',
      parent: {
        en: 'Keep the skin clean and dry; dress your baby in light cotton. Avoid new lotions if the skin reacts. Seek care if the rash worsens or baby develops fever.',
        sw: 'Weka ngozi safi na kavu; mvalishe mtoto nguo za pamba nyepesi. Epuka mafuta mapya kama ngozi inavurugika. Tafuta huduma kama upele unazidi au mtoto anapata homa.',
      },
      prevention: {
        en: 'Follow immunization schedule; avoid harsh soaps; keep nails short to reduce scratching.',
        sw: 'Fuata ratiba ya chanjo; epuka sabuni kali; weka kucha fupi kupunguza kukwaruza.',
      },
      whenToRefer: {
        en: 'Refer if the rash is painful, has pus, has blisters, or the baby has fever and seems unwell.',
        sw: 'Peleka hospitali kama upele unaumiza, una usaha, una malengelenge, au mtoto ana homa na anaonekana mgonjwa.',
      },
    },
  },
  {
    id: 'q-0-6m-health-5',
    ageGroup: '0-6m',
    category: 'health',
    orderIndex: 5,
    text: {
      en: 'Does the infant have redness, discharge, or swelling around the cord or eyes?',
      sw: 'Je, mtoto ana wekundu, kutoka maji, au kuvimba karibu na kitovu au macho?',
    },
    answers: {
      green: { en: 'Cord is clean and dry, no eye discharge', sw: 'Kitovu ni safi na kavu, hakuna maji kutoka machoni' },
      yellow: { en: 'Little sticky eye discharge first days', sw: 'Maji kidogo ya kunata kutoka machoni siku za kwanza' },
      orange: { en: 'Redness around cord stump or eyes with yellow discharge but baby well', sw: 'Wekundu karibu na kitovu au macho na maji ya manjano lakini mtoto yuko vizuri' },
      red: { en: 'Foul cord smell with redness spreading, fever, baby not feeding; severe eye swelling', sw: 'Harufu mbaya ya kitovu na wekundu unasambaa, homa, mtoto hanyonyi; kuvimba kwa macho sana' },
    },
    guidance: {
      chw: 'Assess for omphalitis/conjunctivitis; give systemic antibiotics for omphalitis; topical/systemic per protocol for neonatal conjunctivitis.',
      parent: {
        en: 'Clean the cord dry (no powders/ointments unless advised). Wash hands before touching. If eyes are red with discharge, clean with clean water and seek care.',
        sw: 'Safisha kitovu kavu (hakuna poda/mafuta isipokuwa umeshauriwa). Nawa mikono kabla ya kushika. Kama macho ni mekundu na maji, safisha na maji safi na tafuta huduma.',
      },
      prevention: {
        en: 'Hand hygiene; dry cord care; avoid harmful substances on the cord.',
        sw: 'Usafi wa mikono; utunzaji wa kitovu kavu; epuka vitu vyenye madhara kwenye kitovu.',
      },
      whenToRefer: {
        en: 'Refer the same day for any cord/eye infection signs.',
        sw: 'Peleka hospitali siku hiyo hiyo kwa dalili zozote za maambukizi ya kitovu/macho.',
      },
    },
  },

  // --- Development (0-6 months) ---
  {
    id: 'q-0-6m-dev-1',
    ageGroup: '0-6m',
    category: 'development',
    orderIndex: 6,
    text: {
      en: 'Does the infant smile, coo, and respond to caregiver voices appropriately for age?',
      sw: 'Je, mtoto anatabasamu, kupiga kelele za furaha, na kujibu sauti za mlezi kulingana na umri?',
    },
    answers: {
      green: { en: 'Smiles by ~6-8 weeks; coos by ~3 months; looks at faces', sw: 'Anatabasamu kufikia wiki 6-8; anapiga kelele kufikia miezi 3; anaangalia nyuso' },
      yellow: { en: 'Limited social smile by 3 months; little vocalization', sw: 'Tabasamu la kijamii lililodhoofishwa kufikia miezi 3; sauti kidogo' },
      orange: { en: 'No response to faces/sound; no smile by 3 months', sw: 'Hakuna majibu kwa nyuso/sauti; hakuna tabasamu kufikia miezi 3' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Screen hearing/vision; review caregiver-infant interaction; provide early stimulation guidance; refer for developmental/hearing assessment if red flags.',
      parent: {
        en: 'Talk, sing, and smile with your baby every day. Hold your baby close and look into their eyes during feeding and play.',
        sw: 'Ongea, imba, na tabasamu na mtoto wako kila siku. Mshike mtoto wako karibu na angalia machoni mwake wakati wa kunyonyesha na kucheza.',
      },
      prevention: {
        en: 'Encourage daily responsive play; track milestones on the child health card.',
        sw: 'Himiza kucheza kwa majibu kila siku; fuatilia hatua za ukuaji kwenye kadi ya afya ya mtoto.',
      },
      whenToRefer: {
        en: 'Refer if there is no social smile or response to sound by 3 months.',
        sw: 'Peleka hospitali kama hakuna tabasamu la kijamii au majibu kwa sauti kufikia miezi 3.',
      },
    },
  },
  {
    id: 'q-0-6m-dev-2',
    ageGroup: '0-6m',
    category: 'development',
    orderIndex: 7,
    text: {
      en: 'Does the infant hold the head steady and attempt to roll when on the tummy?',
      sw: 'Je, mtoto anashika kichwa imara na anajaribu kujiviringisha akiwa tumbo chini?',
    },
    answers: {
      green: { en: 'Holds head steady by ~4 months; rolls by ~4-6 months', sw: 'Anashika kichwa imara kufikia miezi 4; anajiviringisha kufikia miezi 4-6' },
      yellow: { en: 'Poor head control by 4 months; not attempting to roll by 6 months', sw: 'Udhibiti mbaya wa kichwa kufikia miezi 4; hajaribu kujiviringisha kufikia miezi 6' },
      orange: { en: 'Very floppy or very stiff; persistent head lag past 5-6 months', sw: 'Mwepesi sana au mgumu sana; kuchelewesha kichwa kunaendelea zaidi ya miezi 5-6' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess tone and primitive reflexes; screen for CP/neuromuscular issues; coach caregivers on positioning.',
      parent: {
        en: 'Give tummy time while the baby is awake and watched. Play on a mat and encourage reaching and turning.',
        sw: 'Toa wakati wa tumbo wakati mtoto yuko macho na anaangaliwa. Cheza kwenye mkeka na himiza kufikia na kugeuka.',
      },
      prevention: {
        en: 'Provide supervised tummy time; avoid prolonged device seating.',
        sw: 'Toa wakati wa tumbo chini ya uangalizi; epuka kukaa kwenye vifaa kwa muda mrefu.',
      },
      whenToRefer: {
        en: 'Refer if head control is poor by 4-5 months or very stiff/floppy.',
        sw: 'Peleka hospitali kama udhibiti wa kichwa ni mbaya kufikia miezi 4-5 au mgumu/mwepesi sana.',
      },
    },
  },
  {
    id: 'q-0-6m-dev-3',
    ageGroup: '0-6m',
    category: 'development',
    orderIndex: 8,
    text: {
      en: 'Does the infant respond to your voice or startle to loud sounds?',
      sw: 'Je, mtoto anajibu sauti yako au anashituka kwa sauti kubwa?',
    },
    answers: {
      green: { en: 'Startles to loud sound; turns to voices by ~4-6 months', sw: 'Anashituka kwa sauti kubwa; anageuka kwa sauti kufikia miezi 4-6' },
      yellow: { en: 'Inconsistent response to sound; limited babbling by 6 months', sw: 'Majibu yasiyokuwa thabiti kwa sauti; kupayuka kidogo kufikia miezi 6' },
      orange: { en: 'No reaction to loud sounds; no vocalization', sw: 'Hakuna majibu kwa sauti kubwa; hakuna sauti' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Perform hearing screening if available; inquire about ear infections and family history; refer for audiology/ENT if concern.',
      parent: {
        en: 'Speak gently to your baby and use songs and simple words. Reduce loud background noise during play and feeding.',
        sw: 'Ongea kwa upole na mtoto wako na tumia nyimbo na maneno rahisi. Punguza kelele kubwa za nyuma wakati wa kucheza na kulisha.',
      },
      prevention: {
        en: 'Avoid loud noise exposure; treat ear infections promptly.',
        sw: 'Epuka kuonyeshwa kwa kelele kubwa; tibu maambukizi ya masikio haraka.',
      },
      whenToRefer: {
        en: 'Refer if your baby does not react to loud sounds or voices.',
        sw: 'Peleka hospitali kama mtoto wako hajibu sauti kubwa au sauti.',
      },
    },
  },
  {
    id: 'q-0-6m-dev-4',
    ageGroup: '0-6m',
    category: 'development',
    orderIndex: 9,
    text: {
      en: 'Does the infant open and close hands, grasp objects, and bring hands to the mouth?',
      sw: 'Je, mtoto anafungua na kufunga mikono, anashika vitu, na kuleta mikono kinywani?',
    },
    answers: {
      green: { en: 'Hands open/close, brings hands to mouth, grasps by ~3-4 months', sw: 'Mikono inafunguka/kufungika, analeta mikono kinywani, anashika kufikia miezi 3-4' },
      yellow: { en: 'Persistent fisting after 4 months; uses one hand much more', sw: 'Kukunja ngumi kunaendelea baada ya miezi 4; anatumia mkono mmoja zaidi' },
      orange: { en: 'Very stiff hands/arms; no reaching by 6 months', sw: 'Mikono/mikono migumu sana; hakuna kufikia kufikia miezi 6' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Check tone/asymmetry; screen for hemiparesis; provide early intervention/referral.',
      parent: {
        en: 'Offer simple toys to hold and bring to the mouth. Play gently with both hands to encourage movement.',
        sw: 'Toa toys rahisi kushika na kuleta kinywani. Cheza kwa upole na mikono yote miwili kuhimiza harakati.',
      },
      prevention: {
        en: 'Offer safe rattles and soft toys; vary sides when feeding/carrying.',
        sw: 'Toa rattles salama na toys laini; badilisha pande wakati wa kulisha/kubeba.',
      },
      whenToRefer: {
        en: 'Go for assessment if fists stay tightly closed after 4 months or no reaching by 6 months.',
        sw: 'Nenda kupimwa kama ngumi zinabaki zimefungwa sana baada ya miezi 4 au hakuna kufikia kufikia miezi 6.',
      },
    },
  },
  {
    id: 'q-0-6m-dev-5',
    ageGroup: '0-6m',
    category: 'development',
    orderIndex: 10,
    text: {
      en: 'Is the infant alert during wake periods and easily roused for feeds?',
      sw: 'Je, mtoto yuko macho wakati wa kuamka na anaamshwa kwa urahisi kwa kulishwa?',
    },
    answers: {
      green: { en: 'Newborns sleep 14-17 hours/day in short blocks; wakes to feed', sw: 'Watoto wachanga wanalala masaa 14-17/siku kwa vipande vifupi; anaamka kulishwa' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Very irritable or hard to console', sw: 'Mwenye hasira sana au mgumu kutuliza' },
      red: { en: 'Very difficult to wake, poor feeding, limp', sw: 'Mgumu sana kuamsha, kulisha vibaya, mwepesi' },
    },
    guidance: {
      chw: 'Evaluate for jaundice, bulging fontanelles, infection, hypoglycemia, dehydration in young infants; advise safe sleep practices.',
      parent: {
        en: 'Newborns need lots of sleep. Wake for feeds and keep a calm, regular routine.',
        sw: 'Watoto wachanga wanahitaji usingizi mwingi. Amsha kwa kulishwa na weka ratiba tulivu na ya kawaida.',
      },
      prevention: {
        en: 'Promote safe sleep (on back, firm surface, no soft bedding).',
        sw: 'Himiza usingizi salama (mgongoni, uso imara, hakuna matandiko laini).',
      },
      whenToRefer: {
        en: 'Refer if your baby is very sleepy and not feeding.',
        sw: 'Peleka hospitali kama mtoto wako ana usingizi sana na halishi.',
      },
    },
  },

  // --- Nutrition & Feeding (0-6 months) ---
  {
    id: 'q-0-6m-nut-1',
    ageGroup: '0-6m',
    category: 'nutrition',
    orderIndex: 11,
    text: {
      en: 'Is the infant breastfeeding on demand? How many feeds does the infant receive per day?',
      sw: 'Je, mtoto ananyonya anapotaka? Mtoto anapata malisho mangapi kwa siku?',
    },
    answers: {
      green: { en: 'On demand, about 8-12 times/day; baby gains weight and has wet nappies', sw: 'Anapotaka, karibu mara 8-12/siku; mtoto anaongezeka uzito na ana nepi za mvua' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Feeds <6 times/day; shallow latch; slow weight gain', sw: 'Analishwa <mara 6/siku; kushika kidogo; kuongezeka uzito polepole' },
      red: { en: 'Not breastfeeding or refusing formula feeds; weight loss', sw: 'Hanyonyi au anakataa maziwa ya formula; kupoteza uzito' },
    },
    guidance: {
      chw: 'Support exclusive breastfeeding to 6 months; assess latch/position; manage mastitis; track growth.',
      parent: {
        en: 'Breastfeed whenever your baby wants, day and night. Check latch and hold the baby close. Ask for help if nipples are sore or baby seems unsatisfied.',
        sw: 'Nyonyesha wakati wowote mtoto wako anapotaka, mchana na usiku. Angalia kushika na mshike mtoto karibu. Omba msaada kama chuchu zinaumia au mtoto anaonekana kutoridhika.',
      },
      prevention: {
        en: 'Growth monitoring monthly; encourage skin-to-skin; avoid water/other foods.',
        sw: 'Ufuatiliaji wa ukuaji kila mwezi; himiza ngozi-kwa-ngozi; epuka maji/vyakula vingine.',
      },
      whenToRefer: {
        en: 'Refer if the baby feeds poorly or is losing weight.',
        sw: 'Peleka hospitali kama mtoto analisha vibaya au anapoteza uzito.',
      },
    },
  },
  {
    id: 'q-0-6m-nut-2',
    ageGroup: '0-6m',
    category: 'nutrition',
    orderIndex: 12,
    text: {
      en: 'Does the infant spit up small amounts after feeding or vomit forcefully?',
      sw: 'Je, mtoto anatema kidogo baada ya kulishwa au kutapika kwa nguvu?',
    },
    answers: {
      green: { en: 'Occasional spitups; steady weight gain', sw: 'Kutema mara kwa mara; kuongezeka uzito sawasawa' },
      yellow: { en: 'Small spit-ups after feeds; steady weight gain', sw: 'Kutema kidogo baada ya kulishwa; kuongezeka uzito sawasawa' },
      orange: { en: 'Frequent large spit-ups; back-arching; irritable; stagnating weight gain', sw: 'Kutema kubwa mara kwa mara; kujikunja nyuma; hasira; uzito hauongezeki' },
      red: { en: 'Green/bloody vomit, projectile vomiting, bilious vomiting, poor feeding', sw: 'Kutapika kijani/damu, kutapika kwa nguvu, kutapika bili, kulisha vibaya' },
    },
    guidance: {
      chw: 'Differentiate GER vs. obstruction/infection; check hydration/weight; consider allergy if eczema/hematochezia.',
      parent: {
        en: 'Keep baby upright after feeding and burp gently. Offer smaller, more frequent feeds if needed.',
        sw: 'Mweke mtoto wima baada ya kulisha na mbembeleze kwa upole. Toa malisho madogo, ya mara kwa mara kama inahitajika.',
      },
      prevention: {
        en: 'Avoid overfeeding; ensure safe preparation if expressed milk used.',
        sw: 'Epuka kulisha kupita kiasi; hakikisha maandalizi salama kama maziwa yaliyokamwa yanatumika.',
      },
      whenToRefer: {
        en: 'Seek care urgently for green/bloody vomit or if baby seems very unwell.',
        sw: 'Tafuta huduma haraka kwa kutapika kijani/damu au kama mtoto anaonekana mgonjwa sana.',
      },
    },
  },
  {
    id: 'q-0-6m-nut-3',
    ageGroup: '0-6m',
    category: 'nutrition',
    orderIndex: 13,
    text: {
      en: 'Is the infant receiving only breast milk or given formula top-ups?',
      sw: 'Je, mtoto anapokea maziwa ya mama pekee au anapewa maziwa ya ziada ya formula?',
    },
    answers: {
      green: { en: 'No formula milk needed for top-up while exclusively feeding', sw: 'Hakuna maziwa ya formula yanayohitajika kwa kuongeza wakati wa kunyonyesha pekee' },
      yellow: { en: 'Little formula required while exclusively breastfed', sw: 'Formula kidogo inahitajika wakati ananyonya pekee' },
      orange: { en: 'Hot climate with fussiness but still feeding; consider counseling', sw: 'Hali ya joto na usumbufu lakini bado analisha; zingatia ushauri' },
      red: { en: 'Refuses to breast/formula feed; signs of dehydration', sw: 'Anakataa kunyonya/formula; dalili za upungufu wa maji' },
    },
    guidance: {
      chw: 'Reinforce exclusive breastfeeding; counsel against teas/juices; assess hydration if diarrhea/fever.',
      parent: {
        en: 'Under 6 months, breast milk is enough. Extra water or juices are not needed and can be unsafe.',
        sw: 'Chini ya miezi 6, maziwa ya mama yanatosha. Maji ya ziada au juisi hazihitajiki na zinaweza kuwa hatari.',
      },
      prevention: {
        en: 'Promote safe water practices for caregivers; exclusive breastfeeding to 6 months.',
        sw: 'Himiza mazoea salama ya maji kwa walezi; kunyonyesha pekee hadi miezi 6.',
      },
      whenToRefer: {
        en: 'Refer if baby shows dehydration or refuses feeds.',
        sw: 'Peleka hospitali kama mtoto anaonyesha upungufu wa maji au anakataa kulishwa.',
      },
    },
  },
  {
    id: 'q-0-6m-nut-4',
    ageGroup: '0-6m',
    category: 'nutrition',
    orderIndex: 14,
    text: {
      en: 'Does the infant refuse one breast or feed less on one side? Is there pain or discomfort during breastfeeding?',
      sw: 'Je, mtoto anakataa titi moja au ananyonya kidogo upande mmoja? Kuna maumivu au usumbufu wakati wa kunyonyesha?',
    },
    answers: {
      green: { en: 'Breastfeeding comfortably on both breasts', sw: 'Ananyonya kwa raha kwenye matiti yote mawili' },
      yellow: { en: 'Occasional preference; overall feeding well and gaining; mild nipple pain', sw: 'Upendeleo wa mara kwa mara; kwa ujumla analisha vizuri na anaongezeka; maumivu kidogo ya chuchu' },
      orange: { en: 'Persistent refusal but takes the other side; moderate nipple pain; swelling', sw: 'Kukataa kunaendelea lakini anachukua upande mwingine; maumivu ya wastani ya chuchu; kuvimba' },
      red: { en: 'Refusal to breastfeed from both nipples, severe nipple pain, obvious breast swelling', sw: 'Kukataa kunyonya kutoka chuchu zote mbili, maumivu makali ya chuchu, kuvimba kwa titi dhahiri' },
    },
    guidance: {
      chw: 'Assess for latch, pain, oral thrush, ear pain; screen for torticollis; provide lactation support.',
      parent: {
        en: 'Try different positions and start on the preferred breast, then switch. Feed in a quiet, calm place.',
        sw: 'Jaribu nafasi tofauti na anza na titi linalopendelewa, kisha badilisha. Lisha mahali pa utulivu.',
      },
      prevention: {
        en: 'Check for oral thrush; encourage frequent, calm feeds; track weight.',
        sw: 'Angalia ukungu wa kinywa; himiza malisho ya mara kwa mara, ya utulivu; fuatilia uzito.',
      },
      whenToRefer: {
        en: 'Go for assessment if refusal persists or baby is not gaining weight.',
        sw: 'Nenda kupimwa kama kukataa kunaendelea au mtoto haongezeki uzito.',
      },
    },
  },
  {
    id: 'q-0-6m-nut-5',
    ageGroup: '0-6m',
    category: 'nutrition',
    orderIndex: 15,
    text: {
      en: 'Has the infant gained weight steadily along the growth chart?',
      sw: 'Je, mtoto ameongezeka uzito sawasawa kwenye chati ya ukuaji?',
    },
    answers: {
      green: { en: 'Steady weight gain along the growth chart; alert and active', sw: 'Kuongezeka uzito sawasawa kwenye chati ya ukuaji; macho na hai' },
      yellow: { en: 'Weight gain slower than expected; misses feeds', sw: 'Kuongezeka uzito polepole kuliko ilivyotarajiwa; anakosa malisho' },
      orange: { en: 'Weight loss or crossing down growth lines', sw: 'Kupoteza uzito au kushuka mistari ya ukuaji' },
      red: { en: 'Swelling/oedema/wasting', sw: 'Kuvimba/uvimbe/kudhoofika' },
    },
    guidance: {
      chw: 'Plot weight-for-age; assess feeding technique and maternal well-being; screen for illness; manage undernutrition early.',
      parent: {
        en: 'Bring the child health card to each visit to check weight. Feed often and ask for help if feeding is difficult.',
        sw: 'Leta kadi ya afya ya mtoto kwa kila ziara kuangalia uzito. Lisha mara kwa mara na omba msaada kama kulisha ni vigumu.',
      },
      prevention: {
        en: 'Monthly growth monitoring; maternal nutrition and hydration support.',
        sw: 'Ufuatiliaji wa ukuaji kila mwezi; msaada wa lishe na maji kwa mama.',
      },
      whenToRefer: {
        en: 'Refer if weight gain is poor or weight is dropping.',
        sw: 'Peleka hospitali kama kuongezeka uzito ni vibaya au uzito unashuka.',
      },
    },
  },

  // ============================================
  // AGE GROUP: 6-24 MONTHS
  // ============================================

  // --- Health (6-24 months) ---
  {
    id: 'q-6-24m-health-1',
    ageGroup: '6-24m',
    category: 'health',
    orderIndex: 1,
    text: {
      en: 'Does the child have fever? For how long? Is the child drinking and playing normally?',
      sw: 'Je, mtoto ana homa? Kwa muda gani? Je, mtoto anakunywa na kucheza kawaida?',
    },
    answers: {
      green: { en: 'No fever, active/playful', sw: 'Hakuna homa, hai/anacheza' },
      yellow: { en: 'Short fever with mild cold; active; drinking', sw: 'Homa fupi na mafua kidogo; hai; anakunywa' },
      orange: { en: 'Fever ≥38°C for >24 hours; reduced play; decreased appetite', sw: 'Homa ≥38°C kwa >masaa 24; kucheza kidogo; hamu kidogo' },
      red: { en: 'Very sleepy, convulsions, stiff neck, severe dehydration, or breathing difficulty', sw: 'Usingizi sana, degedege, shingo ngumu, upungufu mkubwa wa maji, au shida ya kupumua' },
    },
    guidance: {
      chw: 'Use IMCI to assess fever source; test for malaria in endemic zones; check urine/ear/throat as indicated.',
      parent: {
        en: 'Give plenty of fluids and continue breastfeeding/feeding. In malaria areas, a test at a health center helps find the cause. Go sooner if your child seems worse.',
        sw: 'Toa maji mengi na endelea kunyonyesha/kulisha. Katika maeneo ya malaria, kipimo katika kituo cha afya husaidia kupata sababu. Nenda mapema kama mtoto wako anaonekana mbaya.',
      },
      prevention: {
        en: 'Use insecticide-treated nets nightly; ensure vaccinations up to date.',
        sw: 'Tumia chandarua chenye dawa kila usiku; hakikisha chanjo ziko sawa.',
      },
      whenToRefer: {
        en: 'Refer if fever lasts >1 day, >38°C, child is very sleepy, or has breathing problems.',
        sw: 'Peleka hospitali kama homa inakaa >siku 1, >38°C, mtoto ana usingizi sana, au ana shida za kupumua.',
      },
    },
  },
  {
    id: 'q-6-24m-health-2',
    ageGroup: '6-24m',
    category: 'health',
    orderIndex: 2,
    text: {
      en: 'Is the child coughing or breathing fast? Any chest indrawing or noisy breathing?',
      sw: 'Je, mtoto anakohoa au kupumua haraka? Kuna kuvutwa kwa kifua au kupumua kwa kelele?',
    },
    answers: {
      green: { en: 'Occasional cough, no fast breathing; active; feeding well', sw: 'Kikohozi kidogo, hapumui haraka; hai; analisha vizuri' },
      yellow: { en: 'Mild cough/cold', sw: 'Kikohozi/mafua kidogo' },
      orange: { en: 'Cough >2 weeks or fast breathing without distress; mild chest indrawing when upset', sw: 'Kikohozi >wiki 2 au kupumua haraka bila dhiki; kuvutwa kidogo kwa kifua akisumbuka' },
      red: { en: 'Fast breathing with chest indrawing at rest, grunting, cyanosis, or inability to drink', sw: 'Kupumua haraka na kuvutwa kwa kifua akipumzika, kukoroma, cyanosis, au kushindwa kunywa' },
    },
    guidance: {
      chw: 'Count respiratory rate per age; assess hypoxia; classify per IMCI; give first dose antibiotic if pneumonia suspected.',
      parent: {
        en: 'Keep your child comfortable and away from smoke. Offer fluids often and seek care if breathing looks hard or ribs pull in.',
        sw: 'Mweke mtoto wako vizuri na mbali na moshi. Toa maji mara kwa mara na tafuta huduma kama kupumua kunaonekana ngumu au mbavu zinavutwa.',
      },
      prevention: {
        en: 'Reduce indoor smoke; PCV/pertussis vaccine adherence.',
        sw: 'Punguza moshi ndani ya nyumba; kufuata chanjo ya PCV/pertussis.',
      },
      whenToRefer: {
        en: 'Refer urgently if breathing is fast or difficult.',
        sw: 'Peleka haraka hospitali kama kupumua ni haraka au kwa shida.',
      },
    },
  },
  {
    id: 'q-6-24m-health-3',
    ageGroup: '6-24m',
    category: 'health',
    orderIndex: 3,
    text: {
      en: 'Does the child have diarrhea? How many times per day? Any blood or dehydration signs?',
      sw: 'Je, mtoto ana kuharisha? Mara ngapi kwa siku? Kuna damu au dalili za upungufu wa maji?',
    },
    answers: {
      green: { en: 'No loose stools; feeding well', sw: 'Hakuna kinyesi laini; analisha vizuri' },
      yellow: { en: '3-4 loose stools/day', sw: 'Kinyesi laini 3-4/siku' },
      orange: { en: 'Many watery stools; thirst; dry mouth; fewer wet nappies', sw: 'Kinyesi cha maji mengi; kiu; kinywa kavu; nepi chache za mvua' },
      red: { en: 'Blood in stool, sunken eyes, lethargy, drinks poorly or vomits everything', sw: 'Damu kwenye kinyesi, macho yaliyozama, uchovu, anakunywa vibaya au anatapika kila kitu' },
    },
    guidance: {
      chw: 'Assess dehydration; ORS Plan A/B; zinc 20 mg/day (6-59 months); test for malaria if fever; antibiotics for dysentery.',
      parent: {
        en: 'Give ORS after each loose stool and continue feeding. Give zinc for 10-14 days if provided by a health worker.',
        sw: 'Toa ORS baada ya kila kinyesi laini na endelea kulisha. Toa zinc kwa siku 10-14 kama imetolewa na mhudumu wa afya.',
      },
      prevention: {
        en: 'Safe water, handwashing with soap, clean feeding utensils.',
        sw: 'Maji salama, kunawa mikono na sabuni, vyombo safi vya kulisha.',
      },
      whenToRefer: {
        en: 'Refer if there is blood in stool or signs of dehydration.',
        sw: 'Peleka hospitali kama kuna damu kwenye kinyesi au dalili za upungufu wa maji.',
      },
    },
  },
  {
    id: 'q-6-24m-health-4',
    ageGroup: '6-24m',
    category: 'health',
    orderIndex: 4,
    text: {
      en: 'Does the child have ear pain or discharge? For how long? Any fever or swelling behind the ear?',
      sw: 'Je, mtoto ana maumivu ya sikio au kutoka maji? Kwa muda gani? Kuna homa au kuvimba nyuma ya sikio?',
    },
    answers: {
      green: { en: 'No ear tugging, no ear discharge, no fever', sw: 'Hakuna kuvuta sikio, hakuna maji kutoka sikioni, hakuna homa' },
      yellow: { en: 'Brief tugging with a cold', sw: 'Kuvuta kidogo na mafua' },
      orange: { en: 'Ear pain with fever or discharge but child playful', sw: 'Maumivu ya sikio na homa au kutoka maji lakini mtoto anacheza' },
      red: { en: 'Severe pain, swelling behind ear, high fever, or child very ill', sw: 'Maumivu makali, kuvimba nyuma ya sikio, homa kali, au mtoto mgonjwa sana' },
    },
    guidance: {
      chw: 'Assess for AOM/otorrhea; treat pain/fever; antibiotics per guidelines if AOM; topical therapy for chronic suppurative otitis media.',
      parent: {
        en: 'Keep the ear dry and do not insert objects. Seek care for pain or any discharge.',
        sw: 'Weka sikio kavu na usiingize vitu. Tafuta huduma kwa maumivu au kutoka maji yoyote.',
      },
      prevention: {
        en: 'Avoid bottle propping; keep nose clean; follow-up if discharge persists.',
        sw: 'Epuka kusimamisha chupa; weka pua safi; fuatilia kama kutoka maji kunaendelea.',
      },
      whenToRefer: {
        en: 'Go for care within 24 hours for ear pain; urgently if swelling or high fever.',
        sw: 'Nenda kwa huduma ndani ya masaa 24 kwa maumivu ya sikio; haraka kama kuna kuvimba au homa kali.',
      },
    },
  },
  {
    id: 'q-6-24m-health-5',
    ageGroup: '6-24m',
    category: 'health',
    orderIndex: 5,
    text: {
      en: 'Has the child been dewormed recently? Are there signs of worms or poor appetite/weight loss?',
      sw: 'Je, mtoto amepewa dawa ya minyoo hivi karibuni? Kuna dalili za minyoo au hamu mbaya/kupoteza uzito?',
    },
    answers: {
      green: { en: 'No tummy pain/discomfort', sw: 'Hakuna maumivu/usumbufu wa tumbo' },
      yellow: { en: 'Occasional tummy discomfort; otherwise well', sw: 'Usumbufu wa tumbo wa mara kwa mara; vinginevyo yuko vizuri' },
      orange: { en: 'Poor appetite, mild weight loss, visible worms in stool', sw: 'Hamu mbaya, kupoteza uzito kidogo, minyoo inayoonekana kwenye kinyesi' },
      red: { en: 'Severe anemia signs (pale palms), swollen belly, vomiting worms', sw: 'Dalili kali za anemia (viganja vyeupe), tumbo lililovimba, kutapika minyoo' },
    },
    guidance: {
      chw: 'Follow national deworming policy (e.g., albendazole/mebendazole from 12 months; 6- or 12-monthly in high-risk areas). Screen for anemia.',
      parent: {
        en: 'Deworming helps children grow and play better. A health worker can tell you when your child should take the medicine.',
        sw: 'Kupata dawa ya minyoo husaidia watoto kukua na kucheza vizuri. Mhudumu wa afya anaweza kukuambia mtoto wako anapaswa kuchukua dawa lini.',
      },
      prevention: {
        en: 'Handwashing, short nails, safe latrines; promote footwear where hookworm risk exists.',
        sw: 'Kunawa mikono, kucha fupi, vyoo salama; himiza viatu mahali ambapo hatari ya hookworm ipo.',
      },
      whenToRefer: {
        en: 'Go for deworming advice if appetite/weight are poor; urgently if severe symptoms.',
        sw: 'Nenda kwa ushauri wa kupata dawa ya minyoo kama hamu/uzito ni mbaya; haraka kama dalili ni kali.',
      },
    },
  },

  // --- Development (6-24 months) ---
  {
    id: 'q-6-24m-dev-1',
    ageGroup: '6-24m',
    category: 'development',
    orderIndex: 6,
    text: {
      en: 'Can the child stand with support or walk alone appropriate for age?',
      sw: 'Je, mtoto anaweza kusimama na msaada au kutembea peke yake kulingana na umri?',
    },
    answers: {
      green: { en: 'Stands with support by ~10 months; walks by ~15 months', sw: 'Anasimama na msaada kufikia miezi 10; anatembea kufikia miezi 15' },
      yellow: { en: 'Not walking by 18 months; unusual walking pattern', sw: 'Hatembei kufikia miezi 18; mtindo wa kutembea usio wa kawaida' },
      orange: { en: 'Not bearing weight by 12 months; very stiff/floppy', sw: 'Habeba uzito kufikia miezi 12; mgumu/mwepesi sana' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Examine tone/reflexes; check for rickets/iron deficiency; consider CP/neuromuscular issues; early intervention referral as needed.',
      parent: {
        en: 'Give your child safe space to cruise and practice steps. Hold hands and encourage short walks.',
        sw: 'Mpe mtoto wako nafasi salama ya kusafiri na kufanya mazoezi ya hatua. Shika mikono na himiza kutembea kwa ufupi.',
      },
      prevention: {
        en: 'Sunlight exposure and diet with vitamin D/calcium; safe play areas.',
        sw: 'Kuonyeshwa jua na chakula chenye vitamini D/calcium; maeneo salama ya kucheza.',
      },
      whenToRefer: {
        en: 'Go for assessment if not walking by 18 months or not standing by 12 months.',
        sw: 'Nenda kupimwa kama hatembei kufikia miezi 18 au hasimami kufikia miezi 12.',
      },
    },
  },
  {
    id: 'q-6-24m-dev-2',
    ageGroup: '6-24m',
    category: 'development',
    orderIndex: 7,
    text: {
      en: 'Does the child respond to name and use simple words for age?',
      sw: 'Je, mtoto anajibu jina lake na kutumia maneno rahisi kwa umri wake?',
    },
    answers: {
      green: { en: 'Says a few single words by 12-15 months; follows simple commands by ~18 months', sw: 'Anasema maneno machache kufikia miezi 12-15; anafuata amri rahisi kufikia miezi 18' },
      yellow: { en: 'No single words by 18 months; limited understanding; few gestures', sw: 'Hakuna maneno moja kufikia miezi 18; uelewa mdogo; ishara chache' },
      orange: { en: 'No response to name/sound; no babble by 12 months; regression of skills', sw: 'Hakuna majibu kwa jina/sauti; hakuna kupayuka kufikia miezi 12; kurudi nyuma kwa ujuzi' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Screen hearing; assess language and social communication; check for chronic ear disease; refer for speech/hearing evaluation.',
      parent: {
        en: 'Talk, sing, and read simple picture books daily. Use short, clear phrases and name everyday objects.',
        sw: 'Ongea, imba, na soma vitabu vya picha rahisi kila siku. Tumia maneno mafupi, wazi na taja vitu vya kila siku.',
      },
      prevention: {
        en: 'Limit screen time; increase caregiver-child interaction and book sharing.',
        sw: 'Punguza muda wa skrini; ongeza maingiliano ya mlezi-mtoto na kushiriki vitabu.',
      },
      whenToRefer: {
        en: 'Refer if no words by 18 months or no response to sound.',
        sw: 'Peleka hospitali kama hakuna maneno kufikia miezi 18 au hakuna majibu kwa sauti.',
      },
    },
  },
  {
    id: 'q-6-24m-dev-3',
    ageGroup: '6-24m',
    category: 'development',
    orderIndex: 8,
    text: {
      en: 'Does the child play, imitate, and explore toys or people around them?',
      sw: 'Je, mtoto anacheza, anaiga, na kuchunguza toys au watu karibu naye?',
    },
    answers: {
      green: { en: 'Imitates actions; explores; brings objects to show', sw: 'Anaiga vitendo; anachunguza; analeta vitu kuonyesha' },
      yellow: { en: 'Limited play variety; prefers repetitive actions only', sw: 'Aina chache za kucheza; anapendelea vitendo vya kurudia tu' },
      orange: { en: 'No interest in people/toys; no eye contact', sw: 'Hakuna hamu kwa watu/toys; hakuna kuwasiliana kwa macho' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Coach responsive caregiving; observe joint attention; screen for ASD if concerns; provide community referral pathways.',
      parent: {
        en: 'Play simple games like rolling a ball, stacking cups, and naming objects. Praise small efforts and make play part of daily routines.',
        sw: 'Cheza michezo rahisi kama kuviringisha mpira, kupanga vikombe, na kutaja vitu. Sifu juhudi ndogo na fanya kucheza kuwa sehemu ya ratiba za kila siku.',
      },
      prevention: {
        en: 'Daily playtime; simple homemade toys; encourage other children\'s play.',
        sw: 'Wakati wa kucheza kila siku; toys rahisi za nyumbani; himiza kucheza kwa watoto wengine.',
      },
      whenToRefer: {
        en: 'Seek assessment if child avoids interaction or stops doing skills they had.',
        sw: 'Tafuta tathmini kama mtoto anaepuka maingiliano au anaacha kufanya ujuzi aliokuwa nao.',
      },
    },
  },
  {
    id: 'q-6-24m-dev-4',
    ageGroup: '6-24m',
    category: 'development',
    orderIndex: 9,
    text: {
      en: 'Does the child use both hands equally to grasp, feed, and stack objects?',
      sw: 'Je, mtoto anatumia mikono yote miwili sawa kushika, kulisha, na kupanga vitu?',
    },
    answers: {
      green: { en: 'Feeds self with fingers; stacks 2-3 blocks by ~18 months', sw: 'Anajilisha na vidole; anapanga vizuizi 2-3 kufikia miezi 18' },
      yellow: { en: 'Messy feeding; drops objects often; limited pincer grasp by 12-15 months', sw: 'Kulisha kwa fujo; anadondosha vitu mara kwa mara; kushika kwa vidole kulidhoofishwa kufikia miezi 12-15' },
      orange: { en: 'Avoids using one hand entirely; no purposeful grasp by 12 months', sw: 'Anaepuka kutumia mkono mmoja kabisa; hakuna kushika kwa makusudi kufikia miezi 12' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess fine motor skills; check vision; address hemiparesis; provide early therapy advice.',
      parent: {
        en: 'Offer soft finger foods and let your child practice. Give safe cups and blocks for practice.',
        sw: 'Toa vyakula laini vya vidole na mwache mtoto wako afanye mazoezi. Toa vikombe na vizuizi salama kwa mazoezi.',
      },
      prevention: {
        en: 'Encourage self-feeding; provide cups/spoons suited to small hands.',
        sw: 'Himiza kujilisha; toa vikombe/vijiko vinavyofaa mikono midogo.',
      },
      whenToRefer: {
        en: 'Go for assessment if hand use is very limited or clearly one-sided.',
        sw: 'Nenda kupimwa kama matumizi ya mkono ni mdogo sana au ni wazi upande mmoja.',
      },
    },
  },
  {
    id: 'q-6-24m-dev-5',
    ageGroup: '6-24m',
    category: 'development',
    orderIndex: 10,
    text: {
      en: 'Does the child have frequent tantrums, sleep problems, or difficulty calming down?',
      sw: 'Je, mtoto ana hasira za mara kwa mara, shida za usingizi, au ugumu wa kutulia?',
    },
    answers: {
      green: { en: 'Short tantrums; calms with comfort; normal separation protest', sw: 'Hasira fupi; anatulia kwa faraja; kupinga kutengana kwa kawaida' },
      yellow: { en: 'Frequent long tantrums; sleep problems; biting/hitting often', sw: 'Hasira ndefu za mara kwa mara; shida za usingizi; kuuma/kupiga mara kwa mara' },
      orange: { en: 'Hurts self/others seriously; loss of skills; no response to comfort', sw: 'Anajidhuru/wengine sana; kupoteza ujuzi; hakuna majibu kwa faraja' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess for sleep, nutrition, family stressors; coach positive parenting; rule out iron deficiency or neurodevelopmental disorders.',
      parent: {
        en: 'Keep routines steady, offer choices, and praise calm behavior. Comfort your child during new situations.',
        sw: 'Weka ratiba imara, toa chaguo, na sifu tabia ya utulivu. Mtulize mtoto wako wakati wa hali mpya.',
      },
      prevention: {
        en: 'Regular routines; outdoor play; avoid harsh discipline.',
        sw: 'Ratiba za kawaida; kucheza nje; epuka nidhamu kali.',
      },
      whenToRefer: {
        en: 'Seek care if behavior is severe, persistent, or skills regress.',
        sw: 'Tafuta huduma kama tabia ni kali, inaendelea, au ujuzi unarudi nyuma.',
      },
    },
  },

  // --- Nutrition & Feeding (6-24 months) ---
  {
    id: 'q-6-24m-nut-1',
    ageGroup: '6-24m',
    category: 'nutrition',
    orderIndex: 11,
    text: {
      en: 'Has the child started complementary foods at 6 months? What types and how often?',
      sw: 'Je, mtoto ameanza vyakula vya nyongeza kufikia miezi 6? Aina gani na mara ngapi?',
    },
    answers: {
      green: { en: 'Start at 6 months with soft mashed foods while continuing breastfeeding', sw: 'Anza kufikia miezi 6 na vyakula laini vilivyosagwa huku ukiendelea kunyonyesha' },
      yellow: { en: 'Started before 6 months or delayed after 6 months; limited variety', sw: 'Ilianza kabla ya miezi 6 au ilicheleweshwa baada ya miezi 6; aina chache' },
      orange: { en: 'Not starting solids by 9 months; choking episodes; weight faltering', sw: 'Haijaanza vyakula vigumu kufikia miezi 9; kukaba; uzito unashuka' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Counsel on frequency, diversity, and texture; continue breastfeeding; manage feeding difficulties; monitor growth closely.',
      parent: {
        en: 'Begin with soft porridge, mashed vegetables, beans, and small amounts of animal-source foods if available. Offer 2-3 meals/day plus snacks.',
        sw: 'Anza na uji laini, mboga zilizosagwa, maharage, na kiasi kidogo cha vyakula vya wanyama kama vinapatikana. Toa milo 2-3/siku pamoja na vitafunio.',
      },
      prevention: {
        en: 'Add oil/groundnuts/egg to increase energy; use clean utensils.',
        sw: 'Ongeza mafuta/karanga/mayai kuongeza nishati; tumia vyombo safi.',
      },
      whenToRefer: {
        en: 'Go for counseling if solids are not started by 9 months or weight drops.',
        sw: 'Nenda kwa ushauri kama vyakula vigumu havijaanzishwa kufikia miezi 9 au uzito unashuka.',
      },
    },
  },
  {
    id: 'q-6-24m-nut-2',
    ageGroup: '6-24m',
    category: 'nutrition',
    orderIndex: 12,
    text: {
      en: 'Is the child eating a variety of foods? Are there feeding difficulties or refusal?',
      sw: 'Je, mtoto anakula vyakula mbalimbali? Kuna shida za kulisha au kukataa?',
    },
    answers: {
      green: { en: 'Good appetite daily; steady weight gain/growth', sw: 'Hamu nzuri kila siku; kuongezeka uzito/ukuaji sawasawa' },
      yellow: { en: 'Appetite varies day to day; growth steady', sw: 'Hamu inabadilika siku hadi siku; ukuaji sawasawa' },
      orange: { en: 'Prefers few foods; refuses new textures; slow meals', sw: 'Anapendelea vyakula vichache; anakataa textures mpya; milo polepole' },
      red: { en: 'Persistent refusal with weight loss or illness signs', sw: 'Kukataa kunaendelea na kupoteza uzito au dalili za ugonjwa' },
    },
    guidance: {
      chw: 'Assess for anemia, oral problems, or illness; provide responsive feeding counseling; consider micronutrient supplementation per policy.',
      parent: {
        en: 'Offer small portions often and eat together. Keep mealtimes calm and try foods many times in different ways.',
        sw: 'Toa sehemu ndogo mara kwa mara na kula pamoja. Weka nyakati za milo utulivu na jaribu vyakula mara nyingi kwa njia tofauti.',
      },
      prevention: {
        en: 'Regular growth checks; iron-rich foods (beans, eggs, meat if available).',
        sw: 'Ukaguzi wa ukuaji wa kawaida; vyakula vyenye chuma (maharage, mayai, nyama kama inapatikana).',
      },
      whenToRefer: {
        en: 'Seek care if poor intake lasts >1 week or weight is dropping.',
        sw: 'Tafuta huduma kama ulaji mbaya unakaa >wiki 1 au uzito unashuka.',
      },
    },
  },
  {
    id: 'q-6-24m-nut-3',
    ageGroup: '6-24m',
    category: 'nutrition',
    orderIndex: 13,
    text: {
      en: 'How many meals and snacks does the child eat daily? Are portions age-appropriate?',
      sw: 'Mtoto anakula milo na vitafunio vingapi kwa siku? Je, sehemu zinafaa kwa umri?',
    },
    answers: {
      green: { en: '6-8 months: 2-3 meals + 1-2 snacks; 9-24 months: 3-4 meals + 1-2 snacks', sw: 'Miezi 6-8: milo 2-3 + vitafunio 1-2; miezi 9-24: milo 3-4 + vitafunio 1-2' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Too few meals; mostly thin porridge; little protein', sw: 'Milo michache sana; uji mwepesi zaidi; protini kidogo' },
      red: { en: 'Refuses most foods; visible wasting or edema', sw: 'Anakataa vyakula vingi; kudhoofika kunaonekana au uvimbe' },
    },
    guidance: {
      chw: 'Reinforce age-appropriate frequency and portion sizes; encourage animal-source foods where possible; monitor growth.',
      parent: {
        en: 'Offer meals at regular times and include varied foods. Continue breastfeeding on demand.',
        sw: 'Toa milo kwa nyakati za kawaida na ujumuishe vyakula mbalimbali. Endelea kunyonyesha anapotaka.',
      },
      prevention: {
        en: 'Keep a simple meal schedule posted at home; include fruits/vegetables daily.',
        sw: 'Weka ratiba rahisi ya milo imebandikwa nyumbani; jumuisha matunda/mboga kila siku.',
      },
      whenToRefer: {
        en: 'Go for assessment if eating very little with weight loss.',
        sw: 'Nenda kupimwa kama anakula kidogo sana na kupoteza uzito.',
      },
    },
  },
  {
    id: 'q-6-24m-nut-4',
    ageGroup: '6-24m',
    category: 'nutrition',
    orderIndex: 14,
    text: {
      en: 'Does the child eat iron-rich foods like beans, greens, eggs, or meat when available?',
      sw: 'Je, mtoto anakula vyakula vyenye chuma kama maharage, mboga za majani, mayai, au nyama vinapopatikana?',
    },
    answers: {
      green: { en: 'Eats diverse diet including beans, dark greens, eggs; active and playful', sw: 'Anakula chakula cha aina mbalimbali ikiwa ni pamoja na maharage, mboga za majani meusi, mayai; hai na anacheza' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Mostly starches; pale palms; gets tired easily', sw: 'Wanga zaidi; viganja vyeupe; anachoka kwa urahisi' },
      red: { en: 'Very pale, weak, swollen feet, or breathless', sw: 'Mweupe sana, dhaifu, miguu iliyovimba, au kupumua kwa shida' },
    },
    guidance: {
      chw: 'Screen for anemia; treat per protocol (iron, deworming); counsel on diet and malaria prevention in endemic zones.',
      parent: {
        en: 'Offer beans, peas, lentils, dark green leaves, eggs, and meat/fish if available. Give vitamin C foods (oranges, tomatoes) with meals.',
        sw: 'Toa maharage, njegere, dengu, majani meusi, mayai, na nyama/samaki kama inapatikana. Toa vyakula vya vitamini C (machungwa, nyanya) na milo.',
      },
      prevention: {
        en: 'Deworming as per policy; malaria prevention; iron-rich foods routinely.',
        sw: 'Kupata dawa ya minyoo kulingana na sera; kuzuia malaria; vyakula vyenye chuma mara kwa mara.',
      },
      whenToRefer: {
        en: 'Go for testing if your child is very pale, weak, or not improving with better diet.',
        sw: 'Nenda kupimwa kama mtoto wako ni mweupe sana, dhaifu, au haboresheji na chakula bora.',
      },
    },
  },
  {
    id: 'q-6-24m-nut-5',
    ageGroup: '6-24m',
    category: 'nutrition',
    orderIndex: 15,
    text: {
      en: 'Does the child drink excessive milk that replaces other foods?',
      sw: 'Je, mtoto anakunywa maziwa mengi yanayochukua nafasi ya vyakula vingine?',
    },
    answers: {
      green: { en: '1-2 cups/day along with solid foods; eats varied diet', sw: 'Vikombe 1-2/siku pamoja na vyakula vigumu; anakula chakula cha aina mbalimbali' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Milk replaces meals; constipation; picky eating worsens', sw: 'Maziwa yanachukua nafasi ya milo; kuvimbiwa; kuchagua chakula kunazidi' },
      red: { en: 'Vomiting after any food/drink with dehydration', sw: 'Kutapika baada ya chakula/kinywaji chochote na upungufu wa maji' },
    },
    guidance: {
      chw: 'Counsel to limit excess milk to avoid iron deficiency and appetite suppression; assess for lactose intolerance or allergy if symptoms.',
      parent: {
        en: 'Milk can be part of the diet, but meals and snacks are also needed. Offer milk after meals, not before.',
        sw: 'Maziwa yanaweza kuwa sehemu ya chakula, lakini milo na vitafunio pia vinahitajika. Toa maziwa baada ya milo, si kabla.',
      },
      prevention: {
        en: 'Promote balanced meals first; brush teeth twice daily.',
        sw: 'Himiza milo yenye usawa kwanza; piga mswaki mara mbili kwa siku.',
      },
      whenToRefer: {
        en: 'Seek care if child relies mostly on milk or reacts to milk.',
        sw: 'Tafuta huduma kama mtoto anategemea zaidi maziwa au anaathirika na maziwa.',
      },
    },
  },

  // ============================================
  // AGE GROUP: 2-5 YEARS
  // ============================================

  // --- Health (2-5 years) ---
  {
    id: 'q-2-5y-health-1',
    ageGroup: '2-5y',
    category: 'health',
    orderIndex: 1,
    text: {
      en: 'Does the child have frequent coughs or colds? Are there breathing difficulties or prolonged coughs?',
      sw: 'Je, mtoto ana kikohozi au mafua ya mara kwa mara? Kuna shida za kupumua au kikohozi cha muda mrefu?',
    },
    answers: {
      green: { en: 'No coughs, no breathing difficulties', sw: 'Hakuna kikohozi, hakuna shida za kupumua' },
      yellow: { en: 'Several mild colds/year; recovers in a few days; active', sw: 'Mafua kadhaa kidogo/mwaka; anapona kwa siku chache; hai' },
      orange: { en: 'Cough >3 weeks; wheeze with play; night cough', sw: 'Kikohozi >wiki 3; kupumua kwa shida akicheza; kikohozi cha usiku' },
      red: { en: 'Breathing difficulty, chest indrawing, high fever, lethargy', sw: 'Shida ya kupumua, kuvutwa kwa kifua, homa kali, uchovu' },
    },
    guidance: {
      chw: 'Assess for chronic cough, asthma, TB exposure; measure RR, SpO2; treat per IMCI; refer if severe.',
      parent: {
        en: 'Most children get colds. Give fluids and rest and keep away from smoke. Seek care if breathing becomes fast or the cough does not settle.',
        sw: 'Watoto wengi hupata mafua. Toa maji na pumziko na uweke mbali na moshi. Tafuta huduma kama kupumua kunakuwa haraka au kikohozi hakitulia.',
      },
      prevention: {
        en: 'Avoid smoke; ensure vaccines current; seek TB screening if exposure.',
        sw: 'Epuka moshi; hakikisha chanjo ziko sawa; tafuta uchunguzi wa TB kama kuna kuonyeshwa.',
      },
      whenToRefer: {
        en: 'Refer if cough lasts >2-3 weeks or breathing is hard.',
        sw: 'Peleka hospitali kama kikohozi kinakaa >wiki 2-3 au kupumua ni vigumu.',
      },
    },
  },
  {
    id: 'q-2-5y-health-2',
    ageGroup: '2-5y',
    category: 'health',
    orderIndex: 2,
    text: {
      en: 'Does the child hear and see clearly during daily activities?',
      sw: 'Je, mtoto anasikia na kuona wazi wakati wa shughuli za kila siku?',
    },
    answers: {
      green: { en: 'Sees well and hears well', sw: 'Anaona vizuri na anasikia vizuri' },
      yellow: { en: 'Turns up sound; squints or sits very near; bumps into objects', sw: 'Anaongeza sauti; anakaza macho au anakaa karibu sana; anagongana na vitu' },
      orange: { en: '', sw: '' },
      red: { en: 'No response to loud sounds; frequent falls; eye crossing/white reflex', sw: 'Hakuna majibu kwa sauti kubwa; kuanguka mara kwa mara; macho yanakutana/mwangaza mweupe' },
    },
    guidance: {
      chw: 'Screen hearing and vision; check ears for wax/chronic infection; red reflex; refer to audiology/ophthalmology if needed.',
      parent: {
        en: 'Watch how your child responds to voices and objects. Visit a health center if they struggle to hear or see clearly.',
        sw: 'Angalia jinsi mtoto wako anavyojibu sauti na vitu. Tembelea kituo cha afya kama wanashindana kusikia au kuona wazi.',
      },
      prevention: {
        en: 'Treat ear infections early; keep screening at school entry.',
        sw: 'Tibu maambukizi ya masikio mapema; endelea na uchunguzi wakati wa kuingia shuleni.',
      },
      whenToRefer: {
        en: 'Go for auditory/vision assessment if vision/hearing problems are present.',
        sw: 'Nenda kwa tathmini ya kusikia/kuona kama shida za kuona/kusikia zipo.',
      },
    },
  },
  {
    id: 'q-2-5y-health-3',
    ageGroup: '2-5y',
    category: 'health',
    orderIndex: 3,
    text: {
      en: 'Has the child been dewormed? Are there signs of worms or anemia?',
      sw: 'Je, mtoto amepewa dawa ya minyoo? Kuna dalili za minyoo au anemia?',
    },
    answers: {
      green: { en: 'Recently dewormed', sw: 'Amepewa dawa ya minyoo hivi karibuni' },
      yellow: { en: 'Occasional tummy aches; otherwise well', sw: 'Maumivu ya tumbo ya mara kwa mara; vinginevyo yuko vizuri' },
      orange: { en: 'Passing many worms', sw: 'Anatoa minyoo mingi' },
      red: { en: 'Very pale (dizziness, fainting); swollen belly; severe pain', sw: 'Mweupe sana (kizunguzungu, kuzimia); tumbo lililovimba; maumivu makali' },
    },
    guidance: {
      chw: 'Follow national deworming schedule; treat anemia; counsel hygiene and footwear; consider schistosomiasis risk by locale.',
      parent: {
        en: 'Deworming helps children grow. Teach handwashing and use of latrines. Go for advice if appetite is poor or belly is swollen.',
        sw: 'Kupata dawa ya minyoo husaidia watoto kukua. Fundisha kunawa mikono na kutumia vyoo. Nenda kwa ushauri kama hamu ni mbaya au tumbo limevimba.',
      },
      prevention: {
        en: 'Regular handwashing; nails short; safe toilets; footwear where needed.',
        sw: 'Kunawa mikono mara kwa mara; kucha fupi; vyoo salama; viatu mahali inapohitajika.',
      },
      whenToRefer: {
        en: 'Refer for deworming guidance; urgently if severe symptoms.',
        sw: 'Peleka hospitali kwa ushauri wa kupata dawa ya minyoo; haraka kama dalili ni kali.',
      },
    },
  },
  {
    id: 'q-2-5y-health-4',
    ageGroup: '2-5y',
    category: 'health',
    orderIndex: 4,
    text: {
      en: 'Does the child appear unusually tired, pale, or weak during play?',
      sw: 'Je, mtoto anaonekana amechoka sana, mweupe, au dhaifu wakati wa kucheza?',
    },
    answers: {
      green: { en: 'Active most days; normal sleep and play', sw: 'Hai siku nyingi; usingizi na kucheza kwa kawaida' },
      yellow: { en: '', sw: '' },
      orange: { en: 'Tires easily; pale palms; frequent infections', sw: 'Anachoka kwa urahisi; viganja vyeupe; maambukizi ya mara kwa mara' },
      red: { en: 'Very weak, breathless, swollen feet, or weight loss', sw: 'Dhaifu sana, kupumua kwa shida, miguu iliyovimba, au kupoteza uzito' },
    },
    guidance: {
      chw: 'Evaluate for anemia, undernutrition, chronic illness; check diet diversity; deworm; manage per findings.',
      parent: {
        en: 'Offer regular meals and sleep routines. Seek care if your child looks pale or becomes weak.',
        sw: 'Toa milo ya kawaida na ratiba za usingizi. Tafuta huduma kama mtoto wako anaonekana mweupe au anakuwa dhaifu.',
      },
      prevention: {
        en: 'Iron-rich foods and deworming per policy; growth monitoring.',
        sw: 'Vyakula vyenye chuma na kupata dawa ya minyoo kulingana na sera; ufuatiliaji wa ukuaji.',
      },
      whenToRefer: {
        en: 'Refer if fatigue is persistent or severe.',
        sw: 'Peleka hospitali kama uchovu unaendelea au ni mkali.',
      },
    },
  },
  {
    id: 'q-2-5y-health-5',
    ageGroup: '2-5y',
    category: 'health',
    orderIndex: 5,
    text: {
      en: 'Does the child have tooth pain, cavities, or difficulty eating?',
      sw: 'Je, mtoto ana maumivu ya meno, mashimo, au shida ya kula?',
    },
    answers: {
      green: { en: 'No tooth pain, no cavities, brushes teeth, eats well', sw: 'Hakuna maumivu ya meno, hakuna mashimo, anapiga mswaki, anakula vizuri' },
      yellow: { en: 'Small spots, poor brushing of teeth, mild pain', sw: 'Madoa madogo, kupiga mswaki vibaya, maumivu kidogo' },
      orange: { en: 'Tooth pain when eating; visible cavities; bad breath', sw: 'Maumivu ya meno wakati wa kula; mashimo yanayoonekana; pumzi mbaya' },
      red: { en: 'Facial swelling, fever, spreading infection or inability to eat', sw: 'Kuvimba uso, homa, maambukizi yanayosambaa au kushindwa kula' },
    },
    guidance: {
      chw: 'Provide fluoride toothpaste advice; assess for dental caries; analgesia/antibiotics only if infection; refer to dental services.',
      parent: {
        en: 'Brush teeth twice daily and limit sugary drinks and snacks. Visit a clinic if a tooth hurts or a hole is seen.',
        sw: 'Piga mswaki mara mbili kwa siku na punguza vinywaji na vitafunio vyenye sukari. Tembelea kliniki kama jino linaumia au shimo linaonekana.',
      },
      prevention: {
        en: 'Rinse after sweets; schedule routine dental checks if available.',
        sw: 'Suuza baada ya pipi; panga ukaguzi wa kawaida wa meno kama unapatikana.',
      },
      whenToRefer: {
        en: 'Go to a dental/health center if pain persists or there is swelling/fever.',
        sw: 'Nenda kituo cha meno/afya kama maumivu yanaendelea au kuna kuvimba/homa.',
      },
    },
  },

  // --- Development (2-5 years) ---
  {
    id: 'q-2-5y-dev-1',
    ageGroup: '2-5y',
    category: 'development',
    orderIndex: 6,
    text: {
      en: 'Can the child speak in short sentences and be understood by caregivers?',
      sw: 'Je, mtoto anaweza kuongea kwa sentensi fupi na kueleweka na walezi?',
    },
    answers: {
      green: { en: 'Understood by familiar people; speaks short sentences by 3-4 years', sw: 'Anaeleweka na watu wanaofahamika; anaongea sentensi fupi kufikia miaka 3-4' },
      yellow: { en: 'Often hard to understand at 4 years; limited vocabulary', sw: 'Mara nyingi ni vigumu kuelewa akiwa na miaka 4; msamiati mdogo' },
      orange: { en: 'Not speaking in sentences; cannot follow simple instructions', sw: 'Haongei kwa sentensi; hawezi kufuata maagizo rahisi' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess hearing; screen language/articulation; check for chronic ear disease; refer for speech-language therapy as available.',
      parent: {
        en: 'Talk face-to-face and give time to answer. Read picture books and repeat new words in daily routines.',
        sw: 'Ongea uso kwa uso na toa muda wa kujibu. Soma vitabu vya picha na rudia maneno mapya katika ratiba za kila siku.',
      },
      prevention: {
        en: 'Limit background noise; regular conversation and book sharing.',
        sw: 'Punguza kelele za nyuma; mazungumzo ya kawaida na kushiriki vitabu.',
      },
      whenToRefer: {
        en: 'Go for assessment if speech is unclear at 4 years or understanding is poor.',
        sw: 'Nenda kupimwa kama hotuba haiko wazi akiwa na miaka 4 au uelewa ni mdogo.',
      },
    },
  },
  {
    id: 'q-2-5y-dev-2',
    ageGroup: '2-5y',
    category: 'development',
    orderIndex: 7,
    text: {
      en: 'Does the child play and interact with others appropriately for age?',
      sw: 'Je, mtoto anacheza na kuingiliana na wengine kulingana na umri?',
    },
    answers: {
      green: { en: 'Parallel play at 3 years; begins cooperative play by 4-5 years', sw: 'Kucheza sambamba akiwa na miaka 3; anaanza kucheza kwa ushirikiano kufikia miaka 4-5' },
      yellow: { en: 'Prefers to be alone; limited pretend play; rigid routines', sw: 'Anapendelea kuwa peke yake; kucheza kwa kujifanya kunakopunguzwa; ratiba ngumu' },
      orange: { en: 'No eye contact; no interest in peers; repetitive behaviors with distress', sw: 'Hakuna kuwasiliana kwa macho; hakuna hamu kwa wenzake; tabia za kurudia na dhiki' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Screen for ASD; observe joint attention and social reciprocity; coach caregivers on social play; refer to developmental services.',
      parent: {
        en: 'Invite simple games with other children and model sharing. Keep routines but allow small changes.',
        sw: 'Alika michezo rahisi na watoto wengine na onyesha kushiriki. Weka ratiba lakini ruhusu mabadiliko madogo.',
      },
      prevention: {
        en: 'Daily outdoor play with peers; reduce screen time; praise sharing.',
        sw: 'Kucheza nje kila siku na wenzake; punguza muda wa skrini; sifu kushiriki.',
      },
      whenToRefer: {
        en: 'Seek assessment if social interaction is very limited or causes distress.',
        sw: 'Tafuta tathmini kama maingiliano ya kijamii ni madogo sana au yanasababisha dhiki.',
      },
    },
  },
  {
    id: 'q-2-5y-dev-3',
    ageGroup: '2-5y',
    category: 'development',
    orderIndex: 8,
    text: {
      en: 'Is the child toilet trained during the day? Any frequent accidents?',
      sw: 'Je, mtoto amefunzwa kutumia choo wakati wa mchana? Kuna ajali za mara kwa mara?',
    },
    answers: {
      green: { en: 'Daytime trained by ~3 years; night wetting may continue up to 5 years', sw: 'Amefunzwa wakati wa mchana kufikia miaka 3; kulowa usiku kunaweza kuendelea hadi miaka 5' },
      yellow: { en: 'Frequent daytime accidents at 4 years; constipation', sw: 'Ajali za mchana za mara kwa mara akiwa na miaka 4; kuvimbiwa' },
      orange: { en: 'Painful urination, blood, persistent incontinence after 5 years', sw: 'Kukojoa kwa maumivu, damu, kushindwa kujizuia kunaendelea baada ya miaka 5' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess constipation/UTI; support behavioral toilet training; investigate if neurological signs.',
      parent: {
        en: 'Take your child to the toilet regularly and praise small successes. Avoid punishment for accidents.',
        sw: 'Peleka mtoto wako chooni mara kwa mara na sifu mafanikio madogo. Epuka adhabu kwa ajali.',
      },
      prevention: {
        en: 'Adequate fiber/water; scheduled toilet times; calm routine.',
        sw: 'Nyuzinyuzi/maji ya kutosha; nyakati zilizopangwa za choo; ratiba tulivu.',
      },
      whenToRefer: {
        en: 'Go for assessment if accidents are frequent or painful urination occurs.',
        sw: 'Nenda kupimwa kama ajali ni za mara kwa mara au kukojoa kwa maumivu kunatokea.',
      },
    },
  },
  {
    id: 'q-2-5y-dev-4',
    ageGroup: '2-5y',
    category: 'development',
    orderIndex: 9,
    text: {
      en: 'Does the child have difficulty focusing or sitting quietly during simple tasks?',
      sw: 'Je, mtoto ana ugumu wa kuzingatia au kukaa kimya wakati wa kazi rahisi?',
    },
    answers: {
      green: { en: 'Short attention span improves with age; can follow simple rules', sw: 'Umakini mfupi unaboresheka na umri; anaweza kufuata sheria rahisi' },
      yellow: { en: 'Very distractible at home and preschool; disrupts play', sw: 'Anakengeushwa sana nyumbani na shule ya awali; anavuruga kucheza' },
      orange: { en: 'Unsafe impulsivity; aggression; loss of skills', sw: 'Msukumo usio salama; ukatili; kupoteza ujuzi' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess sleep/nutrition; observe across settings; coach positive behavior strategies; consider neurodevelopmental evaluation if impairment.',
      parent: {
        en: 'Use short, clear instructions and break tasks into small steps. Give active play time outdoors daily.',
        sw: 'Tumia maagizo mafupi, wazi na gawanya kazi katika hatua ndogo. Toa wakati wa kucheza hai nje kila siku.',
      },
      prevention: {
        en: 'Consistent routines; positive attention; limit sugary drinks and screen time.',
        sw: 'Ratiba thabiti; umakini chanya; punguza vinywaji vyenye sukari na muda wa skrini.',
      },
      whenToRefer: {
        en: 'Seek care if behavior affects safety or learning.',
        sw: 'Tafuta huduma kama tabia inaathiri usalama au kujifunza.',
      },
    },
  },
  {
    id: 'q-2-5y-dev-5',
    ageGroup: '2-5y',
    category: 'development',
    orderIndex: 10,
    text: {
      en: 'Can the child follow simple instructions, name objects, and engage in learning play?',
      sw: 'Je, mtoto anaweza kufuata maagizo rahisi, kutaja vitu, na kushiriki kucheza kwa kujifunza?',
    },
    answers: {
      green: { en: 'Can name objects, colors; follows 2-step commands; draws simple shapes', sw: 'Anaweza kutaja vitu, rangi; anafuata amri za hatua 2; anachora maumbo rahisi' },
      yellow: { en: 'Struggles with simple instructions; limited interest in books', sw: 'Anashindana na maagizo rahisi; hamu ndogo kwa vitabu' },
      orange: { en: 'Loses skills or cannot understand simple language', sw: 'Anapoteza ujuzi au hawezi kuelewa lugha rahisi' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Promote early literacy/numeracy through play; screen hearing/vision; address developmental delays.',
      parent: {
        en: 'Read and talk about pictures daily. Let your child draw and sort objects by color and size.',
        sw: 'Soma na ongea kuhusu picha kila siku. Mwache mtoto wako achore na apange vitu kwa rangi na ukubwa.',
      },
      prevention: {
        en: 'Daily story time; simple counting games; praise efforts.',
        sw: 'Wakati wa hadithi kila siku; michezo rahisi ya kuhesabu; sifu juhudi.',
      },
      whenToRefer: {
        en: 'Seek assessment if understanding or skills decline.',
        sw: 'Tafuta tathmini kama uelewa au ujuzi unapungua.',
      },
    },
  },

  // --- Nutrition & Feeding (2-5 years) ---
  {
    id: 'q-2-5y-nut-1',
    ageGroup: '2-5y',
    category: 'nutrition',
    orderIndex: 11,
    text: {
      en: 'Does the child eat three meals and healthy snacks daily? Any feeding issues?',
      sw: 'Je, mtoto anakula milo mitatu na vitafunio vyenye afya kila siku? Kuna shida za kulisha?',
    },
    answers: {
      green: { en: 'Appetite varies; growth steady; active', sw: 'Hamu inabadilika; ukuaji sawasawa; hai' },
      yellow: { en: 'Small portions for many days; limited variety', sw: 'Sehemu ndogo kwa siku nyingi; aina chache' },
      orange: { en: 'Refuses most foods; weight loss or illness signs', sw: 'Anakataa vyakula vingi; kupoteza uzito au dalili za ugonjwa' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Assess diet diversity and illness; screen for anemia; provide responsive feeding counseling.',
      parent: {
        en: 'Offer small meals and healthy snacks. Eat together and keep mealtimes calm and regular.',
        sw: 'Toa milo midogo na vitafunio vyenye afya. Kula pamoja na weka nyakati za milo utulivu na za kawaida.',
      },
      prevention: {
        en: '3 meals + 2 snacks daily; include protein, vegetables, and fruit.',
        sw: 'Milo 3 + vitafunio 2 kila siku; jumuisha protini, mboga, na matunda.',
      },
      whenToRefer: {
        en: 'Go for assessment if poor intake lasts >3-4 days or weight drops.',
        sw: 'Nenda kupimwa kama ulaji mbaya unakaa >siku 3-4 au uzito unashuka.',
      },
    },
  },
  {
    id: 'q-2-5y-nut-2',
    ageGroup: '2-5y',
    category: 'nutrition',
    orderIndex: 12,
    text: {
      en: 'Does the child eat foods from all main groups: staples, protein, vegetables, and fruit?',
      sw: 'Je, mtoto anakula vyakula kutoka makundi yote makuu: vyakula vikuu, protini, mboga, na matunda?',
    },
    answers: {
      green: { en: 'Eats from all groups: staple, legumes, vegetables, fruit, animal-source if available', sw: 'Anakula kutoka makundi yote: vyakula vikuu, kunde, mboga, matunda, vya wanyama kama vinapatikana' },
      yellow: { en: 'Eats from all groups: staple, legumes, vegetables, fruit, animal-source if available', sw: 'Anakula kutoka makundi yote: vyakula vikuu, kunde, mboga, matunda, vya wanyama kama vinapatikana' },
      orange: { en: 'Only porridge/tea; visible wasting/edema', sw: 'Uji/chai tu; kudhoofika/uvimbe unaoonekana' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Counsel on food groups and portions; address affordability with local options; monitor growth.',
      parent: {
        en: 'Give 3 meals and 2 snacks with different foods and colors. Add beans, eggs, or fish/meat if available.',
        sw: 'Toa milo 3 na vitafunio 2 na vyakula tofauti na rangi. Ongeza maharage, mayai, au samaki/nyama kama inapatikana.',
      },
      prevention: {
        en: 'Add a spoon of oil or groundnuts to increase energy; safe food hygiene.',
        sw: 'Ongeza kijiko cha mafuta au karanga kuongeza nishati; usafi salama wa chakula.',
      },
      whenToRefer: {
        en: 'Seek care if weight is dropping or child seems weak.',
        sw: 'Tafuta huduma kama uzito unashuka au mtoto anaonekana dhaifu.',
      },
    },
  },
  {
    id: 'q-2-5y-nut-3',
    ageGroup: '2-5y',
    category: 'nutrition',
    orderIndex: 13,
    text: {
      en: 'Does the child consume sugary foods or drinks frequently, replacing main meals?',
      sw: 'Je, mtoto anakula vyakula au vinywaji vyenye sukari mara kwa mara, kuchukua nafasi ya milo mikuu?',
    },
    answers: {
      green: { en: 'Occasional treats; regular brushing; meals not replaced by sweets', sw: 'Vitamu vya mara kwa mara; kupiga mswaki kwa kawaida; milo haichukuliwi nafasi na pipi' },
      yellow: { en: 'Frequent sweets; refuses meals; dental spots', sw: 'Pipi za mara kwa mara; anakataa milo; madoa ya meno' },
      orange: { en: 'Severe tooth decay, pain, or infection; poor eating', sw: 'Kuoza kwa meno sana, maumivu, au maambukizi; kula vibaya' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Counsel on caries prevention and nutrition; address appetite suppression by sugary drinks; refer to dental if caries or pain.',
      parent: {
        en: 'Limit sugary drinks and juices. Offer water and milk and keep sweets as small occasional treats.',
        sw: 'Punguza vinywaji vyenye sukari na juisi. Toa maji na maziwa na weka pipi kama vitamu vidogo vya mara kwa mara.',
      },
      prevention: {
        en: 'Brush teeth twice daily with fluoride toothpaste; routine dental checks if available.',
        sw: 'Piga mswaki mara mbili kwa siku na dawa ya meno yenye fluoride; ukaguzi wa kawaida wa meno kama unapatikana.',
      },
      whenToRefer: {
        en: 'Go to a health/dental center if teeth hurt or eating is affected.',
        sw: 'Nenda kituo cha afya/meno kama meno yanaumia au kula kunaathirika.',
      },
    },
  },
  {
    id: 'q-2-5y-nut-4',
    ageGroup: '2-5y',
    category: 'nutrition',
    orderIndex: 14,
    text: {
      en: 'Does the child drink one to two cups of milk daily with meals, not replacing other foods?',
      sw: 'Je, mtoto anakunywa vikombe moja hadi viwili vya maziwa kila siku na milo, bila kuchukua nafasi ya vyakula vingine?',
    },
    answers: {
      green: { en: 'About 1-2 cups/day with meals; eats varied foods', sw: 'Karibu vikombe 1-2/siku na milo; anakula vyakula mbalimbali' },
      yellow: { en: 'Milk before meals reduces appetite; constipation occurs', sw: 'Maziwa kabla ya milo yanapunguza hamu; kuvimbiwa kunatokea' },
      orange: { en: 'Only milk diet; poor growth; vomiting/diarrhea after milk', sw: 'Chakula cha maziwa tu; ukuaji mbaya; kutapika/kuharisha baada ya maziwa' },
      red: { en: '', sw: '' },
    },
    guidance: {
      chw: 'Limit excess milk to prevent iron deficiency and poor intake; assess for intolerance/allergy if symptoms; diversify diet.',
      parent: {
        en: 'Serve milk after meals, not before. Encourage water between meals.',
        sw: 'Toa maziwa baada ya milo, si kabla. Himiza maji kati ya milo.',
      },
      prevention: {
        en: 'Prioritize balanced meals; iron-rich foods daily.',
        sw: 'Weka kipaumbele milo yenye usawa; vyakula vyenye chuma kila siku.',
      },
      whenToRefer: {
        en: 'Seek care if child relies mostly on milk or reacts to milk.',
        sw: 'Tafuta huduma kama mtoto anategemea zaidi maziwa au anaathirika na maziwa.',
      },
    },
  },
  {
    id: 'q-2-5y-nut-5',
    ageGroup: '2-5y',
    category: 'nutrition',
    orderIndex: 15,
    text: {
      en: 'Has the child lost weight or failed to gain recently? Any swelling or fatigue?',
      sw: 'Je, mtoto amepoteza uzito au ameshindwa kuongezeka hivi karibuni? Kuna kuvimba au uchovu?',
    },
    answers: {
      green: { en: 'Active and playful; eating varied foods; stable growth line', sw: 'Hai na anacheza; anakula vyakula mbalimbali; mstari wa ukuaji imara' },
      yellow: { en: 'Slightly underweight; clothes looser; recent illness', sw: 'Uzito mdogo kidogo; nguo zimelegea; ugonjwa wa hivi karibuni' },
      orange: { en: 'Weight loss', sw: 'Kupoteza uzito' },
      red: { en: 'Swelling (edema), or very weak', sw: 'Kuvimba (uvimbe), au dhaifu sana' },
    },
    guidance: {
      chw: 'Assess for acute/chronic malnutrition (MUAC/WHZ); deworm; check anemia/infections; provide nutrition support and follow-up.',
      parent: {
        en: 'Offer extra meals and add energy-dense foods like oil, groundnuts, eggs, or beans. Encourage frequent small portions.',
        sw: 'Toa milo ya ziada na ongeza vyakula vyenye nishati kama mafuta, karanga, mayai, au maharage. Himiza sehemu ndogo za mara kwa mara.',
      },
      prevention: {
        en: 'Regular growth monitoring and prompt illness treatment.',
        sw: 'Ufuatiliaji wa ukuaji wa kawaida na matibabu ya haraka ya ugonjwa.',
      },
      whenToRefer: {
        en: 'Refer for assessment if weight is falling or swelling appears.',
        sw: 'Peleka hospitali kupimwa kama uzito unashuka au kuvimba kunaonekana.',
      },
    },
  },
];

/**
 * Get questions filtered by age group
 */
export function getQuestionsForAgeGroup(ageGroup: AgeGroup): Question[] {
  return QUESTIONS.filter((q) => q.ageGroup === ageGroup).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );
}

/**
 * Get questions filtered by age group and category
 */
export function getQuestionsByCategory(
  ageGroup: AgeGroup,
  category: Category
): Question[] {
  return QUESTIONS.filter(
    (q) => q.ageGroup === ageGroup && q.category === category
  ).sort((a, b) => a.orderIndex - b.orderIndex);
}

/**
 * Get a specific question by ID
 */
export function getQuestionById(id: string): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

/**
 * Get total question count for an age group
 */
export function getQuestionCount(ageGroup: AgeGroup): number {
  return QUESTIONS.filter((q) => q.ageGroup === ageGroup).length;
}
