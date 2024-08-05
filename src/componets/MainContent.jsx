import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import moment from "moment";
import "moment/dist/locale/ar";
import { useState, useEffect } from "react";
import { margin } from "@mui/system";

moment.locale("ar");
export default function MainContent() {
  const [nextPrayerIndex, seNextPrayerIndex] = useState(1);
  //Timings
  const [timings, setTimings] = useState({
    Fajr: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });
  const [remainingTime, setremainingTime] = useState("");
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  const [tooday, setToday] = useState("");
  const [timer, setTimer] = useState("10");

  //handleCtyiChange
  const [selectCtiy, setSelectCtyi] = useState({
    displayName: "الهفوف",
    apiName: "Hofuf",
  });

  const avilableCity = [
    {
      displayName: "الهفوف",
      apiName: "Hofuf",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
    },
    {
      displayName: "مكه المكرمه",
      apiName: "Makkah al Mukarramah",
    },
  ];

  const getTimings = async () => {
    console.log("calling the api");
    const respons = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectCtiy.apiName}`
    );
    setTimings(respons.data.data.timings);
  };

  useEffect(() => {
    getTimings();
  }, [selectCtiy]);

  useEffect(() => {
    let intervel = setInterval(() => {
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format(" Do  MMMM  YYYY | h:mm"));

    return () => {
      clearInterval(intervel);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let PrayerIndex = 2;
    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      PrayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      PrayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      PrayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      PrayerIndex = 4;
    } else {
      PrayerIndex = 0;
    }

    seNextPrayerIndex(PrayerIndex);

    const nextPrayerObject = prayersArray[PrayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiffernce = midnightDiff + fajrToMidnightDiff;
      remainingTime = totalDiffernce;
    }

    const dueationRemainingTime = moment.duration(remainingTime);
    setremainingTime(
      `${dueationRemainingTime.hours()}:${dueationRemainingTime.minutes()}:${dueationRemainingTime.seconds()}
     `
    );
    console.log(
      dueationRemainingTime.hours(),
      dueationRemainingTime.minutes(),
      dueationRemainingTime.seconds()
    );
  };
  //handle
  const handleCityChange = (event) => {
    const ctyChing = avilableCity.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log(event.target.value);
    setSelectCtyi(ctyChing);
  };
  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          <Grid xs={6}>
            <div>
              <h3 style={{ direction: "rtl" }}>{tooday}</h3>
              <h2>{selectCtiy.displayName}</h2>
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <h3>
                متبقي حتى صلاة
                <span> </span>
                {prayersArray[nextPrayerIndex].displayName}
              </h3>
              <h2>{remainingTime}</h2>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ borderColor: "white", opacity: "0.1" }} />
        {/*CARDS */}
        <Stack
          style={{ marginTop: "20px", padding: "20px" }}
          direction="row"
          justifyContent={"space-around"}
        >
          <Grid container justifyContent={"space-around"}>
            <Grid  style={{ margin:"2px"}}>
              <Prayer
                name="الفجر"
                Timing={timings.Fajr}
                image="https://wepik.com/api/image/ai/9a07baa7-b49b-4f6b-99fb-2d2b908800c2"
              />
            </Grid>
            <Grid  style={{ margin:"2px"}}>
              <Prayer
                name="الظهر"
                Timing={timings.Dhuhr}
                image="https://wepik.com/api/image/ai/9a07bb45-6a42-4145-b6aa-2470408a2921"
              />
            </Grid>
            <Grid style={{ margin:"2px"}}>
              <Prayer
                name="العصر"
                Timing={timings.Asr}
                image="https://wepik.com/api/image/ai/9a07bb90-1edc-410f-a29a-d260a7751acf"
              />
            </Grid>
            <Grid  style={{ margin:"2px"}}>
              <Prayer
                name="المغرب"
                Timing={timings.Maghrib}
                image="https://wepik.com/api/image/ai/9a07bbe3-4dd1-43b4-942e-1b2597d4e1b5"
              />
            </Grid>
            <Grid  style={{ margin:"2px"}}>
              <Prayer
                name="العشاء"
                Timing={timings.Isha}
                image="https://wepik.com/api/image/ai/9a07bc25-1200-4873-8743-1c370e9eff4d"
              />
            </Grid>
          </Grid>
        </Stack>
        {/*==CARDS==*/}

        <Stack direction="row" justifyContent={"center"}>
          <FormControl style={{ width: "30%", marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">
              <span style={{ color: "white" }}>City</span>
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={}
              label="Ctiy"
              onChange={handleCityChange}
              style={{ color: "white" }}
            >
              {avilableCity.map((city) => {
                return (
                  <MenuItem key={city.apiName} value={city.apiName}>
                    {city.displayName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
}
