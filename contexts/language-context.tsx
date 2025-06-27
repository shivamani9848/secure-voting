"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type LanguageCode = "en" | "hi" | "bn" | "te" | "ta"

interface LanguageContextType {
  currentLanguage: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translation dictionaries
const translations = {
  en: {
    // Header
    "site.title": "SecureVoting",
    "site.subtitle": "Secure Digital Voting",

    // Navigation
    "nav.home": "Home",
    "nav.register": "Register",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.dashboard": "Dashboard",

    // Home Page
    "home.hero.title": "Secure Digital Voting",
    "home.hero.subtitle":
      "Secure, transparent, and accessible voting for every Indian citizen. Vote from anywhere with complete security and privacy.",
    "home.register.button": "Register to Vote",
    "home.login.button": "Login",
    "home.features.title": "Why Choose Our Platform?",
    "home.feature.blockchain.title": "Blockchain Security",
    "home.feature.blockchain.desc": "Every vote is secured on the blockchain, ensuring transparency and immutability.",
    "home.feature.voterid.title": "Voter ID Integration",
    "home.feature.voterid.desc": "Seamless integration with Indian Voter ID system for authentic verification.",
    "home.feature.multilang.title": "Multi-Language Support",
    "home.feature.multilang.desc": "Available in Hindi, English, and other regional languages for accessibility.",

    // Registration
    "register.title": "Register to Vote",
    "register.voterid": "Voter ID",
    "register.voterid.placeholder": "Enter your Voter ID",
    "register.email": "Email",
    "register.email.placeholder": "Enter your email",
    "register.mobile": "Mobile Number",
    "register.mobile.placeholder": "+91 XXXXXXXXXX",
    "register.state": "State",
    "register.state.placeholder": "Select your state",
    "register.constituency": "Constituency",
    "register.constituency.placeholder": "Enter your constituency",
    "register.password": "Password",
    "register.password.placeholder": "Create a password",
    "register.confirmPassword": "Confirm Password",
    "register.confirmPassword.placeholder": "Confirm your password",
    "register.button": "Register",
    "register.login.link": "Already have an account? Login",

    // Login
    "login.title": "Login to Vote",
    "login.voterid.tab": "Voter ID",
    "login.email.tab": "Email",
    "login.mobile": "Mobile Number",
    "login.otp.button": "Get OTP",
    "login.otp": "OTP",
    "login.otp.placeholder": "Enter 6-digit OTP",
    "login.voterid.button": "Login with Voter ID",
    "login.email.button": "Login with Email",
    "login.register.link": "Don't have an account? Register",

    // Dashboard
    "dashboard.title": "Voting Dashboard",
    "dashboard.welcome": "Welcome, Voter!",
    "dashboard.voterid": "Voter ID",
    "dashboard.constituency": "Constituency",
    "dashboard.voted": "Voted",
    "dashboard.not.voted": "Not Voted",
    "dashboard.vote.success": "Your vote has been successfully recorded on the blockchain!",
    "dashboard.candidates.title": "Candidates",
    "dashboard.vote.button": "Vote",
    "dashboard.voting": "Recording Vote...",
    "dashboard.your.vote": "Your Vote",
    "dashboard.blockchain.title": "Blockchain Security",
    "dashboard.blockchain.desc": "Your vote is secured using blockchain technology",
    "dashboard.network.status": "Network Status",
    "dashboard.connected": "✓ Connected",
    "dashboard.last.block": "Last Block",
    "dashboard.gas.fee": "Gas Fee",

    // Common
    "common.back": "Back to Home",
    "common.age": "Age",
    "common.education": "Education",
    "common.footer": "© 2024 SecureVoting Platform. All rights reserved.",
    "common.footer.subtitle": "Powered by Blockchain Technology",

    // Thank You Page
    "thankyou.title": "Thank You for Voting!",
    "thankyou.subtitle": "Your vote has been successfully recorded",
    "thankyou.message":
      "Your participation in democracy matters. Your vote has been securely recorded on the blockchain and will be counted in the election results.",
    "thankyou.transaction": "Transaction ID",
    "thankyou.block": "Block Number",
    "thankyou.timestamp": "Voted At",
    "thankyou.status": "Voting Status",
    "thankyou.completed": "Completed Successfully",
    "thankyou.return": "Return to Dashboard",
    "thankyou.share": "Share Your Achievement",
    "thankyou.certificate": "Download Voting Certificate",

    // Admin
    "admin.login.title": "Admin Login",
    "admin.login.subtitle": "Access the administrative dashboard",
    "admin.username": "Username",
    "admin.username.placeholder": "Enter admin username",
    "admin.password": "Password",
    "admin.password.placeholder": "Enter admin password",
    "admin.login.button": "Login as Admin",
    "admin.login.error": "Invalid username or password",
    "admin.dashboard.title": "Admin Dashboard",
    "admin.dashboard.welcome": "Welcome, Administrator",
    "admin.overview": "Overview",
    "admin.voters": "Registered Voters",
    "admin.votes": "Total Votes Cast",
    "admin.candidates": "Candidates",
    "admin.elections": "Elections",
    "admin.voters.title": "Voter Management",
    "admin.voters.search": "Search voters...",
    "admin.voters.id": "Voter ID",
    "admin.voters.name": "Name",
    "admin.voters.email": "Email",
    "admin.voters.mobile": "Mobile",
    "admin.voters.state": "State",
    "admin.voters.constituency": "Constituency",
    "admin.voters.status": "Status",
    "admin.voters.verified": "Verified",
    "admin.voters.pending": "Pending",
    "admin.voters.actions": "Actions",
    "admin.candidates.title": "Candidate Management",
    "admin.candidates.add": "Add New Candidate",
    "admin.candidates.edit": "Edit Candidate",
    "admin.candidates.delete": "Delete Candidate",
    "admin.candidates.name": "Candidate Name",
    "admin.candidates.party": "Political Party",
    "admin.candidates.symbol": "Symbol",
    "admin.candidates.description": "Description",
    "admin.candidates.save": "Save Candidate",
    "admin.candidates.cancel": "Cancel",
    "admin.votes.title": "Vote Statistics",
    "admin.votes.total": "Total Votes",
    "admin.votes.turnout": "Voter Turnout",
    "admin.votes.by.candidate": "Votes by Candidate",
    "admin.votes.by.constituency": "Votes by Constituency",
    "admin.stats.registered": "Registered Voters",
    "admin.stats.voted": "Votes Cast",
    "admin.stats.pending": "Pending Verification",
    "admin.stats.turnout.rate": "Turnout Rate",

    // Footer Contact
    "footer.contact.title": "Contact Support",
    "footer.helpline": "24/7 Helpline",
    "footer.support.email": "Support Email",
    "footer.hours": "Office Hours",
    "footer.hours.time": "Mon-Fri: 9:00 AM - 6:00 PM",
    "footer.emergency.note": "For voting emergencies during election hours, call the helpline immediately",
  },

  hi: {
    // Header
    "site.title": "सिक्योरवोटिंग",
    "site.subtitle": "सुरक्षित डिजिटल मतदान",

    // Navigation
    "nav.home": "होम",
    "nav.register": "पंजीकरण",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    "nav.dashboard": "डैशबोर्ड",

    // Home Page
    "home.hero.title": "सुरक्षित डिजिटल मतदान",
    "home.hero.subtitle":
      "हर भारतीय नागरिक के लिए सुरक्षित, पारदर्शी और सुलभ मतदान। पूर्ण सुरक्षा और गोपनीयता के साथ कहीं से भी मतदान करें।",
    "home.register.button": "मतदान के लिए पंजीकरण करें",
    "home.login.button": "लॉगिन",
    "home.features.title": "हमारा प्लेटफॉर्म क्यों चुनें?",
    "home.feature.blockchain.title": "ब्लॉकचेन सुरक्षा",
    "home.feature.blockchain.desc": "हर वोट ब्लॉकचेन पर सुरक्षित है, पारदर्शिता और अपरिवर्तनीयता सुनिश्चित करता है।",
    "home.feature.voterid.title": "वोटर आईडी एकीकरण",
    "home.feature.voterid.desc": "प्रामाणिक सत्यापन के लिए भारतीय वोटर आईडी सिस्टम के साथ निर्बाध एकीकरण।",
    "home.feature.multilang.title": "बहु-भाषा समर्थन",
    "home.feature.multilang.desc": "पहुंच के लिए हिंदी, अंग्रेजी और अन्य क्षेत्रीय भाषाओं में उपलब्ध।",

    // Registration
    "register.title": "मतदान के लिए पंजीकरण करें",
    "register.voterid": "मतदाता पहचान पत्र",
    "register.voterid.placeholder": "अपना वोटर आईडी दर्ज करें",
    "register.email": "ईमेल",
    "register.email.placeholder": "अपना ईमेल दर्ज करें",
    "register.mobile": "मोबाइल नंबर",
    "register.mobile.placeholder": "+91 XXXXXXXXXX",
    "register.state": "राज्य",
    "register.state.placeholder": "अपना राज्य चुनें",
    "register.constituency": "निर्वाचन क्षेत्र",
    "register.constituency.placeholder": "अपना निर्वाचन क्षेत्र दर्ज करें",
    "register.password": "पासवर्ड",
    "register.password.placeholder": "पासवर्ड बनाएं",
    "register.confirmPassword": "पासवर्ड की पुष्टि करें",
    "register.confirmPassword.placeholder": "अपने पासवर्ड की पुष्टि करें",
    "register.button": "पंजीकरण करें",
    "register.login.link": "पहले से खाता है? लॉगिन करें",

    // Login
    "login.title": "मतदान के लिए लॉगिन करें",
    "login.voterid.tab": "वोटर आईडी",
    "login.email.tab": "ईमेल",
    "login.mobile": "मोबाइल नंबर",
    "login.otp.button": "ओटीपी प्राप्त करें",
    "login.otp": "ओटीपी",
    "login.otp.placeholder": "6-अंकीय ओटीपी दर्ज करें",
    "login.voterid.button": "वोटर आईडी से लॉगिन",
    "login.email.button": "ईमेल से लॉगिन",
    "login.register.link": "खाता नहीं है? पंजीकरण करें",

    // Dashboard
    "dashboard.title": "मतदान डैशबोर्ड",
    "dashboard.welcome": "स्वागत है, मतदाता!",
    "dashboard.voterid": "वोटर आईडी",
    "dashboard.constituency": "निर्वाचन क्षेत्र",
    "dashboard.voted": "मतदान किया गया",
    "dashboard.not.voted": "मतदान नहीं किया गया",
    "dashboard.vote.success": "आपका वोट सफलतापूर्वक ब्लॉकचेन पर दर्ज हो गया है!",
    "dashboard.candidates.title": "उम्मीदवार",
    "dashboard.vote.button": "मतदान करें",
    "dashboard.voting": "वोट दर्ज कर रहे हैं...",
    "dashboard.your.vote": "आपका वोट",
    "dashboard.blockchain.title": "ब्लॉकचेन सुरक्षा",
    "dashboard.blockchain.desc": "आपका वोट ब्लॉकचेन तकनीक का उपयोग करके सुरक्षित है",
    "dashboard.network.status": "नेटवर्क स्थिति",
    "dashboard.connected": "✓ जुड़ा हुआ",
    "dashboard.last.block": "अंतिम ब्लॉक",
    "dashboard.gas.fee": "गैस शुल्क",

    // Common
    "common.back": "होम पर वापस",
    "common.age": "आयु",
    "common.education": "शिक्षा",
    "common.footer": "© 2024 सिक्योरवोटिंग प्लेटफॉर्म। सभी अधिकार सुरक्षित।",
    "common.footer.subtitle": "ब्लॉकचेन तकनीक द्वारा संचालित",

    // Thank You Page
    "thankyou.title": "मतदान के लिए धन्यवाद!",
    "thankyou.subtitle": "आपका वोट सफलतापूर्वक दर्ज हो गया है",
    "thankyou.message":
      "लोकतंत्र में आपकी भागीदारी महत्वपूर्ण है। आपका वोट ब्लॉकचेन पर सुरक्षित रूप से दर्ज किया गया है और चुनाव परिणामों में गिना जाएगा।",
    "thankyou.transaction": "लेनदेन आईडी",
    "thankyou.block": "ब्लॉक संख्या",
    "thankyou.timestamp": "मतदान समय",
    "thankyou.status": "मतदान स्थिति",
    "thankyou.completed": "सफलतापूर्वक पूर्ण",
    "thankyou.return": "डैशबोर्ड पर वापस जाएं",
    "thankyou.share": "अपनी उपलब्धि साझा करें",
    "thankyou.certificate": "मतदान प्रमाणपत्र डाउनलोड करें",

    // Admin
    "admin.login.title": "प्रशासक लॉगिन",
    "admin.login.subtitle": "प्रशासनिक डैशबोर्ड तक पहुंच",
    "admin.username": "उपयोगकर्ता नाम",
    "admin.username.placeholder": "प्रशासक उपयोगकर्ता नाम दर्ज करें",
    "admin.password": "पासवर्ड",
    "admin.password.placeholder": "प्रशासक पासवर्ड दर्ज करें",
    "admin.login.button": "प्रशासक के रूप में लॉगिन",
    "admin.login.error": "अमान्य उपयोगकर्ता नाम या पासवर्ड",
    "admin.dashboard.title": "प्रशासक डैशबोर्ड",
    "admin.dashboard.welcome": "स्वागत है, प्रशासक",
    "admin.overview": "अवलोकन",
    "admin.voters": "पंजीकृत मतदाता",
    "admin.votes": "कुल डाले गए वोट",
    "admin.candidates": "उम्मीदवार",
    "admin.elections": "चुनाव",
    "admin.voters.title": "मतदाता प्रबंधन",
    "admin.voters.search": "मतदाताओं को खोजें...",
    "admin.voters.id": "वोटर आईडी",
    "admin.voters.name": "नाम",
    "admin.voters.email": "ईमेल",
    "admin.voters.mobile": "मोबाइल",
    "admin.voters.state": "राज्य",
    "admin.voters.constituency": "निर्वाचन क्षेत्र",
    "admin.voters.status": "स्थिति",
    "admin.voters.verified": "सत्यापित",
    "admin.voters.pending": "लंबित",
    "admin.voters.actions": "कार्य",
    "admin.candidates.title": "उम्मीदवार प्रबंधन",
    "admin.candidates.add": "नया उम्मीदवार जोड़ें",
    "admin.candidates.edit": "उम्मीदवार संपादित करें",
    "admin.candidates.delete": "उम्मीदवार हटाएं",
    "admin.candidates.name": "उम्मीदवार का नाम",
    "admin.candidates.party": "राजनीतिक पार्टी",
    "admin.candidates.symbol": "प्रतीक",
    "admin.candidates.description": "विवरण",
    "admin.candidates.save": "उम्मीदवार सहेजें",
    "admin.candidates.cancel": "रद्द करें",
    "admin.votes.title": "वोट आंकड़े",
    "admin.votes.total": "कुल वोट",
    "admin.votes.turnout": "मतदाता मतदान",
    "admin.votes.by.candidate": "उम्मीदवार के अनुसार वोट",
    "admin.votes.by.constituency": "निर्वाचन क्षेत्र के अनुसार वोट",
    "admin.stats.registered": "पंजीकृत मतदाता",
    "admin.stats.voted": "डाले गए वोट",
    "admin.stats.pending": "सत्यापन लंबित",
    "admin.stats.turnout.rate": "मतदान दर",

    // Footer Contact
    "footer.contact.title": "सहायता संपर्क",
    "footer.helpline": "24/7 हेल्पलाइन",
    "footer.support.email": "सहायता ईमेल",
    "footer.hours": "कार्यालय समय",
    "footer.hours.time": "सोम-शुक्र: सुबह 9:00 - शाम 6:00",
    "footer.emergency.note": "चुनाव के दौरान मतदान आपातकाल के लिए, तुरंत हेल्पलाइन पर कॉल करें",
  },

  bn: {
    // Header
    "site.title": "সিকিউরভোটিং",
    "site.subtitle": "নিরাপদ ডিজিটাল ভোটিং",

    // Navigation
    "nav.home": "হোম",
    "nav.register": "নিবন্ধন",
    "nav.login": "লগইন",
    "nav.logout": "লগআউট",
    "nav.dashboard": "ড্যাশবোর্ড",

    // Home Page
    "home.hero.title": "নিরাপদ ডিজিটাল ভোটিং",
    "home.hero.subtitle":
      "প্রতিটি ভারতীয় নাগরিকের জন্য নিরাপদ, স্বচ্ছ এবং সহজলভ্য ভোটিং। সম্পূর্ণ নিরাপত্তা এবং গোপনীয়তার সাথে যেকোনো জায়গা থেকে ভোট দিন।",
    "home.register.button": "ভোটের জন্য নিবন্ধন করুন",
    "home.login.button": "লগইন",
    "home.features.title": "কেন আমাদের প্ল্যাটফর্ম বেছে নেবেন?",
    "home.feature.blockchain.title": "ব্লকচেইন নিরাপত্তা",
    "home.feature.blockchain.desc": "প্রতিটি ভোট ব্লকচেইনে সুরক্ষিত, স্বচ্ছতা এবং অপরিবর্তনীয়তা নিশ্চিত করে।",
    "home.feature.voterid.title": "ভোটার আইডি একীকরণ",
    "home.feature.voterid.desc": "প্রামাণিক যাচাইয়ের জন্য ভারতীয় ভোটার আইডি সিস্টেমের সাথে নিরবচ্ছিন্ন একীকরণ।",
    "home.feature.multilang.title": "বহু-ভাষা সমর্থন",
    "home.feature.multilang.desc": "অ্যাক্সেসিবিলিটির জন্য হিন্দি, ইংরেজি এবং অন্যান্য আঞ্চলিক ভাষায় উপলব্ধ।",

    // Registration
    "register.title": "ভোটের জন্য নিবন্ধন করুন",
    "register.voterid": "ভোটার আইডি",
    "register.voterid.placeholder": "আপনার ভোটার আইডি লিখুন",
    "register.email": "ইমেইল",
    "register.email.placeholder": "আপনার ইমেইল লিখুন",
    "register.mobile": "মোবাইল নম্বর",
    "register.mobile.placeholder": "+91 XXXXXXXXXX",
    "register.state": "রাজ্য",
    "register.state.placeholder": "আপনার রাজ্য নির্বাচন করুন",
    "register.constituency": "নির্বাচনী এলাকা",
    "register.constituency.placeholder": "আপনার নির্বাচনী এলাকা লিখুন",
    "register.password": "পাসওয়ার্ড",
    "register.password.placeholder": "একটি পাসওয়ার্ড তৈরি করুন",
    "register.confirmPassword": "পাসওয়ার্ড নিশ্চিত করুন",
    "register.confirmPassword.placeholder": "আপনার পাসওয়ার্ড নিশ্চিত করুন",
    "register.button": "নিবন্ধন করুন",
    "register.login.link": "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন",

    // Login
    "login.title": "ভোটের জন্য লগইন করুন",
    "login.voterid.tab": "ভোটার আইডি",
    "login.email.tab": "ইমেইল",
    "login.mobile": "মোবাইল নম্বর",
    "login.otp.button": "OTP পান",
    "login.otp": "OTP",
    "login.otp.placeholder": "৬-সংখ্যার OTP লিখুন",
    "login.voterid.button": "ভোটার আইডি দিয়ে লগইন",
    "login.email.button": "ইমেইল দিয়ে লগইন",
    "login.register.link": "অ্যাকাউন্ট নেই? নিবন্ধন করুন",

    // Dashboard
    "dashboard.title": "ভোটিং ড্যাশবোর্ড",
    "dashboard.welcome": "স্বাগতম, ভোটার!",
    "dashboard.voterid": "ভোটার আইডি",
    "dashboard.constituency": "নির্বাচনী এলাকা",
    "dashboard.voted": "ভোট দেওয়া হয়েছে",
    "dashboard.not.voted": "ভোট দেওয়া হয়নি",
    "dashboard.vote.success": "আপনার ভোট সফলভাবে ব্লকচেইনে রেকর্ড হয়েছে!",
    "dashboard.candidates.title": "প্রার্থীরা",
    "dashboard.vote.button": "ভোট দিন",
    "dashboard.voting": "ভোট রেকর্ড করা হচ্ছে...",
    "dashboard.your.vote": "আপনার ভোট",
    "dashboard.blockchain.title": "ব্লকচেইন নিরাপত্তা",
    "dashboard.blockchain.desc": "আপনার ভোট ব্লকচেইন প্রযুক্তি ব্যবহার করে সুরক্ষিত",
    "dashboard.network.status": "নেটওয়ার্ক অবস্থা",
    "dashboard.connected": "✓ সংযুক্ত",
    "dashboard.last.block": "শেষ ব্লক",
    "dashboard.gas.fee": "গ্যাস ফি",

    // Common
    "common.back": "হোমে ফিরে যান",
    "common.age": "বয়স",
    "common.education": "শিক্ষা",
    "common.footer": "© ২০২৪ সিকিউরভোটিং প্ল্যাটফর্ম। সমস্ত অধিকার সংরক্ষিত।",
    "common.footer.subtitle": "ব্লকচেইন প্রযুক্তি দ্বারা চালিত",

    // Thank You Page
    "thankyou.title": "ভোটের জন্য ধন্যবাদ!",
    "thankyou.subtitle": "আপনার ভোট সফলভাবে রেকর্ড হয়েছে",
    "thankyou.message":
      "গণতন্ত্রে আপনার অংশগ্রহণ গুরুত্বপূর্ণ। আপনার ভোট ব্লকচেইনে নিরাপদে রেকর্ড করা হয়েছে এবং নির্বাচনের ফলাফলে গণনা করা হবে।",
    "thankyou.transaction": "লেনদেন আইডি",
    "thankyou.block": "ব্লক নম্বর",
    "thankyou.timestamp": "ভোটের সময়",
    "thankyou.status": "ভোটিং অবস্থা",
    "thankyou.completed": "সফলভাবে সম্পন্ন",
    "thankyou.return": "ড্যাশবোর্ডে ফিরে যান",
    "thankyou.share": "আপনার অর্জন শেয়ার করুন",
    "thankyou.certificate": "ভোটিং সার্টিফিকেট ডাউনলোড করুন",

    // Admin
    "admin.login.title": "অ্যাডমিন লগইন",
    "admin.login.subtitle": "প্রশাসনিক ড্যাশবোর্ড অ্যাক্সেস",
    "admin.username": "ব্যবহারকারীর নাম",
    "admin.username.placeholder": "অ্যাডমিন ব্যবহারকারীর নাম লিখুন",
    "admin.password": "পাসওয়ার্ড",
    "admin.password.placeholder": "অ্যাডমিন পাসওয়ার্ড লিখুন",
    "admin.login.button": "অ্যাডমিন হিসেবে লগইন",
    "admin.login.error": "অবৈধ ব্যবহারকারীর নাম বা পাসওয়ার্ড",
    "admin.dashboard.title": "অ্যাডমিন ড্যাশবোর্ড",
    "admin.dashboard.welcome": "স্বাগতম, প্রশাসক",
    "admin.overview": "সংক্ষিপ্ত বিবরণ",
    "admin.voters": "নিবন্ধিত ভোটার",
    "admin.votes": "মোট ভোট দেওয়া হয়েছে",
    "admin.candidates": "প্রার্থীরা",
    "admin.elections": "নির্বাচন",
    "admin.voters.title": "ভোটার ব্যবস্থাপনা",
    "admin.voters.search": "ভোটার খুঁজুন...",
    "admin.voters.id": "ভোটার আইডি",
    "admin.voters.name": "নাম",
    "admin.voters.email": "ইমেইল",
    "admin.voters.mobile": "মোবাইল",
    "admin.voters.state": "রাজ্য",
    "admin.voters.constituency": "নির্বাচনী এলাকা",
    "admin.voters.status": "অবস্থা",
    "admin.voters.verified": "যাচাইকৃত",
    "admin.voters.pending": "অপেক্ষমাণ",
    "admin.voters.actions": "কার্যক্রম",
    "admin.candidates.title": "প্রার্থী ব্যবস্থাপনা",
    "admin.candidates.add": "নতুন প্রার্থী যোগ করুন",
    "admin.candidates.edit": "প্রার্থী সম্পাদনা",
    "admin.candidates.delete": "প্রার্থী মুছুন",
    "admin.candidates.name": "প্রার্থীর নাম",
    "admin.candidates.party": "রাজনৈতিক দল",
    "admin.candidates.symbol": "প্রতীক",
    "admin.candidates.description": "বিবরণ",
    "admin.candidates.save": "প্রার্থী সংরক্ষণ",
    "admin.candidates.cancel": "বাতিল",
    "admin.votes.title": "ভোট পরিসংখ্যান",
    "admin.votes.total": "মোট ভোট",
    "admin.votes.turnout": "ভোটার উপস্থিতি",
    "admin.votes.by.candidate": "প্রার্থী অনুযায়ী ভোট",
    "admin.votes.by.constituency": "নির্বাচনী এলাকা অনুযায়ী ভোট",
    "admin.stats.registered": "নিবন্ধিত ভোটার",
    "admin.stats.voted": "ভোট দেওয়া হয়েছে",
    "admin.stats.pending": "যাচাই অপেক্ষমাণ",
    "admin.stats.turnout.rate": "উপস্থিতির হার",

    // Footer Contact
    "footer.contact.title": "সহায়তা যোগাযোগ",
    "footer.helpline": "২৪/৭ হেল্পলাইন",
    "footer.support.email": "সহায়তা ইমেইল",
    "footer.hours": "অফিস সময়",
    "footer.hours.time": "সোম-শুক্র: সকাল ৯:০০ - সন্ধ্যা ৬:০০",
    "footer.emergency.note": "নির্বাচনের সময় ভোটিং জরুরি অবস্থার জন্য, অবিলম্বে হেল্পলাইনে কল করুন",
  },

  te: {
    // Header
    "site.title": "సెక్యూర్‌వోటింగ్",
    "site.subtitle": "సురక్షిత డిజిటల్ వోటింగ్",

    // Navigation
    "nav.home": "హోమ్",
    "nav.register": "నమోదు",
    "nav.login": "లాగిన్",
    "nav.logout": "లాగ్అవుట్",
    "nav.dashboard": "డాష్‌బోర్డ్",

    // Home Page
    "home.hero.title": "సురక్షిత డిజిటల్ వోటింగ్",
    "home.hero.subtitle":
      "ప్రతి భారతీయ పౌరుడికి సురక్షితమైన, పారదర్శకమైన మరియు అందుబాటులో ఉండే వోటింగ్. పూర్తి భద్రత మరియు గోప్యతతో ఎక్కడి నుండైనా ఓటు వేయండి.",
    "home.register.button": "ఓటు వేయడానికి నమోదు చేసుకోండి",
    "home.login.button": "లాగిన్",
    "home.features.title": "మా ప్లాట్‌ఫారమ్‌ను ఎందుకు ఎంచుకోవాలి?",
    "home.feature.blockchain.title": "బ్లాక్‌చెయిన్ భద్రత",
    "home.feature.blockchain.desc": "ప్రతి ఓటు బ్లాక్‌చెయిన్‌లో సురక్షితం, పారదర్శకత మరియు మార్చలేని స్వభావాన్ని నిర్ధారిస్తుంది.",
    "home.feature.voterid.title": "వోటర్ ID ఇంటిగ్రేషన్",
    "home.feature.voterid.desc": "ప్రామాణిక ధృవీకరణ కోసం భారతీయ వోటర్ ID సిస్టమ్‌తో అంతరాయం లేని ఇంటిగ్రేషన్.",
    "home.feature.multilang.title": "బహుళ-భాష మద్దతు",
    "home.feature.multilang.desc": "అందుబాటు కోసం హిందీ, ఇంగ్లీష్ మరియు ఇతర ప్రాంతీయ భాషలలో అందుబాటులో ఉంది.",

    // Registration
    "register.title": "ఓటు వేయడానికి నమోదు చేసుకోండి",
    "register.voterid": "వోటర్ ID",
    "register.voterid.placeholder": "మీ వోటర్ ID ని నమోదు చేయండి",
    "register.email": "ఇమెయిల్",
    "register.email.placeholder": "మీ ఇమెయిల్ ని నమోదు చేయండి",
    "register.mobile": "మొబైల్ నంబర్",
    "register.mobile.placeholder": "+91 XXXXXXXXXX",
    "register.state": "రాష్ట్రం",
    "register.state.placeholder": "మీ రాష్ట్రాన్ని ఎంచుకోండి",
    "register.constituency": "నియోజకవర్గం",
    "register.constituency.placeholder": "మీ నియోజకవర్గాన్ని నమోదు చేయండి",
    "register.password": "పాస్‌వర్డ్",
    "register.password.placeholder": "పాస్‌వర్డ్ సృష్టించండి",
    "register.confirmPassword": "పాస్‌వర్డ్ నిర్ధారించండి",
    "register.confirmPassword.placeholder": "మీ పాస్‌వర్డ్‌ను నిర్ధారించండి",
    "register.button": "నమోదు చేసుకోండి",
    "register.login.link": "ఇప్పటికే ఖాతా ఉందా? లాగిన్ చేయండి",

    // Login
    "login.title": "ఓటు వేయడానికి లాగిన్ చేయండి",
    "login.voterid.tab": "వోటర్ ID",
    "login.email.tab": "ఇమెయిల్",
    "login.mobile": "మొబైల్ నంబర్",
    "login.otp.button": "OTP పొందండి",
    "login.otp": "OTP",
    "login.otp.placeholder": "6-అంకెల OTP నమోదు చేయండి",
    "login.voterid.button": "వోటర్ ID తో లాగిన్",
    "login.email.button": "ఇమెయిల్ తో లాగిన్",
    "login.register.link": "ఖాతా లేదా? నమోదు చేసుకోండి",

    // Dashboard
    "dashboard.title": "వోటింగ్ డాష్‌బోర్డ్",
    "dashboard.welcome": "స్వాగతం, ఓటర్!",
    "dashboard.voterid": "వోటర్ ID",
    "dashboard.constituency": "నియోజకవర్గం",
    "dashboard.voted": "ఓటు వేశారు",
    "dashboard.not.voted": "ఓటు వేయలేదు",
    "dashboard.vote.success": "మీ ఓటు విజయవంతంగా బ్లాక్‌చెయిన్‌లో నమోదు చేయబడింది!",
    "dashboard.candidates.title": "అభ్యర్థులు",
    "dashboard.vote.button": "ఓటు వేయండి",
    "dashboard.voting": "ఓటు నమోదు చేస్తున్నాం...",
    "dashboard.your.vote": "మీ ఓటు",
    "dashboard.blockchain.title": "బ్లాక్‌చెయిన్ భద్రత",
    "dashboard.blockchain.desc": "మీ ఓటు బ్లాక్‌చెయిన్ టెక్నాలజీ ఉపయోగించి సురక్షితం చేయబడింది",
    "dashboard.network.status": "నెట్‌వర్క్ స్థితి",
    "dashboard.connected": "✓ కనెక్ట్ చేయబడింది",
    "dashboard.last.block": "చివరి బ్లాక్",
    "dashboard.gas.fee": "గ్యాస్ ఫీజు",

    // Common
    "common.back": "హోమ్‌కు తిరిగి వెళ్ళండి",
    "common.age": "వయస్సు",
    "common.education": "విద్య",
    "common.footer": "© 2024 సెక్యూర్‌వోటింగ్ ప్లాట్‌ఫారమ్. అన్ని హక్కులు రక్షించబడ్డాయి.",
    "common.footer.subtitle": "బ్లాక్‌చెయిన్ టెక్నాలజీ ద్వారా శక్తివంతం",

    // Thank You Page
    "thankyou.title": "ఓటు వేసినందుకు ధన్యవాదాలు!",
    "thankyou.subtitle": "మీ ఓటు విజయవంతంగా నమోదు చేయబడింది",
    "thankyou.message":
      "ప్రజాస్వామ్యంలో మీ భాగస్వామ్యం ముఖ్యమైనది. మీ ఓటు బ్లాక్‌చెయిన్‌లో సురక్షితంగా నమోదు చేయబడింది మరియు ఎన్నికల ఫలితాలలో లెక్కించబడుతుంది.",
    "thankyou.transaction": "లావాదేవీ ID",
    "thankyou.block": "బ్లాక్ నంబర్",
    "thankyou.timestamp": "ఓటు వేసిన సమయం",
    "thankyou.status": "ఓటింగ్ స్థితి",
    "thankyou.completed": "విజయవంతంగా పూర్తయింది",
    "thankyou.return": "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళండి",
    "thankyou.share": "మీ విజయాన్ని పంచుకోండి",
    "thankyou.certificate": "ఓటింగ్ సర్టిఫికేట్ డౌన్‌లోడ్ చేయండి",

    // Admin
    "admin.login.title": "అడ్మిన్ లాగిన్",
    "admin.login.subtitle": "అడ్మినిస్ట్రేటివ్ డాష్‌బోర్డ్ యాక్సెస్",
    "admin.username": "వినియోగదారు పేరు",
    "admin.username.placeholder": "అడ్మిన్ వినియోగదారు పేరు నమోదు చేయండి",
    "admin.password": "పాస్‌వర్డ్",
    "admin.password.placeholder": "అడ్మిన్ పాస్‌వర్డ్ నమోదు చేయండి",
    "admin.login.button": "అడ్మిన్‌గా లాగిన్",
    "admin.login.error": "చెల్లని వినియోగదారు పేరు లేదా పాస్‌వర్డ్",
    "admin.dashboard.title": "అడ్మిన్ డాష్‌బోర్డ్",
    "admin.dashboard.welcome": "స్వాగతం, అడ్మినిస్ట్రేటర్",
    "admin.overview": "అవలోకనం",
    "admin.voters": "నమోదైన ఓటర్లు",
    "admin.votes": "మొత్తం వేసిన ఓట్లు",
    "admin.candidates": "అభ్యర్థులు",
    "admin.elections": "ఎన్నికలు",
    "admin.voters.title": "ఓటర్ నిర్వహణ",
    "admin.voters.search": "ఓటర్లను వెతకండి...",
    "admin.voters.id": "వోటర్ ID",
    "admin.voters.name": "పేరు",
    "admin.voters.email": "ఇమెయిల్",
    "admin.voters.mobile": "మొబైల్",
    "admin.voters.state": "రాష్ట్రం",
    "admin.voters.constituency": "నియోజకవర్గం",
    "admin.voters.status": "స్థితి",
    "admin.voters.verified": "ధృవీకరించబడింది",
    "admin.voters.pending": "పెండింగ్",
    "admin.voters.actions": "చర్యలు",
    "admin.candidates.title": "అభ్యర్థి నిర్వహణ",
    "admin.candidates.add": "కొత్త అభ్యర్థిని జోడించండి",
    "admin.candidates.edit": "అభ్యర్థిని సవరించండి",
    "admin.candidates.delete": "అభ్యర్థిని తొలగించండి",
    "admin.candidates.name": "అభ్యర్థి పేరు",
    "admin.candidates.party": "రాజకీయ పార్టీ",
    "admin.candidates.symbol": "చిహ్నం",
    "admin.candidates.description": "వివరణ",
    "admin.candidates.save": "అభ్యర్థిని సేవ్ చేయండి",
    "admin.candidates.cancel": "రద్దు చేయండి",
    "admin.votes.title": "ఓట్ల గణాంకాలు",
    "admin.votes.total": "మొత్తం ఓట్లు",
    "admin.votes.turnout": "ఓటర్ హాజరు",
    "admin.votes.by.candidate": "అభ్యర్థి వారీగా ఓట్లు",
    "admin.votes.by.constituency": "నియోజకవర్గం వారీగా ఓట్లు",
    "admin.stats.registered": "నమోదైన ఓటర్లు",
    "admin.stats.voted": "వేసిన ఓట్లు",
    "admin.stats.pending": "ధృవీకరణ పెండింగ్",
    "admin.stats.turnout.rate": "హాజరు రేటు",

    // Footer Contact
    "footer.contact.title": "సహాయ సంప్రదింపులు",
    "footer.helpline": "24/7 హెల్ప్‌లైన్",
    "footer.support.email": "సహాయ ఇమెయిల్",
    "footer.hours": "కార్యాలయ సమయాలు",
    "footer.hours.time": "సోమ-శుక్ర: ఉదయం 9:00 - సాయంత్రం 6:00",
    "footer.emergency.note": "ఎన్నికల సమయంలో వోటింగ్ అత్యవసర పరిస్థితుల కోసం, వెంటనే హెల్ప్‌లైన్‌కు కాల్ చేయండి",
  },

  ta: {
    // Header
    "site.title": "செக்யூர்வோட்டிங்",
    "site.subtitle": "பாதுகாப்பான டிஜிட்டல் வாக்களிப்பு",

    // Navigation
    "nav.home": "முகப்பு",
    "nav.register": "பதிவு",
    "nav.login": "உள்நுழைவு",
    "nav.logout": "வெளியேறு",
    "nav.dashboard": "டாஷ்போர்டு",

    // Home Page
    "home.hero.title": "பாதுகாப்பான டிஜிட்டல் வாக்களிப்பு",
    "home.hero.subtitle":
      "ஒவ்வொரு இந்திய குடிமகனுக்கும் பாதுகாப்பான, வெளிப்படையான மற்றும் அணுகக்கூடிய வாக்களிப்பு. முழு பாதுகாப்பு மற்றும் தனியுரிமையுடன் எங்கிருந்தும் வாக்களிக்கவும்.",
    "home.register.button": "வாக்களிக்க பதிவு செய்யுங்கள்",
    "home.login.button": "உள்நுழைவு",
    "home.features.title": "எங்கள் தளத்தை ஏன் தேர்வு செய்ய வேண்டும்?",
    "home.feature.blockchain.title": "பிளாக்செயின் பாதுகாப்பு",
    "home.feature.blockchain.desc":
      "ஒவ்வொரு வாக்கும் பிளாக்செயினில் பாதுகாக்கப்படுகிறது, வெளிப்படைத்தன்மை மற்றும் மாற்ற முடியாத தன்மையை உறுதி செய்கிறது.",
    "home.feature.voterid.title": "வாக்காளர் அடையாள ஒருங்கிணைப்பு",
    "home.feature.voterid.desc": "உண்மையான சரிபார்ப்புக்காக இந்திய வாக்காளர் அடையாள அமைப்புடன் தடையற்ற ஒருங்கிணைப்பு.",
    "home.feature.multilang.title": "பல மொழி ஆதரவு",
    "home.feature.multilang.desc": "அணுகலுக்காக இந்தி, ஆங்கிலம் மற்றும் பிற பிராந்திய மொழிகளில் கிடைக்கிறது.",

    // Registration
    "register.title": "வாக்களிக்க பதிவு செய்யுங்கள்",
    "register.voterid": "வாக்காளர் அடையாள அட்டை",
    "register.voterid.placeholder": "உங்கள் வாக்காளர் அடையாளத்தை உள்ளிடவும்",
    "register.email": "மின்னஞ்சல்",
    "register.email.placeholder": "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
    "register.mobile": "மொபைல் எண்",
    "register.mobile.placeholder": "+91 XXXXXXXXXX",
    "register.state": "மாநிலம்",
    "register.state.placeholder": "உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
    "register.constituency": "தொகுதி",
    "register.constituency.placeholder": "உங்கள் தொகுதியை உள்ளிடவும்",
    "register.password": "கடவுச்சொல்",
    "register.password.placeholder": "கடவுச்சொல்லை உருவாக்கவும்",
    "register.confirmPassword": "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    "register.confirmPassword.placeholder": "உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    "register.button": "பதிவு செய்யுங்கள்",
    "register.login.link": "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",

    // Login
    "login.title": "வாக்களிக்க உள்நுழைக",
    "login.voterid.tab": "வாக்காளர் அடையாள அட்டை",
    "login.email.tab": "மின்னஞ்சல்",
    "login.mobile": "மொபைல் எண்",
    "login.otp.button": "OTP பெறவும்",
    "login.otp": "OTP",
    "login.otp.placeholder": "6-இலக்க OTP ஐ உள்ளிடவும்",
    "login.voterid.button": "வாக்காளர் அடையாளத்துடன் உள்நுழைக",
    "login.email.button": "மின்னஞ்சலுடன் உள்நுழைக",
    "login.register.link": "கணக்கு இல்லையா? பதிவு செய்யுங்கள்",

    // Dashboard
    "dashboard.title": "வாக்களிப்பு டாஷ்போர்டு",
    "dashboard.welcome": "வரவேற்கிறோம், வாக்காளர்!",
    "dashboard.voterid": "வாக்காளர் அடையாள அட்டை",
    "dashboard.constituency": "தொகுதி",
    "dashboard.voted": "வாக்களித்தார்",
    "dashboard.not.voted": "வாக்களிக்கவில்லை",
    "dashboard.vote.success": "உங்கள் வாக்கு வெற்றிகரமாக பிளாக்செயினில் பதிவு செய்யப்பட்டுள்ளது!",
    "dashboard.candidates.title": "வேட்பாளர்கள்",
    "dashboard.vote.button": "வாக்களிக்கவும்",
    "dashboard.voting": "வாக்கு பதிவு செய்கிறது...",
    "dashboard.your.vote": "உங்கள் வாக்கு",
    "dashboard.blockchain.title": "பிளாக்செயின் பாதுகாப்பு",
    "dashboard.blockchain.desc": "உங்கள் வாக்கு பிளாக்செயின் தொழில்நுட்பத்தைப் பயன்படுத்தி பாதுகாக்கப்படுகிறது",
    "dashboard.network.status": "நெட்வொர்க் நிலை",
    "dashboard.connected": "✓ இணைக்கப்பட்டுள்ளது",
    "dashboard.last.block": "கடைசி பிளாக்",
    "dashboard.gas.fee": "எரிவாயு கட்டணம்",

    // Common
    "common.back": "முகப்புக்குத் திரும்பு",
    "common.age": "வயது",
    "common.education": "கல்வி",
    "common.footer": "© 2024 செக்யூர்வோட்டிங் தளம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.",
    "common.footer.subtitle": "பிளாக்செயின் தொழில்நுட்பத்தால் இயக்கப்படுகிறது",

    // Thank You Page
    "thankyou.title": "வாக்களித்ததற்கு நன்றி!",
    "thankyou.subtitle": "உங்கள் வாக்கு வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது",
    "thankyou.message":
      "ஜனநாயகத்தில் உங்கள் பங்கேற்பு முக்கியமானது. உங்கள் வாக்கு பிளாக்செயினில் பாதுகாப்பாக பதிவு செய்யப்பட்டுள்ளது மற்றும் தேர்தல் முடிவுகளில் கணக்கிடப்படும்.",
    "thankyou.transaction": "பரிவர்த்தனை ID",
    "thankyou.block": "பிளாக் எண்",
    "thankyou.timestamp": "வாக்களித்த நேரம்",
    "thankyou.status": "வாக்களிப்பு நிலை",
    "thankyou.completed": "வெற்றிகரமாக முடிந்தது",
    "thankyou.return": "டாஷ்போர்டுக்குத் திரும்பு",
    "thankyou.share": "உங்கள் சாதனையைப் பகிரவும்",
    "thankyou.certificate": "வாக்களிப்பு சான்றிதழை பதிவிறக்கவும்",

    // Admin
    "admin.login.title": "நிர்வாக உள்நுழைவு",
    "admin.login.subtitle": "நிர்வாக டாஷ்போர்டு அணுகல்",
    "admin.username": "பயனர் பெயர்",
    "admin.username.placeholder": "நிர்வாக பயனர் பெயரை உள்ளிடவும்",
    "admin.password": "கடவுச்சொல்",
    "admin.password.placeholder": "நிர்வாக கடவுச்சொல்லை உள்ளிடவும்",
    "admin.login.button": "நிர்வாகியாக உள்நுழைக",
    "admin.login.error": "தவறான பயனர் பெயர் அல்லது கடவுச்சொல்",
    "admin.dashboard.title": "நிர்வாக டாஷ்போர்டு",
    "admin.dashboard.welcome": "வரவேற்கிறோம், நிர்வாகி",
    "admin.overview": "கண்ணோட்டம்",
    "admin.voters": "பதிவு செய்யப்பட்ட வாக்காளர்கள்",
    "admin.votes": "மொத்த வாக்குகள் போடப்பட்டன",
    "admin.candidates": "வேட்பாளர்கள்",
    "admin.elections": "தேர்தல்கள்",
    "admin.voters.title": "வாக்காளர் மேலாண்மை",
    "admin.voters.search": "வாக்காளர்களைத் தேடுங்கள்...",
    "admin.voters.id": "வாக்காளர் அடையாள அட்டை",
    "admin.voters.name": "பெயர்",
    "admin.voters.email": "மின்னஞ்சல்",
    "admin.voters.mobile": "மொபைல்",
    "admin.voters.state": "மாநிலம்",
    "admin.voters.constituency": "தொகுதி",
    "admin.voters.status": "நிலை",
    "admin.voters.verified": "சரிபார்க்கப்பட்டது",
    "admin.voters.pending": "நிலுவையில்",
    "admin.voters.actions": "செயல்கள்",
    "admin.candidates.title": "வேட்பாளர் மேலாண்மை",
    "admin.candidates.add": "புதிய வேட்பாளரைச் சேர்க்கவும்",
    "admin.candidates.edit": "வேட்பாளரைத் திருத்தவும்",
    "admin.candidates.delete": "வேட்பாளரை நீக்கவும்",
    "admin.candidates.name": "வேட்பாளர் பெயர்",
    "admin.candidates.party": "அரசியல் கட்சி",
    "admin.candidates.symbol": "சின்னம்",
    "admin.candidates.description": "விளக்கம்",
    "admin.candidates.save": "வேட்பாளரைச் சேமிக்கவும்",
    "admin.candidates.cancel": "ரத்து செய்",
    "admin.votes.title": "வாக்கு புள்ளிவிவரங்கள்",
    "admin.votes.total": "மொத்த வாக்குகள்",
    "admin.votes.turnout": "வாக்காளர் வருகை",
    "admin.votes.by.candidate": "வேட்பாளர் வாரியாக வாக்குகள்",
    "admin.votes.by.constituency": "தொகுதி வாரியாக வாக்குகள்",
    "admin.stats.registered": "பதிவு செய்யப்பட்ட வாக்காளர்கள்",
    "admin.stats.voted": "வாக்குகள் போடப்பட்டன",
    "admin.stats.pending": "சரிபார்ப்பு நிலுவையில்",
    "admin.stats.turnout.rate": "வருகை விகிதம்",

    // Footer Contact
    "footer.contact.title": "ஆதரவு தொடர்பு",
    "footer.helpline": "24/7 உதவி எண்",
    "footer.support.email": "ஆதரவு மின்னஞ்சல்",
    "footer.hours": "அலுவலக நேரம்",
    "footer.hours.time": "திங்கள்-வெள்ளி: காலை 9:00 - மாலை 6:00",
    "footer.emergency.note": "தேர்தல் நேரத்தில் வாக்களிப்பு அவசரநிலைகளுக்கு, உடனடியாக உதவி எண்ணை அழைக்கவும்",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("preferred-language") as LanguageCode
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (language: LanguageCode) => {
    setCurrentLanguage(language)
    localStorage.setItem("preferred-language", language)
  }

  const t = (key: string): string => {
    return translations[currentLanguage][key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}
