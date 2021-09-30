import React, { useState } from "react";
import { Checkbox, Button, Typography, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { removeTodos } from "../redux/reducer";
import Detail from "./Detail";

const TodoItem = (props) => {
  const { classes, todos, removeTodos } = props;
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {todos.map((item) => {
        return (
          <Box key={item.id} className={classes.todoItem}>
            <Checkbox />
            <Typography className={classes.todoText}>{item.item}</Typography>
            <Box className={classes.button}>
              <Button onClick={handleOpenDialog} className={classes.btnDetail}>
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

      <Detail open={open} handleCloseDialog={handleCloseDialog} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
