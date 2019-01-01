import React from "react";
import Dialog from "@material-ui/core/Dialog";

const Maintenance = () => {
  return (
    <Dialog
      open
      classes={{ root: "maintenanceDialog", paperRoot: "maintenancePaper" }}
    >
      <div className="maintenanceContent">
        系統維護中
        <br />
        System under maintenance.
      </div>
    </Dialog>
  );
};

export default Maintenance;
