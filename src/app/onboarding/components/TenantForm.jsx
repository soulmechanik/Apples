import { useState } from "react";
import styles from "./TenantForm.module.scss";

const TenantForm = ({ onComplete, propertyId, landlordId, setHasPaidBefore, submitting }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ethnicGroup: "",
    stateOfOrigin: "",
    maritalStatus: "",
    education: "",
    employerName: "",
    employerAddress: "",
    employerWebsite: "",
    employerEmail: "",
    jobTitle: "",
    monthlyIncome: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    roomDescription: "",
    rentStartDate: "", // New field for rent start date, only visible if hasPaidBefore is true
    rentDuration: "Annual", // Default to Annual if paid before, else landlord chooses
    rentAmount: "", // New field for amount paid in rent
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure rentStartDate is provided for those who have paid before
    if (formData.hasPaidBefore && !formData.rentStartDate) {
      alert("Please provide a Rent Start Date.");
      return;
    }

    // Ensure rentAmount is provided for those who have paid before
    if (formData.hasPaidBefore && !formData.rentAmount) {
      alert("Please provide the amount paid in rent.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      propertyId,
      landlordId,
      hasPaidBefore: formData.hasPaidBefore, // Include hasPaidBefore in the payload
    };

    console.log("📌 Final Tenant Form Submission Data:", dataToSubmit);
    onComplete(dataToSubmit);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {/* Step 1 - Payment History */}
        {step === 1 && (
          <div>
            <h2>Have you paid your rent before?</h2>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, hasPaidBefore: true }); // Set hasPaidBefore in formData
                nextStep();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, hasPaidBefore: false }); // Set hasPaidBefore in formData
                nextStep();
              }}
            >
              No
            </button>
          </div>
        )}

        {/* Step 2 - Personal Information */}
        {step === 2 && (
          <div>
            <h2>Personal Information</h2>
            <label>Ethnic Group</label>
            <input
              type="text"
              name="ethnicGroup"
              value={formData.ethnicGroup}
              onChange={handleChange}
              required
            />
            <label>State of Origin</label>
            <input
              type="text"
              name="stateOfOrigin"
              value={formData.stateOfOrigin}
              onChange={handleChange}
              required
            />
            <label>Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
            <label>Educational Qualification</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {/* Step 3 - Employment & Banking Details */}
        {step === 3 && (
          <div>
            <h2>Employment & Banking Details</h2>
            <label>Employer's Name</label>
            <input
              type="text"
              name="employerName"
              value={formData.employerName}
              onChange={handleChange}
              required
            />
            <label>Employer's Address</label>
            <input
              type="text"
              name="employerAddress"
              value={formData.employerAddress}
              onChange={handleChange}
              required
            />
            <label>Employer's Website</label>
            <input
              type="url"
              name="employerWebsite"
              value={formData.employerWebsite}
              onChange={handleChange}
              required
            />
            <label>Employer's Email</label>
            <input
              type="email"
              name="employerEmail"
              value={formData.employerEmail}
              onChange={handleChange}
              required
            />
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
            <label>Monthly Income</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              required
            />
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              required
            />
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
            <label>Account Name</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="button" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {/* Step 4 - Room Details and Rent Information */}
        {step === 4 && (
          <div>
            <h2>Room Details</h2>
            <label>Room Description</label>
            <input
              type="text"
              name="roomDescription"
              value={formData.roomDescription}
              onChange={handleChange}
              required
            />

            {formData.hasPaidBefore && (
              <>
                <label>Rent Start Date</label>
                <input
                  type="date"
                  name="rentStartDate"
                  value={formData.rentStartDate}
                  onChange={handleChange}
                  required
                />
                <label>Rent Duration</label>
                <select
                  name="rentDuration"
                  value={formData.rentDuration}
                  onChange={handleChange}
                  required
                >
                  <option value="Annual">Annual</option>
                  <option value="Bi-Annual">Bi-Annual</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <label>Amount Paid in Rent</label>
                <input
                  type="number"
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button type="button" onClick={prevStep}>
              Back
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TenantForm;