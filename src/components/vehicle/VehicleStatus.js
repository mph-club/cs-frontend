import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class VehicleStatus extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    change: PropTypes.func.isRequired
  };

  render() {
    const { value, index, change } = this.props;
    
    const statusList = ["PENDING", "APPROVE", "DENY", "BLOCK"];
    
    return (
      <FormControl>
        <Select
          value={value}
          onChange={event => change(event.target.value, index)}
          style={{ fontSize: "inherit" }}
        >
          {statusList.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default VehicleStatus;