import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { removeUser } from "../store";


const useTokenValidation = ( error, setIsloggedIn, setErrorModalOpen ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error && (error.status === 403 || error.status === 401)) {
            dispatch(removeUser());
            localStorage.removeItem("token");
            setErrorModalOpen(true);
            setTimeout(() => {
                setIsloggedIn(false);
                navigate("/");
            }, 3000);
        }
    }, [ error, dispatch, navigate, setErrorModalOpen, setIsloggedIn ]);
}

export default useTokenValidation;