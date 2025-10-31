import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  BookOpen, 
  Building2, 
  User, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import Header from '../components/Header';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null;

  const stats = [
    {
      icon: DollarSign,
      title: 'New Schemes',
      value: '3',
      description: 'Schemes match your profile',
      link: '/schemes',
      color: '#21808d',
      bgColor: 'rgba(33, 128, 141, 0.1)',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      value: '12',
      description: 'Continue your learning',
      link: '/resources',
      color: '#21808d',
      bgColor: 'rgba(33, 128, 141, 0.1)',
    },
    {
      icon: Building2,
      title: 'Organizations',
      value: '4',
      description: 'Nearby verified centers',
      link: '/organizations',
      color: '#21808d',
      bgColor: 'rgba(33, 128, 141, 0.1)',
    },
    {
      icon: User,
      title: 'Portfolio',
      value: '85%',
      description: 'Completeness score',
      link: '/portfolio',
      color: '#21808d',
      bgColor: 'rgba(33, 128, 141, 0.1)',
    },
  ];

  const recentActivities = [
    {
      icon: CheckCircle,
      title: 'Completed "Excel Basics" course',
      time: '2 days ago',
      type: 'success',
    },
    {
      icon: Award,
      title: 'Earned Digital Literacy Certificate',
      time: '5 days ago',
      type: 'achievement',
    },
    {
      icon: Building2,
      title: 'Applied to Saksham Center',
      time: '1 week ago',
      type: 'application',
    },
    {
      icon: Clock,
      title: 'New scheme deadline in 15 days',
      time: 'PM-DAKSH Yojana',
      type: 'deadline',
    },
  ];

  return (
    <div style={styles.wrapper}>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Welcome back, {user.name}! 👋</h1>
            <p style={styles.subtitle}>
              {user.disability} • {user.location}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              style={styles.statCard}
            >
              <div style={{ ...styles.statIcon, backgroundColor: stat.bgColor }}>
                <stat.icon size={24} color={stat.color} />
              </div>
              <div style={styles.statContent}>
                <h3 style={styles.statValue}>{stat.value}</h3>
                <p style={styles.statTitle}>{stat.title}</p>
                <p style={styles.statDescription}>{stat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <TrendingUp size={20} />
            Your Progress
          </h2>
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Overall Learning Progress</span>
              <span style={styles.progressPercentage}>80%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: '80%' }} />
            </div>
            <div style={styles.progressStats}>
              <div style={styles.progressStat}>
                <span style={styles.progressStatValue}>3</span>
                <span style={styles.progressStatLabel}>Certificates</span>
              </div>
              <div style={styles.progressStat}>
                <span style={styles.progressStatValue}>12</span>
                <span style={styles.progressStatLabel}>Resources</span>
              </div>
              <div style={styles.progressStat}>
                <span style={styles.progressStatValue}>15</span>
                <span style={styles.progressStatLabel}>Days Streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            <Clock size={20} />
            Recent Activity
          </h2>
          <div style={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <div style={{ ...styles.activityIcon, backgroundColor: 'rgba(33, 128, 141, 0.1)' }}>
                  <activity.icon size={18} color="#21808d" />
                </div>
                <div style={styles.activityContent}>
                  <p style={styles.activityTitle}>{activity.title}</p>
                  <p style={styles.activityTime}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  statIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  statTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#13343b',
    marginBottom: '4px',
  },
  statDescription: {
    fontSize: '14px',
    color: '#626c71',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '16px',
  },
  progressCard: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  progressLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
  },
  progressPercentage: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#21808d',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(94, 82, 64, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#21808d',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressStats: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '16px',
  },
  progressStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressStatValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '4px',
  },
  progressStatLabel: {
    fontSize: '12px',
    color: '#626c71',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '8px',
  },
  activityIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    marginBottom: '4px',
  },
  activityTime: {
    fontSize: '12px',
    color: '#626c71',
  },
};

export default Dashboard;
