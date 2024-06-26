import React from "react";
import FileBrowser from "../_components/file-browser";

const FavoritesPage = () => {

  return (
    <div className="min-h-screen">
      <FileBrowser title="Favorites" favoritesOnly={true}  />
    </div>
  );
};

export default FavoritesPage;
