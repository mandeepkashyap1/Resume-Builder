# Resume Builder Web Application

## Overview

Resume Builder is a web-based application developed using **HTML5, CSS3, Bootstrap 5, and Vanilla JavaScript** that allows users to create professional resumes easily by entering their personal, educational, and professional details.

The platform automatically organizes user data into a professional resume format, provides multiple resume templates, calculates an ATS (Applicant Tracking System) score, and allows users to download their final resume as a PDF.

The main goal of this project is to simplify resume creation for students, freshers, and professionals while providing an attractive and user-friendly experience.

---

## Problem Statement

Many students and job seekers struggle to create professional resumes because:

* They do not know proper resume formatting
* Professional resume services are expensive
* Most free online builders have limited customization
* Users are unaware of ATS compatibility required by modern recruiters

This project solves these problems by generating professional and ATS-friendly resumes automatically.

---

## Objectives

The objectives of this project are:

* Create resumes quickly through an easy form-based system
* Generate professional resume templates automatically
* Allow customization of design and layout
* Provide ATS compatibility score
* Suggest improvements for better resume quality
* Allow users to export resumes as PDF files

---

## Technologies Used

Frontend Technologies:

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (Vanilla JS)

Libraries Used:

* Bootstrap Framework
* html2pdf.js for PDF generation
* LocalStorage API for temporary data storage

Development Tools:

* Visual Studio Code
* Git and GitHub

---

## Features

### 1. Landing Page

The website includes a modern landing page containing:

* Professional hero section
* Resume template previews
* Website feature cards
* Navigation bar
* Footer section
* Responsive design

---

### 2. Resume Builder Form

Users can enter complete information including:

#### Personal Details

* Full Name
* Phone Number
* Email Address
* Address
* LinkedIn Profile
* GitHub Profile
* Profile Picture

#### Professional Summary

* Career objective
* Personal introduction

#### Education Details

* Degree
* School/College
* University
* Year of completion
* CGPA/Percentage

#### Skills

* Technical skills
* Soft skills
* Dynamic skill addition/removal

#### Projects

* Project title
* Description
* Technologies used
* Duration
* GitHub project link

#### Work Experience

* Company name
* Role
* Responsibilities
* Duration

#### Certifications

* Certificate name
* Issuing organization
* Completion date

#### Achievements

* Awards
* Competitions
* Hackathons

#### Languages and Hobbies

* Language proficiency levels
* Personal hobbies

---

### 3. Dynamic Resume Generation

The system automatically converts user input into a professional resume format.

Functions:

* Live resume preview
* Automatic section formatting
* Professional alignment and structure

---

### 4. Resume Templates

Users can switch between multiple templates:

* Modern Template
* Professional Template
* Minimal Template
* Creative Template

Template switching happens instantly using JavaScript.

---

### 5. ATS Score Checker

The system analyzes resume quality and generates an ATS score out of 100.

Parameters checked:

* Contact information completeness
* Skills section availability
* Education details
* Work experience
* Project details
* Resume structure quality

Example:

ATS Score = 85/100

---

### 6. Suggestions System

The website suggests improvements such as:

* Add more technical skills
* Improve project descriptions
* Add work experience
* Write better professional summary

---

### 7. PDF Export

Users can download resumes directly as PDF files.

Features:

* Maintains formatting
* Preserves layout
* Ready for job applications

---

### 8. Theme Customization

Users can customize:

* Resume color theme
* Font style
* Layout style
* Single page or multi-page resume

---

### 9. Dark Mode

Additional dark mode feature for better UI experience.

---

## Project Structure

resume-builder/

index.html
builder.html
preview.html

css/
style.css

js/
form.js
preview.js
template-switcher.js
pdf-export.js

assets/
images/
icons/

README.md

---

## Workflow

Step 1
User opens website

Step 2
User clicks Start Building

Step 3
User fills resume information form

Step 4
Data is stored using LocalStorage

Step 5
JavaScript processes data

Step 6
Resume preview is generated

Step 7
ATS score is calculated

Step 8
User chooses resume template

Step 9
User downloads final PDF resume

---

## Future Improvements

Possible future enhancements:

* AI generated professional summary
* AI improvement suggestions
* Cover letter generation
* Multi-language support
* Cloud database integration
* User login system
* Online resume sharing link

---

## Advantages

* Saves time
* Easy to use
* Professional resume formatting
* ATS friendly design
* Mobile responsive
* No design knowledge required
* Free and accessible for students

---

## Conclusion

Resume Builder Web Application is a complete solution for students and professionals who need to create high-quality resumes quickly.

By combining modern frontend technologies with automation features such as ATS scoring, PDF export, template switching, and live preview, the project provides a practical and professional tool that can be used in real-world job applications.

This project demonstrates strong frontend development skills and can be used as an impressive portfolio or hackathon project.

---

## Author

Developed by:

Mandeep Kashyap

B.Tech CSE (AI) Student

Passionate about Web Development, Artificial Intelligence, and Software Innovation
