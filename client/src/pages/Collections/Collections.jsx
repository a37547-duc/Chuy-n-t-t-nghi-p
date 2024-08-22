import React from "react";

import CollectionsData from "./CollectionsData/CollectionsData";
import SideBarCollections from "./SideBarCollections/SideBarCollections";

export default function Collections() {
  return (
    <div>
      <SideBarCollections></SideBarCollections>
      <CollectionsData></CollectionsData>
    </div>
  );
}
