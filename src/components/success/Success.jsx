import { useEffect } from "react"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Success() {
    const user = useSelector((store) => store.user);
    const location = useLocation();
    const sessionID = new URLSearchParams(location.search).get('session_id');
    const history = useHistory();
    console.log(sessionID);
    useEffect (() => {
        axios({
            method: 'POST',
            url: '/api/payments/verify',
            data: {sessionID: sessionID, user: user},
          })
          .then((response) => {
            history.push('/download');
          })
          .catch(err => console.error('Failed to verify payment', err))
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Success