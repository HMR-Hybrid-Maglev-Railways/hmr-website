import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (window.location.pathname === "/" ? <Index /> : <NotFound />);

export default App;
