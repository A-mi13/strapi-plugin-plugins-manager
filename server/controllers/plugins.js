'use strict';

module.exports = {
  async getPlugins(ctx) {
    try {
      // Получаем все установленные плагины из Strapi
      const plugins = strapi.plugins;
      const pluginsList = [];
      
      console.log('🧩 [Plugins Manager] Available plugins:', Object.keys(plugins));
      
      // Список кастомных плагинов, которые должны отображаться в менеджере
      const customPlugins = [
        'auto-slug-manager',
        'strapi-plugin-email-designer',
        'strapi-plugin-import-export-entries',
        'plugins-manager', // наш собственный плагин
        'page-builder' // плагин для построения страниц
      ];
      
      // Проходим только по кастомным плагинам
      Object.keys(plugins).forEach(pluginName => {
        // Пропускаем системные плагины, показываем только кастомные
        if (!customPlugins.includes(pluginName)) {
          console.log(`🧩 [Plugins Manager] Skipped system plugin: ${pluginName}`);
          return;
        }
        
        const plugin = plugins[pluginName];
        
        // Получаем информацию о плагине
        const packageInfo = plugin.package || {};
        const strapiInfo = packageInfo.strapi || {};
        
        // Определяем категорию плагина
        let category = 'Other';
        if (pluginName.includes('email') || pluginName.includes('notification') || pluginName.includes('mail')) {
          category = 'Communication';
        } else if (pluginName.includes('slug') || pluginName.includes('seo') || pluginName.includes('url')) {
          category = 'SEO';
        } else if (pluginName.includes('import') || pluginName.includes('export') || pluginName.includes('migration') || pluginName.includes('data')) {
          category = 'Data Management';
        } else if (pluginName.includes('media') || pluginName.includes('image') || pluginName.includes('file') || pluginName.includes('upload')) {
          category = 'Media';
        } else if (pluginName.includes('user') || pluginName.includes('role') || pluginName.includes('permission') || pluginName.includes('auth')) {
          category = 'User Management';
        } else if (pluginName.includes('content') || pluginName.includes('type') || pluginName.includes('builder') || pluginName.includes('manager')) {
          category = 'Content Management';
        } else if (pluginName.includes('cache') || pluginName.includes('performance')) {
          category = 'Performance';
        } else if (pluginName.includes('i18n') || pluginName.includes('internationalization')) {
          category = 'Localization';
        }
        
        // Создаем объект плагина
        const pluginInfo = {
          id: pluginName,
          name: strapiInfo.displayName || packageInfo.name || pluginName,
          description: strapiInfo.description || packageInfo.description || 'Описание недоступно',
          enabled: true, // Все установленные плагины считаем активными
          to: `/admin/plugins/${pluginName}`,
          category: category,
          version: packageInfo.version || '1.0.0'
        };
        
        pluginsList.push(pluginInfo);
        console.log(`🧩 [Plugins Manager] Added custom plugin: ${pluginName} (${category})`);
      });
      
      // Сортируем по категориям и названиям
      pluginsList.sort((a, b) => {
        if (a.category === b.category) {
          return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
      });
      
      ctx.body = {
        plugins: pluginsList,
        total: pluginsList.length
      };
      
      console.log(`🧩 [Plugins Manager] Returned ${pluginsList.length} plugins`);
      
    } catch (error) {
      console.error('🧩 [Plugins Manager] Error getting plugins:', error);
      ctx.status = 500;
      ctx.body = { 
        error: 'Ошибка получения списка плагинов',
        details: error.message 
      };
    }
  },
}; 