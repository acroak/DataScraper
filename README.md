# MedRythms Evaluation Tool 

## Installation Instructions

1. Download Zip file or clone repository.
2. Use the sql schema found in MySQL_Schema.sql to initialize the database
3. Initialize .env files in both the front-end and back-end to interact with the back-end and database respectively.
    * Backend .env file:
        * In the backend/backend_mysql/ directory create a file named '.env'
        * Variable Guide:
            * DB_NAME : Database Name
            * DB_USER: Admin user
            * DB_PASS: password for admin user
            * DB_HOST: hosting location for database
        * See below an example .env file:
        ```
            DB_NAME=dbname
            DB_USER=root
            DB_PASS=1234
            DB_HOST=localhost
        ``` 
    * Frontend .env file:
        * In the frontend directory create a file named '.env'
        * Variable Guide:
            * BACKEND_BASE_URL: Base URL for the backend
        * See below an example .env file:
        ```
        BACKEND_BASE_URL=http://localhost:8000
        ``` 

4. Build the back-end (in the directory backend/backend_mysql/) with: 
```bash
npm install
```
5. Build the front-end (in the frontend/) with:
```bash 
yarn
```
6. Compile and run the back-end with:
```bash
#From the root of the backend/backend_mysql/ directory

#Compile the backend
npx tsc

#Start the server
node index.js
```
7. Running the front-end
```bash
#start expo server
yarn web
```

### Running Tests
Backend:
```bash
#in the backend/backend_mysql directory
npm test
```
Frontend: 
```bash
#In the frontend directory
yarn test
```


-------------------

## Class Documentation

### Required Documents for Class
* [Team Member Assignments](https://docs.google.com/document/d/1ior0iUuyaUXxBCLX6d1xF7-z6i04PoU19wNBNhiGtmM/edit?usp=sharing)
* [Team Member Assignment and Contract](https://docs.google.com/document/d/1e1Lsc5nE5j7BPREOC-PAgZMY8aWsITntmDSG5lF0mb8/edit)
* [Team Meeting Notes](https://docs.google.com/document/d/1WHH2vE8oX1pntguu5GIuhr0qtykz9TD-waBP0iCTLaQ/edit)
* [Project Proposal](https://docs.google.com/document/d/1eIUJJ-gJCRpjZ-sc4FLz_KvExIdFB-hOHfI__EB_eU4/edit?usp=sharing)
* [SRS Documentation](https://docs.google.com/document/d/1AxrM-eYkC3dQ6wRpCaz5rYie-R1R6cZzKJpRaT6NM4U/edit)
* [Team Organization and Process Model Selection](https://docs.google.com/document/d/1UY7wYbCwI-wkrQ2BN0vobLe8Tjdn9NdZPJ4yQULO_GE/edit)
* [Software Design Description (SDD) IEEE 1016](https://docs.google.com/document/d/1gf9wKJe3eF8dgWzMqT5pZrNd1g6c6mQK6kwLD0pQTEA/edit?usp=sharing)
* [Testing Documentation](https://docs.google.com/document/d/1DrmdhBPY346sVsrvLaGe-GUBxECNBG_fNMJ9y9BGHoM/edit)
* [Client Satisfaction Evaluation](https://docs.google.com/document/d/1E-ZfdY7NaHm7OH6920advwyacvHq5JNsvFd5RcUNJ-c/edit?usp=sharing)
* [Individual Contributions](https://docs.google.com/document/d/1uH5DOD2JlHc7ent2i_OPAYBvG0xf7u0BikHgDZBvP1s/edit)
* [Complete Project Evaluation](https://docs.google.com/document/d/10Y-eyIKMsnV3mmJNQ7ROY5Gyenymv0QtW-NLoKcW2Ec/edit)
* [Group Presentation](https://docs.google.com/presentation/d/1MOAICE1jXmy1BmA4uaNTikbS5P6DTPcof8BcbYILhPc/edit#slide=id.g2a07a7ed3ae_0_83)


### Misc Documents
* [Inital Document Shared from MedRythms](https://docs.google.com/document/d/1P1a46UaTa0fxVSwAhESqhC2diSg-x9Ro/edit)
* [High-level Process Flow Diagram](https://lucid.app/lucidchart/368cc6a9-0b99-4ea3-8980-0850dce09334/edit?viewport_loc=226%2C-63%2C998%2C519%2C0_0&invitationId=inv_93ef41f0-f3ab-4664-b2e9-493c6f385fc1)
* [All Processes Together Flow](https://lucid.app/lucidchart/c3946c2f-34b5-4213-ae5e-b0c0d5faebb1/edit?invitationId=inv_632fcf8f-e0e5-4af6-9a3c-cfa39cbf9c2f)
* [Scrape Process SubFlow](https://lucid.app/lucidchart/invitations/accept/inv_950bb2a3-adbd-4002-a4d4-ec1b160bc25f)
* [Checklist Process SubFlow](https://lucid.app/lucidchart/invitations/accept/inv_c462f448-5627-49d2-bd60-038f6e109ea5)
* [ReportGeneration SubFlow](https://lucid.app/lucidchart/invitations/accept/inv_ad457be5-376f-4ad1-bf09-0117c457c14e)
* [Wire Frames](https://lucid.app/lucidchart/463ec889-ef7f-48d4-9299-4f55509176dc/edit?invitationId=inv_8bf4cd3c-206b-444a-ae50-e8c3a2452ff9)
* [Mapping the Original Checklist to Tables and Attributes](https://docs.google.com/spreadsheets/d/1mOK-GSDce5ZtZRCqLm_Fei7Ossnl0oSbrxkW0BoVQQA/edit#gid=0)
* [Mapping Checklist Flow to Tables and Attributes](https://docs.google.com/spreadsheets/d/1JS3W5jgeIhurMjMIUMD4y-j9fLYHQy7X9dcXyPLWhr0/edit?usp=sharing)
* [Team Stingray Project Slides](https://docs.google.com/presentation/d/1jlbx_owp_QpX2pMF758-xyI7EDLt00A4xqGNOcz1xLc/edit#slide=id.p)


### Quick Style Guide breakdown
MedRhythms' primary website has a complete and rounded design already, when implementing our own frontend we could leverage their visual design work for our app for a level of extra polish:

 * Primary Font [Poppins Google Font Family](https://fonts.google.com/specimen/Poppins)
 * Header Weight: 700
 * Primary Accent Color: #257C52
 * Secondary Accent Color: #1AB86C
 * Primary Button Color: #EA5E55
 * Primary Button Hover Color: #EA5E55E8
 * Primary Button Transition: ease .3s
 * Primary Button Border Radius: 50px 50px 50px 50px
 * Secondary Button Color: #097179
 * Secondary Button Hover Color: #165460
 * Form Input Border Color: #fcb900
 * Form Input Border Radius: 3px
 * URL Font Color: #257C52
 * URL Style: Italic


The mockups directory is for making small prototypes using our new tools/technologies.
