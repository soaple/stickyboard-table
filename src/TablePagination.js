// src/TablePagination.js

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PrevButton = styled.button`
    margin-right: 16px;
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid #aaaaaa;
    -webkit-transition: -webkit-all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    ${props => {
        if (props.disabled) {
            return `
                color: #dddddd;
                cursor: not-allowed;
                border: 1px solid #dddddd;
            `;
        } else {
            return `
                :hover {
                    background-color: #dddddd;
                    cursor: pointer;
                }
                :active {
                    background-color: #aaaaaa;
                }
            `;
        }
    }};
`;

const NextButton = styled.button`
    margin-left: 16px;
    padding: 0 16px;
    border-radius: 8px;
    border: 1px solid #aaaaaa;
    -webkit-transition: -webkit-all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    ${props => {
        if (props.disabled) {
            return `
                color: #dddddd;
                cursor: not-allowed;
                border: 1px solid #dddddd;
            `;
        } else {
            return `
                :hover {
                    background-color: #dddddd;
                    cursor: pointer;
                }
                :active {
                    background-color: #aaaaaa;
                }
            `;
        }
    }};
`;

class TablePagination extends React.Component {
    render() {
        const {
            totalPage,
            currentPage,
            rowsPerPage,
            onPrevBtnClick,
            onNextBtnClick,
        } = this.props;

        return (
            <Wrapper>
                <PrevButton
                    onClick={onPrevBtnClick}
                    disabled={currentPage === 1}>
                    {'<'}
                </PrevButton>

                <div>{`${currentPage} / ${totalPage}`}</div>

                <NextButton
                    onClick={onNextBtnClick}
                    disabled={currentPage === totalPage}>
                    {'>'}
                </NextButton>
            </Wrapper>
        )
    }
}

export default TablePagination;
