import React from 'react'
import './index.scss'

class Calendar extends React.Component {

  render() {
    const { calendarList, currMonth, engMonth } = this.props

    return (
      <div className="calendar-container">
        <div className={`banner month-${currMonth}`}>
          <p><b>{currMonth}</b>月</p>
          <span>{engMonth}</span>
        </div>
        <div className="calendar-wrap">
          {
            calendarList.map(calendar => 
              <p
                key={calendar.week}
                className={`${calendar.hasCourse ? 'active' : ''} ${calendar.weekend ? 'weekend' : ''}`}>
                <b>{calendar.weekStr}</b>
                <span className={`${calendar.currentDay ? 'active' : ''}`}>{calendar.date}</span>
              </p>
            )
          }
        </div>
      </div>
    )
  }
}

export default Calendar