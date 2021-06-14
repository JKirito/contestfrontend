import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';

function Home() {
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [EndDate, setEndDate] = useState(null)
    const [description, setDescription] = useState(null);
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }
    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value)
    }
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value)
    }
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const toValidDate = () => {
        let s_date = startDate.split('-');
        let s_time = startTime.split(':');
        let e_date = EndDate.split('-');
        let e_time = endTime.split(':');
        const d1 = new Date(s_date[0], s_date[1], s_date[2], s_time[0], s_time[1])
        const d2 = new Date(e_date[0], e_date[1], e_date[2], e_time[0], e_time[1])
        return {
            starttime: parseInt(d1.getTime() / 1000),
            endtime: parseInt(d2.getTime() / 1000),
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (startTime && endTime && startDate && EndDate && description && startDate < EndDate) {
            // console.log(`All Set ${startTime} ${startDate}`);
            let data = toValidDate();
            axios.post('http://localhost:3001/api/v1/logs/', {
                starttime: data.starttime,
                endtime: data.endtime,
                description: description,
            }).then((res) => {
            }).catch(err => console.error(err));
        } else {
            alert(`Wrong Information Is Feeded`)
        }
    }
    return (
        <React.Fragment>
            <div className='container'>
                <div className='left'>
                    <form className='left_container'>
                        <div>
                            <div className='row'>
                                <div className='gap'>
                                    <div className='heads'>Start Date</div>
                                    <input type="date" onChange={handleStartDateChange} />
                                </div>
                                <div className='gap'>
                                    <div className='heads'>Start Time</div>
                                    <input type="time" onChange={handleStartTimeChange} id="st" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='gap'>
                                    <div className='heads'>End Date</div>
                                    <input type="date" onChange={handleEndDateChange} />
                                </div>
                                <div className='gap'>
                                    <div className='heads'>End Time</div>
                                    <input type="time" onChange={handleEndTimeChange} id="ed" />
                                </div>
                            </div>
                        </div>
                        <div className='middle'>
                            <textarea placeholder='Desciption Goes Here...' onChange={handleDescription}></textarea>
                        </div>
                        <div className='end'>
                            <input type="submit" onClick={handleSubmit} value="Create Log" />
                            <Link to='/dataview' style={{ color: "white", marginLeft: "4px" }}>View Data</Link>
                        </div>
                    </form>
                </div>
                <div className='right'>
                    <div className='clock_container'>
                        <div className='clock_flex'>
                            <div className='flex_end'>
                                <span>10:30</span>
                                <p className='sub'>AM</p>
                            </div>
                            <p className='sub'>2, Thursday, 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home
