import os
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from torch.nn.functional import softmax
from preprocessing.text_preprocessor import preprocess_full

class TransformersBertModel:
    def __init__(self, model_path, tokenizer_path):
        # Make sure to convert to absolute path
        model_path = os.path.abspath(model_path)

        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_path,
            local_files_only=True  # 🛡️ prevents trying to fetch from Hugging Face Hub
        )
        self.model.eval()

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(self.device)

    def predict(self, text):
        preprocessed_text = preprocess_full(text)
        inputs = self.tokenizer(preprocessed_text, return_tensors="pt", padding=True, truncation=True, max_length=180)

        inputs = {key: val.to(self.device) for key, val in inputs.items()}

        with torch.no_grad():
            outputs = self.model(**inputs)
            probs = softmax(outputs.logits, dim=1)
            predicted_class = torch.argmax(probs, dim=1).item()

        label = "Positive" if predicted_class == 1 else "Negative"
        confidence = round(probs[0][predicted_class].item(), 4)

        return {
            "text": text,
            "sentiment": label,
            "confidence": confidence
        }
