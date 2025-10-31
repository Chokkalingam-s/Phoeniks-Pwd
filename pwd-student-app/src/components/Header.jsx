import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  BookOpen, 
  Building2, 
  User, 
  Bell,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useState } from 'react';

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/schemes', label: 'Schemes', icon: DollarSign },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/organizations', label: 'Organizations', icon: Building2 },
    { path: '/portfolio', label: 'Portfolio', icon: User },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <div style={styles.logo}>
            <Shield size={24} strokeWidth={2.5} />
            <span style={styles.logoText}>PWD EduConnect</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav style={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(location.pathname === item.path ? styles.navLinkActive : {}),
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div style={styles.actions}>
          <button style={styles.iconBtn}>
            <Bell size={20} />
          </button>
          <button 
            style={styles.menuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav style={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.mobileNavLink,
                ...(location.pathname === item.path ? styles.navLinkActive : {}),
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(94, 82, 64, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#13343b',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '600',
  },
  desktopNav: {
    display: 'none',
    alignItems: 'center',
    gap: '4px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    borderRadius: '8px',
    color: '#626c71',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#626c71',
    transition: 'background-color 0.2s ease',
  },
  menuBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#626c71',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 20px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
    gap: '8px',
  },
  mobileNavLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    color: '#626c71',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
};

// Media query for desktop
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  if (mediaQuery.matches) {
    styles.desktopNav.display = 'flex';
    styles.menuBtn.display = 'none';
  }
}

export default Header;
