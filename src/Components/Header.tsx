import {navigate} from "../App";

export default function Header() {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <h1>
                <div>

                <img className={"billedestyle"}
                     src={"logo.png"}
                     alt={"logo"}
                     onClick={(event) => navigate(event, "home")}
            />
                </div>
            </h1>
        </div>
    )
}
