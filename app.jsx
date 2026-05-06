// app.jsx — root, nav, footer, tweaks wiring

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "council",
  "density": "regular",
  "accent": "#E25822"
}/*EDITMODE-END*/;

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="brand">
        <div className="brand-mark"><span>S</span></div>
        ShipMyBuild
      </div>
      <div className="nav-links" style={{ display: 'flex' }}>
        <a href="#how">How it works</a>
        <a href="#agents">Agents</a>
        <a href="#pricing">Pricing</a>
        <a href="#changelog">Changelog</a>
      </div>
      <div className="nav-cta">
        <span className="pill"><span className="dot"></span>23 ideas shipped today</span>
        <button className="btn btn-primary" style={{ padding: '9px 14px', fontSize: 13 }}>
          Start free
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="left">
        <div className="brand-mark" style={{ width: 22, height: 22, fontSize: 11 }}><span>S</span></div>
        <span>ShipMyBuild · Bengaluru, IN · 2026</span>
      </div>
      <div>
        <a href="#">Twitter</a><a href="#">GitHub</a><a href="#">Discord</a><a href="#">Privacy</a>
      </div>
    </footer>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks to root
  React.useEffect(() => {
    document.documentElement.dataset.density = t.density;
    document.documentElement.style.setProperty('--accent', t.accent);
  }, [t.density, t.accent]);

  return (
    <>
      <Nav />
      <Hero variant={t.heroVariant} />
      <HowItWorks />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero variant" />
        <TweakRadio
          label="Layout"
          value={t.heroVariant}
          options={[
            { value: 'council',    label: 'Council' },
            { value: 'conveyor',   label: 'Pipeline' },
            { value: 'roundtable', label: 'Round' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)} />

        <TweakSection label="Density" />
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={['compact', 'regular', 'spacious']}
          onChange={(v) => setTweak('density', v)} />

        <TweakSection label="Color" />
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
