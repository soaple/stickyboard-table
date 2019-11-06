// src/RealtimeMessageTable.js

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

const MessageContainer = styled.div`
    padding: 16px;
`;

const Avatar = styled.img`
    width: 56px;
    height: 56px;
    position: absolute;
    left: 0;
    border-radius: 56px;
`;

const MessageBody = styled.div`
    position: absolute;
    left: 72px;
`;

const Name = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const Message = styled.div`
`;

class RealtimeMessageTable extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            tableId: UUIDv1(),
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(this.props, nextProps)

        // if (nextProps.data === this.props.data[0]) {
            this.scrollToBottom(nextProps.data.length - 2);
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
                // console.log(topPos);

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

                {/* Table Body */}
                <TableBody>
                    {data.map((row, index) => {
                        const rowId = this.generateTableRowId(index);

                        return (
                            <TableRow
                                key={rowId}
                                id={rowId}>
                                <MessageContainer>
                                    <Avatar
                                        alt={row.sender.name}
                                        src={row.sender.imgUrl} />
                                    <MessageBody>
                                        <Name>
                                            {row.sender.name}
                                        </Name>
                                        <Message>
                                            {row.message}
                                        </Message>
                                    </MessageBody>
                                </MessageContainer>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }
}

RealtimeMessageTable.propTypes = {
};

export default RealtimeMessageTable;
