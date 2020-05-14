import React, { useState } from 'react';
import { Input, Table } from 'antd';
import { connect } from 'react-redux';


const CountryTable = (props) => {
    const [searchText, setSearchText] = useState();
    const [data, setData] = useState({});
    const [value, setValue] = useState('');


    const FilterByNameInput = (
        <Input
            placeholder="Search Name"
            value={value}
            // onChange={e => {
            //     const currValue = e.target.value;
            //     setValue(currValue);
            //     const filteredData = props.countries.filter(entry =>
            //         entry.name.includes(currValue)
            //     );
            //     setData(filteredData);
            // }}
        />
    )

    const columns = [
        {
            title: FilterByNameInput,
            dataIndex: 'Country'
        },
        {
            title: 'Total Cases',
            dataIndex: 'TotalConfirmed'
        },
        {
            title: 'New Cases',
            dataIndex: 'NewConfirmed'
        },
        {
            title: 'Total Deaths',
            dataIndex: 'TotalDeaths'
        },
        {
            title: 'New Deaths',
            dataIndex: 'NewDeaths'
        },
        {
            title: 'Total Recovered',
            dataIndex: 'TotalRecovered'
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
        <>
            <Table
                className=""
                columns={columns}
                dataSource={props.countries}
            />
        </>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(CountryTable);