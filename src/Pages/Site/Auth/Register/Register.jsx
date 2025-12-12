import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../BASE_URL";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !userName) {
      setMessage("Zəhmət olmasa bütün xanaları doldurun!");
      setIsSuccess(false);
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setMessage("Email formatı düzgün deyil!");
      setIsSuccess(false);
      return;
    }

    if (userName.trim().length < 3) {
      setMessage("İstifadəçi adı ən az 3 simvol olmalıdır!");
      setIsSuccess(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Şifrə ən az 6 simvol olmalıdır!");
      setIsSuccess(false);
      return;
    }

    setMessage("Qeydiyyat aparılır...");
    setIsSuccess(false);

    try {
      const response = await axios.post(`${BASE_URL}/Auth/register`, {
        email,
        password,
        userName,
        role: "user", 
      });

      if (response.data.isSuccess) {
        setMessage(
          "🎉 Uğurla qeydiyyatdan keçdiniz! İndi daxil ola bilərsiniz."
        );
        setIsSuccess(true);

        setEmail("");
        setPassword("");
        setUserName("");
      } else {
        setMessage("Qeydiyyat uğursuz oldu. Naməlum xəta.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.data ||
        error.response?.data?.message ||
        "Qeydiyyat zamanı xəta baş verdi.";

      setMessage(`Xəta (${error.response?.status || "500"}): ${errorMessage}`);
      setIsSuccess(false);
    }
  };

  return (
    <div
     
    >
      <h2>Qeydiyyat </h2>

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>İstifadəçi Adı:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Şifrə:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
          />
        </div>

        <button
          type="submit"
          
        >
          Qeydiyyatdan Keç
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: isSuccess ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
