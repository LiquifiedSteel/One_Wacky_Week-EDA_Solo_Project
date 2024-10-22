import { useEffect, useState } from "react";
import axios from "axios";

// This component will only grab the patch notes from the database and then display them all

function PatchNotes() {
    const [patches, setPatches] = useState([]);
    useEffect(()=> {
        axios({
            method: 'GET',
            url: '/api/patch'
        }).then(response => setPatches(response.data))
        .catch(err => console.error("Failed to collect patch notes: ", err))
    }, [])

    return(
        <>
            <h3>PATCH NOTES</h3>
            <div className="patches">
                {patches.map(patch => <p key={patch.id}><strong>{patch.number}:</strong> {patch.notes}</p>)}
            </div>
        </>
    )
}

export default PatchNotes;