export type Stat = {
  label: string;
  value: string;
};

export type MaterialCard = {
  title: string;
  type: string;
  subject: string;
  institution: string;
  rating: number;
  downloads: string;
  accent: string;
};

export const stats: Stat[] = [
  { label: 'Students', value: '50,000+' },
  { label: 'Learning Materials', value: '20,000+' },
  { label: 'Downloads', value: '500,000+' },
  { label: 'AI Questions Answered', value: '100,000+' },
];

export const featuredExams: MaterialCard[] = [
  { title: 'KCSE Biology Past Papers', type: 'Exam', subject: 'Biology', institution: 'KNEC', rating: 4.9, downloads: '12,400', accent: 'from-emerald-500 to-teal-400' },
  { title: 'Engineering Calculus Revision Pack', type: 'Exam', subject: 'Mathematics', institution: 'Makerere', rating: 4.8, downloads: '9,760', accent: 'from-sky-500 to-blue-500' },
  { title: 'Business Management Mock Papers', type: 'Exam', subject: 'Business', institution: 'UON', rating: 4.7, downloads: '8,440', accent: 'from-violet-500 to-purple-500' },
];

export const books = [
  { title: 'Modern Physics for Advanced Learners', type: 'Book', subject: 'Physics', institution: 'Oxford Press', rating: 4.9, downloads: '11,200', accent: 'from-cyan-500 to-blue-500' },
  { title: 'Economics Essentials', type: 'Book', subject: 'Economics', institution: 'Pearson', rating: 4.8, downloads: '7,260', accent: 'from-amber-500 to-orange-500' },
  { title: 'Computer Science Handbook', type: 'Book', subject: 'Computing', institution: 'Strathmore', rating: 4.9, downloads: '9,980', accent: 'from-indigo-500 to-violet-500' },
];

export const notes = [
  { title: 'History Essay Revision Notes', type: 'Notes', subject: 'History', institution: 'Kisumu Academy', rating: 4.7, downloads: '6,430', accent: 'from-rose-500 to-pink-500' },
  { title: 'Chemistry Formula Summary', type: 'Notes', subject: 'Chemistry', institution: 'Mangu High', rating: 4.8, downloads: '8,120', accent: 'from-fuchsia-500 to-violet-500' },
  { title: 'English Language Exam Prep', type: 'Notes', subject: 'English', institution: 'Nairobi School', rating: 4.9, downloads: '10,400', accent: 'from-lime-500 to-green-500' },
];

export const categories = [
  'Science', 'Mathematics', 'Business', 'Humanities', 'Arts', 'Technology', 'Medicine', 'Education', 'Law', 'Languages'
];

export const subjects = [
  'Biology', 'Physics', 'Chemistry', 'Mathematics', 'Economics', 'Accounting', 'Geography', 'Computer Science', 'Literature', 'History'
];

export const institutions = [
  'University of Nairobi', 'Makerere University', 'Kenyatta University', 'Strathmore University', 'University of Dar es Salaam', 'Ashesi University'
];

export const testimonials = [
  { name: 'Amina K.', role: 'Final Year Student', quote: 'The AI revision plans reduced my study time and helped me focus on exactly what mattered before the exams.' },
  { name: 'Brian O.', role: 'Engineering Student', quote: 'I used the tutor and past papers library to improve my problem-solving speed and confidence.' },
  { name: 'Joseph M.', role: 'Business Major', quote: 'The study analytics and recommendations made my revision routine disciplined and measurable.' },
];

export const faqItems = [
  { question: 'How does the AI tutor work?', answer: 'It uses document-aware retrieval, embeddings, and OpenAI models to answer questions, explain concepts, and summarize study material.' },
  { question: 'Can I upload my own notes?', answer: 'Yes. Students, contributors, and admins can upload documents in supported formats and process them through the automated pipeline.' },
  { question: 'Is there a premium plan?', answer: 'Yes. Subscription tiers unlock unlimited AI, premium downloads, advanced quizzes, and smarter learning reports.' },
  { question: 'Can I access materials offline?', answer: 'The platform is PWA-capable and supports offline access for saved resources and dashboard data.' },
];

export const dashboardStats = [
  { label: 'Study streak', value: '24 days' },
  { label: 'AI chats', value: '186' },
  { label: 'Flashcards', value: '940' },
  { label: 'Average score', value: '89%' },
];

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/search', label: 'AI Search' },
  { href: '/exams', label: 'Exams' },
  { href: '/books', label: 'Books' },
  { href: '/notes', label: 'Notes' },
  { href: '/tutor', label: 'AI Tutor' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
