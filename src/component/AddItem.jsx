import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginBottom: theme.spacing(3),
    margin: "auto",
  },
  description: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  textFieldDes: {
    width: "100%",
    height: "20ch",
  },
  layerMidle: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    justifyItems: "center",
  },
  textDueDate: {
    paddingTop: theme.spacing(1),
    fontSize: "14px",
    fontWeight: 700,
  },
  textPriority: {
    paddingTop: theme.spacing(1),
    fontSize: "14px",
    fontWeight: 700,
  },
  textLayer: {
    display: "flex",
    flexDirection: "column",
  },
  inputLayer: {
    display: "flex",
    flexDirection: "column",
  },
  datepicker: {
    marginRight: "10px",
  },
  formControlLayer: {
    width: "32ch",
    marginTop: "7px",
  },
  DialogActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center!important",
  },
}));

function AddItem(props) {
  const { open, handleCLickClose, addTodos } = props;
  const classes = useStyles();
  const [addValue, setAddValue] = useState("");
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(20);

  console.log("props", props);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleChangeAddValue = (e) => {
    setAddValue(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleSubmit = () => {
    if (addValue) {
      handleCLickClose();
      setAddValue("");
      setDate(Date.now());
      setDescription("");

      return addTodos({
        id: Math.floor(Math.random() * 1000),
        item: addValue,
        description: description,
        date: date,
        priority: priority,
        completed: false,
      });
    } else {
      alert("Vui long nhap thong tin");
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        onClose={handleCLickClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCLickClose}>
          New Task
        </DialogTitle>
        <DialogContent>
          <TextField
            className={classes.textField}
            label="Add New Task"
            variant="outlined"
            value={addValue}
            onChange={(e) => handleChangeAddValue(e)}
          />
          <Typography className={classes.description}>Description</Typography>
          <textarea
            onChange={(e) => handleChangeDescription(e)}
            value={description}
            className={classes.textFieldDes}
          ></textarea>
          <Box className={classes.layerMidle}>
            <Box className={classes.textLayer}>
              <Typography className={classes.textDueDate}>Due Date</Typography>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                inputVariant="outlined"
                className={classes.datepicker}
                format="MM/dd/yyyy"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Box>
            <Box className={classes.inputLayer}>
              <Typography className={classes.textPriority}>Priority</Typography>
              <FormControl
                variant="outlined"
                className={classes.formControlLayer}
              >
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={priority}
                  onChange={handleChangePriority}
                  autoWidth
                  defaultValue={priority}
                >
                  <MenuItem value={10}>Low</MenuItem>
                  <MenuItem value={20}>Normal</MenuItem>
                  <MenuItem value={30}>High</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={classes.DialogActions}>
          <Button
            fullwidth="true"
            autoFocus
            type="submit"
            //   onClick={handleCLickClose}
            onClick={handleSubmit}
            style={{
              background: "#00cec9",
              marginBottom: "16px",
              width: "100%",
              color: "#ffffff",
              "&:hover": {
                background: "#00cec9!important",
              },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodos: (obj) => dispatch(addTodos(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
