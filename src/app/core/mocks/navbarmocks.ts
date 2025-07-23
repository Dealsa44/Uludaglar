export const navbarMocks: any[] = [
  {
    title: 'ULUDAGLAR',
    order: -1, // Logo
  },
  {
    title: ['Ana Sayfa', 'Home Page'],
    order: 0,
  },
  {
    title: ['Hakkımızda', 'About Us'],
    order: 1,
    hasDropdown: true,
    dropdownItems: [
      { title: ['Hakkımızda', 'About Us'] },
      { title: ['Vizyon ve Misyon', 'Vision and Mission'] },
    ],
  },
  {
    title: ['Hizmetlerimiz', 'Our Services'],
    order: 2,
  },
  {
    title: ['Sosyal Sorumluluk', 'Social Responsibility'],
    order: 3,
    subtitle: ['Burs Başvurusu', 'Scholarship Application'],
  },
  {
    title: ['Blog', 'Blog'],
    order: 4,
  },
  {
    title: ['İK', 'HR'],
    order: 5,
  },
  {
    title: ['İletişim', 'Contact Us'],
    order: 6,
  },
  {
    title: ['TÜRK', 'ENG'],
    order: 7,
  },
];
