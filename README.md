# 🧩 Strapi Plugin Plugins Manager

Плагин для Strapi 5, который группирует все установленные плагины в одном месте с удобным аккордеоном и автоматически скрывает иконки кастомных плагинов в сайдбаре.

## ✨ Возможности

- **Группировка плагинов по категориям**: SEO, Communication, Data Management, Content Management и др.
- **Аккордеон интерфейс**: Сворачиваемые категории для удобной навигации
- **Автоматическое скрытие иконок**: Кастомные плагины скрываются из сайдбара
- **Статус плагинов**: Отображение активных и неактивных плагинов
- **Быстрый доступ**: Переход к настройкам плагинов одним кликом
- **Адаптивный дизайн**: Современный UI с анимациями
- **Глобальное скрытие**: Работает на всех страницах админ-панели

## 🚀 Установка

### Через npm (рекомендуется)

```bash
npm i strapi-plugin-plugins-manager
# или
yarn add strapi-plugin-plugins-manager
```

### Ручная установка

1. Скопируйте папку `plugins-manager` в `src/plugins/` вашего Strapi проекта
2. Перезапустите Strapi сервер
3. Плагин автоматически появится в админ панели

## ⚙️ Конфигурация

Добавьте плагин в ваш `config/plugins.js` или `config/plugins.ts`:

```javascript
module.exports = {
  'plugins-manager': {
    enabled: true,
    resolve: './src/plugins/plugins-manager', // только для ручной установки
  },
};
```

## 📖 Использование

После установки плагин автоматически:

1. **Добавляет иконку 🧩 в сайдбар** админ-панели
2. **Скрывает иконки кастомных плагинов** из сайдбара
3. **Показывает все плагины** в удобном аккордеоне

### Кастомные плагины, которые скрываются:

- `auto-slug-manager`
- `strapi-plugin-email-designer`
- `strapi-plugin-import-export-entries`
- `page-builder`
- `plugins-manager` (сам себя)

### Системные плагины остаются видимыми:

- Content-Type Builder
- Media Library
- Settings
- Users & Permissions
- И другие системные плагины

## 🏗️ Структура проекта

```
plugins-manager/
├── admin-page.js          # React компонент админ страницы
├── strapi-admin.js        # Регистрация в админ панели
├── strapi-server.js       # Серверная часть плагина
├── server/                # Серверные файлы
│   ├── controllers/       # API контроллеры
│   ├── routes/           # API маршруты
│   └── index.js          # Серверная точка входа
├── package.json          # Метаданные пакета
└── README.md             # Документация
```

## 🔧 Настройка кастомных плагинов

Для добавления новых плагинов в список кастомных отредактируйте массив `customPlugins` в файле `server/controllers/plugins.js`:

```javascript
const customPlugins = [
  'auto-slug-manager',
  'strapi-plugin-email-designer',
  'strapi-plugin-import-export-entries',
  'plugins-manager',
  'your-custom-plugin' // добавьте ваш плагин
];
```

## 📂 Категории плагинов

Плагины автоматически группируются по категориям:

- **SEO**: Плагины для поисковой оптимизации
- **Communication**: Плагины для коммуникации (email, уведомления)
- **Data Management**: Импорт/экспорт, миграции, управление данными
- **Content Management**: Конструкторы страниц, менеджеры контента
- **Media**: Работа с медиафайлами
- **User Management**: Управление пользователями и правами
- **Performance**: Кэширование, оптимизация
- **Localization**: Интернационализация
- **Other**: Остальные плагины

## 🎨 Кастомизация

### Изменение стилей

Для изменения внешнего вида отредактируйте CSS в файле `admin-page.js`:

```javascript
// Пример изменения цветов
style.textContent = `
  .plugin-manager-header {
    background-color: #your-color;
  }
`;
```

### Добавление новых категорий

Добавьте логику определения категорий в `server/controllers/plugins.js`:

```javascript
if (pluginName.includes('your-category')) {
  category = 'Your Category';
}
```

## 🐛 Устранение неполадок

### Плагин не появляется в админ-панели

1. Проверьте, что плагин включен в `config/plugins.js`
2. Перезапустите Strapi сервер
3. Очистите кэш браузера

### Иконки плагинов не скрываются

1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что плагин добавлен в массив `customPlugins`
3. Проверьте, что скрипт скрытия загружается (должны быть сообщения в консоли)

### Проблемы с производительностью

1. Уменьшите интервал проверки в `admin-page.js` (по умолчанию 1000мс)
2. Отключите DOM observer, если не нужен

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🙏 Благодарности

- [Strapi](https://strapi.io/) за отличную платформу
- Сообществу Strapi за вдохновение

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- Создайте [Issue](https://github.com/A-mi13/strapi-plugin-plugins-manager/issues)
- Напишите на email: [alec-c13@yandex.ru](mailto:alec-c13@yandex.ru)

---

**Сделано с ❤️ для сообщества Strapi** 