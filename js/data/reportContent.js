// MindCompass — Report Content (India-localized)

const REPORT_CONTENT = {
  anxiety: {
    condition: 'Anxiety & Overwhelm',
    emoji: '🌊',
    tagLabel: 'Anxiety Pattern Detected',
    tagColor: '#e0f2fe',
    tagTextColor: '#0369a1',
    conditionColor: '#0ea5e9',
    what: {
      title: 'What this might mean',
      content: `Your mind and body are showing signs of anxiety or stress overload. Your body\'s "fight or flight" system may be stuck in the ON position — which is exhausting, not a character flaw. In today\'s world of academic pressure, social media comparison, and constant hustle, this is an incredibly common response in young people.

Anxiety often makes you feel like danger is always around the corner, even when things are objectively okay. The physical symptoms (racing heart, restlessness, difficulty breathing) are real and valid.`
    },
    coping: [
      {
        icon: '🫁',
        iconBg: '#dbeafe',
        title: '4-7-8 Breathing Technique',
        desc: 'Inhale for 4 counts, hold for 7, exhale slowly for 8. This activates your parasympathetic nervous system and can reduce acute anxiety within 2–3 cycles. Try the interactive breathing guide in the next section.',
        hasBreathing: true
      },
      {
        icon: '🧊',
        iconBg: '#e0f2fe',
        title: 'Cold Exposure (Dive Reflex)',
        desc: 'Splash ice-cold water on your face or hold ice cubes. This triggers the mammalian dive reflex, instantly slowing your heart rate by activating your vagus nerve. It works within 30 seconds.'
      },
      {
        icon: '☕',
        iconBg: '#fef3c7',
        title: 'Limit Stimulants',
        desc: 'Caffeine, energy drinks (Red Bull, Monster), and even excessive sugar mimic the physical symptoms of panic — racing heart, jitteriness, shallow breathing. Try cutting back for one week and notice the difference.'
      },
      {
        icon: '📵',
        iconBg: '#f0fdf4',
        title: 'Digital Boundaries',
        desc: 'Set a "no-phone" rule 30 minutes before bed. News, social media, and notifications keep your nervous system in alert mode. Try the Grayscale mode on your phone to reduce its pull.'
      }
    ],
    healing: [
      {
        icon: '🌍',
        iconBg: '#ecfdf5',
        title: '5-4-3-2-1 Grounding Exercise',
        desc: 'Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This forces your brain out of anxious future-thinking into the present moment.',
        hasGrounding: true
      },
      {
        icon: '📓',
        iconBg: '#fdf4ff',
        title: 'Brain Dump Journaling',
        desc: 'Every night, write everything in your head onto paper — worries, to-dos, fears, random thoughts. This "externalizes" the noise from your mind onto paper, often bringing instant relief.'
      },
      {
        icon: '🚶',
        iconBg: '#f0fdf4',
        title: '20-Minute Walk (Without Earphones)',
        desc: 'Walking, especially in nature, reduces cortisol levels. The "without earphones" part is key — it allows your brain to process thoughts naturally rather than suppressing them.'
      },
      {
        icon: '🧘',
        iconBg: '#ede9f6',
        title: 'Progressive Muscle Relaxation',
        desc: 'Starting from your toes, tense each muscle group for 5 seconds then release. This physically discharges the stored tension anxiety creates in your body.'
      }
    ],
    doctor: [
      { text: 'You are having panic attacks that make you feel like you cannot breathe or are dying.', crisis: false },
      { text: 'Your anxiety is stopping you from going to school, college, work, or seeing friends.', crisis: false },
      { text: 'You are relying on substances (alcohol, vaping, tobacco, etc.) to calm down.', crisis: false },
      { text: 'You lie awake most nights due to racing thoughts or worry.', crisis: false },
      { text: 'You have thoughts of hurting yourself to escape the anxiety.', crisis: true },
    ]
  },

  depression: {
    condition: 'Low Mood & Depression',
    emoji: '🌧️',
    tagLabel: 'Depressive Pattern Detected',
    tagColor: '#ede9f6',
    tagTextColor: '#6b52b5',
    conditionColor: '#7c3aed',
    what: {
      title: 'What this might mean',
      content: `Your responses suggest signs of low mood, depression, or burnout. This means your brain\'s reward and energy centers may be depleted. Depression is not "being sad" — it is a very real condition that affects how you think, feel, sleep, and function.

In India, depression is severely underdiagnosed in young people, often dismissed as "being lazy" or "overthinking." What you are experiencing has a biological basis and is not a sign of weakness. You deserve support.`
    },
    coping: [
      {
        icon: '🌅',
        iconBg: '#fef9c3',
        title: 'Consistent Sleep Schedule',
        desc: 'Go to bed and wake up at the exact same time every single day — including weekends. Depression disrupts your circadian rhythm. Regularity is the most powerful free treatment for it.'
      },
      {
        icon: '☀️',
        iconBg: '#fef3c7',
        title: 'Morning Sunlight',
        desc: 'Get 15 minutes of direct sunlight within an hour of waking up. This regulates your serotonin and melatonin levels, directly impacting mood. In India, morning light (before 9 AM) is ideal.'
      },
      {
        icon: '🐟',
        iconBg: '#dbeafe',
        title: 'Nutrition — Omega-3s & Hydration',
        desc: 'Eat foods rich in Omega-3 fatty acids (walnuts, flaxseeds, fatty fish). Stay hydrated — even mild dehydration worsens brain fog and low mood. Avoid processed sugar spikes.'
      },
      {
        icon: '🏃',
        iconBg: '#dcfce7',
        title: 'Movement (Even 10 Minutes)',
        desc: 'Exercise releases BDNF — a protein that literally grows new neural connections in your brain. You do not need a gym. A 10-minute brisk walk or stretching at home counts. Start impossibly small.'
      }
    ],
    healing: [
      {
        icon: '🛏️',
        iconBg: '#ede9f6',
        title: 'Behavioral Activation',
        desc: 'Depression thrives on inertia. Do ONE tiny low-effort task per day — make your bed, wash one dish, step outside for 2 minutes. The task is not the point; proving to yourself you can act is the point.'
      },
      {
        icon: '👥',
        iconBg: '#f0fdf4',
        title: 'Social Connection (Low Pressure)',
        desc: 'You do not need to be "on" for others. Simply being near a trusted person — a family member, a friend — can help. Depression lies and tells you to isolate. Gently resist it.'
      },
      {
        icon: '📱',
        iconBg: '#fdf4ff',
        title: 'Curate Your Social Media Feed',
        desc: 'Unfollow or mute any account that consistently makes you feel inadequate. Follow creators focused on mindfulness, nature, slow living, and mental health. Your feed is your mental diet.'
      },
      {
        icon: '📖',
        iconBg: '#fff7ed',
        title: 'Gratitude Log (3 Things)',
        desc: 'Each night, write 3 things that were not terrible today. This does not cure depression, but it gradually trains your brain to notice the non-negative — which is the first step.'
      }
    ],
    doctor: [
      { text: 'The low mood has lasted longer than two weeks consistently.', crisis: false },
      { text: 'You have lost interest in hobbies or activities you used to love.', crisis: false },
      { text: 'You have experienced significant changes in appetite or weight.', crisis: false },
      { text: 'You feel hopeless about the future — not just worried, but hopeless.', crisis: false },
      { text: 'You have thoughts of self-harm, suicide, or not wanting to exist.', crisis: true },
    ]
  },

  burnout: {
    condition: 'Burnout & Exhaustion',
    emoji: '🕯️',
    tagLabel: 'Burnout Pattern Detected',
    tagColor: '#fef3c7',
    tagTextColor: '#92400e',
    conditionColor: '#d97706',
    what: {
      title: 'What this might mean',
      content: `Burnout is what happens when chronic stress goes unaddressed for too long. It is characterized by exhaustion, detachment, and a feeling that nothing you do matters. This is incredibly common among students and young professionals in India, where hustle culture and academic pressure are constant.

Burnout is not laziness. It is your mind and body hitting a hard wall after running on empty for too long. Recovery is possible, but it requires actual rest — not just a weekend off.`
    },
    coping: [
      {
        icon: '🛑',
        iconBg: '#fee2e2',
        title: 'Identify and Remove One Commitment',
        desc: 'Look at your current commitments — classes, clubs, social obligations, side projects. Identify one that is draining more than it gives. Give yourself permission to step back from it.'
      },
      {
        icon: '😴',
        iconBg: '#ede9f6',
        title: 'Prioritize True Rest',
        desc: 'Rest is not watching 4 hours of reels while anxious. True rest means activities that genuinely restore you — a nap, a slow walk, cooking, reading a physical book. Schedule it like an appointment.'
      },
      {
        icon: '🎯',
        iconBg: '#dbeafe',
        title: 'Set Hard Boundaries',
        desc: 'Practice saying no. Burnout is often a result of overcommitting. One powerful phrase: "I\'d love to, but I\'m at capacity right now." Saying no to one thing is saying yes to your health.'
      },
      {
        icon: '🌿',
        iconBg: '#dcfce7',
        title: 'Nature Exposure',
        desc: 'Even 20 minutes in a park, garden, or near water significantly reduces stress hormones. In urban India, find a neighborhood park, a lake, or even a quiet tree-lined street.'
      }
    ],
    healing: [
      {
        icon: '🎨',
        iconBg: '#fdf4ff',
        title: 'Reconnect with a Hobby (No Goals)',
        desc: 'Burnout disconnects you from joy. Pick one hobby that has zero productivity attached to it — drawing, cooking, music, crafts. Do it badly. Do it with no outcome in mind.'
      },
      {
        icon: '📅',
        iconBg: '#f0fdf4',
        title: 'Weekly Rhythm Planning',
        desc: 'Instead of daily to-do lists, plan your week with energy in mind. Schedule high-focus tasks in your peak hours, and protect low-energy time for recovery — do not fill every gap.'
      },
      {
        icon: '🤝',
        iconBg: '#ecfdf5',
        title: 'Talk to Someone You Trust',
        desc: 'Burnout thrives in silence. Talk to a friend, sibling, or mentor. You do not need solutions — just being heard reduces the sense of isolation that burnout creates.'
      },
      {
        icon: '🚿',
        iconBg: '#e0f2fe',
        title: 'Cold Shower Ritual',
        desc: 'End your shower with 30-60 seconds of cold water. It sounds awful but research shows it significantly boosts dopamine levels and alertness — the exact things burnout depletes.'
      }
    ],
    doctor: [
      { text: 'The exhaustion is so severe you cannot complete basic daily tasks.', crisis: false },
      { text: 'You feel completely detached from your work, studies, or relationships.', crisis: false },
      { text: 'You have been experiencing symptoms for more than 3 months.', crisis: false },
      { text: 'You are using alcohol, substances, or excessive sleep to cope.', crisis: false },
      { text: 'You have thoughts of not wanting to continue or harming yourself.', crisis: true },
    ]
  },

  mixed: {
    condition: 'Mixed Stress Profile',
    emoji: '🌤️',
    tagLabel: 'Mixed Signals Detected',
    tagColor: '#f0fdf4',
    tagTextColor: '#166534',
    conditionColor: '#16a34a',
    what: {
      title: 'What this might mean',
      content: `Your responses show a mix of symptoms across anxiety, low mood, and exhaustion. This is actually very common — mental health rarely fits neatly into one category. Many people experience anxiety AND low mood AND burnout simultaneously, especially during stressful life phases.

The good news: many of the coping strategies for each overlap. Starting with basics — sleep, movement, connection, and reducing stimulants — can have a broad positive effect across all three areas.`
    },
    coping: [
      {
        icon: '🌙',
        iconBg: '#ede9f6',
        title: 'Sleep as the Foundation',
        desc: 'Fix sleep first. Poor sleep worsens anxiety, deepens depression, and accelerates burnout simultaneously. Target 7.5–9 hours with a consistent schedule.'
      },
      {
        icon: '🫁',
        iconBg: '#dbeafe',
        title: '4-7-8 Breathing',
        desc: 'This single technique addresses all three: calms anxiety, signals safety to a depressed nervous system, and gives an exhausted mind a moment of stillness.',
        hasBreathing: true
      },
      {
        icon: '💧',
        iconBg: '#e0f2fe',
        title: 'Radical Hydration',
        desc: 'Drink 2.5–3 liters of water daily. Dehydration alone can cause fatigue, mood drops, and increased anxiety. It sounds overly simple — but most of us are chronically dehydrated.'
      },
      {
        icon: '📵',
        iconBg: '#fef3c7',
        title: 'Social Media Detox (72 Hours)',
        desc: 'Try a 72-hour complete break from Instagram, YouTube Shorts, and similar. Notice how your baseline anxiety and mood shift. Many people are shocked by the result.'
      }
    ],
    healing: [
      {
        icon: '📓',
        iconBg: '#fdf4ff',
        title: 'Daily Brain Dump',
        desc: 'Write freely for 10 minutes every morning. No structure, no grammar — just whatever is in your head. This clears mental clutter before the day begins.'
      },
      {
        icon: '🤗',
        iconBg: '#fff7ed',
        title: 'One Meaningful Connection Per Week',
        desc: 'Identify one person you feel genuinely safe with and spend time with them — in person if possible. Not to talk about problems, just to be human together.'
      },
      {
        icon: '🌳',
        iconBg: '#dcfce7',
        title: 'Nature Time',
        desc: 'A 20-minute walk outdoors, without your phone, addresses anxiety, depression, and burnout simultaneously. It is one of the most evidence-backed mood interventions available.'
      },
      {
        icon: '🎯',
        iconBg: '#f0fdf4',
        title: 'Two-Item Daily Win List',
        desc: 'Each morning, write two tiny things you will do today. Not ambitious goals — tiny, achievable actions. Completing them builds the momentum that mixed-stress states destroy.'
      }
    ],
    doctor: [
      { text: 'Your symptoms persist for more than 3–4 weeks.', crisis: false },
      { text: 'You are struggling significantly with daily functioning.', crisis: false },
      { text: 'You feel overwhelmed to the point of not knowing where to start.', crisis: false },
      { text: 'Relationships and performance at school or work are significantly impacted.', crisis: false },
      { text: 'You have any thoughts of self-harm or not wanting to be here anymore.', crisis: true },
    ]
  },

  wellness: {
    condition: 'General Wellness',
    emoji: '🌱',
    tagLabel: 'Good Baseline Detected',
    tagColor: '#f0fdf4',
    tagTextColor: '#166534',
    conditionColor: '#16a34a',
    what: {
      title: 'What this means',
      content: `Based on your responses, you do not seem to be experiencing significant signs of anxiety, depression, or burnout right now. That is genuinely great to hear.

However, checking in is itself an act of self-awareness — and building protective habits now makes you more resilient when life gets hard. Use MindCompass to build your mental fitness before you need it.`
    },
    coping: [
      {
        icon: '💪',
        iconBg: '#dcfce7',
        title: 'Build Your Stress Buffer',
        desc: 'Regular exercise (even 20 min/day), quality sleep, and limiting alcohol create a "stress buffer" — meaning you can handle more difficulty before breaking down.'
      },
      {
        icon: '🧘',
        iconBg: '#ede9f6',
        title: 'Start a Mindfulness Practice',
        desc: 'Just 5 minutes of focused breathing daily rewires your brain over weeks. Apps like Headspace (or free YouTube guided meditations) are great starting points.'
      },
      {
        icon: '👥',
        iconBg: '#dbeafe',
        title: 'Invest in Your Relationships',
        desc: 'Research consistently shows that the quality of your relationships is the single strongest predictor of long-term happiness and mental resilience. Nurture them now.'
      },
      {
        icon: '🎯',
        iconBg: '#fef3c7',
        title: 'Know Your Warning Signs',
        desc: 'Everyone has early warning signs that stress is building — for some it is irritability, for others it is sleep disruption. Learn yours so you can intervene early.'
      }
    ],
    healing: [
      {
        icon: '📓',
        iconBg: '#fdf4ff',
        title: 'Preventive Journaling',
        desc: 'A weekly emotional check-in journal helps you spot patterns before they become problems. 5 minutes every Sunday evening.'
      },
      {
        icon: '🌿',
        iconBg: '#dcfce7',
        title: 'Maintain Social Connections',
        desc: 'Loneliness is as damaging as smoking 15 cigarettes a day, research says. Make time for meaningful in-person connection every week.'
      },
      {
        icon: '🛌',
        iconBg: '#e0f2fe',
        title: 'Protect Your Sleep',
        desc: 'Sleep is where mental health is built and restored. Protect it ferociously — same time, dark room, cool temperature, no screens 30 min before bed.'
      },
      {
        icon: '🆘',
        iconBg: '#fff7ed',
        title: 'Know Where to Go if Things Change',
        desc: 'Bookmark this app. Check in monthly. If things shift, you will already have a plan. You can also set up the Daily Wellness Tracker to catch early changes.'
      }
    ],
    doctor: [
      { text: 'You notice significant changes in your mood or energy lasting more than 2 weeks.', crisis: false },
      { text: 'A major life event (loss, breakup, academic failure) deeply impacts your functioning.', crisis: false },
      { text: 'You start relying on substances to feel normal or to have fun.', crisis: false },
      { text: 'You or someone close to you notices worrying behavioral changes.', crisis: false },
      { text: 'Any thoughts of self-harm — reach out immediately.', crisis: true },
    ]
  }
};
