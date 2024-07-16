import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:"",
        staff:"",
        admin:"",
        isLoggedIn: false,
        isStaffLoggedIn: false,
        isAdminLoggedIn: false
    },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        staffLogin(state) {
            state.isStaffLoggedIn = true;
        },
        staffLogout(state) {
            state.isStaffLoggedIn = false;
        },
        adminLogin(state) {
            state.isAdminLoggedIn = true;
        },
        adminLogout(state) {
            state.isAdminLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer,
});
