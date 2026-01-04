import { RouterProvider } from "react-router";
import { router } from "./router";
import { store } from "./stores/root.store.ts";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors closeButton />
    </Provider>
  );
}

export default App;
