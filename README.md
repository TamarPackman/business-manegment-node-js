# Business Management

מערכת ניהול לעסקים, פגישות, שירותים ומשתמשים, מבוססת NestJS, TypeORM ו-MySQL.

## תיאור

המערכת מאפשרת לעסקים לנהל שירותים, לקבוע פגישות, לנהל משתמשים ולהתחבר באמצעות JWT. הפרויקט בנוי בארכיטקטורת מודולים של NestJS, עם התממשקות למסד נתונים MySQL.

## תכונות עיקריות

- ניהול משתמשים (CRUD)
- ניהול עסקים (CRUD)
- ניהול שירותים (CRUD)
- ניהול פגישות (CRUD)
- אימות והרשאות JWT
- תיעוד API עם Swagger

## התקנה

1. יש להוריד את הקוד:
   ```sh
   git clone <repository-url>
   cd business-management
   ```

2. התקנת תלויות:
   ```sh
   npm install
   ```

3. יצירת קובץ `.env` עם משתני סביבה (דוגמה):
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   DB_DATABASE=business_management_DB
   JWT_SECRET=your_jwt_secret
   ```

## הרצת הפרויקט

- פיתוח:
  ```sh
  npm run start:dev
  ```

- פרודקשן:
  ```sh
  npm run build
  npm run start:prod
  ```

## בדיקות

- בדיקות יחידה:
  ```sh
  npm run test
  ```

- בדיקות e2e:
  ```sh
  npm run test:e2e
  ```

## תיעוד API

לאחר הרצת השרת, ניתן לגשת ל-Swagger בכתובת:
```
http://localhost:3000/api-docs
```

## טכנולוגיות עיקריות

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)

---

בהצלחה!
