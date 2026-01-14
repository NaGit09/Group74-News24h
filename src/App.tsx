import { RouterProvider } from "react-router";
import { router } from "./router";
import { store } from "./stores/root.store.ts";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { Suspense } from "react";
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  );
}

export default App;
