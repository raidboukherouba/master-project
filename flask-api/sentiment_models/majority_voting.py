import os
import torch
import numpy as np
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    DistilBertTokenizer, DistilBertForSequenceClassification,
    GPT2Tokenizer, GPT2ForSequenceClassification
)
from torch.nn.functional import softmax
from preprocessing.text_preprocessor import preprocess_full


class MajorityVotingModel:
    def __init__(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # Load tokenizers
        self.tokenizer_bert = AutoTokenizer.from_pretrained("asafaya/bert-base-arabic")
        self.tokenizer_distil = DistilBertTokenizer.from_pretrained("distilbert-base-multilingual-cased")
        self.tokenizer_gpt = GPT2Tokenizer.from_pretrained("aubmindlab/aragpt2-base")
        if self.tokenizer_gpt.pad_token is None:
            self.tokenizer_gpt.add_special_tokens({'pad_token': self.tokenizer_gpt.eos_token})

        # Load models
        self.model_bert = AutoModelForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/arabic_base_bert_2_labels"), num_labels=2
        )
        self.model_distil = DistilBertForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/distil_bert_cased_multi_language_2_labels"), num_labels=2
        )
        self.model_gpt = GPT2ForSequenceClassification.from_pretrained(
            os.path.join(base_dir, "../models/transformers/aragpt2-base_2_labels"), num_labels=2
        )
        self.model_gpt.config.pad_token_id = self.tokenizer_gpt.eos_token_id
        self.model_gpt.resize_token_embeddings(len(self.tokenizer_gpt))

        for model in [self.model_bert, self.model_distil, self.model_gpt]:
            model.eval()
            model.to(self.device)

    def _get_single_prediction(self, model, tokenizer, text):
        text = preprocess_full(text)
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=180)
        inputs = {key: val.to(self.device) for key, val in inputs.items()}

        with torch.no_grad():
            outputs = model(**inputs)
            probs = softmax(outputs.logits, dim=1)
            pred_class = torch.argmax(probs, dim=1).item()
            confidence = round(probs[0][pred_class].item(), 4)

        sentiment = "Positive" if pred_class == 1 else "Negative"
        return pred_class, sentiment, confidence

    def predict(self, text):
        results = {}

        pred_bert, sent_bert, conf_bert = self._get_single_prediction(self.model_bert, self.tokenizer_bert, text)
        pred_distil, sent_distil, conf_distil = self._get_single_prediction(self.model_distil, self.tokenizer_distil, text)
        pred_gpt, sent_gpt, conf_gpt = self._get_single_prediction(self.model_gpt, self.tokenizer_gpt, text)

        preds = [pred_bert, pred_distil, pred_gpt]
        final_pred = int(np.bincount(preds).argmax())
        final_sent = "Positive" if final_pred == 1 else "Negative"
        avg_conf = round(np.mean([c for p, c in zip(preds, [conf_bert, conf_distil, conf_gpt]) if p == final_pred]), 4)

        return {
            "text": text,
            "majority_vote": {
                "sentiment": final_sent,
                "confidence": avg_conf
            },
            "models": {
                "arabic_bert_base": {
                    "sentiment": sent_bert,
                    "confidence": conf_bert
                },
                "distil_bert_cased": {
                    "sentiment": sent_distil,
                    "confidence": conf_distil
                },
                "aragpt2": {
                    "sentiment": sent_gpt,
                    "confidence": conf_gpt
                }
            }
        }
