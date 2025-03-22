import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const MyBusiness = () =>{
    const {isAuthenticated} = useSelector(state => state.auth);
    const navigate = useNavigate();

    return( <>
    {isAuthenticated?(
                <div>
                    <h3>Jobs</h3>
                    <p>Tab content for Jobs</p>
                </div>
    ):(
        <div className="d-flex flex-column justify-content-center align-items-center p-5" >
      <p className="text-center mb-4">To start or see your business, please log in or sign up.</p>
      <Button
        style={{ all: 'unset' }}
        onClick={() => navigate('/login')}
        className="btn btn-primary p-3"
      >
        <strong>Login or Sign Up</strong>
      </Button>
    </div>
    )}
    </>)


}


export default MyBusiness;