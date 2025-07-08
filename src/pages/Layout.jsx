// src/components/Layout.js
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";



// Function to handle logout
// This function will remove the login status from localStorage and redirect to the login page


const handleLogout = (setProfile, navigate) => {
    localStorage.clear();
    setProfile({
        username: 'Guest',
        email: 'Not set',
        joinDate: 'N/A',
        isLoggedIn: false
    });
    navigate('/login');
};



const Layout = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [profile, setProfile] = useState({
        username: localStorage.getItem('username') || 'Guest',
        email: localStorage.getItem('email') || 'Not set',
        joinDate: localStorage.getItem('joinDate') || 'N/A',
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const updateProfile = () => {
            setProfile({
                username: localStorage.getItem('username') || 'Guest',
                email: localStorage.getItem('email') || 'Not set',
                joinDate: localStorage.getItem('joinDate') || 'N/A',
                isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
            });
        };
        updateProfile();
        window.addEventListener('storage', updateProfile);
        return () => window.removeEventListener('storage', updateProfile);
    }, []);

    const handleLoginClick = () => {
        setNavOpen(false);
        navigate('/login');
    };

    return (
        <div style={styles.wrapper}>
            {/* Header */}
            <header style={styles.header}>
                <button
                    aria-label="Toggle navigation"
                    onClick={() => setNavOpen(!navOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        position: 'absolute',
                        left: 20,
                        top: 18,
                        zIndex: 1100
                    }}
                >
                    <span>{navOpen ? '\u2715' : '\u2630'}</span>
                </button>
                <div style={styles.headerContent}>
                    <span role="img" aria-label="rocket" style={{ fontSize: '2rem' }}>🚀</span>
                    <h1 style={styles.headerTitle}>React Quiz App</h1>
                    {profile.isLoggedIn && (
                        <span style={styles.greeting}>👋 Welcome, {profile.username}</span>
                    )}
                </div>
            </header>

            {/* Sidebar Navigation */}
            <nav
                style={{
                    ...styles.sidebar,
                    left: navOpen ? 0 : '-220px',
                    transition: 'left 0.3s',
                }}
            >
                {/* Profile View */}
                <div style={styles.profileView}>
                    <div style={styles.avatar}>
                        <span role="img" aria-label="User" style={{ fontSize: '2.5rem' }}>👤</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>
                            {profile.username}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#ccc' }}>
                            {profile.isLoggedIn ? 'Logged In' : 'Not Logged In'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#bbb', marginTop: 2 }}>
                            Email: {profile.email}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#bbb' }}>
                            Joined: {profile.joinDate}
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                            <button
                                style={{
                                    background: '#555',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 4,
                                    padding: '4px 10px',
                                    marginBottom: 2,
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: 500
                                }}
                                onClick={() => alert('Profile editing coming soon!')}
                            >Edit Profile</button>
                            <button
                                style={{
                                    background: '#888',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 4,
                                    padding: '4px 10px',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: 500
                                }}
                                onClick={() => alert('Change password coming soon!')}
                            >Change Password</button>
                        </div>
                    </div>
                </div>
                <hr style={{ borderColor: '#666', margin: '1rem 0' }} />
                <Link to="/" style={styles.link} onClick={() => setNavOpen(false)}>Home</Link>
                <Link to="/quiz" style={styles.link} onClick={() => setNavOpen(false)}>Start Quiz</Link>
                <Link to="/results" style={styles.link} onClick={() => setNavOpen(false)}>Results</Link>
                <Link to="/add-quiz" style={styles.link} onClick={() => setNavOpen(false)}>Add Quiz</Link>
                {profile.isLoggedIn ? (
                    <button
                        onClick={() => { handleLogout(setProfile, navigate); setNavOpen(false); }}
                        className="btn btn-danger m-2"
                    >Logout</button>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className="btn btn-success m-2"
                    >Login</button>
                )}
            </nav>

            {/* Overlay for closing sidebar on mobile */}
            {navOpen && (
                <div
                    onClick={() => setNavOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.2)',
                        zIndex: 1000
                    }}
                />
            )}

            {/* Page Content */}
            <main style={styles.content}>
                <Outlet />
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>&copy; 2025 Hamza Khan - Quiz App. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    header: {
        background: "linear-gradient(90deg, #3f51b5, #5c6bc0)",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        position: "relative",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    },
    headerContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    },
    headerTitle: {
        margin: 0,
        fontSize: "1.8rem",
    },
    greeting: {
        fontSize: "1rem",
        color: "#e0e0e0",
    }
    ,
    wrapper: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '220px',
        background: '#444',
        padding: '2.5rem 1rem 1rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 1200,
        boxShadow: '2px 0 8px rgba(0,0,0,0.08)'
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "bold"
    },
    profileView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '1rem',
        marginTop: '-1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid #555',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: '#666',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    content: {
        flex: "1",
        padding: "2rem",
        backgroundColor: "#f9f9f9"
    },
    footer: {
        background: "#222",
        color: "#ccc",
        textAlign: "center",
        padding: "1rem"
    }
};

export default Layout;
