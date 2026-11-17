/** Corporate year follows the user's/company's Harare timezone, not the build host timezone. */
export function getCopyrightYear(date = new Date()): number {
  return Number(new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Africa/Harare' }).format(date));
}
