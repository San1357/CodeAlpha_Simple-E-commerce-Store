/**
 * =====================================================
 * MULTI-LANGUAGE INTERNATIONALIZATION (i18n) MODULE
 * =====================================================
 *
 * Supported Languages:
 * - English (en)
 * - Hindi (hi)
 * - Bhojpuri (bho)
 *
 * Usage:
 * 1. Add data-i18n attribute to HTML elements
 * 2. Include this script in your HTML
 * 3. Call initLanguage() on page load
 */

// =====================================================
// LANGUAGE TRANSLATIONS OBJECT
// =====================================================
const translations = {
  // --------------------------
  // ENGLISH TRANSLATIONS
  // --------------------------
  en: {
    // Navbar & Header
    home: "Home",
    products: "Products",
    login: "Login",
    logout: "Logout",
    signup: "Sign Up",
    profile: "Profile",
    shopease: "ShopEase",

    // Search
    searchPlaceholder: "Search for a product (Pen, Pencil, Notebook, Sharpener, Eraser)...",
    searchBtn: "Search",

    // Product Categories
    pen: "Pen",
    pencil: "Pencil",
    notebook: "Notebook",
    sharpener: "Sharpener",
    eraser: "Eraser",

    // Product Detail Page
    category: "Category",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    addedToCart: "Added to cart!",

    // Checkout Page
    checkoutSummary: "Checkout Summary",
    deliveryAddress: "Delivery Address",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    streetAddress: "Street Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    deliveryOption: "Delivery Option",
    homeDelivery: "Home Delivery",
    pickupFromStore: "Pickup from Store",
    pickupMessage: "You can collect your order from the nearest store.",
    proceed: "Proceed",
    payment: "Payment",
    upiId: "UPI ID",
    payNow: "Pay Now",
    processingPayment: "Processing payment...",
    productName: "Product Name",
    pricePerUnit: "Price per unit",
    quantity: "Quantity",
    productTotal: "Product Total",
    deliveryCharge: "Delivery Charge",
    finalPayable: "Final Payable",

    // Order Success Page
    orderPlacedSuccessfully: "Order Placed Successfully!",
    downloadBill: "Download Bill",
    shareOtpMessage: "Share this OTP with delivery agent to receive your order",
    orderNumber: "Order Number",
    pricePerItem: "Price per item",
    finalTotal: "Final Total",
    paymentMethod: "Payment Method",
    paymentStatus: "Payment Status",
    deliveryType: "Delivery Type",
    noOrderDetails: "No order details found.",

    // Login Page
    welcomeBack: "Welcome Back",
    loginToAccount: "Login to your account",
    email: "Email Address",
    password: "Password",
    rememberMe: "Remember me",
    dontHaveAccount: "Don't have an account?",
    signUpHere: "Sign up here",
    emailRequired: "Please enter a valid email address",
    passwordRequired: "Password is required",
    loginSuccess: "Login successful! Redirecting...",
    incorrectPassword: "Incorrect password. Please try again.",
    noAccountFound: "No account found with this email address",

    // Signup Page
    createAccount: "Create Account",
    joinUs: "Join us and start shopping today",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    loginHere: "Login here",
    enterFullName: "Enter your full name",
    enterEmail: "Enter your email",
    createPassword: "Create a password (min 6 characters)",
    confirmYourPassword: "Confirm your password",
    fullNameError: "Please enter your full name",
    emailError: "Please enter a valid email address",
    passwordError: "Password must be at least 6 characters",
    confirmPasswordError: "Passwords do not match",
    accountCreated: "Account created successfully! Redirecting to login...",
    emailExists: "An account with this email already exists",
    weakPassword: "Weak password",
    mediumPassword: "Medium password",
    strongPassword: "Strong password",

    // Profile Page
    myProfile: "My Profile",
    accountStatus: "Account Status",
    active: "Active",
    memberSince: "Member Since",
    lastLogin: "Last Login",
    quickActions: "Quick Actions",
    continueShopping: "Continue Shopping",
    browseProducts: "Browse our latest products",
    shopNow: "Shop Now",
    backToStore: "Back to Store",
    confirmLogout: "Confirm Logout",
    logoutConfirmMessage: "Are you sure you want to logout from your account?",
    cancel: "Cancel",

    // Welcome & Messages
    welcome: "Welcome!",
    selectProduct: "Select a product from the navbar",
    productNotFound: "Product not found",
    searchSuggestion: "Please search for: Pen, Pencil, Notebook, Sharpener, or Eraser.",
    noProductCheckout: "No product found for checkout.",

    // Validation Messages
    fillAllFields: "Please fill all required fields and select a delivery option.",
    validMobile: "Please enter a valid 10-digit mobile number.",
    validPincode: "Please enter a valid 6-digit pincode.",
    enterUpiId: "Please enter your UPI ID.",

    // Language
    language: "Language",
    english: "English",
    hindi: "Hindi",
    bhojpuri: "Bhojpuri"
  },

  // --------------------------
  // HINDI TRANSLATIONS
  // --------------------------
  hi: {
    // Navbar & Header
    home: "होम",
    products: "उत्पाद",
    login: "लॉगिन",
    logout: "लॉगआउट",
    signup: "साइन अप",
    profile: "प्रोफाइल",
    shopease: "शॉपईज़",

    // Search
    searchPlaceholder: "उत्पाद खोजें (पेन, पेंसिल, नोटबुक, शार्पनर, इरेज़र)...",
    searchBtn: "खोजें",

    // Product Categories
    pen: "पेन",
    pencil: "पेंसिल",
    notebook: "नोटबुक",
    sharpener: "शार्पनर",
    eraser: "इरेज़र",

    // Product Detail Page
    category: "श्रेणी",
    addToCart: "कार्ट में डालें",
    buyNow: "अभी खरीदें",
    addedToCart: "कार्ट में जोड़ा गया!",

    // Checkout Page
    checkoutSummary: "चेकआउट सारांश",
    deliveryAddress: "डिलीवरी पता",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    streetAddress: "गली का पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",
    deliveryOption: "डिलीवरी विकल्प",
    homeDelivery: "होम डिलीवरी",
    pickupFromStore: "स्टोर से लें",
    pickupMessage: "आप नजदीकी स्टोर से अपना ऑर्डर ले सकते हैं।",
    proceed: "आगे बढ़ें",
    payment: "भुगतान",
    upiId: "UPI आईडी",
    payNow: "अभी भुगतान करें",
    processingPayment: "भुगतान प्रोसेस हो रहा है...",
    productName: "उत्पाद का नाम",
    pricePerUnit: "प्रति यूनिट मूल्य",
    quantity: "मात्रा",
    productTotal: "उत्पाद कुल",
    deliveryCharge: "डिलीवरी शुल्क",
    finalPayable: "कुल देय राशि",

    // Order Success Page
    orderPlacedSuccessfully: "ऑर्डर सफलतापूर्वक हो गया!",
    downloadBill: "बिल डाउनलोड करें",
    shareOtpMessage: "अपना ऑर्डर प्राप्त करने के लिए यह OTP डिलीवरी एजेंट को दें",
    orderNumber: "ऑर्डर नंबर",
    pricePerItem: "प्रति आइटम मूल्य",
    finalTotal: "कुल राशि",
    paymentMethod: "भुगतान विधि",
    paymentStatus: "भुगतान स्थिति",
    deliveryType: "डिलीवरी प्रकार",
    noOrderDetails: "कोई ऑर्डर विवरण नहीं मिला।",

    // Login Page
    welcomeBack: "वापस आपका स्वागत है",
    loginToAccount: "अपने खाते में लॉगिन करें",
    email: "ईमेल पता",
    password: "पासवर्ड",
    rememberMe: "मुझे याद रखें",
    dontHaveAccount: "खाता नहीं है?",
    signUpHere: "यहां साइन अप करें",
    emailRequired: "कृपया वैध ईमेल पता दर्ज करें",
    passwordRequired: "पासवर्ड आवश्यक है",
    loginSuccess: "लॉगिन सफल! रीडायरेक्ट हो रहा है...",
    incorrectPassword: "गलत पासवर्ड। कृपया पुनः प्रयास करें।",
    noAccountFound: "इस ईमेल से कोई खाता नहीं मिला",

    // Signup Page
    createAccount: "खाता बनाएं",
    joinUs: "हमसे जुड़ें और आज ही खरीदारी शुरू करें",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    alreadyHaveAccount: "पहले से खाता है?",
    loginHere: "यहां लॉगिन करें",
    enterFullName: "अपना पूरा नाम दर्ज करें",
    enterEmail: "अपना ईमेल दर्ज करें",
    createPassword: "पासवर्ड बनाएं (कम से कम 6 अक्षर)",
    confirmYourPassword: "अपने पासवर्ड की पुष्टि करें",
    fullNameError: "कृपया अपना पूरा नाम दर्ज करें",
    emailError: "कृपया वैध ईमेल पता दर्ज करें",
    passwordError: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
    confirmPasswordError: "पासवर्ड मेल नहीं खाते",
    accountCreated: "खाता सफलतापूर्वक बना! लॉगिन पर रीडायरेक्ट हो रहा है...",
    emailExists: "इस ईमेल से पहले से एक खाता मौजूद है",
    weakPassword: "कमज़ोर पासवर्ड",
    mediumPassword: "मध्यम पासवर्ड",
    strongPassword: "मज़बूत पासवर्ड",

    // Profile Page
    myProfile: "मेरी प्रोफाइल",
    accountStatus: "खाता स्थिति",
    active: "सक्रिय",
    memberSince: "सदस्य बने",
    lastLogin: "अंतिम लॉगिन",
    quickActions: "त्वरित कार्य",
    continueShopping: "खरीदारी जारी रखें",
    browseProducts: "हमारे नवीनतम उत्पाद देखें",
    shopNow: "अभी खरीदें",
    backToStore: "स्टोर पर वापस जाएं",
    confirmLogout: "लॉगआउट की पुष्टि करें",
    logoutConfirmMessage: "क्या आप वाकई अपने खाते से लॉगआउट करना चाहते हैं?",
    cancel: "रद्द करें",

    // Welcome & Messages
    welcome: "स्वागत है!",
    selectProduct: "नेवबार से कोई उत्पाद चुनें",
    productNotFound: "उत्पाद नहीं मिला",
    searchSuggestion: "कृपया खोजें: पेन, पेंसिल, नोटबुक, शार्पनर, या इरेज़र।",
    noProductCheckout: "चेकआउट के लिए कोई उत्पाद नहीं मिला।",

    // Validation Messages
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें और डिलीवरी विकल्प चुनें।",
    validMobile: "कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें।",
    validPincode: "कृपया वैध 6 अंकों का पिनकोड दर्ज करें।",
    enterUpiId: "कृपया अपना UPI आईडी दर्ज करें।",

    // Language
    language: "भाषा",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    bhojpuri: "भोजपुरी"
  },

  // --------------------------
  // BHOJPURI TRANSLATIONS
  // --------------------------
  bho: {
    // Navbar & Header
    home: "घर",
    products: "सामान",
    login: "लॉगिन करीं",
    logout: "लॉगआउट करीं",
    signup: "साइन अप करीं",
    profile: "प्रोफाइल",
    shopease: "शॉपईज़",

    // Search
    searchPlaceholder: "सामान खोजीं (पेन, पेंसिल, कॉपी, शार्पनर, रबर)...",
    searchBtn: "खोजीं",

    // Product Categories
    pen: "पेन",
    pencil: "पेंसिल",
    notebook: "कॉपी",
    sharpener: "शार्पनर",
    eraser: "रबर",

    // Product Detail Page
    category: "किसिम",
    addToCart: "कार्ट में डालीं",
    buyNow: "अभी खरीदीं",
    addedToCart: "कार्ट में गइल!",

    // Checkout Page
    checkoutSummary: "खरीदारी के जानकारी",
    deliveryAddress: "डिलीवरी के पता",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    streetAddress: "गली के पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",
    deliveryOption: "डिलीवरी के तरीका",
    homeDelivery: "घरे पर डिलीवरी",
    pickupFromStore: "दुकान से लीं",
    pickupMessage: "रउआ नजदीकी दुकान से आपन सामान ले सकत बानी।",
    proceed: "आगे बढ़ीं",
    payment: "पैसा चुकाईं",
    upiId: "UPI आईडी",
    payNow: "अभी पैसा दीं",
    processingPayment: "पैसा भेजाता...",
    productName: "सामान के नाम",
    pricePerUnit: "एक के दाम",
    quantity: "कइसे गो",
    productTotal: "सामान के कुल",
    deliveryCharge: "डिलीवरी खर्चा",
    finalPayable: "कुल देवे के रकम",

    // Order Success Page
    orderPlacedSuccessfully: "ऑर्डर सफल भइल!",
    downloadBill: "बिल डाउनलोड करीं",
    shareOtpMessage: "आपन सामान लेवे खातिर ई OTP डिलीवरी वाला के दीं",
    orderNumber: "ऑर्डर नंबर",
    pricePerItem: "एक के दाम",
    finalTotal: "कुल रकम",
    paymentMethod: "पैसा देवे के तरीका",
    paymentStatus: "पैसा के हालत",
    deliveryType: "डिलीवरी के तरीका",
    noOrderDetails: "कवनो ऑर्डर के जानकारी नइखे।",

    // Login Page
    welcomeBack: "वापस आईं",
    loginToAccount: "आपन खाता में लॉगिन करीं",
    email: "ईमेल पता",
    password: "पासवर्ड",
    rememberMe: "हमके याद राखीं",
    dontHaveAccount: "खाता नइखे?",
    signUpHere: "इहां साइन अप करीं",
    emailRequired: "सही ईमेल पता डालीं",
    passwordRequired: "पासवर्ड जरूरी बा",
    loginSuccess: "लॉगिन हो गइल! जात बानी...",
    incorrectPassword: "गलत पासवर्ड बा। फेर से कोशिश करीं।",
    noAccountFound: "ई ईमेल से कवनो खाता नइखे",

    // Signup Page
    createAccount: "खाता बनाईं",
    joinUs: "हमरा संगे जुड़ीं आ आज से खरीदारी शुरू करीं",
    confirmPassword: "पासवर्ड पक्का करीं",
    alreadyHaveAccount: "पहिले से खाता बा?",
    loginHere: "इहां लॉगिन करीं",
    enterFullName: "आपन पूरा नाम डालीं",
    enterEmail: "आपन ईमेल डालीं",
    createPassword: "पासवर्ड बनाईं (कम से कम 6 अक्षर)",
    confirmYourPassword: "आपन पासवर्ड पक्का करीं",
    fullNameError: "आपन पूरा नाम डालीं",
    emailError: "सही ईमेल पता डालीं",
    passwordError: "पासवर्ड में 6 अक्षर होखे के चाहीं",
    confirmPasswordError: "पासवर्ड मिलत नइखे",
    accountCreated: "खाता बन गइल! लॉगिन पे जात बानी...",
    emailExists: "ई ईमेल से पहिले से खाता बा",
    weakPassword: "कमजोर पासवर्ड",
    mediumPassword: "ठीक-ठाक पासवर्ड",
    strongPassword: "मजबूत पासवर्ड",

    // Profile Page
    myProfile: "हमार प्रोफाइल",
    accountStatus: "खाता के हालत",
    active: "चालू बा",
    memberSince: "सदस्य बनलीं",
    lastLogin: "पिछला लॉगिन",
    quickActions: "जल्दी के काम",
    continueShopping: "खरीदारी जारी राखीं",
    browseProducts: "हमार नया सामान देखीं",
    shopNow: "अभी खरीदीं",
    backToStore: "दुकान पे वापस जाईं",
    confirmLogout: "लॉगआउट पक्का करीं",
    logoutConfirmMessage: "सच में लॉगआउट करे के बा?",
    cancel: "रद्द करीं",

    // Welcome & Messages
    welcome: "स्वागत बा!",
    selectProduct: "ऊपर से कवनो सामान चुनीं",
    productNotFound: "सामान नइखे मिलल",
    searchSuggestion: "खोजीं: पेन, पेंसिल, कॉपी, शार्पनर, या रबर।",
    noProductCheckout: "खरीदारी खातिर कवनो सामान नइखे।",

    // Validation Messages
    fillAllFields: "सगरी जरूरी जगह भरीं आ डिलीवरी के तरीका चुनीं।",
    validMobile: "सही 10 अंक के मोबाइल नंबर डालीं।",
    validPincode: "सही 6 अंक के पिनकोड डालीं।",
    enterUpiId: "आपन UPI आईडी डालीं।",

    // Language
    language: "भाषा",
    english: "अंग्रेज़ी",
    hindi: "हिंदी",
    bhojpuri: "भोजपुरी"
  }
};

// =====================================================
// i18n CORE FUNCTIONS
// =====================================================

/**
 * Get current language from localStorage
 * Default: 'en' (English)
 */
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

/**
 * Set language in localStorage
 * @param {string} lang - Language code (en, hi, bho)
 */
function setLanguage(lang) {
  localStorage.setItem('language', lang);
}

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @returns {string} - Translated text or key if not found
 */
function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['en'][key] || key;
}

/**
 * Apply translations to all elements with data-i18n attribute
 * This function scans the DOM and updates text content
 */
function applyTranslations() {
  const lang = getCurrentLanguage();
  const langData = translations[lang];

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (langData[key]) {
      element.textContent = langData[key];
    } else if (translations['en'][key]) {
      element.textContent = translations['en'][key];
    }
  });

  // Update all elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (langData[key]) {
      element.placeholder = langData[key];
    } else if (translations['en'][key]) {
      element.placeholder = translations['en'][key];
    }
  });

  // Update language selector if exists
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
  }

  // Update html lang attribute
  document.documentElement.lang = lang === 'bho' ? 'bho' : (lang === 'hi' ? 'hi' : 'en');
}

/**
 * Handle language change event
 * @param {string} lang - New language code
 */
function changeLanguage(lang) {
  setLanguage(lang);
  applyTranslations();

  // Dispatch custom event for pages that need to re-render dynamic content
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

/**
 * Initialize language selector dropdown
 * Call this function after DOM is loaded
 */
function initLanguageSelector() {
  const selector = document.getElementById('language-selector');
  if (selector) {
    // Set current language
    selector.value = getCurrentLanguage();

    // Add change event listener
    selector.addEventListener('change', function() {
      changeLanguage(this.value);
    });
  }
}

/**
 * Initialize the i18n system
 * Call this on every page load
 */
function initLanguage() {
  // Apply translations on load
  applyTranslations();

  // Initialize language selector
  initLanguageSelector();
}

// =====================================================
// AUTO-INITIALIZATION
// =====================================================
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguage);
} else {
  initLanguage();
}
