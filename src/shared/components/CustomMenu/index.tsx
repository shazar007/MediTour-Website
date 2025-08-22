import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import commonstyle from "shared/utils/common.module.css";

interface Props {
  open?: any;
  setOpen?: any;
  menuItems?: any;
  onClickItem?: any;
}

export default function CustomMenu(props: Partial<Props>) {
  const { open, setOpen, menuItems, onClickItem } = props;
  //   const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  //  Need to set profile Image for all doctors

  const handleToggle = () => {
    setOpen((prevOpen: any) => !prevOpen);
  };
  const navigate = useNavigate(); // Declare once

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {/* <h1>Hello</h1> */}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          sx={{
            "& .MuiPaper-root": {
              width: "200px",
              borderRadius: "8px",
              color: "#00276d",
              position: "absolute",
              inset: "0px auto auto -145px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              top: "15px",
              left: "15px",
            },
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    // onKeyDown={handleListKeyDown}
                  >
                    {menuItems.map((i: any, index: number) => (
                      <MenuItem onClick={() => onClickItem(i)}>
                        <div className={commonstyle.flx}>
                          {/* <MdLogout
                            style={{
                              width: "20px",
                              height: "20px",
                              marginRight: "16px",
                            }}
                          /> */}
                          <p className={commonstyle.fs18}>{i}</p>
                        </div>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
