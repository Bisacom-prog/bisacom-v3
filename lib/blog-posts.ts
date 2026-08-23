export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  example?: { label: string; weak?: string; better?: string };
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ux-problems-small-business-enquiries",
    title: "5 UX Problems That Cost Small Businesses Enquiries",
    excerpt: "Five common website UX problems that quietly reduce enquiries, plus practical ways small businesses can remove friction and improve conversion.",
    publishedAt: "2026-08-23",
    readTime: "6 min read",
    category: "UX for Business",
    primaryKeyword: "small business UX problems",
    supportingKeywords: ["website UX for small businesses", "improve website enquiries", "small business website usability", "UX design Norwich", "website conversion problems"],
    seoTitle: "5 UX Problems That Cost Small Businesses Enquiries",
    seoDescription: "Discover five common UX problems that cause small businesses to lose website enquiries, and practical ways to improve usability, trust and conversions.",
    sections: [
      {paragraphs: [
        "A potential customer can land on your website with genuine interest in your service and still leave without contacting you.",
        "In many cases, the problem is not your product, pricing or reputation. The problem is the user experience. A small-business website should make it easy for visitors to understand what you offer, trust your business and take the next step. When that journey becomes confusing or unnecessarily difficult, enquiries are lost."
      ]},
      {heading: "1. There is no clear call to action", paragraphs: [
        "Every important page should make the next step obvious. A visitor should not have to search around your website wondering how to book, request a quote, call, place an order or find the contact form.",
        "A website may look professional and still perform poorly if its calls to action are weak, hidden or inconsistent."
      ], bullets: ["Book a lesson", "Request a quote", "Order now", "Book a consultation", "Call us"]},
      {heading: "2. The website contains too much information", paragraphs: [
        "Small businesses often try to put everything on the homepage. Every service, paragraph, promotion, testimonial and photograph then competes for attention.",
        "Good UX is not about removing information for the sake of minimalism. It is about presenting information in the right order so customers can make decisions quickly."
      ], numbered: ["What does this business offer?", "Who is it for?", "Why should I trust it?", "What should I do next?"]},
      {heading: "3. The mobile experience is difficult to use", paragraphs: [
        "Many customers discover local businesses on their phones while travelling, comparing options, looking for directions or trying to make contact quickly.",
        "Design the mobile experience intentionally rather than treating it as a smaller desktop website. Important actions should remain easy to find and easy to tap."
      ], bullets: ["Readable text", "Comfortable tap targets", "Simple navigation", "Fast-loading images", "Visible contact and enquiry actions", "Forms that are easy to complete"]},
      {heading: "4. Customers do not have enough reasons to trust you", paragraphs: [
        "Before contacting a small business, people look for reassurance that the business is legitimate, competent and reliable.",
        "Trust signals work best close to important decision points, not hidden at the bottom of the website."
      ], bullets: ["Genuine customer reviews", "Photographs of real work", "Client testimonials", "Professional contact details", "Location or service area", "Relevant qualifications or accreditations", "Clear pricing guidance where appropriate"]},
      {heading: "5. The enquiry process has too much friction", paragraphs: [
        "A customer may be ready to contact you but abandon the process because the enquiry journey asks for too much effort. Every unnecessary step creates another opportunity to leave.",
        "Only request information that is genuinely necessary at the first point of contact. Additional details can be collected once the conversation begins."
      ], bullets: ["Name", "Email or telephone number", "Service required", "Short message"]},
      {heading: "Good UX supports business growth", paragraphs: [
        "A successful small-business website is not simply an online brochure. It should guide people from interest to understanding, trust and action.",
        "Improving UX does not always require rebuilding an entire website. Focused improvements to navigation, hierarchy, mobile usability, trust signals and calls to action can materially improve the customer journey."
      ]}
    ]
  },
  {
    slug: "how-to-choose-product-designer-norwich",
    title: "How to Choose a Product Designer in Norwich",
    excerpt: "A practical guide for businesses and startups choosing a Product Designer, from portfolio quality and UX thinking to communication and technical awareness.",
    publishedAt: "2026-08-23",
    readTime: "7 min read",
    category: "Product Design",
    primaryKeyword: "Product Designer Norwich",
    supportingKeywords: ["UX UI Designer Norwich", "freelance Product Designer Norwich", "hire Product Designer Norwich", "UX designer Norwich"],
    seoTitle: "How to Choose a Product Designer in Norwich",
    seoDescription: "Learn what to look for when hiring a Product Designer in Norwich, including UX thinking, portfolio quality, communication, technical awareness and project fit.",
    sections: [
      {paragraphs: [
        "Choosing the right Product Designer can have a major impact on the success of a website, app or digital product.",
        "A strong Product Designer does more than make interfaces attractive. They clarify business goals, understand user needs, simplify complex journeys and turn ideas into practical digital experiences."
      ]},
      {heading: "1. Look beyond visual design", paragraphs: [
        "Polished interfaces matter, but good Product Design starts before visual styling. The designer should be able to explain the problem being solved, who the users are, what the business is trying to achieve and why particular design decisions were made.",
        "A useful portfolio demonstrates thinking as well as final screens."
      ], bullets: ["Problem definition", "Research or discovery", "User flows", "Wireframes", "Design decisions", "Testing or iteration", "Final outcomes"]},
      {heading: "2. Check whether their work matches your project", paragraphs: [
        "Product Designers often have different strengths. Some focus on mobile apps, SaaS platforms, dashboards, websites, e-commerce or internal business tools.",
        "Relevant experience is usually more useful than the sheer number of projects shown."
      ]},
      {heading: "3. Evaluate their UX thinking", paragraphs: [
        "Strong designers can explain why an interface works, not simply why it looks better. They should be comfortable identifying unclear navigation, unnecessary steps, weak calls to action, confusing forms, accessibility issues and poor mobile behaviour."
      ], bullets: ["How would you approach this problem?", "How do you decide what to prioritise?", "How do you validate designs?", "How do you handle conflicting stakeholder feedback?", "How do you design for accessibility?"]},
      {heading: "4. Make sure they understand business goals", paragraphs: [
        "Product Design sits between user needs and business goals. A designer should understand whether the priority is more enquiries, better onboarding, fewer support requests, higher conversion, easier internal workflows or faster task completion.",
        "Look for someone who asks about your audience, current challenges, competitors, success measures, budget and timeline."
      ]},
      {heading: "5. Review communication and process", paragraphs: [
        "Product Design is collaborative, so communication matters. A professional designer should be clear about scope, deliverables, milestones, feedback rounds, timelines, handover and pricing."
      ], bullets: ["Avoid vague scope", "Agree a realistic timeline", "Define revisions", "Understand how handover will work", "Expect design decisions to be explained clearly"]},
      {heading: "6. Check their technical awareness", paragraphs: [
        "A Product Designer does not have to be a developer, but an understanding of implementation can improve responsive layouts, component systems, handoff quality and collaboration with engineering teams."
      ]},
      {heading: "7. Consider local knowledge and remote capability", paragraphs: [
        "Working with a Product Designer in Norwich can be valuable when you prefer local collaboration or knowledge of the regional business environment. At the same time, modern Product Design works effectively through remote tools such as Figma, video calls and asynchronous feedback."
      ]},
      {heading: "What should a Product Designer cost?", paragraphs: [
        "Pricing depends on scope and complexity. A focused UX audit will cost substantially less than an end-to-end SaaS platform or mobile application.",
        "Common models include hourly rates, day rates, fixed project fees, design sprints and retainers. The key is to make scope and deliverables clear before work begins."
      ]},
      {heading: "Choosing the right Product Designer", paragraphs: [
        "The right designer should help you move from uncertainty to clarity by balancing users, business goals and technology.",
        "When comparing designers, focus on relevant case studies, their decision-making process and their ability to explain how their work solves real problems."
      ]}
    ]
  },
  {
    slug: "good-saas-ux-ui-design",
    title: "What Makes a Good SaaS UX/UI Design?",
    excerpt: "Ten principles behind effective SaaS experiences, including information architecture, role-based journeys, accessibility, system feedback and edge cases.",
    publishedAt: "2026-08-23",
    readTime: "8 min read",
    category: "SaaS Design",
    primaryKeyword: "SaaS UX UI design",
    supportingKeywords: ["SaaS product design", "SaaS UX best practices", "dashboard UX design", "B2B SaaS design", "UX design for SaaS"],
    seoTitle: "What Makes a Good SaaS UX/UI Design?",
    seoDescription: "Learn the key principles of effective SaaS UX/UI design, from information architecture and user flows to design systems, accessibility and edge cases.",
    sections: [
      {paragraphs: [
        "A SaaS product can have powerful features and still feel difficult to use. That usually happens when the interface exposes too much complexity to the user.",
        "Good SaaS UX/UI design makes complexity manageable. It helps users understand what to do, complete tasks efficiently and feel confident using the product."
      ]},
      {heading: "1. Clear information architecture", paragraphs: [
        "SaaS products often contain many features, screens and user roles. Without clear information architecture, users quickly lose their sense of place.",
        "Group features around user goals rather than internal company terminology, and make navigation predictable."
      ], bullets: ["Where am I?", "What can I do here?", "How do sections relate?", "How do I return to an important area?"]},
      {heading: "2. Strong visual hierarchy", paragraphs: [
        "Users should be able to scan a screen and understand what is most important. Weak hierarchy makes every button, card and data point compete for attention."
      ], bullets: ["Clear headings", "Consistent spacing", "Appropriate contrast", "Predictable layouts", "Restrained colour", "Clear primary actions"]},
      {heading: "3. Simple user flows", paragraphs: [
        "SaaS products become difficult when features accumulate without the core workflows being simplified. Review each step and remove unnecessary decisions or repeated inputs."
      ], bullets: ["Is every step necessary?", "Can information be pre-filled?", "Can two steps be combined?", "Is the next action obvious?", "Does the user receive clear feedback?"]},
      {heading: "4. Consistency across the product", paragraphs: [
        "Consistency helps users build mental models. Similar actions should look and behave similarly across screens.",
        "A design system improves usability while making the product easier for design and engineering teams to maintain."
      ]},
      {heading: "5. Good empty, error and loading states", paragraphs: [
        "Users will encounter empty dashboards, failed uploads, missing information, loading states and permission restrictions. These states should be intentionally designed rather than treated as exceptions."
      ], example: {label: "Error-message example", weak: "Something went wrong.", better: "We couldn't upload the file. Check that it is under 10MB and try again."}},
      {heading: "6. Role-based experiences", paragraphs: [
        "Many SaaS products serve administrators, managers, employees, clients or reviewers. These users have different goals and permissions.",
        "Avoid showing every feature to every user. Prioritise the information and actions relevant to each role."
      ]},
      {heading: "7. Accessibility", paragraphs: [
        "Accessibility should be considered from the beginning, particularly for products used by organisations, teams or regulated sectors."
      ], bullets: ["Colour contrast", "Keyboard navigation", "Visible focus states", "Readable typography", "Descriptive labels", "Accessible forms", "Useful error messages"]},
      {heading: "8. Responsive behaviour", paragraphs: [
        "Responsive SaaS design does not always mean reproducing every desktop interaction on a phone. Prioritise the mobile tasks that users genuinely need, such as checking status, approving requests or responding to notifications."
      ]},
      {heading: "9. Useful feedback and system status", paragraphs: [
        "Users should always understand what the system is doing. Confirm important actions and make processing states visible."
      ], bullets: ["Success messages", "Progress indicators", "Loading states", "Autosave status", "Confirmation dialogs", "Undo actions"]},
      {heading: "10. Design for real workflows, not perfect scenarios", paragraphs: [
        "Real users encounter missing data, incorrect entries, cancelled actions, expired sessions, incomplete tasks and permission problems.",
        "Recovery paths matter just as much as the happy path because products often feel most frustrating when something goes wrong."
      ]},
      {heading: "Good SaaS UX reduces complexity", paragraphs: [
        "A strong SaaS interface does not make a complex product simplistic. It makes complexity manageable.",
        "The best experiences help users understand the system quickly, complete tasks efficiently, recover from mistakes and focus on their work rather than the interface."
      ]}
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
