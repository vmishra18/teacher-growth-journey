import styles from './TeachingSupportScene.module.css';

export const TeachingSupportScene = () => (
  <div aria-hidden="true" className={styles.scene}>
    <div className={styles.orbit} />
    <div className={styles.glow} />

    <svg className={styles.sceneSvg} viewBox="0 0 520 420">
      <defs>
        <linearGradient id="support-orange" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffad63" />
        </linearGradient>
        <linearGradient id="support-blue" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#3550a3" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="support-card" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff8f0" />
        </linearGradient>
      </defs>

      <path
        className={styles.blob}
        d="M118 92c44-30 129-36 192-13 42 15 73 41 89 79 17 42 10 93-22 134-33 42-88 67-152 69-69 2-138-22-173-70-34-47-33-111-4-149 14-19 39-38 70-50Z"
        fill="url(#support-orange)"
      />

      <g className={styles.boardGroup}>
        <rect fill="rgba(32, 44, 72, 0.16)" height="178" rx="28" width="212" x="120" y="118" />
        <rect fill="url(#support-blue)" height="178" rx="28" width="212" x="106" y="106" />
        <rect fill="rgba(255,255,255,0.96)" height="124" rx="18" width="156" x="134" y="136" />
        <rect fill="rgba(255,122,20,0.14)" height="14" rx="7" width="62" x="156" y="156" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="96" x="156" y="182" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="112" x="156" y="202" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="72" x="156" y="222" />
        <rect fill="#ff8f32" height="76" rx="18" width="56" x="225" y="170" />
        <rect fill="rgba(255,255,255,0.88)" height="12" rx="6" width="34" x="236" y="184" />
        <rect fill="rgba(255,255,255,0.74)" height="10" rx="5" width="28" x="239" y="205" />
      </g>

      <g className={styles.noteCard}>
        <rect fill="rgba(19, 28, 47, 0.18)" height="92" rx="22" width="102" x="294" y="128" />
        <rect fill="url(#support-card)" height="92" rx="22" width="102" x="286" y="118" />
        <circle cx="318" cy="146" fill="#ff8f32" r="10" />
        <rect fill="rgba(29,39,64,0.1)" height="10" rx="5" width="42" x="336" y="141" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="58" x="310" y="165" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="52" x="310" y="184" />
      </g>

      <g className={styles.figureCoach}>
        <ellipse cx="178" cy="320" fill="rgba(29,39,64,0.12)" rx="32" ry="10" />
        <circle cx="178" cy="243" fill="#f6b48e" r="18" />
        <path d="M158 283c2-27 14-42 34-42 18 0 29 14 31 42v42h-20l-6-31-7 31h-18Z" fill="#ff7a14" />
        <rect fill="#1d2740" height="54" rx="10" width="16" x="170" y="310" />
        <rect fill="#384a79" height="58" rx="10" width="16" x="193" y="306" />
      </g>

      <g className={styles.figureTeacher}>
        <ellipse cx="276" cy="336" fill="rgba(29,39,64,0.12)" rx="30" ry="9" />
        <circle cx="276" cy="260" fill="#f6b48e" r="16" />
        <path d="M255 296c0-24 12-37 28-37 18 0 29 13 31 37v35h-18l-6-25-5 25h-18Z" fill="#2e9156" />
        <rect fill="#1d2740" height="54" rx="10" width="15" x="267" y="316" />
        <rect fill="#1d2740" height="52" rx="10" width="15" x="287" y="314" />
      </g>

      <g className={styles.detailGroup}>
        <rect fill="#ffffff" height="54" opacity="0.92" rx="18" width="118" x="102" y="300" />
        <rect fill="rgba(255,122,20,0.2)" height="10" rx="5" width="56" x="124" y="319" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="72" x="124" y="338" />
        <circle cx="92" cy="296" fill="#ff8f32" r="16" />
        <circle cx="402" cy="98" fill="#1a8f99" r="12" />
      </g>
    </svg>
  </div>
);
