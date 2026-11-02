# Task Manager — React + TypeScript

Перенос исходного Task Manager с native JavaScript на React + TypeScript.

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
```

## Что перенесено

- создание задач;
- проверка пустого названия;
- проверка дублей;
- окно установки срока;
- дни / часы / минуты;
- отображение дедлайна;
- удаление с подтверждением;
- Drag & Drop между тремя колонками;
- Drag & Drop внутри колонок;
- сохранение задач в localStorage;
- тёмная тема.

В исходном архиве PHP-файлы `save-task.php` и `get-tasks.php` отсутствовали, поэтому текущая React-версия использует localStorage. API можно подключить отдельно, не меняя компоненты интерфейса.
