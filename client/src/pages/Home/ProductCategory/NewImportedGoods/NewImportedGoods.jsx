import NewImportedLaptop from "./NewImportedLaptop/NewImportedLaptop";
import NewImportedMouse from "./NewImportedMouse/NewImportedMouse";
import NewImportedGamingGear from "./NewImportedGamingGear/NewImportedGamingGear";
import NewImportedComponents from "./NewImportedComponents/NewImportedComponents";
import NewImportedAccessories from "./NewImportedAccessories/NewImportedAccessories";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
const NewImportedGoods =() => {
  return (
    <div>
      <NewImportedLaptop/>
      <NewImportedMouse />
      {/* <NewImportedGamingGear/>
      <NewImportedComponents/>
      <NewImportedAccessories/> */}
    </div>
  );
}
export default  NewImportedGoods;