import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const supportedLanguages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
];

const resources = {
  en: {
    translation: {
      appName: 'SmritiSetu',
      appSubtitle: 'Digital Heritage Archive of Dr. B. R. Ambedkar',
      nav: {
        home: 'Home',
        archive: 'Archive Explorer',
        chat: 'Ask AI (RAG)',
        avatar: 'Talk to Dr. Ambedkar',
        timeline: '3D Life Timeline',
        admin: 'Curator Portal',
      },
      hero: {
        title: 'Crafted in Indigo. Riveted in Truth.',
        subtitle: 'An AI-powered digital heritage repository preserving the writings, speeches, and living constitutional memory of Babasaheb Dr. B. R. Ambedkar.',
        askAi: 'Ask a Question',
        talkAvatar: 'Talk to Dr. Ambedkar',
        exploreArchive: 'Explore Archive',
        viewTimeline: 'Life Timeline',
      },
      kiosk: {
        touchToBegin: 'Touch To Begin',
        selectLanguage: 'Select Your Language',
        idleWarning: 'Are you still there?',
        idleCountdown: 'Session will reset in {{seconds}} seconds',
        continueSession: 'Continue Browsing',
        resetNow: 'Reset Session',
      },
      status: {
        verified: 'VERIFIED ARCHIVE',
        citations: 'Grounded in {{count}} sources',
        kioskMode: 'Kiosk Mode Active',
      }
    }
  },
  hi: {
    translation: {
      appName: 'स्मृतिसेतु',
      appSubtitle: 'डॉ. बी. आर. अम्बेडकर का डिजिटल विरासत संग्रह',
      nav: {
        home: 'मुख्य पृष्ठ',
        archive: 'अभिलेखागार खोजें',
        chat: 'एआई से पूछें (RAG)',
        avatar: 'डॉ. अम्बेडकर से संवाद',
        timeline: '3D जीवन यात्रा',
        admin: 'क्यूरेटर पोर्टल',
      },
      hero: {
        title: 'नील में गढ़ा। सत्य में जड़ा।',
        subtitle: 'बाबासाहेब डॉ. बी. आर. अम्बेडकर के लेखों, भाषणों और जीवित संवैधानिक स्मृति को संरक्षित करने वाला एआई-संचालित डिजिटल विरासत संग्रह।',
        askAi: 'प्रश्न पूछें',
        talkAvatar: 'डॉ. अम्बेडकर से बात करें',
        exploreArchive: 'अभिलेखागार देखें',
        viewTimeline: 'जीवन यात्रा',
      },
      kiosk: {
        touchToBegin: 'शुरू करने के लिए स्पर्श करें',
        selectLanguage: 'अपनी भाषा चुनें',
        idleWarning: 'क्या आप अभी भी उपस्थित हैं?',
        idleCountdown: 'सत्र {{seconds}} सेकंड में रीसेट हो जाएगा',
        continueSession: 'जारी रखें',
        resetNow: 'सत्र समाप्त करें',
      },
      status: {
        verified: 'सत्यापित अभिलेखागार',
        citations: '{{count}} स्रोतों पर आधारित',
        kioskMode: 'कियोस्क मोड सक्रिय',
      }
    }
  },
  mr: {
    translation: {
      appName: 'स्मृतिसेतु',
      appSubtitle: 'डॉ. बाबासाहेब आंबेडकर यांचे डिजिटल वारसा दालन',
      nav: {
        home: 'मुख्य',
        archive: 'दस्तावेज संग्रह',
        chat: 'एआय प्रश्नोत्तरे',
        avatar: 'डॉ. आंबेडकरांशी संवाद',
        timeline: '3D जीवनपट',
        admin: 'क्युरेटर कक्ष',
      },
      hero: {
        title: 'शिल्प निळ्या रंगाचे। अधिष्ठान सत्याचे।',
        subtitle: 'परमपूज्य डॉ. बाबासाहेब आंबेडकरांचे विचार, भाषणे, पत्रव्यवहार आणि संविधान निर्मितीची जिवंत स्मृती जपणारे कृत्रिम बुद्धिमत्ता आधारित डिजिटल दालन.',
        askAi: 'प्रश्न विचारा',
        talkAvatar: 'बाबासाहेबांशी संवाद साधा',
        exploreArchive: 'संग्रह पहा',
        viewTimeline: 'जीवनपट',
      },
      kiosk: {
        touchToBegin: 'सुरू करण्यासाठी स्पर्श करा',
        selectLanguage: 'भाषा निवडा',
        idleWarning: 'आपण उपस्थित आहात का?',
        idleCountdown: 'सत्र {{seconds}} सेकंदात समाप्त होईल',
        continueSession: 'सुरू ठेवा',
        resetNow: 'सत्र रीसेट करा',
      },
      status: {
        verified: 'प्रमाणित अभिलेखागार',
        citations: '{{count}} अधिकृत संदर्भांवर आधारित',
        kioskMode: 'कियोस्क मोड सुरू',
      }
    }
  },
  ta: {
    translation: {
      appName: 'ஸ்மிருதி சேது',
      appSubtitle: 'டாக்டர் பி. ஆர். அம்பேத்கர் டிஜிட்டல் மரபு ஆவணம்',
      nav: {
        home: 'முகப்பு',
        archive: 'ஆவணக் காப்பகம்',
        chat: 'கேள்வி கேளுங்கள்',
        avatar: 'டாக்டர் அம்பேத்கருடன் உரையாடுங்கள்',
        timeline: '3D வாழ்க்கை காலவரிசை',
        admin: 'நிர்வாகப் பகுதி',
      },
      hero: {
        title: 'நீல நிறத்தில் செதுக்கப்பட்டது. உண்மைகளால் பிணைக்கப்பட்டது.',
        subtitle: 'டாக்டர் பி. ஆர். அம்பேத்கரின் எழுத்துக்கள், உரைகள் மற்றும் அரசியலமைப்பு நினைவுகளைப் பாதுகாக்கும் ஏஐ தளம்.',
        askAi: 'கேள்வி கேளுங்கள்',
        talkAvatar: 'டாக்டர் அம்பேத்கருடன் பேசுங்கள்',
        exploreArchive: 'ஆவணங்களை ஆராயுங்கள்',
        viewTimeline: 'வாழ்க்கை காலவரிசை',
      },
      kiosk: {
        touchToBegin: 'தொடங்க தொடுங்கள்',
        selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
        idleWarning: 'நீங்கள் இன்னும் இருக்கிறீர்களா?',
        idleCountdown: 'அமர்வு {{seconds}} வினாடிகளில் முடிவடையும்',
        continueSession: 'தொடரவும்',
        resetNow: 'மீட்டமைக்கவும்',
      },
      status: {
        verified: 'சரிபார்க்கப்பட்ட ஆவணம்',
        citations: '{{count}} ஆதாரங்களை அடிப்படையாகக் கொண்டது',
        kioskMode: 'கியோஸ்க் முறை செயலில் உள்ளது',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
