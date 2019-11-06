// src/Table.js

import React from 'react';
import styled from 'styled-components';

const TOOLBAR_HEIGHT = 56;
const HEADER_HEIGHT = 56;
const ROW_HEIGHT = 56;
const FOOTER_HEIGHT = 56;

export const Table = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

export const TableToolbar = styled.div`
    width: 100%;
    height: ${TOOLBAR_HEIGHT}px;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 16px;
`;

export const TableToolbarTitle = styled.div`
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    color: ${props => props.color || '#000000'};
`;

export const TableHeader = styled.div`
    width: 100%;
    height: ${HEADER_HEIGHT}px;
    position: absolute;
    top: ${TOOLBAR_HEIGHT}px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #444444;
`;

export const TableHead = styled.div`
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    user-select: none;
    color: ${props => props.color || '#444444'};
`;

export const TableBody = styled.div`
    width: 100%;
    position: absolute;
    top: ${TOOLBAR_HEIGHT + HEADER_HEIGHT}px;
    bottom: ${FOOTER_HEIGHT}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
    background-color: #ffffff;
`;

export const TableRow = styled.div`
    flex: 1;
    min-height: ${ROW_HEIGHT}px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    ${props => props.showBorderBottom && `
        border-bottom: 1px solid #dddddd;
    `};
`;

export const TableRowEmpty = styled.div`
    flex: ${props => props.numOfRows};
`;

export const TableData = styled.div`
    flex: 1;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: ${props => props.fontWeight || 400};
    color: ${props => props.color || '#000000'};
`;

export const TableFooter = styled.div`
    width: 100%;
    height: ${FOOTER_HEIGHT}px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #444444;
`;
