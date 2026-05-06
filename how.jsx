// how.jsx — How it works (3 steps)

function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="how-inner">
        <div className="section-head">
          <h2 className="section-h">From <em>napkin</em> idea to a debated build plan — in three moves.</h2>
          <div className="section-meta">
            <div>HOW IT WORKS</div>
            <b>03 STEPS</b>
          </div>
        </div>

        <div className="steps">
          {/* STEP 1 */}
          <div className="step">
            <div className="step-num"><span>STEP</span><b>01</b></div>
            <div className="step-art">
              <div className="art-input">
                <div className="lbl">→ idea</div>
                <div className="val">whatsapp CRM for kiranas<span className="cursor" style={{display:'inline-block',width:2,height:'1em',verticalAlign:-3,background:'var(--accent)',marginLeft:2,animation:'blink 1s steps(2) infinite'}}></span></div>
              </div>
              <div className="art-keys">
                <span>B2B</span><span>India</span><span>SMB</span><span>+ context</span>
              </div>
            </div>
            <h3 className="step-h">Type your idea, in plain English.</h3>
            <p className="step-p">One sentence is enough. We pull market context, your stack preferences, and the regulatory landscape — automatically.</p>
          </div>

          {/* STEP 2 */}
          <div className="step">
            <div className="step-num"><span>STEP</span><b>02</b></div>
            <div className="step-art">
              <div className="art-debate">
                {[
                  { agent: AGENTS[0], text: "GST compliance is a beast. Have we costed it?" },
                  { agent: AGENTS[1], text: "Use a wrapper API. Two days, max." },
                  { agent: AGENTS[2], text: "Pilot with 30 kirana owners in Indiranagar." },
                  { agent: AGENTS[3], text: "₹499/mo. They'll pay. I checked." },
                ].map((b, i) => (
                  <div key={i} className="bubble">
                    <div className="av" style={{ background: b.agent.color }}>{b.agent.short}</div>
                    <p><span className="name">{b.agent.name.replace('The ','')}</span>{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="step-h">Watch four agents debate it — live.</h3>
            <p className="step-p">A Skeptic, an Architect, a Hustler, a Bean Counter. Each tuned to your idea. They argue, they push back, they steel-man.</p>
          </div>

          {/* STEP 3 */}
          <div className="step">
            <div className="step-num"><span>STEP</span><b>03</b></div>
            <div className="step-art">
              <div className="art-verdict">
                <div className="verdict-card">
                  {AGENTS.map((a) => (
                    <div key={a.id} className="verdict-row">
                      <div className="verdict-name">{a.name}</div>
                      <div className={"verdict-vote " + (a.tone === 'yes' ? 'yes' : '')}>{a.tone === 'yes' ? '↑ SHIP' : '↓ HOLD'}</div>
                    </div>
                  ))}
                  <div className="verdict-tally">
                    <span>VERDICT</span><b>3 — 1 · SHIP</b>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="step-h">Walk away with a verdict & a plan.</h3>
            <p className="step-p">A vote, a 6-day build sprint, the riskiest assumption, the cheapest experiment to kill it. Export to Notion, Linear, or a single tidy PDF.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks });
