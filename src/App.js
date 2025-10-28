import React, { useState } from 'react';
import { Search, MapPin, Calendar, GraduationCap, Briefcase, BookOpen, User, Menu, X, ChevronRight, Star, Target, Zap, Bell, Users, BarChart3, Filter, Globe, Mail, Lock, UserPlus, Building2, Award, Users2, Globe2, AwardIcon, ArrowLeft, Settings, X as CloseIcon } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
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
  const goToMap = () => setActiveTab('map');
  const goToEvents = () => setActiveTab('events');
  const goToUniversities = () => setActiveTab('universities');
  const goToCareer = () => setActiveTab('career');

  const universities = [
    { id: 1, name: 'МГУ им. М.В. Ломоносова', location: 'Москва, Ленинские горы, д. 1', students: '40 000', rank: 'Топ-1 в России', type: 'Университет', specialties: ['IT', 'Инженерия', 'Медицина', 'Экономика', 'Право'] },
    { id: 2, name: 'МФТИ', location: 'Москва, Институтский пер., д. 9', students: '7 000', rank: 'Топ-1 в науке', type: 'Институт', specialties: ['IT', 'Инженерия', 'Физика'] },
    { id: 3, name: 'НИЯУ МИФИ', location: 'Москва, Каширское ш., д. 31', students: '12 000', rank: 'Топ-5 в инженерии', type: 'Институт', specialties: ['Инженерия', 'Физика', 'Химия'] },
    { id: 4, name: 'НИУ ВШЭ', location: 'Москва, ул. Мясницкая, д. 20', students: '28 000', rank: 'Топ-5 в России', type: 'Университет', specialties: ['Экономика', 'Право', 'Социология'] },
    { id: 5, name: 'МИСИС', location: 'Москва, Ленинский пр., д. 65', students: '10 000', rank: 'Топ-3 в инженерии', type: 'Университет', specialties: ['Инженерия', 'Материаловедение', 'Металлургия'] },
    { id: 6, name: 'РНИМУ им. Н.И. Пирогова', location: 'Москва, ул. Островитянова, д. 1', students: '15 000', rank: 'Топ-1 в медицине', type: 'Университет', specialties: ['Медицина', 'Фармация', 'Стоматология'] },
    { id: 7, name: 'МГТУ им. Н.Э. Баумана', location: 'Москва, 2-я Бауманская ул., д. 5', students: '18 000', rank: 'Топ-2 в технике', type: 'Университет', specialties: ['Инженерия', 'Механика', 'Робототехника'] },
    { id: 8, name: 'НИУ МЭИ', location: 'Москва, ул. Красноказарменная, д. 14', students: '11 000', rank: 'Топ-4 в энергетике', type: 'Университет', specialties: ['Энергетика', 'Инженерия', 'IT'] },
    { id: 9, name: 'МГИМО', location: 'Москва, ул. Пречистенка, д. 29', students: '9 000', rank: 'Топ-1 в международных отношениях', type: 'Институт', specialties: ['Международные отношения', 'Политология', 'Лингвистика'] },
    { id: 10, name: 'МГППУ', location: 'Москва, ул. Сретенка, д. 29', students: '13 000', rank: 'Топ-3 в педагогике', type: 'Университет', specialties: ['Педагогика', 'Психология', 'Образование'] },
    { id: 11, name: 'МГЛУ', location: 'Москва, ул. Воронцово поле, д. 1', students: '8 000', rank: 'Топ-1 в лингвистике', type: 'Университет', specialties: ['Лингвистика', 'Перевод', 'Филология'] },
    { id: 12, name: 'МГЮА им. О.Е. Кутафина', location: 'Москва, ул. Садовая-Кудринская, д. 9', students: '12 000', rank: 'Топ-2 в юриспруденции', type: 'Университет', specialties: ['Право', 'Юриспруденция', 'Политология'] },
    { id: 13, name: 'Финансовый университет', location: 'Москва, ул. Ленинградский пр., д. 49', students: '14 000', rank: 'Топ-3 в экономике', type: 'Университет', specialties: ['Экономика', 'Финансы', 'Менеджмент'] },
    { id: 14, name: 'РХТУ им. Д.И. Менделеева', location: 'Москва, ул. Мира, д. 26', students: '6 000', rank: 'Топ-2 в химии', type: 'Университет', specialties: ['Химия', 'Технологии', 'Материаловедение'] }
  ];

  // Фильтрация вузов
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
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

  const renderContent = () => {
    if (selectedUniversity) {
      return (
        <div className="py-8">
          <button 
            onClick={() => setSelectedUniversity(null)}
            className="flex items-center text-white mb-8 bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад к списку вузов
          </button>
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-30"></div>
              <h1 className="text-5xl font-bold relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {selectedUniversity.name}
              </h1>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center transform rotate-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl"></div>
              </div>
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center transform -rotate-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center transform rotate-12">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-green-500 rounded-lg"></div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="w-40 h-40 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl flex items-center justify-center transform rotate-6">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl"></div>
              </div>
              <div className="w-40 h-40 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center transform -rotate-12">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full"></div>
              </div>
              <div className="w-40 h-40 bg-gradient-to-br from-yellow-600 to-red-600 rounded-3xl flex items-center justify-center transform rotate-6">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-tight">
                ПрофНавигатор
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Найди свой путь в IT, инженерии, медицине...
              </p>
              <div className="flex justify-center gap-6 mb-16">
                <div className="relative">
                  <button 
                    onClick={goToMap}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <GraduationCap className="w-5 h-5 inline mr-2" />
                    Изучить ВУЗы
                  </button>
                  <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    25+
                  </div>
                </div>
              </div>
            </section>

            {/* How to Start */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Как начать использовать платформу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Найти мероприятия -> Карта */}
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

                {/* Запланировать участие -> Мероприятия */}
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

                {/* Изучить ВУЗы -> Вузы */}
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

                {/* Построить карьеру -> Карьера */}
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
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
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
                  ▶ Начать поиск
                </button>
                <button 
                  onClick={goToCareer}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  🧭 Исследовать пути
                </button>
              </div>
            </section>
          </div>
        );

      case 'map':
        return (
          <div className="py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">🗺️ Карта профориентационных мероприятий Москвы</h1>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-purple-400" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Типы</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowMapTypeDropdown(!showMapTypeDropdown)}
                      >
                        Все типы
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showMapTypeDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      
                      {showMapTypeDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все типы', 'Мастер-класс', 'Вебинар', 'Конференция'].map((type) => (
                            <div
                              key={type}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
                              onClick={() => {
                                setShowMapTypeDropdown(false);
                              }}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Категории</label>
                      <div 
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white cursor-pointer relative"
                        onClick={() => setShowMapCategoryDropdown(!showMapCategoryDropdown)}
                      >
                        Все категории
                        <ChevronRight className={`w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform ${showMapCategoryDropdown ? 'rotate-90' : ''}`} />
                      </div>
                      
                      {showMapCategoryDropdown && (
                        <div className="absolute z-20 mt-1 w-full bg-gradient-to-br from-black via-purple-900 to-cyan-500 border border-purple-700/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {['Все категории', 'IT', 'Инженерия', 'Медицина', 'Бизнес'].map((category) => (
                            <div
                              key={category}
                              className="px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-600 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:bg-clip-text cursor-pointer transition-all duration-200"
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
                      <label className="block text-sm font-medium mb-2">Дата</label>
                      <input type="date" className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="reg" className="mr-2" />
                      <label htmlFor="reg" className="text-sm">Требуется регистрация</label>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300">
                      Применить
                    </button>
                    <button className="w-full bg-gradient-to-r from-black via-purple-900 to-cyan-500 hover:from-black hover:via-purple-800 hover:to-cyan-400 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-white">
                      Сбросить
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                {/* Smart Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Найдите интересующие события и мероприятия..."
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Интерактивная карта</h3>
                    <p className="text-gray-300">Здесь будет отображаться карта с метками мероприятий</p>
                    <div className="mt-6 flex justify-center space-x-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
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
              <h1 className="text-4xl font-bold mb-2">🎓 ВУЗы и колледжи</h1>
              <p className="text-xl text-gray-300">Найдите подходящее учебное заведение для вашего будущего</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Filter className="w-5 h-5 mr-2 text-purple-400" />
                    ФИЛЬТРЫ
                  </h3>
                  <div className="space-y-4">
                    <div>
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
                          {['Все типы', 'Университет', 'Институт', 'Колледж', 'Академия'].map((type) => (
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
                    
                    <div>
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
                {/* Smart Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Найдите интересующие вузы и специальности..."
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
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
          <div className="py-20 text-center">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-4xl mx-auto">
              <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-6">💼 Карьерные возможности</h1>
              <div className="text-2xl font-semibold text-purple-400 mb-4">Раздел в разработке</div>
              <p className="text-gray-300 mb-8">Раздел с информацией о стажировках, вакансиях и карьерных путях появится здесь в ближайшее время</p>
              <div className="bg-gray-700/50 rounded-xl p-6">
                <p className="text-gray-300">Информация о возможностях трудоустройства и карьерного роста</p>
              </div>
            </div>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative">
      {/* Settings Dropdown - Outside header flow */}
      {showSettings && (
        <>
          <div 
            className="fixed inset-0 z-30"
            onClick={() => setShowSettings(false)}
          ></div>
          <div className="absolute right-4 top-20 w-64 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-xl z-40 border border-gray-700">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3 text-white">Настройки темы</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-black to-purple-900 text-white hover:from-purple-900 hover:to-purple-800 transition-all duration-200 border border-purple-700/50">
                  🌌 Galaxy (Default)
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 hover:from-gray-200 hover:to-gray-400 transition-all duration-200 border border-gray-300 shadow-inner">
                  ☀️ Light Steel
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg bg-gradient-to-r from-yellow-900 to-yellow-800 text-white hover:from-yellow-800 hover:to-yellow-700 transition-all duration-200 border border-yellow-600/50">
                  🟡 Dark gold
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Header with deep galaxy gradient */}
      <header className="bg-gradient-to-r from-black via-purple-900 via-blue-900 via-indigo-900 to-gray-900 border-b border-purple-800/50 relative overflow-hidden">
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
                      setSelectedUniversity(null);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeTab === item.id || (selectedUniversity && item.id === 'universities')
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
                        setIsMenuOpen(false);
                      }}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === item.id || (selectedUniversity && item.id === 'universities')
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
      <footer className="bg-gradient-to-r from-black via-purple-900 via-blue-900 via-indigo-900 to-gray-900 border-t border-purple-800/50 py-8 mt-auto relative overflow-hidden">
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
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 max-w-md w-full relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-purple-400" />
              Вход в аккаунт
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">📧 Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">🔑 Пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-300">Запомнить меня</label>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Войти
              </button>
              
              <div className="text-center text-gray-400 text-sm my-4">────────── или ──────────</div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  VK
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-400 space-y-2">
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
          <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 max-w-md w-full relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-green-400" />
              Создать аккаунт
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">👤 Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">📧 Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">🔑 Пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">🔒 Подтвердите пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-300">Согласен с условиями использования</label>
              </div>
              
              <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Зарегистрироваться
              </button>
              
              <div className="text-center text-gray-400 text-sm my-4">────────── или ──────────</div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  Google
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition-all duration-300">
                  VK
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-400 space-y-2">
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