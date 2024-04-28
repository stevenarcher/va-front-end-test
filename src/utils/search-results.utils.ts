import { FilterID, Holiday } from '@/types/booking';
import { hotelFacilities, hotelPriceGroups, hotelRatings } from '@/utils/constants';

/**
 * Gets the amount of holidays with specific rating
 * @param holidays
 * @param rating
 */
export const getRatingAmount = (holidays: Holiday[], rating: number | string) => {
  const matches = holidays.filter((holiday) => `${holiday.hotel.content.vRating}` === `${rating}`);
  return matches.length;
};

/**
 * Get the amount of holidays within specific range
 * @param holidays
 * @param min
 * @param max
 */
export const getPricePerPersonAmount = (
  holidays: Holiday[],
  { min, max }: { min: number; max: number }
) => {
  const matches = holidays.filter(
    ({ pricePerPerson }) => pricePerPerson > min && pricePerPerson < max
  );
  return matches.length;
};

/**
 * Get the amount of holidays that has specified facility
 * @param holidays
 * @param facility
 */
export const getFacilitiesAmount = (holidays: Holiday[], facility: string) => {
  const matches = holidays.filter((holiday) =>
    holiday.hotel.content.hotelFacilities.includes(facility)
  );
  return matches.length;
};

/**
 * Gets indexes of filters from array of filters
 * @param id
 * @param filters
 */
export const getFilterIndexes = (id: FilterID, filters: string[]) => {
  const matchingFilterIndexes = filters.filter((filterID) => filterID.substring(0, 1) === id);
  return matchingFilterIndexes.map((filter) => parseInt(filter.substring(1)));
};

export const priceRanges: { min: number; max: number }[] = [
  { min: 0, max: 1340 },
  { min: 1340, max: 1530 },
  { min: 1530, max: 1880 },
  { min: 1880, max: Number.MAX_VALUE },
];

/**
 * Gets Holidays that match filters
 * @param holidays
 * @param filters
 */
export const filterHolidays = (holidays: Holiday[], filters: string | undefined) => {
  if (!filters) {
    return holidays;
  }

  const filterIDs = filters.split('-');

  const ratingFilters = getFilterIndexes(FilterID.RATING, filterIDs).map(
    (index) => hotelRatings[index]
  );
  const facilitiesFilters = getFilterIndexes(FilterID.FACILITIES, filterIDs).map(
    (index) => hotelFacilities[index]
  );
  const priceFilters = getFilterIndexes(FilterID.PRICE, filterIDs).map(
    (index) => priceRanges[index]
  );

  return holidays.filter((holiday) => {
    const matchesRating =
      ratingFilters.length > 0 ? ratingFilters.includes(`${holiday.hotel.content.vRating}`) : true;

    const matchFacilities =
      facilitiesFilters.length > 0
        ? facilitiesFilters.every((facilitiesFilter) =>
            holiday.hotel.content.hotelFacilities.includes(facilitiesFilter)
          )
        : true;

    const matchesPrice =
      priceFilters.length > 0
        ? priceFilters.reduce(
            (matchedPrice, range) =>
              matchedPrice
                ? true
                : holiday.pricePerPerson > range.min && holiday.pricePerPerson < range.max,
            false
          )
        : true;

    return matchesRating && matchesPrice && matchFacilities;
  });
};
