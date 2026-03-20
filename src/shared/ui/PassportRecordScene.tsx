import styles from './PassportRecordScene.module.css';

export const PassportRecordScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.glow} />
    <div className={styles.shadow} />

    <svg className={styles.sceneSvg} viewBox="0 0 520 260">
      <defs>
        <linearGradient id="passport-panel" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <linearGradient id="passport-navy" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#31497f" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="passport-orange" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffb36a" />
        </linearGradient>
        <linearGradient id="passport-blue" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#dfe7ff" />
          <stop offset="100%" stopColor="#eef3ff" />
        </linearGradient>
      </defs>

      <g className={styles.board}>
        <rect fill="rgba(29,39,64,0.12)" height="166" rx="30" width="322" x="58" y="48" />
        <rect fill="url(#passport-panel)" height="166" rx="30" width="322" x="46" y="36" />
        <rect fill="rgba(255,122,20,0.14)" height="16" rx="8" width="92" x="72" y="62" />
        <rect fill="rgba(29,39,64,0.1)" height="12" rx="6" width="136" x="72" y="91" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="214" x="72" y="114" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="188" x="72" y="134" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="152" x="72" y="154" />

        <rect fill="rgba(49,73,127,0.08)" height="44" rx="18" width="242" x="72" y="178" />
        <circle cx="96" cy="200" fill="#ff8f32" r="8" />
        <circle cx="166" cy="200" fill="#2e9156" r="8" />
        <circle cx="236" cy="200" fill="#4e7af0" r="8" />
        <path d="M96 200h140" fill="none" stroke="rgba(29,39,64,0.12)" strokeDasharray="5 8" strokeLinecap="round" strokeWidth="3" />
        <rect fill="rgba(29,39,64,0.1)" height="10" rx="5" width="86" x="254" y="195" />
      </g>

      <g className={styles.reflectionCard}>
        <rect fill="rgba(29,39,64,0.12)" height="96" rx="24" width="166" x="92" y="100" />
        <rect fill="#ffffff" height="96" rx="24" width="166" x="82" y="90" />
        <rect fill="rgba(255,122,20,0.16)" height="14" rx="7" width="76" x="104" y="110" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="74" x="104" y="137" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="116" x="104" y="157" />
        <circle cx="216" cy="138" fill="rgba(255,122,20,0.18)" r="18" />
        <path d="m208 138 6 6 10-13" fill="none" stroke="#ff7a14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </g>

      <g className={styles.evidenceCard}>
        <rect fill="rgba(29,39,64,0.14)" height="108" rx="26" width="176" x="262" y="84" />
        <rect fill="url(#passport-navy)" height="108" rx="26" width="176" x="250" y="72" />
        <rect fill="url(#passport-blue)" height="64" rx="18" width="132" x="272" y="96" />
        <circle cx="294" cy="118" fill="#ffb36a" r="10" />
        <rect fill="rgba(29,39,64,0.14)" height="10" rx="5" width="54" x="312" y="113" />
        <rect fill="rgba(29,39,64,0.1)" height="9" rx="4.5" width="82" x="286" y="136" />
        <rect fill="rgba(29,39,64,0.08)" height="9" rx="4.5" width="66" x="286" y="152" />
        <rect fill="rgba(255,255,255,0.18)" height="12" rx="6" width="76" x="276" y="84" />
      </g>

      <g className={styles.goalCard}>
        <rect fill="rgba(29,39,64,0.12)" height="60" rx="20" width="138" x="340" y="144" />
        <rect fill="#ffffff" height="60" rx="20" width="138" x="330" y="134" />
        <rect fill="url(#passport-orange)" height="12" rx="6" width="52" x="354" y="152" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="82" x="354" y="172" />
      </g>
    </svg>
  </div>
);
