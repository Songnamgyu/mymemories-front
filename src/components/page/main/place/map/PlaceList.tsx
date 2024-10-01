import { places } from "../../../../../mock/index";
const PlaceList = () => {
    return (
        <div className="placeListContainer">
            {places.map((data: any) => {
                return <h1 className="placeListText">{data.name}</h1>;
            })}
        </div>
    );
};
export default PlaceList;
