import React, { useState, useMemo, useEffect } from 'react'
import { useTable, usePagination, Column } from 'react-table'
import { ADS_COLUMNS, AdInfoFromApi } from './columns'
import './table.scss'
import { useGetAdsQuery } from '../../api/adApi'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function formatDate(dateString: string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as any;
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
}
interface AdsModalProps {
    adData: AdInfoFromApi,
    onClose: () => void
}
const AdModal = (props: AdsModalProps) => {
    const { adData: adInfo, onClose } = props
    const [adData, setAdData] = useState<AdInfoFromApi>(adInfo)

    return (
        <div className='ad-modal'>
            <h2>Ad Details</h2>
            {adData && (<>
                <p><span>Name: </span> {adData.name}</p>
                <p><span>URL: </span> <a href={adData.url}>{adData.url}</a></p>
                <img src={adData.image} alt={adData.name} />
                <p><span>Created: </span> {formatDate(adData.createdAt)}</p>
                <p><span>Expiry: </span> {formatDate(adData.expiry)}</p>
                <p><span>Status: </span> {adData.status}</p>
            </>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    );
}

interface AdTableProps {
    setAdCount: React.Dispatch<React.SetStateAction<number>>
}
export const AdsTable = ({ setAdCount }: AdTableProps) => {
    const [adsData, setAdsData] = useState<AdInfoFromApi[]>([])
    const { data: apiData, isLoading, error } = useGetAdsQuery([])
    const [selectedAdData, setSelectedAdData] = useState<AdInfoFromApi>()
    const [isAdModalOpen, setIsAdModalOpen] = useState(false)

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

    const viewAdDetails = (adData: AdInfoFromApi) => {
        console.log(adData)
        setSelectedAdData(adData)
        setIsAdModalOpen(true)
    }
    const closeModal = () => {
        setIsAdModalOpen(false)
    }

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
            {(isAdModalOpen && selectedAdData) && <AdModal onClose={closeModal} adData={selectedAdData} />}

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
                                        const ad = row.original
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })}
                                                <td className='button-action-area'>
                                                    <button onClick={() => viewAdDetails(ad)} className='btn-action-row'><FontAwesomeIcon icon={faEye} /></button>
                                                    <button onClick={() => viewAdDetails(ad)} className='btn-action-row'><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => viewAdDetails(ad)} className='btn-action-row'><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
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
