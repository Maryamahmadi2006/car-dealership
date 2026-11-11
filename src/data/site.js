/* ============================================================
   Site-wide content — nav, footer, FAQs and per-page copy
   extracted from the original Framer site.
   ============================================================ */

export const navLinks = [
  { label: 'Inventory', to: '/inventory' },
  { label: 'Trade-In', to: '/trade-in' },
  { label: 'Financing', to: '/financing' },
  { label: 'About-us', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
];

export const footerLinks = {
  left: [
    { label: 'Home', to: '/' },
    { label: 'Inventory', to: '/inventory' },
    { label: 'Trade-In', to: '/trade-in' },
    { label: 'Financing', to: '/financing' },
  ],
  right: [
    { label: 'About', to: '/about-us' },
    { label: 'Contact', to: '/contact' },
    { label: 'Blog', to: '/#blog' },
  ],
};

export const legalLinks = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cookie Policy', href: '#' },
];

/* ---------------- Heroes ---------------- */

export const homeHero = {
  title: "Washington's Premier Luxury Dealership",
  text: "Curated luxury vehicles from the world's most prestigious brands since 2010",
  cta: { label: 'Browse Inventory', to: '/inventory' },
  stats: [
    { value: '800+', label: 'Car Sold', icon: 'car' },
    { value: '$80M', label: 'Sales Value', icon: 'price' },
  ],
};

export const inventoryHero = {
  title: 'Find Your Perfect Car Today, Drive It Tomorrow',
  text: "Curated luxury vehicles from the world's most prestigious brands, rigorously inspected and ready for immediate delivery.",
  cta: { label: 'Browse Inventory', href: '#filters' },
  stats: [
    { value: '25+', label: 'Luxury Brand', icon: 'check' },
    { value: '100+', label: 'Cars in Stock', icon: 'car' },
  ],
};

export const tradeInHero = {
  title: 'Get top value for your car, fast and hassle-free',
  text: 'Fair market valuations, instant offers, and same-day payment. Sell or trade your vehicle with complete transparency and trust',
  cta: { label: 'Get an Estimate', to: '/trade-in#form' },
  stats: [
    { value: '250+', label: 'Happy Sellers', icon: 'owners' },
    { value: '$45M+', label: 'Trade-in Value', icon: 'price' },
  ],
};

export const financingHero = {
  title: 'Flexible Financing to Match Your Lifestyle and Budget',
  text: 'Competitive rates, transparent terms, and expert guidance. Get pre-approved in minutes and drive home your dream car today.',
  cta: { label: 'Get an Estimate', to: '/financing#form' },
  stats: [
    { value: '$350M+', label: 'In Financing', icon: 'price' },
    { value: '250+', label: 'Clients Approved', icon: 'owners' },
  ],
};

export const aboutHero = {
  title: "We're the #1 Luxury Car Dealership in Washington",
  text: "Curated luxury vehicles from the world's most prestigious brands, delivered with integrity and expertise since 2010.",
  cta: { label: 'Meet our team', to: '/about-us#team' },
  stats: [
    { value: '$350M+', label: 'In Financing', icon: 'price' },
    { value: '800+', label: 'Client Served', icon: 'owners' },
  ],
};

export const contactHero = {
  title: "Get in Touch, We'll Respond Within Hours",
  text: "Curated luxury vehicles from the world's most prestigious brands. Our team is ready to answer your questions today.",
  rating: { score: '5,0', reviews: 'From 4000+ Reviews' },
};

/* ---------------- Homepage ---------------- */

export const featuredSection = {
  tag: 'Featured Cars',
  title: 'Performance Meets Prestige',
  text: 'Handpicked from our collection. Each one represents the pinnacle of automotive excellence today.',
  cta: { label: 'Browse Inventory', to: '/inventory' },
};

export const servicesSection = {
  tag: 'Services',
  title: "We're Way More Than a Dealership",
  text: "Premium vehicles deserve premium service—and that's exactly what you'll get.",
  cta: { label: 'Browse Inventory', to: '/inventory' },
  leftBlocks: [
    { title: 'Full Technical Inspection', image: `${import.meta.env.BASE_URL}images/svc-inspection.webp` },
    { title: 'Professional Detailing', image: `${import.meta.env.BASE_URL}images/svc-detailing.webp` },
  ],
  rightBlocks: [
    { title: 'Verified History & Trusted Brand', brands: true },
    { title: 'Warranty Support', image: `${import.meta.env.BASE_URL}images/svc-warranty.webp` },
    { title: 'Leasing & Financing', image: `${import.meta.env.BASE_URL}images/svc-financing.jpg` },
  ],
};

export const brandLogos = [
  `${import.meta.env.BASE_URL}images/brand-1.svg`,
  `${import.meta.env.BASE_URL}images/brand-2.svg`,
  `${import.meta.env.BASE_URL}images/brand-3.svg`,
  `${import.meta.env.BASE_URL}images/brand-4.svg`,
  `${import.meta.env.BASE_URL}images/brand-5.svg`,
  `${import.meta.env.BASE_URL}images/brand-6.svg`,
  `${import.meta.env.BASE_URL}images/brand-7.svg`,
  `${import.meta.env.BASE_URL}images/brand-8.svg`,
];

export const testimonialsSection = {
  tag: 'Testimonials',
  title: 'Great Numbers, Happy Owners.',
  text: 'Real experiences from customers who found their perfect car and trusted us completely.',
  cta: { label: 'Browse Inventory', to: '/inventory' },
  slide: {
    quote:
      'Outstanding service from start to finish, truly professional team and exceptional vehicle quality throughout',
    name: 'James Mitchell',
    role: 'Porshe 911 Owner',
    image: `${import.meta.env.BASE_URL}images/testimonial-james.png`,
  },
  stats: [
    { value: '20+', label: 'Years of Experience' },
    { value: '800+', label: 'Happy Owners' },
  ],
  rating: { score: '5,0', reviews: 'From +4000 reviews' },
};

export const homeTeamSection = {
  tag: 'Our Team',
  title: 'Meet The Experts.',
  text: 'Passionate about cars, precision, and exceptional service. Meet the people who make it happen.',
  cta: { label: 'Learn More', to: '/about-us' },
  members: [
    { name: 'Michael Richardson', role: 'Sales Director', image: `${import.meta.env.BASE_URL}images/team-michael.webp`, tall: false },
    { name: 'Sarah Thompson', role: 'Founder & CEO', image: `${import.meta.env.BASE_URL}images/team-sarah.webp`, tall: true },
  ],
};

export const blogSection = {
  tag: 'Blog',
  title: 'Insights & Expertise Now',
  text: 'Market trends, buying guides, and insider knowledge to help you make smarter decisions.',
  cta: { label: 'View All', to: '/#blog' },
  posts: [
    {
      title: "The New Lamborghini Urus Performante Has Arrived—And It's Everything We Hoped For",
      date: 'May 3, 2026',
      image: `${import.meta.env.BASE_URL}images/blog-urus.webp`,
    },
    {
      title: 'Leasing vs Buying a Luxury Car: Which Is Right for You in 2024?',
      date: 'May 3, 2026',
      image: `${import.meta.env.BASE_URL}images/blog-money.webp`,
    },
  ],
};

export const ctaSection = {
  title: 'Ready to Experience Your Dream Car?',
  text: 'Book a private test drive and feel what true performance means. Every vehicle available for immediate viewing.',
  cta: { label: 'Schedule Test Drive', to: '/contact' },
  image: `${import.meta.env.BASE_URL}images/cta-red-car.png`,
};

/* ---------------- How it works / Why us ---------------- */

export const tradeInSteps = {
  tag: 'How it works',
  title: 'Sell, Trade, or Upgrade Your Vehicle',
  steps: [
    {
      title: "Share Your Car's Details",
      text: 'VIN, mileage, condition, service history, and photos help us provide the most accurate valuation possible.',
    },
    {
      title: 'Receive Your Offer',
      text: 'Cash offer, trade-in credit, or upgrade options—whatever works best for your goals, delivered within hours.',
    },
    {
      title: 'Get Paid Immediately',
      text: "Same-day bank transfer or certified cheque means you're paid fast, securely, and hassle-free.",
    },
  ],
};

export const financingSteps = {
  tag: 'How it works',
  title: 'Get Pre-Approved in Three Simple Steps',
  steps: [
    {
      title: 'Choose Your Vehicle',
      text: 'Browse our inventory and select the car you love. Every vehicle qualifies for competitive financing options.',
    },
    {
      title: 'Get Pre-Approved Fast',
      text: 'Complete our simple online application in minutes. We work with leading lenders to secure your best rate.',
    },
    {
      title: 'Drive Home Today',
      text: 'Finalize your paperwork, sign your agreement, and drive away in your dream car the same day.',
    },
  ],
};

export const tradeInWhyUs = {
  tag: 'Why us',
  title: 'Why sell your car with us',
  text: 'You deserve top dollar and complete transparency. No lowball offers, no hidden fees, just honest valuations you can trust.',
  image: `${import.meta.env.BASE_URL}images/tradein-whyus.png`,
  imageAlt: 'Sports car parked outside with beautiful colors.',
  cta: { label: 'Get an Estimate', to: '/trade-in#form' },
  features: [
    { icon: 'check', label: 'Fair Market Pricing' },
    { icon: 'owners', label: '2,500+ Satisfied Sellers' },
    { icon: 'shield', label: 'Same-Day Payment Available' },
  ],
};

export const financingWhyUs = {
  tag: 'Why us',
  title: 'Why Finance With Us',
  text: 'You deserve financing that works for you, not against you. Competitive rates, flexible terms, and zero hidden fees guaranteed.',
  image: `${import.meta.env.BASE_URL}images/financing-whyus.png`,
  imageAlt: 'Red sports car in a garage.',
  cta: { label: 'Get an Estimate', to: '/financing#form' },
  features: [
    { icon: 'check', label: 'Flexible Payment Plans' },
    { icon: 'shield', label: 'Transparent Terms' },
    { icon: 'owners', label: 'Expert Finance Team' },
  ],
};

/* ---------------- Forms ---------------- */

export const tradeInForm = {
  title: 'Ready to discover what your car is worth?',
  text: 'Get an instant valuation online in minutes. No obligation, no pressure—just an honest assessment you can count on.',
  submit: 'Get Instant Valuation',
  bg: `${import.meta.env.BASE_URL}images/tradein-form-bg.webp`,
  bgAlt: 'Green sports car from above',
  fields: [
    { name: 'firstName', label: 'First Name*', type: 'text', placeholder: 'Jane', required: true },
    { name: 'lastName', label: 'Last Name*', type: 'text', placeholder: 'Doe', required: true },
    { name: 'email', label: 'Email*', type: 'email', placeholder: 'jane@framer.com', required: true },
    { name: 'phone', label: 'Phone*', type: 'tel', placeholder: '+1 (425) 555-0142', required: true },
    { name: 'make', label: 'Make*', type: 'text', placeholder: 'Audi', required: true },
    { name: 'year', label: 'Year*', type: 'text', placeholder: '2024', required: true },
    { name: 'model', label: 'Model*', type: 'text', placeholder: 'RS6', required: true },
    { name: 'trim', label: 'Trim*', type: 'text', placeholder: 'Performance', required: true },
    { name: 'mileage', label: 'Mileage*', type: 'text', placeholder: '1000', required: true },
    { name: 'vin', label: 'VIN ( Optional )', type: 'text', placeholder: 'WAUZZZ4G9PN123456' },
    {
      name: 'condition',
      label: 'Condition*',
      type: 'select',
      full: true,
      required: true,
      options: ['New', 'Excellent', 'Good', 'Fair', 'Not Sure'],
    },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your vehicle…' },
  ],
};

export const financingForm = {
  title: 'Ready to Get Pre-Approved for Financing?',
  text: 'Complete our quick application and receive your personalized financing options within hours. No impact to your credit score.',
  submit: 'Get pre-approved',
  bg: `${import.meta.env.BASE_URL}images/financing-form-bg.webp`,
  bgAlt: 'Silver sportscar from above, dark background',
  fields: [
    { name: 'firstName', label: 'First Name*', type: 'text', placeholder: 'Jane', required: true },
    { name: 'lastName', label: 'Last Name*', type: 'text', placeholder: 'Doe', required: true },
    { name: 'email', label: 'Email*', type: 'email', placeholder: 'jane@framer.com', required: true },
    { name: 'phone', label: 'Phone*', type: 'tel', placeholder: '+1 (425) 555-0142', required: true },
    {
      name: 'employment',
      label: 'Employment Status*',
      type: 'select',
      required: true,
      options: ['Employed', 'Self-Employed', 'Retired', 'Student', 'Other'],
    },
    {
      name: 'income',
      label: 'Annual Income*',
      type: 'select',
      required: true,
      options: ['$0-$25k/year', '$25-$50k/year', '$50-$75k/year', '$75-$100k/year', '+$100k/year'],
    },
    {
      name: 'credit',
      label: 'Credit Score ( Optional )',
      type: 'select',
      full: true,
      options: ['Excellent (750+)', 'Good (700-749)', 'Fair (650-699)', 'Poor (Below 650)', 'Not Sure'],
    },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us about your financing needs…' },
  ],
};

export const contactForm = {
  submit: 'Get in touch',
  fields: [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Jane' },
    {
      name: 'service',
      label: 'Selected Service',
      type: 'select',
      options: ['Buy Car', 'Schedule Test Drive', 'Trade-in', 'Financing Options', 'General Question'],
    },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@framer.com' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (425) 555-0142' },
    { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Your Text' },
  ],
};

/* ---------------- Contact info ---------------- */

export const contactSection = {
  tag: 'Contact',
  title: 'Visit Our Showroom',
  text: 'Experience our curated collection in person. Visit our showroom, meet the team, and explore the vehicles firsthand.',
  mapUrl:
    'https://maps.google.com/maps?q=10500%20NE%208th%20St%2C%20Bellevue%2C%20WA%2098004&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapLink: 'https://www.google.com/maps/place/10500+NE+8th+St,+Bellevue,+WA+98004',
  items: [
    { icon: 'mail', label: 'Mail', value: 'contact@car-dealership.co' },
    { icon: 'phone', label: 'Phone', value: '+1 (425) 555-0142' },
    { icon: 'map', label: 'Address', value: '10500 NE 8th Street Bellevue' },
    { icon: 'clock', label: 'Working Hours', value: 'Mon-Sat, 9AM-6PM' },
  ],
};

/* ---------------- About page ---------------- */

export const missionSection = {
  tag: 'The Mission',
  title: 'A Dealership Built on a Philosophy',
  quote:
    '"You hold the power here. No pressure, no games, no outdated tactics. Just transparent pricing, expert guidance, and respect for your time and intelligence."',
  image: `${import.meta.env.BASE_URL}images/about-hero.png`,
  imageAlt: 'Black Range Rover Sport P530 SV in studio',
};

export const promiseSection = {
  tag: 'Our Promise to You',
  stats: [
    { value: '10+', label: 'Years In Business' },
    { value: '48+', label: 'Score Satisfaction' },
    { value: '25+', label: 'Luxury Brands' },
    { value: '392+', label: 'Happy Owners' },
  ],
};

export const aboutTeamSection = {
  tag: 'The Team',
  title: 'A team of expert, tailored for you.',
  text: 'Passionate about cars, precision, and exceptional service. Meet the people who make it happen.',
  cta: { label: 'Get in Touch', to: '/contact' },
  members: [
    { name: 'Sarah Thompson', role: 'Founder & CEO', image: `${import.meta.env.BASE_URL}images/team-sarah.webp` },
    { name: 'Michael Richardson', role: 'Sales Director', image: `${import.meta.env.BASE_URL}images/team-michael.webp` },
    { name: 'James Wilson', role: 'Finance Manager', image: `${import.meta.env.BASE_URL}images/team-james.png` },
    { name: 'Marcus Johnson', role: 'Trade-In Specialist', image: `${import.meta.env.BASE_URL}images/team-marcus.png` },
    { name: 'Emma Davies', role: 'Service Advisor', image: `${import.meta.env.BASE_URL}images/team-emma.png` },
    { name: 'Oliver Brown', role: 'Technical Inspector', image: `${import.meta.env.BASE_URL}images/team-oliver.png` },
  ],
};

/* ---------------- FAQs (per page) ---------------- */

const faqSharedTitle = 'Everything You Need Here';

export const homeFaq = {
  tag: 'FAQ',
  title: faqSharedTitle,
  text: 'Everything you need to know about financing, warranties, delivery, and buying with confidence.',
  items: [
    {
      q: 'What financing options do you offer?',
      a: "We work with a wide network of lenders to offer flexible financing solutions — whether you're buying new, used, or refinancing. Our finance team will walk you through competitive rates, lease options, and payment plans tailored to your budget. Pre-approval is available online in minutes.",
    },
    {
      q: 'Can I trade in my current vehicle?',
      a: 'Absolutely. We accept trade-ins on all makes and models. Bring your vehicle in for a free, no-obligation appraisal, or get an instant estimate online. Your trade-in value can be applied directly toward your next purchase.',
    },
    {
      q: 'Do your used vehicles come with a warranty?',
      a: 'All certified pre-owned vehicles in our inventory go through a rigorous multi-point inspection and come with a limited warranty. Extended protection plans are also available for added peace of mind.',
    },
    {
      q: 'How do I schedule a test drive?',
      a: "You can book a test drive directly on our website by selecting any vehicle in our inventory, or simply call our showroom. We're open 7 days a week and happy to accommodate same-day appointments.",
    },
    {
      q: 'Do you offer vehicle delivery?',
      a: "Yes. We offer home and office delivery within the region. Once your paperwork is finalized, we'll coordinate a convenient time to bring your vehicle directly to you.",
    },
  ],
};

export const tradeInFaq = {
  tag: 'FAQ',
  title: faqSharedTitle,
  text: 'Common questions about selling, trading, and getting the best value for your vehicle answered honestly and clearly',
  items: [
    {
      q: "How do you determine my car's value?",
      a: 'We use current market data, recent sales comparisons, vehicle condition, mileage, and service history to provide a fair, accurate valuation. Our offers are transparent—no hidden deductions or surprise fees after inspection.',
    },
    {
      q: 'Can I trade my car toward a vehicle in your inventory?',
      a: 'Absolutely. Your trade-in value can be applied directly toward any vehicle we have in stock. We handle all the paperwork, settlement of outstanding finance, and make the entire process seamless for you.',
    },
    {
      q: 'What if I still owe money on my car?',
      a: "No problem. We'll work with your lender to settle any outstanding finance as part of the transaction. If your car's value exceeds what you owe, you'll receive the difference. We handle everything.",
    },
    {
      q: 'How long does the valuation process take?',
      a: "Our online valuation tool provides an instant estimate in minutes. For a final offer, we'll need to inspect the vehicle in person—typically completed within 30 minutes at our showroom or your location.",
    },
    {
      q: 'What documents do I need to sell my car?',
      a: "You'll need the V5C registration document (logbook), MOT certificate (if applicable), service history records, and proof of identity. We'll guide you through the entire process and handle DVLA notifications for you.",
    },
  ],
};

export const financingFaq = {
  tag: 'FAQ',
  title: faqSharedTitle,
  text: 'Common questions about our financing process, rates, requirements, and approval answered clearly and honestly here.',
  items: [
    {
      q: 'What Financing Options Do You Offer?',
      a: 'We partner with leading UK lenders to offer PCP (Personal Contract Purchase), HP (Hire Purchase), and personal loans. Our finance team compares rates from multiple providers to secure the most competitive terms for your situation and budget.',
    },
    {
      q: 'What Credit Score Do I Need to Get Approved?',
      a: 'We work with lenders across the credit spectrum. Whether your credit is excellent, good, fair, or rebuilding, we have financing solutions available. Even applicants with past credit challenges can often qualify with our specialist lenders.',
    },
    {
      q: 'How Long Does the Pre-Approval Process Take?',
      a: "Pre-approval typically takes 10-15 minutes online. You'll receive an initial decision within hours. Full approval and final paperwork are usually completed on the same day you visit our showroom to finalize your purchase.",
    },
    {
      q: 'What Documents Do I Need for a Finance Application?',
      a: "You'll need proof of identity (passport or driving licence), proof of address (utility bill or bank statement within 3 months), and proof of income (recent payslips or bank statements). Self-employed applicants typically provide accountant letters or SA302 tax forms.",
    },
    {
      q: 'Can I Settle My Finance Agreement Early?',
      a: 'Yes. All our finance agreements allow early settlement. If you pay off your balance early, you may receive a rebate on interest charges. Contact us anytime for a settlement figure—there are no penalties for early repayment.',
    },
  ],
};

export const aboutFaq = {
  tag: 'FAQ',
  title: faqSharedTitle,
  text: 'Common questions about our dealership, team, services, and what makes us different answered honestly and clearly.',
  items: [
    {
      q: 'What Makes You Different From Other Dealerships?',
      a: "We've eliminated the traditional high-pressure sales tactics. Instead, you'll experience transparent pricing, honest conversations, expert guidance, and genuine respect for your time. We're car enthusiasts first, salespeople second—and that makes all the difference.",
    },
    {
      q: 'How Long Have You Been in Business?',
      a: "We've been serving discerning luxury car buyers for over 20 years. Our founder started this dealership in 2010 with a simple mission: rebuild the car buying experience around trust, expertise, and complete transparency.",
    },
    {
      q: 'Who Are Your Team Members?',
      a: 'Our team includes certified automotive technicians, experienced finance specialists, and dedicated sales advisors—all passionate about luxury vehicles. Every team member undergoes continuous training and shares our commitment to exceptional service and integrity.',
    },
    {
      q: 'What Brands Do You Specialize In?',
      a: "We specialize in the world's most prestigious automotive brands: Porsche, Ferrari, Lamborghini, McLaren, Aston Martin, Bentley, Rolls-Royce, Mercedes-AMG, BMW M Division, Audi Sport, and Range Rover. Only the finest vehicles earn a place in our showroom.",
    },
    {
      q: 'Do You Offer Aftersales Support?',
      a: "Absolutely. Our relationship doesn't end when you drive away. We provide ongoing support, service coordination, warranty claims assistance, and technical advice throughout your ownership. You're part of our family from day one.",
    },
  ],
};

export const contactFaq = {
  tag: 'FAQ',
  title: faqSharedTitle,
  text: 'Quick answers to common questions about visiting our showroom, booking appointments, and getting in touch with our team.',
  items: [
    {
      q: 'What Are Your Showroom Hours?',
      a: "We're open Monday through Saturday, 9:00 AM to 6:00 PM. We're closed on Sundays. For appointments outside these hours, please contact us directly—we're happy to accommodate your schedule.",
    },
    {
      q: 'Do I Need an Appointment to Visit?',
      a: "Walk-ins are always welcome during showroom hours. However, booking an appointment ensures dedicated time with one of our specialists and guarantees the specific vehicle you're interested in will be available for viewing and test driving.",
    },
    {
      q: 'How Quickly Will You Respond to My Enquiry?',
      a: 'We typically respond to all enquiries within 2-4 hours during business hours. For urgent matters, please call us directly. Weekend enquiries are answered first thing Monday morning.',
    },
    {
      q: 'Can I Schedule a Test Drive Through the Contact Form?',
      a: "Absolutely. Simply select 'Schedule Test Drive' from the dropdown menu, mention the vehicle you're interested in, and suggest your preferred date and time. We'll confirm availability and send you all the details.",
    },
    {
      q: 'Is Parking Available at Your Showroom?',
      a: "Yes, we have complimentary customer parking directly adjacent to our showroom. Accessible parking spaces are available, and we're easily reachable via public transport as well.",
    },
  ],
};
