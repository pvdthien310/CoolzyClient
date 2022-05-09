import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Product } from "../../components";
import ManagerTabs from "../../components/managerTabs";
import { currentUser } from "../../redux/selectors";
import Order from "../order";
import Staff from "../staff";

const MainManager = () => {
    const _currentUser = useSelector(currentUser)
    console.log(_currentUser)
    return (
        <Stack>
            <ManagerTabs role={_currentUser.role} />
            {/* {
                _currentUser.role == 'Admin' ?
                <Routes>
                    <Route path="/" element={
                        <Product />
                    } />

                    <Route path="/staff" element={
                        <Staff />
                    } />

                    <Route path="/order" element={
                        <Order />
                    } />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={
                        <Order />
                    } />
                </Routes>
            } */}
        </Stack>


    )
}

export default MainManager;