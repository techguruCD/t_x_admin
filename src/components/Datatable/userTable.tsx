import { useState, useMemo, useEffect } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { USER_COLUMNS, UserInfoFromApi } from './columns'
import './table.scss'
import { useGetUsersQuery } from '../../api/userApi'
import { handleError } from '../../utils/errorHandler'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { SerializedError } from '@reduxjs/toolkit'


interface UserTableProps {
    setUserCount: React.Dispatch<React.SetStateAction<number>>
}
export const UserTable = ({ setUserCount }: UserTableProps) => {
    const [usersData, setUsersData] = useState<UserInfoFromApi[]>([])
    const { data: apiData, isLoading, error } = useGetUsersQuery([])

    const columns = useMemo(() => {
        return USER_COLUMNS.map(header => ({
            Header: header.Header,
            Footer: header.Footer,
            accessor: header.accessor as keyof UserInfoFromApi,
        }))
    }, []) as Column<UserInfoFromApi>[]

    useEffect(() => {
        if (apiData?.data?.users) {
            setUsersData(apiData.data.users)
        }

        if (error) {
            handleError(error as FetchBaseQueryError | SerializedError)
        }
        return
    }, [apiData, error])


    useEffect(() => {
        setUserCount(usersData.length)
    }, [usersData, setUserCount])

    const tableData = useMemo(() => {
        setUsersData(usersData)
        return usersData
    }, [usersData, setUsersData])

    const tableInstance = useTable({ columns, data: tableData }, usePagination)
    const {
        getTableProps, getTableBodyProps,
        headerGroups, prepareRow,
        footerGroups,
    } = tableInstance
    const { page, state, nextPage, previousPage,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        canNextPage, canPreviousPage, pageOptions, setPageSize } = tableInstance as any
    const { pageIndex } = state


    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            if (screenHeight >= 1200) {
                setPageSize(Math.floor(screenHeight / 80));
            } else if (screenHeight > 992) {
                setPageSize(Math.floor(screenHeight / 100));
            } else {
                setPageSize(5);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            {tableData.length > 1 && (
                <div>
                    <div className='table_area'>
                        <div className='main_table'>
                            <table {...getTableProps()}>
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps()}>
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}

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
                        </div>
                        <div className='page_control'>
                            <span>
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}

                            </span>
                            {/* <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}> </select> */}

                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <div>Loading...</div>}
            {!isLoading && usersData.length === 0 && <div>No users found</div>}

        </div>
    )
}
