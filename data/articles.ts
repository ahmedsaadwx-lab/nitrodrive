export type Article = { slug: string; title: string; description: string; category: string; content: string[] };

export const articles: Article[] = [
  { slug: 'how-to-master-drifting', title: 'How to Master Drifting in Browser Racing Games', description: 'Learn the fundamentals of weight transfer, throttle control and clean exits in browser drifting games.', category: 'Driving tips', content: ['Drifting starts with control, not maximum speed. Enter a corner with a measured lift, then use a short steering input to move the car into a slide.', 'Keep the throttle smooth while the rear steps out. Small corrections are faster than dramatic steering swings, especially on narrow street circuits.', 'The best drift is the one you can exit cleanly. Straighten the wheel early, settle the car and build speed for the next section.'] },
  { slug: 'stunt-racing-tips', title: 'Tips for Stunt Racing', description: 'A practical guide to reading ramps, managing landings and keeping momentum on stunt tracks.', category: 'Driving tips', content: ['Read the landing before you commit to a jump. A clean four-wheel landing is usually faster than a bigger flip that costs momentum.', 'Use the approach to set your angle. Brake before a tight ramp and accelerate only when the car is aligned with the landing.', 'Experiment in short runs and repeat the sections that feel inconsistent. Precision turns difficult stunt tracks into reliable routes.'] }
];

export const getArticle = (slug: string) => articles.find(article => article.slug === slug);
