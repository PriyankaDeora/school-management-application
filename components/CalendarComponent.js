"use client";

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className='flex flex-col gap-5 justify-center items-center mx-auto mt-52 bg-white p-10 rounded-lg'>
      <h1 className='text-xl font-bold'>Calendar</h1>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default CalendarComponent;

