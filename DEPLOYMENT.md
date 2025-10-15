# 🚀 Deployment na Vercel

## Krok 1: Przygotowanie repozytorium

✅ **Gotowe!** Kod jest już na GitHub: https://github.com/lazaq123456/apaktest

## Krok 2: Import projektu na Vercel

1. Przejdź na https://vercel.com i zaloguj się
2. Kliknij **"Add New Project"**
3. Wybierz **"Import Git Repository"**
4. Znajdź i wybierz repozytorium: `lazaq123456/apaktest`
5. Kliknij **"Import"**

## Krok 3: Konfiguracja projektu

Vercel automatycznie wykryje Next.js. **NIE zmieniaj** domyślnych ustawień build:
- Framework Preset: **Next.js** ✅
- Build Command: `next build` ✅
- Output Directory: `.next` ✅

## Krok 4: Dodaj zmienne środowiskowe

W sekcji **"Environment Variables"** dodaj następujące zmienne:

### 1. DATABASE_URL
```
DATABASE_URL
```
**Wartość:**
```
postgresql://neondb_owner:npg_G8XgwrAK0ePI@ep-dark-night-ag5gg0df-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### 2. NEXTAUTH_SECRET
```
NEXTAUTH_SECRET
```
**Wartość:** Wygeneruj losowy klucz (min. 32 znaki)

Możesz użyć tego polecenia w terminalu:
```bash
openssl rand -base64 32
```

Lub wpisz dowolny długi, losowy ciąg znaków, np.:
```
super-secret-key-change-this-in-production-please-use-random-string-here-987654321
```

### 3. NEXTAUTH_URL
```
NEXTAUTH_URL
```
**Wartość:** Zostaw puste - Vercel automatycznie ustawi właściwy URL produkcyjny.

Alternatywnie po pierwszym deploymencie ustaw na:
```
https://twoja-aplikacja.vercel.app
```

## Krok 5: Deploy

1. Kliknij **"Deploy"**
2. Poczekaj na zakończenie budowania (2-3 minuty)
3. Po zakończeniu zobaczysz URL swojej aplikacji, np.:
   ```
   https://apaktest.vercel.app
   ```

## Krok 6: Przygotowanie bazy danych

### Opcja A: Przez Vercel Dashboard (po deploymencie)

Nie trzeba wykonywać migracji - schemat już istnieje w bazie! ✅

Jeśli chcesz wypełnić bazę testowymi danymi:

1. Zainstaluj Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Zaloguj się:
   ```bash
   vercel login
   ```

3. Połącz z projektem:
   ```bash
   vercel link
   ```

4. Pobierz zmienne środowiskowe:
   ```bash
   vercel env pull
   ```

5. Wykonaj seed:
   ```bash
   npx prisma db seed
   ```

### Opcja B: Lokalne połączenie z bazą produkcyjną

Możesz również uruchomić seed lokalnie, używając tego samego DATABASE_URL z Vercel.

## Krok 7: Testowanie

1. Otwórz URL aplikacji w przeglądarce
2. Zostaniesz przekierowany na `/auth/signin`
3. Zaloguj się używając testowych danych:

   **Admin:**
   - Email: `admin@example.com`
   - Hasło: `admin123`

   **User:**
   - Email: `user@example.com`
   - Hasło: `user123`

4. Sprawdź panel admina: `https://twoja-aplikacja.vercel.app/admin`

## 🎉 Gotowe!

Twoja aplikacja jest już dostępna online!

## Kolejne deploymenty

Każde `git push` do brancha `main` automatycznie uruchomi nowy deployment na Vercel.

## Własna domena (opcjonalnie)

1. W Vercel Dashboard przejdź do **Settings → Domains**
2. Dodaj swoją domenę
3. Skonfiguruj rekordy DNS zgodnie z instrukcjami Vercel
4. Zaktualizuj `NEXTAUTH_URL` na nową domenę

## Rozwiązywanie problemów

### Problem: Błąd połączenia z bazą danych
**Rozwiązanie:** Sprawdź czy DATABASE_URL jest poprawnie ustawiony w Environment Variables

### Problem: Błąd NextAuth
**Rozwiązanie:** Upewnij się, że NEXTAUTH_SECRET jest ustawiony i NEXTAUTH_URL jest poprawny

### Problem: Panel admin nie działa
**Rozwiązanie:** Sprawdź czy zalogowany użytkownik ma rolę ADMIN w bazie danych

## Dodatkowe zasoby

- Dokumentacja Vercel: https://vercel.com/docs
- Dokumentacja Next.js: https://nextjs.org/docs
- Dokumentacja NextAuth: https://authjs.dev
- Dokumentacja Prisma: https://www.prisma.io/docs

