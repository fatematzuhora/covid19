import React from 'react';

const GlobalData = (props) => {
    const { data } = props;

    return (
        <div className="globalData">
            <p>
                Confirmed: {data.TotalConfirmed}<br/>
                + {data.NewConfirmed}
            </p>
            <p>
                Recovered: {data.TotalRecovered}<br/>
                + {data.NewRecovered}
            </p>
            <p>
                Deaths: {data.TotalDeaths}<br/>
                + {data.NewDeaths}
            </p>
        </div>
    )
}

export default GlobalData;