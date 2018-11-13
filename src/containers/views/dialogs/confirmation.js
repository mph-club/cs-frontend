/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

class ConfirmationDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
      message:props.message
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleOk = () => {
    this.props.onOk(this.props.value);
  };
  
  handleCancel = () => {
    this.props.onCancel(this.props.value);
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        {...other}
      > 
        <DialogContent>
          {this.state.message}{this.state.get_value}
            {this.props.get_value ?
            <TextField
                    id="filled-multiline-static"
                    label={(this.props.value_field_name !== undefined ? this.props.value_field_name : 'Reason')}
                    multiline
                    rows="10"
                    defaultValue=""
                    fullWidth
                    margin="normal"
                    variant="outlined"
            />
            :''}
        </DialogContent>
        <DialogActions>
            {this.props.is_ok ?
            <Button onClick={this.handleOk} color="primary">
                {this.props.ok_label}
            </Button>
            : ''}
            {this.props.is_cancel ?
            <Button onClick={this.handleCancel} color="primary">
                {this.props.cancel_label}
            </Button>
            : ''}
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: '#fafafa4f',
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
});

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);
