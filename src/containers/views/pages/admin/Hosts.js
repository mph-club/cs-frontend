import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux'
import MUIDataTable from "mui-datatables";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Nstyles }   from './Styles/HostsStyle';
import axios from 'axios';
import Server from '../../../../config/server.js'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class Guests extends React.Component {
    
    constructor(props){
        super(props);        
        this.state = {
            page: 0,
            item_per_page: 10,
            offset:0,
            sort_by:'user_name',
            sort_order:'desc',
            table_data:[],
            count:0,
        }        
        this.getData = this.getData.bind(this);
        this.sortRow = this.sortRow.bind(this);
    
        this.getData();
    }
    
    getData = () => {
        var params ={
                      offset:this.state.offset,
                      limit:this.state.item_per_page,
                      sort_by:this.state.sort_by,
                      sort_order:this.state.sort_order
                    };
        this.getGuestDataAPI(params).then(response => {
                var result = [];
                for(var i=0;i< response.data.length;i++){
                    var arr = [];
                    for (var key in response.data[i]) {
                      arr.push(response.data[i][key]);
                    }
                    result.push(arr);
                }
            this.setState({
                table_data:result,
                count:response.recordsTotal
            });
        });
        
    }
    
    getGuestDataAPI = (params) => {
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.APICI + 'api/v1/users/getHostsList?limit='+params.limit+'&offset='+params.offset,{}).then(function (response) {
                setTimeout(() => {
                    resolve(response.data);
                }, 250);
            }).catch((error) => {
                resolve([{data:[],recordsTotal:0}]);
            });
   
        });
        
    }
    
    changePage = (request) => {
        this.setState({
            page:request.page,
            offset:(request.page * this.state.item_per_page),
            item_per_page:request.rowsPerPage
        },() => { this.getData();});
    };
    
    changeRowPage = (request) => {
        this.setState({
            page: 0,
            offset:(0 * this.state.item_per_page),
            item_per_page:request.rowsPerPage
        },() => {this.getData();});
    };
    
    sortRow = (request) => {
        this.setState({
            page: 0,
            offset:(0 * this.state.item_per_page),
            item_per_page:request.rowsPerPage,
            sort_by:request.columns[request.activeColumn].name,
            sort_order:request.columns[request.activeColumn].sortDirection
        },() => {
            this.getData();      
        });   
    };
    
    
    
  render() {
    const { classes } = this.props;
    const columns = [
    {
        name: "Picture",
        options: {
          filter: false,
          sort:false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
             <Avatar alt="Remy Sharp" src={`../images/users/${value}`} className={classes.avatar} />
            );
          }
        }
      },
      {
        name: "Username",
        options: {
          filter: false,
          sort:true
        }
      },
      {
        name: "Phone Number",
        options: {
          filter: true
        }
      },
      {
        name: "Email",
        options: {
          filter: true,
          sort:true,
        }
      },
     
      {
        name: "Status",
        options: {
          filter: true,
        }
      },
     
      {
        name: "License",
        options: {
          filter: true,
        }
      },
     
      {
        name: "Listed Vehicles",
        options: {
          filter: true,
        }
      },
     
      {
        name: "Pending Vehicles",
        options: {
          filter: true,
        }
      },
     
      {
        name: "Message",
        options: {
            filter: true,
            sort:false,
            customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Button variant="fab" mini color="primary" aria-label="Add" className={classes.button}>
                        <Icon>send_icon</Icon>
                    </Button>
                  );
            }
        },
            
      },
      {
        name: "View",
        options: {
            filter: true,
            sort:false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                   <Button variant="fab" mini color="secondary" aria-label="Edit" className={classes.button}>
                    <Icon>pageview_icon</Icon>
                   </Button>
                );
            }
        } 
      }
    ];
    
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      serverSide: true,
      selectableRows: false,
      count:this.state.count,
      page: this.state.page,
      rowsPerPage:this.state.item_per_page,
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'changePage':
            this.changePage(tableState);
            break;
          case 'changeRowsPerPage':
            this.changeRowPage(tableState);
            break;
          case 'sort':
            this.sortRow(tableState);
            break;
        default:
            break;
        }
      }
    };

    return (
      <MUIDataTable
        title={"Hosts list"}
        data={this.state.table_data}
        columns={columns}
        options={options}     
      />
    );
  }
}

Guests.propTypes = {
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
                  )(Guests);