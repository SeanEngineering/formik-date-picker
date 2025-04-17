export const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  timeZone: 'Australia/Sydney',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})