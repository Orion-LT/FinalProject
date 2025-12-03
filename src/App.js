import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Calendar, GraduationCap, Briefcase, BookOpen, User, Menu, X, ChevronRight, Star, Target, Zap, Bell, Users, BarChart3, Filter, Globe, Mail, Lock, UserPlus, Building2, Award, Users2, Globe2, AwardIcon, ArrowLeft, Settings, X as CloseIcon } from 'lucide-react';
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedCareerField, setSelectedCareerField] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('galaxy'); // 'galaxy' или 'light-steel'
  // Состояния для фильтров
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Все типы');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Все специальности');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [hasPartnership, setHasPartnership] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);
  const [showMapTypeDropdown, setShowMapTypeDropdown] = useState(false);
  const [showMapCategoryDropdown, setShowMapCategoryDropdown] = useState(false);
  const [showMapTypeDropdownMap, setShowMapTypeDropdownMap] = useState(false);
  const [showMapCategoryDropdownMap, setShowMapCategoryDropdownMap] = useState(false);
  // Состояния для дат на карте
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Состояния для поиска по карте
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [mapSearchResults, setMapSearchResults] = useState([]);
  const [showMapSearchResults, setShowMapSearchResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapSearchRef = useRef(null);
  const stats = [
    { value: '50+', label: 'Мероприятий' },
    { value: '25+', label: 'ВУЗов-партнеров' },
    { value: '100+', label: 'Направлений' },
    { value: '5000+', label: 'Участников' }
  ];
  const directions = [
    { icon: '💻', title: 'IT', subtitle: 'Python, JS' },
    { icon: '⚙️', title: 'Инженерия', subtitle: 'Роботы, CAD' },
    { icon: '🏥', title: 'Медицина', subtitle: 'Биохимия' },
    { icon: '📈', title: 'Бизнес', subtitle: 'Аналитика' }
  ];
  const features = [
    { icon: <Zap className="w-6 h-6" />, title: 'Экономия времени', desc: 'Все в одном месте' },
    { icon: <Target className="w-6 h-6" />, title: 'Умные фильтры', desc: 'Точный поиск' },
    { icon: <Bell className="w-6 h-6" />, title: 'Напоминания', desc: 'Не пропусти ничего' },
    { icon: <Globe className="w-6 h-6" />, title: 'Геолокация', desc: 'Рядом с тобой' },
    { icon: <Users className="w-6 h-6" />, title: 'Сообщество', desc: 'Общение с другими' },
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Аналитика', desc: 'Статистика и тренды' }
  ];
  
    // Функции для переключения вкладок
  const goToMap = () => {
    setActiveTab('map');
    // Сбрасываем, если нужно уйти с детализированного вида
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    // window.scrollTo(0, 0); // Теперь в useEffect
  };
  const goToCareer = () => {
    setActiveTab('career');
    // Сбрасываем, если нужно уйти с детализированного вида
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    // window.scrollTo(0, 0); // Теперь в useEffect
  };
  const goToUniversities = () => {
    setActiveTab('universities');
    // Сбрасываем, если нужно уйти с детализированного вида
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    // window.scrollTo(0, 0); // Теперь в useEffect
  };
  const goToEvents = () => {
    setActiveTab('events');
    // Сбрасываем, если нужно уйти с детализированного вида
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    // window.scrollTo(0, 0); // Теперь в useEffect
  };
  const goToBlog = () => {
    setActiveTab('blog');
    // Сбрасываем, если нужно уйти с детализированного вида
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    // window.scrollTo(0, 0); // Теперь в useEffect
  };

  // Функции для навигации к конкретным сущностям
  const navigateToUniversity = (universityId) => {
    // Предполагаем, что здесь нужно перейти на вкладку 'universities' и выбрать университет
    // Но возможно, у вас есть отдельная "страница" для университета, тогда activeTab может остаться 'universities'
    // или может быть введен новый тип состояния. Пока оставим как есть, но активная вкладка - universities.
    setActiveTab('universities'); // Переключаемся на вкладку вузов
    setSelectedUniversity(universityId); // Выбираем конкретный вуз
    // setSelectedCareerField(null); // Сбрасываем карьеру, если перешли к вузу
    // window.scrollTo(0, 0); // Теперь в useEffect
  };

  const navigateToCareerField = (careerFieldId) => {
    // Переключаемся на вкладку карьеры и устанавливаем выбранную сферу
    setActiveTab('career');
    setSelectedCareerField(careerFieldId);
    // setSelectedUniversity(null); // Сбрасываем вуз, если перешли к карьере
    // window.scrollTo(0, 0); // Теперь в useEffect
  };

  const navigateToUniversitiesByDirection = (directionName) => {
    // Переключаемся на вкладку вузов, устанавливаем поисковый запрос (фильтр по направлению),
    // сбрасываем выбор конкретного вуза.
    setActiveTab('universities');
    setSearchQuery(directionName); // Устанавливаем фильтр по направлению
    setSelectedUniversity(null); // Сбрасываем выбор конкретного вуза
    setSelectedCareerField(null); // Сбрасываем карьеру
    // window.scrollTo(0, 0); // Теперь в useEffect
  };

  const navigateToCareerByDirection = (careerFieldId) => {
    // Переключаемся на вкладку карьеры и устанавливаем выбранную сферу
    setActiveTab('career');
    setSelectedCareerField(careerFieldId);
    setSelectedUniversity(null); // Сбрасываем вуз
    // window.scrollTo(0, 0); // Теперь в useEffect
  };
  const universities = [
    { id: 1, name: 'Московский государственный университет им. М.В. Ломоносова', location: 'Москва, Ленинские горы, д. 1', students: '40 000', rank: 'Топ-1 в России', type: 'Университет', specialties: ['IT', 'Инженерия', 'Медицина', 'Экономика', 'Право'], shortName: 'МГУ' },
    { id: 2, name: 'Московский физико-технический институт', location: 'Москва, Институтский пер., д. 9', students: '7 000', rank: 'Топ-1 в науке', type: 'Институт', specialties: ['IT', 'Инженерия', 'Физика'], shortName: 'МФТИ' },
    { id: 3, name: 'Национальный исследовательский ядерный университет "МИФИ"', location: 'Москва, Каширское ш., д. 31', students: '12 000', rank: 'Топ-5 в инженерии', type: 'Институт', specialties: ['Инженерия', 'Физика', 'Химия'], shortName: 'НИЯУ МИФИ' },
    { id: 4, name: 'Университет науки и технологий МИСИС', location: 'Москва, Ленинский пр., д. 65', students: '10 000', rank: 'Топ-3 в инженерии', type: 'Университет', specialties: ['Инженерия', 'Материаловедение', 'Металлургия'], shortName: 'МИСИС' },
    { id: 5, name: 'Российский национальный исследовательский медицинский университет им. Н.И. Пирогова', location: 'Москва, ул. Островитянова, д. 1', students: '15 000', rank: 'Топ-1 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Стоматология'], shortName: 'РНИМУ им. Пирогова' },
    { id: 6, name: 'Московский авиационный институт', location: 'Москва, Волоколамское ш., д. 4', students: '14 000', rank: 'Топ-2 в авиации', type: 'Институт', specialties: ['Инженерия', 'Авиация', 'Космос'], shortName: 'МАИ' },
    { id: 7, name: 'Национальный исследовательский университет «Московский институт электронной техники»', location: 'Москва, Зеленоград, площадь Шокина, д. 1', students: '11 000', rank: 'Топ-3 в электронике', type: 'Университет', specialties: ['IT', 'Инженерия', 'Электроника'], shortName: 'НИУ МЭИ' },
    { id: 8, name: 'Московский государственный технический университет им. Н.Э. Баумана', location: 'Москва, 2-я Бауманская ул., д. 5', students: '18 000', rank: 'Топ-2 в технике', type: 'Университет', specialties: ['Инженерия', 'Механика', 'Робототехника'], shortName: 'МГТУ им. Баумана' },
    { id: 9, name: 'Российский государственный университет нефти и газа (национальный исследовательский университет) им. И.М. Губкина', location: 'Москва, Ленинский пр., д. 65', students: '12 000', rank: 'Топ-1 в нефти и газе', type: 'Университет', specialties: ['Инженерия', 'Нефть', 'Газ'], shortName: 'РГУНГ им. Губкина' },
    { id: 10, name: 'Национальный исследовательский университет "МЭИ"', location: 'Москва, ул. Красноказарменная, д. 14', students: '11 000', rank: 'Топ-4 в энергетике', type: 'Университет', specialties: ['Энергетика', 'Инженерия', 'IT'], shortName: 'НИУ МЭИ' },
    { id: 11, name: 'Национальный исследовательский университет "Высшая школа экономики"', location: 'Москва, ул. Мясницкая, д. 20', students: '28 000', rank: 'Топ-5 в России', type: 'Университет', specialties: ['Экономика', 'Право', 'Социология'], shortName: 'НИУ ВШЭ' },
    { id: 12, name: 'Национальный исследовательский Московский государственный строительный университет', location: 'Москва, Ярославское ш., д. 26', students: '10 000', rank: 'Топ-3 в строительстве', type: 'Университет', specialties: ['Инженерия', 'Строительство', 'Архитектура'], shortName: 'НИУ МГСУ' },
    { id: 13, name: 'Московский государственный институт международных отношений Министерства иностранных дел РФ', location: 'Москва, ул. Пречистенка, д. 29', students: '9 000', rank: 'Топ-1 в международных отношениях', type: 'Институт', specialties: ['Международные отношения', 'Политология', 'Лингвистика'], shortName: 'МГИМО' },
    { id: 14, name: 'Первый Московский государственный медицинский университет им. И.М. Сеченова', location: 'Москва, ул. Трубецкая, д. 8, стр. 2', students: '14 000', rank: 'Топ-1 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Стоматология'], shortName: 'Первый МГМУ им. Сеченова' },
    { id: 15, name: 'Московский городской педагогический университет', location: 'Москва, 2-й Сельскохозяйственный проезд, д. 4', students: '13 000', rank: 'Топ-3 в педагогике', type: 'Университет', specialties: ['Педагогика', 'Психология', 'Образование'], shortName: 'МГППУ' },
    { id: 16, name: 'Московский государственный лингвистический университет', location: 'Москва, ул. Остоженка, д. 38', students: '8 000', rank: 'Топ-1 в лингвистике', type: 'Университет', specialties: ['Лингвистика', 'Перевод', 'Филология'], shortName: 'МГЛУ' },
    { id: 17, name: 'Московский государственный юридический университет им. О.Е. Кутафина', location: 'Москва, ул. Садовая-Кудринская, д. 9', students: '12 000', rank: 'Топ-2 в юриспруденции', type: 'Университет', specialties: ['Право', 'Юриспруденция', 'Политология'], shortName: 'МГЮА им. Кутафина' },
    { id: 18, name: 'Финансовый университет при Правительстве Российской Федерации', location: 'Москва, ул. Ленинградский пр., д. 49', students: '14 000', rank: 'Топ-3 в экономике', type: 'Университет', specialties: ['Экономика', 'Финансы', 'Менеджмент'], shortName: 'Финансовый университет' },
    { id: 19, name: 'Российский химико-технологический университет им. Д.И. Менделеева', location: 'Москва, ул. Мира, д. 26', students: '6 000', rank: 'Топ-2 в химии', type: 'Университет', specialties: ['Химия', 'Технологии', 'Материаловедение'], shortName: 'РХТУ им. Менделеева' },
    { id: 20, name: 'Российский университет медицины', location: 'Москва, ул. Делегатская, д. 20, стр. 1', students: '5 000', rank: 'Топ-3 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Терапия'], shortName: 'РУМ' },
    { id: 21, name: 'Всероссийский государственный университет кинематографии им. С.А. Герасимова', location: 'Москва, ул. Вильгельма Пика, д. 3', students: '3 000', rank: 'Топ-1 в кинематографии', type: 'Университет', specialties: ['Кино', 'Телевидение', 'Режиссура'], shortName: 'ВГУК им. Герасимова' },
    { id: 22, name: 'Московский государственный психолого-педагогический университет', location: 'Москва, ул. Сретенка, д. 29', students: '7 000', rank: 'Топ-2 в психологии', type: 'Университет', specialties: ['Психология', 'Педагогика', 'Образование'], shortName: 'МГППУ' },
    { id: 23, name: 'Российский экономический университет им. Г.В. Плеханова', location: 'Москва, ул. Стремянный пер., д. 36', students: '13 000', rank: 'Топ-4 в экономике', type: 'Университет', specialties: ['Экономика', 'Финансы', 'Менеджмент'], shortName: 'РЭУ им. Плеханова' },
    { id: 24, name: 'Государственный академический университет гуманитарных наук', location: 'Москва, Мароновский переулок, д. 26', students: '4 000', rank: 'Топ-5 в гуманитарных науках', type: 'Университет', specialties: ['Философия', 'История', 'Литература'], shortName: 'ГАУГН' },
    { id: 25, name: 'Московский политехнический университет', location: 'Москва, ул. Большая Семёновская, д. 38', students: '15 000', rank: 'Топ-6 в технике', type: 'Университет', specialties: ['Инженерия', 'IT', 'Машиностроение'], shortName: 'Московский политех' }
  ];
  // Карьерные сферы
  const careerFields = [
  { id: 1, name: 'IT и технологии', description: 'Разработка программного обеспечения, анализ данных, кибербезопасность', icon: '💻', universityIds: [1, 2, 5], professionIds: [1, 2, 3] }, // Пример ID
  { id: 2, name: 'Инженерия', description: 'Машиностроение, робототехника, строительство', icon: '⚙️', universityIds: [1, 3, 4], professionIds: [4, 5, 6] },
  { id: 3, name: 'Медицина', description: 'Терапия, хирургия, фармация', icon: '🏥', universityIds: [4, 6], professionIds: [7, 8, 9] },
  { id: 4, name: 'Экономика и бизнес', description: 'Финансы, маркетинг, менеджмент', icon: '📈', universityIds: [2, 7], professionIds: [10, 11, 12] },
  { id: 5, name: 'Право', description: 'Юриспруденция, международное право', icon: '⚖️', universityIds: [8], professionIds: [13, 14] },
  { id: 6, name: 'Наука', description: 'Физика, химия, биология', icon: '🔬', universityIds: [1, 4, 6], professionIds: [15, 16] }
  ];
  // Направления в вузах
  const universityDirections = [
  { id: 1, university: 'МГУ', direction: 'Программная инженерия', faculty: 'ФИВТ', careerFieldId: 1, relatedProfessions: ['Программист', 'Архитектор ПО'] },
  { id: 2, university: 'НИУ ВШЭ', direction: 'Бизнес-информатика', faculty: 'Факультет компьютерных наук', careerFieldId: 1, relatedProfessions: ['Аналитик данных', 'IT-консультант'] },
  { id: 3, university: 'МФТИ', direction: 'Прикладная математика', faculty: 'ФИВТ', careerFieldId: 1, relatedProfessions: ['Аналитик данных', 'Исследователь ИИ'] },
  { id: 4, university: 'МГТУ им. Баумана', direction: 'Информационные системы', faculty: 'ИУ5', careerFieldId: 1, relatedProfessions: ['Системный аналитик', 'Разработчик ПО'] },
  { id: 5, university: 'НИЯУ МИФИ', direction: 'Компьютерная безопасность', faculty: 'ИИКС', careerFieldId: 1, relatedProfessions: ['Специалист по ИБ', 'Пентестер'] },
  { id: 6, university: 'МГИМО', direction: 'Мировая экономика', faculty: 'Экономический факультет', careerFieldId: 4, relatedProfessions: ['Экономист', 'Аналитик'] }
  ];
  // Профессии
  const professions = [
  { id: 1, name: 'Программист', description: 'Разработка и поддержка программного обеспечения', careerFieldId: 1, requiredSkills: ['Python', 'JavaScript', 'Алгоритмы'], relatedDirections: ['Программная инженерия', 'Прикладная математика'] },
  { id: 2, name: 'Системный аналитик', description: 'Анализ бизнес-требований и проектирование ИТ-решений', careerFieldId: 1, requiredSkills: ['UML', 'SQL', 'Анализ требований'], relatedDirections: ['Бизнес-информатика', 'Информационные системы'] },
  { id: 3, name: 'Data Scientist', description: 'Анализ и интерпретация сложных наборов данных', careerFieldId: 1, requiredSkills: ['Python', 'R', 'Статистика'], relatedDirections: ['Бизнес-информатика', 'Прикладная математика'] },
  { id: 4, name: 'Инженер-механик', description: 'Проектирование и анализ механических систем', careerFieldId: 2, requiredSkills: ['CAD', 'Материаловедение', 'Термодинамика'], relatedDirections: ['Машиностроение'] },
  { id: 5, name: 'Робототехник', description: 'Разработка и программирование роботов', careerFieldId: 2, requiredSkills: ['C++', 'ROS', 'Электроника'], relatedDirections: ['Робототехника', 'Мехатроника'] },
  { id: 6, name: 'Строитель', description: 'Организация и выполнение строительных работ', careerFieldId: 2, requiredSkills: ['Проектное дело', 'Строительные материалы', 'Сметы'], relatedDirections: ['Промышленное и гражданское строительство'] },
  { id: 7, name: 'Врач-терапевт', description: 'Первичный осмотр и диагностика пациентов', careerFieldId: 3, requiredSkills: ['Анатомия', 'Физиология', 'Диагностика'], relatedDirections: ['Лечебное дело'] },
  { id: 8, name: 'Хирург', description: 'Выполнение хирургических операций', careerFieldId: 3, requiredSkills: ['Анатомия', 'Хирургия', 'Первая помощь'], relatedDirections: ['Лечебное дело'] },
  { id: 9, name: 'Фармацевт', description: 'Консультации по лекарственным препаратам', careerFieldId: 3, requiredSkills: ['Фармакология', 'Химия', 'Токсикология'], relatedDirections: ['Фармация'] },
  { id: 10, name: 'Финансист', description: 'Управление финансами компании или клиента', careerFieldId: 4, requiredSkills: ['Финансовый анализ', 'Excel', 'Бухгалтерия'], relatedDirections: ['Финансы и кредит'] },
  { id: 11, name: 'Маркетолог', description: 'Продвижение товаров и услуг', careerFieldId: 4, requiredSkills: ['Анализ рынка', 'Контент-маркетинг', 'SMM'], relatedDirections: ['Маркетинг'] },
  { id: 12, name: 'Менеджер проектов', description: 'Планирование и реализация проектов', careerFieldId: 4, requiredSkills: ['Управление проектами', 'Коммуникации', 'Scrum'], relatedDirections: ['Управление проектами'] },
  { id: 13, name: 'Юрист', description: 'Правовая защита интересов клиентов', careerFieldId: 5, requiredSkills: ['Гражданское право', 'Уголовное право', 'Процессуальные нормы'], relatedDirections: ['Юриспруденция'] },
  { id: 14, name: 'Нотариус', description: 'Совершение нотариальных действий', careerFieldId: 5, requiredSkills: ['Нотариат', 'Право собственности', 'Наследственное право'], relatedDirections: ['Юриспруденция'] },
  { id: 15, name: 'Физик', description: 'Исследование физических явлений и законов природы', careerFieldId: 6, requiredSkills: ['Математика', 'Классическая механика', 'Квантовая физика'], relatedDirections: ['Физика'] },
  { id: 16, name: 'Химик', description: 'Исследование свойств веществ и химических процессов', careerFieldId: 6, requiredSkills: ['Органическая химия', 'Аналитическая химия', 'Физическая химия'], relatedDirections: ['Химия'] }
  ];
  // Ближайшие мероприятия для МГУ
  const mguEvents = [
    { id: 1, title: 'Мастер-класс по Python', date: '2025-01-15', time: '14:00', location: 'Главный корпус МГУ, ауд. 301', participants: '50' },
    { id: 2, title: 'Вебинар по Data Science', date: '2025-01-18', time: '16:00', location: 'Онлайн', participants: '100' },
    { id: 3, title: 'Конференция "IT в образовании"', date: '2025-01-22', time: '10:00', location: 'МГУ, конференц-зал', participants: '75' },
    { id: 4, title: 'Мастер-класс по Android-разработке', date: '2025-01-25', time: '13:00', location: 'Факультет ВМиК, ауд. 205', participants: '30' },
    { id: 5, title: 'Хакатон "Код будущего"', date: '2025-02-01', time: '09:00', location: 'МГУ, главный корпус', participants: '200' },
    { id: 6, title: 'Воркшоп по машинному обучению', date: '2025-02-05', time: '15:00', location: 'МГУ, лаборатория ИИ', participants: '40' }
  ];
  // Ближайшие мероприятия для МФТИ
  const mftiEvents = [
    { id: 1, title: 'Мастер-класс по физике', date: '2025-01-16', time: '15:00', location: 'МФТИ, главный корпус, ауд. 101', participants: '45' },
    { id: 2, title: 'Вебинар по квантовым технологиям', date: '2025-01-19', time: '17:00', location: 'Онлайн', participants: '90' },
    { id: 3, title: 'Конференция "Наука будущего"', date: '2025-01-23', time: '11:00', location: 'МФТИ, конференц-зал', participants: '65' },
    { id: 4, title: 'Мастер-класс по робототехнике', date: '2025-01-26', time: '14:00', location: 'МФТИ, лаборатория робототехники', participants: '25' },
    { id: 5, title: 'Хакатон "Квантовый код"', date: '2025-02-02', time: '10:00', location: 'МФТИ, главный корпус', participants: '180' },
    { id: 6, title: 'Воркшоп по теоретической физике', date: '2025-02-06', time: '16:00', location: 'МФТИ, лаборатория физики', participants: '35' }
  ];
  // Ближайшие мероприятия для МИФИ
  const mifiEvents = [
    { id: 1, title: 'Мастер-класс по ядерной физике', date: '2025-01-17', time: '14:30', location: 'НИЯУ МИФИ, главный корпус, ауд. 201', participants: '40' },
    { id: 2, title: 'Вебинар по радиационной безопасности', date: '2025-01-20', time: '16:30', location: 'Онлайн', participants: '85' },
    { id: 3, title: 'Конференция "Ядерные технологии"', date: '2025-01-24', time: '10:30', location: 'НИЯУ МИФИ, конференц-зал', participants: '70' },
    { id: 4, title: 'Мастер-класс по радиохимии', date: '2025-01-27', time: '13:30', location: 'НИЯУ МИФИ, химическая лаборатория', participants: '20' },
    { id: 5, title: 'Хакатон "Ядерный инноватор"', date: '2025-02-03', time: '09:30', location: 'НИЯУ МИФИ, главный корпус', participants: '150' },
    { id: 6, title: 'Воркшоп по физике элементарных частиц', date: '2025-02-07', time: '15:30', location: 'НИЯУ МИФИ, лаборатория физики', participants: '30' }
  ];
  // Ближайшие мероприятия для МИСИС
  const misisEvents = [
    { id: 1, title: 'Мастер-класс по материаловедению', date: '2025-01-18', time: '15:30', location: 'МИСИС, главный корпус, ауд. 301', participants: '50' },
    { id: 2, title: 'Вебинар по нанотехнологиям', date: '2025-01-21', time: '17:30', location: 'Онлайн', participants: '110' },
    { id: 3, title: 'Конференция "Материалы будущего"', date: '2025-01-25', time: '11:30', location: 'МИСИС, конференц-зал', participants: '80' },
    { id: 4, title: 'Мастер-класс по металлургии', date: '2025-01-28', time: '14:30', location: 'МИСИС, металлургическая лаборатория', participants: '25' },
    { id: 5, title: 'Хакатон "Материал-хак"', date: '2025-02-04', time: '10:30', location: 'МИСИС, главный корпус', participants: '170' },
    { id: 6, title: 'Воркшоп по наноматериалам', date: '2025-02-08', time: '16:30', location: 'МИСИС, лаборатория нанотехнологий', participants: '35' }
  ];
  // Ближайшие мероприятия для РНИМУ им. Пирогова
  const rnimuEvents = [
    { id: 1, title: 'Мастер-класс по биохимии', date: '2025-01-19', time: '14:00', location: 'РНИМУ им. Пирогова, главный корпус, ауд. 201', participants: '45' },
    { id: 2, title: 'Вебинар по фармацевтике', date: '2025-01-22', time: '16:00', location: 'Онлайн', participants: '95' },
    { id: 3, title: 'Конференция "Медицина будущего"', date: '2025-01-26', time: '10:00', location: 'РНИМУ им. Пирогова, конференц-зал', participants: '75' },
    { id: 4, title: 'Мастер-класс по стоматологии', date: '2025-01-29', time: '13:00', location: 'РНИМУ им. Пирогова, стоматологическая клиника', participants: '30' },
    { id: 5, title: 'Хакатон "Мед-инноватор"', date: '2025-02-05', time: '09:00', location: 'РНИМУ им. Пирогова, главный корпус', participants: '160' },
    { id: 6, title: 'Воркшоп по биомедицине', date: '2025-02-09', time: '15:00', location: 'РНИМУ им. Пирогова, лаборатория биомедицины', participants: '35' }
  ];
  // Ближайшие мероприятия для МАИ
  const maiEvents = [
    { id: 1, title: 'Мастер-класс по авиастроению', date: '2025-01-20', time: '15:00', location: 'МАИ, главный корпус, ауд. 101', participants: '40' },
    { id: 2, title: 'Вебинар по космическим технологиям', date: '2025-01-23', time: '17:00', location: 'Онлайн', participants: '80' },
    { id: 3, title: 'Конференция "Авиация будущего"', date: '2025-01-27', time: '11:00', location: 'МАИ, конференц-зал', participants: '70' },
    { id: 4, title: 'Мастер-класс по ракетным системам', date: '2025-01-30', time: '14:00', location: 'МАИ, лаборатория ракетных систем', participants: '25' },
    { id: 5, title: 'Хакатон "Авиа-код"', date: '2025-02-06', time: '10:00', location: 'МАИ, главный корпус', participants: '140' },
    { id: 6, title: 'Воркшоп по аэродинамике', date: '2025-02-10', time: '16:00', location: 'МАИ, лаборатория аэродинамики', participants: '30' }
  ];
  // Ближайшие мероприятия для НИУ МЭИ
  const meiEvents = [
    { id: 1, title: 'Мастер-класс по электронике', date: '2025-01-21', time: '15:30', location: 'НИУ МЭИ, главный корпус, ауд. 201', participants: '50' },
    { id: 2, title: 'Вебинар по IT-технологиям', date: '2025-01-24', time: '17:30', location: 'Онлайн', participants: '100' },
    { id: 3, title: 'Конференция "Электроника будущего"', date: '2025-01-28', time: '11:30', location: 'НИУ МЭИ, конференц-зал', participants: '80' },
    { id: 4, title: 'Мастер-класс по программированию', date: '2025-01-31', time: '14:30', location: 'НИУ МЭИ, лаборатория программирования', participants: '35' },
    { id: 5, title: 'Хакатон "Электронный код"', date: '2025-02-07', time: '10:30', location: 'НИУ МЭИ, главный корпус', participants: '180' },
    { id: 6, title: 'Воркшоп по встроенным системам', date: '2025-02-11', time: '16:30', location: 'НИУ МЭИ, лаборатория встроенных систем', participants: '40' }
  ];
  // Ближайшие мероприятия для МГТУ им. Баумана
  const baumanEvents = [
    { id: 1, title: 'Мастер-класс по робототехнике', date: '2025-01-22', time: '16:00', location: 'МГТУ им. Баумана, главный корпус, ауд. 201', participants: '55' },
    { id: 2, title: 'Вебинар по механике', date: '2025-01-25', time: '18:00', location: 'Онлайн', participants: '105' },
    { id: 3, title: 'Конференция "Техника будущего"', date: '2025-01-29', time: '12:00', location: 'МГТУ им. Баумана, конференц-зал', participants: '85' },
    { id: 4, title: 'Мастер-класс по 3D-моделированию', date: '2025-02-01', time: '15:00', location: 'МГТУ им. Баумана, лаборатория CAD', participants: '30' },
    { id: 5, title: 'Хакатон "Тех-инноватор"', date: '2025-02-08', time: '11:00', location: 'МГТУ им. Баумана, главный корпус', participants: '190' },
    { id: 6, title: 'Воркшоп по мехатронике', date: '2025-02-12', time: '17:00', location: 'МГТУ им. Баумана, лаборатория мехатроники', participants: '45' }
  ];
  // Ближайшие мероприятия для РГУНГ им. Губкина
  const gubkinEvents = [
    { id: 1, title: 'Мастер-класс по нефтехимии', date: '2025-01-23', time: '16:30', location: 'РГУНГ им. Губкина, главный корпус, ауд. 201', participants: '60' },
    { id: 2, title: 'Вебинар по газовой технологии', date: '2025-01-26', time: '18:30', location: 'Онлайн', participants: '110' },
    { id: 3, title: 'Конференция "Энергетика будущего"', date: '2025-01-30', time: '12:30', location: 'РГУНГ им. Губкина, конференц-зал', participants: '90' },
    { id: 4, title: 'Мастер-класс по добыче нефти', date: '2025-02-02', time: '15:30', location: 'РГУНГ им. Губкина, лаборатория добычи', participants: '35' },
    { id: 5, title: 'Хакатон "Энерго-код"', date: '2025-02-09', time: '11:30', location: 'РГУНГ им. Губкина, главный корпус', participants: '195' },
    { id: 6, title: 'Воркшоп по энергетике', date: '2025-02-13', time: '17:30', location: 'РГУНГ им. Губкина, лаборатория энергетики', participants: '50' }
  ];
  // Ближайшие мероприятия для НИУ ВШЭ
  const hseEvents = [
    { id: 1, title: 'Мастер-класс по экономике', date: '2025-01-24', time: '17:00', location: 'НИУ ВШЭ, главный корпус, ауд. 301', participants: '65' },
    { id: 2, title: 'Вебинар по бизнес-информатике', date: '2025-01-27', time: '19:00', location: 'Онлайн', participants: '115' },
    { id: 3, title: 'Конференция "Экономика будущего"', date: '2025-01-31', time: '13:00', location: 'НИУ ВШЭ, конференц-зал', participants: '95' },
    { id: 4, title: 'Мастер-класс по праву', date: '2025-02-03', time: '16:00', location: 'НИУ ВШЭ, юридический факультет', participants: '40' },
    { id: 5, title: 'Хакатон "Эконом-код"', date: '2025-02-10', time: '12:00', location: 'НИУ ВШЭ, главный корпус', participants: '200' },
    { id: 6, title: 'Воркшоп по социологии', date: '2025-02-14', time: '18:00', location: 'НИУ ВШЭ, лаборатория социологии', participants: '55' }
  ];
  // Ближайшие мероприятия для НИУ МГСУ
  const mgsuEvents = [
    { id: 1, title: 'Мастер-класс по архитектуре', date: '2025-01-25', time: '17:30', location: 'НИУ МГСУ, главный корпус, ауд. 301', participants: '70' },
    { id: 2, title: 'Вебинар по строительным технологиям', date: '2025-01-28', time: '19:30', location: 'Онлайн', participants: '120' },
    { id: 3, title: 'Конференция "Строительство будущего"', date: '2025-02-01', time: '13:30', location: 'НИУ МГСУ, конференц-зал', participants: '100' },
    { id: 4, title: 'Мастер-класс по CAD-проектированию', date: '2025-02-04', time: '16:30', location: 'НИУ МГСУ, лаборатория CAD', participants: '45' },
    { id: 5, title: 'Хакатон "Строй-код"', date: '2025-02-11', time: '12:30', location: 'НИУ МГСУ, главный корпус', participants: '205' },
    { id: 6, title: 'Воркшоп по инженерии', date: '2025-02-15', time: '18:30', location: 'НИУ МГСУ, лаборатория инженерии', participants: '60' }
  ];
  // Ближайшие мероприятия для МГИМО
  const mgimoEvents = [
    { id: 1, title: 'Мастер-класс по международным отношениям', date: '2025-01-26', time: '18:00', location: 'МГИМО, главный корпус, ауд. 301', participants: '75' },
    { id: 2, title: 'Вебинар по политологии', date: '2025-01-29', time: '20:00', location: 'Онлайн', participants: '125' },
    { id: 3, title: 'Конференция "Дипломатия будущего"', date: '2025-02-02', time: '14:00', location: 'МГИМО, конференц-зал', participants: '105' },
    { id: 4, title: 'Мастер-класс по лингвистике', date: '2025-02-05', time: '17:00', location: 'МГИМО, лингвистический факультет', participants: '50' },
    { id: 5, title: 'Хакатон "Дипломат-код"', date: '2025-02-12', time: '13:00', location: 'МГИМО, главный корпус', participants: '210' },
    { id: 6, title: 'Воркшоп по международному праву', date: '2025-02-16', time: '19:00', location: 'МГИМО, юридический факультет', participants: '65' }
  ];
  // Ближайшие мероприятия для Первого МГМУ им. Сеченова
  const sechenovEvents = [
    { id: 1, title: 'Мастер-класс по фармации', date: '2025-01-27', time: '18:30', location: 'Первый МГМУ им. Сеченова, главный корпус, ауд. 301', participants: '80' },
    { id: 2, title: 'Вебинар по стоматологии', date: '2025-01-30', time: '20:30', location: 'Онлайн', participants: '130' },
    { id: 3, title: 'Конференция "Медицина будущего"', date: '2025-02-03', time: '14:30', location: 'Первый МГМУ им. Сеченова, конференц-зал', participants: '110' },
    { id: 4, title: 'Мастер-класс по терапии', date: '2025-02-06', time: '17:30', location: 'Первый МГМУ им. Сеченова, терапевтический факультет', participants: '55' },
    { id: 5, title: 'Хакатон "Мед-код"', date: '2025-02-13', time: '13:30', location: 'Первый МГМУ им. Сеченова, главный корпус', participants: '215' },
    { id: 6, title: 'Воркшоп по биохимии', date: '2025-02-17', time: '19:30', location: 'Первый МГМУ им. Сеченова, лаборатория биохимии', participants: '70' }
  ];
  // Ближайшие мероприятия для МГППУ
  const mgppuEvents = [
    { id: 1, title: 'Мастер-класс по педагогике', date: '2025-01-28', time: '19:00', location: 'МГППУ, главный корпус, ауд. 301', participants: '85' },
    { id: 2, title: 'Вебинар по психологии', date: '2025-01-31', time: '21:00', location: 'Онлайн', participants: '135' },
    { id: 3, title: 'Конференция "Образование будущего"', date: '2025-02-04', time: '15:00', location: 'МГППУ, конференц-зал', participants: '115' },
    { id: 4, title: 'Мастер-класс по образованию', date: '2025-02-07', time: '18:00', location: 'МГППУ, педагогический факультет', participants: '60' },
    { id: 5, title: 'Хакатон "Образ-код"', date: '2025-02-14', time: '14:00', location: 'МГППУ, главный корпус', participants: '220' },
    { id: 6, title: 'Воркшоп по детской психологии', date: '2025-02-18', time: '20:00', location: 'МГППУ, лаборатория психологии', participants: '75' }
  ];
  // Ближайшие мероприятия для МГЛУ
  const mgluEvents = [
    { id: 1, title: 'Мастер-класс по лингвистике', date: '2025-01-29', time: '19:30', location: 'МГЛУ, главный корпус, ауд. 301', participants: '90' },
    { id: 2, title: 'Вебинар по переводу', date: '2025-02-01', time: '21:30', location: 'Онлайн', participants: '140' },
    { id: 3, title: 'Конференция "Языки будущего"', date: '2025-02-05', time: '15:30', location: 'МГЛУ, конференц-зал', participants: '120' },
    { id: 4, title: 'Мастер-класс по филологии', date: '2025-02-08', time: '18:30', location: 'МГЛУ, филологический факультет', participants: '65' },
    { id: 5, title: 'Хакатон "Лингво-код"', date: '2025-02-15', time: '14:30', location: 'МГЛУ, главный корпус', participants: '225' },
    { id: 6, title: 'Воркшоп по межкультурной коммуникации', date: '2025-02-19', time: '20:30', location: 'МГЛУ, лаборатория коммуникации', participants: '80' }
  ];
  // Ближайшие мероприятия для МГЮА им. Кутафина
  const mguaEvents = [
    { id: 1, title: 'Мастер-класс по праву', date: '2025-01-30', time: '20:00', location: 'МГЮА им. Кутафина, главный корпус, ауд. 301', participants: '95' },
    { id: 2, title: 'Вебинар по юриспруденции', date: '2025-02-02', time: '22:00', location: 'Онлайн', participants: '145' },
    { id: 3, title: 'Конференция "Право будущего"', date: '2025-02-06', time: '16:00', location: 'МГЮА им. Кутафина, конференц-зал', participants: '125' },
    { id: 4, title: 'Мастер-класс по политологии', date: '2025-02-09', time: '19:00', location: 'МГЮА им. Кутафина, политологический факультет', participants: '70' },
    { id: 5, title: 'Хакатон "Право-код"', date: '2025-02-16', time: '15:00', location: 'МГЮА им. Кутафина, главный корпус', participants: '230' },
    { id: 6, title: 'Воркшоп по международному праву', date: '2025-02-20', time: '21:00', location: 'МГЮА им. Кутафина, международный факультет', participants: '85' }
  ];
  // Ближайшие мероприятия для Финансового университета
  const finunivEvents = [
    { id: 1, title: 'Мастер-класс по экономике', date: '2025-01-31', time: '20:30', location: 'Финансовый университет, главный корпус, ауд. 301', participants: '100' },
    { id: 2, title: 'Вебинар по финансам', date: '2025-02-03', time: '22:30', location: 'Онлайн', participants: '150' },
    { id: 3, title: 'Конференция "Финансы будущего"', date: '2025-02-07', time: '16:30', location: 'Финансовый университет, конференц-зал', participants: '130' },
    { id: 4, title: 'Мастер-класс по менеджменту', date: '2025-02-10', time: '19:30', location: 'Финансовый университет, менеджмент факультет', participants: '75' },
    { id: 5, title: 'Хакатон "Фин-код"', date: '2025-02-17', time: '15:30', location: 'Финансовый университет, главный корпус', participants: '235' },
    { id: 6, title: 'Воркшоп по инвестициям', date: '2025-02-21', time: '21:30', location: 'Финансовый университет, инвестиционная лаборатория', participants: '90' }
  ];
  // Ближайшие мероприятия для РХТУ им. Менделеева
  const rhtuEvents = [
    { id: 1, title: 'Мастер-класс по химии', date: '2025-02-01', time: '21:00', location: 'РХТУ им. Менделеева, главный корпус, ауд. 301', participants: '105' },
    { id: 2, title: 'Вебинар по технологиям', date: '2025-02-04', time: '23:00', location: 'Онлайн', participants: '155' },
    { id: 3, title: 'Конференция "Химия будущего"', date: '2025-02-08', time: '17:00', location: 'РХТУ им. Менделеева, конференц-зал', participants: '135' },
    { id: 4, title: 'Мастер-класс по материаловедению', date: '2025-02-11', time: '20:00', location: 'РХТУ им. Менделеева, материаловедческий факультет', participants: '80' },
    { id: 5, title: 'Хакатон "Хим-код"', date: '2025-02-18', time: '16:00', location: 'РХТУ им. Менделеева, главный корпус', participants: '240' },
    { id: 6, title: 'Воркшоп по биотехнологии', date: '2025-02-22', time: '22:00', location: 'РХТУ им. Менделеева, биотехнологическая лаборатория', participants: '95' }
  ];
  // Ближайшие мероприятия для РУМ
  const rumEvents = [
    { id: 1, title: 'Мастер-класс по медицине', date: '2025-02-02', time: '21:30', location: 'РУМ, главный корпус, ауд. 301', participants: '110' },
    { id: 2, title: 'Вебинар по фармации', date: '2025-02-05', time: '23:30', location: 'Онлайн', participants: '160' },
    { id: 3, title: 'Конференция "Медицина будущего"', date: '2025-02-09', time: '17:30', location: 'РУМ, конференц-зал', participants: '140' },
    { id: 4, title: 'Мастер-класс по терапии', date: '2025-02-12', time: '20:30', location: 'РУМ, терапевтический факультет', participants: '85' },
    { id: 5, title: 'Хакатон "Мед-код"', date: '2025-02-19', time: '16:30', location: 'РУМ, главный корпус', participants: '245' },
    { id: 6, title: 'Воркшоп по биомедицине', date: '2025-02-23', time: '22:30', location: 'РУМ, биомедицинская лаборатория', participants: '100' }
  ];
  // Ближайшие мероприятия для ВГУК им. Герасимова
  const vgukevents = [
    { id: 1, title: 'Мастер-класс по кино', date: '2025-02-03', time: '22:00', location: 'ВГУК им. Герасимова, главный корпус, ауд. 301', participants: '115' },
    { id: 2, title: 'Вебинар по телевидению', date: '2025-02-06', time: '00:00', location: 'Онлайн', participants: '165' },
    { id: 3, title: 'Конференция "Кино будущего"', date: '2025-02-10', time: '18:00', location: 'ВГУК им. Герасимова, конференц-зал', participants: '145' },
    { id: 4, title: 'Мастер-класс по режиссуре', date: '2025-02-13', time: '21:00', location: 'ВГУК им. Герасимова, режиссерский факультет', participants: '90' },
    { id: 5, title: 'Хакатон "Кино-код"', date: '2025-02-20', time: '17:00', location: 'ВГУК им. Герасимова, главный корпус', participants: '250' },
    { id: 6, title: 'Воркшоп по сценаристике', date: '2025-02-24', time: '23:00', location: 'ВГУК им. Герасимова, сценарная лаборатория', participants: '105' }
  ];
  // Ближайшие мероприятия для МГППУ (психология)
  const mgppupsyEvents = [
    { id: 1, title: 'Мастер-класс по психологии', date: '2025-02-04', time: '22:30', location: 'МГППУ, главный корпус, ауд. 301', participants: '120' },
    { id: 2, title: 'Вебинар по педагогике', date: '2025-02-07', time: '00:30', location: 'Онлайн', participants: '170' },
    { id: 3, title: 'Конференция "Психология будущего"', date: '2025-02-11', time: '18:30', location: 'МГППУ, конференц-зал', participants: '150' },
    { id: 4, title: 'Мастер-класс по образованию', date: '2025-02-14', time: '21:30', location: 'МГППУ, педагогический факультет', participants: '95' },
    { id: 5, title: 'Хакатон "Психо-код"', date: '2025-02-21', time: '17:30', location: 'МГППУ, главный корпус', participants: '255' },
    { id: 6, title: 'Воркшоп по клинической психологии', date: '2025-02-25', time: '23:30', location: 'МГППУ, клиническая лаборатория', participants: '110' }
  ];
  // Ближайшие мероприятия для РЭУ им. Плеханова
  const reuevents = [
    { id: 1, title: 'Мастер-класс по экономике', date: '2025-02-05', time: '23:00', location: 'РЭУ им. Плеханова, главный корпус, ауд. 301', participants: '125' },
    { id: 2, title: 'Вебинар по финансам', date: '2025-02-08', time: '01:00', location: 'Онлайн', participants: '175' },
    { id: 3, title: 'Конференция "Экономика будущего"', date: '2025-02-12', time: '19:00', location: 'РЭУ им. Плеханова, конференц-зал', participants: '155' },
    { id: 4, title: 'Мастер-класс по менеджменту', date: '2025-02-15', time: '22:00', location: 'РЭУ им. Плеханова, менеджмент факультет', participants: '100' },
    { id: 5, title: 'Хакатон "Эконом-код"', date: '2025-02-22', time: '18:00', location: 'РЭУ им. Плеханова, главный корпус', participants: '260' },
    { id: 6, title: 'Воркшоп по бизнес-аналитике', date: '2025-02-26', time: '00:00', location: 'РЭУ им. Плеханова, аналитическая лаборатория', participants: '115' }
  ];
  // Ближайшие мероприятия для ГАУГН
  const gauhnevents = [
    { id: 1, title: 'Мастер-класс по философии', date: '2025-02-06', time: '23:30', location: 'ГАУГН, главный корпус, ауд. 301', participants: '130' },
    { id: 2, title: 'Вебинар по истории', date: '2025-02-09', time: '01:30', location: 'Онлайн', participants: '180' },
    { id: 3, title: 'Конференция "Гуманитарные науки будущего"', date: '2025-02-13', time: '19:30', location: 'ГАУГН, конференц-зал', participants: '160' },
    { id: 4, title: 'Мастер-класс по литературе', date: '2025-02-16', time: '22:30', location: 'ГАУГН, литературный факультет', participants: '105' },
    { id: 5, title: 'Хакатон "Гуманитарий-код"', date: '2025-02-23', time: '18:30', location: 'ГАУГН, главный корпус', participants: '265' },
    { id: 6, title: 'Воркшоп по культурологии', date: '2025-02-27', time: '00:30', location: 'ГАУГН, культурологическая лаборатория', participants: '120' }
  ];
  // Ближайшие мероприятия для Московского политеха
  const moscpolyevents = [
    { id: 1, title: 'Мастер-класс по инженерии', date: '2025-02-07', time: '00:00', location: 'Московский политех, главный корпус, ауд. 301', participants: '135' },
    { id: 2, title: 'Вебинар по IT', date: '2025-02-10', time: '02:00', location: 'Онлайн', participants: '185' },
    { id: 3, title: 'Конференция "Технологии будущего"', date: '2025-02-14', time: '20:00', location: 'Московский политех, конференц-зал', participants: '165' },
    { id: 4, title: 'Мастер-класс по машиностроению', date: '2025-02-17', time: '23:00', location: 'Московский политех, машиностроительный факультет', participants: '110' },
    { id: 5, title: 'Хакатон "Политех-код"', date: '2025-02-24', time: '19:00', location: 'Московский политех, главный корпус', participants: '270' },
    { id: 6, title: 'Воркшоп по робототехнике', date: '2025-02-28', time: '01:00', location: 'Московский политех, робототехническая лаборатория', participants: '125' }
  ];
  // Фильтрация вузов
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = searchQuery === '' || 
                          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          uni.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'Все типы' || uni.type === selectedType;
    const matchesSpecialty = selectedSpecialty === 'Все специальности' || uni.specialties.includes(selectedSpecialty);
    const matchesCity = selectedCity === 'Все города' || uni.location.includes(selectedCity);
    return matchesSearch && matchesType && matchesSpecialty && matchesCity;
  });
  // Функция для сброса фильтров
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('Все типы');
    setSelectedSpecialty('Все специальности');
    setSelectedCity('Москва');
    setHasPartnership(false);
  };
  // Функция для смены темы
  const changeTheme = (theme) => {
    setCurrentTheme(theme);
    setShowSettings(false);
  };
  // Функция для поиска по карте
  const searchMap = async (query) => {
    if (query.length < 2) {
      setMapSearchResults([]);
      setShowMapSearchResults(false);
      return;
    }
    // Моковые данные для демонстрации
    const mockResults = [
      { id: 1, name: 'Кремль', address: 'Москва, Красная площадь, 1', lat: 55.75222, lng: 37.61556 },
      { id: 2, name: 'МГУ', address: 'Москва, Ленинские горы, 1', lat: 55.70289, lng: 37.53119 },
      { id: 3, name: 'ВДНХ', address: 'Москва, проспект Мира, 154', lat: 55.82857, lng: 37.64253 },
      { id: 4, name: 'ГУМ', address: 'Москва, Красная площадь, 3', lat: 55.75667, lng: 37.61819 },
      { id: 5, name: 'Парк Победы', address: 'Москва, Поклонная гора, 3', lat: 55.73417, lng: 37.54556 },
      { id: 6, name: 'Москва-Сити', address: 'Москва, Пресненская набережная, 2', lat: 55.74833, lng: 37.53667 },
      { id: 7, name: 'Храм Христа Спасителя', address: 'Москва, Волхонка, 15', lat: 55.74472, lng: 37.59639 },
      { id: 8, name: 'ЦУМ', address: 'Москва, Петровка, 2', lat: 55.75889, lng: 37.61917 }
    ];
    const filtered = mockResults.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.address.toLowerCase().includes(query.toLowerCase())
    );
    setMapSearchResults(filtered);
    setShowMapSearchResults(true);
  };
  // Обработчик ввода в поисковое поле карты
  const handleMapSearchChange = (e) => {
    const value = e.target.value;
    setMapSearchQuery(value);
    searchMap(value);
  };
  // Обработчик выбора результата поиска
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setMapSearchQuery(location.name);
    setShowMapSearchResults(false);
  };
    // Эффект для прокрутки наверх при изменении ключевых состояний
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedUniversity, selectedCareerField]);
  // Обработчик клика вне поискового поля
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapSearchRef.current && !mapSearchRef.current.contains(event.target)) {
        setShowMapSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const renderContent = () => {
    if (selectedUniversity) {
      return (
        <div className="py-8">
          <button 
            onClick={() => {
              setSelectedUniversity(null);
              window.scrollTo(0, 0);
            }}
            className="flex items-center text-white mb-8 bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад к списку вузов
          </button>
          {/* Section 1: University Info */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <div className="flex items-center mb-6">
                    <Building2 className="w-12 h-12 text-purple-400 mr-4" />
                    <h1 className="text-4xl font-bold">{selectedUniversity.name}</h1>
                  </div>
                  <div className="space-y-4 text-gray-300 mb-8">
                    <p className="text-lg"><strong>Локация:</strong> {selectedUniversity.location}</p>
                    <p><strong>Тип:</strong> {selectedUniversity.type}</p>
                    <p><strong>Студентов:</strong> {selectedUniversity.students}</p>
                    <p><strong>Рейтинг:</strong> {selectedUniversity.rank}</p>
                  </div>
                  {/* О вузе */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">О вузе</h2>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedUniversity.id === 1
                        ? "Московский государственный университет им. М.В. Ломоносова — старейший университет России, один из ведущих вузов страны. Основан в 1755 году. Входит в топ-100 лучших университетов мира по международным рейтингам."
                        : selectedUniversity.id === 2
                        ? "Московский физико-технический институт (государственный университет) — один из ведущих технических вузов России. Известен как «Физтех» — подготовка высококлассных специалистов в области физики, математики и информационных технологий."
                        : selectedUniversity.id === 3
                        ? "Национальный исследовательский ядерный университет «МИФИ» — ведущий вуз в области ядерных и радиационных технологий, физики, инженерии. Подготовка специалистов для атомной отрасли и смежных направлений."
                        : selectedUniversity.id === 4
                        ? "Университет науки и технологий «МИСИС» — ведущий вуз в области инженерных наук, материаловедения и металлургии. Известен своими достижениями в нанотехнологиях и разработке новых материалов."
                        : selectedUniversity.id === 5
                        ? "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова — один из ведущих медицинских вузов России, специализирующийся на подготовке врачей, фармацевтов и специалистов в области биомедицинских наук."
                        : selectedUniversity.id === 6
                        ? "Московский авиационный институт — ведущий вуз в области авиации и космонавтики, подготовка специалистов для авиационной и ракетно-космической промышленности."
                        : selectedUniversity.id === 7
                        ? "Национальный исследовательский университет «Московский институт электронной техники» — ведущий вуз в области электроники, информационных технологий и радиотехники, подготовка специалистов для высокотехнологичных отраслей."
                        : selectedUniversity.id === 8
                        ? "Московский государственный технический университет им. Н.Э. Баумана — один из старейших технических вузов России, специализирующийся на подготовке инженеров и специалистов в области машиностроения, робототехники и мехатроники."
                        : selectedUniversity.id === 9
                        ? "Российский государственный университет нефти и газа (национальный исследовательский университет) им. И.М. Губкина — ведущий вуз в области нефтегазового дела, подготовка специалистов для топливно-энергетического комплекса."
                        : selectedUniversity.id === 10
                        ? "Национальный исследовательский университет «МЭИ» — ведущий вуз в области энергетики, электротехники и информационных технологий, подготовка специалистов для энергетической отрасли."
                        : selectedUniversity.id === 11
                        ? "Национальный исследовательский университет «Высшая школа экономики» — один из ведущих экономических вузов России, специализирующийся на экономике, социологии, праве и международных отношениях."
                        : selectedUniversity.id === 12
                        ? "Национальный исследовательский Московский государственный строительный университет — ведущий вуз в области строительства, архитектуры и инженерии, подготовка специалистов для строительной отрасли."
                        : selectedUniversity.id === 13
                        ? "Московский государственный институт международных отношений Министерства иностранных дел РФ — ведущий вуз в области международных отношений, политологии и лингвистики, подготовка дипломатов и специалистов в сфере международной деятельности."
                        : selectedUniversity.id === 14
                        ? "Первый Московский государственный медицинский университет им. И.М. Сеченова — один из старейших медицинских вузов России, специализирующийся на подготовке врачей, фармацевтов и стоматологов."
                        : selectedUniversity.id === 15
                        ? "Московский городской педагогический университет — ведущий вуз в области педагогики и психологии, подготовка учителей и специалистов в сфере образования."
                        : selectedUniversity.id === 16
                        ? "Московский государственный лингвистический университет — ведущий вуз в области лингвистики, подготовка переводчиков, лингвистов и специалистов в сфере международной коммуникации."
                        : selectedUniversity.id === 17
                        ? "Московский государственный юридический университет им. О.Е. Кутафина — один из ведущих юридических вузов России, подготовка юристов, правоведов и специалистов в сфере права."
                        : selectedUniversity.id === 18
                        ? "Финансовый университет при Правительстве Российской Федерации — ведущий вуз в области экономики, финансов и менеджмента, подготовка специалистов для финансово-экономической сферы."
                        : selectedUniversity.id === 19
                        ? "Российский химико-технологический университет им. Д.И. Менделеева — ведущий вуз в области химии, технологии и материаловедения, подготовка специалистов для химической промышленности."
                        : selectedUniversity.id === 20
                        ? "Российский университет медицины — ведущий медицинский вуз, специализирующийся на подготовке врачей, фармацевтов и терапевтов."
                        : selectedUniversity.id === 21
                        ? "Всероссийский государственный университет кинематографии им. С.А. Герасимова — ведущий вуз в области кинематографии, телевидения и режиссуры, подготовка специалистов для киноиндустрии."
                        : selectedUniversity.id === 22
                        ? "Московский государственный психолого-педагогический университет — ведущий вуз в области психологии и педагогики, подготовка психологов и педагогов."
                        : selectedUniversity.id === 23
                        ? "Российский экономический университет им. Г.В. Плеханова — один из старейших экономических вузов России, специализирующийся на экономике, финансах и менеджменте."
                        : selectedUniversity.id === 24
                        ? "Государственный академический университет гуманитарных наук — ведущий вуз в области гуманитарных наук, философии, истории и литературы."
                        : selectedUniversity.id === 25
                        ? "Московский политехнический университет — ведущий технический вуз, специализирующийся на инженерии, информационных технологиях и машиностроении."
                        : "Описание вуза не найдено"
                      }
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {selectedUniversity.specialties.map((spec, idx) => (
                      <span key={idx} className="px-4 py-2 bg-purple-600/30 text-purple-300 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={goToMap}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Показать на карте
                    </button>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                      <Globe className="w-4 h-4 mr-2 inline" />
                      Сайт вуза
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-full">
                  <h2 className="text-2xl font-bold mb-6 text-center">Изображения</h2>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <Building2 className="w-12 h-12 mx-auto mb-2" />
                        <p>Главный корпус</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <Users className="w-12 h-12 mx-auto mb-2" />
                        <p>Студенческий кампус</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <GraduationCap className="w-12 h-12 mx-auto mb-2" />
                        <p>Учебные корпуса</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Section 2: Upcoming Events */}
          <section>
            <h2 className="text-3xl font-bold mb-8">
              {selectedUniversity.id === 1 
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}` 
                : selectedUniversity.id === 2
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 3
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 4
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 5
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 6
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 7
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 8
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 9
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 10
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 11
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 12
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 13
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 14
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 15
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 16
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 17
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 18
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 19
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 20
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 21
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 22
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 23
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 24
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : selectedUniversity.id === 25
                ? `Ближайшие мероприятия в ${selectedUniversity.shortName}`
                : `Ближайшие мероприятия в ${selectedUniversity.shortName}`
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedUniversity.id === 1 
                ? mguEvents 
                : selectedUniversity.id === 2
                ? mftiEvents
                : selectedUniversity.id === 3
                ? mifiEvents
                : selectedUniversity.id === 4
                ? misisEvents
                : selectedUniversity.id === 5
                ? rnimuEvents
                : selectedUniversity.id === 6
                ? maiEvents
                : selectedUniversity.id === 7
                ? meiEvents
                : selectedUniversity.id === 8
                ? baumanEvents
                : selectedUniversity.id === 9
                ? gubkinEvents
                : selectedUniversity.id === 10
                ? meiEvents
                : selectedUniversity.id === 11
                ? hseEvents
                : selectedUniversity.id === 12
                ? mgsuEvents
                : selectedUniversity.id === 13
                ? mgimoEvents
                : selectedUniversity.id === 14
                ? sechenovEvents
                : selectedUniversity.id === 15
                ? mgppuEvents
                : selectedUniversity.id === 16
                ? mgluEvents
                : selectedUniversity.id === 17
                ? mguaEvents
                : selectedUniversity.id === 18
                ? finunivEvents
                : selectedUniversity.id === 19
                ? rhtuEvents
                : selectedUniversity.id === 20
                ? rumEvents
                : selectedUniversity.id === 21
                ? vgukevents
                : selectedUniversity.id === 22
                ? mgppupsyEvents
                : selectedUniversity.id === 23
                ? reuevents
                : selectedUniversity.id === 24
                ? gauhnevents
                : selectedUniversity.id === 25
                ? moscpolyevents
                : mguEvents
              ).map((event) => (
                <div key={event.id} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                  </div>
                  <div className="space-y-2 text-gray-300 mb-4">
                    <p><strong>Дата:</strong> {new Date(event.date).toLocaleDateString('ru-RU')}</p>
                    <p><strong>Время:</strong> {event.time}</p>
                    <p><strong>Место:</strong> {event.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants} участников
                    </div>
                    <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                      Участвовать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }
    if (selectedCareerField) {
      // Фильтруем вузы, направления и профессии по ID сферы
      const relatedUniversities = universities.filter(uni => selectedCareerField.universityIds.includes(uni.id));
      const relatedDirections = universityDirections.filter(dir => dir.careerFieldId === selectedCareerField.id);
      const relatedProfessions = professions.filter(prof => prof.careerFieldId === selectedCareerField.id);

      return (
        <div className="py-8">
          <button
            onClick={() => setSelectedCareerField(null)}
            className="flex items-center text-white mb-8 bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад к карьерным направлениям
          </button>
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30"></div>
              <h1 className="text-5xl font-bold relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {selectedCareerField.name}
              </h1>
            </div>
            <p className="text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
              {selectedCareerField.description}
            </p>
          </div>

          {/* Связанные ВУЗы */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Подходящие ВУЗы</h2>
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
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center mb-3">
                      <Building2 className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-bold">{uni.name}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{uni.location}</p>
                    <p className="text-gray-400 text-xs">{uni.rank}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">Вузы не найдены для этой сферы.</p>
              )}
            </div>
          </section>

          {/* Связанные Направления */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Подходящие Направления</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedDirections.length > 0 ? (
                relatedDirections.map(dir => (
                  <div
                    key={dir.id}
                    onClick={() => {
                      setActiveTab('universities');
                      setSelectedUniversity(null);
                      setSelectedCareerField(null);
                      setSearchQuery(dir.direction); // Устанавливаем поиск по направлению
                      window.scrollTo(0, 0);
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start">
                      <Building2 className="w-8 h-8 text-purple-400 mr-4 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-purple-400">{dir.university}</h3>
                        <h4 className="text-lg font-semibold mb-1">{dir.direction}</h4>
                        <p className="text-gray-300 text-sm">{dir.faculty}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center col-span-full">Направления не найдены для этой сферы.</p>
              )}
            </div>
          </section>

          {/* Связанные Профессии */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Подходящие Профессии</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProfessions.length > 0 ? (
                relatedProfessions.map(prof => (
                  <div
                    key={prof.id}
                    onClick={() => {
                      setActiveTab('universities');
                      setSelectedUniversity(null);
                      setSelectedCareerField(null);
                      setSearchQuery(prof.name); // Устанавливаем поиск по профессии
                      window.scrollTo(0, 0);
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start mb-3">
                      <Briefcase className="w-6 h-6 text-purple-400 mr-3 mt-1" />
                      <h3 className="text-xl font-bold">{prof.name}</h3>
                    </div>
                    <p className="text-gray-300">{prof.description}</p>
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
            {/* Hero Section */}
            <section className="text-center py-16">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight">
                  ПрофНавигатор
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Найди свой путь в IT, инженерии, медицине...
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-16">
                  <div className="relative">
                    <button 
                      onClick={goToMap}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      <Search className="w-5 h-5 inline mr-2" />
                      Найти мероприятия рядом
                    </button>
                    <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      50+
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={goToUniversities}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
                    >
                      <GraduationCap className="w-5 h-5 inline mr-2" />
                      Изучить ВУЗы
                    </button>
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      25+
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </section>
            {/* How to Start */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Как начать использовать платформу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Найти мероприятия */}
                <div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={goToMap}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Search className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-semibold">Найти мероприятия</h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-lg text-sm font-semibold">
                      50+ мероприятий
                    </div>
                  </div>
                  <p className="text-gray-300">Открой для себя интересные события в твоем городе</p>
                </div>
                {/* Запланировать участие */}
                <div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={goToEvents}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-semibold">Запланировать участие</h3>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-lg text-sm font-semibold">
                      5000+ участников
                    </div>
                  </div>
                  <p className="text-gray-300">Добавляй события в свой календарь</p>
                </div>
                {/* Изучить ВУЗы */}
                <div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={goToUniversities}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <GraduationCap className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-semibold">Изучить ВУЗы</h3>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-3 py-1 rounded-lg text-sm font-semibold">
                      25+ ВУЗов-партнеров
                    </div>
                  </div>
                  <p className="text-gray-300">Найди подходящие учебные заведения</p>
                </div>
                {/* Построить карьеру */}
                <div 
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                  onClick={goToCareer}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
                      <h3 className="text-xl font-semibold">Построить карьеру</h3>
                    </div>
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 px-3 py-1 rounded-lg text-sm font-semibold">
                      100+ направлений
                    </div>
                  </div>
                  <p className="text-gray-300">Планируй свой профессиональный путь</p>
                </div>
              </div>
            </section>
            {/* Directions */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Самые востребованные направления</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {directions.map((dir, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      // Найти соответствующую карьерную сферу по названию
                      const field = careerFields.find(f => f.name === dir.title);
                      if (field) {
                        setSelectedCareerField(field);
                        setActiveTab('career');
                        window.scrollTo(0, 0);
                      }
                    }}
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{dir.icon}</span>
                      <h3 className="text-xl font-semibold">{dir.title}</h3>
                    </div>
                    <p className="text-gray-300">{dir.subtitle}</p>
                  </div>
                ))}
              </div>
            </section>
            {/* Features */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Преимущества платформы</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                    <div className="text-purple-400 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </section>
            {/* CTA */}
            <section className="text-center py-16">
              <h2 className="text-4xl font-bold mb-8">🚀 Начни строить свою карьеру сегодня!</h2>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={goToMap}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
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
            <h1 className="text-4xl font-bold mb-8 text-center">🗺️ Карта профориентационных мероприятий Москвы</h1>
            <p className="text-xl text-gray-300 text-center mb-12">Найдите интересующие вас события на интерактивной карте</p>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-purple-400" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Поиск</label>
                      <input type="text" placeholder="Название мероприятия..." className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                    </div>
                    {/* Custom Map Type Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">Типы</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowMapTypeDropdownMap(!showMapTypeDropdownMap)}
                      >
                        Все типы
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showMapTypeDropdownMap ? 'rotate-90' : ''}`} />
                      </div>
                      {showMapTypeDropdownMap && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все типы', 'Мастер-класс', 'Вебинар', 'Конференция'].map((type) => (
                            <div
                              key={type}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
                              onClick={() => {
                                setShowMapTypeDropdownMap(false);
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Custom Map Category Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">Категории</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowMapCategoryDropdownMap(!showMapCategoryDropdownMap)}
                      >
                        Все категории
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showMapCategoryDropdownMap ? 'rotate-90' : ''}`} />
                      </div>
                      {showMapCategoryDropdownMap && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все категории', 'IT', 'Инженерия', 'Медицина', 'Бизнес'].map((category) => (
                            <div
                              key={category}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
                              onClick={() => {
                                setShowMapCategoryDropdownMap(false);
                              }}
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Date Range Inputs */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Дата начала</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min="2025-01-01"
                        max="2026-12-31"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Дата окончания</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || "2025-01-01"}
                        max="2026-12-31"
                      />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="reg" className="mr-2" />
                      <label htmlFor="reg" className="text-sm">Требуется регистрация</label>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                      Сбросить
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                {/* Smart Search Bar */}
                <div className="mb-6" ref={mapSearchRef}>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Найдите интересующие события и мероприятия..."
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={mapSearchQuery}
                      onChange={handleMapSearchChange}
                    />
                    {showMapSearchResults && mapSearchResults.length > 0 && (
                      <div className="absolute z-10 w-full bg-gray-800/90 backdrop-blur-lg border border-gray-600 rounded-xl shadow-2xl mt-2 max-h-60 overflow-y-auto">
                        {mapSearchResults.map((result) => (
                          <div
                            key={result.id}
                            className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 cursor-pointer transition-all duration-200 border-b border-gray-700 last:border-b-0"
                            onClick={() => handleSelectLocation(result)}
                          >
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-3 text-purple-400" />
                              <div>
                                <div className="font-medium">{result.name}</div>
                                <div className="text-sm text-gray-400">{result.address}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Responsive Map Container */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden h-[500px] relative">
                  {/* Яндекс.Карта через iframe */}
                  <iframe
                    src={selectedLocation 
                      ? `https://yandex.ru/map-widget/v1/?ll=${selectedLocation.lng}%2C${selectedLocation.lat}&z=16&l=map` 
                      : "https://yandex.ru/map-widget/v1/?um=constructor%3A1b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f0b5e8a3f&amp;source=constructor"}
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
          <div className="py-20 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-4xl mx-auto">
              <Calendar className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6">📅 Календарь мероприятий</h1>
              <div className="text-2xl font-semibold text-purple-400 mb-4">Раздел в разработке</div>
              <p className="text-gray-300 mb-8">Скоро здесь появится полный календарь всех запланированных событий</p>
              <div className="bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-300">Информация о предстоящих мероприятиях, вебинарах и мастер-классах</p>
              </div>
            </div>
          </div>
        );
      case 'universities':
        return (
          <div className="py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">🎓 ВУЗы</h1> {/* <-- Переименован заголовок --> */}
              <p className="text-xl text-gray-300">Найдите подходящее учебное заведение для вашего будущего</p>
            </div>
            {/* Smart Search Bar - перемещена сюда, перед сеткой фильтров и вузов */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Найдите интересующие ВУЗы..."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchQuery} // Используем существующее состояние searchQuery
                  onChange={(e) => setSearchQuery(e.target.value)} // Используем существующий обработчик
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-purple-400" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    {/* Убрана строка поиска из фильтров */}
                    {/* Custom Type Dropdown */}
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2">Тип</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                      >
                        {selectedType}
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showTypeDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      {showTypeDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-44 overflow-y-auto">
                          {['Все типы', 'Университет', 'Институт'].map((type) => ( // <-- Обновленный список типов -->
                            <div
                              key={type}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
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
                      <label className="block text-sm font-medium mb-2">Специальности</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowSpecialtyDropdown(!showSpecialtyDropdown)}
                      >
                        {selectedSpecialty}
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showSpecialtyDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      {showSpecialtyDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все специальности', 'IT', 'Инженерия', 'Медицина', 'Экономика', 'Право', 'Физика', 'Химия', 'Материаловедение', 'Фармация', 'Психология', 'Лингвистика', 'Педагогика', 'Международные отношения'].map((specialty) => (
                            <div
                              key={specialty}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
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
                      <label className="block text-sm font-medium mb-2">Город</label>
                      <select 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white"
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
                      <label htmlFor="partnership" className="text-sm">Партнерские программы</label>
                    </div>
                    <button 
                      onClick={resetFilters}
                      className="w-full bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-white"
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
                        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <Building2 className="w-8 h-8 text-purple-400 mr-3" />
                              <h3 className="text-2xl font-bold">{uni.name}</h3>
                            </div>
                            <p className="text-gray-300 mb-4">Московское учебное заведение</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center text-gray-400">
                                <Globe2 className="w-4 h-4 mr-2" />
                                {uni.location}
                              </div>
                              <div className="flex items-center text-gray-400">
                                <Users2 className="w-4 h-4 mr-2" />
                                {uni.students} студентов
                              </div>
                              <div className="flex items-center text-gray-400">
                                <Award className="w-4 h-4 mr-2" />
                                {uni.rank}
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {uni.specialties.slice(0, 3).map((spec, idx) => (
                                <span key={idx} className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-xs">
                                  {spec}
                                </span>
                              ))}
                              {uni.specialties.length > 3 && (
                                <span className="px-3 py-1 bg-gray-600/30 text-gray-300 rounded-full text-xs">
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
                      <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-400 mb-2">Вузы не найдены</h3>
                      <p className="text-gray-500">Попробуйте изменить параметры фильтрации</p>
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
              <h1 className="text-4xl font-bold mb-2">💼 Карьерные возможности</h1>
              <p className="text-xl text-gray-300">Исследуйте различные карьерные направления и выберите свой путь</p>
            </div>
            {/* Описание вкладки */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">Добро пожаловать в раздел карьерных возможностей!</h2>
              <p className="text-gray-300 mb-4">
                Здесь вы найдете всю необходимую информацию для построения успешной карьеры. Мы поможем вам:
              </p>
              <ul className="text-gray-300 list-disc list-inside space-y-2">
                <li>Определить свое профессиональное призвание</li>
                <li>Выбрать подходящие направления обучения</li>
                <li>Изучить перспективные сферы деятельности</li>
                <li>Найти подходящие вузы и специальности</li>
                <li>Познакомиться с различными профессиями</li>
              </ul>
            </div>
            {/* Карьерные сферы */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Карьерные сферы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careerFields.map((field) => (
                  <div 
                    key={field.id}
                    onClick={() => setSelectedCareerField(field)}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{field.icon}</span>
                      <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{field.name}</h3>
                    </div>
                    <p className="text-gray-300">{field.description}</p>
                  </div>
                ))}
              </div>
            </section>
            {/* Направления в вузах */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Популярные направления в вузах</h2>
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
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer" // Добавлен cursor-pointer
                    >
                      <div className="flex items-start">
                        <Building2 className="w-8 h-8 text-purple-400 mr-4 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-purple-400">{direction.university}</h3>
                          <h4 className="text-lg font-semibold mb-1">{direction.direction}</h4>
                          <p className="text-gray-300 text-sm">{direction.faculty}</p>
                          {direction.relatedProfessions && direction.relatedProfessions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {direction.relatedProfessions.slice(0, 2).map((prof, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                                  {prof}
                                </span>
                              ))}
                              {direction.relatedProfessions.length > 2 && (
                                <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
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
              <h2 className="text-3xl font-bold mb-8 text-center">Популярные профессии</h2>
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
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer" // Добавлен cursor-pointer
                    >
                      <div className="flex items-start mb-3">
                        <Briefcase className="w-6 h-6 text-purple-400 mr-3 mt-1" />
                        <h3 className="text-xl font-bold">{profession.name}</h3>
                      </div>
                      <p className="text-gray-300">{profession.description}</p>
                      {profession.requiredSkills && profession.requiredSkills.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-400">Нужные навыки:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profession.requiredSkills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                            {profession.requiredSkills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded-full text-xs">
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
              <h2 className="text-4xl font-bold mb-8">🚀 Начни строить свою карьеру сегодня!</h2>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={goToMap}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
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
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6">📰 Блог и полезные материалы</h1>
              <div className="text-2xl font-semibold text-purple-400 mb-4">Раздел в разработке</div>
              <p className="text-gray-300 mb-8">Статьи, советы и интервью с профессионалами для помощи в выборе карьерного пути</p>
              <div className="bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-300">Полезные материалы для профориентации и карьерного планирования</p>
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
      currentTheme === 'galaxy' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white' 
        : 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-gray-800'
    }`}>
      {/* Settings Dropdown - Outside header flow */}
      {showSettings && (
        <>
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setShowSettings(false)}
          ></div>
          <div className={`absolute right-4 top-20 w-64 ${
            currentTheme === 'galaxy' 
              ? 'bg-gray-800/90 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/90 backdrop-blur-lg border border-gray-300'
          } rounded-xl shadow-xl z-40`}>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-3 ${
                currentTheme === 'galaxy' ? 'text-white' : 'text-gray-800'
              }`}>Настройки темы</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => changeTheme('galaxy')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gradient-to-r from-black to-purple-900 text-white border border-purple-700/50' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-600'
                  } hover:from-purple-900 hover:to-purple-800 transition-all duration-200`}
                >
                  🌌 Galaxy (Default)
                </button>
                <button 
                  onClick={() => changeTheme('light-steel')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    currentTheme === 'light-steel' 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-gray-800 border border-gray-400' 
                      : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 border border-gray-300'
                  } hover:from-gray-300 hover:to-gray-400 transition-all duration-200`}
                >
                  ☀️ Light Steel
                </button>
                <button 
                  onClick={() => changeTheme('dark-gold')}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    currentTheme === 'dark-gold' 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border border-gray-600' 
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white border border-gray-500'
                  } hover:from-gray-700 hover:to-gray-800 transition-all duration-200`}
                >
                  ⚫ Dark gold
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Header with deep galaxy gradient */}
      <header className={
        currentTheme === 'galaxy' 
          ? 'bg-gradient-to-r from-black via-purple-900 via-blue-900 via-indigo-900 to-gray-900 border-b border-purple-800/50 relative overflow-hidden' 
          : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border-b border-gray-600 relative overflow-hidden'
      }>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-transparent"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-purple-900/10 via-blue-900/10 to-transparent animate-spin-slow"></div>
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                ПрофНавигатор
              </h1>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
              { id: 'home', label: 'Главная', icon: Star },
              { id: 'map', label: 'Карта', icon: MapPin },
              { id: 'events', label: 'Мероприятия', icon: Calendar },
              { id: 'universities', label: 'Вузы и колледжи', icon: GraduationCap },
              { id: 'career', label: 'Карьера', icon: Briefcase },
              { id: 'blog', label: 'Блог', icon: BookOpen }
              ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSelectedUniversity(null); // Сбрасываем выбранный вуз при переходе по вкладкам
                    setSelectedCareerField(null); // Сбрасываем выбранную сферу карьеры
                    setIsMenuOpen(false); // Закрываем мобильное меню
                    window.scrollTo(0, 0); // Добавлено: прокрутка вверх при клике на вкладку
                  }}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.id || (selectedUniversity && item.id === 'universities') || (selectedCareerField && item.id === 'career')
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
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
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Регистрация
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Вход
              </button>
              {/* Settings Gear Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300"
                >
                  <Settings className={`w-5 h-5 text-white ${showSettings ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-purple-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'home', label: 'Главная', icon: Star },
                  { id: 'map', label: 'Карта', icon: MapPin },
                  { id: 'events', label: 'Мероприятия', icon: Calendar },
                  { id: 'universities', label: 'Вузы и колледжи', icon: GraduationCap },
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
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id || (selectedUniversity && item.id === 'universities') || (selectedCareerField && item.id === 'career')
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      {/* Footer with deep galaxy gradient */}
      <footer className={
        currentTheme === 'galaxy' 
          ? 'bg-gradient-to-r from-black via-purple-900 via-blue-900 via-indigo-900 to-gray-900 border-t border-purple-800/50 py-8 mt-auto relative overflow-hidden' 
          : 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 border-t border-gray-600 py-8 mt-auto relative overflow-hidden'
      }>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-transparent"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--tw-gradient-stops))] from-purple-900/10 via-blue-900/10 to-transparent animate-spin-slow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                ПрофНавигатор
              </span>
            </div>
            <div className="flex items-center space-x-6 text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Контакты</a>
              <a href="#" className="hover:text-white transition-colors">Соцсети</a>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${
            currentTheme === 'galaxy' 
              ? 'bg-gray-800/90 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/90 backdrop-blur-lg border border-gray-300'
          } rounded-2xl p-8 max-w-md w-full relative`}>
            <button
              onClick={() => setShowLogin(false)}
              className={`absolute top-4 right-4 ${
                currentTheme === 'galaxy' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-purple-400" />
              Вход в аккаунт
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>📧 Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>🔑 Пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none`}
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className={`text-sm ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>Запомнить меня</label>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Войти
              </button>
              <div className={`text-center ${
                currentTheme === 'galaxy' ? 'text-gray-400' : 'text-gray-600'
              } text-sm my-4`}>────────── или ──────────</div>
              <div className="flex space-x-4">
                <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  VK
                </button>
              </div>
              <div className={`text-center text-sm my-4 space-y -2 ${
                currentTheme === 'galaxy' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p><a href="#" className="text-purple-400 hover:text-purple-300">Забыли пароль?</a></p>
                <p>Нет аккаунта? <a href="#" onClick={() => {setShowLogin(false); setShowRegister(true);}} className="text-purple-400 hover:text-purple-300">Зарегистрироваться</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${
            currentTheme === 'galaxy' 
              ? 'bg-gray-800/90 backdrop-blur-lg border border-gray-700' 
              : 'bg-white/90 backdrop-blur-lg border border-gray-300'
          } rounded-2xl p-8 max-w-md w-full relative`}>
            <button
              onClick={() => setShowRegister(false)}
              className={`absolute top-4 right-4 ${
                currentTheme === 'galaxy' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-green-400" />
              Создать аккаунт
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>👤 Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>📧 Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>🔑 Пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>🔒 Подтвердите пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full ${
                    currentTheme === 'galaxy' 
                      ? 'bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-100/50 border border-gray-300 text-gray-800 placeholder-gray-500'
                  } rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none`}
                />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className={`text-sm ${
                  currentTheme === 'galaxy' ? 'text-gray-300' : 'text-gray-700'
                }`}>Согласен с условиями использования</label>
              </div>
              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Зарегистрироваться
              </button>
              <div className={`text-center ${
                currentTheme === 'galaxy' ? 'text-gray-400' : 'text-gray-600'
              } text-sm my-4`}>────────── или ──────────</div>
              <div className="flex space-x-4">
                <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  VK
                </button>
              </div>
              <div className={`text-center text-sm my-4 space-y-2 ${
                currentTheme === 'galaxy' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <p>Уже есть аккаунт? <a href="#" onClick={() => {setShowRegister(false); setShowLogin(true);}} className="text-purple-400 hover:text-purple-300">Войти</a></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;