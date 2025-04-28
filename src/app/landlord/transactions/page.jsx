"use client";

import { useState, useEffect } from "react";
import Layout from "../../../components/layout/layout";
import styles from "./transactions.module.scss";
import { Button, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { FiEye, FiChevronRight, FiFilter, FiDownload } from "react-icons/fi";

const Invoices = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  // Enhanced data fetching with error handling
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store"
        });
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        setInvoices(transformInvoiceData(data));
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        // TODO: Add error state UI
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const transformInvoiceData = (data) => {
    return data.map((invoice) => ({
      id: invoice._id,
      category: invoice.category,
      tenant: invoice.tenantName,
      property: invoice.propertyName,
      rawDate: new Date(invoice.date),
      date: new Date(invoice.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      amount: invoice.amount,
      formattedAmount: `₦${invoice.amount.toLocaleString()}`,
      status: invoice.status === "paid" ? "Paid" : "Pending",
      paymentMethod: invoice.paymentMethod || "Bank Transfer"
    }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedInvoices = [...invoices].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Transaction Ledger</h1>
            <p className={styles.subtitle}>{invoices.length} total transactions</p>
          </div>
          <div className={styles.actions}>
            <Button variant="outlined" startIcon={<FiFilter />} className={styles.filterButton}>
              Filters
            </Button>
            <Button variant="outlined" startIcon={<FiDownload />} className={styles.exportButton}>
              Export
            </Button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => handleSort("category")}>
                    <div className={styles.thContent}>
                      Category
                      <span className={`${styles.sortArrow} ${sortConfig.key === "category" ? styles.active : ""}`}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("tenant")}>
                    <div className={styles.thContent}>
                      Tenant
                      <span className={`${styles.sortArrow} ${sortConfig.key === "tenant" ? styles.active : ""}`}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("property")}>
                    <div className={styles.thContent}>
                      Property
                      <span className={`${styles.sortArrow} ${sortConfig.key === "property" ? styles.active : ""}`}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("rawDate")}>
                    <div className={styles.thContent}>
                      Date
                      <span className={`${styles.sortArrow} ${sortConfig.key === "rawDate" ? styles.active : ""}`}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => handleSort("amount")}>
                    <div className={styles.thContent}>
                      Amount
                      <span className={`${styles.sortArrow} ${sortConfig.key === "amount" ? styles.active : ""}`}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    </div>
                  </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(7).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td><Skeleton variant="rounded" width="80%" height={24} /></td>
                      <td><Skeleton variant="rounded" width="70%" height={24} /></td>
                      <td><Skeleton variant="rounded" width="90%" height={24} /></td>
                      <td><Skeleton variant="rounded" width={100} height={24} /></td>
                      <td><Skeleton variant="rounded" width={120} height={24} /></td>
                      <td><Skeleton variant="rounded" width={80} height={32} /></td>
                      <td><Skeleton variant="rounded" width={100} height={36} /></td>
                    </tr>
                  ))
                ) : (
                  sortedInvoices.map((invoice) => (
                    <tr key={invoice.id} className={styles.dataRow}>
                      <td>
                        <div className={styles.categoryCell}>
                          <span className={styles.categoryPill}>{invoice.category}</span>
                        </div>
                      </td>
                      <td>
                        <div className={styles.tenantCell}>
                          <span className={styles.tenantName}>{invoice.tenant}</span>
                          <span className={styles.paymentMethod}>{invoice.paymentMethod}</span>
                        </div>
                      </td>
                      <td className={styles.propertyCell}>{invoice.property}</td>
                      <td className={styles.dateCell}>{invoice.date}</td>
                      <td className={styles.amountCell}>{invoice.formattedAmount}</td>
                      <td>
                        <div className={`${styles.statusPill} ${styles[invoice.status.toLowerCase()]}`}>
                          {invoice.status}
                        </div>
                      </td>
                      <td>
                        <Button
                          variant="text"
                          className={styles.viewButton}
                          onClick={() => router.push(`/landlord/transactions/${invoice.id}`)}
                          endIcon={<FiChevronRight size={18} />}
                          disabled={invoice.status !== "Paid"}
                        >
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.pagination}>
            <span>Showing 1-{Math.min(invoices.length, 10)} of {invoices.length}</span>
            <div className={styles.paginationControls}>
              <button disabled>Previous</button>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;