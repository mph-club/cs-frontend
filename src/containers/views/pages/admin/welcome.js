import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import VehicleStatus from '../../../../components/vehicle/VehicleStatus';
import { Nstyles }   from './Styles/WelcomeStyle';
import axios from 'axios';
import Server from '../../../../config/server.js'

class Welcome extends React.Component {
    
    constructor(props){
        super(props);        
        this.state = {
            page: 0,
            item_per_page: 10,
            offset:0,
            sort_by:'Make',
            sort_order:'asc',
            table_data:[],
            count:0
        }
      
        this.getData();        
    }
    
    getData = () => {
        
        var params ={
                      offset:this.state.offset,
                      limit:this.state.item_per_page,
                      sort_by:this.state.sort_by,
                      sort_order:this.state.sort_order
                    };
        this.getVehicleDataAPI(params).then(response => {
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
    
    getVehicleDataAPI = (params) => {
        
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.APICI + 'api/v1/vehicles/getItems?limit='+params.limit+'&offset='+params.offset+'&offset='+params.offset+'&sort_by='+params.sort_by+'&sort_order='+params.sort_order,{}).then(function (response) {
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
    
    sortRow = tableState => {
        debugger;
       
            var params ={
                      offset:this.state.offset,
                      limit:this.state.item_per_page,
                      sort_by:this.state.sort_by,
                      sort_order:this.state.sort_order
                    };
        this.getVehicleDataAPI(params).then(response => {
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
        name: "Make",
        options: {
          filter: true,
          sort:true,
          sortDirection:'asc'
        }
      },
      {
        name: "Model",
        options: {
          filter: true
        }
      },
      {
        name: "Year",
        options: {
          filter: true,
          sort:true,
        }
      },
     
      {
        name: "Hosted By",
        options: {
          filter: true,
        }
      },
      {
        name: "Status",
        options: {
            filter: true,
            sort:false,
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <VehicleStatus
                    value={value}
                    index={tableMeta.columnIndex}
                    change={event => updateValue(event)}
                    />
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
      serverSide: true,
      count:this.state.count,
      page: this.state.page,
      rowsPerPage:this.state.item_per_page,
      onTableChange: (action, tableState) => {
        debugger;  
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
        title={"Vehicals list"}
        data={this.state.table_data}
        columns={columns}
        options={options}     
      />
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Nstyles) (Welcome);