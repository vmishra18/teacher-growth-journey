import styles from './ReflectionSupportScene.module.css';

export const ReflectionSupportScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.shadow} />

    <svg className={styles.sceneSvg} viewBox="0 0 440 320">
      <defs>
        <linearGradient id="reflection-page" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <linearGradient id="reflection-note" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#31497f" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="reflection-pencil" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffb36a" />
        </linearGradient>
      </defs>

      <g className={styles.book}>
        <rect fill="rgba(29,39,64,0.12)" height="176" rx="28" width="178" x="92" y="72" />
        <rect fill="url(#reflection-page)" height="176" rx="28" width="178" x="82" y="62" />
        <path d="M168 74v152" stroke="rgba(29,39,64,0.08)" strokeWidth="3" />
        <rect fill="rgba(255,122,20,0.16)" height="12" rx="6" width="58" x="108" y="92" />
        <rect fill="rgba(29,39,64,0.1)" height="10" rx="5" width="72" x="108" y="121" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="82" x="108" y="141" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="74" x="108" y="161" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="84" x="108" y="181" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="66" x="108" y="201" />
        <circle cx="194" cy="132" fill="rgba(255,122,20,0.2)" r="18" />
        <path d="m186 132 6 6 10-13" fill="none" stroke="#ff7a14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      </g>

      <g className={styles.noteCard}>
        <rect fill="rgba(29,39,64,0.16)" height="92" rx="22" width="118" x="248" y="84" />
        <rect fill="url(#reflection-note)" height="92" rx="22" width="118" x="238" y="74" />
        <circle cx="264" cy="100" fill="#ffb36a" r="8" />
        <rect fill="rgba(255,255,255,0.84)" height="10" rx="5" width="48" x="280" y="95" />
        <rect fill="rgba(255,255,255,0.24)" height="10" rx="5" width="64" x="260" y="120" />
        <rect fill="rgba(255,255,255,0.24)" height="10" rx="5" width="52" x="260" y="140" />
      </g>

      <g className={styles.pencil}>
        <rect fill="url(#reflection-pencil)" height="16" rx="8" width="124" x="220" y="212" transform="rotate(-18 220 212)" />
        <path d="m334 179 15 5-11 10z" fill="#f2d1a7" />
        <path d="m349 184 7 2-5 5z" fill="#1d2740" />
      </g>

      <g className={styles.chat}>
        <rect fill="#ffffff" height="52" opacity="0.96" rx="18" width="116" x="204" y="236" />
        <path d="M230 286l8-8h-8z" fill="#ffffff" opacity="0.96" />
        <rect fill="rgba(255,122,20,0.18)" height="10" rx="5" width="42" x="228" y="252" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="58" x="228" y="269" />
      </g>
    </svg>
  </div>
);
