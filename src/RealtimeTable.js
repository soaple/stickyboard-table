// src/components/page/RealtimeTable.js

import React from 'react'
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import UUIDv1 from 'uuid/v1';

const TABLE_TOOLBAR_HEIGHT = 56;

const styles = theme => ({
    root: {
        height: '100%',
        padding: theme.spacing.unit * 2,
    },
    toolbar: {
        height: TABLE_TOOLBAR_HEIGHT,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
    },
    title: {
        flex: '0 0 auto',
    },
    tablePaper: {
        height: 'calc(100% - ' + (TABLE_TOOLBAR_HEIGHT * 2 + theme.spacing.unit * 2) + 'px)',
        // overflow: 'auto',
        overflow: 'hidden',
    },
    tableHead: {
        borderBottom: '1px solid ' + grey[500],
    },
    tableBody: {
    },
    tableRow: {
        padding: theme.spacing.unit * 2,
        // '&:nth-of-type(odd)': {
        //     backgroundColor: 'rgb(228, 228, 228)',
        // },
    },
});

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

    // readPostsCallback  = (statusCode, response) => {
    //     switch (statusCode) {
    //     case StatusCode.OK:
    //         console.log(response)
    //         this.setState({
    //             data: response,
    //         });
    //         break
    //     default:
    //         alert(response.msg);
    //         break
    //     }
    // }

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

    render () {
        const { classes, theme } = this.props;
        const { data } = this.props;
        const { tableId } = this.state;

        return (
            <div className={classes.root}>
                {/* Table Toolbar */}
                <Toolbar className={classes.toolbar}>
                    <div className={classes.title}>
                        <Typography variant="title">
                            {this.props.title}
                        </Typography>
                    </div>
                </Toolbar>

                {/* Table Head */}
                <div>
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
                </div>

                {/* Table Body */}
                <div
                    id={tableId}
                    className={classes.tablePaper}>
                    <Table>
                        {data.map((row, index) => {
                            const rowId = this.generateTableRowId(index);

                            return (
                                <CSSTransition
                                    key={rowId}
                                    component="tbody"
                                    className={classes.tableBody}
                                    classNames="example"
                                    timeout={{ enter: 500, exit: 500 }}>
                                    <TableRow
                                        id={rowId}
                                        hover={true}
                                        className={classes.tableRow}>
                                        {Object.keys(row).map((key, index) => {
                                            return (
                                                <TableCell
                                                    key={index}
                                                    style={{width: '20%'}}>
                                                    {row[key]}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                </CSSTransition>
                            );
                        })}
                    </Table>
                </div>

            </div>
        )
    }
}

RealtimeTable.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RealtimeTable);
