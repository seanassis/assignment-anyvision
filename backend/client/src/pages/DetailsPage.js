
import React, { useState } from "react";
import logoImg from "../assets/itunes-logo.png";
import DetailsCard from "../components/DetailsCard";
import { Card , Logo} from "../components/AuthForm";

const DetailsPage = props => {
    //TODO: get the item by context
    const { searchDetails } = useState({});


    return (
      <Card>
        <Logo src={logoImg} />
        <DetailsCard data={searchDetails}/>
      </Card>
    );
}

export default DetailsPage;