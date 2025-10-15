# Aplikacja Next.js z Auth.js i Next-Admin

Kompletna aplikacja Next.js z systemem autentykacji, zarządzaniem rolami i panelem administracyjnym.

## 🚀 Funkcje

- ✅ **Autentykacja** - Next-Auth.js (Auth.js) z credentials provider
- ✅ **Role użytkowników** - System ról (USER / ADMIN)
- ✅ **Panel Admin** - Next-Admin z CRUD dla użytkowników i produktów
- ✅ **Baza PostgreSQL** - Neon Database z Prisma ORM
- ✅ **TypeScript** - Pełne typowanie
- ✅ **Tailwind CSS** - Nowoczesny styling
- ✅ **Middleware** - Ochrona route'ów

## 📋 Wymagania

- Node.js 18+
- Konto Neon Database (PostgreSQL)
- Konto GitHub (opcjonalne, do deploymentu)
- Konto Vercel (opcjonalne, do hostingu)

## 🛠️ Instalacja (lokalnie)

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/lazaq123456/apaktest.git
   cd apaktest
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe:**
   
   Utwórz plik `.env` w głównym katalogu:
   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Uruchom migrację bazy danych:**
   ```bash
   npm run db:push
   ```

5. **Wypełnij bazę przykładowymi danymi:**
   ```bash
   npm run db:seed
   ```

6. **Uruchom aplikację:**
   ```bash
   npm run dev
   ```

Aplikacja będzie dostępna pod adresem: **http://localhost:3000**

## 👤 Testowe konta

Po wykonaniu seed bazy danych dostępne są następujące konta:

- **Admin:** 
  - Email: `admin@example.com`
  - Hasło: `admin123`
  - Dostęp: Dashboard + Panel Admin

- **Użytkownik:**
  - Email: `user@example.com`
  - Hasło: `user123`
  - Dostęp: Tylko Dashboard

## 📁 Struktura projektu

```
/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth API routes
│   │   └── products/              # API dla produktów (CRUD)
│   ├── auth/signin/               # Strona logowania
│   ├── dashboard/                 # Dashboard użytkownika
│   ├── admin/[[...nextadmin]]/    # Panel administracyjny
│   └── page.tsx                   # Główna strona (redirect)
├── lib/
│   ├── auth.ts                    # Helper functions autoryzacji
│   └── prisma.ts                  # Prisma Client singleton
├── prisma/
│   ├── schema.prisma              # Schemat bazy danych
│   └── seed.ts                    # Seed z przykładowymi danymi
├── auth.ts                        # Konfiguracja NextAuth
├── middleware.ts                  # Middleware ochrony route'ów
└── vercel.json                    # Konfiguracja Vercel
```

## 🌐 Deployment na Vercel

1. **Połącz z GitHub:**
   - Zaloguj się na [vercel.com](https://vercel.com)
   - Import projektu z GitHub

2. **Ustaw zmienne środowiskowe:**
   - `DATABASE_URL` - Connection string z Neon Database
   - `NEXTAUTH_SECRET` - Losowy, bezpieczny klucz
   - `NEXTAUTH_URL` - URL produkcyjny (https://twoja-domena.vercel.app)

3. **Deploy:**
   - Vercel automatycznie zbuduje i wdroży aplikację
   - Po deploymencie wykonaj seed (opcjonalnie):
     ```bash
     npx prisma db seed
     ```

## 🗄️ Modele bazy danych

### User (Użytkownik)
- `id` - UUID
- `email` - Email (unique)
- `password` - Hasło (zahashowane)
- `name` - Imię
- `role` - Rola (USER | ADMIN)
- `createdAt`, `updatedAt`

### Product (Produkt)
- `id` - UUID
- `name` - Nazwa produktu
- `description` - Opis
- `price` - Cena
- `stock` - Ilość na stanie
- `createdAt`, `updatedAt`

## 📝 Dostępne skrypty

```bash
npm run dev          # Uruchom dev server
npm run build        # Zbuduj dla produkcji
npm run start        # Uruchom produkcyjnie
npm run lint         # Sprawdź linting
npm run db:push      # Zsynchronizuj schemat z bazą
npm run db:seed      # Wypełnij bazę przykładowymi danymi
```

## 🔐 Bezpieczeństwo

- Hasła są hashowane przy użyciu `bcryptjs`
- Middleware chroni wszystkie route'y wymagające autentykacji
- Panel admin dostępny tylko dla użytkowników z rolą `ADMIN`
- Sesje zarządzane przez NextAuth.js JWT

## 🔧 Technologie

- **Framework:** Next.js 15
- **Autentykacja:** Auth.js (NextAuth.js)
- **Baza danych:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **Panel Admin:** Next-Admin
- **TypeScript:** Pełne typowanie

## 📄 Licencja

MIT

## 🤝 Autor

Projekt stworzony jako przykładowa aplikacja Next.js z autentykacją i panelem admin.
