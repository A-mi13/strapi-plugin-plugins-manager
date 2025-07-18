import React, { useState, useEffect } from 'react';

const PluginsManagerPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlugins();
    // Глобальное скрытие иконок плагинов
    setupGlobalPluginHiding();
    // Загружаем глобальный скрипт для скрытия иконок
    loadGlobalHidingScript();
  }, []);

  const loadGlobalHidingScript = () => {
    // Проверяем, не загружен ли уже скрипт
    if (window.globalPluginHidingLoaded) {
      return;
    }
    
    // Создаем и загружаем глобальный скрипт
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        if (window.globalPluginHidingLoaded) return;
        window.globalPluginHidingLoaded = true;
        
        console.log('🧩 [Global Plugin Hiding] Script loaded');
        
        function hideCustomPluginIcons() {
          const customPlugins = [
            'auto-slug-manager',
            'strapi-plugin-email-designer', 
            'strapi-plugin-import-export-entries',
            'page-builder'
          ];
          
          console.log('🧩 [Global Plugin Hiding] Hiding custom plugin icons...');
          
          customPlugins.forEach(pluginName => {
            // Скрываем через data-testid
            const menuItem = document.querySelector('[data-testid="menu-item-' + pluginName + '"]');
            if (menuItem) {
              menuItem.style.display = 'none';
            }
            
            // Скрываем через href
            const links = document.querySelectorAll('a[href*="/plugins/' + pluginName + '"]');
            links.forEach(link => {
              const listItem = link.closest('li');
              if (listItem) {
                listItem.style.display = 'none';
              }
            });
            
            // Дополнительная логика для page-builder
            if (pluginName === 'page-builder') {
              console.log('🧩 [Global Plugin Hiding] Processing page-builder...');
              
              const pageBuilderSelectors = [
                '[data-testid*="page-builder"]',
                '[data-testid*="pagebuilder"]',
                '[data-testid*="wecre8websites"]',
                '[data-testid*="strapi-page-builder"]',
                'a[href*="/plugins/page-builder"]',
                'a[href*="/plugins/pagebuilder"]',
                'a[href*="/plugins/wecre8websites"]',
                'a[href*="/plugins/strapi-page-builder"]'
              ];
              
              pageBuilderSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                  console.log('🧩 [Global Plugin Hiding] Found page-builder elements with selector:', selector, elements.length);
                }
                elements.forEach(element => {
                  // Более агрессивное скрытие
                  element.style.display = 'none';
                  element.style.visibility = 'hidden';
                  element.style.opacity = '0';
                  element.style.position = 'absolute';
                  element.style.left = '-9999px';
                  
                  // Скрываем родительские элементы
                  const listItem = element.closest('li');
                  if (listItem) {
                    listItem.style.display = 'none';
                    listItem.style.visibility = 'hidden';
                    listItem.style.opacity = '0';
                    listItem.style.position = 'absolute';
                    listItem.style.left = '-9999px';
                  }
                  
                  // Скрываем только ближайший li родитель
                  const listItem = element.closest('li');
                  if (listItem) {
                    listItem.style.display = 'none';
                    listItem.style.visibility = 'hidden';
                  }
                  
                  // Удаляем элемент из DOM как последний вариант
                  setTimeout(() => {
                    if (element.parentElement) {
                      element.parentElement.removeChild(element);
                    }
                  }, 100);
                });
              });
              
              // Ищем по тексту в ссылках - только для page-builder
              const allLinks = document.querySelectorAll('a');
              allLinks.forEach(link => {
                if (link.textContent && (
                  link.textContent.toLowerCase().includes('page builder') ||
                  link.textContent.toLowerCase().includes('page-builder') ||
                  link.textContent.toLowerCase().includes('pagebuilder') ||
                  link.textContent.toLowerCase().includes('wecre8websites')
                ) && link.href && link.href.includes('/plugins/')) {
                  console.log('🧩 [Global Plugin Hiding] Found page-builder link by text:', link.textContent);
                  
                  // Более агрессивное скрытие для ссылок
                  link.style.display = 'none';
                  link.style.visibility = 'hidden';
                  link.style.opacity = '0';
                  link.style.position = 'absolute';
                  link.style.left = '-9999px';
                  link.style.pointerEvents = 'none';
                  link.style.width = '0';
                  link.style.height = '0';
                  link.style.overflow = 'hidden';
                  
                  const listItem = link.closest('li');
                  if (listItem) {
                    listItem.style.display = 'none';
                    listItem.style.visibility = 'hidden';
                    listItem.style.opacity = '0';
                    listItem.style.position = 'absolute';
                    listItem.style.left = '-9999px';
                    listItem.style.pointerEvents = 'none';
                    listItem.style.width = '0';
                    listItem.style.height = '0';
                    listItem.style.overflow = 'hidden';
                  }
                  
                  // Удаляем элемент из DOM как последний вариант
                  setTimeout(() => {
                    if (link.parentElement) {
                      link.parentElement.removeChild(link);
                    }
                  }, 100);
                }
              });
              
              // Ищем все элементы с data-testid, содержащие "page" или "builder"
              const allElementsWithTestId = document.querySelectorAll('[data-testid]');
              allElementsWithTestId.forEach(element => {
                const testId = element.getAttribute('data-testid');
                if (testId && (
                  testId.toLowerCase().includes('page') ||
                  testId.toLowerCase().includes('builder') ||
                  testId.toLowerCase().includes('wecre8websites')
                )) {
                  console.log('🧩 [Global Plugin Hiding] Found potential page-builder element:', testId);
                  // Не скрываем сразу, только логируем для отладки
                }
              });
            }
          });
        }
        
        // Скрываем сразу
        hideCustomPluginIcons();
        
        // Скрываем повторно через интервалы
        const interval = setInterval(hideCustomPluginIcons, 1000);
        
        // Наблюдаем за изменениями в DOM
        const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              hideCustomPluginIcons();
            }
          });
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        console.log('🧩 [Global Plugin Hiding] Observer and interval set up');
      })();
    `;
    
    document.head.appendChild(script);
    console.log('🧩 [Plugins Manager] Global hiding script loaded');
  };

  const setupGlobalPluginHiding = () => {
    // Добавляем глобальные CSS правила для скрытия кастомных плагинов
    if (!document.getElementById('global-plugin-hiding-styles')) {
      const style = document.createElement('style');
      style.id = 'global-plugin-hiding-styles';
      style.textContent = `
        /* Глобальное скрытие кастомных плагинов во всей админ-панели */
        [data-testid="menu-item-auto-slug-manager"],
        [data-testid="menu-item-strapi-plugin-email-designer"],
        [data-testid="menu-item-strapi-plugin-import-export-entries"],
        [data-testid="menu-item-page-builder"],
        [data-testid*="page-builder"],
        [data-testid*="pagebuilder"],
        [data-testid*="wecre8websites"],
        [data-testid*="strapi-page-builder"],
        [data-testid="menu-item-wecre8websites"],
        [data-testid="menu-item-strapi-page-builder"],
        /* Альтернативные селекторы для кастомных плагинов */
        a[href*="/plugins/auto-slug-manager"],
        a[href*="/plugins/strapi-plugin-email-designer"],
        a[href*="/plugins/strapi-plugin-import-export-entries"],
        a[href*="/plugins/page-builder"],
        a[href*="/plugins/pagebuilder"],
        a[href*="/plugins/wecre8websites"],
        a[href*="/plugins/strapi-page-builder"],
        a[href*="page-builder"],
        a[href*="pagebuilder"],
        a[href*="wecre8websites"],
        a[href*="strapi-page-builder"],
        /* Скрываем через родительские элементы */
        li:has(a[href*="/plugins/page-builder"]),
        li:has(a[href*="/plugins/pagebuilder"]),
        li:has(a[href*="/plugins/wecre8websites"]),
        li:has(a[href*="/plugins/strapi-page-builder"]),
        li:has([data-testid*="page-builder"]),
        li:has([data-testid*="pagebuilder"]),
        li:has([data-testid*="wecre8websites"]),
        li:has([data-testid*="strapi-page-builder"]),
        li:has(a[href*="/plugins/auto-slug-manager"]),
        li:has(a[href*="/plugins/strapi-plugin-email-designer"]),
        li:has(a[href*="/plugins/strapi-plugin-import-export-entries"]),
        /* Агрессивное скрытие page-builder с дополнительными свойствами */
        [data-testid*="page-builder"],
        [data-testid*="pagebuilder"],
        [data-testid*="wecre8websites"],
        [data-testid*="strapi-page-builder"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          position: absolute !important;
          left: -9999px !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
      console.log('🧩 [Plugins Manager] Added global CSS for hiding custom plugin icons');
    }
    
    // Глобальная функция для скрытия иконок через JavaScript
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
        }
        
        // Скрываем через href
        const links = document.querySelectorAll(`a[href*="/plugins/${pluginName}"]`);
        links.forEach(link => {
          const listItem = link.closest('li');
          if (listItem) {
            listItem.style.display = 'none';
          }
        });
        
        // Дополнительная логика для page-builder
        if (pluginName === 'page-builder') {
          // Ищем по различным вариантам названия
          const pageBuilderSelectors = [
            '[data-testid*="page-builder"]',
            '[data-testid*="pagebuilder"]',
            '[data-testid*="wecre8websites"]',
            '[data-testid*="strapi-page-builder"]',
            'a[href*="page-builder"]',
            'a[href*="pagebuilder"]',
            'a[href*="wecre8websites"]',
            'a[href*="strapi-page-builder"]',
            'a[href*="/plugins/page-builder"]',
            'a[href*="/plugins/pagebuilder"]',
            'a[href*="/plugins/wecre8websites"]',
            'a[href*="/plugins/strapi-page-builder"]'
          ];
          
          pageBuilderSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
              // Агрессивное скрытие
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.opacity = '0';
              element.style.position = 'absolute';
              element.style.left = '-9999px';
              element.style.pointerEvents = 'none';
              element.style.width = '0';
              element.style.height = '0';
              element.style.overflow = 'hidden';
              
              const listItem = element.closest('li');
              if (listItem) {
                listItem.style.display = 'none';
                listItem.style.visibility = 'hidden';
                listItem.style.opacity = '0';
                listItem.style.position = 'absolute';
                listItem.style.left = '-9999px';
                listItem.style.pointerEvents = 'none';
                listItem.style.width = '0';
                listItem.style.height = '0';
                listItem.style.overflow = 'hidden';
              }
            });
          });
          
          // Ищем по тексту в ссылках
          const allLinks = document.querySelectorAll('a');
          allLinks.forEach(link => {
            if (link.textContent && (
              link.textContent.toLowerCase().includes('page builder') ||
              link.textContent.toLowerCase().includes('page-builder') ||
              link.textContent.toLowerCase().includes('pagebuilder') ||
              link.textContent.toLowerCase().includes('wecre8websites')
            )) {
              const listItem = link.closest('li');
              if (listItem) {
                listItem.style.display = 'none';
                listItem.style.visibility = 'hidden';
                listItem.style.opacity = '0';
                listItem.style.position = 'absolute';
                listItem.style.left = '-9999px';
                listItem.style.pointerEvents = 'none';
                listItem.style.width = '0';
                listItem.style.height = '0';
                listItem.style.overflow = 'hidden';
              }
            }
          });
        }
      });
    };
    
    // Скрываем сразу
    hideCustomPluginIcons();
    
    // Скрываем повторно через интервалы (на случай динамической загрузки)
    const interval = setInterval(hideCustomPluginIcons, 1000);
    
    // Очищаем интервал через 30 секунд, но продолжаем проверять при изменениях DOM
    setTimeout(() => {
      clearInterval(interval);
      
      // Наблюдаем за изменениями в DOM и скрываем иконки при появлении новых
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            hideCustomPluginIcons();
          }
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      console.log('🧩 [Plugins Manager] Set up DOM observer for plugin icon hiding');
    }, 30000);
    
    console.log('🧩 [Plugins Manager] Set up global plugin icon hiding');
  };

  const hidePluginIcons = () => {
    // Эта функция теперь только для локального скрытия на странице менеджера
    // Глобальное скрытие уже настроено в setupGlobalPluginHiding
    console.log('🧩 [Plugins Manager] Local plugin icon hiding (global already active)');
  };

  const fetchPlugins = async () => {
    try {
      // Получаем список всех установленных плагинов через наш API
      const response = await fetch('/plugins-manager/plugins');
      const data = await response.json();
      
      if (data.plugins) {
        setPlugins(data.plugins);
      } else {
        // Fallback на статичный список кастомных плагинов, если API недоступен
        const pluginsList = [
          {
            id: 'auto-slug-manager',
            name: 'Auto Slug Manager',
            description: 'Универсальный генератор слагов для всех content-types',
            enabled: true,
            to: '/admin/plugins/auto-slug-manager',
            category: 'SEO'
          },
          {
            id: 'strapi-plugin-email-designer',
            name: 'Email Designer',
            description: 'Визуальный редактор email шаблонов',
            enabled: false,
            category: 'Communication'
          },
          {
            id: 'strapi-plugin-import-export-entries',
            name: 'Import/Export',
            description: 'Импорт и экспорт записей',
            enabled: false,
            category: 'Data Management'
          },
          {
            id: 'page-builder',
            name: 'Page Builder',
            description: 'Конструктор страниц с визуальным редактором',
            enabled: true,
            to: '/admin/plugins/page-builder',
            category: 'Content Management'
          }
        ];
        setPlugins(pluginsList);
      }
    } catch (error) {
      console.error('Ошибка загрузки плагинов:', error);
      // Fallback на статичный список кастомных плагинов при ошибке
      const pluginsList = [
        {
          id: 'auto-slug-manager',
          name: 'Auto Slug Manager',
          description: 'Универсальный генератор слагов для всех content-types',
          enabled: true,
          to: '/admin/plugins/auto-slug-manager',
          category: 'SEO'
        }
      ];
      setPlugins(pluginsList);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = () => setIsOpen(!isOpen);

  const getPluginsByCategory = () => {
    const categories = {};
    
    plugins.forEach(plugin => {
      const category = plugin.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(plugin);
    });

    return categories;
  };

  const categories = getPluginsByCategory();

  return React.createElement('div', {
    style: {
      padding: '1rem',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  },
    // Заголовок страницы
    React.createElement('div', {
      style: {
        marginBottom: '2rem',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #e2e8f0'
      }
    },
      React.createElement('h1', {
        style: {
          color: '#1e40af',
          marginBottom: '0.5rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }
      }, '🧩 Менеджер плагинов'),
      React.createElement('p', {
        style: {
          color: '#64748b',
          fontSize: '1.1rem',
          margin: 0
        }
      }, 'Управление всеми установленными плагинами и расширениями')
    ),

    // Заголовок аккордеона
    React.createElement('div', {
      onClick: toggleAccordion,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.5rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        cursor: 'pointer',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        marginBottom: isOpen ? '1rem' : '0',
        userSelect: 'none'
      }
    },
      React.createElement('span', {
        style: {
          fontSize: '24px',
          color: '#6366f1'
        }
      }, '🧩'),
      React.createElement('span', {
        style: {
          fontSize: '1.1rem',
          fontWeight: '600',
          color: '#1f2937'
        }
      }, 'Плагины и расширения'),
      React.createElement('span', {
        style: {
          marginLeft: 'auto',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          fontSize: '1.2rem',
          color: '#6b7280'
        }
      }, '▼')
    ),

    // Содержимое аккордеона
    isOpen && React.createElement('div', {
      style: {
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }
    },
      loading ? 
        React.createElement('div', {
          style: {
            padding: '2rem',
            textAlign: 'center',
            color: '#6b7280'
          }
        }, 'Загрузка плагинов...') :
        
        plugins.length === 0 ?
          React.createElement('div', {
            style: {
              padding: '2rem',
              textAlign: 'center',
              color: '#6b7280'
            }
          }, 'Плагины не найдены') :
          
          Object.entries(categories).map(([category, categoryPlugins]) => 
            React.createElement('div', { key: category },
              // Заголовок категории
              React.createElement('div', {
                onClick: () => setSelectedCategory(selectedCategory === category ? null : category),
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem 1.5rem',
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  userSelect: 'none'
                }
              },
                React.createElement('span', {
                  style: {
                    fontSize: '16px',
                    color: '#6366f1',
                    marginRight: '0.5rem',
                    transform: selectedCategory === category ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }
                }, '▶'),
                React.createElement('span', {
                  style: {
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#374151'
                  }
                }, `${category} (${categoryPlugins.length})`)
              ),

              // Плагины в категории
              selectedCategory === category && React.createElement('div', null,
                categoryPlugins.map((plugin, index) => 
                  React.createElement('div', {
                    key: plugin.id,
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.5rem',
                      borderBottom: index < categoryPlugins.length - 1 ? '1px solid #f1f5f9' : 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    },
                    onClick: () => {
                      if (plugin.to) {
                        window.location.href = plugin.to;
                      }
                    },
                    onMouseEnter: (e) => {
                      e.target.style.backgroundColor = '#f8fafc';
                    },
                    onMouseLeave: (e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  },
                    // Иконка плагина
                    React.createElement('div', {
                      style: {
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }
                    }, '⚙️'),

                    // Информация о плагине
                    React.createElement('div', {
                      style: { flex: 1 }
                    },
                      React.createElement('div', {
                        style: {
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          color: '#1f2937',
                          marginBottom: '0.25rem'
                        }
                      }, plugin.name),
                      plugin.description && React.createElement('div', {
                        style: {
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }
                      }, plugin.description)
                    ),

                    // Статус плагина
                    React.createElement('div', {
                      style: {
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        backgroundColor: plugin.enabled ? '#dcfce7' : '#fef2f2',
                        color: plugin.enabled ? '#166534' : '#dc2626',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }
                    }, plugin.enabled ? 'Активен' : 'Неактивен')
                  )
                )
              )
            )
          )
    )
  );
};

export default PluginsManagerPage; 