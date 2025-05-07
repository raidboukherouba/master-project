from flask import Flask, request, jsonify
import os

from sentiment_models.svm_model import SvmModel
from sentiment_models.knn_model import KnnModel
from sentiment_models.nbm_model import NbmModel
from sentiment_models.cnn_model import CNNModel
from sentiment_models.lstm_model import LSTMModel
from sentiment_models.transformers_bert import TransformersBertModel
from sentiment_models.transformers_gpt import TransformersGptModel
from sentiment_models.majority_voting import MajorityVotingModel
from sentiment_models.stacking_model import StackingModel

import torch
print(torch.__version__)
print(torch.cuda.is_available())

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Traditional model paths
MODEL_DIR_svm = os.path.join(BASE_DIR, "models", "traditional", "svm")
MODEL_DIR_knn = os.path.join(BASE_DIR, "models", "traditional", "knn")
MODEL_DIR_nbm = os.path.join(BASE_DIR, "models", "traditional", "nbm")

# Deep learning model paths
TOKENIZER_PATH = os.path.join(BASE_DIR, "word2_vec", "tokenizer.pickle")
MODEL_DIR_cnn = os.path.join(BASE_DIR, "models", "dl", "cnn", "sentiment_analysis_binary_classification_cnn_model.h5")
MODEL_DIR_lstm = os.path.join(BASE_DIR, "models", "dl", "lstm", "sentiment_analysis_binary_classification_lstm_model.h5")

# Transformers
MODEL_DIR_arabic_bert_base = os.path.join(BASE_DIR, "models", "transformers", "arabic_base_bert_2_labels")
tokenizer_name_arabic_bert_base = "asafaya/bert-base-arabic"

MODEL_DIR_arabic_bert_medium = os.path.join(BASE_DIR, "models", "transformers", "arabic_medium_bert_2_labels")
tokenizer_name_arabic_bert_medium = "asafaya/bert-medium-arabic"

MODEL_DIR_arabic_bert_mini = os.path.join(BASE_DIR, "models", "transformers", "arabic_mini_bert_2_labels")
tokenizer_name_arabic_bert_mini = "asafaya/bert-mini-arabic"

MODEL_DIR_distil_bert_cased = os.path.join(BASE_DIR, "models", "transformers", "distil_bert_cased_multi_language_2_labels")
tokenizer_name_distil_bert_cased = "distilbert-base-multilingual-cased"

MODEL_DIR_aragpt2 = os.path.join(BASE_DIR, "models", "transformers", "aragpt2-base_2_labels")
tokenizer_name_aragpt2 = "aubmindlab/aragpt2-base"

# Load models
svm_model = SvmModel(MODEL_DIR_svm)
knn_model = KnnModel(MODEL_DIR_knn)
nbm_model = NbmModel(MODEL_DIR_nbm)

cnn_model = CNNModel(MODEL_DIR_cnn, TOKENIZER_PATH)
lstm_model = LSTMModel(MODEL_DIR_lstm, TOKENIZER_PATH)

arabic_bert_base_model   = TransformersBertModel(MODEL_DIR_arabic_bert_base, tokenizer_name_arabic_bert_base)
arabic_bert_mini_model   = TransformersBertModel(MODEL_DIR_arabic_bert_mini, tokenizer_name_arabic_bert_mini)
arabic_bert_medium_model = TransformersBertModel(MODEL_DIR_arabic_bert_medium, tokenizer_name_arabic_bert_medium)
distil_bert_cased_model = TransformersBertModel(MODEL_DIR_distil_bert_cased, tokenizer_name_distil_bert_cased)
aragpt2_model = TransformersGptModel(MODEL_DIR_aragpt2, tokenizer_name_aragpt2)

majority_voting_model = MajorityVotingModel()
stacking_model = StackingModel()


app = Flask(__name__)


@app.route('/ml/svm', methods=['POST'])
def analyze_svm():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text' in request"}), 400
    try:
        result = svm_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route('/ml/knn', methods=['POST'])
def analyze_knn():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text' in request"}), 400
    try:
        result = knn_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route('/ml/nbm', methods=['POST'])
def analyze_nbm():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text' in request"}), 400
    try:
        result = nbm_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route("/dl/cnn", methods=["POST"])
def analyze_cnn():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = cnn_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/dl/lstm", methods=["POST"])
def analyze_lstm():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = lstm_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/transformers/arabic-bert-base", methods=["POST"])
def analyze_arabic_bert_base():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = arabic_bert_base_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/transformers/arabic-bert-medium", methods=["POST"])
def analyze_arabic_bert_medium():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = arabic_bert_medium_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/transformers/arabic-bert-mini", methods=["POST"])
def analyze_arabic_bert_mini():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = arabic_bert_mini_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/transformers/distil-bert-cased", methods=["POST"])
def analyze_distil_bert_cased():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = distil_bert_cased_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/transformers/aragpt2", methods=["POST"])
def analyze_aragpt2():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = aragpt2_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/majority-voting", methods=["POST"])
def analyze_majority_voting():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        result = majority_voting_model.predict(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/stacking", methods=["POST"])
def analyze_stacking():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing 'text'"}), 400
    try:
        print(f"Received text: {text}")
        result = stacking_model.predict(text)
        print(f"Prediction result: {result}")
        return jsonify(result)
    except Exception as e:
        print(f"Error occurred in stacking model: {e}")
        return jsonify({"error": str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port=8000)
