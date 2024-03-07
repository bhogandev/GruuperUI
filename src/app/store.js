import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthSlice";
import UserSlice from "./features/UserSlice";
import TimeLineSlice from "./features/TimeLineSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        timeline: TimeLineSlice,
    }
})