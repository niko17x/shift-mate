const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("user");

  if (!isAuth) {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">You do not have access.</p>
          <p className="subtitle">Please login or register first.</p>
        </div>
      </section>
    );
  }

  return children;
};

export default ProtectedRoute;
