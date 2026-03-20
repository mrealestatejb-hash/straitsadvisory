/**
 * Straits Advisory — Smart Site Translation
 * Detects visitor's device language and translates UI text.
 * Supports: English (en), Simplified Chinese (zh), Traditional Chinese (tw), Malay (ms), Japanese (ja), Korean (ko), Thai (th)
 */
(function(){
  'use strict';

  var translations = {
    zh: {
      // Nav
      'Buy': '购买',
      'Sell': '出售',
      'Rent': '租赁',
      'Services': '服务',
      'About': '关于我们',
      'WhatsApp Us': 'WhatsApp联系',
      // Landing hero
      'Bridging Markets.': '连接市场。<br><span class="gold" data-i18n="Building Futures.">构建未来。</span>',
      'Building Futures.': '构建未来。',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': '您信赖的马来西亚房地产投资平台。',
      'Get Started on WhatsApp': '通过WhatsApp开始',
      // Landing about
      'Straits Advisory': 'Straits Advisory',
      'Technology Meets Expertise': '科技与专业的融合',
      // Landing map
      'Explore Our Listings': '浏览我们的房源',
      'Premium properties across Malaysia': '马来西亚优质房产',
      'properties across Malaysia': '马来西亚房产',
      'View All Properties': '查看所有房产',
      // Landing CTA
      'Start Your Journey': '开始您的旅程',
      'Connect with our specialists today': '今天就联系我们的专家',
      'Chat on WhatsApp': '在WhatsApp上聊天',
      'Browse Properties': '浏览房产',
      // Buy page
      'Find Your': '寻找您的',
      'Malaysia Property': '马来西亚房产',
      'Handpicked developments across Malaysia': '精选马来西亚优质项目',
      'Properties': '房产',
      'Cities': '城市',
      'Freehold & Leasehold': '永久产权和租赁产权',
      // Filters
      'All Cities': '所有城市',
      'Johor Bahru': '新山',
      'Kuala Lumpur': '吉隆坡',
      'Penang': '槟城',
      'All Areas': '所有区域',
      'Any Price': '任意价格',
      'All Status': '所有状态',
      'All Tenure': '所有产权',
      'Any Distance': '任意距离',
      'New Launch': '新盘',
      'Completed': '已竣工',
      'Freehold': '永久产权',
      'Leasehold': '租赁产权',
      'Search by name...': '按名称搜索...',
      // Property detail
      'About this property': '关于此房产',
      'Book a Viewing': '预约看房',
      'Price on Request': '价格面议',
      'Show more': '展开更多',
      'Show less': '收起',
      // What's Nearby
      "What's Nearby": '周边设施',
      'Transit': '交通',
      'Bus': '巴士',
      'Schools': '学校',
      'Clinics': '诊所',
      'Shopping': '购物',
      // Footer
      'All rights reserved': '版权所有',
      // New translations
      'about_description': '作为马来西亚最先进的房地产咨询公司，我们将数十年的经验与尖端AI、实时分析和专有技术相结合。我们以透明和精准服务客户，没有压力销售，只有量身定制的数据驱动指导。',
      'click a pin for details': '点击标记查看详情',
      'Browse All 90+ Properties': '浏览全部90+房产',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': '探索我们精选的新山、吉隆坡和槟城优质项目，支持筛选、搜索和详细信息。',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": '新加坡通往新山房产投资的信赖平台。从搜索到交割的专业指导。',
      'View Details →': '查看详情 →',
      'View Listings →': '查看房源 →',
      'Call Us': '致电我们',
      'Email': '电子邮件',
      'WhatsApp': 'WhatsApp',
      'From': '从',
      // Sell page
      'sell_hero_title': '出售您的 <span>马来西亚房产</span>',
      'sell_hero_subtitle': '获取免费市场估价。无义务，无压力。',
      'sell_vp1_title': 'AI驱动估价',
      'sell_vp1_desc': '基于近期交易和市场数据分析的精准定价。',
      'sell_vp2_title': '专业营销',
      'sell_vp2_desc': '照片、虚拟导览，以及在所有主要房产门户网站上架。',
      'sell_vp3_title': '专属经纪人',
      'sell_vp3_desc': '从挂牌到成交的全程个人服务。一个联系人。',
      'sell_form_title': '申请免费估价',
      'sell_form_subtitle': '填写您的房产详情，我们将在24小时内回复。',
      'sell_review_title': '审核您的详情',
      'sell_submit_btn': '提交估价申请',
      'sell_thankyou_title': '谢谢！',
      'sell_thankyou_desc': '您的估价申请已提交。我们的团队将在24小时内与您联系并提供市场分析。',
      'sell_prefer_talk': '想直接沟通？通过WhatsApp联系我们。',
      // Rent page
      'rent_hero_title': '租赁 <span>轻松搞定</span>',
      'rent_hero_subtitle': '无论您是房东还是租客，我们都能为您服务。',
      'rent_iam': '我是...',
      'rent_choose': '选择适合您情况的选项。',
      'rent_owner_title': '房产业主',
      'rent_owner_subtitle': '我有房产要出租',
      'rent_owner_li1': '寻找优质租客',
      'rent_owner_li2': '租客筛选和验证',
      'rent_owner_li3': '租赁合同准备',
      'rent_owner_li4': '可选：全面物业管理',
      'rent_list_property': '挂牌我的房产 →',
      'rent_tenant_title': '租客',
      'rent_tenant_subtitle': '我在寻找租房',
      'rent_tenant_li1': '独家房源',
      'rent_tenant_li2': '仅验证房产',
      'rent_tenant_li3': '租客零中介费',
      'rent_tenant_li4': '灵活租期选择',
      'rent_find_rental': '寻找租房 →',
      'rent_whatneed': '您需要什么？',
      'rent_choose_service': '选择适合您的服务级别。',
      'rent_submit_rental': '提交租赁申请',
      'rent_ll_thankyou_title': '申请已提交！',
      'rent_ll_thankyou_desc': '我们的租赁团队将审核您的房产详情，并在24小时内与您联系。',
      'rent_tenant_flow_title': '告诉我们您在找什么',
      'rent_tenant_flow_subtitle': '我们将在24小时内为您匹配合适的房产。',
      'rent_submit_request': '提交申请',
      'rent_tenant_thankyou_title': '谢谢！',
      'rent_tenant_thankyou_desc': '我们将在24小时内为您匹配合适的房产。我们的团队将通过您首选的联系方式与您联系。',
      // Services page
      'svc_badge': '✦ 全方位房产合作伙伴',
      'svc_hero_title': 'A到Z<br><span class="gold">房产服务</span>',
      'svc_hero_subtitle': '从第一次搜索到租金收入——我们处理一切，让您无忧。',
      'svc_everything_title': '您需要的一切',
      'svc_everything_subtitle': '贯穿整个投资生命周期的全面房产服务。',
      'svc_search_title': '房产搜索与收购',
      'svc_selling_title': '出售您的房产',
      'svc_rental_title': '租赁服务',
      'svc_mgmt_title': '物业管理',
      'svc_reno_title': '装修与家具',
      'svc_legal_title': '法律与合规',
      'svc_finance_title': '融资与银行',
      'svc_visa_title': '签证与搬迁',
      'svc_post_title': '购后支持',
      'svc_process_title': '如何运作',
      'svc_process_subtitle': '从咨询到拿钥匙的简单5步旅程。',
      'svc_pricing_title': '透明定价',
      'svc_pricing_subtitle': '无隐藏费用。我们与您共赢。',
      'svc_cta_title': '开始您的马来西亚<br>房产之旅',
      'svc_cta_subtitle': '无论买卖还是租赁——与我们的团队免费咨询，无任何义务。',
      'svc_book_consultation': '预约免费咨询',
      // About page
      'about_badge': '✦ 为什么选择我们',
      'about_hero_title': '科技与<br><span class="gold">专业</span>的融合',
      'about_hero_subtitle': '马来西亚最先进的房产咨询公司——AI驱动、数据驱动、透明服务。',
      'about_stat1_value': 'AI+驱动',
      'about_stat1_label': '分析',
      'about_stat2_label': '客户门户访问',
      'about_stat3_label': '价格透明',
      'about_stat4_label': '覆盖区域',
      'about_features_title': '我们的优势',
      'about_features_subtitle': '每个工具和服务都旨在为您在马来西亚房产投资中提供优势。',
      'about_demo_title': '实际效果',
      'about_demo_subtitle': '探索我们的工具——与客户每天使用的相同工具。',
      'about_cta_title': '准备好更聪明地投资了吗？',
      'about_cta_subtitle': '与我们的团队交谈，了解技术如何为您在马来西亚房产中提供优势。',
      'about_cta_btn': '在WhatsApp上联系我们',
    },
    tw: {
      // Nav
      'Buy': '購買',
      'Sell': '出售',
      'Rent': '租賃',
      'Services': '服務',
      'About': '關於我們',
      'WhatsApp Us': 'WhatsApp聯繫',
      // Landing hero
      'Bridging Markets.': '連接市場。<br><span class="gold" data-i18n="Building Futures.">構建未來。</span>',
      'Building Futures.': '構建未來。',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': '您信賴的馬來西亞房地產投資平台。',
      'Get Started on WhatsApp': '透過WhatsApp開始',
      // Landing about
      'Straits Advisory': 'Straits Advisory',
      'Technology Meets Expertise': '科技與專業的融合',
      // Landing map
      'Explore Our Listings': '瀏覽我們的房源',
      'Premium properties across Malaysia': '馬來西亞優質房產',
      'properties across Malaysia': '馬來西亞房產',
      'View All Properties': '查看所有房產',
      // Landing CTA
      'Start Your Journey': '開始您的旅程',
      'Connect with our specialists today': '今天就聯繫我們的專家',
      'Chat on WhatsApp': '在WhatsApp上聊天',
      'Browse Properties': '瀏覽房產',
      // Buy page
      'Find Your': '尋找您的',
      'Malaysia Property': '馬來西亞房產',
      'Handpicked developments across Malaysia': '精選馬來西亞優質項目',
      'Properties': '房產',
      'Cities': '城市',
      'Freehold & Leasehold': '永久產權和租賃產權',
      // Filters
      'All Cities': '所有城市',
      'Johor Bahru': '新山',
      'Kuala Lumpur': '吉隆坡',
      'Penang': '檳城',
      'All Areas': '所有區域',
      'Any Price': '任意價格',
      'All Status': '所有狀態',
      'All Tenure': '所有產權',
      'Any Distance': '任意距離',
      'New Launch': '新盤',
      'Completed': '已竣工',
      'Freehold': '永久產權',
      'Leasehold': '租賃產權',
      'Search by name...': '按名稱搜索...',
      // Property detail
      'About this property': '關於此房產',
      'Book a Viewing': '預約看房',
      'Price on Request': '價格面議',
      'Show more': '展開更多',
      'Show less': '收起',
      // What's Nearby
      "What's Nearby": '周邊設施',
      'Transit': '交通',
      'Bus': '巴士',
      'Schools': '學校',
      'Clinics': '診所',
      'Shopping': '購物',
      // Footer
      'All rights reserved': '版權所有',
      // New translations
      'about_description': '作為馬來西亞最先進的房地產諮詢公司，我們將數十年的經驗與尖端AI、即時分析和專有技術相結合。我們以透明和精準服務客戶，沒有壓力銷售，只有量身定製的數據驅動指導。',
      'click a pin for details': '點擊標記查看詳情',
      'Browse All 90+ Properties': '瀏覽全部90+房產',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': '探索我們精選的新山、吉隆坡和檳城優質項目，支持篩選、搜索和詳細信息。',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": '新加坡通往新山房產投資的信賴平台。從搜索到交割的專業指導。',
      'View Details →': '查看詳情 →',
      'View Listings →': '查看房源 →',
      'Call Us': '致電我們',
      'Email': '電子郵件',
      'WhatsApp': 'WhatsApp',
      'From': '從',
      // Sell page
      'sell_hero_title': '出售您的 <span>馬來西亞房產</span>',
      'sell_hero_subtitle': '獲取免費市場估價。無義務，無壓力。',
      'sell_vp1_title': 'AI驅動估價',
      'sell_vp1_desc': '基於近期交易和市場數據分析的精準定價。',
      'sell_vp2_title': '專業營銷',
      'sell_vp2_desc': '照片、虛擬導覽，以及在所有主要房產門戶網站上架。',
      'sell_vp3_title': '專屬經紀人',
      'sell_vp3_desc': '從掛牌到成交的全程個人服務。一個聯繫人。',
      'sell_form_title': '申請免費估價',
      'sell_form_subtitle': '填寫您的房產詳情，我們將在24小時內回覆。',
      'sell_review_title': '審核您的詳情',
      'sell_submit_btn': '提交估價申請',
      'sell_thankyou_title': '謝謝！',
      'sell_thankyou_desc': '您的估價申請已提交。我們的團隊將在24小時內與您聯繫並提供市場分析。',
      'sell_prefer_talk': '想直接溝通？通過WhatsApp聯繫我們。',
      // Rent page
      'rent_hero_title': '租賃 <span>輕鬆搞定</span>',
      'rent_hero_subtitle': '無論您是房東還是租客，我們都能為您服務。',
      'rent_iam': '我是...',
      'rent_choose': '選擇適合您情況的選項。',
      'rent_owner_title': '房產業主',
      'rent_owner_subtitle': '我有房產要出租',
      'rent_owner_li1': '尋找優質租客',
      'rent_owner_li2': '租客篩選和驗證',
      'rent_owner_li3': '租賃合同準備',
      'rent_owner_li4': '可選：全面物業管理',
      'rent_list_property': '刊登我的房產 →',
      'rent_tenant_title': '租客',
      'rent_tenant_subtitle': '我在尋找租房',
      'rent_tenant_li1': '獨家房源',
      'rent_tenant_li2': '僅驗證房產',
      'rent_tenant_li3': '租客零中介費',
      'rent_tenant_li4': '靈活租期選擇',
      'rent_find_rental': '尋找租房 →',
      'rent_whatneed': '您需要什麼？',
      'rent_choose_service': '選擇適合您的服務級別。',
      'rent_submit_rental': '提交租賃申請',
      'rent_ll_thankyou_title': '申請已提交！',
      'rent_ll_thankyou_desc': '我們的租賃團隊將審核您的房產詳情，並在24小時內與您聯繫。',
      'rent_tenant_flow_title': '告訴我們您在找什麼',
      'rent_tenant_flow_subtitle': '我們將在24小時內為您匹配合適的房產。',
      'rent_submit_request': '提交申請',
      'rent_tenant_thankyou_title': '謝謝！',
      'rent_tenant_thankyou_desc': '我們將在24小時內為您匹配合適的房產。我們的團隊將通過您首選的聯繫方式與您聯繫。',
      // Services page
      'svc_badge': '✦ 全方位房產合作夥伴',
      'svc_hero_title': 'A到Z<br><span class="gold">房產服務</span>',
      'svc_hero_subtitle': '從第一次搜索到租金收入——我們處理一切，讓您無憂。',
      'svc_everything_title': '您需要的一切',
      'svc_everything_subtitle': '貫穿整個投資生命週期的全面房產服務。',
      'svc_search_title': '房產搜索與收購',
      'svc_selling_title': '出售您的房產',
      'svc_rental_title': '租賃服務',
      'svc_mgmt_title': '物業管理',
      'svc_reno_title': '裝修與傢俱',
      'svc_legal_title': '法律與合規',
      'svc_finance_title': '融資與銀行',
      'svc_visa_title': '簽證與搬遷',
      'svc_post_title': '購後支持',
      'svc_process_title': '如何運作',
      'svc_process_subtitle': '從諮詢到拿鑰匙的簡單5步旅程。',
      'svc_pricing_title': '透明定價',
      'svc_pricing_subtitle': '無隱藏費用。我們與您共贏。',
      'svc_cta_title': '開始您的馬來西亞<br>房產之旅',
      'svc_cta_subtitle': '無論買賣還是租賃——與我們的團隊免費諮詢，無任何義務。',
      'svc_book_consultation': '預約免費諮詢',
      // About page
      'about_badge': '✦ 為什麼選擇我們',
      'about_hero_title': '科技與<br><span class="gold">專業</span>的融合',
      'about_hero_subtitle': '馬來西亞最先進的房產諮詢公司——AI驅動、數據驅動、透明服務。',
      'about_stat1_value': 'AI+驅動',
      'about_stat1_label': '分析',
      'about_stat2_label': '客戶門戶訪問',
      'about_stat3_label': '價格透明',
      'about_stat4_label': '覆蓋區域',
      'about_features_title': '我們的優勢',
      'about_features_subtitle': '每個工具和服務都旨在為您在馬來西亞房產投資中提供優勢。',
      'about_demo_title': '實際效果',
      'about_demo_subtitle': '探索我們的工具——與客戶每天使用的相同工具。',
      'about_cta_title': '準備好更聰明地投資了嗎？',
      'about_cta_subtitle': '與我們的團隊交談，了解技術如何為您在馬來西亞房產中提供優勢。',
      'about_cta_btn': '在WhatsApp上聯繫我們',
    },
    ms: {
      'Buy': 'Beli',
      'Sell': 'Jual',
      'Rent': 'Sewa',
      'Services': 'Perkhidmatan',
      'About': 'Tentang',
      'WhatsApp Us': 'WhatsApp Kami',
      'Bridging Markets.': 'Menghubungkan Pasaran.<br><span class="gold" data-i18n="Building Futures.">Membina Masa Depan.</span>',
      'Building Futures.': 'Membina Masa Depan.',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': 'Pintu gerbang yang dipercayai untuk pelaburan hartanah di Malaysia.',
      'Get Started on WhatsApp': 'Mula di WhatsApp',
      'Technology Meets Expertise': 'Teknologi Bertemu Kepakaran',
      'Explore Our Listings': 'Terokai Senarai Kami',
      'Premium properties across Malaysia': 'Hartanah premium di seluruh Malaysia',
      'properties across Malaysia': 'hartanah di seluruh Malaysia',
      'View All Properties': 'Lihat Semua Hartanah',
      'Start Your Journey': 'Mulakan Perjalanan Anda',
      'Connect with our specialists today': 'Hubungi pakar kami hari ini',
      'Chat on WhatsApp': 'Sembang di WhatsApp',
      'Browse Properties': 'Layari Hartanah',
      'Find Your': 'Cari',
      'Malaysia Property': 'Hartanah Malaysia',
      'Handpicked developments across Malaysia': 'Pembangunan pilihan di seluruh Malaysia',
      'Properties': 'Hartanah',
      'Cities': 'Bandar',
      'Freehold & Leasehold': 'Pegangan Bebas & Pajakan',
      'All Cities': 'Semua Bandar',
      'Johor Bahru': 'Johor Bahru',
      'Kuala Lumpur': 'Kuala Lumpur',
      'Penang': 'Pulau Pinang',
      'All Areas': 'Semua Kawasan',
      'Any Price': 'Sebarang Harga',
      'All Status': 'Semua Status',
      'All Tenure': 'Semua Pegangan',
      'Any Distance': 'Sebarang Jarak',
      'New Launch': 'Pelancaran Baru',
      'Completed': 'Siap',
      'Freehold': 'Pegangan Bebas',
      'Leasehold': 'Pajakan',
      'Search by name...': 'Cari mengikut nama...',
      'About this property': 'Tentang hartanah ini',
      'Book a Viewing': 'Tempah Lawatan',
      'Price on Request': 'Harga Atas Permintaan',
      'Show more': 'Tunjuk lagi',
      'Show less': 'Tunjuk kurang',
      "What's Nearby": 'Apa yang Berdekatan',
      'Transit': 'Transit',
      'Bus': 'Bas',
      'Schools': 'Sekolah',
      'Clinics': 'Klinik',
      'Shopping': 'Membeli-belah',
      'All rights reserved': 'Hak cipta terpelihara',
      // New translations
      'about_description': 'Sebagai firma perunding hartanah paling maju teknologi di Malaysia, kami menggabungkan pengalaman berdekad dengan AI canggih, analitik masa nyata dan teknologi proprietari. Kami berkhidmat dengan ketelusan dan ketepatan, tanpa taktik tekanan, hanya panduan berasaskan data yang disesuaikan untuk matlamat anda.',
      'click a pin for details': 'klik pin untuk butiran',
      'Browse All 90+ Properties': 'Layari Semua 90+ Hartanah',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': 'Terokai pembangunan pilihan kami di Johor Bahru, Kuala Lumpur, dan Pulau Pinang dengan penapis, carian, dan senarai terperinci.',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": 'Pintu gerbang Singapura yang dipercayai untuk pelaburan hartanah Johor Bahru. Panduan pakar dari carian hingga penyelesaian.',
      'View Details →': 'Lihat Butiran →',
      'View Listings →': 'Lihat Senarai →',
      'Call Us': 'Hubungi Kami',
      'Email': 'E-mel',
      'WhatsApp': 'WhatsApp',
      'From': 'Dari',
      // Sell page
      'sell_hero_title': 'Jual Hartanah <span>Malaysia</span> Anda',
      'sell_hero_subtitle': 'Dapatkan penilaian pasaran percuma. Tiada kewajipan, tiada tekanan.',
      'sell_vp1_title': 'Penilaian Berkuasa AI',
      'sell_vp1_desc': 'Penetapan harga tepat berdasarkan transaksi terkini dan analisis data pasaran.',
      'sell_vp2_title': 'Pemasaran Profesional',
      'sell_vp2_desc': 'Foto, lawatan maya dan penyenaraian di semua portal hartanah utama.',
      'sell_vp3_title': 'Ejen Dedikasi',
      'sell_vp3_desc': 'Perkhidmatan peribadi dari penyenaraian hingga selesai. Satu titik hubungan.',
      'sell_form_title': 'Mohon Penilaian Percuma',
      'sell_form_subtitle': 'Isi butiran hartanah anda dan kami akan menghubungi dalam 24 jam.',
      'sell_review_title': 'Semak Butiran Anda',
      'sell_submit_btn': 'Hantar Permohonan Penilaian',
      'sell_thankyou_title': 'Terima Kasih!',
      'sell_thankyou_desc': 'Permohonan penilaian anda telah dihantar. Pasukan kami akan menghubungi anda dalam 24 jam dengan analisis pasaran.',
      'sell_prefer_talk': 'Lebih suka berbual? WhatsApp kami terus.',
      // Rent page
      'rent_hero_title': 'Sewa <span>Dipermudahkan</span>',
      'rent_hero_subtitle': 'Sama ada anda tuan rumah atau penyewa, kami sedia membantu.',
      'rent_iam': 'Saya adalah...',
      'rent_choose': 'Pilih pilihan yang sesuai dengan situasi anda.',
      'rent_owner_title': 'Pemilik Hartanah',
      'rent_owner_subtitle': 'Saya ada hartanah untuk disewakan',
      'rent_owner_li1': 'Cari penyewa berkualiti',
      'rent_owner_li2': 'Saringan & pengesahan penyewa',
      'rent_owner_li3': 'Penyediaan perjanjian sewa',
      'rent_owner_li4': 'Pilihan: Pengurusan hartanah penuh',
      'rent_list_property': 'Senaraikan Hartanah Saya →',
      'rent_tenant_title': 'Penyewa',
      'rent_tenant_subtitle': 'Saya mencari tempat untuk disewa',
      'rent_tenant_li1': 'Akses kepada penyenaraian eksklusif',
      'rent_tenant_li2': 'Hartanah yang disahkan sahaja',
      'rent_tenant_li3': 'Tiada yuran ejen untuk penyewa',
      'rent_tenant_li4': 'Pilihan sewa yang fleksibel',
      'rent_find_rental': 'Cari Sewaan →',
      'rent_whatneed': 'Apa yang anda perlukan?',
      'rent_choose_service': 'Pilih tahap perkhidmatan yang sesuai.',
      'rent_submit_rental': 'Hantar Permohonan Sewa',
      'rent_ll_thankyou_title': 'Permohonan Dihantar!',
      'rent_ll_thankyou_desc': 'Pasukan sewaan kami akan menyemak butiran hartanah anda dan menghubungi dalam 24 jam.',
      'rent_tenant_flow_title': 'Beritahu kami apa yang anda cari',
      'rent_tenant_flow_subtitle': 'Kami akan memadankan anda dengan hartanah yang sesuai dalam 24 jam.',
      'rent_submit_request': 'Hantar Permohonan',
      'rent_tenant_thankyou_title': 'Terima Kasih!',
      'rent_tenant_thankyou_desc': 'Kami akan memadankan anda dengan hartanah yang sesuai dalam 24 jam. Pasukan kami akan menghubungi melalui kaedah pilihan anda.',
      // Services page
      'svc_badge': '✦ Rakan Kongsi Hartanah Penuh',
      'svc_hero_title': 'A hingga Z<br><span class="gold">Perkhidmatan Hartanah</span>',
      'svc_hero_subtitle': 'Dari carian pertama hingga pendapatan sewa — kami uruskan semuanya untuk anda.',
      'svc_everything_title': 'Semua Yang Anda Perlukan',
      'svc_everything_subtitle': 'Perkhidmatan hartanah komprehensif merangkumi keseluruhan kitaran pelaburan.',
      'svc_search_title': 'Carian & Pemerolehan Hartanah',
      'svc_selling_title': 'Menjual Hartanah Anda',
      'svc_rental_title': 'Sewaan & Pajakan',
      'svc_mgmt_title': 'Pengurusan Hartanah',
      'svc_reno_title': 'Renovasi & Perabot',
      'svc_legal_title': 'Undang-undang & Pematuhan',
      'svc_finance_title': 'Pembiayaan & Perbankan',
      'svc_visa_title': 'Visa & Penempatan Semula',
      'svc_post_title': 'Sokongan Selepas Pembelian',
      'svc_process_title': 'Cara Ia Berfungsi',
      'svc_process_subtitle': 'Perjalanan 5 langkah mudah dari pertanyaan hingga kunci di tangan.',
      'svc_pricing_title': 'Harga Telus',
      'svc_pricing_subtitle': 'Tiada caj tersembunyi. Kami untung apabila anda berjaya.',
      'svc_cta_title': 'Mulakan Perjalanan Hartanah<br>Malaysia Anda',
      'svc_cta_subtitle': 'Sama ada membeli, menjual, atau menyewa — berbual dengan pasukan kami untuk perundingan percuma.',
      'svc_book_consultation': 'Tempah Perundingan Percuma',
      // About page
      'about_badge': '✦ Mengapa Bekerja dengan Kami',
      'about_hero_title': 'Teknologi Bertemu<br><span class="gold">Kepakaran</span>',
      'about_hero_subtitle': 'Perundingan hartanah paling maju di Malaysia — dikuasai AI, didorong data, disampaikan dengan ketelusan.',
      'about_stat1_value': 'AI+ Berkuasa',
      'about_stat1_label': 'Analitik',
      'about_stat2_label': 'Akses Portal Pelanggan',
      'about_stat3_label': 'Ketelusan Harga',
      'about_stat4_label': 'Wilayah Diliputi',
      'about_features_title': 'Apa yang Membezakan Kami',
      'about_features_subtitle': 'Setiap alat dan perkhidmatan direka untuk memberi anda kelebihan dalam pelaburan hartanah Malaysia.',
      'about_demo_title': 'Lihat Ia Beraksi',
      'about_demo_subtitle': 'Terokai alat kami — yang sama digunakan pelanggan setiap hari.',
      'about_cta_title': 'Bersedia untuk Melabur Lebih Bijak?',
      'about_cta_subtitle': 'Berbual dengan pasukan kami dan ketahui bagaimana teknologi memberi anda kelebihan dalam hartanah Malaysia.',
      'about_cta_btn': 'Sembang dengan Kami di WhatsApp',
    },
    ja: {
      'Buy': '購入',
      'Sell': '売却',
      'Rent': '賃貸',
      'Services': 'サービス',
      'About': '会社概要',
      'WhatsApp Us': 'WhatsAppで連絡',
      'Bridging Markets.': '市場を繋ぐ。<br><span class="gold" data-i18n="Building Futures.">未来を築く。</span>',
      'Building Futures.': '未来を築く。',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': 'マレーシア不動産投資への信頼のゲートウェイ。',
      'Get Started on WhatsApp': 'WhatsAppで始める',
      'Technology Meets Expertise': 'テクノロジーと専門知識の融合',
      'Explore Our Listings': '物件一覧を見る',
      'Premium properties across Malaysia': 'マレーシア全域のプレミアム物件',
      'properties across Malaysia': 'マレーシアの物件',
      'View All Properties': '全物件を見る',
      'Start Your Journey': '始めましょう',
      'Connect with our specialists today': '今すぐ専門家に相談',
      'Chat on WhatsApp': 'WhatsAppでチャット',
      'Browse Properties': '物件を探す',
      'Find Your': 'あなたの',
      'Malaysia Property': 'マレーシア物件',
      'Handpicked developments across Malaysia': 'マレーシア全域の厳選物件',
      'Properties': '物件',
      'Cities': '都市',
      'Freehold & Leasehold': '所有権 & リース',
      'All Cities': '全都市',
      'All Areas': '全エリア',
      'Any Price': '全価格帯',
      'All Status': '全ステータス',
      'All Tenure': '全所有形態',
      'Any Distance': '全距離',
      'New Launch': '新築',
      'Completed': '完成済み',
      'Freehold': '所有権',
      'Leasehold': 'リース',
      'Search by name...': '名前で検索...',
      'About this property': 'この物件について',
      'Book a Viewing': '見学予約',
      'Price on Request': '価格はお問い合わせ',
      'Show more': 'もっと見る',
      'Show less': '閉じる',
      "What's Nearby": '周辺施設',
      'Transit': '交通',
      'Bus': 'バス',
      'Schools': '学校',
      'Clinics': 'クリニック',
      'Shopping': 'ショッピング',
      'All rights reserved': '全著作権所有',
      // New translations
      'about_description': 'マレーシアで最も技術的に進んだ不動産コンサルタントとして、数十年の経験を最先端AI、リアルタイム分析、独自技術で強化しています。透明性と正確さでお客様にサービスを提供し、プレッシャー戦術は一切なく、お客様の目標に合わせたデータ駆動型のガイダンスのみを提供します。',
      'click a pin for details': 'ピンをクリックして詳細を表示',
      'Browse All 90+ Properties': '全90+物件を見る',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': 'ジョホールバル、クアラルンプール、ペナンの厳選物件をフィルター、検索、詳細リストで探索。',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": 'シンガポールからジョホールバル不動産投資への信頼のゲートウェイ。検索から決済まで専門家がガイド。',
      'View Details →': '詳細を見る →',
      'View Listings →': '物件一覧 →',
      'Call Us': 'お電話',
      'Email': 'メール',
      'WhatsApp': 'WhatsApp',
      'From': 'から',
      // Sell page
      'sell_hero_title': '<span>マレーシア物件</span>を売却',
      'sell_hero_subtitle': '無料の市場査定を取得。義務なし、プレッシャーなし。',
      'sell_vp1_title': 'AI駆動査定',
      'sell_vp1_desc': '最新の取引と市場データ分析に基づく正確な価格設定。',
      'sell_vp2_title': 'プロフェッショナルマーケティング',
      'sell_vp2_desc': '写真、バーチャルツアー、主要不動産ポータルへの掲載。',
      'sell_vp3_title': '専任エージェント',
      'sell_vp3_desc': '掲載から成約までの個人サービス。一つの窓口。',
      'sell_form_title': '無料査定を申請',
      'sell_form_subtitle': '物件の詳細を入力していただければ、24時間以内にご連絡します。',
      'sell_review_title': '詳細を確認',
      'sell_submit_btn': '査定申請を送信',
      'sell_thankyou_title': 'ありがとうございます！',
      'sell_thankyou_desc': '査定申請が送信されました。24時間以内に市場分析をお届けします。',
      'sell_prefer_talk': '直接お話したいですか？WhatsAppでご連絡ください。',
      // Rent page
      'rent_hero_title': '賃貸を <span>シンプルに</span>',
      'rent_hero_subtitle': 'オーナーでもテナントでも、お任せください。',
      'rent_iam': '私は...',
      'rent_choose': 'あなたの状況に合うオプションを選択してください。',
      'rent_owner_title': '物件オーナー',
      'rent_owner_subtitle': '賃貸に出したい物件があります',
      'rent_owner_li1': '良質なテナントを探す',
      'rent_owner_li2': 'テナント審査・確認',
      'rent_owner_li3': '賃貸契約書の作成',
      'rent_owner_li4': 'オプション：フル物件管理',
      'rent_list_property': '物件を掲載する →',
      'rent_tenant_title': 'テナント',
      'rent_tenant_subtitle': '賃貸物件を探しています',
      'rent_tenant_li1': '独占物件へのアクセス',
      'rent_tenant_li2': '確認済み物件のみ',
      'rent_tenant_li3': 'テナントの仲介手数料なし',
      'rent_tenant_li4': '柔軟なリース条件',
      'rent_find_rental': '賃貸を探す →',
      'rent_whatneed': '何が必要ですか？',
      'rent_choose_service': 'お客様に合ったサービスレベルを選択してください。',
      'rent_submit_rental': '賃貸申請を送信',
      'rent_ll_thankyou_title': '申請送信済み！',
      'rent_ll_thankyou_desc': '賃貸チームがお客様の物件詳細を確認し、24時間以内にご連絡します。',
      'rent_tenant_flow_title': 'お探しの条件を教えてください',
      'rent_tenant_flow_subtitle': '24時間以内に適切な物件をご紹介します。',
      'rent_submit_request': '申請を送信',
      'rent_tenant_thankyou_title': 'ありがとうございます！',
      'rent_tenant_thankyou_desc': '24時間以内に適切な物件をマッチングします。ご希望の連絡方法でお知らせします。',
      // Services page
      'svc_badge': '✦ フルサービス不動産パートナー',
      'svc_hero_title': 'A to Z<br><span class="gold">不動産サービス</span>',
      'svc_hero_subtitle': '物件探しから家賃収入まで——すべてお任せください。',
      'svc_everything_title': '必要なすべて',
      'svc_everything_subtitle': '投資ライフサイクル全体をカバーする総合不動産サービス。',
      'svc_search_title': '物件検索・取得',
      'svc_selling_title': '物件売却',
      'svc_rental_title': '賃貸・リース',
      'svc_mgmt_title': '物件管理',
      'svc_reno_title': 'リノベーション・家具',
      'svc_legal_title': '法務・コンプライアンス',
      'svc_finance_title': '融資・銀行',
      'svc_visa_title': 'ビザ・移転',
      'svc_post_title': '購入後サポート',
      'svc_process_title': 'ご利用の流れ',
      'svc_process_subtitle': 'お問い合わせから鍵のお渡しまでの簡単5ステップ。',
      'svc_pricing_title': '透明な料金体系',
      'svc_pricing_subtitle': '隠れた費用なし。お客様の成功が私たちの報酬です。',
      'svc_cta_title': 'マレーシア不動産の<br>旅を始めましょう',
      'svc_cta_subtitle': '購入・売却・賃貸——無料・無義務のご相談はチームまで。',
      'svc_book_consultation': '無料相談を予約',
      // About page
      'about_badge': '✦ 私たちが選ばれる理由',
      'about_hero_title': 'テクノロジーと<br><span class="gold">専門知識</span>の融合',
      'about_hero_subtitle': 'マレーシア最先端の不動産コンサルタント——AI駆動、データ駆動、透明性。',
      'about_stat1_value': 'AI+搭載',
      'about_stat1_label': 'アナリティクス',
      'about_stat2_label': 'クライアントポータル',
      'about_stat3_label': '価格透明性',
      'about_stat4_label': '対応地域',
      'about_features_title': '私たちの強み',
      'about_features_subtitle': 'すべてのツールとサービスは、マレーシア不動産投資で優位に立つために設計されています。',
      'about_demo_title': '実際にご覧ください',
      'about_demo_subtitle': 'お客様が毎日使うツールをご体験ください。',
      'about_cta_title': 'より賢く投資する準備はできましたか？',
      'about_cta_subtitle': 'テクノロジーがマレーシア不動産でどのような優位性をもたらすか、チームにお問い合わせください。',
      'about_cta_btn': 'WhatsAppでご相談',
    },
    ko: {
      'Buy': '구매',
      'Sell': '판매',
      'Rent': '임대',
      'Services': '서비스',
      'About': '회사 소개',
      'WhatsApp Us': 'WhatsApp 문의',
      'Bridging Markets.': '시장을 연결합니다.<br><span class="gold" data-i18n="Building Futures.">미래를 건설합니다.</span>',
      'Building Futures.': '미래를 건설합니다.',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': '말레이시아 부동산 투자의 신뢰할 수 있는 플랫폼.',
      'Get Started on WhatsApp': 'WhatsApp으로 시작',
      'Technology Meets Expertise': '기술과 전문성의 만남',
      'Explore Our Listings': '매물 보기',
      'Premium properties across Malaysia': '말레이시아 프리미엄 부동산',
      'properties across Malaysia': '말레이시아 부동산',
      'View All Properties': '전체 매물 보기',
      'Start Your Journey': '여정을 시작하세요',
      'Connect with our specialists today': '오늘 전문가와 상담하세요',
      'Chat on WhatsApp': 'WhatsApp 채팅',
      'Browse Properties': '매물 탐색',
      'Find Your': '찾으세요',
      'Malaysia Property': '말레이시아 부동산',
      'Handpicked developments across Malaysia': '말레이시아 전역의 엄선된 프로젝트',
      'Properties': '매물',
      'Cities': '도시',
      'Freehold & Leasehold': '소유권 & 임대권',
      'All Cities': '모든 도시',
      'All Areas': '모든 지역',
      'Any Price': '모든 가격',
      'All Status': '모든 상태',
      'All Tenure': '모든 소유형태',
      'Any Distance': '모든 거리',
      'New Launch': '신규 분양',
      'Completed': '완공',
      'Freehold': '소유권',
      'Leasehold': '임대권',
      'Search by name...': '이름으로 검색...',
      'About this property': '이 매물 소개',
      'Book a Viewing': '견학 예약',
      'Price on Request': '가격 문의',
      'Show more': '더 보기',
      'Show less': '접기',
      "What's Nearby": '주변 시설',
      'Transit': '교통',
      'Bus': '버스',
      'Schools': '학교',
      'Clinics': '병원',
      'Shopping': '쇼핑',
      'All rights reserved': '모든 권리 보유',
      // New translations
      'about_description': '말레이시아에서 가장 기술적으로 진보한 부동산 컨설팅 회사로서, 수십 년의 경험을 최첨단 AI, 실시간 분석 및 독점 기술로 강화합니다. 투명성과 정밀함으로 고객에게 서비스를 제공하며, 압박 전술 없이 목표에 맞춘 데이터 기반 안내만을 제공합니다.',
      'click a pin for details': '핀을 클릭하여 상세 보기',
      'Browse All 90+ Properties': '전체 90+ 매물 보기',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': '조호르바루, 쿠알라룸푸르, 페낭의 엄선된 프로젝트를 필터, 검색, 상세 목록으로 탐색하세요.',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": '싱가포르에서 조호르바루 부동산 투자로의 신뢰할 수 있는 플랫폼. 검색부터 계약까지 전문가 안내.',
      'View Details →': '상세 보기 →',
      'View Listings →': '매물 보기 →',
      'Call Us': '전화하기',
      'Email': '이메일',
      'WhatsApp': 'WhatsApp',
      'From': '부터',
      // Sell page
      'sell_hero_title': '<span>말레이시아 부동산</span> 매각',
      'sell_hero_subtitle': '무료 시장 평가를 받으세요. 의무 없음, 압박 없음.',
      'sell_vp1_title': 'AI 기반 평가',
      'sell_vp1_desc': '최근 거래 및 시장 데이터 분석에 기반한 정확한 가격 책정.',
      'sell_vp2_title': '전문 마케팅',
      'sell_vp2_desc': '사진, 가상 투어 및 주요 부동산 포털 리스팅.',
      'sell_vp3_title': '전담 에이전트',
      'sell_vp3_desc': '리스팅부터 완료까지 개인 서비스. 하나의 연락처.',
      'sell_form_title': '무료 평가 요청',
      'sell_form_subtitle': '부동산 세부 정보를 입력하시면 24시간 내에 연락드리겠습니다.',
      'sell_review_title': '세부 정보 확인',
      'sell_submit_btn': '평가 요청 제출',
      'sell_thankyou_title': '감사합니다!',
      'sell_thankyou_desc': '평가 요청이 제출되었습니다. 24시간 내에 시장 분석과 함께 연락드리겠습니다.',
      'sell_prefer_talk': '직접 대화하고 싶으신가요? WhatsApp으로 연락주세요.',
      // Rent page
      'rent_hero_title': '임대를 <span>간편하게</span>',
      'rent_hero_subtitle': '집주인이든 세입자든, 저희가 도와드립니다.',
      'rent_iam': '저는...',
      'rent_choose': '상황에 맞는 옵션을 선택하세요.',
      'rent_owner_title': '부동산 소유자',
      'rent_owner_subtitle': '임대할 부동산이 있습니다',
      'rent_owner_li1': '우수한 세입자 찾기',
      'rent_owner_li2': '세입자 심사 및 확인',
      'rent_owner_li3': '임대 계약서 준비',
      'rent_owner_li4': '선택: 전체 부동산 관리',
      'rent_list_property': '부동산 등록하기 →',
      'rent_tenant_title': '세입자',
      'rent_tenant_subtitle': '임대할 곳을 찾고 있습니다',
      'rent_tenant_li1': '독점 매물 접근',
      'rent_tenant_li2': '검증된 부동산만',
      'rent_tenant_li3': '세입자 중개 수수료 없음',
      'rent_tenant_li4': '유연한 임대 옵션',
      'rent_find_rental': '임대 찾기 →',
      'rent_whatneed': '무엇이 필요하신가요?',
      'rent_choose_service': '적합한 서비스 레벨을 선택하세요.',
      'rent_submit_rental': '임대 요청 제출',
      'rent_ll_thankyou_title': '요청 제출 완료!',
      'rent_ll_thankyou_desc': '임대 팀이 부동산 세부 정보를 검토하고 24시간 내에 연락드리겠습니다.',
      'rent_tenant_flow_title': '찾고 계신 조건을 알려주세요',
      'rent_tenant_flow_subtitle': '24시간 내에 적합한 매물을 매칭해 드립니다.',
      'rent_submit_request': '요청 제출',
      'rent_tenant_thankyou_title': '감사합니다!',
      'rent_tenant_thankyou_desc': '24시간 내에 적합한 매물을 매칭해 드립니다. 선호하시는 연락 방법으로 연락드리겠습니다.',
      // Services page
      'svc_badge': '✦ 풀서비스 부동산 파트너',
      'svc_hero_title': 'A부터 Z까지<br><span class="gold">부동산 서비스</span>',
      'svc_hero_subtitle': '첫 검색부터 임대 수입까지 — 모든 것을 대신해 드립니다.',
      'svc_everything_title': '필요한 모든 것',
      'svc_everything_subtitle': '전체 투자 라이프사이클을 아우르는 종합 부동산 서비스.',
      'svc_search_title': '부동산 검색 및 취득',
      'svc_selling_title': '부동산 매각',
      'svc_rental_title': '임대 및 리스',
      'svc_mgmt_title': '부동산 관리',
      'svc_reno_title': '리노베이션 및 가구',
      'svc_legal_title': '법률 및 컴플라이언스',
      'svc_finance_title': '금융 및 은행',
      'svc_visa_title': '비자 및 이전',
      'svc_post_title': '구매 후 지원',
      'svc_process_title': '이용 방법',
      'svc_process_subtitle': '문의부터 열쇠 수령까지 간단한 5단계.',
      'svc_pricing_title': '투명한 가격',
      'svc_pricing_subtitle': '숨겨진 비용 없음. 성공할 때 함께합니다.',
      'svc_cta_title': '말레이시아 부동산<br>여정을 시작하세요',
      'svc_cta_subtitle': '매매든 임대든 — 무료 상담을 위해 팀에 문의하세요.',
      'svc_book_consultation': '무료 상담 예약',
      // About page
      'about_badge': '✦ 왜 저희와 함께해야 하나요',
      'about_hero_title': '기술과<br><span class="gold">전문성</span>의 만남',
      'about_hero_subtitle': '말레이시아에서 가장 진보한 부동산 컨설팅 — AI 기반, 데이터 기반, 투명한 서비스.',
      'about_stat1_value': 'AI+ 기반',
      'about_stat1_label': '분석',
      'about_stat2_label': '고객 포털 접근',
      'about_stat3_label': '가격 투명성',
      'about_stat4_label': '서비스 지역',
      'about_features_title': '차별화 요소',
      'about_features_subtitle': '말레이시아 부동산 투자에서 우위를 제공하는 모든 도구와 서비스.',
      'about_demo_title': '직접 확인하세요',
      'about_demo_subtitle': '고객들이 매일 사용하는 동일한 도구를 체험하세요.',
      'about_cta_title': '더 스마트하게 투자할 준비가 되셨나요?',
      'about_cta_subtitle': '기술이 말레이시아 부동산에서 어떤 우위를 제공하는지 팀에 문의하세요.',
      'about_cta_btn': 'WhatsApp으로 상담하기',
    },
    th: {
      'Buy': 'ซื้อ',
      'Sell': 'ขาย',
      'Rent': 'เช่า',
      'Services': 'บริการ',
      'About': 'เกี่ยวกับเรา',
      'WhatsApp Us': 'WhatsApp เรา',
      'Bridging Markets.': 'เชื่อมต่อตลาด<br><span class="gold" data-i18n="Building Futures.">สร้างอนาคต</span>',
      'Building Futures.': 'สร้างอนาคต',
      'Your trusted gateway to Investing in Malaysia\'s Real Estate.': 'แพลตฟอร์มการลงทุนอสังหาริมทรัพย์มาเลเซียที่คุณไว้วางใจ',
      'Get Started on WhatsApp': 'เริ่มต้นผ่าน WhatsApp',
      'Technology Meets Expertise': 'เทคโนโลยีพบความเชี่ยวชาญ',
      'Explore Our Listings': 'สำรวจรายการของเรา',
      'Premium properties across Malaysia': 'อสังหาริมทรัพย์ระดับพรีเมียมทั่วมาเลเซีย',
      'properties across Malaysia': 'อสังหาริมทรัพย์ทั่วมาเลเซีย',
      'View All Properties': 'ดูอสังหาริมทรัพย์ทั้งหมด',
      'Start Your Journey': 'เริ่มต้นการเดินทาง',
      'Connect with our specialists today': 'ติดต่อผู้เชี่ยวชาญของเราวันนี้',
      'Chat on WhatsApp': 'แชทผ่าน WhatsApp',
      'Browse Properties': 'เรียกดูอสังหาริมทรัพย์',
      'Find Your': 'ค้นหา',
      'Malaysia Property': 'อสังหาริมทรัพย์มาเลเซีย',
      'Handpicked developments across Malaysia': 'โครงการคัดสรรทั่วมาเลเซีย',
      'Properties': 'อสังหาริมทรัพย์',
      'Cities': 'เมือง',
      'Freehold & Leasehold': 'กรรมสิทธิ์ & สิทธิเช่า',
      'All Cities': 'ทุกเมือง',
      'All Areas': 'ทุกพื้นที่',
      'Any Price': 'ทุกราคา',
      'All Status': 'ทุกสถานะ',
      'All Tenure': 'ทุกรูปแบบกรรมสิทธิ์',
      'Any Distance': 'ทุกระยะทาง',
      'New Launch': 'เปิดตัวใหม่',
      'Completed': 'สร้างเสร็จ',
      'Freehold': 'กรรมสิทธิ์',
      'Leasehold': 'สิทธิเช่า',
      'Search by name...': 'ค้นหาตามชื่อ...',
      'About this property': 'เกี่ยวกับอสังหาริมทรัพย์นี้',
      'Book a Viewing': 'จองเยี่ยมชม',
      'Price on Request': 'สอบถามราคา',
      'Show more': 'แสดงเพิ่มเติม',
      'Show less': 'แสดงน้อยลง',
      "What's Nearby": 'สิ่งที่อยู่ใกล้เคียง',
      'Transit': 'ขนส่ง',
      'Bus': 'รถบัส',
      'Schools': 'โรงเรียน',
      'Clinics': 'คลินิก',
      'Shopping': 'ช้อปปิ้ง',
      'All rights reserved': 'สงวนลิขสิทธิ์',
      // New translations
      'about_description': 'ในฐานะบริษัทที่ปรึกษาอสังหาริมทรัพย์ที่ก้าวหน้าทางเทคโนโลยีที่สุดในมาเลเซีย เรารวมประสบการณ์หลายทศวรรษเข้ากับ AI ล้ำสมัย การวิเคราะห์แบบเรียลไทม์ และเทคโนโลยีเฉพาะ เราให้บริการลูกค้าด้วยความโปร่งใสและแม่นยำ ไม่มีกลยุทธ์กดดัน มีเพียงคำแนะนำที่ขับเคลื่อนด้วยข้อมูลที่ปรับแต่งตามเป้าหมายของคุณ',
      'click a pin for details': 'คลิกที่หมุดเพื่อดูรายละเอียด',
      'Browse All 90+ Properties': 'เรียกดูอสังหาริมทรัพย์ทั้งหมด 90+',
      'Explore our handpicked developments across Johor Bahru, Kuala Lumpur, and Penang with filters, search, and detailed listings.': 'สำรวจโครงการคัดสรรในยะโฮร์บาห์รู กัวลาลัมเปอร์ และปีนัง พร้อมตัวกรอง การค้นหา และรายละเอียด',
      "Singapore's trusted gateway to Johor Bahru property investment. Expert guidance from search to settlement.": 'แพลตฟอร์มที่น่าเชื่อถือจากสิงคโปร์สู่การลงทุนอสังหาริมทรัพย์ยะโฮร์บาห์รู คำแนะนำจากผู้เชี่ยวชาญตั้งแต่การค้นหาจนถึงการปิดสัญญา',
      'View Details →': 'ดูรายละเอียด →',
      'View Listings →': 'ดูรายการ →',
      'Call Us': 'โทรหาเรา',
      'Email': 'อีเมล',
      'WhatsApp': 'WhatsApp',
      'From': 'จาก',
      // Sell page
      'sell_hero_title': 'ขาย <span>อสังหาริมทรัพย์มาเลเซีย</span> ของคุณ',
      'sell_hero_subtitle': 'รับการประเมินราคาตลาดฟรี ไม่มีข้อผูกมัด ไม่มีแรงกดดัน',
      'sell_vp1_title': 'การประเมินด้วย AI',
      'sell_vp1_desc': 'การตั้งราคาที่แม่นยำตามธุรกรรมล่าสุดและการวิเคราะห์ข้อมูลตลาด',
      'sell_vp2_title': 'การตลาดมืออาชีพ',
      'sell_vp2_desc': 'รูปถ่าย ทัวร์เสมือนจริง และรายการบนพอร์ทัลอสังหาริมทรัพย์หลักทั้งหมด',
      'sell_vp3_title': 'ตัวแทนเฉพาะ',
      'sell_vp3_desc': 'บริการส่วนตัวตั้งแต่ลงประกาศจนถึงเสร็จสิ้น ติดต่อจุดเดียว',
      'sell_form_title': 'ขอการประเมินฟรี',
      'sell_form_subtitle': 'กรอกรายละเอียดอสังหาริมทรัพย์ เราจะติดต่อกลับภายใน 24 ชั่วโมง',
      'sell_review_title': 'ตรวจสอบรายละเอียด',
      'sell_submit_btn': 'ส่งคำขอประเมิน',
      'sell_thankyou_title': 'ขอบคุณ!',
      'sell_thankyou_desc': 'คำขอประเมินของคุณถูกส่งแล้ว ทีมงานจะติดต่อคุณภายใน 24 ชั่วโมงพร้อมการวิเคราะห์ตลาด',
      'sell_prefer_talk': 'ต้องการพูดคุย? WhatsApp หาเราโดยตรง',
      // Rent page
      'rent_hero_title': 'เช่า <span>ง่ายๆ</span>',
      'rent_hero_subtitle': 'ไม่ว่าคุณจะเป็นเจ้าของหรือผู้เช่า เราพร้อมดูแลคุณ',
      'rent_iam': 'ฉันเป็น...',
      'rent_choose': 'เลือกตัวเลือกที่เหมาะกับสถานการณ์ของคุณ',
      'rent_owner_title': 'เจ้าของอสังหาริมทรัพย์',
      'rent_owner_subtitle': 'ฉันมีอสังหาริมทรัพย์ให้เช่า',
      'rent_owner_li1': 'หาผู้เช่าคุณภาพ',
      'rent_owner_li2': 'คัดกรองและตรวจสอบผู้เช่า',
      'rent_owner_li3': 'จัดเตรียมสัญญาเช่า',
      'rent_owner_li4': 'ตัวเลือก: การจัดการอสังหาริมทรัพย์เต็มรูปแบบ',
      'rent_list_property': 'ลงประกาศอสังหาริมทรัพย์ →',
      'rent_tenant_title': 'ผู้เช่า',
      'rent_tenant_subtitle': 'ฉันกำลังหาที่เช่า',
      'rent_tenant_li1': 'เข้าถึงรายการพิเศษ',
      'rent_tenant_li2': 'อสังหาริมทรัพย์ที่ผ่านการตรวจสอบเท่านั้น',
      'rent_tenant_li3': 'ไม่มีค่าตัวแทนสำหรับผู้เช่า',
      'rent_tenant_li4': 'ตัวเลือกสัญญาเช่าที่ยืดหยุ่น',
      'rent_find_rental': 'หาที่เช่า →',
      'rent_whatneed': 'คุณต้องการอะไร?',
      'rent_choose_service': 'เลือกระดับบริการที่เหมาะกับคุณ',
      'rent_submit_rental': 'ส่งคำขอเช่า',
      'rent_ll_thankyou_title': 'คำขอถูกส่งแล้ว!',
      'rent_ll_thankyou_desc': 'ทีมเช่าจะตรวจสอบรายละเอียดอสังหาริมทรัพย์และติดต่อภายใน 24 ชั่วโมง',
      'rent_tenant_flow_title': 'บอกเราว่าคุณกำลังมองหาอะไร',
      'rent_tenant_flow_subtitle': 'เราจะจับคู่คุณกับอสังหาริมทรัพย์ที่เหมาะสมภายใน 24 ชั่วโมง',
      'rent_submit_request': 'ส่งคำขอ',
      'rent_tenant_thankyou_title': 'ขอบคุณ!',
      'rent_tenant_thankyou_desc': 'เราจะจับคู่คุณกับอสังหาริมทรัพย์ที่เหมาะสมภายใน 24 ชั่วโมง ทีมจะติดต่อผ่านวิธีที่คุณเลือก',
      // Services page
      'svc_badge': '✦ พาร์ทเนอร์อสังหาริมทรัพย์ครบวงจร',
      'svc_hero_title': 'A ถึง Z<br><span class="gold">บริการอสังหาริมทรัพย์</span>',
      'svc_hero_subtitle': 'ตั้งแต่การค้นหาครั้งแรกจนถึงรายได้ค่าเช่า — เราจัดการทุกอย่างให้คุณ',
      'svc_everything_title': 'ทุกสิ่งที่คุณต้องการ',
      'svc_everything_subtitle': 'บริการอสังหาริมทรัพย์ครอบคลุมตลอดวงจรการลงทุน',
      'svc_search_title': 'ค้นหาและจัดหาอสังหาริมทรัพย์',
      'svc_selling_title': 'ขายอสังหาริมทรัพย์ของคุณ',
      'svc_rental_title': 'เช่าและลีส',
      'svc_mgmt_title': 'การจัดการอสังหาริมทรัพย์',
      'svc_reno_title': 'รีโนเวทและตกแต่ง',
      'svc_legal_title': 'กฎหมายและการปฏิบัติตาม',
      'svc_finance_title': 'การเงินและธนาคาร',
      'svc_visa_title': 'วีซ่าและการย้ายถิ่น',
      'svc_post_title': 'การสนับสนุนหลังซื้อ',
      'svc_process_title': 'ขั้นตอนการทำงาน',
      'svc_process_subtitle': 'การเดินทาง 5 ขั้นตอนง่ายๆ จากการสอบถามจนถึงรับกุญแจ',
      'svc_pricing_title': 'ราคาโปร่งใส',
      'svc_pricing_subtitle': 'ไม่มีค่าใช้จ่ายแอบแฝง เราได้เมื่อคุณสำเร็จ',
      'svc_cta_title': 'เริ่มต้นการเดินทาง<br>อสังหาริมทรัพย์มาเลเซียของคุณ',
      'svc_cta_subtitle': 'ไม่ว่าจะซื้อ ขาย หรือเช่า — พูดคุยกับทีมเราเพื่อรับคำปรึกษาฟรี',
      'svc_book_consultation': 'จองคำปรึกษาฟรี',
      // About page
      'about_badge': '✦ ทำไมต้องทำงานกับเรา',
      'about_hero_title': 'เทคโนโลยีพบ<br><span class="gold">ความเชี่ยวชาญ</span>',
      'about_hero_subtitle': 'บริษัทที่ปรึกษาอสังหาริมทรัพย์ที่ก้าวหน้าที่สุดในมาเลเซีย — ขับเคลื่อนด้วย AI ข้อมูล และความโปร่งใส',
      'about_stat1_value': 'AI+ ขับเคลื่อน',
      'about_stat1_label': 'การวิเคราะห์',
      'about_stat2_label': 'การเข้าถึงพอร์ทัลลูกค้า',
      'about_stat3_label': 'ความโปร่งใสด้านราคา',
      'about_stat4_label': 'ภูมิภาคที่ครอบคลุม',
      'about_features_title': 'สิ่งที่ทำให้เราแตกต่าง',
      'about_features_subtitle': 'ทุกเครื่องมือและบริการออกแบบมาเพื่อให้คุณได้เปรียบในการลงทุนอสังหาริมทรัพย์มาเลเซีย',
      'about_demo_title': 'ดูการทำงานจริง',
      'about_demo_subtitle': 'สำรวจเครื่องมือที่ลูกค้าใช้ทุกวัน',
      'about_cta_title': 'พร้อมที่จะลงทุนอย่างชาญฉลาดขึ้นหรือยัง?',
      'about_cta_subtitle': 'พูดคุยกับทีมเราและค้นพบว่าเทคโนโลยีให้ข้อได้เปรียบอย่างไรในอสังหาริมทรัพย์มาเลเซีย',
      'about_cta_btn': 'แชทกับเราบน WhatsApp',
    }
  };

  // Language names for the selector
  var langNames = {
    en: 'English',
    zh: '简体中文',
    tw: '繁體中文',
    ms: 'Bahasa Melayu',
    ja: '日本語',
    ko: '한국어',
    th: 'ไทย'
  };

  var langFlags = {
    en: '🇬🇧',
    zh: '🇨🇳',
    tw: '🇭🇰',
    ms: '🇲🇾',
    ja: '🇯🇵',
    ko: '🇰🇷',
    th: '🇹🇭'
  };

  // Detect language: URL param > saved preference > English default
  // Does NOT auto-detect from browser language — English is default.
  // Users choose their language via the selector or shareable URL.
  function detectLang() {
    // Check URL ?lang= parameter first (for shareable links)
    var urlLang = null;
    // Try query string: ?lang=zh
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.has('lang')) urlLang = params.get('lang');
    } catch(e) {
      var match = window.location.search.match(/[?&]lang=([a-z]{2})/);
      if (match) urlLang = match[1];
    }
    // Also try hash: #lang=zh or #zh
    if (!urlLang) {
      var hash = window.location.hash.replace('#','');
      var hashMatch = hash.match(/^lang=([a-z]{2})$/);
      if (hashMatch) urlLang = hashMatch[1];
      // Also support bare hash: #zh, #ja, etc.
      if (!urlLang && /^[a-z]{2}$/.test(hash) && (translations[hash] || hash === 'en')) {
        urlLang = hash;
      }
    }
    if (urlLang && (translations[urlLang] || urlLang === 'en')) {
      localStorage.setItem('sa_lang', urlLang);
      return urlLang;
    }

    var saved = localStorage.getItem('sa_lang');
    if (saved && (translations[saved] || saved === 'en')) return saved;

    // Default to English — no browser language auto-detection
    return 'en';
  }

  // Translate a text node's content
  function translateText(node, dict) {
    var original = node._originalText || node.textContent.trim();
    if (!node._originalText) node._originalText = original;

    if (dict[original]) {
      node.textContent = node.textContent.replace(original, dict[original]);
    }
  }

  // Map language codes to OSM name fields
  var mapLangCodes = {
    en: 'name:en', zh: 'name:zh', tw: 'name:zh',
    ms: 'name:ms', ja: 'name:ja', ko: 'name:ko', th: 'name:th'
  };

  // Update map tile labels to match selected language
  function setMapLanguage(lang) {
    var map = window.listingsMap;
    if (!map || !map.getStyle) return;
    var nameField = mapLangCodes[lang] || 'name:en';
    try {
      var style = map.getStyle();
      if (!style || !style.layers) return;
      style.layers.forEach(function(layer) {
        if (layer.type === 'symbol' && layer.layout && layer.layout['text-field']) {
          var tf = layer.layout['text-field'];
          // Handle string format like {name} or {name:en}
          if (typeof tf === 'string' && tf.indexOf('{name') !== -1) {
            map.setLayoutProperty(layer.id, 'text-field', '{' + nameField + '}');
          }
          // Handle expression format ['get', 'name'] or ['coalesce', ...]
          if (Array.isArray(tf)) {
            map.setLayoutProperty(layer.id, 'text-field', ['coalesce', ['get', nameField], ['get', 'name']]);
          }
        }
      });
    } catch(e) { /* style not loaded yet */ }
  }

  // Main translate function
  function translatePage(lang) {
    var dict = translations[lang];

    // If English, restore originals
    if (!dict) {
      document.querySelectorAll('[data-i18n]').forEach(function(el) {
        if (el._originalText) el.textContent = el._originalText;
        if (el._originalPlaceholder) el.placeholder = el._originalPlaceholder;
        if (el._originalHTML) el.innerHTML = el._originalHTML;
      });
      document.documentElement.lang = 'en';
      setMapLanguage('en');
      return;
    }

    document.documentElement.lang = lang;

    // Translate data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (!el._originalText) el._originalText = el.textContent;
        el.textContent = dict[key];
      }
    });

    // Translate data-i18n-html elements (for HTML content like hero with <br>)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        if (!el._originalHTML) el._originalHTML = el.innerHTML;
        el.innerHTML = dict[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        if (!el._originalPlaceholder) el._originalPlaceholder = el.placeholder;
        el.placeholder = dict[key];
      }
    });

    // Translate select options
    document.querySelectorAll('select option[data-i18n]').forEach(function(opt) {
      var key = opt.getAttribute('data-i18n');
      if (dict[key]) {
        if (!opt._originalText) opt._originalText = opt.textContent;
        opt.textContent = dict[key];
      }
    });

    // Update map tile labels
    setMapLanguage(lang);
  }

  // Create language selector
  function createLangSelector() {
    var currentLang = detectLang();

    var wrapper = document.createElement('div');
    wrapper.className = 'lang-selector';
    wrapper.style.cssText = 'position:relative;display:inline-flex;align-items:center;margin-left:12px';

    var btn = document.createElement('button');
    btn.className = 'lang-btn';
    btn.style.cssText = 'display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;border:1px solid rgba(128,128,128,0.2);background:rgba(128,128,128,0.06);transition:all 0.2s;font-family:inherit;color:inherit';
    btn.innerHTML = '<span class="lang-flag">' + langFlags[currentLang] + '</span><span class="lang-label">' + langNames[currentLang] + '</span><svg width="10" height="10" viewBox="0 0 10 10" fill="none" style="opacity:0.5"><path d="M2 4l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.style.cssText = 'position:absolute;top:calc(100% + 8px);right:0;background:#fff;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.12);border:1px solid rgba(0,0,0,0.06);padding:6px;min-width:170px;display:none;z-index:1000';

    var langs = ['en','zh','tw','ms','ja','ko','th'];
    langs.forEach(function(code) {
      var item = document.createElement('button');
      item.style.cssText = 'display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;border:none;background:' + (code === currentLang ? 'rgba(0,122,255,0.08)' : 'none') + ';border-radius:8px;cursor:pointer;font-size:13px;font-family:inherit;color:#1a1a2e;transition:background 0.15s';
      item.innerHTML = '<span style="font-size:18px">' + langFlags[code] + '</span><span style="font-weight:' + (code === currentLang ? '600' : '400') + '">' + langNames[code] + '</span>';

      item.addEventListener('mouseenter', function() { if (code !== currentLang) item.style.background = 'rgba(0,0,0,0.04)'; });
      item.addEventListener('mouseleave', function() { if (code !== currentLang) item.style.background = 'none'; });

      item.addEventListener('click', function() {
        localStorage.setItem('sa_lang', code);
        translatePage(code);
        // Update button
        btn.querySelector('.lang-flag').textContent = langFlags[code];
        btn.querySelector('.lang-label').textContent = langNames[code];
        dropdown.style.display = 'none';
        // Refresh selection state
        currentLang = code;
      });

      dropdown.appendChild(item);
    });

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function() {
      dropdown.style.display = 'none';
    });

    wrapper.appendChild(btn);
    wrapper.appendChild(dropdown);

    // Insert into nav
    var nav = document.querySelector('.nav-links') || document.querySelector('.nav');
    if (nav) {
      // Insert before the WhatsApp CTA button
      var cta = nav.querySelector('.nav-cta');
      if (cta) {
        nav.insertBefore(wrapper, cta);
      } else {
        nav.appendChild(wrapper);
      }
    }

    return wrapper;
  }

  // Initialize
  function init() {
    var lang = detectLang();
    createLangSelector();
    if (lang !== 'en') {
      translatePage(lang);
    }

    // Watch for dynamically added data-i18n elements (e.g. area filter rebuild)
    var translating = false;
    var pendingTranslate = null;
    var observer = new MutationObserver(function() {
      if (translating) return;
      if (pendingTranslate) clearTimeout(pendingTranslate);
      pendingTranslate = setTimeout(function() {
        var currentLang = localStorage.getItem('sa_lang') || detectLang();
        if (currentLang !== 'en' && translations[currentLang]) {
          translating = true;
          translatePage(currentLang);
          translating = false;
        }
      }, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Expose for external use
  window.saTranslate = translatePage;
  window.saTranslate.setMapLanguage = setMapLanguage;

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
