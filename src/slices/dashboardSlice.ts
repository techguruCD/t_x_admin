import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SetPanePayload =  'ads' | 'users'
interface DashboardState {
    selectedPane: 'users' | 'ads'
}
const initialState: DashboardState = {
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
            state.selectedPane = action.payload
        },
    }
});

export const { reset, setSelectedPane } = dashboardSlice.actions;
export type { DashboardState, SetPanePayload }
export default dashboardSlice.reducer;
