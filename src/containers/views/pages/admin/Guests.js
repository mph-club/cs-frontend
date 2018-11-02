import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux'
import MUIDataTable from "../../../../mui-datatables/src";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Nstyles }   from './Styles/GuestsStyle';
import axios from 'axios';
import Server from '../../../../config/server.js'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ConfirmationDialog from '../../dialogs/confirmation';

class Guests extends React.Component {
    
    state = {
        page: 0,
        item_per_page: 10,
        offset:0,
        sort_by:'user_name',
        sort_order:'asc',
        table_data:[],
        count:0,
        confirm:false,
        filter:[],
        search:'',
        filterList:[[],[],[],[],[],[],[]],
        filterDataValue:[[],[],[],[],[],[],[]],
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
                  count:response.recordsTotal,
                  page:params.page,
                  offset:params.offset,
                  item_per_page:params.item_per_page,
                  sort_by:params.sort_by,
                  sort_order:params.sort_order,
                  filter:params.filter,
                  search:params.search
              });
          });
    };
    
    getGuestDataAPI = (params) => {
        var filterData = '';
        if(params.filter.length > 0){
            filterData = JSON.stringify(params.filter);
        }
        return new Promise((resolve, reject) => {
            axios.get(Server.VEHICAL.APICI + 'api/v1/users/getGuestsList?limit='+params.item_per_page+'&offset='+params.offset+'&sort_by='+params.sort_by+'&sort_order='+params.sort_order+'&filter='+filterData+'&search='+params.search,{}).then(function (response) {
                setTimeout(() => {
                    resolve(response.data);
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
          this.getData(request);        
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
        this.getData(request);
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
        request['sort_by'] = 'user_name';
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
        if(tableState.searchText != null && tableState.searchText !== undefined){        
            var request = [];
            request['page'] = tableState.page;
            request['offset'] = (request.page * tableState.rowsPerPage);
            request['item_per_page'] = tableState.rowsPerPage;
            request['sort_by'] = this.state.sort_by;
            request['sort_order'] = this.state.sort_order;
            request['filter'] = this.state.filter;
            request['search'] = tableState.searchText;
            this.getData(request);        
        }else{
            var request = [];
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
    
    
  handleOpenMessageDialog = (tableMeta) => {
    debugger;  
    this.setState({ 
        message_to: tableMeta.rowData[1],
        open_message_dialog: true,
        open_message_success_dialog: false
    });
  };
  
  handleSendMessage = () => {
    this.setState({ 
        open_message_dialog: false,
        open_message_success_dialog: true
    });
  };

  handleConfirmClose = value => {
    this.setState({ 
            message_to: '',
            open_message_dialog: false,
            open_message_success_dialog: false
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
          download:false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
             <Avatar alt="Remy Sharp" src={`../images/users/${value}`} className={classes.avatar} />
            );
          }
        }
      },
      {
        name: "User name",
        options: {
          filter: true,
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
        name: "Message",
        options: {
            filter: false,
            sort:false,
            download:false,
            customBodyRender: (value, tableMeta, updateValue) => {
                  return (
                    <Button variant="fab" mini color="primary" aria-label="Add" className={classes.button} onClick={() => this.handleOpenMessageDialog(tableMeta)}>
                        <Icon>send_icon</Icon>
                    </Button>
                  );
            }
        },
            
      },
      {
        name: "View",
        options: {
            filter: false,
            sort:false,
            download:false,
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
      filterData:this.state.filterDataValue,
      filterList:this.state.filterList,
      searchText:this.state.search,
      filterType: "checkbox",
      responsive: "scroll",
      selectableRows: false,
      serverSide: true,
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
      <div>       
        <MUIDataTable
          title={"Guests list"}
          data={this.state.table_data}
          columns={columns}
          options={options}     
        />
        {(this.state.message_to !== undefined && this.state.message_to !== '') ?
                  <ConfirmationDialog
                    classes={{
                        paper: classes.paper,
                    }}
                    open={this.state.open_message_dialog}
                    onCancel={this.handleConfirmClose}
                    onOk={this.handleSendMessage}
                    value=""
                    is_ok={true}
                    is_cancel={true}
                    ok_label="Send"
                    cancel_label="Cancel"
                    message={`Message to ${this.state.message_to}`}
                    get_value={true}
                  />
              : ''}
        {(this.state.message_to !== undefined && this.state.message_to !== '') ?
                    <ConfirmationDialog
                      classes={{
                          paper: classes.paper,
                      }}
                      open={this.state.open_message_success_dialog}
                      onCancel={this.handleConfirmClose}
                      onOk={this.handleConfirmClose}
                      value=""
                      is_ok={true}
                      is_cancel={false}
                      ok_label="Ok"
                      cancel_label="Cancel"
                      message={`Message sent to ${this.state.message_to}`}
                      get_value={false}
                    />
        : ''}
        </div>        
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