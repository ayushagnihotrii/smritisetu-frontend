export interface ArchivalDocument {
  id: string;
  title: string;
  originalTitle?: string;
  type: 'book' | 'speech' | 'letter' | 'photo' | 'cad';
  year: number;
  date: string;
  language: string;
  availableLanguages: string[];
  sourceArchive: string;
  accessionNumber: string;
  verificationStatus: 'verified' | 'in-review' | 'pending';
  verificationHash: string;
  rights: string;
  tags: string[];
  summary: string;
  thumbnail: string;
  scanPages: {
    pageNumber: number;
    scanUrl: string;
    ocrText: string;
    highlights?: string[];
  }[];
  citationsCount: number;
}

export const ARCHIVE_DOCUMENTS: ArchivalDocument[] = [
  {
    id: 'doc-annihilation-caste',
    title: 'Annihilation of Caste (Undelivered Speech)',
    originalTitle: 'जाति का विनाश',
    type: 'book',
    year: 1936,
    date: '1936-05-15',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu'],
    sourceArchive: 'Ambedkar Memorial Archives, New Delhi & Bombay University',
    accessionNumber: 'AMA-1936-BK-001',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    rights: 'Public Domain / Open Archival Commons',
    tags: ['Caste', 'Social Reform', 'Democracy', 'Human Rights', 'Philosophy'],
    summary: 'The seminal critique of the Hindu caste system prepared as an undelivered presidential address for the Jat-Pat-Todak Mandal conference in Lahore. Dr. Ambedkar demonstrates that caste is not merely a division of labour, but a division of labourers.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    citationsCount: 142,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'ANNIHILATION OF CASTE\nWITH A REPLY TO MAHATMA GANDHI\n\nSection I: The Problem Before Reformers\n"Caste is not just a division of labour; it is essentially a division of labourers. Civilised society undoubtedly needs division of labour, but in no civilized society is division of labour accompanied by this unnatural division of labourers into water-tight compartments."',
        highlights: ['division of labourers', 'unnatural division']
      },
      {
        pageNumber: 2,
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'Section II: The Real Meaning of Democracy\n"Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience. It is essentially an attitude of respect and reverence towards one\'s fellow men."',
        highlights: ['mode of associated living', 'attitude of respect']
      }
    ]
  },
  {
    id: 'doc-cad-article-32',
    title: 'Constituent Assembly Debates: Article 32 (Heart and Soul of the Constitution)',
    originalTitle: 'संविधान सभा वादविवाद: अनुच्छेद 32',
    type: 'cad',
    year: 1948,
    date: '1948-12-09',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi', 'Tamil'],
    sourceArchive: 'Parliamentary Archives of India, New Delhi',
    accessionNumber: 'CAD-VOL-VII-1948-12-09',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:d41d8cd98f00b204e9800998ecf8427e',
    rights: 'Government of India Parliamentary Records (Crown / Public Access)',
    tags: ['Constitution', 'Article 32', 'Fundamental Rights', 'Judiciary', 'Writs'],
    summary: 'Dr. Ambedkar\'s iconic defense of the Right to Constitutional Remedies. When asked which article he considered most important, he famously declared Article 32 to be the very soul and heart of the Constitution without which it would be a nullity.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    citationsCount: 289,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'CONSTITUENT ASSEMBLY OF INDIA\nThursday, 9th December 1948\n\nThe Honourable Dr. B. R. Ambedkar: "If I was asked to name any particular article in this Constitution as the most important—an article without which this Constitution would be a nullity—I could not refer to any other article except this one. It is the very soul of the Constitution and the very heart of it."',
        highlights: ['soul of the Constitution', 'heart of it', 'nullity']
      }
    ]
  },
  {
    id: 'doc-problem-rupee',
    title: 'The Problem of the Rupee: Its Origin and Its Solution',
    originalTitle: 'रुपये की समस्या: इसका उद्भव और समाधान',
    type: 'book',
    year: 1923,
    date: '1923-04-10',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi'],
    sourceArchive: 'London School of Economics Library & Reserve Bank of India Archives',
    accessionNumber: 'LSE-1923-DSC-AMB',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:88d4266fd4e6338d13b845fcf289579d209c897823b9217da3e161936f031589',
    rights: 'Public Domain',
    tags: ['Economics', 'Currency', 'Monetary Policy', 'LSE', 'Central Banking'],
    summary: 'Dr. Ambedkar\'s doctoral thesis at the London School of Economics, which served as a foundational blueprint for the establishment of the Reserve Bank of India (RBI) and the Hilton Young Commission.',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
    citationsCount: 88,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'THE PROBLEM OF THE RUPEE\nBy B. R. Ambedkar, D.Sc. (Econ.), London\n\n"The trade of a country depends upon the stability of its internal price level and not on the stability of its external exchange. A currency policy must aim at keeping the purchasing power of money stable."',
        highlights: ['stability of its internal price level', 'purchasing power']
      }
    ]
  },
  {
    id: 'doc-mahad-satyagraha',
    title: 'Mahad Satyagraha Declaration: The Assertion of Universal Human Rights',
    originalTitle: 'महाड सत्याग्रह घोषणा: चवदार तळे',
    type: 'speech',
    year: 1927,
    date: '1927-03-20',
    language: 'Marathi',
    availableLanguages: ['Marathi', 'English', 'Hindi'],
    sourceArchive: 'Maharashtra State Archives, Mumbai',
    accessionNumber: 'MSA-1927-SP-MAHAD',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    rights: 'Archival Heritage Free Access',
    tags: ['Mahad', 'Chavdar Lake', 'Civil Rights', 'Water Rights', 'Satyagraha'],
    summary: 'Historic speech delivered at Mahad where thousands marched to Chavdar Lake to drink water. Dr. Ambedkar emphasized that the struggle was not merely for water, but to establish fundamental human equality.',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    citationsCount: 164,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'महाड चवदार तळे भाषण (२० मार्च १९२७)\n\n"हा लढा पाण्यासाठी नाही. पाण्याचा एक घोट प्यायल्याने आपले दारिद्र्य संपणार नाही किंवा आपण अमर होणार नाही. हा लढा आपणही माणसे आहोत आणि आपल्यालाही इतर माणसांप्रमाणे जगण्याचा समान अधिकार आहे हे सिद्ध करण्यासाठी आहे."\n\n[Translation]: "We are not going to the Chavadar Tank merely to drink water. We are going to establish that we are also human beings like others."',
        highlights: ['माणसे आहोत', 'human beings', 'समान अधिकार']
      }
    ]
  },
  {
    id: 'doc-cad-final-speech',
    title: 'Farewell Address to the Constituent Assembly (Grammar of Anarchy)',
    originalTitle: 'संविधान सभा में अंतिम भाषण: अराजकता का व्याकरण',
    type: 'speech',
    year: 1949,
    date: '1949-11-25',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi', 'Tamil', 'Kannada', 'Bengali'],
    sourceArchive: 'National Archives of India, Janpath, New Delhi',
    accessionNumber: 'NAI-1949-CAD-CLOSING',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:a68393c52e1286ff45e3f43477ec53da88e2cf5a730ec5ecba28987b46d0a79a',
    rights: 'National Heritage Document',
    tags: ['Democracy', 'Constitution', 'Equality', 'Fraternity', 'Grammar of Anarchy', 'Bhakti'],
    summary: 'Dr. Ambedkar\'s prophetic final speech on the adoption of the Constitution. He warned of three dangers: abandoning constitutional methods for unconstitutional methods ("Grammar of Anarchy"), the peril of hero-worship/bhakti in politics, and the urgent need to achieve economic and social democracy alongside political democracy.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
    citationsCount: 310,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'SPEECH DELIVERED BY DR. B. R. AMBEDKAR\nConstituent Assembly of India, 25 November 1949\n\n"On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. In politics we will be recognising the principle of one man one vote and one vote one value. In our social and economic life, we shall, by reason of our social and economic structure, continue to deny the principle of one man one value."',
        highlights: ['life of contradictions', 'one man one value', 'Grammar of Anarchy']
      }
    ]
  },
  {
    id: 'doc-letter-dubois',
    title: 'Letter to Dr. W. E. B. Du Bois on Civil Rights & Global Solidarity',
    originalTitle: 'डब्ल्यू. ई. बी. डु बॉइस को ऐतिहासिक पत्र',
    type: 'letter',
    year: 1946,
    date: '1946-07-31',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi'],
    sourceArchive: 'W. E. B. Du Bois Papers, University of Massachusetts Amherst Archives',
    accessionNumber: 'UMASS-MS-312-AMB-1946',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:69b59e3568c072c443673c4fb57b282914101e4bc4112e40ee8cf57f78119c8f',
    rights: 'Open Academic Research Commons',
    tags: ['Global Solidarity', 'Du Bois', 'African American Civil Rights', 'Dalit Rights', 'Human Rights'],
    summary: 'Historical correspondence linking the Dalit liberation movement in India with the African American Civil Rights struggle in the United States. Dr. Ambedkar requests copies of the National Negro Congress petition to the UN.',
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    citationsCount: 65,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'Rajgriha, Hindu Colony, Dadar, Bombay 14\nJuly 31, 1946\n\nDear Dr. Du Bois,\nAlthough I have not met you personally, I have been a student of your work on the Negro question in America. There is so much similarity between the position of the Untouchables in India and of the position of the Negroes in America that the study of the latter is of great interest to those like myself who are engaged in ameliorating the condition of the Untouchables.',
        highlights: ['similarity between the position', 'Untouchables in India', 'Negroes in America']
      }
    ]
  },
  {
    id: 'doc-hindu-code-bill',
    title: 'Statement on Resignation from the Cabinet (The Hindu Code Bill)',
    originalTitle: 'मंत्रिमंडल से त्यागपत्र पर वक्तव्य: हिंदू कोड बिल',
    type: 'speech',
    year: 1951,
    date: '1951-10-10',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi', 'Tamil'],
    sourceArchive: 'Lok Sabha Secretariat Archives, New Delhi',
    accessionNumber: 'LSA-1951-RES-AMB-01',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    rights: 'Parliamentary Heritage Access',
    tags: ['Women Rights', 'Hindu Code Bill', 'Law Minister', 'Gender Equality', 'Inheritance'],
    summary: 'Dr. Ambedkar\'s principled resignation as Law Minister when the progressive Hindu Code Bill—which granted women equal rights in inheritance, marriage, and divorce—was stalled in Parliament.',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    citationsCount: 194,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'PARLIAMENTARY STATEMENT BY DR. B. R. AMBEDKAR\n10 October 1951\n\n"I measure the progress of a community by the degree of progress which women have achieved. To leave inequality between class and class, between sex and sex, which is the very soul of Hindu Society, untouched and to go on passing legislation on economic problems is to make a farce of our Constitution and to build a palace on a dung heap."',
        highlights: ['degree of progress which women have achieved', 'palace on a dung heap']
      }
    ]
  },
  {
    id: 'doc-buddha-and-dhamma',
    title: 'The Buddha and His Dhamma: Philosophy of Liberty, Equality, and Fraternity',
    originalTitle: 'भगवान बुद्ध आणि त्यांचा धम्म',
    type: 'book',
    year: 1957,
    date: '1957-04-14',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali'],
    sourceArchive: 'Siddharth College Archives & People\'s Education Society, Mumbai',
    accessionNumber: 'PES-1957-BHD-001',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    rights: 'Public Domain / Cultural Heritage Trust',
    tags: ['Buddhism', 'Dhamma', 'Morality', 'Equality', 'Prajna', 'Karuna'],
    summary: 'Dr. Ambedkar\'s masterwork on the life and teachings of the Buddha. He presents Buddhism as a rational, social morality aimed at ending suffering, cultivating wisdom (Prajna) and compassion (Karuna) for all beings.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    citationsCount: 220,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'THE BUDDHA AND HIS DHAMMA\nBook III: What the Buddha Taught\n\n"Religion must relate to morals. Morality is Dhamma and Dhamma is Morality. What is the difference between Morality and Dhamma? In Dhamma morality takes the place of God. Dhamma is righteousness, which means right relations between man and man in all spheres of life."',
        highlights: ['morality takes the place of God', 'right relations between man and man']
      }
    ]
  },
  {
    id: 'doc-photo-signing-constitution',
    title: 'Archival Photograph: Dr. Ambedkar Signing the Constitution of India',
    originalTitle: 'संविधान पर हस्ताक्षर करते बाबासाहेब का दुर्लभ चित्र',
    type: 'photo',
    year: 1950,
    date: '1950-01-24',
    language: 'Visual / Archival Record',
    availableLanguages: ['English', 'Hindi', 'Marathi'],
    sourceArchive: 'Photo Division, Ministry of Information & Broadcasting, Government of India',
    accessionNumber: 'PD-GOI-1950-CONST-0042',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:3b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39def2d127d1',
    rights: 'National Photo Archives of India (Govt. of India)',
    tags: ['Photograph', 'Signing', 'Constitution', 'Constitution Hall', 'Historic'],
    summary: 'Rare high-resolution archival photograph of Dr. B. R. Ambedkar, Chairman of the Drafting Committee, signing the original calligraphed and illuminated manuscript of the Constitution of India in Constitution Hall, New Delhi.',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    citationsCount: 45,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'ARCHIVAL PHOTOGRAPHIC RECORD\nDate: 24 January 1950\nLocation: Constitution Hall (Central Hall of Parliament), New Delhi\nSubject: Dr. B. R. Ambedkar signing the English calligraphed manuscript of the Constitution of India.\nResolution: 4000x3000 at 300 DPI.',
        highlights: ['Constitution Hall', 'English calligraphed manuscript']
      }
    ]
  },
  {
    id: 'doc-states-and-minorities',
    title: 'States and Minorities: What are Their Rights and How to Secure Them',
    originalTitle: 'राज्य आणि अल्पसंख्याक',
    type: 'book',
    year: 1947,
    date: '1947-03-15',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi'],
    sourceArchive: 'All India Scheduled Castes Federation Archives, New Delhi',
    accessionNumber: 'AISCF-1947-SM-001',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:55f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90aa',
    rights: 'Open Archival Heritage',
    tags: ['State Socialism', 'Fundamental Rights', 'Agriculture', 'Key Industries', 'Economic Democracy'],
    summary: 'A proposed Constitution for the United States of India submitted to the Constituent Assembly. In it, Dr. Ambedkar advocated "State Socialism"—nationalization of key industries and basic agricultural land to guarantee economic equality alongside political rights.',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    citationsCount: 112,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'STATES AND MINORITIES\nArticle II, Section II: Provisions for the Supply of Capital and Land\n\n"The main purpose behind the clause is to put an obligation on the State to plan the economic life of the people on lines which would lead to highest point of productivity without closing the avenue to private enterprise, and also provide for the equitable distribution of wealth. The plan must establish State Socialism in basic industries."',
        highlights: ['State Socialism', 'plan the economic life', 'equitable distribution of wealth']
      }
    ]
  },
  {
    id: 'doc-mooknayak-editorial',
    title: 'Mooknayak Editorial: The Awakening of the Voice of the Voiceless',
    originalTitle: 'मूकनायक अग्रलेख: बहिष्कृत भारताचा उद्घोष',
    type: 'speech',
    year: 1920,
    date: '1920-01-31',
    language: 'Marathi',
    availableLanguages: ['Marathi', 'English', 'Hindi'],
    sourceArchive: 'Mumbai Marathi Sahitya Sangh Archives, Mumbai',
    accessionNumber: 'MN-1920-ED-001',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:44b22777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf88',
    rights: 'Historical Newspaper Commons',
    tags: ['Mooknayak', 'Journalism', 'Free Press', 'Caste', 'Social Awakening'],
    summary: 'The inaugural front-page editorial of Mooknayak (Leader of the Mute), the historic fortnightly paper founded by Dr. Ambedkar with financial help from Chhatrapati Shahu Maharaj of Kolhapur. Ambedkar compares Indian society to a multi-storey tower with no staircase.',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=600&q=80',
    citationsCount: 95,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=80',
        ocrText: 'मूकनायक (३१ जानेवारी १९२०)\n"हिंदू समाज ही अनेक मजल्यांची एक भव्य इमारत आहे; पण दुर्दैवाची गोष्ट ही की, या इमारतीला एका मजल्यावरून दुसऱ्या मजल्यावर जाण्यासाठी कोणताही जिना नाही. ज्या मजल्यावर ज्याचा जन्म झाला, त्याच मजल्यावर त्याला मरण पावले पाहिजे."\n\n[Translation]: "Hindu society is a tower with several storeys, but without a staircase to climb from one to another. He who is born in a particular storey must die in that storey."',
        highlights: ['अनेक मजल्यांची एक भव्य इमारत', 'कोणताही जिना नाही', 'tower without a staircase']
      }
    ]
  },
  {
    id: 'doc-labour-charter-1942',
    title: 'Labour Charter & The 8-Hour Workday Act: Viceroy\'s Council Speech',
    originalTitle: 'कामगार सनद आणि ८ तासांचा कामाचा दिवस',
    type: 'speech',
    year: 1942,
    date: '1942-11-27',
    language: 'English',
    availableLanguages: ['English', 'Hindi', 'Marathi'],
    sourceArchive: 'Ministry of Labour Archives, New Delhi',
    accessionNumber: 'ML-1942-SP-AMB-8HR',
    verificationStatus: 'verified',
    verificationHash: 'SHA256:11f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d90cc',
    rights: 'Government of India Historical Records',
    tags: ['Labour', '8-Hour Workday', 'Workers Rights', 'Maternity Benefit', 'Trade Union'],
    summary: 'As Member for Labour in the Viceroy\'s Executive Council (1942-1946), Dr. Ambedkar officially reduced India\'s legal working day from 12 hours to 8 hours, instituted compulsory paid leave, and established the Tripartite Labour Conference.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    citationsCount: 153,
    scanPages: [
      {
        pageNumber: 1,
        scanUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        ocrText: '7TH INDIAN LABOUR CONFERENCE, NEW DELHI\nAddress by the Hon\'ble Dr. B. R. Ambedkar\n\n"Labour is the backbone of any progressive nation. The reduction of hours of work from 12 to 8 hours is not merely an economic adjustment; it is a fundamental human requirement to ensure that workers have leisure for intellectual improvement, family life, and civic participation."',
        highlights: ['12 to 8 hours', 'fundamental human requirement', 'civic participation']
      }
    ]
  }
];
