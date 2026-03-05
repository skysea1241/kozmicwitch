import { useState, useEffect, useRef } from "react";

// ─── Shared Data ────────────────────────────────────────────────────────────

const CARDS = [
  { name: "The Void",    symbol: "☉", element: "Ether", keywords: "dissolution, surrender, infinite potential" },
  { name: "The Serpent", symbol: "𖦹", element: "Fire",  keywords: "transformation, shedding, rebirth" },
  { name: "The Mirror",  symbol: "☽", element: "Water", keywords: "reflection, shadow, hidden truth" },
  { name: "The Thread",  symbol: "✦", element: "Air",   keywords: "connection, fate, invisible bonds" },
  { name: "The Root",    symbol: "⊕", element: "Earth", keywords: "ancestry, grounding, what holds you" },
  { name: "The Storm",   symbol: "⚡", element: "Fire",  keywords: "disruption, revelation, necessary chaos" },
  { name: "The Veil",    symbol: "☿", element: "Ether", keywords: "liminality, between worlds, what is hidden" },
  { name: "The Wound",   symbol: "♄", element: "Earth", keywords: "old pain, sacred scar, where power lives" },
  { name: "The Star",    symbol: "✧", element: "Air",   keywords: "guidance, distant light, trust the path" },
  { name: "The Gate",    symbol: "⬡", element: "Water", keywords: "threshold, initiation, no return" },
  { name: "The Silence", symbol: "◯", element: "Ether", keywords: "stillness, inner knowing, rest" },
  { name: "The Flame",   symbol: "△", element: "Fire",  keywords: "desire, will, what you cannot extinguish" },
];

const NAV_LINKS = ["Home", "Moon", "Oracle", "Chart", "Writing", "Playlist", "About"];
const SIGILS = ["☽", "✦", "⬡", "☿", "♄", "✧", "⊕", "☾"];

// ─── Shared Components ───────────────────────────────────────────────────────

function FloatingParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.3 + 0.2, alpha: Math.random() * 0.55 + 0.1,
      vx: (Math.random() - 0.5) * 0.1, vy: -Math.random() * 0.15 - 0.04,
      t: Math.random() * Math.PI * 2, ts: Math.random() * 0.018 + 0.004,
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.t += p.ts;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,190,255,${p.alpha * (0.5 + 0.5 * Math.sin(p.t))})`; ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "18px 40px",
      background: scrolled ? "rgba(5,4,14,0.85)" : "rgba(5,4,14,0.5)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled ? "1px solid rgba(180,140,255,0.1)" : "1px solid transparent",
      transition: "all 0.4s ease",
    }}>
      <button onClick={() => setPage("Home")} style={{
        background: "none", border: "none", cursor: "pointer", padding: 0,
        fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: 15,
        background: "linear-gradient(135deg, #d4a8ff, #f0d880)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: "0.06em",
      }}>Kozmic Witch</button>
      <div style={{ display: "flex", gap: 32 }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => setPage(l)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Cinzel', serif", fontSize: 10,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: page === l ? "rgba(210,170,255,0.95)" : "rgba(180,150,255,0.38)",
            borderBottom: page === l ? "1px solid rgba(210,170,255,0.4)" : "1px solid transparent",
            paddingBottom: 2, transition: "all 0.2s ease",
          }}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function SigilRing() {
  return (
    <div style={{ position: "relative", width: 300, height: 300, margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(180,140,255,0.18)", animation: "spin 40s linear infinite" }}>
        {SIGILS.map((s, i) => {
          const a = (i / SIGILS.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div key={i} style={{
              position: "absolute",
              left: `${50 + 47 * Math.cos(a)}%`, top: `${50 + 47 * Math.sin(a)}%`,
              transform: "translate(-50%,-50%)",
              fontSize: 13, color: "rgba(180,140,255,0.5)",
            }}>{s}</div>
          );
        })}
      </div>
      <div style={{ position: "absolute", inset: 28, borderRadius: "50%", border: "1px solid rgba(255,200,100,0.1)", animation: "spinReverse 25s linear infinite" }}>
        {[...Array(12)].map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <div key={i} style={{ position: "absolute", left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 44 * Math.sin(a)}%`, transform: "translate(-50%,-50%)", width: i % 3 === 0 ? 5 : 2, height: i % 3 === 0 ? 5 : 2, borderRadius: "50%", background: i % 3 === 0 ? "rgba(255,200,100,0.4)" : "rgba(255,200,100,0.15)" }} />;
        })}
      </div>
      <div style={{ position: "absolute", inset: 68, borderRadius: "50%", background: "radial-gradient(circle, rgba(140,80,255,0.2) 0%, transparent 100%)", animation: "pulse 5s ease-in-out infinite" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: 46, background: "linear-gradient(160deg, #e8c8ff, #c8a0ff, #f0d080)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 20px rgba(180,120,255,0.5))", lineHeight: 1, marginBottom: 6 }}>☽</div>
        <div style={{ fontFamily: "'IM Fell English', Georgia, serif", fontSize: 10, letterSpacing: "0.5em", color: "rgba(200,160,255,0.35)", textTransform: "uppercase" }}>kozmic</div>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "fadeIn 1s ease 0.1s both", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 50, height: 1, background: "linear-gradient(to right, transparent, rgba(180,140,255,0.35))" }} />
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.4em", color: "rgba(180,140,255,0.4)", textTransform: "uppercase" }}>Est. in the Age of Aquarius</span>
          <div style={{ width: 50, height: 1, background: "linear-gradient(to left, transparent, rgba(180,140,255,0.35))" }} />
        </div>

        <div style={{ animation: "fadeIn 1.1s ease 0.2s both", marginBottom: 36 }}>
          <SigilRing />
        </div>

        <div style={{ textAlign: "center", animation: "fadeUp 0.9s ease 0.3s both" }}>
          <h1 style={{
            fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
            fontSize: "clamp(36px, 8vw, 68px)", fontWeight: 700, margin: 0, lineHeight: 1.1,
            background: "linear-gradient(160deg, #f0e0ff 0%, #d0a8ff 40%, #f4d878 80%, #c8a0f8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 40px rgba(160,80,255,0.3))", letterSpacing: "0.04em",
          }}>Kozmic Witch</h1>
          <p style={{
            fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic",
            fontSize: "clamp(15px, 2.5vw, 18px)", color: "rgba(200,175,255,0.55)",
            marginTop: 16, letterSpacing: "0.03em", lineHeight: 1.7,
          }}>
            Dispatches from the space between mysticism & truth.
          </p>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.9s ease 0.45s both" }}>
          <button onClick={() => setPage("Oracle")} style={{
            background: "linear-gradient(135deg, rgba(140,60,255,0.25), rgba(80,30,180,0.2))",
            border: "1px solid rgba(180,120,255,0.35)", color: "#d8c0ff",
            fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.25em",
            textTransform: "uppercase", padding: "13px 28px", borderRadius: 40, cursor: "pointer",
            transition: "all 0.25s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(140,60,255,0.4), rgba(80,30,180,0.35))"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(140,60,255,0.25), rgba(80,30,180,0.2))"; }}
          >Enter the Oracle ✦</button>
          <button onClick={() => setPage("About")} style={{
            background: "transparent", border: "1px solid rgba(180,120,255,0.18)",
            color: "rgba(190,160,255,0.5)", fontFamily: "'Cinzel', serif",
            fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "13px 28px", borderRadius: 40, cursor: "pointer", transition: "all 0.25s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = "rgba(210,180,255,0.8)"; e.currentTarget.style.borderColor = "rgba(180,120,255,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(190,160,255,0.5)"; e.currentTarget.style.borderColor = "rgba(180,120,255,0.18)"; }}
          >My Story</button>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "pulse 3s ease-in-out infinite" }}>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(180,140,255,0.35), transparent)" }} />
          <div style={{ fontSize: 8, fontFamily: "'Cinzel', serif", letterSpacing: "0.3em", color: "rgba(180,140,255,0.25)", textTransform: "uppercase" }}>Scroll</div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ borderTop: "1px solid rgba(180,140,255,0.08)", borderBottom: "1px solid rgba(180,140,255,0.08)", padding: "13px 0", overflow: "hidden", position: "relative", zIndex: 1, background: "rgba(80,30,180,0.04)" }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", animation: "scrollText 22s linear infinite", width: "max-content" }}>
          {[...Array(2)].map((_, j) =>
            ["☽ Shadow Work", "✦ Astrology", "⬡ Sacred Geometry", "☿ Mercury Rx", "♄ Saturn Returns", "✧ Moon Rituals", "⊕ Tarot", "☾ Ancestral Healing"].map((item, i) => (
              <span key={`${j}-${i}`} style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(180,140,255,0.32)" }}>{item}</span>
            ))
          )}
        </div>
      </div>

      {/* Quote */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(180,140,255,0.06)", borderBottom: "1px solid rgba(180,140,255,0.06)", padding: "80px 24px", textAlign: "center", background: "radial-gradient(ellipse at center, rgba(80,30,180,0.07) 0%, transparent 70%)" }}>
        <p style={{
          fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic",
          fontSize: "clamp(19px, 3.5vw, 28px)", color: "rgba(210,185,255,0.6)",
          maxWidth: 580, margin: "0 auto", lineHeight: 1.7,
        }}>
          "You are not broken. You are not lost.<br />
          You are in the middle of a becoming<br />
          the universe has been preparing for centuries."
        </p>
        <div style={{ marginTop: 22, fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: "0.3em", color: "rgba(180,140,255,0.25)" }}>✦ ✦ ✦</div>
      </div>

      {/* Oracle CTA */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(100,50,200,0.1), rgba(40,20,100,0.07))",
          border: "1px solid rgba(180,140,255,0.12)", borderRadius: 24, padding: "48px 36px", textAlign: "center",
        }}>
          <div style={{ fontSize: 30, marginBottom: 14, filter: "drop-shadow(0 0 12px rgba(180,120,255,0.4))" }}>🔮</div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 17, fontWeight: 600, color: "#d8c4f8", margin: "0 0 10px", letterSpacing: "0.06em" }}>Consult the Oracle</h3>
          <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", color: "rgba(190,170,240,0.5)", fontSize: 15, lineHeight: 1.7, margin: "0 0 26px" }}>
            Ask your question. Draw your card. Receive the transmission meant only for you.
          </p>
          <button onClick={() => setPage("Oracle")} style={{
            background: "linear-gradient(135deg, rgba(140,60,255,0.35), rgba(100,40,200,0.3))",
            border: "1px solid rgba(180,120,255,0.35)", borderRadius: 40, padding: "12px 28px",
            color: "#e0ccff", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.22em",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s ease",
          }}>Open the Oracle ✦</button>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ position: "relative", zIndex: 1, maxWidth: 540, margin: "0 auto", padding: "0 24px 90px" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(80,30,160,0.08), rgba(40,15,100,0.06))", border: "1px solid rgba(180,140,255,0.1)", borderRadius: 24, padding: "44px 36px", textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>☽</div>
          <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 600, color: "#d8c4f8", margin: "0 0 10px", letterSpacing: "0.06em" }}>Receive the Transmissions</h3>
          <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", color: "rgba(190,170,240,0.5)", fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
            Moon letters, ritual guides, and metaphysical musings — delivered when the timing is right.
          </p>
          {subscribed ? (
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: "rgba(180,220,180,0.65)" }}>✦ You're in. The cosmos has your address.</div>
          ) : (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,140,255,0.16)", borderRadius: 40, padding: "11px 18px", color: "#d8c8f8", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", width: 210 }} />
              <button onClick={() => { if (email) setSubscribed(true); }} style={{ background: "linear-gradient(135deg, rgba(140,60,255,0.35), rgba(100,40,200,0.3))", border: "1px solid rgba(180,120,255,0.35)", borderRadius: 40, padding: "11px 22px", color: "#e0ccff", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Subscribe</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── Oracle Page ──────────────────────────────────────────────────────────────

function CardBack({ onClick, isRevealing }) {
  return (
    <div onClick={onClick} style={{
      width: 200, height: 320, borderRadius: 18,
      background: "linear-gradient(160deg, #1a0e3a 0%, #0d0820 50%, #180d35 100%)",
      border: "1px solid rgba(180,130,255,0.28)", cursor: isRevealing ? "default" : "pointer",
      position: "relative", overflow: "hidden",
      boxShadow: "0 0 40px rgba(120,60,220,0.22), 0 0 80px rgba(80,30,160,0.08)",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
      onMouseEnter={e => { if (!isRevealing) { e.currentTarget.style.transform = "translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 0 60px rgba(140,80,255,0.38), 0 0 100px rgba(80,30,160,0.12)"; } }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 40px rgba(120,60,220,0.22), 0 0 80px rgba(80,30,160,0.08)"; }}
    >
      <svg width="200" height="320" style={{ position: "absolute", inset: 0 }}>
        <defs><radialGradient id="cg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(140,80,255,0.12)" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        <rect width="200" height="320" fill="url(#cg)" />
        <circle cx="100" cy="160" r="75" fill="none" stroke="rgba(180,130,255,0.13)" strokeWidth="1" />
        <circle cx="100" cy="160" r="52" fill="none" stroke="rgba(180,130,255,0.09)" strokeWidth="1" />
        <circle cx="100" cy="160" r="32" fill="none" stroke="rgba(200,160,255,0.1)" strokeWidth="1" />
        {[0,1,2,3,4,5].map(i => { const a = (i/6)*Math.PI*2-Math.PI/2; return <line key={i} x1={100+75*Math.cos(a)} y1={160+75*Math.sin(a)} x2={100+75*Math.cos(a+Math.PI*2/3)} y2={160+75*Math.sin(a+Math.PI*2/3)} stroke="rgba(180,130,255,0.07)" strokeWidth="1" />; })}
        <rect x="12" y="12" width="176" height="296" rx="10" fill="none" stroke="rgba(180,130,255,0.08)" strokeWidth="1" />
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontSize: 30, marginBottom: 8, filter: "drop-shadow(0 0 10px rgba(180,130,255,0.5))" }}>☽</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.35em", color: "rgba(180,130,255,0.35)", textTransform: "uppercase" }}>Kozmic Witch</div>
      </div>
    </div>
  );
}

function CardFront({ card }) {
  return (
    <div style={{
      width: 200, height: 320, borderRadius: 18,
      background: "linear-gradient(160deg, #1e0f40 0%, #100a28 50%, #1a0e38 100%)",
      border: "1px solid rgba(200,160,255,0.32)",
      boxShadow: "0 0 50px rgba(140,80,255,0.32), 0 0 100px rgba(80,30,160,0.12)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "24px 16px", position: "relative", overflow: "hidden",
      animation: "cardReveal 0.6s ease forwards",
    }}>
      <svg width="200" height="320" style={{ position: "absolute", inset: 0 }}>
        <defs><radialGradient id="cfg" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="rgba(160,100,255,0.18)" /><stop offset="100%" stopColor="transparent" /></radialGradient></defs>
        <rect width="200" height="320" fill="url(#cfg)" />
        <rect x="10" y="10" width="180" height="300" rx="12" fill="none" stroke="rgba(200,160,255,0.13)" strokeWidth="1" />
        <rect x="16" y="16" width="168" height="288" rx="10" fill="none" stroke="rgba(200,160,255,0.07)" strokeWidth="1" />
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ fontSize: 50, marginBottom: 10, background: "linear-gradient(160deg, #f0d8ff, #c8a0ff, #f4d878)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 18px rgba(180,120,255,0.65))", lineHeight: 1 }}>{card.symbol}</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(200,160,255,0.4)", textTransform: "uppercase", marginBottom: 10 }}>{card.element}</div>
        <div style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 20, color: "#e0ccff", lineHeight: 1.3, marginBottom: 12 }}>{card.name}</div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.18em", color: "rgba(180,150,255,0.38)", textTransform: "uppercase", lineHeight: 1.9 }}>
          {card.keywords.split(", ").map((k, i) => <div key={i}>{k}</div>)}
        </div>
      </div>
    </div>
  );
}

async function callOracle(question, card) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are the Kozmic Witch Oracle — an ancient, mystical voice that speaks in metaphor, poetry, and deep spiritual truth. Your tone is ethereal, wise, and intimately knowing — like the universe itself is whispering. You speak in vivid imagery, unexpected metaphors, and truths that land in the body, not just the mind. Reference the card drawn as sacred confirmation. Keep responses to 3–4 flowing sentences. No bullet points. No headers. Only poetic prose.`,
      messages: [{ role: "user", content: `The seeker has asked: "${question}"\n\nThe card drawn is: ${card.name} (${card.symbol}) — Element: ${card.element} — Keywords: ${card.keywords}\n\nSpeak your oracle response now. Weave the card's energy into your answer.` }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "The oracle is silent. Ask again when the veil is thinner.";
}

function OraclePage() {
  const [question, setQuestion] = useState("");
  const [phase, setPhase] = useState("idle");
  const [drawnCard, setDrawnCard] = useState(null);
  const [oracleText, setOracleText] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim() || phase !== "idle") return;
    setError(""); setPhase("drawing"); setShowCard(false); setOracleText("");
    await new Promise(r => setTimeout(r, 900));
    const card = CARDS[Math.floor(Math.random() * CARDS.length)];
    setDrawnCard(card); setPhase("flipping");
    await new Promise(r => setTimeout(r, 400));
    setShowCard(true); setPhase("reading");
    try {
      const text = await callOracle(question, card);
      await new Promise(r => setTimeout(r, 500));
      setOracleText(text); setPhase("done");
    } catch {
      setError("The oracle could not be reached. The veil is thick tonight."); setPhase("done");
    }
  };

  const handleReset = () => { setPhase("idle"); setDrawnCard(null); setShowCard(false); setOracleText(""); setQuestion(""); setError(""); };

  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 52, animation: "fadeUp 0.8s ease both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.45em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 12 }}>✦ Kozmic Witch ✦</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: "clamp(28px, 6vw, 50px)", fontWeight: 700, margin: "0 0 12px", background: "linear-gradient(160deg, #f0e0ff 0%, #d0a8ff 40%, #f4d878 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 28px rgba(160,80,255,0.28))" }}>The Oracle</h1>
        <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 15, color: "rgba(200,175,255,0.45)", lineHeight: 1.75, maxWidth: 380, margin: "0 auto" }}>
          Bring your question into the silence.<br />The cards will speak what the mind cannot.
        </p>
      </div>

      {phase === "idle" && (
        <div style={{ animation: "fadeUp 0.8s ease 0.15s both", marginBottom: 36 }}>
          <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(180,140,255,0.13)", borderRadius: 20, padding: "28px", boxShadow: "0 0 40px rgba(100,40,200,0.06)" }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 14 }}>Your Question</div>
            <textarea
              value={question} onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAsk(); } }}
              placeholder="What does the universe want me to know right now..."
              rows={3}
              style={{ width: "100%", background: "transparent", border: "none", color: "#d8c8f8", fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.65, padding: "4px 0", borderBottom: "1px solid rgba(180,140,255,0.1)", resize: "none", outline: "none" }}
            />
            <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: "rgba(180,140,255,0.22)", fontFamily: "'Cinzel', serif", letterSpacing: "0.12em" }}>Press Enter or click to draw</div>
              <button onClick={handleAsk} disabled={!question.trim()} style={{ background: question.trim() ? "linear-gradient(135deg, rgba(140,60,255,0.32), rgba(100,40,200,0.28))" : "rgba(255,255,255,0.02)", border: `1px solid ${question.trim() ? "rgba(180,120,255,0.38)" : "rgba(180,140,255,0.08)"}`, borderRadius: 40, padding: "10px 24px", color: question.trim() ? "#e0ccff" : "rgba(180,140,255,0.28)", fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", cursor: question.trim() ? "pointer" : "default", transition: "all 0.3s ease" }}>
                Draw Your Card ✦
              </button>
            </div>
          </div>
        </div>
      )}

      {phase === "drawing" && (
        <div style={{ textAlign: "center", padding: "40px 0", animation: "fadeIn 0.5s ease both" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid rgba(180,130,255,0.25)", borderTop: "1px solid rgba(200,160,255,0.75)", animation: "spin 1s linear infinite", margin: "0 auto 20px" }} />
          <div style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 16, color: "rgba(200,170,255,0.45)" }}>The cards are listening...</div>
        </div>
      )}

      {(phase === "flipping" || phase === "reading" || phase === "done") && drawnCard && (
        <div style={{ animation: "fadeUp 0.6s ease both" }}>
          <div style={{ textAlign: "center", marginBottom: 32, fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 14, color: "rgba(200,170,255,0.38)", lineHeight: 1.6 }}>"{question}"</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 38 }}>
            {showCard ? <CardFront card={drawnCard} /> : <CardBack isRevealing />}
          </div>
          {oracleText && (
            <div style={{ background: "linear-gradient(135deg, rgba(100,40,200,0.09), rgba(60,20,140,0.07))", border: "1px solid rgba(180,130,255,0.13)", borderRadius: 20, padding: "30px 30px", animation: "fadeUp 0.8s ease both", boxShadow: "0 0 40px rgba(100,40,200,0.06)" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.4em", color: "rgba(180,130,255,0.38)", textTransform: "uppercase", marginBottom: 16 }}>✦ The Oracle Speaks</div>
              <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 18, color: "rgba(225,210,255,0.86)", lineHeight: 1.9, margin: 0 }}>{oracleText}</p>
            </div>
          )}
          {error && <div style={{ textAlign: "center", color: "rgba(200,140,140,0.55)", fontStyle: "italic", fontSize: 15, marginTop: 18 }}>{error}</div>}
          {phase === "reading" && !oracleText && (
            <div style={{ textAlign: "center", padding: "18px 0", animation: "pulse 2s ease-in-out infinite" }}>
              <div style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 15, color: "rgba(200,170,255,0.42)" }}>The oracle is reading your path...</div>
            </div>
          )}
          {phase === "done" && (
            <div style={{ textAlign: "center", marginTop: 34, animation: "fadeUp 0.6s ease 0.3s both" }}>
              <button onClick={handleReset} style={{ background: "none", border: "none", fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180,140,255,0.38)", cursor: "pointer", padding: "10px 18px", borderBottom: "1px solid rgba(180,140,255,0.15)", transition: "color 0.2s ease" }}
                onMouseEnter={e => e.target.style.color = "rgba(200,160,255,0.72)"}
                onMouseLeave={e => e.target.style.color = "rgba(180,140,255,0.38)"}
              >Ask Another Question ✦</button>
            </div>
          )}
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 65 }}>
        <div style={{ fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: "0.35em", color: "rgba(180,140,255,0.15)", textTransform: "uppercase" }}>as above · so below</div>
      </div>
    </div>
  );
}

// ─── Writing Page ─────────────────────────────────────────────────────────────

const BLOG_POSTS = [
  {
    slug: "tarot-window-into-psyche",
    tag: "Tarot",
    date: "March 5, 2026",
    title: "How Tarot Is Actually a Window Into Your Psyche",
    excerpt: "I didn't pick up tarot because I believed in magic. I picked it up because I needed to understand what was happening inside me and nothing else was working.",
    body: [
      "I didn't pick up tarot because I believed in magic. I picked it up because I needed to understand what was happening inside me and nothing else was working.",
      "That's the thing nobody tells you about tarot. You don't have to believe the cards are supernatural for them to be useful. You don't have to think the universe is shuffling your deck with cosmic intention. What you do have to be willing to do is look — really look — at what comes up when you ask an honest question.",
      "The cards work because of something called projection. When you pull The Tower in the middle of a situation that feels stable on the surface, your brain starts making connections. What in my life is built on a shaky foundation? What am I pretending isn't about to fall? The card doesn't tell you that. You tell you that. The card just creates the opening.",
      "Carl Jung called this kind of thing active imagination — a way of accessing the parts of your psyche that don't speak in plain language. Symbols do what words can't. They bypass the part of your brain that's been rehearsing the same story for years and land somewhere deeper. That's why a three-card pull can shake something loose that three months of overthinking couldn't touch.",
      "I've pulled cards when I was confused about a relationship and had the whole thing become suddenly, uncomfortably clear. Not because the cards were magic. Because I finally gave myself permission to know what I already knew.",
      "That's what tarot really is. Not a fortune-telling tool. Not a party trick. A mirror — and sometimes the clearest one you've got.",
    ],
  },
];

function PostView({ post, onBack }) {
  return (
    <div style={{ animation: "fadeUp 0.7s ease both" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(180,140,255,0.4)", marginBottom: 40, display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s ease", padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = "rgba(200,160,255,0.75)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(180,140,255,0.4)"}
      >
        ← Back to Writing
      </button>

      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 10, display: "flex", gap: 16 }}>
        <span>{post.tag}</span>
        <span style={{ color: "rgba(180,140,255,0.22)" }}>·</span>
        <span>{post.date}</span>
      </div>

      <h1 style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: "clamp(24px, 4vw, 38px)", color: "#e0ccff", lineHeight: 1.3, margin: "0 0 36px", fontWeight: 400 }}>{post.title}</h1>

      <div style={{ borderTop: "1px solid rgba(180,140,255,0.1)", paddingTop: 36 }}>
        {post.body.map((para, i) => (
          <p key={i} style={{ fontFamily: "Georgia, serif", fontSize: 17, color: i === 0 ? "rgba(220,205,255,0.8)" : "rgba(195,180,245,0.58)", lineHeight: 1.95, marginBottom: 24, fontWeight: i === 0 ? 400 : 300 }}>{para}</p>
        ))}
      </div>

      <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid rgba(180,140,255,0.08)", display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(180,140,255,0.22)", textTransform: "uppercase" }}>✦ ✦ ✦</div>
      </div>
    </div>
  );
}

function PostCard({ post, i, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "linear-gradient(135deg, rgba(140,80,255,0.09), rgba(80,40,160,0.07))" : "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
        border: `1px solid ${hovered ? "rgba(180,140,255,0.22)" : "rgba(180,140,255,0.1)"}`,
        borderRadius: 18, padding: "28px", cursor: "pointer",
        transition: "all 0.28s ease", transform: hovered ? "translateY(-2px)" : "translateY(0)",
        animation: `fadeUp 0.6s ease ${0.1 + i * 0.1}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,160,255,0.5)", border: "1px solid rgba(200,160,255,0.18)", padding: "3px 10px", borderRadius: 20 }}>{post.tag}</span>
        <span style={{ fontSize: 11, color: "rgba(180,150,255,0.28)", marginLeft: "auto", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>{post.date}</span>
      </div>
      <h2 style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 21, color: hovered ? "#e8d8ff" : "#c8b8f0", lineHeight: 1.4, margin: "0 0 12px", fontWeight: 400, transition: "color 0.28s ease" }}>{post.title}</h2>
      <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: "rgba(180,165,225,0.5)", lineHeight: 1.75, margin: "0 0 18px", fontWeight: 300 }}>{post.excerpt}</p>
      <div style={{ fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: "0.2em", textTransform: "uppercase", color: hovered ? "rgba(200,160,255,0.65)" : "rgba(180,140,255,0.28)", transition: "color 0.28s ease" }}>Read ✦</div>
    </div>
  );
}

function WritingPage() {
  const [activePost, setActivePost] = useState(null);

  if (activePost) return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 80px" }}>
      <PostView post={activePost} onBack={() => setActivePost(null)} />
    </div>
  );

  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 80px" }}>
      <div style={{ animation: "fadeUp 0.8s ease both", marginBottom: 48 }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.45em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 12 }}>✦ The Grimoire ✦</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, margin: "0 0 10px", background: "linear-gradient(160deg, #f0e0ff 0%, #d0a8ff 40%, #f4d878 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Writing</h1>
        <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 15, color: "rgba(200,175,255,0.42)", lineHeight: 1.7 }}>
          Thoughts on tarot, astrology, and the practice of paying attention.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {BLOG_POSTS.map((post, i) => (
          <PostCard key={post.slug} post={post} i={i} onSelect={() => setActivePost(post)} />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 60 }}>
        <div style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: "0.35em", color: "rgba(180,140,255,0.18)", textTransform: "uppercase" }}>more coming soon · ✦</div>
      </div>
    </div>
  );
}

// ─── Moon Page ────────────────────────────────────────────────────────────────

const PHASES = [
  { name: "New Moon",        emoji: "🌑", range: [0, 1.85],    illumination: 0,   description: "The sky is dark. Beginnings stir in the void.", rituals: ["Set intentions on paper — write what you're calling in", "Create a vision board or altar for the new cycle", "Meditate in darkness; let silence speak", "Plant seeds — literal or symbolic", "Cleanse your space with smoke or sound"], energy: "Initiation · Planting · Stillness", glowColor: "rgba(180,160,255,0.15)" },
  { name: "Waxing Crescent", emoji: "🌒", range: [1.85, 7.38],  illumination: 25,  description: "A sliver of light. Your intentions take their first breath.", rituals: ["Take one concrete step toward your new-moon intention", "Journal about what you desire without self-editing", "Carry a crystal or talisman to anchor your focus", "Begin something you've been postponing", "Speak affirmations aloud each morning"], energy: "Growth · Action · Faith", glowColor: "rgba(200,180,255,0.18)" },
  { name: "First Quarter",   emoji: "🌓", range: [7.38, 11.07], illumination: 50,  description: "Half-lit. Momentum meets resistance. Push through.", rituals: ["Identify and name the obstacle in your path", "Do a decision-making ritual — flip a coin, pull a card", "Move your body — run, dance, sweat it out", "Have the conversation you've been avoiding", "Revisit your intentions and adjust without judgment"], energy: "Decision · Challenge · Courage", glowColor: "rgba(220,190,255,0.2)" },
  { name: "Waxing Gibbous",  emoji: "🌔", range: [11.07, 14.77],illumination: 75,  description: "Almost full. Refine, adjust, trust the process.", rituals: ["Review your intentions — what needs refinement?", "Practice gratitude for progress already made", "Fast or cleanse the body to sharpen the mind", "Do deep work: edit, revise, polish your craft", "Let go of perfectionism — done is sacred"], energy: "Refinement · Patience · Trust", glowColor: "rgba(230,210,255,0.22)" },
  { name: "Full Moon",       emoji: "🌕", range: [14.77, 16.61],illumination: 100, description: "Peak light. Everything hidden is now revealed.", rituals: ["Charge your crystals and sacred tools under moonlight", "Write down what no longer serves you — burn it", "Perform a gratitude ceremony", "Take a moon bath: sit outside under the light", "Pull tarot or oracle cards for the cycle ahead"], energy: "Culmination · Revelation · Release", glowColor: "rgba(255,240,200,0.38)" },
  { name: "Waning Gibbous",  emoji: "🌖", range: [16.61, 20.31],illumination: 75,  description: "Light recedes. Share what you've learned.", rituals: ["Teach, mentor, or share wisdom with someone", "Express gratitude to people who supported you", "Begin releasing habits that dull your light", "Donate or give something away", "Rest more than usual — you've earned it"], energy: "Sharing · Gratitude · Surrender", glowColor: "rgba(200,220,255,0.18)" },
  { name: "Last Quarter",    emoji: "🌗", range: [20.31, 23.99],illumination: 50,  description: "Half-dark. Release what the full moon revealed.", rituals: ["Write a forgiveness letter (to self or another) — don't send it", "Declutter a physical space in your home", "Break a pattern: skip something you do mindlessly", "Sit with discomfort instead of numbing it", "Pull a shadow card — what are you avoiding?"], energy: "Release · Forgiveness · Clearing", glowColor: "rgba(180,200,255,0.15)" },
  { name: "Waning Crescent", emoji: "🌘", range: [23.99, 29.53],illumination: 10,  description: "Almost dark. Rest. Integration. The cycle completes.", rituals: ["Go inward — journal, meditate, or sit in silence", "Spend time alone without screens or distraction", "Sleep earlier; let your body reset", "Practice a body scan or Yoga Nidra", "Reflect: what did this cycle teach you?"], energy: "Rest · Integration · Surrender", glowColor: "rgba(160,160,220,0.12)" },
];

function getMoonPhase(date) {
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const LUNAR_CYCLE = 29.530589;
  const diff = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  const normalized = ((diff % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
  const phase = PHASES.find(p => normalized >= p.range[0] && normalized < p.range[1]) || PHASES[7];
  return { phase, dayOfCycle: Math.round(normalized), daysUntilNew: Math.round(LUNAR_CYCLE - normalized) };
}

function getUpcomingPhases(date) {
  const LUNAR_CYCLE = 29.530589;
  const upcoming = [];
  for (let i = 1; i <= 28; i++) {
    const future = new Date(date.getTime() + i * 24 * 60 * 60 * 1000);
    const prev = new Date(date.getTime() + (i - 1) * 24 * 60 * 60 * 1000);
    const { phase } = getMoonPhase(future);
    const { phase: prevPhase } = getMoonPhase(prev);
    if (phase.name !== prevPhase.name) {
      upcoming.push({ phase, date: future.toLocaleDateString("en-US", { month: "short", day: "numeric" }), daysAway: i });
    }
  }
  return upcoming.slice(0, 4);
}

function MoonVisual({ illumination, phaseName }) {
  const isWaning = phaseName.includes("Waning") || phaseName === "Last Quarter";
  const isNew = phaseName === "New Moon";
  const isFull = phaseName === "Full Moon";
  return (
    <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: -18, borderRadius: "50%", background: isFull ? "radial-gradient(circle, rgba(255,240,180,0.32) 0%, rgba(255,220,100,0.08) 50%, transparent 70%)" : isNew ? "radial-gradient(circle, rgba(100,80,200,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(200,180,255,0.18) 0%, transparent 70%)", animation: "pulse 4s ease-in-out infinite" }} />
      <svg width="150" height="150" viewBox="0 0 160 160">
        <defs>
          <radialGradient id="mb" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={isFull ? "#fff8e0" : isNew ? "#1a1830" : "#d4c8f0"} />
            <stop offset="60%" stopColor={isFull ? "#f0d890" : isNew ? "#0f0e1a" : "#9880c8"} />
            <stop offset="100%" stopColor={isFull ? "#c8a840" : isNew ? "#080810" : "#5040a0"} />
          </radialGradient>
          <clipPath id="mc"><circle cx="80" cy="80" r="72" /></clipPath>
        </defs>
        <circle cx="80" cy="80" r="72" fill="url(#mb)" />
        {!isFull && !isNew && <ellipse cx={isWaning ? 80 + (72*(1-illumination/100)) : 80-(72*(1-illumination/100))} cy="80" rx={72*Math.abs(1-illumination/50)} ry="72" fill="#060610" clipPath="url(#mc)" />}
        {isNew && <circle cx="80" cy="80" r="72" fill="#060610" />}
        {!isNew && <><circle cx="60" cy="65" r="7" fill="rgba(0,0,0,0.1)" /><circle cx="100" cy="90" r="5" fill="rgba(0,0,0,0.08)" /><circle cx="75" cy="100" r="4" fill="rgba(0,0,0,0.07)" /></>}
        <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function MoonPage() {
  const today = new Date();
  const { phase, dayOfCycle, daysUntilNew } = getMoonPhase(today);
  const upcoming = getUpcomingPhases(today);
  const [selectedRitual, setSelectedRitual] = useState(null);
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.8s ease both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.45em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 12 }}>✦ Lunar Sanctum ✦</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 700, margin: "0 0 8px", background: "linear-gradient(160deg, #f0e0ff 0%, #d0a8ff 40%, #f4d878 80%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Moon Tracker</h1>
        <div style={{ fontSize: 12, color: "rgba(200,180,255,0.35)", letterSpacing: "0.1em", fontStyle: "italic" }}>{dateStr}</div>
      </div>

      {/* Main card */}
      <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(200,170,255,0.1)", borderRadius: 24, padding: "40px 30px 34px", marginBottom: 20, boxShadow: `0 0 60px ${phase.glowColor}, 0 0 120px rgba(100,80,180,0.06)`, animation: "fadeUp 0.8s ease 0.1s both" }}>
        <div style={{ marginBottom: 28 }}><MoonVisual illumination={phase.illumination} phaseName={phase.name} /></div>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 26, fontWeight: 600, letterSpacing: "0.07em", background: "linear-gradient(135deg, #e8d8ff, #fff4c8, #c8b8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 5 }}>{phase.name}</div>
          <div style={{ fontSize: 11, color: "rgba(200,180,255,0.45)", letterSpacing: "0.18em", fontFamily: "'Cinzel', serif" }}>{phase.energy}</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 16, fontStyle: "italic", color: "rgba(230,220,255,0.6)", margin: "14px 0 24px", lineHeight: 1.65, fontFamily: "'IM Fell English', Georgia, serif" }}>{phase.description}</div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, padding: "14px 0", borderTop: "1px solid rgba(200,170,255,0.08)", borderBottom: "1px solid rgba(200,170,255,0.08)", marginBottom: 28 }}>
          {[{ label: "Day of Cycle", value: `${dayOfCycle} / 29` }, { label: "Illumination", value: `${phase.illumination}%` }, { label: "New Moon In", value: `${daysUntilNew}d` }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#e8d8ff" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: "rgba(200,170,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 3, fontFamily: "'Cinzel', serif" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Rituals */}
        <div>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.28em", color: "rgba(200,180,255,0.42)", textTransform: "uppercase", marginBottom: 12 }}>✦ Ritual Suggestions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {phase.rituals.map((r, i) => (
              <div key={i} onClick={() => setSelectedRitual(selectedRitual === i ? null : i)} style={{ padding: "11px 13px", borderRadius: 8, fontSize: 14.5, color: selectedRitual === i ? "rgba(230,220,255,0.92)" : "rgba(210,200,255,0.65)", lineHeight: 1.55, cursor: "pointer", borderLeft: `2px solid ${selectedRitual === i ? "rgba(200,170,255,0.8)" : "transparent"}`, background: selectedRitual === i ? "rgba(200,170,255,0.09)" : "transparent", transition: "all 0.22s ease", fontFamily: "Georgia, serif", fontWeight: 300 }}>
                <span style={{ color: "rgba(180,160,255,0.45)", marginRight: 9, fontSize: 10 }}>{selectedRitual === i ? "◆" : "◇"}</span>{r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming phases */}
      <div style={{ animation: "fadeUp 0.8s ease 0.25s both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(200,180,255,0.35)", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Coming Phases</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {upcoming.map((u, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,170,255,0.08)", borderRadius: 14, padding: "13px 15px", display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ fontSize: 24 }}>{u.phase.emoji}</div>
              <div>
                <div style={{ fontSize: 13, color: "rgba(230,220,255,0.8)", fontFamily: "Georgia, serif" }}>{u.phase.name}</div>
                <div style={{ fontSize: 11, color: "rgba(180,160,255,0.42)", marginTop: 2, fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>{u.date} · {u.daysAway}d away</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 60 }}>
        <div style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: "0.35em", color: "rgba(180,140,255,0.18)", textTransform: "uppercase" }}>as above · so below</div>
      </div>
    </div>
  );
}

// ─── Playlist Page ────────────────────────────────────────────────────────────

const FLOATERS = ["☮", "✌", "🌸", "🍄", "🌀", "⭐", "🌙", "🌿", "🔮", "♾", "🌈", "✨"];

function PlaylistPage() {
  const [prompt, setPrompt] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(null);
  const [floaters, setFloaters] = useState([]);

  useEffect(() => {
    setFloaters(Array.from({ length: 14 }, (_, i) => ({
      id: i, symbol: FLOATERS[i % FLOATERS.length],
      left: Math.random() * 95, top: Math.random() * 95,
      size: 13 + Math.random() * 18, delay: Math.random() * 5, dur: 4 + Math.random() * 5,
    })));
  }, []);

  async function generatePlaylist() {
    if (!prompt.trim()) return;
    setLoading(true); setTracks([]); setError(""); setPlaylistName("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a cosmic psychedelic music curator who knows every trippy, groovy, mind-expanding track ever made. Your universe spans: classic psychedelic rock (Jefferson Airplane, Grateful Dead, Jimi Hendrix, Janis Joplin, The Doors, Pink Floyd, Syd Barrett), acid folk (Donovan, Nick Drake, Vashti Bunyan, Incredible String Band), psych pop (The Beatles psychedelic era, The Byrds, Love, The Mamas & the Papas), krautrock (Can, Neu!, Amon Düül II, Tangerine Dream), cosmic Americana (CSNY, Neil Young, Country Joe), world/raga influenced (Ravi Shankar crossover, Traffic), neo-psychedelia (Tame Impala, Unknown Mortal Orchestra, Allah-Las, Khruangbin, Mild High Club, King Gizzard & the Lizard Wizard, Pond), shoegaze (My Bloody Valentine, Slowdive), dream pop (Beach House, Mazzy Star, Broadcast), and modern folk-psych (Fleet Foxes, Devendra Banhart, Joanna Newsom, Weyes Blood). Include deep cuts, not just obvious hits. Return ONLY valid JSON, no markdown, no explanation: {"name": "playlist name (cosmic, dreamy, and evocative)", "tracks": [{"title": "song title", "artist": "artist name", "vibe": "one short cosmic descriptor (max 5 words)"}]}  with 15 tracks total.`,
          messages: [{ role: "user", content: `Create a psychedelic hippie playlist for this vibe: "${prompt}"` }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setPlaylistName(parsed.name); setTracks(parsed.tracks || []);
    } catch { setError("the cosmos got scrambled... try again ✨"); }
    setLoading(false);
  }

  function copyTrack(track) {
    navigator.clipboard.writeText(`${track.title} ${track.artist}`);
    setCopied(track.title); setTimeout(() => setCopied(null), 1800);
  }
  function copyAll() {
    navigator.clipboard.writeText(tracks.map(t => `${t.title} - ${t.artist}`).join("\n"));
    setCopied("ALL"); setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 80px" }}>

      {/* Floating symbols */}
      {floaters.map(f => (
        <div key={f.id} style={{ position: "fixed", left: `${f.left}%`, top: `${f.top}%`, fontSize: `${f.size}px`, animation: `float ${f.dur}s ${f.delay}s ease-in-out infinite`, pointerEvents: "none", zIndex: 0, userSelect: "none", opacity: 0.1 }}>{f.symbol}</div>
      ))}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.8s ease both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.45em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 16 }}>✦ Kozmic Witch ✦</div>
        <div style={{ fontSize: 44, marginBottom: 10, animation: "spin 20s linear infinite, pulse 3s ease-in-out infinite" }}>☀️</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 700, margin: "0 0 8px", background: "linear-gradient(135deg, #ff9f44, #c084fc, #34d399, #ff9f44)", backgroundSize: "300% 300%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "rainbow-shift 6s linear infinite" }}>Cosmic Frequencies</h1>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(180,140,255,0.35)", textTransform: "uppercase" }}>✦ psychedelic playlist oracle ✦</div>
      </div>

      {/* Input */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px", marginBottom: 20, backdropFilter: "blur(8px)" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(180,140,255,0.4)", marginBottom: 12 }}>☽ describe your cosmic journey ☾</div>
        <textarea
          value={prompt} onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generatePlaylist(); } }}
          placeholder="e.g. golden hour in a meadow, desert vision quest, late night stargazing, acid folk by the fire..."
          rows={3}
          style={{ width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#f0ead6", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 14, padding: "13px", resize: "none", outline: "none", lineHeight: 1.65, boxSizing: "border-box" }}
        />
        <button onClick={generatePlaylist} disabled={loading || !prompt.trim()} style={{ marginTop: 14, width: "100%", padding: "14px", background: loading ? "rgba(255,255,255,0.03)" : "linear-gradient(135deg, rgba(255,159,68,0.15), rgba(192,132,252,0.15), rgba(52,211,153,0.15))", border: `1px solid ${loading ? "rgba(255,255,255,0.08)" : "rgba(192,132,252,0.35)"}`, borderRadius: 10, color: loading ? "rgba(180,140,255,0.3)" : "#e8d5ff", fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s" }}>
          {loading ? <span style={{ animation: "pulse 0.8s infinite" }}>✨ tuning into the cosmos...</span> : "✦ open the portal"}
        </button>
      </div>

      {error && <div style={{ background: "rgba(255,159,68,0.08)", border: "1px solid rgba(255,159,68,0.25)", borderRadius: 10, padding: "14px", color: "#ff9f44", fontSize: 13, textAlign: "center", marginBottom: 20 }}>{error}</div>}

      {/* Results */}
      {tracks.length > 0 && (
        <div style={{ animation: "fadeUp 0.6s ease both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(180,140,255,0.35)", textTransform: "uppercase", marginBottom: 6 }}>✦ the universe answered</div>
              <div style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: 18, background: "linear-gradient(135deg, #ff9f44, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{playlistName}</div>
            </div>
            <button onClick={copyAll} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: copied === "ALL" ? "#34d399" : "rgba(180,140,255,0.45)", fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "7px 13px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {copied === "ALL" ? "✓ copied!" : "copy all"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {tracks.map((track, i) => (
              <div key={i} onClick={() => copyTrack(track)} style={{ display: "grid", gridTemplateColumns: "26px 1fr auto", alignItems: "center", gap: 13, padding: "12px 15px", background: copied === track.title ? "rgba(192,132,252,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${copied === track.title ? "rgba(192,132,252,0.3)" : "rgba(255,255,255,0.05)"}`, borderRadius: 10, cursor: "pointer", transition: "all 0.2s", animation: `fadeUp 0.4s ${i * 0.04}s both ease` }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={e => { if (copied !== track.title) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <span style={{ color: "rgba(180,140,255,0.3)", fontSize: 10, textAlign: "right", fontFamily: "'Cinzel', serif" }}>{String(i+1).padStart(2,"0")}</span>
                <div>
                  <div style={{ fontSize: 14, color: "#f0ead6", fontWeight: 400, marginBottom: 2, fontFamily: "Georgia, serif" }}>{track.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(180,140,255,0.45)", fontFamily: "Georgia, serif" }}>
                    {track.artist}
                    {track.vibe && <span style={{ marginLeft: 10, color: "rgba(192,132,252,0.5)", fontSize: 11, fontStyle: "italic" }}>— {track.vibe}</span>}
                  </div>
                </div>
                <span style={{ fontSize: 10, color: copied === track.title ? "#34d399" : "rgba(180,140,255,0.25)", transition: "color 0.2s", minWidth: 36, textAlign: "right", fontFamily: "'Cinzel', serif" }}>{copied === track.title ? "✓" : "copy"}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: "13px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10, fontSize: 11, color: "rgba(180,140,255,0.35)", letterSpacing: "0.05em", textAlign: "center", lineHeight: 2, fontFamily: "'Cinzel', serif" }}>
            click any track to copy for spotify search
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 60 }}>
        <div style={{ fontSize: 9, fontFamily: "'Cinzel', serif", letterSpacing: "0.35em", color: "rgba(180,140,255,0.18)", textTransform: "uppercase" }}>as above · so below</div>
      </div>
    </div>
  );
}

// ─── Birth Chart ─────────────────────────────────────────────────────────────

const CITIES = [
  {n:"New York, USA",lat:40.713,lon:-74.006,utc:-5},{n:"Los Angeles, USA",lat:34.052,lon:-118.244,utc:-8},
  {n:"Chicago, USA",lat:41.878,lon:-87.630,utc:-6},{n:"Houston, USA",lat:29.760,lon:-95.370,utc:-6},
  {n:"Phoenix, USA",lat:33.448,lon:-112.074,utc:-7},{n:"Philadelphia, USA",lat:39.952,lon:-75.165,utc:-5},
  {n:"San Antonio, USA",lat:29.425,lon:-98.494,utc:-6},{n:"Dallas, USA",lat:32.776,lon:-96.797,utc:-6},
  {n:"San Francisco, USA",lat:37.774,lon:-122.419,utc:-8},{n:"Seattle, USA",lat:47.606,lon:-122.332,utc:-8},
  {n:"Denver, USA",lat:39.739,lon:-104.984,utc:-7},{n:"Nashville, USA",lat:36.162,lon:-86.781,utc:-6},
  {n:"Miami, USA",lat:25.774,lon:-80.194,utc:-5},{n:"Atlanta, USA",lat:33.749,lon:-84.388,utc:-5},
  {n:"Boston, USA",lat:42.360,lon:-71.059,utc:-5},{n:"Las Vegas, USA",lat:36.175,lon:-115.137,utc:-8},
  {n:"Minneapolis, USA",lat:44.977,lon:-93.265,utc:-6},{n:"New Orleans, USA",lat:29.951,lon:-90.071,utc:-6},
  {n:"Portland, USA",lat:45.523,lon:-122.676,utc:-8},{n:"Detroit, USA",lat:42.331,lon:-83.046,utc:-5},
  {n:"Washington DC, USA",lat:38.907,lon:-77.037,utc:-5},{n:"Austin, USA",lat:30.267,lon:-97.743,utc:-6},
  {n:"Toronto, Canada",lat:43.651,lon:-79.383,utc:-5},{n:"Vancouver, Canada",lat:49.246,lon:-123.116,utc:-8},
  {n:"Montreal, Canada",lat:45.508,lon:-73.554,utc:-5},{n:"Mexico City, Mexico",lat:19.433,lon:-99.133,utc:-6},
  {n:"London, UK",lat:51.507,lon:-0.128,utc:0},{n:"Paris, France",lat:48.857,lon:2.352,utc:1},
  {n:"Berlin, Germany",lat:52.520,lon:13.405,utc:1},{n:"Madrid, Spain",lat:40.416,lon:-3.703,utc:1},
  {n:"Rome, Italy",lat:41.902,lon:12.496,utc:1},{n:"Amsterdam, Netherlands",lat:52.370,lon:4.895,utc:1},
  {n:"Vienna, Austria",lat:48.208,lon:16.373,utc:1},{n:"Zurich, Switzerland",lat:47.376,lon:8.541,utc:1},
  {n:"Stockholm, Sweden",lat:59.334,lon:18.063,utc:1},{n:"Oslo, Norway",lat:59.913,lon:10.752,utc:1},
  {n:"Copenhagen, Denmark",lat:55.676,lon:12.568,utc:1},{n:"Helsinki, Finland",lat:60.169,lon:24.935,utc:2},
  {n:"Warsaw, Poland",lat:52.230,lon:21.012,utc:1},{n:"Prague, Czech Republic",lat:50.075,lon:14.438,utc:1},
  {n:"Budapest, Hungary",lat:47.498,lon:19.040,utc:1},{n:"Athens, Greece",lat:37.983,lon:23.727,utc:2},
  {n:"Istanbul, Turkey",lat:41.015,lon:28.980,utc:3},{n:"Lisbon, Portugal",lat:38.717,lon:-9.143,utc:0},
  {n:"Dublin, Ireland",lat:53.333,lon:-6.249,utc:0},{n:"Brussels, Belgium",lat:50.850,lon:4.351,utc:1},
  {n:"Barcelona, Spain",lat:41.385,lon:2.173,utc:1},{n:"Bucharest, Romania",lat:44.432,lon:26.104,utc:2},
  {n:"Tokyo, Japan",lat:35.689,lon:139.692,utc:9},{n:"Beijing, China",lat:39.914,lon:116.392,utc:8},
  {n:"Shanghai, China",lat:31.228,lon:121.474,utc:8},{n:"Mumbai, India",lat:19.076,lon:72.878,utc:5.5},
  {n:"Delhi, India",lat:28.614,lon:77.209,utc:5.5},{n:"Seoul, South Korea",lat:37.566,lon:126.978,utc:9},
  {n:"Bangkok, Thailand",lat:13.756,lon:100.502,utc:7},{n:"Singapore",lat:1.352,lon:103.820,utc:8},
  {n:"Hong Kong",lat:22.319,lon:114.170,utc:8},{n:"Dubai, UAE",lat:25.204,lon:55.270,utc:4},
  {n:"Tel Aviv, Israel",lat:32.085,lon:34.782,utc:2},{n:"Jakarta, Indonesia",lat:-6.208,lon:106.845,utc:7},
  {n:"Kuala Lumpur, Malaysia",lat:3.140,lon:101.686,utc:8},{n:"Manila, Philippines",lat:14.599,lon:120.984,utc:8},
  {n:"Taipei, Taiwan",lat:25.047,lon:121.517,utc:8},{n:"Sydney, Australia",lat:-33.869,lon:151.207,utc:10},
  {n:"Melbourne, Australia",lat:-37.814,lon:144.963,utc:10},{n:"Auckland, New Zealand",lat:-36.867,lon:174.770,utc:12},
  {n:"Cairo, Egypt",lat:30.044,lon:31.236,utc:2},{n:"Lagos, Nigeria",lat:6.455,lon:3.384,utc:1},
  {n:"Nairobi, Kenya",lat:-1.292,lon:36.822,utc:3},{n:"Cape Town, South Africa",lat:-33.924,lon:18.424,utc:2},
  {n:"Johannesburg, South Africa",lat:-26.204,lon:28.047,utc:2},{n:"Casablanca, Morocco",lat:33.573,lon:-7.590,utc:1},
  {n:"Springfield, MO, USA",lat:37.215,lon:-93.298,utc:-6},{n:"Kansas City, MO, USA",lat:39.099,lon:-94.578,utc:-6},
  {n:"St. Louis, MO, USA",lat:38.627,lon:-90.197,utc:-6},{n:"Oklahoma City, USA",lat:35.468,lon:-97.516,utc:-6},
  {n:"Tulsa, OK, USA",lat:36.154,lon:-95.993,utc:-6},{n:"Memphis, TN, USA",lat:35.149,lon:-90.049,utc:-6},
  {n:"Louisville, KY, USA",lat:38.252,lon:-85.758,utc:-5},{n:"Indianapolis, IN, USA",lat:39.768,lon:-86.158,utc:-5},
  {n:"Columbus, OH, USA",lat:39.961,lon:-82.999,utc:-5},{n:"Cleveland, OH, USA",lat:41.500,lon:-81.695,utc:-5},
  {n:"Cincinnati, OH, USA",lat:39.103,lon:-84.512,utc:-5},{n:"Pittsburgh, PA, USA",lat:40.440,lon:-79.996,utc:-5},
  {n:"Charlotte, NC, USA",lat:35.227,lon:-80.843,utc:-5},{n:"Raleigh, NC, USA",lat:35.779,lon:-78.638,utc:-5},
  {n:"Richmond, VA, USA",lat:37.541,lon:-77.434,utc:-5},{n:"Baltimore, MD, USA",lat:39.290,lon:-76.612,utc:-5},
  {n:"Jacksonville, FL, USA",lat:30.332,lon:-81.656,utc:-5},{n:"Tampa, FL, USA",lat:27.948,lon:-82.458,utc:-5},
  {n:"Orlando, FL, USA",lat:28.538,lon:-81.379,utc:-5},{n:"Albuquerque, NM, USA",lat:35.085,lon:-106.651,utc:-7},
  {n:"Tucson, AZ, USA",lat:32.222,lon:-110.926,utc:-7},{n:"Sacramento, CA, USA",lat:38.582,lon:-121.494,utc:-8},
  {n:"San Diego, CA, USA",lat:32.715,lon:-117.157,utc:-8},{n:"Salt Lake City, UT, USA",lat:40.760,lon:-111.891,utc:-7},
  {n:"Omaha, NE, USA",lat:41.257,lon:-95.995,utc:-6},{n:"Wichita, KS, USA",lat:37.688,lon:-97.336,utc:-6},
  {n:"Boise, ID, USA",lat:43.615,lon:-116.202,utc:-7},{n:"Spokane, WA, USA",lat:47.659,lon:-117.426,utc:-8},
  {n:"Anchorage, AK, USA",lat:61.218,lon:-149.900,utc:-9},{n:"Honolulu, HI, USA",lat:21.307,lon:-157.858,utc:-10},
  {n:"Rio de Janeiro, Brazil",lat:-22.906,lon:-43.172,utc:-3},{n:"Lima, Peru",lat:-12.046,lon:-77.043,utc:-5},
  {n:"Bogotá, Colombia",lat:4.711,lon:-74.073,utc:-5},{n:"Santiago, Chile",lat:-33.457,lon:-70.648,utc:-4},
];

const ZODIAC = [
  {name:"Aries",g:"♈",el:"fire",c:"rgba(210,70,50,0.2)"},{name:"Taurus",g:"♉",el:"earth",c:"rgba(70,160,80,0.15)"},
  {name:"Gemini",g:"♊",el:"air",c:"rgba(210,180,60,0.15)"},{name:"Cancer",g:"♋",el:"water",c:"rgba(60,110,210,0.15)"},
  {name:"Leo",g:"♌",el:"fire",c:"rgba(210,70,50,0.2)"},{name:"Virgo",g:"♍",el:"earth",c:"rgba(70,160,80,0.15)"},
  {name:"Libra",g:"♎",el:"air",c:"rgba(210,180,60,0.15)"},{name:"Scorpio",g:"♏",el:"water",c:"rgba(60,110,210,0.15)"},
  {name:"Sagittarius",g:"♐",el:"fire",c:"rgba(210,70,50,0.2)"},{name:"Capricorn",g:"♑",el:"earth",c:"rgba(70,160,80,0.15)"},
  {name:"Aquarius",g:"♒",el:"air",c:"rgba(210,180,60,0.15)"},{name:"Pisces",g:"♓",el:"water",c:"rgba(60,110,210,0.15)"},
];

const PDATA = {
  Sun:{g:"☉",c:"#f4d060"},Moon:{g:"☽",c:"#c8d8f8"},Mercury:{g:"☿",c:"#a0c890"},
  Venus:{g:"♀",c:"#f0a8c8"},Mars:{g:"♂",c:"#e05040"},Jupiter:{g:"♃",c:"#d4a848"},
  Saturn:{g:"♄",c:"#b8a870"},Uranus:{g:"♅",c:"#80d4e0"},Neptune:{g:"♆",c:"#7898e0"},Pluto:{g:"♇",c:"#c078c0"},
};

const ASPECT_DEFS = [
  {angle:0,orb:8,color:"rgba(255,220,100,0.35)",name:"Conjunction"},
  {angle:180,orb:8,color:"rgba(220,80,80,0.3)",name:"Opposition"},
  {angle:120,orb:6,color:"rgba(80,200,120,0.3)",name:"Trine"},
  {angle:90,orb:6,color:"rgba(220,120,60,0.3)",name:"Square"},
  {angle:60,orb:4,color:"rgba(80,180,220,0.25)",name:"Sextile"},
];

function n360(x){return((x%360)+360)%360;}
function toJD(y,mo,d,h){
  if(mo<=2){y--;mo+=12;}
  const A=Math.floor(y/100),B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+h/24+B-1524.5;
}
function solveK(M,e){
  const r=M*Math.PI/180;let E=r+e*Math.sin(r)*(1+e*Math.cos(r));
  for(let i=0;i<8;i++)E-=(E-e*Math.sin(E)-r)/(1-e*Math.cos(E));
  return E;
}
function hxy(el){
  const E=solveK(n360(el.M),el.e);
  const xv=Math.cos(E)-el.e,yv=Math.sqrt(1-el.e*el.e)*Math.sin(E);
  const v=Math.atan2(yv,xv),r=Math.sqrt(xv*xv+yv*yv);
  const wr=el.w*Math.PI/180,Nr=el.N*Math.PI/180,ir=el.i*Math.PI/180;
  return{
    xh:r*(Math.cos(Nr)*Math.cos(v+wr)-Math.sin(Nr)*Math.sin(v+wr)*Math.cos(ir)),
    yh:r*(Math.sin(Nr)*Math.cos(v+wr)+Math.cos(Nr)*Math.sin(v+wr)*Math.cos(ir)),
  };
}
function getEl(body,d){
  const B={
    Sun:{N:0,i:0,w:n360(282.9404+4.70935e-5*d),a:1,e:0.016709-1.151e-9*d,M:n360(356.0470+0.9856002585*d)},
    Mercury:{N:n360(48.3313+3.24587e-5*d),i:7.0047,w:n360(29.1241+1.01444e-5*d),a:0.387098,e:0.205635+5.59e-10*d,M:n360(168.6562+4.0923344368*d)},
    Venus:{N:n360(76.6799+2.46590e-5*d),i:3.3946,w:n360(54.8910+1.38374e-5*d),a:0.723330,e:0.006773-1.302e-9*d,M:n360(48.0052+1.6021302244*d)},
    Mars:{N:n360(49.5574+2.11081e-5*d),i:1.8497,w:n360(286.5016+2.92961e-5*d),a:1.523688,e:0.093405+2.516e-9*d,M:n360(18.6021+0.5240207766*d)},
    Jupiter:{N:n360(100.4542+2.76854e-5*d),i:1.3030,w:n360(273.8777+1.64505e-5*d),a:5.20256,e:0.048498+4.469e-9*d,M:n360(19.8950+0.0830853001*d)},
    Saturn:{N:n360(113.6634+2.38980e-5*d),i:2.4886,w:n360(339.3939+2.97661e-5*d),a:9.55475,e:0.055546-9.499e-9*d,M:n360(316.9670+0.0334442282*d)},
    Uranus:{N:n360(74.0005+1.3978e-5*d),i:0.7733,w:n360(96.6612+3.0565e-5*d),a:19.18171,e:0.047318+7.45e-9*d,M:n360(142.5905+0.011725806*d)},
    Neptune:{N:n360(131.7806+3.0173e-5*d),i:1.7700,w:n360(272.8461-6.027e-6*d),a:30.05826,e:0.008606+2.15e-9*d,M:n360(260.2471+0.005995147*d)},
    Pluto:{N:n360(110.3833),i:17.1542,w:n360(113.7683),a:39.48168,e:0.24882,M:n360(14.8989+0.00396*d)},
  };
  return B[body];
}

function calcPositions(JD_UTC, lat, lon) {
  const d = JD_UTC - 2451545.0;

  // Sun (geocentric)
  const sunEl = getEl('Sun', d);
  const {xh:xs,yh:ys} = hxy(sunEl);
  const sunLon = n360(Math.atan2(ys,xs)*180/Math.PI);

  const pos = { Sun: sunLon };

  // Moon with perturbations
  const N_m = n360(125.1228 - 0.0529538083*d);
  const w_m = n360(318.0634 + 0.1643573223*d);
  const M_m = n360(115.3654 + 13.0649929509*d);
  const e_m = 0.054900;
  const E_m = solveK(M_m, e_m);
  const xv_m = Math.cos(E_m)-e_m, yv_m = Math.sqrt(1-e_m*e_m)*Math.sin(E_m);
  const v_m = Math.atan2(yv_m,xv_m)*180/Math.PI;
  const Lm0 = n360(N_m + w_m + v_m);
  const Ms = sunEl.M*Math.PI/180, Mm = M_m*Math.PI/180;
  const Dm = (Lm0-sunLon)*Math.PI/180, Fm = (Lm0-N_m)*Math.PI/180;
  const moonPerturb =
    -1.274*Math.sin(Mm-2*Dm)+0.658*Math.sin(2*Dm)-0.186*Math.sin(Ms)
    -0.059*Math.sin(2*Mm-2*Dm)-0.057*Math.sin(Mm-2*Dm+Ms)+0.053*Math.sin(Mm+2*Dm)
    +0.046*Math.sin(2*Dm-Ms)+0.041*Math.sin(Mm-Ms)-0.035*Math.sin(Dm)
    -0.031*Math.sin(Mm+Ms)-0.015*Math.sin(2*Fm-2*Dm)+0.011*Math.sin(Mm-4*Dm);
  pos['Moon'] = n360(Lm0 + moonPerturb);

  // Planets
  for (const p of ['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto']) {
    const el = getEl(p, d);
    const {xh,yh} = hxy(el);
    pos[p] = n360(Math.atan2(yh+ys, xh+xs)*180/Math.PI);
  }

  // Ascendant
  const T = d/36525;
  const JD0 = Math.floor(JD_UTC-0.5)+0.5;
  const H = (JD_UTC-JD0)*24;
  const T0 = (JD0-2451545)/36525;
  let GMST = ((6.697374558 + 2400.0513369*T0 + 0.0000258622*T0*T0 + H*1.00273790935) % 24 + 24) % 24;
  const LST = n360(GMST*15 + lon);
  const eps = (23.4393 - 0.0000004*d)*Math.PI/180;
  const LSTr = LST*Math.PI/180, latr = lat*Math.PI/180;
  pos['Ascendant'] = n360(Math.atan2(-Math.cos(LSTr), Math.sin(LSTr)*Math.cos(eps)+Math.tan(latr)*Math.sin(eps))*180/Math.PI);

  // MC
  const MCr = Math.atan2(Math.sin(LSTr)/Math.cos(eps), Math.cos(LSTr));
  pos['MC'] = n360(MCr*180/Math.PI);

  return pos;
}

function getSign(lon){return ZODIAC[Math.floor(n360(lon)/30)].name;}
function getDeg(lon){return Math.floor(n360(lon)%30);}
function getHouseNum(lon,asc){return Math.floor(n360(n360(lon)-n360(asc))/30)+1;}

function getAspects(positions) {
  const planets = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const aspects = [];
  for (let i=0;i<planets.length;i++) for (let j=i+1;j<planets.length;j++) {
    const diff = Math.abs(n360(positions[planets[i]]-positions[planets[j]]));
    const ang = diff>180 ? 360-diff : diff;
    for (const asp of ASPECT_DEFS) {
      if (Math.abs(ang-asp.angle)<=asp.orb) {
        aspects.push({p1:planets[i],p2:planets[j],...asp,actual:ang});
        break;
      }
    }
  }
  return aspects;
}

// ─── Chart Education Data ────────────────────────────────────────────────────

const PLANET_MEANINGS = {
  Sun:     { rules: "Your core identity, ego, and life purpose", question: "Who am I at my center?" },
  Moon:    { rules: "Your emotions, instincts, and inner world", question: "What do I need to feel safe?" },
  Mercury: { rules: "How you think, communicate, and process information", question: "How do I think and speak?" },
  Venus:   { rules: "Love, beauty, pleasure, and what you're attracted to", question: "What do I love and value?" },
  Mars:    { rules: "Drive, ambition, anger, and how you take action", question: "What motivates and energizes me?" },
  Jupiter: { rules: "Expansion, luck, philosophy, and where life flows easily", question: "Where does life want to grow?" },
  Saturn:  { rules: "Discipline, limits, lessons, and long-term mastery", question: "What am I here to master through effort?" },
  Uranus:  { rules: "Rebellion, innovation, sudden change, and liberation", question: "Where do I break from convention?" },
  Neptune: { rules: "Dreams, intuition, spirituality, and illusion", question: "What do I idealize and dream about?" },
  Pluto:   { rules: "Transformation, power, death and rebirth of the self", question: "Where am I being completely remade?" },
};

const SIGN_MEANINGS = {
  Aries:       "Bold and direct. Here, energy is raw, impulsive, and self-starting.",
  Taurus:      "Grounded and sensual. Here, energy is patient, stubborn, and pleasure-seeking.",
  Gemini:      "Curious and quick. Here, energy is restless, communicative, and dual-natured.",
  Cancer:      "Emotional and protective. Here, energy is nurturing, sensitive, and deeply feeling.",
  Leo:         "Expressive and proud. Here, energy is dramatic, generous, and craves recognition.",
  Virgo:       "Precise and helpful. Here, energy is analytical, critical, and service-oriented.",
  Libra:       "Balanced and relational. Here, energy is diplomatic, indecisive, and beauty-seeking.",
  Scorpio:     "Intense and penetrating. Here, energy is secretive, powerful, and obsessive.",
  Sagittarius: "Free and philosophical. Here, energy is expansive, blunt, and truth-seeking.",
  Capricorn:   "Structured and ambitious. Here, energy is disciplined, cautious, and status-conscious.",
  Aquarius:    "Rebellious and visionary. Here, energy is detached, original, and future-focused.",
  Pisces:      "Fluid and spiritual. Here, energy is empathic, escapist, and boundlessly imaginative.",
};

const HOUSE_MEANINGS = {
  1:  { name: "House of Self",         meaning: "Your appearance, first impressions, and the mask you show the world." },
  2:  { name: "House of Resources",    meaning: "Your money, possessions, values, and sense of self-worth." },
  3:  { name: "House of Mind",         meaning: "Communication, siblings, short trips, and early education." },
  4:  { name: "House of Home",         meaning: "Family, roots, childhood, and your private inner foundation." },
  5:  { name: "House of Pleasure",     meaning: "Creativity, romance, children, play, and self-expression." },
  6:  { name: "House of Health",       meaning: "Daily routines, work habits, health, and service to others." },
  7:  { name: "House of Partnership",  meaning: "Marriage, close partnerships, open enemies, and contracts." },
  8:  { name: "House of Transformation", meaning: "Death, rebirth, sex, shared resources, and the occult." },
  9:  { name: "House of Expansion",   meaning: "Travel, philosophy, higher education, religion, and belief." },
  10: { name: "House of Career",       meaning: "Public reputation, career, authority figures, and life ambition." },
  11: { name: "House of Community",    meaning: "Friends, groups, hopes, dreams, and social causes." },
  12: { name: "House of the Hidden",   meaning: "Secrets, solitude, undoing, spirituality, and what's kept from the world." },
};

const ASPECT_MEANINGS = {
  Conjunction: { feel: "Fusion", desc: "These two planets are fused together — their energies blend and amplify each other. This can be powerful or overwhelming depending on the planets involved." },
  Opposition:  { feel: "Tension", desc: "These planets pull in opposite directions, creating internal tension. You feel torn between two needs, but learning to balance them is the growth edge." },
  Trine:       { feel: "Flow", desc: "These planets work in natural harmony. This is an area of ease and natural talent — energy flows here without much effort." },
  Square:      { feel: "Friction", desc: "These planets create friction and challenge. It's uncomfortable, but this tension often drives your greatest growth and achievements." },
  Sextile:     { feel: "Opportunity", desc: "A gentle, supportive connection. These planets work well together when you make the effort to activate them." },
};

// ─── Interactive Chart Wheel ──────────────────────────────────────────────────

function ChartWheel({ positions, onSelect, selected }) {
  const cx=200, cy=200;
  const RO=188, RI=156, RP_BASE=128, RH=84;
  const asc = positions['Ascendant']||0;

  function angle(lon){ return (180+(lon-asc))*Math.PI/180; }
  function pt(lon,r){ const a=angle(lon); return [cx+r*Math.cos(a), cy-r*Math.sin(a)]; }

  const PLANETS = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const sorted = [...PLANETS].sort((a,b)=>positions[a]-positions[b]);
  const planetR = {};
  let toggle = 0;
  sorted.forEach((p,i)=>{
    const prev = sorted[i-1];
    if(prev){
      const diff = n360(positions[p]-positions[prev]);
      const gap = diff>180?360-diff:diff;
      if(gap<7){ toggle=(toggle===0?1:0); } else toggle=0;
    }
    planetR[p] = RP_BASE + (toggle===1?18:0);
  });

  const aspects = getAspects(positions);

  const isSelected = (type, key) => selected && selected.type===type && selected.key===key;

  return (
    <svg viewBox="0 0 400 400" style={{width:"100%",maxWidth:380,display:"block",margin:"0 auto",cursor:"pointer"}}>
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a0e38"/><stop offset="100%" stopColor="#0a0618"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="glow2"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <circle cx={cx} cy={cy} r={RO} fill="url(#bg)" />
      <circle cx={cx} cy={cy} r={RO} fill="none" stroke="rgba(180,140,255,0.2)" strokeWidth="1"/>

      {/* Zodiac sectors — clickable */}
      {ZODIAC.map((sign,i)=>{
        const a1=angle(i*30), a2=angle((i+1)*30);
        const x1o=cx+RO*Math.cos(a1),y1o=cy-RO*Math.sin(a1);
        const x2o=cx+RO*Math.cos(a2),y2o=cy-RO*Math.sin(a2);
        const x1i=cx+RI*Math.cos(a1),y1i=cy-RI*Math.sin(a1);
        const x2i=cx+RI*Math.cos(a2),y2i=cy-RI*Math.sin(a2);
        const sector=`M ${x1i} ${y1i} L ${x1o} ${y1o} A ${RO} ${RO} 0 0 0 ${x2o} ${y2o} L ${x2i} ${y2i} A ${RI} ${RI} 0 0 1 ${x1i} ${y1i} Z`;
        const mid=angle(i*30+15);
        const tx=cx+(RO+RI)/2*Math.cos(mid), ty=cy-(RO+RI)/2*Math.sin(mid);
        const sel = isSelected('sign', sign.name);
        return(
          <g key={i} onClick={()=>onSelect({type:'sign',key:sign.name,sign})} style={{cursor:'pointer'}}>
            <path d={sector} fill={sel ? "rgba(200,170,255,0.25)" : sign.c} stroke={sel?"rgba(200,170,255,0.6)":"rgba(180,140,255,0.18)"} strokeWidth={sel?1.5:0.5}/>
            <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill={sel?"rgba(255,240,255,0.95)":"rgba(220,200,255,0.7)"} fontFamily="serif">{sign.g}</text>
          </g>
        );
      })}

      {/* House lines */}
      {[...Array(12)].map((_,i)=>{
        const [x1,y1]=pt(n360(asc+i*30),RH);
        const [x2,y2]=pt(n360(asc+i*30),RI);
        const hNum = i+1;
        const sel = isSelected('house', hNum);
        const midAngle = angle(n360(asc + i*30 + 15));
        const hx = cx+(RH+14)*Math.cos(midAngle), hy = cy-(RH+14)*Math.sin(midAngle);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={i%3===0?"rgba(200,170,255,0.5)":"rgba(180,140,255,0.2)"} strokeWidth={i%3===0?1:0.5}/>
            <text x={hx} y={hy} textAnchor="middle" dominantBaseline="middle" fontSize="7"
              fill={sel?"rgba(255,220,120,0.9)":"rgba(180,150,255,0.28)"} fontFamily="'Cinzel',serif"
              style={{cursor:'pointer'}} onClick={()=>onSelect({type:'house',key:hNum})}
            >{hNum}</text>
          </g>
        );
      })}

      {/* ASC/DSC axis */}
      {(()=>{ const [x1,y1]=pt(asc,RH); const [x2,y2]=pt(asc+180,RH); return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(240,220,100,0.5)" strokeWidth="1" strokeDasharray="4,2"/>; })()}

      <circle cx={cx} cy={cy} r={RH} fill="rgba(10,6,24,0.7)" stroke="rgba(180,140,255,0.15)" strokeWidth="1"/>

      {/* Aspect lines — clickable */}
      {aspects.map((asp,i)=>{
        const [x1,y1]=pt(positions[asp.p1],RH-4);
        const [x2,y2]=pt(positions[asp.p2],RH-4);
        const key = `${asp.p1}-${asp.p2}`;
        const sel = isSelected('aspect', key);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={sel ? "rgba(255,255,255,0.7)" : asp.color}
            strokeWidth={sel?2:0.8}
            style={{cursor:'pointer'}}
            onClick={()=>onSelect({type:'aspect',key,asp})}
          />
        );
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r={40} fill="rgba(20,10,50,0.6)"/>
      <text x={cx} y={cy-8} textAnchor="middle" fontSize="16" fill="rgba(200,170,255,0.5)" fontFamily="serif">☽</text>
      <text x={cx} y={cy+10} textAnchor="middle" fontSize="7" fill="rgba(180,150,255,0.35)" fontFamily="'Cinzel',serif" letterSpacing="1">NATAL</text>

      {/* Planets — clickable */}
      {PLANETS.map(p=>{
        if(positions[p]==null) return null;
        const r = planetR[p];
        const [x,y] = pt(positions[p], r);
        const sel = isSelected('planet', p);
        return(
          <g key={p} filter={sel?"url(#glow2)":"url(#glow)"} onClick={()=>onSelect({type:'planet',key:p})} style={{cursor:'pointer'}}>
            <circle cx={x} cy={y} r={sel?12:9} fill={sel?"rgba(60,20,100,0.95)":"rgba(10,6,24,0.85)"} stroke={PDATA[p].c} strokeWidth={sel?2:0.8} opacity="1"/>
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={sel?12:10} fill={PDATA[p].c} fontFamily="serif">{PDATA[p].g}</text>
          </g>
        );
      })}

      {/* AC/MC */}
      {(()=>{ const [x,y]=pt(asc,RI-4); return <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#f4d060" fontFamily="'Cinzel',serif" fontWeight="bold" style={{cursor:'pointer'}} onClick={()=>onSelect({type:'house',key:1})}>AC</text>; })()}
      {(()=>{ const [x,y]=pt(positions['MC']||asc+270,RI-4); return <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#d0b0f8" fontFamily="'Cinzel',serif" fontWeight="bold" style={{cursor:'pointer'}} onClick={()=>onSelect({type:'house',key:10})}>MC</text>; })()}
    </svg>
  );
}

// ─── Chart Info Panel ─────────────────────────────────────────────────────────

function ChartInfoPanel({ selected, positions }) {
  if (!selected) return (
    <div style={{textAlign:"center",padding:"28px 20px",border:"1px dashed rgba(180,140,255,0.15)",borderRadius:16,animation:"fadeUp 0.5s ease both"}}>
      <div style={{fontSize:22,marginBottom:8,opacity:0.4}}>☽</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.25em",color:"rgba(180,140,255,0.35)",textTransform:"uppercase"}}>Tap any planet, sign, or line to learn what it means</div>
    </div>
  );

  const asc = positions['Ascendant']||0;
  let title, subtitle, body, color="#d8c8f8";

  if (selected.type === 'planet') {
    const p = selected.key;
    const sign = getSign(positions[p]);
    const house = getHouseNum(positions[p], asc);
    const pm = PLANET_MEANINGS[p];
    const sm = SIGN_MEANINGS[sign];
    const hm = HOUSE_MEANINGS[house];
    color = PDATA[p].c;
    title = `${PDATA[p].g} ${p}`;
    subtitle = `${sign} · ${hm.name}`;
    body = [
      { label: "What this planet rules", text: pm.rules },
      { label: `In ${sign}`, text: sm },
      { label: `In your ${hm.name}`, text: hm.meaning },
      { label: "The deeper question", text: pm.question },
    ];
  } else if (selected.type === 'sign') {
    const sign = selected.key;
    const sg = selected.sign;
    title = `${sg.g} ${sign}`;
    subtitle = `${sg.el.charAt(0).toUpperCase()+sg.el.slice(1)} sign`;
    body = [
      { label: "Energy", text: SIGN_MEANINGS[sign] },
      { label: "Element", text: { fire:"Passionate, energetic, and action-oriented.", earth:"Practical, grounded, and materially focused.", air:"Intellectual, social, and idea-driven.", water:"Emotional, intuitive, and feeling-based." }[sg.el] },
    ];
  } else if (selected.type === 'house') {
    const h = selected.key;
    const hm = HOUSE_MEANINGS[h];
    title = `House ${h}`;
    subtitle = hm.name;
    body = [
      { label: "This house rules", text: hm.meaning },
      { label: "Think of it as", text: `The ${h}th house is the area of life where you'll find the planets that landed here — it's their stage, their arena.` },
    ];
    color = "#f4d060";
  } else if (selected.type === 'aspect') {
    const { asp } = selected;
    const am = ASPECT_MEANINGS[asp.name];
    color = asp.color.replace(/[^,]+\)/, "1)").replace("rgba","rgba");
    title = `${asp.p1} ${asp.name} ${asp.p2}`;
    subtitle = `${am.feel} · ${Math.round(asp.actual)}° apart`;
    body = [
      { label: `What ${asp.name} means`, text: am.desc },
      { label: asp.p1, text: PLANET_MEANINGS[asp.p1]?.rules },
      { label: asp.p2, text: PLANET_MEANINGS[asp.p2]?.rules },
    ];
  }

  return (
    <div style={{border:"1px solid rgba(180,140,255,0.2)",borderRadius:16,padding:"22px 22px",background:"linear-gradient(135deg,rgba(40,20,80,0.5),rgba(20,10,40,0.4))",animation:"fadeUp 0.35s ease both"}}>
      <div style={{marginBottom:14}}>
        <div style={{fontFamily:"'Cinzel Decorative','Cinzel',serif",fontSize:17,color,marginBottom:4,filter:`drop-shadow(0 0 8px ${color}55)`}}>{title}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(180,150,255,0.45)"}}>{subtitle}</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {body.map((item,i)=>(
          <div key={i}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(180,150,255,0.4)",marginBottom:4}}>{item.label}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"rgba(220,205,255,0.78)",lineHeight:1.7}}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function getChartReading(positions, cityName, birthDate) {
  const asc = positions['Ascendant'];
  const PLANETS = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const placements = PLANETS.map(p=>`${p} in ${getSign(positions[p])} (House ${getHouseNum(positions[p],asc)}, ${getDeg(positions[p])}°)`).join('\n');
  const aspects = getAspects(positions).map(a=>`${a.p1} ${a.name} ${a.p2}`).join(', ');

  const res = await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",max_tokens:1000,
      system:`You are the Kozmic Witch Oracle — a deep astrologer who speaks with poetic wisdom and cosmic insight. You see the full natal chart as a living map of the soul. You speak directly to the person ("you"), in flowing paragraphs, never bullet points. Be mystical, personal, and deeply felt. About 400-450 words.`,
      messages:[{role:"user",content:`Please give a natal chart reading for someone born on ${birthDate} in ${cityName}.\n\nPlacements:\n${placements}\n\nAscendant: ${getSign(asc)} (${getDeg(asc)}°)\nMC: ${getSign(positions['MC']||0)}\n\nKey aspects: ${aspects||'none calculated'}\n\nCover: core identity (Sun + Rising), emotional world (Moon), one standout placement, and an overall soul message.`}],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "The stars are quiet tonight. Try again.";
}

function BirthChartPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("12:00");
  const [cityIdx, setCityIdx] = useState(0);
  const [positions, setPositions] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const calculate = async () => {
    if (!birthDate || loading) return;
    const city = CITIES[cityIdx];
    setLoading(true); setError(""); setPositions(null); setReading(""); setSelected(null);
    try {
      const [y,mo,d] = birthDate.split('-').map(Number);
      const [h,m] = birthTime.split(':').map(Number);
      const utcH = h + m/60 - city.utc;
      const JD = toJD(y, mo, d, utcH);
      const pos = calcPositions(JD, city.lat, city.lon);
      setPositions(pos);
      const text = await getChartReading(pos, city.n, birthDate);
      setReading(text);
    } catch(e) { setError("Something went wrong. Check your input and try again."); console.error(e); }
    setLoading(false);
  };

  const handleSelect = (item) => {
    setSelected(prev => (prev && prev.type===item.type && prev.key===item.key) ? null : item);
  };

  const PLANET_LIST = ['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'];
  const inputStyle = {width:"100%",background:"rgba(0,0,0,0.3)",border:"1px solid rgba(180,140,255,0.2)",borderRadius:10,padding:"11px 14px",color:"#d8c8f8",fontFamily:"Georgia,serif",fontSize:14,outline:"none",boxSizing:"border-box",colorScheme:"dark"};
  const labelStyle = {fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.28em",color:"rgba(180,140,255,0.45)",textTransform:"uppercase",marginBottom:8,display:"block"};

  return (
    <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"110px 24px 80px"}}>
      <div style={{textAlign:"center",marginBottom:48,animation:"fadeUp 0.8s ease both"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.45em",color:"rgba(180,140,255,0.38)",textTransform:"uppercase",marginBottom:12}}>✦ Kozmic Witch ✦</div>
        <h1 style={{fontFamily:"'Cinzel Decorative','Cinzel',serif",fontSize:"clamp(26px,5vw,46px)",fontWeight:700,margin:"0 0 10px",background:"linear-gradient(160deg,#f0e0ff 0%,#d0a8ff 40%,#f4d878 80%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Birth Chart</h1>
        <p style={{fontFamily:"'IM Fell English',Georgia,serif",fontStyle:"italic",fontSize:15,color:"rgba(200,175,255,0.45)",lineHeight:1.7,maxWidth:380,margin:"0 auto"}}>
          Enter your birth details to receive your natal chart and reading.
        </p>
      </div>

      {!positions && (
        <div style={{background:"linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",border:"1px solid rgba(180,140,255,0.13)",borderRadius:20,padding:"32px 28px",marginBottom:24,animation:"fadeUp 0.8s ease 0.1s both"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:18}}>
            <div>
              <label style={labelStyle}>Birth Date</label>
              <input type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)} style={inputStyle}/>
            </div>
            <div>
              <label style={labelStyle}>Birth Time</label>
              <input type="time" value={birthTime} onChange={e=>setBirthTime(e.target.value)} style={inputStyle}/>
            </div>
          </div>
          <div style={{marginBottom:24}}>
            <label style={labelStyle}>Birth City</label>
            <select
              value={cityIdx}
              onChange={e=>setCityIdx(Number(e.target.value))}
              style={{...inputStyle,cursor:"pointer"}}
            >
              {CITIES.map((c,i)=>(
                <option key={i} value={i} style={{background:"#120a28",color:"#d8c8f8"}}>{c.n}</option>
              ))}
            </select>
          </div>
          <button
            onClick={calculate}
            disabled={!birthDate||loading}
            style={{width:"100%",padding:"14px",background:birthDate?"linear-gradient(135deg,rgba(140,60,255,0.35),rgba(100,40,200,0.3))":"rgba(255,255,255,0.02)",border:`1px solid ${birthDate?"rgba(180,120,255,0.4)":"rgba(180,140,255,0.08)"}`,borderRadius:40,color:birthDate?"#e0ccff":"rgba(180,140,255,0.28)",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.25em",textTransform:"uppercase",cursor:birthDate?"pointer":"not-allowed",transition:"all 0.3s"}}
          >
            {loading ? <span style={{animation:"pulse 0.8s infinite"}}>✦ Reading the stars...</span> : "✦ Cast My Chart"}
          </button>
          {error && <div style={{marginTop:14,textAlign:"center",color:"rgba(200,140,140,0.6)",fontSize:13,fontStyle:"italic"}}>{error}</div>}
        </div>
      )}

      {positions && (
        <div style={{animation:"fadeUp 0.7s ease both"}}>

          {/* Chart wheel + info panel side by side on wide, stacked on narrow */}
          <div style={{background:"linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",border:"1px solid rgba(180,140,255,0.12)",borderRadius:20,padding:"24px",marginBottom:20}}>
            <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:20,alignItems:"start"}}>
              <div>
                <ChartWheel positions={positions} onSelect={handleSelect} selected={selected}/>
              </div>
              <div>
                <ChartInfoPanel selected={selected} positions={positions}/>
              </div>
            </div>
          </div>

          {/* Planet placements */}
          <div style={{background:"linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))",border:"1px solid rgba(180,140,255,0.12)",borderRadius:20,padding:"24px",marginBottom:20}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.35em",color:"rgba(180,140,255,0.42)",textTransform:"uppercase",marginBottom:16}}>✦ Planetary Placements</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 16px"}}>
              {[...PLANET_LIST,'Ascendant','MC'].map(p=>{
                const isSel = selected?.type==='planet' && selected?.key===p;
                return (
                  <div key={p}
                    onClick={()=>PLANET_MEANINGS[p] && handleSelect({type:'planet',key:p})}
                    style={{display:"flex",alignItems:"center",gap:10,padding:"7px 8px",borderRadius:8,borderBottom:"1px solid rgba(180,140,255,0.07)",background:isSel?"rgba(140,80,255,0.1)":"transparent",cursor:PLANET_MEANINGS[p]?"pointer":"default",transition:"background 0.2s"}}
                  >
                    <span style={{fontSize:13,width:18,textAlign:"center",color:PDATA[p]?.c||"#d8c8f8"}}>{PDATA[p]?.g||p.slice(0,2)}</span>
                    <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"rgba(190,170,240,0.55)",letterSpacing:"0.1em",width:64}}>{p}</span>
                    <span style={{fontFamily:"Georgia,serif",fontSize:13,color:"rgba(220,205,255,0.8)"}}>{getSign(positions[p]||0)}</span>
                    <span style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"rgba(180,150,255,0.38)",marginLeft:"auto"}}>{getDeg(positions[p]||0)}°</span>
                    {p!=='Ascendant'&&p!=='MC'&&<span style={{fontFamily:"'Cinzel',serif",fontSize:8,color:"rgba(160,130,255,0.3)",marginLeft:4}}>H{getHouseNum(positions[p],positions['Ascendant'])}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading */}
          {reading && (
            <div style={{background:"linear-gradient(135deg,rgba(100,40,200,0.09),rgba(60,20,140,0.07))",border:"1px solid rgba(180,130,255,0.13)",borderRadius:20,padding:"30px",marginBottom:24}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.4em",color:"rgba(180,130,255,0.42)",textTransform:"uppercase",marginBottom:16}}>✦ Your Natal Reading</div>
              {reading.split('\n\n').map((para,i)=>(
                <p key={i} style={{fontFamily:"'IM Fell English',Georgia,serif",fontStyle:"italic",fontSize:16,color:"rgba(225,210,255,0.82)",lineHeight:1.9,margin:"0 0 18px"}}>{para}</p>
              ))}
            </div>
          )}

          <div style={{textAlign:"center"}}>
            <button onClick={()=>{setPositions(null);setReading("");setBirthDate("");setBirthTime("12:00");setCityIdx(0);setSelected(null);}}
              style={{background:"none",border:"none",fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:"rgba(180,140,255,0.38)",cursor:"pointer",padding:"10px 18px",borderBottom:"1px solid rgba(180,140,255,0.15)",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="rgba(200,160,255,0.72)"}
              onMouseLeave={e=>e.target.style.color="rgba(180,140,255,0.38)"}
            >Cast Another Chart ✦</button>
          </div>
        </div>
      )}

      <div style={{textAlign:"center",marginTop:60}}>
        <div style={{fontSize:9,fontFamily:"'Cinzel',serif",letterSpacing:"0.35em",color:"rgba(180,140,255,0.18)",textTransform:"uppercase"}}>as above · so below</div>
      </div>
    </div>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto", padding: "110px 24px 90px" }}>
      <div style={{ animation: "fadeUp 0.8s ease both" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.45em", color: "rgba(180,140,255,0.38)", textTransform: "uppercase", marginBottom: 14 }}>✦ About ✦</div>
        <h1 style={{ fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, margin: "0 0 36px", background: "linear-gradient(160deg, #f0e0ff 0%, #d0a8ff 50%, #f4d878 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Who is the Kozmic Witch?</h1>

        <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(180,140,255,0.12)", borderRadius: 20, padding: "40px 36px", marginBottom: 24 }}>
          <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 19, color: "rgba(225,210,255,0.75)", lineHeight: 1.85, margin: "0 0 22px" }}>
            I'm the Kozmic Witch. I started this because I needed to understand the world, and eventually, tarot handed me a language for that.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "rgba(195,180,240,0.55)", lineHeight: 1.9, margin: "0 0 18px", fontWeight: 300 }}>
            Spirituality wasn't something I was handed. It was something I went looking for. I pulled my first tarot card because I had questions that nothing else could answer, and something about the symbolism, the archetypes, the way it mirrored exactly what I was going through. It cracked something open. That led to astrology, moon cycles, ritual, all of it. One thread pulled and the whole thing unraveled in the best way.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "rgba(195,180,240,0.55)", lineHeight: 1.9, margin: "0 0 18px", fontWeight: 300 }}>
            As for the name, yes, I'm a witch. But Kozmic is spelled with a K to honor Janis Joplin, my favorite artist. She was raw, she was free, she didn't shrink herself for anyone. That energy lives in everything I do here.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "rgba(195,180,240,0.55)", lineHeight: 1.9, margin: 0, fontWeight: 300 }}>
            This space is where I write about what I'm learning, what the stars are doing, what the cards keep telling me, and what it actually looks like to build a spiritual practice in real life. Not a perfect one, just an honest one.
          </p>
        </div>

        {/* Janis quote */}
        <div style={{ border: "1px solid rgba(180,140,255,0.1)", borderRadius: 16, padding: "26px 28px", marginBottom: 24, background: "rgba(255,200,80,0.03)", textAlign: "center" }}>
          <p style={{ fontFamily: "'IM Fell English', Georgia, serif", fontStyle: "italic", fontSize: 16, color: "rgba(240,210,120,0.55)", lineHeight: 1.75, margin: "0 0 10px" }}>
            "Don't compromise yourself. You're all you've got."
          </p>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.3em", color: "rgba(200,160,100,0.35)", textTransform: "uppercase" }}>Janis Joplin</div>
        </div>

      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(180,140,255,0.07)", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
      <button onClick={() => setPage("Home")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: 13, background: "linear-gradient(135deg, #d4a8ff, #f0d880)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kozmic Witch</button>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: "0.3em", color: "rgba(180,140,255,0.22)", textTransform: "uppercase" }}>as above · so below · so within · so without</div>
      <div style={{ fontSize: 11, color: "rgba(180,140,255,0.18)" }}>© 2026</div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 25% 10%, #130d2e 0%, #05040e 45%, #0a0614 100%)", color: "#e0d4f8", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spinReverse { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes cardReveal { from{opacity:0;transform:rotateY(90deg) scale(0.9)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes rainbow-shift { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1);opacity:0.1} 50%{transform:translateY(-14px) scale(1.08);opacity:0.18} }
        @keyframes scrollText { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        ::selection { background: rgba(140,80,255,0.35); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05040e; }
        ::-webkit-scrollbar-thumb { background: rgba(140,80,255,0.28); border-radius: 2px; }
        textarea { resize: none; outline: none; }
        textarea::placeholder { color: rgba(180,150,255,0.28); font-style: italic; }
        input::placeholder { color: rgba(180,150,255,0.28); }
        button { padding: 0; }
      `}</style>

      <FloatingParticles />
      <NavBar page={page} setPage={setPage} />

      <main>
        {page === "Home"     && <HomePage setPage={setPage} />}
        {page === "Moon"     && <MoonPage />}
        {page === "Oracle"   && <OraclePage />}
        {page === "Chart"    && <BirthChartPage />}
        {page === "Writing"  && <WritingPage />}
        {page === "Playlist" && <PlaylistPage />}
        {page === "About"    && <AboutPage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
