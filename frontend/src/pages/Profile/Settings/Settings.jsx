import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import './settings.css'
const Settings = () => {

  const navigate = useNavigate()

  // User state
  const [user, setUser] = useState({
    username: 'JohnDoe123',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    profilePicture: null
  });

  // Form states
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [emailData, setEmailData] = useState({
    newEmail: user.email
  });
  
  const [usernameData, setUsernameData] = useState({
    newUsername: user.username,
    password: ''
  });
  
  const [phoneData, setPhoneData] = useState({
    newPhone: user.phone || ''
  });
  
  const [deleteAccountData, setDeleteAccountData] = useState({
    password: '',
    confirmText: ''
  });

  // Modal states
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      // Here you would typically upload the file to your backend
      // For now we just update the local state
    }
  };

  // Password update handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Validation logic
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    // Here you would send the update to your backend
    alert('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Email update handlers
  const handleEmailChange = (e) => {
    setEmailData({
      newEmail: e.target.value
    });
  };

  const handleUpdateEmail = (e) => {
    e.preventDefault();
    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.newEmail)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Here you would send the update to your backend
    setUser({
      ...user,
      email: emailData.newEmail
    });
    alert('Email updated successfully!');
  };

  // Username update handlers
  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUsernameData({
      ...usernameData,
      [name]: value
    });
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    // Here you would verify the password and update the username on your backend
    
    // For demo purposes, update immediately
    setUser({
      ...user,
      username: usernameData.newUsername
    });
    setShowUsernameModal(false);
    alert('Username updated successfully!');
  };

  // Phone update handlers
  const handlePhoneChange = (e) => {
    setPhoneData({
      newPhone: e.target.value
    });
  };

  const handleUpdatePhone = (e) => {
    e.preventDefault();
    // Phone validation logic
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneData.newPhone.replace(/\s+/g, ''))) {
      alert('Please enter a valid phone number!');
      return;
    }

    // Here you would send the update to your backend
    setUser({
      ...user,
      phone: phoneData.newPhone
    });
    alert('Phone number updated successfully!');
  };

  // Delete account handlers
  const handleDeleteAccountDataChange = (e) => {
    const { name, value } = e.target;
    setDeleteAccountData({
      ...deleteAccountData,
      [name]: value
    });
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (deleteAccountData.confirmText !== 'DELETE') {
      alert('Please type DELETE to confirm account deletion.');
      return;
    }

    // Here you would send the delete request to your backend
    alert('Account deleted successfully!');
    // Redirect to login page or home page
    setShowDeleteConfirmModal(false);
  };

  // Logout handler
  const handleLogout = () => {
    // Here you would handle logout logic
    alert('Logged out successfully!');
    // Redirect to login page
  };


  return (
    <div className="settings-container">
      {/* Back button */}
      <div className="back-navigation">
        <button onClick={()=>navigate('/user/profile')} className="back-button">
          <ChevronLeft size={20} />
          <span>Back to Search</span>
        </button>
      </div>

      <div className="settings-header">
        <h1 className="settings-title">Account Settings</h1>
        <p className="settings-subtitle">Manage your personal information and account preferences</p>
      </div>

      <div className="settings-content">
        {/* Profile Picture Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Profile Picture</h2>
          <div className="settings-profile-picture-container">
            <div className="settings-profile-picture">
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" className="settings-profile-img" />
              ) : (
                <div className="settings-profile-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" className="settings-profile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="settings-profile-upload">
              <p className="settings-upload-text">Upload a new profile picture</p>
              <label className="settings-upload-btn">
                Choose File
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureChange} 
                  className="settings-file-input" 
                />
              </label>
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Username</h2>
          <div className="settings-info-container">
            <p className="settings-current-info">Current Username: <span className="settings-info-value">{user.username}</span></p>
            <button 
              className="settings-update-btn" 
              onClick={() => setShowUsernameModal(true)}
            >
              Update Username
            </button>
          </div>
        </div>

        {/* Email Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Email Address</h2>
          <form className="settings-form" onSubmit={handleUpdateEmail}>
            <div className="settings-form-group">
              <label className="settings-form-label">New Email Address</label>
              <input 
                type="email" 
                value={emailData.newEmail} 
                onChange={handleEmailChange} 
                className="settings-form-input" 
                placeholder="Enter new email address"
                required 
              />
            </div>
            <button type="submit" className="settings-submit-btn">
              Update Email
            </button>
          </form>
        </div>

        {/* Phone Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Phone Number</h2>
          <form className="settings-form" onSubmit={handleUpdatePhone}>
            <div className="settings-form-group">
              <label className="settings-form-label">Phone Number</label>
              <input 
                type="tel" 
                value={phoneData.newPhone} 
                onChange={handlePhoneChange} 
                className="settings-form-input" 
                placeholder="Enter phone number"
              />
            </div>
            <button type="submit" className="settings-submit-btn">
              Update Phone
            </button>
          </form>
        </div>

        {/* Password Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Change Password</h2>
          <form className="settings-form" onSubmit={handleUpdatePassword}>
            <div className="settings-form-group">
              <label className="settings-form-label">Current Password</label>
              <input 
                type="password" 
                name="currentPassword"
                value={passwordData.currentPassword} 
                onChange={handlePasswordChange} 
                className="settings-form-input" 
                placeholder="Enter current password"
                required 
              />
            </div>
            <div className="settings-form-group">
              <label className="settings-form-label">New Password</label>
              <input 
                type="password" 
                name="newPassword"
                value={passwordData.newPassword} 
                onChange={handlePasswordChange} 
                className="settings-form-input" 
                placeholder="Enter new password"
                required 
              />
            </div>
            <div className="settings-form-group">
              <label className="settings-form-label">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={passwordData.confirmPassword} 
                onChange={handlePasswordChange} 
                className="settings-form-input" 
                placeholder="Confirm new password"
                required 
              />
            </div>
            <button type="submit" className="settings-submit-btn">
              Update Password
            </button>
          </form>
        </div>

        {/* Account Actions Section */}
        <div className="settings-section settings-account-actions">
          <h2 className="settings-section-title">Account Actions</h2>
          <div className="settings-actions-container">
            <button className="settings-logout-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" className="settings-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
            <button className="settings-delete-btn" onClick={() => setShowDeleteConfirmModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="settings-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Username Update Modal */}
      {showUsernameModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-header">
              <h3 className="settings-modal-title">Update Username</h3>
              <button 
                className="settings-modal-close" 
                onClick={() => setShowUsernameModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form className="settings-modal-form" onSubmit={handleUsernameSubmit}>
              <div className="settings-form-group">
                <label className="settings-form-label">New Username</label>
                <input 
                  type="text" 
                  name="newUsername"
                  value={usernameData.newUsername} 
                  onChange={handleUsernameChange} 
                  className="settings-form-input" 
                  placeholder="Enter new username"
                  required 
                />
              </div>
              <div className="settings-form-group">
                <label className="settings-form-label">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={usernameData.password} 
                  onChange={handleUsernameChange} 
                  className="settings-form-input" 
                  placeholder="Confirm with your password"
                  required 
                />
              </div>
              <div className="settings-modal-actions">
                <button 
                  type="button" 
                  className="settings-modal-cancel" 
                  onClick={() => setShowUsernameModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="settings-modal-submit">
                  Update Username
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteConfirmModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal settings-delete-modal">
            <div className="settings-modal-header">
              <h3 className="settings-modal-title settings-delete-title">Delete Account</h3>
              <button 
                className="settings-modal-close" 
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="settings-delete-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="settings-warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <p className="settings-warning-text">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
            <form className="settings-modal-form" onSubmit={handleDeleteAccount}>
              <div className="settings-form-group">
                <label className="settings-form-label">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={deleteAccountData.password} 
                  onChange={handleDeleteAccountDataChange} 
                  className="settings-form-input" 
                  placeholder="Enter your password"
                  required 
                />
              </div>
              <div className="settings-form-group">
                <label className="settings-form-label">Confirm Deletion</label>
                <p className="settings-confirm-text">Type "DELETE" to confirm</p>
                <input 
                  type="text" 
                  name="confirmText"
                  value={deleteAccountData.confirmText} 
                  onChange={handleDeleteAccountDataChange} 
                  className="settings-form-input" 
                  placeholder="Type DELETE"
                  required 
                />
              </div>
              <div className="settings-modal-actions">
                <button 
                  type="button" 
                  className="settings-modal-cancel" 
                  onClick={() => setShowDeleteConfirmModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="settings-modal-delete">
                  Delete My Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;