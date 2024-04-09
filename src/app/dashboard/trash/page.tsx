import React from "react";
import FileBrowser from "../_components/file-browser";

const TrashPage = () => {
  return (
    <div className="min-h-screen">
      <FileBrowser title="Trash" deleteOnly />
    </div>
  );
};

export default TrashPage;
