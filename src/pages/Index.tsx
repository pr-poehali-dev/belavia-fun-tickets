import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Flight {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  duration: string;
}

const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  const [flights] = useState<Flight[]>([
    { id: '1', from: 'Минск', to: 'Москва', date: '2026-02-15', time: '10:30', price: 150, seats: 45, duration: '1ч 45м' },
    { id: '2', from: 'Минск', to: 'Стамбул', date: '2026-02-16', time: '14:00', price: 280, seats: 32, duration: '3ч 20м' },
    { id: '3', from: 'Минск', to: 'Дубай', date: '2026-02-18', time: '08:15', price: 450, seats: 18, duration: '5ч 30м' },
    { id: '4', from: 'Минск', to: 'Париж', date: '2026-02-20', time: '16:45', price: 320, seats: 28, duration: '3ч 10м' },
    { id: '5', from: 'Минск', to: 'Тель-Авив', date: '2026-02-22', time: '11:20', price: 380, seats: 12, duration: '4ч 15м' },
  ]);

  const handleAdminLogin = () => {
    if (adminPassword === 'adminb') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setActiveTab('admin');
      toast({
        title: 'Успешный вход',
        description: 'Добро пожаловать в админ-панель',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Неверный пароль',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-orange-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-xl p-2">
                <Icon name="Plane" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">Belavia</h1>
                <p className="text-xs text-muted-foreground">Национальный авиаперевозчик</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('home')}>
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('flights')}>
                <Icon name="Plane" className="mr-2" size={18} />
                Рейсы
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('faq')}>
                <Icon name="HelpCircle" className="mr-2" size={18} />
                FAQ
              </Button>
              {!isAdmin && (
                <Button variant="outline" onClick={() => setShowAdminLogin(true)}>
                  <Icon name="Lock" className="mr-2" size={18} />
                  Админ
                </Button>
              )}
              {isAdmin && (
                <Button variant="default" onClick={() => setActiveTab('admin')}>
                  <Icon name="Settings" className="mr-2" size={18} />
                  Панель
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-600 text-white p-12 md:p-20">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Icon name="Plane" size={400} className="transform rotate-12" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Летайте с Belavia
                </h2>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  Комфорт, надёжность и лучшие цены на авиабилеты
                </p>
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Icon name="Search" className="mr-2" size={20} />
                  Найти рейс
                </Button>
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6 text-center">Популярные направления</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {flights.slice(0, 3).map((flight) => (
                  <Card key={flight.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{flight.to}</span>
                        <Icon name="MapPin" className="text-primary" size={24} />
                      </CardTitle>
                      <CardDescription className="text-base">из {flight.from}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Calendar" size={16} className="text-muted-foreground" />
                        <span>{new Date(flight.date).toLocaleDateString('ru-RU')}</span>
                        <Icon name="Clock" size={16} className="text-muted-foreground ml-2" />
                        <span>{flight.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold text-primary">${flight.price}</p>
                          <p className="text-xs text-muted-foreground">{flight.duration}</p>
                        </div>
                        <Button className="bg-secondary hover:bg-secondary/90">
                          Купить
                          <Icon name="ArrowRight" className="ml-2" size={18} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-8 text-center">Почему выбирают Belavia?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Shield" className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold">Безопасность</h4>
                  <p className="text-muted-foreground">Современный флот и высокие стандарты безопасности</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Clock" className="text-secondary" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold">Пунктуальность</h4>
                  <p className="text-muted-foreground">Вылеты точно по расписанию</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="DollarSign" className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-semibold">Выгодные цены</h4>
                  <p className="text-muted-foreground">Специальные предложения каждую неделю</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'flights' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Доступные рейсы</h2>
              <div className="flex gap-2">
                <Input placeholder="Поиск..." className="w-64" />
                <Button variant="outline">
                  <Icon name="Filter" size={18} />
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-2xl font-bold">{flight.from}</h3>
                          <Icon name="ArrowRight" className="text-primary" size={24} />
                          <h3 className="text-2xl font-bold">{flight.to}</h3>
                          <Badge variant="secondary">{flight.duration}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {new Date(flight.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {flight.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Users" size={14} />
                            {flight.seats} мест
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">${flight.price}</p>
                          <p className="text-xs text-muted-foreground">за человека</p>
                        </div>
                        <Button size="lg" className="bg-secondary hover:bg-secondary/90">
                          Забронировать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Как забронировать билет?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Выберите нужный рейс в разделе "Рейсы", нажмите кнопку "Забронировать" и следуйте инструкциям. 
                  Оплата принимается картами всех банков.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Можно ли вернуть билет?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, возврат возможен не позднее чем за 24 часа до вылета. Комиссия за возврат составляет 10% от стоимости билета.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Какой багаж можно взять?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Ручная кладь до 8 кг бесплатно. Багаж до 23 кг включён в стоимость билета. 
                  Дополнительный багаж оплачивается отдельно при регистрации.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Как зарегистрироваться на рейс?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Онлайн-регистрация открывается за 24 часа до вылета на нашем сайте. 
                  Также можно зарегистрироваться в аэропорту за 2 часа до вылета.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Есть ли программа лояльности?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да! Накапливайте мили при каждом полёте и обменивайте их на бесплатные билеты, 
                  повышение класса обслуживания и другие бонусы.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {activeTab === 'admin' && isAdmin && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Панель администратора</h2>
              <Button variant="destructive" onClick={() => { setIsAdmin(false); setActiveTab('home'); }}>
                <Icon name="LogOut" className="mr-2" size={18} />
                Выйти
              </Button>
            </div>

            <Tabs defaultValue="flights" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="flights">Рейсы</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
                <TabsTrigger value="create">Создать рейс</TabsTrigger>
              </TabsList>

              <TabsContent value="flights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление рейсами</CardTitle>
                    <CardDescription>Редактирование существующих рейсов</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {flights.map((flight) => (
                        <div key={flight.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div>
                            <p className="font-semibold">{flight.from} → {flight.to}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(flight.date).toLocaleDateString('ru-RU')} в {flight.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold">${flight.price}</p>
                              <p className="text-xs text-muted-foreground">{flight.seats} мест</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Icon name="Edit" size={16} />
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Всего рейсов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold">{flights.length}</p>
                        <Icon name="Plane" className="text-primary" size={32} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Доступно мест</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold">{flights.reduce((sum, f) => sum + f.seats, 0)}</p>
                        <Icon name="Users" className="text-secondary" size={32} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Средняя цена</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold">
                          ${Math.round(flights.reduce((sum, f) => sum + f.price, 0) / flights.length)}
                        </p>
                        <Icon name="DollarSign" className="text-primary" size={32} />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Популярные направления</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {flights.slice(0, 5).map((flight, index) => (
                        <div key={flight.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{index + 1}</span>
                            </div>
                            <span className="font-medium">{flight.to}</span>
                          </div>
                          <span className="text-muted-foreground">{flight.seats} мест</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Создать новый рейс</CardTitle>
                    <CardDescription>Добавьте новый рейс в расписание</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Откуда</label>
                        <Input placeholder="Минск" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Куда</label>
                        <Input placeholder="Париж" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Дата</label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Время</label>
                        <Input type="time" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Цена ($)</label>
                        <Input type="number" placeholder="299" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Количество мест</label>
                        <Input type="number" placeholder="150" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Длительность</label>
                        <Input placeholder="2ч 30м" />
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="Plus" className="mr-2" size={18} />
                      Создать рейс
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Plane" size={24} />
                <h3 className="text-xl font-bold">Belavia</h3>
              </div>
              <p className="text-sm text-slate-400">
                Национальный авиаперевозчик Беларуси
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>О нас</li>
                <li>Новости</li>
                <li>Вакансии</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>FAQ</li>
                <li>Контакты</li>
                <li>Поддержка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>+375 17 220 25 55</p>
                <p>info@belavia.by</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            © 2026 Belavia. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вход в админ-панель</DialogTitle>
            <DialogDescription>Введите пароль для доступа</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="password"
              placeholder="Пароль"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <Button className="w-full" onClick={handleAdminLogin}>
              <Icon name="LogIn" className="mr-2" size={18} />
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
