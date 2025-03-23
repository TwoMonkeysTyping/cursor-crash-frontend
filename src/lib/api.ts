// src/lib/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface Document {
  id: string;
  name: string;
  content: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveDocumentPayload {
  name: string;
  content: string;
  language: string;
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch a document by ID
export const fetchDocument = async (documentId: string): Promise<Document> => {
  try {
    const response = await api.get(`/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

// Save a document
export const saveDocument = async (
  documentId: string, 
  payload: SaveDocumentPayload
): Promise<Document> => {
  try {
    // If it's a new document, create it
    if (documentId === 'new') {
      const response = await api.post('/documents', payload);
      return response.data;
    }
    
    // Otherwise, update existing document
    const response = await api.put(`/documents/${documentId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

// List all documents
export const listDocuments = async (): Promise<Document[]> => {
  try {
    const response = await api.get('/documents');
    return response.data;
  } catch (error) {
    console.error('Error listing documents:', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (documentId: string): Promise<void> => {
  try {
    await api.delete(`/documents/${documentId}`);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};