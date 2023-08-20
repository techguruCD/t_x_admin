import React, { useState, useMemo, } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination, TableInstance, Column } from 'react-table'
import USER_DATA from './MOCK_DATA.json'
import { USER_COLUMNS, UserData } from './columns'
import './table.scss'
import GlobalFilter from './GlobalFilter'

export const UserTable = () => {
    const columns = useMemo(() => {
        return USER_COLUMNS.map(header => ({
            Header: header.Header,
            Footer: header.Footer,
            accessor: header.accessor as keyof UserData,
        }))
    }, []) as Column<TableInstance<UserData>>[]

    const data = useMemo(() => USER_DATA as UserData[], [])

    const {
        getTableProps, getTableBodyProps,
        headerGroups, prepareRow,
        footerGroups,
        page, nextPage, previousPage,
        canNextPage, canPreviousPage,
        pageOptions, state,
        setPageSize
    } = useTable<TableInstance<UserData>>({ columns, data }, usePagination)
    const { pageIndex, pageSize } = state
    // setPageSize(20)
    // const { globalFilter } = state

    return (
        <>
            {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span> */}
                                </th>
                            ))}
                        </tr>
                    ))}
                    {/* <tr>
                    <th></th>
                </tr> */}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            <div className='page_control'>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}

                </span>
                {/* <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))

                    }
                </select> */}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    )
}
