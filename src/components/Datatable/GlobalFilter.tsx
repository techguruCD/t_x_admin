import React from 'react'

export default function GlobalFilter({ filter, setFilter }: any) {
    return (
        <span>
            Search: {' '}
            <input value={filter || ''}
                onChange={e => setFilter(e.target.value)} />
        </span>
    )
}
