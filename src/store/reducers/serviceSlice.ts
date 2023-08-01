
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceState {
  services: any[];
  statistics: any[];
}

const initialState: ServiceState = {
  services: [],
  statistics: []
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setServices(state, action: PayloadAction<any>) {
        state.services = action.payload
    },
    setStatistics(state, action: PayloadAction<any>) {
        state.statistics = action.payload
    },
    
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.count += action.payload;
    // },
  },
});

export const { setServices, setStatistics } = serviceSlice.actions;
export default serviceSlice.reducer;
