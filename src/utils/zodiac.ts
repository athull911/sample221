export interface ZodiacInfo {
  sign: string;
  symbol: string;
  dateRange: string;
  element: string;
  absurdTrait: string;
}

export const ZODIAC_SIGNS: ZodiacInfo[] = [
  { sign: 'Aries', symbol: '♈', dateRange: 'Mar 21 - Apr 19', element: 'Fire', absurdTrait: 'Pushes doors that clearly say pull' },
  { sign: 'Taurus', symbol: '♉', dateRange: 'Apr 20 - May 20', element: 'Earth', absurdTrait: 'Plans their next meal while eating their current meal' },
  { sign: 'Gemini', symbol: '♊', dateRange: 'May 21 - Jun 20', element: 'Air', absurdTrait: 'Has 82 tabs open in both their browser and their brain' },
  { sign: 'Cancer', symbol: '♋', dateRange: 'Jun 21 - Jul 22', element: 'Water', absurdTrait: 'Forms emotional attachments to inanimate mugs' },
  { sign: 'Leo', symbol: '♌', dateRange: 'Jul 23 - Aug 22', element: 'Fire', absurdTrait: 'Treats the supermarket aisle like a Milan fashion runway' },
  { sign: 'Virgo', symbol: '♍', dateRange: 'Aug 23 - Sep 22', element: 'Earth', absurdTrait: 'Colors-codes lists of lists they will never finish' },
  { sign: 'Libra', symbol: '♎', dateRange: 'Sep 23 - Oct 22', element: 'Air', absurdTrait: 'Takes 45 minutes to pick between two identical sandwiches' },
  { sign: 'Scorpio', symbol: '♏', dateRange: 'Oct 23 - Nov 21', element: 'Water', absurdTrait: 'Remembers a slight from kindergarten in high definition' },
  { sign: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 - Dec 21', element: 'Fire', absurdTrait: 'Impulsively buys flight tickets while holding no savings' },
  { sign: 'Capricorn', symbol: '♑', dateRange: 'Dec 22 - Jan 19', element: 'Earth', absurdTrait: 'Sighs loudly in spreadsheets for recreational pleasure' },
  { sign: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 - Feb 18', element: 'Air', absurdTrait: 'Claims they belong to an alternate cybernetic dimension' },
  { sign: 'Pisces', symbol: '♓', dateRange: 'Feb 19 - Mar 20', element: 'Water', absurdTrait: 'Daydreams through entire important meetings with a serene smile' }
];

export function getZodiacFromBirthday(birthdayString: string): string {
  if (!birthdayString) return 'Aries';
  const date = new Date(birthdayString);
  if (isNaN(date.getTime())) return 'Aries';

  const month = date.getUTCMonth() + 1; // 1-12
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}
