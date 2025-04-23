// export interface Document {
//   id?: string;
//   name: string;
//   content: string;
//   language: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// // Fetch a document by ID
// export const fetchDocument = async (documentId: string): Promise<Document> => {
//   try {
//     const response = await fetch(`${apiUrl}/api/documents/${documentId}`);
//     if (!response.ok) throw new Error('Error fetching document');
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching document:', error);
//     throw error;
//   }
// };

// // Save a document
// export const saveDocument = async (documentId: string, data: any) => {
//   try {
//     const method = documentId === 'new' ? 'POST' : 'PUT';
//     const url = documentId === 'new' ? '/api/documents' : `/api/documents/${documentId}`;

//     const response = await fetch(`${apiUrl}${url}`, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) throw new Error('Error saving document');
//     return await response.json();
//   } catch (error) {
//     console.error('Error saving document:', error);
//     throw error;
//   }
// };

// // List all documents
// // export const listDocuments = async (): Promise<Document[]> => {
// //   try {
// //     const response = await fetch(`${apiUrl}/api/documents`);
// //     if (!response.ok) throw new Error('Error listing documents');
// //     return await response.json();
// //   } catch (error) {
// //     console.error('Error listing documents:', error);
// //     throw error;
// //   }
// // };

// // Delete a document
// // export const deleteDocument = async (documentId: string): Promise<void> => {
// //   try {
// //     const response = await fetch(`${apiUrl}/api/documents/${documentId}`, {
// //       method: 'DELETE',
// //     });
// //     if (!response.ok) throw new Error('Error deleting document');
// //   } catch (error) {
// //     console.error('Error deleting document:', error);
// //     throw error;
// //   }
// // };
