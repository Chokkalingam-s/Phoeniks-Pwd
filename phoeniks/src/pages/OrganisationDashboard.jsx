import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building2,
  MessageSquare,
  LogOut,
  X,
  Navigation,
  AlertCircle,
  CheckCircle,
  UserX,
  Users
} from "lucide-react";

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const employee = {
    name: "Priya Sharma",
    id: "ORG-EMP-202501",
    role: "Senior Coordinator",
  };

  // Mock data for PWD individuals (replace with real API data)
  const pwdIndividuals = [
    {
      id: 1,
      name: "Rajesh Kumar",
      lat: 13.0827,
      lng: 80.2707,
      status: "not-applied", // Red
      disability: "Visual Impairment",
      phone: "+91-9876543210",
      address: "12, Anna Salai, Chennai, Tamil Nadu",
      age: 28,
      eligible: true
    },
    {
      id: 2,
      name: "Meena Devi",
      lat: 13.0878,
      lng: 80.2785,
      status: "registered", // Yellow
      disability: "Hearing Impairment",
      phone: "+91-9876543211",
      address: "45, T Nagar, Chennai, Tamil Nadu",
      age: 32,
      registeredDate: "2025-10-15"
    },
    {
      id: 3,
      name: "Arjun Patel",
      lat: 13.0850,
      lng: 80.2750,
      status: "active", // Green
      disability: "Locomotor Disability",
      phone: "+91-9876543212",
      address: "78, Nungambakkam, Chennai, Tamil Nadu",
      age: 25,
      organization: "Skills Training Center",
      joinedDate: "2025-09-20",
      coursesCompleted: 3
    },
    {
      id: 4,
      name: "Lakshmi Reddy",
      lat: 13.0800,
      lng: 80.2650,
      status: "not-applied",
      disability: "Intellectual Disability",
      phone: "+91-9876543213",
      address: "23, Mylapore, Chennai, Tamil Nadu",
      age: 22,
      eligible: true
    },
    {
      id: 5,
      name: "Suresh Babu",
      lat: 13.0900,
      lng: 80.2800,
      status: "registered",
      disability: "Multiple Disabilities",
      phone: "+91-9876543214",
      address: "90, Adyar, Chennai, Tamil Nadu",
      age: 35,
      registeredDate: "2025-10-25"
    },
    {
      id: 6,
      name: "Priya Menon",
      lat: 13.0820,
      lng: 80.2720,
      status: "active",
      disability: "Visual Impairment",
      phone: "+91-9876543215",
      address: "56, Velachery, Chennai, Tamil Nadu",
      age: 27,
      organization: "Digital Training Hub",
      joinedDate: "2025-08-10",
      coursesCompleted: 5
    },
    {
      id: 7,
      name: "Anil Sharma",
      lat: 13.0780,
      lng: 80.2680,
      status: "not-applied",
      disability: "Speech and Hearing Disability",
      phone: "+91-9876543216",
      address: "34, Besant Nagar, Chennai, Tamil Nadu",
      age: 30,
      eligible: true
    },
    {
      id: 8,
      name: "Kavitha Rao",
      lat: 13.0860,
      lng: 80.2770,
      status: "active",
      disability: "Locomotor Disability",
      phone: "+91-9876543217",
      address: "67, Kodambakkam, Chennai, Tamil Nadu",
      age: 29,
      organization: "IT Skills Academy",
      joinedDate: "2025-07-15",
      coursesCompleted: 7
    }
  ];

  // Current organization location (purple pin)
  const orgLocation = {
    lat: 13.0827,
    lng: 80.2707,
    name: "Phoenix Organization Center",
    address: "123, Mount Road, Chennai"
  };

  const handlePinClick = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "not-applied":
        return {
          label: "Not Applied for UDID",
          color: "#dc2626",
          bgColor: "rgba(220, 38, 38, 0.1)",
          icon: <UserX size={16} />
        };
      case "registered":
        return {
          label: "UDID Registered - Needs Guidance",
          color: "#eab308",
          bgColor: "rgba(234, 179, 8, 0.1)",
          icon: <AlertCircle size={16} />
        };
      case "active":
        return {
          label: "Active Learner",
          color: "#16a34a",
          bgColor: "rgba(22, 163, 74, 0.1)",
          icon: <CheckCircle size={16} />
        };
      default:
        return {
          label: "Unknown",
          color: "#626c71",
          bgColor: "rgba(98, 108, 113, 0.1)",
          icon: <User size={16} />
        };
    }
  };

  const stats = {
    notApplied: pwdIndividuals.filter(p => p.status === "not-applied").length,
    registered: pwdIndividuals.filter(p => p.status === "registered").length,
    active: pwdIndividuals.filter(p => p.status === "active").length,
    total: pwdIndividuals.length
  };

  return (
    <div style={styles.container}>
      {/* Header */}
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

      <div style={styles.mainContent}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h2 style={styles.welcomeTitle}>Welcome, {employee.name}</h2>
          <p style={styles.welcomeSubtitle}>
            {employee.id} • {employee.role}
          </p>
        </div>

        {/* Stats Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
              <UserX size={24} color="#dc2626" />
            </div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>Not Applied</p>
              <p style={styles.statValue}>{stats.notApplied}</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
              <AlertCircle size={24} color="#eab308" />
            </div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>Needs Guidance</p>
              <p style={styles.statValue}>{stats.registered}</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, backgroundColor: 'rgba(22, 163, 74, 0.1)' }}>
              <CheckCircle size={24} color="#16a34a" />
            </div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>Active Learners</p>
              <p style={styles.statValue}>{stats.active}</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{ ...styles.statIcon, backgroundColor: 'rgba(33, 128, 141, 0.1)' }}>
              <Users size={24} color="#21808d" />
            </div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>Total PWD</p>
              <p style={styles.statValue}>{stats.total}</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div style={styles.mapCard}>
          <div style={styles.mapHeader}>
            <h3 style={styles.mapTitle}>PWD Community Map</h3>
            <p style={styles.mapSubtitle}>
              Track and support PWD individuals in your area
            </p>
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, backgroundColor: '#8b5cf6' }} />
              <span style={styles.legendText}>Your Location</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, backgroundColor: '#dc2626' }} />
              <span style={styles.legendText}>Not Applied (Eligible)</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, backgroundColor: '#eab308' }} />
              <span style={styles.legendText}>Registered - Needs Help</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendDot, backgroundColor: '#16a34a' }} />
              <span style={styles.legendText}>Active Learner</span>
            </div>
          </div>

          {/* Map Container */}
          <div style={styles.mapContainer}>
            {/* Organization Location (Purple) */}
            <div
              style={{
                ...styles.pin,
                left: '50%',
                top: '50%',
                backgroundColor: '#8b5cf6',
                width: '24px',
                height: '24px',
                cursor: 'default'
              }}
              title="Your Organization"
            >
              <Navigation size={16} color="#ffffff" />
            </div>

            {/* PWD Individuals */}
            {pwdIndividuals.map((person, index) => {
              const angle = (index / pwdIndividuals.length) * 2 * Math.PI;
              const radius = 35; // Percentage from center
              const left = 50 + radius * Math.cos(angle);
              const top = 50 + radius * Math.sin(angle);

              let pinColor = '#626c71';
              if (person.status === 'not-applied') pinColor = '#dc2626';
              else if (person.status === 'registered') pinColor = '#eab308';
              else if (person.status === 'active') pinColor = '#16a34a';

              return (
                <div
                  key={person.id}
                  style={{
                    ...styles.pin,
                    left: `${left}%`,
                    top: `${top}%`,
                    backgroundColor: pinColor
                  }}
                  onClick={() => handlePinClick(person)}
                  title={person.name}
                >
                  <MapPin size={16} color="#ffffff" />
                </div>
              );
            })}
          </div>

          {/* Map Instructions */}
          <div style={styles.mapInstructions}>
            <p style={styles.instructionText}>
              💡 Click on any pin to view detailed information about the individual
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedPerson && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>PWD Individual Details</h3>
              <button style={styles.closeButton} onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Status Badge */}
              <div style={styles.statusBadge}>
                <div
                  style={{
                    ...styles.statusIndicator,
                    backgroundColor: getStatusInfo(selectedPerson.status).bgColor,
                    color: getStatusInfo(selectedPerson.status).color,
                    border: `1px solid ${getStatusInfo(selectedPerson.status).color}30`
                  }}
                >
                  {getStatusInfo(selectedPerson.status).icon}
                  <span>{getStatusInfo(selectedPerson.status).label}</span>
                </div>
              </div>

              {/* Personal Information */}
              <div style={styles.modalSection}>
                <div style={styles.modalRow}>
                  <User size={18} color="#626c71" />
                  <div style={styles.modalField}>
                    <p style={styles.modalLabel}>Full Name</p>
                    <p style={styles.modalValue}>{selectedPerson.name}</p>
                  </div>
                </div>

                <div style={styles.modalRow}>
                  <AlertCircle size={18} color="#626c71" />
                  <div style={styles.modalField}>
                    <p style={styles.modalLabel}>Disability Type</p>
                    <p style={styles.modalValue}>{selectedPerson.disability}</p>
                  </div>
                </div>

                <div style={styles.modalRow}>
                  <Calendar size={18} color="#626c71" />
                  <div style={styles.modalField}>
                    <p style={styles.modalLabel}>Age</p>
                    <p style={styles.modalValue}>{selectedPerson.age} years</p>
                  </div>
                </div>

                <div style={styles.modalRow}>
                  <Phone size={18} color="#626c71" />
                  <div style={styles.modalField}>
                    <p style={styles.modalLabel}>Contact Number</p>
                    <p style={styles.modalValue}>{selectedPerson.phone}</p>
                  </div>
                </div>

                <div style={styles.modalRow}>
                  <MapPin size={18} color="#626c71" />
                  <div style={styles.modalField}>
                    <p style={styles.modalLabel}>Address</p>
                    <p style={styles.modalValue}>{selectedPerson.address}</p>
                  </div>
                </div>
              </div>

              {/* Status-Specific Information */}
              {selectedPerson.status === "not-applied" && (
                <div style={styles.actionSection}>
                  <div style={styles.actionCard}>
                    <h4 style={styles.actionTitle}>📋 Action Required</h4>
                    <p style={styles.actionText}>
                      This individual is eligible but hasn't applied for UDID yet.
                    </p>
                    <div style={styles.actionButtons}>
                      <button style={styles.actionButton}>
                        <Mail size={16} />
                        <span>Send Information</span>
                      </button>
                      <button style={styles.secondaryButton}>
                        <Phone size={16} />
                        <span>Schedule Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedPerson.status === "registered" && (
                <div style={styles.actionSection}>
                  <div style={styles.actionCard}>
                    <h4 style={styles.actionTitle}>⚠️ Needs Guidance</h4>
                    <p style={styles.actionText}>
                      UDID registered on <strong>{selectedPerson.registeredDate}</strong>.
                      They need help understanding available opportunities.
                    </p>
                    <div style={styles.actionButtons}>
                      <button style={styles.actionButton}>
                        <MessageSquare size={16} />
                        <span>Provide Guidance</span>
                      </button>
                      <button style={styles.secondaryButton}>
                        <Briefcase size={16} />
                        <span>Show Opportunities</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedPerson.status === "active" && (
                <div style={styles.actionSection}>
                  <div style={styles.successCard}>
                    <h4 style={styles.successTitle}>✅ Active Learner</h4>
                    <div style={styles.successStats}>
                      <div style={styles.successStat}>
                        <p style={styles.successLabel}>Organization</p>
                        <p style={styles.successValue}>{selectedPerson.organization}</p>
                      </div>
                      <div style={styles.successStat}>
                        <p style={styles.successLabel}>Joined</p>
                        <p style={styles.successValue}>{selectedPerson.joinedDate}</p>
                      </div>
                      <div style={styles.successStat}>
                        <p style={styles.successLabel}>Courses Completed</p>
                        <p style={styles.successValue}>{selectedPerson.coursesCompleted}</p>
                      </div>
                    </div>
                    <button style={styles.successButton}>
                      <CheckCircle size={16} />
                      <span>View Progress</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
    maxWidth: '1400px',
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
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  welcomeSection: {
    marginBottom: '32px',
  },
  welcomeTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#13343b',
    marginBottom: '8px',
  },
  welcomeSubtitle: {
    fontSize: '14px',
    color: '#626c71',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
  },
  statIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    flexShrink: 0,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: '13px',
    color: '#626c71',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#13343b',
  },
  mapCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
  },
  mapHeader: {
    marginBottom: '24px',
  },
  mapTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  mapSubtitle: {
    fontSize: '14px',
    color: '#626c71',
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: 'rgba(94, 82, 64, 0.03)',
    borderRadius: '8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legendDot: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
  },
  legendText: {
    fontSize: '13px',
    color: '#13343b',
    fontWeight: '500',
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: '500px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    borderRadius: '12px',
    border: '2px solid rgba(33, 128, 141, 0.1)',
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 0.2s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px solid #ffffff',
  },
  mapInstructions: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    borderRadius: '8px',
    textAlign: 'center',
  },
  instructionText: {
    fontSize: '13px',
    color: '#21808d',
    fontWeight: '500',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 24px 16px',
    borderBottom: '1px solid rgba(94, 82, 64, 0.12)',
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#626c71',
    transition: 'background-color 0.2s ease',
  },
  modalBody: {
    padding: '24px',
  },
  statusBadge: {
    marginBottom: '24px',
  },
  statusIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  modalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '24px',
  },
  modalRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  modalField: {
    flex: 1,
  },
  modalLabel: {
    fontSize: '12px',
    color: '#626c71',
    marginBottom: '4px',
  },
  modalValue: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#13343b',
  },
  actionSection: {
    marginTop: '24px',
  },
  actionCard: {
    padding: '20px',
    backgroundColor: 'rgba(234, 179, 8, 0.05)',
    border: '1px solid rgba(234, 179, 8, 0.2)',
    borderRadius: '12px',
  },
  actionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  actionText: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '16px',
    lineHeight: '1.6',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  secondaryButton: {
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
  successCard: {
    padding: '20px',
    backgroundColor: 'rgba(22, 163, 74, 0.05)',
    border: '1px solid rgba(22, 163, 74, 0.2)',
    borderRadius: '12px',
  },
  successTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '16px',
  },
  successStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  successStat: {
    padding: '12px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid rgba(94, 82, 64, 0.08)',
  },
  successLabel: {
    fontSize: '11px',
    color: '#626c71',
    marginBottom: '4px',
    textTransform: 'uppercase',
  },
  successValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#13343b',
  },
  successButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#16a34a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    width: '100%',
    justifyContent: 'center',
  },
};
