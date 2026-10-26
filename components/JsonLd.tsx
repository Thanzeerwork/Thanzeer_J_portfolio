export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thanzeer-j.is-a.dev";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Thanzeer J",
        "alternateName": ["TJ", "Thanzeer"],
        "url": baseUrl,
        "image": `${baseUrl}/favicon.svg`,
        "jobTitle": "Full-Stack Developer & Software Developer",
        "description":
          "Full-Stack Developer and Mobile App Engineer based in Kerala, India. Specializing in modern React, Next.js, React Native cross-platform applications, and cloud database integrations.",
        "email": "thanzeerwork@gmail.com",
        "telephone": "+919895654031",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kerala",
          "addressCountry": "IN",
        },
        "sameAs": [
          "https://github.com/Thanzeerwork",
          "https://www.linkedin.com/in/thanzeer-j/",
          "https://ryphtech.in/",
        ],
        "knowsAbout": [
          "Web Development",
          "Full-Stack Development",
          "Mobile Application Development",
          "React.js",
          "Next.js",
          "React Native",
          "Node.js",
          "TypeScript",
          "JavaScript",
          "Tailwind CSS",
          "Cloud Firestore",
          "Firebase",
          "Supabase",
          "MongoDB",
          "REST APIs",
          "UI/UX Engineering",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Thanzeer J — Full-Stack Developer & Software Engineer",
        "alternateName": "Thanzeer J Portfolio",
        "description":
          "Explore the portfolio, production case studies, and engineering projects of Thanzeer J, including RyphTech, MealHub, and Repairro.",
        "publisher": {
          "@id": `${baseUrl}/#person`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profile`,
        "url": baseUrl,
        "name": "Thanzeer J Developer Profile",
        "isPartOf": {
          "@id": `${baseUrl}/#website`,
        },
        "mainEntity": {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        "name": "Thanzeer J Software Engineering & Development",
        "url": baseUrl,
        "provider": {
          "@id": `${baseUrl}/#person`,
        },
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Development",
                "description":
                  "Modern, responsive web applications and brand websites built with React, Next.js, and clean component architectures.",
                "url": `${baseUrl}/services/web-development`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile Application Development",
                "description":
                  "Cross-platform iOS and Android mobile applications using React Native with offline caching and cloud database synchronization.",
                "url": `${baseUrl}/services/mobile-development`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Backend & Database Integration",
                "description":
                  "Application data management, authentication, and communication across Firebase Cloud Firestore, Supabase, and MongoDB.",
                "url": `${baseUrl}/services/backend-database`,
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
