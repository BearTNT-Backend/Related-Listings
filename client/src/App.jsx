import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {getListing, getUser} from '../api_helpers/helpers.js';
import Listing from './components/Listing.jsx';
import {SlidingDiv, GroupDiv, BackButton, NextButton, HeaderDiv, Main, PagesDiv, PageCount, ArrowSvg, Title} from './styles/styled_components.js';
import Favorites from './components/Favorites.jsx';
import CreateList from './components/CreateList.jsx';
import {debounce} from 'lodash';


const App = () => {
  const [related, setRelated] = useState([]);
  const [listingId, setListing] = useState(null);
  const [page, setPage] = useState(1);
  const [userFavs, setUserFavs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [favsShowing, setFavsShowing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [createShowing, setCreateShowing] = useState(false);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [fourSlides, setFourSlides] = useState(false);

  var handleResize = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth <= 1128 && !fourSlides) {
      setFourSlides(true);
      console.log(fourSlides);
    } else if (window.innerWidth > 1128 && fourSlides) {
      setFourSlides(false);
      console.log(fourSlides);
    }
  };

  window.addEventListener('resize', debounce(()=> handleResize(), 50));
  useEffect(() => {
    var pathArr = window.location.pathname.split('/');
    var id = pathArr[pathArr.length - 1] || 1;
    console.log(window.location.hash);
    getListing(id)
      .then(listingData => {
        setRelated(listingData[1]);
        setListing(listingData[0]);
        return getUser(1);
      })
      .then(userData => {
        setUserFavs(userData[1]);
        setUserId(userData[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  var next = () => {
    console.log(fourSlides);
    if (!window.location.hash) {
      window.location.href = window.location.href + '#2';
      setPage(2);
    } else if (window.location.hash === '#2') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#3';
      setPage(3);
    } else if (window.location.hash === '#3') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      var isFour = fourSlides ? '#4' : '#1';
      window.location.href = sliced + isFour;
      setPage(fourSlides ? 4 : 1);
    } else if (window.location.hash === '#4') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#1';
      setPage(1);
    } else if (window.location.hash === '#1') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#2';
      setPage(2);
    }
  };

  var previous = () => {
    if (!window.location.hash) {
      window.location.href = window.location.href + '#3';
      setPage(3);
    } else if (window.location.hash === '#2') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#1';
      setPage(1);
    } else if (window.location.hash === '#3') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#2';
      setPage(2);
    } else if (window.location.hash === '#1') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      var isFour = fourSlides ? '#4' : '#3';
      window.location.href = sliced + isFour;
      setPage(fourSlides ? 4 : 3);
    } else if (window.location.has === '#4') {
      var sliced = window.location.href.slice(0, window.location.href.length - 2);
      window.location.href = sliced + '#3';
      setPage(3);
    }
  };

  var openFavs = (id, url) => {
    setCurrentId(id);
    setCurrentPhotoUrl(url);
    if (document.getElementById(id).style.fill === 'rgb(255, 56, 92)') {
      document.getElementById(id).style.fill = 'rgba(0, 0, 0, .5)';
      const favsCopy = userFavs;
      console.log(userFavs);
      // loop1:
      // for (let i = 0; i < userFavs.length; i++) {
      //   loop2:
      //   for (let j = 0; j < userFavs[i].listings.length; j++) {
      //     if (id === userFavs[i].listings[j]) {
      //       userFavs[i].listings.splice(j, 1);
      //       break loop1;
      //     }
      //   }
      // }
      return;
    }
    setFavsShowing(true);
  };

  var closeFavs = () => {
    setFavsShowing(false);
  };

  var addToFavList = (name) => {
    document.getElementById(currentId).style.fill = 'rgb(255, 56, 92)';
    let favsCopy = userFavs;
    // for (let i = 0; i < userFavs.length; i++) {
    //   if (userFavs[i].name === name) {
    //     favsCopy[i].listings.push(currentId);
    //     setUserFavs(favsCopy);
    //     break;
    //   }
    // }
    closeFavs();
  };

  var openCreate = () => {
    setCreateShowing(true);
    setFavsShowing(false);
  };

  var closeCreate = () => {
    setCreateShowing(false);
    setFavsShowing(true);
  };

  var addList = (name) => {
    let favsCopy = userFavs;
    setUserFavs([...userFavs, {name: name, listings: [currentId], photoUrl: currentPhotoUrl}]);
    setCreateShowing(false);
    document.getElementById(currentId).style.fill = 'rgb(255, 56, 92)';
  };

  return (
    <Main>
      <HeaderDiv>
        <Title>More places to stay</Title>
        <PagesDiv>
          <PageCount>{page} / {fourSlides ? 4 : 3}</PageCount>
          <BackButton type="button" onClick={previous}>
            <ArrowSvg viewBox="0 0 18 18">
              <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fill-rule="evenodd"></path>
            </ArrowSvg>
          </BackButton>
          <NextButton type="button" onClick={next}>
            <ArrowSvg viewBox="0 0 18 18">
              <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fill-rule="evenodd"></path>
            </ArrowSvg>
          </NextButton>
        </PagesDiv>
      </HeaderDiv>

      {fourSlides ?
        <SlidingDiv>
          <GroupDiv id="1">
            {related.map((listing, i) => {
              if (i <= 2) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
          <GroupDiv id="2">
            {related.map((listing, i) => {
              if (i > 2 && i <= 5) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
          <GroupDiv id="3">
            {related.map((listing, i) => {
              if (i > 5 && i <= 8) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
          <GroupDiv id="4">
            {related.map((listing, i) => {
              if (i > 8) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
        </SlidingDiv>
        :
        <SlidingDiv>
          <GroupDiv id="1">
            {related.map((listing, i) => {
              if (i <= 3) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
          <GroupDiv id="2">
            {related.map((listing, i) => {
              if (i > 3 && i <= 7) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
          <GroupDiv id="3">
            {related.map((listing, i) => {
              if (i > 7) {
                return (
                  <Listing url={listing.url} key={listing.id} id={listing.id} type={listing.type} beds={listing.numOfBeds} photo={listing.photoUrl} rating={listing.rating} super={listing.superhost} ratings={listing.numOfRatings} description={listing.description} price={listing.price} four={fourSlides} openFunc={openFavs} />
                );
              }
            })}
          </GroupDiv>
        </SlidingDiv>

      }
      <Favorites showing={favsShowing} favorites={userFavs} closeFunc={closeFavs} addFunc={addToFavList} openCreate={openCreate}/>
      <CreateList addFunc={addList} showing={createShowing} closeFunc={closeCreate} />
    </Main>
  );
};




export default App;