# 1.Arabic Sentiment Analysis Web App

A React-based web application for analyzing sentiment in Arabic text using various machine learning models, including traditional classifiers, deep learning models, and ensemble methods (All models were fine-tuned by me as part of this project.).

## 2.Features

- **Multiple Model Support**:
  - Traditional ML: SVM, KNN, Naive Bayes
  - Deep Learning: CNN, LSTM
  - Transformer Models: Arabic BERT (Base/Mini/Medium), DistilBERT, araGPT2
  - Ensemble Methods: Majority Voting, Stacking

- **Real-time Analysis**:
  - Get sentiment predictions (Positive/Negative) with confidence scores
  - Visualize results with progress bars and color-coded indicators

- **Detailed Insights**:
  - For ensemble models, view contributions from each sub-model
  - Compare probability distributions for different models

## 3. links:
**3.1 thesis**: 
- https://dspace.univ-guelma.dz/jspui/bitstream/123456789/16457/1/F5_8_BOUKHEROUBA_MOHAMMED%20RAID%20ELISLAM.pdf

**3.2 Models folder**
- https://drive.google.com/file/d/13kXrXPRGf3yzZA0jXpBYLCNPj6wdzGL9/view?usp=sharing
**3.3 Word2vec folder**
- https://drive.google.com/file/d/1jqPodp5nHsfjJlbs5EFwEungxvMOAMQ7/view?usp=drive_link
## 4.Installation

## 🐳 How to Use Docker (optional)

for easier deployment and development. i have containerized This project using Docker. The setup includes containers for the client (React app), server (Express API), and optionally a database (e.g., MongoDB).

### 4.1 🛠️ Prerequisites:
- Docker
- Docker Compose

### 4.2 🚀 Running the App:
- Clone the Repository:
```bash
git clone https://github.com/raidboukherouba/master-project.git
cd master-project
```
- copy paste the model folder inside flask api folder
- copy paste the word2_vec folder inside flask api folder

- Build and Start Containers:
```bash
docker-compose up --build
```

- Access the App:
* Frontend: http://localhost:3000
* Backend API: http://localhost:5000
* Flask api: http://localhost:8000


## 5. 🤝 Contributing 
Contributions are welcome! Please follow these steps: 
1. Fork the repository. 
2. Create a new branch (git checkout -b feature/YourFeatureName).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeatureName).
5. Open a pull request.

## 6. 📜 license
This project was developed by *Boukherouba Raid* as a Licentiate project at the University of *8 Mai 1945 Guelma* in 2024 and was updated in 2025. It is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 7. 📧 Contact
For questions or feedback, please contact: 
- ✉️ Gmail: raidboukherouba@gmail.com
- 🐙 GitHub: raidboukherouba
