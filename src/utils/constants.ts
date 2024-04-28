export const DATE_FORMATS = {
  URL_DATE: 'dd-MM-yyyy',
  DISPLAY_DATE: 'dd MMM, yyyy',
};

export const hotelFacilities = [
  'Restaurant',
  'Bar',
  'Free Parking',
  'Room Service',
  'Safety Deposit Box',
  'Laundry Service',
  'Games Room',
  'Internet Access',
  'Free transport to theme parks',
  'Swimming Pool',
  'Spa',
  'Fitness Centre/Gym',
  'Evening Entertainment',
  'Hot tub',
  'Whirlpool',
  'No Smoking',
  'Valet parking',
] as const;

export const hotelRatings = ['5+', '5', '4+', '4', '3+', '3', 'Villa'] as const;
export const hotelPriceGroups = [
  'up to £1340',
  '£1340 - £1530',
  '£1530 - £1880',
  'over £1880',
] as const;
