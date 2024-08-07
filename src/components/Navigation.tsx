import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/auth";

export default function Navigation() {
  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.token;

  function logout() {
    auth.removeTokenStorage();
    navigate("/login", { replace: true });
  }

  return (
    <header className="bg-blue-200 px-4">
      <nav className="max-w-[1240px] m-auto py-2">
        <ul className="flex justify-end gap-4 font-bold">
          {!token ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          ) : (
            <li>
              <button className="px-4 py-2 mt-0" type="button" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
