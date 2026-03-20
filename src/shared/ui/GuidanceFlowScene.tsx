import styles from './GuidanceFlowScene.module.css';

export const GuidanceFlowScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.orbit} />
    <div className={styles.glow} />

    <svg className={styles.sceneSvg} viewBox="0 0 520 380">
      <defs>
        <linearGradient id="guidance-surface" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <linearGradient id="guidance-panel" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#31497f" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="guidance-accent" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffb36a" />
        </linearGradient>
      </defs>

      <g className={styles.centerStage}>
        <ellipse cx="238" cy="214" fill="url(#guidance-accent)" rx="130" ry="110" />
        <rect fill="rgba(29,39,64,0.14)" height="154" rx="30" width="166" x="128" y="116" />
        <rect fill="url(#guidance-panel)" height="154" rx="30" width="166" x="114" y="102" />
        <rect fill="url(#guidance-surface)" height="110" rx="22" width="108" x="144" y="128" />
        <rect fill="rgba(255,122,20,0.15)" height="12" rx="6" width="52" x="170" y="146" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="60" x="168" y="170" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="54" x="168" y="190" />
        <rect fill="url(#guidance-accent)" height="56" rx="18" width="44" x="198" y="154" />
        <rect fill="rgba(255,255,255,0.82)" height="10" rx="5" width="22" x="209" y="168" />
        <rect fill="rgba(255,255,255,0.78)" height="8" rx="4" width="18" x="211" y="186" />
      </g>

      <g className={styles.evidenceCard}>
        <rect fill="#ffffff" height="86" rx="22" width="122" x="272" y="110" />
        <circle cx="302" cy="138" fill="#ff8f32" r="10" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="58" x="320" y="133" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="72" x="296" y="158" />
      </g>

      <g className={styles.techniqueCard}>
        <rect fill="#ffffff" height="84" rx="22" width="118" x="78" y="242" />
        <rect fill="rgba(78,122,240,0.12)" height="12" rx="6" width="46" x="104" y="264" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="64" x="104" y="286" />
      </g>

      <g className={styles.reflectionCard}>
        <rect fill="#ffffff" height="82" rx="22" width="130" x="304" y="246" />
        <rect fill="rgba(46,145,86,0.14)" height="12" rx="6" width="52" x="330" y="268" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="76" x="330" y="290" />
      </g>

      <g className={styles.connectors}>
        <path d="M238 150 C274 142 292 138 312 142" fill="none" stroke="rgba(29,39,64,0.16)" strokeLinecap="round" strokeWidth="5" />
        <path d="M186 236 C166 248 154 258 138 272" fill="none" stroke="rgba(29,39,64,0.16)" strokeLinecap="round" strokeWidth="5" />
        <path d="M258 236 C288 250 318 262 330 274" fill="none" stroke="rgba(29,39,64,0.16)" strokeLinecap="round" strokeWidth="5" />
      </g>
    </svg>
  </div>
);
