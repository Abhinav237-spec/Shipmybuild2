// hero.jsx — ShipMyBuild hero. Three variants:
//   "council"   — 4 agents around a central idea card (default)
//   "conveyor"  — agents on an assembly line
//   "roundtable"— agents around a circular table

const AGENTS = [
  { id: 'skeptic',   short: 'SK', name: 'The Skeptic',    role: 'Risk · Edge cases', tone: 'no',  color: 'oklch(0.66 0.19 32)',  quote: "Three competitors do this. What's our wedge?" },
  { id: 'architect', short: 'AR', name: 'The Architect',  role: 'Tech · Stack',      tone: 'yes', color: 'oklch(0.62 0.17 250)', quote: "Postgres + Next.js. Ship a v1 in 6 days." },
  { id: 'hustler',   short: 'HU', name: 'The Hustler',    role: 'Growth · GTM',      tone: 'yes', color: 'oklch(0.6 0.18 300)',  quote: "Founders' whatsapp groups in BLR. Day one." },
  { id: 'banker',    short: 'BK', name: 'The Bean Counter',role: 'Money · Pricing',  tone: 'yes', color: 'oklch(0.55 0.14 145)', quote: "₹999/mo undercuts the US tools by 4×." },
];

// Typewriter — cycles through prompts
function useTypewriter(phrases, speed = 38, hold = 1600) {
  const [text, setText] = React.useState('');
  const idx = React.useRef(0);
  const pos = React.useRef(0);
  const dir = React.useRef(1);

  React.useEffect(() => {
    let t;
    const tick = () => {
      const phrase = phrases[idx.current];
      pos.current += dir.current;
      setText(phrase.slice(0, pos.current));
      if (dir.current === 1 && pos.current >= phrase.length) {
        dir.current = 0;
        t = setTimeout(() => { dir.current = -1; tick(); }, hold);
        return;
      }
      if (dir.current === -1 && pos.current <= 0) {
        dir.current = 1;
        idx.current = (idx.current + 1) % phrases.length;
      }
      t = setTimeout(tick, dir.current === -1 ? speed * 0.5 : speed);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  return text;
}

// Avatar pill (used in agent card + step bubbles)
function AgentAvatar({ agent, size = 30 }) {
  return (
    <div className="agent-avatar" style={{
      background: `color-mix(in oklab, ${agent.color} 18%, transparent)`,
      color: agent.color, width: size, height: size,
      fontSize: size * 0.42,
    }}>{agent.short}</div>
  );
}

function AgentCard({ agent, vote, style, thinking }) {
  return (
    <div className={"agent" + (thinking ? " thinking" : "")} style={style}>
      {vote && <div className={"agent-vote " + vote}>{vote === 'yes' ? '↑ SHIP' : '↓ HOLD'}</div>}
      <div className="agent-row">
        <AgentAvatar agent={agent} />
        <div className="agent-meta">
          <div className="agent-name">{agent.name}</div>
          <div className="agent-role">{agent.role}</div>
        </div>
      </div>
      <div className="agent-quote">{agent.quote}”</div>
    </div>
  );
}

// ── Variant: Council (default) ────────────────────────────────
function HeroCouncil() {
  const idea = useTypewriter([
    'whatsapp CRM for kiranas',
    'AI tutor for JEE prep',
    'expense tracker for indie devs',
    'invoice OCR for chartered accts',
  ]);

  // Position each agent around the center idea card. Coords are %.
  const positions = [
    { agent: AGENTS[0], style: { top: '4%',  left: '2%',   '--tx': '0px', '--ty': '0px' }, vote: 'no',  delay: 0 },
    { agent: AGENTS[1], style: { top: '4%',  right: '2%',  '--tx': '0px', '--ty': '0px' }, vote: 'yes', delay: 0.6 },
    { agent: AGENTS[2], style: { bottom: '4%', left: '2%', '--tx': '0px', '--ty': '0px' }, vote: 'yes', delay: 1.2 },
    { agent: AGENTS[3], style: { bottom: '4%', right: '2%','--tx': '0px', '--ty': '0px' }, vote: 'yes', delay: 1.8 },
  ];

  return (
    <div className="stage">
      {/* connecting lines from each corner to center */}
      <svg className="stage-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 14 14 L 50 50" />
        <path d="M 86 14 L 50 50" />
        <path d="M 14 86 L 50 50" />
        <path d="M 86 86 L 50 50" />
        <path className="pulse" d="M 14 14 L 50 50" />
        <path className="pulse" style={{ animationDelay: '.7s' }} d="M 86 14 L 50 50" />
        <path className="pulse" style={{ animationDelay: '1.4s' }} d="M 14 86 L 50 50" />
        <path className="pulse" style={{ animationDelay: '2.1s' }} d="M 86 86 L 50 50" />
      </svg>

      {positions.map((p, i) => (
        <AgentCard key={p.agent.id} agent={p.agent} vote={p.vote}
          style={{ ...p.style, animationDelay: p.delay + 's' }} thinking />
      ))}

      <div className="idea">
        <div className="idea-label"><span className="dot"></span>Your idea</div>
        <div className="idea-text">{idea}<span className="cursor"></span></div>
        <div className="idea-tally">
          <span><b style={{ color: 'oklch(0.85 0.16 90)' }}>3</b> ship</span>
          <span><b style={{ color: 'var(--accent)' }}>1</b> hold</span>
          <span style={{ marginLeft: 'auto' }}>verdict in 4.2s</span>
        </div>
      </div>

      {/* corner artifacts */}
      <div className="corner" style={{ top: 0, left: 0 }}>
        <span className="sq"></span>COUNCIL.001
      </div>
      <div className="corner" style={{ bottom: 0, right: 0 }}>
        4 agents · live ·<span className="sq"></span>
      </div>
    </div>
  );
}

// ── Variant: Conveyor ─────────────────────────────────────────
function HeroConveyor() {
  return (
    <div className="stage">
      <div className="conveyor">
        <div className="conveyor-input">
          <small>Input</small>
          idea.txt
        </div>
        <div className="conveyor-track"></div>
        <div className="conveyor-stations" style={{ position: 'absolute', inset: 0 }}>
          {AGENTS.map((a, i) => (
            <div key={a.id} className="station">
              <AgentCard agent={a} thinking style={{ '--tx': '0px', '--ty': '0px', animationDelay: i * 0.4 + 's' }} />
              <div className="conveyor-tag">step {i + 1}</div>
            </div>
          ))}
        </div>
        <div className="conveyor-output">
          <small>Output</small>
          ship_plan.md
        </div>
      </div>
      <div className="corner" style={{ top: 0, left: 0 }}>
        <span className="sq"></span>PIPELINE.002
      </div>
    </div>
  );
}

// ── Variant: Roundtable ───────────────────────────────────────
function HeroRoundtable() {
  const idea = useTypewriter([
    'a Notion for Indian CAs',
    'Cred for tier-2 cities',
    'Linear for film studios',
  ]);

  // Position around a circle. Use absolute positioning at angles.
  const ring = [
    { angle: -90, agent: AGENTS[0], vote: 'no'  },
    { angle:   0, agent: AGENTS[1], vote: 'yes' },
    { angle:  90, agent: AGENTS[2], vote: 'yes' },
    { angle: 180, agent: AGENTS[3], vote: 'yes' },
  ];

  return (
    <div className="stage">
      <div className="roundtable">
        <div className="table-ring"></div>
        {ring.map((r, i) => {
          const rad = (r.angle * Math.PI) / 180;
          const left = 50 + Math.cos(rad) * 40;
          const top = 50 + Math.sin(rad) * 40;
          return (
            <AgentCard key={r.agent.id} agent={r.agent} vote={r.vote} thinking
              style={{
                left: `${left}%`, top: `${top}%`,
                transform: 'translate(-50%, -50%)',
                '--tx': '-50%', '--ty': '-50%',
                animationDelay: i * 0.4 + 's',
              }} />
          );
        })}

        <div className="idea" style={{ width: '38%', maxWidth: 220 }}>
          <div className="idea-label"><span className="dot"></span>On the table</div>
          <div className="idea-text" style={{ fontSize: 14 }}>{idea}<span className="cursor"></span></div>
        </div>
      </div>
      <div className="corner" style={{ top: 0, left: 0 }}>
        <span className="sq"></span>ROUNDTABLE.003
      </div>
    </div>
  );
}

// ── Hero shell (headline + variant switch) ────────────────────
function Hero({ variant }) {
  const Variant = variant === 'conveyor' ? HeroConveyor
                : variant === 'roundtable' ? HeroRoundtable
                : HeroCouncil;
  return (
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="eyebrow">For India SaaS founders</div>
          <h1 className="h1">
            Stop building <span className="strike">alone</span>.<br/>
            Hire <em>four</em> co-founders<br/>
            in <span className="serif">10 seconds</span>.
          </h1>
          <p className="lede">
            Type your idea. <b>ShipMyBuild</b> spins up four AI agents — tuned to your specific SaaS — who debate, vote, and hand you a build plan. No deck. No moodboard. Just signal.
          </p>
          <div className="cta-row">
            <button className="btn btn-primary">
              Start your council
              <svg className="btn-arrow" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-ghost">Watch a debate ↗</button>
            <div className="cta-meta" style={{ marginLeft: 'auto' }}>
              <span className="check">✓</span> Free for the first 50 ideas
            </div>
          </div>
        </div>

        <Variant />
      </div>
    </section>
  );
}

Object.assign(window, { Hero, AGENTS, AgentCard, AgentAvatar });
