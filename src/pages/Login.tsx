import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import LoadingSpinner from "../components/LoadngSpinner";
import { useAuth } from "../stores/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();

    const form = new FormData(ev.target as HTMLFormElement);
    const request = {
      username: form.get("username"),
      password: form.get("password"),
    };

    try {
      setErrorMessage("");
      setLoading(true);
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.data.token;
        auth.setTokenStorage(token);
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.log("Error in login:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper title="Login" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input required type="text" name="username" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input required type="password" name="password" />
      </div>
      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
      <button type="submit" disabled={loading}>
        {loading ? <LoadingSpinner className="!w-7 !h-7" /> : "Login"}
      </button>
    </FormWrapper>
  );
}
