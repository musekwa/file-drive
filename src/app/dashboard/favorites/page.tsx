"use client"
import React from "react";
import FileBrowser from "../_components/file-browser";
import { useQuery } from "convex/react";

const FavoritesPage = () => {

  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly />
    </div>
  );
};

export default FavoritesPage;
