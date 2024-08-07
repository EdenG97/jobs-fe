import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./stores/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <main className="max-w-[1240px] m-auto px-4">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Jobs />} />
              <Route path="/detail/:id" element={<JobDetail />} />
            </Route>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
