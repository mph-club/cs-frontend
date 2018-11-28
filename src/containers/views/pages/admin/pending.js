import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import {connect} from "react-redux";
import {compose} from 'redux'
import { Nstyles, NTitle }   from './Styles/PendingStyle';

let id = 0;
function createData(src, name, desc) {
  id += 1;
  return { id, src, name, desc };
}

const rows = [
  createData('one.jpg', 'Farari', 'when the first Ferrari-badged car was completed.'),
  createData('two.jpg', 'Maruti', 'Maruti Suzuki India Limited, formerly known as Maruti Udyog Limited'),
  createData('three.jpeg', 'Mercedes', 'Mercedes-Benz (German: [mɛʁˈtseːdəsˌbɛnts]) is a global automobile marque and a division of the German company Daimler AG'),
  createData('four.jpeg', 'Toyota', 'Toyota Motor Corporation (Japanese: トヨタ自動車株式会社 Hepburn: Toyota Jidōsha KK, IPA: [toꜜjota], English: /tɔɪˈoʊtə/), usually shortened to Toyota, is a Japanese multinational automotive manufacturer headquartered in Toyota, Aichi, Japan.'),
  createData('five.jpeg', 'Hundai', 'Hyundai Group[1] (Hangul: 현대그룹; Hanja: 現代그룹, pronounced [çjəːndɛ]) is a conglomerate headquartered in Seoul, South Korea.')
];

class Pending extends Component {

   /*
   * Redirect to Pending Vehicle Detail page
   */  

  __vehicledetail__(row) {
    this.props.history.push("/admin/vehicledetail/" + row)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NTitle> Pending Vehicles</NTitle>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            {/* 
            <TableHead>
              <TableRow>
                <TableCell>Vehicles</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
           */}
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell padding="none">
                      <Avatar alt="Remy Sharp" src={`../images/${row.src}`} className={classes.avatar} />
                    </TableCell>
                    <TableCell>
                      <Typography component="h2" variant="h1">
                        {row.name}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {row.desc}</Typography>
                    </TableCell>
                    <TableCell>
                      <ArrowRightAlt className={classes.ArrowRightAlt} onClick={this.__vehicledetail__.bind(this, row.id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Pending.propTypes = {
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
                  )(Pending);