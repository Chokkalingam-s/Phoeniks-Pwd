import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, 
  MessageSquare,
  LogOut,
  X,
  AlertCircle,
  CheckCircle,
  UserX,
  Users
} from "lucide-react";

export default function OrganizationDashboard() {
  const navigate = useNavigate();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const employee = {
    name: "Priya Sharma",
    id: "ORG-EMP-202501",
    role: "Senior Coordinator",
  };

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";

  // Organization location (Chennai)
  const orgLocation = {
    lat: 13.0827,
    lng: 80.2707,
    name: "Phoenix Organization Center"
  };

  // Mock data for PWD individuals with real Chennai coordinates
  const pwdIndividuals = [
    {
      id: 1,
      name: "Rajesh Kumar",
      lat: 13.0850,
      lng: 80.2750,
      status: "not-applied",
      disability: "Visual Impairment",
      phone: "+91-9876543210",
      address: "12, Anna Salai, Chennai",
      age: 28,
    },
    {
      id: 2,
      name: "Meena Devi",
      lat: 13.0478,
      lng: 80.2573,
      status: "registered",
      disability: "Hearing Impairment",
      phone: "+91-9876543211",
      address: "45, T Nagar, Chennai",
      age: 32,
    },
    {
      id: 3,
      name: "Arjun Patel",
      lat: 13.0569,
      lng: 80.2425,
      status: "active",
      disability: "Locomotor Disability",
      phone: "+91-9876543212",
      address: "78, Nungambakkam, Chennai",
      age: 25,
      organization: "Skills Training Center",
    },
    {
      id: 4,
      name: "Lakshmi Reddy",
      lat: 13.0339,
      lng: 80.2707,
      status: "not-applied",
      disability: "Intellectual Disability",
      phone: "+91-9876543213",
      address: "23, Mylapore, Chennai",
      age: 22,
    },
    {
      id: 5,
      name: "Suresh Babu",
      lat: 13.0067,
      lng: 80.2206,
      status: "registered",
      disability: "Multiple Disabilities",
      phone: "+91-9876543214",
      address: "90, Adyar, Chennai",
      age: 35,
    },
    {
      id: 6,
      name: "Priya Menon",
      lat: 12.9716,
      lng: 80.2180,
      status: "active",
      disability: "Visual Impairment",
      phone: "+91-9876543215",
      address: "56, Velachery, Chennai",
      age: 27,
      organization: "Digital Training Hub",
    },
    {
      id: 7,
      name: "Anil Sharma",
      lat: 13.0010,
      lng: 80.2565,
      status: "not-applied",
      disability: "Speech & Hearing Disability",
      phone: "+91-9876543216",
      address: "34, Besant Nagar, Chennai",
      age: 30,
    },
    {
      id: 8,
      name: "Kavitha Rao",
      lat: 13.0524,
      lng: 80.2101,
      status: "active",
      disability: "Locomotor Disability",
      phone: "+91-9876543217",
      address: "67, Kodambakkam, Chennai",
      age: 29,
      organization: "IT Skills Academy",
    },
    {
      id: 9,
      name: "Ramesh Iyer",
      lat: 12.9935,
      lng: 80.2462,
      status: "registered",
      disability: "Visual Impairment",
      phone: "+91-9876543218",
      address: "89, Perungudi, Chennai",
      age: 26,
    },
    {
      id: 10,
      name: "Divya Nair",
      lat: 13.0524,
      lng: 80.2520,
      status: "not-applied",
      disability: "Hearing Impairment",
      phone: "+91-9876543219",
      address: "102, Vadapalani, Chennai",
      age: 24,
    },
  ];

  // Load Google Maps Script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => initializeMap();
      script.onerror = () => {
        console.error("Failed to load Google Maps script");
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Initialize Google Map
  const initializeMap = () => {
    const mapElement = document.getElementById('google-map');
    if (!mapElement || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapElement, {
      center: orgLocation,
      zoom: 12,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    setMap(mapInstance);
    addMarkers(mapInstance);
  };

  // Create custom pin SVG
  const createPinIcon = (color) => {
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
      fillColor: color,
      fillOpacity: 1,
      strokeColor: "#ffffff",
      strokeWeight: 2,
      scale: 1.5,
      anchor: new window.google.maps.Point(12, 22),
    };
  };

  // Add markers to map
  const addMarkers = (mapInstance) => {
    const newMarkers = [];

    // Add organization marker (Purple Pin)
    const orgMarker = new window.google.maps.Marker({
      position: orgLocation,
      map: mapInstance,
      title: orgLocation.name,
      icon: createPinIcon('#8b5cf6'),
      zIndex: 1000
    });

    const orgInfoWindow = new window.google.maps.InfoWindow({
      content: `<div style="padding: 8px;">
        <strong style="color: #8b5cf6;">📍 ${orgLocation.name}</strong>
        <p style="margin: 4px 0 0; font-size: 12px; color: #626c71;">Your Location</p>
      </div>`
    });

    orgMarker.addListener('click', () => {
      orgInfoWindow.open(mapInstance, orgMarker);
    });

    newMarkers.push(orgMarker);

    // Add PWD individual markers (Colored Pins)
    pwdIndividuals.forEach((person) => {
      let markerColor = '#626c71';
      let statusLabel = 'Unknown';
      
      if (person.status === 'not-applied') {
        markerColor = '#dc2626';
        statusLabel = 'Not Applied';
      } else if (person.status === 'registered') {
        markerColor = '#eab308';
        statusLabel = 'Needs Guidance';
      } else if (person.status === 'active') {
        markerColor = '#16a34a';
        statusLabel = 'Active Learner';
      }

      const marker = new window.google.maps.Marker({
        position: { lat: person.lat, lng: person.lng },
        map: mapInstance,
        title: person.name,
        icon: createPinIcon(markerColor),
        animation: window.google.maps.Animation.DROP,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px; min-width: 200px;">
          <strong style="color: ${markerColor};">${person.name}</strong>
          <p style="margin: 4px 0; font-size: 12px; color: #626c71;">${statusLabel}</p>
          <button 
            onclick="document.dispatchEvent(new CustomEvent('openPersonModal', { detail: ${person.id} }))"
            style="
              margin-top: 8px;
              padding: 6px 12px;
              background: #21808d;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 12px;
              font-weight: 500;
            "
          >
            View Details
          </button>
        </div>`
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  // Handle custom event from info window button
  useEffect(() => {
    const handleOpenModal = (event) => {
      const personId = event.detail;
      const person = pwdIndividuals.find(p => p.id === personId);
      if (person) {
        handlePinClick(person);
      }
    };

    document.addEventListener('openPersonModal', handleOpenModal);
    return () => {
      document.removeEventListener('openPersonModal', handleOpenModal);
    };
  }, []);

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
          icon: <UserX size={16} />
        };
      case "registered":
        return {
          label: "UDID Registered - Needs Guidance",
          color: "#eab308",
          icon: <AlertCircle size={16} />
        };
      case "active":
        return {
          label: "Active Learner",
          color: "#16a34a",
          icon: <CheckCircle size={16} />
        };
      default:
        return {
          label: "Unknown",
          color: "#626c71",
          icon: null
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
            <Briefcase size={24} />
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
            <h3 style={styles.mapTitle}>PWD Community Map - Chennai</h3>
            <p style={styles.mapSubtitle}>
              Real-time tracking of PWD individuals in your area
            </p>
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendPin, backgroundColor: '#8b5cf6' }} />
              <span style={styles.legendText}>Your Organization</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendPin, backgroundColor: '#dc2626' }} />
              <span style={styles.legendText}>Not Applied ({stats.notApplied})</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendPin, backgroundColor: '#eab308' }} />
              <span style={styles.legendText}>Needs Guidance ({stats.registered})</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendPin, backgroundColor: '#16a34a' }} />
              <span style={styles.legendText}>Active Learners ({stats.active})</span>
            </div>
          </div>

          {/* Google Map Container */}
          <div 
            id="google-map" 
            style={styles.mapContainer}
          />

          {/* Map Instructions */}
          <div style={styles.mapInstructions}>
            <p style={styles.instructionText}>
              💡 Click on any pin to view quick info, or click "View Details" for complete information
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
                    backgroundColor: `${getStatusInfo(selectedPerson.status).color}20`,
                    color: getStatusInfo(selectedPerson.status).color,
                    border: `1px solid ${getStatusInfo(selectedPerson.status).color}40`
                  }}
                >
                  {getStatusInfo(selectedPerson.status).icon}
                  <span>{getStatusInfo(selectedPerson.status).label}</span>
                </div>
              </div>

              {/* Simple Key-Value Table */}
              <div style={styles.detailsTable}>
                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Name:</span>
                  <span style={styles.detailValue}>{selectedPerson.name}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Disability:</span>
                  <span style={styles.detailValue}>{selectedPerson.disability}</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Age:</span>
                  <span style={styles.detailValue}>{selectedPerson.age} years</span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Phone:</span>
                  <span style={styles.detailValue}>
                    <a href={`tel:${selectedPerson.phone}`} style={styles.phoneLink}>
                      {selectedPerson.phone}
                    </a>
                  </span>
                </div>

                <div style={styles.detailRow}>
                  <span style={styles.detailKey}>Address:</span>
                  <span style={styles.detailValue}>{selectedPerson.address}</span>
                </div>

                {selectedPerson.organization && (
                  <div style={styles.detailRow}>
                    <span style={styles.detailKey}>Organization:</span>
                    <span style={styles.detailValue}>{selectedPerson.organization}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                {selectedPerson.status === "not-applied" && (
                  <button style={styles.primaryButton}>
                    📧 Send UDID Information
                  </button>
                )}
                
                {selectedPerson.status === "registered" && (
                  <button style={styles.primaryButton}>
                    📚 Provide Guidance
                  </button>
                )}
                
                {selectedPerson.status === "active" && (
                  <button style={styles.successButton}>
                    ✅ View Progress
                  </button>
                )}
                
                <button 
                  style={styles.secondaryButton}
                  onClick={() => {
                    if (map) {
                      map.setCenter({ lat: selectedPerson.lat, lng: selectedPerson.lng });
                      map.setZoom(15);
                      closeModal();
                    }
                  }}
                >
                  📍 Show on Map
                </button>
              </div>
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
  legendPin: {
    width: '12px',
    height: '16px',
    borderRadius: '50% 50% 50% 0',
    transform: 'rotate(-45deg)',
    border: '2px solid #ffffff',
  },
  legendText: {
    fontSize: '13px',
    color: '#13343b',
    fontWeight: '500',
  },
  mapContainer: {
    width: '100%',
    height: '600px',
    borderRadius: '12px',
    border: '2px solid rgba(33, 128, 141, 0.1)',
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
    maxWidth: '500px',
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
  detailsTable: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '12px',
    backgroundColor: 'rgba(94, 82, 64, 0.03)',
    borderRadius: '6px',
  },
  detailKey: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#626c71',
    minWidth: '100px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#13343b',
    textAlign: 'right',
    flex: 1,
  },
  phoneLink: {
    color: '#21808d',
    textDecoration: 'none',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    flex: 1,
    minWidth: '150px',
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
  successButton: {
    flex: 1,
    minWidth: '150px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff',
    backgroundColor: '#16a34a',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  secondaryButton: {
    flex: 1,
    minWidth: '150px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#21808d',
    backgroundColor: 'rgba(33, 128, 141, 0.1)',
    border: '1px solid rgba(33, 128, 141, 0.2)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
