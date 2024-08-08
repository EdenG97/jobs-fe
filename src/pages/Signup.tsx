import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import LoadingSpinner from "../components/LoadngSpinner";

export default function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormWrapper title="Signup" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>
      {errorMessage && (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
      <button type="submit" disabled={loading}>
        {loading ? <LoadingSpinner className="!w-7 !h-7" /> : "Signup"}
      </button>
    </FormWrapper>
  );
}
