// src/TableWithPagination.js

import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Table,
    TableToolbar,
    TableToolbarTitle,
    TableHeader,
    TableHead,
    TableBody,
    TableRowEmpty,
    TableRow,
    TableData,
    TableFooter,
} from './Table';
import TablePagination from './TablePagination';

class TableWithPagination extends React.Component {
    constructor (props) {
        super(props);

        this.tableHeader = React.createRef();

        this.state = {
            headerHeight: 0,
            // Table Pagination
            rowsPerPage: 10,
            page: 1,
        }
    }

    componentDidMount() {
        if (this.tableHeader.current) {
            this.setState({
                headerHeight: this.tableHeader.current.offsetHeight,
            });
        }
    }

    componentWillReceiveProps (nextProps) {
        // if (nextProps.rowsPerPage !== this.state.rowsPerPage) {
        //     this.setState({ rowsPerPage: nextProps.rowsPerPage });
        // }
    }

    onPrevBtnClick = () => {
        this.setState((state, props) => {
            return {
                page: Math.max(state.page - 1, 1)
            };
        });
    }

    onNextBtnClick = () => {
        const totalPage = Math.ceil(this.props.data.length / this.state.rowsPerPage);

        this.setState((state, props) => {
            return {
                page: Math.min(state.page + 1, totalPage),
            };
        });
    }

    // TODO: Support feature to change rows per page
    onChangeTableRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { headerHeight, rowsPerPage, page } = this.state;
        const { title, data } = this.props;

        const totalPage = Math.ceil(data.length / rowsPerPage);
        const offset = Math.ceil((page - 1) * rowsPerPage);
        const currentPageData = data.slice(offset, offset + rowsPerPage);
        const emptyRows = rowsPerPage - currentPageData.length;

        return (
            <Table>
                {/* Table Toolbar */}
                <TableToolbar>
                    <TableToolbarTitle>{title}</TableToolbarTitle>
                </TableToolbar>

                {/* Table Header */}
                <TableHeader ref={this.tableHeader}>
                    {data.length > 0 && Object.keys(data[0]).map((key, index) => {
                        return (
                            <TableHead
                                key={index}>
                                {key.toUpperCase()}
                            </TableHead>
                        )
                    })}
                </TableHeader>

                {/* Table Body */}
                <TableBody headerHeight={headerHeight}>
                    {currentPageData.map((post, index) => {
                        return (
                            <TableRow
                                key={index}
                                showBorderBottom={index < currentPageData.length - 1}>
                                {Object.keys(post).map((key, index) => {
                                    return (
                                        <TableData
                                            key={index}>
                                            {post[key]}
                                        </TableData>
                                    )
                                })}
                            </TableRow>
                        );
                    })}
                    {emptyRows > 0 &&
                        <TableRowEmpty numOfRows={emptyRows} />}
                </TableBody>

                {/* Table Footer */}
                <TableFooter>
                    <TablePagination
                        totalPage={totalPage}
                        currentPage={page}
                        rowsPerPage={rowsPerPage}
                        onPrevBtnClick={this.onPrevBtnClick}
                        onNextBtnClick={this.onNextBtnClick} />
                </TableFooter>
            </Table>
        )
    }
}

TableWithPagination.propTypes = {
};

export default TableWithPagination;
