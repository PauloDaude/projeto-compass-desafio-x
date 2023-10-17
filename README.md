# Project UolKut

This project is a **site made entirely with React.JS** together with **Typescript** and **React Styled Components**, proposed in the 8th week of Compass UOL's scholarship program. It has 8 pages, most of them are related to creating an account, logging in it and editing the information the user wants to appear on their profile page. The proposal of the website is to be a kind of **social media where users can interact with each other and make friends**.

### Project Colaborators:
- Paulo Eduardo Araujo Daúde 
- Matheus Klug Bitencourt
- Theo da Silva Magno

## Login Page

This is the page every user sees when first accessing this website, here they can input their account email and password to go to his profile. Both inputs have validation mecanisms to prevent users from entering empty data and still being able to access the profile page.

This page has an option if the user wishes to create a new account, by clicking on the button labeled "Criar conta" they are redirected to the **Register Page**. The page also has an option in case the user already had an account but forgot his password, by clicking "Esqueci minha senha" they are redirected to the **Recover Your Password Page**


## Register Page

This is the page where the user creates his own account by inputting several informations:
 - Email
 - Password
 - Name
 - Birthdate
 - Profession
 - Country
 - City


All the inputs have a validation system similar to the one used in the login page and after the user fills them and click *Criar conta*, they are redirected to the second register page to provide more information.
>**Important Note:** The user specific information entered on both register forms will **not** appear on the profile page.

## Second Register Page
This page is where the user inputs information about their likings and personal life:
- "Who am I?"
- Interests
- Relationship Status
   - Single
   - Married
  - Divorced
  - Dating
  - Worried
- Number of Kids
- Profile Picture
- Favorite Songs
- Favorite Movies
- Habits
  - Smoke
  - Drink

In this second register form, the user can choose to fill none of the fields if they don't wish to, so there is no validation system. After clicking in *Criar conta* they are redirected to the profile page
>**Important Note:** The user specific information entered on both register forms will **not** appear in the profile page.

## Profile Page

This is a static page where the user can see their information, their friends and the ratings other people give them, each categorie going up to three points:
- Fans
- Trust
- Coolness
- Sexy

Also, there is a button labeled "Editar Perfil" under the user profile picture where they can change their profile information

## Information Edit Page

This page is where the user can change any information of his profile, including his profile picture.
>**Important Note:** Since the profile page is static, the user actually don't change anything displayed there so this page is simply there for showing the possibilities that can be done in this website.

## Recover Your Password Page

Here, the user inputs their registered email and after clicking "Enviar Código" the website's user authentication system (*not implemented in this project*) sends an code via e-mail to the user and redirects them to the **Create A New Password Page**

## Create A New Password Page

In this page, the user has to input the code sent to him after they go through the **Recover Your Password Page**, his email and a new password twice, which has to be the same and then the website's user authentication system changes the user's password to the new one and then he is redirected to the **Login Page**.


# Development Info

## Screen Size 
The website was made entirely responsive but we targeted 3 specific sizes for implementing responsivity.
- Mobile → `Width: 360px and Height: 787px`
- Tablet → `Width: 768px and Height: 1080px`
- Desktop  → `Width: 1920px and Height: 1080px`

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

# Running the application
Here's how you can run this aplication:
1. Download or clone all the files in your machine;
2. Acess your system terminal and navigate to the project folder (uolkut);
3. Run **npm install** in your terminal;
4. Wait for all the packages to install and then run **npm start**;
5. After that the application should be rendered on your main browser and you can access and test all pages.
