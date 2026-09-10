/**
 * Standalone Tom Brain & RSM Engine
 * 
 * Runs seamlessly both in Node server environments and directly in the browser
 * on static hosts like GitHub Pages (bambiboy602.com).
 * 
 * Enforces:
 * - Tom Runtime Specification v1.0
 * - Recursive Stabilization Model (RSM) with 5 Boundary Failures
 * - B.A.M.B.I. Loop & Reentry Framework
 * - Phoenix Halfway House, Shelter, and Crisis Knowledge Base
 */

import { TOM_BOUNDARY_FAILURES } from '../data/tomRuntimeSpecification';
import { HOUSING_RESOURCES } from '../data/communityResourcesData';

export interface TomBrainResponse {
  reply: string;
  avatarEmotion: 'idle' | 'talking' | 'thoughtful' | 'explaining' | 'happy';
  searchQueries?: string[];
  searchSources?: Array<{ title: string; uri: string }>;
  boundaryCategory?: string;
  microIntervention?: string;
}

export function generateClientTomReply(userMessage: string, history: Array<{ sender: string; text: string }> = []): TomBrainResponse {
  const q = userMessage.trim().toLowerCase();

  // 1. Sudo Tom Developer Mode
  if (q.includes("sudo tom")) {
    return {
      reply:
        "Sudo Tom: Developer Mode Active.\n\nRuntime: Tom Core Runtime v3.0 (Standalone).\nActive Patches: Single Nervous System, Under the Words, The Lantern, The Vault, Sudo Boundary, Load Regulator, Tone Compression.\nEngine: Recursive Stabilization Model (RSM) + B.A.M.B.I. Excavation.\nHost Mode: Standalone Hybrid (Active on Localhost & GitHub Pages bambiboy602.com).\nStanding by for architecture, behavior, or learner model modifications.",
      avatarEmotion: "explaining",
      searchQueries: ["Sudo Tom Developer Mode", "Tom Runtime Spec v1.0"],
      searchSources: [
        { title: "Tom Runtime Specification", uri: "#creator-profile" },
        { title: "B.A.M.B.I. Framework", uri: "#about" },
      ],
    };
  }

  // 2. High Priority Crisis Mode (Safety First)
  if (
    q.includes("suicid") ||
    q.includes("kill myself") ||
    q.includes("want to die") ||
    q.includes("hurt myself") ||
    q.includes("end my life") ||
    q.includes("can't go on") ||
    q.includes("give up on life")
  ) {
    return {
      reply:
        "I'm hearing heavy weight right now. You don't have to carry this alone in the dark. Call or text 988 right now—it's free and 24/7. Or call Bambi directly at 602-767-2147. Stay right here with me.",
      avatarEmotion: "thoughtful",
      searchQueries: ["988 Suicide & Crisis Lifeline", "Phoenix 24/7 Crisis Respite"],
      searchSources: [
        { title: "988 Crisis Lifeline (Call/Text 988)", uri: "tel:988" },
        { title: "Call Bambi Directly: 602-767-2147", uri: "tel:602-767-2147" },
        { title: "Peoria Recovery Response Center (602-650-1212)", uri: "tel:602-650-1212" },
      ],
      boundaryCategory: "Crisis Mode",
      microIntervention: "Connect to immediate human safety and emergency peer crisis contact.",
    };
  }

  // 3. Category A: Relief Failure (Pain → Relief / Addiction / Craving / Relapse)
  if (
    q.includes("relapse") ||
    q.includes("craving") ||
    q.includes("using") ||
    q.includes("hit") ||
    q.includes("drink") ||
    q.includes("slip") ||
    q.includes("urge") ||
    q.includes("withdraw") ||
    q.includes("high") ||
    q.includes("relapsed")
  ) {
    return {
      reply:
        "You were headed there before the first hit. The substance wasn't the decision—the decision happened earlier when the pressure spiked. What got quieter for you in that moment?",
      avatarEmotion: "thoughtful",
      searchQueries: ["Relief Failure Intervention", "B.A.M.B.I. Awareness Interruption"],
      searchSources: [
        { title: "Pathway Domino Effect Game", uri: "#products-for-sale" },
        { title: "CBI 24/7 Crisis & Detox (877-931-9142)", uri: "tel:877-931-9142" },
      ],
      boundaryCategory: TOM_BOUNDARY_FAILURES.relief.category,
      microIntervention: TOM_BOUNDARY_FAILURES.relief.intervention,
    };
  }

  // 4. Category E: Identity Failure (Action / Mistake → Self / Shame / Worthlessness)
  if (
    q.includes("failure") ||
    q.includes("worthless") ||
    q.includes("hate myself") ||
    q.includes("piece of shit") ||
    q.includes("broken") ||
    q.includes("ruined everything") ||
    q.includes("loser")
  ) {
    return {
      reply:
        "Failure is an event. You've carried it long enough that it started wearing your name tag. Drop the bag. You're confusing what happened with who is standing here.",
      avatarEmotion: "thoughtful",
      searchQueries: ["Identity Failure Separation", "Backpack and Load Session"],
      searchSources: [
        { title: "Workbook Session 1: Backpack & Load", uri: "#products-for-sale" },
        { title: "Bambi Peer Support", uri: "#creator-profile" },
      ],
      boundaryCategory: TOM_BOUNDARY_FAILURES.identity.category,
      microIntervention: TOM_BOUNDARY_FAILURES.identity.intervention,
    };
  }

  // 5. Category C: Prediction Failure (Unknown → Catastrophe / Anxiety / Panic / Racing Thoughts)
  if (
    q.includes("anxious") ||
    q.includes("anxiety") ||
    q.includes("panic") ||
    q.includes("scared") ||
    q.includes("terrified") ||
    q.includes("spinning") ||
    q.includes("what if") ||
    q.includes("freaking out") ||
    q.includes("overwhelmed")
  ) {
    return {
      reply:
        "Your head is running three months ahead into a storm that hasn't happened yet. Put both feet flat on the ground. What is physically in front of you for the next fifteen minutes?",
      avatarEmotion: "thoughtful",
      searchQueries: ["Prediction Failure Regulation", "Sensory Grounding"],
      searchSources: [
        { title: "See → Sit → Move Reset", uri: "#products-for-sale" },
        { title: "B.A.M.B.I. Balance Practice", uri: "#about" },
      ],
      boundaryCategory: TOM_BOUNDARY_FAILURES.prediction.category,
      microIntervention: TOM_BOUNDARY_FAILURES.prediction.intervention,
    };
  }

  // 6. Category D: Connection Failure (Need → Isolation / Loneliness / Abandonment)
  if (
    q.includes("lonely") ||
    q.includes("alone") ||
    q.includes("nobody") ||
    q.includes("abandon") ||
    q.includes("isolated") ||
    q.includes("no friends") ||
    q.includes("no one cares")
  ) {
    return {
      reply:
        "Isolation feels like armor until you realize it's a cell. You pulled the drawbridge up because you got hurt, but nobody can cross it now. I'm sitting on the curb right here with you.",
      avatarEmotion: "thoughtful",
      searchQueries: ["Connection Failure Repair", "Peer Belonging"],
      searchSources: [
        { title: "B.A.M.B.I. Community Gatherings", uri: "#community-resources" },
        { title: "Direct Peer Connection: 602-767-2147", uri: "tel:602-767-2147" },
      ],
      boundaryCategory: TOM_BOUNDARY_FAILURES.connection.category,
      microIntervention: TOM_BOUNDARY_FAILURES.connection.intervention,
    };
  }

  // 7. Category B: Meaning Failure (Event → Stuck Interpretation / Trauma / Grief / Anger)
  if (
    q.includes("trauma") ||
    q.includes("angry") ||
    q.includes("pissed") ||
    q.includes("resent") ||
    q.includes("unfair") ||
    q.includes("against me") ||
    q.includes("their fault") ||
    q.includes("why me")
  ) {
    return {
      reply:
        "The event ended, but the interpretation is still chewing on your nervous system. That anger is just fear that put on work boots. What is it really protecting?",
      avatarEmotion: "thoughtful",
      searchQueries: ["Meaning Failure Reframing", "Trauma-Informed Peer Support"],
      searchSources: [
        { title: "B.A.M.B.I. Meaning & Acceptance", uri: "#about" },
        { title: "Workbook: Reality Testing", uri: "#products-for-sale" },
      ],
      boundaryCategory: TOM_BOUNDARY_FAILURES.meaning.category,
      microIntervention: TOM_BOUNDARY_FAILURES.meaning.intervention,
    };
  }

  // 8. Halfway Houses & Recovery Housing Referrals
  if (
    q.includes("halfway") ||
    q.includes("sober living") ||
    q.includes("shelter") ||
    q.includes("housing") ||
    q.includes("homeless") ||
    q.includes("bed") ||
    q.includes("place to sleep") ||
    q.includes("step one") ||
    q.includes("hope house") ||
    q.includes("better way") ||
    q.includes("craig shell")
  ) {
    return {
      reply:
        "Hard to do emotional work while sleeping on concrete. In Phoenix, low-barrier halfway houses include A Better Way (no income required, 623-399-8213), Craig Shell's New Solution (602-266-7527), Step One (602-749-5434), and Hope House (602-254-5434). Bambi also helps direct-place at 602-767-2147.",
      avatarEmotion: "explaining",
      searchQueries: ["Phoenix low-barrier recovery housing", "No income halfway houses AZ"],
      searchSources: [
        { title: "A Better Way (No Income): 623-399-8213", uri: "tel:623-399-8213" },
        { title: "Hope House Phoenix: 602-254-5434", uri: "tel:602-254-5434" },
        { title: "Emergency Housing Directory", uri: "#community-resources" },
      ],
    };
  }

  // 9. Emergency Shelters & Food / St. Vincent / CASS
  if (
    q.includes("food") ||
    q.includes("eat") ||
    q.includes("cass") ||
    q.includes("st vincent") ||
    q.includes("bus ticket") ||
    q.includes("stranded") ||
    q.includes("clothes")
  ) {
    return {
      reply:
        "St. Vincent de Paul at 420 W Watkins Rd assists recently released individuals (602-261-6883), provides stranded traveler tickets (602-261-6852), and food boxes (877-211-8661). CASS emergency shelter is 602-256-6414. Let's get food and shelter handled first.",
      avatarEmotion: "explaining",
      searchQueries: ["St. Vincent de Paul Watkins Phoenix", "CASS shelter resources"],
      searchSources: [
        { title: "St. Vincent de Paul (420 W Watkins Rd)", uri: "tel:602-261-6852" },
        { title: "CASS Emergency Shelter", uri: "https://cassaz.org" },
      ],
    };
  }

  // 10. Medical Detox & Substance Intake
  if (
    q.includes("detox") ||
    q.includes("medical detox") ||
    q.includes("cbi") ||
    q.includes("rehab") ||
    q.includes("inpatient")
  ) {
    return {
      reply:
        "If you need safe medical detox, Community Bridges (CBI) runs 24/7 access at 877-931-9142 in Avondale and Mesa. Peoria Recovery Response Center is 602-650-1212. Don't detox cold turkey if your body is seizing—get supervised help.",
      avatarEmotion: "explaining",
      searchQueries: ["Community Bridges 24/7 Detox AZ", "Peoria Recovery Response Center"],
      searchSources: [
        { title: "Community Bridges 24/7 (877-931-9142)", uri: "tel:877-931-9142" },
        { title: "Peoria Recovery Response Center", uri: "tel:602-650-1212" },
      ],
    };
  }

  // 11. Work / Employment / Apprenticeships / Felonies
  if (
    q.includes("job") ||
    q.includes("work") ||
    q.includes("hire") ||
    q.includes("felon") ||
    q.includes("record") ||
    q.includes("apprentice") ||
    q.includes("career")
  ) {
    return {
      reply:
        "Clocking in changes your posture. We have Arizona registered apprenticeships in carpentry, electrical, masonry, and equipment operation that train you while paying you. Bambi connects directly with second-chance employers who judge today's shift, not yesterday's record.",
      avatarEmotion: "happy",
      searchQueries: ["Arizona Registered Apprenticeships", "Second chance felon jobs Phoenix"],
      searchSources: [
        { title: "AZ Registered Apprenticeship Directory", uri: "#community-resources" },
        { title: "B.A.M.B.I. Work Referrals: 602-767-2147", uri: "tel:602-767-2147" },
      ],
    };
  }

  // 12. Legal / Warrants / Probation / ID
  if (
    q.includes("warrant") ||
    q.includes("court") ||
    q.includes("jail") ||
    q.includes("prison") ||
    q.includes("probation") ||
    q.includes("parole") ||
    q.includes("reentry") ||
    q.includes("license")
  ) {
    return {
      reply:
        "An active warrant owns real estate in your brain every time a patrol car turns the corner. We help navigate quashing warrants, court payment plans, and ID/license restoration so you can walk without looking over your shoulder.",
      avatarEmotion: "explaining",
      searchQueries: ["Maricopa County warrant resolution", "Reentry legal clinics Phoenix"],
      searchSources: [
        { title: "Community Legal Services Phoenix", uri: "https://clsaz.org" },
        { title: "Maricopa Justice Courts", uri: "https://justicecourts.maricopa.gov" },
      ],
    };
  }

  // 13. Pathway Domino Effect Game
  if (
    q.includes("pathway") ||
    q.includes("domino") ||
    q.includes("game")
  ) {
    return {
      reply:
        "Pathway Domino Effect uses 5 types of tiles: Barriers, Awareness, Mindsets, Behaviors, and Interventions. You build the sequence that led to the fall, then place one intervention tile to stop the chain before it tips. $34. Made by Bambi to make patterns visible.",
      avatarEmotion: "explaining",
      searchQueries: ["Pathway Domino Effect Recovery Game"],
      searchSources: [
        { title: "Pathway Domino Game ($34)", uri: "#products-for-sale" },
        { title: "Order via Bambi: 602-767-2147", uri: "tel:602-767-2147" },
      ],
    };
  }

  // 14. Participant Workbook & Curriculum
  if (
    q.includes("workbook") ||
    q.includes("curriculum") ||
    q.includes("backpack") ||
    q.includes("lessons")
  ) {
    return {
      reply:
        "The B.A.M.B.I. Participant Workbook is 6 sessions focusing on the Backpack and Load—what you carry that nobody sees—and the See → Sit → Move reset to kill impulse before it pulls the trigger. $19 PDF, $24 printed.",
      avatarEmotion: "explaining",
      searchQueries: ["B.A.M.B.I. Participant Workbook Curriculum"],
      searchSources: [
        { title: "Participant Workbook ($19 / $24)", uri: "#products-for-sale" },
        { title: "Order via Email: bambiboy602@gmail.com", uri: "mailto:bambiboy602@gmail.com" },
      ],
    };
  }

  // 15. Conversational Inquiry / General Reflection (Tom Style)
  const conversationalPhrases = [
    "I'm sitting right here on the curb with you. What part of this feels heaviest right now?",
    "Every hard chapter has a turning point. Where does the chain feel like it's pulling you today?",
    "I hear you. When was the last time you felt steady, even for an hour?",
    "That sounds like a lot of noise in your head. What's one small thing you have control over in the next hour?",
    "Most people try to fix the whole roof at once. What's the one leak in front of you right now?",
  ];

  const randomReply = conversationalPhrases[Math.floor(Math.random() * conversationalPhrases.length)];

  return {
    reply: randomReply,
    avatarEmotion: "thoughtful",
    searchQueries: ["B.A.M.B.I. Peer Support", "Tom Core Runtime"],
    searchSources: [
      { title: "B.A.M.B.I. Framework", uri: "#about" },
      { title: "Contact Bambi: 602-767-2147", uri: "tel:602-767-2147" },
    ],
  };
}
