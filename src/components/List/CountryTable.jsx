import React, { useState } from 'react';
import { Input, Table } from 'antd';
import { connect } from 'react-redux';


const CountryTable = (props) => {
    const [searchText, setSearchText] = useState();
    const [data, setData] = useState({});
    const [value, setValue] = useState('');


    const FilterByNameInput = (
        <Input
            placeholder="Search Country ..."
            value={value}
            onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = props.countries.filter(entry =>
                    entry.name.includes(currValue)
                );
                console.log(filteredData);
                // setData(filteredData);
            }}
        />
    )

    const columns = [
        {
            title: FilterByNameInput,
            dataIndex: 'Country'
        },
        {
            title: 'Total Cases',
            dataIndex: 'TotalConfirmed',
            className: 'ConfirmedCase'
        },
        {
            title: 'New Cases',
            dataIndex: 'NewConfirmed'
        },
        {
            title: 'Total Deaths',
            dataIndex: 'TotalDeaths',
            className: 'DeathCase'
        },
        {
            title: 'New Deaths',
            dataIndex: 'NewDeaths'
        },
        {
            title: 'Total Recovered',
            dataIndex: 'TotalRecovered',
            className: 'RecoveredCase'
        },
        {
            title: 'New Recovered',
            dataIndex: 'NewRecovered'
        },
        {
            title: 'Active Cases',
            render: (record) => <span>{record.TotalConfirmed - (record.TotalRecovered + record.TotalDeaths)}</span>
        }
    ]

    return (
        <div className="table">
            <Table
                columns={columns}
                dataSource={props.countries}
            />
        </div>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(CountryTable);