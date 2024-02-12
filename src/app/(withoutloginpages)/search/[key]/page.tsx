import Search from '@/components/HomePage/Search';
import React from 'react';

const SearchPage = ({ params }: { params: { key: string } }) => {
    const searchKey = params.key;
    return (
        <div className='lg:mt-52'>
            <Search searchKey={searchKey}/>
        </div>
    );
};

export default SearchPage;