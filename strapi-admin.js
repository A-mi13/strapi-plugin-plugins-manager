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
        'strapi-plugin-import-export-entries',
        'page-builder'
      ];
      
      customPlugins.forEach(pluginName => {
        // Скрываем через data-testid
        const menuItem = document.querySelector(`[data-testid="menu-item-${pluginName}"]`);
        if (menuItem) {
          menuItem.style.display = 'none';
          menuItem.style.visibility = 'hidden';
          menuItem.style.opacity = '0';
          menuItem.style.position = 'absolute';
          menuItem.style.left = '-9999px';
          menuItem.style.pointerEvents = 'none';
        }
        
        // Скрываем через href
        const links = document.querySelectorAll(`a[href*="/plugins/${pluginName}"]`);
        links.forEach(link => {
          const listItem = link.closest('li');
          if (listItem) {
            listItem.style.display = 'none';
            listItem.style.visibility = 'hidden';
            listItem.style.opacity = '0';
            listItem.style.position = 'absolute';
            listItem.style.left = '-9999px';
            listItem.style.pointerEvents = 'none';
          }
        });
        
        // Дополнительная логика для page-builder
        if (pluginName === 'page-builder') {
          const pageBuilderSelectors = [
            '[data-testid*="page-builder"]',
            '[data-testid*="pagebuilder"]',
            '[data-testid*="wecre8websites"]',
            '[data-testid*="strapi-page-builder"]',
            'a[href*="page-builder"]',
            'a[href*="pagebuilder"]',
            'a[href*="wecre8websites"]',
            'a[href*="strapi-page-builder"]'
          ];
          
          pageBuilderSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.opacity = '0';
              element.style.position = 'absolute';
              element.style.left = '-9999px';
              element.style.pointerEvents = 'none';
              
              const listItem = element.closest('li');
              if (listItem) {
                listItem.style.display = 'none';
                listItem.style.visibility = 'hidden';
                listItem.style.opacity = '0';
                listItem.style.position = 'absolute';
                listItem.style.left = '-9999px';
                listItem.style.pointerEvents = 'none';
              }
            });
          });
        }
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