export type UConnEvent = {
  id: string;
  /** Date in YYYY-MM-DD format. */
  date: string;
  name: string;
  /** Display time, e.g. "7:30 PM – 10:00 PM". */
  time: string;
  location: string;
  description: string;
  imageUrl: string;
};

const events: UConnEvent[] = [
  {
    id: 'involvement-fair',
    date: '2026-09-24',
    name: 'Fall Involvement Fair',
    time: '11:00 AM – 3:00 PM',
    location: 'Student Union Ballroom',
    description:
      'Meet 150+ student clubs, organizations, and local groups looking for new members.',
    imageUrl: 'https://picsum.photos/seed/involvement-fair/300/300',
  },
  {
    id: 'soccer-umass',
    date: '2026-09-26',
    name: "Men's Soccer vs. UMass",
    time: '1:00 PM',
    location: 'Joseph J. Morrone Stadium',
    description: 'Cheer on the Huskies under the afternoon sun as they open conference play.',
    imageUrl: 'https://picsum.photos/seed/soccer-match/300/300',
  },
  {
    id: 'coffee-dean',
    date: '2026-09-29',
    name: 'Coffee & Conversations with the Dean',
    time: '9:00 AM – 10:30 AM',
    location: 'Thomas J. Falk Hall, Room 100',
    description:
      'An informal chat with the dean of students — bring your questions, free coffee provided.',
    imageUrl: 'https://picsum.photos/seed/dean-coffee/300/300',
  },
  {
    id: 'hack-night',
    date: '2026-09-30',
    name: 'Husky Hack Night',
    time: '6:00 PM – 9:00 PM',
    location: 'Tech Commons, Homer Babbidge Library',
    description: 'A beginner-friendly build night with free food, mentors, and mini demo prizes.',
    imageUrl: 'https://picsum.photos/seed/hack-night/300/300',
  },
  {
    id: 'welcome-concert',
    date: '2026-10-03',
    name: 'Husky Welcome Concert',
    time: '7:30 PM',
    location: 'Gampel Pavilion',
    description: 'Live student performances and a headline act to close out Welcome Week.',
    imageUrl: 'https://picsum.photos/seed/welcome-concert/300/300',
  },
  {
    id: 'movie-night',
    date: '2026-10-09',
    name: 'Fairfield Way Movie Night',
    time: '8:00 PM',
    location: 'Fairfield Way Lawn',
    description: 'Bring a blanket for an outdoor screening of a student-voted fan-favorite film.',
    imageUrl: 'https://picsum.photos/seed/movie-night/300/300',
  },
  {
    id: 'career-fair',
    date: '2026-10-15',
    name: 'Fall Career & Internship Fair',
    time: '10:00 AM – 2:00 PM',
    location: 'Jorgensen Center for the Performing Arts',
    description: 'Network with 80+ employers hiring for internships and full-time roles.',
    imageUrl: 'https://picsum.photos/seed/career-fair/300/300',
  },
  {
    id: 'midnight-breakfast',
    date: '2026-12-07',
    name: 'Midnight Breakfast',
    time: '10:00 PM – 12:00 AM',
    location: 'Gampel Pavilion',
    description: 'Free breakfast classics served late-night before finals week — bring your student ID.',
    imageUrl: 'https://picsum.photos/seed/midnight-breakfast/300/300',
  },
];

/** Fake events used across the app until a real backend exists. Sorted by date, ascending. */
export const EVENTS: UConnEvent[] = [...events].sort((a, b) => a.date.localeCompare(b.date));

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/**
 * Formats a YYYY-MM-DD date string as e.g. "Thu, Sep 24, 2026".
 * Parses the date parts manually — `new Date('YYYY-MM-DD')` parses as UTC midnight,
 * which shows the previous day in timezones west of UTC (like the US).
 */
export function formatEventDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday}, ${MONTHS[month - 1]} ${day}, ${year}`;
}
