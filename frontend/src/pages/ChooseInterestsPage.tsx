import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Sport} from "../types/sportType.ts";
import {findAllSports} from "../api/sport.ts";
import SportLabel from "../components/SportLabel.tsx";
import {createPreferences} from "../api/preferences.ts";
import PopUpError from "../components/PopUpError.tsx";
import {Dumbbell} from "lucide-react";


export default function ChooseInterestsPage(){
    const navigate = useNavigate()

    const [sports, setSports] = useState<Sport[]>([]);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [error, setError] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<boolean>(false);

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

    const handleSubmit = async () => {
        const selectionsToObjects = Object.entries(selections).map(([sport, level]) => ({
            sport,
            level
        }))

        const dataRequest = {sports: selectionsToObjects}
        try {
            await createPreferences(dataRequest);
            navigate("/homepage");
        } catch {
            setSubmitError(true);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">

            <div className="w-full max-w-xl flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

                <div
                    className="relative py-10  flex flex-col items-center justify-center text-white overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)" }}
                >
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
                    <div className="absolute -bottom-12 -left-6 w-32 h-32 rounded-full bg-black/10" />

                    <div className="relative bg-white/15 backdrop-blur-sm border border-white/20 p-4 rounded-2xl mb-4 shadow-lg">
                        {/* Usá el ícono que prefieras, por ej. Dumbbell o Star de lucide-react */}
                        <Dumbbell size={28} strokeWidth={1.8} />
                    </div>

                    <h2 className="relative text-3xl font-bold tracking-tight">
                        Choose your favorite sports
                    </h2>

                    <p className="relative text-white/70 text-sm mt-1.5 font-light">
                        Click until finding your level
                    </p>

                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1e1e1e] rounded-t-[50%]" />

                </div>

                    <div className="bg-[#1e1e1e] px-8 pb-8 pt-2 flex flex-col gap-6">
                        <div>
                            {error && <PopUpError message='Failed to load sports, please try again later'/>}
                            {submitError && <PopUpError message='Failed to save preferences, please try again'/>}
                        </div>
                        <div className="flex flex-wrap gap-x-2.5 gap-y-4 justify-center">
                            {sports.map(sport => (
                                <SportLabel key={sport.id} sportName={sport.name} onChange={handleChange}/>

                            ))}
                    </div>

                        <button
                            onClick={handleSubmit}
                            className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                            disabled={Object.keys(selections).length < 2}
                        >
                            Continue
                        </button>
                </div>
            </div>
        </div>
    );
}