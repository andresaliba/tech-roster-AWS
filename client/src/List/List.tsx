import React from 'react';
import { Link } from "react-router-dom";
import './List.scss';

import {ComponentProps, Technology} from "./../Tools/data.model";

const List = ( { technologies }:ComponentProps ) => {

    // ---------------------------------- render to the DOM
    return(
        <div className="content">
            <div className="content__section">
                <div className="content__caption">Click the technology name below to find out what courses require it:</div>

                {/* <div> below to be rendered For each technology */}
                {technologies.map((data:Technology, n:number) => 
                    <div key={n} className="content__list">
                        <Link to={`/tech/${data._id}`}>{data.name}</Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default List;