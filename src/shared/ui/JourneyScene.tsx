import styles from './JourneyScene.module.css';

export const JourneyScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.sceneGlow} />

    <svg className={styles.sceneSvg} viewBox="0 0 520 360">
      <defs>
        <linearGradient id="scene-panel" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.94)" />
          <stop offset="100%" stopColor="rgba(226,236,248,0.88)" />
        </linearGradient>
        <linearGradient id="scene-primary" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="scene-warm" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      <g className={styles.backPanel}>
        <rect fill="url(#scene-panel)" height="250" rx="30" width="330" x="95" y="58" />
        <rect fill="rgba(255,255,255,0.72)" height="44" rx="18" width="130" x="122" y="88" />
        <rect fill="rgba(59,130,246,0.12)" height="12" rx="6" width="72" x="138" y="105" />
        <rect fill="rgba(255,255,255,0.84)" height="92" rx="26" width="136" x="122" y="150" />
        <rect fill="url(#scene-primary)" height="92" rx="26" width="136" x="270" y="150" />
        <rect fill="rgba(255,255,255,0.84)" height="14" rx="7" width="72" x="146" y="173" />
        <rect fill="rgba(148,163,184,0.2)" height="10" rx="5" width="86" x="146" y="195" />
        <rect fill="rgba(148,163,184,0.18)" height="10" rx="5" width="64" x="146" y="213" />
        <path d="M298 220c22-34 38-48 50-48 12 0 23 8 36 29 9 15 18 20 22 20" fill="none" opacity="0.92" stroke="rgba(255,255,255,0.82)" strokeLinecap="round" strokeWidth="8" />
        <circle cx="299" cy="221" fill="#fff" r="8" />
        <circle cx="354" cy="180" fill="#fff" r="8" />
        <circle cx="406" cy="221" fill="#fff" r="8" />
      </g>

      <g className={styles.frontPanel}>
        <rect fill="rgba(15,23,42,0.07)" height="190" rx="32" width="220" x="225" y="112" />
        <rect fill="rgba(255,255,255,0.96)" height="190" rx="32" width="220" x="214" y="100" />
        <rect fill="url(#scene-warm)" height="46" rx="18" width="92" x="238" y="126" />
        <rect fill="rgba(15,23,42,0.08)" height="14" rx="7" width="120" x="238" y="188" />
        <rect fill="rgba(15,23,42,0.06)" height="14" rx="7" width="150" x="238" y="214" />
        <rect fill="rgba(15,23,42,0.06)" height="14" rx="7" width="98" x="238" y="240" />
        <rect fill="rgba(37,99,235,0.08)" height="62" rx="22" width="80" x="332" y="184" />
        <circle cx="372" cy="214" fill="none" r="20" stroke="#2563eb" strokeWidth="8" />
        <circle cx="372" cy="214" fill="none" opacity="0.28" r="20" stroke="#cbd5e1" strokeWidth="8" />
      </g>
    </svg>

    <div className={`${styles.floatCard} ${styles.floatCardLeft}`}>
      <span className={styles.floatLabel}>Current goal</span>
      <strong className={styles.floatValue}>Clear next lesson move</strong>
    </div>

    <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
      <span className={styles.floatLabel}>Insight created</span>
      <strong className={styles.floatValue}>Feedback turning into action</strong>
    </div>
  </div>
);
