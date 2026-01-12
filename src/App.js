import React, { useState, useRef, useEffect } from 'react';
import { Star, MapPin, Calendar, GraduationCap, Briefcase, BookOpen, UserPlus, User, X, Filter, Search, Building2, Users2, Globe2, ArrowLeft, Settings, Sun, Moon, Award, ChevronRight, Mail, Phone, Globe, Shield, FileText, Instagram, Youtube, Linkedin, Twitter, Facebook, MapPin as MapPinIcon } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCareerField, setSelectedCareerField] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Все типы');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все специальности');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [hasPartnership, setHasPartnership] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showMapCategoryDropdown, setShowMapCategoryDropdown] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [showMapSearchResults, setShowMapSearchResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapSearchRef = useRef(null);

  const universities = [
    { id: 1, name: 'Московский государственный университет имени М.В. Ломоносова', location: 'Москва, Ленинские горы, д. 1', students: '40 000', rank: 'Топ-1 в России', type: 'Университет', specialties: ['IT', 'Инженерия', 'Медицина', 'Экономика', 'Право'], shortName: 'МГУ', website: 'https://msu.ru/', aliases: ['МГУ', 'Ломоносовский университет', 'Московский университет', 'университет Ломоносова'] },
    { id: 2, name: 'Московский физико-технический институт', location: 'Москва, Институтский пер., д. 9', students: '7 000', rank: 'Топ-1 в науке', type: 'Институт', specialties: ['IT', 'Инженерия', 'Физика'], shortName: 'МФТИ', website: 'https://mipt.ru/', aliases: ['МФТИ', 'Физтех', 'Физтех институт', 'Московский физтех'] },
    { id: 3, name: 'Национальный исследовательский ядерный университет «МИФИ»', location: 'Москва, Каширское ш., д. 31', students: '12 000', rank: 'Топ-5 в инженерии', type: 'Университет', specialties: ['Инженерия', 'Физика', 'Химия'], shortName: 'НИЯУ МИФИ', website: 'https://mephi.ru/', aliases: ['НИЯУ МИФИ', 'МИФИ', 'Московский инженерный физико-технический институт', 'институт ядерной физики'] },
    { id: 4, name: 'Национальный исследовательский технологический университет «МИСиС»', location: 'Москва, Ленинский пр., д. 65', students: '10 000', rank: 'Топ-3 в инженерии', type: 'Университет', specialties: ['Инженерия', 'Материаловедение', 'Металлургия'], shortName: 'НИТУ МИСиС', website: 'https://misis.ru/', aliases: ['НИТУ МИСиС', 'МИСиС', 'Московский институт стали и сплавов', 'институт сталеплавильщиков'] },
    { id: 5, name: 'Российский национальный исследовательский медицинский университет имени Н.И. Пирогова', location: 'Москва, ул. Островитянова, д. 1', students: '15 000', rank: 'Топ-1 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Стоматология'], shortName: 'РНИМУ', website: 'https://rsmu.ru/', aliases: ['РНИМУ', 'РНМУ', 'Пироговский университет', 'медицинский университет Пирогова', 'университет Пирогова'] },
    { id: 6, name: 'Московский авиационный институт', location: 'Москва, Волоколамское ш., д. 4', students: '14 000', rank: 'Топ-2 в авиации', type: 'Институт', specialties: ['Инженерия', 'Авиация', 'Космос'], shortName: 'МАИ', website: 'https://mai.ru/', aliases: ['МАИ', 'Московский авиационный институт', 'авиационный институт', 'институт авиации'] },
    { id: 7, name: 'Московский институт электронной техники – Национальный исследовательский университет', location: 'Москва, Зеленоград, площадь Шокина, д. 1', students: '11 000', rank: 'Топ-3 в электронике', type: 'Университет', specialties: ['IT', 'Инженерия', 'Электроника'], shortName: 'МИЭТ', website: 'https://miet.ru/', aliases: ['МИЭТ', 'Московский институт электронной техники', 'институт электроники', 'электронный институт'] },
    { id: 8, name: 'Московский государственный технический университет имени Н.Э. Баумана', location: 'Москва, 2-я Бауманская ул., д. 5', students: '18 000', rank: 'Топ-2 в технике', type: 'Университет', specialties: ['Инженерия', 'Механика', 'Робототехника'], shortName: 'МГТУ им. Баумана', website: 'https://bmstu.ru/', aliases: ['МГТУ им. Баумана', 'Бауманка', 'Бауманский университет', 'технический университет Баумана'] },
    { id: 9, name: 'Российский государственный университет нефти и газа имени И.М. Губкина', location: 'Москва, Ленинский пр., д. 33', students: '13 000', rank: 'Топ-1 в нефти и газе', type: 'Университет', specialties: ['Нефть и газ', 'Инженерия', 'Энергетика'], shortName: 'РГУ нефти и газа', website: 'https://gubkin.ru/', aliases: ['РГУ нефти и газа', 'Губкинка', 'Губкинский университет', 'нефтегазовый университет'] },
    { id: 10, name: 'Национальный исследовательский университет «МЭИ»', location: 'Москва, Красноказарменная ул., д. 14', students: '11 500', rank: 'Топ-2 в энергетике', type: 'Университет', specialties: ['Энергетика', 'Инженерия', 'IT'], shortName: 'НИУ МЭИ', website: 'https://mpei.ru/', aliases: ['НИУ МЭИ', 'МЭИ', 'Московский энергетический институт', 'энергетический институт'] },
    { id: 11, name: 'Национальный исследовательский университет «Высшая школа экономики»', location: 'Москва, ул. Мясницкая, д. 20', students: '28 000', rank: 'Топ-5 в России', type: 'Университет', specialties: ['Экономика', 'Право', 'Социология'], shortName: 'НИУ ВШЭ', website: 'https://www.hse.ru/', aliases: ['НИУ ВШЭ', 'ВШЭ', 'Вышка', 'Высшая школа экономики'] },
    { id: 12, name: 'Московский государственный строительный университет', location: 'Москва, Ярославское ш., д. 26', students: '10 000', rank: 'Топ-3 в строительстве', type: 'Университет', specialties: ['Инженерия', 'Строительство', 'Архитектура'], shortName: 'МГСУ', website: 'https://mgsu.ru/', aliases: ['МГСУ', 'Московский строительный университет', 'строительный университет', 'институт строительства'] },
    { id: 13, name: 'Московский государственный институт международных отношений', location: 'Москва, ул. Профсоюзная, д. 76', students: '11 000', rank: 'Топ-1 в международных отношениях', type: 'Институт', specialties: ['Международные отношения', 'Политология', 'Лингвистика'], shortName: 'МГИМО', website: 'https://mgimo.ru/', aliases: ['МГИМО', 'Московский институт международных отношений', 'институт международных отношений', 'МИМО'] },
    { id: 14, name: 'Первый Московский государственный медицинский университет имени И.М. Сеченова', location: 'Москва, ул. Трубецкая, д. 8, стр. 2', students: '14 000', rank: 'Топ-1 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Стоматология'], shortName: 'Сеченовский Университет', website: 'https://www.sechenov.ru/', aliases: ['Сеченовский Университет', 'Первый МГМУ', 'Сеченка', 'медицинский университет Сеченова'] },
    { id: 15, name: 'Московский городской педагогический университет', location: 'Москва, 2-й Сельскохозяйственный проезд, д. 4', students: '13 000', rank: 'Топ-3 в педагогике', type: 'Университет', specialties: ['Педагогика', 'Психология', 'Образование'], shortName: 'МГПУ', website: 'https://www.mgpu.ru/', aliases: ['МГПУ', 'Московский педагогический университет', 'педагогический университет', 'учительский университет'] },
    { id: 16, name: 'Московский государственный лингвистический университет', location: 'Москва, ул. Воронцовская, д. 8', students: '9 000', rank: 'Топ-1 в лингвистике', type: 'Университет', specialties: ['Лингвистика', 'Перевод', 'Международные отношения'], shortName: 'МГЛУ', website: 'https://linguanet.ru/', aliases: ['МГЛУ', 'Московский лингвистический университет', 'лингвистический университет', 'языковой университет'] },
    { id: 17, name: 'Московский государственный юридический университет имени О.Е. Кутафина', location: 'Москва, ул. Садовая-Кудринская, д. 9', students: '12 000', rank: 'Топ-1 юридический', type: 'Университет', specialties: ['Право', 'Международные отношения', 'Политология'], shortName: 'МГЮА', website: 'https://msal.ru/', aliases: ['МГЮА', 'Кутафинка', 'юридический университет', 'МГЮ им. Кутафина'] },
    { id: 18, name: 'Финансовый университет при Правительстве Российской Федерации', location: 'Москва, ул. Ленинградский проспект, д. 4', students: '20 000', rank: 'Топ-1 экономический', type: 'Университет', specialties: ['Экономика', 'Финансы', 'Менеджмент', 'IT'], shortName: 'Финансовый университет', website: 'https://fa.ru/', aliases: ['Финансовый университет', 'Финуниверситет', 'Финансовая академия', 'университет финансов'] },
    { id: 19, name: 'Московский университет тонких химических технологий имени М.В. Ломоносова', location: 'Москва, ул. Миусская, д. 26', students: '10 000', rank: 'Топ-1 химический', type: 'Университет', specialties: ['Химия', 'Материаловедение', 'Биотехнология', 'Фармация'], shortName: 'МИТХТ', website: 'https://www.muctr.ru/', aliases: ['МИТХТ', 'Московский институт тонкой химии', 'химический технологический институт', 'институт химических технологий'] },
    { id: 20, name: 'Российский университет дружбы народов', location: 'Москва, ул. Миклухо-Маклая, д. 6', students: '28 000', rank: 'Топ-5 в России', type: 'Университет', specialties: ['Медицина', 'Инженерия', 'Экономика', 'Лингвистика'], shortName: 'РУДН', website: 'https://www.rosunimed.ru/', aliases: ['РУДН', 'Московский институт востоковедения', 'университет дружбы народов', 'востоковедческий университет'] },
    { id: 21, name: 'Всероссийский государственный институт кинематографии имени С.А. Герасимова', location: 'Москва, ул. Вильгельма Пика, д. 3', students: '3 000', rank: 'Топ-1 в кинематографии', type: 'Институт', specialties: ['Кино', 'Телевидение', 'Режиссура'], shortName: 'ВГИК', website: 'https://vgik.info/today/', aliases: ['ВГИК', 'Всероссийский институт кинематографии', 'кинематографический институт', 'институт кинематографии'] },
    { id: 22, name: 'Московский государственный психолого-педагогический университет', location: 'Москва, ул. Миллионная, д. 1', students: '8 000', rank: 'Топ-2 в психологии', type: 'Университет', specialties: ['Психология', 'Педагогика', 'Социология'], shortName: 'МГППУ', website: 'https://mgppu.ru/', aliases: ['МГППУ', 'Московский психолого-педагогический университет', 'психолого-педагогический университет', 'университет психологии'] },
    { id: 23, name: 'Российская экономическая академия имени Г.В. Плеханова', location: 'Москва, ул. Стремянная, д. 36', students: '19 000', rank: 'Топ-3 экономический', type: 'Университет', specialties: ['Экономика', 'Менеджмент', 'Финансы', 'IT'], shortName: 'РЭУ им. Плеханова', website: 'https://www.rea.ru/', aliases: ['РЭУ им. Плеханова', 'Плеханка', 'экономическая академия', 'академия экономики'] },
    { id: 24, name: 'Государственный академический университет гуманитарных наук', location: 'Москва, Мароновский переулок, д. 26', students: '4 000', rank: 'Топ-5 в гуманитарных науках', type: 'Университет', specialties: ['Философия', 'История', 'Литература', 'Психология'], shortName: 'ГАУГН', website: 'https://gaugn.ru/', aliases: ['ГАУГН', 'Государственный академический университет гуманитарных наук', 'гуманитарный университет', 'академический университет'] },
    { id: 25, name: 'Московский Политех', location: 'Москва, ул. Павла Корчагина, д. 2', students: '16 000', rank: 'Топ-5 технический', type: 'Университет', specialties: ['Инженерия', 'IT', 'Машиностроение', 'Робототехника'], shortName: 'Московский Политех', website: 'https://mospolytech.ru/', aliases: ['Московский Политех', 'Московский политехнический университет', 'политех', 'Московский политех'] },
  ];

  const careerFields = [
    { id: 1, name: 'IT и Программирование', description: 'Карьера в сфере информационных технологий, разработки программного обеспечения, анализа данных и кибербезопасности.', icon: '💻', universityIds: [1, 2, 4, 7, 8, 10, 11], directions: ['Программная инженерия', 'Информационные системы', 'Бизнес-информатика', 'Искусственный интеллект'], professions: ['Программист', 'Системный аналитик', 'Data Scientist', 'DevOps-инженер'] },
    { id: 2, name: 'Инженерия', description: 'Технические специальности, включая машиностроение, электронику, строительство и архитектуру.', icon: '⚙️', universityIds: [3, 6, 8, 9, 12, 25], directions: ['Машиностроение', 'Робототехника', 'Электроника', 'Строительство'], professions: ['Инженер-механик', 'Электронщик', 'Конструктор', 'Архитектор'] },
    { id: 3, name: 'Медицина', description: 'Профессии в сфере здравоохранения, включая врачей, медсестер, фармацевтов и биологов.', icon: '🏥', universityIds: [5, 14, 20], directions: ['Лечебное дело', 'Стоматология', 'Фармация', 'Биология'], professions: ['Врач-терапевт', 'Хирург', 'Фармацевт', 'Биолог'] },
    { id: 4, name: 'Бизнес и Экономика', description: 'Финансы, маркетинг, управление, предпринимательство и международные отношения.', icon: '💼', universityIds: [11, 18, 23], directions: ['Экономика', 'Финансы', 'Менеджмент', 'Международные отношения'], professions: ['Экономист', 'Финансист', 'Менеджер', 'Бизнес-аналитик'] },
    { id: 5, name: 'Право и Юриспруденция', description: 'Профессии в сфере права, включая юристов, адвокатов, нотариусов и сотрудников правоохранительных органов.', icon: '⚖️', universityIds: [13, 17], directions: ['Юриспруденция', 'Правоохранительная деятельность', 'Международное право', 'Право и экономика'], professions: ['Юрист', 'Адвокат', 'Нотариус', 'Следователь'] },
    { id: 6, name: 'Педагогика и Психология', description: 'Образование, воспитание, изучение человеческой психики и поведения.', icon: '🎓', universityIds: [15, 22], directions: ['Педагогика', 'Психология', 'Дефектология', 'Логопедия'], professions: ['Учитель', 'Психолог', 'Логопед', 'Дефектолог'] },
  ];

  const universityDirections = [
    { id: 1, university: 'МГУ', direction: 'Программная инженерия', faculty: 'ФВМиК', careerFieldId: 1, relatedProfessions: ['Программист', 'Аналитик', 'Архитектор ПО'] },
    { id: 2, university: 'НИУ ВШЭ', direction: 'Бизнес-информатика', faculty: 'Факультет компьютерных наук', careerFieldId: 4, relatedProfessions: ['Аналитик', 'Продуктовый менеджер', 'IT-консультант'] },
    { id: 3, university: 'МФТИ', direction: 'Прикладная математика', faculty: 'Аэромеханика и летательные аппараты', careerFieldId: 2, relatedProfessions: ['Математик', 'Инженер', 'Аналитик'] },
    { id: 4, university: 'МГТУ им. Баумана', direction: 'Информационные системы', faculty: 'ИУ5', careerFieldId: 1, relatedProfessions: ['Системный аналитик', 'Разработчик ПО'] },
    { id: 5, university: 'НИЯУ МИФИ', direction: 'Компьютерная безопасность', faculty: 'ИИКС', careerFieldId: 1, relatedProfessions: ['Специалист по ИБ', 'Пентестер'] },
    { id: 6, university: 'МГИМО', direction: 'Мировая экономика', faculty: 'Экономический факультет', careerFieldId: 4, relatedProfessions: ['Экономист', 'Аналитик'] },
    { id: 7, university: 'МГПУ', direction: 'Педагогика', faculty: 'Факультет педагогики', careerFieldId: 6, relatedProfessions: ['Учитель', 'Методист', 'Психолог'] },
    { id: 8, university: 'МГЛУ', direction: 'Лингвистика', faculty: 'Филологический факультет', careerFieldId: 6, relatedProfessions: ['Переводчик', 'Преподаватель', 'Лингвист'] },
    { id: 9, university: 'МГЮА', direction: 'Юриспруденция', faculty: 'Правовой факультет', careerFieldId: 5, relatedProfessions: ['Юрист', 'Адвокат', 'Нотариус'] },
    { id: 10, university: 'Финансовый университет', direction: 'Финансы и кредит', faculty: 'Финансовый факультет', careerFieldId: 4, relatedProfessions: ['Финансист', 'Аналитик', 'Бухгалтер'] },
  ];

  const professions = [
    { id: 1, name: 'Программист', description: 'Разработка программного обеспечения для различных платформ.', careerFieldId: 1, requiredSkills: ['JavaScript', 'Python', 'Алгоритмы', 'Git'] },
    { id: 2, name: 'Системный аналитик', description: 'Анализ бизнес-требований и проектирование ИТ-решений.', careerFieldId: 1, requiredSkills: ['Анализ', 'Документирование', 'SQL', 'UML'] },
    { id: 3, name: 'Инженер-механик', description: 'Проектирование и разработка механических систем.', careerFieldId: 2, requiredSkills: ['CAD', 'Материаловедение', 'Термодинамика', 'Проектирование'] },
    { id: 4, name: 'Врач-терапевт', description: 'Первичный осмотр пациентов и диагностика заболеваний.', careerFieldId: 3, requiredSkills: ['Диагностика', 'Анатомия', 'Физиология', 'Клиническая медицина'] },
    { id: 5, name: 'Маркетолог', description: 'Анализ рынка и продвижение товаров и услуг.', careerFieldId: 4, requiredSkills: ['Анализ', 'Копирайтинг', 'SMM', 'Google Analytics'] },
    { id: 6, name: 'Data Scientist', description: 'Анализ больших данных и построение предиктивных моделей.', careerFieldId: 1, requiredSkills: ['Python', 'SQL', 'Машинное обучение', 'Статистика'] },
    { id: 7, name: 'Архитектор', description: 'Проектирование зданий и сооружений.', careerFieldId: 2, requiredSkills: ['CAD', 'Архитектура', 'Проектное дело', 'BIM'] },
    { id: 8, name: 'Финансист', description: 'Анализ финансовых показателей и инвестиционных проектов.', careerFieldId: 4, requiredSkills: ['Excel', 'Финансовый анализ', 'Бухгалтерия', 'МСФО'] },
    { id: 9, name: 'Юрист', description: 'Правовое сопровождение, консультации, составление документов.', careerFieldId: 5, requiredSkills: ['Гражданское право', 'Уголовное право', 'Договорное право', 'Судебная практика'] },
    { id: 10, name: 'Психолог', description: 'Диагностика, консультирование, психотерапия.', careerFieldId: 6, requiredSkills: ['Психодиагностика', 'Психотерапия', 'Консультирование', 'Психология развития'] },
  ];

  const events = [
    { id: 1, title: 'Хакатон "Технологии будущего"', date: '2025-01-15', time: '10:00', location: 'Москва, Технопарк', participants: 150 },
    { id: 2, title: 'Карьерная ярмарка IT', date: '2025-01-20', time: '14:00', location: 'Москва, ВДНХ', participants: 300 },
    { id: 3, title: 'Медицинский форум', date: '2025-01-25', time: '09:00', location: 'Москва, Центральный зал', participants: 200 },
    { id: 4, title: 'Бизнес-лига', date: '2025-02-01', time: '18:00', location: 'Москва, БЦ "Сити"', participants: 120 },
    { id: 5, title: 'Конференция "Право будущего"', date: '2025-02-06', time: '16:00', location: 'МГЮА им. Кутафина, конференц-зал', participants: 125 },
    { id: 6, title: 'Вебинар по юриспруденции', date: '2025-02-02', time: '22:00', location: 'Онлайн', participants: 145 },
    { id: 7, title: 'Мастер-класс по политологии', date: '2025-02-09', time: '19:00', location: 'МГЮА им. Кутафина, политологический факультет', participants: 70 },
    { id: 8, title: 'Хакатон "Право-код"', date: '2025-02-16', time: '15:00', location: 'МГЮА им. Кутафина, главный корпус', participants: 230 },
    { id: 9, title: 'Воркшоп по международному праву', date: '2025-02-20', time: '21:00', location: 'МГЮА им. Кутафина, международный факультет', participants: 85 },
    { id: 10, title: 'Мастер-класс по экономике', date: '2025-01-31', time: '20:30', location: 'Финансовый университет, главный корпус, ауд. 301', participants: 100 },
    { id: 11, title: 'Вебинар по финансам', date: '2025-02-03', time: '22:30', location: 'Онлайн', participants: 150 },
    { id: 12, title: 'Конференция "Финансы будущего"', date: '2025-02-07', time: '16:30', location: 'Финансовый университет, конференц-зал', participants: 130 },
    { id: 13, title: 'Мастер-класс по менеджменту', date: '2025-02-10', time: '19:30', location: 'Финансовый университет, менеджмент факультет', participants: 75 },
    { id: 14, title: 'Хакатон "Фин-код"', date: '2025-02-17', time: '15:30', location: 'Финансовый университет, главный корпус', participants: 235 },
    { id: 15, title: 'Мастер-класс по машиностроению', date: '2025-02-17', time: '23:00', location: 'Московский политех, машиностроительный факультет', participants: 110 },
    { id: 16, title: 'Хакатон "Политех-код"', date: '2025-02-24', time: '19:00', location: 'Московский политех, главный корпус', participants: 270 },
    { id: 17, title: 'Воркшоп по робототехнике', date: '2025-02-28', time: '01:00', location: 'Московский политех, робототехническая лаборатория', participants: 125 },
  ];

  const features = [
    { title: 'Поиск ВУЗов', desc: 'Найдите идеальный университет для вашего будущего', icon: <GraduationCap className="w-8 h-8" /> },
    { title: 'Карьерные направления', desc: 'Определите свою профессиональную нишу', icon: <Briefcase className="w-8 h-8" /> },
    { title: 'Мероприятия', desc: 'Участвуйте в профориентационных событиях', icon: <Calendar className="w-8 h-8" /> },
    { title: 'Интерактивная карта', desc: 'Найдите мероприятия рядом с вами', icon: <MapPin className="w-8 h-8" /> },
  ];

  // Фильтрация вузов
  const filteredUniversities = universities.filter(uni => {
    // Объединяем все возможные названия и сокращения
    const allNames = [uni.name, uni.shortName, ...uni.aliases];
    
    const matchesSearch = searchQuery === '' ||
      allNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      uni.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'Все типы' || uni.type === selectedType;
    const matchesSpecialty = selectedSpecialty === 'Все специальности' || uni.specialties.includes(selectedSpecialty);
    const matchesCity = selectedCity === 'Москва' || uni.location.includes(selectedCity); // Пока только Москва
    const matchesPartnership = !hasPartnership || true; // Пока нет данных о партнерстве

    return matchesSearch && matchesType && matchesSpecialty && matchesCity && matchesPartnership;
  });

  // Функция для сброса фильтров
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('Все типы');
    setSelectedSpecialty('Все специальности');
    setSelectedCity('Москва');
    setHasPartnership(false);
  };

  const handleMapSearchChange = (e) => {
    const value = e.target.value;
    setMapSearchQuery(value);
    setShowMapSearchResults(value.length > 0);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setMapSearchQuery(location.name);
    setShowMapSearchResults(false);
  };

  const goToMap = () => {
    setActiveTab('map');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToUniversities = () => {
    setActiveTab('universities');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToCareer = () => {
    setActiveTab('career');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToEvents = () => {
    setActiveTab('events');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapSearchRef.current && !mapSearchRef.current.contains(event.target)) {
        setShowMapSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContent = () => {
    if (selectedUniversity) {
      return (
        <div className="py-8">
          <button 
            onClick={() => setSelectedUniversity(null)}
            className="flex items-center text-gray-800 mb-8 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Назад к списку ВУЗов
          </button>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center mb-6">
              <Building2 className="w-12 h-12 text-blue-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">{selectedUniversity.name}</h1>
            </div>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p className="text-lg"><strong>Локация:</strong> {selectedUniversity.location}</p>
              <p><strong>Тип:</strong> {selectedUniversity.type}</p>
              <p><strong>Количество студентов:</strong> {selectedUniversity.students}</p>
              <p><strong>Рейтинг:</strong> {selectedUniversity.rank}</p>
            </div>
            
            <div className="bg-gray-50/50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Специальности</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUniversity.specialties.map((spec, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setActiveTab('map');
                  setSelectedLocation({
                    name: selectedUniversity.name,
                    address: selectedUniversity.location,
                    lat: 55.7038, // Пример координат для МГУ
                    lng: 37.5326
                  });
                  setSelectedUniversity(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
              >
                Показать на карте
              </button>
              <a 
                href={selectedUniversity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
              >
                Посетить сайт
              </a>
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerField) {
      const relatedUniversities = universities.filter(uni => 
        selectedCareerField.universityIds.includes(uni.id)
      );
      const relatedDirections = universityDirections.filter(dir => 
        dir.careerFieldId === selectedCareerField.id
      );
      const relatedProfessions = professions.filter(prof => 
        prof.careerFieldId === selectedCareerField.id
      );

      return (
        <div className="py-8">
          <button 
            onClick={() => setSelectedCareerField(null)}
            className="flex items-center text-gray-800 mb-8 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Назад к карьерным направлениям
          </button>
          
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">{selectedCareerField.name}</h1>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">{selectedCareerField.description}</p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Подходящие ВУЗы</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedUniversities.length > 0 ? (
                relatedUniversities.map(uni => (
                  <div 
                    key={uni.id}
                    onClick={() => {
                      setActiveTab('universities');
                      setSelectedUniversity(uni);
                      setSelectedCareerField(null);
                      window.scrollTo(0, 0);
                    }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <div className="flex items-center mb-3">
                      <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-800">{uni.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{uni.location}</p>
                    <p className="text-gray-500 text-xs">{uni.rank}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">ВУЗы не найдены для этой сферы.</p>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Направления обучения</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedDirections.length > 0 ? (
                relatedDirections.map(dir => (
                  <div 
                    key={dir.id}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <div className="flex items-start">
                      <Building2 className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-blue-600">{dir.university}</h3>
                        <h4 className="text-lg font-semibold mb-1 text-gray-800">{dir.direction}</h4>
                        <p className="text-gray-600 text-sm">{dir.faculty}</p>
                        {dir.relatedProfessions && dir.relatedProfessions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {dir.relatedProfessions.slice(0, 2).map((prof, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {prof}
                              </span>
                            ))}
                            {dir.relatedProfessions.length > 2 && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                +{dir.relatedProfessions.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">Направления не найдены для этой сферы.</p>
              )}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Популярные профессии</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProfessions.length > 0 ? (
                relatedProfessions.map(prof => (
                  <div 
                    key={prof.id}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <div className="flex items-start mb-3">
                      <Briefcase className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <h3 className="text-xl font-bold text-gray-800">{prof.name}</h3>
                    </div>
                    <p className="text-gray-600">{prof.description}</p>
                    {prof.requiredSkills && prof.requiredSkills.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Нужные навыки:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {prof.requiredSkills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                          {prof.requiredSkills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                              +{prof.requiredSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">Профессии не найдены для этой сферы.</p>
              )}
            </div>
          </section>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-16">
            <section className="text-center py-16">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  ПрофНавигатор
                </h1>
                <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                  Найди свой путь в IT, инженерии, медицине...
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16">
                  <div className="relative">
                    <button
                      onClick={goToMap}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-white"
                    >
                      <Search className="w-5 h-5 inline mr-2" />
                      Найти мероприятия рядом
                    </button>
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      50+
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={goToUniversities}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-white"
                    >
                      <GraduationCap className="w-5 h-5 inline mr-2" />
                      Изучить ВУЗы
                    </button>
                    <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      25+
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Как начать использовать платформу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  onClick={goToMap}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Search className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">Найти мероприятия</h3>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      50+ мероприятий
                    </div>
                  </div>
                  <p className="text-gray-600">Открой для себя интересные события в твоем городе</p>
                </div>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  onClick={goToEvents}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">Запланировать участие</h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      5000+ участников
                    </div>
                  </div>
                  <p className="text-gray-600">Добавляй события в свой календарь</p>
                </div>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  onClick={goToUniversities}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">Изучить ВУЗы</h3>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      25+ ВУЗов-партнеров
                    </div>
                  </div>
                  <p className="text-gray-600">Найди подходящие учебные заведения</p>
                </div>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  onClick={goToCareer}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">Построить карьеру</h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      6+ направлений
                    </div>
                  </div>
                  <p className="text-gray-600">Определи своё профессиональное будущее</p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Наши преимущества</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-md">
                    <div className="text-blue-600 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center py-16">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">🚀 Начни строить свою карьеру сегодня!</h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={goToMap}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 text-white"
                >
                  ▶ Найти мероприятия рядом
                </button>
              </div>
            </section>
          </div>
        );

      case 'map':
        return (
          <div className="py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🗺️ Карта профориентационных мероприятий Москвы</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Найдите интересующие вас события на интерактивной карте</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                    <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    <div className="relative" ref={mapSearchRef}>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Найдите интересующие события..."
                          className="w-full bg-gray-100/50 border border-gray-300 rounded-2xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={mapSearchQuery}
                          onChange={handleMapSearchChange}
                        />
                        {showMapSearchResults && (
                          <div className="absolute z-10 w-full bg-white/90 backdrop-blur-lg border border-gray-300 rounded-xl shadow-2xl mt-2 max-h-60 overflow-y-auto">
                            <div className="px-4 py-3 text-gray-800">Результаты поиска по карте</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Категория</label>
                      <div
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 cursor-pointer relative"
                        onClick={() => setShowMapCategoryDropdown(!showMapCategoryDropdown)}
                      >
                        <div className="flex justify-between items-center">
                          <span>Все категории</span>
                          <svg className={`w-4 h-4 transition-transform ${showMapCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {showMapCategoryDropdown && (
                        <div className="absolute z-20 w-full bg-white/90 backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg mt-1">
                          {['Все категории', 'IT', 'Инженерия', 'Медицина', 'Бизнес'].map((category, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 text-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white cursor-pointer transition-all duration-200 border-b border-gray-200 last:border-b-0"
                              onClick={() => {
                                setShowMapCategoryDropdown(false);
                              }}
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Дата начала</label>
                      <input
                        type="date"
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min="2025-01-01"
                        max="2026-12-31"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Дата окончания</label>
                      <input
                        type="date"
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || "2025-01-01"}
                        max="2026-12-31"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setMapSearchQuery('');
                        setSelectedLocation(null);
                        setStartDate('');
                        setEndDate('');
                      }}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-300"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden h-[500px] relative shadow-md">
                  <iframe
                    src={selectedLocation 
                      ? `https://yandex.ru/map-widget/v1/?ll=${selectedLocation.lng}%2C${selectedLocation.lat}&z=16&l=map` 
                      : "https://yandex.ru/map-widget/v1/?um=constructor%3A1b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f&source=constructor"}
                    width="100%"
                    height="100%"
                    className="border-0"
                    frameBorder="0"
                    style={{ minHeight: '500px' }}
                    title="Карта профориентационных мероприятий"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="py-8">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">📅 Мероприятия</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Присоединяйтесь к профориентационным событиям</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {events.map(event => (
                <div key={event.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 shadow-md">
                  <div className="flex items-start mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
                      <div className="space-y-2 text-gray-600 mb-4">
                        <p><strong>Дата:</strong> {new Date(event.date).toLocaleDateString('ru-RU')}</p>
                        <p><strong>Время:</strong> {event.time}</p>
                        <p><strong>Место:</strong> {event.location}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <Users2 className="w-4 h-4 mr-2" />
                          {event.participants} участников
                        </div>
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300">
                          Участвовать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'universities':
        return (
          <div className="py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-gray-800">🎓 ВУЗы и Колледжи</h1>
              <p className="text-xl text-gray-600">Найдите подходящее учебное заведение для вашего будущего</p>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Найдите интересующие ВУЗы..."
                  className="w-full bg-white/50 border border-gray-300 rounded-2xl pl-12 pr-4 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md">
                  <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
                    <Filter className="w-5 h-5 mr-2 text-blue-600" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    {/* Custom Type Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Тип</label>
                      <div 
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 cursor-pointer relative"
                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                      >
                        {selectedType}
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showTypeDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      {showTypeDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 border border-blue-500 rounded-lg shadow-lg max-h-44 overflow-y-auto">
                          {['Все типы', 'Университет', 'Институт', 'Политех', 'Академия', 'Колледж'].map((type) => (
                            <div
                              key={type}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
                              onClick={() => {
                                setSelectedType(type);
                                setShowTypeDropdown(false);
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Custom Specialty Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-700">Специальности</label>
                      <div 
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 cursor-pointer relative"
                        onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
                      >
                        {selectedSpecialty}
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showSpecialtyDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      {showSpecialtyDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 border border-blue-500 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все специальности', 'IT', 'Инженерия', 'Медицина', 'Экономика', 'Право', 'Физика', 'Химия', 'Материаловедение', 'Фармация', 'Психология', 'Лингвистика', 'Педагогика', 'Международные отношения', 'Архитектура', 'Дизайн', 'Машиностроение', 'Энергетика', 'Нефть и газ', 'Биотехнология'].map((specialty) => (
                            <div
                              key={specialty}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
                              onClick={() => {
                                setSelectedSpecialty(specialty);
                                setShowSpecialtyDropdown(false);
                              }}
                            >
                              {specialty}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">Город</label>
                      <select 
                        className="w-full bg-gray-100/50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled
                      >
                        <option>Москва</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="partnership" 
                        className="mr-2" 
                        checked={hasPartnership}
                        onChange={(e) => setHasPartnership(e.target.checked)}
                      />
                      <label htmlFor="partnership" className="text-sm text-gray-700">Партнерские программы</label>
                    </div>
                    <button 
                      onClick={resetFilters}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-white"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="space-y-6">
                  {filteredUniversities.length > 0 ? (
                    filteredUniversities.map((uni) => (
                      <div 
                        key={uni.id}
                        onClick={() => setSelectedUniversity(uni)}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                              <h3 className="text-2xl font-bold text-gray-800">{uni.name}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">Московское учебное заведение</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Globe2 className="w-4 h-4 mr-2" />
                                {uni.location}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users2 className="w-4 h-4 mr-2" />
                                {uni.students} студентов
                              </div>
                              <div className="flex items-center text-blue-600 font-semibold">
                                <Award className="w-4 h-4 mr-2" />
                                {uni.rank}
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {uni.specialties.slice(0, 3).map((spec, idx) => (
                                <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {spec}
                                </span>
                              ))}
                              {uni.specialties.length > 3 && (
                                <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                  +{uni.specialties.length - 3} еще
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-600 mb-2">ВУЗы не найдены</h3>
                      <p className="text-gray-600">Попробуйте изменить параметры фильтрации</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'career':
        return (
          <div className="py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-gray-800">💼 Карьерные возможности</h1>
              <p className="text-xl text-gray-600">Исследуйте различные карьерные направления и выберите свой путь</p>
            </div>
            {/* Описание вкладки */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 mb-12 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Добро пожаловать в раздел карьерных возможностей!</h2>
              <p className="text-gray-600 mb-4">
                Здесь вы найдете всю необходимую информацию для построения успешной карьеры. Мы поможем вам:
              </p>
              <ul className="text-gray-600 list-disc list-inside space-y-2">
                <li>Определить свое профессиональное призвание</li>
                <li>Выбрать подходящие направления обучения</li>
                <li>Изучить перспективные сферы деятельности</li>
                <li>Найти подходящие вузы и специальности</li>
                <li>Познакомиться с различными профессиями</li>
              </ul>
            </div>
            {/* Карьерные сферы */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Карьерные сферы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerFields.map((field) => (
                  <div 
                    key={field.id}
                    onClick={() => setSelectedCareerField(field)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer group shadow-md"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{field.icon}</span>
                      <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors text-gray-800">{field.name}</h3>
                    </div>
                    <p className="text-gray-600">{field.description}</p>
                  </div>
                ))}
              </div>
            </section>
            {/* Направления в вузах */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Популярные направления в вузах</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {universityDirections.map((direction) => {
                  // Находим соответствующую сферу для направления
                  const relatedField = careerFields.find(field => field.id === direction.careerFieldId);
                  return (
                    <div
                      key={direction.id}
                      onClick={() => {
                        if (relatedField) {
                          // Устанавливаем выбранную сферу (это вызовет отображение детализированной информации)
                          setSelectedCareerField(relatedField);
                          // Прокручиваем наверх
                          window.scrollTo(0, 0);
                        } else {
                          console.warn(`Не найдена сферa для направления ID: ${direction.id}`);
                        }
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md" // Добавлен cursor-pointer
                    >
                      <div className="flex items-start">
                        <Building2 className="w-8 h-8 text-blue-600 mr-4 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-blue-600">{direction.university}</h3>
                          <h4 className="text-lg font-semibold mb-1 text-gray-800">{direction.direction}</h4>
                          <p className="text-gray-600 text-sm">{direction.faculty}</p>
                          {direction.relatedProfessions && direction.relatedProfessions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {direction.relatedProfessions.slice(0, 2).map((prof, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {prof}
                                </span>
                              ))}
                              {direction.relatedProfessions.length > 2 && (
                                <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                  +{direction.relatedProfessions.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
            {/* Профессии */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Популярные профессии</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professions.map((profession) => {
                  // Находим соответствующую сферу для профессии
                  const relatedField = careerFields.find(field => field.id === profession.careerFieldId);
                  return (
                    <div
                      key={profession.id}
                      onClick={() => {
                        if (relatedField) {
                          // Устанавливаем выбранную сферу (это вызовет отображение детализированной информации)
                          setSelectedCareerField(relatedField);
                          // Прокручиваем наверх
                          window.scrollTo(0, 0);
                        } else {
                          console.warn(`Не найдена сферa для профессии ID: ${profession.id}`);
                        }
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md" // Добавлен cursor-pointer
                    >
                      <div className="flex items-start mb-3">
                        <Briefcase className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                        <h3 className="text-xl font-bold text-gray-800">{profession.name}</h3>
                      </div>
                      <p className="text-gray-600">{profession.description}</p>
                      {profession.requiredSkills && profession.requiredSkills.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">Нужные навыки:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profession.requiredSkills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                            {profession.requiredSkills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                +{profession.requiredSkills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
            {/* CTA */}
            <section className="text-center py-16">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">🚀 Начни строить свою карьеру сегодня!</h2>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={goToMap}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 text-white"
                >
                  ▶ Найти мероприятия рядом
                </button>
              </div>
            </section>
          </div>
        );

      case 'blog':
        return (
          <div className="py-20 text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 max-w-4xl mx-auto shadow-md">
              <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6 text-gray-800">📰 Блог и полезные материалы</h1>
              <div className="text-2xl font-semibold text-blue-600 mb-4">Раздел в разработке</div>
              <p className="text-gray-600 mb-8">Статьи, советы и интервью с профессионалами для помощи в выборе карьерного пути</p>
              <div className="bg-gray-100/50 rounded-xl p-6">
                <p className="text-gray-600">Полезные материалы для профориентации и карьерного планирования</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800'
    }`}>
      
      {showSettings && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setShowSettings(false)}></div>
          <div className={`absolute right-4 top-20 w-64 ${
            currentTheme === 'dark' 
              ? 'bg-gray-800/90 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/90 backdrop-blur-lg border border-gray-300'
          } rounded-xl shadow-xl z-40`}>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-3 ${
                currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>Тема</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentTheme('light')}
                  className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-300 ${
                    currentTheme === 'light' 
                      ? 'bg-blue-600 text-white' 
                      : currentTheme === 'dark' 
                        ? 'text-gray-300 hover:bg-purple-600/20' 
                        : 'text-gray-600 hover:bg-blue-100'
                  }`}
                >
                  <Sun className="w-4 h-4 inline mr-2" />
                  Светлая тема
                </button>
                <button
                  onClick={() => setCurrentTheme('dark')}
                  className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-all duration-300 ${
                    currentTheme === 'dark' 
                      ? 'bg-purple-600 text-white' 
                      : currentTheme === 'light' 
                        ? 'text-gray-600 hover:bg-blue-100' 
                        : 'text-gray-300 hover:bg-purple-600/20'
                  }`}
                >
                  <Moon className="w-4 h-4 inline mr-2" />
                  Темная тема
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <header className={currentTheme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 via-purple-900 to-black border-b border-gray-700' 
        : 'bg-gradient-to-r from-gray-50 via-white to-gray-100 border-b border-gray-200'}>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                ПрофНавигатор
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Главная', icon: Star },
                { id: 'map', label: 'Карта', icon: MapPin },
                { id: 'events', label: 'Мероприятия', icon: Calendar },
                { id: 'universities', label: 'Вузы и Колледжи', icon: GraduationCap },
                { id: 'career', label: 'Карьера', icon: Briefcase },
                { id: 'blog', label: 'Блог', icon: BookOpen }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSelectedUniversity(null);
                      setSelectedCareerField(null);
                      window.scrollTo(0, 0);
                    }}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.id || 
                      (selectedUniversity && item.id === 'universities') || 
                      (selectedCareerField && item.id === 'career')
                        ? currentTheme === 'dark' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-blue-600 text-white'
                        : currentTheme === 'dark' 
                          ? 'text-gray-300 hover:text-white hover:bg-purple-600/20' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-blue-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowRegister(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Регистрация
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-white"
              >
                Вход
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentTheme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className={currentTheme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900 via-purple-900 to-black border-t border-gray-700 py-12 mt-auto' 
        : 'bg-gradient-to-r from-gray-50 via-white to-gray-100 border-t border-gray-200 py-12 mt-auto'}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  ПрофНавигатор
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Платформа для профориентации и выбора карьерного пути
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Контакты</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  info@profnavigator.ru
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  +7 (495) 123-45-67
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  Москва, ул. Тверская, д. 1
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Ресурсы</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Блог</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">FAQ</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">Документация</a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">API</a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Правовая информация</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Политика конфиденциальности
                </a>
                <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Условия использования
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">©</span>
                  </div>
                  <span className="text-gray-600">2025 ПрофНавигатор. Все права защищены.</span>
                </div>
              </div>
              
              <div className="flex space-x-6 text-gray-600">
                <a href="#" className="hover:text-blue-600 transition-colors">Контакты</a>
                <a href="#" className="hover:text-blue-600 transition-colors">О нас</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Карта сайта</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setShowLogin(false)}
              className={`absolute top-4 right-4 ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Вход в аккаунт
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  📧 Email
                </label>
                <input
                  type="email"
                  placeholder="Введите ваш email"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  🔒 Пароль
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none`}
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Запомнить меня
                </label>
              </div>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-3 rounded-lg font-semibold text-white transition-all duration-300">
                Войти
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                  VK
                </button>
              </div>
              <div className={`text-center text-sm my-4 space-y-2 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>
                  <a href="#" className="text-blue-600 hover:text-blue-500">Забыли пароль?</a>
                </p>
                <p>
                  Нет аккаунта?{' '}
                  <a
                    href="#"
                    onClick={() => {
                      setShowLogin(false);
                      setShowRegister(true);
                    }}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Зарегистрироваться
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <button
              onClick={() => setShowRegister(false)}
              className={`absolute top-4 right-4 ${currentTheme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <UserPlus className="w-6 h-6 mr-2 text-green-600" />
              Создать аккаунт
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  👤 Имя
                </label>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  📧 Email
                </label>
                <input
                  type="email"
                  placeholder="Введите ваш email"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  🔒 Пароль
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  🔒 Подтвердите пароль
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${currentTheme === 'dark' 
                    ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'} rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className={`text-sm ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Согласен с условиями использования
                </label>
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 rounded-lg font-semibold text-white transition-all duration-300">
                Зарегистрироваться
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                  VK
                </button>
              </div>
              <div className={`text-center text-sm my-4 space-y-2 ${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>
                  Уже есть аккаунт?{' '}
                  <a
                    href="#"
                    onClick={() => {
                      setShowRegister(false);
                      setShowLogin(true);
                    }}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Войти
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default App;
