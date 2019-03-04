import React, { Component } from 'react';

import dateFns from 'date-fns';


class Calender extends Component {
    state={
        currentMonth:new Date(),
        selectDate:new Date(),
        showDays:true,
        showMonth:false,
        showYear:false,
        currentYear : dateFns.format(new Date(), "YYYY") 
    }
    

    showMonth =()=>{
        this.setState({
            showDays:!this.state.showDays,
            showMonth:!this.state.showMonth
        })
    }
    renderMonths(){
        let showMonth =[];

        const MonthArr= ["Jan","Feb", "Mar" , "Apr", "May", "Jun", "Jul", "Aug","Sep","Oct","Nov","Dec" ];
        MonthArr.map((m,i) => {
            showMonth.push(
                <div className="col col-center" key={i}>
                    <button className="months-click"
                     onClick={(e)=>this.changeMonth(i,m)}>{m}</button>
                </div>
            )
            return null;
        })

        return(<div className="days row daysrender">{showMonth}</div>)
    }

    changeMonth(index, month){
        let changeTO = parseInt(index);  
        this.setState({
            currentMonth:dateFns.setMonth(this.state.currentMonth, changeTO),
            showDays:!this.state.showDays,
            showMonth:!this.state.showMonth


        })
        console.log(index,month);
    }
    showYear =()=>{
        this.setState({
            showDays:!this.state.showDays,
            showYear:!this.state.showYear
        })
    }
    renderYears(){
        
        let currentYear = this.state.currentYear;
        let EndYear = currentYear - 14 ;
        let showYear =[];
        let range = EndYear + " - " + currentYear ;

        for(let i = EndYear; i <= currentYear ; i++ ){
            showYear.push(
                <div className="col col-center"  key={i*8} >
                <button className="years-click"
                 onClick={(e)=>this.changeYear(i)}>
                        {i} 
                </button>
                </div>
            )
        }
        return(
        <div className="">
        <div className="header row ">
              <div className="col col-start">
                <div className="icon" onClick={this.prevYear}>
                  chevron_left
                </div>
              </div>
              <div className="col col-center">
                <div> {range} </div>
              </div>
              <div className="col col-end" onClick={this.nextYear}>
                <div className="icon">chevron_right</div>
              </div>
            </div>
        

        <div className="days row yearRender">{showYear} </div>

        </div>
        )
    }
    nextYear = () => {
        let res = dateFns.addYears(this.state.currentYear , 14) ;
        console.log(dateFns.format(res , "YYYY"));
        this.setState({
            currentYear:dateFns.format(res , "YYYY")
        })

    };
  
    prevYear = () => {
        let res = dateFns.subYears(this.state.currentYear , 14) ;
        console.log(dateFns.format(res , "YYYY"));
        this.setState({
            currentYear:dateFns.format(res , "YYYY")
        })


    };


    changeYear(year){
        
        this.setState({
            currentMonth:dateFns.setYear(this.state.currentMonth, year),
            showDays:!this.state.showDays,
            showYear:!this.state.showYear


        })
    }

    renderHeader() {
        const mFormat = "MMMM";
        const yFormat ="YYYY";
        return (
            <div className="header row flex-middle">
              <div className="col col-start">
                <div className="icon" onClick={this.prevMonth}>
                  chevron_left
                </div>
              </div>
              <div className="col col-center">
                <span className="hover" onClick={this.showMonth}>
                  {dateFns.format(this.state.currentMonth, mFormat)}
                </span>
                {" "}
                <span className="hover" style={{cursor:"pointer"}} onClick={this.showYear}>
                 {dateFns.format(this.state.currentMonth, yFormat)}
                </span>
              </div>
              <div className="col col-end" onClick={this.nextMonth}>
                <div className="icon">chevron_right</div>
              </div>
            </div>
          );


    }

    renderDays() {
        const dateFormat = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
          );
        }
        return <div className="days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              formattedDate = dateFns.format(day, dateFormat);
              let cloneDay = day;
              days.push(
                <div
                  className={`col cell ${
                    !dateFns.isSameMonth(day, monthStart)
                      ? "disabled"
                      : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={(e) => this.onDateClick(cloneDay)}
                >
                  <span className="number">{formattedDate}</span>
                  <span className="bg">{formattedDate}</span>
                </div>
              );
              day = dateFns.addDays(day, 1);
            }
            rows.push(
              <div className="row" key={day}>
                {days}
              </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }
    onDateClick = day => {
        this.setState({
            selectedDate: day
          });
          console.log(day);
          

    };

    nextMonth = () => {
        this.setState({
            currentMonth:dateFns.addMonths(this.state.currentMonth , 1)
        })

    };
  
    prevMonth = () => {
        this.setState({
            currentMonth:dateFns.subMonths(this.state.currentMonth , 1)
        })


    };
    render() { 
    
        
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.state.showDays ? this.renderDays() : "" }
                {this.state.showDays ? this.renderCells() : ""}
                {this.state.showMonth ? this.renderMonths() :''}
                {this.state.showYear ? this.renderYears() :'' }
            </div>
          );
    }
}

 
export default Calender;


