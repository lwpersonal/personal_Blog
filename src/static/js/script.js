/*
 * @Author: AI 
 * @Date: 2017-04-06 13:51:58 
 * @Last Modified by: AI
 * @Last Modified time: 2017-06-08 21:01:14
 */
const judgeBrowser = () => {
  /**
   * @description 检测浏览器及版本号
   * 
   */
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]:
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

  if (Sys.ie) return {
    type: 'IE',
    version: Sys.ie
  };
  if (Sys.firefox) return {
    type: 'Firefox',
    version: Sys.firefox
  };
  if (Sys.chrome) return {
    type: 'Chrome',
    version: Sys.chrome
  };
  if (Sys.opera) return {
    type: 'Opera',
    version: Sys.opera
  };
  if (Sys.safari) return {
    type: 'Safari',
    version: Sys.safari
  };
}

const getDate = (() => {
  var now = new Date(); //当前日期   
  var nowDayOfWeek = now.getDay(); //今天本周的第几天   
  var nowDay = now.getDate(); //当前日   
  var nowMonth = now.getMonth(); //当前月   
  var nowYear = now.getYear(); //当前年   
  nowYear += (nowYear < 2000) ? 1900 : 0; //  

  var lastMonthDate = new Date(); //上月日期   
  lastMonthDate.setDate(1);
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
  var lastYear = lastMonthDate.getYear();
  var lastMonth = lastMonthDate.getMonth();

  //格局化日期：yyyy-MM-dd   
  function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear  + mymonth + myweekday);
  }

  //获得某月的天数   
  function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
  }

  //获得本季度的开端月份   
  function getQuarterStartMonth() {
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
      quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
      quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
      quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  }

  //获得本周的开端日期   
  function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
    return formatDate(weekStartDate);
  }

  //获得本周的停止日期   
  function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
    return formatDate(weekEndDate);
  }

  //获得本月的开端日期   
  function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
  }

  //获得本月的停止日期   
  function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return formatDate(monthEndDate);
  }

  //获得上月开端时候   
  function getLastMonthStartDate() {
    var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
    return formatDate(lastMonthStartDate);
  }

  //获得上月停止时候   
  function getLastMonthEndDate() {
    var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
    return formatDate(lastMonthEndDate);
  }

  //获得本季度的开端日期   
  function getQuarterStartDate() {

    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    return formatDate(quarterStartDate);
  }

  //获得本季度的停止日期   
  function getQuarterEndDate() {
    var quarterEndMonth = getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    return formatDate(quarterStartDate);
  }
  return {
    getQuarterEndDate,
    getQuarterStartDate,
    getLastMonthEndDate,
    getLastMonthStartDate,
    getMonthEndDate,
    getMonthStartDate,
    getWeekEndDate,
    getWeekStartDate,
    getQuarterStartMonth
  }
})();

function urlParam(name) {
    var Reg = new RegExp(name + '=[\\d,a-z]*', 'i');
    var reg_1 = new RegExp(name + "=", "i");
    return Reg.exec(window.location.href)[0].replace(reg_1, "");
}

export {
  judgeBrowser,
  getDate,
  urlParam
}
