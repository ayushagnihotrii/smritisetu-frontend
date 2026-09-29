export interface ArchivalCitation {
  id: string;
  index: number;
  docId: string;
  docTitle: string;
  year: number;
  pageNumber: number;
  snippet: string;
  scanUrl: string;
}

export interface QAPair {
  id: string;
  language: string;
  question: string;
  answer: string;
  citations: ArchivalCitation[];
  grounded: boolean;
  suggestedFollowups: string[];
}

export const QA_DATABASE: QAPair[] = [
  {
    id: 'qa-1',
    language: 'en',
    question: 'Why did Dr. Ambedkar consider Article 32 the "heart and soul" of the Constitution?',
    answer: 'Dr. B. R. Ambedkar considered Article 32 the "heart and soul" of the Constitution because it guarantees the Right to Constitutional Remedies [1]. In his speech to the Constituent Assembly on December 9, 1948, he stated that without Article 32, all fundamental rights would remain mere paper declarations with no legal enforceability. He explained that if any fundamental right is violated by executive or legislative overreach, any citizen has the direct constitutional power to move the Supreme Court through writs such as Habeas Corpus, Mandamus, Prohibition, Quo Warranto, and Certiorari [2].',
    grounded: true,
    citations: [
      {
        id: 'cit-art32-1',
        index: 1,
        docId: 'doc-cad-article-32',
        docTitle: 'Constituent Assembly Debates: Article 32 (Heart and Soul of the Constitution)',
        year: 1948,
        pageNumber: 1,
        snippet: '"If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it."',
        scanUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cit-art32-2',
        index: 2,
        docId: 'doc-cad-final-speech',
        docTitle: 'Farewell Address to the Constituent Assembly (Grammar of Anarchy)',
        year: 1949,
        pageNumber: 1,
        snippet: '"Rights are protected not by laws, but by the social and moral conscience of society. But if fundamental rights are infringed, the judicial remedy under Article 32 is absolute."',
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    suggestedFollowups: [
      'What were the three warnings in Dr. Ambedkar\'s final speech of 1949?',
      'How does Article 32 differ from Article 226?',
      'What did Dr. Ambedkar write about State Socialism in States and Minorities?'
    ]
  },
  {
    id: 'qa-2',
    language: 'en',
    question: 'What was Dr. Ambedkar\'s core thesis in "Annihilation of Caste"?',
    answer: 'In "Annihilation of Caste" (1936), Dr. Ambedkar argued that caste is not merely a benign division of labour, but an unnatural and rigid "division of labourers" into hierarchical, non-communicating compartments [1]. He maintained that economic development or political democracy cannot succeed as long as social hierarchy persists. He famously defined genuine democracy as "primarily a mode of associated living, of conjoint communicated experience" founded on liberty, equality, and fraternity [2].',
    grounded: true,
    citations: [
      {
        id: 'cit-aoc-1',
        index: 1,
        docId: 'doc-annihilation-caste',
        docTitle: 'Annihilation of Caste (Undelivered Speech)',
        year: 1936,
        pageNumber: 1,
        snippet: '"Caste is not just a division of labour; it is essentially a division of labourers. Civilised society undoubtedly needs division of labour, but in no civilized society is division of labour accompanied by this unnatural division of labourers into water-tight compartments."',
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cit-aoc-2',
        index: 2,
        docId: 'doc-annihilation-caste',
        docTitle: 'Annihilation of Caste (Undelivered Speech)',
        year: 1936,
        pageNumber: 2,
        snippet: '"Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards one\'s fellow men."',
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    suggestedFollowups: [
      'Why was the Jat-Pat-Todak Mandal speech cancelled in 1936?',
      'What was Mahatma Gandhi\'s response to Annihilation of Caste?',
      'What did Dr. Ambedkar mean by "Grammar of Anarchy"?'
    ]
  },
  {
    id: 'qa-3',
    language: 'en',
    question: 'What major labour reforms did Dr. Ambedkar introduce in India?',
    answer: 'As the Member for Labour in the Viceroy\'s Executive Council (1942–1946), Dr. Ambedkar enacted revolutionary protections for working people [1]. Foremost among these was officially reducing the legal working day from 12 hours to 8 hours across Indian industries. He also established mandatory paid maternity benefits for women miners and factory workers, created India\'s first national Employment Exchange system, and founded the Tripartite Labour Conference which remains India\'s highest forum for tripartite labour dispute resolution [2]. Furthermore, he conceptualized India\'s multipurpose river valley projects including the Damodar Valley Corporation (DVC) and Hirakud Dam to provide national electrical power and agricultural irrigation.',
    grounded: true,
    citations: [
      {
        id: 'cit-labour-1',
        index: 1,
        docId: 'doc-labour-charter-1942',
        docTitle: 'Labour Charter & The 8-Hour Workday Act: Viceroy\'s Council Speech',
        year: 1942,
        pageNumber: 1,
        snippet: '"Labour is the backbone of any progressive nation. The reduction of hours of work from 12 to 8 hours is not merely an economic adjustment; it is a fundamental human requirement to ensure that workers have leisure for intellectual improvement, family life, and civic participation."',
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cit-labour-2',
        index: 2,
        docId: 'doc-states-and-minorities',
        docTitle: 'States and Minorities: What are Their Rights and How to Secure Them',
        year: 1947,
        pageNumber: 1,
        snippet: '"The state must establish minimum wage levels, social insurance against unemployment and sickness, and statutory recognition of collective trade union bargaining without state interference."',
        scanUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    suggestedFollowups: [
      'How did Dr. Ambedkar contribute to the Damodar Valley Corporation?',
      'What was the Independent Labour Party\'s election manifesto in 1937?',
      'Why did Dr. Ambedkar resign over the Hindu Code Bill?'
    ]
  },
  {
    id: 'qa-4',
    language: 'hi',
    question: 'डॉ. अम्बेडकर ने हिंदू कोड बिल पर मंत्रिमंडल से इस्तीफा क्यों दिया?',
    answer: 'डॉ. बी. आर. अम्बेडकर ने 10 अक्टूबर 1951 को कानून मंत्री के पद से ऐतिहासिक इस्तीफा दिया क्योंकि संसद में हिंदू कोड बिल को पारित होने से रोक दिया गया था [1]। इस प्रगतिशील विधेयक के माध्यम से वे महिलाओं को पैतृक संपत्ति में समान उत्तराधिकार, एकविवाह (monogamy), और तलाक के अधिकार दिलाना चाहते थे। अपने त्यागपत्र वक्तव्य में उन्होंने स्पष्ट कहा: "मैं किसी समुदाय की प्रगति को उस प्रगति की डिग्री से मापता हूँ जो महिलाओं ने हासिल की है" [2]।',
    grounded: true,
    citations: [
      {
        id: 'cit-hcb-1',
        index: 1,
        docId: 'doc-hindu-code-bill',
        docTitle: 'Statement on Resignation from the Cabinet (The Hindu Code Bill)',
        year: 1951,
        pageNumber: 1,
        snippet: '"I measure the progress of a community by the degree of progress which women have achieved. To leave inequality between class and class, between sex and sex, which is the very soul of Hindu Society, untouched and to go on passing legislation on economic problems is to make a farce of our Constitution and to build a palace on a dung heap."',
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    suggestedFollowups: [
      'अनुच्छेद 32 को संविधान की आत्मा क्यों कहा गया?',
      'महाड सत्याग्रह का मुख्य उद्देश्य क्या था?',
      'मूकनायक समाचार पत्र की स्थापना कब हुई थी?'
    ]
  },
  {
    id: 'qa-5',
    language: 'mr',
    question: 'महाडच्या चवदार तळ्याच्या सत्याग्रहाचे ऐतिहासिक महत्त्व काय आहे?',
    answer: '२० मार्च १९२७ रोजी डॉ. बाबासाहेब आंबेडकरांनी महाड येथील चवदार तळ्यावर सत्याग्रह केला [1]. हा सत्याग्रह केवळ तळ्याचे पाणी पिण्यापुरता मर्यादित नव्हता, तर अस्पृश्य मानल्या गेलेल्या बांधवांच्या मूलभूत मानवी हक्कांची आणि समानतेची जाहीर घोषणा होती. बाबासाहेबांनी स्पष्ट शब्दांत सांगितले की, "हा लढा पाण्यासाठी नाही. पाण्याचा एक घोट प्यायल्याने आपले दारिद्र्य संपणार नाही, तर आपणही इतर माणसांप्रमाणे जगण्याचा समान अधिकार असलेली माणसे आहोत हे सिद्ध करण्यासाठी हा लढा आहे" [2].',
    grounded: true,
    citations: [
      {
        id: 'cit-mr-mahad-1',
        index: 1,
        docId: 'doc-mahad-satyagraha',
        docTitle: 'Mahad Satyagraha Declaration: The Assertion of Universal Human Rights',
        year: 1927,
        pageNumber: 1,
        snippet: '"हा लढा पाण्यासाठी नाही. पाण्याचा एक घोट प्यायल्याने आपले दारिद्र्य संपणार नाही किंवा आपण अमर होणार नाही. हा लढा आपणही माणसे आहोत आणि आपल्यालाही इतर माणसांप्रमाणे जगण्याचा समान अधिकार आहे हे सिद्ध करण्यासाठी आहे."',
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
      }
    ],
    suggestedFollowups: [
      'मनुस्मृती दहन दिन का साजरा केला गेला?',
      'बहिष्कृत हितकारिणी सभेचे ब्रीदवाक्य काय होते?',
      'दीक्षाभूमीवर १९५६ साली काय घडले?'
    ]
  }
];

export const STARTER_PROMPTS: Record<string, string[]> = {
  en: [
    'Why did Dr. Ambedkar call Article 32 the heart and soul of the Constitution?',
    'What were the three warnings in Dr. Ambedkar\'s final Constituent Assembly speech?',
    'Explain Dr. Ambedkar\'s thesis on "The Problem of the Rupee" and the RBI.',
    'What labor rights and hours reforms did Dr. Ambedkar enact in 1942?',
    'Why did Dr. Ambedkar resign as Law Minister over the Hindu Code Bill?'
  ],
  hi: [
    'डॉ. अम्बेडकर ने अनुच्छेद 32 को संविधान की आत्मा और हृदय क्यों कहा?',
    'संविधान सभा के अंतिम भाषण में कौन सी तीन चेतावनियाँ दी गईं?',
    'डॉ. अम्बेडकर ने हिंदू कोड बिल पर इस्तीफा क्यों दिया?',
    'महाड सत्याग्रह का मुख्य ऐतिहासिक उद्देश्य क्या था?',
    'डॉ. अम्बेडकर ने कामगारों के लिए 8 घंटे के कार्य दिवस की शुरुआत कैसे की?'
  ],
  mr: [
    'महाडच्या चवदार तळ्याच्या सत्याग्रहाचे ऐतिहासिक महत्त्व काय होते?',
    'डॉ. आंबेडकरांनी संविधानाच्या कलम ३२ ला "संविधानाचा आत्मा" का म्हटले?',
    'हिंदू कोड बिलावरून डॉ. आंबेडकरांनी राजीनामा का दिला?',
    'मूकनायक वृत्तपत्राची स्थापना आणि त्याची ध्येयधोरणे काय होती?',
    '१९५६ च्या दीक्षाभूमीवरील धम्म दीक्षेचे महत्त्व काय आहे?'
  ],
  ta: [
    'டாக்டர் அம்பேத்கர் அரசியலமைப்பு உறுப்பு 32-ஐ அதன் இதயம் மற்றும் ஆன்மா என்று ஏன் அழைத்தார்?',
    'இந்து சட்ட மசோதா குறித்து டாக்டர் அம்பேத்கர் ஏன் பதவி விலகினார்?',
    'டாக்டர் அம்பேத்கர் கொண்டுவந்த 8 மணி நேர வேலை நாள் சீர்திருத்தம் என்ன?'
  ]
};
