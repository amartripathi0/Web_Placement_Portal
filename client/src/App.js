import { Provider, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "./redux/store";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className=" h-screen">
      <ToastContainer
        bodyClassName={"text-[0.8vw] max-sm:text-sm"}
        autoClose={5000}
        style={{ top: "8%" }}
      />
      <Provider store={store}>
        <Outlet />
      </Provider>
    </div>
  );
}
export default App;
