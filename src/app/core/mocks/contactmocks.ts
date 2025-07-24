export const contactMocks = {
  title: ['İletişim', 'Contact Us'],
  branches: [
    {
      name: ['Demetevler Merkez Ofis', 'Demetevler Head Office'],
      contactInfo: [
        {
          type: 'phone',
          icon: 'assets/imgs/contactus/telephone.svg',
          value: '+90 312 335 55 28',
          action: 'tel:+903123355528',
        },
        {
          type: 'email',
          icon: 'assets/imgs/contactus/e-mail.svg',
          value: 'emlak@uludaglar.com',
          action: 'mailto:emlak@uludaglar.com',
        },
        {
          type: 'address',
          icon: 'assets/imgs/contactus/address.svg',
          value: [
            'Demetevler, 401. Cd. 10/C, 06200 Yenimahalle/Ankara, Türkiye',
            'Demetevler, 401st St. No: 10/C, 06200 Yenimahalle/Ankara, Turkey',
          ],
          action:
            'https://www.google.com/maps/place/Uluda%C4%9Flar+Property+(Real+Estate)/@39.968399,32.788303,16z/data=!4m6!3m5!1s0x14d3494264b3eedf:0x26f74fd2eb78d61b!8m2!3d39.968355!4d32.7866965!16s%2Fg%2F1w6049nc?hl=en-US&entry=ttu',
        },
      ],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.123456789!2d32.7866965!3d39.968355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d3494264b3eedf%3A0x26f74fd2eb78d61b!2sUluda%C4%9Flar%20Property%20(Real%20Estate)!5e0!3m2!1sen!2str!4v1234567890',
    },
    {
      name: ['Eskişehir Yolu Şubesi', 'Eskisehir Road Branch'],
      contactInfo: [
        {
          type: 'phone',
          icon: 'assets/imgs/contactus/telephone.svg',
          value: '+90 312 504 06 06',
          action: 'tel:+903125040606',
        },
        {
          type: 'email',
          icon: 'assets/imgs/contactus/e-mail.svg',
          value: 'emlak@uludaglar.com',
          action: 'mailto:emlak@uludaglar.com',
        },
        {
          type: 'address',
          icon: 'assets/imgs/contactus/address.svg',
          value: [
            'Fatih Sultan, 2363. Cd. No: 21, 06790 Etimesgut/Ankara, Türkiye',
            'Fatih Sultan, 2363rd St. No: 21, 06790 Etimesgut/Ankara, Turkey',
          ],
          action:
            'https://www.google.com/maps/place/Uluda%C4%9Flar+Gayrimenkul+-+Fatih+Sultan+%C5%9Eube/@39.880712,32.65278,17z/data=!4m6!3m5!1s0x14d339fdf761925b%3A0x683defe0241530d7!8m2!3d39.8807124!4d32.6527799!16s%2Fg%2F11ncbr_9pk?hl=en-US&entry=ttu',
        },
      ],
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.987654321!2d32.6527799!3d39.8807124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d339fdf761925b%3A0x683defe0241530d7!2sUluda%C4%9Flar%20Gayrimenkul%20-%20Fatih%20Sultan%20%C5%9Eube!5e0!3m2!1sen!2str!4v1234567891',
    },
  ],
  form: {
    title: ['Bize Ulaşın', 'Contact Us'],
    description: [
      'Bizlere sormak istedikleriniz, aklınıza takılan sorular ya da aradığınız bir mülk varsa lütfen aşağıdaki formu doldurarak bize ulaşın.',
      'If you have any questions, concerns or are looking for a property, please fill out the form below to contact us.',
    ],
    fields: [
      {
        name: 'name',
        label: ['Adınız', 'Your Name'],
        required: true,
      },
      {
        name: 'surname',
        label: ['Soyadınız', 'Your Surname'],
        required: true,
      },
      {
        name: 'email',
        label: ['Email Adresiniz', 'Your Email'],
        required: true,
        type: 'email',
      },
      {
        name: 'phone',
        label: ['Telefonunuz', 'Your Phone'],
        required: false,
        type: 'tel',
      },
      {
        name: 'message',
        label: ['Mesajınız', 'Your Message'],
        required: true,
        type: 'textarea',
      },
    ],
    kvkkText: [
      'İsim, soyisim, mail adresi ve telefon gibi kişisel verilerimizn Uludağlar Gayrimenkul tarafından tutulmasını ve gerekli durumlarda benimle iletişime geçilmesini onaylıyorum',
      'I approve that my personal data such as name, surname, email address and phone number are kept by Uludağlar Real Estate and I can be contacted when necessary',
    ],
    submitText: ['Gönder', 'Send'],
  },
};
