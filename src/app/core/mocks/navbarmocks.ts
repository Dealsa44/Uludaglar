export const navbarMocks: any[] = [
  {
    title: 'ULUDAGLAR',
    order: -1, // Logo
    route: '', // Home route
  },
  {
    title: ['Ana Sayfa', 'Home Page'],
    order: 0,
    route: '', // Home route
  },
  {
    title: ['Hakkımızda', 'About Us'],
    order: 1,
    hasDropdown: true,
    dropdownItems: [
      {
        title: ['Hakkımızda', 'About Us'],
        route: 'about-us',
      },
      {
        title: ['Vizyon ve Misyon', 'Vision and Mission'],
        route: 'vision-mission',
      },
    ],
  },
  {
    title: ['Hizmetlerimiz', 'Our Services'],
    order: 2,
    route: 'services',
  },
  {
    title: ['Sosyal Sorumluluk', 'Social Responsibility'],
    order: 3,
    subtitle: ['Burs Başvurusu', 'Scholarship Application'],
    route: 'social-responsibility',
  },
  {
    title: ['Blog', 'Blog'],
    order: 4,
    route: 'blog',
  },
  {
    title: ['İK', 'HR'],
    order: 5,
    route: 'hr',
  },
  {
    title: ['İletişim', 'Contact Us'],
    order: 6,
    route: 'contact',
  },
  {
    title: ['TÜRK', 'ENG'],
    order: 7,
    isLanguageToggle: true,
  },
];
