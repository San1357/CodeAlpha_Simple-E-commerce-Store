const Loader = ({ fullpage = false }) => {
  if (fullpage) {
    return (
      <div className="loader-fullpage">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
