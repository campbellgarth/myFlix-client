//start parcel with parcel src/index.html

import { createRoot } from 'react-dom/client';

//import statement to show that you need to bundle './index.scss'
import "./index.scss";

import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

//main component
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};
//finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);

//tells react to render app in the root DOM element
root.render(<MyFlixApplication />);