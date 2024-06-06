import {
  faCalendar,
  faUniversity,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import NavbarRes from "../navbar/NavbarRes";
import Chart from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { useStateValue } from "../../StateProvider";
// import { cloneData } from "react-chartjs-2/dist/utils";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [college, setCollege] = useState("");
  const [count, setCount] = useState(0);
  const [eventHeld, setEventHeld] = useState(0);
  const [time, setTime] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [event, setEvent] = useState([]);
  const [jan, setJan] = useState(0);
  const [janHr, setJanHr] = useState(0);
  const [janAvgHr, setJanAvgHr] = useState(0);
  const [feb, setFeb] = useState(0);
  const [febHr, setFebHr] = useState(0);
  const [febAvgHr, setFebAvgHr] = useState(0);
  const [march, setMarch] = useState(0);
  const [marchHr, setMarchHr] = useState(0);
  const [marchAvgHr, setMarchAvgHr] = useState(0);
  const [april, setApril] = useState(0);
  const [aprilHr, setAprilHr] = useState(0);
  const [aprilAvgHr, setAprilAvgHr] = useState(0);
  const [may, setMay] = useState(0);
  const [mayHr, setMayHr] = useState(0);
  const [mayAvgHr, setMayAvgHr] = useState(0);
  const [june, setJune] = useState(0);
  const [juneHr, setJuneHr] = useState(0);
  const [juneAvgHr, setJuneAvgHr] = useState(0);
  const [july, setJuly] = useState(0);
  const [julyHr, setJulyHr] = useState(0);
  const [julyAvgHr, setJulyAvgHr] = useState(0);
  const [august, setAugust] = useState(0);
  const [augustHr, setAugustHr] = useState(0);
  const [augustAvgHr, setAugustAvgHr] = useState(0);
  const [sept, setSept] = useState(0);
  const [septHr, setSeptHr] = useState(0);
  const [septAvgHr, setSeptAvgHr] = useState(0);
  const [oct, setOct] = useState(0);
  const [octHr, setOctHr] = useState(0);
  const [octAvgHr, setOctAvgHr] = useState(0);
  const [nov, setNov] = useState(0);
  const [novHr, setNovHr] = useState(0);
  const [novAvgHr, setNovAvgHr] = useState(0);
  const [dec, setDec] = useState(0);
  const [decHr, setDecHr] = useState(0);
  const [decAvgHr, setDecAvgHr] = useState(0);

  const [userError, setUserError] = useState(null);
const [collegesError, setCollegesError] = useState(null);
const [eventsError, setEventsError] = useState(null);
const [isLoadingUser, setIsLoadingUser] = useState(false);
const [isLoadingColleges, setIsLoadingColleges] = useState(false);
const [isLoadingEvents, setIsLoadingEvents] = useState(false);



  const [{ allEventsData, allUsers, colleges }, dispatch] = useStateValue();
  // const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // console.log(arr.length)

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
      },
    },
    ticks: {
      stepSize: 1,
    },
  };
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "#E74646",
          "#77037B",
          "#210062",
          "#009FBD",
          "#FF6000",
          "#4F200D",
          "#CE5959",
          "#A4BC92",
          "#BACDDB",
          "#675D50",
          "#B8621B",
          "#FFB4B4",
        ],
        // borderColor: "rgb(255, 99, 132)",
        data: [
          jan,
          feb,
          march,
          april,
          may,
          june,
          july,
          august,
          sept,
          oct,
          nov,
          dec,
        ],
      },
    ],
  };

  const data1 = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "#E74646",
          "#77037B",
          "#210062",
          "#009FBD",
          "#FF6000",
          "#4F200D",
          "#CE5959",
          "#A4BC92",
          "#BACDDB",
          "#675D50",
          "#B8621B",
          "#FFB4B4",
        ],
        // borderColor: "rgb(255, 99, 132)",
        data: [
          janHr,
          febHr,
          marchHr,
          aprilHr,
          mayHr,
          juneHr,
          julyHr,
          augustHr,
          septHr,
          octHr,
          novHr,
          decHr,
        ],
      },
    ],
  };

  let avgJan = Math.round(janAvgHr);
  let avgFeb = Math.round(febAvgHr);
  let avgMarch = Math.round(marchAvgHr);
  let avgApril = Math.round(aprilAvgHr);
  let avgMay = Math.round(mayAvgHr);
  let avgJune = Math.round(juneAvgHr);
  let avgJuly = Math.round(julyAvgHr);
  let avgAugust = Math.round(augustAvgHr);
  let avgSept = Math.round(septAvgHr);
  let avgOct = Math.round(octAvgHr);
  let avgNov = Math.round(novAvgHr);
  let avgDec = Math.round(decAvgHr);

  const data2 = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          "#E74646",
          "#77037B",
          "#210062",
          "#009FBD",
          "#FF6000",
          "#4F200D",
          "#CE5959",
          "#A4BC92",
          "#BACDDB",
          "#675D50",
          "#B8621B",
          "#FFB4B4",
        ],
        // borderColor: "rgb(255, 99, 132)",
        data: [
          avgJan,
          avgFeb,
          avgMarch,
          avgApril,
          avgMay,
          avgJune,
          avgJuly,
          avgAugust,
          avgSept,
          avgOct,
          avgNov,
          avgDec,
        ],
      },
    ],
  };

  let today = new Date();
  // var count;
  // console.log(arr[3])
  var mon = new Date().getMonth() + 1;

  useEffect(() => {
    console.log(allEventsData, "dataaaaa");
    getUser();
    getColleges();
    getList();
  }, []);

  // const getUser = async () => {
  //   if (allUsers) {
  //     setUser(allUsers);
  //   } else {
  //     let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/get");
  //     result = await result.json();
  //     let array = [];
  //     // result.map((data) => {
  //     //   if (
  //     //     data.role == "Lead" ||
  //     //     data.role == "Admin" ||
  //     //     data.role == "Club_Member"
  //     //   ) {
  //     //     array.push(data);
  //     //   }
  //     // });
  //     result.forEach((data) => {
  //       if (data.role === "Lead" || data.role === "Admin" || data.role === "Club_Member") {
  //         array.push(data);
  //       }
  //     });
  //     //setUser(array);
  //     dispatch({
  //       type: "INIT_ALL_USERS",
  //       item: array,
  //     });
  //   }
  // };
  const getUser = async () => {
    setIsLoadingUser(true); // Start loading
    setUserError(null); // Reset error state
  
    try {
      let result;
      if (allUsers) {
        result = allUsers;
      } else {
        const response = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/get");
        result = await response.json();
        if (response.ok) {
          let array = result.filter(data =>
            ["Lead", "Admin", "Club_Member"].includes(data.role)
          );
          dispatch({
            type: "INIT_ALL_USERS",
            item: array,
          });
        } else {
          throw new Error('Failed to fetch users');
        }
      }
      setUser(result);
    } catch (error) {
      setUserError(error.message); // Set error message
    } finally {
      setIsLoadingUser(false); // End loading
    }
  };
  

  const getColleges = async () => {
    if (!colleges) {
      console.log("collegeeegegegege-------");
      const data = await fetch(`https://club-community-feedbox2-0-sdcn.vercel.app/colleges/get`);
      const res = await data.json();
      // let val = [];
      // res.map((data) => {
      //   val.push(data.name);
      // });
      let val = res.map((data) => data.name);
      console.log(val,"vllvl");
      dispatch({
        type: "INIT_CLG_ARR",
        item: val,
      });
      setCollege(val.length)
    }else{
      console.log(colleges,"clgs");
      setCollege(colleges.length)
    }
  };
  // console.log(user)

  const getList = async (e) => {
    let res;
    if (allEventsData) {
      res = allEventsData;
    } else {
      let result = await fetch("https://club-community-feedbox2-0-sdcn.vercel.app/getAllEvent");
      res = await result.json();
    }
    // await e.preventDefault();
    //  console.log(Number(result[0].eventDate.slice(5,7)))
    //  console.log(mon)
    // var count;
    let month = 0;
    // let a,b,c,d,ee,f,g,h,i,j,k,l;
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let ee = 0;
    let f = 0;
    let g = 0;
    let h = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let l = 0;
    let a1 = 0;
    let b1 = 0;
    let c1 = 0;
    let d1 = 0;
    let ee1 = 0;
    let f1 = 0;
    let g1 = 0;
    let h1 = 0;
    let i1 = 0;
    let j1 = 0;
    let k1 = 0;
    let l1 = 0;
    let a2 = 0;
    let b2 = 0;
    let c2 = 0;
    let d2 = 0;
    let ee2 = 0;
    let f2 = 0;
    let g2 = 0;
    let h2 = 0;
    let i2 = 0;
    let j2 = 0;
    let k2 = 0;
    let l2 = 0;
    res.map((item) => {
      month = Number(item.eventDate.slice(5, 7));
      if (
        month === 1 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        a++;
        a1 = a1 + item.eventDuration / 60;
        a2 = a1 * 60;
      } else if (
        month === 2 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        b++;
        b1 = b1 + item.eventDuration / 60;
        b2 = b1 * 60;
      } else if (
        month === 3 &&
        today.getDate() < Number(item.eventDate.slice(8, 10))
      ) {
        c++;
        c1 = c1 + item.eventDuration / 60;
        c2 = c1 * 60;
      } else if (
        month === 4 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        d++;
        d1 = d1 + item.eventDuration / 60;
        d2 = d1 * 60;
      } else if (
        month === 5 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        ee++;
        ee1 = ee1 + item.eventDuration / 60;
        ee2 = ee1 * 60;
      } else if (
        month === 6 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        f++;
        f1 = f1 + item.eventDuration / 60;
        f2 = f1 * 60;
      } else if (
        month === 7 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        g++;
        g1 = g1 + item.eventDuration / 60;
        g2 = g1 * 60;
      } else if (
        month === 8 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        h++;
        h1 = h1 + item.eventDuration / 60;
        h2 = h1 * 60;
      } else if (
        month === 9 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        i++;
        i1 = i1 + item.eventDuration / 60;
        i2 = i1 * 60;
      } else if (
        month === 10 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        j++;
        j1 = j1 + item.eventDuration / 60;
        j2 = j1 * 60;
      } else if (
        month === 11 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        k++;
        k1 = k1 + item.eventDuration / 60;
        k2 = k1 * 60;
      } else if (
        month === 12 &&
        today.getDate() > Number(item.eventDate.slice(8, 10))
      ) {
        l++;
        l1 = l1 + item.eventDuration / 60;
        l2 = l1 * 60;
      }
    });

    setJan(a);
    setJanHr(a1);
    setJanAvgHr(a2);
    setFeb(b);
    setFebHr(b1);
    setFebAvgHr(b2);
    setMarch(c);
    setMarchHr(c1);
    setMarchAvgHr(c2);
    setApril(d);
    setAprilHr(d1);
    setAprilAvgHr(d2);
    setMay(ee);
    setMayHr(ee1);
    setMayAvgHr(ee2);
    setJune(f);
    setJuneHr(f1);
    setJuneAvgHr(f2);
    setJuly(g);
    setJulyHr(g1);
    setJulyAvgHr(g2);
    setAugust(h);
    setAugustHr(h1);
    setAugustAvgHr(h2);
    setSept(i);
    setSeptHr(i1);
    setSeptAvgHr(i2);
    setOct(j);
    setOctHr(j1);
    setOctAvgHr(j2);
    setNov(k);
    setNovHr(k1);
    setNovAvgHr(k2);
    setDec(l);
    setDecHr(l1);
    setDecAvgHr(l2);

    let counter = 0;
    let pastEvent = 0;
    let eventHr = 0;

    let average = 0;

    // console.log(Number(result[7].eventDate.slice(8,10))
    res.map((item) => {
      if (
        today.getFullYear() <= Number(item.eventDate.slice(0, 4)) &&
        mon <= Number(item.eventDate.slice(5, 7)) &&
        today.getDate() <= Number(item.eventDate.slice(8, 10))
      ) {
        counter++;
        // console.log(counter)
      } else {
        pastEvent++;
        eventHr = eventHr + item.eventDuration / 60;
        // console.log(eventHr)
        average = eventHr * 60;
      }
    });

    setCount(counter);
    setEventHeld(pastEvent);
    setEvent(res);
    setTime(eventHr);
    setAverageTime(average);
    // console.log(counter)
  };

  let averageHourStudied = Math.round(averageTime);

  return (
    <div>
      <div className=" m-auto">
        <div className="flex lg:mt-4 lg:ml-4 mt-2 ml-1">
          {/* <p className="ml-2 text-[1.5rem] font-[700] mb-0">Dashboard</p> */}
        </div>

        <div className=" flex flex-wrap justify-around lg:flex md:flex-row flex-col">
          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-blue-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-blue-800"
                icon={faUserGroup}
              />
            </div>
            <div className=" flex flex-col m-2 pl-3">
              <h6 className="pt-1 text-[1rem] font-[700] md:text-[1rem]  m-0 pb-0 ">
                Total Students:
              </h6>
              <p className=" text-[1.5rem] font-[700] p-0 relative bottom-2">
              {user.length > 0 ? user.length : 0}
              </p>
            </div>
          </div>

          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-green-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-green-800"
                icon={faUniversity}
              />
            </div>
            <div className=" flex flex-col m-2 pl-3">
              <h6 className="pt-1 text-[1rem] font-[700] md:text-[1rem]  m-0 pb-0 ">
                Total Colleges:
              </h6>
              <p className="text-[1.5rem] font-[700] p-0 relative bottom-2">
                {college && college  ? college : 0}
              </p>
            </div>
          </div>

          <div className="flex mt-2 lg:mt-0 w-[100%] md:w-[33%] lg:w-[30%] rounded shadow-sm h-[80px] ">
            <div className=" w-[50px] h-[50px] mt-3  ml-3 rounded bg-red-200">
              <FontAwesomeIcon
                className="w-[30px] h-[30px] m-2.5 text-red-800"
                icon={faCalendar}
              />
            </div>

            <div className=" flex flex-col m-2 pl-3">
              <h6 className="pt-1 text-[1rem] font-[700] md:text-[1rem]  m-0 pb-0 ">
                Upcoming Events:
              </h6>
              <p className="text-[1.5rem] font-[700] p-0 relative bottom-2">
                {count}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap justify-around">
          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2">
            <Bar width={300} height={300} data={data} options={options} />
            <div className="m-3">
              <h5 className="pt-1 text-[1rem] font-[700] md:text-[1rem]  m-0 pb-0">
                Total Number of events held:
              </h5>
              <p className="  mt-1 text-[1.5rem] font-[700] p-0 relative bottom-2">
                {eventHeld}
              </p>
            </div>
          </div>

          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2">
            <Line width={300} height={300} data={data1} options={options} />
            <div className="m-3">
              <h5 className="pt-1 text-[1rem] font-[700] md:text-[1rem] m-0 pb-0">
                Total Number of hours events held:
              </h5>
              <p className=" mt-1 text-[1.5rem] font-[700] p-0 relative bottom-2">
                {time} hrs
              </p>
            </div>
          </div>

          <div className="w-[320px] md:w-[300px] m-3 rounded-md shadow-md p-2">
            <Doughnut width={300} height={300} data={data2} />
            <div className="m-3">
              <h5 className="pt-1 text-[1rem] font-[700] md:text-[1rem] m-0 pb-0 ">
                Total Number of hours student studied:
              </h5>
              <p className=" mt-1 text-[1.5rem] font-[700] p-0 relative bottom-2">
                {averageHourStudied} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
