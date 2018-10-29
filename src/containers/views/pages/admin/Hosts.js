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
            page: 1,
            item_per_page: 10,
            offset:0,
            table_data:[],
            count:0
        }        
    }
    
    componentDidMount() {
        this.getData();
    }
    
    getData = () => {
        var params = {offset:this.state.offset,limit:this.state.item_per_page};
        this.getGuestDataAPI(params).then(response => {
            debugger;
            if(response.recordsTotal > 0){
                var result = [];
                for(var i=0;i< response.data.length;i++){
                    var arr = [];
                    for (var key in response.data[i]) {
                      arr.push(response.data[i][key]);
                    }
                    result.push(arr);
                }
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
                resolve([]);
            });
   
        });
        
    }
    
    changePage = (nextPage) => {
        this.setState({
            page: nextPage,
            offset: (nextPage * this.state.item_per_page) + 1
        });   
        this.getData();  
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
             <Avatar alt="Remy Sharp" src={`../images/${value}`} className={classes.avatar} />
            );
          }
        }
      },
      {
        name: "Username",
        options: {
          filter: false
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
      selectableRows: false,
      count:this.state.count,
      serverSide: true,
      page: this.state.page,
      onTableChange: (action, tableState) => {
        switch (action) {
          case 'changePage':
            this.changePage(tableState.page);
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