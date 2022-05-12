import { Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar, Product } from "../../components";
import ManagerTabs from "../../components/managerTabs";
import { currentUser } from "../../redux/selectors";
import { accountSlice } from "../../redux/slices/accountSlices";
import Order from "../order";
import Staff from "../staff";

const MainManager = () => {
    const _currentUser = useSelector(currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandle = () => {
        // accountToggleHandle()
        localStorage.setItem('logged', false)
        dispatch(accountSlice.actions.update(''))
        navigate('/login')
    }
    return (
        <Stack>
            <Button onClick={logoutHandle}>Logout</Button>
            <ManagerTabs role={_currentUser.role} />
        </Stack>
    )
}

export default MainManager;