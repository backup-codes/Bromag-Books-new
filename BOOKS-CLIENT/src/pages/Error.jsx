import Wrapper from '../assets/wrappers/ErrorPage'
import { Link, useRouteError } from 'react-router-dom'
//image imports
import img from '../assets/images/page-not-found.svg'
import { serverError } from '../assets/images'
import ComingSoon from './ComingSoon'
import ComingSoonDashboard from './ComingSoonDashboard'


const Error = () => {

    const error = useRouteError()

    if (error.status == 404) {
        return (
            <ComingSoonDashboard />
        )
    }

    if (error.status == 500) {
        return (
            <Wrapper>
                <div>
                    <img src={serverError} alt="internal server error" />
                    <h3>500! Internal Server Error</h3>
                    <p>Please try again later or feel free to contact as if the problem persists</p>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div>
                <h3>Something Went Wrong</h3>
            </div>
        </Wrapper>
    )
}
export default Error