import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Box, Button } from "@material-ui/core";

import TodoItem from "./TodoItem";
import AddItem from "./AddItem";

const useStyles = makeStyles((theme) => ({
  textTop: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "15px",
  },
  btnAdd: {
    width: "5%",
    background: "#55efc4",
    textAlign: "center",
    color: "white",
    marginLeft: "978px",
    marginBottom: "10px",
    "&:hover": {
      background: "#55efc4!important",
    },
  },
  textField: {
    width: "67ch",
    marginBottom: theme.spacing(3),
    margin: "auto",
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, 0.23);",
    width: "67ch",
    margin: "auto",
    padding: "5px",
    marginBottom: theme.spacing(1),
  },
  todoText: {
    marginLeft: "13ch",
  },
  button: {
    marginLeft: "13ch",
  },
  btnDetail: {
    background: "#00cec9",
    "&:hover": {
      background: "#00cec9!important",
    },
    padding: "8px 15px 8px 15px",
    color: "#ffffff",
    marginRight: "5px",
  },
  btnRemove: {
    padding: "8px 15px 8px 15px",
    color: "#ffffff",
    background: "#d63031",
    "&:hover": {
      background: "#d63031!important",
    },
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleCLickOpen = () => {
    setOpen(true);
  };

  const handleCLickClose = () => {
    setOpen(false);
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      <Box className={classes.textTop}>To Do List</Box>
      <Button onClick={handleCLickOpen} className={classes.btnAdd}>
        Add
      </Button>

      <TextField
        className={classes.textField}
        label="search"
        variant="outlined"
      />

      <TodoItem classes={classes} />
      <AddItem open={open} handleCLickClose={handleCLickClose} />
    </Box>
  );
};

export default TodoList;
