import {navigate} from "../App";

export default function Header() {
    return (
        <div className="center">
            <h1>
                <a href="#">
                    <div>
                        <img
                            className="billedestyle"
                            src="logo.png"
                            alt="logo"
                            onClick={(event) => navigate(event, "home")}
                        />
                    </div>
                </a>
            </h1>
        </div>
    );
}

