import React, { useState } from "react";
import { Checkbox, Button, Typography, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { removeTodos, completeTodos } from "../redux/reducer";
import Detail from "./Detail";

const TodoItem = (props) => {
  const { classes, todos, removeTodos, completeTodos,todo } = props;
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState();
  const [checked, setChecked] = useState(false);

  const handleChangeComplete = (item, e) => {
    console.log(item, "item");
    setChecked(e.target.checked);
    return completeTodos(item.id);
  };

  const handleOpenDialog = (row) => {
    setEditRow(() => row);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {todos.map((item) => {
        return (
          <Box
            key={item.id}
            className={
              checked === true ? classes.completeBackground : classes.todoItem
            }
          >
            <Checkbox
              checked={checked}
              onChange={(e) => handleChangeComplete(item, e)}
            />
            <Typography className={classes.todoText}>{item.item}</Typography>
            <Box className={classes.button}>
              <Button
                onClick={() => handleOpenDialog(item)}
                className={classes.btnDetail}
              >
                Detail
              </Button>
              <Button
                onClick={() => removeTodos(item.id)}
                className={classes.btnRemove}
              >
                Remove
              </Button>
            </Box>
          </Box>
        );
      })}

      <Detail
        editRow={editRow}
        open={open}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTodos: (id) => dispatch(removeTodos(id)),
    completeTodos: (id) => dispatch(completeTodos(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
