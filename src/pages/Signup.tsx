import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";

export default function Signup() {
  const navigate = useNavigate();

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();

    const form = new FormData(ev.target as HTMLFormElement);
    const request = {
      username: form.get("username"),
      password: form.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormWrapper title="Signup" onSubmit={onSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Signup</button>
    </FormWrapper>
  );
}
