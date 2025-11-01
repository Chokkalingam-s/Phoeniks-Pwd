import { useState } from "react";
import { 
  Plus, 
  Play, 
  X, 
  Filter, 
  Upload, 
  Video, 
  Image as ImageIcon,
  FileText,
  User,
  Tag
} from "lucide-react";

const disabilityOptions = [
  "Blindness", "Low Vision", "Leprosy-Cured", "Hearing Impairment", "Locomotor Disability",
  "Dwarfism", "Intellectual Disability", "Mental Illness", "Autism Spectrum Disorder",
  "Cerebral Palsy", "Muscular Dystrophy", "Chronic Neurological Conditions",
  "Specific Learning Disabilities", "Multiple Sclerosis"
];

const demoContents = [
  { id: 1, title: "Braille System Demo", type: "video", tag: "Blindness", url: "https://www.w3schools.com/html/movie.mp4", uploader: "Ms. Latika" },
  { id: 2, title: "Visual Aids for Low Vision", type: "video", tag: "Low Vision", url: "https://samplelib.com/mp4/sample-5s.mp4", uploader: "Rao Sir" },
  { id: 3, title: "Sign Language Numbers", type: "video", tag: "Hearing Impairment", url: "https://samplelib.com/mp4/sample-10s.mp4", uploader: "Mr. Prakash" },
  { id: 4, title: "Wheelchair Safety Guide", type: "pdf", tag: "Locomotor Disability", url: "#", uploader: "Rehab Staff" },
  { id: 5, title: "Braille Reading Guide", type: "pdf", tag: "Blindness", url: "#", uploader: "National Association for Blind" },
  { id: 6, title: "Mental Health Resources", type: "txt", tag: "Mental Illness", url: "#", uploader: "Dr. Nanda Kumar" },
];

export default function OrganizationContentUpload() {
  const [filter, setFilter] = useState("");
  const [allContent, setAllContent] = useState(demoContents);
  const [showModal, setShowModal] = useState(false);
  const [uploadTag, setUploadTag] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [modalError, setModalError] = useState("");

  const filtered = filter ? allContent.filter(c => c.tag === filter) : allContent;

  const openModal = () => { 
    setShowModal(true); 
    setModalError(""); 
  };

  const closeModal = () => {
    setShowModal(false);
    setUploadTag(""); 
    setUploadTitle(""); 
    setUploadFile(null); 
    setModalError("");
  };

  function handlePreviewClick(url) {
    window.open(url, '_blank');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!uploadTag || !uploadTitle || !uploadFile) {
      setModalError("Please fill all fields and upload a file.");
      return;
    }
    
    const newId = allContent.length + 1;
    const url = URL.createObjectURL(uploadFile);
    
    // Determine file type
    let type = "document";
    if (uploadFile.type.startsWith("video")) type = "video";
    else if (uploadFile.type.startsWith("image")) type = "image";
    else if (uploadFile.type === "application/pdf") type = "pdf";
    else if (uploadFile.type === "text/plain" || uploadFile.name.endsWith(".txt")) type = "txt";
    
    setAllContent([
      { id: newId, title: uploadTitle, type, tag: uploadTag, url, uploader: "You" },
      ...allContent
    ]);
    closeModal();
  }

  const getTagColor = (tag) => {
    const colors = {
      'Blindness': '#21808d',
      'Low Vision': '#1d7480',
      'Hearing Impairment': '#a84b2f',
      'Locomotor Disability': '#626c71',
      'Intellectual Disability': '#5e5240',
    };
    return colors[tag] || '#21808d';
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={14} />;
      case 'image': return <ImageIcon size={14} />;
      case 'pdf': return <FileText size={14} />;
      case 'txt': return <FileText size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const getFileTypeLabel = (type) => {
    const labels = {
      'video': 'Video',
      'image': 'Image',
      'pdf': 'PDF',
      'txt': 'Text',
      'document': 'Document'
    };
    return labels[type] || 'File';
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Educational Content Forum</h1>
            <p style={styles.subtitle}>Upload and manage learning resources for PWD students</p>
          </div>
          <button style={styles.uploadButton} onClick={openModal}>
            <Plus size={18} />
            <span>Upload Content</span>
          </button>
        </div>

        {/* Filter Section */}
        <div style={styles.filterSection}>
          <div style={styles.filterHeader}>
            <Filter size={18} color="#626c71" />
            <span style={styles.filterLabel}>Filter by Disability Category:</span>
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="">All Categories</option>
            {disabilityOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Content Grid */}
        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <Video size={48} color="#626c71" />
            <p style={styles.emptyText}>No content available for this category yet.</p>
          </div>
        ) : (
          <div style={styles.contentGrid}>
            {filtered.map(c => (
              <div key={c.id} style={styles.contentCard}>
                <div 
                  style={{
                    ...styles.thumbnail,
                    backgroundColor: (c.type === 'pdf' || c.type === 'txt') ? '#f5f5f5' : '#13343b'
                  }}
                  onClick={() => handlePreviewClick(c.url)}
                  title="Click to preview"
                >
                  <div style={{
                    ...styles.playOverlay,
                    backgroundColor: (c.type === 'pdf' || c.type === 'txt') 
                      ? 'rgba(98, 108, 113, 0.9)' 
                      : 'rgba(33, 128, 141, 0.9)'
                  }}>
                    {c.type === 'video' ? (
                      <Play size={32} color="#ffffff" />
                    ) : (
                      <FileText size={32} color="#ffffff" />
                    )}
                  </div>
                  <div style={styles.typeIndicator}>
                    {getFileIcon(c.type)}
                    <span>{getFileTypeLabel(c.type)}</span>
                  </div>
                </div>

                <div style={styles.contentInfo}>
                  <h3 style={styles.contentTitle}>{c.title}</h3>
                  
                  <div style={styles.contentMeta}>
                    <div style={{
                      ...styles.categoryBadge,
                      backgroundColor: `${getTagColor(c.tag)}15`,
                      color: getTagColor(c.tag),
                      borderColor: `${getTagColor(c.tag)}30`,
                    }}>
                      <Tag size={12} />
                      <span>{c.tag}</span>
                    </div>
                    
                    <div style={styles.uploaderInfo}>
                      <User size={12} color="#626c71" />
                      <span>{c.uploader}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Upload New Content</h2>
              <button style={styles.closeButton} onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Tag size={16} style={{ marginRight: '6px' }} />
                  Disability Category
                </label>
                <select
                  value={uploadTag}
                  onChange={e => setUploadTag(e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="">Select a category</option>
                  {disabilityOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FileText size={16} style={{ marginRight: '6px' }} />
                  Content Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={e => setUploadTitle(e.target.value)}
                  style={styles.input}
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <Upload size={16} style={{ marginRight: '6px' }} />
                  Upload File (Video, Image, PDF, or TXT)
                </label>
                <input
                  type="file"
                  accept="video/*,image/*,.pdf,.txt,text/plain,application/pdf"
                  onChange={e => setUploadFile(e.target.files[0])}
                  style={styles.fileInput}
                  required
                />
                {uploadFile && (
                  <div style={styles.filePreview}>
                    <FileText size={16} color="#21808d" />
                    <div style={styles.fileInfo}>
                      <p style={styles.fileName}>{uploadFile.name}</p>
                      <p style={styles.fileSize}>
                        {(uploadFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {modalError && (
                <div style={styles.errorAlert}>
                  <X size={16} />
                  <span>{modalError}</span>
                </div>
              )}

              <div style={styles.modalActions}>
                <button type="button" onClick={closeModal} style={styles.cancelButton}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitButton}>
                  <Upload size={16} />
                  <span>Upload Content</span>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
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
  uploadButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  filterHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  filterLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
  },
  filterSelect: {
    padding: '8px 12px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: '200px',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  thumbnail: {
    position: 'relative',
    width: '100%',
    height: '160px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    transition: 'transform 0.2s ease',
  },
  typeIndicator: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },
  contentInfo: {
    padding: '16px',
  },
  contentTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  contentMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
  },
  categoryBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    border: '1px solid',
  },
  uploaderInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
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
    maxHeight: '90vh',
    overflowY: 'auto',
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
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#626c71',
    transition: 'background-color 0.2s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  select: {
    padding: '12px 16px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    outline: 'none',
    cursor: 'pointer',
  },
  fileInput: {
    padding: '12px',
    fontSize: '14px',
    color: '#13343b',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  filePreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    marginTop: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.05)',
    border: '1px solid rgba(33, 128, 141, 0.2)',
    borderRadius: '8px',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#13343b',
    marginBottom: '4px',
  },
  fileSize: {
    fontSize: '12px',
    color: '#626c71',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: 'rgba(192, 21, 47, 0.1)',
    color: '#c0152f',
    borderRadius: '8px',
    fontSize: '14px',
    border: '1px solid rgba(192, 21, 47, 0.2)',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
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
    transition: 'background-color 0.2s ease',
  },
  submitButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#21808d',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
};
