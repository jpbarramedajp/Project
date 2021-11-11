import CityWide from '../assets/citywide.gif';
import Recreation from '../assets/recreation.gif';
import TanodCare from '../assets/tanodcare.gif';
import daycare from '../assets/daycare.gif';
import magtanim from '../assets/magtanim.gif';
import scholarship from '../assets/scholarship.gif';
const serviceList = () => {
    return [
       
        {
            id: 2,
            title: 'Recreational Facilities',
            subtitle: 'Infrastructure Committee',
            desc: 'The Infrastructure Committee caters to the construction of recreational facilities such as basketball court, which serves as a playground for the residents to keep them away from abusive habits and for other activities.',
            image: Recreation
        },
        {
            id: 4,
            title: 'Barangay Addition Hills Day Care Center',
            subtitle: 'Educational Livelihood and Social Service Committee',
            desc: 'The Educational Livelihood and Social Service Committee provides school supplies for the students of Barangay Addition Hills Day Care Center.',
            image: daycare
        },
        {
            id: 5,
            title: 'Ugaliing Magtanim, Sapat na Nutrisyon Aanihin',
            subtitle: 'Kap. Carlito T. Cernal',
            desc: 'In Celebration of the Nutrition Month, nagkaroon ng Oath Taking for Parent\'s Committee Officers. Inducted by Kap. Carlito T. Cernal na ginanap sa Integrated Day Care Center."Ugaliing Magtanim, Sapat na Nutrisyon Aanihin"',
            image: magtanim
        },
        {
            id: 3,
            title: 'Simultaneous Citywide Cleaning Day Campaign',
            subtitle: 'Environment and Waste Management Committee',
            desc: 'The Environment and Waste Management Committee organizes “Simultaneous Citywide Cleaning Day Campaign” to uphold the City\'s discipline, order, and cleanliness.This is done every six months to avoid floods and waste blockage waterways. This program aims to protect residents from diseases caused by a waste blockage. ',
            image: CityWide
        },
        {
            id: 6,
            title: 'FREE VACCINATION',
            subtitle: 'Kap. Carlito T. Cernal',
            desc: 'Nakipagpulong ang Ating Kapitan Carlito Tolibas Cernal sa ating CITY VETERINARIAN DR. LOUIE ENCARNACION - upang talakayin o pag usapan ang Nauna nilang Pag uusap ni CITY HEALTH CHIEF ALEX STA. MARIA  para sa gagawing " FREE VACCINATION " sa mga alagang Aso - Handog parin ng Ating MAHAL NA MAYORA Menchie Abalos at Mayor BENHUR ABALOS. Gawa Hindi Salita . Mandaleño Disiplinado! Ilalabas po ang mga Petsa at Lugar na pagdarausan ng Nasabing Proyekto.'
        },
        {
            id: 7,
            title: 'NATIONAL CHILDREN\'S MONTH 2020',
            subtitle: 'Kap. Carlito T. Cernal',
            desc: 'Pagbati mula sa ating Butihing kapitan Carlito Tolibas Cernal at Buong Konseho sa lahat ng mga nagwagi at Nakiisa sa Selebrasyon ng " NATIONAL CHILDREN\'S MONTH 2020 " na may Temang "SAMA-SAMANG ITAGUYOD ANG KARAPATAN NG BAWAT BATA SA PANAHON NG PANDEMYA". Taos Pusong Pasasalamat mula sa COMITTEE HEAD on WOMEN\'S CHILDREN AND FAMILY COMITTEE - Kagawad Angie Pañoso , VAWC Head Fe Parinas , Over All In-Charge BCPC  Mila N. Garcia At  Opisina ng ating Barangay Secretary Jessa Mae Natad. CONGRATULATIONS!!! #NationalChildrensMonth2020 \n #BuwanNgMgaBata \n #SerbisyongCarlitoMayPusongTotoo \n #barangayadditionhils',
            image: scholarship
        },
        {
            id: 1,
            title: 'Tanod Care & Scholarship Program',
            subtitle: 'Committee on Transportation and Communication; Committee on Peace and Order',
            desc: 'The “Tanod Care Program” seeks to provide annual injury insurance coverage to barangay workers and Bantay-Bayan who served as front-line peace and order enforcers. The “Scholarship Program” provides financial assistance to deserving and qualified college students in Barangay Addition Hills Further, the Peace and Order Committee, with the assistance of the Bantay-Bayan cluster commander and the Punong Barangay Action Center (PBAC) conducts "Oplan Galugad" in order to preserve peace and order in the barangay and prevent unrest.',
            image: TanodCare
        }
        
    
    ]
        
    
}


export {
    serviceList
}