import React, { useState, useEffect } from 'react';
import { getAllCountries } from 'api';
import { Col, Row, Select, Table } from 'antd';
import { connect } from 'react-redux';


const CountryTable = (props) => {
    const [tableData, setTableData] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(undefined);

    const fetchData = async() => {
        setCountryList(await getAllCountries());
        setTableData(props.countries);
    }

    useEffect(() => {
        fetchData()
    }, [])

    const countrySelectOptions = countryList.map((country, i) => {
        return (
            <option key={i} value={country.Slug}>{country.Country}</option>
        )
    })

    const handleSelectCountry = async(slug) => {
        setSelectedCountry(slug);

        const data = props.countries.find(c => c.Slug === slug);
        data ? setTableData([data]) : setTableData([]);
    }

    const columns = [
        {
            title: 'Country',
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
        <Row type="flex">
            <Col span={24}>
                <div className="table">
                    <div className="search">
                        <Select
                            showSearch
                            className="search_box"
                            placeholder="Search Country..."
                            optionFilterProp="children"
                            onChange={(e) => handleSelectCountry(e)}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {countrySelectOptions}
                        </Select>
                        {selectedCountry ?
                            <span className="search_filter"
                                onClick={() => {
                                    setTableData(props.countries);
                                    setSelectedCountry(undefined);
                                }}
                            >
                                clear
                            </span>
                            :
                            ''
                        }
                    </div>

                    <Table
                        columns={columns}
                        dataSource={tableData}
                    />
                </div>
            </Col>
        </Row>
    )
}

// redux state and dispatch
const mapStateToProps = (state) => ({
    countries: state.summary.countries
})

export default connect(mapStateToProps, null)(CountryTable);