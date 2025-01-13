// features/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db , serverTimestamp } from '../configs/firebase';
import { collection, addDoc, getDocs, updateDoc, docRef, deleteDoc, doc } from 'firebase/firestore';


const serializeData = (data) => {
  const serializedData = { ...data };
  Object.keys(serializedData).forEach((key) => {
    if (serializedData[key]?.seconds) {
      serializedData[key] = new Date(serializedData[key].seconds * 1000).toISOString();
    }
  });
  return serializedData;
};

// Async thunk for CRUD operations
export const fetchData = createAsyncThunk('data/fetchData', async (parameter) => {
  const snapshot = await getDocs(collection(db, parameter));
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(data, 'users');
  return  data;
});

export const addData = createAsyncThunk('data/addData', async (addData,newData) => {

  const Data = {
    ...newData,
    createdAt: serverTimestamp(),
  }

  console.log(Data, 'data');
  const docRef = await addDoc(collection(db,addData ), ...Data);
  const docSnapshot = await docRef.get();

  const serializedData = serializeData({ id: docRef.id, ...docSnapshot.data() });

  return { id: docRef.id, ...serializedData };
});

export const updateData = createAsyncThunk('data/updateData', async ({ id, updatedData }) => {
  const docRef = doc(db, 'yourCollectionName', id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
});

export const deleteData = createAsyncThunk('data/deleteData', async (id) => {
  const docRef = doc(db, 'yourCollectionName', id);
  await deleteDoc(docRef);
  return id;
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.data.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item.id !== action.payload);
      });
  }
});

export default dataSlice.reducer;

export const selectData = (state) => state.data.data;
