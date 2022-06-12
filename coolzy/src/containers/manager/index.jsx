import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ManagerTabs from "../../components/managerTabs";
import { currentUser } from "../../redux/selectors";
import { accountSlice } from "../../redux/slices/accountSlices";
import { Helmet } from 'react-helmet';


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
        <>
        <Helmet>
            <title>
                Manager
            </title>
            
        </Helmet>
        <Stack>
            <Button onClick={logoutHandle} sx={{
                alignSelf:'flex-end',
                pl:2,
                pr:2,
                m:2,
                backgroundColor:'black',
                color: 'white'
                }}>Logout</Button>
            <ManagerTabs role={_currentUser.role} />
        </Stack>
        </>
    )
}

export default MainManager;