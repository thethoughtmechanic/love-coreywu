export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type VisualType =
  | 'bubble'
  | 'primitives-ambassadors'
  | 'attachment-triad'
  | 'expert-antidotes'
  | 'ritual-timeline'
  | 'go-to-tether'
  | 'thirds'
  | 'fight-well'
  | 'eye-contact'
  | 'healing-touch';

export type BookStory = {
  label: string;
  setup: string;
  tatkinPoint: string;
  sourceRef: string;
};

export type Practice = {
  title: string;
  whenToUse: string;
  steps: string[];
};

export type Chapter = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  principle: string;
  tatkinFrame: string;
  bookStory: BookStory;
  whatItTeaches: string[];
  recognizeIt: string[];
  partnerMove: string;
  practice: Practice;
  glossaryTerms: GlossaryTerm[];
  visual: {
    type: VisualType;
    caption: string;
  };
  rememberThis: string;
  sourceStatus: string;
  sourceRefs: string[];
};

export const OVERVIEW_ID = 'overview';
export const PRACTICE_ID = 'practice';
export const MIRROR_ID = 'mirror';

export const principles = [
  'Create a couple bubble so both partners stay safe and secure.',
  'Keep the love alive when primitives hijack the brain.',
  'Learn how your partner really works: anchor, island, or wave.',
  'Become experts who know how to please and soothe each other.',
  'Use launchings and landings to reconnect at day edges.',
  'Serve as each other\'s primary go-to people, available 24/7.',
  'Protect the bubble so neither partner becomes a third wheel with outsiders.',
  'Fight well so both partners can win.',
  'Rekindle love up close through deliberate eye contact.',
  'Be medicine for each other\'s physical and emotional health.',
];

export const chapters: Chapter[] = [
  {
    id: 'couple-bubble',
    number: '01',
    title: 'The Couple Bubble',
    subtitle: 'How You Can Keep Each Other Safe and Secure',
    principle: 'Creating a couple bubble lets partners keep each other safe and secure.',
    tatkinFrame:
      'Tatkin uses couple bubble for the membrane, cocoon, or womb partners build together. It is not isolation. It is a shared field with implicit guarantees: I will not leave you, I will not frighten you on purpose, I will relieve your distress even when I caused it, this relationship outranks being right or looking good to outsiders, and you hear important news from each other first.',
    bookStory: {
      label: 'Jenny and Bradley vs. Bram and Greta',
      setup:
        'Jenny and Bradley fight over family visits and social loyalty; each leaves the other exposed. At a school gala, Greta anticipates Bram\'s discomfort in crowds, protects his dignity, and neither throws the other under the bus.',
      tatkinPoint:
        'Same social stress, opposite bubble logic. Secure couples filter the outside world through mutual protection. Distressed couples treat autonomy as permission to abandon each other in public.',
      sourceRef: 'Wired for Love, ch. 1 (Jenny/Bradley, Bram/Greta, couple bubble guarantees)',
    },
    whatItTeaches: [
      'Security is co-created, not assumed after vows.',
      'Bubble guarantees can be implicit or spoken aloud.',
      'You maintain your side on principle, not on a you-go-first bargain.',
    ],
    recognizeIt: [
      'One partner feels like an afterthought at family events or parties.',
      'Private complaints about your partner become public exposure.',
      'Work, friends, or parents outrank the partnership in a pinch.',
    ],
    partnerMove:
      'When your partner feels outside the bubble, skip the debate about whether they should feel that way. Turn toward them, name what you missed, and repair with one concrete act of alliance.',
    practice: {
      title: 'Bubble audit',
      whenToUse: 'When you want shared language for what already protects you and what erodes trust.',
      steps: [
        'Each partner lists three behaviors that make them feel inside the bubble and three that push them out.',
        'Share lists with clarifying questions only, no defending.',
        'Name guarantees you already give each other and ones you want to make explicit.',
        'Pick one outside influence to filter together this week (family gossip, work intrusion, public teasing).',
      ],
    },
    glossaryTerms: [
      {
        term: 'Couple Bubble',
        definition:
          'The shared protective field you build together so both partners feel the relationship comes first when stress hits. Without it, outside pressures pull you apart instead of through crises together.',
      },
      {
        term: 'Secure Functioning',
        definition:
          'How a couple operates when both partners protect each other, repair quickly, and keep agreements explicit. Security is co-created daily, not guaranteed by vows alone.',
      },
    ],
    visual: {
      type: 'bubble',
      caption: 'Outside stress meets a shared filter before it reaches the partnership.',
    },
    rememberThis: 'Protect us first, then decide what else gets in.',
    sourceStatus: 'Grounded in ch. 1 couple bubble definition and Jenny/Bradley vs. Bram/Greta contrast.',
    sourceRefs: ['Ch. 1: couple bubble guarantees', 'Ch. 1: Jenny/Bradley, Bram/Greta'],
  },
  {
    id: 'warring-loving-brain',
    number: '02',
    title: 'The Warring/Loving Brain',
    subtitle: 'How You Can Keep the Love Alive',
    principle: 'Partners keep love alive by recognizing when primitives, not ambassadors, are running the show.',
    tatkinFrame:
      'Tatkin splits the brain into fast primitives (amygdala-driven, threat-first) and slower ambassadors (cortex, moral and empathic centers). Primitives wage war without permission. Ambassadors negotiate, remember context, and repair. Under threat, primitives usually arrive first.',
    bookStory: {
      label: 'Franklin and Leia in the car',
      setup:
        'Leia shuts off the stereo to talk about marriage. Franklin\'s body stiffens before he understands why. Primitives escalate: distorted memory, sharp voices, swerving, then days of shutdown.',
      tatkinPoint:
        'The fight is not only about content. Amygdalae fire on tone, timing, and history. When ambassadors cannot catch up, couples replay war scripts instead of solving problems.',
      sourceRef: 'Wired for Love, ch. 2 (Franklin/Leia, Darius/Shenice, primitives and ambassadors)',
    },
    whatItTeaches: [
      'Threat detection is faster than reason; the body votes before the mind catches up.',
      'Naming primitives in action requires ambassadors that still have bandwidth.',
      'Partners can practice speaking to each other\'s ambassadors, not each other\'s alarm.',
    ],
    recognizeIt: [
      'Heart rate, jaw tension, or shutdown arrives before anyone hears the point.',
      'Memory narrows to proof you are right and your partner is dangerous.',
      'A small cue (silence, a sigh, a delay) triggers a large reaction.',
    ],
    partnerMove:
      'When alarm is visible, pause content. Lower voice, soften face, and use one connection line before returning to the topic. Try having primitives speak to ambassadors in a low-stakes moment.',
    practice: {
      title: 'Identify your primitives',
      whenToUse: 'After a rupture, or in calm, to map what hijacks you under threat.',
      steps: [
        'Each partner recalls a recent red-alert moment: racing heart, numbness, sharp words, or disappearing.',
        'Name which primitive showed up (attack, retreat, freeze, pursue).',
        'Trade lists and note one early cue the other could watch for.',
        'Optional dialogue exercise: primitives talk to partner\'s ambassadors, then ambassadors to ambassadors.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Primitives',
        definition:
          'Fast, threat-first brain circuits that fire before you fully understand what is happening. In fights they often run the show first, which is why tone and timing derail talks before either partner means to.',
      },
      {
        term: 'Ambassadors',
        definition:
          'Slower brain systems that remember context, empathize, and negotiate. Repair only happens when they catch up and can calm the alarm enough to solve the real problem.',
      },
    ],
    visual: {
      type: 'primitives-ambassadors',
      caption: 'Threat hits primitives first; ambassadors restore context when they can catch up.',
    },
    rememberThis: 'Before fixing the topic, ask whether an ambassador or a primitive is driving.',
    sourceStatus: 'Grounded in ch. 2 brain model, table 2.1 primitives, Franklin/Leia story.',
    sourceRefs: ['Ch. 2: primitives and ambassadors', 'Ch. 2: Franklin/Leia', 'Ch. 2: Darius/Shenice'],
  },
  {
    id: 'know-your-partner',
    number: '03',
    title: 'Know Your Partner',
    subtitle: 'How Does He or She Really Work?',
    principle: 'Learn your partner\'s attachment style so you can respond to the person, not the caricature.',
    tatkinFrame:
      'Tatkin describes anchors, islands, and waves as relationship styles shaped by early experience. Islands protect autonomy and space. Waves protect closeness and reassurance. Anchors hold both with more flexibility. Styles are tendencies, not boxes; wild islands and wild waves show extreme stress versions.',
    bookStory: {
      label: 'Chiana and Carlos, Jaden and Kaylee',
      setup:
        'Chiana, an island, stops initiating sex and snaps when Carlos seeks contact; her alone time reads as rejection. Jaden, a wave, needs frequent reassurance; Kaylee reads his checking in as neediness. Neither couple has a couple bubble or go-to agreement yet.',
      tatkinPoint:
        'Behavior that looks personal is often a protective strategy. Islands and waves need opposite antidotes. Without a bubble, each partner\'s style maintains the other\'s fear.',
      sourceRef: 'Wired for Love, ch. 3 (Chiana/Carlos, Jaden/Kaylee, anchor/island/wave typology)',
    },
    whatItTeaches: [
      'Pursuit and distance are often protective, not character flaws.',
      'Wild islands struggle to name feelings and read a partner\'s cues; wild waves can flood with reassurance demands.',
      'Secure relating grows from accurate manuals, not labels used as ammunition.',
    ],
    recognizeIt: [
      'You interpret your partner\'s style as intentional hurt.',
      'Stress sends one partner toward space and the other toward contact.',
      'You debate whose style is normal instead of what each person needs under threat.',
    ],
    partnerMove:
      'Translate before you counterattack. For an island: offer space with a clear return time. For a wave: lead with I am here and we are okay before logistics.',
    practice: {
      title: 'Style checklists',
      whenToUse: 'When you want a shared read on anchor, island, or wave patterns without blame.',
      steps: [
        'Each partner reads Tatkin\'s anchor, island, and wave checklists and marks what fits.',
        'Share results as hypotheses, not verdicts.',
        'Each completes: When I pull away or push in, I am usually protecting...',
        'Draft one agreement that honors both autonomy and reassurance (texting, timing, reunion).',
      ],
    },
    glossaryTerms: [
      {
        term: 'Anchor',
        definition:
          'A style comfortable with both closeness and alone time without panicking. Anchors still have sore spots, but they handle space and contact with more flexibility than islands or waves.',
      },
      {
        term: 'Island',
        definition:
          'A style that pulls toward solitude and self-soothing when stressed. Withdrawal or snap-back usually protects independence, not rejection of you.',
      },
      {
        term: 'Wave',
        definition:
          'A style that moves toward contact and reassurance when stressed. Checking in or pursuing usually protects connection and fear of being left, not neediness for its own sake.',
      },
    ],
    visual: {
      type: 'attachment-triad',
      caption: 'Three styles, three core needs: space, reassurance, or both with flexibility.',
    },
    rememberThis: 'Ask what the behavior protects before you judge the behavior.',
    sourceStatus: 'Grounded in ch. 3 typology, wild island/wild wave sections, Chiana/Carlos and Jaden/Kaylee.',
    sourceRefs: ['Ch. 3: anchors, islands, waves', 'Ch. 3: Chiana/Carlos', 'Ch. 3: Jaden/Kaylee'],
  },
  {
    id: 'becoming-experts',
    number: '04',
    title: 'Becoming Experts on One Another',
    subtitle: 'How to Please and Soothe Your Partner',
    principle: 'Partners who know how to please and soothe each other reduce guesswork and threat.',
    tatkinFrame:
      'Tatkin treats the relationship as an owner\'s manual built from observation. Experts know each other\'s three or four bad things (vulnerabilities that spike threat) and how to antidote them. Peggy and Simon, married decades, still trip their bad things when stress is high.',
    bookStory: {
      label: 'Peggy and Simon',
      setup:
        'Long-married and fond of each other, Peggy and Simon still fall prey to a handful of recurring vulnerabilities. Simon learns Peggy\'s triggers; small precise moves land better than grand speeches.',
      tatkinPoint:
        'Expertise is not mind reading. It is tracking what consistently soothes or wounds, then acting before primitives take over.',
      sourceRef: 'Wired for Love, ch. 4 (Peggy/Simon, three or four bad things, Emote Me game, table 4.2 antidotes)',
    },
    whatItTeaches: [
      'Know your partner\'s three or four bad things and your own.',
      'Islands and waves need different antidotes; anchors still have sore spots.',
      'Brief, declarative praise lands better than long qualified speeches.',
    ],
    recognizeIt: [
      'You assume instead of updating your manual when your partner changes.',
      'You stockpile vulnerabilities to win fights later.',
      'Public settings expose gaps in knowing what embarrasses or calms your partner.',
    ],
    partnerMove:
      'When unsure, ask a specific question: When you go quiet like that, is it overwhelm or do you need space? Then act on the answer.',
    practice: {
      title: 'Emote Me game',
      whenToUse: 'In calm moments, to train delight data and antidote precision.',
      steps: [
        'Partner A tries one move to make Partner B smile (touch, memory, tone). Watch what works.',
        'Partner A says one brief declarative line meant to deeply touch Partner B. Success shows in moist eyes, not sadness.',
        'Switch roles. Debrief: what landed, what missed, what to add to the manual.',
        'Optional: list partner\'s three or four vulnerabilities and one antidote per item.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Three or Four Bad Things',
        definition:
          'The handful of topics or situations that reliably spike your partner\'s threat response. Tracking them lets you antidote early instead of guessing wrong under stress.',
      },
      {
        term: 'Antidote',
        definition:
          'The exact move that calms a specific vulnerability for your partner\'s style, like space with a return time for an island. Generic comfort misses the target when primitives are already lit.',
      },
    ],
    visual: {
      type: 'expert-antidotes',
      caption: 'Expertise pairs each vulnerability with a precise antidote, not generic advice.',
    },
    rememberThis: 'Accuracy beats assumption: one follow-up question tonight.',
    sourceStatus: 'Grounded in ch. 4 expert manual, three/four bad things exercise, Emote Me, table 4.2.',
    sourceRefs: ['Ch. 4: Peggy/Simon', 'Ch. 4: three or four bad things', 'Ch. 4: Emote Me game'],
  },
  {
    id: 'launchings-landings',
    number: '05',
    title: 'Launchings and Landings',
    subtitle: 'How to Use Morning and Bedtime Rituals',
    principle: 'Deliberate launchings and landings keep the bond online through separations and reunions.',
    tatkinFrame:
      'Tatkin treats morning, bedtime, departure, and return as attachment events, not logistics. Rebecca and Vince greet each other before children, pets, or guests, embrace until both bodies relax, and only then turn to tasks. Noah and Isabella show how skipped reunions cost hours of fighting.',
    bookStory: {
      label: 'Rebecca and Vince, Noah and Isabella',
      setup:
        'Rebecca and Vince use a Welcome Home ritual: find each other first, hold until relaxation, name tension in the other\'s body. Noah fails to re-attune after separations; small missed hellos compound into big fights.',
      tatkinPoint:
        'Seconds of full reunion often prevent hours of conflict. The nervous system tracks whether you are still go-to people at the door.',
      sourceRef: 'Wired for Love, ch. 5 (Rebecca/Vince Welcome Home, Noah/Isabella, launch/land rituals)',
    },
    whatItTeaches: [
      'Reunion before tasks: partner first, then children, pets, phones, or guests.',
      'Bedtime and morning rituals are launch and land points for the whole household.',
      'Try rituals properly, then skip them, and compare the felt difference.',
    ],
    recognizeIt: [
      'Hellos happen through a door or device without eyes.',
      'You do not know when you will reconnect after time apart.',
      'Bedtime is parallel shutdown, not a shared landing.',
    ],
    partnerMove:
      'Initiate one docking moment today: stop, face your partner, hold eye contact until focus softens, and ask one real question about their day.',
    practice: {
      title: 'Welcome Home ritual',
      whenToUse: 'At the next separation and return, especially after work or travel.',
      steps: [
        'When your partner returns, greet them before other people or tasks.',
        'Look into each other\'s eyes until you see focus soften. No skimping.',
        'Embrace and do not let go until you feel the other relax.',
        'Notice household tone afterward; Tatkin reports even kids and pets settle when parents re-attune.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Launching',
        definition:
          'A deliberate morning or departure ritual that orients you to each other before work or phones take over. It keeps the bond online through separation so reunion is easier.',
      },
      {
        term: 'Landing',
        definition:
          'A deliberate reunion or bedtime ritual where partner comes first before tasks or devices. Full docking here often prevents hours of distance or fighting later.',
      },
    ],
    visual: {
      type: 'ritual-timeline',
      caption: 'Morning launch, daytime apart, evening land, bedtime dock.',
    },
    rememberThis: 'Partner first at the door: eyes, touch if welcome, relax together.',
    sourceStatus: 'Grounded in ch. 5 Welcome Home exercise, Rebecca/Vince and Noah/Isabella examples.',
    sourceRefs: ['Ch. 5: Welcome Home ritual', 'Ch. 5: Rebecca/Vince', 'Ch. 5: Noah/Isabella'],
  },
  {
    id: 'go-to-people',
    number: '06',
    title: 'The Go-To People',
    subtitle: 'How to Remain Available to One Another',
    principle: 'Partners serve as each other\'s primary go-to people, tethered and available 24/7 in spirit.',
    tatkinFrame:
      'Tatkin\'s sixth principle: be the first person your partner can reach for in body and mind. Mary and Pierce, anchor examples, tell each other everything. Eden and David vow to share news with each other first and keep private details inside the bubble. Brian and Marsha show what breaks when a friend or sibling hears distress first. High maintenance here means mutual willingness, not pejorative demand.',
    bookStory: {
      label: 'Mary and Pierce, Brian and Marsha',
      setup:
        'Mary and Pierce act as go-to people for each other with explicit openness. Brian and Marsha drift when Marsha treats others as first call for distress; Brian feels replaced, not partnered.',
      tatkinPoint:
        'Go-to status is a couple-bubble agreement: two can operate better than one when each knows the other is reachable and receptive.',
      sourceRef: 'Wired for Love, ch. 6 (Mary/Pierce, Eden/David, Brian/Marsha, 24/7 agreement)',
    },
    whatItTeaches: [
      'Adult tethering should be mutual, unlike one-way childhood tethering.',
      '24/7 means spirit of availability, not literal instant contact every second.',
      'Develop go-to signals so your partner knows they have full attention.',
    ],
    recognizeIt: [
      'A parent, friend, or coworker hears news before your partner does.',
      'You hesitate to interrupt your partner even when you need them.',
      'Availability feels burdensome instead of synergistic.',
    ],
    partnerMove:
      'When your partner reaches out, treat it as a bubble event: pause, orient fully, and answer the bid before returning to task. Name what you need when you are the one reaching.',
    practice: {
      title: '24/7 go-to agreement',
      whenToUse: 'When you want explicit rules for reachability inside the couple bubble.',
      steps: [
        'Agree you are each other\'s primary go-to people for distress and big news.',
        'List channels and times that count as full availability (text, call, eye contact at home).',
        'Each names one signal that means I need you now versus when you can.',
        'Review for one week: where did outsiders become go-to people instead?',
      ],
    },
    glossaryTerms: [
      {
        term: 'Go-To Person',
        definition:
          'The first person you reach for with distress and big news, and who reaches for you the same way. If someone else hears it first, your partner starts to feel replaced.',
      },
      {
        term: 'Tethering',
        definition:
          'The felt lifeline when both partners agree to be reachable and receptive. Adult tethering should be mutual, unlike the one-way tethering many people had as children.',
      },
    ],
    visual: {
      type: 'go-to-tether',
      caption: 'Two partners linked as first call for body and mind.',
    },
    rememberThis: 'If your partner reaches, turn toward before you turn back to the task.',
    sourceStatus: 'Grounded in ch. 6 sixth principle, 24/7 agreement, Mary/Pierce and Brian/Marsha.',
    sourceRefs: ['Ch. 6: go-to people principle', 'Ch. 6: 24/7 agreement', 'Ch. 6: Mary/Pierce'],
  },
  {
    id: 'protecting-bubble',
    number: '07',
    title: 'Protecting the Couple Bubble',
    subtitle: 'How to Include Outsiders',
    principle: 'Partners prevent each other from becoming a third wheel when relating to outsiders.',
    tatkinFrame:
      'Tatkin\'s seventh principle: thirds (people, children, work, competing loyalties) can amplify a strong bubble or pierce a weak one. Perry and Landa host family dinners united; they plan ahead, protect each other with in-laws and guests, and debrief afterward. Number one is shown in small and large acts, not assumed.',
    bookStory: {
      label: 'Perry and Landa hosting family dinner',
      setup:
        'Perry and Landa regularly host family suppers with in-laws and guests. They agree on strategy beforehand, check in with eye contact during the meal, and protect each other without splitting the bubble. Afterward they debrief in the kitchen.',
      tatkinPoint:
        'When partner is clearly number one, thirds lose threat power. Assumed loyalty erodes faster than demonstrated loyalty.',
      sourceRef: 'Wired for Love, ch. 7 (Perry/Landa, thirds, public protection)',
    },
    whatItTeaches: [
      'Always make your partner number one in word and deed around others.',
      'Secondary go-to people (parents, friends) can function as thirds inside the bubble.',
      'Debrief after social events: where did we protect each other, where did we leak?',
    ],
    recognizeIt: [
      'You vent about your partner to friends or family before talking to your partner.',
      'Inside jokes or alliances with outsiders leave your partner exposed.',
      'You assume your partner knows they are priority without showing it.',
    ],
    partnerMove:
      'Before a social event, agree on one protection move (check-ins, rescue phrases, early exit plan). Afterward, ask: did we make each other number one?',
    practice: {
      title: 'Thirds and public protection inventory',
      whenToUse: 'When family, friends, work, or children compete with the bubble.',
      steps: [
        'List people and priorities that pull attention away from the partnership.',
        'Mark which ones become thirds (competing go-to bonds) versus healthy outside ties.',
        'Each partner names one public moment they felt exposed and what would have helped.',
        'Write one sentence: how we show number-one status in groups this month.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Thirds',
        definition:
          'People, work, or competing loyalties that pull attention between partners. They threaten the bubble when treated as the primary go-to instead of the relationship.',
      },
      {
        term: 'Public Protection',
        definition:
          'Showing a unified front in groups so your partner never feels thrown under the bus. It signals that the partnership outranks looking good or being right to outsiders.',
      },
    ],
    visual: {
      type: 'thirds',
      caption: 'Partners face outward together so thirds cannot split the bubble.',
    },
    rememberThis: 'Show number-one status in small acts; do not assume it is obvious.',
    sourceStatus: 'Grounded in ch. 7 seventh principle, Perry/Landa, thirds and outsider rules.',
    sourceRefs: ['Ch. 7: protecting bubble principle', 'Ch. 7: Perry/Landa', 'Ch. 7: thirds'],
  },
  {
    id: 'fighting-well',
    number: '08',
    title: 'Fighting Well',
    subtitle: 'How to Win by Letting Your Partner Win, Too',
    principle: 'Strong couples fight well: problems get addressed without making either partner the loser.',
    tatkinFrame:
      'Tatkin\'s eighth principle rejects win-lose combat inside the bubble. Losing is not allowed when it means humiliation. Partners in a secure bubble pick up threat cues, repair quickly, and use exercises like Naikan gratefulness inventory to restore fairness and memory of what the other gives.',
    bookStory: {
      label: 'Kathleen and Dennis after job stress',
      setup:
        'When Dennis withdraws over a job demotion, Kathleen insists they talk instead of letting bad memories harden. They negotiate until both feel the solution works, using good for me, good for you rather than hit-and-run shutdown.',
      tatkinPoint:
        'Fighting well means both people remain knowable and safe. Losing is not allowed when it means humiliation; repair and fairness restore the bubble.',
      sourceRef: 'Wired for Love, ch. 8 (Kathleen/Dennis, eighth principle, Naikan gratefulness inventory, fight-well rules)',
    },
    whatItTeaches: [
      'Do not ignore problems, but do not prosecute your partner either.',
      'Gratefulness inventory shifts war brain toward mutual accounting of gifts.',
      'Repair and play (rough-and-tumble when safe) rebuild continuity primitives disrupt.',
    ],
    recognizeIt: [
      'You keep score across unrelated fights.',
      'Winning the point requires your partner to feel small.',
      'The same fight returns because fairness never got restored.',
    ],
    partnerMove:
      'Say I want us on the same side of this. Sit side by side if you can. Name the problem as outside both of you.',
    practice: {
      title: 'Naikan gratefulness inventory',
      whenToUse: 'After repeated conflict or when resentment outruns memory of care.',
      steps: [
        'Set thirty quiet minutes. Draw three columns on paper.',
        'Column 1: What my partner gave me this week (specific, concrete).',
        'Column 2: What I gave my partner this week.',
        'Column 3: What trouble I caused my partner this week. Share aloud without debate.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Fight Well',
        definition:
          'Arguing without humiliation, with both partners on the same side of the problem and repair prioritized. Win-lose combat inside the bubble erodes the safety the relationship runs on.',
      },
      {
        term: 'Naikan',
        definition:
          'A three-column inventory: what my partner gave me, what I gave back, and what trouble I caused. Tatkin uses it to restore fair accounting when resentment outruns memory of care.',
      },
    ],
    visual: {
      type: 'fight-well',
      caption: 'Same side of the table: the problem sits between you, not inside your partner.',
    },
    rememberThis: 'If you want to jab, name the impulse, then protect the bond instead.',
    sourceStatus: 'Grounded in ch. 8 eighth principle, Kathleen/Dennis, Naikan exercise, win-win fighting frame.',
    sourceRefs: ['Ch. 8: fight well principle', 'Ch. 8: Kathleen/Dennis', 'Ch. 8: Naikan gratefulness inventory'],
  },
  {
    id: 'eye-contact',
    number: '09',
    title: 'Love Is Up Close',
    subtitle: 'How to Rekindle Love Through Eye Contact',
    principle: 'Love rekindles up close: eye contact engages ambassadors and calms threat in proximity.',
    tatkinFrame:
      'Tatkin\'s ninth chapter ties closeness to neurobiology: near senses (gaze, touch, scent) vet safety and desire. Consuela, a wave, notices Jose break eye contact at dinner; her primitives read abandonment. Small breaks in gaze can cascade when partners lack a manual for repair.',
    bookStory: {
      label: 'Consuela and Jose at dinner',
      setup:
        'While planning a visit to her parents, Jose looks away at their favorite restaurant. Consuela says nothing in public, then confronts him in bed. Jose insists he always looks at her; Consuela hears withdrawal where Jose sees practicality.',
      tatkinPoint:
        'Eye contact is a primary channel for I am here. For waves especially, broken gaze can feel like relational earthquake; repair needs up-close re-engagement, not argument from across the room.',
      sourceRef: 'Wired for Love, ch. 9 (Consuela/Jose, eye contact, rekindling love up close)',
    },
    whatItTeaches: [
      'Up-close gaze helps read safety; Tatkin notes emotional cues often come from the left eye.',
      'Do not wait until crisis to practice eye contact rituals.',
      'Vary approach, but prioritize face-to-face presence over clever speeches.',
    ],
    recognizeIt: [
      'You discuss emotional topics while multitasking or facing away.',
      'One partner tracks gaze; the other tracks content only.',
      'Physical proximity drops before conflict gets repaired.',
    ],
    partnerMove:
      'Before a hard talk, move within arm\'s length, soften eyes, and hold contact until you see focus soften. Ask if closeness or space helps right now.',
    practice: {
      title: 'Eye contact practice',
      whenToUse: 'Daily, not only during conflict, to keep ambassadors online.',
      steps: [
        'Sit facing each other at arm\'s length without devices.',
        'Hold gentle eye contact for one to two minutes; breathe together.',
        'Each says one sentence you noticed in the other\'s face (softness, tension, fatigue).',
        'End with one brief appreciative line. Do not problem-solve in the same sitting.',
      ],
    },
    glossaryTerms: [
      {
        term: 'Near Senses',
        definition:
          'Close-range channels like gaze, touch, and scent that read safety and desire. Broken eye contact or missing touch can spike primitives before words get parsed.',
      },
      {
        term: 'Stranger-ness',
        definition:
          'The slight unfamiliarity Tatkin says keeps desire alive up close, distinct from weirdness or full mystery. Small shifts in approach help partners feel chosen again instead of taken for granted.',
      },
    ],
    visual: {
      type: 'eye-contact',
      caption: 'Up-close gaze engages ambassadors before words negotiate.',
    },
    rememberThis: 'Move in close, soften eyes, then speak.',
    sourceStatus: 'Grounded in ch. 9 ninth chapter, Consuela/Jose, eye contact rekindling practices.',
    sourceRefs: ['Ch. 9: Love Is Up Close', 'Ch. 9: Consuela/Jose', 'Ch. 9: eye contact practice'],
  },
  {
    id: 'partnership-heals',
    number: '10',
    title: 'Live a Happier, Healthier Life',
    subtitle: 'How Your Partnership Can Heal You',
    principle: 'Partners can be medicine for each other\'s health through touch, stress reduction, and care.',
    tatkinFrame:
      'Tatkin\'s tenth principle links secure functioning to physical health: touch, sleep, stress hormones, and hippocampal function. Knowing your partner\'s three or four bad things helps you detect and reduce stress before it becomes chronic. Partnership heals when bubble, go-to availability, and body contact are routine.',
    bookStory: {
      label: 'Stress, touch, and the healing partnership',
      setup:
        'Tatkin notes chronic stress shrinks hippocampal capacity and dysregulates cortisol. Partners who hug, hold hands, massage, and manage each other\'s sleep or overload literally co-regulate bodies, not only moods.',
      tatkinPoint:
        'Contact is not only affection; it is preventive medicine. Be medicine for each other means daily touch plus active stress stewardship.',
      sourceRef: 'Wired for Love, ch. 10 (tenth principle, Be Medicine for Each Other exercise, touch and health)',
    },
    whatItTeaches: [
      'Track what spikes your partner\'s stress and intervene early.',
      'Nonsexual touch (holding, cuddling, massage) supports healing and regulation.',
      'Secure bubble principles compound into measurable health benefits over time.',
    ],
    recognizeIt: [
      'Touch disappears while logistics dominate.',
      'You notice partner sleep or stress sliding and say nothing.',
      'Health habits are solo projects, not couple projects.',
    ],
    partnerMove:
      'Add one daily contact ritual this week (sixty-second hug, hand-hold during news, bedtime back rub). Ask what kind of touch feels regulating tonight.',
    practice: {
      title: 'Be medicine for each other',
      whenToUse: 'When you want touch and stress care built into ordinary days.',
      steps: [
        'Audit last week: how much nonsexual physical contact did you have?',
        'Each names one stress signal the other can watch for (sleep, appetite, irritability).',
        'Agree on one daily medicine ritual: hug, walk hand-in-hand, or quiet cuddle.',
        'Check in after seven days: what felt better in body and mood?',
      ],
    },
    glossaryTerms: [
      {
        term: 'Co-Regulation',
        definition:
          'Using presence, voice, and touch to help your partner\'s nervous system settle. Daily co-regulation keeps stress from piling into health problems one person handles alone.',
      },
      {
        term: 'Be Medicine',
        definition:
          'Treating touch, sleep, and stress care as daily health practices inside the partnership. It means catching stress signals early, not only comforting after overload.',
      },
    ],
    visual: {
      type: 'healing-touch',
      caption: 'Touch, sleep, and stress care as daily medicine inside the bubble.',
    },
    rememberThis: 'Touch and stress stewardship are health practices, not extras.',
    sourceStatus: 'Grounded in ch. 10 tenth principle, Be Medicine exercise, touch and neuroscience sections.',
    sourceRefs: ['Ch. 10: partnership heals principle', 'Ch. 10: Be Medicine for Each Other'],
  },
];
