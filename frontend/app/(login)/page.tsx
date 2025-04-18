"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const [usernames, setUsernames] = useState("");
  const [passwords, setPasswords] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    if (!usernames || !passwords) {
      setError("Please fill in all fields");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formData = new URLSearchParams();
    formData.append("username", usernames);
    formData.append("password", passwords);

    try {
      const response = await fetch("http://localhost:4000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      setLoading(false);

      if (response.ok) {
        console.log("login bar");
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        //localStorage.setItem("user", data.user);
        console.log(data);
        router.push("/workouts");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Authentication failed");
      }
    } catch (error) {
      setLoading(false);
      setError("Authentication failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={usernames}
            onChange={(e) => setUsernames(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={passwords}
            onChange={(e) => setPasswords(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Home;
