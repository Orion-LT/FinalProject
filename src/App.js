import React, { useState, useRef, useEffect } from 'react';
import { Star, MapPin, Calendar, GraduationCap, Briefcase, BookOpen, UserPlus, User, X, Filter, Search, Building2, Users2, Globe2, ArrowLeft, Settings, Sun, Moon, Award, ChevronRight, Mail, Phone, Globe, Shield, FileText, Instagram, Youtube, Linkedin, Twitter, Facebook, MapPin as MapPinIcon, ChevronLeft, MessageSquare, AtSign, Hash, School2, Target, UserCheck, BarChart3, Brain, CheckCircle } from 'lucide-react';

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Состояния для теста
  const [showTest, setShowTest] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [recommendedProfession, setRecommendedProfession] = useState(null);
  const [recommendedCareerField, setRecommendedCareerField] = useState(null);

  // Вопросы для теста
  const testQuestions = [
    {
      id: 1,
      question: "Что вам нравится делать больше всего?",
      options: [
        { text: "Решать логические задачи и работать с числами", careerFieldId: 1 },
        { text: "Создавать что-то своими руками, конструировать", careerFieldId: 2 },
        { text: "Помогать людям, заботиться о их здоровье", careerFieldId: 3 },
        { text: "Планировать, управлять, организовывать", careerFieldId: 4 }
      ]
    },
    {
      id: 2,
      question: "Какой предмет в школе вам давался легче всего?",
      options: [
        { text: "Информатика и математика", careerFieldId: 1 },
        { text: "Физика и черчение", careerFieldId: 2 },
        { text: "Биология и химия", careerFieldId: 3 },
        { text: "Обществознание и экономика", careerFieldId: 4 }
      ]
    },
    {
      id: 3,
      question: "Как вы предпочитаете проводить свободное время?",
      options: [
        { text: "Играю в компьютерные игры, программирую", careerFieldId: 1 },
        { text: "Чиню технику, мастерю что-то", careerFieldId: 2 },
        { text: "Читаю медицинскую литературу, ухаживаю за животными", careerFieldId: 3 },
        { text: "Читаю книги по психологии, общаюсь с людьми", careerFieldId: 6 }
      ]
    },
    {
      id: 4,
      question: "Что для вас важнее всего в будущей работе?",
      options: [
        { text: "Высокая зарплата и карьерный рост", careerFieldId: 4 },
        { text: "Возможность помогать людям", careerFieldId: 3 },
        { text: "Интересные задачи и интеллектуальный вызов", careerFieldId: 1 },
        { text: "Стабильность и социальные гарантии", careerFieldId: 5 }
      ]
    },
    {
      id: 5,
      question: "Какая деятельность вам ближе?",
      options: [
        { text: "Анализ данных, поиск закономерностей", careerFieldId: 1 },
        { text: "Проектирование и создание механизмов", careerFieldId: 2 },
        { text: "Диагностика и лечение", careerFieldId: 3 },
        { text: "Обучение и воспитание других", careerFieldId: 6 }
      ]
    }
  ];

  // ... (остальные данные: universities, careerCenters, careerFields и т.д. остаются без изменений)
  // Для краткости не включаю их здесь, но они должны быть в полном коде

  const universities = [
    { id: 1, name: 'Московский государственный университет имени М.В. Ломоносова', location: 'Москва, Ленинские горы, д. 1', students: '40 000', rank: 'Топ-1 в России', type: 'Университет', specialties: ['IT', 'Инженерия', 'Медицина', 'Экономика', 'Право'], shortName: 'МГУ', website: 'https://msu.ru/', aliases: ['МГУ', 'Ломоносовский университет', 'Московский университет', 'университет Ломоносова'] },
    { id: 2, name: 'Московский физико-технический институт', location: 'Москва, Институтский пер., д. 9', students: '7 000', rank: 'Топ-1 в науке', type: 'Институт', specialties: ['IT', 'Инженерия', 'Физика'], shortName: 'МФТИ', website: 'https://mipt.ru/', aliases: ['МФТИ', 'Физтех', 'Физтех институт', 'Московский физтех'] },
    { id: 3, name: 'Национальный исследовательский ядерный университет «МИФИ»', location: 'Москва, Каширское ш., д. 31', students: '12 000', rank: 'Топ-5 в инженерии', type: 'Институт', specialties: ['Инженерия', 'Физика', 'Химия'], shortName: 'НИЯУ МИФИ', website: 'https://mephi.ru/', aliases: ['НИЯУ МИФИ', 'МИФИ', 'Московский инженерный физико-технический институт', 'институт ядерной физики'] },
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
    { id: 15, name: 'Московский городской педагогический университет', location: 'Москва, 2-й Сельскохозяйственный проезд, д. 4', students: '13 000', rank: 'Топ-3 в педагогике', type: 'Университет', specialties: ['Педагогика', 'Психология', 'Образование'], shortName: 'МГППУ', website: 'https://www.mgpu.ru/', aliases: ['МГППУ', 'Московский педагогический университет', 'педагогический университет', 'учительский университет'] },
    { id: 16, name: 'Московский государственный лингвистический университет', location: 'Москва, ул. Остоженка, д. 38', students: '8 000', rank: 'Топ-1 в лингвистике', type: 'Университет', specialties: ['Лингвистика', 'Перевод', 'Филология'], shortName: 'МГЛУ', website: 'https://linguanet.ru/', aliases: ['МГЛУ', 'Московский лингвистический университет', 'лингвистический университет', 'языковой университет'] },
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

  const careerCenters = [
    { id: 1, name: 'Центр занятости «Моя карьера»', location: 'Москва', age: 'от 14 лет', accessibility: 'очно', description: 'В центре не только помогут определиться с профессией, но и подскажут, как найти первую работу. Организуют тренинги, деловые игры и школу «Лето моей карьеры» для подростков 14-17 лет.', type: 'Центр профориентации', website: 'https://mycareer.moscow/#/meetings/info' },
    { id: 2, name: 'Проект «Билет в будущее»', location: '89 регионов', age: '6-11 класс', accessibility: 'онлайн и офлайн', description: 'Проект помогает школьникам раскрыть таланты и осознанно выбрать карьеру. После регистрации у ребенка появляется педагог-навигатор, который поможет пройти диагностику и записать на профпробы.', type: 'Центр профориентации', website: 'https://bvbinfo.ru/' },
    { id: 3, name: 'Учебный центр Maximum', location: 'Москва', age: '8-11 класс', accessibility: 'онлайн, очно', description: 'Образовательный центр помогает старшеклассникам понять, что им нравится, и выбрать подходящую профессию. Проводит профориентационные курсы и консультации с профориентологами.', type: 'Центр профориентации', website: 'https://maximumtest.ru/proforientacia' },
    { id: 4, name: 'Навигатор поступления', location: 'онлайн', age: '7-11 класс', accessibility: 'онлайн', description: 'Создатели сайта с каталогом вузов и программ бесплатно проводят онлайн-тестирование для старшеклассников. Профориентолог поможет интерпретировать результаты и составить план подготовки к поступлению.', type: 'Центр профориентации', website: 'https://propostuplenie.ru/promo/proforientacia' },
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
    { id: 1, title: 'VI Международная научно-практическая конференция «Лингвистика дистанцирования»', date: '2026-01-26', time: '10:00', location: 'МГУ, Филологический факультет', participants: '200', organizer: 'МГУ', category: 'Конференция', link: 'https://conf.msu.ru/rus/event/10212/', description: 'Язык в контексте мультимодальной коммуникации XXI века' },
    { id: 2, title: 'VI Международная научно-практическая конференция «Лингвистика дистанцирования»', date: '2026-01-27', time: '10:00', location: 'МГУ, Филологический факультет', participants: '200', organizer: 'МГУ', category: 'Конференция', link: 'https://conf.msu.ru/rus/event/10212/', description: 'Межкультурная коммуникация в глобальном онлайн пространстве' },
    { id: 3, title: 'VI Международная научно-практическая конференция «Лингвистика дистанцирования»', date: '2026-01-28', time: '10:00', location: 'МГУ, Филологический факультет', participants: '200', organizer: 'МГУ', category: 'Конференция', link: 'https://conf.msu.ru/rus/event/10212/', description: 'Цифровизация в современной лингвистике' },
    { id: 4, title: 'Забытые слова: новые подходы к изучению биографии и творчества М. Е. Салтыкова-Щедрина', date: '2026-01-27', time: '11:00', location: 'МГУ, Филологический факультет', participants: '150', organizer: 'МГУ', category: 'Круглый стол', link: 'https://conf.msu.ru/rus/event/10223/', description: 'К 200-летию со дня рождения М.Е. Салтыкова-Щедрина' },
    { id: 5, title: 'XX Международная научная конференция «Сорокинские чтения»', date: '2026-02-19', time: '10:00', location: 'МГУ, Социологический факультет', participants: '300', organizer: 'МГУ', category: 'Конференция', link: 'https://conf.msu.ru/rus/event/10097/', description: 'Российская социология: связь времен и горизонты будущего' },
    { id: 6, title: 'Международная научно-практическая конференция «Новые геополитические горизонты»', date: '2026-02-25', time: '10:00', location: 'МГУ, Факультет политологии', participants: '250', organizer: 'МГУ', category: 'Конференция', link: 'https://conf.msu.ru/rus/event/10144/', description: 'Эволюция международных отношений и интеграционных процессов в современном мире' },
    { id: 7, title: 'Ежегодный Фестиваль школьных средств массовой информации', date: '2026-04-01', time: '10:00', location: 'МГУ, Факультет журналистики', participants: '500', organizer: 'МГУ', category: 'Фестиваль', link: 'https://conf.msu.ru/rus/event/10115/', description: 'Фестиваль проводится в рамках комплексного проекта «Медиаобразование в школе»' },
    { id: 8, title: 'Ежегодный Фестиваль школьных средств массовой информации', date: '2026-04-15', time: '10:00', location: 'МГУ, Факультет журналистики', participants: '500', organizer: 'МГУ', category: 'Фестиваль', link: 'https://conf.msu.ru/rus/event/10115/', description: 'Конкурс медийных проектов и мастер-классы' },
    { id: 9, title: 'Ежегодный Фестиваль школьных средств массовой информации', date: '2026-04-30', time: '10:00', location: 'МГУ, Факультет журналистики', participants: '500', organizer: 'МГУ', category: 'Фестиваль', link: 'https://conf.msu.ru/rus/event/10115/', description: 'Награждение победителей и закрытие фестиваля' },
    { id: 10, title: 'День открытых дверей НИТУ МИСиС', date: '2026-01-20', time: '12:00', location: 'МИСиС, Главный корпус', participants: '400', organizer: 'МИСиС', category: 'День открытых дверей', link: 'https://misis.ru/', description: 'Знакомство с лабораториями и инжиниринговыми центрами мирового уровня' },
    { id: 11, title: 'Мастер-класс по материаловедению', date: '2026-02-10', time: '14:00', location: 'МИСиС, Лаборатория нанотехнологий', participants: '80', organizer: 'МИСиС', category: 'Мастер-класс', link: 'https://misis.ru/', description: 'Изучение современных материалов под микроскопом Axio Imager Z2' },
    { id: 12, title: 'Физтех-Школа для старшеклассников', date: '2026-01-25', time: '10:00', location: 'МФТИ, Главный корпус', participants: '200', organizer: 'МФТИ', category: 'Образовательная программа', link: 'https://mipt.ru/', description: 'Интенсивная подготовка по физике и математике' },
    { id: 13, title: 'Научная конференция «Физика будущего»', date: '2026-02-15', time: '11:00', location: 'МФТИ, Конференц-зал', participants: '150', organizer: 'МФТИ', category: 'Конференция', link: 'https://mipt.ru/', description: 'Доклады молодых ученых в области квантовых технологий' },
    { id: 14, title: 'Летняя школа в Китае для студентов МИЭТ', date: '2026-07-03', time: '09:00', location: 'МИЭТ, Зеленоград', participants: '50', organizer: 'МИЭТ', category: 'Образовательная программа', link: 'https://miet.ru/', description: 'Международная образовательная программа по цифровому дизайну' },
    { id: 15, title: 'Выставка графических работ студентов', date: '2026-07-02', time: '10:00', location: 'МИЭТ, Институт цифрового дизайна', participants: '100', organizer: 'МИЭТ', category: 'Выставка', link: 'https://miet.ru/', description: 'Работы студентов Института цифрового дизайна' },
    { id: 16, title: 'День энергетика в НИУ МЭИ', date: '2026-03-15', time: '10:00', location: 'МЭИ, Главный корпус', participants: '350', organizer: 'МЭИ', category: 'Праздник', link: 'https://mpei.ru/', description: 'Праздничные мероприятия и выставки достижений университета' },
    { id: 17, title: 'Мастер-класс от Студенческого Медиацентра', date: '2026-03-20', time: '14:00', location: 'МЭИ, Медиацентр', participants: '60', organizer: 'МЭИ', category: 'Мастер-класс', link: 'https://mpei.ru/', description: 'Обучение созданию медиа-контента для социальных сетей' },
    { id: 18, title: 'День авиации и космонавтики', date: '2026-04-12', time: '10:00', location: 'МАИ, Главный корпус', participants: '500', organizer: 'МАИ', category: 'Праздник', link: 'https://mai.ru/', description: 'Праздничные мероприятия ко Дню космонавтики' },
    { id: 19, title: 'Открытая лекция «Ракетные системы будущего»', date: '2026-04-20', time: '15:00', location: 'МАИ, Лаборатория ракетных систем', participants: '120', organizer: 'МАИ', category: 'Лекция', link: 'https://mai.ru/', description: 'Лекция от ведущих специалистов ракетно-космической отрасли' },
    { id: 20, title: 'Международный день студента в РУДН', date: '2026-02-17', time: '12:00', location: 'РУДН, Главный корпус', participants: '1000', organizer: 'РУДН', category: 'Праздник', link: 'https://www.rosunimed.ru/', description: 'Культурная программа с участием студентов из 160 стран' },
    { id: 21, title: 'День иностранных языков', date: '2026-03-25', time: '10:00', location: 'МГЛУ, Главный корпус', participants: '300', organizer: 'МГЛУ', category: 'Праздник', link: 'https://linguanet.ru/', description: 'Мероприятия, посвященные изучению иностранных языков' },
    { id: 22, title: 'Бизнес-акселератор «Мама может»', date: '2026-02-05', time: '14:00', location: 'Центр «Моя карьера»', participants: '50', organizer: 'Моя карьера', category: 'Обучение', link: 'https://mycareer.moscow/#/meetings/info', description: 'Обучение для мам, желающих открыть свой бизнес' },
    { id: 23, title: 'Профориентационное тестирование', date: '2026-01-30', time: '10:00', location: 'Онлайн', participants: '200', organizer: 'Билет в будущее', category: 'Тестирование', link: 'https://bvbinfo.ru/', description: 'Бесплатное профтестирование для школьников 6-11 классов' },
    { id: 24, title: 'Консультация с профориентологом', date: '2026-02-01', time: '15:00', location: 'Онлайн', participants: '30', organizer: 'Maximum Education', category: 'Консультация', link: 'https://maximumtest.ru/proforientacia', description: 'Индивидуальная консультация для школьников 8-11 классов' },
    { id: 25, title: 'Вебинар «Как выбрать профессию»', date: '2026-02-08', time: '18:00', location: 'Онлайн', participants: '150', organizer: 'Навигатор поступления', category: 'Вебинар', link: 'https://propostuplenie.ru/promo/proforientacia', description: 'Бесплатный вебинар для учеников 7-11 классов' },
    { id: 26, title: 'День открытых дверей МГЮА', date: '2026-03-10', time: '11:00', location: 'МГЮА, Главный корпус', participants: '400', organizer: 'МГЮА', category: 'День открытых дверей', link: 'https://msal.ru/', description: 'Знакомство с юридическим университетом' },
    { id: 27, title: 'Экономический форум ВШЭ', date: '2026-04-05', time: '10:00', location: 'ВШЭ, Покровский бульвар', participants: '500', organizer: 'ВШЭ', category: 'Форум', link: 'https://www.hse.ru/', description: 'Ежегодный экономический форум с участием ведущих экспертов' },
    { id: 28, title: 'Техническая олимпиада «Бауманский призыв»', date: '2026-03-01', time: '09:00', location: 'МГТУ им. Баумана', participants: '300', organizer: 'МГТУ им. Баумана', category: 'Олимпиада', link: 'https://bmstu.ru/', description: 'Олимпиада по техническим дисциплинам для старшеклассников' },
    { id: 29, title: 'День нефти и газа', date: '2026-04-25', time: '10:00', location: 'РГУ нефти и газа им. Губкина', participants: '250', organizer: 'РГУ нефти и газа', category: 'Праздник', link: 'https://gubkin.ru/', description: 'Профессиональный праздник работников нефтегазовой отрасли' },
    { id: 30, title: 'День здоровья в Сеченовском университете', date: '2026-04-07', time: '10:00', location: 'Первый МГМУ им. Сеченова', participants: '400', organizer: 'Сеченовский Университет', category: 'Праздник', link: 'https://www.sechenov.ru/', description: 'Всемирный день здоровья' }
  ];

  const features = [
    { title: 'Поиск ВУЗов', desc: 'Найдите идеальный университет для вашего будущего', icon: <GraduationCap className="w-8 h-8" /> },
    { title: 'Карьерные направления', desc: 'Определите свою профессиональную нишу', icon: <Briefcase className="w-8 h-8" /> },
    { title: 'Мероприятия', desc: 'Участвуйте в профориентационных событиях', icon: <Calendar className="w-8 h-8" /> },
    { title: 'Интерактивная карта', desc: 'Найдите мероприятия рядом с вами', icon: <MapPin className="w-8 h-8" /> },
  ];

  const allInstitutions = [...universities, ...careerCenters];

  // Функция для обработки ответа на вопрос
  const handleAnswerSelect = (careerFieldId) => {
    setTestAnswers({
      ...testAnswers,
      [currentQuestion]: careerFieldId
    });
  };

  // Переход к следующему вопросу
  const handleNextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  // Переход к предыдущему вопросу
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Расчет результата теста
  const calculateResult = () => {
    const fieldCounts = {};
    
    Object.values(testAnswers).forEach(fieldId => {
      fieldCounts[fieldId] = (fieldCounts[fieldId] || 0) + 1;
    });

    let maxCount = 0;
    let recommendedFieldId = 1;
    
    Object.entries(fieldCounts).forEach(([fieldId, count]) => {
      if (count > maxCount) {
        maxCount = count;
        recommendedFieldId = parseInt(fieldId);
      }
    });

    const field = careerFields.find(f => f.id === recommendedFieldId);
    const profession = professions.find(p => p.careerFieldId === recommendedFieldId);
    
    setRecommendedCareerField(field);
    setRecommendedProfession(profession);
    setTestCompleted(true);
  };

  // Начать тест заново
  const restartTest = () => {
    setCurrentQuestion(0);
    setTestAnswers({});
    setTestCompleted(false);
    setRecommendedProfession(null);
    setRecommendedCareerField(null);
  };

  // Закрыть тест
  const closeTest = () => {
    setShowTest(false);
    restartTest();
  };

  // Перейти к изучению вузов для рекомендованной профессии
  const goToUniversitiesForProfession = () => {
    setShowTest(false);
    setActiveTab('universities');
    if (recommendedCareerField) {
      setSelectedSpecialty(recommendedCareerField.name.split(' ')[0]);
    }
    restartTest();
    window.scrollTo(0, 0);
  };

  // === ИСПРАВЛЕННЫЕ ФУНКЦИИ НАВИГАЦИИ ===
  // Теперь они закрывают тест при переключении
  const goToMap = () => {
    setShowTest(false);
    restartTest();
    setActiveTab('map');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToUniversities = () => {
    setShowTest(false);
    restartTest();
    setActiveTab('universities');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToCareer = () => {
    setShowTest(false);
    restartTest();
    setActiveTab('career');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const goToEvents = () => {
    setShowTest(false);
    restartTest();
    setActiveTab('events');
    setSelectedUniversity(null);
    setSelectedCareerField(null);
    window.scrollTo(0, 0);
  };

  const filteredInstitutions = allInstitutions.filter(institution => {
    const allNames = [institution.name, institution.shortName || institution.name, ...(institution.aliases || [])];
    const matchesSearch = searchQuery === '' ||
      allNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      institution.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (institution.specialties && institution.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesType = selectedType === 'Все типы' || institution.type === selectedType;
    const matchesSpecialty = selectedSpecialty === 'Все специальности' ||
      (institution.specialties && institution.specialties.includes(selectedSpecialty)) ||
      (institution.accessibility && institution.accessibility.includes(selectedSpecialty));
    const matchesCity = selectedCity === 'Москва' || institution.location.includes(selectedCity);
    const matchesPartnership = !hasPartnership || true;

    return matchesSearch && matchesType && matchesSpecialty && matchesCity && matchesPartnership;
  });

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapSearchRef.current && !mapSearchRef.current.contains(event.target)) {
        setShowMapSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const hasEvents = (date) => {
    if (!date) return false;
    const dateString = date.toISOString().split('T')[0];
    return events.some(event => event.date === dateString);
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const renderContent = () => {
    // Показываем тест вместо основного контента
    if (showTest) {
      return (
        <div className="py-8 max-w-3xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
            {!testCompleted ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                    <Brain className="w-8 h-8 mr-3 text-blue-600" />
                    Тест на профориентацию
                  </h2>
                  <button
                    onClick={closeTest}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Закрыть тест"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Прогресс бар */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Вопрос {currentQuestion + 1} из {testQuestions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Вопрос */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    {testQuestions[currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {testQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.careerFieldId)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          testAnswers[currentQuestion] === option.careerFieldId
                            ? 'border-blue-600 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            testAnswers[currentQuestion] === option.careerFieldId
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-400'
                          }`}>
                            {testAnswers[currentQuestion] === option.careerFieldId && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-gray-800 font-medium">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Кнопки навигации */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      currentQuestion === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5 inline mr-2" />
                    Назад
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={closeTest}
                      className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Выйти из теста
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={!testAnswers[currentQuestion]}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        testAnswers[currentQuestion]
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transform hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {currentQuestion === testQuestions.length - 1 ? 'Завершить тест' : 'Далее'}
                      {currentQuestion !== testQuestions.length - 1 && (
                        <ChevronRight className="w-5 h-5 inline ml-2" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Результаты теста */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Тест завершен!
                  </h2>
                  <p className="text-xl text-gray-600 mb-8">
                    На основе ваших ответов мы определили вашу предрасположенность
                  </p>
                </div>

                {recommendedCareerField && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-6 border border-blue-200">
                    <div className="text-center mb-6">
                      <span className="text-6xl mb-4 block">{recommendedCareerField.icon}</span>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {recommendedCareerField.name}
                      </h3>
                      <p className="text-gray-600">
                        {recommendedCareerField.description}
                      </p>
                    </div>

                    {recommendedProfession && (
                      <div className="bg-white/70 rounded-xl p-6 mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                          Рекомендуемая профессия
                        </h4>
                        <p className="text-xl font-bold text-blue-600 text-center mb-2">
                          {recommendedProfession.name}
                        </p>
                        <p className="text-gray-600 text-center text-sm">
                          {recommendedProfession.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={goToUniversitiesForProfession}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Изучить ВУЗы для этой профессии
                  </button>
                  <button
                    onClick={restartTest}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                  >
                    Пройти тест заново
                  </button>
                  <button
                    onClick={closeTest}
                    className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
                  >
                    Закрыть
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    // ... (остальной код renderContent остается без изменений)
    // Для краткости не включаю весь код, но он должен быть в полном файле
    
    if (selectedUniversity) {
      const isCareerCenter = careerCenters.some(center => center.id === selectedUniversity.id);
      if (isCareerCenter) {
        return (
          <div className="py-8">
            <button
              onClick={() => setSelectedUniversity(null)}
              className="flex items-center text-gray-800 mb-8 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Назад к списку
            </button>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-blue-600 mr-4" />
                <h1 className="text-4xl font-bold text-gray-800">{selectedUniversity.name}</h1>
              </div>
              <div className="space-y-4 text-gray-600 mb-8">
                <p className="text-lg"><strong>Локация:</strong> {selectedUniversity.location}</p>
                <p><strong>Возраст:</strong> {selectedUniversity.age}</p>
                <p><strong>Доступность:</strong> {selectedUniversity.accessibility}</p>
                <p><strong>Тип:</strong> {selectedUniversity.type}</p>
              </div>
              <div className="bg-gray-50/50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Описание</h3>
                <p className="text-gray-600">{selectedUniversity.description}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedUniversity.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
                >
                  Посетить сайт
                </a>
              </div>
            </div>
          </div>
        );
      }
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
                    lat: 55.7038,
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
                      {events.length}+
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
                      {universities.length}+
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowTest(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center text-white"
                    >
                      <Brain className="w-5 h-5 inline mr-2" />
                      Пройти тест на профессию
                    </button>
                    <div className="absolute -top-4 -right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                      NEW
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
                      {events.length}+ мероприятий
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
                      <h3 className="text-xl font-semibold text-gray-800">Календарь событий</h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      Интерактивный
                    </div>
                  </div>
                  <p className="text-gray-600">Планируй участие в мероприятиях</p>
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
                      {universities.length}+ ВУЗов
                    </div>
                  </div>
                  <p className="text-gray-600">Найди подходящие учебные заведения</p>
                </div>
                <div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                  onClick={() => setShowTest(true)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Brain className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-800">Пройти тестирование</h3>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1 rounded-lg text-sm font-semibold text-white">
                      5 вопросов
                    </div>
                  </div>
                  <p className="text-gray-600">Определи свою будущую профессию</p>
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
                      {careerFields.length}+ направлений
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

      // ... (остальные case для map, events, universities, career, blog остаются без изменений)
      // Для краткости не включаю их здесь, но они должны быть в полном коде
      
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
                          {['Все категории', 'Конференция', 'Мастер-класс', 'День открытых дверей', 'Фестиваль'].map((category, index) => (
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
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">📅 Календарь мероприятий</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Реальные события из ВУЗов и центров профориентации</p>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Мероприятия на {formatDate(selectedDate)}
                </h2>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md mb-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h2 className="text-xl font-bold text-gray-800">
                    {formatMonthYear(currentDate)}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentDate).map((date, index) => {
                    const dateHasEvents = hasEvents(date);
                    return (
                      <div
                        key={index}
                        onClick={() => handleDateClick(date)}
                        className={`
                          h-16 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-300 relative
                          ${date ? 'hover:bg-blue-100' : ''}
                          ${isSelected(date) ? 'bg-blue-600 text-white' : ''}
                          ${isToday(date) ? 'border-2 border-blue-500' : ''}
                          ${!date ? 'invisible' : ''}
                        `}
                      >
                        {date && (
                          <>
                            <span className="text-lg font-semibold">{date.getDate()}</span>
                            {dateHasEvents && (
                              <div className="absolute bottom-1 w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-md">
                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                  Мероприятия на {formatDate(selectedDate)}
                </h3>
                {getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-6">
                    {getEventsForDate(selectedDate).map(event => (
                      <div
                        key={event.id}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-2 ${
                                event.category === 'Конференция' ? 'bg-purple-100 text-purple-800' :
                                  event.category === 'Мастер-класс' ? 'bg-green-100 text-green-800' :
                                    event.category === 'День открытых дверей' ? 'bg-orange-100 text-orange-800' :
                                      event.category === 'Фестиваль' ? 'bg-pink-100 text-pink-800' :
                                        event.category === 'Вебинар' ? 'bg-blue-100 text-blue-800' :
                                          'bg-gray-100 text-gray-800'
                                }`}>
                                {event.category}
                              </span>
                              <span className="text-sm text-gray-500">{event.organizer}</span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                <span><strong>Дата:</strong> {new Date(event.date).toLocaleDateString('ru-RU')}</span>
                              </div>
                              <div className="flex items-center">
                                <Users2 className="w-4 h-4 mr-2 text-blue-600" />
                                <span><strong>Время:</strong> {event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                                <span><strong>Место:</strong> {event.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users2 className="w-4 h-4 mr-2 text-blue-600" />
                                <span><strong>Участников:</strong> {event.participants}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                          </div>
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 whitespace-nowrap ml-4"
                          >
                            Подробнее
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-2">Мероприятия не найдены</h3>
                    <p className="text-gray-600">На выбранную дату нет запланированных мероприятий</p>
                    <p className="text-gray-500 mt-2 text-sm">Выберите другую дату в календаре</p>
                  </div>
                )}
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md text-center">
                  <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800">{events.length}</h4>
                  <p className="text-gray-600">Всего мероприятий</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md text-center">
                  <Building2 className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800">{universities.length}</h4>
                  <p className="text-gray-600">ВУЗов-участников</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-md text-center">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="text-3xl font-bold text-gray-800">{careerCenters.length}</h4>
                  <p className="text-gray-600">Центров профориентации</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'universities':
        return (
          <div className="py-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-gray-800">🎓 ВУЗы и Центры профориентации</h1>
              <p className="text-xl text-gray-600">Найдите подходящее учебное заведение или центр для вашего будущего</p>
            </div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Найдите интересующие ВУЗы или центры..."
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
                          {['Все типы', 'Университет', 'Институт', 'Политех', 'Академия', 'Колледж', 'Центр профориентации'].map((type) => (
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
                  {filteredInstitutions.length > 0 ? (
                    filteredInstitutions.map((institution) => (
                      <div
                        key={institution.id}
                        onClick={() => setSelectedUniversity(institution)}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              {institution.type === 'Центр профориентации' ? (
                                <Target className="w-8 h-8 text-blue-600 mr-3" />
                              ) : (
                                <Building2 className="w-8 h-8 text-blue-600 mr-3" />
                              )}
                              <h3 className="text-2xl font-bold text-gray-800">{institution.name}</h3>
                            </div>
                            {institution.type === 'Центр профориентации' ? (
                              <>
                                <p className="text-gray-600 mb-2">Профориентационный центр</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {institution.location}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <UserCheck className="w-4 h-4 mr-2" />
                                    Возраст: {institution.age}
                                  </div>
                                  <div className="flex items-center text-blue-600 font-semibold">
                                    <Globe2 className="w-4 h-4 mr-2" />
                                    {institution.accessibility}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <p className="text-gray-600 mb-2">Московское учебное заведение</p>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <Globe2 className="w-4 h-4 mr-2" />
                                    {institution.location}
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Users2 className="w-4 h-4 mr-2" />
                                    {institution.students} студентов
                                  </div>
                                  <div className="flex items-center text-blue-600 font-semibold">
                                    <Award className="w-4 h-4 mr-2" />
                                    {institution.rank}
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {(institution.specialties || []).slice(0, 3).map((spec, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                      {spec}
                                    </span>
                                  ))}
                                  {(institution.specialties || []).length > 3 && (
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                      +{(institution.specialties || []).length - 3} еще
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-600 mb-2">ВУЗы и центры не найдены</h3>
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
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Популярные направления в вузах</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {universityDirections.map((direction) => {
                  const relatedField = careerFields.find(field => field.id === direction.careerFieldId);
                  return (
                    <div
                      key={direction.id}
                      onClick={() => {
                        if (relatedField) {
                          setSelectedCareerField(relatedField);
                          window.scrollTo(0, 0);
                        } else {
                          console.warn(`Не найдена сферa для направления ID: ${direction.id}`);
                        }
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
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
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Популярные профессии</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professions.map((profession) => {
                  const relatedField = careerFields.find(field => field.id === profession.careerFieldId);
                  return (
                    <div
                      key={profession.id}
                      onClick={() => {
                        if (relatedField) {
                          setSelectedCareerField(relatedField);
                          window.scrollTo(0, 0);
                        } else {
                          console.warn(`Не найдена сферa для профессии ID: ${profession.id}`);
                        }
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-blue-500 transition-all duration-300 cursor-pointer shadow-md"
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
                      setShowTest(false);
                      restartTest();
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
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                  <Hash className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                  <AtSign className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Контакты</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  matldev92@gmail.com
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  +7 (985) 739-5088
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  Долгопрудненское ш., 3, Москва
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