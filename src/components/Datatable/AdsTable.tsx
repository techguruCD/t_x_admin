import { useState, useMemo, useEffect } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { ADS_COLUMNS, AdInfoFromApi } from './columns'
import './table.scss'
import { useGetAdsQuery } from '../../api/adApi'
import { toast } from 'react-toastify';

interface AdTableProps {
    setAdCount: React.Dispatch<React.SetStateAction<number>>
}
export const AdsTable = ({ setAdCount }: AdTableProps) => {
    const [adsData, setAdsData] = useState<AdInfoFromApi[]>([])
    const { data: apiData, isLoading, error } = useGetAdsQuery([])

    const columns = useMemo(() => {
        return ADS_COLUMNS.map(header => ({
            Header: header.Header,
            Footer: header.Footer,
            accessor: header.accessor as keyof AdInfoFromApi,
        }))
    }, []) as Column<AdInfoFromApi>[]

    useEffect(() => {
        if (apiData?.data?.ads) {
            setAdsData(apiData.data.ads)
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
        setAdCount(adsData.length)
    }, [adsData, setAdCount])

    const tableData = useMemo(() => {
        setAdsData(adsData)
        return adsData
    }, [adsData, setAdsData])

    const tableInstance = useTable({ columns, data: tableData }, usePagination)
    const {
        getTableProps, getTableBodyProps,
        headerGroups, prepareRow,
        footerGroups,
    } = tableInstance
    const { page, state, nextPage, previousPage,
        canNextPage, canPreviousPage, pageOptions, setPageSize, pageSize } = tableInstance as any
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
            {!isLoading && adsData.length === 0 && <div>No ads found</div>}

        </div>
    )
}
