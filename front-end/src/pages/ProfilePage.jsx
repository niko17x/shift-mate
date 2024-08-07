import { useParams } from "react-router-dom";
import useFetchUserProfile from "../hooks/auth/useFetchUserProfile";
import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import useFetchUpdateUserProfile from "../hooks/auth/useFetchUpdateUserProfile";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { id } = useParams();
  const { profileData, isLoading } = useFetchUserProfile(id);
  const { updateUserProfile } = useFetchUpdateUserProfile();
  const [profileDataForm, setProfileDataForm] = useState(null);
  const [allowSave, setAllowSave] = useState(false);

  useEffect(() => {
    if (profileData) {
      setProfileDataForm((prevForm) => ({
        ...prevForm,
        ...profileData,
        password: "",
        newPassword: "",
      }));
    }
  }, [profileData]);

  const handleFormData = (e) => {
    const { name, value } = e.target;

    // Determine the new value, considering special cases like "isFullTime"
    const newValue = name === "isFullTime" ? value === "full" : value;

    // Update the form state with the new value
    setProfileDataForm((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    setAllowSave(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(id, profileDataForm);
      toast.success("Successfully updated profile", {
        toastId: "profile-update-success",
      });
    } catch (err) {
      toast.error("Failed to submit profile changes", {
        toastId: "profile-update-fail",
      });
    }
  };

  if (!profileData || !profileDataForm) {
    return <Loader loading={isLoading} />;
  }

  return (
    <div className="register-page container box">
      <h1 className="title is-1">Update Profile</h1>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input
                className={`input`}
                type="text"
                placeholder="John"
                value={profileDataForm.firstName}
                name="firstName"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input
                className={`input`}
                type="text"
                placeholder="Doe"
                value={profileDataForm.lastName}
                name="lastName"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className={`input`}
                type="text"
                placeholder="johnDoe01"
                value={profileDataForm.username}
                name="username"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-right">
              <input
                className={`input`}
                type="email"
                placeholder="john_doe@email.com"
                value={profileDataForm.email}
                name="email"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Current Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                value={profileDataForm.password}
                minLength="5"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={profileDataForm.newPassword}
                minLength="5"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Tenure</label>
            <div className="control">
              <input
                className={`input`}
                type="number"
                placeholder="10"
                value={profileDataForm.tenure}
                name="tenure"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Ecode</label>
            <div className="control">
              <input
                className={`input`}
                type="text"
                placeholder="E010J"
                minLength={5}
                maxLength={5}
                value={profileDataForm.eCode}
                name="eCode"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Job Title</label>
            <div className="control">
              <div className="select">
                <select
                  name="jobTitle"
                  value={profileDataForm.jobTitle}
                  onChange={handleFormData}
                >
                  <option value="">Select dropdown</option>
                  <option value="sales">Sales</option>
                  <option value="software">Software</option>
                  <option value="management">Management</option>
                  <option value="operations">Operations</option>
                  <option value="administration">Administration</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Employee Time</label>
            <div className="control">
              <div className="select">
                <select
                  name="isFullTime"
                  onChange={handleFormData}
                  value={profileDataForm.isFullTime ? "full" : "part"}
                >
                  <option value="full">Full Time</option>
                  <option value="part">Part Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                type="submit"
                disabled={!allowSave}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}{" "}
    </div>
  );
};

export default ProfilePage;
