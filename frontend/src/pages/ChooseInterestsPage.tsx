import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Sport} from "../types/sportType.ts";
import {findAllSports} from "../api/sport.ts";
import SportLabel from "../components/SportLabel.tsx";
import type {CreatePreferencesDto} from "backend/src/preferences/dto/create.preferences.dto.ts";
import {createPreferences} from "../api/preferences.ts";
import PopUpError from "../components/PopUpError.tsx";

export default function ChooseInterestsPage(){
    const navigate = useNavigate()

    const [sports, setSports] = useState<Sport[]>([]);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        async function loadSports() {
            try {
                const sportsResponse= await findAllSports();
                setSports(sportsResponse.sports);
            } catch {
                setError(true);
            }
        }
        loadSports();
    },[]);

    const handleChange = (sport:string, level:string) => {
        setSelections(prev => {
            if (level === ""){

                const {[sport]: _removed, ...rest} = prev;
                return rest;
            }
            return {...prev, [sport]: level}
    });
    }

    const handleSubmit = () => {
        const selectionsToObjects = Object.entries(selections).map(([sport, level]) => ({
            sport,
            level
        }))

        const dataRequest: CreatePreferencesDto = {sports: selectionsToObjects}
        console.log(dataRequest);
        createPreferences(dataRequest);
        navigate("/posts");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <div>
                {error && <PopUpError message='Failed to load sports, please try again later'/>}
            </div>

            <div className="card w-[600px] bg-base-100 shadow-xl p-6 flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-center">
                    Elija sus deportes favoritos
                </h2>

                <h3 className="text-2m text-center">
                    Clickee hasta encontrar su nivel
                </h3>

                <div className="grid grid-cols-3 gap-3">
                    {sports.map(sport => (
                        <SportLabel key={sport.id} sportName={sport.name} onChange={handleChange}/>

                    ))}
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Continue
                </button>

            </div>
        </div>
    );
}