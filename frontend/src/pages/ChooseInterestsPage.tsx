import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {sport} from "../types/sportType.ts";
import {findAllSports} from "../api/sport.ts";
import SportLabel from "../components/SportLabel.tsx";

export default function ChooseInterestsPage(){
    const navigate = useNavigate()
    const [sports, setSports] = useState<sport[]>([]);

    useEffect(() => {
        async function loadSports() {
            try {
                const sportsResponse= await findAllSports();
                setSports(sportsResponse.sports);
            } catch {
                //setError(true);
            }
        }
        loadSports();
    },[]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">

            <div className="card w-[600px] bg-base-100 shadow-xl p-6 flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-center">
                    Elija sus deportes favoritos
                </h2>

                <h3 className="text-2m text-center">
                    Clickee hasta encontrar su nivel
                </h3>

                <div className="grid grid-cols-3 gap-3">
                    {sports.map(sport => (
                        <SportLabel key={sport.id} sportName={sport.name}/>

                    ))}
                </div>

                <button className="btn btn-primary">
                    Continue
                </button>

            </div>
        </div>
    );
}