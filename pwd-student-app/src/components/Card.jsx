function Card({ 
  title, 
  description, 
  children, 
  onClick, 
  icon: Icon,
  badge,
  footer 
}) {
  return (
    <div 
      style={{
        ...styles.card,
        ...(onClick ? styles.cardClickable : {}),
      }}
      onClick={onClick}
    >
      {(Icon || badge) && (
        <div style={styles.headerRow}>
          {Icon && (
            <div style={styles.icon}>
              <Icon size={20} />
            </div>
          )}
          {badge && <span style={styles.badge}>{badge}</span>}
        </div>
      )}
      
      {title && <h3 style={styles.title}>{title}</h3>}
      {description && <p style={styles.description}>{description}</p>}
      
      {children && <div style={styles.content}>{children}</div>}
      
      {footer && <div style={styles.footer}>{footer}</div>}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(94, 82, 64, 0.12)',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    transition: 'all 0.2s ease',
  },
  cardClickable: {
    cursor: 'pointer',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
  },
  badge: {
    padding: '4px 8px',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    color: '#21808d',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#13343b',
    marginBottom: '8px',
  },
  description: {
    fontSize: '14px',
    color: '#626c71',
    lineHeight: '1.6',
    marginBottom: '12px',
  },
  content: {
    marginTop: '12px',
  },
  footer: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(94, 82, 64, 0.12)',
  },
};

export default Card;
