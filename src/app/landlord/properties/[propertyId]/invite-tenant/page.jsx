"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Layout from "../../../../../components/layout/layout";
import styles from "./inviteTenant.module.scss";
import { TextField, Button, Card, CardContent, Typography, Skeleton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const InviteTenant = () => {
  const { propertyId } = useParams(); // This is the property's Mongo _id (67ce6057ab914318687f6981)
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsFetching(false), 1000);
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendInvite = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email format. Please enter a valid email.");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token"); // Auth token if needed

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tenant/invite`,
        { email, propertyId }, // 🔥 Only send `propertyId` (_id), backend handles the rest
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(response.data.message || "Invitation sent successfully!");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send invitation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {isFetching ? (
          <Card className={styles.card}>
            <CardContent>
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="rectangular" width={150} height={40} />
            </CardContent>
          </Card>
        ) : (
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" className={styles.title}>
                Invite Tenant
              </Typography>
              <Typography variant="body2" className={styles.description}>
                Enter the tenant's email address, and we will send them an invitation to join Forems.
              </Typography>
              <TextField
                label="Tenant Email"
                variant="outlined"
                fullWidth
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
              />
              {success && <Typography className={styles.success}>{success}</Typography>}
              <Button
                variant="contained"
                color="primary"
                className={styles.sendButton}
                onClick={handleSendInvite}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Send Invitation"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default InviteTenant;
