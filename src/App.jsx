import Home from "./pages/Home";
import Form from "./pages/Form";
import "./App.scss";
import InvoicePDF from "./components/Invoice";

const App = () => {
  return (
    <div>
      <Home />
      <Form />
      <InvoicePDF />
    </div>
  );
};

export default App;
