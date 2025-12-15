# Risk Management Application

[**English**](#english) | [**Українська**](#українська)

---

## English

### About The Project

This is a full-stack application for managing risks and categories within an organization or project. It allows users to create, view, and remove risks and their associated categories, providing a clear overview of potential issues.

### Tech Stack

- **Frontend:** React (Vite), TypeScript, Apollo Client, Material UI, TanStack Router
- **Backend:** Node.js, Fastify, GraphQL (Apollo Server), MongoDB (Mongoose)
- **Monorepo:** Turborepo, pnpm workspaces

### Getting Started

Follow these instructions to set up and run the project locally.

#### Prerequisites

- Node.js (v22 or higher)
- pnpm (v10 or higher)
- MongoDB instance (local or cloud-based, e.g., MongoDB Atlas)

#### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.development.local` inside the `apps/server` directory:
    ```
    apps/server/.env.development.local
    ```
    Add the following content to the file, replacing `<your-mongodb-connection-string>` with your actual MongoDB connection string:
    ```env
    MONGO_DATABASE_URL=<your-mongodb-connection-string>
    ```

#### Running the Application

1.  **Run the development server:**
    This command starts both the backend server and the frontend client concurrently.

    ```sh
    pnpm dev
    ```

2.  **Seed the database (Optional):**
    To populate the database with initial data (~1000 risks and ~20 categories), run the seeding script:

    ```sh
    pnpm turbo run build --filter=server
    pnpm --filter=server exec -- node dist/scripts/seed.js
    ```

3.  **Open the application:**
    - Client: [http://localhost:5173](http://localhost:5173)
    - GraphQL Playground: [http://localhost:3001/graphql](http://localhost:3001/graphql)

### Features

- **User Identification:** Simple login using only a username.
- **Category Management:** Add and remove categories.
- **Risk Management:** Add and remove risks, assigning them to categories.
- **Data Display:** Separate tables for risks and categories with pagination.
- **Risk Filtering:** Toggle to show/hide resolved risks.
- **Inline Status Update:** Change a risk's status directly from the table.
- **Confirmation for Deletion:** All destructive actions require user confirmation.
- **Database Seeding:** Script to generate a large amount of test data.

### Assumptions and Decisions

- **Authentication:** A simple username-based context is used for identifying the creator of items, as per requirements. There is no password or formal user entity.
- **UI Library:** Material UI was chosen to speed up development and provide a clean, modern interface.
- **State Management:** For routing and navigation, TanStack Router was implemented. Global state is managed via React Context and Apollo Client's cache.
- **N+1 Problem:** The backend uses `DataLoader` to batch and cache database requests, effectively solving the N+1 problem in GraphQL queries.

---

## Українська

### Про проєкт

Це full-stack застосунок для керування ризиками та категоріями в межах організації чи проєкту. Він дозволяє користувачам створювати, переглядати та видаляти ризики та пов'язані з ними категорії, забезпечуючи чіткий огляд потенційних проблем.

### Стек технологій

- **Фронтенд:** React (Vite), TypeScript, Apollo Client, Material UI, TanStack Router
- **Бекенд:** Node.js, Fastify, GraphQL (Apollo Server), MongoDB (Mongoose)
- **Монорепозиторій:** Turborepo, pnpm workspaces

### Початок роботи

Дотримуйтесь цих інструкцій, щоб налаштувати та запустити проєкт локально.

#### Необхідні умови

- Node.js (v22 або вище)
- pnpm (v10 або вище)
- Екземпляр MongoDB (локальний або хмарний, наприклад, MongoDB Atlas)

#### Встановлення та налаштування

1.  **Клонуйте репозиторій:**

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Встановіть залежності:**

    ```sh
    pnpm install
    ```

3.  **Налаштуйте змінні середовища:**
    Створіть файл `.env.development.local` у директорії `apps/server`:
    ```
    apps/server/.env.development.local
    ```
    Додайте до файлу наступний вміст, замінивши `<your-mongodb-connection-string>` на ваш рядок підключення до MongoDB:
    ```env
    MONGO_DATABASE_URL=<your-mongodb-connection-string>
    ```

#### Запуск

1.  **Запустіть сервер для розробки:**
    Ця команда одночасно запускає і бекенд-сервер, і фронтенд-клієнт.

    ```sh
    pnpm dev
    ```

2.  **Заповнення бази даних (опціонально):**
    Щоб заповнити базу даних початковими даними (~1000 ризиків та ~20 категорій), запустіть відповідний скрипт:

    ```sh
    pnpm turbo run build --filter=server
    pnpm --filter=server exec -- node dist/scripts/seed.js
    ```

3.  **Відкрийте застосунок:**
    - Клієнт: [http://localhost:5173](http://localhost:5173)
    - GraphQL Playground: [http://localhost:3001/graphql](http://localhost:3001/graphql)

### Функціонал

- **Ідентифікація користувача:** Простий вхід за допомогою імені користувача.
- **Керування категоріями:** Додавання та видалення категорій.
- **Керування ризиками:** Додавання та видалення ризиків із призначенням до категорій.
- **Відображення даних:** Окремі таблиці для ризиків та категорій з пагінацією.
- **Фільтрація ризиків:** Перемикач для відображення/приховування вирішених ризиків.
- **Оновлення статусу "на місці":** Можливість змінити статус ризику безпосередньо з таблиці.
- **Підтвердження видалення:** Усі деструктивні дії вимагають підтвердження користувача.
- **Заповнення БД:** Скрипт для генерації великої кількості тестових даних.

### Припущення та рішення

- **Автентифікація:** Згідно з вимогами, для ідентифікації автора записів використовується простий контекст на основі імені користувача. Паролі або повноцінні сутності користувачів відсутні.
- **UI бібліотека:** Material UI було обрано для прискорення розробки та створення чистого, сучасного інтерфейсу.
- **Керування станом:** Для маршрутизації та навігації реалізовано TanStack Router. Глобальний стан керується через React Context та кеш Apollo Client.
- **Проблема N+1:** На бекенді використовується `DataLoader` для пакетної обробки та кешування запитів до бази даних, що ефективно вирішує проблему N+1 у запитах GraphQL.
