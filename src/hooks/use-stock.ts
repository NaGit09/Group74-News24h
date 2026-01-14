import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockStore } from "@/stores/stock.store";
import { getStockData } from "@/services/stock.service";
import type { RootState, AppDispatch } from "@/stores/root.store";

export const useStock = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector(
        (state: RootState) => state.stock
    );

    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current || data.length > 0) return;
        initialized.current = true;

        const fetchData = async () => {
            dispatch(stockStore.actions.setLoading(true));
            try {
                const response = await getStockData();
                if (response && response.results) {
                    dispatch(stockStore.actions.setData(response.results));
                } else {
                    dispatch(stockStore.actions.setLoading(false));
                }
            } catch (err: unknown) {
                let errorMessage = "Failed to fetch stock data";
                if (err instanceof Error) {
                    errorMessage = err.message;
                }
                dispatch(stockStore.actions.setError(errorMessage));
            }
        };
        fetchData();
    }, [dispatch, data.length]);

    return { data, loading, error };
};
