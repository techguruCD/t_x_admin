import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SetPanePayload = {
    selectedPane: 'ads' | 'users'
}
interface PaneState {
    selectedPane: 'users' | 'ads'
}
const initialState: PaneState = {
    selectedPane: 'users'
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.selectedPane = 'users'
        },
        setSelectedPane: (state, action: PayloadAction<SetPanePayload>) => {
            state.selectedPane = action.payload.selectedPane
        },
    }
});

export const { reset, setSelectedPane } = dashboardSlice.actions;
export type { PaneState }
export default dashboardSlice.reducer;
