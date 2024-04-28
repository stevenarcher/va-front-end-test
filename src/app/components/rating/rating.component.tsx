import styles from './rating.module.scss';
import { VRating } from '@/types/booking';

interface RatingProps {
  vRating: VRating;
  label?: string;
}

export default function Rating({ vRating, label }: RatingProps) {
  const hasPlus = vRating.includes('+');
  const rating = parseInt(`${vRating}`.replace('+', ''));

  return (
    <>
      <div className={styles.rating}>
        {vRating === 'NA' ? (
          <div className={styles.villa}>Villa</div>
        ) : (
          <>
            <svg width="60" height="16" viewBox="0 0 500 87" fill="none">
              <mask id="mask0_0_1" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="87">
                <path d="M0 0H86.2069L43.1034 86.2069L0 0Z" fill="#fff" />
                <path d="M103.448 0H189.655L146.552 86.2069L103.448 0Z" fill="#fff" />
                <path d="M310.345 0H396.552L353.448 86.2069L310.345 0Z" fill="#fff" />
                <path d="M413.793 0H500L456.897 86.2069L413.793 0Z" fill="#fff" />
                <path d="M206.897 0H293.103L250 86.2069L206.897 0Z" fill="#fff" />
              </mask>
              <g mask="url(#mask0_0_1)">
                <rect width="500" height="86.2069" fill="#ddd" />
                <rect
                  className={styles.animateBar}
                  width={(rating + (hasPlus ? 0.5 : 0)) * 102}
                  height="86.2069"
                  fill="#DA0530"
                />
              </g>
            </svg>
            {hasPlus && rating === 5 && 'Plus'}
          </>
        )}
      </div>
      {label && <p className={styles.ratingLabel}>{label}</p>}
    </>
  );
}
