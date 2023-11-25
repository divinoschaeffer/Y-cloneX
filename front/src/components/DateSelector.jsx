import React, { useState } from 'react';

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear; i >= currentYear - 50; i--) {
    years.push(i);
  }
  return years;
};

const generateMonths = () => {
  return Array.from({ length: 12 }, (_, index) => index + 1);
};

const generateDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, index) => index + 1);
};

const DateSelector = ({selectedDay, selectedMonth, selectedYear, setSelectedDay, setSelectedMonth, setSelectedYear}) => {

  const years = generateYears();
  const months = generateMonths();
  const days = generateDays(selectedYear, selectedMonth);

  return (
    <div className='flex flex-row space-x-3'>
      <div className="flex flex-col w-1/2 border rounded px-2 ">
        <label className='text-sm text-gray-500'>Année</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className=''>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      
      <div className='flex flex-col w-1/4 border rounded px-2 '>
        <label className='text-sm text-gray-500'>Mois</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      
      <div className='flex flex-col w-1/4 border rounded px-2 '>
        <label className='text-sm text-gray-500'>Jour</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(parseInt(e.target.value))}>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
}

export default DateSelector;
