// src/content/voice.ts
// Every line a shopper reads lives here, in Anisha’s voice, so she can edit it in one place.
// House rules: first person, sentence case, British spelling, no exclamation marks, no emoji, no dashes used as punctuation.

export const voice = {
  brand: {
    tagline: "Choose your colour story",
    footerLine: "Veils and scarves, chosen by Anisha.",
    footerThanks: "Thank you for taking a moment to discover my collection.",
    signature: "With love, Anisha",
    siteTitle: "Classyveils.ug | Find your shade",
    siteDescription:
      "Discover Anisha’s considered collection of veils and scarves, chosen for colour, comfort and their graceful drape.",
  },

  nav: {
    shop: "Shop",
    lookbook: "Lookbook",
    style: "Style it",
    about: "Meet Anisha",
    contact: "Contact",
    picks: "My picks",
    menuOpen: "Menu",
    menuClose: "Close",
  },

  tabs: { home: "Home", shop: "Shop", picks: "Picks", style: "Style", chat: "Chat" },

  promo: {
    text: "Delivery details? Let’s arrange them on WhatsApp.",
    chat: "Chat with Anisha",
    kids: "Children’s collection",
  },

  home: {
    heroLineOne: "Find your",
    heroLineTwo: "shade",
    heroAccent: "of the day.",
    heroBody:
      "I’m Anisha. I choose each veil for its beautiful hand-feel, considered colour and graceful drape. Discover the collection and find the piece that feels unmistakably you.",
    heroPrimary: "Discover the collection",
    heroSecondary: "Swipe through them",
    heroChip: (ref: string, label: string) => `Piece ${ref}, ${label.toLowerCase()}`,
    shadePrompt: "Start with a colour and I’ll show you what I have in it.",
    shadeSeeAll: (label: string) => `See the ${label.toLowerCase()} veils`,
    fabricHeading: "Or choose by fabric",
    fabricHint: "Each one has its own weight on the shoulder.",
    editHeadingLine: "A closer look at",
    editHeadingAccent: "the right fall.",
    editNote:
      "Each piece has its own number. Share it with me on WhatsApp and I’ll guide you through its colour, finish and feel.",
    editLink: "Explore the full collection",
    lookbookHeadingLine: "Two colours I’d",
    lookbookHeadingAccent: "start with.",
    lookbookNote:
      "With white, I’d begin in two different directions: warm mustard for presence, or ivory when you want the detail to stay close and quiet.",
    askHeadingLine: "Not sure which",
    askHeadingAccent: "shade to choose?",
    askBody:
      "Send me the piece numbers you’re deciding between and a note about what you’ll be wearing. We can start with the colours already in front of us.",
    askLink: "Let’s talk it through",
  },

  shades: {
    countLabel: (n: number) => (n === 1 ? "1 piece in the collection" : `${n} pieces in the collection`),
    fallbackNote: (label: string) => `${label}, as photographed.`,
    notes: {
      rose: "Warm and soft. It lifts a plain outfit without asking for attention.",
      mustard: "Confident warmth, especially against white.",
      ivory: "Quiet colour. The small details do the talking.",
      navy: "A deeper frame for a pale outfit.",
      sky: "Cool and light, calm against white.",
      periwinkle: "A soft blue-violet that sits between grey and lilac.",
      red: "Bold, and it holds its own against white.",
      lilac: "Gentle purple, from soft lilac to deep plum.",
      azure: "A clear, bright blue for a lively outfit.",
      turquoise: "Bright and clean, with a cool edge.",
      teal: "Deep and calm, a blue-green with real depth.",
    } as Record<string, string>,
    screenNote: "Shade as photographed. It may look slightly different on your screen.",
  },

  shop: {
    titleLine: "Which one caught",
    titleAccent: "your eye?",
    intro:
      "Every veil has a piece number. Send it to me and I’ll tell you what I know about the fabric, the shade and whether it’s available.",
    modesLabel: "How would you like to look?",
    categoryLabel: "The collection",
    modes: {
      swipe: {
        label: "Swipe",
        hint: "One at a time. Drag right to keep a veil and left to pass. Anything you pass waits at the end in case you change your mind.",
      },
      wander: {
        label: "Wander",
        hint: "The full collection, at a glance. Tap any photograph to look closer.",
      },
      compare: {
        label: "Side by side",
        hint: "Choose two photographs to see their colour and drape together.",
      },
    },
    shadeLabel: "Shade",
    allShades: "All shades",
    fabricLabel: "Fabric",
    count: (n: number, shade?: string) => (shade ? `${n} in ${shade.toLowerCase()}` : `${n} veils and scarves`),
    emptyShade:
      "Nothing in that shade yet. Try another, or message me and I’ll tell you what I have.",
    emptyFabric: "I’m curating more pieces in this fabric. Until then, discover the full collection.",
    priceOnRequest: "Price on request",
    availability: "Availability confirmed on WhatsApp",
    piece: (ref: string) => `Piece ${ref}`,
    kidsTitle: "The children’s collection is being prepared.",
    kidsBody: "Ask Anisha when the first pieces will be ready.",
  },

  deck: {
    hintKeep: "Drag right to keep",
    hintPass: "Drag left to pass",
    pass: "Pass",
    keep: "Keep",
    undo: "Undo",
    lookCloser: "Look closer",
    progress: (i: number, n: number) => `${i} of ${n}`,
    announceKept: (ref: string) => `Kept piece ${ref}. It’s in My picks.`,
    announcePassed: (ref: string) => `Passed on piece ${ref}.`,
    endTitle: "You’ve reached the end of the collection.",
    endWithPicks: (n: number) =>
      `You kept ${n}. Take another look at the ones you passed, or send me your picks and we’ll talk them through.`,
    endNoPicks:
      "You didn’t keep any this time. Try another shade, or tell me what you’re wearing and I’ll suggest a place to start.",
    lookAgain: "Look again",
    openPicks: "Open My picks",
    ask: "Ask Anisha",
  },

  quickView: {
    keep: "Keep",
    kept: "Kept",
    ask: "Ask Anisha about this one",
    seeBack: "See the back",
    seeFront: "See the front",
    close: "Close",
  },

  compare: {
    title: "Side by side",
    pickHint: "Tap two photos below.",
    empty: "Choose two pieces from the collection and they’ll appear here.",
    pairHint: "Two views, together. Choose either photograph to look closer.",
    ask: "Ask Anisha about both",
    keepBoth: "Keep both",
    swap: "Swap sides",
    clear: "Start again",
  },

  picks: {
    title: "My picks",
    emptyTitle: "Nothing here yet.",
    emptyBody: "Keep a veil you like and it will wait for you here. There’s no rush.",
    browse: "Discover the collection",
    clear: "Clear all",
    compareTwo: "Compare two side by side",
    quantityFor: (ref: string) => `Quantity for piece ${ref}`,
    remove: "Remove",
    next: "Continue",
    back: "Back",
    detailsTitle: "Tell me a little about you",
    name: "Your name",
    contact: "Phone, WhatsApp or email",
    notes: "Outfit or colour notes",
    optional: "optional",
    notesHelp: "A line about what you’ll be wearing helps me suggest how to drape it.",
    sendWhatsApp: "Send my picks on WhatsApp",
    sendRequest: "Leave a request instead",
    saving: "Saving your request",
    footnote:
      "There’s no online payment. I’ll confirm availability, the total and delivery with you directly.",
    successTitle: "Request received.",
    successBody: "Thank you. I’ll be in touch to confirm availability and your total.",
    referenceLabel: "Your request code",
    done: "Done",
    error: "That didn’t save. Check your name and contact details, then try again.",
    whatsappHello: "Hello Anisha, these are my picks from Classyveils.ug:",
    whatsappClose: "Could you confirm availability, the total and delivery? Thank you.",
    whatsappSingle: (ref: string) =>
      `Hello Anisha, I’d like to ask about piece ${ref} from the Classyveils.ug collection. Could you confirm the fabric, price and availability?`,
    whatsappBoth: (a: string, b: string) =>
      `Hello Anisha, I’m deciding between pieces ${a} and ${b} from the Classyveils.ug collection. Could you tell me about the fabric, price and availability of each?`,
  },

  style: {
    titleLine: "Look at the fold,",
    titleAccent: "then the whole outfit.",
    intro:
      "Some veils have more than one view. Use them together when you’re deciding how you’d like the fabric to sit.",
    lessonTitle: "A first drape, in four steps",
    lessonIntro: "This is how I’d start. Use a mirror, and go slowly the first time.",
    stepLabel: (i: number, n: number) => `Step ${i} of ${n}`,
    steps: [
      {
        title: "Find the centre",
        body: "Lay the veil over your head so the centre sits at your forehead. Let one side hang a little longer than the other.",
      },
      {
        title: "Set the first fold",
        body: "Bring the longer side across and let it fall on its own, without pulling. Smooth it once with your palm. Then leave it alone; fabric sits best when you stop fussing.",
      },
      {
        title: "Secure it lightly",
        body: "One pin where the layers meet is usually enough. Keep it low and close so the line along your cheek stays clean.",
      },
      {
        title: "Let it settle",
        body: "Rest the long end over one shoulder. A quick look from the side in the mirror shows the fall better than the front does.",
      },
    ],
    photosTitle: "See it on",
    photoNotes: [
      { ref: "9778", caption: "Back view. This one shows the full length of the fall." },
      { ref: "9773", caption: "Front view. The small details along the edge are easier to see here." },
      { ref: "9678", caption: "Mustard on white brings a confident warmth." },
      { ref: "9403", caption: "Navy gives a pale outfit a clean, defined frame." },
    ],
    filmTitleLine: "Let me show you",
    filmTitleAccent: "how it falls.",
    filmBody:
      "Colour gives you the first impression. The film shows the quieter part: the weight of the fabric, the first fold, and where it settles at the shoulder.",
    filmChapters: ["Where to start", "The first fold", "Settling at the shoulder"],
    filmPlay: "Play the film",
    filmEmptyTitle: "The styling film is on its way.",
    filmEmptyBody: "Until it’s here, the four steps below cover a first drape.",
    fabricTitle: "Know your fabric",
    fabricIntro: "Each fabric moves differently. This is how I describe them.",
    pairTitle: "Colours I’d try against white",
    pairIntro: "These are the pairings I keep coming back to.",
    faqTitleLine: "What would you like",
    faqTitleAccent: "to ask me?",
    faq: [
      {
        q: "Which fabric is my veil?",
        a: "Send me the piece number and I’ll confirm the fabric and finish. I’m happy to tell you how it feels and how it wears.",
      },
      {
        q: "Is the veil I like available?",
        a: "I confirm availability by hand, so a photo on the site isn’t a promise yet. Send me the piece number and I’ll check before you plan around a colour.",
      },
      {
        q: "How do I order?",
        a: "Keep the veils you like, open My picks, and send them to me on WhatsApp. I’ll reply to confirm availability, the total and delivery. There’s no online payment.",
      },
      {
        q: "Can I see a veil from another angle?",
        a: "Some pieces have a front and a back view, like 9773 and 9778 in ivory, or 9853 and 9833 in rose. For any other piece, ask me whether more photos are available.",
      },
      {
        q: "Will the colour match my screen?",
        a: "Screens vary, so treat the photos as a close guide. If a shade matters to your outfit, tell me what you’re wearing and we’ll decide together.",
      },
      {
        q: "How do I care for it?",
        a: "Ask me for care instructions with your chosen piece. I need to confirm the fabric and finish before I advise you on washing or ironing.",
      },
      {
        q: "Do you have children’s veils?",
        a: "The children’s collection is being prepared. Check back soon, or ask me on WhatsApp.",
      },
    ],
    askLink: "Ask Anisha",
  },

  lookbook: {
    titleLine: "Let’s start with",
    titleAccent: "these colour stories.",
    intro:
      "I’ve picked four colour stories from the collection and noted the details I’d keep in view when styling each veil.",
    keepLook: (ref: string) => `Keep ${ref}`,
    seeRef: (ref: string) => `See piece ${ref}`,
    stories: [
      { id: "golden", ref: "9678", mood: "Mustard and white", title: "Let mustard lead.", copy: "Mustard 9678 brings a confident warmth to white. I’d keep the pairing simple and let the long end sit over one shoulder." },
      { id: "quiet", ref: "9773", mood: "Ivory, up close", title: "Keep the details in view.", copy: "Ivory 9773 is all about the small details along the edge. Leave them visible against white rather than tuck them into the fold." },
      { id: "romantic", ref: "9853", mood: "Rose and white", title: "A rose-coloured fold.", copy: "Rose 9853 has a softer presence from the front; 9833 shows its longer fall at the back. Together, they give you a better sense of the shape." },
      { id: "bold", ref: "9403", mood: "Navy contrast", title: "Try a deeper blue.", copy: "Navy 9403 gives a pale outfit a clean, defined frame. Send me this piece number if you’re considering a deeper shade for your own look." },
    ],
  },

  about: {
    eyebrow: "Meet Anisha",
    titleLine: "I’m Anisha.",
    titleAccent: "Welcome to ClassyVeils.",
    intro:
      "My full name is Anisha B Yusurah. Classyveils.ug is my considered collection of veils and scarves, chosen for colour, comfort and a graceful sense of occasion. WhatsApp is the easiest way to ask me about a piece.",
    noteTitleLine: "The right veil is a",
    noteTitleAccent: "starting point.",
    noteOne: (n: number) =>
      `I’ve brought ${n} ClassyVeils pieces together here. Each one gives us something specific to talk about: a shade, an edge detail, a fabric, or the way it falls from the shoulder.`,
    noteTwo:
      "When you message me, include the piece number you have in mind. I’ll confirm the piece, its availability and the delivery details with you before you order.",
    cta: "Say hello",
  },

  contact: {
    titleLine: "Send me the",
    titleAccent: "piece details.",
    intro:
      "Choosing between two veils? Send both piece numbers and tell me what you’ll wear with them. I’ll help you compare the options.",
    include:
      "Include the piece number (or both, if you’re deciding), a line about your outfit, and the area you’d like it delivered to.",
    catalogueTitleLine: "A closer look,",
    catalogueTitleAccent: "shared personally.",
    catalogueBody:
      "Send me a ClassyVeils piece number on WhatsApp. I can tell you more about the shade and the fabric, and we can sort out delivery before you order.",
    scan: "Scan to chat with Anisha",
    open: "Open WhatsApp",
    instagram: "Instagram",
    whatsappUnavailable: "WhatsApp details are temporarily unavailable. Please try again shortly.",
    call: "Call Anisha",
  },

  system: {
    notFoundTitle: "This page isn’t here.",
    notFoundBody: "The link may be old. The collection is the best place to start.",
    notFoundCta: "Go to the collection",
    errorTitle: "Something didn’t load.",
    errorBody: "Try again in a moment. If it keeps happening, message me on WhatsApp.",
    errorRetry: "Try again",
    loading: "Preparing the collection",
  },

  alt: {
    photo: (shade: string, ref: string, view?: string) =>
      `${shade} veil${view ? `, ${view} view` : ""}, piece ${ref}`,
  },
} as const;

// Supporting controls and accessible names for the experience.
export const ui = {
  brand: "ClassyVeils",
  logo: "Classy Veils, Celebrate Your Veil",
  home: "ClassyVeils home",
  navigation: "Main navigation",
  mobileNavigation: "Shop navigation",
  closePicks: "Close My picks",
  allFabrics: "All fabrics",
  fabricEmpty: "Fabric photographs are being prepared. Ask me about a fabric on WhatsApp.",
  price: (n: number) => `UGX ${n.toLocaleString("en-UG")}`,
  picksCount: (n: number) => `My picks, ${n} kept`,
  keepLabel: (kept: boolean, label: string) => `${kept ? "Kept" : "Keep"} ${label}`,
  closer: (label: string) => `Look closer at ${label}`,
  increase: (label: string) => `Add one ${label}`,
  decrease: (label: string) => `Remove one ${label}`,
  remove: (label: string) => `Remove ${label}`,
  comparePick: (label: string) => `Compare ${label}`,
  fullPicks: "My picks holds up to 50 different veils. Remove one before keeping another.",
  nameLine: "Name",
  contactLine: "Contact",
  wearingLine: "Wearing",
  messageItem: (label: string) => `Hello Anisha, I’d like to ask about ${label}. Could you confirm the fabric, price and availability?`,
  photoUnavailable: "The photograph did not load. You can still ask me about this piece.",
  railLabel: "Colour stories",
  railProgress: "Colour story progress",
  filmUnavailable: "The film did not load. The drape steps are still here to follow.",
  shadeNames: {
    rose: "Rose", mustard: "Mustard", ivory: "Ivory", navy: "Navy", sky: "Sky",
    periwinkle: "Periwinkle", red: "Red", lilac: "Lilac", azure: "Azure",
    turquoise: "Turquoise", teal: "Teal",
  },
} as const;

// Owner-entered catalogue text stays factual; punctuation follows the house voice.
export function shopperText(text: string) {
  return text.replace(/[\u2013\u2014]/g, ",").replace(/\p{Extended_Pictographic}/gu, "");
}
