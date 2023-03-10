window.addEventListener("load", function () {
  /* Const Variables */
  const progressBar = document.querySelectorAll(".progress-bar");
  const volumeBar = document.querySelector("#volume-bar");
  const volumeIcon = document.querySelector(".fa-volume-high");

  const userAvt = document.querySelector(".header-user");
  const userSettings = document.querySelector(".user-settings");

  const searchBox = document.querySelector(".search-box");
  const dropdown = document.querySelector(".header-search-dropdown");
  const dropdownItem = document.querySelectorAll(".dropdown-item");

  const header = document.querySelector(".header");
  // const main = document.querySelector(".main-container");

  const musicOption = document.querySelectorAll(".music-option-item");
  const musicPanel = document.querySelectorAll(".music-option-panel");

  const sideBarTab = document.querySelectorAll(".side-bar-tab");
  const mainContent = document.querySelectorAll(".main-content");

  const themeIcon = document.querySelector(".theme-icon");
  const closeIcon = document.querySelector(".close-icon");
  const modal = document.querySelector(".theme-modal");
  const modalContent = document.querySelector(".theme-modal-content");
  const overlay = document.querySelector(".theme-modal-overlay");

  const themeItems = document.querySelectorAll(".theme-item");
  const body = document.querySelector("body");
  const musicControl = document.querySelector(".music-control");
  const mobileTab = document.querySelector(".mobile-tab");
  const mobilePlayer = document.querySelector(".mobile-player");

  /* Const color variables */
  const darkPurpleColor = `#${"170f23"}`;
  const lightPurpleColor = `#${"37075d"}`;
  const darkBlueColor = `#${"061d4f"}`;
  const darkColor = `#${"282828"}`;
  const blackColor = "rgba(0, 0, 0, 0.9)";

  /* music buttons control */
  const playBtn = document.querySelector("#play-btn");
  const nextBtn = document.querySelector("#next-btn");
  const prevBtn = document.querySelector("#prev-btn");
  const repeatBtn = document.querySelector("#repeat-btn");
  const shuffleBtn = document.querySelector("#shuffle-btn");

  let timeStart = document.querySelectorAll(".time-start");
  let timeEnd = document.querySelectorAll(".time-end");

  const song = document.querySelector("#song");
  const songImg = document.querySelectorAll(".song-thumbnail");
  const songTitle = document.querySelectorAll(".song-title");
  const songArtist = document.querySelectorAll(".artist");
  const songItems = document.querySelectorAll(".song-item");

  let playing = true;
  let songIndex = 0;
  let isRepeat = false;
  let isShuffle = false;

  /* load info b??i nh???c */
  function loadMusic() {
    displayTime();
    songTitle.forEach((item) => (item.textContent = playlist[songIndex].title));
    songArtist.forEach(
      (item) => (item.textContent = playlist[songIndex].artist)
    );
    songImg.forEach((item) =>
      item.setAttribute("src", playlist[songIndex].image)
    );
    // songImg.setAttribute("src", playlist[songIndex].image);
    song.setAttribute("src", `./songs/${playlist[songIndex].file}`);
  }
  loadMusic(songIndex);

  /* ph??t nh???c v?? ng??ng nh???c khi click v??o icon play/pause */
  playBtn.addEventListener("click", musicPlay);
  function musicPlay() {
    if (playing) {
      song.play();
      playBtn.className = "fa-solid fa-circle-pause";
      playBtnMobile.className = "fa-solid fa-circle-pause";
      songImg.forEach((item) => item.classList.add("active"));
      playing = false;
    } else {
      song.pause();
      playBtn.className = "fa-solid fa-circle-play";
      playBtnMobile.className = "fa-solid fa-circle-play";
      songImg.forEach((item) => item.classList.remove("active"));
      playing = true;
    }
  }

  /* ph??t b??i nh???c k??? ti???p */
  nextBtn.addEventListener("click", nextSong);
  function nextSong() {
    if (isShuffle) {
      shuffleSong();
      activeBackGround();
      playing = true;
      musicPlay();
    } else {
      songIndex++;
      if (songIndex > playlist.length - 1) {
        songIndex = 0;
      }
      loadMusic(songIndex);
      activeBackGround();
      playing = true;
      musicPlay();
    }
  }

  /* ph??t b??i nh???c tr?????c ???? */
  prevBtn.addEventListener("click", prevSong);
  function prevSong() {
    if (isShuffle) {
      shuffleSong();
      activeBackGround();
      playing = true;
      musicPlay();
    } else {
      songIndex--;
      if (songIndex < 0) {
        songIndex = playlist.length - 1;
      }
      loadMusic(songIndex);
      activeBackGround();
      playing = true;
      musicPlay();
    }
  }

  /* click v??o shuffleBtn ????? active m??u h???ng */
  shuffleBtn.addEventListener("click", activeShuffle);
  function activeShuffle() {
    if (isShuffle) {
      shuffleBtn.classList.remove("active");
      shuffleBtnMobile.classList.remove("active");
      isShuffle = false;
      // console.log("no shuffle");
    } else {
      shuffleBtn.classList.add("active");
      shuffleBtnMobile.classList.add("active");
      isShuffle = true;
      // console.log("is shuffle");
    }
  }

  /* click v??o repeatBtn ????? active m??u h???ng */
  repeatBtn.addEventListener("click", activeRepeat);
  function activeRepeat() {
    if (isRepeat) {
      repeatBtn.classList.remove("active");
      repeatBtnMobile.classList.remove("active");
      isRepeat = false;
      // console.log("no repeat");
    } else {
      repeatBtn.classList.add("active");
      repeatBtnMobile.classList.add("active");
      isRepeat = true;
      // console.log("is repeat");
    }
  }

  /* function random b??i nh???c */
  let newList = [];
  function shuffleSong() {
    let randomSong;
    do {
      randomSong = Math.floor(Math.random() * playlist.length);
      var isCheck = newList.includes(randomSong);
    } while (isCheck == true);
    newList.push(randomSong);
    console.log(newList);
    songIndex = randomSong;
    if (newList.length >= playlist.length) {
      newList = [];
    }
    loadMusic(songIndex);
  }

  /* khi b??i nh???c k???t th??c s??? t??? chuy???n sang b??i m???i */
  /* l???p l???i ho???c tr???n b??i n???u c?? active btn */
  song.addEventListener("ended", function () {
    if (isShuffle) {
      shuffleSong();
      activeBackGround();
      playing = true;
      musicPlay();
    } else if (isRepeat) {
      activeBackGround();
      playing = true;
      musicPlay();
    } else {
      nextSong();
      activeBackGround();
      playing = true;
      musicPlay();
    }
  });

  /* hien3 th??? background pinkcolor theo b??i nh???c t????ng ???ng */
  function activeBackGround() {
    songItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-index") == songIndex) {
        // console.log("true");
        item.classList.add("active");
      }
    });
  }

  /* click v??o song-item ????? active background pinkcolor */
  songItems.forEach((item) => item.addEventListener("click", clickSongItem));
  function clickSongItem(e) {
    console.log(e.target);
    songIndex = e.target.dataset.index;
    loadMusic(songIndex);
    playing = true;
    musicPlay();
    songItems.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  }

  /* thay ?????i ??m l?????ng nh???c */
  volumeBar.addEventListener("change", handleVolume);
  let currentValueBar;
  function handleVolume(e) {
    currentValueBar = volumeBar.value;
    let volumeValue = volumeBar.value / 100;
    song.volume = volumeValue;
    if (volumeValue == 0) {
      volumeIcon.classList.replace("fa-volume-high", "fa-volume-xmark");
    } else {
      volumeIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
    }
  }

  /* click on volume-icon to change to mute */
  volumeIcon.addEventListener("click", function () {
    if (volumeIcon.classList.contains("fa-volume-high")) {
      volumeIcon.classList.replace("fa-volume-high", "fa-volume-xmark");
      volumeBar.value = 0;
      song.volume = 0;
    } else {
      volumeIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
      volumeBar.value = currentValueBar;
      /* c?? bug nh??? ??? ????y nh??ng ??o bi???t s???a ki???u lonz g?? ??au n??o vcl */
      song.volume = 0.5;
    }
  });

  /* hi???n th??? th???i gian b??i nh???c ??ang ch???y */
  const timer = setInterval(displayTime, 500);
  function displayTime() {
    const songDuration = song.duration;
    const songCurrentTime = song.currentTime;
    // progressBar.max = songDuration;
    // progressBar.value = songCurrentTime;
    progressBar.forEach((bar) => (bar.max = songDuration));
    progressBar.forEach((bar) => (bar.value = songCurrentTime));
    timeEnd.forEach((time) => (time.textContent = formatTime(songCurrentTime)));
    // tr??nh hi???n th??? NaN khi load trang
    if (!songDuration) {
      timeStart.forEach((time) => (time.textContent = "00:00"));
    } else {
      timeStart.forEach(
        (time) => (time.textContent = formatTime(songDuration))
      );
    }
  }
  displayTime();

  /* k??o th??? thanh nh???c */
  progressBar.forEach((bar) => bar.addEventListener("change", handleDrag));
  function handleDrag(e) {
    song.currentTime = e.target.value;
  }

  /* format time for song */
  function formatTime(number) {
    // l???y ra s??? ph??t c???a b??i nh???c
    let minutes = Math.floor(number / 60);
    // l???y ra s??? gi??y c??a b??i nh???c
    let seconds = Math.floor(number % 60);
    return `${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  /* ------------------------------------------------------------------ */

  /* thay ?????i theme background cho zingmp3 */
  themeItems.forEach((item) => item.addEventListener("click", changeTheme));
  function changeTheme(e) {
    const themeNumber = e.target.dataset.color;
    let style = window.getComputedStyle(body, "");
    let bgColor = style.getPropertyValue("background-color");
    console.log(bgColor);
    switch (themeNumber) {
      case "1":
        body.style.backgroundColor = darkPurpleColor;
        musicControl.style.backgroundColor = darkPurpleColor;
        header.style.backgroundColor = darkPurpleColor;
        modalContent.style.backgroundColor = darkPurpleColor;
        mobileTab.style.backgroundColor = darkPurpleColor;
        mobilePlayer.style.backgroundColor = darkPurpleColor;
        userSettings.style.backgroundColor = blackColor;
        musicControl.style.backgroundImage = "url()";
        modal.classList.remove("show");
        break;
      case "2":
        body.style.backgroundColor = lightPurpleColor;
        mobileTab.style.backgroundColor = lightPurpleColor;
        mobilePlayer.style.backgroundColor = lightPurpleColor;
        modalContent.style.backgroundColor = "#6a39af";
        musicControl.style.backgroundImage = "url(./img/musiccontrol.png)";
        header.style.backgroundColor = "#411465";
        modal.classList.remove("show");
        break;
      case "3":
        body.style.backgroundColor = darkBlueColor;
        modalContent.style.backgroundColor = darkBlueColor;
        mobileTab.style.backgroundColor = darkBlueColor;
        mobilePlayer.style.backgroundColor = darkBlueColor;
        musicControl.style.backgroundImage = "url(./img/musiccontrol.png)";
        header.style.backgroundColor = darkBlueColor;
        userSettings.style.backgroundColor = blackColor;
        musicControl.style.backgroundColor = darkBlueColor;
        musicControl.style.backgroundImage = "url()";
        modal.classList.remove("show");
        break;
      case "4":
        body.style.backgroundColor = darkColor;
        modalContent.style.backgroundColor = darkColor;
        mobileTab.style.backgroundColor = darkColor;
        mobilePlayer.style.backgroundColor = darkColor;
        musicControl.style.backgroundImage = "url(./img/musiccontrol.png)";
        header.style.backgroundColor = darkColor;
        userSettings.style.backgroundColor = blackColor;
        musicControl.style.backgroundColor = darkColor;
        musicControl.style.backgroundImage = "url()";
        modal.classList.remove("show");
        break;
    }
  }

  /* click v??o theme-icon ????? toggle modal */
  themeIcon.addEventListener("click", function (e) {
    modal.classList.add("show");
  });
  window.addEventListener("click", function (e) {
    if (e.target == overlay || e.target == closeIcon) {
      modal.classList.remove("show");
    }
  });

  /* function chuy???n d???i tab side-bar khi click v??o */
  sideBarTab.forEach((tab) => tab.addEventListener("click", ClickSideBarTab));
  function ClickSideBarTab(e) {
    sideBarTab.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");
    const sideBarTabNumber = e.target.dataset.sidebar;
    mainContent.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-main") == sideBarTabNumber) {
        item.classList.add("active");
      }
    });
  }

  /* function chuy???n d???i tab music-option khi click v??o */
  musicOption.forEach((tab) => tab.addEventListener("click", handleClickTab));
  function handleClickTab(e) {
    musicOption.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");
    const tabNumber = e.target.dataset.tab;
    musicPanel.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("data-panel") === tabNumber) {
        item.classList.add("active");
      }
    });
  }

  // thay ?????i background khi scroll xu???ng
  // main.addEventListener("scroll", function () {
  //   let headerHeight = header.offsetHeight;
  //   if (main.scrollTop > headerHeight) {
  //       header.style.backgroundColor = "#411465";
  //   } else {
  //     header.style.backgroundColor = "";
  //   }
  // });

  /* click v??o thanh search ????? toggle class ????? xu???t */
  searchBox.addEventListener("click", function () {
    dropdown.classList.toggle("show");
  });
  dropdownItem.forEach((item) =>
    item.addEventListener("click", function () {
      let text = item.textContent;
      searchBox.value = text;
    })
  );
  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  /* click v??o user-avt ????? toggle th??m settings */
  userAvt.addEventListener("click", function () {
    userSettings.classList.toggle("show");
  });
  userSettings.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  document.addEventListener("click", function (e) {
    if (!userAvt.contains(e.target)) {
      userSettings.classList.remove("show");
    }
  });

  /* --------------------------MOBILE-SECTION--------------------------------- */

  const mobileToggle = document.querySelector(".music-control-left-image");
  mobileToggle.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      mobilePlayer.classList.add("active");
    }
  });

  const mobileClose = document.querySelector(".mobile-close-icon");
  mobileClose.addEventListener("click", function () {
    mobilePlayer.classList.remove("active");
  });

  /* music buttons control */
  const playBtnMobile = document.querySelector("#play-btn-mobile");
  const nextBtnMobile = document.querySelector("#next-btn-mobile");
  const prevBtnMobile = document.querySelector("#prev-btn-mobile");
  const repeatBtnMobile = document.querySelector("#repeat-btn-mobile");
  const shuffleBtnMobile = document.querySelector("#shuffle-btn-mobile");

  playBtnMobile.addEventListener("click", function () {
    musicPlay();
  });
  nextBtnMobile.addEventListener("click", function () {
    nextSong();
  });
  prevBtnMobile.addEventListener("click", function () {
    prevSong();
  });
  repeatBtnMobile.addEventListener("click", function () {
    activeRepeat();
  });
  shuffleBtnMobile.addEventListener("click", function () {
    activeShuffle();
  });
});
