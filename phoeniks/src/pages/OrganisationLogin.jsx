import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Lock, User, CheckCircle, ArrowRight } from "lucide-react";

export default function OrganizationLogin() {
  const [form, setForm] = useState({
    orgId: "",
    password: "",
    sampleEnabled: false
  });

  const dummy = {
    orgId: "ORG2025DEMO",
    password: "orgDemoPass123"
  };

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "sampleEnabled") {
      setForm({
        orgId: checked ? dummy.orgId : "",
        password: checked ? dummy.password : "",
        sampleEnabled: checked
      });
      return;
    }
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/org-dashboard");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Building2 size={40} strokeWidth={2} />
          </div>
          <h1 style={styles.title}>Organization Portal</h1>
          <p style={styles.subtitle}>
            Manage your organization and upload educational content
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <User size={16} style={{ marginRight: '6px' }} />
              Organization ID
            </label>
            <input
              id="orgId"
              name="orgId"
              type="text"
              placeholder="Enter your Organization ID"
              value={form.orgId}
              onChange={handleChange}
              style={styles.input}
              required
              autoFocus
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              <Lock size={16} style={{ marginRight: '6px' }} />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                id="sampleEnabled"
                name="sampleEnabled"
                type="checkbox"
                checked={form.sampleEnabled}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Use demo credentials</span>
            </label>
          </div>

          {form.sampleEnabled && (
            <div style={styles.demoInfo}>
              <CheckCircle size={16} color="#21808d" />
              <div style={styles.demoText}>
                <p style={styles.demoCredentials}>
                  <strong>ID:</strong> {dummy.orgId}
                </p>
                <p style={styles.demoCredentials}>
                  <strong>Password:</strong> {dummy.password}
                </p>
              </div>
            </div>
          )}

          <button type="submit" style={styles.button}>
            <span>Login to Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Need access? Contact your administrator
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcf9',
    padding: '20px',
  },
  card: {
    maxWidth: '480px',
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    marginBottom: '16px',
  },
  title: {
    fontSize: '30px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#626c71',
    lineHeight: '1.6',
  },
  form: {
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  checkboxGroup: {
    marginBottom: '20px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    marginRight: '8px',
    cursor: 'pointer',
    accentColor: '#21808d',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#13343b',
  },
  demoInfo: {
    display: 'flex',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid rgba(33, 128, 141, 0.2)',
  },
  demoText: {
    flex: 1,
  },
  demoCredentials: {
    fontSize: '13px',
    color: '#13343b',
    margin: '2px 0',
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  footer: {
    textAlign: 'center',
    paddingTop: '24px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  footerText: {
    fontSize: '14px',
    color: '#626c71',
  },
};
