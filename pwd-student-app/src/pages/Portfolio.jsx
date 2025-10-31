import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Award, 
  Share2, 
  Download,
  ExternalLink,
  Shield,
  CheckCircle,
  TrendingUp,
  Eye,
  Mail,
  MessageCircle
} from 'lucide-react';
import Header from '../components/Header';
import { getPortfolioData } from '../services/api';

function Portfolio() {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
    loadPortfolio();
  }, [navigate]);

  const loadPortfolio = async () => {
    try {
      const data = await getPortfolioData('1');
      setPortfolio(data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform) => {
    const portfolioUrl = `https://pwdeduconnect.in/portfolio/${portfolio?.user.udid}`;
    const message = `Check out my PWD Skills Portfolio - ${portfolio?.user.name}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + portfolioUrl)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(message)}&body=${encodeURIComponent(portfolioUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(portfolioUrl);
        alert('Portfolio link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <Header />
        <div style={styles.loading}>Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <Header />
      <div style={styles.container}>
        {/* Profile Section */}
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.profileImage}>
              <User size={48} color="#21808d" />
            </div>
            <div style={styles.profileInfo}>
              <div style={styles.nameRow}>
                <h1 style={styles.name}>{portfolio?.user.name}</h1>
                <div style={styles.verifiedBadge}>
                  <Shield size={14} />
                  <span>UDID Verified</span>
                </div>
              </div>
              <p style={styles.disability}>{portfolio?.user.disability}</p>
              <p style={styles.location}>{portfolio?.user.location}</p>
              <div style={styles.availability}>
                <CheckCircle size={16} color="#21808d" />
                <span>{portfolio?.user.availability}</span>
              </div>
            </div>
          </div>

          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <Mail size={16} />
              <span>{portfolio?.user.email}</span>
            </div>
            <div style={styles.contactItem}>
              <MessageCircle size={16} />
              <span>{portfolio?.user.phone}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <TrendingUp size={24} color="#21808d" />
            </div>
            <div>
              <div style={styles.statValue}>{portfolio?.stats.portfolioCompleteness}%</div>
              <div style={styles.statLabel}>Portfolio Strength</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <Eye size={24} color="#21808d" />
            </div>
            <div>
              <div style={styles.statValue}>{portfolio?.stats.profileViews}</div>
              <div style={styles.statLabel}>Profile Views</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <Award size={24} color="#21808d" />
            </div>
            <div>
              <div style={styles.statValue}>{portfolio?.stats.certificatesEarned}</div>
              <div style={styles.statLabel}>Certificates</div>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>
              <CheckCircle size={24} color="#21808d" />
            </div>
            <div>
              <div style={styles.statValue}>{portfolio?.stats.skillsAcquired}</div>
              <div style={styles.statLabel}>Skills Acquired</div>
            </div>
          </div>
        </div>

        {/* Skills Showcase */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills Showcase</h2>
          <div style={styles.skillsGrid}>
            {portfolio?.skills.map((skill) => (
              <div key={skill.id} style={styles.skillCard}>
                <div style={styles.skillHeader}>
                  <h3 style={styles.skillName}>{skill.name}</h3>
                  {skill.verified && (
                    <div style={styles.verifiedIcon}>
                      <CheckCircle size={16} color="#21808d" />
                    </div>
                  )}
                </div>

                <div style={styles.skillLevel}>
                  <span style={styles.levelLabel}>{skill.level}</span>
                  <span style={styles.levelPercent}>{skill.proficiency}%</span>
                </div>

                <div style={styles.progressBar}>
                  <div style={{ ...styles.progressFill, width: `${skill.proficiency}%` }} />
                </div>

                <div style={styles.skillMeta}>
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Verified:</span>
                    <span style={styles.metaValue}>{skill.verificationMethod}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Achieved:</span>
                    <span style={styles.metaValue}>{skill.achievedDate}</span>
                  </div>
                </div>

                <button style={styles.viewCertButton}>
                  <Award size={14} />
                  <span>View Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Certificates ({portfolio?.certificates.length})</h2>
          <div style={styles.certificatesList}>
            {portfolio?.certificates.map((cert) => (
              <div key={cert.id} style={styles.certificateCard}>
                <div style={styles.certIcon}>
                  <Award size={24} color="#21808d" />
                </div>
                <div style={styles.certContent}>
                  <h3 style={styles.certName}>{cert.name}</h3>
                  <p style={styles.certIssuer}>Issued by: {cert.issuedBy}</p>
                  <div style={styles.certMeta}>
                    <span style={styles.certDate}>Issued: {cert.issuedDate}</span>
                    {cert.verified && (
                      <div style={styles.blockchainBadge}>
                        <Shield size={12} />
                        <span>Blockchain Verified</span>
                      </div>
                    )}
                  </div>
                </div>
                <button style={styles.certButton}>
                  <ExternalLink size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {portfolio?.testimonials.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Testimonials</h2>
            <div style={styles.testimonialsList}>
              {portfolio.testimonials.map((testimonial) => (
                <div key={testimonial.id} style={styles.testimonialCard}>
                  <div style={styles.testimonialHeader}>
                    <div>
                      <h4 style={styles.testimonialName}>{testimonial.from}</h4>
                      <p style={styles.testimonialRole}>
                        {testimonial.role} at {testimonial.organization}
                      </p>
                    </div>
                    <div style={styles.rating}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={i < testimonial.rating ? styles.starFilled : styles.starEmpty}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p style={styles.testimonialText}>"{testimonial.text}"</p>
                  <p style={styles.testimonialDate}>{testimonial.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Portfolio */}
        <div style={styles.shareSection}>
          <h2 style={styles.shareSectionTitle}>Share Your Portfolio</h2>
          <div style={styles.shareButtons}>
            <button onClick={() => handleShare('whatsapp')} style={styles.shareButton}>
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </button>
            <button onClick={() => handleShare('email')} style={styles.shareButton}>
              <Mail size={18} />
              <span>Email</span>
            </button>
            <button onClick={() => handleShare('copy')} style={styles.shareButton}>
              <Share2 size={18} />
              <span>Copy Link</span>
            </button>
          </div>

          <div style={styles.qrSection}>
            <div style={styles.qrPlaceholder}>
              <div style={styles.qrGrid}>
                {[...Array(64)].map((_, i) => (
                  <div key={i} style={{ ...styles.qrPixel, backgroundColor: Math.random() > 0.5 ? '#13343b' : '#ffffff' }} />
                ))}
              </div>
            </div>
            <p style={styles.qrLabel}>Scan to view portfolio</p>
          </div>

          <button style={styles.downloadButton}>
            <Download size={18} />
            <span>Download Resume PDF</span>
          </button>
        </div>
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
  profileCard: {
    padding: '32px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    marginBottom: '24px',
  },
  profileHeader: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid rgba(94, 82, 64, 0.12)',
  },
  profileImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '120px',
    borderRadius: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    flexShrink: 0,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  name: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#13343b',
  },
  verifiedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
  },
  disability: {
    fontSize: '16px',
    color: '#626c71',
    marginBottom: '4px',
  },
  location: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '12px',
  },
  availability: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#21808d',
  },
  contactInfo: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#626c71',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
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
  },
  statIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  statLabel: {
    fontSize: '13px',
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
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  skillCard: {
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  skillName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
  },
  verifiedIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  skillLevel: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  levelLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#21808d',
  },
  levelPercent: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#21808d',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(94, 82, 64, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#21808d',
    borderRadius: '4px',
  },
  skillMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '12px',
  },
  metaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  metaLabel: {
    color: '#626c71',
  },
  metaValue: {
    fontWeight: '500',
    color: '#13343b',
  },
  viewCertButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '10px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#21808d',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  certificatesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  certificateCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  certIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    flexShrink: 0,
  },
  certContent: {
    flex: 1,
  },
  certName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  certIssuer: {
    fontSize: '13px',
    color: '#626c71',
    marginBottom: '8px',
  },
  certMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  certDate: {
    fontSize: '12px',
    color: '#626c71',
  },
  blockchainBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: '600',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '4px',
  },
  certButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    border: 'none',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#13343b',
  },
  testimonialsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  testimonialCard: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  testimonialHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  testimonialName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  testimonialRole: {
    fontSize: '13px',
    color: '#626c71',
  },
  rating: {
    display: 'flex',
    gap: '2px',
  },
  starFilled: {
    color: '#21808d',
    fontSize: '16px',
  },
  starEmpty: {
    color: 'rgba(94, 82, 64, 0.2)',
    fontSize: '16px',
  },
  testimonialText: {
    fontSize: '14px',
    color: '#13343b',
    lineHeight: '1.6',
    marginBottom: '12px',
    fontStyle: 'italic',
  },
  testimonialDate: {
    fontSize: '12px',
    color: '#626c71',
  },
  shareSection: {
    padding: '32px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    textAlign: 'center',
  },
  shareSectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '20px',
  },
  shareButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  shareButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  qrSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
  },
  qrPlaceholder: {
    width: '200px',
    height: '200px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '2px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '12px',
    marginBottom: '12px',
  },
  qrGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '2px',
    width: '100%',
    height: '100%',
  },
  qrPixel: {
    width: '100%',
    height: '100%',
    borderRadius: '1px',
  },
  qrLabel: {
    fontSize: '13px',
    color: '#626c71',
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '16px',
    color: '#626c71',
  },
};

export default Portfolio;
