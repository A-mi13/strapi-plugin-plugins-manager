'use strict';

export default {
  register(app) {
    // Регистрация ссылки в главном меню
    app.addMenuLink({
      to: '/plugins/plugins-manager',
      icon: () => '🧩',
      intlLabel: {
        id: 'plugins-manager.plugin.name',
        defaultMessage: 'Плагины и расширения',
      },
      permissions: [],
      async Component() {
        const { default: PluginsManagerPage } = await import('./admin-page');
        return PluginsManagerPage;
      },
    });
  },
  
  bootstrap(app) {
    console.log('🧩 [Plugins Manager] Admin panel bootstrap');
    
    // Добавляем глобальное скрытие иконок кастомных плагинов
    const hideCustomPluginIcons = () => {
      const customPlugins = [
        'auto-slug-manager',
        'strapi-plugin-email-designer', 
        'strapi-plugin-import-export-entries'
      ];
      
      customPlugins.forEach(pluginName => {
        // Скрываем через data-testid
        const menuItem = document.querySelector(`[data-testid="menu-item-${pluginName}"]`);
        if (menuItem) {
          menuItem.style.display = 'none';
        }
        
        // Скрываем через href
        const links = document.querySelectorAll(`a[href*="/plugins/${pluginName}"]`);
        links.forEach(link => {
          const listItem = link.closest('li');
          if (listItem) {
            listItem.style.display = 'none';
          }
        });
      });
    };
    
    // Скрываем иконки при загрузке админ панели
    setTimeout(hideCustomPluginIcons, 1000);
    
    // Скрываем повторно через интервалы
    const interval = setInterval(hideCustomPluginIcons, 3000);
    
    // Очищаем интервал через 30 секунд
    setTimeout(() => {
      clearInterval(interval);
    }, 30000);
    
    console.log('🧩 [Plugins Manager] Set up global plugin icon hiding');
  },
}; 