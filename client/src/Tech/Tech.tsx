import React from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import { History } from "history";
import './Tech.scss';
import {ComponentProps, Course, Technology} from "./../Tools/data.model";

const Tech = ({ technologies }:ComponentProps) => {

    const history:History = useHistory();

    // isolate the id route parameter
    let { id } = useParams<{id:string}>();
    // console.log("Received id: " + id);

    // find the technology object with the id route parameter
    let technology:(Technology | undefined) = technologies.find(item => item._id == id);

    const populateDifficulty= () => {
        const difficultyArray = [];
        if (technology !== undefined)
        for (let i = 0; i < 5; i++) {
            if (i < technology.difficulty) difficultyArray.push(<i className="fas fa-square content__rating--filled"></i>)
            else difficultyArray.push(<i className="fas fa-square content__rating"></i>)
        }
        return difficultyArray;
    }

    const [courseName, setName] = React.useState<Technology[]>();

    // ---------------------------------- render to the DOM
    return(
        (technology !== undefined) ?
        <div className="content">
            <div className="content__name">
                <i className="fas fa-arrow-left content__button" onClick={() => history.push("/list")}></i>
                Details for {technology.name}
            </div>
            <div className="content__description">{technology.description}</div>
            
            <div className="content__difficulty">Difficulty:</div>
            
            <div className="content__difficulty">
                {populateDifficulty()}
            </div>
        
            <div className="content__description">Required in courses:</div>
            
            {/* <div> below to be rendered For each course */}
            {technology.courses.map((prop, n:number) => 
                <div key={n} className="content__course">   
                            <div key={n} className="content__name">{prop.name}</div>
                </div>
            )}

        </div>
        :
        <div className="content">
            <div className="content__name"><i className="fas fa-arrow-left content__button"></i> Error :(</div>
            <div className="content__description">The requested technology does not exist in the database</div>
        </div>

    );
}

export default Tech;