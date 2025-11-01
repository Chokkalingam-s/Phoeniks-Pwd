import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Award,
  Building2,
  MessageSquare,
  LogOut
} from "lucide-react";

export default function OrganizationDashboard() {
  const navigate = useNavigate();

  const employee = {
    name: "Priya Sharma",
    id: "ORG-EMP-202501",
    address: "32, Mount Road, Chennai, India",
    experience: "10 years",
    role: "Senior Coordinator",
    department: "Administration",
    qualification: "MBA (HR)",
    email: "priya.sharma@organisation.org",
    phone: "+91-9998887776",
    joiningDate: "21-Feb-2014"
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoIcon}>
            <Building2 size={24} />
          </div>
          <h1 style={styles.headerTitle}>Organization Dashboard</h1>
        </div>
        <div style={styles.headerActions}>
          <button
            style={styles.forumButton}
            onClick={() => navigate("/organisation-forum")}
          >
            <MessageSquare size={18} />
            <span>Content Forum</span>
          </button>
          <button
            style={styles.logoutButton}
            onClick={() => navigate("/organisation-login")}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>
            <User size={48} color="#21808d" />
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{employee.name}</h2>
            <p style={styles.profileId}>{employee.id}</p>
            <div style={styles.roleBadge}>
              <Briefcase size={14} />
              <span>{employee.role}</span>
            </div>
          </div>
        </div>

        <div style={styles.detailsGrid}>
          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>
              <Building2 size={20} color="#21808d" />
            </div>
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Department</p>
              <p style={styles.detailValue}>{employee.department}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>
              <GraduationCap size={20} color="#21808d" />
            </div>
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Qualification</p>
              <p style={styles.detailValue}>{employee.qualification}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>
              <Award size={20} color="#21808d" />
            </div>
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Experience</p>
              <p style={styles.detailValue}>{employee.experience}</p>
            </div>
          </div>

          <div style={styles.detailCard}>
            <div style={styles.detailIcon}>
              <Calendar size={20} color="#21808d" />
            </div>
            <div style={styles.detailContent}>
              <p style={styles.detailLabel}>Joining Date</p>
              <p style={styles.detailValue}>{employee.joiningDate}</p>
            </div>
          </div>
        </div>

        <div style={styles.contactSection}>
          <h3 style={styles.sectionTitle}>Contact Information</h3>
          <div style={styles.contactGrid}>
            <div style={styles.contactItem}>
              <Mail size={18} color="#626c71" />
              <a href={`mailto:${employee.email}`} style={styles.contactLink}>
                {employee.email}
              </a>
            </div>
            <div style={styles.contactItem}>
              <Phone size={18} color="#626c71" />
              <span style={styles.contactText}>{employee.phone}</span>
            </div>
            <div style={styles.contactItem}>
              <MapPin size={18} color="#626c71" />
              <span style={styles.contactText}>{employee.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fcfcf9',
    padding: '24px 20px',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  forumButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#21808d',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    border: '1px solid rgba(33, 128, 141, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#c0152f',
    backgroundColor: 'rgba(192, 21, 47, 0.1)',
    border: '1px solid rgba(192, 21, 47, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  profileCard: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
  },
  profileHeader: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(94, 82, 64, 0.12)',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  profileId: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '12px',
  },
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  detailCard: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    backgroundColor: 'rgba(94, 82, 64, 0.03)',
    borderRadius: '8px',
    border: '1px solid rgba(94, 82, 64, 0.08)',
  },
  detailIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    flexShrink: 0,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: '12px',
    color: '#626c71',
    marginBottom: '4px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#13343b',
  },
  contactSection: {
    paddingTop: '24px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '16px',
  },
  contactGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  contactLink: {
    fontSize: '14px',
    color: '#21808d',
    textDecoration: 'none',
  },
  contactText: {
    fontSize: '14px',
    color: '#13343b',
  },
};
