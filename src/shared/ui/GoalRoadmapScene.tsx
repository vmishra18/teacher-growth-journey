import { useState } from 'react';
import styles from './GoalRoadmapScene.module.css';

interface GoalRoadmapSceneProps {
  className?: string;
}

export const GoalRoadmapScene = ({ className = '' }: GoalRoadmapSceneProps) => {
  const [showHeroImage, setShowHeroImage] = useState(true);

  return (
    <div aria-hidden="true" className={[styles.scene, className].filter(Boolean).join(' ')}>
      <div className={styles.glow} />

      {showHeroImage ? (
        <div className={styles.imageStage}>
          <div className={styles.imageWash} />
          <div className={styles.imageGlow} />
          <div className={styles.imageArc} />
          <div className={styles.imageRing} />
          <div className={styles.imageFloor} />
          <img
            alt=""
            className={styles.heroImage}
            onError={() => setShowHeroImage(false)}
            src="/hero.png"
          />
        </div>
      ) : (
        <>
          <svg className={styles.sceneSvg} viewBox="0 0 520 360">
      <defs>
        <linearGradient id="goal-roadmap-shell" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff8ef" />
        </linearGradient>
        <linearGradient id="goal-roadmap-panel" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#31497f" />
          <stop offset="100%" stopColor="#1d2740" />
        </linearGradient>
        <linearGradient id="goal-roadmap-accent" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7a14" />
          <stop offset="100%" stopColor="#ffb36a" />
        </linearGradient>
        <linearGradient id="goal-roadmap-cool" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#84a8ff" />
          <stop offset="100%" stopColor="#4e7af0" />
        </linearGradient>
      </defs>

      <g className={styles.board}>
        <rect fill="rgba(29,39,64,0.12)" height="236" rx="36" width="352" x="92" y="72" />
        <rect fill="url(#goal-roadmap-shell)" height="236" rx="36" width="352" x="80" y="60" />
        <rect fill="rgba(255,255,255,0.92)" height="184" rx="28" width="300" x="108" y="88" />

        <rect fill="rgba(255,122,20,0.1)" height="116" rx="28" width="110" x="130" y="112" />
        <rect fill="#ffffff" height="116" rx="28" width="110" x="122" y="104" />
        <circle cx="150" cy="132" fill="rgba(255,122,20,0.16)" r="14" />
        <path
          d="m144 132 5 5 9-11"
          fill="none"
          stroke="#ff7a14"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <rect fill="rgba(255,122,20,0.18)" height="11" rx="5.5" width="46" x="170" y="126" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="74" x="144" y="154" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="62" x="144" y="172" />
        <rect fill="rgba(78,122,240,0.1)" height="24" rx="12" width="70" x="144" y="191" />

        <rect fill="rgba(29,39,64,0.08)" height="132" rx="30" width="126" x="284" y="106" />
        <rect fill="url(#goal-roadmap-panel)" height="132" rx="30" width="126" x="272" y="94" />
        <rect fill="rgba(255,255,255,0.24)" height="10" rx="5" width="56" x="298" y="118" />
        <rect fill="rgba(255,255,255,0.16)" height="10" rx="5" width="72" x="298" y="138" />
        <circle cx="336" cy="178" fill="#ffffff" r="25" />
        <circle cx="336" cy="178" fill="none" r="25" stroke="rgba(78,122,240,0.24)" strokeWidth="8" />
        <circle cx="336" cy="178" fill="none" r="18" stroke="url(#goal-roadmap-accent)" strokeWidth="8" />
        <circle cx="336" cy="178" fill="url(#goal-roadmap-cool)" r="6" />

        <path
          d="M208 214 C232 228 250 228 268 214 C286 200 300 188 318 186"
          fill="none"
          stroke="url(#goal-roadmap-accent)"
          strokeDasharray="2 18"
          strokeLinecap="round"
          strokeWidth="8"
        />
        <circle cx="208" cy="214" fill="#ff8f32" r="11" />
        <circle cx="262" cy="219" fill="#ffb36a" r="9" />
        <circle cx="318" cy="186" fill="#ff8f32" r="11" />

        <rect fill="rgba(78,122,240,0.08)" height="34" rx="17" width="168" x="150" y="236" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="78" x="172" y="248" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="42" x="260" y="248" />
      </g>

      <g className={styles.stepCardLeft}>
        <rect fill="#ffffff" height="78" rx="22" width="138" x="66" y="238" />
        <circle cx="98" cy="277" fill="rgba(255,122,20,0.18)" r="16" />
        <path
          d="m92 277 5 5 9-11"
          fill="none"
          stroke="#ff7a14"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
        <rect fill="rgba(255,122,20,0.16)" height="11" rx="5.5" width="52" x="122" y="258" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="62" x="122" y="279" />
      </g>

      <g className={styles.stepCardRight}>
        <rect fill="#ffffff" height="84" rx="24" width="160" x="304" y="74" />
        <circle cx="336" cy="116" fill="rgba(78,122,240,0.14)" r="18" />
        <circle cx="336" cy="116" fill="none" r="12" stroke="#4e7af0" strokeWidth="5" />
        <circle cx="336" cy="116" fill="#4e7af0" r="4" />
        <rect fill="rgba(78,122,240,0.12)" height="11" rx="5.5" width="58" x="362" y="95" />
        <rect fill="rgba(29,39,64,0.12)" height="10" rx="5" width="82" x="362" y="116" />
        <rect fill="rgba(29,39,64,0.08)" height="10" rx="5" width="68" x="362" y="134" />
      </g>
          </svg>

          <div className={`${styles.floatCard} ${styles.floatTop}`}>
            <span className={styles.floatLabel}>Latest insight</span>
            <strong className={styles.floatValue}>Feedback reviewed</strong>
          </div>

          <div className={`${styles.floatCard} ${styles.floatBottom}`}>
            <span className={styles.floatLabel}>Next lesson goal</span>
            <strong className={styles.floatValue}>Clear classroom move</strong>
          </div>
        </>
      )}
    </div>
  );
};
