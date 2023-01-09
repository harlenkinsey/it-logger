import React, { useEffect } from 'react';
import M from 'materialize-css';

export const ActionButton = () => {
    
    useEffect(() => {

        var options = {hoverEnabled: false};
        var elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, options);
        
      }, [])

    return(
        <div class="fixed-action-btn floating-btn">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">add</i>
            </a>
            <ul>
                <li><a class="btn-floating blue"><i class="material-icons">assignment_ind</i></a></li>
                <li><a class="btn-floating green darken-1"><i class="material-icons">assignment</i></a></li>
            </ul>
        </div>
    )
}
