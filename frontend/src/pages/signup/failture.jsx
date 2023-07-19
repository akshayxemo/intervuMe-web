import wrong from './images/cross.png'
import {Link} from 'react-router-dom'
import './__test__/success-failure.css'
import PropTypes from 'prop-types'

Failure.propTypes = {
    title: PropTypes.node.isRequired,
    message: PropTypes.node.isRequired,
    path: PropTypes.node.isRequired
}
function Failure(props){
    return(
        <div className="container-lg">
            <div className="message-div">
                <img src={wrong} alt="check icon png" style={{width:"70px", aspectRatio:"1/1", marginBottom: "1rem"}}/>
                <h2 className='heading'>{props.title}</h2>
                <p style={{marginBottom:"1rem"}}>{props.message}</p>
                <Link to={props.path}> {"<"} Go back</Link>
            </div>
        </div>
    )
}
export default Failure