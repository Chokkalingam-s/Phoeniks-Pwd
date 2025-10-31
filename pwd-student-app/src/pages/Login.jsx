import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { verifyUDID } from '../services/api';

function Login() {
  const [udid, setUdid] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!udid || udid.length < 10) {
      setError('Please enter a valid UDID number');
      return;
    }

    setLoading(true);
    try {
      const response = await verifyUDID(udid);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to verify UDID. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Shield size={40} strokeWidth={2} />
          </div>
          <h1 style={styles.title}>PWD EduConnect</h1>
          <p style={styles.subtitle}>
            Empowering PWD students through verified education and opportunities
          </p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>UDID Number</label>
            <input
              type="text"
              placeholder="Enter your UDID (e.g., MH-04-WB-12345678)"
              value={udid}
              onChange={(e) => setUdid(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
            {error && <p style={styles.error}>{error}</p>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Login with UDID</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={styles.infoSection}>
          <p style={styles.infoText}>
            Don't have a UDID?{' '}
            <a
              href="https://swavlambancard.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Get UDID Card
            </a>
          </p>
          <p style={styles.helperText}>
            Use demo UDID: <strong>MH-04-WB-12345678</strong>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
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
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
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
    display: 'block',
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
  error: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#c0152f',
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
  buttonDisabled: {
    backgroundColor: '#626c71',
    cursor: 'not-allowed',
  },
  infoSection: {
    textAlign: 'center',
    paddingTop: '24px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  infoText: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '8px',
  },
  link: {
    color: '#21808d',
    textDecoration: 'none',
    fontWeight: '500',
  },
  helperText: {
    fontSize: '12px',
    color: '#626c71',
    marginTop: '12px',
    padding: '8px 12px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    borderRadius: '6px',
  },
};

export default Login;
