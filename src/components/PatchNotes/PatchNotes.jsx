import { useEffect, useState } from "react";
import axios from "axios";

function PatchNotes() {
    const [patches, setPatches] = useState([]);
    useEffect(()=> {
        axios({
            method: 'GET',
            url: '/api/patch'
        }).then(response => setPatches(response.data))
        .catch(err => console.error("Failed to collect patch notes: ", err))
    }, [])

    console.log(patches);

    return(
        <div>
            {patches.map(patch => <p><strong>{patch.number}:</strong> {patch.notes}</p>)}
        </div>
    )
}

export default PatchNotes;