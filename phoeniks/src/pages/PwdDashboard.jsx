import { useState } from "react";
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  ExternalLink,
  Calendar,
  DollarSign,
  CheckCircle,
  TrendingUp,
  User,
  Award,
  Clock,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PwdDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("schemes");

  const schemesData = [
    {
      id: 1,
      title: "National Scholarship for Persons with Disabilities",
      description: "Financial help for higher education.",
      details: "Provides scholarships for PwD students. Valid UDID required. Apply by Oct 31, 2025 for pre/post-matric benefits and DBT transfers.",
      amount: "₹50,000/year",
      eligibility: "10th pass, income under ₹2.5L, valid UDID",
      deadline: "2025-10-31",
      badge: "recommended",
      match: "95% match",
      applyUrl: "https://scholarships.gov.in/",
    },
    {
      id: 2,
      title: "Assistive Devices Scheme (ADIP)",
      description: "Subsidized/free aids and appliances.",
      details: "Assistive devices including wheelchairs and hearing aids under government scheme. Apply via official portal by Dec 15, 2025.",
      amount: "Up to ₹25,000 per beneficiary",
      eligibility: "Valid UDID, BPL/APL status",
      deadline: "2025-12-15",
      badge: "eligible",
      match: "89% match",
      applyUrl: "https://adip.depwd.gov.in/getEquipmentInfo",
    },
    {
      id: 3,
      title: "Skill Development & Digital Literacy",
      description: "Free training in digital skills and certificates.",
      details: "Free courses on digital literacy and IT skills. Enroll by Nov 30, 2025 through Skill India portal. Certificates awarded on completion.",
      amount: "Free + Certificate",
      eligibility: "14-60 years, basic education, UDID mandatory",
      deadline: "2025-11-30",
      badge: "eligible",
      match: "88% match",
      applyUrl: "https://www.skillindiadigital.gov.in/",
    },
  ];

  const jobsData = [
    {
      id: 1,
      title: "Data Entry Operator",
      company: "TCS - Bangalore",
      type: "Full-time",
      salary: "₹18,000 - ₹25,000/month",
      eligibility: "12th pass, basic computer skills",
      posted: "Posted 3 days ago",
      match: "90% match",
      applyUrl: "https://careers.tcs.com/careers-home",
      details: "Entry level position for data processing. Good computer skills and accuracy required. Responsive employer for PwDs.",
    },
    {
      id: 2,
      title: "Customer Support Executive",
      company: "Amazon - Remote",
      type: "Work from Home",
      salary: "₹20,000 - ₹30,000/month",
      eligibility: "Graduate, good communication skills",
      posted: "Posted 1 week ago",
      match: "85% match",
      applyUrl: "https://www.amazon.jobs/en/",
      details: "Remote customer support job with flexible hours. Excellent communication and problem-solving skills are needed.",
    },
    {
      id: 3,
      title: "Junior Accountant",
      company: "Govt Office - Chennai",
      type: "Full-time",
      salary: "₹25,000 - ₹35,000/month",
      eligibility: "B.Com, Tally knowledge",
      posted: "Posted 2 days ago",
      match: "78% match",
      applyUrl: "https://www.tn.gov.in/government_jobs",
      details: "Responsible for bookkeeping and financial records. Knowledge of accounting software (Tally) a must. Government job offering stability.",
    },
  ];

  const learningData = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      provider: "NPTEL - IIT Madras",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      certification: "Yes - Free certificate",
      startDate: "Starts: 2025-11-01",
      match: "92% match",
      details: "Learn HTML, CSS, JS, and backend basics from IIT Madras experts. Practical projects and certification upon successful completion.",
      link: "https://onlinecourses.nptel.ac.in",
    },
    {
      id: 2,
      title: "Spoken English & Communication Skills",
      provider: "British Council India",
      duration: "8 weeks",
      level: "All levels",
      certification: "Yes - Paid certificate",
      startDate: "Starts: 2025-10-25",
      match: "88% match",
      details: "Improve your English speaking and confidence with British Council online classes. Suitable for all proficiency levels.",
      link: "https://www.youtube.com/user/BritishCouncilIndia",
    },
    {
      id: 3,
      title: "Financial Literacy & Banking",
      provider: "NCFE India",
      duration: "6 weeks",
      level: "Beginner",
      certification: "Yes - Free certificate",
      startDate: "Starts: 2025-11-15",
      match: "80% match",
      details: "Understand basics of personal finance, banking, loans and investments. Ideal for students and new learners.",
      link: "https://ncfeindia.org/financial-literacy-course/",
    },
  ];

  const user = {
    name: "Arjun Kumar",
    udid: "1234567890123456",
    disability: "Visual Impairment",
    grade: "Grade 12th",
    profileCompletion: 85
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h2 style={styles.headerTitle}>PWD Student Portal</h2>
          <button 
            onClick={() => navigate("/pwd-login")}
            style={styles.logoutButton}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div style={styles.container}>
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeHeader}>
            <div style={styles.avatar}>
              <User size={32} color="#21808d" />
            </div>
            <div style={styles.userInfo}>
              <h1 style={styles.userName}>Welcome back, {user.name}!</h1>
              <p style={styles.userMeta}>
                UDID: {user.udid} • {user.disability} • {user.grade}
              </p>
            </div>
          </div>
          <div style={styles.profileProgress}>
            <p style={styles.progressLabel}>Profile Completion</p>
            <p style={styles.progressValue}>{user.profileCompletion}%</p>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${user.profileCompletion}%` }} />
            </div>
          </div>
        </div>

        <div style={styles.tabsContainer}>
          <button
            onClick={() => setActiveTab("schemes")}
            style={{
              ...styles.tab,
              ...(activeTab === "schemes" ? styles.tabActive : {}),
            }}
          >
            <GraduationCap size={18} />
            <span>Schemes</span>
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            style={{
              ...styles.tab,
              ...(activeTab === "jobs" ? styles.tabActive : {}),
            }}
          >
            <Briefcase size={18} />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab("learning")}
            style={{
              ...styles.tab,
              ...(activeTab === "learning" ? styles.tabActive : {}),
            }}
          >
            <BookOpen size={18} />
            <span>Learning</span>
          </button>
        </div>

        <div style={styles.contentSection}>
          {activeTab === "schemes" && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recommended Schemes & Scholarships</h2>
                <span style={styles.badge}>{schemesData.length} Available</span>
              </div>
              
              {schemesData.map((scheme) => (
                <div key={scheme.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.cardIcon}>
                      <GraduationCap size={24} color="#21808d" />
                    </div>
                    <div style={styles.cardBadges}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: scheme.badge === 'recommended' 
                          ? 'rgba(33, 128, 141, 0.1)' 
                          : 'rgba(98, 108, 113, 0.1)',
                        color: scheme.badge === 'recommended' ? '#21808d' : '#626c71',
                        borderColor: scheme.badge === 'recommended' 
                          ? 'rgba(33, 128, 141, 0.3)' 
                          : 'rgba(98, 108, 113, 0.3)',
                      }}>
                        {scheme.badge === 'recommended' ? 'Recommended' : 'Eligible'}
                      </span>
                      <span style={styles.matchText}>{scheme.match}</span>
                    </div>
                  </div>

                  <h3 style={styles.cardTitle}>{scheme.title}</h3>
                  <p style={styles.cardDescription}>{scheme.description}</p>
                  <p style={styles.cardDetails}>{scheme.details}</p>

                  <div style={styles.cardGrid}>
                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <DollarSign size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Amount</p>
                        <p style={styles.gridValue}>{scheme.amount}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <CheckCircle size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Eligibility</p>
                        <p style={styles.gridValue}>{scheme.eligibility}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <Calendar size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Deadline</p>
                        <p style={styles.gridValue}>{scheme.deadline}</p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <a
                      href={scheme.applyUrl}
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

          {activeTab === "jobs" && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recommended Job Opportunities</h2>
                <span style={styles.badge}>{jobsData.length} Available</span>
              </div>

              {jobsData.map((job) => (
                <div key={job.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.cardIcon}>
                      <Briefcase size={24} color="#21808d" />
                    </div>
                    <span style={styles.matchText}>{job.match}</span>
                  </div>

                  <h3 style={styles.cardTitle}>{job.title}</h3>
                  <p style={styles.cardSubtitle}>{job.company} • {job.type}</p>
                  <p style={styles.cardDetails}>{job.details}</p>

                  <div style={styles.cardGrid}>
                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <DollarSign size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Salary</p>
                        <p style={styles.gridValue}>{job.salary}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <CheckCircle size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Eligibility</p>
                        <p style={styles.gridValue}>{job.eligibility}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <Clock size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>{job.posted}</p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <a
                      href={job.applyUrl}
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

          {activeTab === "learning" && (
            <div>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recommended Learning Courses</h2>
                <span style={styles.badge}>{learningData.length} Available</span>
              </div>

              {learningData.map((course) => (
                <div key={course.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={styles.cardIcon}>
                      <BookOpen size={24} color="#21808d" />
                    </div>
                    <span style={styles.matchText}>{course.match}</span>
                  </div>

                  <h3 style={styles.cardTitle}>{course.title}</h3>
                  <p style={styles.cardSubtitle}>{course.provider}</p>
                  <p style={styles.cardDetails}>{course.details}</p>

                  <div style={styles.cardGrid}>
                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <Clock size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Duration</p>
                        <p style={styles.gridValue}>{course.duration}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <TrendingUp size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Level</p>
                        <p style={styles.gridValue}>{course.level}</p>
                      </div>
                    </div>

                    <div style={styles.gridItem}>
                      <div style={styles.gridIcon}>
                        <Award size={16} color="#626c71" />
                      </div>
                      <div>
                        <p style={styles.gridLabel}>Certificate</p>
                        <p style={styles.gridValue}>{course.certification}</p>
                      </div>
                    </div>
                  </div>

                  <div style={styles.cardFooter}>
                    <p style={styles.startDate}>{course.startDate}</p>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.applyButton}
                    >
                      <span>Enroll Now</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
  header: {
    backgroundColor: '#ffffff',
    borderBottom: '1px solid rgba(94, 82, 64, 0.2)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  headerContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
    margin: 0,
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#c0152f',
    backgroundColor: 'rgba(192, 21, 47, 0.1)',
    border: '1px solid rgba(192, 21, 47, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 20px',
  },
  welcomeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    marginBottom: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.04)',
    flexWrap: 'wrap',
    gap: '24px',
  },
  welcomeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '72px',
    height: '72px',
    borderRadius: '12px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    flexShrink: 0,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  userMeta: {
    fontSize: '14px',
    color: '#626c71',
  },
  profileProgress: {
    textAlign: 'right',
    minWidth: '150px',
  },
  progressLabel: {
    fontSize: '12px',
    color: '#626c71',
    marginBottom: '4px',
  },
  progressValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#21808d',
    marginBottom: '8px',
  },
  progressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: 'rgba(94, 82, 64, 0.1)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#21808d',
    borderRadius: '3px',
  },
  tabsContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#626c71',
    backgroundColor: 'transparent',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabActive: {
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderColor: '#21808d',
  },
  contentSection: {
    minHeight: '400px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#13343b',
  },
  badge: {
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
    border: '1px solid rgba(33, 128, 141, 0.2)',
  },
  card: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderLeft: '4px solid #21808d',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  cardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
  },
  cardBadges: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  statusBadge: {
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
    border: '1px solid',
  },
  matchText: {
    fontSize: '13px',
    color: '#626c71',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#626c71',
    marginBottom: '8px',
  },
  cardDetails: {
    fontSize: '14px',
    color: '#13343b',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  gridItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  gridIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: 'rgba(98, 108, 113, 0.1)',
    flexShrink: 0,
  },
  gridLabel: {
    fontSize: '12px',
    color: '#626c71',
    marginBottom: '4px',
  },
  gridValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#13343b',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
  startDate: {
    fontSize: '13px',
    color: '#626c71',
  },
  applyButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
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
};
