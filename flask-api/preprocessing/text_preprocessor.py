import os
import re
import string

# Load stop words from file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STOPWORDS_PATH = os.path.join(BASE_DIR, "..", "algerian_arabic_stopwords.txt")

with open(STOPWORDS_PATH, "r", encoding="utf-8") as file:
    stop_words = [word.strip() for word in file.readlines()]

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'@\w+|\#\w+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = ' '.join(word for word in text.split() if word not in stop_words)
    return text

def preprocess_text_dl(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
    text = re.sub(r'@\w+|\#\w+', '', text)
    text = text.translate(str.maketrans('', '', string.punctuation))
    return text

def clean(text):
    text = text.replace("<br/>", " ")
    strip_special_chars = re.compile(u'[^\u0621-\u064a ]')
    return re.sub(strip_special_chars, " ", text)

def process(text):
    text = re.sub('\ـ+', ' ', text)
    text = re.sub('\ر+', 'ر', text)
    text = re.sub('\اا+', 'ا', text)
    text = re.sub('\ووو+', 'و', text)
    text = re.sub('\ههه+', 'ههه', text)
    text = re.sub('\ةة+', 'ة', text)
    text = re.sub('\ييي+', 'ي', text)
    text = re.sub('أ', 'ا', text)
    text = re.sub('آ', 'ا', text)
    text = re.sub('إ', 'ا', text)
    text = re.sub('ة', 'ه', text)
    text = re.sub('ى', 'ي', text)
    text = re.sub(r'(.)\1+', r'\1', text)
    text = " ".join(text.split())
    return text

def preprocess_full(text):
    text = preprocess_text(text)
    text = clean(text)
    text = process(text)
    return text

def preprocess_full_dl(text):
    text = preprocess_text_dl(text)
    text = clean(text)
    text = process(text)
    return text
