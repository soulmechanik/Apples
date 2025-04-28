'use client'
import { useState } from "react";
import styles from "./LandlordForm.module.scss";

const LandlordForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nationality: "",
    inDiaspora: false,
    dateOfBirth: "",
    property: {
      name: "",
      state: "",
      address: "",
      type: "",
    },
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.startsWith("property.")) {
      // ✅ Ensure property is updated correctly
      const propertyField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        property: {
          ...prev.property,
          [propertyField]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data", formData);
    onComplete(formData);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Personal Details</h2>
            <label>Nationality</label>
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
            <label>Currently in Diaspora?</label>
            <select name="inDiaspora" value={formData.inDiaspora} onChange={handleChange} required>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <label>Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Property Details</h2>
            <label>Property Name</label>
            <input type="text" name="property.name" value={formData.property.name} onChange={handleChange} required />
            <label>State</label>
            <input type="text" name="property.state" value={formData.property.state} onChange={handleChange} required />
            <label>Address</label>
            <input type="text" name="property.address" value={formData.property.address} onChange={handleChange} required />
            <label>Property Type</label>
            <select name="property.type" value={formData.property.type} onChange={handleChange} required>
              <option value="">Select Property Type</option>
              <option value="residential">Residential Property (for rent)</option>
              <option value="hotel">Hotel</option>
              <option value="commercial">Commercial</option>
            </select>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Financial Information</h2>
            <label>Bank Name</label>
            <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />
            <label>Account Number</label>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} required />
            <label>Account Holder's Name</label>
            <input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} required />
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LandlordForm;
