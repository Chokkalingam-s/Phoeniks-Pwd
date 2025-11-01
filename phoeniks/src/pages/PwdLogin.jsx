import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, Lock, CheckCircle, ArrowRight } from "lucide-react";

export default function PwdLogin() {
  const [form, setForm] = useState({
    udid: "",
    password: "",
    sampleEnabled: false,
  });

  const dummyData = {
    udid: "1234-5678-9012",
    password: "password123"
  };

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "sampleEnabled") {
      if (checked) {
        setForm({ udid: dummyData.udid, password: dummyData.password, sampleEnabled: true });
      } else {
        setForm({ udid: "", password: "", sampleEnabled: false });
      }
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/pwd-dashboard");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Shield size={40} strokeWidth={2} />
          </div>
          <h1 style={styles.title}>PWD Student Portal</h1>
          <p style={styles.subtitle}>
            Access your learning resources and opportunities
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              <User size={16} style={{ marginRight: '6px' }} />
              UDID Number
            </label>
            <input
              id="udid"
              name="udid"
              type="text"
              placeholder="Enter your UDID (e.g., 1234-5678-9012)"
              value={form.udid}
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
                  <strong>UDID:</strong> {dummyData.udid}
                </p>
                <p style={styles.demoCredentials}>
                  <strong>Password:</strong> {dummyData.password}
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
            Don't have UDID?{' '}
            <a
              href="https://swavlambancard.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Get UDID Card
            </a>
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
  link: {
    color: '#21808d',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
