import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { Feedback } from "./components/feedback/feedback";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppRouter/>
      <Feedback /> 
    </BrowserRouter>
  );
}

export default App;
