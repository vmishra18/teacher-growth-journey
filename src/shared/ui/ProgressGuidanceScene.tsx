import styles from './ProgressGuidanceScene.module.css';

export const ProgressGuidanceScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.baseGlow} />

    <svg className={styles.sceneSvg} viewBox="0 0 520 360">
      <defs>
        <linearGradient id="progress-shell" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#253558" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="progress-screen" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff8ef" />
        </linearGradient>
        <linearGradient id="progress-accent" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffb56c" />
        </linearGradient>
      </defs>

      <g className={styles.shell}>
        <rect fill="rgba(29,39,64,0.14)" height="214" rx="34" width="338" x="84" y="72" />
        <rect fill="url(#progress-shell)" height="214" rx="34" width="338" x="72" y="60" />
        <rect fill="url(#progress-screen)" height="166" rx="24" width="286" x="98" y="86" />
      </g>

      <g className={styles.grid}>
        <path d="M126 228h230" stroke="rgba(37,53,88,0.1)" strokeWidth="2" />
        <path d="M126 196h230" stroke="rgba(37,53,88,0.08)" strokeWidth="2" />
        <path d="M126 164h230" stroke="rgba(37,53,88,0.08)" strokeWidth="2" />
        <path d="M126 132h230" stroke="rgba(37,53,88,0.08)" strokeWidth="2" />
      </g>

      <g className={styles.bars}>
        <rect fill="url(#progress-accent)" height="54" rx="12" width="28" x="144" y="174" />
        <rect fill="url(#progress-accent)" height="82" opacity="0.88" rx="12" width="28" x="184" y="146" />
        <rect fill="url(#progress-accent)" height="108" opacity="0.82" rx="12" width="28" x="224" y="120" />
        <rect fill="url(#progress-accent)" height="132" opacity="0.78" rx="12" width="28" x="264" y="96" />
      </g>

      <g className={styles.trend}>
        <path
          d="M146 198 C176 186 196 174 212 166 C232 155 246 150 278 130 C300 117 320 108 340 100"
          fill="none"
          stroke="#2e9156"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <circle cx="146" cy="198" fill="#fff" r="8" />
        <circle cx="212" cy="166" fill="#fff" r="8" />
        <circle cx="278" cy="130" fill="#fff" r="8" />
        <circle cx="340" cy="100" fill="#fff" r="8" />
        <path d="m332 98 10-3-2 10" fill="none" stroke="#2e9156" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />
      </g>

      <g className={styles.kpiCard}>
        <rect fill="rgba(29,39,64,0.12)" height="84" rx="20" width="102" x="330" y="126" />
        <rect fill="#ffffff" height="84" rx="20" width="102" x="320" y="116" />
        <rect fill="rgba(255,122,20,0.18)" height="10" rx="5" width="40" x="342" y="136" />
        <rect fill="rgba(29,39,64,0.12)" height="12" rx="6" width="52" x="342" y="158" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="58" x="342" y="178" />
      </g>

      <g className={styles.miniCard}>
        <rect fill="#ffffff" height="52" opacity="0.96" rx="18" width="118" x="122" y="266" />
        <circle cx="148" cy="292" fill="#2e9156" r="9" />
        <path d="m144 292 3 3 6-7" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        <rect fill="rgba(29,39,64,0.14)" height="10" rx="5" width="54" x="166" y="276" />
        <rect fill="rgba(29,39,64,0.1)" height="10" rx="5" width="42" x="166" y="294" />
      </g>
    </svg>
  </div>
);
