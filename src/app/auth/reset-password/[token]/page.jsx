"use client";
import styles from './reset.module.scss';
import { useState } from 'react';
import { useParams } from 'next/navigation';

function ResetPassword() {
  const params = useParams();
  const token = params.token;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handling submit...", { token, newPassword, confirmPassword });

    if (!token) {
      console.error("Invalid or missing token.");
      alert("Invalid or missing token.");
      return;
    }

    if (newPassword.length < 8) {
      console.error("Password must be at least 8 characters long.");
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.error("Passwords do not match.");
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Making API request...", { token, newPassword });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password/${token}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }), // ✅ Fixed request body
        }
      );

      console.log("API response received...", response);

      setLoading(false);

      if (response.ok) {
        console.log("Password reset successful.");
        alert("Password has been reset successfully. You can now log in with your new password.");
        window.location.href = "/auth/login";
      } else {
        console.error("Password reset failed.", response);
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error resetting password...", error);
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className={styles['reset-password-container']}>
      <h1>Reset Your Password</h1>
      {error && <p className={styles['error-message']}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>New Password (min. 8 characters)</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
