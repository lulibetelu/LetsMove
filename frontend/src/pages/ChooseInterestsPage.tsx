import {useNavigate} from "react-router-dom";

export default function ChooseInterestsPage(){
    const navigate = useNavigate()
    navigate("/homePage")
    return <h1>Select your favorite sports</h1>;
}