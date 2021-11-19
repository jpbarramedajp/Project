
import {useEffect, useState} from "react";
import { BASE_URL_API } from '../envSetting.js';
//const baseUrl = BASE_URL_API;
console.log(BASE_URL_API);
/*[Route("api/JobStatus/{dateSelected}")]*/

// const GetSessions = async () => {
//     const response = await fetch(`${BASE_URL_API}api/Sessions/`,
//     {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         redirect: 'follow'
//     });
//     const body = await response.json();
//     return body;
// }

const login = async (username, password) => {
    const response = await fetch(`${BASE_URL_API}api/login`,
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/html',
            'username': username,
            'password': password
        },
        redirect: 'follow'
    });
    //const body = await response.json();
    const body = await response.text().then(function (text) {
      if(text === 'failed'){
        return false;
      }
        else return text;  
    });
    return body;
}

const GetProfiles = async () => {
    const response = await fetch(`${BASE_URL_API}api/profiles`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    });
    const body = await response.json();
    console.log(body);
    return body;
}

const Register = async (FirstName, MiddleName, LastName,email, Age,
    Gender, Birthdate, Address, UserName, password) => {
    const response = await fetch(`${BASE_URL_API}api/RegisterController1`,
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'FirstName': FirstName,
            'MiddleName' : MiddleName,
            'LastName' : LastName,
            'email' : email,
            'Age' : Age,
            'Gender' : Gender,
            'Birthdate' : Birthdate,
            'Address' : Address,
            'UserName' : UserName,
            'password' : password
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const GetReviews = async () => {
    const response = await fetch(`${BASE_URL_API}api/getreviews`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const GetLikes = async () => {
    const response = await fetch(`${BASE_URL_API}api/likes`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const GetAnnouncement = async () => {
    const response = await fetch(`${BASE_URL_API}api/announcement`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const SetAnnouncement = async (announcement) => {
    const response = await fetch(`${BASE_URL_API}api/announcement`,
    {
        method: 'Post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'announcement': announcement
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const GetFoodsandMedicines = async (announcement) => {
    const response = await fetch(`${BASE_URL_API}api/foodsandmedicine`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const SetFoodsAndMedicines = async (action, id, name, description, category, stocks) => {
    const response = await fetch(`${BASE_URL_API}api/foodsandmedicine`,
    {
        method: 'Post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'action': action,
            'id': id,
            'name': name,
            'description': description,
            'category': category,
            'stocks': stocks
        },
        redirect: 'follow'
    });
    const body = await response.json();
    console.log(body);
    return body;
}

const GetFoldersList = async () => {
    const response = await fetch(`${BASE_URL_API}api/directory`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}
let download = require('downloadjs');
// const Download = async (path, name) => {
//     const response = await fetch(`${BASE_URL_API}api/download`,
//     {
//         method: 'GET',
//         mode: 'cors',
//         headers: {
//             'path': path,
//             'name': name
//         },
//         redirect: 'follow'
//     });
//     const body = await response.blob();
//     var file = window.URL.createObjectURL(body);
//     window.open(file);
// }

const Download = async (path,name) => {
    const url =`${BASE_URL_API}api/download`;

    const options = {
    headers: {
        'path': path,
        'name': name
    } 
    };
    fetch(url, options)
    .then( res => res.blob() )
    .then( blob => {
        download(blob);
    });
}
const GetServices = async () => {
    const response = await fetch(`${BASE_URL_API}api/Services`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

const ServicesMethods = async (id, title, subtitle, desc, image) => {
    const response = await fetch(`${BASE_URL_API}api/services`,
    {
        method: 'Post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'id': id,
            'title': title,
            'subtitle': subtitle,
            'desc': desc,
            'image': image
        },
        redirect: 'follow'
    });
    const body = await response.json();
    return body;
}

export {
    login, Register, GetReviews, GetLikes, GetAnnouncement, SetAnnouncement, GetProfiles, GetFoodsandMedicines, SetFoodsAndMedicines, GetFoldersList, Download, GetServices, ServicesMethods
};
