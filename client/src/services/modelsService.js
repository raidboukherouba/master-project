import apiClient from './apiClient';


export const svmClassification = async (text) => {
  const response = await apiClient.post(`/ml/svm`, { text: text });
  return response.data;
};

export const knnClassification = async (text) => {
    const response = await apiClient.post(`/ml/knn`, { text: text });
    return response.data;
  };

export const nbmClassification = async (text) => {
  const response = await apiClient.post(`/ml/nbm`, { text: text });
  return response.data;
};  

export const cnnClassification = async (text) => {
    const response = await apiClient.post(`/dl/cnn`, { text: text });
    return response.data;
};

export const lstmClassification = async (text) => {
    const response = await apiClient.post(`/dl/lstm`, { text: text });
    return response.data;
};

export const arabicBertBaseClassification = async (text) => {
    const response = await apiClient.post(`/transformers/arabic-bert-base`, { text: text });
    return response.data;
};

export const arabicBertMiniClassification = async (text) => {
    const response = await apiClient.post(`/transformers/arabic-bert-mini`, { text: text });
    return response.data;
};

export const arabicBertmediumClassification = async (text) => {
    const response = await apiClient.post(`/transformers/arabic-bert-medium`, { text: text });
    return response.data;
};

export const distilbertClassification = async (text) => {
    const response = await apiClient.post(`/transformers/distil-bert-cased`, { text: text });
    return response.data;
};

export const aragbpt2Classification = async (text) => {
    const response = await apiClient.post(`/transformers/aragpt2`, { text: text });
    return response.data;
};

export const majorityVotingClassification = async (text) => {
    const response = await apiClient.post(`/majority-voting`, { text: text });
    return response.data;
};

export const stackingClassification = async (text) => {
    const response = await apiClient.post(`/stacking`, { text: text });
    return response.data;
};