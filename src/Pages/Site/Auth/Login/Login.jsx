import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../BASE_URL";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email və şifrə daxil edilməlidir!");
      setIsSuccess(false);
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage("Email düzgün formatda deyil!");
      setIsSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Şifrə ən az 6 simvol olmalıdır!");
      setIsSuccess(false);
      return;
    }

    setMessage("Giriş edilir...");
    setIsSuccess(false);

    try {
      const response = await axios.post(`${BASE_URL}/Auth/login`, {
        email,
        password,
      });

      if (response.data.isSuccess && response.data.data.token) {
        const token = response.data.data.token;
        const userName = response.data.data.userName;
        const rol = response.data.data.role;

        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", rol);

        setMessage(`Uğurlu giriş  ${userName}.`);
        setIsSuccess(true);

        if (rol?.toLowerCase() === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setMessage("Giriş uğursuz oldu. Naməlum xəta.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.data ||
        error.response?.data?.message ||
        "Giriş zamanı xəta baş verdi.";

      setMessage(`Xəta (${error.response?.status || "500"}): ${errorMessage}`);
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <h2> İstifadəçi Girişi (Login)</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Şifrə:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Giriş Et</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
