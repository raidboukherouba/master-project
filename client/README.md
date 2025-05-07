## 1. 👀 Overview

This is the frontend component of the **Arabic Sentiment Analysis Web Application**. It provides a **React-based** user interface to interact with a variety of machine learning and deep learning models for sentiment classification in the Algerian dialect.

## 2. ✨ Features

- **Model Selection & Sentiment Prediction**: Choose from multiple ML/DL/Transformer models including:
    - `SVM`, `KNN`, `NBM`
    - `CNN`, `LSTM`
    - `Arabic BERT` (Base, Mini, Medium)
    - `DistilBERT` Cased, `araGPT2`
    - Ensemble methods: `Majority Voting`, `Stacking`
- **Modern UI**: Built with Tailwind CSS and react-icons for a responsive and accessible experience
- **Clean Routing**: Page navigation handled with react-router-dom
- **HTTP Communication**: Uses axios for interacting with the backend API



## 3. 🔧 Technologies Used

- **Frontend Framework :** `React` (v19)
- **Routing:** `react-router-dom` (v7.5)
- **UI Components & Styling:** `tailwindcss` (v4.1), `@tailwindcss/vite`, `react-icons`
- **HTTP Client:** `axios` (v1.8)


## 4. 🚀 Getting Started

### 4.1. ✅ Prerequisites
- `Node.js` (v22.12.0 or higher)
- `npm` (Node Package Manager)

### 4.2. ⬇️ Installation
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build:
   ```bash
   npm run preview
   ```

## 5. 📂 Project Structure
```
/src
|── /services
| └── apiClient.js
| └── modelsService.js
|── /pages
| └── AboutUs.jsx
| └── Docs.jsx
| └── Features.jsx
| └── SentimentAnalysis.jsx
├── /components
│ └── Navbar.jsx 
| └── Footer.jsx
├── App.jsx 
├── main.jsx 
|── index.css
```

## 6. 🔐 Environment Variables
Create a `.env` file in the `client` directory and configure:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
Adjust the `VITE_API_BASE_URL` to match your backend server URL.


## 7. 🤝 Contributing
If you wish to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes with clear messages.
4. Push your branch and create a Pull Request.


## 8. 🛠️ Development Tools
- **Vite**: Fast build tool for modern web projects.


## 9. 📜 License
This project is licensed under the **MIT License**.
