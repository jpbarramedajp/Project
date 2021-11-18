
import React, { useState, createContext, useMemo, useEffect } from 'react';
import { GetReviews, GetLikes, GetAnnouncement, GetProfiles, GetFoodsandMedicines, GetFoldersList, GetServices } from './Utils';
import {regions} from 'select-philippines-address';
import {serviceList} from '../helpers/Constants';
export const DashBoardContext = createContext();

const DashBoardContextProvider = props => {

  const [signedIn, setSignedin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [files, setFiles] = useState();
  const [isFileReady, setIsFileReady] = useState(false);
  const [announcement, setAnnouncement] = useState();
  const [profiles, setProfiles] = useState();
  const [doNotOpen, setDoNotOpen] = useState(false);
  const [foodsmed, setfoodsmed] = useState([]);
  const [folders, setFolders] = useState([]);
  const [services, setServices] = useState([]);
  const [out, setOut] = useState(true);
  useMemo(() => {
    regions().then((region) => setRegionList(region));
  },[]);

  useEffect(async () => {
    await setReviews(await GetReviews());
  }, []);

  useEffect(async () => {
    await setLikes(await GetLikes());
  }, []);

  useEffect(async () => {
    // fetch('https://localhost:44315/api/directory')
    // .then(response => response.json())
    // .then(data => setFiles(Object.assign({}, data)));
    await setIsFileReady(false);
    await setFolders(await GetFoldersList());
    await setIsFileReady(true);
  }, []);

  useEffect(async () => {
    setLoading(true);
    await setAnnouncement(await GetAnnouncement());
    await setfoodsmed(await GetFoodsandMedicines());
    await setProfiles(await GetProfiles());
    await setServices(await GetServices());
    setLoading(false);
  }, []);

  


  return (
    <DashBoardContext.Provider
      value={{
        "signedIn": signedIn,
        "loading": loading,
        "setSignedin": setSignedin,
        'user' : user,
        'setUser' : setUser,
        "reviews" : reviews,
        "regionList" : regionList,
        "isAdmin": isAdmin,
        "setIsAdmin": setIsAdmin,
        "files": files,
        "setFiles": setFiles,
        "isFileReady": isFileReady,
        "setIsFileReady": setIsFileReady,
        "setReviews": setReviews,
        "likes" : likes,
        "setLikes" : setLikes,
        "announcement": announcement,
        "setAnnouncement": setAnnouncement,
        "isAdmin": isAdmin,
        "doNotOpen": doNotOpen,
        "setDoNotOpen": setDoNotOpen,
        "profiles": profiles,
        "setProfiles": setProfiles,
        "foodsmed": foodsmed,
        "setfoodsmed": setfoodsmed,
        "setFolders": setFolders,
        "folders": folders,
        "services": services,
        "setServices": setServices,
        "out": out,
        "setOut": setOut
      }}
    >
      {props.children}
    </DashBoardContext.Provider>
  );
};

export default DashBoardContextProvider;