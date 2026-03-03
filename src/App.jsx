import { useState, useRef } from "react";

const HA = [
  { id: 1, area: "Sleep Quality", icon: "🌙", emo: "😴", desc: "นอนน้อยกว่า 6-7 ชม. หรือตื่นมาแล้วรู้สึกสมองไม่สดชื่น (Brain Fog)", tip: "การนอนหลับคุณภาพดี = ล้างของเสียในสมอง" },
  { id: 2, area: "Stress", icon: "🧘", emo: "🤯", desc: "วิตกกังวล หรือจดจ่ออยู่กับเรื่องแย่ๆ เกิน 30 นาที/วัน จนสงบใจไม่ได้", tip: "ความเครียดเรื้อรังทำลาย Hippocampus" },
  { id: 3, area: "Nutrition", icon: "🥗", emo: "🥦", desc: "ทานแป้งขัดขาว/น้ำตาล/ของทอดบ่อย แต่ทานผักใบเขียวหรือไขมันดีน้อย", tip: "สมองใช้พลังงาน 20% ของร่างกาย!" },
  { id: 4, area: "Exercise", icon: "🏃", emo: "🏋️", desc: "นั่งติดที่นานเกิน 4 ชม./วัน หรือออกกำลังกายคาร์ดิโอน้อย", tip: "ออกกำลังกาย = กระตุ้น BDNF บำรุงสมอง" },
  { id: 5, area: "Metabolic", icon: "⚖️", emo: "⚖️", desc: "มีไขมันสะสมที่หน้าท้อง หรือค่าน้ำตาล/ไขมันในเลือดเริ่มสูง", tip: "ไขมันหน้าท้องเพิ่มความเสี่ยงสมองเสื่อม 3x" },
  { id: 6, area: "Circadian", icon: "☀️", emo: "🌅", desc: "ฝืนทำงานยากตอนง่วง นอนดึกตื่นเช้า (Social Jetlag)", tip: "แสงแดดเช้า 15 นาที = ตั้งนาฬิกาสมองใหม่" },
  { id: 7, area: "Digital", icon: "📱", emo: "📵", desc: "เล่นมือถือก่อนนอน/หลังตื่นทันที หรือ Multitask จนสมาธิสั้น", tip: "Multitasking ลดประสิทธิภาพสมอง 40%" },
  { id: 8, area: "Cognitive", icon: "🧩", emo: "🧠", desc: "ทำแต่งานรูทีนเดิมๆ ไม่ได้เรียนรู้ทักษะใหม่มานาน", tip: "เรียนรู้สิ่งใหม่ = สร้างโครงข่ายประสาทสำรอง" },
  { id: 9, area: "Social", icon: "👥", emo: "🤝", desc: "รู้สึกโดดเดี่ยว ไม่ค่อยคุยกับใคร ความสัมพันธ์ตึงเครียด", tip: "ความโดดเดี่ยวเพิ่มความเสี่ยงอัลไซเมอร์ 50%" },
  { id: 10, area: "Toxin", icon: "🌿", emo: "🏭", desc: "ดื่มแอลกอฮอล์/สูบบุหรี่บ่อย รับ PM 2.5 ดื่มน้ำน้อยกว่า 1.5 ลิตร", tip: "PM 2.5 ผ่านเข้าสมองได้โดยตรง" },
  { id: 11, area: "Mental", icon: "💆", emo: "🌈", desc: "รู้สึกหมดไฟ (Burnout) อารมณ์แปรปรวนดิ่งง่าย", tip: "จิตใจดี = สมองแข็งแรง" },
];

const CHR = [
  { id: "lion", name: "สิงโต", emoji: "🦁", desc: "ตื่นเช้า พลังเต็มตอนเช้า", color: "#F59E0B" },
  { id: "bear", name: "หมี", emoji: "🐻", desc: "ตามแสงแดด นอนหลับง่าย", color: "#8B5CF6" },
  { id: "wolf", name: "หมาป่า", emoji: "🐺", desc: "พลังเต็มตอนเย็น-ค่ำ", color: "#3B82F6" },
  { id: "dolphin", name: "โลมา", emoji: "🐬", desc: "หลับยาก ตื่นตัวง่าย", color: "#06B6D4" },
];

const GENS = [
  { id: "genz", label: "Gen Z", range: "18-28 ปี", focus: "เน้น Digital Overload และสมาธิ", fe: "Brain Prime & Optimization" },
  { id: "geny", label: "Gen Y", range: "29-44 ปี", focus: "เน้นความเครียดสะสมและจัดการเวลา", fe: "Stress Resilience & Sustainability" },
  { id: "genx", label: "Gen X", range: "45-60 ปี", focus: "เน้นเผาผลาญและป้องกันสมองเสื่อม", fe: "Neuro-Maintenance & Longevity" },
];

const PL = {
  genz: { ga: { t: "THE BRAIN MASTER", k: "สมองคุณอยู่ในสภาวะ Flow State ได้ง่าย จงรักษาไว้ด้วย Focused Meditation และ Brain Superfoods (Blueberries, Walnuts)", p: "แนะนำ Bio-Hacking Analysis เพื่อดูวิตามินและแร่ธาตุที่ช่วยส่งเสริมสารสื่อประสาท" }, bc: "เน้น Sleep Analysis และ IV Drip" },
  geny: { ga: { t: "THE HIGH PERFORMER", k: "คุณบริหารนาฬิกาชีวิต (Chronotype) และความเครียดได้ดี! จงรักษา Neuroplasticity โดยเรียนรู้ทักษะที่ไม่ถนัด (Cross-Training)", p: "แนะนำ Stress & Cortisol Balance เช็กว่าร่างกายสะสมความเครียดแฝงหรือไม่ ป้องกัน Burnout" }, bc: "เน้น Digital Detox และสมาธิ" },
  genx: { ga: { t: "THE AGELESS BRAIN", k: "ยินดีด้วย! อายุสมองอ่อนเยาว์กว่าค่าเฉลี่ย เคล็ดลับ = รักษา Metabolic Health + IF หรือ Weight Training กระตุ้น BDNF", p: "แนะนำ Longevity & Anti-Aging Screening ตรวจสารต้านอนุมูลอิสระและ Telomere วางแผนให้สมอง Young ถึง 80-90 ปี" }, bc: "เน้น Functional Medicine และน้ำตาลในเลือด" },
};

const F = "'Prompt','Noto Sans Thai',sans-serif";

// ===== Google Sheets URL =====
// วาง URL จาก Apps Script Web App ที่นี่
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxKfR_nd9SskBFvTojekbhZ8VCB0gppPS5ewY-Wh4SrINSjvGqSdOOBOp88au_qywnmZg/exec";

function getColor(v) {
  if (v >= 75) return "#10B981";
  if (v >= 40) return "#F59E0B";
  return "#EF4444";
}

function getLabel(v) {
  if (v >= 75) return "ดี";
  if (v >= 40) return "เฝ้าระวัง";
  return "ควรปรับปรุง";
}

function RadarChart({ answers }) {
  const cx = 200, cy = 200, mr = 90, n = 11;
  const a2 = (2 * Math.PI) / n;
  const vs = HA.map((a) => { const v = answers[a.id]; return v === 0 ? 100 : v === 1 ? 50 : 15; });
  const rings = [25, 50, 75, 100];
  const pts = vs.map((v, i) => {
    const r = (v / 100) * mr;
    const ang = i * a2 - Math.PI / 2;
    return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
  });
  const svgSize = 400;
  const labelPts = HA.map((a, i) => {
    const ang = i * a2 - Math.PI / 2;
    const r = mr + 45;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    const cosA = Math.cos(ang);
    const align = cosA > 0.25 ? "left" : cosA < -0.25 ? "right" : "center";
    return { x, y, align, v: vs[i] };
  });
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} width="100%" style={{ display: "block" }}>
        {rings.map((l, ri) => {
          const r = (l / 100) * mr;
          const p = Array.from({ length: n }, (_, i) => {
            const ang = i * a2 - Math.PI / 2;
            return `${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`;
          }).join(" ");
          return <polygon key={ri} points={p} fill="none" stroke={ri === 3 ? "#c7d2fe" : "#e2e8f0"} strokeWidth={ri === 3 ? 1.5 : 0.7} strokeDasharray={ri < 3 ? "4,4" : "none"} />;
        })}
        {Array.from({ length: n }, (_, i) => {
          const ang = i * a2 - Math.PI / 2;
          return <line key={i} x1={cx} y1={cy} x2={cx + mr * Math.cos(ang)} y2={cy + mr * Math.sin(ang)} stroke="#e2e8f0" strokeWidth="0.7" />;
        })}
        <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2.5" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill={getColor(vs[i])} stroke="white" strokeWidth="2.5" />
        ))}
      </svg>
      {labelPts.map((lp, i) => {
        const c = getColor(lp.v);
        const lbl = getLabel(lp.v);
        const leftPct = (lp.x / svgSize) * 100;
        const topPct = (lp.y / svgSize) * 100;
        const tx = lp.align === "left" ? "5%" : lp.align === "right" ? "-105%" : "-50%";
        return (
          <div key={i} style={{ position: "absolute", left: `${leftPct}%`, top: `${topPct}%`, transform: `translate(${tx}, -50%)`, whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1.2 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: "#475569" }}>{HA[i].icon} {HA[i].area}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: c, textAlign: lp.align }}>{lbl}</div>
          </div>
        );
      })}
    </div>
  );
}

function GroupedBars({ answers }) {
  const items = HA.map((a) => {
    const raw = answers[a.id];
    const v = raw === 0 ? 100 : raw === 1 ? 50 : 15;
    return { ...a, v, c: getColor(v), lbl: getLabel(v) };
  });
  const bad = items.filter((x) => x.v <= 15);
  const warn = items.filter((x) => x.v === 50);
  const good = items.filter((x) => x.v >= 75);

  const Section = ({ title, emoji, color, bg, border, list }) => {
    if (list.length === 0) return null;
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: color, marginBottom: 6 }}>{emoji} {title} ({list.length} ด้าน)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {list.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: bg, borderRadius: 10, border: `1px solid ${border}` }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#475569", flex: 1 }}>{item.area}</span>
              <div style={{ width: 60, background: "#f1f5f9", borderRadius: 6, height: 10, overflow: "hidden" }}>
                <div style={{ width: `${item.v}%`, height: "100%", background: item.c, borderRadius: 6, transition: "width 0.8s" }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: item.c, minWidth: 50, textAlign: "right" }}>{item.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <Section title="ควรปรับปรุง" emoji="🔴" color="#EF4444" bg="#FEF2F2" border="#FECACA" list={bad} />
      <Section title="เฝ้าระวัง" emoji="🟡" color="#F59E0B" bg="#FFFBEB" border="#FDE68A" list={warn} />
      <Section title="ดี" emoji="🟢" color="#10B981" bg="#ECFDF5" border="#A7F3D0" list={good} />
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [pro, setPro] = useState({ name: "", gender: "", gen: "", edu: "", cond: [], chrono: "" });
  const [ans, setAns] = useState({});
  const [qi, setQi] = useState(0);
  const [dir, setDir] = useState("in");
  const [sc, setSc] = useState({ att: "", mem: "", an: "", mn: "" });
  const [ba, setBa] = useState("");
  const [vis, setVis] = useState(true);
  const [saving, setSaving] = useState(false);
  const topRef = useRef(null);

  const goStep = (n) => {
    setVis(false);
    setTimeout(() => { setStep(n); setVis(true); }, 300);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const total = Object.values(ans).reduce((a, b) => a + b, 0);
  const hp = Math.round(((22 - total) / 22) * 100);

  const getGrade = () => {
    const m = { A: 3, B: 2, C: 1, "": 0 };
    const avg = (m[sc.att] + m[sc.mem]) / 2;
    if (avg >= 2.5 && hp >= 60) return "A";
    if (avg >= 1.5 && hp >= 35) return "B";
    return "C";
  };

  const gradeColor = { A: "#10B981", B: "#F59E0B", C: "#EF4444" };
  const canStart = pro.name && pro.gender && pro.gen && pro.chrono;

  const submitData = async () => {
    if (SHEET_URL === "YOUR_APPS_SCRIPT_URL_HERE") {
      console.warn("Google Sheets URL not set — skipping save");
      goStep(3);
      return;
    }
    setSaving(true);
    try {
      const grade = getGrade();
      const payload = {
        name: pro.name,
        gender: pro.gender,
        gen: pro.gen,
        edu: pro.edu,
        cond: pro.cond,
        chrono: pro.chrono,
        answers: ans,
        wellnessScore: hp,
        attLevel: sc.att,
        attScore: sc.an,
        memLevel: sc.mem,
        memScore: sc.mn,
        brainAge: ba,
        grade: grade,
      };
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Save error:", err);
    }
    setSaving(false);
    goStep(3);
  };

  const card = { background: "white", borderRadius: 20, padding: "24px 20px", boxShadow: "0 4px 24px rgba(0,0,0,.06)", marginBottom: 18 };
  const pill = (sel, c = "#6366f1") => ({ padding: "10px 18px", borderRadius: 50, border: sel ? `2px solid ${c}` : "2px solid #e2e8f0", background: sel ? `${c}10` : "white", color: sel ? c : "#64748b", fontWeight: sel ? 700 : 500, cursor: "pointer", fontSize: 14, fontFamily: F });
  const mainBtn = (dis = false) => ({ padding: "14px 36px", borderRadius: 50, border: "none", background: dis ? "#cbd5e1" : "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", fontWeight: 700, fontSize: 16, cursor: dis ? "not-allowed" : "pointer", fontFamily: F, boxShadow: dis ? "none" : "0 4px 16px rgba(99,102,241,.3)" });
  const secBtn = { padding: "14px 36px", borderRadius: 50, background: "white", color: "#6366f1", border: "2px solid #6366f1", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: F };

  const curQ = HA[qi] || HA[0];

  const goQuiz = (d) => {
    const nx = qi + d;
    if (nx < 0 || nx > 10) return;
    setDir("out");
    setTimeout(() => { setQi(nx); setDir("in"); }, 250);
  };

  const pickAnswer = (v) => {
    const id = HA[qi]?.id;
    if (!id) return;
    setAns((p) => ({ ...p, [id]: v }));
    if (qi < 10) setTimeout(() => goQuiz(1), 400);
  };

  return (
    <div style={{ fontFamily: F, minHeight: "100vh", background: "linear-gradient(180deg,#EEF2FF 0%,#F8FAFC 40%,#FFF5F7 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-8deg) scale(1.05)}75%{transform:rotate(8deg) scale(1.05)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(50px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-50px)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @media print{.noprint{display:none!important}}
      `}</style>
      <div ref={topRef} />

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)", padding: "28px 20px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 48, animation: "wiggle 1.5s ease-in-out infinite" }}>🧠</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", letterSpacing: 2, marginTop: 6 }}>PERSONAL</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "white" }}>BRAIN HEALTH WELLNESS</div>
        <div style={{ display: "inline-block", background: "rgba(255,255,255,.2)", borderRadius: 8, padding: "3px 14px", marginTop: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "white" }}>REPORT & AUDIT</span>
        </div>
        <div className="noprint" style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
          {["ข้อมูล", "ประเมิน", "คะแนน", "แผน"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: i <= step ? "white" : "rgba(255,255,255,.2)", color: i <= step ? "#6366f1" : "rgba(255,255,255,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{i + 1}</div>
              {i < 3 && <div style={{ width: 16, height: 2, background: i < step ? "white" : "rgba(255,255,255,.2)" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 540, margin: "-18px auto 0", padding: "0 14px 40px", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all .35s" }}>

        {/* ===== STEP 0: Profile ===== */}
        {step === 0 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 8, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 28, animation: "float 3s ease-in-out 0.2s infinite", opacity: 0.5 }}>🧬</span>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#ec4899,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(168,85,247,.3)", animation: "float 3s ease-in-out infinite" }}>
                  <span style={{ fontSize: 44 }}>🧠</span>
                </div>
                <span style={{ fontSize: 24, animation: "float 3s ease-in-out 0.8s infinite", opacity: 0.5 }}>💊</span>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#334155" }}>ยินดีต้อนรับ!</div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>กรอกข้อมูลเพื่อเริ่มประเมินสุขภาพสมอง</div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, letterSpacing: 1, marginBottom: 12 }}>📋 PROFILE</div>
              <input
                placeholder="ชื่อ / รหัสพนักงาน *"
                value={pro.name}
                onChange={(e) => setPro({ ...pro, name: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: pro.name ? "2px solid #6366f1" : "2px solid #e2e8f0", fontSize: 15, fontFamily: F, outline: "none", boxSizing: "border-box", background: pro.name ? "#EEF2FF" : "white" }}
              />
              {!pro.name && <div style={{ fontSize: 11, color: "#F59E0B", marginTop: 4 }}>* กรุณากรอกชื่อ/รหัสพนักงาน</div>}
              <div style={{ marginTop: 14, fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 8 }}>เพศ</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[{ v: "male", l: "👨 ชาย" }, { v: "female", l: "👩 หญิง" }].map((g) => (
                  <button key={g.v} onClick={() => setPro({ ...pro, gender: g.v })} style={pill(pro.gender === g.v)}>{g.l}</button>
                ))}
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 10 }}>🎂 Generation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {GENS.map((g) => (
                  <button key={g.id} onClick={() => setPro({ ...pro, gen: g.id })} style={{ ...pill(pro.gen === g.id, "#8B5CF6"), textAlign: "left", padding: "14px 16px", borderRadius: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{g.label} <span style={{ fontWeight: 400, fontSize: 12, color: "#94a3b8" }}>({g.range})</span></div>
                    <div style={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 400 }}>{g.focus}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 10 }}>🎓 วุฒิการศึกษา</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["ต่ำกว่า ป.ตรี", "ป.ตรี", "ป.โท/เอก"].map((e) => (
                  <button key={e} onClick={() => setPro({ ...pro, edu: e })} style={pill(pro.edu === e, "#06B6D4")}>{e}</button>
                ))}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 8, marginTop: 16 }}>💊 โรคประจำตัว</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["ความดัน", "เบาหวาน", "ไขมันสูง", "ไม่มี"].map((c) => {
                  const sel = pro.cond.includes(c);
                  return (
                    <button key={c} onClick={() => {
                      if (c === "ไม่มี") setPro({ ...pro, cond: sel ? [] : ["ไม่มี"] });
                      else setPro({ ...pro, cond: sel ? pro.cond.filter((x) => x !== c) : [...pro.cond.filter((x) => x !== "ไม่มี"), c] });
                    }} style={pill(sel, "#10B981")}>{c}</button>
                  );
                })}
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 4 }}>⏰ My Chronotype</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>เลือก Chronotype ที่ตรงกับคุณ</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {CHR.map((c) => {
                  const sel = pro.chrono === c.id;
                  return (
                    <button key={c.id} onClick={() => setPro({ ...pro, chrono: c.id })} style={{ padding: "14px 10px", borderRadius: 16, border: sel ? `3px solid ${c.color}` : "2px solid #e2e8f0", background: sel ? `${c.color}0D` : "white", cursor: "pointer", textAlign: "center", fontFamily: F }}>
                      <div style={{ fontSize: 34, animation: sel ? "wiggle 1.5s ease-in-out infinite" : "none" }}>{c.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: sel ? c.color : "#334155", marginTop: 4 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{c.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button onClick={() => canStart && goStep(1)} style={mainBtn(!canStart)} disabled={!canStart}>เริ่มทำแบบประเมิน →</button>
            </div>
          </div>
        )}

        {/* ===== STEP 1: Quiz ===== */}
        {step === 1 && (
          <div>
            <div style={{ ...card, paddingBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, animation: "pulse 1.5s ease-in-out infinite" }}>{curQ.emo}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#334155" }}>Brain-Body Wellness Audit</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>ข้อ {qi + 1} จาก 11</div>
              <div style={{ background: "#f1f5f9", borderRadius: 8, height: 8, overflow: "hidden", marginTop: 8 }}>
                <div style={{ height: "100%", width: `${((qi + 1) / 11) * 100}%`, background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)", borderRadius: 8, transition: "width .5s" }} />
              </div>
            </div>

            <div key={qi} style={{ ...card, padding: "24px 20px", borderTop: "4px solid #6366f1", animation: dir === "in" ? "slideIn .35s ease forwards" : "slideOut .25s ease forwards" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#EEF2FF,#F3E8FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{curQ.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: "#a855f7", fontWeight: 700 }}>ด้านที่ {curQ.id}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#334155" }}>{curQ.area}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, padding: "12px 14px", borderRadius: 14, background: "#F8FAFC", marginBottom: 14 }}>{curQ.desc}</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 18, padding: "10px 14px", borderRadius: 12, background: "#FFFBEB", border: "1px solid #FDE68A" }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <span style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}><strong>รู้หรือไม่?</strong> {curQ.tip}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { v: 0, label: "ปกติ / ไม่ใช่", face: "😊", color: "#10B981", bg: "#ECFDF5", d: "ไม่มีพฤติกรรมนี้" },
                  { v: 1, label: "บางครั้ง", face: "🤔", color: "#F59E0B", bg: "#FFFBEB", d: "มีเป็นบางครั้ง" },
                  { v: 2, label: "เป็นประจำ / ใช่", face: "😰", color: "#EF4444", bg: "#FEF2F2", d: "มีอาการนี้บ่อย" },
                ].map((o) => {
                  const sel = ans[curQ.id] === o.v;
                  return (
                    <button key={o.v} onClick={() => pickAnswer(o.v)} style={{ padding: "14px 16px", borderRadius: 16, border: sel ? `3px solid ${o.color}` : "2px solid #e2e8f0", background: sel ? o.bg : "white", cursor: "pointer", fontFamily: F, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 26, animation: sel ? "wiggle 1s ease-in-out infinite" : "none" }}>{o.face}</span>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontWeight: 700, fontSize: 14, color: sel ? o.color : "#334155" }}>{o.label}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{o.d}</div>
                        </div>
                      </div>
                      {sel && <span style={{ fontSize: 20 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="noprint" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 4 }}>
              {qi > 0 ? <button onClick={() => goQuiz(-1)} style={secBtn}>← ก่อนหน้า</button> : <button onClick={() => goStep(0)} style={secBtn}>← ย้อนกลับ</button>}
              {qi < 10 && ans[curQ.id] !== undefined && <button onClick={() => goQuiz(1)} style={mainBtn()}>ข้อถัดไป →</button>}
              {qi === 10 && ans[curQ.id] !== undefined && <button onClick={() => goStep(2)} style={mainBtn()}>ดูผลคะแนน 🎉</button>}
            </div>
          </div>
        )}

        {/* ===== STEP 2: Scores ===== */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: "center", marginTop: 12, marginBottom: 4 }}>
              <div style={{ fontSize: 36 }}>🎉🧠🎊</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#334155", marginTop: 4 }}>ประเมินเสร็จแล้ว!</div>
              {pro.name && <div style={{ fontSize: 13, color: "#94a3b8" }}>ผู้ประเมิน: <strong style={{ color: "#6366f1" }}>{pro.name}</strong></div>}
            </div>

            <div style={{ ...card, textAlign: "center", background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white" }}>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Wellness Audit Score</div>
              <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.1, marginTop: 4 }}>{hp}</div>
              <div style={{ fontSize: 13, opacity: 0.6 }}>/ 100</div>
            </div>

            {/* Bar Chart - labels next to each bar */}
            <div style={card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 4 }}>🕸️ Brain-Body Wellness Radar</div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 12 }}>ยิ่งกว้าง = สุขภาพสมองดี</div>
              <RadarChart answers={ans} />
            </div>

            {/* Grouped Bar Chart */}
            <div style={card}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 4 }}>📊 สรุปผลแยกกลุ่ม</div>
              <div style={{ fontSize: 11.5, color: "#94a3b8", marginBottom: 12 }}>จัดกลุ่มตามระดับสุขภาพสมอง</div>
              <GroupedBars answers={ans} />
            </div>

            {/* CogMate */}
            <div style={{ ...card, border: "2px solid #a855f7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 32, animation: "wiggle 1.5s ease-in-out infinite" }}>🧠</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#6366f1" }}>CogMate Brain Health Score</div>
                  <div style={{ fontSize: 11.5, color: "#94a3b8" }}>กรอกผลจากการประเมินด้วย CogMate</div>
                </div>
              </div>

              {[
                { k: "att", nk: "an", label: "🎯 Attention Score (การจดจ่อ)", c1: "#6366f1", c2: "#EEF2FF" },
                { k: "mem", nk: "mn", label: "🧩 Memory Score (ความจำ)", c1: "#a855f7", c2: "#F3E8FF" },
              ].map((s) => (
                <div key={s.k} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 10 }}>{s.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", minWidth: 48 }}>คะแนน</div>
                    <input
                      type="number"
                      placeholder="85"
                      value={sc[s.nk]}
                      onChange={(e) => setSc({ ...sc, [s.nk]: e.target.value })}
                      style={{ width: 100, padding: "10px 14px", borderRadius: 12, border: sc[s.nk] ? `2px solid ${s.c1}` : "2px solid #e2e8f0", fontSize: 18, fontWeight: 700, textAlign: "center", fontFamily: F, outline: "none", color: s.c1, background: sc[s.nk] ? s.c2 : "white" }}
                    />
                    {sc[s.nk] && <span style={{ fontSize: 18 }}>📝</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 12, color: "#94a3b8", minWidth: 48 }}>Level</div>
                    <div style={{ display: "flex", gap: 8, flex: 1 }}>
                      {["A", "B", "C"].map((lv) => {
                        const sel = sc[s.k] === lv;
                        const cl = { A: "#10B981", B: "#F59E0B", C: "#EF4444" }[lv];
                        return (
                          <button key={lv} onClick={() => setSc({ ...sc, [s.k]: lv })} style={{ flex: 1, padding: "12px 6px", borderRadius: 12, border: sel ? `3px solid ${cl}` : "2px solid #e2e8f0", background: sel ? `${cl}10` : "white", cursor: "pointer", fontFamily: F }}>
                            <div style={{ fontSize: 20, fontWeight: 800, color: sel ? cl : "#cbd5e1" }}>{lv}</div>
                            <div style={{ fontSize: 10, color: sel ? cl : "#94a3b8" }}>{lv === "A" ? "ดีเยี่ยม" : lv === "B" ? "ปานกลาง" : "ควรปรับปรุง"}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {sc[s.k] && <div style={{ background: "#f1f5f9", borderRadius: 8, height: 8, overflow: "hidden", marginTop: 6 }}><div style={{ width: `${{ A: 100, B: 66, C: 33 }[sc[s.k]]}%`, height: "100%", background: { A: "#10B981", B: "#F59E0B", C: "#EF4444" }[sc[s.k]], borderRadius: 8, transition: "width .8s" }} /></div>}
                </div>
              ))}

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>🕐 อายุสมอง (ปี) <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400 }}>— ไม่บังคับ</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="number" placeholder="35" value={ba} onChange={(e) => setBa(e.target.value)} style={{ width: 100, padding: "10px 14px", borderRadius: 12, border: ba ? "3px solid #D97706" : "2px solid #e2e8f0", fontSize: 20, fontWeight: 800, textAlign: "center", fontFamily: F, outline: "none", color: "#D97706", background: ba ? "#FFFBEB" : "white" }} />
                  <span style={{ color: "#94a3b8" }}>ปี</span>
                  {ba && <span style={{ fontSize: 28 }}>{Number(ba) <= 30 ? "🧒" : Number(ba) <= 50 ? "🧑" : "👴"}</span>}
                </div>
              </div>
            </div>

            <div className="noprint" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
              <button onClick={() => { setQi(0); setDir("in"); goStep(1); }} style={secBtn}>← แก้คำตอบ</button>
              <button onClick={() => { if (sc.att && sc.mem) submitData(); }} style={mainBtn(!(sc.att && sc.mem) || saving)} disabled={!(sc.att && sc.mem) || saving}>{saving ? "กำลังบันทึก..." : "ดูแผนสุขภาพ 🚀"}</button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: Action Plan ===== */}
        {step === 3 && (() => {
          const gen = pro.gen || "geny";
          const gi = GENS.find((g) => g.id === gen);
          const plan = PL[gen];
          const grade = getGrade();
          const isA = grade === "A";
          return (
            <div>
              <div className="noprint" style={{ textAlign: "center", marginTop: 12, marginBottom: 8 }}>
                <button onClick={() => window.print()} style={{ ...mainBtn(), padding: "12px 24px", fontSize: 14, background: "linear-gradient(135deg,#059669,#10B981)" }}>
                  📄 Download PDF
                </button>
              </div>

              {pro.name && (
                <div style={{ ...card, textAlign: "center", padding: "12px 20px", background: "linear-gradient(135deg,#EEF2FF,#F3E8FF)" }}>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>ผู้ทำแบบประเมิน</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#6366f1" }}>{pro.name}</div>
                </div>
              )}

              <div style={{ ...card, textAlign: "center", background: "linear-gradient(135deg,#ECFDF5,#F0FDF4)", border: "2px solid #86EFAC" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#166534" }}>WHAT'S NEXT</div>
                <div style={{ fontSize: 12, color: "#4ADE80", fontWeight: 600 }}>PERSONAL ACTION PLAN</div>
              </div>

              <div style={{ ...card, textAlign: "center" }}>
                <div style={{ display: "inline-block", padding: "8px 28px", borderRadius: 50, background: `${gradeColor[grade]}15`, border: `3px solid ${gradeColor[grade]}`, marginBottom: 14, animation: "pulse 2s ease-in-out infinite" }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: gradeColor[grade] }}>GRADE {grade}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  {[
                    { l: "Attention", v: sc.an ? `${sc.an} (${sc.att})` : `Level ${sc.att}`, bg: "#EEF2FF", c: "#6366f1" },
                    { l: "Memory", v: sc.mn ? `${sc.mn} (${sc.mem})` : `Level ${sc.mem}`, bg: "#F3E8FF", c: "#a855f7" },
                    ...(ba ? [{ l: "อายุสมอง", v: `${ba} ปี`, bg: "#FFFBEB", c: "#D97706" }] : []),
                  ].map((x, i) => (
                    <div key={i} style={{ padding: "10px 16px", borderRadius: 12, background: x.bg }}>
                      <div style={{ fontSize: 10, color: x.c, fontWeight: 600 }}>{x.l}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: x.c }}>{x.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#94a3b8" }}>Wellness: <strong style={{ color: "#6366f1" }}>{hp}/100</strong></div>
              </div>

              <div style={card}>
                <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{gi.label} ({gi.range})</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#6366f1", marginBottom: 4 }}>Focus on "{gi.fe}"</div>
                <div style={{ marginTop: 14, padding: 16, borderRadius: 14, background: isA ? "linear-gradient(135deg,#ECFDF5,#F0FDFA)" : "linear-gradient(135deg,#FFF7ED,#FFFBEB)", border: isA ? "2px solid #86EFAC" : "2px solid #FDE68A" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: isA ? "#166534" : "#92400E", marginBottom: 12 }}>
                    {isA ? "🏆" : "⚡"} {isA ? `GRADE A — ${plan.ga.t}` : `GRADE ${grade}`}
                  </div>
                  {isA ? (
                    <div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#10B981", marginBottom: 4 }}>✨ Keep Going:</div>
                        <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{plan.ga.k}</div>
                      </div>
                      <div style={{ padding: 12, borderRadius: 12, background: "linear-gradient(135deg,#EEF2FF,#F3E8FF)", border: "1px solid #C4B5FD" }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: "#6366f1", marginBottom: 4 }}>💎 Pax Wellness:</div>
                        <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{plan.ga.p}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
                      คุณยังมีจุดปรับปรุงได้ <strong>{plan.bc}</strong>
                      <div style={{ marginTop: 8 }}>
                        {HA.filter((h) => ans[h.id] === 2).map((h) => (
                          <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, padding: "6px 10px", background: "#FEF2F2", borderRadius: 8, fontSize: 12 }}>
                            <span>{h.icon}</span>
                            <span style={{ color: "#991B1B", fontWeight: 600 }}>{h.area}</span>
                            <span style={{ color: "#EF4444" }}>— ควรปรับปรุง</span>
                          </div>
                        ))}
                        {HA.filter((h) => ans[h.id] === 1).map((h) => (
                          <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, padding: "6px 10px", background: "#FFFBEB", borderRadius: 8, fontSize: 12 }}>
                            <span>{h.icon}</span>
                            <span style={{ color: "#92400E", fontWeight: 600 }}>{h.area}</span>
                            <span style={{ color: "#F59E0B" }}>— เฝ้าระวัง</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="noprint" style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
                <button onClick={() => window.print()} style={{ ...secBtn, borderColor: "#059669", color: "#059669" }}>📄 Download PDF</button>
                <button onClick={() => { setStep(0); setAns({}); setSc({ att: "", mem: "", an: "", mn: "" }); setBa(""); setQi(0); setVis(true); }} style={secBtn}>🔄 ทำใหม่</button>
              </div>
            </div>
          );
        })()}

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 10.5, color: "#cbd5e1" }}>© Eisai Thailand Marketing — Brain Health Ecosystem</div>
      </div>
    </div>
  );
}
