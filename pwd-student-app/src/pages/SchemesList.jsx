import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import Header from '../components/Header';
import { getSchemes } from '../services/api';

function SchemesList() {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
    loadSchemes();
  }, [navigate]);

  const loadSchemes = async () => {
    try {
      const data = await getSchemes();
      setSchemes(data);
      setFilteredSchemes(data);
    } catch (error) {
      console.error('Error loading schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setFilteredSchemes(schemes);
    } else if (filterType === 'eligible') {
      setFilteredSchemes(schemes.filter((s) => s.isEligible));
    } else if (filterType === 'government') {
      setFilteredSchemes(schemes.filter((s) => s.category === 'Government'));
    } else if (filterType === 'ngo') {
      setFilteredSchemes(schemes.filter((s) => s.category === 'NGO'));
    }
  };

  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft <= 15) return '#c0152f';
    if (daysLeft <= 30) return '#a84b2f';
    return '#21808d';
  };

  return (
    <div style={styles.wrapper}>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Schemes & Scholarships</h1>
            <p style={styles.subtitle}>
              Browse government schemes and scholarships tailored for you
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={styles.filterSection}>
          <div style={styles.filterIcon}>
            <Filter size={18} />
          </div>
          <div style={styles.filterButtons}>
            <button
              onClick={() => handleFilter('all')}
              style={{
                ...styles.filterButton,
                ...(filter === 'all' ? styles.filterButtonActive : {}),
              }}
            >
              All Schemes
            </button>
            <button
              onClick={() => handleFilter('eligible')}
              style={{
                ...styles.filterButton,
                ...(filter === 'eligible' ? styles.filterButtonActive : {}),
              }}
            >
              For You
            </button>
            <button
              onClick={() => handleFilter('government')}
              style={{
                ...styles.filterButton,
                ...(filter === 'government' ? styles.filterButtonActive : {}),
              }}
            >
              Government
            </button>
            <button
              onClick={() => handleFilter('ngo')}
              style={{
                ...styles.filterButton,
                ...(filter === 'ngo' ? styles.filterButtonActive : {}),
              }}
            >
              NGO
            </button>
          </div>
        </div>

        {/* Schemes List */}
        {loading ? (
          <div style={styles.loading}>Loading schemes...</div>
        ) : (
          <div style={styles.schemesList}>
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} style={styles.schemeCard}>
                <div style={styles.schemeHeader}>
                  <div style={styles.schemeIcon}>
                    <DollarSign size={24} color="#21808d" />
                  </div>
                  <div style={styles.schemeStatus}>
                    {scheme.isEligible ? (
                      <div style={{ ...styles.statusBadge, ...styles.statusEligible }}>
                        <CheckCircle size={14} />
                        <span>Eligible</span>
                      </div>
                    ) : (
                      <div style={{ ...styles.statusBadge, ...styles.statusNotEligible }}>
                        <XCircle size={14} />
                        <span>Not Eligible</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 style={styles.schemeName}>{scheme.name}</h3>
                <p style={styles.schemeDescription}>{scheme.shortDescription}</p>

                <div style={styles.schemeDetails}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Provider:</span>
                    <span style={styles.detailValue}>{scheme.provider}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Amount:</span>
                    <span style={styles.detailValue}>{scheme.amount}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Category:</span>
                    <span style={styles.categoryBadge}>{scheme.category}</span>
                  </div>
                </div>

                <div style={styles.deadline}>
                  <Clock size={16} color={getDaysLeftColor(scheme.daysLeft)} />
                  <span style={{ color: getDaysLeftColor(scheme.daysLeft) }}>
                    {scheme.daysLeft} days left to apply
                  </span>
                </div>

                <div style={styles.schemeFooter}>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.applyButton}
                  >
                    <span>Apply Now</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredSchemes.length === 0 && !loading && (
          <div style={styles.emptyState}>
            <DollarSign size={48} color="#626c71" />
            <p style={styles.emptyText}>No schemes found matching your filter</p>
          </div>
        )}
      </div>
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
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  filterIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#626c71',
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#626c71',
    backgroundColor: 'transparent',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderColor: '#21808d',
  },
  schemesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  schemeCard: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
  },
  schemeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  schemeIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
  },
  schemeStatus: {
    display: 'flex',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
  },
  statusEligible: {
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
  },
  statusNotEligible: {
    backgroundColor: 'rgba(192, 21, 47, 0.1)',
    color: '#c0152f',
  },
  schemeName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '12px',
  },
  schemeDescription: {
    fontSize: '14px',
    color: '#626c71',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  schemeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: '13px',
    color: '#626c71',
  },
  detailValue: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#13343b',
  },
  categoryBadge: {
    padding: '4px 8px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    color: '#13343b',
    borderRadius: '4px',
  },
  deadline: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '13px',
    fontWeight: '500',
  },
  schemeFooter: {
    display: 'flex',
    gap: '12px',
  },
  applyButton: {
    flex: 1,
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
    textDecoration: 'none',
    transition: 'background-color 0.2s ease',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#626c71',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: '16px',
    fontSize: '16px',
    color: '#626c71',
  },
};

export default SchemesList;
