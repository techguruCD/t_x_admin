import { useState, useMemo, useEffect } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { USER_COLUMNS, UserInfoFromApi } from './columns'
import './table.scss'
import { useGetUsersQuery } from '../../api/userApi'
import { toast } from 'react-toastify';

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
            if (error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((error as any).error) toast.error((error as any).error)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const apiError = error as any
                const badRequestError = apiError.status && (apiError.status < 500) && apiError.data?.message
                if (badRequestError) toast.error(apiError.data?.message)
                else toast.error('An error occured')
            }
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
        canNextPage, canPreviousPage, pageOptions, setPageSize } = tableInstance as any
    const { pageIndex } = state

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
                    </div>
                </div>
            )}
            {() => setPageSize(5)}
            {isLoading && <div>Loading...</div>}
            {!isLoading && usersData.length === 0 && <div>No users found</div>}

        </div>
    )
}
