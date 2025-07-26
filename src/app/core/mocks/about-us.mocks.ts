export const aboutUsMocks = {
  pageHeader: {
    title: ['Hakkımızda', 'About Us'],
  },
  hero: {
    heading: ['Uludağlar Gayrimenkul', 'Uludaglar Real Estate'],
    text: [
      `Ankara’da 1984 yılında kurulduğu günden bugüne gayrimenkul sektöründe kesintisiz bir şekilde faaliyet gösteren Uludağlar Gayrimenkul, yıllar içerisinde değişen şartlar ve yeniden şekillenen ekonomik dünya gerçeklerine uygun olarak kurumsal yapısını ve operasyonel kabiliyetini güncel tutmaktadır. Hâlihazırda Ankara genelinde iki noktada hizmet veren şirketimiz, bünyesinde bulundurduğu kendi alanında tecrübeli Mali Müşavir, SPK Lisanslı Gayrimenkul Değerleme Uzmanı, Yerel Yönetimler Uzmanı, Mortgage Uzmanı ve Gayrimenkul Danışmanı personeli ile müşterilerimizin ihtiyaç ve taleplerine uygun çözümler üretmeye devam etmektedir.
      Modern dünyada giderek hızlanan yaşam tarzına uygun olarak, teknolojinin gelişmesiyle birlikte geleneksel emlakçılık anlayışının artık geçerli olmadığının bilincindeyiz. Sürekli olarak çeşitlenen ve daha fazla bütçe gerektiren gayrimenkul ihtiyacının karşılanmasında, çok daha dikkatli ve profesyonel bir süreç yönetiminin takip edilmesi gerektiğini, sektördeki çağdaş yaklaşımların ve güncel araçların etkin olarak kullanılmasının zorunlu olduğunu biliyoruz. Bu nedenle teknolojik gelişmeleri, gayrimenkul sektöründeki ve etkileşim halinde olunan bütün alanlardaki yenilikleri ve dünyadaki gelişmeleri takip ederek sizlere daha kaliteli ve profesyonel hizmet vermek için çalışıyoruz. Uzman ve tecrübeli kadromuzla müşterilerimizin ihtiyaçların karşılanmasına katkıda bulunmakla yetinmeyip, ekonomik gelişmeleri ve finansal parametreleri de takip ederek en uygun ve kârlı gayrimenkul yatırımın yapılabilmesi için rehberlik ediyor, proje oluşturma, kat karşılığı teklifi, hasılat paylaşımı ve arsa paylaşım modeli gibi özgün çözümlemelerle kazanımı artırmak için teknik çalışmalar sunuyoruz. Bölgemizi çok iyi tanıyor, sektördeki bütün oyuncularla şeffaf ve güvene dayalı iletişime önem veriyoruz. Bütün paydaşlarımızı talep ve istekleri doğrultusunda zamanında, tam ve eksiksiz bilgilendirme yaparak, oldukça karmaşık olan alım/satım sonrasındaki işlemlerde de yanında oluyoruz.
      Uludağlar Gayrimenkul olarak, geçmişten getirdiğimiz ve en büyük sermayemiz olan, sektörde güven duyulan uzmanlığımıza biz de güveniyoruz. Güçlü kadromuz ile bizleri bugünlere getiren müşteri dostlarımız ve paydaşlarımızla beraber geleceğe emin adımlarla yürümekte kararlıyız. Yolumuzu aydınlatan değerlerimiz ve bizlere her adımımızda rehberlik eden yenilikçi vizyonumuz ile hedef odaklı aksiyoner kurumsal yapımızla sektörün başat aktörlerinden biri olmak için durmadan çalışmaya devam ediyoruz.`,
      `Uludağlar Real Estate, which has been operating uninterruptedly in the real estate sector since its establishment in Ankara in 1984, keeps its corporate structure and operational capability up-to-date in line with changing conditions and re-shaped economic world realities over the years. Our company, which currently serves at two points throughout Ankara, continues to produce solutions suitable for the needs and demands of our customers with its experienced Financial Advisor, CMB Licensed Real Estate Appraisal Expert, Local Governments Expert, Mortgage Expert and Real Estate Consultant personnel.
      In line with the accelerating lifestyle in the modern world, we are aware that the traditional real estate understanding is no longer valid with the development of technology. We know that a much more careful and professional process management should be followed in meeting the continuously diversifying real estate need that requires more budget, and that contemporary approaches and current tools in the sector must be effectively used. For this reason, we work to provide you with higher quality and professional service by following technological developments, innovations in the real estate sector and all related fields, and global developments. We not only contribute to meeting the needs of our customers with our expert and experienced staff, but also guide them to make the most suitable and profitable real estate investment by following economic developments and financial parameters, and offer technical studies to increase gains with unique solutions such as project creation, land for flat offers, revenue sharing, and land sharing models. We know our region very well and attach importance to transparent and trust-based communication with all players in the sector. We inform all our stakeholders completely and accurately in a timely manner in line with their demands and requests, and we are also with them in the highly complex post-purchase/sale transactions.
      As Uludağlar Real Estate, we rely on our trusted expertise in the sector, which we have inherited from the past and which is our greatest asset. With our strong team, we are determined to walk confidently into the future with our customer friends and stakeholders who have brought us to this day. With our values that illuminate our path and our innovative vision that guides us at every step, we continue to work tirelessly to be one of the dominant actors in the sector with our target-oriented action-oriented corporate structure.`,
    ],
    offices: [
      {
        name: ['Demetevler Merkez Ofis', 'Demetevler Main Office'],
        images: ['/assets/imgs/aboutus/pic1.webp'],
      },
      {
        name: ['Eskişehir Yolu Şube', 'Eskişehir Road Branch'],
        images: ['/assets/imgs/aboutus/pic2.webp', 'assets/imgs/aboutus/pic3.webp'],
      },
    ],
  },
  contactForm: {
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
        type: 'text',
      },
      {
        name: 'surname',
        label: ['Soyadınız', 'Your Surname'],
        required: true,
        type: 'text',
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
  whyUs: {
    heading: ['Neden Uludağlar Gayrimenkul?', 'Why Uludaglar Real Estate?'],
    articles: [
      {
        title: ['30 Yılı Aşkın Tecrübe', 'Over 30 Years of Experience'],
        icon: 'experience',
      },
      {
        title: ['Şeffaf ve Modernize Yapı', 'Transparent and Modernized Structure'],
        icon: 'transparent',
      },
      {
        title: ['Güvene Dayalı Hizmet', 'Trust-Based Service'],
        icon: 'trust',
      },
      {
        title: ['Kısa Sürede Kesin Çözüm', 'Definitive Solution in a Short Time'],
        icon: 'solution',
      },
    ],
  },
  team: {
    heading: ['Ekibimiz', 'Our Team'],
    members: [
      {
        name: ['Ahmet Uludağ', 'Ahmet Uludag'],
        position: ['Şirket Kurucusu', 'Company Founder'],
        info: ['1935 yılında Amasya’da doğdum. İş hayatıma zahirecilik ile başladım, ardından çarşı işletmeciliği ve kuyumculuk ile devam ettim, 1985 yılında ise Uludağlar Gayrimenkul Ltd. şirketini kurarak iş hayatıma devam etmekteyim.', 'I was born in Amasya in 1935. I started my business life with grain sales, then continued with market management and jewelry, and in 1985, I founded Uludağlar Gayrimenkul Ltd. and continue my business life.'],
        image: '/assets/imgs/aboutus/person1.webp',
      },
      {
        name: ['Münir Uludağ', 'Munir Uludag'],
        position: ['Şirket Ortağı', 'Company Partner'],
        info: ['1956 Amasya doğumluyum. Kuyumculuk ve mermer imalatı işlerinde çalıştım. 1990 yılından itibaren gayrimenkul sektöründe hizmet vermekteyim.', 'I was born in Amasya in 1956. I worked in the jewelry business and marble production fields. I have been serving in the real estate sector since 1990.'],
        image: '/assets/imgs/aboutus/person2.webp',
      },
      {
        name: ['Metin Uludağ', 'Metin Uludag'],
        position: ['Şirket Ortağı', 'Company Partner'],
        info: ['1961 yılında Amasya’da doğdum. 1984 ile 1989 yılları arası çarşı yöneticiliği yaptım. 1990 ile 1992 yılları arası ise kuyumculuk işlettim. 1992 yılından bu yana İstanbul yolu üzerinde birçok noktada gayrimenkul sektöründe hizmet vermekteyim.', 'I was born in Amasya in 1961. I worked as a market manager from 1984 to 1989. I also managed a jewelry store from 1990 to 1992. Since 1992, I have been serving in the real estate sector at many locations along the Istanbul highway.'],
        image: '/assets/imgs/aboutus/person3.webp',
      },
      {
        name: ['Mustafa Uludağ', 'Mustafa Uludag'],
        position: ['Şirket Ortağı', 'Company Partner'],
        info: ['1967 yılında Amasya’da doğdum. Dört çocuk babasıyım. Muğla Üniversitesi İşletme bölümü mezunuyum. Yaklaşık 40 yıldır Ankara’da ikamet etmekteyim. SPK Lisanslı Gayrimenkul Değerleme Uzmanıyım. Mali Müşavirim. Yerel yönetimler alanında yüksek lisans sahibiyim.', 'I was born in Amasya in 1967. I am the father of four children. I graduated from Muğla University with a degree in business administration. I have lived in Ankara for approximately 40 years. I am a licensed real estate appraiser with the Capital Markets Board of Turkey. I am also a financial advisor. I have a master\'s degree in local government.'],
        image: '/assets/imgs/aboutus/person4.webp',
      },
      {
        name: ['Fatih Uludağ', 'Fatih Uludag'],
        position: ['Gayrimenkul Danışmanı (Arsa Uzmanı)', 'Real Estate Consultant (Land Expert)'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person5.webp',
      },
      {
        name: ['Balcar Uludağ', 'Balcar Uludag'],
        position: ['Gayrimenkul Danışmanı (Arsa Uzmanı)', 'Real Estate Consultant (Land Expert)'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person6.webp',
      },
      {
        name: ['Cavit Seyidoğlu', 'Cavit Seyidoğlu'],
        position: ['Gayrimenkul Danışmanı (Konut Uzmanı)', 'Real Estate Consultant (Housing Expert)'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person7.webp',
      },
      {
        name: ['İbrahim Bilinmez', 'Ibrahim Bilinmez'],
        position: ['Gayrimenkul Danışmanı (Konut Uzmanı)', 'Real Estate Consultant (Housing Expert)'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person8.webp',
      },
      {
        name: ['Kemal Yeşilbaş', 'Kemal Yeşilbaş'],
        position: ['Mutfak Personeli', 'Kitchen Staff'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person9.webp',
      },
      {
        name: ['Abdulkerim Seferoğlu', 'Abdulkerim Seferoğlu'],
        position: ['Resmi İşlemler Sorumlusu', 'Official Transactions Officer'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person10.webp',
      },
      {
        name: ['Harun Aktaş', 'Harun Aktaş'],
        position: ['BT Uzmanı', 'IT Specialist'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person11.webp',
      },
      {
        name: ['Selahattin Korkut', 'Selahattin Korkut'],
        position: ['Ofis Personeli', 'Office Staff'],
        info: ['', ''],
        image: '/assets/imgs/aboutus/person12.webp',
      },
    ],
  },
  joinTeamForm: {
    heading: ['Ekibimize Katılmak İster Misiniz?', 'Would You Like to Join Our Team?'],
    available: true, // Set to false to hide the form
    unavailableMessage: ['Bu form geçici olarak kullanılamamaktadır.', 'This form is temporarily unavailable.'],
    fields: [
      {
        name: 'applicantName',
        label: ['Adınız', 'Your Name'],
        required: true,
        type: 'text',
      },
      {
        name: 'applicantSurname',
        label: ['Soyadınız', 'Your Surname'],
        required: true,
        type: 'text',
      },
      {
        name: 'applicantEmail',
        label: ['Email Adresiniz', 'Your Email'],
        required: true,
        type: 'email',
      },
      {
        name: 'applicantPhone',
        label: ['Telefonunuz', 'Your Phone'],
        required: false,
        type: 'tel',
      },
      {
        name: 'applicantMessage',
        label: ['Mesajınız (Varsa Eklemek İstedikleriniz)', 'Your Message (Any additional notes)'],
        required: false,
        type: 'textarea',
      },
    ],
    cvUploadLabel: ['CV Yükle', 'Upload CV'],
    submitText: ['Başvuruyu Gönder', 'Submit Application'],
  },
  blogs: {
    heading: ['Blog Yazıları / Faydalı Bilgiler', 'Blog Posts / Useful Information']
  },
};