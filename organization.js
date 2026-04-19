const schemaData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://kajotte-studio.com/#organization",
  "name": "Kajotte Studio",
  "alternateName": "Kajotte",
  "url": "https://kajotte-studio.com",
  "mainEntityOfPage": "https://kajotte-studio.com/",
  "logo": "https://kajotte-studio.com/web-app-manifest-512x512.png",
  "keywords": "Kajotte Studio, SAKS, educational tools,educational blog, open-source tools, creative tools for developers, programming, Python, free resources, NASA data",
  "description": "A versatile educational platform supporting creators in the fields of programming, music, film, and photography. Kajotte Studio provides the knowledge and tools necessary for creative development, while promoting the idea of minimalism and clean code.",
  "sameAs": [
    "https://github.com/Kajotte-studio/",
    "https://pypi.org/user/Kajotte-Studio/",
    "https://www.youtube.com/@KajotteStudio/", 
    "https://pinterest.com/kajottestudio/",
    "https://kajotte-studio.com/",
    "https://kajotte-studio.github.io/",
    "https://host447933.xce.pl/"
  ],
  "brand": {
    "@type": "Brand",
    "name": "Kajotte Studio"
  }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);