import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from "mui-datatables";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
//import VehicleStatus from '../../../../components/vehicle/VehicleStatus';
import { Nstyles }   from './Styles/VehiclesStyle';
import axios from 'axios';
import Server from '../../../../config/server.js';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import {connect} from "react-redux";
import {compose} from 'redux'
import RequestHelper from '../../../../account/vehicles/helper/request';
import Presenter from '../../../../account/vehicles/presenter';
import Utils from '../../../../helpers/utils'

class Vehicles extends React.Component {
    
    constructor(props){
      super(props)
      
      this.getData= this.getData.bind(this)      
      this.__OnGetVehiclesFailed__= this.__OnGetVehiclesFailed__.bind(this)      
      this.__OnGetVehiclesSucceed__= this.__OnGetVehiclesSucceed__.bind(this)
    }    
    
    state = {
        page: 0,
        item_per_page: 10,
        offset:0,
        sort_by:'Make',
        sort_order:'asc',
        table_data:[],
        count:0,
        confirm:false,
        filter:[],
        search:'',
        filterList:[[],[],[],[],[],[]],
        filterDataValue:[[],[],[],[],[],[]],
    };

    componentDidMount() {        
          var request = [];
          request['page'] = this.state.page;
          request['offset'] = this.state.offset;
          request['item_per_page'] = this.state.item_per_page;
          request['sort_by'] = this.state.sort_by;
          request['sort_order'] = this.state.sort_order;
          request['filter'] = this.state.filter;
          request['search'] = this.state.search;
          this.getData(request);  
    }

    getData = (params) => {
        Presenter.getAll(RequestHelper.getAll(this.__OnGetVehiclesSucceed__,this.__OnGetVehiclesFailed__,this.state,this.props,this))
    };
    
    __OnGetVehiclesFailed__(error){
    }
    __OnGetVehiclesSucceed__(response){
        var table_fields = ['photos','make','model','year','status','id'];
        var result = [];        
        if(response.data.error === undefined){
            for(var i=0;i< response.data.Vehicles.length;i++){
                var arr = [];
                for(var field in table_fields){
                    for (var key in response.data.Vehicles[i]) {                        
                        if(key === table_fields[field]){
                            arr.push(response.data.Vehicles[i][key]);
                          }  
                        }
                    }                    
                result.push(arr);
            }
            this.setState({
                table_data:result,
                count:response.data.Count,
            });
        }else{
            if(Utils.RefreshSession(this.state, this.props, this)){
                Presenter.getAll(RequestHelper.getAll(this.__OnGetVehiclesSucceed__,this.__OnGetVehiclesFailed__,this.state,this.props,this))
            }
        }
    }
    
    deleteVehicleDataAPI = (params) => {
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.API + 'deleteVehicle?data='+JSON.stringify(params)).then(function (response) {
                setTimeout(() => {
                    resolve(response);
                }, 250);
            }).catch((error) => {
                resolve([{data:[],recordsTotal:0}]);
            });   
        });        
    } 

    sortRow = pageState => {

       var request = [];
          request['page'] = 0;
          request['offset'] = (0 * pageState.rowsPerPage);
          request['item_per_page'] = pageState.rowsPerPage;
          request['sort_by'] = pageState.columns[pageState.activeColumn].name;
          request['sort_order'] = pageState.columns[pageState.activeColumn].sortDirection;
          request['filter'] = this.state.filter;
          request['search'] = this.state.search;
          this.getData(request);
    };
    
    changePage = (pageState) => {
        var request = [];
        request['page'] = pageState.page;
        request['offset'] = (request.page * pageState.rowsPerPage);
        request['item_per_page'] = pageState.rowsPerPage;
        request['sort_by'] = this.state.sort_by;
        request['sort_order'] = this.state.sort_order;
        request['filter'] = this.state.filter;
        request['search'] = this.state.search;        
        this.setState({
            page:pageState.page,
            offset:(pageState.page * pageState.rowsPerPage),
            item_per_page:pageState.rowsPerPage,
            },() => {
            this.getData(request); 
        });
                 
    };
    
    changeRowPage = (pageState) => {
        var request = [];
        request['page'] = 0;
        request['offset'] = (0 * pageState.rowsPerPage);
        request['item_per_page'] = pageState.rowsPerPage;
        request['sort_by'] = this.state.sort_by;
        request['sort_order'] = this.state.sort_order;
        request['filter'] = this.state.filter;
        request['search'] = this.state.search;        
        this.setState({
            page:0,
            offset:(0 * pageState.rowsPerPage),
            item_per_page:pageState.rowsPerPage,
            },() => {
            this.getData(request); 
        });
    };
    
    filterData = (tableState) =>{
        this.setState({
            filterList: tableState.filterList,
            filterDataValue:tableState.filterData,
        }); 
        
        var filterArray = [];
        for(var i=0;i<tableState.filterList.length;i++){
            if(tableState.filterList[i].length > 0){
                var filter = {};
                filter[tableState.columns[i].name]=tableState.filterList[i];
                filterArray.push(filter);
            }
        }
        
        var request = [];
        request['page'] = tableState.page;
        request['offset'] = (request.page * tableState.rowsPerPage);
        request['item_per_page'] = tableState.rowsPerPage;
        request['sort_by'] = this.state.sort_by;
        request['sort_order'] = this.state.sort_order;
        request['filter'] = filterArray;
        request['search'] = this.state.search;
        this.getData(request); 
    }
    
    resetData = (tableState) =>{
        var request = [];
        request['page'] = 0;
        request['offset'] = (0 * tableState.rowsPerPage);
        request['item_per_page'] = tableState.rowsPerPage;
        request['sort_by'] = 'Make';
        request['sort_order'] = 'asc';
        request['filter'] = [];
        request['search'] = '';
        this.setState({
            filterList: tableState.filterList,
            filterDataValue:tableState.filterData,
        });
        this.getData(request); 
    }
    
    searchData = (tableState) => {
        var request = [];            
        if(tableState.searchText != null && tableState.searchText !== undefined){        
            request['page'] = tableState.page;
            request['offset'] = (request.page * tableState.rowsPerPage);
            request['item_per_page'] = tableState.rowsPerPage;
            request['sort_by'] = this.state.sort_by;
            request['sort_order'] = this.state.sort_order;
            request['filter'] = this.state.filter;
            request['search'] = tableState.searchText;
            this.getData(request);        
        }else{
            request['page'] = tableState.page;
            request['offset'] = (request.page * tableState.rowsPerPage);
            request['item_per_page'] = tableState.rowsPerPage;
            request['sort_by'] = this.state.sort_by;
            request['sort_order'] = this.state.sort_order;
            request['filter'] = this.state.filter;
            request['search'] = '';
            this.getData(request);
        }
    }
    
    deleteVehicles = (rows) => {
        var params ={ data:rows };
        this.deleteVehicleDataAPI(params).then(response => {
            if(response){
                var request = [];
                request['page'] = this.state.page;
                request['offset'] = this.state.offset;
                request['item_per_page'] = this.state.item_per_page;
                request['sort_by'] = this.state.sort_by;
                request['sort_order'] = this.state.sort_order;                
                request['search'] = this.state.search;
                this.getData(request); 
            }
        });        
    }
    
    deleteRowConfirm = (rowsDeleted) => {
        this.setState({
            confirm: true,
            rows:rowsDeleted
        });     
    };
    
    _handleDeleteRow = () =>{
        this.setState({
            confirm: false
        },() => {
            var vehicles = [];
            for(var i=0;i<this.state.rows.data.length;i++){                
                vehicles.push(this.state.table_data[this.state.rows.data[i]['dataIndex']][6]);
            }
            this.deleteVehicles(vehicles);
        });
    }

    _handleConfirmCancel = () =>{
        this.setState({
            confirm: false,
            rows:[]
        });
    }
    
    __vehicledetail__(row) {     
        this.props.history.push("/admin/vehicledetail/" + row)
    }
    
    
  render() {
    const { classes } = this.props;
    const columns = [
    {
        name: "Picture",
        options: {
            filter: false,
            sort:false,
            download:false,
            customBodyRender: (value, tableMeta, updateValue) => {
                let imageUrl = '../../images/users/No_Image_Available.png';
                if(value !== null){
                  imageUrl = value[0];
                }                
                return (
                 <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
                );
            }
        }
      },
      {
        name: "Make",
        options: {
       filter: false,
       sort:false
         
        }
      },
      {
        name: "Model",
        filter: false,
       sort:false
      },
      {
        name: "Year",
        options: {         
         filter: false,
       sort:false
        }
      },
//      {
//        name: "Hosted By",
//        options: {
//            filter: false,
//            sort:false,
//            download:false,
//            customBodyRender: (value, tableMeta, updateValue) => {
//                return (<b>-</b>);
//            }
//        }
//      },
      {
        name: "Status",
        options: {         
           filter: true,
       sort:false,
          
        }
      },
      {
        name: "View",
        options: {
            filter: false,
            sort:false,
            download:false,
            customBodyRender: (value, tableMeta, updateValue) => {

                return (
                    <ArrowRightAlt className={classes.ArrowRightAlt} onClick={this.__vehicledetail__.bind(this,value)} />
                );
            }
        }
      }
    ];
    const options = {
      filter: false,
      filterData:this.state.filterDataValue,
      filterList:this.state.filterList,
      searchText:this.state.search,
      filterType: "checkbox",
      search:false,
      responsive: "scroll",
      selectableRows: false,
      serverSide: true,
      count:this.state.count,
      page: this.state.page,
      rowsPerPage:this.state.item_per_page,
      onRowsDelete:this.deleteRowConfirm,
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
          case 'filterChange':
            this.filterData(tableState);
            break;
          case 'resetFilters':
            this.resetData(tableState);
            break;
          case 'search':
            this.searchData(tableState);
            break;
        default:
            break;
        }
      }
    };

    return (
      <Paper className={classes.root}>
        <MUIDataTable
          title={"Vehicles list"}
          data={this.state.table_data}
          columns={columns}
          options={options}     
        />
        <Dialog
            disableBackdropClick
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={this.state.confirm}
            >
                <DialogContent>Are you sure you want to delete the vehicle?</DialogContent>
                <DialogActions>
                      <Button color="primary" onClick={this._handleDeleteRow}>Ok</Button>
                      <Button color="primary" onClick={this._handleConfirmCancel}>Cancel</Button>
                </DialogActions>
        </Dialog>
       </Paper>
    );
  }
}

Vehicles.propTypes = {
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
                  )(Vehicles);