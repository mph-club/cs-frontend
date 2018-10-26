import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components'
import {connect} from "react-redux";
import {compose} from 'redux'
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MUIDataTable from "mui-datatables";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Cities from './city';
import { Nstyles, NTitle }   from './Styles/PendingStyle';

class Welcome extends React.Component {
  render() {
        const { classes } = this.props;
    const columns = [
    {
        name: "Image",
        options: {
          filter: false,
          sort:false,
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(value);
            return (
             <Avatar alt="Remy Sharp" src={`../images/${value}`} className={classes.avatar} />
            );
          }
        }
      },
      {
        name: "Name",
        options: {
          filter: false
        }
      },
      {
        name: "Brands",
        options: {
          filter: true
        }
      },
      {
        name: "Location",
        options: {
          filter: true,
          sort:false,
          customBodyRender: (value, tableMeta, updateValue) => {
            console.log(value);
            return (
              <Cities
                value={value}
                index={tableMeta.columnIndex}
                change={event => updateValue(event)}
              />
            );
          }
        }
      },
     
      {
        name: "Price",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          }
        }
      },
      {
        name: "Active",
        options: {
          filter: true,
          sort:false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? "Approved" : "Pending"}
                value={value ? "Approved" : "Pending"}
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    value={value ? "Approved" : "Pending"}
                  />
                }
                onChange={event => {
                  updateValue(event.target.value === "Approved" ? false : true);
                }}
              />
            );
          }
        }
      }
    ];

    const data = [
      ["one.jpg","Robin Duncan", "Farari", "Los Angeles",  77000, false],
      ["two.jpg","Mel Brooks", "Toyota", "Oklahoma City",  135000, true],
      ["three.jpeg","Harper White", "Maruti", "Pittsburgh",  420000, false],
      ["four.jpeg","Kris Humphrey", "Hundai", "Laredo",  150000, true],
      ["five.jpeg","Frankie Long", "Land Rover", "Austin",  170000, false],
      ["one.jpg","Brynn Robbins", "Porsche", "Norfolk",  90000, true],
      ["two.jpg","Justice Mann", "Rolls-Royce", "Chicago",  133000, false],
      [
        "three.jpeg",
        "Addison Navarro",
        "Mercedes",
        "New York",
        295000,
        true
      ],
      ["four.jpeg","Jesse Welch", "Bentley", "Seattle",  200000, false],
      ["five.jpeg","Eli Mejia", "Aston", "Long Beach", 400000, true],
      ["one.jpg","Gene Leblanc", "Bentley Mulsanne", "Hartford",  110000, false],
      ["two.jpg","Danny Leon", "BMW", "Newark", 220000, true],
      ["three.jpeg","Lane Lee", "Honda", "Cincinnati",  180000, false],
      ["four.jpeg","Jesse Hall", "Ford", "Baltimore", 99000, true],
      ["five.jpeg","Danni Hudson", "Audi", "Tampa",  90000, false],
      ["one.jpg","Terry Macdonald", "Nissan", "Miami",  140000, true],
      ["two.jpg","Justice Mccarthy", "Volkswagen", "Tucson",  330000, false],
      ["three.jpeg","Silver Carey", "Porsche", "Memphis",  250000, true],
      ["four.jpeg","Franky Miles", "Land Rover", "Buffalo",  190000, false],
      ["five.jpeg","Glen Nixon", "Harley Davidson", "Arlington",  80000, true],
      [
       "two.jpg",
        "Gabby Strickland",
        "Mini",
        "Scottsdale",
        45000,
        false
      ],
      ["four.jpeg","Mason Ray", "Ferrari", "San Francisco", 142000, true]
    ];

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false 
    };

    return (
      <MUIDataTable
        title={"Vehicals list"}
        data={data}
        columns={columns}
        options={options}   
      />
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
      SessionReducer: state.SessionReducer
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        RunRedux: (data) => {
            dispatch(data);
        },
    };
};

export default compose(
                  withStyles(Nstyles), 
                  connect(mapStateToProps, mapDispatchToProps)
                  )(Welcome);