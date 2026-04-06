import React, { useMemo, useState } from "react";

const initialValues = {
  username: "",
  email: "",
  phone: "",
  password: "",
};

function validateUsername(username) {
  const value = username.trim();

  if (!value) return "Username is required";
  if (value.length < 3) return "Username must be at least 3 characters";
  if (value.length > 20) return "Username must not exceed 20 characters";
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
    return "Use letters first, then letters, numbers, _ or -";
  }

  return "";
}

function validateEmail(email) {
  const value = email.trim();

  if (!value) return "Email is required";
  if (!/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
    return "Enter a valid email address";
  }

  return "";
}

function validatePhone(phone) {
  if (!phone) return "Phone number is required";
  if (!/^\d{10}$/.test(phone)) return "Phone number must be exactly 10 digits";
  if (phone.startsWith("0") || phone.startsWith("1")) {
    return "Phone number cannot start with 0 or 1";
  }

  return "";
}

function validatePassword(password) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ];

  if (!password) return "Password is required";
  if (checks.every(Boolean)) return "";

  return "Password needs 8+ chars, upper, lower, number and special character";
}

function Form() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordChecks = useMemo(
    () => ({
      length: values.password.length >= 8,
      uppercase: /[A-Z]/.test(values.password),
      lowercase: /[a-z]/.test(values.password),
      number: /\d/.test(values.password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(values.password),
    }),
    [values.password]
  );

  const strength = Object.values(passwordChecks).filter(Boolean).length;

  const strengthMeta = useMemo(() => {
    if (!values.password) return { label: "", width: "0%", color: "#cbd5e1" };
    if (strength <= 2) return { label: "Weak", width: "40%", color: "#ef4444" };
    if (strength <= 4) return { label: "Medium", width: "75%", color: "#f59e0b" };
    return { label: "Strong", width: "100%", color: "#10b981" };
  }, [strength, values.password]);

  const validators = {
    username: validateUsername,
    email: validateEmail,
    phone: validatePhone,
    password: validatePassword,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setValues((current) => ({
      ...current,
      [name]: nextValue,
    }));

    setErrors((current) => ({
      ...current,
      [name]: validators[name](nextValue),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      username: validateUsername(values.username),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      password: validatePassword(values.password),
    };

    setErrors(nextErrors);

    if (!Object.values(nextErrors).some(Boolean)) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors(initialValues);
    setSubmitted(false);
    setShowPassword(false);
  };

  if (submitted) {
    return (
      <div className="card form-success">
        <h2>Account Created</h2>
        <p>Your registration details were validated successfully.</p>
        <div className="summary-row">
          <strong>Username:</strong> <span>{values.username}</span>
        </div>
        <div className="summary-row">
          <strong>Email:</strong> <span>{values.email}</span>
        </div>
        <div className="summary-row">
          <strong>Phone:</strong> <span>{values.phone}</span>
        </div>
        <button type="button" onClick={resetForm}>
          Create Another
        </button>
      </div>
    );
  }

  return (
    <form className="card form-card-react" onSubmit={handleSubmit} noValidate>
      <h2>Validated Form</h2>
      <p className="muted">Username, email, phone and password checks are live.</p>

      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Enter username"
        className={errors.username ? "input-error" : values.username ? "input-success" : ""}
      />
      {errors.username && <p className="field-error">{errors.username}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email"
        className={errors.email ? "input-error" : values.email ? "input-success" : ""}
      />
      {errors.email && <p className="field-error">{errors.email}</p>}

      <label htmlFor="phone">Phone Number</label>
      <input
        id="phone"
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="10 digit number"
        className={errors.phone ? "input-error" : values.phone ? "input-success" : ""}
      />
      {errors.phone && <p className="field-error">{errors.phone}</p>}

      <label htmlFor="password">Password</label>
      <div className="password-row">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange}
          placeholder="Create password"
          className={errors.password ? "input-error" : values.password ? "input-success" : ""}
        />
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {errors.password && <p className="field-error">{errors.password}</p>}

      <div className="strength-meter">
        <div
          className="strength-fill"
          style={{ width: strengthMeta.width, backgroundColor: strengthMeta.color }}
        />
      </div>
      <p className="strength-label" style={{ color: strengthMeta.color }}>
        {strengthMeta.label}
      </p>

      <div className="requirements-box">
        <p>Password requirements</p>
        <span className={passwordChecks.length ? "met" : ""}>8+ characters</span>
        <span className={passwordChecks.uppercase ? "met" : ""}>1 uppercase</span>
        <span className={passwordChecks.lowercase ? "met" : ""}>1 lowercase</span>
        <span className={passwordChecks.number ? "met" : ""}>1 number</span>
        <span className={passwordChecks.special ? "met" : ""}>1 special</span>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
