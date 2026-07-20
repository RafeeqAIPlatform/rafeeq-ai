"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity, ArrowLeft, Bell, BrainCircuit, Building2, Check, ChevronLeft, CircleHelp,
  Clock3, Cross, ExternalLink, Fingerprint, Globe2, HeartPulse, Map, MapPin, Menu, MessageCircle, Navigation,
  PhoneCall, Play, QrCode, Radio, Route, ScanFace, ShieldCheck, Sparkles, Stethoscope,
  Thermometer, UserRoundCheck, UsersRound, Watch, Wifi, Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { abdullahProfile } from "../lib/rafeeq-engine";

const steps = [
  ["01", "تهيئة ضيف الرحمن", "تجهيز الحاج للرحلة كاملة وليس للطوارئ فقط.", Sparkles],
  ["02", "التعرف على الحاج", "الخبرة، اللغة، الصحة، الدواء، والمرافقون.", UserRoundCheck],
  ["03", "تجهيز ملف الرحلة", "الحملة، نقطة التجمع، QR الطوارئ، والساعة.", QrCode],
  ["04", "تعلم رحلة الحج", "المراحل، المسارات، أساسيات الحركة، والتجهيزات.", Route],
  ["05", "المحاكاة الواقعية", "حرارة، حشود، فقدان المجموعة، ضيق تنفس، وطلب مساعدة.", Play],
  ["06", "إنشاء توأم جاهزية الحاج™", "نموذج ديناميكي يضم درجة الجاهزية كأحد المقاييس.", Fingerprint],
  ["07", "جاهز للحج", "خطة شخصية وتنبيهات مبكرة ومرافقة أثناء الرحلة.", ShieldCheck]
] as const;

const difference = [
  "يبدأ قبل الحج وليس أثناءه فقط",
  "يقيس جاهزية الحاج قبل الرحلة",
  "ينشئ توأم جاهزية الحاج™",
  "يستشعر مؤشرات الخطر مبكرًا",
  "يدعم الجهات الصحية والأمنية"
];

const flow = [
  ["الحاج", UsersRound],
  ["الساعة الذكية", Watch],
  ["محرك الذكاء", BrainCircuit],
  ["رصد المخاطر", Radio],
  ["مركز التحكم", Building2],
  ["أقرب فريق طبي", Stethoscope],
  ["تطبيق المسعف", PhoneCall],
  ["استجابة أسرع", Zap]
] as const;

const future = [
  ["تكامل الأجهزة القابلة للارتداء", Watch],
  ["اكتشاف التائهين بالذكاء الاصطناعي", ScanFace],
  ["رعاية صحية استباقية", HeartPulse],
  ["ذكاء إدارة الحشود", UsersRound],
  ["تكامل الجهات الحكومية", Building2],
  ["مواءمة رؤية السعودية 2030", Sparkles]
] as const;

const researchInsights = [
  ["إدارة الحشود تحتاج ثقة لا مجرد أرقام", "كثافة الطواف والمشاعر تتغير بسرعة، لذلك يعرض رفيق درجة المخاطر مع مستوى الثقة ومسار تصعيد بشري عند عدم اليقين.", UsersRound],
  ["الحرارة عامل تشغيلي حاسم", "يربط التوأم الرقمي بين الحرارة، الجهد، المسار، والملف الصحي لتقديم تنبيه مبكر قبل الوصول إلى مرحلة الخطر.", Thermometer],
  ["المفقودون يحتاجون هوية آمنة وسريعة", "يدمج رفيق QR للطوارئ، آخر موقع آمن، وتفويضات وصول محدودة لتسريع العثور والمساندة دون كشف زائد للبيانات.", ScanFace],
  ["رفيق يكمل المنظومة ولا يستبدلها", "يتكامل مستقبلًا مع القنوات الرسمية مثل التصاريح، الصحة، الأمن، والنقل ليضيف طبقة استعداد واستشعار واستجابة عند وجود اعتماد.", Globe2]
] as const;

const operatingLayers = [
  ["طبقة الاستعداد", "تهيئة ومحاكاة واقعية قبل الرحلة لتحديث توأم جاهزية الحاج™.", Play],
  ["طبقة توأم الجاهزية", "ملف حاج ذكي يجمع الجاهزية الصحية والسلوكية والتنظيمية والرقمية.", Fingerprint],
  ["طبقة دمج الإشارات", "ساعة ذكية، موقع، ازدحام، حرارة، وتاريخ تنبيهات في سياق واحد.", Radio],
  ["طبقة تحليل السياق", "رفيق يستشعر مؤشرات الخطر مبكرًا ويقدّر مستوى الخطورة قبل تحولها إلى طارئ.", BrainCircuit],
  ["طبقة التصعيد الذكي", "لا تُنشأ الحالة إلا عند طلب المساعدة أو عدم الاستجابة للتحقق.", Stethoscope]
] as const;

const integrations = [
  ["التصاريح الرسمية المستقبلية", "تصور لتكامل مصرح به يربط هوية الرحلة وحالة التصريح دون تكرار تجربة الحجز.", Globe2],
  ["الصحة والطوارئ", "ملف صحي مختصر، حالة صحية، أدوية، وموقع حي عند الحاجة.", HeartPulse],
  ["الأمن وإدارة الحشود", "خرائط حرارية، مؤشرات ازدحام مبكرة، ومناطق خطر قابلة للتصعيد.", ShieldCheck],
  ["النقل والمسارات", "اقتراح مسارات آمنة حسب الكثافة، الوقت، وحالة الحاج.", Route]
] as const;

const pilotPhases = [
  ["01", "Prototype validation", "اختبار النموذج الأولي وتجربة رحلة عبدالله بمحاكاة بيانات."],
  ["02", "Usability testing", "اختبار وضوح واجهة الحاج والساعة ومركز العمليات."],
  ["03", "Small controlled field simulation", "محاكاة ميدانية صغيرة ومضبوطة بدون ادعاء تشغيل رسمي."],
  ["04", "Expert review", "مراجعة صحية وتشغيلية قبل أي تكامل."],
  ["05", "Risk-engine validation", "اختبار دقة الاستشعار المبكر وحدود التصعيد."],
  ["06", "Authorized integration planning", "تخطيط التكامل مع الجهات المخولة فقط."],
  ["07", "Limited pilot", "تجربة محدودة مع شركاء معتمدين بعد الموافقات."]
] as const;

const trustPrinciples = [
  ["موافقة واضحة", "الحاج يعرف ما الذي يجمعه رفيق ولماذا ومتى يستخدم."],
  ["أقل قدر من البيانات", "تُشارك البيانات الضرورية فقط مع الفرق المخولة."],
  ["صلاحيات حسب الدور", "تُعرض البيانات الشخصية فقط عند وجود صلاحية وحاجة تشغيلية."],
  ["سجل تدقيق", "كل وصول حساس للبيانات وتحديث للحالة قابل للمراجعة."],
  ["تحليلات مجهولة", "الذكاء التشغيلي يستخدم مؤشرات مجمعة لا تكشف هوية الأفراد."],
  ["إدارة الأذونات", "الحاج والجهة المخولة يتحكمان في نطاق الوصول حسب الحالة."]
] as const;

const missingFlow = [
  ["يبدو أنك ابتعدت عن مجموعتك", "تنبيه هادئ عندما يبتعد الحاج عن نقطة التجمع أو مسار المجموعة المحفوظ."],
  ["العودة إلى نقطة التجمع", "عرض الموقع الحالي، نقطة التجمع، كثافة الحشود، والمسار الآمن."],
  ["الاتصال أو مشاركة الموقع", "إرسال الموقع لمشرف المجموعة أو اختيار أنا بخير دون إنشاء حالة صحية."],
  ["حالة مساعدة", "عند طلب المساعدة أو عدم الاستجابة تُنشأ حالة مساعدة في العثور على المجموعة."]
] as const;

const responseRoute = [
  ["موقع عبدالله", abdullahProfile.location],
  ["موقع الفريق", "فرقة M-01 — نقطة وصول آمنة"],
  ["المسار المزدحم", "غير مفضل بسبب كثافة 84%"],
  ["أفضل مسار وصول", "220م → 150م → 70م → وصل الفريق"],
  ["تحديث تشغيلي", "تم تحديث المسار بسبب كثافة الحشود"]
] as const;

const operationalTimeline = [
  "18:41 تم رصد المؤشرات",
  "18:41 بدأ التحقق عبر الساعة",
  "18:42 لم تصل استجابة",
  "18:42 تم إنشاء الحالة",
  "18:43 تم إرسال الفريق",
  "18:44 تم تحديث المسار",
  "18:46 وصل الفريق",
  "18:48 تم تقديم المساعدة",
  "18:52 تم إغلاق الحالة وتحديث التوأم"
] as const;

const demoScenarios = {
  safe: {
    label: "عبدالله مستقر",
    location: abdullahProfile.location,
    heart: abdullahProfile.stable.heart,
    temp: abdullahProfile.stable.temp,
    crowd: abdullahProfile.stable.crowd,
    battery: abdullahProfile.stable.battery,
    baseRisk: 8,
    alert: "المؤشرات مستقرة. الساعة ترصد الإشارات ورفيق يتابع السياق.",
    action: "مرافقة هادئة"
  },
  heat: {
    label: "مؤشرات متوسطة",
    location: abdullahProfile.location,
    heart: abdullahProfile.medium.heart,
    temp: abdullahProfile.medium.temp,
    crowd: abdullahProfile.medium.crowd,
    battery: abdullahProfile.stable.battery,
    baseRisk: 38,
    alert: "بوادر ضيق تنفس محتملة. يبدأ رفيق التحقق عبر الساعة: هل أنت بخير؟",
    action: "تحقق عبر الساعة"
  },
  crowd: {
    label: "خطورة مرتفعة",
    location: abdullahProfile.location,
    heart: abdullahProfile.high.heart,
    temp: abdullahProfile.high.temp,
    crowd: abdullahProfile.high.crowd,
    battery: abdullahProfile.stable.battery,
    baseRisk: 62,
    alert: "لم تصل استجابة خلال 15 ثانية. تُنشأ حالة صحية ويُحسب أفضل مسار وصول.",
    action: "تصعيد ذكي"
  },
  missing: {
    label: "دعم التائهين",
    location: abdullahProfile.location,
    heart: abdullahProfile.stable.heart,
    temp: abdullahProfile.stable.temp,
    crowd: abdullahProfile.medium.crowd,
    battery: abdullahProfile.stable.battery,
    baseRisk: 32,
    alert: "يبدو أنك ابتعدت عن مجموعتك. يمكن العودة لنقطة التجمع أو مشاركة الموقع.",
    action: "حالة مساعدة في العثور على المجموعة"
  }
} as const;

const readinessQuestions = [
  {
    id: "route",
    prompt: "في المحاكاة الواقعية: ابتعد عبدالله عن مجموعته، ما التصرف الصحيح؟",
    options: [
      ["أفتح رفيق وأتبع نقطة التجمع المحفوظة", 20],
      ["أمشي عكس الحشود حتى أجد المخرج", 10],
      ["أنتظر دون إرسال موقعي", 3]
    ]
  },
  {
    id: "health",
    prompt: "قبل مسار الجمرات، كيف يستعد عبدالله مع وجود ربو خفيف؟",
    options: [
      ["أراجع التنبيه الصحي وأتأكد من حمل البخاخ", 20],
      ["أبدأ مباشرة وأرتاح عند التعب فقط", 12],
      ["أتجاهل التنبيهات لأنها عامة", 4]
    ]
  },
  {
    id: "qr",
    prompt: "ما فائدة QR الطوارئ؟",
    options: [
      ["يعرض للمسعف المعلومات الضرورية فقط عند الحاجة", 20],
      ["ينشر كل بياناتي لأي شخص", 2],
      ["يستخدم فقط لتسجيل الدخول", 8]
    ]
  },
  {
    id: "crowd",
    prompt: "إذا عرض رفيق مسارًا أقل كثافة؟",
    options: [
      ["أتبع أفضل مسار وصول/عودة وأبلغ المجموعة", 20],
      ["أكمل لأنني قريب من الوجهة", 8],
      ["أطفئ التنبيه لتجنب الإزعاج", 2]
    ]
  },
  {
    id: "watch",
    prompt: "عند ظهور سؤال الساعة: هل أنت بخير؟",
    options: [
      ["أختار أنا بخير أو أحتاج مساعدة خلال 15 ثانية", 10],
      ["أتجاهل التحقق دائمًا", 2],
      ["أخلع الساعة عند الازدحام", 1]
    ]
  }
] as const;

function getRiskTone(risk: number) {
  if (risk >= 75) return { label: "مرتفع", className: "danger", hint: "يتطلب تحققًا وتصعيدًا عند طلب المساعدة أو عدم الاستجابة" };
  if (risk >= 45) return { label: "متوسط", className: "warning", hint: "يوصى بتنبيه وقائي وتحقق عبر الساعة" };
  return { label: "منخفض", className: "safe", hint: "المؤشرات مستقرة مع متابعة اعتيادية" };
}

function IconBubble({ icon: Icon }: { icon: LucideIcon }) {
  return <span className="icon-bubble"><Icon size={19} strokeWidth={1.9} /></span>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-text">{text}</p>}
    </div>
  );
}

function ScoreRing({ value = 70, label = "يحتاج تهيئة إضافية" }: { value?: number; label?: string }) {
  return (
    <div className="score-ring" style={{ "--score": `${value * 3.6}deg` } as React.CSSProperties}>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function PhoneFrame({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`phone ${className}`}>
      <div className="phone-notch" />
      <div className="phone-status"><span>9:41</span><span><Wifi size={11} /> 5G</span></div>
      <div className="phone-content">
        <div className="phone-head"><span>{title}</span><Bell size={16} /></div>
        {children}
      </div>
      <div className="home-line" />
    </article>
  );
}

function PilgrimDashboard() {
  return (
    <PhoneFrame title="مرحبًا، عبدالله" className="phone-main">
      <div className="mobile-score">
        <div><small>توأم جاهزية عبدالله</small><strong>{abdullahProfile.readiness.general}%</strong><span>يحتاج تهيئة تنفسية ومسار أقل كثافة</span></div>
        <ScoreRing value={abdullahProfile.readiness.general} label="" />
      </div>
      <div className="mini-title"><span>التوأم الرقمي</span><em>متصل الآن</em></div>
      <div className="twin-card">
        <div className="avatar"><Fingerprint /></div>
        <div><b>حالتي مستقرة</b><small>آخر تحديث قبل دقيقة</small></div>
        <Activity size={21} />
      </div>
      <div className="metric-row">
        <div><HeartPulse size={17} /><b>{abdullahProfile.stable.heart}</b><small>نبضة</small></div>
        <div><Thermometer size={17} /><b>{abdullahProfile.stable.temp}°</b><small>الحرارة</small></div>
        <div><Route size={17} /><b>1.2</b><small>كم</small></div>
      </div>
      <div className="alert-safe"><ShieldCheck size={17} /><span>مسارك الحالي آمن ولا توجد تنبيهات</span></div>
      <button className="sos-button"><PhoneCall size={16} /> مساعدة طارئة</button>
    </PhoneFrame>
  );
}

function TrainingPhone() {
  return (
    <PhoneFrame title="التدريب الافتراضي">
      <div className="training-art">
        <img src="./rafeeq-logo.png" alt="هوية رفيق AI" />
        <span><Play size={18} fill="currentColor" /></span>
      </div>
      <small className="overline">سيناريو اليوم</small>
      <h4>محاكاة فقدان المجموعة في منى</h4>
      <p className="mobile-copy">تجربة واقعية تحاكي قرار العودة لنقطة التجمع ومشاركة الموقع دون إنشاء طارئ صحي.</p>
      <div className="progress"><i style={{ width: "72%" }} /></div>
      <div className="lesson-row"><b>3 من 5</b><span>72% مكتمل</span></div>
      <button className="mobile-primary">متابعة التدريب <ChevronLeft size={14} /></button>
    </PhoneFrame>
  );
}

function AlertPhone() {
  return (
    <PhoneFrame title="التنبيهات الذكية">
      <div className="alert-card urgent"><Thermometer /><div><b>تنبيه حرارة</b><small>مستوى الحرارة مرتفع في مسارك الحالي</small></div></div>
      <div className="alert-card"><UsersRound /><div><b>كثافة حشود مرتفعة</b><small>استخدم المسار البديل الأقل كثافة</small></div></div>
      <div className="route-card">
        <MapPin size={20} /><div><small>أفضل مسار وصول</small><b>منى — مسار بديل للجمرات</b></div>
      </div>
      <button className="mobile-primary">عرض المسار الآمن <Navigation size={14} /></button>
    </PhoneFrame>
  );
}

function WatchCard({ type }: { type: "health" | "sos" | "route" }) {
  const content = {
    health: <><HeartPulse size={31} /><small>معدل النبض</small><b>{abdullahProfile.stable.heart}</b><em>BPM</em></>,
    sos: <><PhoneCall size={31} /><b>SOS</b><small>اضغط 3 ثوانٍ</small></>,
    route: <><Navigation size={31} /><small>المسار الآمن</small><b>280 م</b><em>اتجه يسارًا</em></>
  }[type];
  return <div className={`watch ${type}`}><div className="watch-face">{content}</div></div>;
}

function CommandDashboard() {
  return (
    <div className="dashboard-frame">
      <div className="dash-top"><b><Radio size={17} /> مركز عمليات رفيق</b><span>محاكاة بيانات <i /></span></div>
      <div className="dash-body">
        <aside>
          <div className="dash-logo">R<span>AI</span></div>
          {["نظرة عامة", "الخريطة الحية", "الحالات", "الحشود", "الاستشعار المبكر"].map((x, i) => <div className={i === 0 ? "active" : ""} key={x}>{x}</div>)}
        </aside>
        <main>
          <div className="dash-title"><div><small>تصور للنموذج التشغيلي المستقبلي</small><h3>منصة العمليات المركزية</h3></div><button>سيناريو عبدالله</button></div>
          <div className="dash-tabs"><span>خريطة حية</span><span>البلاغات الطارئة</span><span>مراقبة الحشود</span><span>إحصاءات الجاهزية</span><span>الخرائط الحرارية</span></div>
          <div className="dash-stats">
            <div><UsersRound /><small>حالات محاكاة</small><b>128</b><em>بيانات غير حقيقية</em></div>
            <div><HeartPulse /><small>تنبيهات صحية</small><b>12</b><em className="warn">تحتاج تحقق</em></div>
            <div><CircleHelp /><small>حالات مساعدة</small><b>7</b><em>ليست طوارئ صحية</em></div>
            <div><Clock3 /><small>وصول متوقع</small><b>03:20</b><em>أفضل مسار وصول</em></div>
          </div>
          <div className="dash-grid">
            <div className="map-panel">
              <div className="panel-head"><b>الخريطة الحية</b><small>مكة المكرمة والمشاعر</small></div>
              <div className="map-bg">
                {[["24%", "36%"], ["54%", "28%"], ["67%", "61%"], ["38%", "70%"], ["78%", "43%"]].map(([l,t], i) => <span style={{ left: l, top: t }} className={`map-dot d${i}`} key={l}><i /></span>)}
                <strong className="map-label l1">منى</strong><strong className="map-label l2">المسجد الحرام</strong><strong className="map-label l3">عرفات</strong>
              </div>
            </div>
            <div className="prediction-panel">
              <div className="panel-head"><b>تفسيرات AI</b><BrainCircuit size={16} /></div>
              <div className="prediction warning"><i /><div><b>كثافة مرتفعة</b><small>منى — مسار الجمرات • تحديث تشغيلي</small></div></div>
              <div className="prediction"><i /><div><b>احتمال ضيق تنفس</b><small>{abdullahProfile.condition} • الدواء: {abdullahProfile.medication}</small></div></div>
              <div className="chart"><span style={{height:"35%"}} /><span style={{height:"44%"}} /><span style={{height:"52%"}} /><span style={{height:"68%"}} /><span style={{height:"58%"}} /><span style={{height:"79%"}} /><span style={{height:"64%"}} /></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function RafeeqLiveDemo() {
  const [scenarioKey, setScenarioKey] = useState<keyof typeof demoScenarios>("heat");
  const [answers, setAnswers] = useState<Record<string, number>>({ route: 20, health: 12, qr: 20, crowd: 8, watch: 10 });
  const [caseOpen, setCaseOpen] = useState(false);
  const scenario = demoScenarios[scenarioKey];

  const readiness = useMemo(() => {
    const total = readinessQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    return Math.round((total / 100) * 100);
  }, [answers]);

  const risk = useMemo(() => {
    const readinessPenalty = (100 - readiness) * 0.38;
    const heatPenalty = scenario.temp >= 38 ? 14 : 0;
    const crowdPenalty = scenario.crowd >= 75 ? 12 : 0;
    const batteryPenalty = scenario.battery < 45 ? 7 : 0;
    return Math.min(98, Math.max(4, Math.round(scenario.baseRisk + readinessPenalty + heatPenalty + crowdPenalty + batteryPenalty)));
  }, [readiness, scenario]);

  const riskTone = getRiskTone(risk);
  const responseEta = risk >= 75 ? "03:20" : risk >= 45 ? "متابعة" : "متابعة";
  const readinessLabel = readiness >= 85 ? "جاهز" : readiness >= 65 ? "يحتاج تهيئة" : "مخاطر جاهزية";

  return (
    <section className="live-demo section" id="demo">
      <div className="live-head">
        <SectionHeading eyebrow="نموذج أولي تفاعلي بمحاكاة بيانات" title="شاهد رحلة عبدالله من التهيئة إلى إغلاق الحالة" text="غيّر السيناريو وشاهد كيف يتغير توأم جاهزية الحاج™، مستوى الخطر، التحقق عبر الساعة، وأفضل مسار وصول للفريق في نفس اللحظة." />
        <div className="live-badge"><Radio /><span>محاكاة واقعية لا اختبار تقليدي</span></div>
      </div>

      <div className="scenario-tabs">
        {(Object.entries(demoScenarios) as Array<[keyof typeof demoScenarios, typeof scenario]>).map(([key, item]) => (
          <button key={key} className={scenarioKey === key ? "active" : ""} onClick={() => { setScenarioKey(key); setCaseOpen(false); }}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="demo-grid">
        <article className="demo-panel training-panel">
          <div className="demo-panel-head"><Play /><div><small>المحاكاة الواقعية</small><b>Pilgrim Readiness Twin™</b></div></div>
          <div className="demo-score">
            <ScoreRing value={readiness} label={readinessLabel} />
            <div><h3>{readiness}% {readinessLabel}</h3><p>كل إجابة تغيّر خطة الاستعداد وتؤثر مباشرة في حساب المخاطر أثناء الرحلة.</p></div>
          </div>
          <div className="question-list">
            {readinessQuestions.map((q) => (
              <div className="question-card" key={q.id}>
                <b>{q.prompt}</b>
                <div>
                  {q.options.map(([label, points]) => (
                    <button key={label} className={answers[q.id] === points ? "selected" : ""} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: points }))}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="demo-panel twin-panel">
          <div className="demo-panel-head"><Fingerprint /><div><small>Digital Twin</small><b>عبدالله محمد • ID 184-2931</b></div></div>
          <div className="live-status">
            <span className={`risk-pill ${riskTone.className}`}>الخطر {riskTone.label}</span>
            <strong>{risk}%</strong>
            <small>{riskTone.hint}</small>
          </div>
          <div className="vitals-grid">
            <span><HeartPulse /><b>{scenario.heart}</b><small>نبضة/دقيقة</small></span>
            <span><Thermometer /><b>{scenario.temp}°</b><small>حرارة الجسم</small></span>
            <span><UsersRound /><b>{scenario.crowd}%</b><small>كثافة الحشود</small></span>
            <span><Watch /><b>{scenario.battery}%</b><small>بطارية الساعة</small></span>
          </div>
          <div className="ai-advice"><BrainCircuit /><div><b>{scenario.action}</b><p>{scenario.alert}</p></div></div>
          <div className="location-strip"><MapPin /><span>{scenario.location}</span></div>
          <button className="raise-case" onClick={() => setCaseOpen(true)}><PhoneCall /> أحتاج مساعدة أو لا توجد استجابة</button>
        </article>

        <article className="demo-panel ops-panel">
          <div className="demo-panel-head"><Building2 /><div><small>Control Center</small><b>حالة العمليات الآن</b></div></div>
          <div className="ops-map">
            <span className={`ops-dot ${riskTone.className}`}><i /></span>
            <b>{scenario.location}</b>
            <small>آخر تحديث قبل 12 ثانية</small>
          </div>
          <div className="ops-stats">
            <span><small>زمن الاستجابة المتوقع</small><b>{responseEta}</b></span>
            <span><small>أقرب فريق</small><b>فرقة M-07</b></span>
            <span><small>درجة الجاهزية</small><b>{readiness}%</b></span>
          </div>
          <div className={`case-card ${caseOpen ? "open" : ""}`}>
            <Radio />
            <div>
              <b>{caseOpen ? "تم فتح البلاغ وإرساله للمسعف" : "لا توجد حالة مفتوحة"}</b>
              <p>{caseOpen ? "المسعف يستلم الملف الصحي المختصر والموقع الحي والتوصية الأولية." : "اضغط إنشاء حالة طوارئ لرؤية مسار الاستجابة."}</p>
            </div>
          </div>
          <div className="paramedic-mini">
            <div><Stethoscope /><span><small>Paramedic App</small><b>{caseOpen ? "Case #RA-2048" : "جاهز للاستقبال"}</b></span></div>
            <button disabled={!caseOpen}>{caseOpen ? "بدء الملاحة" : "بانتظار البلاغ"}</button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#"><span className="brand-orb"><img src="./rafeeq-logo.png" alt="شعار رفيق AI" /></span><b>رفيق <i>AI</i></b></a>
        <div className="nav-links"><a href="#solution">الحل</a><a href="./experience/">النظام التجريبي</a><a href="#demo">التجربة</a><a href="#how">كيف يعمل</a><a href="#readiness">الجاهزية</a><a href="#vision">الرؤية</a></div>
        <a href="#contact" className="nav-cta">تواصل معنا <ArrowLeft size={15} /></a>
        <button className="menu" aria-label="فتح القائمة"><Menu /></button>
      </nav>

      <section className="hero">
        <div className="hero-glow g1" /><div className="hero-glow g2" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <span className="hero-pill"><Sparkles size={14} /> نموذج أولي — تصور تشغيلي مستقبلي</span>
          <h1>التوأم الرقمي الذكي<br /><em>لرحلة أكثر استعدادًا وأمانًا</em></h1>
          <p>يبدأ رفيق قبل الحج بتهيئة ضيف الرحمن وبناء توأم جاهزيته، ثم يرافقه أثناء الرحلة لاستشعار مؤشرات الخطر مبكرًا، والتحقق من حالته، وربطه بالجهات والفرق الميدانية عند الحاجة.</p>
          <div className="hero-actions"><a href="./experience/" className="primary">شاهد رحلة عبدالله <ArrowLeft size={17} /></a><a href="#how" className="secondary"><Play size={15} /> اكتشف كيف يعمل رفيق</a></div>
          <div className="trust-row"><span><ShieldCheck /> خصوصية وصلاحيات</span><span><BrainCircuit /> Early Risk Sensing</span><span><Building2 /> GovTech Prototype</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .75, delay: .12 }}>
          <div className="hero-grid" />
          <PilgrimDashboard />
          <div className="float-card fc-health"><HeartPulse /><div><small>الحالة الصحية</small><b>{abdullahProfile.condition}</b></div></div>
          <div className="float-card fc-ai"><BrainCircuit /><div><small>تحليل AI</small><b>استشعار مبكر</b></div></div>
          <div className="float-card fc-score"><b>{abdullahProfile.readiness.general}%</b><small>توأم الجاهزية</small></div>
          <div className="hero-watch"><WatchCard type="health" /></div>
        </motion.div>
      </section>

      <section className="stats-strip">
        <div><b>قبل الرحلة</b><span>تهيئة وبناء توأم الجاهزية</span></div><i />
        <div><b>أثناء المناسك</b><span>مرافقة واستشعار مبكر</span></div><i />
        <div><b>بعد الحالة</b><span>تقرير وتحديث الذكاء التشغيلي</span></div>
      </section>

      <section className="problem section">
        <SectionHeading eyebrow="التحدي" title="سلامة الحاج تحتاج رؤية استباقية" text="الحلول التقليدية تبدأ غالبًا بعد وقوع المشكلة. رفيق يقرأ المؤشرات مبكرًا ويحوّل البيانات إلى تدخل ذكي في الوقت المناسب." />
        <div className="problem-cards">
          <article><span>01</span><HeartPulse /><h3>المخاطر الصحية</h3><p>تغيّرات صحية تحتاج إلى اكتشاف مبكر ومتابعة لحظية.</p></article>
          <article><span>02</span><UsersRound /><h3>كثافة الحشود</h3><p>تدفّقات متغيرة تتطلب توجيهًا مرنًا ومسارات أكثر أمانًا.</p></article>
          <article><span>03</span><Navigation /><h3>فقدان المسار</h3><p>بلاغات تائهين تحتاج إلى وصول أسرع وتنسيق أفضل.</p></article>
        </div>
      </section>

      <section className="research section">
        <SectionHeading eyebrow="بحث عميق" title="لماذا الآن؟ فرصة تشغيلية مبنية على الواقع" text="رفيق AI يستند إلى تحديات مثبتة في إدارة الحشود، الحرارة، الاستجابة الصحية، والمفقودين. لذلك صُممت المنصة كطبقة قرار واستباق، لا كتطبيق معلومات فقط." />
        <div className="research-grid">
          {researchInsights.map(([title, text, Icon]) => (
            <article key={title}>
              <IconBubble icon={Icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="solution section" id="solution">
        <div className="solution-visual"><div className="twin-orbit o1" /><div className="twin-orbit o2" /><Fingerprint size={104} /><span className="data-node n1">جاهزية <b>{abdullahProfile.readiness.general}%</b></span><span className="data-node n2">النبض <b>{abdullahProfile.stable.heart}</b></span><span className="data-node n3">الخطر <b>منخفض</b></span></div>
        <div><SectionHeading eyebrow="الحل" title="رفيق ليس تطبيق حج. إنه منصة توأم رقمي." text="تبدأ المنصة قبل انطلاق الرحلة، وتبني نسخة رقمية ذكية لكل حاج. تتعلم من الاستعداد والبيانات الصحية والسياق المكاني لتقدم توصيات فردية ودعمًا للجهات المختصة." />
        <div className="feature-checks">{["تحليل شخصي واستباقي", "قرارات مبنية على بيانات حية", "مساندة الحاج والجهات في منظومة واحدة"].map(x => <span key={x}><Check />{x}</span>)}</div></div>
      </section>

      <section className="operating-model section">
        <div className="model-copy">
          <SectionHeading eyebrow="نموذج التشغيل" title="خمس طبقات تصنع التوأم الرقمي للحاج" text="المنصة تفصل بين التدريب، الهوية الصحية، دمج الإشارات، قرار الذكاء الاصطناعي، والاستجابة الميدانية. هذا يجعلها قابلة للتجربة والتكامل والتوسع." />
          <a href="#contact" className="text-link">ناقش تجربة تشغيلية <ArrowLeft /></a>
        </div>
        <div className="layer-stack">
          {operatingLayers.map(([title, text, Icon], i) => (
            <article key={title} style={{ "--layer": i } as React.CSSProperties}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <IconBubble icon={Icon} />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <RafeeqLiveDemo />

      <section className="how section" id="how">
        <SectionHeading eyebrow="كيف تعمل المنصة؟" title="رحلة ذكية من الاستعداد إلى الاستجابة" text="سبع خطوات مترابطة تصنع تجربة أكثر أمانًا للحاج، وتمنح فرق الميدان صورة أوضح لاتخاذ القرار." />
        <div className="steps">{steps.map(([n, title, text, Icon]) => <article key={n}><small>{n}</small><IconBubble icon={Icon} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="readiness section" id="readiness">
        <div className="readiness-copy">
          <SectionHeading eyebrow="الميزة الفارقة" title="Pilgrim Readiness Twin™ | توأم جاهزية الحاج™" text="نموذج ديناميكي يجمع جاهزية الحاج الصحية والسلوكية والتنظيمية والرقمية، ويستخدمها لتخصيص التهيئة والتنبيهات وتحليل المخاطر أثناء الرحلة. درجة الجاهزية مجرد مقياس داخل التوأم." />
          <div className="score-legend"><span><i className="yellow" /> عبدالله 70% يحتاج تهيئة</span><span><i className="green" /> الطوارئ 90%</span><span><i className="red" /> الصحة 55%</span></div>
          <a href="#contact" className="text-link">استكشف تجربة التقييم <ArrowLeft /></a>
        </div>
        <div className="readiness-card">
          <div className="card-head"><b>تقييم جاهزية الحاج</b><span>تم التحديث اليوم</span></div>
          <div className="score-layout"><ScoreRing value={abdullahProfile.readiness.general} /><div><h3>عبدالله يحتاج تهيئة إضافية</h3><p>الجاهزية العامة 70%. رفيق يعزز الاستعداد التنفسي، حمل البخاخ، وفهم المسار الأقل كثافة قبل الحج.</p></div></div>
          <div className="skill-bars"><span><b>الاستعداد الصحي</b><i><em style={{width:"55%"}} /></i><strong>55%</strong></span><span><b>الحرارة</b><i><em style={{width:"65%"}} /></i><strong>65%</strong></span><span><b>الطوارئ</b><i><em style={{width:"90%"}} /></i><strong>90%</strong></span></div>
        </div>
      </section>

      <section className="difference section">
        <div className="difference-title"><p className="eyebrow">لماذا رفيق؟</p><h2>Why Rafeeq AI is Different?</h2><p>نقل تجربة الحاج من الاستجابة المتأخرة إلى الوقاية الذكية.</p></div>
        <div className="diff-list">{difference.map((x, i) => <div key={x}><span>0{i + 1}</span><b>{x}</b><Check /></div>)}</div>
      </section>

      <section className="research section">
        <SectionHeading eyebrow="دعم التائهين" title="Missing Pilgrim Assistance بدون تحويلها إلى طارئ صحي" text="عندما يبتعد عبدالله عن مسار المجموعة أو نقطة التجمع، يساعده رفيق على العودة بأمان أو مشاركة موقعه، ولا ينشئ حالة صحية إلا عند وجود مؤشرات أو طلب مساعدة." />
        <div className="research-grid">
          {missingFlow.map(([title, text], i) => (
            <article key={title}>
              <IconBubble icon={i === 0 ? Bell : i === 1 ? Navigation : i === 2 ? PhoneCall : CircleHelp} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="operating-model section">
        <div className="model-copy">
          <SectionHeading eyebrow="التحقق والتصعيد الذكي" title="الساعة ترصد الإشارات. رفيق يحلل السياق. ثم يتحقق ويصعّد عند الحاجة." text="الساعة لا تقرر الطوارئ وحدها. رفيق يجمع إشارات الساعة، توأم جاهزية الحاج™، الملف الصحي، الموقع، كثافة الحشود، الحرارة، الحركة، والتنفس. ثم يسأل: هل أنت بخير؟" />
          <div className="feature-checks">
            {["أنا بخير", "أحتاج مساعدة", "عد تنازلي 15 ثانية", "إنشاء الحالة فقط عند طلب المساعدة أو عدم الاستجابة"].map(x => <span key={x}><Check />{x}</span>)}
          </div>
        </div>
        <div className="layer-stack">
          {responseRoute.map(([title, text], i) => (
            <article key={title} style={{ "--layer": i } as React.CSSProperties}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <IconBubble icon={i < 2 ? MapPin : i === 2 ? UsersRound : Navigation} />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="app-showcase section">
        <SectionHeading eyebrow="تجربة الحاج" title="رفيق في يد الحاج، خطوة بخطوة" text="واجهات عربية أولًا، مصممة بوضوح وطمأنينة لرحلة يتغير سياقها باستمرار." />
        <div className="phones"><TrainingPhone /><PilgrimDashboard /><AlertPhone /></div>
        <div className="screen-tags">{["الترحيب", "التدريب الافتراضي", "درجة الجاهزية", "التوأم الرقمي", "الملف الصحي", "رمز الطوارئ QR", "التنبيهات", "SOS", "الإعدادات"].map(x => <span key={x}>{x}</span>)}</div>
        <div className="micro-screens">
          <article><Sparkles /><small>أهلًا بك في رفيق</small><b>رفيقك الذكي في رحلة آمنة</b><span>بدء التجربة</span></article>
          <article><HeartPulse /><small>الملف الصحي</small><b>بياناتك الأساسية مكتملة</b><span>عرض الملف</span></article>
          <article className="qr-screen"><QrCode /><small>رمز الطوارئ QR</small><b>بياناتك الطبية متاحة للمسعف</b><span>جاهز للمسح</span></article>
          <article className="sos-screen"><PhoneCall /><small>طلب مساعدة عاجلة</small><b>سنرسل موقعك للفريق المختص</b><span>اضغط باستمرار</span></article>
          <article><ShieldCheck /><small>الإعدادات والخصوصية</small><b>أنت تتحكم في بياناتك</b><span>إدارة الأذونات</span></article>
        </div>
      </section>

      <section className="wearables section">
        <div><SectionHeading eyebrow="رفيق على المعصم" title="تنبيهات سريعة. تحقق قبل التصعيد." text="واجهة ساعة ذكية تلتقط الإشارات المبكرة وتعرض سؤال التحقق قبل إنشاء الحالة: هل أنت بخير؟" /><div className="wearable-list">{["معدل النبض والحرارة", "هل أنت بخير؟", "أنا بخير / أحتاج مساعدة", "عد تنازلي 15 ثانية", "وضع البطارية المنخفضة"].map(x => <span key={x}><Check />{x}</span>)}</div></div>
        <div className="watches"><WatchCard type="health" /><WatchCard type="sos" /><WatchCard type="route" /></div>
      </section>

      <section className="flow section">
        <SectionHeading eyebrow="تدفق الاستجابة للطوارئ" title="من الإشارة الأولى إلى التدخل الميداني" text="كل ثانية مهمة. رفيق يربط الحاج، ومحرك الذكاء، وفرق العمليات، والمسعفين في مسار واحد واضح." />
        <div className="flowline">{flow.map(([title, Icon], i) => <div className="flow-item" key={title}><IconBubble icon={Icon} /><b>{title}</b>{i < flow.length - 1 && <ChevronLeft />}</div>)}</div>
      </section>

      <section className="integration section">
        <SectionHeading eyebrow="خريطة التكامل" title="رفيق طبقة ذكاء فوق منظومة الحج والعمرة" text="لا يعيد بناء ما هو موجود. يربط الاستعداد والتوأم الرقمي والاستجابة مع الجهات التي تملك القرار والتنفيذ." />
        <div className="integration-map">
          <div className="integration-core"><BrainCircuit /><b>Rafeeq AI Engine</b><span>Readiness • Twin • Risk • Response</span></div>
          {integrations.map(([title, text, Icon]) => (
            <article key={title}>
              <IconBubble icon={Icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="paramedic section">
        <div><SectionHeading eyebrow="تطبيق المسعف" title="المعلومة الصحيحة تصل قبل الفريق" text="واجهة ميدانية خفيفة تساعد المسعف على الوصول، الاطلاع على الملف الصحي، وتحديث الحالة بأقل عدد من الخطوات." />
          <div className="feature-checks two-col">{["حالة جديدة — أولوية مرتفعة", "الموقع الحي", "التاريخ الطبي", "المعلومات الطبية", "أفضل مسار وصول", "تحديث الحالة"].map(x => <span key={x}><Check />{x}</span>)}</div>
        </div>
        <div className="medic-mock">
          <div className="case-top"><span><Radio /> حالة طارئة واردة</span><b>02:18</b></div>
          <div className="patient"><div>ع</div><span><b>عبدالله محمد</b><small>رقم الحاج • 184-2931</small></span><em>عاجل</em></div>
          <div className="patient-stats"><span><HeartPulse /><b>{abdullahProfile.high.heart}</b><small>نبضة</small></span><span><Thermometer /><b>{abdullahProfile.high.temp}°</b><small>حرارة</small></span><span><MapPin /><b>220م</b><small>مسافة</small></span></div>
          <div className="medic-info"><b>معلومات طبية مهمة</b><p><strong>الحالة:</strong> {abdullahProfile.condition}</p><p><strong>الدواء:</strong> {abdullahProfile.medication}</p><p><strong>التوجيه:</strong> تقييم الحالة وفق البروتوكول الطبي المعتمد</p></div>
          <button><Navigation /> بدء الملاحة إلى الحالة</button>
        </div>
      </section>

      <section className="command section">
        <SectionHeading eyebrow="منصة العمليات" title="صورة موحدة لصناعة القرار" text="منصة تشغيلية تستقبل الحالات النشطة، تعرض تفسيرات AI وسياق الحشود، وتدعم إرسال الفرق عبر أفضل مسار وصول ضمن تصور للنموذج التشغيلي المستقبلي." />
        <CommandDashboard />
      </section>

      <section className="research section">
        <SectionHeading eyebrow="Operational Intelligence" title="من كل رحلة يتعلم رفيق. ومن كل حالة تتحسن الجاهزية والاستجابة." text="بعد إغلاق الحالة، يولد رفيق تقرير الحالة التشغيلي، يحدّث توأم جاهزية عبدالله، ويغذي تحليلات مجمعة مجهولة الهوية لتحسين التشغيل." />
        <div className="research-grid">
          {operationalTimeline.slice(0, 4).map((item) => (
            <article key={item}><IconBubble icon={Clock3} /><h3>{item}</h3><p>تُشارك البيانات التشغيلية الضرورية فقط مع المستخدمين المخولين.</p></article>
          ))}
        </div>
        <div className="feature-checks" style={{ marginTop: 24 }}>
          {["تم إغلاق الحالة", "تقرير الحالة التشغيلي", "تم تحديث توأم جاهزية عبدالله", "يحتاج تنبيهًا تنفسيًا أبكر", "يفضّل توجيهه لمسار أقل كثافة"].map(x => <span key={x}><Check />{x}</span>)}
        </div>
      </section>

      <section className="pilot section">
        <div className="pilot-head">
          <SectionHeading eyebrow="مقترح تجربة أولية" title="Pilot Proposal واقعي وقابل للمراجعة" text="لا يفترض رفيق وجود تجربة حكومية معتمدة. يتطلب الإطلاق الفعلي شراكات واعتمادات واختبارات صحية وتشغيلية." />
          <div className="pilot-kpis"><span><b>MVP</b> تحقق النموذج</span><span><b>QA</b> مراجعة خبراء</span><span><b>Pilot</b> شركاء معتمدون</span></div>
        </div>
        <div className="pilot-timeline">
          {pilotPhases.map(([n, title, text]) => (
            <article key={n}>
              <small>{n}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust section">
        <div>
          <SectionHeading eyebrow="الثقة والحوكمة" title="ذكاء اصطناعي يحترم خصوصية الحاج" text="سلامة الحاج لا تعني كشف بياناته بلا حدود. رفيق يبني الثقة من البداية عبر الموافقة، تقليل البيانات، الصلاحيات، والتدقيق." />
          <div className="trust-note"><ShieldCheck /><span>تصور للحوكمة والخصوصية في المنتج المستقبلي. لا يدّعي المشروع امتثالًا قانونيًا مكتملًا أو اعتمادًا رسميًا قبل الشراكات والاختبارات.</span></div>
        </div>
        <div className="trust-grid">
          {trustPrinciples.map(([title, text]) => (
            <article key={title}><Check /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="vision section" id="vision">
        <SectionHeading eyebrow="المستقبل" title="منصة وطنية تتوسع مع كل رحلة" text="رفيق AI يبني أساسًا قابلًا للتكامل والنمو، ويدعم مستهدفات برنامج خدمة ضيوف الرحمن ضمن رؤية السعودية 2030." />
        <div className="vision-grid">{future.map(([x, Icon]) => <article key={x}><IconBubble icon={Icon} /><h3>{x}</h3><ArrowLeft /></article>)}</div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-orb" />
        <p className="eyebrow">ابدأ الحوار</p><h2>نبني مستقبلًا أكثر أمانًا<br />لضيوف الرحمن.</h2>
        <p>للتعاون مع الجهات، وبرامج الابتكار، والشراكات الاستراتيجية.</p>
        <a href="mailto:hello@rafeeq.ai">تواصل مع رفيق AI <ArrowLeft /></a>
      </section>

      <footer className="site-footer">
        <div className="footer-glow" />
        <div className="footer-inner">
          <div className="footer-intro">
            <a className="brand footer-brand" href="#"><span className="brand-orb"><img src="./rafeeq-logo.png" alt="شعار رفيق AI" /></span><b>رفيق <i>AI</i></b></a>
            <p className="eyebrow">تواصل معنا</p>
            <h2>نبقى على تواصل،<br /><em>ونبني الأثر معًا.</em></h2>
            <p>تابع رحلة رفيق AI، وتعرّف أكثر على المشروع والمؤسسة مريم الحربي.</p>
          </div>
          <div className="footer-links">
            <a href="https://x.com/Rafeeq_AI" target="_blank" rel="noopener noreferrer" aria-label="Rafeeq AI Official on X">
              <span className="social-icon x-icon">X</span>
              <span><small>الحساب الرسمي على X</small><b>Rafeeq AI Official</b></span>
              <ExternalLink />
            </a>
            <a href="https://x.com/MiraVibesX" target="_blank" rel="noopener noreferrer" aria-label="Mariam Alharbi on X">
              <span className="social-icon x-icon">X</span>
              <span><small>حساب المؤسسة على X</small><b>Mariam Alharbi</b></span>
              <ExternalLink />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <small>© 2026 Rafeeq AI — Founded by Mariam Alharbi</small>
          <span>التوأم الرقمي الذكي لضيوف الرحمن</span>
        </div>
      </footer>
    </main>
  );
}
