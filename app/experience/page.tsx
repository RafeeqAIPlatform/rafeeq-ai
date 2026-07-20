"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bell,
  BrainCircuit,
  Building2,
  Clock3,
  Download,
  Fingerprint,
  HeartPulse,
  MapPin,
  Navigation,
  PhoneCall,
  Play,
  Radio,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  UsersRound,
  Watch
} from "lucide-react";
import {
  abdullahProfile,
  calculateReadiness,
  calculateRisk,
  createEmergencyCase,
  defaultAnswers,
  getResponseEta,
  getRiskTone,
  nextCaseStatus,
  readinessQuestions,
  scenarios,
  statusLabel,
  type EmergencyCase,
  type ReadinessAnswer,
  type ScenarioKey
} from "../../lib/rafeeq-engine";

type Role = "pilgrim" | "control" | "paramedic";

const storageKey = "rafeeq-ai-working-demo";

function loadState() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) as { answers: ReadinessAnswer; cases: EmergencyCase[]; scenarioKey: ScenarioKey } : null;
  } catch {
    return null;
  }
}

export default function ExperiencePage() {
  const [role, setRole] = useState<Role>("pilgrim");
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>("heat");
  const [answers, setAnswers] = useState<ReadinessAnswer>(defaultAnswers);
  const [cases, setCases] = useState<EmergencyCase[]>([]);
  const [clock, setClock] = useState<string>("--:--");

  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      setAnswers(loaded.answers ?? defaultAnswers);
      setCases(loaded.cases ?? []);
      setScenarioKey(loaded.scenarioKey ?? "heat");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify({ answers, cases, scenarioKey }));
  }, [answers, cases, scenarioKey]);

  useEffect(() => {
    const updateClock = () => setClock(new Date().toLocaleTimeString("ar-SA"));
    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  const scenario = scenarios[scenarioKey];
  const readiness = useMemo(() => calculateReadiness(answers), [answers]);
  const risk = useMemo(() => calculateRisk(scenario, readiness), [scenario, readiness]);
  const riskTone = getRiskTone(risk);
  const openCases = cases.filter((item) => item.status !== "closed");
  const activeCase = openCases[0] ?? cases[0];

  function raiseCase() {
    const next = createEmergencyCase(scenario, readiness);
    setCases((current) => [next, ...current].slice(0, 10));
    setRole("control");
  }

  function advanceCase(id: string) {
    setCases((current) => current.map((item) => {
      if (item.id !== id) return item;
      const status = nextCaseStatus(item.status);
      return {
        ...item,
        status,
        notes: [`${statusLabel(status)} • ${new Date().toLocaleTimeString("ar-SA")}`, ...item.notes]
      };
    }));
  }

  function clearDemo() {
    setAnswers(defaultAnswers);
    setCases([]);
    setScenarioKey("heat");
    setRole("pilgrim");
  }

  function exportCases() {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), cases }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rafeeq-ai-cases.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="experience-shell">
      <nav className="experience-nav">
        <Link className="brand" href="/"><span className="brand-orb"><img src="../rafeeq-logo.png" alt="شعار رفيق AI" /></span><b>رفيق <i>AI</i></b></Link>
        <div>
          <span><Radio /> تجربة تشغيلية مباشرة</span>
          <small>{clock}</small>
        </div>
        <Link className="back-link" href="/"><ArrowLeft /> العودة للصفحة الرئيسية</Link>
      </nav>

      <header className="experience-hero">
        <div>
          <p className="eyebrow">Working MVP</p>
          <h1>نموذج أولي تفاعلي بمحاكاة بيانات لرحلة عبدالله</h1>
          <p>الساعة ترصد الإشارات. رفيق يحلل السياق. ثم يتحقق ويصعّد عند الحاجة. جرّبي المؤشرات، تابعي التحقق عبر الساعة، ثم شاهدي مركز العمليات وتطبيق المسعف.</p>
        </div>
        <div className="experience-actions">
          <button onClick={() => setRole("pilgrim")}><PhoneCall /> ابدأ التحقق من واجهة الحاج</button>
          <button onClick={exportCases} disabled={cases.length === 0}><Download /> تصدير الحالات</button>
          <button onClick={clearDemo}>إعادة ضبط</button>
        </div>
      </header>

      <section className="role-tabs" aria-label="أدوار النظام">
        {[
          ["pilgrim", "واجهة الحاج", Fingerprint],
          ["control", "مركز العمليات", Building2],
          ["paramedic", "تطبيق المسعف", Stethoscope]
        ].map(([key, label, Icon]) => (
          <button key={key as string} className={role === key ? "active" : ""} onClick={() => setRole(key as Role)}>
            <Icon /> {label as string}
          </button>
        ))}
      </section>

      <section className="experience-metrics">
        <article><UsersRound /><small>حالات مفتوحة</small><b>{openCases.length}</b></article>
        <article><ShieldCheck /><small>توأم جاهزية عبدالله</small><b>{readiness}%</b></article>
        <article><Activity /><small>مؤشر الخطر</small><b>{risk}%</b></article>
        <article><Clock3 /><small>الاستجابة المتوقعة</small><b>{getResponseEta(risk)}</b></article>
      </section>

      {role === "pilgrim" && (
        <section className="experience-grid pilgrim-view">
          <article className="system-card">
            <div className="system-card-head"><Play /><div><small>تهيئة ضيف الرحمن</small><h2>توأم جاهزية الحاج™</h2></div></div>
            <div className="experience-score" style={{ "--score": `${readiness * 3.6}deg` } as React.CSSProperties}>
              <strong>{readiness}%</strong>
              <span>{readiness >= 85 ? "جاهز" : readiness >= 65 ? "يحتاج تدريب" : "مخاطر جاهزية"}</span>
            </div>
            <div className="experience-questions">
              {readinessQuestions.map((question) => (
                <div key={question.id}>
                  <b>{question.prompt}</b>
                  {question.options.map(([label, points]) => (
                    <button key={label} className={answers[question.id] === points ? "selected" : ""} onClick={() => setAnswers((current) => ({ ...current, [question.id]: points }))}>
                      {label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </article>

          <article className="system-card twin-live-card">
            <div className="system-card-head"><BrainCircuit /><div><small>التوأم الرقمي</small><h2>{abdullahProfile.name} • {abdullahProfile.age} عامًا</h2></div></div>
            <div className="scenario-switch">
              {(Object.keys(scenarios) as ScenarioKey[]).map((key) => <button key={key} className={scenarioKey === key ? "active" : ""} onClick={() => setScenarioKey(key)}>{scenarios[key].label}</button>)}
            </div>
            <div className="risk-reading">
              <span className={`risk-pill ${riskTone.className}`}>الخطر {riskTone.label}</span>
              <b>{risk}%</b>
              <small>{riskTone.hint}</small>
            </div>
            <div className="twin-vitals">
              <span><HeartPulse /><b>{scenario.heart}</b><small>نبضة</small></span>
              <span><Thermometer /><b>{scenario.temp}°</b><small>حرارة</small></span>
              <span><UsersRound /><b>{scenario.crowd}%</b><small>ازدحام</small></span>
              <span><Watch /><b>{scenario.battery}%</b><small>بطارية</small></span>
            </div>
            <div className="ai-recommendation"><Bell /><div><b>{scenario.action}</b><p>{scenario.alert}</p></div></div>
            <div className="medical-brief">
              <b>تحقق الساعة</b>
              <p>هل أنت بخير؟ <strong>أنا بخير</strong> / <strong>أحتاج مساعدة</strong> — عد تنازلي 15 ثانية.</p>
            </div>
            <button className="primary-action" onClick={raiseCase}><PhoneCall /> أحتاج مساعدة أو لا توجد استجابة</button>
          </article>
        </section>
      )}

      {role === "control" && (
        <section className="experience-grid control-view">
          <article className="system-card ops-board">
            <div className="system-card-head"><Building2 /><div><small>تصور للنموذج التشغيلي المستقبلي</small><h2>منصة العمليات</h2></div></div>
            <div className="ops-live-map">
              <span className={`ops-dot ${riskTone.className}`}><i /></span>
              <b>{scenario.location}</b>
              <small>{scenario.alert}</small>
            </div>
            <div className="prediction-list">
              <div><BrainCircuit /><span><b>توصية AI</b><small>{scenario.action}</small></span></div>
              <div><Navigation /><span><b>أفضل مسار وصول</b><small>يفضل المسار البديل بسبب كثافة الحشود، ETA {getResponseEta(risk)}</small></span></div>
              <div><MapPin /><span><b>الموقع الحي</b><small>{scenario.location}</small></span></div>
              <div><ShieldCheck /><span><b>ملخص التوأم</b><small>{abdullahProfile.condition} • الدواء: {abdullahProfile.medication} • جاهزية {abdullahProfile.readiness.general}%</small></span></div>
            </div>
          </article>

          <article className="system-card cases-board">
            <div className="system-card-head"><Radio /><div><small>Case Queue</small><h2>سجل البلاغات</h2></div></div>
            {cases.length === 0 ? <p className="empty-state">لا توجد بلاغات بعد. تُنشأ الحالة فقط عند اختيار "أحتاج مساعدة" أو انتهاء 15 ثانية دون استجابة.</p> : (
              <div className="case-list">
                {cases.map((item) => (
                  <div className="case-row" key={item.id}>
                    <span className={`risk-pill ${getRiskTone(item.risk).className}`}>{statusLabel(item.status)}</span>
                    <b>{item.id} • {item.location}</b>
                    <small>خطر {item.risk}% • جاهزية {item.readiness}% • {item.assignedTeam} • أفضل مسار وصول</small>
                    <button onClick={() => advanceCase(item.id)} disabled={item.status === "closed"}>{item.status === "closed" ? "مغلقة" : "تحديث الحالة"}</button>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>
      )}

      {role === "paramedic" && (
        <section className="experience-grid paramedic-view">
          <article className="system-card medic-case">
            <div className="system-card-head"><Stethoscope /><div><small>Paramedic App</small><h2>{activeCase ? `حالة ${activeCase.id}` : "لا توجد حالة"}</h2></div></div>
            {activeCase ? (
              <>
                <div className="patient-summary">
                  <div>ع</div>
                  <span><b>{activeCase.pilgrimName}</b><small>{abdullahProfile.age} عامًا • رقم الحاج {activeCase.pilgrimId}</small></span>
                  <em>{statusLabel(activeCase.status)}</em>
                </div>
                <div className="twin-vitals">
                  <span><HeartPulse /><b>{activeCase.heart}</b><small>نبضة</small></span>
                  <span><Thermometer /><b>{activeCase.temp}°</b><small>حرارة</small></span>
                  <span><UsersRound /><b>{activeCase.crowd}%</b><small>ازدحام</small></span>
                  <span><ShieldCheck /><b>{activeCase.readiness}%</b><small>جاهزية</small></span>
                </div>
                <div className="medical-brief">
                  <b>ملف صحي مختصر</b>
                  <p><strong>الحالة:</strong> {abdullahProfile.condition}</p>
                  <p><strong>الدواء:</strong> {abdullahProfile.medication}</p>
                  <p><strong>الموقع:</strong> {abdullahProfile.location}</p>
                  <p><strong>التوجيه:</strong> تقييم الحالة وفق البروتوكول الطبي المعتمد.</p>
                  <p><strong>ملاحظات AI:</strong> {activeCase.notes[0]}</p>
                </div>
                <button className="primary-action" onClick={() => advanceCase(activeCase.id)} disabled={activeCase.status === "closed"}>
                  <Navigation /> {activeCase.status === "closed" ? "تم إغلاق الحالة" : "تحديث وبدء الملاحة"}
                </button>
              </>
            ) : <p className="empty-state">لا توجد حالة مفتوحة. ابدأ التحقق من واجهة الحاج، ثم تُنشأ الحالة عند طلب المساعدة أو عدم الاستجابة.</p>}
          </article>

          <article className="system-card audit-card">
            <div className="system-card-head"><ShieldCheck /><div><small>Audit Trail</small><h2>سجل الوصول والتحديث</h2></div></div>
            <div className="audit-list">
              {(activeCase?.notes ?? ["لم يتم فتح أي حالة بعد"]).map((note) => <span key={note}>{note}</span>)}
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
