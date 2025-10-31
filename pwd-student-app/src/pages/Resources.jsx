import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlayCircle, 
  FileText, 
  Headphones, 
  Download,
  Eye,
  Clock,
  Play,
  Filter
} from 'lucide-react';
import Header from '../components/Header';
import { getResources } from '../services/api';

function Resources() {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }
    loadResources();
  }, [navigate]);

  const loadResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
    if (filterType === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter((r) => r.type === filterType));
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'audio':
        return Headphones;
      case 'document':
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case 'video':
        return { bg: 'rgba(33, 128, 141, 0.1)', color: '#21808d' };
      case 'audio':
        return { bg: 'rgba(168, 75, 47, 0.1)', color: '#a84b2f' };
      case 'document':
        return { bg: 'rgba(98, 108, 113, 0.1)', color: '#626c71' };
      default:
        return { bg: 'rgba(94, 82, 64, 0.1)', color: '#5e5240' };
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return { bg: 'rgba(33, 128, 141, 0.1)', color: '#21808d' };
      case 'Intermediate':
        return { bg: 'rgba(168, 75, 47, 0.1)', color: '#a84b2f' };
      case 'Advanced':
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
            <h1 style={styles.title}>Learning Resources</h1>
            <p style={styles.subtitle}>
              Access videos, audio guides, and materials uploaded by organizations
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
              All Resources
            </button>
            <button
              onClick={() => handleFilter('video')}
              style={{
                ...styles.filterButton,
                ...(filter === 'video' ? styles.filterButtonActive : {}),
              }}
            >
              <PlayCircle size={16} />
              Videos
            </button>
            <button
              onClick={() => handleFilter('audio')}
              style={{
                ...styles.filterButton,
                ...(filter === 'audio' ? styles.filterButtonActive : {}),
              }}
            >
              <Headphones size={16} />
              Audio
            </button>
            <button
              onClick={() => handleFilter('document')}
              style={{
                ...styles.filterButton,
                ...(filter === 'document' ? styles.filterButtonActive : {}),
              }}
            >
              <FileText size={16} />
              Documents
            </button>
          </div>
        </div>

        {/* Resources List */}
        {loading ? (
          <div style={styles.loading}>Loading resources...</div>
        ) : (
          <div style={styles.resourcesList}>
            {filteredResources.map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              const typeBadge = getTypeBadgeColor(resource.type);
              const difficultyBadge = getDifficultyColor(resource.difficulty);

              return (
                <div key={resource.id} style={styles.resourceCard}>
                  <div style={styles.resourceThumbnail}>
                    <div style={styles.thumbnailOverlay}>
                      <TypeIcon size={48} color="#ffffff" />
                    </div>
                  </div>

                  <div style={styles.resourceContent}>
                    <div style={styles.resourceHeader}>
                      <div style={{ ...styles.typeBadge, backgroundColor: typeBadge.bg }}>
                        <TypeIcon size={14} color={typeBadge.color} />
                        <span style={{ color: typeBadge.color }}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                      </div>
                      {resource.difficulty && (
                        <div style={{ ...styles.difficultyBadge, backgroundColor: difficultyBadge.bg }}>
                          <span style={{ color: difficultyBadge.color }}>{resource.difficulty}</span>
                        </div>
                      )}
                    </div>

                    <h3 style={styles.resourceTitle}>{resource.title}</h3>
                    <p style={styles.resourceDescription}>{resource.description}</p>

                    <div style={styles.resourceMeta}>
                      <div style={styles.metaItem}>
                        <span style={styles.metaLabel}>Organization:</span>
                        <span style={styles.metaValue}>{resource.organization}</span>
                      </div>
                      <div style={styles.metaItem}>
                        <span style={styles.metaLabel}>Duration:</span>
                        <span style={styles.metaValue}>
                          <Clock size={14} style={{ marginRight: '4px' }} />
                          {resource.duration}
                        </span>
                      </div>
                      {resource.views && (
                        <div style={styles.metaItem}>
                          <span style={styles.metaLabel}>Views:</span>
                          <span style={styles.metaValue}>
                            <Eye size={14} style={{ marginRight: '4px' }} />
                            {resource.views}
                          </span>
                        </div>
                      )}
                      {resource.downloads && (
                        <div style={styles.metaItem}>
                          <span style={styles.metaLabel}>Downloads:</span>
                          <span style={styles.metaValue}>
                            <Download size={14} style={{ marginRight: '4px' }} />
                            {resource.downloads}
                          </span>
                        </div>
                      )}
                    </div>

                    {resource.progress > 0 && (
                      <div style={styles.progressSection}>
                        <div style={styles.progressHeader}>
                          <span style={styles.progressLabel}>Progress</span>
                          <span style={styles.progressPercent}>{resource.progress}%</span>
                        </div>
                        <div style={styles.progressBar}>
                          <div style={{ ...styles.progressFill, width: `${resource.progress}%` }} />
                        </div>
                      </div>
                    )}

                    <div style={styles.resourceActions}>
                      <button style={styles.primaryButton}>
                        <Play size={16} />
                        <span>{resource.progress > 0 ? 'Continue Learning' : 'Start Learning'}</span>
                      </button>
                      {resource.type === 'document' && (
                        <button style={styles.secondaryButton}>
                          <Download size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredResources.length === 0 && !loading && (
          <div style={styles.emptyState}>
            <FileText size={48} color="#626c71" />
            <p style={styles.emptyText}>No resources found matching your filter</p>
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
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
  resourcesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '24px',
  },
  resourceCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
  },
  resourceThumbnail: {
    position: 'relative',
    width: '100%',
    height: '180px',
    backgroundColor: '#21808d',
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  resourceContent: {
    padding: '20px',
  },
  resourceHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  typeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
  },
  difficultyBadge: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '6px',
  },
  resourceTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
    lineHeight: '1.4',
  },
  resourceDescription: {
    fontSize: '14px',
    color: '#626c71',
    lineHeight: '1.6',
    marginBottom: '16px',
  },
  resourceMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid rgba(94, 82, 64, 0.12)',
  },
  metaItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: '13px',
    color: '#626c71',
  },
  metaValue: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: '500',
    color: '#13343b',
  },
  progressSection: {
    marginBottom: '16px',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#626c71',
  },
  progressPercent: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#21808d',
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
    transition: 'width 0.3s ease',
  },
  resourceActions: {
    display: 'flex',
    gap: '8px',
  },
  primaryButton: {
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
    transition: 'background-color 0.2s ease',
  },
  secondaryButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    backgroundColor: 'rgba(94, 82, 64, 0.08)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
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

export default Resources;
