import { BookingResponse, FilterID, Holiday, SearchParams } from '@/types/booking';
import { Rooms } from '@/utils/composition.service';
import styles from './search-results.module.scss';
import FilterGroup from '@/app/components/filter-group/filter-group.component';
import FilterOption from '@/app/components/filter-option/filter-option.component';
import {
  filterHolidays,
  getFacilitiesAmount,
  getPricePerPersonAmount,
  getRatingAmount,
  priceRanges,
} from '@/utils/search-results.utils';
import Rating from '@/app/components/rating/rating.component';
import { hotelFacilities, hotelPriceGroups, hotelRatings } from '@/utils/constants';
import SearchResultsCard from '@/app/components/search-results-card/search-results-card.component';
import { redirect } from 'next/navigation';

async function getData(params: SearchParams) {
  const body = {
    bookingType: params.bookingType,
    direct: false,
    location: params.location,
    departureDate: params.departureDate,
    duration: params.duration,
    gateway: params.gateway,
    partyCompositions: Rooms.parseAndConvert([params.partyCompositions as string]),
  };

  const res = await fetch('https://www.virginholidays.co.uk/cjs-search-api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

type SearchResultsProps = {
  searchParams: SearchParams;
};

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const req = await getData(searchParams);
  const results: BookingResponse = req;

  const saveFilters = async (data: FormData) => {
    'use server';

    const selectedFilters: string[] = [];
    data.forEach((value, filterName) => {
      if (value === 'on') {
        selectedFilters.push(filterName);
      }
    });

    const params = new URLSearchParams({ ...searchParams, filters: selectedFilters.join('-') });
    return redirect(`/results?${params}`);
  };

  const filteredHolidays = filterHolidays(results.holidays, searchParams.filters);

  return (
    <section className={styles.structure}>
      <aside className={styles.aside}>
        <form action={saveFilters}>
          <FilterGroup label="Rating">
            {hotelRatings.map((hotelRating, index) => (
              <FilterOption
                key={hotelRating}
                name={`${FilterID.RATING}${index}`}
                amount={getRatingAmount(filteredHolidays, hotelRating)}
              >
                <Rating vRating={hotelRating} />
              </FilterOption>
            ))}
          </FilterGroup>
          <FilterGroup label="Price (PP)">
            {hotelPriceGroups.map((priceGroup, index) => (
              <FilterOption
                key={priceGroup}
                name={`${FilterID.PRICE}${index}`}
                amount={getPricePerPersonAmount(filteredHolidays, priceRanges[index])}
              >
                {priceGroup}
              </FilterOption>
            ))}
          </FilterGroup>
          <FilterGroup label="Hotel Facilities">
            {hotelFacilities.map((facility, index) => (
              <FilterOption
                key={facility}
                name={`${FilterID.FACILITIES}${index}`}
                amount={getFacilitiesAmount(filteredHolidays, facility)}
              >
                {facility}
              </FilterOption>
            ))}
          </FilterGroup>
        </form>
      </aside>
      <section>
        <h2>{filteredHolidays.length} results found</h2>
        {filteredHolidays.map((holiday, index) => (
          <SearchResultsCard holiday={holiday} key={`result-${index}`} />
        ))}
      </section>
    </section>
  );
}
