import { createSlice } from '@reduxjs/toolkit'
import type { CounterState } from '../types/store-type/counter.type'

//create init state
const initialState : CounterState = {
    value : 0
}

export const counterStore = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterStore.actions
export default counterStore.reducer