import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  CheckCircle,
  Star,
  Users,
  Award,
  Send,
  X
} from 'lucide-react';
import Header from '../components/Header';
import { getOrganizations, submitApplication, getMyApplications } from '../services/api';

function OrganizationSearch() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    course: '',
    message: '',
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [orgsData, appsData] = await Promise.all([
        getOrganizations(),
        getMyApplications(),
      ]);
      setOrganizations(orgsData);
      setApplications(appsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (org) => {
    setSelectedOrg(org);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    try {
      await submitApplication({
        organizationId: selectedOrg.id,
        ...applicationForm,
      });
      setShowApplicationModal(false);
      setApplicationForm({ course: '', message: '' });
      alert('Application submitted successfully!');
      loadData();
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return { bg: 'rgba(33, 128, 141, 0.1)', color: '#21808d' };
      case 'Pending':
        return { bg: 'rgba(168, 75, 47, 0.1)', color: '#a84b2f' };
      case 'Rejected':
        return { bg: 'rgba(192, 21, 47, 0.1)', color: '#c0152f' };
      default:
        return { bg: 'rgba(98, 108, 113, 0.1)', color: '#626c71' };
    }
  };

  return (
    <div style={styles.wrapper}>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Find Organizations</h1>
            <p style={styles.subtitle}>
              Discover verified training organizations near you
            </p>
          </div>
        </div>

        {/* My Applications Section */}
        {applications.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>My Applications ({applications.length})</h2>
            <div style={styles.applicationsList}>
              {applications.map((app) => {
                const statusStyle = getStatusColor(app.status);
                return (
                  <div key={app.id} style={styles.applicationCard}>
                    <div style={styles.appHeader}>
                      <div>
                        <h3 style={styles.appOrgName}>{app.organizationName}</h3>
                        <p style={styles.appCourseName}>{app.courseName}</p>
                      </div>
                      <div style={{ ...styles.statusBadge, backgroundColor: statusStyle.bg }}>
                        <span style={{ color: statusStyle.color }}>{app.status}</span>
                      </div>
                    </div>
                    <p style={styles.appMessage}>{app.message}</p>
                    <p style={styles.appDate}>Applied on: {app.appliedDate}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Organizations List */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Nearby Organizations</h2>
          {loading ? (
            <div style={styles.loading}>Loading organizations...</div>
          ) : (
            <div style={styles.orgsList}>
              {organizations.map((org) => (
                <div key={org.id} style={styles.orgCard}>
                  <div style={styles.orgHeader}>
                    <div style={styles.orgIcon}>
                      <Building2 size={24} color="#21808d" />
                    </div>
                    <div style={styles.verifiedBadge}>
                      <CheckCircle size={14} />
                      <span>{org.verificationStatus}</span>
                    </div>
                  </div>

                  <h3 style={styles.orgName}>{org.name}</h3>

                  <div style={styles.orgLocation}>
                    <MapPin size={16} color="#626c71" />
                    <span>{org.distance} away</span>
                  </div>
                  <p style={styles.orgAddress}>{org.address}</p>

                  <div style={styles.orgStats}>
                    <div style={styles.statItem}>
                      <Star size={16} color="#21808d" />
                      <span>{org.rating} Rating</span>
                    </div>
                    <div style={styles.statItem}>
                      <Users size={16} color="#21808d" />
                      <span>{org.studentsEnrolled} Students</span>
                    </div>
                    <div style={styles.statItem}>
                      <Award size={16} color="#21808d" />
                      <span>{org.successRate} Success</span>
                    </div>
                  </div>

                  <div style={styles.orgSection}>
                    <h4 style={styles.sectionLabel}>Courses Offered:</h4>
                    <div style={styles.coursesList}>
                      {org.courses.map((course, idx) => (
                        <span key={idx} style={styles.courseBadge}>{course}</span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.orgSection}>
                    <h4 style={styles.sectionLabel}>Facilities:</h4>
                    <div style={styles.facilitiesList}>
                      {org.facilities.map((facility, idx) => (
                        <div key={idx} style={styles.facilityItem}>
                          <CheckCircle size={14} color="#21808d" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.orgFooter}>
                    <button
                      onClick={() => handleApplyClick(org)}
                      style={styles.applyButton}
                    >
                      <Send size={16} />
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div style={styles.modalOverlay} onClick={() => setShowApplicationModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Apply to {selectedOrg?.name}</h2>
              <button
                onClick={() => setShowApplicationModal(false)}
                style={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Course</label>
                <select
                  value={applicationForm.course}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, course: e.target.value })
                  }
                  style={styles.select}
                  required
                >
                  <option value="">Choose a course</option>
                  {selectedOrg?.courses.map((course, idx) => (
                    <option key={idx} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Why do you want to join?</label>
                <textarea
                  value={applicationForm.message}
                  onChange={(e) =>
                    setApplicationForm({ ...applicationForm, message: e.target.value })
                  }
                  style={styles.textarea}
                  rows="4"
                  placeholder="Tell us about your goals and why you're interested..."
                  required
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button type="submit" style={styles.submitButton}>
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#fcfcf9',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 20px',
  },
  header: {
    marginBottom: '32px',
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
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '16px',
  },
  applicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
  },
  applicationCard: {
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '8px',
  },
  appHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  appOrgName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  appCourseName: {
    fontSize: '14px',
    color: '#626c71',
  },
  statusBadge: {
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
  },
  appMessage: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '8px',
  },
  appDate: {
    fontSize: '12px',
    color: '#626c71',
  },
  orgsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },
  orgCard: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  orgHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  orgIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
  },
  orgName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '12px',
  },
  orgLocation: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#626c71',
    marginBottom: '4px',
  },
  orgAddress: {
    fontSize: '13px',
    color: '#626c71',
    marginBottom: '16px',
  },
  orgStats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(94, 82, 64, 0.12)',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#13343b',
  },
  orgSection: {
    marginBottom: '16px',
  },
  sectionLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  coursesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  courseBadge: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
  },
  facilitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  facilityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#626c71',
  },
  orgFooter: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  applyButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
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
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#626c71',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
  },
  select: {
    padding: '12px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    resize: 'vertical',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#626c71',
  },
};

export default OrganizationSearch;
