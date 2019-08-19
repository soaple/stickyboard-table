// src/components/page/TableWithPagination.js

import React from 'react'
import PropTypes from 'prop-types';

import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import RefreshIcon from '@material-ui/icons/Refresh';

import TablePaginationActions from './TablePaginationActions';

const TABLE_TOOLBAR_HEIGHT = 56;

const styles = theme => ({
    root: {
        height: '100%',
    },
    toolbar: {
        height: TABLE_TOOLBAR_HEIGHT,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    title: {
        flex: '0 0 auto',
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {

    },
    tablePaper: {
        height: 'calc(100% - ' + (TABLE_TOOLBAR_HEIGHT * 3 + theme.spacing(2)) + 'px)',
        overflow: 'auto',
    },
    tableHead: {
        borderBottom: '1px solid ' + grey[500],
    },
    tableBody: {
    },
    tableRow: {
        padding: theme.spacing(2),
        // '&:nth-of-type(odd)': {
        //     backgroundColor: 'rgb(228, 228, 228)',
        // },
    },
    tableFooter: {
        borderTop: '1px solid ' + grey[500],
    },
    tablePagination: {
        overflow: 'auto',
    },
});

class TableWithPagination extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            // Table Pagination
            rowsPerPage: 10,
            page: 0,
        }
    }

    componentWillReceiveProps (nextProps) {
        // if (nextProps.rowsPerPage !== this.state.rowsPerPage) {
        //     this.setState({ rowsPerPage: nextProps.rowsPerPage });
        // }
    }

    onChangeTablePage = (event, page) => {
        this.setState({
            page: page,
        });
    };

    onChangeTableRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render () {
        const { classes, theme } = this.props;
        const { data } = this.props;
        const { rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const offset = Math.ceil(page * rowsPerPage);
        const currentPageData = data.slice(offset, offset + rowsPerPage);

        return (
            <div className={classes.root}>
                {/* Table Toolbar */}
                <Toolbar className={classes.toolbar}>
                    <div className={classes.title}>
                        <Typography variant="h6">
                            {this.props.title}
                        </Typography>
                    </div>
                    <div className={classes.spacer} />
                    <div className={classes.actions}>
                        <IconButton aria-label="Refresh">
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </Toolbar>

                {/* Table Head */}
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {data.length > 0 && Object.keys(data[0]).map((key, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        style={{width: '20%'}}>
                                        {key.toUpperCase()}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                </Table>

                {/* Table Body */}
                <div className={classes.tablePaper}>
                    <Table>
                        <TableBody className={classes.tableBody}>
                            {currentPageData.map((post, index) => {
                                return (
                                    <TableRow
                                        hover={true}
                                        key={index}
                                        className={classes.tableRow}>
                                        {Object.keys(post).map((key, index) => {
                                            return (
                                                <TableCell
                                                    key={index}
                                                    style={{width: '20%'}}>
                                                    {post[key]}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 40 * emptyRows }}>
                                    <TableCell colSpan={3} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Table Footer */}
                <Table>
                    <TableFooter className={classes.tableFooter}>
                        <TableRow>
                            <TablePagination
                                className={classes.tablePagination}
                                colSpan={3}
                                count={data.length}
                                labelRowsPerPage={'rowsPerPage'}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                page={page}
                                onChangePage={this.onChangeTablePage}
                                onChangeRowsPerPage={this.onChangeTableRowsPerPage}
                                ActionsComponent={TablePaginationActions} />
                        </TableRow>
                    </TableFooter>
                </Table>

            </div>
        )
    }
}

TableWithPagination.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TableWithPagination);
