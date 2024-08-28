# Sticky Note Web App

## Overview

This Sticky Note Web App is a simple and intuitive tool for creating, organizing, and managing sticky notes directly in your web browser. With this app, you can create new notes, delete existing ones, and change the color of each note to suit your preferences. The app also includes an auto-save feature, ensuring that your notes are always up-to-date. All notes are stored and retrieved from a database using the Appwrite service, providing reliable and secure data management.

## Features

- **Create Sticky Notes**: Easily add new sticky notes to your workspace.
- **Delete Sticky Notes**: Remove unwanted sticky notes with a single click.
- **Change Note Color**: Customize the color of each sticky note to help organize your thoughts visually.
- **Auto-Save**: Automatically save changes to your sticky notes without needing to manually save them.
- **Database Integration**: Store and retrieve sticky notes data using Appwrite service, ensuring your notes are accessible anytime.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: Appwrite Service
- **Storage**: Appwrite Storage for saving sticky notes data

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine
- An Appwrite project set up with a database for storing sticky notes

### Clone the Repository

```bash
git clone 
cd 
```

### Install Dependencies

```bash
npm install
```

### Configure Appwrite

1. Create a new Appwrite project.
2. Set up a database for storing sticky notes.
3. Update the Appwrite configuration in the project to include your Appwrite endpoint, project ID, and API key.

### Run the Application

```bash
npm start
```

The application will run on `http://localhost:3000` by default.
