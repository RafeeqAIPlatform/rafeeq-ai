export type ScenarioKey = "safe" | "heat" | "crowd" | "missing";
export type CaseStatus = "new" | "acknowledged" | "dispatched" | "closed";
export type CaseType = "health" | "crowd" | "missing" | "sos";

export type Scenario = {
  key: ScenarioKey;
  label: string;
  location: string;
  heart: number;
  temp: number;
  crowd: number;
  battery: number;
  movement: string;
  breathing: string;
  baseRisk: number;
  caseType: CaseType;
  alert: string;
  action: string;
};

export type ReadinessAnswer = Record<string, number>;

export type EmergencyCase = {
  id: string;
  type: CaseType;
  status: CaseStatus;
  pilgrimName: string;
  pilgrimId: string;
  location: string;
  risk: number;
  readiness: number;
  heart: number;
  temp: number;
  crowd: number;
  createdAt: string;
  eta: string;
  assignedTeam: string;
  notes: string[];
};

export const abdullahProfile = {
  name: "عبدالله محمد",
  age: 58,
  journey: "Hajj",
  experience: "First-time pilgrim",
  condition: "ربو خفيف",
  medication: "بخاخ",
  location: "منى — مسار الجمرات",
  pilgrimId: "184-2931",
  readiness: {
    general: 70,
    health: 55,
    heat: 65,
    crowd: 72,
    route: 70,
    emergency: 90,
    digital: 88,
    ritual: 78
  },
  respiratoryRisk: "متوسط",
  stable: {
    heart: 88,
    temp: 37.1,
    crowd: 58,
    movement: "طبيعي",
    breathing: "طبيعي",
    battery: 76,
    risk: "منخفض"
  },
  medium: {
    heart: 108,
    temp: 37.8,
    crowd: 76,
    movement: "بطيء",
    breathing: "مجهد",
    risk: "متوسط"
  },
  high: {
    heart: 126,
    temp: 38.4,
    crowd: 84,
    movement: "متوقف",
    breathing: "غير منتظم",
    risk: "مرتفع"
  }
} as const;

export const scenarios: Record<ScenarioKey, Scenario> = {
  safe: {
    key: "safe",
    label: "عبدالله مستقر",
    location: abdullahProfile.location,
    heart: abdullahProfile.stable.heart,
    temp: abdullahProfile.stable.temp,
    crowd: abdullahProfile.stable.crowd,
    battery: abdullahProfile.stable.battery,
    movement: abdullahProfile.stable.movement,
    breathing: abdullahProfile.stable.breathing,
    baseRisk: 8,
    caseType: "sos",
    alert: "المؤشرات مستقرة. الساعة ترصد الإشارات ورفيق يتابع السياق دون تصعيد.",
    action: "مرافقة هادئة"
  },
  heat: {
    key: "heat",
    label: "مؤشرات متوسطة",
    location: abdullahProfile.location,
    heart: abdullahProfile.medium.heart,
    temp: abdullahProfile.medium.temp,
    crowd: abdullahProfile.medium.crowd,
    battery: abdullahProfile.stable.battery,
    movement: abdullahProfile.medium.movement,
    breathing: abdullahProfile.medium.breathing,
    baseRisk: 38,
    caseType: "health",
    alert: "بوادر ضيق تنفس محتملة. يبدأ رفيق التحقق عبر الساعة قبل إنشاء الحالة.",
    action: "تحقق عبر الساعة"
  },
  crowd: {
    key: "crowd",
    label: "خطورة مرتفعة",
    location: abdullahProfile.location,
    heart: abdullahProfile.high.heart,
    temp: abdullahProfile.high.temp,
    crowd: abdullahProfile.high.crowd,
    battery: abdullahProfile.stable.battery,
    movement: abdullahProfile.high.movement,
    breathing: abdullahProfile.high.breathing,
    baseRisk: 62,
    caseType: "health",
    alert: "لا توجد استجابة خلال 15 ثانية. إنشاء حالة صحية مع أفضل مسار وصول للفريق.",
    action: "تصعيد ذكي"
  },
  missing: {
    key: "missing",
    label: "دعم التائهين",
    location: abdullahProfile.location,
    heart: abdullahProfile.stable.heart,
    temp: abdullahProfile.stable.temp,
    crowd: abdullahProfile.medium.crowd,
    battery: abdullahProfile.stable.battery,
    movement: "ابتعاد عن المسار",
    breathing: abdullahProfile.stable.breathing,
    baseRisk: 32,
    caseType: "missing",
    alert: "يبدو أنك ابتعدت عن مجموعتك. اعرض المسار الآمن أو شارك موقعك مع مشرف المجموعة.",
    action: "حالة مساعدة في العثور على المجموعة"
  }
};

export const readinessQuestions = [
  {
    id: "route",
    prompt: "في المحاكاة الواقعية: ابتعد عبدالله عن مجموعته، ما التصرف الصحيح؟",
    options: [
      ["أفتح رفيق وأتبع نقطة التجمع المحفوظة", 20],
      ["أمشي عكس الحشود حتى أجد المخرج", 10],
      ["أنتظر دون مشاركة موقعي", 3]
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
    prompt: "ما دور QR الطوارئ؟",
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

export const defaultAnswers: ReadinessAnswer = {
  route: 20,
  health: 12,
  qr: 20,
  crowd: 8,
  watch: 10
};

export function calculateReadiness(answers: ReadinessAnswer) {
  const total = readinessQuestions.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0);
  return Math.max(0, Math.min(100, Math.round(total)));
}

export function calculateRisk(scenario: Scenario, readiness: number) {
  const readinessPenalty = (100 - readiness) * 0.38;
  const breathingPenalty = scenario.breathing === "غير منتظم" ? 16 : scenario.breathing === "مجهد" ? 8 : 0;
  const crowdPenalty = scenario.crowd >= 80 ? 14 : scenario.crowd >= 75 ? 8 : 0;
  const batteryPenalty = scenario.battery < 45 ? 7 : 0;
  return Math.min(98, Math.max(4, Math.round(scenario.baseRisk + readinessPenalty + breathingPenalty + crowdPenalty + batteryPenalty)));
}

export function getRiskTone(risk: number) {
  if (risk >= 75) return { label: "مرتفع", className: "danger", hint: "يتطلب تحققًا وتصعيدًا عند طلب المساعدة أو عدم الاستجابة" };
  if (risk >= 45) return { label: "متوسط", className: "warning", hint: "يوصى بتنبيه وقائي وتحقق عبر الساعة" };
  return { label: "منخفض", className: "safe", hint: "المؤشرات مستقرة مع متابعة اعتيادية" };
}

export function getResponseEta(risk: number) {
  if (risk >= 75) return "03:20";
  if (risk >= 45) return "متابعة";
  return "متابعة";
}

export function createEmergencyCase(scenario: Scenario, readiness: number, now = new Date()): EmergencyCase {
  const risk = calculateRisk(scenario, readiness);
  return {
    id: `RA-${now.getTime().toString().slice(-6)}`,
    type: scenario.caseType,
    status: "new",
    pilgrimName: abdullahProfile.name,
    pilgrimId: abdullahProfile.pilgrimId,
    location: scenario.location,
    risk,
    readiness,
    heart: scenario.heart,
    temp: scenario.temp,
    crowd: scenario.crowd,
    createdAt: now.toISOString(),
    eta: getResponseEta(risk),
    assignedTeam: risk >= 75 ? "فرقة M-01" : "فرقة M-07",
    notes: [
      `18:41 تم رصد المؤشرات: ${scenario.alert}`,
      "18:41 بدأ التحقق عبر الساعة: هل أنت بخير؟",
      scenario.caseType === "missing"
        ? "18:42 تم إنشاء حالة مساعدة في العثور على المجموعة"
        : "18:42 لم تصل استجابة، تم إنشاء حالة طارئة صحية",
      "18:43 تم إرسال الفريق عبر أفضل مسار وصول",
      "18:44 تم تحديث المسار بسبب كثافة الحشود"
    ]
  };
}

export function nextCaseStatus(status: CaseStatus): CaseStatus {
  if (status === "new") return "acknowledged";
  if (status === "acknowledged") return "dispatched";
  if (status === "dispatched") return "closed";
  return "closed";
}

export function statusLabel(status: CaseStatus) {
  return {
    new: "حالة جديدة",
    acknowledged: "تم قبول الحالة",
    dispatched: "الفريق في الطريق",
    closed: "تم إغلاق الحالة"
  }[status];
}
