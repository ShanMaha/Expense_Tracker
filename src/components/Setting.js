import React, { useState, useEffect } from 'react';
import './Settings.css';

function Setting() {
  // Initialize profile state with default values
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: '',
    profilePicture: '',
    darkMode: false,
    notifications: {
      email: true,
      sms: false,
      inApp: true,
    },
    privacy: 'friends',
    twoFactorAuth: false,
    bio: '',
    language: 'en',
    region: 'US',
  });

  const [editing, setEditing] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Load profile data from localStorage when the component mounts
    try {
      const savedProfile = JSON.parse(localStorage.getItem('profile'));
      if (savedProfile) {
        setProfile(savedProfile);
        setPreview(savedProfile.profilePicture || null);
      }
    } catch (e) {
      console.error('Error loading profile from localStorage:', e);
    }
  }, []); // Empty dependency array to run once on mount

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: checked,
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result,
        }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem('profile', JSON.stringify(profile));
      setEditing(false);
    } catch (e) {
      if (e.code === 22 || e.name === 'QuotaExceededError') {
        console.error('Storage quota exceeded! Consider cleaning up old data or reducing the size of the stored item.');
        // Handle the error, such as by notifying the user
      } else {
        console.error('An error occurred while saving to localStorage:', e);
      }
    }
  };

  return (
    <div className={`profile-container ${profile.darkMode ? 'dark-mode' : ''}`}>
      <h1 className="profile-title">Profile Settings</h1>

      {editing ? (
        <div className="profile-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profile.username || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={profile.password || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
            {preview && <img src={preview} alt="Preview" className="profile-picture-preview" />}
          </label>
          <label>
            Bio:
            <textarea
              name="bio"
              value={profile.bio || ''}
              onChange={handleChange}
            />
          </label>
          <label>
            Dark Mode:
            <input
              type="checkbox"
              name="darkMode"
              checked={profile.darkMode || false}
              onChange={handleChange}
            />
          </label>
          <div className="checkbox-row">
            <h2>Notification Preferences</h2>
            <label>
              Email Notifications:
              <input
                type="checkbox"
                name="email"
                checked={profile.notifications?.email || false}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    notifications: {
                      ...prevProfile.notifications,
                      email: e.target.checked,
                    },
                  }))
                }
              />
            </label>
            <label>
              SMS Notifications:
              <input
                type="checkbox"
                name="sms"
                checked={profile.notifications?.sms || false}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    notifications: {
                      ...prevProfile.notifications,
                      sms: e.target.checked,
                    },
                  }))
                }
              />
            </label>
            <label>
              In-App Notifications:
              <input
                type="checkbox"
                name="inApp"
                checked={profile.notifications?.inApp || false}
                onChange={(e) =>
                  setProfile((prevProfile) => ({
                    ...prevProfile,
                    notifications: {
                      ...prevProfile.notifications,
                      inApp: e.target.checked,
                    },
                  }))
                }
              />
            </label>
          </div>
          <label>
            Privacy Settings:
            <select
              name="privacy"
              value={profile.privacy || 'friends'}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </label>
          <label>
            Two-Factor Authentication:
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={profile.twoFactorAuth || false}
              onChange={handleChange}
            />
          </label>
          <label>
            Language:
            <select
              name="language"
              value={profile.language || 'en'}
              onChange={handleChange}
            >
              <option value="en">English</option>
              <option value="es">Tamil</option>
              <option value="fr">Sinhala</option>
              {/* Add more languages as needed */}
            </select>
          </label>
          <label>
            Region:
            <select
              name="region"
              value={profile.region || 'US'}
              onChange={handleChange}
            >
              <option value="US">Sri Lanka</option>
              <option value="EU">India</option>
              <option value="AS">Other</option>
              {/* Add more regions as needed */}
            </select>
          </label>
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setEditing(false)} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <div className="profile-details">
          {profile.profilePicture && (
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <p><strong>Username:</strong> {profile.username || 'Not Set'}</p>
          <p><strong>Email:</strong> {profile.email || 'Not Set'}</p>
          <p><strong>Bio:</strong> {profile.bio || 'Not Set'}</p>
          <p><strong>Language:</strong> {profile.language || 'Not Set'}</p>
          <p><strong>Region:</strong> {profile.region || 'Not Set'}</p>
          <button onClick={() => setEditing(true)} className="edit-button">Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default Setting;
