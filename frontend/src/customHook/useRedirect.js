import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authService";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirect = (path) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const redirect = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))
            if (!isLoggedIn) {
                toast.info('Session expired, please login again')
                navigate(path)
                return
            }

        }
        redirect()
    }, [navigate, path, dispatch])


}
export default useRedirect;