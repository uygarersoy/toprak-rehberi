import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldForm from "../components/FieldForm";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, useFetchFieldsQuery } from "../store";
import FieldItem from "../components/FieldItem";

function DashBoard({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [visibleForm, setVisibleForm] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    //const {data, isLoading, error } = useSelector((state) => state.fields);
    const { data, isFetching, isLoading, error } = useFetchFieldsQuery(user.data);

    /*useEffect(() => {
        dispatch(fetchFields(user.data));
    },[dispatch])*/
    
    const handleLogOut = () => {
        setIsLoggedIn(!isLoggedIn);
        dispatch(removeUser());
        //dispatch(resetFields());
        navigate("/");
    };  
    
    const handleFieldCreation = () => {
        setVisibleForm(true);
    }
    let content;
    if (isFetching || isLoading) {
        content = <div>Loading the list of fields.</div>;
    }
    else if (error) {
        content = <div>An error occurred trying to fetch the fields.</div>;
    }
    else if (!data) {
        content = <div>Empty data.</div>;
    }
    else {
        content = data.map((field) => {
            return <FieldItem field={field}/>;
        });
    }
    return (
        <div>
            <div className="dashboard">
                <h1 className="dashboard-title">FIELDS</h1>
                <button onClick={handleFieldCreation}>+ Add New Field</button>
            </div>
            {visibleForm && <FieldForm setVisibleForm={setVisibleForm}/>}
            {content}
            <div>
                <button onClick={handleLogOut}>Log out</button>
            </div>
        </div>
    );
}

export default DashBoard;

/*
<div>
                <h1>FIELDS</h1>
            </div>
            <div>
                <button onClick={handleFieldCreation}>+ Add New Field</button>
            </div>
                {visibleForm && <FieldForm setVisibleForm={setVisibleForm}/>}
                {content}
            </div>
            <button onClick={handleLogOut}>Log out</button>
        </div>
*/