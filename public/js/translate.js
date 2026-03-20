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

  // Detect language: URL param > saved preference > device language > English
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

    var nav = navigator.language || navigator.userLanguage || 'en';
    var code = nav.split('-')[0].toLowerCase();

    // Map region-specific codes
    if (code === 'zh') {
      // Distinguish Simplified vs Traditional Chinese by region
      var region = nav.toUpperCase();
      if (region.indexOf('TW') !== -1 || region.indexOf('HK') !== -1 || region.indexOf('HANT') !== -1) return 'tw';
      return 'zh';
    }
    if (code === 'ms' || code === 'id') return 'ms'; // Indonesian similar to Malay
    if (code === 'ja') return 'ja';
    if (code === 'ko') return 'ko';
    if (code === 'th') return 'th';
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

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
