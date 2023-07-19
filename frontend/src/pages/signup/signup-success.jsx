import success from './images/check.png'
import {Link} from 'react-router-dom'
import './__test__/success-failure.css'
function SignupSuccess(){
    return(
        <div className="container-lg">
            <div className="message-div">
                <img src={success} alt="check icon png" style={{width:"70px", aspectRatio:"1/1", marginBottom: "1rem"}}/>
                <h2 className='heading'>Registration Successfull!!</h2>
                <p>Go back to <Link to={`/auth/login`}>Login</Link></p>
            </div>
        </div>
    )
}
export default SignupSuccess