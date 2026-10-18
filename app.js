const { createApp, ref, computed, onMounted, watch } = Vue;

/* ================= عدّل بياناتك هنا / Edit your data here ================= */
const me = {
  github: 'MohmedAlamen',
  email: 'mohaalamen1234@gmail.com',
  phone: '+97451172313',
  linkedin: 'https://www.linkedin.com/in/mohaalamen/'
};
// أسماء مستودعات تبرزها بالترتيب. اتركها فارغة ليُختار أفضل 3 تلقائياً (بالنجوم ثم الأحدث)
// Repo names to feature. Leave empty to auto-pick the top 3 (stars, then recent).
const FEATURED_REPOS = [];
// مستودعات تريد إخفاءها / repos to hide
const HIDE = ['Portfolio-', 'portfolio'];
// نقطة استقبال النموذج (Formspree): أنشئ نموذجاً على formspree.io وضع الرابط هنا، مثال: 'https://formspree.io/f/xxxxxxx'
// Form endpoint (Formspree). Leave empty to fall back to opening the visitor's mail app.
const FORM_ENDPOINT = '';
// ملف يولّده GitHub Action (انظر .github/workflows). إن لم يوجد نستخدم GitHub API مباشرة.
const PROJECTS_JSON = 'projects.json';
const safeUrl = u => { try { const x = new URL(u); return x.protocol === 'https:' ? x.href : ''; } catch(e) { return ''; } };

const skills = [
  {n:'Vue.js', g:'f', i:'bi bi-lightning-charge', lv:'adv'}, {n:'React', g:'f', i:'bi bi-circle-square', lv:'adv'},
  {n:'JavaScript', g:'f', i:'bi bi-braces', lv:'exp'}, {n:'HTML5 & CSS3', g:'f', i:'bi bi-filetype-html', lv:'exp'},
  {n:'Node.js', g:'b', i:'bi bi-hexagon', lv:'exp'}, {n:'Java & Spring', g:'b', i:'bi bi-cup-hot', lv:'exp'},
  {n:'MongoDB', g:'d', i:'bi bi-database', lv:'adv'}, {n:'SQL', g:'d', i:'bi bi-table', lv:'adv'},
  {n:'IBM Cloud', g:'c', i:'bi bi-cloud', lv:'adv'}, {n:'Docker', g:'c', i:'bi bi-box-seam', lv:'mid'},
  {n:'Git & GitHub', g:'c', i:'bi bi-github', lv:'exp'}, {n:'REST APIs', g:'b', i:'bi bi-cloud-arrow-down', lv:'exp'}
];

const T = {
  ar: {
    layers:[{k:'الواجهة',v:'Vue, React'},{k:'الخادم',v:'Node.js, Java'},{k:'البيانات',v:'MongoDB, SQL'},{k:'السحابة',v:'IBM Cloud, AWS, Azure'}],
    loc:'ar', switchTo:'EN', switchLabel:'Switch to English', menu:'القائمة',
    nav:{about:'نبذة', services:'الخدمات', skills:'المهارات', projects:'المشاريع'},
    hi:'أهلاً، أنا', name:'محمد الأمين', headline:'أبني تطبيقات ويب وسحابية قابلة للتوسع.',
    bio:'مطوّر Full Stack ومهندس حلول سحابية. أحوّل المتطلبات المعقدة إلى تطبيقات آمنة وسريعة تخدم نمو الأعمال.',
    ctaWork:'شاهد مشاريعي', ctaHire:'لنعمل معاً',
    stats:[{n:'+7',l:'سنوات خبرة'},{n:'+50',l:'مشروع منجز'},{n:'+30',l:'عميل راضٍ'}],
    aboutSub:'من أنا وما الذي أجيده.',
    about:['مطوّر Full Stack ومهندس حلول سحابية بخبرة تزيد على 7 سنوات في بناء تطبيقات ويب ومايكروسيرفيس آمنة وقابلة للتوسع.',
      'أنشر تطبيقاتي على IBM Cloud وAWS وAzure، وأعمل مع Vue.js وReact وNode.js وJava وPython، وأترجم احتياجات العمل إلى حلول تقنية واضحة.',
      'أهتم كذلك بالذكاء الاصطناعي وتحليل البيانات، وقد دمجت خدمات Watson وتحليل المشاعر في تطبيقات تعمل فعلياً.'],
    focusTitle:'مجالات تركيزي',
    focus:['Full Stack Development','Cloud Architecture','AI & Machine Learning','DevOps & CI/CD'],
    servicesSub:'ما الذي يمكنني تنفيذه لك من الفكرة حتى النشر.',
    services:[
      {i:'bi bi-window-stack', t:'تطوير الواجهات', d:'مواقع وتطبيقات حديثة بـ Vue.js وReact وBootstrap.', l:['تصميم متجاوب','تحسين الأداء','SEO']},
      {i:'bi bi-hdd-network', t:'تطوير الخلفية', d:'واجهات API وخدمات خادم بـ Node.js وJava وPython.', l:['REST وGraphQL','تصميم قواعد البيانات','Microservices']},
      {i:'bi bi-cloud-check', t:'السحابة وDevOps', d:'نشر التطبيقات وإدارتها وتوسيعها على IBM Cloud وAWS.', l:['Docker وKubernetes','CI/CD','هندسة سحابية']},
      {i:'bi bi-robot', t:'الذكاء الاصطناعي', d:'دمج Watson وNLP وتحليل المشاعر في تطبيقاتك.', l:['شات بوت','تحليل المشاعر','تحليل البيانات']}
    ],
    skillsSub:'التقنيات التي أعمل بها يومياً.', levels:{exp:'خبير', adv:'متقدم', mid:'متوسط'},
    projectsSub:'أعمال احترافية لعملاء، ومشاريع مفتوحة المصدر من حسابي على GitHub.',
    clientTitle:'أعمال احترافية',
    client:[
      {n:'شات بوت آمن لعميل سيارات', d:'موقع آمن مدمج مع شات بوت لعميل في قطاع السيارات باستخدام IBM Watson Assistant.', t:['HTML5','CSS3','JavaScript','Watson Assistant']},
      {n:'محلّل المشاعر', d:'محلّل مشاعر لقسم تقييمات المنتجات في منصة تجارة إلكترونية باستخدام IBM NLU.', t:['Node.js','Watson NLU','React','MongoDB']},
      {n:'موقع تجارة إلكترونية للأزياء', d:'موقع متعدد الصفحات لعلامة أزياء مع سلة مشتريات وبوابة دفع Stripe.', t:['Vue.js','Stripe','Bootstrap','Node.js']}
    ],
    ghTitle:'مشاريع GitHub', search:'ابحث عن مشروع…', all:'الكل', loading:'جارٍ التحميل',
    errorMsg:'تعذّر تحميل المشاريع من GitHub.', retry:'إعادة المحاولة', openGh:'افتح حسابي على GitHub',
    empty:'لا توجد مشاريع مطابقة. جرّب كلمة أخرى أو اختر «الكل».',
    updated:'آخر تحديث', noDesc:'مشروع بدون وصف بعد.', code:'الكود', live:'عرض مباشر', top:'مميز',
    contactTitle:'لنعمل معاً', contactSub:'عندك فكرة أو مشروع؟ راسلني وسأرد عليك في أقرب وقت.',
    form:{name:'الاسم', email:'البريد الإلكتروني', message:'رسالتك', send:'إرسال', sending:'جارٍ الإرسال…', invalid:'يرجى تعبئة جميع الحقول ببريد صحيح.', ok:'تم الإرسال. سأرد عليك قريباً.', fail:'تعذّر الإرسال. راسلني مباشرة على البريد.', mail:'سيُفتح تطبيق البريد لإكمال الإرسال.'},
    built:'مبني بـ Vue.js و Bootstrap'
  },
  en: {
    layers:[{k:'Client',v:'Vue, React'},{k:'API',v:'Node.js, Java'},{k:'Data',v:'MongoDB, SQL'},{k:'Cloud',v:'IBM Cloud, AWS, Azure'}],
    loc:'en', switchTo:'عربي', switchLabel:'التبديل إلى العربية', menu:'Menu',
    nav:{about:'About', services:'Services', skills:'Skills', projects:'Projects'},
    hi:"Hi, I'm", name:'Mohamed Alamen', headline:'I build scalable web and cloud applications.',
    bio:'Full Stack Developer and Cloud Architect. I turn complex requirements into secure, fast applications that help businesses grow.',
    ctaWork:'View my work', ctaHire:"Let's work together",
    stats:[{n:'7+',l:'Years of experience'},{n:'50+',l:'Projects delivered'},{n:'30+',l:'Happy clients'}],
    aboutSub:'Who I am and what I do best.',
    about:['Full Stack Developer and Cloud Architect with 7+ years of experience building secure, scalable web applications and microservices.',
      'I deploy on IBM Cloud, AWS and Azure, work with Vue.js, React, Node.js, Java and Python, and turn business needs into clear technical solutions.',
      'I am also passionate about AI and data analysis, and have integrated Watson services and sentiment analysis into production applications.'],
    focusTitle:'Focus areas',
    focus:['Full Stack Development','Cloud Architecture','AI & Machine Learning','DevOps & CI/CD'],
    servicesSub:'What I can deliver for you, from idea to deployment.',
    services:[
      {i:'bi bi-window-stack', t:'Frontend Development', d:'Modern sites and apps with Vue.js, React and Bootstrap.', l:['Responsive design','Performance tuning','SEO friendly']},
      {i:'bi bi-hdd-network', t:'Backend Development', d:'APIs and server-side services with Node.js, Java and Python.', l:['REST & GraphQL','Database design','Microservices']},
      {i:'bi bi-cloud-check', t:'Cloud & DevOps', d:'Deploy, manage and scale apps on IBM Cloud and AWS.', l:['Docker & Kubernetes','CI/CD pipelines','Cloud architecture']},
      {i:'bi bi-robot', t:'AI Integration', d:'Add Watson, NLP and sentiment analysis to your product.', l:['Chatbots','Sentiment analysis','Data analysis']}
    ],
    skillsSub:'The technologies I use every day.', levels:{exp:'Expert', adv:'Advanced', mid:'Intermediate'},
    projectsSub:'Professional client work, plus open-source projects from my GitHub account.',
    clientTitle:'Professional work',
    client:[
      {n:'Secure Chatbot Integration', d:'Secure website integrated with a chatbot for an automobile client, using IBM Watson Assistant.', t:['HTML5','CSS3','JavaScript','Watson Assistant']},
      {n:'Sentiment Analyzer', d:'Sentiment analyzer for the product reviews of an eCommerce platform, built with IBM NLU.', t:['Node.js','Watson NLU','React','MongoDB']},
      {n:'E-commerce Fashion Website', d:'Multi-page site for a fashion brand with a shopping cart and Stripe payments.', t:['Vue.js','Stripe','Bootstrap','Node.js']}
    ],
    ghTitle:'GitHub projects', search:'Search projects…', all:'All', loading:'Loading',
    errorMsg:"Couldn't load projects from GitHub.", retry:'Try again', openGh:'Open my GitHub',
    empty:'No matching projects. Try another keyword or choose "All".',
    updated:'Last updated', noDesc:'No description yet.', code:'Code', live:'Live demo', top:'Featured',
    contactTitle:"Let's work together", contactSub:'Have an idea or a project? Send me a message and I will reply soon.',
    form:{name:'Name', email:'Email', message:'Your message', send:'Send', sending:'Sending…', invalid:'Please fill all fields with a valid email.', ok:"Sent. I'll reply soon.", fail:'Could not send. Please email me directly.', mail:'Your mail app will open to finish sending.'},
    built:'Built with Vue.js & Bootstrap'
  }
};

const palette = {JavaScript:'#f1e05a',Vue:'#41b883',HTML:'#e34c26',CSS:'#563d7c',TypeScript:'#3178c6',Python:'#3572A5',PHP:'#4F5D95',Java:'#b07219',SCSS:'#c6538c','C#':'#178600',Dart:'#00B4AB'};

const RepoCard = {
  props:['r','star'],
  setup(){
    const ago = d => {
      if (!d) return '';
      const days = Math.round((new Date(d) - Date.now()) / 864e5);
      const rtf = new Intl.RelativeTimeFormat(window.__t.value.loc, {numeric:'auto'});
      if (Math.abs(days) < 30) return rtf.format(days, 'day');
      if (Math.abs(days) < 365) return rtf.format(Math.round(days/30), 'month');
      return rtf.format(Math.round(days/365), 'year');
    };
    return { t: window.__t, ago, color: l => palette[l] || '#9fb4c7' };
  },
  template:`<article class="proj" :class="{star}">
    <span class="badge-top" v-if="star">{{ t.top }}</span>
    <div class="d-flex align-items-start gap-2 mb-2"><i class="bi bi-folder2-open fs-4" style="color:var(--gold)"></i><h5 class="mb-0" style="direction:ltr">{{ r.name }}</h5></div>
    <p>{{ r.description || t.noDesc }}</p>
    <div class="mb-2"><span class="tag" v-for="x in (r.topics||[]).slice(0,4)" :key="x">{{ x }}</span></div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <span class="lang" v-if="r.language" :style="{'--dot': color(r.language)}">{{ r.language }}</span><span v-else></span>
      <span class="meta"><span :title="t.updated"><i class="bi bi-clock"></i> {{ ago(r.pushed_at) }}</span><span><i class="bi bi-star"></i> {{ r.stargazers_count }}</span><span><i class="bi bi-diagram-2"></i> {{ r.forks_count }}</span></span>
    </div>
    <div class="d-flex gap-2">
      <a :href="r.html_url" target="_blank" rel="noopener" class="btn btn-ghost btn-sm flex-fill py-2"><i class="bi bi-github me-1"></i>{{ t.code }}</a>
      <a v-if="r.homepage" :href="r.homepage" target="_blank" rel="noopener" class="btn btn-main btn-sm flex-fill py-2">{{ t.live }}</a>
    </div></article>`
};

const app = createApp({
  setup() {
    let saved = 'ar';
    try { saved = localStorage.getItem('lang') || 'ar'; } catch(e) {}
    const lang0 = ref(saved === 'en' ? 'en' : 'ar');
    const t = computed(() => T[lang0.value]);
    window.__t = t; // used by RepoCard (reactive computed)
    const links = ['about','services','skills','projects'];
    const contacts = [
      {i:'bi bi-github', u:'https://github.com/'+me.github, l:'GitHub'},
      {i:'bi bi-linkedin', u:me.linkedin, l:'LinkedIn'},
      {i:'bi bi-envelope', u:'mailto:'+me.email, l:'Email'},
      {i:'bi bi-telephone', u:'tel:'+me.phone, l:'Phone'}
    ];

    function applyLang(l){
      const rtl = l === 'ar';
      document.documentElement.lang = l; document.documentElement.dir = rtl ? 'rtl' : 'ltr';
      document.getElementById('bs-rtl').disabled = !rtl; document.getElementById('bs-ltr').disabled = rtl;
      try { localStorage.setItem('lang', l); } catch(e) {}
    }
    watch(lang0, applyLang, {immediate:true});
    const toggleLang = () => { lang0.value = lang0.value === 'ar' ? 'en' : 'ar'; };

    /* GitHub */
    const repos = ref([]), loading = ref(true), error = ref(''), q = ref(''), lang = ref('');
    async function load() {
      loading.value = true; error.value = '';
      try {
        let data = null;
        try { const c = JSON.parse(sessionStorage.getItem('gh_repos')||'null'); if (c && Date.now()-c.t < 600000) data = c.d; } catch(e) {}
        if (!data) {
          try { const r0 = await fetch(PROJECTS_JSON, {cache:'no-cache'}); if (r0.ok) { const j = await r0.json(); if (Array.isArray(j) && j.length) data = j; } } catch(e) {}
        }
        if (!data) {
          const res = await fetch(`https://api.github.com/users/${me.github}/repos?per_page=100&sort=updated`);
          if (!res.ok) throw new Error(res.status === 403 ? 'rate limit' : res.status);
          data = await res.json();
        }
        try { sessionStorage.setItem('gh_repos', JSON.stringify({t:Date.now(), d:data})); } catch(e) {}
        repos.value = data.filter(r => !r.fork && !HIDE.includes(r.name)).map(r => ({...r, homepage: safeUrl(r.homepage), html_url: safeUrl(r.html_url)}))
          .sort((a,b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at));
      } catch (e) { error.value = e.message; }
      loading.value = false;
    }
    const langs = computed(() => [...new Set(repos.value.map(r => r.language).filter(Boolean))]);
    const featuredRepos = computed(() => FEATURED_REPOS.length
      ? FEATURED_REPOS.map(n => repos.value.find(r => r.name === n)).filter(Boolean)
      : repos.value.slice(0, 3));
    const filtered = computed(() => repos.value.filter(r =>
      (!lang.value || r.language === lang.value) &&
      (!q.value || (r.name+' '+(r.description||'')).toLowerCase().includes(q.value.toLowerCase()))));
    const rest = computed(() => (q.value || lang.value) ? filtered.value
      : filtered.value.filter(r => !featuredRepos.value.includes(r)));

    /* typing effect */
    const typed = ref('');
    const roles = ['Full Stack Developer','Cloud Architect','Vue.js & React'];
    onMounted(() => {
      load();
      let i = 0, j = 0, del = false;
      (function tick(){
        const w = roles[i]; typed.value = w.slice(0, j);
        if (!del && j === w.length) { del = true; return setTimeout(tick, 1400); }
        if (del && j === 0) { del = false; i = (i+1) % roles.length; }
        j += del ? -1 : 1; setTimeout(tick, del ? 40 : 90);
      })();
    });

    const skillGroups = computed(() => ['f','b','d','c'].map((k,i) => ({k, name: t.value.layers[i].k, items: skills.filter(s => s.g === k)})));
    /* contact form */
    const form = ref({name:'', email:'', message:'', website:''});
    const sending = ref(false), formMsg = ref(''), formOk = ref(false);
    async function submitForm() {
      const f = form.value; formMsg.value = '';
      if (f.website) return; // honeypot: bots fill this hidden field
      if (!f.name || !f.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) { formOk.value = false; formMsg.value = t.value.form.invalid; return; }
      if (!FORM_ENDPOINT) {
        location.href = `mailto:${me.email}?subject=${encodeURIComponent('Portfolio: '+f.name)}&body=${encodeURIComponent(f.message+'\n\n'+f.email)}`;
        formOk.value = true; formMsg.value = t.value.form.mail; return;
      }
      sending.value = true;
      try {
        const res = await fetch(FORM_ENDPOINT, {method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body: JSON.stringify({name:f.name, email:f.email, message:f.message})});
        if (!res.ok) throw new Error(res.status);
        formOk.value = true; formMsg.value = t.value.form.ok; form.value = {name:'', email:'', message:'', website:''};
      } catch(e) { formOk.value = false; formMsg.value = t.value.form.fail; }
      sending.value = false;
    }

    return { skillGroups, form, sending, formMsg, formOk, submitForm, me, t, links, skills, contacts, repos, loading, error, q, lang, langs, featuredRepos, rest, load, typed, toggleLang };
  }
});
app.component('repo-card', RepoCard);
app.mount('#app');
