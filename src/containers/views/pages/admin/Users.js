import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {compose} from 'redux'
        import MUIDataTable from "mui-datatables";
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import { Nstyles }   from './Styles/HostsStyle';
//import axios from 'axios';
//import Server from '../../../../config/server.js'
//import Button from '@material-ui/core/Button';
//import Icon from '@material-ui/core/Icon';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import ConfirmationDialog from '../../dialogs/confirmation';
import RequestHelper from '../../../../account/users/helper/request';
import Presenter from '../../../../account/users/presenter';
import Utils from '../../../../helpers/utils'

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: 0,
            item_per_page: 10,
            offset: 0,
            sort_by: 'user_name',
            sort_order: 'asc',
            table_data: [],
            count: 0,
            confirm: false,
            filter: [],
            search: '',
            filterList: [[], [], [], []],
            filterDataValue: [[], [], [], []],
        };
        this.getData = this.getData.bind(this)
        this.__OnGetUserFailed__ = this.__OnGetUserFailed__.bind(this)
        this.__OnGetUserSucceed__ = this.__OnGetUserSucceed__.bind(this)
    }

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
        Presenter.getUsers(RequestHelper.getUsers(this.__OnGetUserSucceed__, this.__OnGetUserFailed__, this.state, this.props, this))
    }
    ;
            __OnGetUserFailed__(error) {
    }
    __OnGetUserSucceed__(response) {

        var table_fields = ['profile_photo', 'email', 'phone', 'id'];
        var result = [];
        if (response.data.error === undefined) {
            for (var i = 0; i < response.data.Users.length; i++) {
                var arr = [];
                for (var field in table_fields) {
                    for (var key in response.data.Users[i]) {
                        if (key === table_fields[field]) {
                            arr.push(response.data.Users[i][key]);
                        }
                    }
                }
                result.push(arr);
            }
            this.setState({
                table_data: result,
                count: response.data.Count,
            });
        } else {
debugger;
            if(Utils.RefreshSession(this.state, this.props, this)){
                Presenter.getUsers(RequestHelper.getUsers(this.__OnGetUserSucceed__, this.__OnGetUserFailed__, this.state, this.props, this))
            }
        }
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
    }
    ;
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
            page: pageState.page,
            offset: (pageState.page * pageState.rowsPerPage),
            item_per_page: pageState.rowsPerPage,
        }, () => {
            this.getData(request);
        });

    }
    ;
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
            page: 0,
            offset: (0 * pageState.rowsPerPage),
            item_per_page: pageState.rowsPerPage,
        }, () => {
            this.getData(request);
        });
    }
    ;
            filterData = (tableState) => {
        this.setState({
            filterList: tableState.filterList,
            filterDataValue: tableState.filterData,
        });

        var filterArray = [];
        for (var i = 0; i < tableState.filterList.length; i++) {
            if (tableState.filterList[i].length > 0) {
                var filter = {};
                filter[tableState.columns[i].name] = tableState.filterList[i];
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

    resetData = (tableState) => {
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
            filterDataValue: tableState.filterData,
        });
        this.getData(request);
    }

    searchData = (tableState) => {
        var request = [];
        if (tableState.searchText != null && tableState.searchText !== undefined) {
            request['page'] = tableState.page;
            request['offset'] = (request.page * tableState.rowsPerPage);
            request['item_per_page'] = tableState.rowsPerPage;
            request['sort_by'] = this.state.sort_by;
            request['sort_order'] = this.state.sort_order;
            request['filter'] = this.state.filter;
            request['search'] = tableState.searchText;
            this.getData(request);
        } else {
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
        this.setState({
            message_to: tableMeta.rowData[1],
            open_message_dialog: true,
            open_message_success_dialog: false
        });
    }
    ;
            handleSendMessage = () => {
        this.setState({
            open_message_dialog: false,
            open_message_success_dialog: true
        });
    }
    ;
            handleConfirmClose = value => {
                this.setState({
                    message_to: '',
                    open_message_dialog: false,
                    open_message_success_dialog: false
                });
            }
    ;
            __userdetail__(user_id) {
        this.props.history.push("/admin/userdetail/" + user_id)
    }

    render() {
        const {classes} = this.props;
        const columns = [
            {
                name: "Picture",
                options: {
                    filter: false,
                    sort: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => {

                        let imageUrl = '../../images/users/No_Image_Available.png';
                        if (value !== "") {
                            imageUrl = value;
                        }
                        return (
                                <Avatar alt="Remy Sharp" src={imageUrl} className={classes.avatar} />
                                );
                    }
                }
            },
            {
                name: "Email",
                options: {
                    filter: true,
                    sort: false
                }
            },
            {
                name: "Phone Number",
                options: {
                    filter: true,
                    sort: false
                }
            },
            {
                name: "View",
                options: {
                    filter: false,
                    sort: false,
                    download: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                                <ArrowRightAlt className={classes.ArrowRightAlt} onClick={this.__userdetail__.bind(this, value)} />
                                );
                    }
                }
            }

        ];

        const options = {
            filter: false,
            filterData: this.state.filterDataValue,
            filterList: this.state.filterList,
            searchText: this.state.search,
            filterType: "checkbox",
            responsive: "scroll",
            selectableRows: false,
            search: false,
            serverSide: true,
            count: this.state.count,
            page: this.state.page,
            rowsPerPage: this.state.item_per_page,
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
                        title={"Users"}
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

        Users.propTypes = {
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
                )(Users);