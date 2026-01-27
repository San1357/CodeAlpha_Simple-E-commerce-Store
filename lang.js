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
    bhojpuri: "Bhojpuri",

    // Rating & Reviews
    ratingsReviews: "Ratings & Reviews",
    writeReview: "Write a Review",
    yourRating: "Your Rating",
    yourReview: "Your Review",
    reviewPlaceholder: "Share your experience with this product...",
    submitReview: "Submit Review",
    reviews: "Reviews",
    noReviews: "No reviews yet",
    beFirstReview: "Be the first to review this product!",
    basedOn: "Based on",
    reviewsCount: "reviews",
    reviewSubmitted: "Review submitted successfully!",
    selectRating: "Please select a rating",
    writeReviewText: "Please write your review",
    averageRating: "Average Rating",
    outOf: "out of",
    stars: "stars",
    star: "star",

    // Search & Filter
    allCategories: "All Categories",
    filterByCategory: "Category",
    filterByPrice: "Price Range",
    minPrice: "Min",
    maxPrice: "Max",
    sortBy: "Sort By",
    sortDefault: "Default",
    sortPriceLowHigh: "Price: Low to High",
    sortPriceHighLow: "Price: High to Low",
    applyFilters: "Apply",
    resetFilters: "Reset",
    noProductsFound: "No products found",
    tryDifferentFilters: "Try adjusting your search or filters.",
    showingResults: "Showing",
    productsFound: "products",
    filters: "Filters",
    priceRange: "Price Range",
    clearAll: "Clear All",

    // Shopping Cart
    shoppingCart: "Shopping Cart",
    cart: "Cart",
    emptyCart: "Your cart is empty",
    emptyCartText: "Looks like you haven't added anything to your cart yet.",
    clearCart: "Clear Cart",
    removeFromCart: "Remove from cart",
    orderSummary: "Order Summary",
    totalItems: "Total Items",
    subtotal: "Subtotal",
    grandTotal: "Grand Total",
    proceedToCheckout: "Proceed to Checkout",
    confirmClearCart: "Are you sure you want to clear your cart?",
    emptyCartCheckout: "Your cart is empty. Add some items first!",
    itemAddedToCart: "Item added to cart!",
    cartUpdated: "Cart updated!",
    viewCart: "View Cart",
    items: "items",
    item: "item",

    // Order History
    myOrders: "My Orders",
    orderHistory: "Order History",
    noOrdersFound: "No orders found yet",
    noOrdersText: "Your order history will appear here once you place an order.",
    viewDetails: "View Details",
    hideDetails: "Hide Details",
    downloadInvoice: "Download Invoice",
    orderDate: "Order Date",
    totalAmount: "Total Amount",
    orderStatus: "Order Status",
    statusPlaced: "Placed",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    productsOrdered: "Products Ordered",
    orderInfo: "Order Information",
    billingDetails: "Billing Details",
    billSummary: "Bill Summary",
    invoice: "Invoice",
    thankYouOrder: "Thank you for your order!",
    customerName: "Customer Name",
    address: "Address",
    mobile: "Mobile",
    close: "Close",

    // Wishlist
    wishlist: "Wishlist",
    myWishlist: "My Wishlist",
    emptyWishlist: "Your wishlist is empty",
    emptyWishlistText: "Save your favorite items here to buy them later!",
    addToWishlist: "Add to Wishlist",
    removeFromWishlist: "Remove from Wishlist",
    moveToCart: "Move to Cart",
    alreadyInWishlist: "Already in wishlist!",
    addedToWishlist: "Added to wishlist!",
    removedFromWishlist: "Removed from wishlist!",
    movedToCart: "Moved to cart!",
    browseProductsWishlist: "Browse products to add to your wishlist",
    wishlistItems: "items in wishlist",
    wishlistItem: "item in wishlist"
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
    bhojpuri: "भोजपुरी",

    // Rating & Reviews
    ratingsReviews: "रेटिंग और समीक्षा",
    writeReview: "समीक्षा लिखें",
    yourRating: "आपकी रेटिंग",
    yourReview: "आपकी समीक्षा",
    reviewPlaceholder: "इस उत्पाद के साथ अपना अनुभव साझा करें...",
    submitReview: "समीक्षा सबमिट करें",
    reviews: "समीक्षाएं",
    noReviews: "अभी तक कोई समीक्षा नहीं",
    beFirstReview: "इस उत्पाद की पहली समीक्षा करें!",
    basedOn: "आधारित",
    reviewsCount: "समीक्षाओं पर",
    reviewSubmitted: "समीक्षा सफलतापूर्वक सबमिट हुई!",
    selectRating: "कृपया रेटिंग चुनें",
    writeReviewText: "कृपया अपनी समीक्षा लिखें",
    averageRating: "औसत रेटिंग",
    outOf: "में से",
    stars: "स्टार",
    star: "स्टार",

    // Search & Filter
    allCategories: "सभी श्रेणियां",
    filterByCategory: "श्रेणी",
    filterByPrice: "मूल्य सीमा",
    minPrice: "न्यूनतम",
    maxPrice: "अधिकतम",
    sortBy: "क्रमबद्ध करें",
    sortDefault: "डिफ़ॉल्ट",
    sortPriceLowHigh: "मूल्य: कम से अधिक",
    sortPriceHighLow: "मूल्य: अधिक से कम",
    applyFilters: "लागू करें",
    resetFilters: "रीसेट",
    noProductsFound: "कोई उत्पाद नहीं मिला",
    tryDifferentFilters: "अपनी खोज या फ़िल्टर बदलें।",
    showingResults: "दिखा रहे हैं",
    productsFound: "उत्पाद",
    filters: "फ़िल्टर",
    priceRange: "मूल्य सीमा",
    clearAll: "सब हटाएं",

    // Shopping Cart
    shoppingCart: "शॉपिंग कार्ट",
    cart: "कार्ट",
    emptyCart: "आपका कार्ट खाली है",
    emptyCartText: "लगता है आपने अभी तक कुछ नहीं जोड़ा है।",
    clearCart: "कार्ट खाली करें",
    removeFromCart: "कार्ट से हटाएं",
    orderSummary: "ऑर्डर सारांश",
    totalItems: "कुल आइटम",
    subtotal: "उप-योग",
    grandTotal: "कुल योग",
    proceedToCheckout: "चेकआउट करें",
    confirmClearCart: "क्या आप वाकई कार्ट खाली करना चाहते हैं?",
    emptyCartCheckout: "आपका कार्ट खाली है। पहले कुछ जोड़ें!",
    itemAddedToCart: "कार्ट में जोड़ा गया!",
    cartUpdated: "कार्ट अपडेट हो गया!",
    viewCart: "कार्ट देखें",
    items: "आइटम",
    item: "आइटम",

    // Order History
    myOrders: "मेरे ऑर्डर",
    orderHistory: "ऑर्डर इतिहास",
    noOrdersFound: "अभी तक कोई ऑर्डर नहीं",
    noOrdersText: "आपका ऑर्डर इतिहास यहां दिखेगा जब आप कोई ऑर्डर देंगे।",
    viewDetails: "विवरण देखें",
    hideDetails: "विवरण छुपाएं",
    downloadInvoice: "इनवॉइस डाउनलोड करें",
    orderDate: "ऑर्डर तारीख",
    totalAmount: "कुल राशि",
    orderStatus: "ऑर्डर स्थिति",
    statusPlaced: "रखा गया",
    statusDelivered: "डिलीवर हुआ",
    statusCancelled: "रद्द",
    productsOrdered: "ऑर्डर किए गए उत्पाद",
    orderInfo: "ऑर्डर जानकारी",
    billingDetails: "बिलिंग विवरण",
    billSummary: "बिल सारांश",
    invoice: "इनवॉइस",
    thankYouOrder: "ऑर्डर के लिए धन्यवाद!",
    customerName: "ग्राहक का नाम",
    address: "पता",
    mobile: "मोबाइल",
    close: "बंद करें",

    // Wishlist
    wishlist: "विशलिस्ट",
    myWishlist: "मेरी विशलिस्ट",
    emptyWishlist: "आपकी विशलिस्ट खाली है",
    emptyWishlistText: "बाद में खरीदने के लिए अपनी पसंदीदा चीजें यहां सेव करें!",
    addToWishlist: "विशलिस्ट में जोड़ें",
    removeFromWishlist: "विशलिस्ट से हटाएं",
    moveToCart: "कार्ट में डालें",
    alreadyInWishlist: "पहले से विशलिस्ट में है!",
    addedToWishlist: "विशलिस्ट में जोड़ा गया!",
    removedFromWishlist: "विशलिस्ट से हटाया गया!",
    movedToCart: "कार्ट में डाला गया!",
    browseProductsWishlist: "विशलिस्ट में जोड़ने के लिए उत्पाद देखें",
    wishlistItems: "आइटम विशलिस्ट में",
    wishlistItem: "आइटम विशलिस्ट में"
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
    bhojpuri: "भोजपुरी",

    // Rating & Reviews
    ratingsReviews: "रेटिंग आ रिव्यू",
    writeReview: "रिव्यू लिखीं",
    yourRating: "रउआ के रेटिंग",
    yourReview: "रउआ के रिव्यू",
    reviewPlaceholder: "ई सामान के बारे में बताईं...",
    submitReview: "रिव्यू भेजीं",
    reviews: "रिव्यू",
    noReviews: "अभी तक कवनो रिव्यू नइखे",
    beFirstReview: "ई सामान के पहिला रिव्यू करीं!",
    basedOn: "आधारित",
    reviewsCount: "रिव्यू पर",
    reviewSubmitted: "रिव्यू भेजा गइल!",
    selectRating: "रेटिंग चुनीं",
    writeReviewText: "रिव्यू लिखीं",
    averageRating: "औसत रेटिंग",
    outOf: "में से",
    stars: "स्टार",
    star: "स्टार",

    // Search & Filter
    allCategories: "सगरी किसिम",
    filterByCategory: "किसिम",
    filterByPrice: "दाम के रेंज",
    minPrice: "कम से कम",
    maxPrice: "जादा से जादा",
    sortBy: "छांटी",
    sortDefault: "डिफ़ॉल्ट",
    sortPriceLowHigh: "दाम: कम से जादा",
    sortPriceHighLow: "दाम: जादा से कम",
    applyFilters: "लगाईं",
    resetFilters: "रीसेट करीं",
    noProductsFound: "कवनो सामान नइखे मिलल",
    tryDifferentFilters: "खोज या फ़िल्टर बदलीं।",
    showingResults: "देखाता",
    productsFound: "सामान",
    filters: "फ़िल्टर",
    priceRange: "दाम के रेंज",
    clearAll: "सब हटाईं",

    // Shopping Cart
    shoppingCart: "खरीदारी के कार्ट",
    cart: "कार्ट",
    emptyCart: "कार्ट खाली बा",
    emptyCartText: "लागत बा कि रउआ अभी तक कुछ नइखीं डालले।",
    clearCart: "कार्ट खाली करीं",
    removeFromCart: "कार्ट से हटाईं",
    orderSummary: "ऑर्डर के जानकारी",
    totalItems: "कुल सामान",
    subtotal: "जोड़",
    grandTotal: "कुल रकम",
    proceedToCheckout: "चेकआउट करीं",
    confirmClearCart: "सच में कार्ट खाली करे के बा?",
    emptyCartCheckout: "कार्ट खाली बा। पहिले कुछ डालीं!",
    itemAddedToCart: "कार्ट में गइल!",
    cartUpdated: "कार्ट अपडेट हो गइल!",
    viewCart: "कार्ट देखीं",
    items: "सामान",
    item: "सामान",

    // Order History
    myOrders: "हमार ऑर्डर",
    orderHistory: "ऑर्डर के इतिहास",
    noOrdersFound: "अभी तक कवनो ऑर्डर नइखे",
    noOrdersText: "रउआ के ऑर्डर इहां देखाई जब रउआ कवनो ऑर्डर देम।",
    viewDetails: "जानकारी देखीं",
    hideDetails: "जानकारी छुपाईं",
    downloadInvoice: "बिल डाउनलोड करीं",
    orderDate: "ऑर्डर के तारीख",
    totalAmount: "कुल रकम",
    orderStatus: "ऑर्डर के हालत",
    statusPlaced: "रखल गइल",
    statusDelivered: "पहुंच गइल",
    statusCancelled: "रद्द भइल",
    productsOrdered: "ऑर्डर कइल सामान",
    orderInfo: "ऑर्डर के जानकारी",
    billingDetails: "बिल के जानकारी",
    billSummary: "बिल के जोड़",
    invoice: "बिल",
    thankYouOrder: "ऑर्डर खातिर धन्यवाद!",
    customerName: "ग्राहक के नाम",
    address: "पता",
    mobile: "मोबाइल",
    close: "बंद करीं",

    // Wishlist
    wishlist: "विशलिस्ट",
    myWishlist: "हमार विशलिस्ट",
    emptyWishlist: "विशलिस्ट खाली बा",
    emptyWishlistText: "बाद में खरीदे खातिर आपन पसंद के सामान इहां सेव करीं!",
    addToWishlist: "विशलिस्ट में डालीं",
    removeFromWishlist: "विशलिस्ट से हटाईं",
    moveToCart: "कार्ट में डालीं",
    alreadyInWishlist: "पहिले से विशलिस्ट में बा!",
    addedToWishlist: "विशलिस्ट में गइल!",
    removedFromWishlist: "विशलिस्ट से हटल!",
    movedToCart: "कार्ट में गइल!",
    browseProductsWishlist: "विशलिस्ट में डाले खातिर सामान देखीं",
    wishlistItems: "सामान विशलिस्ट में",
    wishlistItem: "सामान विशलिस्ट में"
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
