import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockStore } from "@/stores/stock.store";
import { getStockData } from "@/services/stock.service";
import StockChart from "@/components/stock/StockChart";
import type { RootState, AppDispatch } from "@/stores/root.store";

const StockPage = () => {
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
      } catch (err: any) {
        dispatch(
          stockStore.actions.setError(
            err.message || "Failed to fetch stock data"
          )
        );
      }
    };
    fetchData();
  }, [dispatch, data.length]);

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Stock Dividends
        </h1>
        <p className="text-gray-500">Overview of recent dividend payouts</p>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          Error loading data: {error}
        </div>
      )}

      {!loading && !error && data && data.length > 0 && (
        <StockChart data={data} />
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <div className="text-center text-gray-500 py-12">
          No stock data available.
        </div>
      )}
    </div>
  );
};

export default StockPage;
