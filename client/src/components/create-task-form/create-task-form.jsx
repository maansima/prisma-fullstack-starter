// import * as React from "react"
// import gql from "graphql-tag"
// import ReactDOM from "react-dom"
// import { Mutation } from "react-apollo"
// import { SingleDatePicker } from "react-dates"

// import moment from "../../utils/moment"

// const CREATE_TASK = gql`
//   mutation createTask($text: String!, $dueDate: DateTime!) {
//     createTask(text: $text, dueDate: $dueDate) {
//       text
//       dueDate
//       author {
//         id
//         name
//         email
//       }
//     }
//   }
// `
// ;("use strict")

// const Heading = ({ date, changeMonth, resetDate }) => (
//   <nav className="calendar--nav">
//     <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
//     <h1 onClick={() => resetDate()}>
//       {date.format("MMMM")} <small>{date.format("YYYY")}</small>
//     </h1>
//     <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
//   </nav>
// )

// const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
//   let className = []

//   if (moment().isSame(date, "day")) {
//     className.push("active")
//   }

//   if (date.isSame(startDate, "day")) {
//     className.push("start")
//   }

//   if (date.isBetween(startDate, endDate, "day")) {
//     className.push("between")
//   }

//   if (date.isSame(endDate, "day")) {
//     className.push("end")
//   }

//   if (!date.isSame(currentDate, "month")) {
//     className.push("muted")
//   }

//   return (
//     <span
//       onClick={() => onClick(date)}
//       currentDate={date}
//       className={className.join(" ")}
//     >
//       {date.date()}
//     </span>
//   )
// }

// const Days = ({ date, startDate, endDate, onClick }) => {
//   const thisDate = moment(date)
//   const daysInMonth = moment(date).daysInMonth()
//   const firstDayDate = moment(date).startOf("month")
//   const previousMonth = moment(date).subtract(1, "month")
//   const previousMonthDays = previousMonth.daysInMonth()
//   const nextsMonth = moment(date).add(1, "month")
//   let days = []
//   let labels = []

//   for (let i = 1; i <= 7; i++) {
//     labels.push(
//       <span className="label">
//         {moment()
//           .day(i)
//           .format("ddd")}
//       </span>
//     )
//   }

//   for (let i = firstDayDate.day(); i > 1; i--) {
//     previousMonth.date(previousMonthDays - i + 2)

//     days.push(
//       <Day
//         key={moment(previousMonth).format("DD MM YYYY")}
//         onClick={date => onClick(date)}
//         currentDate={date}
//         date={moment(previousMonth)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     )
//   }

//   for (let i = 1; i <= daysInMonth; i++) {
//     thisDate.date(i)

//     days.push(
//       <Day
//         key={moment(thisDate).format("DD MM YYYY")}
//         onClick={date => onClick(date)}
//         currentDate={date}
//         date={moment(thisDate)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     )
//   }

//   const daysCount = days.length
//   for (let i = 1; i <= 42 - daysCount; i++) {
//     nextsMonth.date(i)
//     days.push(
//       <Day
//         key={moment(nextsMonth).format("DD MM YYYY")}
//         onClick={date => onClick(date)}
//         currentDate={date}
//         date={moment(nextsMonth)}
//         startDate={startDate}
//         endDate={endDate}
//       />
//     )
//   }

//   return (
//     <nav className="calendar--days">
//       {labels.concat()}
//       {days.concat()}
//     </nav>
//   )
// }

// class Calendar extends React.Component {
//   constructor(props) {
//     super(props)

// class CreateTaskForm extends React.Component {
//   state = {
//     date: moment(),
//     focused: true,
//     text: ""
//   }
//   render() {
//     let input

//     return (
//       <div>
//         <Mutation mutation={CREATE_TASK}>
//           {(createTask, { data }) => {
//             return (
//               <div>
//                 <form
//                   onSubmit={async e => {
//                     e.preventDefault()
//                     await createTask({
//                       variables: {
//                         text: this.state.text,
//                         dueDate: this.state.date.format()
//                       }
//                     })
//                     this.props.refetchFeedTasks()
//                   }}
//                 >
//                   <input
//                     placeholder="Type your task here!"
//                     className="newtaskinput"
//                     onChange={e => this.setState({ text: e.target.value })}
//                   />
//                   <SingleDatePicker
//                     date={this.state.date}
//                     onDateChange={date => this.setState({ date })}
//                     focused={this.state.focused}
//                     onFocusChange={({ focused }) => this.setState({ focused })}
//                     id="date-picker"
//                   />

//                   <button type="submit" className="newtaskbutton">
//                     Create Task
//                   </button>
//                 </form>
//               </div>
//             )
//           }}
//         </Mutation>
//       </div>
//     )
//   }
// }

// export default CreateTaskForm
import * as React from "react"
import gql from "graphql-tag"
import ReactDOM from "react-dom"
import { Mutation } from "react-apollo"
import { SingleDatePicker } from "react-dates"

import moment from "../../utils/moment"

const CREATE_TASK = gql`
  mutation createTask($text: String!, $dueDate: DateTime!) {
    createTask(text: $text, dueDate: $dueDate) {
      text
      dueDate
      author {
        id
        name
        email
      }
    }
  }
`

class CreateTaskForm extends React.Component {
  state = {
    date: moment(),
    focused: true,
    text: ""
  }
  render() {
    let input

    return (
      <div>
        <Mutation mutation={CREATE_TASK}>
          {(createTask, { data }) => {
            return (
              <div>
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    await createTask({
                      variables: {
                        text: this.state.text,
                        dueDate: this.state.date.format()
                      }
                    })
                    this.props.refetchFeedTasks()
                  }}
                >
                  <input
                    placeholder="Type your task here!"
                    className="newtaskinput"
                    onChange={e => this.setState({ text: e.target.value })}
                  />
                  <SingleDatePicker
                    date={this.state.date}
                    onDateChange={date => this.setState({ date })}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    id="date-picker"
                  />
                  <button type="submit" className="newtaskbutton">
                    Create Task
                  </button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default CreateTaskForm
