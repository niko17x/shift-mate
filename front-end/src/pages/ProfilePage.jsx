import { useParams } from "react-router-dom";
import useFetchUserProfile from "../hooks/auth/useFetchUserProfile";
import usePasswordValidation from "../hooks/auth/usePasswordValidation";
import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import useFetchUpdateUserProfile from "../hooks/auth/useFetchUpdateUserProfile";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { id } = useParams();
  const { validatePasswords, isPasswordsValid } = usePasswordValidation();
  const { profileData, isLoading } = useFetchUserProfile(id);
  const { updateUserProfile, updatedProfileData } = useFetchUpdateUserProfile();

  const [profileDataForm, setProfileDataForm] = useState(null);

  useEffect(() => {
    if (profileData) {
      setProfileDataForm({
        // profileImage: profileData.profileImage,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        username: profileData.username,
        email: profileData.email,
        jobTitle: profileData.jobTitle.toLowerCase(),
        eCode: profileData.eCode,
        tenure: profileData.tenure,
        isFullTime: profileData.isFullTime ? "full" : "part",
        password: "",
        confirmPassword: "",
      });
    }
  }, [profileData]);

  // console.log(profileDataForm);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setProfileDataForm((prevState) => ({
      ...prevState,
      [name]: value === "full" ? true : value === "part" ? false : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords(profileDataForm)) {
      setProfileDataForm({
        ...profileDataForm,
        password: "",
        confirmPassword: "",
      });
      return;
    }

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

  // TODO => HANDLING ERROR INPUTS IN THE BACKEND AND PREVENTING CERTAIN INPUTS FROM BEING EDITED (NON-ADMIN).

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
                value={profileDataForm ? profileDataForm.firstName : ""}
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
                value={profileDataForm ? profileDataForm.lastName : ""}
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
                value={profileDataForm ? profileDataForm.username : ""}
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
                value={profileDataForm ? profileDataForm.email : ""}
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
                value={profileDataForm ? profileDataForm.password : ""}
                minLength="5"
                onChange={handleFormData}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                // className={`input ${isPasswordsValid ? "" : "is-danger"}`}
                className="input"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={profileDataForm ? profileDataForm.confirmPassword : ""}
                minLength="5"
                onChange={handleFormData}
              />
              {/* {!isPasswordsValid && (
                <p className="help is-danger">Passwords do not match</p>
              )} */}
            </div>
          </div>

          <div className="field">
            <label className="label">Tenure</label>
            <div className="control">
              <input
                className={`input`}
                type="number"
                placeholder="10"
                value={profileDataForm ? profileDataForm.tenure : ""}
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
                value={profileDataForm ? profileDataForm.eCode : ""}
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
                  value={profileDataForm ? profileDataForm.jobTitle : ""}
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
                  value={profileDataForm ? profileDataForm.isFullTime : ""}
                >
                  <option value="full">Full Time</option>
                  <option value="part">Part Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Save
              </button>
            </div>
          </div>

          {/* {errors.find((err) => err.field === "general") && (
              <p className="help is-danger">
                {errors.find((err) => err.field === "general").message}
              </p>
            )} */}
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
