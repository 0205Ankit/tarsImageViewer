import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ImageApi } from "./apiSlice";

export const toastSliceInitialState = {
  showToast: false,
  title: "",
  info: "info",
  type: "",
  code: "",
};

const filterSearchInitialState={
    data:null,
    isLoading:false,
}

const userIntialState={
    user:{}
}

const currUserInitialState={
    data:{}
}

const loadingScreenInitialState={
    loading:false
}

const showModalInitialState={
    showModal:false
}

const toastSlice = createSlice({
  name: "toast",
  initialState: toastSliceInitialState,
  reducers: {
    showToast(state, action) {
      // state.showToast = action.payload;
      state.showToast = true;
      state.title = action.payload.title;
      state.info = action.payload.info;
      state.code = action.payload.code;
      state.type = action.payload.type;
    },
    hideToast(state) {
      state.showToast = false;
    },
  },
});

const filterSearch = createSlice({
  name: "filterSearch",
  initialState: filterSearchInitialState,
  reducers: {
    setData(state, action) {
        state.data = action.payload.filterSearch;
        state.isLoading = action.payload.isLoading;
    },
  },
});

const user = createSlice({
  name: "user",
  initialState: userIntialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

const currentUser= createSlice({
    name:"currentUser",
    initialState: currUserInitialState,
    reducers:{
        setcurrData(state, action) {
            state.data=action.payload
        }
    }
})

const loadingScreen = createSlice({
  name: "loadingScreen",
  initialState: loadingScreenInitialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});


const showModal = createSlice({
  name: "showModal",
  initialState: showModalInitialState,
  reducers: {
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    filterSearch:filterSearch.reducer,
    user:user.reducer,
    currentUser:currentUser.reducer,
    loadingScreen:loadingScreen.reducer,
    showModal:showModal.reducer,
    [ImageApi.reducerPath]: ImageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ImageApi.middleware),
});

setupListeners(store.dispatch);

export const toastSliceActions = toastSlice.actions;
export const filterSearchActions = filterSearch.actions;
export const userActions = user.actions;
export const currentUserActions = currentUser.actions;
export const loadingScreenActions = loadingScreen.actions;
export const showModalActions = showModal.actions;


export default store;
