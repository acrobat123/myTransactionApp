import { useNavigate, useLocation } from 'react-router-dom';

// Create a wrapper for the class component to pass location and navigate
const withRouter = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();
    const location = useLocation();

    return <Component {...props} navigate={navigate} location={location} />;
  }

  return Wrapper;
};


export default withRouter