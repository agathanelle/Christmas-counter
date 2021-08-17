var Christmas;
var today, nowYear, nowMonth, nowDay;
var hasDateChanged = false;
function checkYear()
{
    var tag = document.getElementById('timer');
    $(tag).text("");
    if(!hasDateChanged) today = new Date();
    nowYear = today.getFullYear();
    nowMonth = today.getMonth();
    nowDay = today.getDate();

    if(nowMonth==11 && nowDay>24) Christmas = new Date(nowYear+1,11,25,0,0,0,0);
    else Christmas = new Date(nowYear,11,25,0,0,0,0);

    if(nowMonth==11 && nowDay == 25) $(tag).text("Today is Christmas!");
    if(nowMonth==11 && nowDay == 24) $(tag).text("Today is Christmas Eve!");
    
}

function changeTodaysDay()
{
    var newDay = document.getElementById('day').value;
    var newMonth = document.getElementById('month').value;
    var newYear = document.getElementById('year').value;

    if(!checkInt(newDay))
    {
        alert("Wrong written day");
        return;
    }
    if(!checkInt(newMonth))
    {
        alert("Wrong written month");
        return;
    }
    if(!checkInt(newYear))
    {
        alert("Wrong written year");
        return;
    }

    newDay = parseInt(newDay);
    newMonth = parseInt(newMonth)-1;
    newYear = parseInt(newYear);

    var checkFebruary = isLeapYear(newYear);
    console.log(checkFebruary);
    if(newMonth < 0 || newMonth > 11)
    {
        alert("Wrong written month. Write from 1 to 12");
        return;
    }

    if(newDay < 0 || newDay > 31)
    {
        alert("Wrong written month. Write from 1 to 31");
        return;
    }
    if(newMonth==1 && checkFebruary < newDay)
    {
        alert("February do not have " + newDay + " days. Choose day from 1 to "+ checkFebruary);
        return;
    }
    if((newMonth==3 || newMonth==5 || newMonth==8 || newMonth==10)&&newDay>30)
    {
        alert("Your written month do not have " + newDay+" days");
        return;
    }
    
    today = new Date(newYear, newMonth, newDay, 0, 0, 0, 0);
    hasDateChanged = true;
}

function isLeapYear(value)
{
    if(value%400==0) return 29; // century leap year like 2000 or 1600 (1700 is not leap year, yet can devide by 4)
    else if(value%100!=0 && value%4 == 0) return 29; //leap year, but not century one, like 2020
    else return 28;
}

function checkInt(value)
{
    if(parseInt(value)>0) return true;
    else return false;
}

var timer = setInterval(function()
{
    var tag = document.getElementById('timer');
    checkYear();
    if($(tag).text().indexOf("Today")==-1)
    {
        var daysLeft = Christmas.getTime() - today.getTime();
        var days = Math.trunc(daysLeft/(1000*3600*24));
        var hours = Math.trunc((daysLeft%(1000*3600*24))/(1000*3600));
        var minutes = Math.trunc((daysLeft%(1000*3600))/(1000*60));
        var seconds = Math.trunc((daysLeft%(1000*60))/1000);
        if(hasDateChanged) $(tag).text(days+ " days left!");
        else $(tag).text(days+ " days  "+ hours+" hours " + minutes + " minutes and "+ seconds+" seconds left!");
    }
}, 1000);