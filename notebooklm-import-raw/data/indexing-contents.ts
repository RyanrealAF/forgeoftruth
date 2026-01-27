import { ForensicNode, NodeType, TacticalVector } from '../types';

/**
 * 23 Comprehensive Content Entries for Indexing
 * Designed for the expanded indexing system with temporal, entity, and semantic analysis
 */

export const INDEXING_CONTENTS: ForensicNode[] = [
  {
    id: 'content-001',
    type: NodeType.DOCTRINE,
    title: 'OPERATIONAL SECURITY PROTOCOLS',
    themes: ['Security', 'Protocol', 'Counter-Intelligence'],
    excerpt: 'Comprehensive guidelines for maintaining operational security in hostile environments.',
    content: `Operational Security (OPSEC) represents the systematic process of identifying, controlling, and protecting critical information and indicators about intentions. In psychological warfare contexts, OPSEC prevents adversaries from detecting patterns that could compromise operations. Key principles include: compartmentalization of information, need-to-know basis for information sharing, and continuous assessment of information leakage vectors. The foundation of effective OPSEC lies in understanding that every action creates a signature that can be detected and analyzed by sophisticated surveillance systems.`,
    metadata: {
      classification: 'PROTOCOL: OPERATIONAL',
      date: 'MMXXIV.03',
      vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['OPSEC', 'Compartmentalization', 'Information Control'],
      tier: 2,
      recordHash: 'OPSEC001',
      isHighSignal: true
    },
    linksTo: ['content-005', 'content-012', 'content-018']
  },

  {
    id: 'content-002',
    type: NodeType.THEORY,
    title: 'COGNITIVE DISSONANCE ENGINEERING',
    themes: ['Psychology', 'Manipulation', 'Cognitive Warfare'],
    excerpt: 'The systematic application of cognitive dissonance to destabilize target belief systems.',
    content: `Cognitive Dissonance Engineering represents a sophisticated psychological warfare technique that deliberately creates conflicting cognitions within a target's belief system. When individuals encounter information that contradicts their existing beliefs, they experience psychological discomfort that motivates them to resolve the inconsistency. This technique exploits that discomfort by strategically introducing contradictory information that forces the target to either abandon their original beliefs or rationalize the contradiction in ways that serve the manipulator's objectives. The key to successful cognitive dissonance engineering lies in the careful calibration of contradictory information to maximize psychological impact while maintaining plausible deniability.`,
    metadata: {
      classification: 'THEORY: PSYCHOLOGICAL',
      date: 'MMXXIV.01',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Dissonance', 'Belief Systems', 'Psychological Impact'],
      tier: 3,
      recordHash: 'CDE002',
      isHighSignal: true
    },
    linksTo: ['content-007', 'content-014', 'content-021']
  },

  {
    id: 'content-003',
    type: NodeType.TACTIC,
    title: 'SOCIAL ENGINEERING DEPLOYMENT',
    themes: ['Engineering', 'Social Manipulation', 'Access Tactics'],
    excerpt: 'Advanced techniques for manipulating human psychology to gain unauthorized access to information.',
    content: `Social Engineering Deployment involves the systematic exploitation of human psychology to bypass security measures and extract sensitive information. Unlike technical attacks that target system vulnerabilities, social engineering targets the human element, which often represents the weakest link in security chains. Effective social engineering requires thorough research into the target's psychology, social connections, and behavioral patterns. Common techniques include pretexting (creating false scenarios), baiting (offering something enticing), and phishing (deceptive communication). The most sophisticated social engineering attacks are highly personalized and leverage detailed intelligence about the target's life, preferences, and vulnerabilities.`,
    metadata: {
      classification: 'TACTIC: SOCIAL',
      date: 'MMXXIV.02',
      vector: TacticalVector.HUMINT_RECON,
      anchors: ['Pretexting', 'Baiting', 'Phishing'],
      tier: 2,
      recordHash: 'SED003'
    },
    linksTo: ['content-009', 'content-016', 'content-022']
  },

  {
    id: 'content-004',
    type: NodeType.CASE_STUDY,
    title: 'THE STANFORD PRISON EXPERIMENT ANALYSIS',
    themes: ['Case Study', 'Authority', 'Psychological Manipulation'],
    excerpt: 'Comprehensive analysis of how situational factors can override individual morality.',
    content: `The Stanford Prison Experiment, conducted by Philip Zimbardo in 1971, provides critical insights into the psychological mechanisms of authority and submission. The experiment demonstrated how ordinary individuals rapidly adopted abusive behaviors when placed in positions of authority, while others submitted to degrading treatment when assigned subordinate roles. This case study reveals the fragility of moral boundaries under institutional pressure and the ease with which individuals can be conditioned to accept and perpetuate abusive systems. The experiment's findings have profound implications for understanding how authoritarian structures can rapidly corrupt otherwise normal individuals and how resistance can be systematically broken through psychological manipulation.`,
    metadata: {
      classification: 'CASE: PSYCHOLOGICAL',
      date: 'MMXXIV.04',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Authority', 'Submission', 'Institutional Pressure'],
      tier: 3,
      recordHash: 'SPE004',
      isHighSignal: true
    },
    linksTo: ['content-008', 'content-015', 'content-019']
  },

  {
    id: 'content-005',
    type: NodeType.DOCTRINE,
    title: 'INFORMATION WARFARE STRATEGY',
    themes: ['Information', 'Strategy', 'Modern Warfare'],
    excerpt: 'Comprehensive framework for conducting information operations in contemporary conflict.',
    content: `Information Warfare Strategy represents the systematic approach to dominating the information environment to achieve strategic objectives. This doctrine encompasses the collection, analysis, and dissemination of information to influence, disrupt, or manipulate target audiences while protecting one's own information systems. Modern information warfare extends beyond traditional propaganda to include cyber operations, electronic warfare, psychological operations, and strategic communication. The key principle is that information itself has become a primary weapon system, capable of achieving strategic effects without kinetic force. Success in information warfare requires understanding the target audience's information consumption patterns, belief systems, and decision-making processes.`,
    metadata: {
      classification: 'STRATEGY: INFORMATION',
      date: 'MMXXIV.01',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Information Environment', 'Strategic Communication', 'Cyber Operations'],
      tier: 3,
      recordHash: 'IWS005',
      isHighSignal: true
    },
    linksTo: ['content-011', 'content-017', 'content-023']
  },

  {
    id: 'content-006',
    type: NodeType.THEORY,
    title: 'BEHAVIORAL CONDITIONING PRINCIPLES',
    themes: ['Conditioning', 'Behavior', 'Psychological Control'],
    excerpt: 'The application of classical and operant conditioning to modify target behavior patterns.',
    content: `Behavioral Conditioning Principles draw from the foundational work of Pavlov and Skinner to systematically modify behavior through controlled stimulus-response associations. In psychological warfare contexts, these principles are applied to create predictable behavioral responses in target populations. Classical conditioning establishes automatic associations between stimuli, while operant conditioning uses reinforcement and punishment to shape voluntary behaviors. The most effective conditioning programs combine both approaches, creating deep-seated behavioral patterns that persist even when the original conditioning stimuli are removed. Understanding these principles is crucial for both implementing conditioning programs and developing resistance to them.`,
    metadata: {
      classification: 'THEORY: BEHAVIORAL',
      date: 'MMXXIV.02',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Pavlov', 'Skinner', 'Reinforcement'],
      tier: 2,
      recordHash: 'BCP006'
    },
    linksTo: ['content-010', 'content-013', 'content-020']
  },

  {
    id: 'content-007',
    type: NodeType.TACTIC,
    title: 'PROPAGANDA DISSEMINATION METHODS',
    themes: ['Propaganda', 'Dissemination', 'Influence Operations'],
    excerpt: 'Advanced techniques for spreading propaganda messages through multiple channels.',
    content: `Propaganda Dissemination Methods encompass the systematic distribution of carefully crafted messages designed to influence target audiences' beliefs, attitudes, and behaviors. Effective propaganda dissemination requires understanding the target audience's media consumption habits, cultural context, and psychological vulnerabilities. Modern propaganda operations utilize a multi-channel approach, combining traditional media, social media, interpersonal networks, and cultural institutions to maximize message penetration. The most sophisticated propaganda campaigns employ the "Big Lie" technique, where outrageous falsehoods are repeated so frequently that they become accepted as truth. Additionally, propaganda often uses emotional appeals rather than rational arguments, as emotions are more easily manipulated and create stronger, more lasting impressions.`,
    metadata: {
      classification: 'TACTIC: PROPAGANDA',
      date: 'MMXXIV.03',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Big Lie', 'Emotional Appeals', 'Multi-Channel'],
      tier: 2,
      recordHash: 'PDM007'
    },
    linksTo: ['content-002', 'content-014', 'content-021']
  },

  {
    id: 'content-008',
    type: NodeType.CASE_STUDY,
    title: 'THE MILGRAM OBEDIENCE EXPERIMENTS',
    themes: ['Obedience', 'Authority', 'Ethical Boundaries'],
    excerpt: 'Analysis of how ordinary people can be induced to commit harmful acts under authority pressure.',
    content: `The Milgram Obedience Experiments, conducted by Stanley Milgram in the 1960s, revealed the disturbing extent to which ordinary individuals will obey authority figures, even when instructed to perform acts that conflict with their moral values. The experiments demonstrated that approximately 65% of participants were willing to administer what they believed were potentially lethal electric shocks to another person simply because an authority figure instructed them to do so. This case study provides critical insights into the psychological mechanisms that enable mass atrocities and the ease with which individuals can be induced to abandon personal responsibility when operating within hierarchical structures. The findings have profound implications for understanding how authoritarian systems can mobilize large numbers of people to participate in harmful actions.`,
    metadata: {
      classification: 'CASE: OBEDIENCE',
      date: 'MMXXIV.04',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Authority Pressure', 'Moral Conflict', 'Hierarchical Structures'],
      tier: 3,
      recordHash: 'MOE008',
      isHighSignal: true
    },
    linksTo: ['content-004', 'content-015', 'content-019']
  },

  {
    id: 'content-009',
    type: NodeType.TACTIC,
    title: 'CYBER PSYCHOLOGICAL OPERATIONS',
    themes: ['Cyber', 'Psychological Operations', 'Digital Warfare'],
    excerpt: 'Integration of psychological warfare techniques with cyber operations for maximum impact.',
    content: `Cyber Psychological Operations represent the fusion of traditional psychological warfare techniques with modern cyber capabilities. This approach leverages the unique characteristics of digital environments to amplify psychological effects and reach target audiences with unprecedented precision. Cyber psychological operations can include the dissemination of disinformation through social media algorithms, the manipulation of online communities, and the use of artificial intelligence to create personalized propaganda. The digital realm offers several advantages for psychological operations, including anonymity, global reach, and the ability to rapidly adapt messaging based on real-time feedback. However, it also presents challenges, such as the difficulty of controlling message propagation and the potential for counter-narratives to emerge rapidly.`,
    metadata: {
      classification: 'TACTIC: CYBER',
      date: 'MMXXIV.05',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Digital Environment', 'AI Propaganda', 'Social Media'],
      tier: 3,
      recordHash: 'CPO009',
      isHighSignal: true
    },
    linksTo: ['content-003', 'content-016', 'content-022']
  },

  {
    id: 'content-010',
    type: NodeType.THEORY,
    title: 'GROUP DYNAMICS AND CONFORMITY',
    themes: ['Group Dynamics', 'Conformity', 'Social Influence'],
    excerpt: 'Understanding how group pressures can override individual judgment and decision-making.',
    content: `Group Dynamics and Conformity theory examines how individuals modify their beliefs, attitudes, and behaviors to align with group norms, often at the expense of personal judgment. Solomon Asch's conformity experiments demonstrated that individuals will frequently abandon their own perceptions to conform with group consensus, even when the group is clearly wrong. This phenomenon has significant implications for psychological warfare, as it reveals how easily collective beliefs can be manipulated through controlled group environments. Techniques such as creating artificial consensus, isolating targets from dissenting opinions, and establishing group identity markers can all be used to induce conformity and suppress independent thinking. Understanding these dynamics is crucial for both implementing conformity-inducing strategies and developing resistance to them.`,
    metadata: {
      classification: 'THEORY: SOCIAL',
      date: 'MMXXIV.02',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Asch Experiments', 'Group Consensus', 'Social Influence'],
      tier: 2,
      recordHash: 'GDC010'
    },
    linksTo: ['content-006', 'content-013', 'content-020']
  },

  {
    id: 'content-011',
    type: NodeType.DOCTRINE,
    title: 'PSYCHOLOGICAL RESILIENCE TRAINING',
    themes: ['Resilience', 'Training', 'Mental Fortitude'],
    excerpt: 'Comprehensive approach to building psychological resistance against manipulation techniques.',
    content: `Psychological Resilience Training represents a systematic approach to strengthening individuals' mental and emotional capacity to resist manipulation and coercion. This doctrine emphasizes the development of critical thinking skills, emotional regulation techniques, and awareness of common manipulation tactics. Effective resilience training combines theoretical knowledge with practical exercises that simulate real-world manipulation attempts. Key components include recognizing cognitive biases, understanding emotional triggers, and developing alternative response patterns to manipulative stimuli. The training also emphasizes the importance of maintaining strong social support networks and personal value systems that can serve as anchors during periods of psychological pressure. Psychological resilience is not an innate trait but a skill that can be developed and strengthened through deliberate practice.`,
    metadata: {
      classification: 'TRAINING: RESILIENCE',
      date: 'MMXXIV.06',
      vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Critical Thinking', 'Emotional Regulation', 'Manipulation Awareness'],
      tier: 3,
      recordHash: 'PRT011',
      isHighSignal: true
    },
    linksTo: ['content-005', 'content-017', 'content-023']
  },

  {
    id: 'content-012',
    type: NodeType.DOCTRINE,
    title: 'COUNTERINTELLIGENCE OPERATIONS',
    themes: ['Counterintelligence', 'Security', 'Deception'],
    excerpt: 'Strategies for detecting, preventing, and exploiting enemy intelligence activities.',
    content: `Counterintelligence Operations encompass the systematic efforts to detect, prevent, and exploit enemy intelligence activities while protecting one's own information. Effective counterintelligence requires understanding the full spectrum of intelligence collection methods, from human sources to technical surveillance. Key principles include maintaining operational security, conducting deception operations to mislead enemy intelligence services, and developing the capability to identify and neutralize enemy agents. Counterintelligence also involves the strategic use of double agents and controlled information leaks to manipulate enemy decision-making. The most sophisticated counterintelligence operations create elaborate deceptions that not only protect sensitive information but actively shape the enemy's understanding of the operational environment.`,
    metadata: {
      classification: 'OPERATION: COUNTERINTELLIGENCE',
      date: 'MMXXIV.03',
      vector: TacticalVector.DEFENSIVE_PROTOCOL,
      anchors: ['Deception', 'Double Agents', 'Operational Security'],
      tier: 3,
      recordHash: 'CIO012',
      isHighSignal: true
    },
    linksTo: ['content-001', 'content-018', 'content-022']
  },

  {
    id: 'content-013',
    type: NodeType.THEORY,
    title: 'COGNITIVE BIASES EXPLOITATION',
    themes: ['Cognitive Biases', 'Exploitation', 'Decision Making'],
    excerpt: 'Systematic identification and manipulation of inherent cognitive biases for strategic advantage.',
    content: `Cognitive Biases Exploitation involves the deliberate manipulation of the systematic patterns of deviation from norm or rationality in judgment that all humans possess. These biases, such as confirmation bias, availability heuristic, and anchoring effects, represent predictable vulnerabilities in human decision-making processes. Sophisticated psychological operations identify and exploit these biases to influence target behavior in predictable ways. For example, confirmation bias can be exploited by presenting information that confirms existing beliefs, making the target more receptive to manipulation. The availability heuristic can be manipulated by controlling the information environment to make certain outcomes seem more likely than they actually are. Understanding cognitive biases is crucial for both implementing effective manipulation strategies and developing resistance to them.`,
    metadata: {
      classification: 'THEORY: COGNITIVE',
      date: 'MMXXIV.02',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Confirmation Bias', 'Availability Heuristic', 'Anchoring Effects'],
      tier: 2,
      recordHash: 'CBE013'
    },
    linksTo: ['content-006', 'content-010', 'content-020']
  },

  {
    id: 'content-014',
    type: NodeType.TACTIC,
    title: 'FALSE FLAG OPERATIONS',
    themes: ['False Flag', 'Deception', 'Attribution'],
    excerpt: 'Covert operations designed to deceive by making them appear as though they were carried out by other entities.',
    content: `False Flag Operations represent one of the most sophisticated forms of deception in psychological warfare. These operations are designed to conceal the actual source of responsibility for an event while making it appear as though it were carried out by other entities. False flag operations require meticulous planning to create convincing evidence that points to the intended scapegoat while obscuring the true perpetrators. The success of false flag operations depends on understanding the target audience's existing beliefs, biases, and information sources. Effective false flag operations often involve multiple layers of deception, including planted evidence, controlled leaks, and coordinated media campaigns. The psychological impact of false flag operations can be profound, as they can fundamentally alter target audiences' perceptions of reality and trigger cascading effects in political, social, and military domains.`,
    metadata: {
      classification: 'TACTIC: DECEPTION',
      date: 'MMXXIV.04',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Attribution', 'Evidence Planting', 'Media Campaigns'],
      tier: 3,
      recordHash: 'FFO014',
      isHighSignal: true
    },
    linksTo: ['content-002', 'content-007', 'content-021']
  },

  {
    id: 'content-015',
    type: NodeType.CASE_STUDY,
    title: 'THE GULAG SYSTEM ANALYSIS',
    themes: ['Gulag', 'Systematic Oppression', 'Psychological Destruction'],
    excerpt: 'Comprehensive examination of how systematic psychological destruction was institutionalized.',
    content: `The Gulag System Analysis reveals how the Soviet Union institutionalized systematic psychological destruction as a tool of political control. The gulag system was not merely a network of labor camps but a sophisticated apparatus for breaking individual will and creating compliant subjects. Psychological techniques included isolation, forced labor, starvation, and the systematic destruction of personal identity. The system demonstrated how prolonged psychological pressure, when applied systematically, can break even the strongest individuals. However, the analysis also reveals instances of remarkable psychological resilience and resistance, providing valuable insights into the factors that enable individuals to maintain their integrity under extreme conditions. The gulag system serves as a stark reminder of the potential for institutionalized psychological warfare and the importance of developing resistance strategies.`,
    metadata: {
      classification: 'CASE: SYSTEMATIC',
      date: 'MMXXIV.05',
      vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Psychological Destruction', 'Systematic Pressure', 'Identity Destruction'],
      tier: 3,
      recordHash: 'GSA015',
      isHighSignal: true
    },
    linksTo: ['content-004', 'content-008', 'content-019']
  },

  {
    id: 'content-016',
    type: NodeType.TACTIC',
    title: 'INFORMATION DOMINANCE STRATEGIES',
    themes: ['Information Dominance', 'Strategic Control', 'Narrative Shaping'],
    excerpt: 'Comprehensive approaches to controlling the information environment to achieve strategic objectives.',
    content: `Information Dominance Strategies represent the systematic effort to control the flow, content, and interpretation of information within a given environment. This approach recognizes that in modern conflict, controlling the narrative is often more important than controlling territory. Information dominance involves multiple components, including controlling information sources, shaping public discourse, and manipulating the timing and framing of information release. Effective information dominance requires understanding the target audience's information consumption patterns, cultural context, and decision-making processes. The goal is to create an information environment where one's own narrative becomes the default interpretation of events, making alternative perspectives seem implausible or irrelevant. This requires sustained effort across multiple channels and the ability to adapt strategies based on real-time feedback.`,
    metadata: {
      classification: 'STRATEGY: INFORMATION',
      date: 'MMXXIV.05',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Narrative Control', 'Information Flow', 'Strategic Framing'],
      tier: 3,
      recordHash: 'IDS016',
      isHighSignal: true
    },
    linksTo: ['content-003', 'content-009', 'content-022']
  },

  {
    id: 'content-017',
    type: NodeType.DOCTRINE,
    title: 'STRATEGIC DECEPTION FRAMEWORK',
    themes: ['Strategic Deception', 'Framework', 'Operational Security'],
    excerpt: 'Comprehensive framework for implementing deception at the strategic level.',
    content: `Strategic Deception Framework provides the systematic approach to implementing deception operations at the highest levels of conflict. This doctrine recognizes that deception is not merely a tactical tool but a strategic imperative that can fundamentally alter the course of conflicts. Effective strategic deception requires understanding the enemy's decision-making processes, intelligence capabilities, and cultural context. The framework encompasses multiple levels of deception, from operational security measures that conceal true capabilities to elaborate strategic deceptions that mislead about fundamental intentions. Key principles include maintaining consistency across all deception efforts, understanding the timing and sequencing of deception elements, and ensuring that deception operations support broader strategic objectives. The most successful strategic deceptions create cascading effects that influence enemy decisions across multiple domains and timeframes.`,
    metadata: {
      classification: 'FRAMEWORK: STRATEGIC',
      date: 'MMXXIV.06',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Strategic Level', 'Decision-Making', 'Cascading Effects'],
      tier: 3,
      recordHash: 'SDF017',
      isHighSignal: true
    },
    linksTo: ['content-005', 'content-011', 'content-023']
  },

  {
    id: 'content-018',
    type: NodeType.DOCTRINE,
    title: 'PSYCHOLOGICAL OPERATIONS INTELLIGENCE',
    themes: ['Psychological Operations', 'Intelligence', 'Target Analysis'],
    excerpt: 'Integration of intelligence gathering with psychological operations for maximum effectiveness.',
    content: `Psychological Operations Intelligence represents the systematic integration of intelligence gathering with psychological operations to achieve maximum effectiveness. This doctrine emphasizes that successful psychological operations require deep understanding of the target audience's psychology, culture, values, and decision-making processes. Intelligence gathering for psychological operations goes beyond traditional military intelligence to include cultural analysis, social network mapping, and psychological profiling. The goal is to identify the most effective messages, messengers, and channels for influencing target behavior. This requires continuous intelligence collection and analysis to adapt psychological operations based on real-time feedback and changing circumstances. The integration of intelligence and psychological operations creates a feedback loop where intelligence informs operations, and operational results generate new intelligence requirements.`,
    metadata: {
      classification: 'INTELLIGENCE: PSYCHOLOGICAL',
      date: 'MMXXIV.03',
      vector: TacticalVector.HUMINT_RECON,
      anchors: ['Target Analysis', 'Cultural Understanding', 'Feedback Loop'],
      tier: 3,
      recordHash: 'POI018',
      isHighSignal: true
    },
    linksTo: ['content-001', 'content-012', 'content-022']
  },

  {
    id: 'content-019',
    type: NodeType.CASE_STUDY,
    title: 'THE TUSKEGEE SYPHILIS STUDY',
    themes: ['Medical Ethics', 'Systematic Deception', 'Vulnerable Populations'],
    excerpt: 'Analysis of how systematic deception was used to exploit vulnerable populations.',
    content: `The Tuskegee Syphilis Study represents one of the most egregious examples of systematic deception in medical history. Conducted by the U.S. Public Health Service from 1932 to 1972, the study involved 600 African American men, 399 of whom had syphilis. The participants were deliberately misled about their condition and denied effective treatment, even after penicillin became available. This case study reveals how institutional authority and scientific legitimacy can be weaponized to exploit vulnerable populations. The study demonstrates the importance of informed consent, the dangers of unchecked institutional power, and the long-term psychological and social consequences of systematic deception. The Tuskegee study serves as a critical lesson in the ethical boundaries that must constrain all forms of psychological operations, particularly those involving vulnerable populations.`,
    metadata: {
      classification: 'CASE: MEDICAL',
      date: 'MMXXIV.04',
      vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Informed Consent', 'Vulnerable Populations', 'Institutional Power'],
      tier: 3,
      recordHash: 'TSS019',
      isHighSignal: true
    },
    linksTo: ['content-004', 'content-008', 'content-015']
  },

  {
    id: 'content-020',
    type: NodeType.THEORY,
    title: 'SOCIAL IDENTITY MANIPULATION',
    themes: ['Social Identity', 'Manipulation', 'Group Cohesion'],
    excerpt: 'Theoretical framework for understanding and manipulating group identity for strategic purposes.',
    content: `Social Identity Manipulation theory examines how group identities can be systematically manipulated to achieve strategic objectives. This theory recognizes that individuals derive significant portions of their self-concept from their membership in social groups, making group identity a powerful tool for influence. Manipulation techniques include creating artificial group boundaries, emphasizing perceived threats from out-groups, and promoting specific group narratives that serve the manipulator's objectives. The theory also examines how social identity can be used to override individual moral constraints, as individuals are more likely to engage in harmful behavior when acting as members of a group rather than as individuals. Understanding social identity manipulation is crucial for both implementing effective influence operations and developing resistance to them.`,
    metadata: {
      classification: 'THEORY: IDENTITY',
      date: 'MMXXIV.02',
      vector: TacticalVector.COGNITIVE_WARFARE,
      anchors: ['Group Boundaries', 'Out-Group Threats', 'Collective Action'],
      tier: 2,
      recordHash: 'SIM020'
    },
    linksTo: ['content-006', 'content-010', 'content-013']
  },

  {
    id: 'content-021',
    type: NodeType.TACTIC,
    title: 'CULTURAL INFLUENCE OPERATIONS',
    themes: ['Cultural Influence', 'Soft Power', 'Long-term Manipulation'],
    excerpt: 'Long-term strategies for influencing target cultures to align with strategic objectives.',
    content: `Cultural Influence Operations represent long-term strategies for shaping target cultures to align with strategic objectives. Unlike immediate psychological operations, cultural influence operates over extended timeframes, gradually shifting cultural norms, values, and beliefs. These operations leverage cultural institutions, educational systems, media, and artistic expression to create favorable predispositions toward the influencer's objectives. Key techniques include promoting specific cultural narratives, supporting compatible cultural movements, and infiltrating cultural institutions. The most effective cultural influence operations are subtle and appear organic, making it difficult for target populations to recognize external influence. Success requires deep understanding of the target culture's history, values, and social dynamics, as well as patience to achieve results over multiple generations.`,
    metadata: {
      classification: 'OPERATION: CULTURAL',
      date: 'MMXXIV.05',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Cultural Norms', 'Long-term Strategy', 'Soft Power'],
      tier: 3,
      recordHash: 'CIO021',
      isHighSignal: true
    },
    linksTo: ['content-002', 'content-007', 'content-014']
  },

  {
    id: 'content-022',
    type: NodeType.TACTIC,
    title: 'ECONOMIC PSYCHOLOGICAL WARFARE',
    themes: ['Economic Warfare', 'Psychological Impact', 'Resource Control'],
    excerpt: 'Integration of economic strategies with psychological operations for maximum strategic impact.',
    content: `Economic Psychological Warfare represents the systematic integration of economic strategies with psychological operations to achieve maximum strategic impact. This approach recognizes that economic conditions have profound psychological effects on populations, making economic tools powerful instruments of psychological influence. Techniques include economic sanctions designed to create psychological pressure, manipulation of currency and markets to undermine confidence, and strategic distribution of resources to create dependency and loyalty. Economic psychological warfare also involves controlling access to essential goods and services as a means of influencing behavior and attitudes. The psychological impact of economic measures can be more effective than military force in achieving strategic objectives, as economic hardship affects entire populations and can fundamentally alter their worldview and priorities.`,
    metadata: {
      classification: 'WARFARE: ECONOMIC',
      date: 'MMXXIV.05',
      vector: TacticalVector.SYSTEMIC_VIOLENCE,
      anchors: ['Economic Pressure', 'Resource Control', 'Population Impact'],
      tier: 3,
      recordHash: 'EPW022',
      isHighSignal: true
    },
    linksTo: ['content-003', 'content-009', 'content-016', 'content-018']
  },

  {
    id: 'content-023',
    type: NodeType.DOCTRINE,
    title: 'COMPREHENSIVE INFLUENCE STRATEGY',
    themes: ['Comprehensive Strategy', 'Multi-domain Operations', 'Integrated Approach'],
    excerpt: 'Holistic approach integrating all forms of influence operations for maximum strategic effect.',
    content: `Comprehensive Influence Strategy represents the holistic integration of all forms of influence operations—psychological, informational, economic, and cultural—into a unified approach for achieving strategic objectives. This doctrine recognizes that in modern conflict, success requires coordinated action across multiple domains and timeframes. The comprehensive approach ensures that all influence operations support and reinforce each other, creating synergistic effects that are greater than the sum of their parts. Key principles include maintaining strategic coherence across all operations, understanding the interdependencies between different forms of influence, and adapting strategies based on real-time feedback from multiple domains. The most effective comprehensive influence strategies operate on multiple levels simultaneously, from immediate tactical objectives to long-term strategic goals, creating a cohesive narrative that guides all actions and communications.`,
    metadata: {
      classification: 'STRATEGY: COMPREHENSIVE',
      date: 'MMXXIV.06',
      vector: TacticalVector.NARRATIVE_CONTROL,
      anchors: ['Multi-domain', 'Strategic Coherence', 'Synergistic Effects'],
      tier: 3,
      recordHash: 'CIS023',
      isHighSignal: true
    },
    linksTo: ['content-005', 'content-011', 'content-017']
  }
];