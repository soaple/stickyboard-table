// src/RealtimeTable.js

import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import UUIDv1 from 'uuid/v1';
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

class RealtimeTable extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            tableId: UUIDv1(),
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)

        // if (nextProps.data === this.props.data[0]) {

        setTimeout( () => {
            this.scrollToBottom(nextProps.data.length - 2);
        }, 500)

        // }
    }

    scrollToBottom = (lastIndex) => {
        // let lastIndex = this.props.data.length - 1;
        if (lastIndex >= 0) {
            let rowId = this.generateTableRowId(lastIndex);
            let targetElement = document.getElementById(rowId);
            // console.log(rowId, targetElement);
            if (targetElement !== null) {
                var topPos = targetElement.offsetTop;
                var containerElement = document.getElementById(this.state.tableId);
                console.log(topPos, containerElement);

                var anim = setInterval(() => {
                    containerElement.scrollTop += 1;
                    if (Math.abs(containerElement.scrollTop - topPos) < 0.1) {
                        clearInterval(anim);

                        this.props.onAnimationEnd(this.props.dataKey);
                    }
                }, 50);

                // containerElement.animate({
                //     scrollTop: topPos
                // });
                // console.log(containerElement.scrollTop);
            }
        }
    }

    generateTableRowId = (index) => {
        return this.state.tableId + '_row' + index;
    }

    render() {
        const { tableId } = this.state;
        const { data } = this.props;

        return (
            <Table id={tableId}>
                {/* Table Toolbar */}
                <TableToolbar>
                    <TableToolbarTitle>{this.props.title}</TableToolbarTitle>
                </TableToolbar>

                {/* Table Head */}
                <TableHeader>
                    <TableRow>
                        {data.length > 0 && Object.keys(data[0]).map((key, index) => {
                            return (
                                <TableHead
                                    key={index}>
                                    {key.toUpperCase()}
                                </TableHead>
                            )
                        })}
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {data.map((row, index) => {
                        const rowId = this.generateTableRowId(index);

                        return (
                            <TableRow
                                id={rowId}
                                hover={true}>
                                {Object.keys(row).map((key, index) => {
                                    return (
                                        <TableData
                                            key={index}>
                                            {row[key]}
                                        </TableData>
                                    )
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }
}

RealtimeTable.propTypes = {
};

export default RealtimeTable;
