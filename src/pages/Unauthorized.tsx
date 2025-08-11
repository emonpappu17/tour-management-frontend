import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div>
            <h1>You are not authorized for this page</h1>
            <Link to={'/'}>Home</Link>
        </div>
    );
};

export default Unauthorized;