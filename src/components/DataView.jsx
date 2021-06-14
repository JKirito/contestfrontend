import axios from 'axios'
import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'

function DataView() {
    const [tableData, setTableData] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/logs/byorder').then(res => {
            setTableData(res.data);
        }).catch(err => console.error(err))
    }, [])

    const convertToValidDate = (data) => {
        let d = data.split("T")
        let z = d[1].split(".")
        let res = d[0] + " " + z[0];
        return res
    }

    return (
        <div>
            <Link to='/'>Back To Home</Link>
            <table>
                <tbody>
                    <tr>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Description</th>
                    </tr>
                    {
                        tableData && tableData.map((el, index) => {
                            return <tr key={index}>
                                <td>{convertToValidDate(el.starttime)}</td>
                                <td>{convertToValidDate(el.endtime)}</td>
                                <td>{el.description}</td>
                            </tr>
                        })
                    }
                </tbody>

            </table>
        </div>
    )
}

export default DataView
