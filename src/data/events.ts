export type UConnEvent = {
  id: string;
  /** Date in YYYY-MM-DD format. */
  date: string;
  name: string;
  /** Display time, e.g. "7:30 PM – 10:00 PM". */
  time: string;
  location: string;
  description: string;
  /** Longer copy shown under "About This Event" on the details screen. */
  about: string;
  /** Shown in the "What to Bring" callout on the details screen. */
  whatToBring: string;
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
    about:
      'Walk the ballroom floor and meet student organizations, campus departments, and local groups that are recruiting new members all semester long. Tables are staffed by students, so you can ask what each group is really like before you sign up.',
    whatToBring: 'Your student ID and a few questions — most clubs sign up members on the spot.',
    imageUrl: 'https://picsum.photos/seed/involvement-fair/300/300',
  },
  {
    id: 'soccer-umass',
    date: '2026-09-26',
    name: "Men's Soccer vs. UMass",
    time: '1:00 PM',
    location: 'Joseph J. Morrone Stadium',
    description: 'Cheer on the Huskies under the afternoon sun as they open conference play.',
    about:
      'The Huskies open conference play at Morrone Stadium. Arrive early for the pregame atmosphere, stay through the final whistle, and cheer on the team with the UConn pep band in the stands.',
    whatToBring: 'Your student ID for free admission, sunscreen, and something blue to wear.',
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
    about:
      'An informal morning with the dean of students. Bring questions about campus life, housing, or anything else on your mind — coffee and pastries are provided and no topic is off limits.',
    whatToBring: 'Your questions. Coffee and pastries are on us.',
    imageUrl: 'https://picsum.photos/seed/dean-coffee/300/300',
  },
  {
    id: 'hack-night',
    date: '2026-09-30',
    name: 'Husky Hack Night',
    time: '6:00 PM – 9:00 PM',
    location: 'Tech Commons, Homer Babbidge Library',
    description: 'A beginner-friendly build night with free food, mentors, and mini demo prizes.',
    about:
      'A beginner-friendly build night where you can start a project of your own or join a team. Mentors circulate all evening, dinner is provided, and every demo wins a small prize.',
    whatToBring: 'A laptop and charger. No prior coding experience required.',
    imageUrl: 'https://picsum.photos/seed/hack-night/300/300',
  },
  {
    id: 'welcome-concert',
    date: '2026-10-03',
    name: 'Husky Welcome Concert',
    time: '7:30 PM',
    location: 'Gampel Pavilion',
    description: 'Live student performances and a headline act to close out Welcome Week.',
    about:
      'Live student performances, guest DJs, and a headline act close out Welcome Week in Gampel Pavilion. Doors open an hour early with food trucks on the concourse.',
    whatToBring: 'Your student ID and a charged phone for voting on the set list.',
    imageUrl: 'https://picsum.photos/seed/welcome-concert/300/300',
  },
  {
    id: 'movie-night',
    date: '2026-10-09',
    name: 'Fairfield Way Movie Night',
    time: '8:00 PM',
    location: 'Fairfield Way Lawn',
    description: 'Bring a blanket for an outdoor screening of a student-voted fan-favorite film.',
    about:
      'An outdoor screening on Fairfield Way Lawn. The film is chosen by student vote the week of the event, and the lawn opens early for the best spots.',
    whatToBring: 'A blanket or lawn chair, and an extra layer for when the sun goes down.',
    imageUrl: 'https://picsum.photos/seed/movie-night/300/300',
  },
  {
    id: 'career-fair',
    date: '2026-10-15',
    name: 'Fall Career & Internship Fair',
    time: '10:00 AM – 2:00 PM',
    location: 'Jorgensen Center for the Performing Arts',
    description: 'Network with 80+ employers hiring for internships and full-time roles.',
    about:
      'Connect with top employers from a variety of industries. Bring your resume and dress to impress — professional attire is recommended for every conversation.',
    whatToBring: 'Resumes, business cards, and a positive attitude!',
    imageUrl: 'https://picsum.photos/seed/career-fair/300/300',
  },
  {
    id: 'midnight-breakfast',
    date: '2026-12-07',
    name: 'Midnight Breakfast',
    time: '10:00 PM – 12:00 AM',
    location: 'Gampel Pavilion',
    description: 'Free breakfast classics served late-night before finals week — bring your student ID.',
    about:
      'Free breakfast classics served late-night the day before finals begin. Faculty and staff take over the griddles, so come hungry and stay for the music.',
    whatToBring: 'Your student ID. Vegetarian and gluten-free options are available.',
    imageUrl: 'https://picsum.photos/seed/midnight-breakfast/300/300',
  },
];

/** Fake events used across the app until a real backend exists. Sorted by date, ascending. */
export const EVENTS: UConnEvent[] = [...events].sort((a, b) => a.date.localeCompare(b.date));

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const WEEKDAYS_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
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
const MONTHS_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/**
 * Splits a YYYY-MM-DD date string without `new Date('YYYY-MM-DD')`, which parses as UTC
 * midnight and shows the previous day in timezones west of UTC (like the US).
 */
function parseDate(date: string): { year: number; month: number; day: number; weekday: number } {
  const [year, month, day] = date.split('-').map(Number);
  return { year, month, day, weekday: new Date(Date.UTC(year, month - 1, day)).getUTCDay() };
}

/**
 * Formats a YYYY-MM-DD date string as e.g. "Thu, Sep 24, 2026".
 */
export function formatEventDate(date: string): string {
  const { year, month, day, weekday } = parseDate(date);
  return `${WEEKDAYS[weekday]}, ${MONTHS[month - 1]} ${day}, ${year}`;
}

/**
 * Formats a YYYY-MM-DD date string as e.g. "Sep 24".
 */
export function formatEventDateShort(date: string): string {
  const { month, day } = parseDate(date);
  return `${MONTHS[month - 1]} ${day}`;
}

/**
 * Formats a YYYY-MM-DD date string as e.g. "Wednesday, September 24, 2026".
 */
export function formatEventDateFull(date: string): string {
  const { year, month, day, weekday } = parseDate(date);
  return `${WEEKDAYS_FULL[weekday]}, ${MONTHS_FULL[month - 1]} ${day}, ${year}`;
}
