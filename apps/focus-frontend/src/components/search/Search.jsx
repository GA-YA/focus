import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useUsers } from '../../common/hooks/users';
import UserCard from '../shared/userCard/UserCard';

function Search() {
    const [users] = useUsers();
    const [usersArr, setUsersArr] = useState([]);
    const [loading, setLoading] = useState(false);
    let modifyArr = [];

    //TODO: add refresh to users, undo friend
    const handleSearch = (event) => {
        const searchName = event.target.value;
        setLoading(true);

        modifyArr = users?.filter((user) => {
            if (user.userName.toLowerCase().includes(searchName.toLowerCase())) {
                return user;
            }
        });

        if (searchName === '') {
            modifyArr = [];
            setLoading(false);
        }

        if (modifyArr.length > 0) {
            setLoading(false);
        }

        setUsersArr(modifyArr);
    };

    return (
        <div className='sticky-top pt-5'>
            <div className='input-group w-100'>
                <span className='input-group-text' id='basic-addon1'>
                    <AiOutlineSearch />
                </span>
                <input
                    type='search'
                    className='form-control'
                    placeholder='Search trainers'
                    aria-label='Search'
                    onChange={handleSearch}
                />
            </div>
            <div>
                {loading ? (
                    <div className='spinner-border text-primary position-absolute end-50 mt-5' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                ) : (
                    <div>
                        {usersArr?.map((user) => {
                            return <UserCard user={user} />;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
