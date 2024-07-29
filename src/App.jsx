import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <MainLayout />
    </>
  );
}

export default App;
