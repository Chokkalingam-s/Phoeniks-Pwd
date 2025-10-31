import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  BookOpen, 
  Building2, 
  User 
} from 'lucide-react';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/schemes', label: 'Schemes', icon: DollarSign },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/organizations', label: 'Organizations', icon: Building2 },
    { path: '/portfolio', label: 'Portfolio', icon: User },
  ];

  return (
    <aside style={styles.sidebar}>
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              ...(location.pathname === item.path ? styles.linkActive : {}),
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    height: 'calc(100vh - 73px)',
    backgroundColor: '#ffffff',
    borderRight: '1px solid rgba(94, 82, 64, 0.2)',
    padding: '16px',
    position: 'fixed',
    left: 0,
    top: '73px',
    overflowY: 'auto',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    color: '#626c71',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  linkActive: {
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
  },
};

export default Sidebar;
