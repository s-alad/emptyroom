import React, { useEffect } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './components/dt/dt.css';
import './App.css';
import Header from './components/header/header';

import Data from './data/data.json';
import Info from './data/info.json';

import Classroom from './models/classroom';

import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { AnyARecord } from 'dns';


function App() {

  const [shownSchedules, setShownSchedules] = useState({});

  const toggleSchedules = (id:string) => {
    console.log('shown schedules')
    console.log(shownSchedules)
    setShownSchedules(prevShownComments => ({
      ...prevShownComments,
      [id]: !prevShownComments[id as keyof typeof prevShownComments]
    }));
  };

  let now = new Date();

  let days = ["X", "M", "T", "W", "R", "F", "S"];

  let [emptyClasses, setEmptyClasses] = useState<Classroom[]>([]);

  let [selectedTime, setSelectedTime] = useState<Date>(new Date());
  let [selectedDay, setSelectedDay] = useState<string>(days[new Date().getDay()]);
  let [selectedHour, setSelectedHour] = useState<string>(String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'));
  let [currentTag, setCurrentTag] = useState<string>('');

  let buildings = {
    "College of Arts & Sciences": "CAS",
    "Questrom": "HAR",
    "Yawkey": "YAW",
    "Mugar": "MUG",
    "School of Theology": "STH",
    "School of Social Work": "SSW",
    "Engineering Manufacturing Building": "EMB",
    "Metropolitan College": "MET",
    "Wheelock College of Education & Human Development": "WED",
    "College of Engineering": "ENG",
    "College of Communication": "COM",
    "College of Fine Arts": "CFA",
    "Kenmore Classroom Building": "KCB",
    "Math & Computer Science": "MCS",
    "Morse Auditorium": "MOR",
    "Medical Campus": "INS",
    "International Relations Building": "IRB",
    "Engineering Research Building": "ERB",
    "Editorial Institute Building": "EIB",
    "Law School": "LAW",
    "Sargent": "SAR",
    "Metcalf Science Center": 'SCI',
    "Physics Research Building": 'PRB',
    "Psychological & Brain Sciences": 'PSY',
    "Life Science & Engineering Building": 'LSE',
    "English Faculty offices": "EGL",
    'African American Studies': 'AAS',
    'Sociology': 'SOC',
    "Engineering Research Annex": 'ERA',
    "Biological Science Center": 'BSC',
    'Photonics Building': 'PHO',
    "CAS Religion": 'REL',
    'College of General Studies': 'CGS',
    "Modern Foreign Languages": 'LNG',
    "Fuller Building": 'FLR',
    'Biology Research Building': 'BRB',
    'International Education Center': 'IEC',
    'Booth Theatre Arts Building': "THA",
    'International Relations Center': 'IRC',
    "Kilachand Honors College": 'KHC',
    'School of Hospitality Administration': 'SHA',
    "Stone Science Building": 'STO',
    'Center for English Language': "EOP",
    'Playwrights’ Theatre': 'PTH',
    'Elie Wiesel Center for Jewish Studies': "JSC",
    "History and American Studies Departments": "HIS",
    "Engineering Manufacturing Annex": 'EMA',
    "Anthropology, Philosophy, Political Science": "PLS",
    "Engineering Product Innovation Center (EPIC)": 'EPC'

  };

  function createTime(time: Date) {

    console.log('create time =====')

    console.log(time)
    console.log(time.getDay())
    let day = days[time.getDay()];
    let hour = String(time.getHours()).padStart(2, '0') + ':' + String(time.getMinutes()).padStart(2, '0');
    console.log(hour)
    setSelectedDay(day);
    setSelectedHour(hour);
    setSelectedTime(time);

    console.log('updating')
    console.log(currentTag)
    if (currentTag !== '') {
      fetchClasses(currentTag);
    }

  }

  useEffect(() => {
    console.log('use effect')
    console.log(currentTag)
    if (currentTag !== '') {
      fetchClasses(currentTag);
    }
  }, [selectedTime, selectedDay, selectedHour, currentTag]);

  function fetchClasses(tag: string) {

    console.log('fetching classes =====')

    setCurrentTag(tag);

    console.log('--- selected time ---');
    console.log(selectedHour);
    console.log(selectedDay);

    setEmptyClasses([]);

    let today = selectedDay;
    let current_time = selectedHour/* d.getHours()+":"+d.getMinutes() */ /* "12:00" */;


    let rooms = Info[tag as keyof typeof Info];
    for (let room of Object.entries(rooms)) {

      let roomnumber = room[0];
      let roomtimes = room[1];

      let classroom = new Classroom(roomnumber);

      console.log('--- ' + roomnumber + ' ---');
      for (let roomtime of roomtimes) {

        if (roomtime.days.includes(today)) {
          if (current_time > roomtime.start_army && current_time < roomtime.end_army) {
            console.log(current_time + ' is between ' + roomtime.start_army + ' and ' + roomtime.end_army);
            console.log("classroom is occupied");
            classroom.avaliable = false;
          }

          classroom.addStartInterval(roomtime.start_army);
          classroom.addEndInterval(roomtime.end_army);
          classroom.addInterval([roomtime.start_army, roomtime.end_army]);
        }

        console.log(roomtime);
      }
      console.log('--- intervals')

      classroom.sortIntervals();
      console.log(classroom.startIntervals);
      console.log(classroom.endIntervals);
      classroom.setUntil(current_time);
      console.log(classroom.until);

      setEmptyClasses(previous => [...previous, classroom]);
      console.log('---');
    }
    for (let classroom of emptyClasses) {
      console.log(classroom.roomnumber + " " + classroom.avaliable);
    }
  }

  return (
    <div className="App">
      <Header />

      <div className='main'>
        <div className='selector-bar'>
          <div className='datetime'>
            <div>
              {/* add custom class to datetimepicker */}
              <DateTimePicker
                calendarClassName={'calendar'}
                className={'datetimepicker'}
                onChange={(val) => { createTime(val) }} value={selectedTime}
                disableClock={true}
                clearIcon={null}

              />
            </div>
          </div>
          <div className='buildings'>
            {
              Object.entries(buildings).map(([building_name, tag]) => {
                return (
                  <div className='selections' key={tag}>
                    <div className='building-select' onClick={() => { fetchClasses(tag) }}>{building_name}</div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className='classes'>
          <div className='list'>
            {
              emptyClasses.sort((a, b) => (a.avaliable == false) ? 1 : -1).map((v: Classroom) => {
                console.log("!!!!!!!!!!!!!!" + v.getIntervals());
                return <div className='class' key={v.roomnumber}>
                  <div className='class-details'>
                    {
                      v.avaliable ?
                        <div className='clas-header'>
                          <h2 className='class-name green'>{v.roomnumber}</h2>
                          <h4> is currently avaliable {v.getUntil()}</h4>
                        </div>
                        :
                        <div className='clas-header'>
                          <h2 className='class-name'>{v.roomnumber}</h2>
                          <h4> is not avaliable {v.getUntil()}</h4>
                        </div>
                    }
                    <div className='space'></div>
                    <a target='blank' href={`https://www.bu.edu/classrooms/classroom/${v.roomnumber.toLowerCase().replace(' ', '-')}/`}><div className='info'>room info</div></a>
                    {
                      <div className='expand' onClick={() => toggleSchedules(v.roomnumber)}>
                        {
                          shownSchedules[v.roomnumber as keyof {}] ?
                          'hide schedule' : 'show schedule'
                        }
                      </div>
                    }
                  </div>
                  {
                    //if dropdown then show
                    shownSchedules[v.roomnumber as keyof {}] ?
                      <div className='scaledown'>
                        <Paper>
                          <Scheduler
                            data={v.getSchedule(selectedTime)}
                          >
                            <ViewState
                              currentDate={selectedTime}
                            />
                            <DayView
                              startDayHour={9}
                              endDayHour={22}
                            />
                            <Appointments />
                          </Scheduler>
                        </Paper>
                      </div>
                      :
                      ''
                  }

                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
