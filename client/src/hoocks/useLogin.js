import {useContext} from "react";
import {BoardContext} from "../components/contextProvider";
import {check, login, logout} from "../api/userAPI";
import {useSource} from "./useSource";

export function useLogin() {
    const {isLogin, setIsLogin, setIsLocal} = useContext(BoardContext);
    const {setSource} = useSource();

    const handleLogin = (pass) => {
        try {
            login(pass).then(data => {
                setIsLogin(true);
            }).catch(e => {
                alert(e.response.data.message)
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const handleLogout = () => {
        try {
            logout().then(data => {
                setIsLogin(false);
                setSource(true);
            }).catch(e => {
                alert(e.response.data.message)
            });
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const handleCheck = () => {
        try {
            check().then(data => {
                setIsLogin(true);
            }).catch(e => {
                console.log(e.response.data.message)
            });

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return {isLogin, handleLogin, handleLogout, handleCheck}
}