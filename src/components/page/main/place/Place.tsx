import { Wrapper } from "@googlemaps/react-wrapper";
import CommonHeader from "../../../common/CommonHeader";
import { useEffect, useState } from "react";

const Place = () => {
    return (
        <CommonHeader>
            <Wrapper apiKey="AIzaSyC_ujptgHlz-dLnyxXR8kYOpheBz42cbwo">
                <div>Place</div>
            </Wrapper>
        </CommonHeader>
    );
};
export default Place;
