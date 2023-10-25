# Project UolKut

This project is a **site made entirely with React.JS** together with **Typescript** and **React Styled Components**, proposed in the 8th week of Compass UOL's scholarship program. It has 8 pages, most of them are related to creating an account, logging in it and editing the information the user wants to appear on their profile page. The proposal of the website is to be a kind of **social media where users can interact with each other and make friends**.

### Project Colaborators:

- Paulo Eduardo Araujo Daúde

## Login Page

Some features were implemented on the login page:

- Using email and password verification through the json-server-auth library
- After authentication has been completed, a JWT Access Token is generated, which is inserted into the browser's localStorage, along with the userID, which is used to identify the logged in user.
- When rendering the component, localStorage is cleaned, thus providing more security so that the user cannot access the profile without being logged in

This page has an option if the user wishes to create a new account, by clicking on the button labeled "Criar conta" they are redirected to the **Register Page**. The page also has an option in case the user already had an account but forgot his password, by clicking "Esqueci minha senha" they are redirected to the **Recover Your Password Page**

## Register Page

This is the page where the user creates his own account by inputting several informations:

- Email -> (checks if the email entered already exists in the database, if not, validation is successful)
- Password -> (checks whether the password has 8 or more characters, if so, validation is successful)
- Name -> (check if the field is not empty)
- Birthdate -> (checks that the field is not empty and that the dates are correct: day between 1 and 31; month between 1 and 12; year between 100 years ago to the current year)
- Profession -> (check if the field is not empty)
- Country -> (check if the field is not empty)
- City -> (check if the field is not empty)

After the user fills them in and clicks _Create account_, they are redirected to the second registration page to provide more information.

> **Important Note:** Only the information: [relationship, favorite songs, favorite movies] will appear on the profile page.

## Second Register Page

This page is where the user inputs information about their likings and personal life:

- "Who am I?" -> (check if the field is not empty)
- Interests -> (check if the field is not empty)
- Relationship Status -> (check if the field is not empty)
  - Single
  - Married
  - Divorced
  - Dating
  - Worried
- Number of Kids -> (check if the field is not empty)
- Profile Picture -> (check if the field is not empty)
- Favorite Songs -> (check if the field is not empty)
- Favorite Movies -> (check if the field is not empty)
- Habits
  - Smoke
  - Drink

After clicking _Create account_ they are redirected to the profile page

## Profile Page

This is a page with some dynamic data where the user can see their information, their friends and the evaluations that other people give them, each category going up to three points:

- Fans
- Trust
- Coolness
- Sexy

Also, there is a button labeled "Editar Perfil" under the user profile picture where they can change their profile information

## Information Edit Page

This page is where the user can change any information in their profile.

## Recover Your Password Page

Here, the user inputs their registered email and after clicking "Enviar Código" the website's user authentication system (_not implemented in this project_) sends an code via e-mail to the user and redirects them to the **Create A New Password Page**

## Create A New Password Page

On this page the user must enter the code sent to him (_not implemented in this project_) after going through the **Password Recovery Page**, his email and a new password twice, which must be the same and then the website's user authentication system changes the user's password to the new one and then he will be redirected to the **Login Page**.

# Development Info

## Screen Size

The website was made entirely responsive but we targeted 3 specific sizes for implementing responsivity.

- Mobile → `Width: 360px and Height: 787px`
- Tablet → `Width: 768px and Height: 1080px`
- Desktop → `Width: 1920px and Height: 1080px`

## Packages Used

The site was made mainly with typescript with react and styled components. See below the full list of dependencies:

- "@testing-library/jest-dom": "^5.17.0",
- "@testing-library/react": "^13.4.0",
- "@testing-library/user-event": "^13.5.0",
- "@types/jest": "^27.5.2",
- "@types/node": "^16.18.52",
- "@types/react": "^18.2.22",
- "@types/react-dom": "^18.2.7",
- "react": "^18.2.0",
- "react-dom": "^18.2.0",
- "react-router-dom": "^6.16.0",
- "react-scripts": "5.0.1",
- "styled-components": "^6.0.8",
- "typescript": "^4.9.5",
- "web-vitals": "^2.1.4"

- "axios": "^1.5.1",
- "json-server": "^0.17.4",
- "json-server-auth": "^2.1.0",
- "prettier": "3.0.3",
- "yup": "^1.3.2",
- "zustand": "^4.4.3"

# Running the application

Here's how you can run this application:

1. Download or clone all files on your machine;
2. Access your system terminal and navigate to the project folder (uolkut);
3. Run **npm install** in your terminal;
4. Wait for all packages to be installed and run **json-server ./mock/db.json -m ./node_modules/json-server-auth** to trigger json-server-auth;
5. After that, just run **npm install** (allow it to run on a port other than 3000, type **y**) and the application should be rendered in your main browser and you will be able to access and test all pages.
