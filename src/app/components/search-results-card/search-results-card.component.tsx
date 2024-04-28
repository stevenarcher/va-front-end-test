import { Holiday } from '@/types/booking';
import Rating from '@/app/components/rating/rating.component';
import styles from './search-results-card.module.scss';

type SearchResultsCardProps = { holiday: Holiday };

export default function SearchResultsCard({
  holiday: { hotel, ...holiday },
}: SearchResultsCardProps) {
  const { images, parentLocation, vRating, boardBasis, atAGlance } = hotel.content;

  const currencyPounds = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  return (
    <article className={styles.card}>
      <img className={styles.image} src={images[0].RESULTS_CAROUSEL.url} />
      <div className={styles.content}>
        <div className={styles.detail}>
          <h2>{hotel.name}</h2>
          <p className={styles.location}>{parentLocation}</p>
          {vRating && <Rating vRating={vRating} label="Virgin rating" />}
          {boardBasis && <p className={styles.boardBasis}>{boardBasis}</p>}
          <ul className={styles.list}>
            {atAGlance.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={styles.action}>
          <p
            className={styles.price}
            data-was-price={currencyPounds.format(holiday.pricePerPersonBeforeDiscount)}
          >
            {currencyPounds.format(holiday.pricePerPerson)}
          </p>
        </div>
      </div>
    </article>
  );
}
