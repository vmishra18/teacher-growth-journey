import styles from './ResearchLearningScene.module.css';

export const ResearchLearningScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <svg className={styles.sceneSvg} viewBox="0 0 640 430">
      <defs>
        <linearGradient id="scene-blob" x1="8%" x2="92%" y1="10%" y2="92%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ff9c3f" />
        </linearGradient>
        <linearGradient id="scene-board" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#2b3e65" />
          <stop offset="100%" stopColor="#1f2d4a" />
        </linearGradient>
        <linearGradient id="scene-paper" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff8ef" />
        </linearGradient>
        <filter id="scene-shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" floodColor="#20314f" floodOpacity="0.16" stdDeviation="18" />
        </filter>
        <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" floodColor="#20314f" floodOpacity="0.14" stdDeviation="10" />
        </filter>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" floodColor="#20314f" floodOpacity="0.12" stdDeviation="8" />
        </filter>
      </defs>

      <g className={styles.blob}>
        <path
          d="M164 118 C212 72 318 66 386 108 C452 150 474 236 436 300 C398 362 290 386 208 358 C132 332 88 256 100 194 C108 156 128 136 164 118 Z"
          fill="url(#scene-blob)"
        />
      </g>

      <g className={styles.orbit}>
        <path
          d="M120 202 C144 114 232 74 326 88 C420 102 490 164 490 248 C490 304 446 348 372 364 C284 384 182 362 134 292"
          fill="none"
          stroke="#4a6f5a"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle cx="468" cy="149" fill="#2c8fb4" r="8" />
      </g>

      <g className={styles.boardGroup} filter="url(#scene-shadow)">
        <rect fill="url(#scene-board)" height="202" rx="28" width="236" x="146" y="122" />
        <rect fill="url(#scene-paper)" height="142" rx="18" width="180" x="174" y="150" />
        <rect fill="rgba(255,255,255,0.24)" height="20" rx="10" width="70" x="174" y="134" />
        <rect fill="rgba(255,255,255,0.18)" height="12" rx="6" width="34" x="252" y="138" />
        <rect fill="rgba(255,255,255,0.18)" height="12" rx="6" width="34" x="294" y="138" />

        <rect fill="rgba(255,122,20,0.18)" height="22" rx="11" width="74" x="196" y="170" />
        <rect fill="rgba(31,45,74,0.12)" height="10" rx="5" width="102" x="196" y="205" />
        <rect fill="rgba(31,45,74,0.08)" height="10" rx="5" width="86" x="196" y="225" />
        <rect fill="rgba(31,45,74,0.08)" height="10" rx="5" width="110" x="196" y="245" />
        <rect fill="#ff8a2c" height="30" rx="14" width="84" x="196" y="267" />
        <circle cx="314" cy="270" fill="none" r="22" stroke="#5b7cf7" strokeWidth="8" />
        <circle cx="314" cy="270" fill="none" opacity="0.2" r="22" stroke="#cbd5e1" strokeWidth="8" />
      </g>

      <g className={styles.sideCard} filter="url(#card-shadow)">
        <rect fill="url(#scene-paper)" height="104" rx="22" width="118" x="332" y="132" />
        <rect fill="rgba(255,122,20,0.22)" height="14" rx="7" width="54" x="356" y="154" />
        <rect fill="rgba(31,45,74,0.1)" height="10" rx="5" width="70" x="356" y="182" />
        <rect fill="rgba(31,45,74,0.08)" height="10" rx="5" width="62" x="356" y="202" />
      </g>

      <g className={styles.noteCard} filter="url(#soft-shadow)">
        <rect fill="#ffffff" height="62" rx="18" width="122" x="122" y="304" />
        <rect fill="rgba(255,122,20,0.2)" height="12" rx="6" width="48" x="146" y="326" />
        <rect fill="rgba(31,45,74,0.1)" height="10" rx="5" width="60" x="146" y="344" />
      </g>

      <g className={styles.pencil}>
        <rect fill="#ff7a14" height="16" rx="8" transform="rotate(22 112 296)" width="52" x="86" y="288" />
        <rect fill="#ffcca1" height="16" rx="8" transform="rotate(22 134 304)" width="14" x="128" y="296" />
      </g>

      <g className={styles.figureLeft}>
        <circle cx="240" cy="292" fill="#f0b08d" r="12" />
        <path d="M226 316 C226 300 234 294 240 294 C248 294 254 300 254 316 V342 H226 Z" fill="#ff7a14" />
        <rect fill="#1f2d4a" height="40" rx="8" width="10" x="230" y="338" />
        <rect fill="#1f2d4a" height="40" rx="8" width="10" x="244" y="338" />
        <rect fill="#ffffff" height="26" rx="13" width="54" x="184" y="314" />
        <rect fill="rgba(31,45,74,0.08)" height="8" rx="4" width="28" x="198" y="324" />
      </g>

      <g className={styles.figureRight}>
        <circle cx="322" cy="280" fill="#efb28f" r="12" />
        <path d="M308 306 C308 290 316 284 322 284 C330 284 336 290 336 306 V338 H308 Z" fill="#4a9a5d" />
        <rect fill="#1f2d4a" height="46" rx="8" width="10" x="312" y="334" />
        <rect fill="#1f2d4a" height="46" rx="8" width="10" x="326" y="334" />
        <rect fill="#ffffff" height="20" rx="10" width="26" x="304" y="292" />
      </g>

      <g className={styles.caption}>
        <text fill="#ffffff" fontFamily="inherit" fontSize="13" fontWeight="700" x="204" y="186">
          Evidence
        </text>
        <text fill="#31497f" fontFamily="inherit" fontSize="12" fontWeight="700" x="354" y="164">
          Reflection
        </text>
        <text fill="#31497f" fontFamily="inherit" fontSize="12" fontWeight="700" x="146" y="325">
          Next step
        </text>
      </g>
    </svg>
  </div>
);
