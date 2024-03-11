import "../assets/css/project-github.css";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

const ProjectGithub = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      <div className=".container-lg-no-pd">
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Please visit project
            <a
              href="https://github.com/akshayxemo/intervuMe-web"
              target="blank"
              className="git-link"
            >
              &nbsp; GitHub &nbsp;
            </a>
            and read the readme file to test the system properly.
          </Alert>
        </Collapse>
      </div>
    </>
  );
};
export default ProjectGithub;
