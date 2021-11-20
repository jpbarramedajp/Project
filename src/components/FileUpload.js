import React, {useState,useContext} from "react";
import axios from "axios";
import {DashBoardContext} from '../helpers/Context';
import { GetFoldersList } from "../helpers/Utils";

export const FileUpload = (props) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const {setFolders, setIsFileReady} = useContext(DashBoardContext);
    const resetList = async () => {
        await setIsFileReady(false);
        await setFolders(await GetFoldersList());
        await setIsFileReady(true);
    }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        formData.append("folder", props.path);
    try{
        const res = await axios.post("https://additionhillsapi.herokuapp.com/api/file",formData);
        resetList();
    }catch(ex){
        console.log(ex)
    }
};
    return (
        <div>
            <input type="file" onChange={saveFile}/>
            <input type="button" value="upload" onClick={uploadFile}/>
        </div>
    )
};