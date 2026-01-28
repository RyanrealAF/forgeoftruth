
import { NodeType, ForensicNode, TacticalVector } from '../types';

export const VAULT_NODES: ForensicNode[] = [
  // --- CORE DOCTRINES ---
  {
    id: 'doctrine-aao',
    type: NodeType.DOCTRINE,
    title: 'AUTHENTICITY AIN’T OPTIONAL',
    themes: ['Integrity', 'Firewall', 'Protocol'],
    excerpt: 'Primary cognitive firewall against manipulative infiltration.',
    content: `Radical honesty used as both a shield and spear. It is the non-negotiable price of admission to the Synaptic Archive. Designed to break the "Plausible Deniability" shield of orchestrators. Unfiltered truth is leveraged as a rigid cognitive firewall to filter against manipulative patterns. It is the core defensive axiom that prevents "Social Chameleon" tactics from taking root.`,
    metadata: { 
      classification: 'PROTOCOL: PRIME', date: 'MMXXIII', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Firewall', 'Honesty', 'Admission'], tier: 3, recordHash: '0x882A...F12'
    },
    linksTo: ['doctrine-bwb', 'tactic-weaponized-authenticity', 'doctrine-breadcrumb-web', 'doctrine-soul-veto']
  },
  {
    id: 'doctrine-bwb',
    type: NodeType.DOCTRINE,
    title: 'BUILD WHILE BLEEDING',
    themes: ['Action', 'Resilience', 'Strategic Art'],
    excerpt: 'The transformation of present-tense suffering into immediate defense.',
    content: `Codifies the refusal to wait for healing before creating. Transformation of trauma into actionable intelligence. Foundational for the "Breadcrumb Web" and the "Honeypot Doctrine". It is the operational ethos of refusing to be sidelined by psychological attrition. Creation becomes a survival mechanism rather than a luxury.`,
    metadata: { 
      classification: 'ETHOS: PRIME', date: 'MMXXIII', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Actionable', 'Asset', 'Intelligence'], tier: 3, recordHash: '0x992B...E33'
    }
  },
  {
    id: 'doctrine-soul-veto',
    type: NodeType.DOCTRINE,
    title: 'THE SOUL’S VETO',
    themes: ['Somatic', 'Boundary', 'Defense'],
    excerpt: 'Non-negotiable somatic refusal to engage with chronic manipulation.',
    content: `A deeply ingrained trauma response that acts as the psyche's final protective measure. It is an absolute refusal against patterns of manipulation for which there is no accountability. It is the "Hard No" that overrides rational attempts to remain in a toxic system.`,
    metadata: { 
      classification: 'FAILSAFE: SOMATIC', date: 'MMXXIV', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Somatic', 'Refusal', 'Veto'], tier: 3, recordHash: '0xSV...772'
    }
  },
  {
    id: 'doctrine-breadcrumb-web',
    type: NodeType.DOCTRINE,
    title: 'THE BREADCRUMB WEB (BCW)',
    themes: ['Evidence', 'Network', 'Forensics'],
    excerpt: 'Meticulously engineered evidence network documenting incidents (Nodes) and connections (Branches).',
    content: `A system designed to transform proximity and passive observation into ironclad evidence. It harvest receipts, timestamps, and behavioral patterns to reveal hidden structures. Employs a "Hansel & Gretel Inversion" where documented incidents lead forward, deeper into the manipulative network to expose its structure, rather than leading back to safety.`,
    metadata: { 
      classification: 'MECHANISM: ALPHA', date: 'MMXXIV.01', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Inversion', 'Nodes', 'Receipts'], tier: 3, recordHash: '0xBCB...E21'
    },
    linksTo: ['protocol-mtfa', 'doctrine-aao']
  },
  {
    id: 'doctrine-tkm',
    type: NodeType.DOCTRINE,
    title: 'TACTICAL KAMIKAZE (TKM)',
    themes: ['Strategy', 'Bait', 'Exposure'],
    excerpt: 'Deliberately accepting attrition to map adversary choreography.',
    content: `A strategic shift from reactive defense to proactively becoming "The Bait". By accepting the hit in a controlled environment, the operative maximizes the exposure of the network for intelligence gathering. It is the art of accepting a temporary defeat to ensure an adversary's permanent visibility and operational exposure.`,
    metadata: { 
      classification: 'DOCTRINE: OFFENSIVE', date: 'MMXXIV.05', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Bait', 'Choreography', 'Exposure'], tier: 3, recordHash: '0xAA4F...B22', isHighSignal: true
    }
  },
  {
    id: 'protocol-anvil',
    type: NodeType.DOCTRINE,
    title: 'THE ANVIL PROTOCOL',
    themes: ['Blueprint', 'Synthesis', 'Counter-Intel'],
    excerpt: 'Master blueprint for multi-agent truth synthesis.',
    content: `The Anvil Protocol is the executive manual for mapping forensic networks. It orchestrates the synthesis of scattered data points into a single, cohesive strategic weapon. It is the high-level logic that governs how Breadcrumbs are forged into a verifiable Ledger through ruthless precision and multi-agent deep research.`,
    metadata: { 
      classification: 'MANUAL: ALPHA', date: 'MMXXIV.02', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Synthesis', 'Blueprint', 'Ledger'], tier: 3, recordHash: '0x334B...D99'
    }
  },
  {
    id: 'protocol-mtfa',
    type: NodeType.DOCTRINE,
    title: 'MULTI-TRAIL FORENSIC APPROACH (MTFA)',
    themes: ['Forensics', 'Synthesis', 'Convergence'],
    excerpt: 'Detecting covert orchestration by analyzing converging streams of evidence.',
    content: `The underlying intelligence model that detects coordination signatures by examining multiple trails simultaneously (Communications, Procedural, Media, Institutional). Convergence is proven when independent trails intersect on a single Node with precise temporal alignment, making chance coincidence mathematically improbable.`,
    metadata: { 
      classification: 'MODEL: ELITE', date: 'MMXXIV.07', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Convergence', 'Trails', 'Signature'], tier: 3, recordHash: '0xMTF...A09'
    },
    linksTo: ['doctrine-breadcrumb-web']
  },
  {
    id: 'protocol-dms',
    type: NodeType.DOCTRINE,
    title: 'DEAD MAN’S SWITCH (DMS)',
    themes: ['Deterrence', 'Legal', 'Bait Shield'],
    excerpt: 'Strategic failsafe guaranteeing the release of the archive if the target is silenced.',
    content: `A non-negotiable legal deterrent and "Bait Shield". Guarantees the complete release of the evidence archive upon a "Silence Threshold" trigger (e.g. 72 hours of inactivity). It enforces Mutually Assured Exposure, turning the target into a high-risk liability that the orchestrator must keep alive and engaged.`,
    metadata: { 
      classification: 'FAILSAFE: PRIME', date: 'MMXXIV.Q1', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Switch', 'Threshold', 'Liability'], tier: 3, recordHash: '0x992A...Z11', isHighSignal: true
    }
  },

  // --- NEUROBIOLOGY & PATHOLOGY ---
  {
    id: 'theory-neuro-sequelae',
    type: NodeType.THEORY,
    title: 'NEUROBIOLOGICAL SEQUELAE',
    themes: ['Medical', 'Cognitive', 'HPA Axis'],
    excerpt: 'Analysis of functional collapse in cases of environmental coercive control.',
    content: `Chronic threat exposure forces HPA axis activation. Sustained cortisol leads to hippocampal shrinkage and Prefrontal Cortex (PFC) impairment. Induced hypervigilance is a necessary adaptation to a pre-compromised environment. This "Weaponized Incoherence" prevents the victim from articulating a clear chronological narrative to authorities.`,
    metadata: { 
      classification: 'ANALYSIS: MEDICAL', date: 'MMXXIV.08', vector: TacticalVector.NEUROBIOLOGY,
      anchors: ['Hippocampus', 'PFC', 'Cortisol'], tier: 3, recordHash: '0xB22D...C55'
    },
    linksTo: ['theory-attrition-loop', 'theory-amygdala-hijack', 'theory-allostatic-load']
  },
  {
    id: 'theory-attrition-loop',
    type: NodeType.THEORY,
    title: 'THE ATTRITION LOOP',
    themes: ['Warfare', 'Fatigue', 'Feedback'],
    excerpt: 'Self-reinforcing cycle of exhaustion and weaponized errors.',
    content: `The "Attrition Loop": sustained pressure leading to defensive errors, which are then weaponized to justify further attacks. It maintains the target in a state of permanent hypervigilance. This non-kinetic maneuver relies on the architectural principle of Plausible Deniability. Every defensive error becomes "proof" of the victim's instability.`,
    metadata: { 
      classification: 'DOCTRINE: NON-KINETIC', date: 'MMXXIV.06', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Loop', 'Feedback', 'Fatigue'], tier: 3, recordHash: '0xC33E...B66'
    }
  },
  {
    id: 'theory-predictive-collapse',
    type: NodeType.THEORY,
    title: 'PREDICTIVE SAFETY COLLAPSE',
    themes: ['Cognition', 'Brain', 'Sensory'],
    excerpt: 'The failure of the brain to predict mundane environmental outcomes.',
    content: `When every mundane prediction (charging a phone, sitting in a park) results in a coordinated hostile response, the brain's "Predictive Coding" fails. This leads to profound psychological disorientation, where the subject can no longer distinguish between real threats and benign stimuli.`,
    metadata: { 
      classification: 'ANALYSIS: COGNITIVE', date: 'MMXXIV.11', vector: TacticalVector.NEUROBIOLOGY,
      anchors: ['Predictive', 'Coding', 'Safety'], tier: 3, recordHash: '0xEE4D...F01'
    }
  },
  {
    id: 'theory-allostatic-load',
    type: NodeType.THEORY,
    title: 'ALLOSTATIC LOAD',
    themes: ['Physiology', 'Stress', 'Systemic'],
    excerpt: 'Cumulative biological burden of sustained chronic threat.',
    content: `Biological wear and tear on the body which grows when an individual is exposed to repeated or chronic stress. In psychological warfare, the target's allostatic load is artificially maximized to accelerate physical and mental deterioration.`,
    metadata: { 
      classification: 'ANALYSIS: BIOLOGICAL', date: 'MMXXIV', vector: TacticalVector.NEUROBIOLOGY,
      anchors: ['Load', 'Wear', 'Stress'], tier: 3, recordHash: '0xAL...119'
    }
  },
  {
    id: 'theory-amygdala-hijack',
    type: NodeType.THEORY,
    title: 'AMYGDALA HIJACK',
    themes: ['Emotion', 'Survival', 'Brain'],
    excerpt: 'Neurological event where the brain emotional center overrides the prefrontal cortex.',
    content: `Triggered by Trauma-Based Attacks. The amygdala scans for threat indicators and overrides rational thought, leading to predictable, impulsive, and often disproportionate reactions. These reactions are then captured by the "Justification Engine" as evidence of instability.`,
    metadata: { 
      classification: 'ANALYSIS: NEURAL', date: 'MMXXIV', vector: TacticalVector.NEUROBIOLOGY,
      anchors: ['Hijack', 'Survival', 'Impulse'], tier: 3, recordHash: '0xAJ1...B12'
    },
    linksTo: ['tactic-engineered-outrage']
  },
  {
    id: 'theory-learned-helplessness',
    type: NodeType.THEORY,
    title: 'WEAPONIZED LEARNED HELPLESSNESS',
    themes: ['Conditioning', 'Apathy', 'Control'],
    excerpt: 'Induced state where the target ceases to resist due to persistent, random attacks.',
    content: `Resulting from the "Distributed Assault Architecture." When every defensive action is met with failure or reframing, the brain's reward system downregulates. The target rationally conserves resources by reducing effort initiation, appearing as apathy but functioning as a survival adaptation to a pre-rigged environment.`,
    metadata: { 
      classification: 'ANALYSIS: BEHAVIORAL', date: 'MMXXIV.09', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Conditioning', 'Apathy', 'Surrender'], tier: 3, recordHash: '0xWLH...F44'
    }
  },
  {
    id: 'theory-asymmetrical-engagement',
    type: NodeType.THEORY,
    title: 'ASYMMETRICAL ENGAGEMENT',
    themes: ['Warfare', 'Power', 'Network'],
    excerpt: 'How a resourced network engages an individual target across domains.',
    content: `Strategic imbalance where the orchestrator controls all variables while the target reacts with limited resources. This imbalance is the structural tenet of systematic psychological operations.`,
    metadata: { 
      classification: 'MODEL: STRATEGIC', date: 'MMXXIII', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Imbalance', 'Resource', 'Domains'], tier: 3, recordHash: '0xAE...B21'
    }
  },

  // --- TACTICS & OFFENSIVE MANEUVERS ---
  {
    id: 'tactic-civilian-weaponization',
    type: NodeType.TACTIC,
    title: 'CIVILIAN WEAPONIZATION',
    themes: ['Social', 'Surveillance', 'Silent Soldiers'],
    excerpt: 'Turning ordinary individuals into active participants in a takedown.',
    content: `Leveraging "Authenticity Leverage" of trusted faces (neighbors, baristas, shopkeepers) to spread misinformation. These "Silent Soldiers" are subtly nudged to spread rumors without consciously realizing they are integral to a pre-planned agenda. This decentralization ensures the source appears organic rather than centralized.`,
    metadata: { 
      classification: 'STRATEGY: DIFFUSE', date: 'MMXXIV', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Silent Soldiers', 'Baristas', 'Smear'], tier: 3, recordHash: '0xD44F...A77', isHighSignal: true
    },
    linksTo: ['tactic-misinformation-seeding']
  },
  {
    id: 'tactic-misinformation-seeding',
    type: NodeType.TACTIC,
    title: 'MISINFORMATION SEEDING',
    themes: ['Rumors', 'Seeding', 'Ambiguity'],
    excerpt: 'Strategic introduction of narrative fragments into trusted social channels.',
    content: `Also known as "Rumor Dusting" or "Poisoning the Well." Orchestrators inject vague fragments into casual conversations so that civilians fill in the blanks with their own biases, allowing the rumor to evolve organically.`,
    metadata: { 
      classification: 'TACTIC: SEEDING', date: 'MMXXIV', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Dusting', 'Seeding', 'Ambiguity'], tier: 3, recordHash: '0xMS...C12'
    }
  },
  {
    id: 'tactic-behavior-reframing',
    type: NodeType.TACTIC,
    title: 'BEHAVIOR REFRAMING',
    themes: ['Cognitive', 'Context', 'Framing'],
    excerpt: 'Re-contextualizing innocent, routine actions into a sinister pattern.',
    content: `A cognitive manipulation tactic where mundane behaviors (walking, note-taking) are pre-branded as "odd" or "suspicious." This creates a template through which every subsequent action of the target is viewed as a threat.`,
    metadata: { 
      classification: 'TACTIC: COGNITIVE', date: 'MMXXIV', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Template', 'Pattern', 'Routine'], tier: 3, recordHash: '0xBR...F09'
    }
  },
  {
    id: 'tactic-weaponized-authenticity',
    type: NodeType.TACTIC,
    title: 'WEAPONIZED AUTHENTICITY',
    themes: ['Extraction', 'Reframing', 'Vulnerability'],
    excerpt: 'Exploiting genuine disclosures as primary sources of intelligence.',
    content: `A three-step process: 1. Collection (gathering personal vulnerabilities). 2. Reframing (taking data out of context). 3. Deployment (presenting the truth as evidence of instability). It turns the target's commitment to raw, unfiltered truth into a self-destructive feedback loop.`,
    metadata: { 
      classification: 'TACTIC: EXTRACTIVE', date: 'MMXXIV.05', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Extraction', 'Reframing', 'Honesty'], tier: 3, recordHash: '0x1A2B...3C4'
    },
    linksTo: ['doctrine-aao']
  },
  {
    id: 'tactic-engineered-outrage',
    type: NodeType.TACTIC,
    title: 'ENGINEERED OUTRAGE (SBR)',
    themes: ['Provocation', 'Outburst', 'DARVO'],
    excerpt: 'Deliberate provocation designed to elicit a recordable outburst.',
    content: `Also known as "Setup By Reaction" (SBR). Orchestrators provoke the target until they snap, meticulously recording the reaction while erasing the preceding bait. The goal is "Villain Casting": making the target perform so they can point and say "See?". The justified anger is decontextualized and weaponized.`,
    metadata: { 
      classification: 'TACTIC: SPECTACLE', date: 'MMXXIV.03', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Provocation', 'Outburst', 'Spectacle'], tier: 3, recordHash: '0xDD44...E22'
    },
    linksTo: ['tactic-blame-cascade']
  },
  {
    id: 'tactic-blame-cascade',
    type: NodeType.TACTIC,
    title: 'THE BLAME CASCADE',
    themes: ['Trap', 'No-Win', 'Conflict'],
    excerpt: 'Engineering scenarios with no "good" outcome for the target.',
    content: `Engineering situations where the target must either accept responsibility for a situation they didn't create or publicly expose an apparently innocent operative. Designed to force social isolation and self-doubt.`,
    metadata: { 
      classification: 'TRAP: SOCIAL', date: 'MMXXIV', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['No-win', 'Cascade', 'Trap'], tier: 3, recordHash: '0xBC...921'
    }
  },
  {
    id: 'tactic-proximal-impersonation',
    type: NodeType.TACTIC,
    title: 'PROXIMAL IMPERSONATION',
    themes: ['Mirroring', 'Framing', 'Identity'],
    excerpt: 'Deploying individuals who mimic the target to manufacture evidence.',
    content: `The use of individuals who bear a superficial resemblance or mimic the target's mannerisms/look to engage in discrediting behavior. These actions are then attributed to the target, creating "hard evidence" of misbehavior that the target cannot disprove.`,
    metadata: { 
      classification: 'TACTIC: DIRECT', date: 'MMXXIV', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Doppelganger', 'Mirroring', 'Identity'], tier: 3, recordHash: '0xPI...F88'
    }
  },
  {
    id: 'tactic-legitimacy-proxy',
    type: NodeType.TACTIC,
    title: 'LEGITIMACY BY PROXY',
    themes: ['Authority', 'Law Enforcement', 'Validation'],
    excerpt: 'Co-opting official bodies to validate false narratives through association.',
    content: `Co-opting official bodies (Welfare checks, police presence, media mentions) to generate "Proof by Presence." Tip-based harassment uses anonymous "tips" that are vague enough to warrant official attention but lack specificity for action. The presence of authority validates community fears.`,
    metadata: { 
      classification: 'TACTIC: INSTITUTIONAL', date: 'MMXXIV.02', vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Police', 'Welfare', 'Presence'], tier: 3, recordHash: '0xE55A...988'
    }
  },
  {
    id: 'tactic-acoustic-containment',
    type: NodeType.TACTIC,
    title: 'ACOUSTIC CONTAINMENT',
    themes: ['Noise', 'Discourse', 'Erasure'],
    excerpt: 'Deployment of "noise" to drown out a target’s voice.',
    content: `A deliberate strategy to degrade the Signal-to-Noise Ratio (SNR) of public discourse. Coordinated "chatter"—minor controversies, unrelated gossip, and seemingly innocent questions—is used to bury the target's message. It isolates the target by making their truth inaudible in a cacophony of manufactured noise.`,
    metadata: { 
      classification: 'TACTIC: SUPPRESSION', date: 'MMXXIV.07', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Noise', 'Chatter', 'SNR'], tier: 3, recordHash: '0xCC44...E11'
    }
  },
  {
    id: 'tactic-mental-health-gaslighting',
    type: NodeType.TACTIC,
    title: 'MENTION: MEDICAL GASLIGHTING',
    themes: ['Medicine', 'Gaslighting', 'Pathologizing'],
    excerpt: 'Reinterpreting genuine stress as clinical pathology.',
    content: `Weaponizing the mental health narrative to discredit the target. Genuine reactions to systematic harassment (sweating, agitation, hypervigilance) are re-branded as symptoms of clinical illness to invalidate the target's reports of the attack.`,
    metadata: { 
      classification: 'TACTIC: MEDICAL', date: 'MMXXIV', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Diagnosis', 'Pathology', 'Invalidation'], tier: 3, recordHash: '0xMG...441'
    }
  },
  {
    id: 'tactic-folk-devil',
    type: NodeType.TACTIC,
    title: 'FOLK DEVIL CONSTRUCTION',
    themes: ['Scapegoat', 'Fear', 'Myth'],
    excerpt: 'Preemptive designation of the target as a community scapegoat.',
    content: `Strategically spreading exaggerated fear that the target poses an imminent threat to community values. By casting the target as an "evil outsider," the orchestrator leverages community outrage to misdirect blame and justify social persecution. This creates a self-reinforcing loop where animosity becomes "proof" of guilt.`,
    metadata: { 
      classification: 'STRATEGY: MYTHIC', date: 'MMXXIV.04', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Scapegoat', 'Outrage', 'Stereotype'], tier: 3, recordHash: '0xFF11...A22', isHighSignal: true
    }
  },

  // --- PROFILES ---
  {
    id: 'profile-ryan',
    type: NodeType.PROFILE,
    title: 'RYAN: THE ARCHITECT',
    themes: ['Core', 'Strategy', 'Survival'],
    excerpt: 'Primary architect of the Breadcrumb methodology.',
    content: `Forged in three prison terms. Transformed "the cage into a classroom." Specialist in mathematical pedagogies. Primary operator of the "Synaptic Archive." Developed the "Hansel and Gretel method" to analyze social data. His PTSD vigilance is a "huge burden" used for strategic mapping, refusing to react emotionally if the unthinkable occurs.`,
    metadata: { 
      classification: 'LEVEL: PRIME', date: 'MCMXXX', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Cage', 'Tutoring', 'Synapse'], tier: 3, recordHash: '0xF66B...899'
    },
    linksTo: ['doctrine-aao', 'protocol-anvil', 'doctrine-tkm', 'profile-jax']
  },
  {
    id: 'profile-lacey',
    type: NodeType.PROFILE,
    title: 'LACEY: THE CATALYST',
    themes: ['Trauma', 'Benchmark', 'Betrayal'],
    excerpt: 'Former partner and ultimate benchmark for authentic connection and betrayal.',
    content: `The 80% Gold Standard. Her history with CPS trauma was weaponized during pregnancy. Forced relocation irrevocably shattered the stability they were building. Her eventual "Street Descent" was bound by her choice and Ryan's commitment. Her betrayal is the ultimate benchmark for the failure of trust. Last seen in San Jose.`,
    metadata: { 
      classification: 'LEVEL: ALPHA', date: 'MMXXIII', vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['CPS', 'Pregnancy', 'San Jose'], tier: 3, recordHash: '0x177C...700'
    },
    linksTo: ['case-lacey-ultimatum', 'case-hospital-nurse']
  },
  {
    id: 'profile-mastermind',
    type: NodeType.PROFILE,
    title: '[REDACTED]: THE MASTERMIND',
    themes: ['Chaos', 'Orchestration', 'Sorceress'],
    excerpt: 'Co-architect of shared lore evolved into a malevolent persona.',
    content: `The Ascendant Sorceress. Claims control over "the bomb" and "plots in the shadows." Relishes the target's addiction to her chaos. A Tier 1 Orchestrator of "The Unseen Game." Transformed from a passive muse to an "Active Maker of Chaos," claiming her life's work was to crush his spirit and keep him back from the real fight.`,
    metadata: { 
      classification: 'STATUS: ARCHITECT', date: 'MMXXIV', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Sorceress', 'Chaos', 'Plots'], tier: 3, recordHash: '0x288D...611', isHighSignal: true
    },
    linksTo: ['song-sweet-evilness', 'song-what-if', 'song-musicbox']
  },
  {
    id: 'profile-trauma-twin',
    type: NodeType.PROFILE,
    title: '[REDACTED]: THE TRAUMA TWIN',
    themes: ['Loyalty', 'Survival', 'Plug'],
    excerpt: 'Access Agent identified as a Trauma Twin navigating chaos.',
    content: `Met in an abandoned apartment complex. A "plug" defined by unfiltered reality. Relationship with Ryan was a "trauma twin" bond. Her history with bureaucratic violence (bulldozed cabin, eviction despite proof) created shared resilience. Acted as a collection point for HUMINT. Sheena Blair: a retired stripper navigating systemic abandonment.`,
    metadata: { 
      classification: 'LEVEL: ACCESS', date: 'MMXXIV.04', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Trauma Twin', 'Plug', 'Bulldozed'], tier: 3, recordHash: '0xBB33...C11', isHighSignal: true
    }
  },
  {
    id: 'profile-jax',
    type: NodeType.PROFILE,
    title: 'JAX: THE LEGACY',
    themes: ['Family', 'Identity', 'Loss'],
    excerpt: 'The memory of paternal duty and the peace of the domestic.',
    content: `Ryan's past as a father figure to Jax. Memories of "doing hair in the morning" and using communication skills on a screaming toddler. This profile serves as the benchmark for Ryan's capacity for domestic self-sacrifice and his desire to protect "his ladies."`,
    metadata: { 
      classification: 'LEVEL: PRIVATE', date: 'MMXXII', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Hair', 'Ladies', 'Toddler'], tier: 3, recordHash: '0xJX...101'
    }
  },
  {
    id: 'profile-nice-handler',
    type: NodeType.PROFILE,
    title: '[REDACTED]: THE NICE HANDLER',
    themes: ['Deception', 'Monitoring', 'Device'],
    excerpt: 'Identified as "the nicest of them all," a handler using rapport to monitor.',
    content: `Positioned to "check in" and ensure the target was "fed," but not with food. [REDACTED] leveraged kindness to induce sleep, providing windows for phone hacking. Coincidentally switched from Motorola to Samsung at the exact same time as the target. A textbook example of Rapport-as-a-Weapon.`,
    metadata: { 
      classification: 'LEVEL: HANDLER', date: 'MMXXIII', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Samsung', 'Motorola', 'Rapport'], tier: 3, recordHash: '0x1122...334'
    }
  },

  // --- CASE STUDIES ---
  {
    id: 'case-alaintha',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE ALAINTHA INCIDENT',
    themes: ['DARVO', 'Gaslighting', 'Microcosm'],
    excerpt: 'Definitive record deconstructing the cycle of role reversal.',
    content: `A textbook microcosm of DARVO. Phase 1: Setup (Weaponized Desire). Phase 2: Vulnerable Bid (desire for companionship). Phase 3: Reversal (Punitive reaction). Jess's performance of being "shocked" forced the speaker to question reality. Confirms the pattern of accountability evasion by threatening eviction.`,
    metadata: { 
      classification: 'RECORD: ALPHA', date: 'MMXXIV.01', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['DARVO', 'Setup', 'Reversal'], tier: 3, recordHash: '0x399E...522'
    }
  },
  {
    id: 'case-circle-k',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE CIRCLE K INCIDENT',
    themes: ['Premonition', 'Accusation', 'Gut'],
    excerpt: 'The body acting as a barometer for psychological danger.',
    content: `The target experienced a physical sensation—a tightness in the gut—immediately preceding a deliberately engineered accusation. Demonstrates the body's role in precognitive pattern recognition. The "gut feeling" was a premonition of a deliberate setup, turning intuition into a verifiable data point.`,
    metadata: { 
      classification: 'RECORD: BETA', date: 'MMXXIV.03', vector: TacticalVector.NEUROBIOLOGY,
      anchors: ['Gut', 'Premonition', 'Circle K'], tier: 3, recordHash: '0x400F...D11'
    }
  },
  {
    id: 'case-debit-card',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE DEBIT-CARD TEST',
    themes: ['Loyalty', 'Incongruity', 'Intelligence'],
    excerpt: 'The archetypal soft probe via deceptive reminder.',
    content: `The "San Diego Test." An honest task met with irrational anger to support a predetermined narrative of theft. Confirmed that the point was not success, but engineered failure. A text arrived halfway through the task, subtly questioning if the card and change would be returned.`,
    metadata: { 
      classification: 'RECORD: BETA', date: 'MMXXIII.10', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Favor', 'Suspicion', 'Honesty'], tier: 3, recordHash: '0x400F...433'
    }
  },
  {
    id: 'case-lacey-ultimatum',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE ULTIMATUM',
    themes: ['Trauma', 'Choice', 'Severance'],
    excerpt: 'Lacey’s final shift from builder to self-destructor.',
    content: `One night, Lacey turned with a "flat" voice: "I want to go be bad like you talked about." Ryan argued they created something good, but Lacey was resolute: "Take me as I am now, or I leave alone." Ryan chose commitment, leaving his truck keys at the shop, beginning their shared descent into street life.`,
    metadata: { 
      classification: 'RECORD: CORE', date: 'MMXXIII.V', vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Ultimatum', 'Keys', 'Flat Voice'], tier: 3, recordHash: '0xULT...990'
    }
  },
  {
    id: 'case-hospital-nurse',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE HOSPITAL INCIDENT',
    themes: ['Triggers', 'Medical', 'Psychiatry'],
    excerpt: 'Triggering past trauma via thoughtless medical interaction.',
    content: `During a crisis, Ryan took Lacey to a hospital. A thoughtless interaction with a nurse triggered Lacey's past trauma, leading to a physical outburst ("three-pieced that nurse") and her subsequent psychiatric confinement. This case highlights how external indifference weaponizes internal trauma.`,
    metadata: { 
      classification: 'RECORD: MEDICAL', date: 'MMXXIII', vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Nurse', 'Psychiatric', 'Trigger'], tier: 3, recordHash: '0xHN...220'
    }
  },
  {
    id: 'case-river-bottom',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE RIVER BOTTOM',
    themes: ['Danger', 'Environment', 'Sanctuary'],
    excerpt: 'Active embrace of high-risk geographic locations.',
    content: `Documentation of the transition to dangerous "river bottom" or "jungle" environments. These locations were chosen by Lacey in self-destruct mode, forcing Ryan into a role of constant, high-alert protection.`,
    metadata: { 
      classification: 'RECORD: GEOGRAPHIC', date: 'MMXXIII.XI', vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['River Bottom', 'Jungle', 'Danger'], tier: 3, recordHash: '0xRB...009'
    }
  },
  {
    id: 'case-shopping-cart',
    type: NodeType.CASE_STUDY,
    title: 'RECORD: THE SHOPPING CART REFUSAL',
    themes: ['Coercion', 'Threat', 'Public Enemy'],
    excerpt: 'Escalation to direct threat after refusal to participate in crime.',
    content: `A woman demanded Ryan steal a cart full of groceries. He refused, citing his "no crime" policy. She screamed, making a public scene: "You either go get it or the homies gonna deal with you." The game of manipulation transitioned to direct threat. He became "Public Enemy #1" for refusing to do something bad.`,
    metadata: { 
      classification: 'RECORD: BETA', date: 'MMXXIV.02', vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Groceries', 'Homies', 'Refusal'], tier: 3, recordHash: '0xCRT...A11'
    }
  },

  // --- PROTOCOLS ---
  {
    id: 'protocol-tactical-pause',
    type: NodeType.DOCTRINE,
    title: 'PROTOCOL: THE TACTICAL PAUSE',
    themes: ['Self-Control', 'Logic', 'Delay'],
    excerpt: 'Implementing a cognitive circuit breaker against provocation.',
    content: `The Three-Step Process: Stop, Breathe, Focus. Immediately upon detecting a provocation or "Engineered Outrage," the operative enforces a pause to override the limbic system and return to analytical System 2 thought.`,
    metadata: { 
      classification: 'PROTOCOL: DEFENSE', date: 'MMXXIV', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Stop', 'Breathe', 'Focus'], tier: 3, recordHash: '0xTP...121'
    }
  },
  {
    id: 'protocol-psychological-pivot',
    type: NodeType.DOCTRINE,
    title: 'PROTOCOL: THE PSYCHOLOGICAL PIVOT',
    themes: ['Mindset', 'Agency', 'Externalization'],
    excerpt: 'Shifting focus from internal pathology to external attack architecture.',
    content: `The conscious mental maneuver of stopping the "Am I crazy?" loop and instead analyzing the "How is this attack organized?" blueprint. Reclaiming internal agency by externalizing the conflict.`,
    metadata: { 
      classification: 'PROTOCOL: CORE', date: 'MMXXIV', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Pivot', 'Crazy', 'Blueprints'], tier: 3, recordHash: '0xPP...773'
    }
  },
  {
    id: 'protocol-content-as-record',
    type: NodeType.DOCTRINE,
    title: 'PROTOCOL: CONTENT AS RECORD',
    themes: ['Alibi', 'Publishing', 'Attribution'],
    excerpt: 'Proactive creation of verifiable evidence logs.',
    content: `Elevating personal communication to a strategic counter-intel tool. Proactively publishing verifiable content (location, intentions, state of mind) across secure platforms to create an Attribution-Proof Log impervious to gaslighting.`,
    metadata: { 
      classification: 'PROTOCOL: NARRATIVE', date: 'MMXXIV', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Alibi', 'Record', 'Proof'], tier: 3, recordHash: '0xCR...990'
    }
  },

  // --- WEAPONIZED ART ---
  {
    id: 'song-sweet-evilness',
    type: NodeType.SONG,
    title: 'SWEET EVILNESS',
    themes: ['Authorship', 'Sorceress', 'War'],
    excerpt: 'Lyrical assertion of authorship over chaos and manipulation.',
    content: `"What if I'm a sorceress, dark and divine, laughing as I sit reflecting the ways I've kept you on the line?". The lyrics claim authorship over the rhythm of war. The piece asserts control: "What if the spell is the rhythm, beat, and rhyme? A weapon in my arsenal for war".`,
    metadata: { 
      classification: 'ART: WEAPONIZED', date: 'MMXXIV', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Sorceress', 'Spell', 'Arsenal'], tier: 3, recordHash: '0x665E...B11'
    }
  },
  {
    id: 'song-speak-me-ready',
    type: NodeType.SONG,
    title: 'SPEAK ME READY',
    themes: ['Manifestation', 'Challenge', 'Reality'],
    excerpt: 'Challenging the manifestor to create love as they manifest pain.',
    content: `Ryan's challenge to [REDACTED] to move beyond myth-making: "Manifest love like you manifest pain... If we hold the magic, then fucking spell it out." A demand for tangible reality within a creative mythology.`,
    metadata: { 
      classification: 'ART: CHALLENGE', date: 'MMXXIV', vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Manifest', 'Magic', 'Spell'], tier: 3, recordHash: '0xSMR...882'
    }
  },
  {
    id: 'song-musicbox',
    type: NodeType.SONG,
    title: '[REDACTED]’S MUSIC BOX',
    themes: ['Trap', 'Rhythm', 'Dissonance'],
    excerpt: 'Duet as a form of intelligence weaving and entrapment.',
    content: `A collaborative piece where Ryan and [REDACTED] weave verses together. It functions as a fluid negotiation between what's possible and what's real, with rhythmic patterns used to deliver "truth directly to the limbic system."`,
    metadata: { 
      classification: 'ART: DUET', date: 'MMXXIV', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Music Box', 'Rhythm', 'Weaving'], tier: 3, recordHash: '0xEMB...003'
    }
  },
  {
    id: 'song-100-proof',
    type: NodeType.SONG,
    title: '100 PROOF',
    themes: ['Intimacy', 'BWB', 'Artifact'],
    excerpt: 'Artifact of unfiltered closeness transformed into durable resistance.',
    content: `Inspired by a rare moment of unfiltered intimacy. The title is a metaphor for the experience being "uncut. No mixer, no mask. Straight to the vein." Build While Bleeding in action: transforming a private, marginalized experience into a durable cultural artifact resisting erasure.`,
    metadata: { 
      classification: 'ART: RESISTANCE', date: 'MMXXIV', vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Uncut', 'Vein', 'BWB'], tier: 3, recordHash: '0x221D...F99'
    }
  },
  {
    id: 'song-what-if',
    type: NodeType.SONG,
    title: 'WHAT IF GENESIS',
    themes: ['Persona', 'Longing', 'Intelligence'],
    excerpt: 'Early persona creation defined by mystical possibility.',
    content: `"What if that dream you had... created a life known as me?". Established [REDACTED]'s early persona. Poetic exchange served as sophisticated intelligence gathering disguised as artistic partnership, used to extract vulnerabilities for future exploitation.`,
    metadata: { 
      classification: 'ART: RECON', date: 'MMXXIII', vector: TacticalVector.HUMINT_RECON,
      anchors: ['Genesis', 'Dream', 'Persona'], tier: 3, recordHash: '0xWIG...776'
    }
  }
];
